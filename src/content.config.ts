import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 作品データの形。src/content/works/ の .md ファイル1つ = 作品1件。
 * 書き方は README.md の「作品を追加する」を参照。
 */
const image = z.object({ image: z.string(), alt: z.string().optional(), caption: z.string().optional() });

/** 見出しの中に並べる要素：文章・箇条書き・画像・キャッチコピー・スライダー・横並び・埋め込み */
const block = z.union([
  z.object({ text: z.string() }),
  z.object({ list: z.array(z.string()) }),
  image,
  // キャッチコピーなど、中央に大きく出す一文
  z.object({ catch: z.string() }),
  // 矢印で切り替わる画像
  z.object({ slider: z.array(image) }),
  // 横並び（PCでは横に、スマホでは縦に並ぶ）。中身は画像か文章
  z.object({ row: z.array(z.union([image, z.object({ text: z.string() })])) }),
  // Figmaなどの埋め込み（他の画像と同じ16:10で表示）。title は読み上げ用の説明
  z.object({ embed: z.string(), title: z.string() }),
]);

/** 見出しの中身。文章だけなら1行で書け、画像や箇条書きを混ぜるときは block を並べる */
const content = z.union([z.string(), z.array(block)]).optional();

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
    // 作品の説明。書いた項目だけが、この順番で見出し付きで表示される
    role: content, // 担当業務領域
    overview: content, // 概要・背景
    target: content, // ターゲット
    challenge: content, // 課題
    goal: content, // 目標・結果
    concept: content, // コンセプト
    process: content, // 工夫した点・プロセス

    // 上の見出しに当てはまらないまとまり（写真集など）。工夫した点・プロセスの後に表示
    sections: z
      .array(z.object({ label: z.string(), items: z.array(block) }))
      .optional(),

    // ページ専用に読み込むCSS（ほぼ不要）
    extraCss: z.array(z.string()).optional(),
  }),
});

export const collections = { works };
