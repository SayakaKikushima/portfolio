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
  sp: /img/sample/fv-sp.png
  spAlt: ◯◯ sp
  pc: /img/sample/fv-pc.png
  pcAlt: ◯◯ pc
caption: Client:株式会社◯◯様
siteUrl: https://example.com/      # （任意）制作したサイトのURL。キャプションの下にリンクで出ます

apps: [figma, ai, ps]        # （任意）public/img/icon/ にあるアイコン名（figma / ai / ps / procreate / vscode）

info:                        # （任意）見出しと本文のペア。見出しは自由（Scope / Outline / Target / Point など）
  - label: Scope
    text: コピーライティング、ビジュアル制作
  - label: Outline
    text: |-
      1行目の文章
      改行するとそのまま改行されます
  - label: Target
    text: 20代〜30代女性

sections:                    # （任意）Design details と同じ階層の項目。必要なだけ増やせます（上から順に表示）
  - label: Concept           # 見出しは自由（Concept / Marketing process / Design details / Result など）
    items:
      - text: コンセプトを書きます。
  - label: Design details
    items:                   # 中身は、文章（text）・箇条書き（list）・画像（image）を上から順に並べます
      - text: デザインのポイントを書きます。
      - list:                # 箇条書きにしたいとき
          - ポイント1
          - ポイント2
      - image: /img/sample/detail-1.png
        alt: ◯◯1
      - image: /img/sample/detail-2.png
        alt: ◯◯2
        caption: 画像の下に出る説明（不要なら行ごと消す）
---
