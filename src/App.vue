<template>
    <div id="app" class="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: "App",
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
