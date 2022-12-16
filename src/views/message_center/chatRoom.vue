<template>
     <div class="relative flex flex-col justify-between w-full mx-auto mt-10 bg-cover h-160 rounded-3xl" style="background-image: linear-gradient(to top,rgba(255,255,255,0.75),rgba(255,255,255,0.75)), url(http://flechazoblog.site:5006/img/static_img/AllmsgBg.jpg)">
          <div class="flex items-center justify-between py-2 bg-white " style="border-bottom:1px solid #e6e6e6">
            <i class="mx-2 text-xl cursor-pointer iconfont icon-shezhi hvr-bounce-in" @click="miniMessage('开发中','info')"/>
            <span class="font-bold">在线人数({{userCount}})</span>
            <i @click="closewebsocket" class="mx-2 text-xl cursor-pointer iconfont icon-exit-full hvr-bounce-in"></i>
          </div>
          <div class="flex-1 px-3 py-2 overflow-auto overflow-x-hidden msgScoll"  @click="() => { showexpression = false; return false }">
            <div class="relative flex w-full pt-8 pb-5 animate__animated" :class="i.id == $store.state.userInfo.userInfo.id ? ' justify-end text-white animate__fadeInRightBig' : ' justify-start text-blac animate__fadeInLeftBig'" v-for="(i,index) in message" :key="index">
              <div class="absolute top-0 flex items-center justify-between ">
                <img :src="i.avatarUrl" alt="" class="mr-1 rounded-full w-7 h-7">
                <div class="text-black">{{i.nickname}}  <span class="text-xs text-indigo-500">{{i.time}}</span></div>
              </div>
              <div class="px-4 py-1 rounded shadow-lg shadow-blue-500/50" v-html="formatComment(i.msg)"  :style="{background:i.id == $store.state.userInfo.userInfo.id  ?'#0a80ff' : '#ebebeb'}">
              </div>
            </div>
          </div>
          <div class="relative flex items-center w-full py-3 bg-white" style="border-top:1px solid #e6e6e6">
              <!-- 表情 -->
              <Expression v-if="showexpression" :options="expressionOption" @inputexpression="inputexpression"/>

            <!-- 输入区 -->
            <div v-if="isIntoChat" class="flex items-center justify-between w-full">
              <i  class='mx-2 text-xl cursor-pointer iconfont icon-biaoqing hvr-bounce-in ' @click="smallExpression(1,$event)"/>
              <i  class='mx-2 text-xl cursor-pointer iconfont icon-charutupian hvr-bounce-in ' @click="miniMessage('开发中','info')"/>
              <Input ref="websocketmsgInput" v-focus class="px-3 py-1 outline-none resize-none " v-model="websocketmsg" @keydown="handlePress"/>
              <i class="mx-2 text-2xl text-blue-500 cursor-pointer iconfont icon-fasong hvr-bounce-in" @click="sendwebsocketmsg"/>
            </div>
            <div v-else class="w-full text-center cursor-pointer" @click='intoChat'>
              <span class="hover:text-blue-500 hvr-bounce-in ">加入群聊</span>
            </div>
          </div>
      </div>
</template>

<script>
import io from "socket.io-client";
import {Input} from 'ant-design-vue'
import Expression from '@/components/expression'
export default {
  name:'chatRoom',
  components:{Input,Expression},
  data(){
    return {
      websocketmsg:'',
      socket:'',
      message:[],
      showexpression:false,
      expressionOption:{
        expressionLeft:0,//表情左定位
        expressionTop:0,//表情上定位
      },
      isIntoChat:false,
      userCount:0
    }
  },
  methods:{
    handlePress(e) {
      if (e.keyCode == 13) this.sendwebsocketmsg();
    },
    intoChat(){
      const {id,nickname,avatarUrl} = this.$store.state.userInfo.userInfo
      if(!id) {
        this.noLogin()
        return
      }
      this.isIntoChat = true
      if(!this.socket)  this.socket = io('http://flechazoblog.site:5006');
      this.socket.emit("into_chat", {
        id,
        nickname,
        avatarUrl
      });
      this.$nextTick(()=>{
        this.$refs.websocketmsgInput.focus()
      })
    },
    sendwebsocketmsg(){
      if(!this.socket) {
        this.miniMessage('请先加入群聊','error')
        return
      }
      // 群聊
      const {id,nickname,avatarUrl} = this.$store.state.userInfo.userInfo
      this.socket.emit("send_message",{
        id,
        nickname,
        avatarUrl,
        msg:this.websocketmsg
      });
      this.websocketmsg = ''
      this.scrollToBottom()
    },
    closewebsocket(){
      if (this.socket){
        // this.socket.disconnect();
        // this.socket = null
        this.socket.emit('out_chatroom')
        this.isIntoChat = false
        this.miniMessage("您已退出聊天室",'info');
      }
    },
    scrollToBottom () {
      this.$nextTick(()=>{
        const domWrapper = document.querySelector('.msgScoll'); // 外层容器 出现滚动条的dom
        (function smoothscroll() {
            const currentScroll = domWrapper.scrollTop;   // 已经被卷掉的高度
            const clientHeight = domWrapper.offsetHeight; // 容器高度
            const scrollHeight = domWrapper.scrollHeight; // 内容总高度
            if (scrollHeight - 10 > currentScroll + clientHeight) {
                window.requestAnimationFrame(smoothscroll);
                domWrapper.scrollTo({
                    top: scrollHeight,
                    behavior: "instant"
                });
            }
        })();
      })
    },
    smallExpression(type,e){
      this.showexpression = true
      e.stopPropagation();
      this.$nextTick(()=>{
        this.expressionOption.expressionLeft = e.clientX
        this.expressionOption.expressionTop = e.clientY
      })
      return false
    },
    inputexpression(expression_val) {
       this.websocketmsg += '@' + expression_val + '!'
    },
  },
  mounted(){
    this.socket = io('http://flechazoblog.site:5006');
    this.socket.emit('deleteUser',this.$store.state.userInfo.userInfo.id)
    this.socket.on("receiveMessage", data => {
        this.scrollToBottom()
        this.message.push(data)
      });
    this.socket.on('add_user',data=>{
       this.miniMessage("<img src="+data.avatarUrl+" class='w-8 h-8 mr-2 rounded-full'>"+data.nickname+"加入群聊",'success')
    })
    this.socket.on('chat_userCount',userCount=>{
       this.userCount = userCount['count(1)']
    })
    // window.onbeforeunload=()=>{
    //   if(this.isIntoChat){
    //     this.miniMessage('请先退出聊天室','error')
    //   }
    //   return '123'
    // }
  },
  beforeDestroy(){
    // this.socket.emit('out_chatroom');
    // 离开页面清除onbeforeunload事件
    // window.onbeforeunload = () => {}
  }
}
</script>
