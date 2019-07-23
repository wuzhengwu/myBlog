<template>
    <div id="blog">
        <loading :load-status="loadStatus"/>
        <header-box :header-data="headerData"/>
        <div id="blogMain" class="g-r-center">
            <div class="container">
                <ul class="categories g-r-center">
                    <li @click="categoriesName = '全部'">
                        <nuxt-link
                            class="u_transition_300 u_hover_active_bg"
                            :class="{cur: categoriesName === '全部'}"
                            :to="{path: '/blog'}">
                            全部
                        </nuxt-link>
                    </li>
                    <li v-for="(item, index) in categories"
                        :key="index"
                        @click="categoriesName = item.name">
                        <nuxt-link
                            class="u_transition_300 u_hover_active_bg"
                            :class="{cur: categoriesName === item.name}"
                            :to="{path: '/blog', query: {categories: item.name}}">
                            {{ item.name }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
        <article-list :categories-name="categoriesName" :init-list="article_info" />
        <footer-box />
    </div>
</template>

<script>
import loading from '~/components/loading'
import headerBox from '~/components/header'
import footerBox from '~/components/footer'
import articleList from '~/components/articleList'

export default {
    async asyncData(app) { 
        //异步请求数据,组件初始化前被调用的,Nuxt.js扩展vue.js的方法
        //注意：由于asyncData方法是在组件 初始化 前被调用的，
        //所以在方法内是没有办法通过 this 来引用组件的实例对象。
        let data = await app.$axios
        .post('api/getArticlesList', {
            page: Number(app.query.page) || 1,
            Category: app.query.categories || '全部',
            release: true,
        })
        .then(res => {
            if (res.code === 0) {
                return res.data
            }
        })

        return {
            article_info: data
        }
    },
    data(){
        return{
            loadStatus: false, // 加载状态。false：加载中。true：加载完成。
            headerData: {
                title: 'Blog',
                isStatic: true
            },
            categories: [],
            categoriesName: this.$route.query.categories || '全部',
            article_info: {},
        }
    },
    components: {
        loading,
        headerBox,
        footerBox,
        articleList
    },
    mounted() {
        // 获取分类列表
        this.$axios.post('api/getCategoryList').then(res => {
            this.loadStatus = true
            if (res.code === 0) {
                this.categories = res.data
            }
        })
    }
}
</script>

<style lang="scss" scoped>
#blogMain {
  position: relative;
  top: -1px;
  background: #fff;
  .categories {
    flex-wrap: wrap;
    li {
      margin: 1px 8px 8px 8px;
      a {
        display: block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        background-color: #fff;
        border-radius: 4px;
        color: #8d8d8d;
        border: 1px solid #e6e6e6;
        &.cur {
          color: #fff;
          background-color: #1ed9be;
          border: 1px solid #1ed9be;
        }
        &.u_hover_active_bg:hover {
          color: #fff;
          border: 1px solid #1ed9be;
        }
      }
    }
  }
}
</style>

