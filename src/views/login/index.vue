<template>
    <div class="animate__animated animate__fadeIn flex justify-center items-center h-screen login_box">
            <div class="screen rounded-2xl">
                <div class="screen__content rounded-2xl">
                    <form class="login rounded-2xl" ref="login">
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
                                v-model="Repassword"
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
                                <Icon type="loading" v-if="loadindg"/>
                                <Icon type="right" v-else/>
                            </i>
                        </button>
                    </form>
                    <div class="checkout_form">
                        <!-- <Icon type="home" style="color:black" @click="goRouter('/home')" /> -->
                        <div  @click="goRouter('/home')" class=" cursor-pointer"><svg t="1656665342613" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7876" width="20" height="20"><path d="M883.2 610.133333c-4.266667 0-12.8 0-17.066667-4.266666-8.533333-8.533333-8.533333-21.333333 0-29.866667 8.533333-8.533333 17.066667-25.6 17.066667-42.666667s-4.266667-34.133333-17.066667-42.666666l-320-375.466667c-21.333333-21.333333-59.733333-21.333333-81.066666 0L128 490.666667c-12.8 12.8-17.066667 25.6-17.066667 42.666666s4.266667 34.133333 17.066667 42.666667c8.533333 8.533333 8.533333 21.333333 0 29.866667s-21.333333 8.533333-29.866667 0c-17.066667-17.066667-29.866667-42.666667-29.866666-72.533334s8.533333-55.466667 29.866666-72.533333L435.2 85.333333c38.4-38.4 102.4-38.4 140.8 0l320 375.466667c17.066667 17.066667 25.6 42.666667 25.6 72.533333s-8.533333 55.466667-29.866667 72.533334c4.266667 4.266667-4.266667 4.266667-8.533333 4.266666zM401.066667 998.4c-12.8 0-21.333333-8.533333-21.333334-21.333333v-273.066667c0-51.2 38.4-89.6 89.6-89.6h76.8c51.2 0 89.6 38.4 89.6 89.6v209.066667c0 12.8-8.533333 21.333333-21.333333 21.333333s-21.333333-8.533333-21.333333-21.333333v-209.066667c0-25.6-21.333333-46.933333-46.933334-46.933333H469.333333c-25.6 0-46.933333 21.333333-46.933333 46.933333v273.066667c0 12.8-8.533333 21.333333-21.333333 21.333333z" fill="#7162AD" p-id="7877"></path><path d="M768 806.4c-12.8 0-21.333333-8.533333-21.333333-21.333333v-217.6h136.533333c12.8 0 21.333333 8.533333 21.333333 21.333333s-8.533333 21.333333-21.333333 21.333333h-93.866667v174.933334c0 12.8-8.533333 21.333333-21.333333 21.333333zM238.933333 913.066667c-12.8 0-21.333333-8.533333-21.333333-21.333334v-281.6H123.733333c-12.8 0-21.333333-8.533333-21.333333-21.333333s8.533333-21.333333 21.333333-21.333333h136.533334v324.266666c0 12.8-8.533333 21.333333-21.333334 21.333334z" fill="#7162AD" p-id="7878"></path><path d="M401.066667 998.4H324.266667c-59.733333 0-106.666667-46.933333-106.666667-106.666667v-42.666666c0-12.8 8.533333-21.333333 21.333333-21.333334s21.333333 8.533333 21.333334 21.333334v42.666666c0 34.133333 29.866667 64 64 64h76.8c12.8 0 21.333333 8.533333 21.333333 21.333334s-8.533333 21.333333-21.333333 21.333333z" fill="#7162AD" p-id="7879"></path><path d="M682.666667 998.4h-68.266667c-12.8 0-21.333333-8.533333-21.333333-21.333333s8.533333-21.333333 21.333333-21.333334H682.666667c34.133333 0 64-29.866667 64-64v-42.666666c0-12.8 8.533333-21.333333 21.333333-21.333334s21.333333 8.533333 21.333333 21.333334v42.666666c0 59.733333-46.933333 106.666667-106.666666 106.666667z" fill="#A495FC" p-id="7880"></path></svg></div>
                        <span
                            style="cursor: pointer;"
                            @click="checkout_form"
                        >{{is_login ? '没有账号？去注册':'已有账号？去登陆'}}</span>
                    </div>
                    <div
                        style="padding:0 30px;text-align:right;font-size:12px;color:#ccc;font-weight:900"
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
</template>

