<template>
     <div class="mt-10 w-full h-160 rounded-3xl mx-auto relative flex flex-col justify-between bg-cover" style="background-image: linear-gradient(to top,rgba(255,255,255,0.75),rgba(255,255,255,0.75)), url(http://flechazoblog.site:5006/img/static_img/AllmsgBg.jpg)">
          <div class=" bg-white flex justify-between py-2 items-center" style="border-bottom:1px solid #e6e6e6">
            <i class="iconfont icon-shezhi mx-2 cursor-pointer hvr-bounce-in text-xl" @click="miniMessage('开发中','info')"/>
            <span class="font-bold">在线人数({{userCount}})</span>
            <i @click="closewebsocket" class="iconfont icon-exit-full mx-2 cursor-pointer hvr-bounce-in text-xl"></i>
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
            <div v-if="isIntoChat" class="w-full flex justify-between items-center">
              <i  class='iconfont icon-biaoqing mx-2 cursor-pointer hvr-bounce-in text-xl ' @click="showexpression = 1"/>
              <i  class='iconfont icon-charutupian mx-2 cursor-pointer hvr-bounce-in text-xl ' />
              <Input ref="websocketmsgInput" class=" outline-none px-3 py-1 resize-none" v-model="websocketmsg" @keydown="handlePress"/>
              <i class="iconfont icon-fasong mx-2 cursor-pointer hvr-bounce-in text-2xl text-blue-500" @click="sendwebsocketmsg"/>
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
export default {
  name:'chatRoom',
  components:{Input},
  data(){
    return {
      websocketmsg:'',
      socket:'',
      message:[],
      BiLiEmaili: 'Default/default0',//表情地址
      BiLiEmailTotal: 80,//该系列表情数量,
      showexpression:false,
      expressionLeft:0,
      expressionTop:0,
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
      if(!id){
        this.noLogin()
         return
      }
      this.isIntoChat = true
      if(!this.socket)  this.socket = io('http://flechazoblog.site:5006/');
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
    inputexpression(expression_val) {
       this.websocketmsg += '@' + expression_val + '!'
    },
    // 格式化评论
    formatComment(comment) {
      if (!comment) return
      if (comment.indexOf('@') >= 0) {
        let a = comment.match(/(?<=@).*?(?=!)/g)
        for (let i = 0; i < a.length; i++) {
          comment = comment.replace('@' + a[i] + '!', `<img src='http://flechazoblog.site:5006/img/BiLiEmail/${a[i]}.png' class='w-6 h-6'/>`)
        }
      }
      return comment
    },
  },
  mounted(){
    this.socket = io('http://flechazoblog.site:5006/');
    this.socket.emit('deleteUser',this.$store.state.userInfo.userInfo.id)
    this.socket.on("receiveMessage", data => {
        this.scrollToBottom()
        this.message.push(data)
      });
    this.socket.on('add_user',data=>{
       this.miniMessage("<img src="+data.avatarUrl+" class='w-8 h-8 rounded-full mr-2'>"+data.nickname+"加入群聊",'success')
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

<style lang='less' scoped>
.msgScoll{
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 7px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 7px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgb(189, 196, 198)
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ffffff;
  }
}

</style>
