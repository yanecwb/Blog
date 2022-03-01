<template>
    <div id="app" class="app">
        <Header :scrollTop="scrollTop" />
        <Banner />
        <Container />
        <Footer :scrollTop="scrollTop" />
    </div>
</template>

<script>
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
    },
    data() {
        return {
            scrollTop: 0,
        };
    },
    mounted() {
        const Document = document.documentElement;
        document.querySelector("body").onscroll = () => {
            this.scrollTop = Document.scrollTop;
        };
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    font-family: "Noto Sans JP";
}
</style>
