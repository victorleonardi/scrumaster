// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      socketPort: 3001,
      url: 'http://localhost'
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxtjs-naive-ui'],
  plugins: ['~/plugins/socket.io.client'],
  nitro: {
    plugins: [
      './plugins/socket.io.server'
    ]
  }
})