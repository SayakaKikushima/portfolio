// @ts-check
import { defineConfig } from 'astro/config';

const BASE = '/portfolio';

export default defineConfig({
  site: 'https://sayakakikushima.github.io',
  base: BASE,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
