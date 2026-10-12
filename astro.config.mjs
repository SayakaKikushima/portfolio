// @ts-check
import { defineConfig } from 'astro/config';

/**
 * 公開先によってURLの前につくパスを切り替えます。
 * - Cloudflare Pages（○○.pages.dev）: ルート直下なので「/」
 * - GitHub Pages（sayakakikushima.github.io/portfolio/）: 「/portfolio」
 * Cloudflare Pages はビルド時に CF_PAGES=1 を自動で設定するので、何もしなくても切り替わります。
 */
const onCloudflare = !!process.env.CF_PAGES;
const BASE = process.env.SITE_BASE ?? (onCloudflare ? '/' : '/portfolio');
const SITE = process.env.CF_PAGES_URL ?? 'https://sayakakikushima.github.io';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
