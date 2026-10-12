import { getCollection, type CollectionEntry } from 'astro:content';

export type Work = CollectionEntry<'works'>;

/** カテゴリの設定。tab はトップ/Works一覧のタブのID、dir はURLのフォルダ名 */
export const CATEGORIES = [
  { id: 'advertising', dir: 'advertising', label: 'Advertising', tab: 'tabpanel02' },
  { id: 'website', dir: 'website', label: 'Web', tab: 'tabpanel03' },
  { id: 'branding', dir: 'branddesign', label: 'BrandDesign', tab: 'tabpanel04' },
  { id: 'package', dir: 'packagedesgin', label: 'PackageDesign', tab: 'tabpanel05' },
  { id: 'other', dir: 'other', label: 'Other', tab: 'tabpanel06' },
] as const;

/** 作品ページの prev / next をたどる順番（カテゴリ単位） */
const CHAIN_ORDER = ['advertising', 'website', 'package', 'other', 'branding'];

export const category = (id: string) => CATEGORIES.find((c) => c.id === id)!;

/** /img/... のようなサイト内パスに公開先のパス（GitHub Pages なら /portfolio）を付ける */
export const u = (path: string) => {
  if (!path || /^(https?:|mailto:|tel:|#|\/\/|data:)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : '/' + path);
};

/** HTML文字列の中の src="/..." href="/..." に公開先を付ける */
export const withBase = (html: string) =>
  html.replace(/(src|href)="(\/[^/"][^"]*)"/g, (_m, a, v) => `${a}="${u(v)}"`);

/** 改行を <br> に */
export const br = (text = '') => withBase(text.replace(/\n/g, '<br>'));

export const workUrl = (w: Work) => u(`/works/${category(w.data.category).dir}/${w.data.urlName}/`);

const byOrder = (a: Work, b: Work) => a.data.order - b.data.order || a.id.localeCompare(b.id);

/** カテゴリごとの公開作品（並び順つき） */
export async function worksByCategory() {
  const all = await getCollection('works', (w) => !w.data.hidden);
  return CATEGORIES.map((c) => ({ ...c, works: all.filter((w) => w.data.category === c.id).sort(byOrder) }));
}

/** prev / next を計算。hidden の作品は、同じカテゴリの直前の作品の位置にいるものとして扱う */
export async function neighbors(work: Work) {
  const all = await getCollection('works');
  const chain = CHAIN_ORDER.flatMap((c) => all.filter((w) => w.data.category === c && !w.data.hidden).sort(byOrder));
  let i = chain.findIndex((w) => w.id === work.id);
  if (i === -1) {
    const before = chain.filter((w) => w.data.category === work.data.category && w.data.order <= work.data.order);
    const anchor = before.at(-1);
    i = anchor ? chain.indexOf(anchor) : chain.findIndex((w) => w.data.category === work.data.category) - 1;
    return { prev: chain.at(i)!, next: chain[(i + 1) % chain.length] };
  }
  return { prev: chain.at(i - 1)!, next: chain[(i + 1) % chain.length] };
}
