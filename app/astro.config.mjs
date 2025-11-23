// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://personas-wallet.pages.dev",
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
  },
});
