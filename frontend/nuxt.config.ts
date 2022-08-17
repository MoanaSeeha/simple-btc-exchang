// import colors from 'vuetify/es5/util/colors'

// @ts-ignore
// @ts-ignore
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Crypto Exchange',
    title: 'Crypto Exchange',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/app.scss'],

  plugins: [{ src: '@/plugins/axios' }, { src: '@/plugins/repository' }],
  ssr: false,
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://composition-api.nuxtjs.org
    '@nuxtjs/composition-api/module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://axios.nuxtjs.org
    '@nuxtjs/axios'
    // With options
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      dark: false,
      themes: {
        dark: {}
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  buildDeal: {
    // eslint-disable-next-line no-empty-pattern
    extend(config: { node: { fs: string } }, {}: any) {
      config.node = {
        fs: 'empty'
      }
    }
  },
  // https://github.com/nuxt-community/modules/tree/master/packages/markdownit
  markdownit: {
    injected: true
  }
}
