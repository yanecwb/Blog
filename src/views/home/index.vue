<template>
    <div class="animate__animated animate__fadeIn">
        <Banner bg='http://47.107.243.60:5005/img/static_img/home_banner.jpg' is_home='1'/>
        <Container />
    </div>
</template>

<script>

import Banner from "../banner/index.vue";
import Container from "../container/index.vue";
export default {
  name: "home",
  components:{
    Banner,
    Container,
  },
  created(){
    this.$store.commit('change_show_footer',false)
    this.$store.commit("change_show_header", true);
    this.$store.commit('change_isfixed',0)
  }

};
</script>

<style>
#nprogress .bar {
    background: #a37eba !important;
}
</style>
