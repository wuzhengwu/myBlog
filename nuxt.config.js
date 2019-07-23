
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '吴正武的个人网站',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '吴正武的个人网站，主要记录博主在开发过程中记录的一些问题和解决方案' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'http://pv.sohu.com/cityjson?ie=utf-8' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/base.scss',
    '@/assets/css/font.scss',
    'element-ui/lib/theme-chalk/index.css'
  ],

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8989/'
  },

  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/axios',
    '@/plugins/filters',
    { src: '@/plugins/base', ssr: false },
    { src: '@/assets/js/skrollr.min.js', ssr: false },
    { src: '@/plugins/ElementUI', ssr: true}
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor:['axios', 'element-ui'],
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ],
      comments: true
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
