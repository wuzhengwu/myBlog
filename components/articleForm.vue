<template>
    <div style="margin-bottom: 15px">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-dialog title="博客内容" :visible.sync="dialogFormVisible" fullscreen :before-close="dialogFormClose">
            <el-form :model="form" :rules="rules" ref="ruleForm" style="width: 50vw;float:left;">
                <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="发布" :label-width="formLabelWidth">
                    <el-switch v-model="form.release"></el-switch>
                </el-form-item>
                <el-form-item label="分类" :label-width="formLabelWidth" prop="categories">
                    <el-select v-model="form.categories" placeholder="请选择分类">
                        <el-option v-for="(item, index) in this.categoriesList" :key="index" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片" :label-width="formLabelWidth">
                    <el-upload
                    class="avatar-uploader"
                    action="http://localhost:8989/api/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                        <img v-if="form.image_src" :src="IMGHOST+form.image_src" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth" prop="describe">
                    <el-input v-model="form.describe" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth">
                    <el-input v-model="form.content" autocomplete="off" type="textarea" resize="none" :autosize="{ minRows: 10, maxRows: 12 }"></el-input>
                </el-form-item>
            </el-form>
            <div id="markDown" v-html="getRawMarkup"></div>
            <div class="clear"></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormClose">取 消</el-button>
                <el-button type="primary" @click="dialogFormSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
const Remarkable = require('remarkable')
const md = new Remarkable()

export default {
    data(){
        return{
            categoriesList: [],
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {
                title: '',
                release: true,
                categories: '',
                image_src: '',
                describe: '',
                content: '',
                type: 'save',
            },
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                    { min: 4, max: 18, message: '长度在 4 到 18 个字符', trigger: 'blur' }
                ],
                categories: [
                    { required: true, message: '请选择分类', trigger: 'change' }
                ],
                describe: [
                    { required: true, message: '请输入描述', trigger: 'blur' },
                    { min: 8, max: 30, message: '长度在 8 到 30 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    computed:{
        ...mapState(['IMGHOST']),
        getRawMarkup(value){
            return md.render(this.form.content)
        }
    },
    created(){
        this.$axios.post('api/getCategoryList')
        .then(res => {
            if (res.code === 0) {
                this.categoriesList = res.data
            }else{
                this.$message.error('分类列表获取失败!');
            }
        })
    },
    methods:{
        handleAvatarSuccess(res, file) {
            this.form.image_src = file.raw.name;
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
        },
        dialogFormSubmit(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.$axios.post('api/operateArticles', this.form).then(res => {
                        if (res.code === 0) {
                            this.dialogFormClose();
                            this.$parent.getBlogList();
                            this.$message({ type: 'success', title: res.message })
                        }else{
                            this.$message({ type: 'error', title: res.message })
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        dialogFormClose(){
            let  categoriesList = this.$data.categoriesList
            Object.assign(this.$data, this.$options.data()) //将data数据恢复到初始状态
            this.$nextTick(() => {
                this.$refs['ruleForm'].resetFields()
                this.categoriesList = categoriesList
            })
            this.dialogFormVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>
.el-input,
.el-textarea,
.el-select{
    width: 35vw;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
}
.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
#markDown{
    width: 45vw;
    float: left;
}
</style>

