// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://personas-wallet.pages.dev",
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: "es2022"
    },
    optimizeDeps: {
      include: ["cashscript"],
      exclude: ["@bitauth/libauth"]
    },
    ssr: {
      noExternal: ["@bitauth/libauth"]
    }
  }
});
