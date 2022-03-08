<template>
    <div class="animate__animated animate__fadeIn">
        <Header />
        <Banner />
        <Container />
        <Footer :show_footer='show_footer' @change_show_footer='change_show_footer'/>
    </div>
</template>

<script>
import Header from "../../components/header/index.vue";
import Footer from "../../components/footer/index.vue";
import Banner from "../banner/index.vue";
import Container from "../container/index.vue";
export default {
  name: "home",
  components:{
    Header,
    Footer,
    Banner,
    Container
  },
    data(){
      return {
        show_footer:false
      }
    },
    methods:{
      change_show_footer(val){
this.show_footer = val
      }
    }
};
</script>

<style>
</style>