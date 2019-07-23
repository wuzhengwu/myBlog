<template>
    <div>
        <el-button type="primary" @click="dialogFormVisible" style="margin-bottom: 15px">新增</el-button>
        <el-table :data="tableData.slice((currentPage-1)*pagesize, currentPage*pagesize)" border height="500" style="width: 100%">
            <el-table-column prop="name" label="分类名称" width="240"></el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button @click="remove(scope.row)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination small layout="prev, pager, next" :total="total" :page-size="pagesize" @current-change="currentChange"></el-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData: [],
            currentPage: 1,
            pagesize: 6,
            total: 0,
        }
    },
    created(){
        this.getCategoryList()
    },
    methods:{
        getCategoryList(){
            this.$axios.post('/api/getCategoryList').then(res => {
                if(res.code === 0){
                    this.tableData = res.data
                    this.total = res.data.length
                }
            })
        },
        remove(row){
            this.$axios.post('/api/deleteTag', {id: row._id}).then(res => {
                if(res.code === 0){
                    this.$message({ type: 'success', title: res.message })
                    this.getCategoryList()
                }else{
                    this.$message({ type: 'error', title: res.message })
                }
            })
        },
        currentChange(currentPage){
            this.currentPage = currentPage
        },
        dialogFormVisible(){
           this.$prompt('请输入分类名称', '新增', {
            closeOnClickModal: false,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^(.{2,10})$/,
            inputErrorMessage: '名称长度最少2位，最多10位'
            }).then(({ value }) => {
                this.$axios.post('/api/addCategorys', {name: value}).then(res => {
                    if(res.code === 0){
                        this.getCategoryList()
                    }else{
                        this.$message({ type: 'error', title: res.message })
                    }
                })
            }).catch(() => {
                return      
            });
        }
    }
}
</script>

