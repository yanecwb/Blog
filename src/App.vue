<template>
  <div id="app">
    <Header msg="Welcome to Your Vue.js App" />
    <Banner />
    <Container />
    <Footer />
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
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Noto Sans JP";
}
</style>
