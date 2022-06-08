<template>
  <div>
    <!-- 头部 -->
    <!-- <div class="header_box">
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
                    <Icon type="user" v-if="!avatarUrl" />
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
        </div> -->
    <!-- 导航 -->
    <header class="header_box_navBar" ref="navBar">
      <ul>
        <div style>
          <span href @click="change_showmenu">
            <Icon :type="showmenu ? 'close' : 'setting'" />
          </span>
          <span :class="'iconfont' + weather" style="color: white"></span>
        </div>
        <div ref="navBar_ul" style="display: flex">
          <li @click="goRouter('/home')" name="home">
            <Icon type="home" style="margin-right: 2px" />首 页
          </li>
          <li name="frontend" @click="goRouter('/content/frontend')">前 端</li>
          <li name="backend" @click="goRouter('/content/backend')">后 端</li>
          <li name="android" @click="goRouter('/content/android')">安 卓</li>
          <li name="news" @click="goRouter('/content/news')">我 的 生 活</li>
          <li>
            <Icon
              type="edit"
              style="font-size: 14px; color: white"
              title="写文章"
              @click="goRouter('/upload_article')"
            />
          </li>
        </div>
      </ul>
    </header>
    <!-- 返回头部 -->
    <div
      class="back_top animate__animated animate__fadeInDown"
      v-if="show_backtop"
      @click="backtop"
    >
      <span
        class="iconfont icon-icon--fanhuidingbu text-2xl"
      ></span>
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
import { getWeather, weather_json } from "../../api/weather";
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
      weather: "",
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

  async created() {
    const res = await getWeather();
    const arr = Object.keys(weather_json);
    Array.from(res.data.data[0].wea_day).forEach((item) => {
      if (arr.indexOf(item) > -1) {
        this.weather = weather_json[item];
      }
    });
  },
  computed: {
    scrolltop() {
      return this.$store.state.scroll.scrollTop;
    },
    path() {
      return this.$route.path;
    },
    avatarUrl() {
      return this.$store.state.userInfo.userInfo.avatarUrl;
    },
  },
  watch: {
    scrolltop: {
      handler(newval, oldval) {
        if (newval >= oldval ||  newval<document.body.scrollHeight*0.2) {
          this.show_backtop = false;
        } else {
          this.show_backtop = true;
        }
      },
    },
    path: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          Array.from(this.$refs.navBar_ul.children).find((item) => {
            if (
              item.getAttribute("name") == this.$route.params.module ||
              item.getAttribute("name") == this.$route.name
            ) {
              item.className = "selete_navBar";
            } else {
              item.className = "hvr-underline-from-center";
            }
          });
        });
      },
    },
  },
  mounted() {
    document.getElementsByTagName("head")[0].children[3].innerText = "Flechazo";
    window.onmousewheel = document.onmousewheel = wheel; //W3C
    //统一处理滚轮滚动事件
    function wheel(event) {
      var delta = 0;
      if (!event) event = window.event;
      if (event.wheelDelta) {
        //IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta; //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
      } else if (event.detail) {
        //FF浏览器使用的是detail,其值为“正负3”
        delta = -event.detail / 3;
      }
      if (delta) handle(delta);
    }
    //上下滚动时的具体处理函数
    const handle = (delta) => {
      if (this.$route.path !== "/home") return;
      if (delta < 0) {
        //向下滚动
        if (this.scrolltop > 200) {
          this.$refs.navBar.className =
            "header_box_navBar animate__fadeOutUp animate__animated ";
        }
      } else {
        this.$refs.navBar.className =
          "header_box_navBar animate__fadeInDown animate__animated ";
      }
    };
  },
};
</script>
<style scoped lang="less">
.navBar_show {
  color: rgba(0, 0, 0, 0.87);
}
</style>
