// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      socketPort: 3002,
      url: process.env.URL ?? 'http://localhost',
      websocket: {
        url: process.env.WEBSOCKET_URL ?? 'http://localhost:3002',
      }
    },
    db: {
      postgres: {
        uri: process.env.POSTGRES_URI ?? 'postgresql://postgres:postgres@localhost:5432/postgres',
      }
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