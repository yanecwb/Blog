<template>
  <div>
    <!-- 导航PC -->
    <div v-if="!$store.state.is_phone">
      <header class="header_box_navBar h-8 md:h-12 px-2" ref="navBar">
        <ul>
          <div ref="navBar_ul" class="flex text-xs md:text-sm">
            <li @click="goRouter('/home')" name="home">
              <Icon type="home" style="margin-right: 2px" />首 页
            </li>
            <li name="frontend" @click="goRouter('/content/frontend')">
              前 端
            </li>
            <li name="backend" @click="goRouter('/content/backend')">后 端</li>
            <li name="android" @click="goRouter('/content/android')">安 卓</li>
            <li name="news" @click="goRouter('/content/news')">我 的 生 活</li>
            <li name="article" @click="go_up_article()">
              写文章
              <Icon
                type="edit"
                style="font-size: 14px"
                title="写文章"
              />
            </li>
          </div>
          <div class=" flex justify-between items-center">
           <div @click="change_showmenu" class='cursor-pointer w-10 h-10 border-2 border-solid border-gray-100 rounded-full bg-cover hvr-grow-shadow' :style="$store.state.userInfo.userInfo.id ? `background-image:url(${$store.state.userInfo.userInfo.avatarUrl})`  : 'background-image:url(https://img.zcool.cn/community/01b91e5d368512a80120695c617f59.jpg@1280w_1l_2o_100sh.jpg)'">
           </div>
            <!-- <span :class="'text-sm md:text-xl iconfont' + weather" title="今日天气"></span> -->
            <!-- <Icon
              type="eye"
              class="text-xs md:text-base ml-1 h-4"
              v-if="$route.name !== 'home'"
              @click="showHeader(0)"
              title="隐藏导航"
            /> -->
          </div>
        </ul>
      </header>
      <div
        @click="showHeader(1)"
        v-if="visible"
        class="animate__fadeInDown animate__animated border-1 w-6 h-4 flex justify-center items-center rounded-sm fixed top-0"
        style="
          background-image: linear-gradient(to top, #fef9d7 0%, #d299c2 100%);
        "
      >
        <Icon type="down" class="text-xl text-white" title="打开导航" />
      </div>
    </div>

    <!-- Mobile  -->
    <header class="header_box_navBar h-8 md:h-14" ref="navBar" v-else>
      <ul>
        <div>
          <Icon type="menu" @click="MobileshowMenu" />
          <div :class="Mune_left">
            <div
              class="absolute right-3 top-2 z-10 text-xl cursor-pointer"
              @click="MobileshowMenu(1)"
            >
              X
            </div>
            <div
              class="absolute w-full z-999 mt-10 text-base flex flex-col items-center font-serif"
              ref="navBar_ul"
            >
              <div
                class="phone_select"
                name="home"
                @click="
                  () => {
                    goRouter('/home');
                    MobileshowMenu(1);
                  }
                "
              >
                <Icon
                  type="home"
                  style="margin-right: 2px; color: #ffc83d"
                />首页
              </div>
              <div
                class="phone_select"
                name="frontend"
                @click="
                  () => {
                    goRouter('/content/frontend');
                    MobileshowMenu(1);
                  }
                "
              >
                😂前端技术
              </div>
              <div
                class="phone_select"
                name="backend"
                @click="
                  () => {
                    goRouter('/content/backend');
                    MobileshowMenu(1);
                  }
                "
              >
                😉后端技术
              </div>
              <div
                class="phone_select"
                name="android"
                @click="
                  () => {
                    goRouter('/content/android');
                    MobileshowMenu(1);
                  }
                "
              >
                😭安卓技术
              </div>
              <div
                class="phone_select"
                name="news"
                @click="
                  () => {
                    goRouter('/content/news');
                    MobileshowMenu(1);
                  }
                "
              >
                😊我的趣闻
              </div>
              <div
                class="phone_select"
                name="article"
                @click="
                  () => {
                    go_up_article();
                    MobileshowMenu(1);
                  }
                "
              >
                <Icon
                  type="edit"
                  style="font-size: 14px; color: black"
                  title="写文章"
                />写文章
              </div>
            </div>
          </div>
        </div>
        <div>
          <span :class="'iconfont' + weather + ' text-sm'"></span>
          <span @click="change_showmenu">
            <Icon :type="showmenu ? 'close' : 'setting'" class="text-sm" />
          </span>
        </div>
      </ul>
    </header>
    <!-- 返回头部 -->
    <div
      class="back_top animate__animated animate__fadeInDown sm:fixed right-0 md:right-6"
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
      visible:false,
      Mune_left: "Mune_left_hidden g-bg",
    };
  },
  methods: {
    MobileshowMenu(type) {
      if (type == 1) {
        this.Mune_left = "Mune_left_hidden g-bg";
        return;
      }
      this.Mune_left = "Mune_left_show g-bg";
    },
    backtop() {
      // window.scrollTop(0,0);
      // this.timer = setInterval(() => {
      //   if (document.documentElement.scrollTop == 0) {
      //     clearInterval(this.timer);
      //   }
      // }, 1);
    },
    change_showmenu() {
      this.showmenu = !this.showmenu;
    },
    showHeader(val) {
      if (val) {
        this.$refs.navBar.className =
          "header_box_navBar  h-8 md:h-14 animate__fadeInDown animate__animated";
        this.visible = false;
        return;
      }
      this.$refs.navBar.className =
        "header_box_navBar h-8 md:h-14 animate__fadeOutUp animate__animated";
      this.visible = true;
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
        if (this.$store.state.is_phone) {
          this.$nextTick(() => {
            Array.from(this.$refs.navBar_ul.children).find((item) => {
              if (
                item.getAttribute("name") == this.$route.params.module ||
                item.getAttribute("name") == this.$route.name
              ) {
                if (this.$route.name == "home") {
                  item.className = "mt-12 bg-indigo-100 text-black phone_select";
                } else {
                  item.className = "bg-indigo-100 text-black phone_select";
                }
              } else {
                item.className = "phone_select";
              }
            });
          });
          return;
        }
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
      if (this.$store.state.is_phone) return;
      if (this.$route.path !== "/home") return;
      if (delta < 0) {
        //向下滚动
        if (this.scrolltop > 200) {
          this.$refs.navBar.className =
            "header_box_navBar h-8 md:h-14 animate__fadeOutUp animate__animated";
        }
      } else {
        this.$refs.navBar.className =
          "header_box_navBar  h-8 md:h-14 animate__fadeInDown animate__animated";
      }
    };
  },
};
</script>
<style lang="less">
.phone_select {
  @apply w-2/3 h-14 mb-8 rounded-full flex justify-center items-center cursor-pointer;
}
.Mune_left_hidden {
  @apply h-screen w-63 fixed top-0 -left-72  ease-in-out duration-700;
}
.Mune_left_show {
  @apply h-screen w-63 fixed top-0 left-0  ease-in-out duration-700;
}

.navBar_show {
  color: rgba(0, 0, 0, 0.87);
}
.g-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(50px);
  z-index: 1;
}
</style>
