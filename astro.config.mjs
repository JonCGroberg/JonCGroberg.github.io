import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://groberg.software",
  integrations: [
    mdx(),
    // TODO: Re-enable sitemap once blog collection is properly configured
    // sitemap(),
    react(),
    partytown({ config: { forward: ["dataLayer.push"] } }),
  ],
  output: "static",
});
