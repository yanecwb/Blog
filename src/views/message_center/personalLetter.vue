<template>
    <div class="w-full flex justify-start mt-10 bg-cover" style="background-image: linear-gradient(to top,rgba(255,255,255,0.75),rgba(255,255,255,0.75)), url(http://flechazoblog.site:5006/img/static_img/AllmsgBg.jpg)" >
      <div class="w-1/5 bg-white">
        <div class=" bg-white flex text-center px-3 py-2 items-center" style="border-bottom:1px solid #e6e6e6">
            <span class="font-bold">近期消息</span>
        </div>
        <ul class=" list-none w-full">
          <li @click="chatWithHe(i.chatId,i.nickname,i.toid)" class="px-3 py-3 flex justify-start items-center hover:bg-D7 cursor-pointer mb-2" :class="msgIngId == i.chatId ? 'bg-D7' : '' " v-for="i in chatList" :key="i.id" >
            <img :src="i.avatarUrl" class="w-10 h-10 rounded-full" alt="user_avatarUrl">
            <div class="flex-1 ml-1">
              <p class="text-black font-bold">{{i.nickname}}</p>
              <p class="text-xs w-32 text-#99 text1-overHidden" v-html="formatComment(received[i.chatId+'a'] && received[i.chatId+'a'].newContent)"></p>
            </div>
          </li>
        </ul>
      </div>
      <div  class="flex-1 h-160 rounded-3xl relative block_border flex flex-col justify-between">
            <div class=" bg-white text-center py-2" style="border-bottom:1px solid #e6e6e6">
            <span class="font-bold">{{msgIngIdNickname || '昵称'}}</span>
          </div>
          <div class=" py-2 px-3 flex-1 overflow-auto overflow-x-hidden msgScoll"  @click="() => { showexpression = false; return false }">
            <div class="w-full pb-5 pt-8 flex relative animate__animated" :class="i.isMycontent ? ' justify-end text-white animate__fadeInRightBig' : ' justify-start text-blac animate__fadeInLeftBig'" v-for="(i,index) in formatmessageList" :key="index">
              <div class=" absolute top-0 flex justify-between items-center">
                <img :src="i.isMycontent ? userInfo.avatarUrl : chatList.filter(i=>i.chatId == msgIngId)[0].avatarUrl" alt="" class="w-7 h-7 rounded-full mr-1">
                <div class="text-black">{{i.isMycontent ? userInfo.nickname : chatList.filter(i=>i.chatId == msgIngId)[0].nickname}}  <span class="text-xs text-indigo-500">{{formatTime(i.time)}}</span></div>
              </div>
              <div class="py-1 px-4 rounded shadow-lg shadow-blue-500/50" v-html="formatComment(i.content)"  :style="{background:i.isMycontent  ?'#0a80ff' : '#ebebeb'}">
              </div>
            </div>
          </div>
          <div   class="bg-white w-full py-3 flex items-center relative" style="border-top:1px solid #e6e6e6">
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
            <div  v-if='msgIngId' class="w-full flex justify-between items-center">
              <i  class='iconfont icon-biaoqing mx-2 cursor-pointer hvr-bounce-in text-xl ' @click="showexpression = 1"/>
              <i  class='iconfont icon-charutupian mx-2 cursor-pointer hvr-bounce-in text-xl ' />
              <Input ref="websocketmsgInput" v-model="personMessage" class=" outline-none px-3 py-1 resize-none" />
              <i class="iconfont icon-fasong mx-2 cursor-pointer hvr-bounce-in text-2xl text-blue-500" @click="sendperMsg"/>
            </div>
             <div v-else class="w-full text-center cursor-pointer bg-white">
              <span class="hover:text-blue-500 hvr-bounce-in ">请开始你的表演</span>
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
      messageList:{},//聊天内容
      formatmessageList:[],
      personMessage:'',
      showexpression:false,
      chatList:[],
      msgIngId:'',
      msgIngIdNickname:'',
      received:{},
      toid:''
    }
  },
  created(){
    this.chatList = JSON.parse(localStorage.getItem('chatList')) || []
    this.received = JSON.parse(localStorage.getItem('received')) || {}
    // this.socket = io('http://flechazoblog.site:5006/');
    this.socket = io('http://localhost:5006/');
    this.socket.on('sengperbackMsg',data=>{
      const {sendUser,fromid,toid,personMessage,time} = data
      if(fromid == this.userInfo.id){
        //
        if(JSON.parse(localStorage.getItem('messageList')) && JSON.parse(localStorage.getItem('messageList'))[sendUser.chatId]){
          this.messageList[sendUser.chatId] = JSON.parse(localStorage.getItem('messageList'))[sendUser.chatId]
        }else{
          this.messageList[sendUser.chatId] = {}
          this.messageList[sendUser.chatId].myid = []
          this.messageList[sendUser.chatId].receiveid = []
        }
        this.messageList[sendUser.chatId].receiveid.push({content:personMessage,time})
        localStorage.setItem('messageList',JSON.stringify(this.messageList))
        this.msgIngId = sendUser.chatId

        if(this.chatList.filter(i=>i.toid == toid).length == 0){
          this.chatList.push({...sendUser,toid})
          localStorage.setItem('chatList',JSON.stringify(this.chatList))
        }
        const a = sendUser.chatId +'a'
        this.received[a] = {newContent:personMessage,chatId:this.msgIngId}
        localStorage.setItem('received',JSON.stringify(this.received))
      }
    })
    if(JSON.parse(localStorage.getItem('newChat'))){
      const {chatId,nickname,toid} = JSON.parse(localStorage.getItem('newChat'))
      this.chatWithHe(chatId,nickname,toid)
      localStorage.removeItem('newChat')
    }
  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo.userInfo
    }
  },
  watch:{
    msgIngId:{
        // immediate:true,
        handler(newval){
              console.log(newval);
              // console.log(this.chatList.filter(i=>i.chatId == newval)[0].avatarUrl);
              const A = JSON.parse(localStorage.getItem('messageList'))
              if(!A) return
              A[newval].myid.map(i=>{
                return i.isMycontent = true
              })
              this.messageList = A
        }
    },
    messageList:{
      deep:true,
      handler(newval){
        const arr = [...this.messageList[this.msgIngId].myid,...this.messageList[this.msgIngId].receiveid]
          this.formatmessageList = arr.sort((a,b)=>{
              return a.time - b.time
          })
      }
    }
  },
  methods:{
    inputexpression(expression_val) {
       this.personMessage += '@' + expression_val + '!'
    },
    // 私聊连接并存储数据库
    chatWithHe(chatId,nickname,toid){
      this.socket.emit('chatWithHe',{chatId,fromid:this.userInfo.id,toid})
      this.msgIngId = chatId
      this.msgIngIdNickname = nickname
      this.toid = toid

     //
     if(JSON.parse(localStorage.getItem('messageList')) && JSON.parse(localStorage.getItem('messageList'))[chatId]){
          this.$set(this.messageList, chatId, JSON.parse(localStorage.getItem('messageList'))[chatId])
      }else{
          this.$set(this.messageList, chatId, {})
          this.$set(this.messageList[chatId], 'myid', [])
          this.$set(this.messageList[chatId], 'receiveid', [])
      }
      this.msgIngId = chatId
    },
    // 私聊发送消息
    sendperMsg(){
      if(!this.msgIngId){
        this.miniMessage('请选择发送人','warning')
        return
      }
      if(!this.personMessage) {
        this.miniMessage('不能发送空消息','error')
        return
      }
      this.socket.emit('sendperMsg',{fromid:this.userInfo.id,toid:this.toid, chatId:this.msgIngId,personMessage:this.personMessage})
      let obj = {content:this.personMessage,time:new Date().getTime(),isMycontent:true}
      this.messageList[this.msgIngId].myid.push(obj)
      localStorage.setItem('messageList',JSON.stringify(this.messageList))
      const a = this.msgIngId +'a'
      this.received[a] = {newContent:this.personMessage,chatId:this.msgIngId}
      localStorage.setItem('received',JSON.stringify(this.received))
      this.personMessage = ''
      this.showexpression = false
    },
    formatTime(time){
      return new Date(time).toLocaleTimeString()
    }
  },
}
</script>

<style>

</style>
