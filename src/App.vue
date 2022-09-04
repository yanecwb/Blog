<template>
  <div id="app" ref="App" >
    <div>
      <div v-if="loaded">
        <Header v-if="$store.state.show_header"/>
      </div>
        <!-- <keep-alive :include="['home']"> -->
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
    <!-- <audio src="http://flechazoblog.site:5006/music/皎洁的笑颜(原神龙脊雪山BGM).flac" ref="audio" autoplay preload='none'></audio> -->
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
    change_show_footer(val) {
      this.show_footer = val;
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
  },
  mounted() {
    const Document = document.documentElement;
    this.$store.commit("scroll/change_scrollTop", Document.scrollTop);
    document.querySelector("body").onscroll = () => {
      this.$store.commit("scroll/change_scrollTop", Document.scrollTop);
    };
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
