<template>
  <div class="w-screen h-screen">
    <Banner
      bg="http://flechazoblog.site:5006/img/module_headerBg/about_mg.jpg"
      class="fixed top-0 w-screen h-full"
      style="z-index: -100"
    /> 
    <div class="w-2/3 p-20">
      <div
        class="flex items-center justify-center w-screen pb-2 border-gray-200 border-b-solid"
      >
        <span class="block w-1/6">我的收藏</span
        ><input type="text" placeholder="搜索" /><Icon
          type="search"
          style="font-size: 18px"
        />
      </div>
      
    </div>
  </div>
</template>
 
<script lang='js'>
  import { defineComponent } from 'vue'
  import { Icon } from 'ant-design-vue'
  import Banner from '@/views/banner'
  export default defineComponent({
    name:'myCollection',
    components: { Icon ,Banner},
    setup() {
        return {}
    }
})
</script>

<style lang="less" scoped>
input {
  outline-style: none;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 3px;
  padding: 13px 14px;
  width: 620px;
  font-size: 14px;
  font-weight: 700;
  font-family: "Microsoft soft";
  background-color: transparent;
}
</style>