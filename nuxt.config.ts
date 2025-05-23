// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      socketPort: 3002,
      url: 'http://localhost'
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxtjs-naive-ui', '@pinia/nuxt'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    ssr: {
      noExternal: ['vueuc'],
    },

  },
  css: ['~/assets/css/main.css'],
})