// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://nad-staging.vinceh121.me",
  integrations: [mdx(), vue(), sitemap()],
  image: {
    domains: ["weblate.vinceh121.me"],
  },
});
