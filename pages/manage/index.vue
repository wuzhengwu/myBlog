<template>
    <div id="manage">
        <loading :load-status="loadStatus"/>
        <header-box :header-data="headerData"/>
        <div class="manageMain g-r-center">
            <section class="container">
                <el-tabs v-model="activeName" :before-leave="tabClick">
                    <el-tab-pane label="分类列表" name="first">
                        <category-list />
                    </el-tab-pane>
                    <el-tab-pane label="博客列表" name="second">
                        <blog-list />
                    </el-tab-pane>
                    <el-tab-pane label="七牛资源列表" name="three">
                        <qiniu-list ref="qiniuLists" />
                    </el-tab-pane>
                </el-tabs>
            </section>
        </div>
        <footer-box />
    </div>
</template>

<script>
import loading from '~/components/loading'
import headerBox from '~/components/header'
import footerBox from '~/components/footer'
import categoryList from '~/components/categoryList'
import blogList from '~/components/blogList'
import qiniuList from '~/components/qiniuList'

export default {
    components: {
        loading,
        headerBox,
        footerBox,
        categoryList,
        blogList,
        qiniuList,
    },
    data(){
        return{
            loadStatus: false, // 加载状态。false：加载中。true：加载完成。
            headerData: {
                title: '',
                isStatic: true,
                type: 'logins'
            },
            activeName: 'first'
        }
    },
    created(){
        if(process.browser){
            if(!sessionStorage.token || !sessionStorage.isLogin){
                this.$router.push({path: '/login'});
            }else{
                this.loadStatus = true
            }
        }
    },
    methods: {
        tabClick(activeName, oldActiveName){
            if(activeName === 'three'){
                this.$refs.qiniuLists.getQiniuList()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.manageMain{
    padding-top: 12vh;
    .container{
        height: calc(88vh - 100px);
    }
}
</style>

