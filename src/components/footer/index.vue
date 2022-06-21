<template>
  <div>
    <footer class="w-full h-20 md:h-40 opacity-90  bg-122 flex justify-center items-center flex-wrap">
      <p class="text-white">Flechazo的博客💗</p>
      <p class="text-white">记得留下足迹哦</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      // show_footer: false,
    };
  },
  props:['show_footer'],
  computed:{
    },
  mounted(){
  }
};
</script>

<style>
</style>
