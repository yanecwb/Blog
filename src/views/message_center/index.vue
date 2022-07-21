<template>
  <div class="w-screen overflow-hidden h-screen min-h-300 bg-cover bg-center" style="background-image: url(http://47.107.243.60:5005/img/home_img/fa7a162e40a540f57b3c80aeb8c8fe0f.jpg); background-repeat: no-repeat;">
    <div  class=" w-300 h-full mx-auto flex justify-between">
      <div class=" w-1/6 h-full mr-5" style="background-color: rgba(255,255,255,.7);">
        <ul class=" list-none text-center flex flex-col justify-between" style="color: #6b757b;" @click="(e)=>{ messageModule = e.target.innerText;goRouter(`/message_center/${childrenRouter(e.target.innerText)}`)}">
          <li class="h-14 font-bold my-2 group cursor-pointer message_li" ><span class=" group-hover:text-blue-400 pl-3 inline-block w-28 text-left " :class="$route.meta.title =='技术讨论' ? 'text-blue-400':'' ">技术讨论</span></li>
          <li class="h-14 font-bold my-2 group cursor-pointer message_li" ><span class=" group-hover:text-blue-400 pl-3 inline-block w-28 text-left " :class="$route.meta.title =='我的私信' ? 'text-blue-400':'' ">我的私信</span></li>
          <li class="h-14 font-bold my-2 group cursor-pointer message_li" ><span class=" group-hover:text-blue-400 pl-3 inline-block w-28 text-left " :class="$route.meta.title =='回复我的' ? 'text-blue-400':'' ">回复我的</span></li>
          <li class="h-14 font-bold my-2 group cursor-pointer message_li" ><span class=" group-hover:text-blue-400 pl-3 inline-block w-28 text-left " :class="$route.meta.title =='收到的赞' ? 'text-blue-400':'' ">收到的赞</span></li>
          <li class="h-14 font-bold my-2 group cursor-pointer message_li" ><span class=" group-hover:text-blue-400 pl-3 inline-block w-28 text-left " :class="$route.meta.title =='系统通知' ? 'text-blue-400':'' ">系统通知</span></li>
        </ul>
      </div>
      <div class="flex-1 px-3" style="background-color: rgba(255,255,255,.5);">
        <div class="w-full h-12 flex items-center bg-white rounded-md pl-5 mx-auto mt-3 font-bold">
          {{messageModule}}
        </div>
        <keep-alive :include="['chatRoom']">
          <router-view/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
// localStorage.debug = '*';
// import chatRoom from './chatRoom.vue'

import {ref} from 'vue'
// import io from "socket.io-client";
export default {
  name: "Message_center",
  // components:{chatRoom},
  setup(){
    let messageModule = ref('技术讨论')
    // socket.on("loginSuccess", (data) => {
    //   console.log(data);
    // });
    // socket.on("addUser", (data) => {
    //   console.log(data);
    // });
    // // this.socket.on("leaveroom", (data) => {
    // //   this.$store.commit("setLeaveRoom", data);
    // //   this.$refs.chatroom ? this.$refs.chatroom.haveOneleaveRoom() : null;
    // // });
    // // 监听用户列表的信息
    // socket.on("userList", (data) => {
    //   // this.userList = data;
    //   console.log(data);
    // });
    return {
      messageModule,
    }
  },
  created(){
    this.$store.commit("change_show_header", false);
  },
  methods:{
    childrenRouter(messageModule){
      const obj = {
        '技术讨论':'chat_room',
        '我的私信':'personal_letter',
        '回复我的':'reply',
        '收到的赞':'praise',
        '系统通知':'sys_notify'
      }
      return obj[messageModule]
    }
  },
  mounted(){
    // // 监听图片的消息
    // this.socket.on("receiveImage", (data) => {
    //   // 把接收到的图片显示到聊天窗口中
    //   this.$refs.chatroom.handleGroup(data);
    // });
    // // 一对一单聊消息
    // this.socket.on("oneMsg", (data) => {
    //   // 把接收到的消息显示到聊天窗口中
    //   this.$refs.chatroom.handleOne(data);
    // });
    // // 一对一单聊图片
    // this.socket.on("oneImg", (data) => {
    //   // 把接收到的图片显示到聊天窗口中
    //   this.$refs.chatroom.handleOne(data);
    // });
  }
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
