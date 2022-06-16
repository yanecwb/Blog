<template>
  <div>
    <!-- 头部v_1.0 -->
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
    <!-- 导航PC -->
    <header
      class="header_box_navBar h-8 md:h-14"
      ref="navBar"
      v-if="!$store.state.is_phone"
    >
      <ul>
        <div style>
          <span href @click="change_showmenu">
            <Icon :type="showmenu ? 'close' : 'setting'"  class="text-xs md:text-xl mr-1"/>
          </span>
          <span :class="'text-xs md:text-xl iconfont' + weather"></span>
        </div>
        <div ref="navBar_ul" class="flex text-xs md:text-base">
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
              @click="go_up_article()"
            />
          </li>
        </div>
      </ul>
    </header>

    <header class="header_box_navBar h-8 md:h-14" ref="navBar" v-else>
      <ul>
        <div>
          <Icon type="menu" @click="visible = true" />
          <div class="text-black">
            <Drawer
              title=" "
              :placement="'top'"
              :closable="false"
              :visible="visible"
              width="100vw"
              @close="visible = false"
            >
              <div class="flex text-base justify-between w-full font-bold">
                <Dropdown>
                <a class="ant-dropdown-link animate__animated animate__zoomIn" @click="(e) => {e.preventDefault();visible = false;goRouter('/home') }" >
                  Home <Icon type="home" />
                </a>
              </Dropdown>
              <Dropdown>
                <a class="ant-dropdown-link animate__animated animate__zoomIn" @click="(e) =>{e.preventDefault();visible = false;goRouter('/content/frontend') }">
                  前端
                </a>
              </Dropdown>
              <Dropdown>
                <a class="ant-dropdown-link animate__animated animate__zoomIn" @click="(e) => {e.preventDefault();visible = false;goRouter('/content/backend')}">
                  后端 <Icon type="edit" />
                </a>
              </Dropdown>
              <Dropdown>
                <a class="ant-dropdown-link animate__animated animate__zoomIn" @click="(e) => {e.preventDefault();visible = false;goRouter('/content/android')}">
                  安卓 <Icon type="edit" />
                </a>
              </Dropdown>
              </div>
            </Drawer>
          </div>
        </div>
        <div>
          <span :class="'iconfont' + weather + ' text-sm'"></span>
          <span href @click="change_showmenu">
            <Icon :type="showmenu ? 'close' : 'setting'" class="text-sm" />
          </span>
        </div>
      </ul>
    </header>
    <!-- 返回头部 -->
    <div
      class="back_top animate__animated animate__fadeInDown"
      v-if="show_backtop"
      @click="backtop"
    >
      <span class="iconfont icon-icon--fanhuidingbu text-2xl"></span>
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
import { Icon, Drawer, Dropdown, Menu } from "ant-design-vue";
import Vue from 'vue'
Vue.component(Menu.Item.name, Menu.Item)//想要用a-menu-item 组件必须引入,不然会报错
import MoreMenu from "../MoreMenu/index.vue";
export default {
  name: "Header",
  components: {
    Icon,
    Drawer,
    MoreMenu,
    Menu,
    Dropdown,
  },
  data() {
    return {
      show_backtop: false,
      showmenu: false,
      weather: "",
      visible: false,
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
    console.log(this.$router.options.routes);
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
        if (newval >= oldval || newval < document.body.scrollHeight * 0.2) {
          this.show_backtop = false;
        } else {
          this.show_backtop = true;
        }
      },
    },
    path: {
      immediate: true,
      handler() {
        if(this.$store.state.is_phone) return
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
            "header_box_navBar h-8 md:h-14 animate__fadeOutUp animate__animated ";
        }
      } else {
        this.$refs.navBar.className =
          "header_box_navBar h-8 md:h-14 animate__fadeInDown animate__animated ";
      }
    };
  },
};
</script>
<style lang="less">
.ant-drawer-content{
  height: auto !important;
}
.ant-drawer-header {
  background-image: url(http://47.107.243.60:5003/img/static_img/fan_girl.gif) !important;
  // background-image: url(http://hbimg.huabanimg.com/0a3092f963efddf5a28e420f2b6edd223dcde5ad197cf3-EOb0OK_fw658.gif) !important;
  background-size: 100% 100% !important;
  height: 125px;
}
.navBar_show {
  color: rgba(0, 0, 0, 0.87);
}
.ant-dropdown-link{
  position: relative;
        color:#394867;
        &::before{
          content: attr(text);
        position: absolute;
        z-index: 10;
        color:pink;
        -webkit-mask:linear-gradient(to left, red, transparent );
        }
}
</style>
