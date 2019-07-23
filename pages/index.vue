<template>
  <div id="index">
    <loading :load-status="loadStatus"/>
    <header-box :header-data="headerData" />
    <section class="intro g-r-center" data-0="opacity: 1" data-800="opacity: 0;">
      <h1>Welcome to visit My Blog</h1>
    </section>
    <div class="u_arrow"></div>
    <section class="main" v-if="!device.isMobile">
      <p
        class="remind-text1"
        data-1300="transform: translate3d(0, 63vh, 0) scale(0.9); opacity: 0;"
        data-1800="transform: translate3d(0, 53vh, 0) scale(1); opacity: 1;"
        data-2000="transform: translate3d(0, 40vh, 0) scale(1); opacity: 1;"
        data-3000="transform: translate3d(0, 40vh, 0) scale(0.5); opacity: 0;">
        博客效果图，<br>不妨点点看~
      </p>
      <div
        class="iphonex"
        data-1300="transform: translate3d(0, 100vh, 0) scale(1) rotate(0deg);"
        data-2000="transform: translate3d(0, 40vh, 0) scale(1) rotate(0deg);"
        data-2200="transform: translate3d(0, 40vh, 0) scale(1) rotate(0deg);"
        data-3000="transform: translate3d(0, 15vh, 0) scale(1.2) rotate(-90deg);"
        data-3800="transform: translate3d(0, 15vh, 0) scale(1.2) rotate(-90deg);"
        data-5000="transform: translate3d(0, 100vh, 0) scale(1.2) rotate(-90deg);">
        <img src="~assets/images/iphoneX.png" class="iphone-frame" alt />
        <div class="iphone-viewport">
          <nuxt-link
            :to="{path: '/blog'}"
            class="medium-profile-iphone"
            data-2200="transform: translate3d(0%, 0, 0) scale(1);"
            data-3000="transform: translate3d(100%, 0, 0) scale(0.9);">
            <img src="~assets/images/mobile_blog.jpg" alt>
          </nuxt-link>
          <div
            class="contact g-r-center"
            data-2200="transform: scale(0.5);"
            data-3000="transform: scale(0.9);">
            <div class="box">
              <p>吴正武</p>
              <i class="iconfont icon-github" onclick="window.open('https://github.com/wuzhengwu')"></i>
            </div>
          </div>
        </div>
      </div>
      <nuxt-link
        :to="{path: '/blog'}"
        class="pc-blog"
        data-1300="transform: translate3d(0, 100vh, 0) scale(1); opacity: 1; display: block;"
        data-2000="transform: translate3d(0, 15vh, 0) scale(1); opacity: 1; display: block;"
        data-2200="transform: translate3d(0, 15vh, 0) scale(1); opacity: 1; display: block;"
        data-3000="transform: translate3d(0, 15vh, 0) scale(0.8); opacity: 0; display: block;"
        data-3001="display: none;">
        <img src="~assets/images/pc_blog.jpg" alt>
      </nuxt-link>
      <p
        class="remind-text2"
        data-2200="transform: translate3d(0, 100vh, 0) scale(0.6); opacity: 0;"
        data-3000="transform: translate3d(0, 80vh, 0) scale(1); opacity: 1;"
        data-3200="transform: translate3d(0, 80vh, 0) scale(1); opacity: 1;"
        data-4000="transform: translate3d(0, 90vh, 0) scale(0.8); opacity: 0;">
        跳转github可查看源代码
      </p>
    </section>
    <section class="showBox g-r-center">
      <div class="weather_box">
        <Weather />
      </div>
      <div
        class="wallpaper"
        :style="'background: url(https://cn.bing.com'+biyingImg.url+') #cecec4 no-repeat center bottom'">
        <p ref="p">
          <strong>必应每日壁纸欣赏</strong>
          <span>{{ biyingImg.copyright }}</span>
        </p>
      </div>
    </section>
    <footer-box/>
  </div>
</template>

<script>
'use strict'
import { mapState } from 'vuex'
import loading from '~/components/loading.vue'
import headerBox from "~/components/header.vue"
import Weather from '~/components/weather.vue'
import footerBox from '~/components/footer.vue'

export default {
  components: {
    loading,
    headerBox,
    Weather,
    footerBox
  },
  data(){
    return{
      loadStatus: false, // 加载状态。false：加载中。true：加载完成。
      headerData: {
        isStatic: false
      },
      biyingImg: {
        url: ''
      }
    }
  },
  computed:{
    ...mapState(['device'])
  },
  mounted(){
    let img = new Image()

    this.biyingImg = sessionStorage.biyingImg
      ? JSON.parse(sessionStorage.biyingImg)
      : {}

    new Promise((resolve, reject) => {
      if(!sessionStorage.biyingImg){
        this.$axios.get('api/bing').then(res => {
          if(res.code ===0){
            this.biyingImg = res.data.images[0]
            sessionStorage.biyingImg = JSON.stringify(res.data.images[0])
            resolve()
          }
        })
      }else{
        resolve()
      }
    }).then(() => {
      this.loadStatus = true
    })
  }
}
</script>

<style lang="scss" src="~/assets/css/index.scss">
</style>

