<template>
    <div class="animate__animated animate__fadeIn">
        <Banner bg='https://static.talkxj.com/config/0bee7ba5ac70155766648e14ae2a821f.jpg' is_home='1'/>
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
    Container
  },
  created(){
    this.$store.commit('change_show_footer',false)
  }

};
</script>

<style>
</style>
