<template>
  <div class="content_moduleBox">
    <h2>模块{{$route.params.module}}</h2>
  </div>
</template>

<script>
export default {
  name:'content_module'
}
</script>

<style lang="less" scoped>
.content_moduleBox{
  height: 3000px;
}
</style>