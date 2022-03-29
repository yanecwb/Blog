<template>
    <div>
        <!-- 头部 -->
        <div class="header_box">
            <div class="header_box_top">
                <div class="logo" @click="goRouter('/home')">
                    <img src="../../assets/Blog_logo.png" alt />
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
                        <li @click="goRouter('/about_me')">
                            关于我
                            <Icon type="search" style="margin-left: 2px" />
                        </li>
                    </ul>
                    <div
                        class="Login_in"
                        v-if="!avatarUrl"
                        style="font-size:12px"
                        @click="goRouter('/login')"
                    >Login in</div>
                    <Icon type="user" v-else-if="avatarUrl == 1" />
                    <img
                        :src="avatarUrl"
                        alt
                        v-else
                        class="avatarUrl"
                        title="用户头像"
                        @click="()=>{showmenu=true}"
                    />
                </div>
            </div>
        </div>
        <!-- 导航 -->
        <div style="height: 54px">
            <div class="header_box_navBar" ref="navBar">
                <ul ref="navBar_ul">
                    <template>
                        <li @click="goRouter('/home')" name="home">
                            <Icon type="home" style="margin-right: 2px" />首页
                        </li>
                        <li name="frontend" @click="goRouter('/content/frontend')">前端</li>
                        <li name="backend" @click="goRouter('/content/backend')">后端</li>
                        <li name="android"  @click="goRouter('/content/android')">安卓</li>
                        <li name="news"  @click="goRouter('/content/news')">其他资讯</li>
                    </template>
                    <div style=" position: relative; left: 707px">
                        <span class="iconfont icon-yueliang" style="color: #00a0e9"></span>
                        <span href @click="showmenu = !showmenu">
                            <Icon :type="showmenu ? 'close' : 'setting'" />
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

import MoreMenu from "../MoreMenu/index.vue";
export default {
    name: "Header",
    components: {
        Icon,
        MoreMenu,
    },
    data() {
        return {
            show_backtop: false,
            showmenu: false,
            avatarUrl: "",
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
        change_showmenu() {
            this.showmenu = !this.showmenu;
        },
    },
    created() {
        getWeather();
    },
    computed: {
        scrolltop() {
            return this.$store.state.scroll.scrollTop;
        },
        path() {
            return this.$route.path;
        },
    },
    watch: {
        scrolltop: {
            handler(newval) {
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
            },
        },
        path(path) {
            Array.from(this.$refs.navBar_ul.children).find((item) => {
                    if(item.getAttribute("name") == this.$route.params.module || item.getAttribute("name") == this.$route.name){
                        item.className = 'selete_navBar'
                    }else{
                        item.className = ''
                    }
                });
        },
    },
    mounted() {
        this.avatarUrl = this.$store.state.userInfo.userInfo
            ? this.$store.state.userInfo.userInfo.avatarUrl
            : "";
    },
};
</script>
<style scoped lang='less'>
</style>
