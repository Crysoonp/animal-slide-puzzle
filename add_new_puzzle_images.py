from pathlib import Path
from PIL import Image, ImageOps
from urllib.parse import urlparse
import csv
import hashlib
import json
import re
import shutil
import subprocess
import sys
from datetime import date

ROOT = Path.cwd()
INBOX = ROOT / "image-inbox"
PROCESSED = ROOT / "image-processed"
IMAGES = ROOT / "images"
WWW = ROOT / "www"
SOURCES_CSV = ROOT / "image-sources.csv"
HISTORY_FILE = ROOT / "image-import-history.json"
GENERATOR = ROOT / "generate_image_list.py"
MAX_EDGE = 1200
JPEG_QUALITY = 84
SUPPORTED = {".jpg", ".jpeg", ".png", ".webp"}
ALLOWED_SITES = {
    "unsplash.com": "Unsplash",
    "www.unsplash.com": "Unsplash",
    "pexels.com": "Pexels",
    "www.pexels.com": "Pexels",
    "pixabay.com": "Pixabay",
    "www.pixabay.com": "Pixabay",
}
CATEGORY_MAP = {
    "cats": ("cats", "cat"),
    "dogs": ("dogs", "dog"),
    "other_animals": ("other_animals", None),
}


def sha256(path):
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def load_history():
    try:
        value = json.loads(HISTORY_FILE.read_text(encoding="utf-8"))
        return value if isinstance(value, list) else []
    except Exception:
        return []


def normalize_prefix(text):
    value = re.sub(r"[^a-z0-9]+", "_", text.lower()).strip("_")
    return value or "animal"


def other_animal_prefix(image_path):
    relative = image_path.relative_to(INBOX / "other_animals")
    if len(relative.parts) > 1:
        return normalize_prefix(relative.parts[0])
    stem = normalize_prefix(image_path.stem)
    match = re.match(r"([a-z]+)", stem)
    return match.group(1) if match else "animal"


def next_number(folder, prefix):
    pattern = re.compile(rf"^{re.escape(prefix)}_(\d{{4}})\.(?:jpg|jpeg|png|webp)$", re.I)
    numbers = []
    if folder.exists():
        for path in folder.iterdir():
            match = pattern.match(path.name)
            if match:
                numbers.append(int(match.group(1)))
    return max(numbers, default=-1) + 1


def source_info(image_path):
    sidecar = image_path.with_suffix(".source.txt")
    if not sidecar.exists():
        raise ValueError(f"出典ファイルがありません: {sidecar.relative_to(ROOT)}")
    lines = [line.strip() for line in sidecar.read_text(encoding="utf-8-sig").splitlines() if line.strip()]
    if not lines:
        raise ValueError(f"出典URLが空です: {sidecar.relative_to(ROOT)}")
    url = lines[0]
    host = urlparse(url).netloc.lower()
    site = ALLOWED_SITES.get(host)
    if not site:
        raise ValueError(f"許可対象外の出典URLです: {url}")
    creator = lines[1] if len(lines) >= 2 else ""
    return sidecar, site, url, creator


def optimize(source, destination):
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        image.load()
        width, height = image.size
        largest = max(width, height)
        if largest > MAX_EDGE:
            scale = MAX_EDGE / largest
            image = image.resize(
                (max(1, round(width * scale)), max(1, round(height * scale))),
                Image.Resampling.LANCZOS,
            )
        if image.mode not in {"RGB", "L"}:
            background = Image.new("RGB", image.size, "white")
            if "A" in image.getbands():
                background.paste(image, mask=image.getchannel("A"))
            else:
                background.paste(image.convert("RGB"))
            image = background
        elif image.mode == "L":
            image = image.convert("RGB")
        image.save(
            destination,
            format="JPEG",
            quality=JPEG_QUALITY,
            optimize=True,
            progressive=True,
            subsampling="4:2:0",
        )


