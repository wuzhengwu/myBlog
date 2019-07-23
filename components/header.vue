<template>
  <header>
    <div id="header"
      class="u_transition_300"
      :class="[headerData.type, scrollStatus, {title: headerData.title}]">
      <div
        class="container headerBox g-r-center"
        data-0="color: rgba(206,206,196,1);"
        data-300="color: rgba(206,206,196,1);"
        data-1200="color: rgba(53, 58, 64,1);"
      >
        <nav class="g-r-center" style="justify-content: flex-end;">
          <div class="menuList">
            <ul class="g-r-center">
              <li
                v-for="(item, index) in navArray"
                :key="index"
                :class="{active: curRoute.indexOf(item.name) != -1}"
              >
                <a
                  href="javaScript:"
                  class="u_transition_300"
                  @click="navJump(item.route)"
                >{{item.title}}</a>
              </li>
            </ul>
            <!-- 菜单 屏幕小于767px显示 -->
            <div
              class="iphone-menu"
              :class="{active: menuSwitch}"
              @click="menuSwitch = !menuSwitch"
            >
              <div class="bar"></div>
              <div class="m-menu">
                <nuxt-link
                  v-for="(item, index) in navArray"
                  :key="index"
                  :to="{path:item.route}"
                  :class="{active: curRoute.indexOf(item.name) != -1}"
                >{{item.title}}</nuxt-link>
              </div>
            </div>
          </div>
          <i style="font-style:normal">Hi 你好</i>
          <template v-if="isLogin">
            <nuxt-link :to="{ path: '/manage'}" class="login u_transition_300" :class="{active: headerData.type === 'logins'}">个人中心</nuxt-link>
            <a href="javascript:" class="login u_transition_300" @click="signOut">退出</a>
          </template>
          <nuxt-link  v-else :to="{ path: '/login'}" class="login u_transition_300" :class="{active: headerData.type === 'logins'}">登录</nuxt-link>
        </nav>
        <i v-if="headerData.isStatic" class="iconfont icon-codestore u_transition_300"></i>
        <i
          v-else
          class="iconfont icon-codestore active"
          data-0="top: 30%; font-size: 80px;"
          data-300="top: 30%; font-size: 80px;"
          data-1200="top: 1%; font-size: 50px;"
        ></i>
      </div>
    </div>
    <!-- 博客头部菜单 -->
    <div id="blogHeader" v-if="headerData.title || headerData.type === 'article'">
      <div class="g-bolang">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 54 14"
          height="70"
          preserveAspectRatio="none"
        >
          <path
            class="g-bolang-svg"
            d="M 27 10C 21 12 14 14 0 14L 0 0L 54 0L 54 3C 40 3 33 8 27 10Z"
          />
        </svg>
      </div>
      <h1>{{ headerData.title }}</h1>
    </div>
    <div
      v-if="headerData.image && headerData.image.src"
      class="detail_bg u_transition_300"
      :class="[{'img-progressive--not-loaded': headerData.image.status == 0},{'img-progressive--is-loaded': headerData.image.status == 1}]"
    >
      <img
        v-if="headerData.image.status == 0"
        @load="imgLoad('load');"
        @error="imgLoad('error');"
        :src="IMGHOST+headerData.image.src+QN_POSTFIX+'100'"
        alt
      />
      <img
        v-if="headerData.image.status == 1"
        :src="IMGHOST+headerData.image.src+QN_POSTFIX+'500'"
        alt
      />
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import { getDeviceInfo } from "~/assets/js/utils";
export default {
  props: ["headerData"],
  data() {
    return {
      menuSwitch: false,
      navArray: [
        {
          route: "/",
          name: "index",
          title: "首页"
        },
        {
          route: "/blog",
          name: "blog",
          title: "博客"
        },
        {
          route: "/messageBoard",
          name: "messageBoard",
          title: "留言板"
        }
      ],
      scrollStatus: '',
      curRoute: this.$route.name
    };
  },
  computed: {
    ...mapState(["device", 'IMGHOST', 'QN_POSTFIX', 'isLogin'])
  },
  created(){
    if(process.browser){
        if(!!sessionStorage.isLogin){
            this.$store.commit('goLogin')
        }
    }
  },
  mounted() {
    this.$store.commit("init", {
      device: getDeviceInfo()
    });
    this.$nextTick(() => {
      if (!this.device.isMobile) {
        skrollr.init({
          smoothScrollingDuration: 200
        });
      }
    });
    if (this.headerData.type === 'article') {
      this.handleScroll()
    }
    this.scrollStatus =
      document.documentElement.scrollTop || document.body.scrollTop > 50
        ? 'down'
        : ''
  },
  methods: {
    /**
     * 导航跳转
     * @param {route} 路由地址
     */
    navJump(route) {
      if (route !== this.$route.path) {
        this.$router.push({
          path: route
        });
      }
    },
    /**
     * 滚动侦听
     */
    handleScroll(e) {
      let beforeScrollTop =
        document.documentElement.scrollTop || document.body.scrollTop

      window.addEventListener(
        'scroll',
        () => {
          // h5滚动的时候隐藏菜单
          if (this.menuSwitch) this.menuSwitch = false
          let afterScrollTop =
              document.documentElement.scrollTop || document.body.scrollTop,
            delta = afterScrollTop - beforeScrollTop

          beforeScrollTop = afterScrollTop

          if (afterScrollTop <= 50) {
            this.scrollStatus = ''
          } else {
            if (delta > 0 || delta <= -3) {
              if (!window.scrollSkip) {
                let type = delta > 0 ? 'down' : 'up'

                if (this.scrollStatus !== type) {
                  this.scrollStatus = type
                }
              } else {
                this.scrollStatus = 'down'
              }
            }
          }
        },
        false
      )
    },
    /**
     * 图片加载
     * @param {type}    load：加载成功  error：加载失败
     */
    imgLoad(type) {
      this.headerData.image.status = type == 'load' ? 1 : 0
    },
    signOut(){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('isLogin');
      this.$store.commit('notLogin');
      this.$store.commit('signOutLogin');
      this.$router.push({ path: '/login' });
    }
  }
};
</script>

<style lang="scss" src="~/assets/css/header.scss">
</style>