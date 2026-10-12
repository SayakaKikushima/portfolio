import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 作品データの形。src/content/works/ の .md ファイル1つ = 作品1件。
 * 書き方は README.md の「作品を追加する」を参照。
 */
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    // 作品タイトル（改行すると <br> になります）
    title: z.string(),
    // カテゴリ: advertising / website / branding / package / other
    category: z.enum(['advertising', 'website', 'branding', 'package', 'other']),
    // URLの最後の部分（/works/advertising/◯◯/）
    urlName: z.string(),
    // 一覧での並び順（小さいほど前。10, 20, 30… と空けておくと間に入れやすい）
    order: z.number(),
    // true にすると一覧と前後リンクから外れる（ページ自体は残る）
    hidden: z.boolean().optional(),

    // 一覧カード
    thumbnail: z.string().optional(),
    thumbnailAlt: z.string().optional(),
    cardLead: z.string().optional(),
    cardTitle: z.string().optional(),

    // 作品ページ上部のメイン画像（sp/pc を分けない場合は image だけ）
    fv: z.object({
      sp: z.string().optional(),
      spAlt: z.string().optional(),
      pc: z.string().optional(),
      pcAlt: z.string().optional(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
    }),
    // メイン画像下のキャプション（Client:◯◯ など）
    caption: z.string().optional(),
    // 制作したサイトのURL（あればキャプションの下にリンクで表示）
    siteUrl: z.string().optional(),
    captionSmall: z.boolean().optional(),

    // 使用ツール（public/img/icon/◯◯.svg のファイル名）
    apps: z.array(z.string()).optional(),
    // 概要（Scope / Outline / Target など、見出しと本文のペア）
    info: z.array(z.object({ label: z.string(), text: z.string() })).optional(),
    // 移行前のHTMLをそのまま使う場合（新しい作品では使わなくてOK）
    infoHtml: z.string().optional(),

    // Design details（文章・箇条書き・画像を上から順に）
    details: z
      .array(
        z.union([
          z.object({ text: z.string() }),
          z.object({ list: z.array(z.string()) }),
          z.object({ image: z.string(), alt: z.string().optional(), caption: z.string().optional() }),
        ]),
      )
      .optional(),

    // ページ専用に読み込むCSS（ほぼ不要）
    extraCss: z.array(z.string()).optional(),
  }),
});

export const collections = { works };