def append_source_row(game_file, category, site, url, creator):
    with SOURCES_CSV.open("a", encoding="utf-8-sig", newline="") as stream:
        writer = csv.writer(stream)
        writer.writerow([
            game_file,
            category,
            site,
            url,
            creator,
            date.today().isoformat(),
            f"{site} License",
            "No",
            "Commercial use and modification allowed; verify source page at import time",
        ])


for required in [INBOX, PROCESSED, IMAGES, WWW, GENERATOR, SOURCES_CSV, HISTORY_FILE]:
    if not required.exists():
        raise SystemExit(f"ERROR: 必要なファイルまたはフォルダーがありません: {required}")

candidates = []
for category in CATEGORY_MAP:
    category_root = INBOX / category
    candidates.extend(
        path for path in category_root.rglob("*")
        if path.is_file() and path.suffix.lower() in SUPPORTED
    )
candidates.sort()

if not candidates:
    print("追加対象の画像はありません。")
    sys.exit(0)

history = load_history()
known_hashes = {item.get("sha256") for item in history if item.get("sha256")}
validated = []
errors = []

for image_path in candidates:
    try:
        category = image_path.relative_to(INBOX).parts[0]
        sidecar, site, url, creator = source_info(image_path)
        with Image.open(image_path) as test_image:
            test_image.verify()
        digest = sha256(image_path)
        if digest in known_hashes:
            raise ValueError("同じ内容の画像はすでに追加済みです")
        validated.append((image_path, sidecar, category, site, url, creator, digest))
    except Exception as error:
        errors.append(f"{image_path.relative_to(ROOT)}: {error}")

if errors:
    print("ERROR: 追加前検査で問題が見つかりました。正式フォルダーは変更していません。")
    for error in errors:
        print("- " + error)
    sys.exit(1)

before_total = 0
after_total = 0
added = []
reserved_numbers = {}

for image_path, sidecar, category, site, url, creator, digest in validated:
    folder_name, fixed_prefix = CATEGORY_MAP[category]
    prefix = fixed_prefix or other_animal_prefix(image_path)
    key = (folder_name, prefix)
    if key not in reserved_numbers:
        reserved_numbers[key] = next_number(IMAGES / folder_name, prefix)
    number = reserved_numbers[key]
    reserved_numbers[key] += 1
    filename = f"{prefix}_{number:04d}.jpg"
    relative_game_file = f"{folder_name}/{filename}"
    destination = IMAGES / folder_name / filename
    before_total += image_path.stat().st_size
    optimize(image_path, destination)
    after_total += destination.stat().st_size
    append_source_row(relative_game_file, category, site, url, creator)
    history.append({
        "sha256": digest,
        "game_file": relative_game_file,
        "category": category,
        "source_site": site,
        "source_url": url,
        "imported_date": date.today().isoformat(),
    })
    archive_dir = PROCESSED / date.today().isoformat() / category
    archive_dir.mkdir(parents=True, exist_ok=True)
    shutil.move(str(image_path), archive_dir / image_path.name)
    shutil.move(str(sidecar), archive_dir / sidecar.name)
    added.append(relative_game_file)

HISTORY_FILE.write_text(json.dumps(history, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
subprocess.run([sys.executable, str(GENERATOR)], cwd=ROOT, check=True)

www_images = WWW / "images"
if www_images.exists():
    shutil.rmtree(www_images)
shutil.copytree(IMAGES, www_images)
shutil.copy2(ROOT / "image-list.js", WWW / "image-list.js")
subprocess.run(["npx.cmd" if sys.platform == "win32" else "npx", "cap", "sync", "android"], cwd=ROOT, check=True)

print("\n=== 新規画像の追加結果 ===")
print(f"追加: {len(added)}枚")
for name in added:
    print("- " + name)
print(f"圧縮前: {before_total / 1024 / 1024:.1f} MiB")
print(f"圧縮後: {after_total / 1024 / 1024:.1f} MiB")
if before_total:
    print(f"削減率: {(before_total - after_total) / before_total * 100:.1f}%")
print("image-list.js: 更新完了")
print("www: 更新完了")
print("Android同期: 完了")
