<template>
  <div id="app" class="app" ref="App">
    <Header v-if="$store.state.show_header" />
    <router-view></router-view>
    <Footer />
  </div>
</template>
<script>
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
    };
  },
  beforeCreate() {
    if (this.$store.state.is_phone) {
      // window.location.href = "https://gitee.com/";
    }
  },
  methods: {
    change_show_footer(val) {
      this.show_footer = val;
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