<template>
  <div class="w-full mt-11">
    <div class="w-full md:w-3/5 p-3  mx-auto border-4 border-light-blue-500 border-opacity-100">
           <!-- <div v-html="html"></div> -->
           <div class="text-base md:text-2xl lg:text-3xl font-bold">十分钟封装一个好用的axios，省时又省力他不香吗</div>
           <div class="w-full flex justify-between items-center  my-3 ">
             <div class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
              <img src="https://p9-passport.byteacctimg.com/img/user-avatar/e225c714c71f1dd579745d5589ac9418~300x300.image" class="w-full h-full rounded-full" alt="">
             </div>
             <div class="felx justify-start items-start flex-grow text-xs  ml-1 md:ml-3 lg:ml-5">
                <p class="m-0 text-black md:text-base">yaner</p>
                <p class="m-0 w-48 md:w-72 lg:w-full overflow-hidden whitespace-nowrap overflow-ellipsis">2022年06月03日 16：02 阅读9866</p>
             </div>
             <button class=" border-none w-14 h-6 lg:w-20 lg:h-8 bg-gradient-to-r from-blue-300 via-purple-500 to-purple-900 text-white rounded-md" @click="goRouter('/upload_article/5d7907c0-e240-11ec-a0b2-8fb7fb0dcc00')">
                <!-- +关注 -->
                修改
             </button>
           </div>
            <div v-html="article_content" >
            </div>
    </div>
  </div>
</template>

<script>
import { Get_Article_Content } from '../../api/article_list'
export default {
  name: "article_detail",
  data(){
    return {
      article_content:""
    }
  },
 async created(){
    const {data} = await Get_Article_Content({userId:this.$store.state.userInfo.userInfo.id,article_id:this.$route.params.id})
    if(data.code == 200){
      this.article_content = data.article_content
    }
  }
};
</script>

<style lang="less" scoped>
.article_detailBox{

}
</style>
