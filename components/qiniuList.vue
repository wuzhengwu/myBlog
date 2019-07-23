<template>
    <div>
        <el-upload
        class="upload-image"
        action="http://localhost:8989/api/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
            <el-button type="primary">上传</el-button>
        </el-upload>
        <el-table :data="tableData.slice((currentPage-1)*pagesize, currentPage*pagesize)" border height="500" style="width: 100%">
            <el-table-column prop="img_name" label="文件名" width="240">
                <template slot-scope="scope">
                    {{ scope.row.img_name }}
                </template>
            </el-table-column>
            <el-table-column prop="mimeType" label="文件类型" width="120"></el-table-column>
            <el-table-column prop="fsize" label="文件大小" width="100">
                <template slot-scope="scope">
                    {{ formatFileSize(scope.row.fsize) }} 
                </template>
            </el-table-column>
            <el-table-column prop="putTime" label="上传时间" width="180">
                <template slot-scope="scope">
                    {{ scope.row.putTime/10000 | dateFormat('YYYY-MM-DD hh:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="look(scope.row)" type="text">查看</el-button>
                    <el-button @click="remove(scope.row)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination small layout="prev, pager, next" :total="total" :page-size="pagesize" @current-change="currentChange"></el-pagination>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data(){
        return{
            tableData: [],
            currentPage: 1,
            pagesize: 6,
            total: 0,
        }
    },
    computed: {
        ...mapState(['IMGHOST', 'QN_POSTFIX'])
    },
    created(){
        this.getQiniuList()
    },
    methods:{
        getQiniuList(){
            this.$axios.post('/api/getQiniuList').then(res => {
                if(res.code === 0){
                    this.tableData = res.data.items
                    this.total = res.data.items.length
                }
            })
        },
        look(row){
            this.$alert("<img src=" + this.IMGHOST + row.img_name + this.QN_POSTFIX + "200 alt />", '查看', {
                dangerouslyUseHTMLString: true
            });
        },
        remove(row){
            this.$axios.post('/api/delete_qiniu', {img_name: row.img_name}).then(res => {
                if(res.code === 0){
                    this.$message({ type: 'success', title: res.message })
                    this.getQiniuList()
                }else{
                    this.$message({ type: 'error', title: res.message })
                }
            })
        },
        currentChange(currentPage){
            this.currentPage = currentPage
        },
        formatFileSize(value){
            if (value === 0) return '0 b';
			let k = 1024,
			    sizes = [' B', ' KB', ' MB', ' GB', ' TB'],
			    i = Math.floor(Math.log(value) / Math.log(k));
			 
			return (value / Math.pow(k, i)).toPrecision(3) + sizes[i];
        },
        handleAvatarSuccess(){
            this.getQiniuList()
        },
        beforeAvatarUpload(file) {
            const type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            const fileTypeValid = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
            const isLt1M = file.size / 1024 / 1024 < 1;

            if (!fileTypeValid) {
                this.$message({ type: 'error', title: '上传图片只能是jpg|png|jpeg|gif格式!' })
            }
            if (!isLt1M) {
                this.$message({ type: 'error', title: '上传图片大小不能超过 1MB!' })
            }
            return fileTypeValid && isLt1M;
        }
    }
}
</script>

<style lang="scss" scoped>
.upload-image{
    margin-bottom: 15px;
}
</style>


