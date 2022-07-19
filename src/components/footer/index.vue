<template>
  <div>
    <footer class="w-full h-20 md:h-40 opacity-90  bg-122 flex justify-center items-center flex-col flex-wrap"  :class="$store.state.isfixed ? 'fixed bottom-0':''">
        <p class="text-white w-auto">Flechazo的博客💗记得留下足迹哦</p>
        <p class=" text-#99 text-xs">© 2022 Flechazo  <a href="https://beian.miit.gov.cn" class=" text-#99 text-xs" target="_blank">赣ICP备2022006183号-1</a></p>
      <!-- <p class="text-white">Jenkins自动部署</p> -->
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
};
</script>

<style>
</style>
