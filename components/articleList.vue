<template>
    <div id="articleList">
        <div class="container">
            <div class="articleList" v-if="articleList.data.length >= 1">
                <article class="u_transition_300"
                    v-for="(item,index) in articleList.data"
                    :key="index">
                    <div class="box">
                        <nuxt-link  class="image"
                        :to="{ path: '/blog/articleDetail', query: {id: item._id, title: item.title} }">
                            <div class="progressive not-loaded"
                                :data-url="IMGHOST+item.image_src+QN_POSTFIX+'500'"
                                :style="item.image_status === 2 ? '' : 'background: url('+IMGHOST+item.image_src+QN_POSTFIX+'100)' ">
                                <img v-if="item.image_status == 0"
                                    style="opacity: 0;"
                                    @load="imgLoad(index,'load');"
                                    @error="imgLoad(index,'error');"
                                    :src="IMGHOST+item.image_src+QN_POSTFIX+'100'" alt />
                                <i class="iconfont icon-codestore"
                                :style="'opacity:'+(item.image_status == 2 ? 1 : 0)"></i>
                            </div>
                        </nuxt-link>
                        <div class="info">
                            <h2>
                                <nuxt-link
                                class="u_transition_300 u_hover_active"
                                href="javaScript: void(0);"
                                :to="{ path: '/blog/articleDetail', query: {id: item._id, title: item.title} }"
                                >{{ item.title }}</nuxt-link>
                            </h2>
                            <strong>{{ item.describe }}</strong>
                            <p>
                                <b class="article_categories">
                                    <a class="u_transition_300 u_hover_active">{{ item.categories }}</a>
                                </b>
                                <nuxt-link
                                class="review u_transition_300 u_hover_active_bg"
                                href="javaScript: void(0);"
                                :to="{ path: '/blog/articleDetail', query: {id: item._id, title: item.title} }"
                                >
                                <i class="iconfont icon-huifu"/>
                                <span class="cy_cmt_count">{{ item.comments.length }}</span>
                                </nuxt-link>
                                <time class="g-c-center">
                                <span class="g-r-center">
                                    <i class="iconfont icon-time"/>
                                    {{ item.creation_at | dateFormat('YYYY/MM/DD') }}
                                </span>
                                <span>
                                    <i class="iconfont icon-chakan"/>
                                    {{ item.browsing }}
                                </span>
                                </time>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
            <div class="noParam" v-if="articleList.data.length <= 0">
                <i class="iconfont icon-zanwushuju"/>
                <p>暂无数据</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { lazyload } from '~/assets/js/utils'

export default {
    props: ['categoriesName', 'initList'],
    data(){
        return{
            articleList: {
                data: []
            }
        }
    },
    computed: {
        ...mapState(['IMGHOST', 'QN_POSTFIX'])
    },
    watch:{
        categoriesName(){
            this.getArticlesList(1)
        }
    },
    created(){
        if(this.initList){
            this.listFormat(this.initList, true)
        }
    },
    mounted(){
        if (this.initList) {
            this.$nextTick(() => {
                new lazyload().init()
            })
        }
    },
    methods:{
        /**
         * 列表格式化
         * @param {data} 数据
         * @param {isFirst} 是否第一次加载
         */
        listFormat(data, isFirst){
            let list = data.data
            
            for (let item of list) {
                item.image_status = 0 // 0：图片未加载  1：图片加载成功  2：图片加载失败
            }

            this.articleList = data

            //DOM渲染完成
            this.$nextTick(() => {
                if (!isFirst) {
                    new lazyload().init()
                }
            })
        },
        /**
         * 获取文章列表
         * @param {Number}  pagr - 分页
         */
        getArticlesList(page) {
            let data = {}

            data['Category'] = this.categoriesName

            // 获取对应文章列表
            this.$axios.post('api/getArticlesList',
                Object.assign({
                    page: page,
                },
                data)
            )
            .then(res => {
                if (res.code == 0) {
                    this.listFormat(res.data)
                }
            })
        },
        /**
         * 图片加载
         * @param {Number} index - 图片下标
         * @param {String} type - 加载类型  load: 成功  error: 加载失败
         */
        imgLoad(index, type) {
            this.articleList.data[index].image_status = type == 'load' ? 1 : 2
        }
    }
}
</script>

<style lang="scss" src="~/assets/css/articleList.scss">
</style>


