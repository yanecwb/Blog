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
            <li name="android" @click="goRouter('/content/android')">web3.0</li>
            <li name="news" @click="goRouter('/content/news')">我 的 生 活</li>
            <li name="article" @click="go_up_article()">
              投稿
              <Icon
                type="edit"
                style="font-size: 14px"
                title="写文章"
              />
            </li>
          </div>
          <div class=" flex justify-between items-center">
           <div @click="change_showmenu" :class="playMusic ? 'animate-spin' : ''" class='cursor-pointer w-7 h-7 md:w-10 md:h-10 border-2 border-solid border-gray-100 rounded-full bg-cover hvr-grow-shadow' :style="$store.state.userInfo.userInfo.id ? `background-image:url(${$store.state.userInfo.userInfo.avatarUrl})`  : 'background-image:url(http://www.flechazoblog.site:5006/img/home_img/notLogin.svg)'">
           </div>
           <router-link to="/message_center/chat_room" target="_Blank" class="hvr-icon-up">
              <div class="flex flex-col justify-between items-center mx-2 text-white  message">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="right-entry-icon fa fa-arrow-circle-o-up hvr-icon  w-4 h-4 md:w-5 md:h-5 ">
                <path d="M15.435 17.7717H4.567C2.60143 17.7717 1 16.1723 1 14.2047V5.76702C1 3.80144 2.59942 2.20001 4.567 2.20001H15.433C17.3986 2.20001 19 3.79943 19 5.76702V14.2047C19.002 16.1703 17.4006 17.7717 15.435 17.7717ZM4.567 4.00062C3.59327 4.00062 2.8006 4.79328 2.8006 5.76702V14.2047C2.8006 15.1784 3.59327 15.9711 4.567 15.9711H15.433C16.4067 15.9711 17.1994 15.1784 17.1994 14.2047V5.76702C17.1994 4.79328 16.4067 4.00062 15.433 4.00062H4.567Z" fill="currentColor"></path>
                <path d="M9.99943 11.2C9.51188 11.2 9.02238 11.0667 8.59748 10.8019L8.5407 10.7635L4.3329 7.65675C3.95304 7.37731 3.88842 6.86226 4.18996 6.50976C4.48954 6.15544 5.0417 6.09699 5.4196 6.37643L9.59412 9.45943C9.84279 9.60189 10.1561 9.60189 10.4067 9.45943L14.5812 6.37643C14.9591 6.09699 15.5113 6.15544 15.8109 6.50976C16.1104 6.86409 16.0478 7.37731 15.6679 7.65675L11.4014 10.8019C10.9765 11.0667 10.487 11.2 9.99943 11.2Z" fill="currentColor"></path>
              </svg>
              <span class="text-xs md:text-sm">消息</span>
              </div>
           </router-link>
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
                😭区块链技术
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
      playMusic:false
    };
  },
  // emits:['playMusic'],
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
      this.$emit('play')
      this.playMusic = true
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
      if (this.$route.name == "upload_article" || this.$route.name == "message_center") return;
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
.message::after{
    content: "1";
    display: block;
    font-size: 12px;
    // transform: scale(0.8); // 将字体缩小80% 也就是9.6px;
    transform-origin: 0 0;
    text-align: center;
    line-height: 15px;
    top: -4px;
    right: 9px;
    // padding: 2px 5px;
    // width: px;
    padding: 0 3px;
    height: 15px;
    border-radius: 50%;
    background-color: skyblue;
    position: absolute;
}
</style>
