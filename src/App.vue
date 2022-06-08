<template>
    <div id="app" class="app" ref="App">
        <Header :app='$refs.App' v-if="$route.name !== 'upload_article'"/>
        <router-view></router-view>
        <Footer v-if="$store.state.show_footer" />
    </div>
</template>

<script>
import Header from "./components/header/index.vue";
import Footer from "./components/footer/index.vue";
export default {
    name: "App",
    components:{
        Header,
        Footer,
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
    },
    mounted() {
        const Document = document.documentElement;
        this.$store.commit('scroll/change_scrollTop',Document.scrollTop);
        document.querySelector("body").onscroll = () => {
            this.$store.commit('scroll/change_scrollTop',Document.scrollTop);
        };
    },
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
