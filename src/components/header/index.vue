<template>
    <div>
        <!-- 头部 -->
        <div class="header_box">
            <div class="header_box_top">
                <div class="logo">
                    <img src="../../assets/logo.png" alt />
                </div>
                <div class="options">
                    <ul>
                        <li>
                            Layouts
                            <Icon type="down" style="margin-left: 2px" />
                        </li>
                        <li>
                            Document
                            <Icon type="container" style="margin-left: 2px" />
                        </li>
                        <li>
                            Search
                            <Icon type="search" style="margin-left: 2px" />
                        </li>
                    </ul>
                    <div class="Login_in" v-if="!avatarUrl" style="font-size:12px" @click="goRouter('/login')">Login in</div>
                    <Icon type='user' v-else-if='avatarUrl == 1'/>
                   <img  :src="avatarUrl" alt=""  v-else class="avatarUrl" title="用户头像" @click="()=>{showmenu=true}">
                </div>
            </div>
        </div>
        <!-- 导航 -->
        <div style="height: 54px">
            <div class="header_box_navBar" ref="navBar">
                <ul>
                    <li>
                        <Icon type="home" style="margin-right: 2px" />Home
                        <Icon type="down" style="margin-left: 2px" />
                    </li>
                    <li>Traver</li>
                    <li>Guides</li>
                    <li>Food</li>
                    <li>Hotels</li>
                    <li>Review</li>
                    <li>Healthy</li>
                    <li>Lifestyle</li>
                    <div style="color: blue; position: relative; left: 390px">
                        <span class="iconfont icon-yueliang" style="color: #5869da"></span>
                        <span href @click="showmenu = !showmenu">
                            <Icon :type="showmenu ?'close' : 'setting'" />
                        </span>
                    </div>
                </ul>
            </div>
        </div>
        <!-- 返回头部 -->
        <div
            class="back_top animate__animated animate__fadeInDown"
            v-if="show_backtop"
            @click="backtop"
        >
            <span class="iconfont icon-icon--fanhuidingbu" style="font-size: 25px"></span>
        </div>
        <!-- 遮罩层 -->
        <div class="Mask" v-if="showmenu" @click="change_showmenu"></div>
        <!-- 菜单 -->
        <MoreMenu :showmenu="showmenu" @change_showmenu="change_showmenu" />
    </div>
</template>

<script>
import "./header.css";
// import "animate.css";
import { getWeather } from "../../api/weather";
import { Icon } from "ant-design-vue";

import MoreMenu from '../MoreMenu/index.vue' 
export default {
    name: "Header",
    components: {
        Icon,
        MoreMenu
    },
    data() {
        return {
            show_backtop: false,
            showmenu: false,
            avatarUrl:''
        };
    },
    methods: {
        backtop() {
            this.timer = setInterval(() => {
                document.documentElement.scrollTop -= 12;
                if (document.documentElement.scrollTop == 0) {
                    clearInterval(this.timer);
                }
            }, 1);
        },
        change_showmenu(){
            this.showmenu = !this.showmenu
        }
    },
    created() {
        // getWeather();
    },
    computed:{
        scrolltop(){
            return this.$store.state.scroll.scrollTop
        }
    },
    watch: {
        scrolltop: {
            handler(newval){
            if (newval >= 180) {
                this.$refs.navBar.style.position = "fixed";
                this.$refs.navBar.style.top = 0;
                this.$refs.navBar.className =
                    "header_box_navBar animate__animated animate__fadeInDown";
                this.show_backtop = true;
            } else {
                this.$refs.navBar.style.position = "";
                this.$refs.navBar.className = "header_box_navBar";
                this.show_backtop = false;
            }
        }
        }
    },
    mounted(){
        this.avatarUrl = this.$store.state.userInfo.userInfo ? this.$store.state.userInfo.userInfo.avatarUrl : ''
    }
};
</script>
<style scoped>
.avatarUrl{
    width: 35px;
    height: 35px;
    border-radius: 50%;
}
</style>
