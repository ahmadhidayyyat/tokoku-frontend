import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/fonts",
    "@nuxt/image",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@prisma/nuxt",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  runtimeConfig: {
    public: {
      axios: {
        baseURL: "http://localhost:3001",
      },
    },
  },
  prisma: {
    autoSetupPrisma: false,
    runMigration: false,
  },
  nitro: {
    externals: {
      // ini penting!
      external: ["@prisma/client"],
      inline: [".prisma/client"],
    },
  },
});
