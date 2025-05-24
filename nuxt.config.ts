// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      socketPort: 3002,
      url: 'http://localhost'
    },
    db: {
      postgres: {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: process.env.POSTGRES_PORT || 5432,
        user: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'password',
        database: process.env.POSTGRES_DB || 'voting_app',
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