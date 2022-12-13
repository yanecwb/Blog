<template>
  <div class="min-w-300">
    <!-- 导航PC -->
    <div v-if="!$store.state.is_phone" >
      <header class="h-12 px-2 header_box_navBar" ref="navBar" id="header">
        <ul class="min-w-300" >
          <div ref="navBar_ul" class="flex">
            <router-link to="/home">
              <div class="relative flex hvr-pulse header_right ">
                <img src='http://flechazoblog.site/Img/home.svg' style="width:17px;height:20px"/>
                <span name='home' class="text-xs md:text-sm">首页</span>
              </div>
            </router-link>
            <router-link to="/content/frontend">
              <div class="relative flex hvr-pulse header_right ">
                <img src='http://flechazoblog.site/Img/frontend.svg' style="width:17px;height:20px"/>
                <span class="text-xs md:text-sm">前端</span>
              </div>
            </router-link>
            <router-link to="/content/backend">
              <div class="relative flex hvr-pulse header_right ">
                <img src='http://flechazoblog.site/Img/backend.svg' style="width:17px;height:20px"/>
                <span class="text-xs md:text-sm">后端</span>
              </div>
            </router-link>
            <router-link to="/content/android">
              <div class="relative flex hvr-pulse header_right ">
                <img src='http://flechazoblog.site/Img/web3.svg' style="width:17px;height:20px"/>
                <span class="text-xs md:text-sm">web3.0</span>
              </div>
            </router-link>
             <router-link to="/content/news">
              <div class="relative flex hvr-pulse header_right ">
                <img src='http://flechazoblog.site/Img/live.svg' style="width:17px;height:20px"/>
                <span class="text-xs md:text-sm">记录</span>
              </div>
            </router-link>
             <a @click="(e)=>{e.stopPropagation();if($store.state.userInfo.userInfo.id !== 'ab7d2dc7-4635-4dad-8bbe-f3c896fc3d6a'){miniMessage('无权限，请联系博主','error') ; return }$router.push('/upload_article')}" target="_Blank">
              <div class="relative flex hvr-pulse header_right ">
                <img src='http://flechazoblog.site/Img/upload.svg' style="width:17px;height:20px"/>
                <span class="text-xs md:text-sm">投稿</span>
              </div>
            </a>
          </div>
          <div class="flex items-center justify-between ">
           <div @click="change_showmenu" class='mr-2 bg-cover border-2 border-gray-100 border-solid rounded-full cursor-pointer w-7 h-7 md:w-10 md:h-10 hvr-grow-shadow' :style="$store.state.userInfo.userInfo.id ? `background-image:url(${$store.state.userInfo.userInfo.avatarUrl})`  : 'background-image:url(http://www.flechazoblog.site:5006/img/home_img/notLogin.svg)'">
           </div>
            <router-link to="/message_center/chat_room" target="_Blank">
              <div class="relative flex hvr-pulse header_right message">
                <img src='http://flechazoblog.site/Img/message.svg' style="width:17px;height:20px"/>
                <span class="text-xs md:text-sm">讨论</span>
              </div>
            </router-link>
            <router-link :to="$route.fullPath" @mouseenter.native='showWeather = true' @mouseleave.native="showWeather = false" class="relative ">
              <div class="flex hvr-pulse header_right">
                <img :src='WeatherSvg' style="width:20px;height:20px" />
                <span class="text-xs md:text-sm ">天气</span>
              </div>
              <div v-show="showWeather" :class="WeatherCss" style="transform: translateX(-175px)">
                <iframe frameborder="0" scrolling="no" src="http://flechazoblog.site:5006/CSS/Weather/index.html"  height="400px"></iframe>
              </div>
            </router-link>
            <router-link to="/friend_link" target="_Blank">
              <div class="flex hvr-pulse header_right">
                <img src='http://flechazoblog.site/Img/f_link.svg' style="width:20px;height:20px" />
                <span class="text-xs md:text-sm">友链</span>
              </div>
            </router-link>
          </div>
        </ul>
      </header>
    </div>

    <!-- Mobile  -->
    <header class="h-8 header_box_navBar md:h-14" ref="navBar" v-else>
      <ul style="width: 100vw;">
        <div>
          <Icon type="menu" @click="MobileshowMenu" />
          <div :class="Mune_left">
            <div
              class="absolute z-10 text-xl cursor-pointer right-3 top-2"
              @click="MobileshowMenu(1)"
            >
             <Icon type="close" />
            </div>
            <div
              class="absolute flex flex-col items-center w-full mt-10 font-serif text-base z-999"
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
                @click="(e)=>{e.stopPropagation();if($store.state.userInfo.userInfo.id !== 'ab7d2dc7-4635-4dad-8bbe-f3c896fc3d6a'){miniMessage('无权限，请联系博主','error') ; return }$router.push('/upload_article')}"
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
            <Icon :type="showmenu ? 'close' : 'setting'" />
          </span>
        </div>
      </ul>
    </header>
    <!-- 返回头部 -->
    <a
      class="right-0 flex items-center justify-center back_top animate__animated animate__fadeInDown sm:fixed md:right-6 hvr-icon-up"
      v-if="show_backtop"
      href="#header"
    >
    <Icon type="to-top" style="font-size: 20px;color: #fff;" class="hvr-icon"/>
    </a>
    <!-- 遮罩层 -->
    <div class="fixed top-0 w-screen h-screen Mask" v-if="showmenu" @click="change_showmenu"></div>
    <!-- 菜单 -->
    <MoreMenu :showmenu="showmenu" @change_showmenu="change_showmenu" />
  </div>
</template>

<script>
import "./header.css";
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
      WeatherSvg:'',
      showWeather:false,
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
    WeatherCss(){
      return this.showWeather ? 'absolute -left-full -translate-x-full animate__animated animate__fadeIn' : 'absolute -left-full -translate-x-full'
    }
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
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://widget-api.heweather.net/s6/plugin/view?key=29fe8420174443e0a0698ab09ab40a52&location=CN101280601&lang=zh');
    xhr.onreadystatechange =  ()=> {
      if (xhr.readyState === 4) {
        var data = JSON.parse(xhr.responseText);
        // console.log(data);
        this.WeatherSvg = 'https://cdn.heweather.com/img/plugin/190516/icon/c/'+data.now.cond_code + 'd.png'
      }
    }
    xhr.send();

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
header{
  font-family: serif;
}
.phone_select {
  @apply w-2/3 h-14 mb-8 rounded-full flex justify-center items-center cursor-pointer;
}
.Mune_left_hidden {
  @apply h-screen w-63 fixed top-0 -left-72  ease-in-out duration-700;
}
.Mune_left_show {
  @apply h-screen w-63 fixed top-0 left-0  ease-in-out duration-700;
}
.header_right{
  @apply flex-col justify-between items-center mr-2 text-white;
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
    right: 5px;
    // padding: 2px 5px;
    // width: px;
    padding: 0 3px;
    height: 15px;
    border-radius: 50%;
    background-color: skyblue;
    position: absolute;
}
</style>
