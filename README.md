# Sayaka Kikushima Portfolio

[Astro](https://astro.build/) で作っている静的サイトです。`main` に push すると GitHub Actions が自動でビルドし、GitHub Pages（https://sayakakikushima.github.io/portfolio/ ）に公開されます。

## 作品を追加する

1. 画像を `public/img/作品名/` に入れる
2. `templates/work.md` を `src/content/works/` にコピーし、ファイル名を `カテゴリ-名前.md`（例: `advertising-sample.md`）にする
3. 中身を書き換える
4. push する

これだけで、作品ページ・トップとWorksのカード・前後（prev / next）リンクが自動で作られます。

- **並び順**は `order` の数字で決まります（小さいほど前）。既存の作品は 10, 20, 30… になっているので、間に入れたいときは 15 のように書きます。
- **一時的に非公開**にしたいときは `hidden: true` を書くと、一覧と前後リンクから外れます。
- **削除**はファイルを消すだけです。
- テンプレートの「（任意）」の項目は、不要なら行ごと消せます。書かなかった部分はページに表示されません（サイトURLの有無、箇条書きの有無なども、この1つのテンプレートで書き分けられます）。
- 画像のパスは `/img/...` のように `/` から書きます（公開先の `/portfolio` は自動で付きます）。

### 移行前からある作品について

移行前の作品の一部は、レイアウトがページごとに違うため、`infoHtml` や本文（2つ目の `---` より下）に元のHTMLをそのまま持っています。見た目は以前と同じです。新しい作品では使わず、`info` と `details` で書いてください。`advertising-nihonchozai.md`（画像中心）と `website-uzabase.md`（サイトURL・箇条書きあり）が新しい書き方の見本です。

## 手元で確認する

```bash
npm install      # 最初の1回だけ
npm run dev      # http://localhost:4321/portfolio/ でプレビュー（保存すると自動で反映）
npm run build    # 公開用のファイルを dist/ に作る
```

## ファイルの場所

| 場所 | 中身 |
|---|---|
| `src/content/works/` | 作品データ（1ファイル = 1作品） |
| `src/pages/works/[category]/[slug].astro` | 作品ページのテンプレート（全作品共通） |
| `src/components/WorksPanels.astro` | トップ・Worksの作品カード |
| `src/components/Head.astro` / `Footer.astro` | 作品ページ共通の head・フッター |
| `src/pages/index.astro` ほか | トップ・Works・Profile・Contact |
| `src/lib/site.ts` | カテゴリ名・タブ・前後リンクの順番の設定 |
| `public/` | CSS・JS・画像（そのまま公開されます） |
| `scss/` | CSSの元ファイル。コンパイル先は `public/css/style.css` にしてください |

## Googleタグマネージャー

`src/components/Gtm.astro` の `GTM_ID` に `GTM-XXXXXXX` を入れると、全ページの `<head>` に入ります。
