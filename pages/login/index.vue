<template>
    <div id="login">
        <header-box :header-data="headerData"/>
        <div class="loginMain g-r-center">
            <section>
                <div class="loginBox clear">
                    <input type="text" ref="username" v-model="username" placeholder="用户名" maxlength="20" @keyup.enter="Login" />
                    <input type="password" ref="password" v-model="password" placeholder="密码" maxlength="20" @keyup.enter="Login" />
                    <button class="logIn" @click="Login" @keyup.enter="Login">Log in</button>
                </div>
            </section>
        </div>
        <footer-box />
    </div>
</template>

<script>
import headerBox from '~/components/header'
import footerBox from '~/components/footer'

export default {
    components: {
        headerBox,
        footerBox,
    },
    data(){
        return{
            headerData: {
                title: '',
                isStatic: true,
                type: 'logins',
            },
            username: '',
            password: ''
        }
    },
    created(){
        if(process.browser){
            if(sessionStorage.token){
                this.$axios.post('/api/isLogin', {token: sessionStorage.token})
                .then(res => {
                    if(res.code === 0){
                        this.$router.push({path: '/manage'});
                    }
                })
            }
        }
    },
    methods:{
        Login(){
            let userName = this.username,
                passWord = this.password

            if(!userName){
                this.$message({ type: 'error', title: '用户名不能为空' });
                this.$refs.username.focus();
                return
            }
            if(!passWord){
                this.$message({ type: 'error', title: '密码不能为空' });
                this.$refs.username.focus();
                return
            }
            this.$axios.post('/api/login', {username: userName, password: passWord})
            .then(res => {
                if(res.code === 0){
                    sessionStorage.setItem('token', res.data.token);
                    sessionStorage.setItem('isLogin', true);
                    this.$store.commit('checkLogin', res.data.token);
                    this.$store.commit('goLogin');
                    this.$router.push({path: '/manage'});
                }else{
                    this.$message({ type: 'error', title: res.message })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#login{
    .loginMain{
        position: relative;
        background-image: url('~assets/images/blog_index_bg.jpg');
        width: 100vw;
        height: calc(100vh - 100px);
        background-position: center bottom;
        background-repeat: no-repeat;
        background-size: cover;
        .loginBox{
            position: relative;
            width: 100%;
            left: 50%;
            top: 50%;
            margin-left: -50%;
            margin-top: -20%;
            border: 1px solid #1e212b;
            border-radius: 4px;
            box-sizing: border-box;
            padding: 20px;
            input{
                width: 100%;
                height: 36px;
                padding: 6px 10px;
                font-size: 14px;
                font-family: inherit;
                border-bottom: 1px solid #1e212b;
                color: #333;
                margin-bottom: 20px;
            }
            .logIn{
                color: #fff;
                background-color: #1ed9be;
                border-radius: 4px;
                display: block;
                width: 100%;
                height: 35px;
                line-height: 35px;
            }
        }
    }
}
@media (max-width: 767px) {
#login{
    .loginMain{
        .loginBox{
            width: 80%;
            margin-left: -40%;
        }
    }
}
}
</style>

