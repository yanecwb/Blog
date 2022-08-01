<template>
  <div class="w-84 bg-white absolute block_border rounded-md shadow-md" :style="{bottom:'120%'}">
    <img :src="userInfo.backgroundUrl" class="w-full h-40 rounded-t-md" alt="">
    <div class="p-3 w-full">
      <div class="w-full relative pl-10">
        <img :src="userInfo.avatarUrl" alt="" class="w-10 h-10 absolute left-0 rounded-full">
        <div class="ml-2">
          <p class="text-black font-bold text-base">{{userInfo.nickname}}</p>
          <p class="mt-3 text-xs text-061 text-opacity-90">{{userInfo.accountInfo.follows}}<span class="mr-3">关注</span>{{userInfo.accountInfo.fans}}<span class="mr-3">粉丝</span>{{userInfo.accountInfo.lv}}<span>等级</span></p>
          <p class="my-4 text-xs">{{userInfo.autograph}}</p>
          <button class="border-0 px-5 py-0.5 mr-3 bg-03f text-white rounded cursor-pointer">+ 关注</button>
          <a :href="sendMsgToHeHref" @click="sendMsgToHe()" target="_blank" rel="noopener noreferrer"><button class="border-0 px-5 py-0.5 rounded block_border bg-white cursor-pointer">发消息</button></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getUser} from '../../api/userInfo'
import {getIsChat} from '../../api/chat'
export default {
  name:'calling_card',
  props:{
    bottom:{
      default:80+'px',
    },
    callingCardUserId:{
      require:true,
      type:String
    }
  },
  data(){
    return {
      userInfo:{accountInfo:{}},
      sendMsgToHeHref:""
    }
  },
  async created(){
      const res = await getUser(this.callingCardUserId)
      this.userInfo = res.data.result
      const accountInfo =this.userInfo.accountInfo.split(',')
      this.userInfo.accountInfo = {
        "lv": accountInfo[0],
        "follows": accountInfo[1],
        "fans": accountInfo[2],
      }
  },
  methods:{
    async sendMsgToHe(){
      if(this.callingCardUserId == this.$store.state.userInfo.userInfo.id) {
        this.miniMessage('您不能给自己发消息！','warning')
        this.sendMsgToHeHref = "javascript:void(0);"
        return
      }
      this.sendMsgToHeHref = location.origin + '/message_center/personal_letter'
      const chatList = JSON.parse(localStorage.getItem('chatList')) || []
      const chatId = Math.random().toFixed(8).slice(-8)
      let arr = []
      chatList.forEach(i=>{
        arr.push(getIsChat(i.chatId))
      })
      const res =await Promise.all(arr)
      const is_chatarr = res.map(item=>{
        return item.data.is_chated
      })
      const index = chatList.findIndex(i=>i.toid == this.userInfo.id)
      if(index == -1){
        chatList.push({chatId,toid:this.callingCardUserId,nickname:this.userInfo.nickname,avatarUrl:this.userInfo.avatarUrl})
        localStorage.setItem('chatList',JSON.stringify(chatList))
        localStorage.setItem('newChat',JSON.stringify({chatId,toid:this.callingCardUserId,nickname:this.userInfo.nickname,avatarUrl:this.userInfo.avatarUrl}))
        return
      }
      localStorage.setItem('newChat',JSON.stringify({...chatList[index],toid:this.callingCardUserId}))
    }
  }
}
</script>

<style>

</style>
