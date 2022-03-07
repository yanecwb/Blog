<template>
    <div>
        <div class="container">
            <div class="bg_text">Do what you like</div>
            <div class="screen">
                <div class="screen__content">
                    <form class="login" ref="login">
                        <div class="login__field">
                            <i class="login__icon">
                                <Icon type="user" />
                            </i>
                            <input type="text" class="login__input" placeholder="User name / Email" />
                        </div>
                        <div class="login__field">
                            <i class="login__icon">
                                <Icon type="lock" />
                            </i>
                            <input type="password" class="login__input" placeholder="Password" />
                        </div>
                         <div class="login__field" v-if="!is_login">
                            <i class="login__icon">
                                <Icon type="lock" />
                            </i>
                            <input type="password" class="login__input" placeholder="RePassword" />
                        </div>
                        <button
                            class="button login__submit"
                            ref="login__submit"
                            @click="login_register($event)"
                        >
                            <span class="button__text">{{is_login ? 'LogIn Now' : 'register'}}</span>
                            <i class="button__icon fas fa-chevron-right">
                                <Icon type="right" />
                            </i>
                        </button>
                    </form>
                    <div class="checkout_form">
                        <Icon type="home" style="color:black" @click="goRouter('/home')"/>
                        <span style=" cursor: pointer;"@click="checkout_form"
                        >{{is_login ? '没有账号？去注册':'已有账号？去登陆'}}</span>
                    </div>
                </div>
                <div class="screen__background">
                    <span class="screen__background__shape screen__background__shape4"></span>
                    <span class="screen__background__shape screen__background__shape3"></span>
                    <span class="screen__background__shape screen__background__shape2"></span>
                    <span class="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
        <Footer :show_footer="true" />
    </div>
</template>

<script>
import Footer from "../../components/footer/index.vue";
import { Icon } from "ant-design-vue";
export default {
    name: "login",
    components: {
        Footer,
        Icon,
    },
    data() {
        return {
            is_login: true,
        };
    },
    methods: {
        checkout_form() {
            this.is_login = !this.is_login;
            let deg = 0;
            this.degTimer = setInterval(() => {
                deg += 60;
                this.$refs.login__submit.style.transform =
                    "rotateY(" + deg + "deg)";
                if (deg == 360) {
                    clearInterval(this.degTimer);
                }
            }, 100);
            // this.$refs.login__submit.style.transform='rotateY(180deg)';
        },
        login_register($event){
            $event.preventDefault()
            if(this.is_login){
                console.log('login');
                return
            }
            console.log('register');
        }
    },
};
</script>

<style scoped>
@import url("./login.css");
.checkout_form {
    width: 360px;
    padding: 0  30px;
    text-align: right;
    color: white;
    font-weight: 900;
    display: flex;
    justify-content: space-between;
}
.checkout_form span:hover{
    color: #2d14e9;
}
</style>