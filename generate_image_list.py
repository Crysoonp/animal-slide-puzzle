from pathlib import Path
import json

IMAGE_DIR = Path("images")
OUTPUT_FILE = Path("image-list.js")

SUPPORTED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
}

CATEGORY_FOLDERS = {
    "cats": "cats",
    "dogs": "dogs",
    "otherAnimals": "other_animals",
}


def get_images(folder_name):
    folder_path = IMAGE_DIR / folder_name

    if not folder_path.exists():
        print(
            f"注意: {folder_path} が見つかりません。"
        )
        return []

    return sorted(
        f"{folder_name}/{file.name}"
        for file in folder_path.iterdir()
        if file.is_file()
        and file.suffix.lower()
        in SUPPORTED_EXTENSIONS
    )


image_lists = {
    category_name: get_images(folder_name)
    for category_name, folder_name
    in CATEGORY_FOLDERS.items()
}

javascript_text = (
    "const imageLists = "
    + json.dumps(
        image_lists,
        ensure_ascii=False,
        indent=4,
    )
    + ";\n\n"
    + "const allImages = [\n"
    + "    ...imageLists.cats,\n"
    + "    ...imageLists.dogs,\n"
    + "    ...imageLists.otherAnimals\n"
    + "];\n"
)

OUTPUT_FILE.write_text(
    javascript_text,
    encoding="utf-8",
)

print()
print("image-list.jsを生成しました。")
print()

for category_name, images in image_lists.items():
    print(
        f"{category_name}: "
        f"{len(images)}枚"
    )

print()
print(
    f"合計: "
    f"{sum(len(images) for images in image_lists.values())}枚"
)