import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://joncgroberg.github.io',
	// base:'JonCGroberg.github.io',
	integrations: [mdx(), sitemap()],
});
