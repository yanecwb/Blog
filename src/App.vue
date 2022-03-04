<template>
    <div id="app" class="app">
        <!-- <div class="all_loading" v-if="All_loading">
            <Spin  size='large'/>
        </div> -->
        <Header/>
        <Banner />
        <Container />
        <Footer  />
    </div>
</template>

<script>
// import {Spin} from 'ant-design-vue'
import Header from "./components/header/index.vue";
import Footer from "./components/footer/index.vue";
import Banner from "./views/banner/index.vue";
import Container from "./views/container/index.vue";

export default {
    name: "App",
    components: {
        Header,
        Footer,
        Banner,
        Container,
        // Spin
    },
    data() {
        return {
            scrollTop: 0,
            All_loading:true
        };
    },
    mounted() {
        const Document = document.documentElement;
        document.querySelector("body").onscroll = () => {
            this.$store.commit('scroll/change_scrollTop',Document.scrollTop);
        };
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    /* font-family: "Noto Sans JP"; */
}
</style>
