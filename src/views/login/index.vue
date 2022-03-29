<template>
    <div class="animate__animated animate__fadeIn">
        <div class="container">
            <div class="bg_text">Do what you like</div>
            <div class="screen">
                <div class="screen__content">
                    <form class="login" ref="login" >
                        <div class="login__field">
                            <i class="login__icon">
                                <Icon type="user" />
                            </i>
                            <input
                                type="text"
                                class="login__input"
                                placeholder="Phone / Email"
                                v-model="username"
                                autocomplete
                            />
                        </div>
                        <div class="login__field">
                            <i class="login__icon">
                                <Icon type="lock" />
                            </i>
                            <input
                                type="password"
                                class="login__input"
                                :placeholder="is_code_login ? 'Verification code' : 'Password'"
                                v-model="password"
                                autocomplete
                            />
                            <div
                                v-if="is_code_login"
                                class="get_code"
                                @click="get_code"
                            >{{is_get_code ? code_time+'秒' : '获取验证码'}}</div>
                        </div>
                        <div
                            class="login__field animate__animated animate__fadeInDown"
                            v-if="!is_login"
                        >
                            <i class="login__icon">
                                <Icon type="lock" />
                            </i>
                            <input
                                type="password"
                                class="login__input"
                                placeholder="RePassword"
                                autocomplete
                            />
                        </div>
                        <button
                            class="button login__submit"
                            ref="login__submit"
                            @click="login_register($event)"
                        >
                            <span class="button__text">{{is_login ? 'Log In Now' : 'register'}}</span>
                            <i class="button__icon fas fa-chevron-right">
                                <Icon type="right" />
                            </i>
                        </button>
                    </form>
                    <div class="checkout_form">
                        <Icon type="home" style="color:black" @click="goRouter('/home')" />
                        <span
                            style=" cursor: pointer;"
                            @click="checkout_form"
                        >{{is_login ? '没有账号？去注册':'已有账号？去登陆'}}</span>
                    </div>
                    <div
                        style="padding:0 30px;text-align:right;font-size:12px;color:white;font-weight:900"
                        v-if="is_login"
                    >
                        <span
                            class="check_loginmethods"
                            @click="()=>{is_code_login = !is_code_login}"
                        >{{is_code_login ? '密码登陆' : '验证码登陆'}}</span>
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
        <!-- <Footer :show_footer="true" /> -->
        <Alert
            style="position:fixed;top:50px;left:50%;transform: translateX(-58px);"
            :message="alert_message"
            :type="alert_type"
            show-icon
            v-if="alert_visible"
        />
    </div>
</template>

<script>
import { Icon, Alert } from "ant-design-vue";

import { Login } from "../../api/login";
import {Register} from '../../api/register'
export default {
    name: "login",
    components: {
        Icon,
        Alert,
    },
    data() {
        return {
            is_login: true,
            is_code_login: false,
            username: "123",
            password: "456",
            is_get_code: false,
            code_time: 59,
            alert_visible: false,
            alert_options: {
                alert_message: "",
                alert_type: "",
            },
        };
    },
    methods: {
        message(msg, type) {
            this.alert_message = msg;
            this.alert_type = type;
            this.alert_visible = true;
        },
        checkout_form() {
            this.$refs.login__submit.className = "button login__submit";
            setTimeout(() => {
                this.$refs.login__submit.className +=
                    " animate__animated animate__flipInX";
            }, 1);
            if (this.is_login) {
                this.is_code_login = false;
            }
            if(this.is_login){
               this.username= "",
            this.password= ""
            }
            this.is_login = !this.is_login;
        },
        login_register($event) {
            $event.preventDefault();
            if (this.is_login) {
                let {username,password,message,goRouter} = this
                if (username && password) {
                    Login(username, password).then((data) => {
                        if (data.data.code == 200) {
                            this.$store.commit('userInfo/SAVE_USERINFO',data.data.userInfo);
                            message("登录成功", "success");
                            let gohometimer = setTimeout(() => {
                                goRouter("/home");
                                this.alert_visible = false;
                                clearTimeout(gohometimer);
                            }, 1000);
                        } else {
                            message(data.data.message, "error");
                            let gohometimer = setTimeout(() => {
                                this.alert_visible = false;
                                clearTimeout(gohometimer);
                            }, 1000);
                        }
                    });
                } else {
                    // this.$message.error('请输入')
                    alert("请输入账号或密码");
                }
                return;
            }
            // 下面是注册时的代码
            Register(this.username,this.password).then((data)=>{
                console.log(data);
            })
        },
        // 获取登陆验证码
        get_code() {
            if (this.is_get_code) return;
            this.is_get_code = true;
            let get_code_timer = setInterval(() => {
                this.code_time--;
                if (this.code_time == -1) {
                    this.is_get_code = false;
                    this.code_time = 59;
                    clearInterval(get_code_timer);
                }
            }, 1000);
        },
    },
};
</script>

<style scoped>
@import url("./login.css");
.checkout_form {
    width: 360px;
    padding: 0 30px;
    text-align: right;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 600;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
}
.checkout_form span:hover {
    color: white;
}
.get_code {
    font-size: 12px;
    font-weight: 900;
    color: white;
    margin-top: 10px;
    background: #00000052;
    width: 70px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
}
.check_loginmethods {
    cursor: pointer;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.8);
}
.check_loginmethods:hover {
    color: white;
}
</style>