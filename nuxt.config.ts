// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: true },

  modules: ['nuxt-quasar-ui', '@nuxtjs/i18n', '@pinia/nuxt'],

  runtimeConfig: {
    public: {
      apiBase: '/v1'
    }
  },

  app: {
    head: {
      title: 'doccano',
      meta: [
        {
          name: 'description',
          content: 'Open source annotation tool for machine learning practitioners.'
        }
      ],
      link: [{ rel: 'icon', href: '/favicon.ico' }]
    }
  },

  i18n: {
    vueI18n: './i18n/i18n.config.ts',
    defaultLocale: 'en',
    locales: [
      {
        name: 'English',
        code: 'en',
        iso: 'en-CA',
        file: 'en'
      },
      {
        name: '中文',
        code: 'zh',
        iso: 'zh-CN',
        file: 'zh'
      },
      {
        name: 'Français',
        code: 'fr',
        iso: 'fr-CA',
        file: 'fr'
      },
      {
        name: 'Deutsch',
        code: 'de',
        iso: 'de-DE',
        file: 'de'
      }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
})
