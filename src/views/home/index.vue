<template>
    <div class="animate__animated animate__fadeIn">
        <Banner />
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
    
};
</script>

<style>
</style>