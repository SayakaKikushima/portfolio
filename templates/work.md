---
# ↓このファイルを src/content/works/ にコピーし、ファイル名を「カテゴリ-名前.md」に変えて使います
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

apps: [figma, ai, ps]        # public/img/icon/ にあるアイコン名（figma / ai / ps / procreate）

info:
  - label: Scope
    text: コピーライティング、ビジュアル制作
  - label: Outline
    text: |-
      1行目の文章
      改行するとそのまま改行されます
  - label: Target
    text: 20代〜30代女性

details:                     # Design details（上から順に並びます）
  - text: デザインのポイントを書きます。
  - image: /img/sample/detail-1.png
    alt: ◯◯1
  - image: /img/sample/detail-2.png
    alt: ◯◯2
    caption: 画像の下に出る説明（不要なら行ごと消す）
---
