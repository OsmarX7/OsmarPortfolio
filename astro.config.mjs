// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [icon()],

  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false, // 'false' si quieres que tu español sea site.com/ y el inglés site.com/en/
    },
  },

  adapter: vercel(),
});
