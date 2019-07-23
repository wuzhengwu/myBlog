<template>
    <footer id="footer">
        <div class="put-on-record g-c-center">
            <p>
                ©2019-至今&nbsp;&nbsp;吴正武&nbsp;&nbsp;
                <a href="javascript:">浙ICP备19029361号-1</a>
            </p>
            <p>
                感谢
                <a href="https://www.qiniu.com/" target="_blank">七牛云存储</a> 提供图片存储空间
            </p>
            <p>
                服务器、域名购置于
                <a href="https://www.aliyun.com/" target="_blank">阿里云</a>&nbsp;&nbsp;&nbsp;&nbsp;icon图标来源于
                <a href="http://www.iconfont.cn/" target="_blank">阿里巴巴矢量图标库</a>
            </p>
        </div>
    </footer>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
#footer{
    position: relative;
    z-index: 100;
    width: 100%;
    margin-top: -1px;
    overflow: hidden;
    background: -webkit-linear-gradient(45deg, #1e212b, #373b4d);
    background: linear-gradient(45deg, #1e212b, #373b4d);
    .put-on-record {
        height: 100px;
        line-height: 22px;
        color: #cecec4;
        text-align: center;
        font-size: 10px;
        a {
            color: #fff;
        }
    }
}
</style>

