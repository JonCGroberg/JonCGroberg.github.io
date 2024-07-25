import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://joncgroberg.github.io",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    react(),
    partytown({ config: { forward: ["dataLayer.push"] } }),
  ],
  output: "server",
  adapter: netlify(),
});
