<template>
  <div class="w-screen overflow-hidden h-screen min-h-300 bg-cover bg-center" style="background-image: url(http://47.107.243.60:5005/img/home_img/fa7a162e40a540f57b3c80aeb8c8fe0f.jpg); background-repeat: no-repeat;">
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
        <div class="mt-10 w-full bg-white rounded-md pl-5 mx-auto">
          <input type="text"  v-model="websocketmsg">
          <button @click="sendwebsocketmsg">发送消息</button>
          <button @click="closewebsocket">关闭连接</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var ws = new WebSocket("ws://127.0.0.1:5006/?userId="+123);

// 只读属性 readyState 表示连接状态，可以是以下值：

// 0 - 表示连接尚未建立。

// 1 - 表示连接已建立，可以进行通信。

// 2 - 表示连接正在进行关闭。

// 3 - 表示连接已经关闭或者连接不能打开。
ws.onopen = function(){
  console.log(ws.readyState);
	// Web Socket 已连接上，在页面中显示消息
	console.log("当前客户端已经连接到websocket服务器");
};
import {ref} from 'vue'
export default {
  name: "Message_center",
  setup(){
    let messageModule = ref('回复我的')
    let websocketmsg = ref('')
    const changeMessageM = (e)=>{
      messageModule.value = e.target.innerText
    }
    const sendwebsocketmsg = ()=>{
      console.log(websocketmsg.value);
      ws.send(websocketmsg.value);
    }
    ws.onmessage = function (evt) {
      console.log(evt.data);
    };
    const closewebsocket=()=>{
      console.log("当前客户端已经关闭连接到websocket服务器");
      ws.close()
    }
    return {
      messageModule,
      websocketmsg,
      changeMessageM,
      sendwebsocketmsg,
      closewebsocket
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
