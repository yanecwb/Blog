<template>
    <div class="about_me_box">
        <div class="about_me_bg"></div>
    </div>
</template>

<script>
export default {
    name: "about_me",
};
</script>

<style lang="less" scoped>
.about_me_box{
  width: 100%;
  height: 100vh;
  .about_me_bg{
    margin: auto;
    width: 100%;
    height: 100%;
    background-image: url('https://cdn.rawchen.com/cover.jpg');
    background-size: cover;
  }
}
</style>