<template>
  <div class="w-84 bg-white absolute block_border rounded-md shadow-md" :style="{bottom:'120%'}">
    <img :src="userInfo.backgroundUrl" class="w-full h-1/2 rounded-t-md" alt="">
    <div class="p-3 w-full">
      <div class="w-full relative pl-10">
        <img :src="userInfo.avatarUrl" alt="" class="w-10 absolute left-0 rounded-full">
        <div class="ml-2">
          <p class="text-black font-bold text-base">{{userInfo.nickname}}</p>
          <p class="mt-3 text-xs text-061 text-opacity-90">{{userInfo.accountInfo.follows}}<span class="mr-3">关注</span>{{userInfo.accountInfo.fans}}<span class="mr-3">粉丝</span>{{userInfo.accountInfo.lv}}<span>等级</span></p>
          <p class="my-4 text-xs">{{userInfo.autograph}}</p>
          <button class="border-0 px-5 py-0.5 mr-3 bg-03f text-white rounded cursor-pointer">+ 关注</button>
          <button class="border-0 px-5 py-0.5 rounded block_border bg-white cursor-pointer">发消息</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'calling card',
  props:{
    bottom:{
      default:80+'px'
    }
  },
  data(){
    return {
      userInfo:this.$store.state.userInfo.userInfo
    }
  }
}
</script>

<style>

</style>
