---
# ↓このファイルを src/content/works/ にコピーし、ファイル名を「カテゴリ-名前.md」に変えて使います
# 「（任意）」の項目は、不要なら行ごと消してOK。書かなければその部分は表示されません
title: |-
  株式会社◯◯様
  作品タイトル
category: advertising        # advertising / website / branding / package / other
urlName: sample              # URLになる部分（半角英数字）→ /works/advertising/sample/
order: 15                    # 一覧の並び順（小さいほど前）。10と20の間に入れたいなら15

# 一覧カード
thumbnail: /img/sample/thumb.png
thumbnailAlt: ◯◯の写真
cardLead: 株式会社◯◯様
cardTitle: 作品タイトル

# 作品ページ上部のメイン画像
fv:
  image: /img/sample/sample_fv.png   # ファイル名は「フォルダ名_種類_fv.png」
  imageAlt: ◯◯
  # スマホとPCで画像を分けるときだけ、image の代わりに sp / pc を使う
  # sp: /img/sample/sample_fv_sp.png
  # spAlt: ◯◯
  # pc: /img/sample/sample_fv_pc.png
  # pcAlt: ◯◯
caption: Client:株式会社◯◯様
siteUrl: https://example.com/      # （任意）制作したサイトのURL。キャプションの下にリンクで出ます

apps: [figma, ai, ps]        # （任意）public/img/icon/ にあるアイコン名（figma / ai / ps / procreate / vscode）

# 作品の説明（すべて任意）。書いた項目だけが、この順番で見出し付きで表示されます
# 文章だけなら1行で書けます。改行したいときは「|-」の次の行から書きます
role: コピーライティング、ビジュアル制作          # 担当業務領域
overview: |-                                     # 概要・背景
  1行目の文章
  改行するとそのまま改行されます
target: 20代〜30代女性                           # ターゲット
challenge: 課題を書きます。                      # 課題
goal: 目標と結果を書きます。                     # 目標・結果
concept: コンセプトを書きます。                  # コンセプト
process:                                         # 工夫した点・プロセス
  # 画像などを混ぜるときは、下の部品を上から順に並べます。使わない部品は行ごと消してOK
  - text: デザインのポイントを書きます。
  - list:                # 箇条書きにしたいとき
      - ポイント1
      - ポイント2
  - image: /img/sample/detail-1.png
    alt: ◯◯1
  - image: /img/sample/detail-2.png
    alt: ◯◯2
    caption: 画像の下に出る説明（不要なら行ごと消す）
  - catch: 「キャッチコピー」   # 中央に大きく出す一文
  - slider:                # 矢印で切り替わる画像（何枚でも）
      - image: /img/sample/slide-1.png
        alt: ◯◯スライド1
      - image: /img/sample/slide-2.png
        alt: ◯◯スライド2
  - row:                   # 横並び（PCでは横、スマホでは縦）。画像・文章を2つ以上
      - image: /img/sample/side-1.png
        alt: ◯◯横並び1
      - text: |-
          画像の横に並べる文章
          改行もできます

# sections:                  # （任意）上の見出しに当てはまらないまとまり。最後に表示されます
#   - label: 見出し
#     items:
#       - text: 文章
---
