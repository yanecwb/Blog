<template>
  <div class="w-screen overflow-hidden h-screen min-h-300 bg-cover bg-center" style="background-image: url(https://initiate.alphacoders.com/images/695/cropped-1920-1080-69561.jpg?3701); background-repeat: no-repeat;">
    <div  class=" w-300 h-full mx-auto flex justify-between">
      <div class=" w-1/6 h-full mr-5" style="background-color: rgba(255,255,255,.7);">
        <ul class=" list-none text-center flex flex-col justify-between" style="color: #6b757b;" @click="changeMessageM">
          <li class="h-14 font-bold my-2 group cursor-pointer message_li" ><span class=" group-hover:text-blue-400 pl-3 inline-block w-28 text-left ">回复我的</span></li>
          <li class="h-14 font-bold my-2 group cursor-pointer message_li" ><span class=" group-hover:text-blue-400 pl-3 inline-block w-28 text-left ">@我的</span></li>
          <li class="h-14 font-bold my-2 group cursor-pointer message_li" ><span class=" group-hover:text-blue-400 pl-3 inline-block w-28 text-left ">收到的赞</span></li>
          <li class="h-14 font-bold my-2 group cursor-pointer message_li" ><span class=" group-hover:text-blue-400 pl-3 inline-block w-28 text-left ">系统通知</span></li>
          <li class="h-14 font-bold my-2 group cursor-pointer message_li" ><span class=" group-hover:text-blue-400 pl-3 inline-block w-28 text-left ">我的消息</span></li>
        </ul>
      </div>
      <div class="flex-1 px-3" style="background-color: rgba(255,255,255,.5);">
        <div class="w-full h-12 flex items-center bg-white rounded-md pl-5 mx-auto mt-3">
          {{messageModule}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue'
export default {
  name: "Message_center",
  setup(){
    let messageModule = ref('回复我的')
    const changeMessageM = (e)=>{
      messageModule.value = e.target.innerText
    }
    return {
      messageModule,
      changeMessageM
    }
  },
  created(){
    this.$store.commit("change_show_header", false);
  },
};
</script>
<style lang="less" scoped>
.message_li{
  line-height: 42px;
  &::before{
    content: "\25cf";
    line-height: 20px;
  }
}
</style>
