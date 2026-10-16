// @ts-check
import { defineConfig } from 'astro/config';

const BASE = '/portfolio';

export default defineConfig({
  site: 'https://sayakakikushima-portfolio',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
