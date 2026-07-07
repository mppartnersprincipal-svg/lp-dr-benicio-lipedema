import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config/content';

export default defineConfig({
  site: SITE.domain,
  output: 'static',
  compressHTML: true,
  build: {
    // CSS total é pequeno — inline elimina requisição bloqueante (critical CSS)
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
});
