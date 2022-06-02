<template>
  <div class="w-full mt-11">
    <div class="w-full md:w-3/5 px-2  mx-auto border-4 border-light-blue-500 border-opacity-100">
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
            <div v-html="html" class="p-3">
            </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "article_detail",
  data(){
    return {
      html:"<h1 class='text-sm md:text-xl lg:text-2xl' style=\"text-indent: 0px; text-align: start; line-height: 1.31;\">Web3.0来了，花呗借呗前端团队开源的Web图形引擎会成为元宇宙的技术支撑吗？</h1><p><img class='w-full' src=\"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cb23c1cca34424c99ab8260bd88d482~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?\" alt=\"\" data-href=\"\" style=\"\"/></p><p><strong>前言</strong></p><p>项目启动会议上，大家各种出排期，各种出方案，大多数人的焦点都放在后端技术方案上，感情大家好像都觉得前期准备工作前端没啥好做的，不都有现成的脚手架吗？别人不都帮你做好了吗？💉💉我丢。。。。你说的好像不是没有道理，但是你真的用过官方的脚手架吗，除了帮我生成项目目录和打包编译之类的配置，还是有些框架层面的东西要我自己做的好吧。我不管我不管，你们都有启动准备排期，我他喵的也要！！🔫</p><p><strong>想想需要做什么</strong></p><p>我争取到了一周的准备（划水摸鱼）时间，主要还是后端的大佬们牛批会争取啊，我只能和他们持平了，啊哈哈哈。先用vue-cli生成一个project吧，想想做些什么，想到以前的做项目通用请求能力封装这一块前期做的不太好，导致后面写起来一堆冗余代码，着实恶心到我了。那我必须前期把这个整整🙌🙌</p>"
    }
  },
};
</script>

<style lang="less" scoped>
.article_detailBox{

}
</style>
