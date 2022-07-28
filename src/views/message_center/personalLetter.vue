<template>
    <div class="w-full flex justify-start mt-10 bg-cover" style="background-image: linear-gradient(to top,rgba(255,255,255,0.75),rgba(255,255,255,0.75)), url(http://flechazoblog.site:5006/img/static_img/AllmsgBg.jpg)" >
      <div class="w-1/5 bg-white">
        <div class=" bg-white flex text-center px-3 py-2 items-center" style="border-bottom:1px solid #e6e6e6">
            <span class="font-bold">近期消息</span>
        </div>
        <ul class=" list-none w-full">
          <li @click="chatWithHe(i.id,i.nickname)" class="px-3 py-3 flex justify-start items-center hover:bg-D7 cursor-pointer mb-2" :class="msgIngId == i.id ? 'bg-D7' : '' " v-for="i in chatList" :key="i.id" >
            <img :src="i.avatarUrl" class="w-10 h-10 rounded-full" alt="user_avatarUrl">
            <div class="flex-1 ml-1">
              <p class="text-black font-bold">{{i.nickname}}</p>
              <p class="text-xs w-32 text-#99 text1-overHidden">{{received}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="flex-1 h-160 rounded-3xl relative block_border flex flex-col justify-between">
          <div class=" bg-white text-center py-2" style="border-bottom:1px solid #e6e6e6">
            <span class="font-bold">{{msgIngIdNickname || '昵称'}}</span>
          </div>
          <div class=" py-2 px-3 flex-1 overflow-auto overflow-x-hidden msgScoll"  @click="() => { showexpression = false; return false }">
            <div class="w-full pb-5 pt-8 flex relative animate__animated" :class="i.id == $store.state.userInfo.userInfo.id ? ' justify-end text-white animate__fadeInRightBig' : ' justify-start text-blac animate__fadeInLeftBig'" v-for="(i,index) in message" :key="index">
              <div class=" absolute top-0 flex justify-between items-center">
                <img :src="i.avatarUrl" alt="" class="w-7 h-7 rounded-full mr-1">
                <div class="text-black">{{i.nickname}}  <span class="text-xs text-indigo-500">{{i.time}}</span></div>
              </div>
              <div class="py-1 px-4 rounded shadow-lg shadow-blue-500/50" v-html="formatComment(i.msg)"  :style="{background:i.id == $store.state.userInfo.userInfo.id  ?'#0a80ff' : '#ebebeb'}">
              </div>
            </div>
          </div>
          <div class="bg-white w-full py-3 flex items-center relative" style="border-top:1px solid #e6e6e6">
              <!-- 表情 -->
             <div @click="(e) => { e.stopPropagation() }" v-if="showexpression"
              class=" absolute bg-white z-100 md:w-86 md:h-60  w-56 h-42 rounded border border-solid border-gray-300 shadow-md left-0 -top-60" >
              <p class='pt-1 pb-2 m-0 h-1/6 text-xs'>小表情</p>
              <div class="w-full h-2/3 flex justify-around flex-wrap overflow-auto bg-white z-999">
                <div v-for="i in BiLiEmailTotal" :key="i"
                  class="md:w-14 md:h-10 w-9 h-6 flex justify-center items-center">
                  <img :src="'http://flechazoblog.site:5006/img/BiLiEmail/' + BiLiEmaili + i + '.png'" alt=""
                    class="md:w-7 w-5 md:h-7 h-5" @click="inputexpression(BiLiEmaili + i)">
                </div>
              </div>
              <div class="w-full h-1/6 bg-gray-300 flex justify-start">
                <div @click="(e) => { BiLiEmaili = 'Default/default0'; BiLiEmailTotal = 80; e.stopPropagation() }"
                  class="h-full w-1/5 flex justify-center items-center"
                  :class="BiLiEmaili == 'Default/default0' ? 'bg-white' : ''" style="border-right:solid #CCC 1px">
                  <img src="http://flechazoblog.site:5006/img/BiLiEmail/Default/default01.png" alt=""
                    class="md:w-7 w-5 md:h-7 h-5">
                </div>
                <div @click="(e) => { BiLiEmaili = 'BiLiTV/BiLITV_'; BiLiEmailTotal = 53; e.stopPropagation() }"
                  class="h-full w-1/5  flex justify-center items-center"
                  :class="BiLiEmaili == 'BiLiTV/BiLITV_' ? 'bg-white' : ''" style="border-right:solid #CCC 1px">
                  <img :src="'http://flechazoblog.site:5006/img/BiLiEmail/BiLiTV/BiLITV_1.png'" alt=""
                    class="md:w-7 w-5 md:h-7 h-5">
                </div>
              </div>
            </div>
            <!-- 输入区 -->
            <div class="w-full flex justify-between items-center">
              <i  class='iconfont icon-biaoqing mx-2 cursor-pointer hvr-bounce-in text-xl ' @click="showexpression = 1"/>
              <i  class='iconfont icon-charutupian mx-2 cursor-pointer hvr-bounce-in text-xl ' />
              <Input ref="websocketmsgInput" v-model="personMessage" class=" outline-none px-3 py-1 resize-none" />
              <i class="iconfont icon-fasong mx-2 cursor-pointer hvr-bounce-in text-2xl text-blue-500" @click="sendperMsg"/>
            </div>
          </div>
      </div>
    </div>

</template>

<script>
import io from "socket.io-client";
import {Input} from 'ant-design-vue'
export default {
  name:'personalLetter',
  components:{Input},
  data(){
    return {
      socket:null,
      BiLiEmaili: 'Default/default0',//表情地址
      BiLiEmailTotal: 80,//该系列表情数量,
      message:[],
      personMessage:'',
      showexpression:false,
      chatList:[],
      msgIngId:'',
      msgIngIdNickname:'',
      received:''
    }
  },
  created(){
    this.chatList = JSON.parse(localStorage.getItem('chatList')) || []
    // this.socket = io('http://flechazoblog.site:5006/');
    this.socket = io('http://localhost:5006/');
    this.socket.on('sengperbackMsg',data=>{
      const {sendUser,id,personMessage} = data
      console.log(data);
      if(id == this.userInfo.id){
        if(this.chatList.filter(i=>i.myid == sendUser.myid).length == 0){
          this.chatList.push(sendUser)
          localStorage.setItem('chatList',JSON.stringify(this.chatList))
        }
        this.received = personMessage
      }
    })
  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo.userInfo
    },
  },

  methods:{
    inputexpression(expression_val) {
       this.personMessage += '@' + expression_val + '!'
    },
    // 私聊连接并存储数据库
    chatWithHe(id,nickname){
      this.socket.emit('chatWithHe',{myid:this.userInfo.id, id})
      this.msgIngId = id
      this.msgIngIdNickname = nickname
    },
    // 私聊发送消息
    sendperMsg(){
      this.socket.emit('sendperMsg',{myid:this.userInfo.id, id:this.msgIngId,personMessage:this.personMessage})
    }
  }
}
</script>

<style>

</style>
