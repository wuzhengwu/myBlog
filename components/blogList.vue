<template>
    <div>
        <article-form ref="diaLog" />
        <el-table class-name="asdf" :data="tableData.slice((currentPage-1)*pagesize, currentPage*pagesize)" border style="width: 100%">
            <el-table-column prop="title" label="标题" width="180"></el-table-column>
            <el-table-column prop="categories" label="分类" width="70"></el-table-column>
            <el-table-column prop="browsing" label="浏览量" width="70" align="center"></el-table-column>
            <el-table-column prop="creation_at" label="创建时间" width="120">
                <template slot-scope="scope">
                    {{ scope.row.creation_at | dateFormat('YYYY-MM-DD') }}
                </template>
            </el-table-column>
            <el-table-column prop="update_at" label="更改时间" width="120">
                <template slot-scope="scope">
                    {{ scope.row.creation_at | dateFormat('YYYY-MM-DD') }}
                </template>
            </el-table-column>
            <el-table-column prop="release" label="状态" width="80">
                <template slot-scope="scope">
                    {{ scope.row.release ? '发布': '未发布' }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="update(scope.row)" type="text">修改</el-button>
                    <el-button @click="remove(scope.row)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination small layout="prev, pager, next" :total="total" :page-size="pagesize" @current-change="currentChange"></el-pagination>
    </div>
</template>

<script>
import articleForm  from '~/components/articleForm'

export default {
    components:{
        articleForm
    },
    data(){
        return{
            tableData: [],
            currentPage: 1,
            pagesize: 6,
            total: 0,
        }
    },
    created(){
        this.getBlogList()
    },
    methods:{
        getBlogList(){
            this.$axios.post('/api/getArticlesList').then(res => {
                if(res.code === 0){
                    this.tableData = res.data.data
                    this.total = res.data.data.length
                }
            })
        },
        update(row){
            let dataForm = {}
                dataForm._id = row._id
                dataForm.title = row.title
                dataForm.release = row.release
                dataForm.categories = row.categories
                dataForm.image_src = row.image_src
                dataForm.describe = row.describe
                dataForm.content = row.content
                dataForm.type = 'update'

            this.$refs.diaLog.form = dataForm
            this.$refs.diaLog.dialogFormVisible = true
        },
        remove(row){
            this.$axios.post('/api/deleteArticle', {id: row._id}).then(res => {
                if(res.code === 0){
                    this.$message({ type: 'success', title: res.message })
                    this.getBlogList()
                }else{
                    this.$message({ type: 'error', title: res.message })
                }
            })
        },
        currentChange(currentPage){
            this.currentPage = currentPage
        }
    }
}
</script>

<style lang="scss" scoped>
.el-table{
    height: 500px;
}
</style>

