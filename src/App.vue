<template>
  <div id="app" ref="App" >
    <div>
      <div v-if="loaded">
        <Header v-if="$store.state.show_header" @play="playMusic"/>
      </div>
        <!-- <keep-alive :include="['content_module']"> -->
          <router-view/>
        <!-- </keep-alive> -->
      <Footer/>
    </div>
    <div class="app" ref="lottie" v-if="!loaded && !$route.path.includes('message_center')">
      <lottie
        :options="defaultOptions"
        v-on:animCreated="handleAnimation"
        class="bg-blue w-screen h-screen z-9999"
      />
    </div>
    <audio src="http://flechazoblog.site:5006/music/皎洁的笑颜(原神龙脊雪山BGM).flac" ref="audio" autoplay preload='none'></audio>
  </div>
</template>
<script>
import animationData from "./assets/lottie/lf20_1vnvhuft.json";
import Header from "./components/header/index.vue";
import Footer from "./components/footer/index.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      show_footer: false,
      loaded: false,
      defaultOptions: { animationData: animationData },
      animationSpeed: 1,
      anim: {},
      // musicUrl:''
    };
  },
  beforeCreate() {
    if (this.$store.state.is_phone) {
      // window.location.href = "https://gitee.com/";
    }
    window.onload = () => {
      if(this.$route.path.includes('message_center')) return
      Promise.resolve().then(() => {
        this.$refs.lottie.className = "app animate__animated  animate__fadeOut";
        setTimeout(() => {
          this.loaded = true;
        }, 1000);
      });
    };
  },
  methods: {
    playMusic(){
      this.$refs.audio.play()
    },
    change_show_footer(val) {
      this.show_footer = val;
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
  },
  mounted() {
    const musicList = [
      'http://flechazoblog.site:5006/music/HOYO-MiX-WordlessCliffs丹砂巍巍.mp3',
      'http://flechazoblog.site:5006/music/杯中明月(璃月BGM).mp3',
      'http://flechazoblog.site:5006/music/海灯节bgm和魈的烟火之约~.mp3',
      'http://flechazoblog.site:5006/music/HOYO-MiX-RexIncognito尘世闲游.mp3'
    ]
    let musicOder = 0
    const Document = document.documentElement;
    this.$store.commit("scroll/change_scrollTop", Document.scrollTop);
    document.querySelector("body").onscroll = () => {
      this.$store.commit("scroll/change_scrollTop", Document.scrollTop);
    };
    this.$nextTick(()=>{
      this.$refs.audio.addEventListener('ended',  ()=> {
        this.$refs.audio.attributes[1].value = musicList[musicOder]
        musicOder += 1
        if(musicOder == musicList.length){
          musicOder = 0
        }
    }, false);
    })
  },
};
</script>
<style lang="less" scoped>
.app {
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
}
</style>