<script>
import { Icon } from "ant-design-vue";

import { Login,getCode } from "../../api/login";
import { Register } from "../../api/register";
export default {
    name: "login",
    components: {
        Icon,
    },
    data() {
        return {
            is_login: true,
            is_code_login: false,
            username: "",
            password: "",
            Repassword:'',
            is_get_code: false,
            code_time: 59,
            loadindg:false
        };
    },
    created(){
      this.$store.commit('change_show_header',false)
      this.$store.commit('change_isfixed',0)
    },
    methods: {
        checkout_form() {
            this.$refs.login__submit.className = "button login__submit";
            setTimeout(() => {
                this.$refs.login__submit.className +=
                    " animate__animated animate__flipInX";
            }, 1);
            if (this.is_login) {
                this.is_code_login = false;
            }
            if (this.is_login) {
                (this.username = ""), (this.password = "");
            }
            this.is_login = !this.is_login;
        },
        login_register($event) {
            $event.preventDefault();
            if(this.is_code_login){//验证码登录
                let { username, password } = this;
                const code = password
                this.loadindg = true
                if (username && code) {
                    this.loadindg = true
                    Login(username, code,'code').then((data) => {
                        if (data.data.code == 200) {
                            let gohometimer = setTimeout(() => {
                                this.miniMessage(data.data.msg,'success') .then(() => {
                                  this.loadindg =false
                                    this.$store.commit(
                                        "userInfo/SAVE_USERINFO",
                                        data.data.userInfo
                                    );
                                    this.$router.back()
                                });
                                clearTimeout(gohometimer);
                            }, 1000);
                        } else {
                            let gohometimer = setTimeout(() => {
                                this.loadindg =false
                                this.miniMessage(data.data.msg,'error');
                                clearTimeout(gohometimer);
                            }, 1000);
                        }
                    });
                } else {
                    this.miniMessage("请输入账号或验证码",'error');
                }
                return 
            }
            if (this.is_login) {
                let { username, password } = this;
                if (username && password) {
                    this.loadindg = true
                    Login(username, password).then((data) => {
                        if (data.data.code == 200) {
                            let gohometimer = setTimeout(() => {
                                this.miniMessage(data.data.msg,'success') .then(() => {
                                  this.loadindg =false
                                    this.$store.commit(
                                        "userInfo/SAVE_USERINFO",
                                        data.data.userInfo
                                    );
                                    this.$router.back()
                                });
                                clearTimeout(gohometimer);
                            }, 1000);
                        } else {
                            let gohometimer = setTimeout(() => {
                                this.loadindg =false
                                this.miniMessage(data.data.msg,'error');
                                clearTimeout(gohometimer);
                            }, 1000);
                        }
                    });
                } else {
                    this.miniMessage("请输入账号或密码",'error');
                }
                return;
            }
            if(!/^1[3-9]{1}[0-9]{9}$/.test(this.username) && !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/.test(this.username) ){
                  this.miniMessage('请输入正确的手机号或邮箱','error')
                  return
            }
            if(!this.password){
              this.miniMessage('请输入密码','error')
              return
            }
            if(this.Repassword !== this.password){
                  this.miniMessage('两次密码不一样','error')
                  return
            }
            // 下面是注册时的代码
            this.loadindg = true
            Register(this.username, this.password).then((res) => {
                this.loadindg =false
                if (res.data.code == 200) {
                    this.miniMessage(res.data.msg,'success').then(() => {
                        this.is_login = true;
                    });
                }
                if(res.data.code == 300){
                  this.miniMessage(res.data.msg,'error')
                }
            });
        },
        // 获取登陆验证码
        async get_code() {
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
            const data = await getCode(this.username)
            
            const Toast = this.$Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 60000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", this.$Swal.stopTimer);
              toast.addEventListener("mouseleave", this.$Swal.resumeTimer);
            },
            });
            Toast.fire({
                icon: 'success',
                title: '请复制你的验证码登录，一分钟内有效' + data.data,
            });
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
    color: #ccc;
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
    background: #7f7cb9;
    border-radius: 8px;
    width: 70px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
}
.check_loginmethods {
    cursor: pointer;
    font-size: 12px;
    color: #ccc
}
.check_loginmethods:hover {
    color: white;
}
</style>
