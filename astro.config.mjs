import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

export default defineConfig({
  integrations: [mdx(), sitemap(), tailwind(), react()],
  output: "server",
  adapter: netlify({ edgeMiddleware: true }),
});
