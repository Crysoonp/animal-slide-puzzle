# 画像追加手順

1. `image-inbox` のカテゴリーへ画像を入れます。
2. 同じ名前の `.source.txt` を置き、1行目に個別素材ページURLを記録します。
3. `npm run add-images` を実行します。

## 例

- `image-inbox/other_animals/rabbit/rabbit-photo.jpg`
- `image-inbox/other_animals/rabbit/rabbit-photo.source.txt`

`.source.txt` の内容:

```text
https://www.pexels.com/photo/individual-page-url/
Photographer name (optional)
```

対応サイトは Unsplash、Pexels、Pixabay です。
既存画像230枚は3サイト由来として管理し、個別URLは記録なしとして扱います。
