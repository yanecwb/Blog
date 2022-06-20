<template>

  <div class="w-full  h-aotu" style="background-color:#f4f8fb">
   <iframe frameborder="0" scrolling="no" src="http://47.107.243.60:5003/colokBanner.html" class="w-full" height="500px"></iframe>
    <div
      class="w-full md:w-3/5 md:mt-14 p-3 pt-1 mx-auto border-4 border-light-blue-500 border-opacity-100 bg-white shadow-2xl);"
    >
      <div ><Icon type="left" class="text-white"/></div>
      <div class="text-base md:text-2xl lg:text-3xl font-bold md:px-1 mt-3 md:mt-0">
        {{ article.article_title }}
      </div>
      <div class="w-full flex justify-between items-center my-3 px-1 md:px-1">
        <div class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
          <img
            :src="article.uper.avatarUrl"
            class="w-full h-full rounded-full"
            alt=""
          />
        </div>
        <div
          class="felx justify-start items-start flex-grow text-xs ml-1 md:ml-3 lg:ml-5"
        >
          <p class="m-0 text-black md:text-base">{{article.uper.nickname}}</p>
          <p
            class="m-0 w-48 md:w-72 lg:w-full overflow-hidden whitespace-nowrap overflow-ellipsis"
          >
            {{article.publish_time}} 阅读9866
          </p>
        </div>
        <button
          class="border-none w-14 h-6 lg:w-20 lg:h-8 bg-gradient-to-r from-blue-300 via-purple-500 to-purple-900 text-white rounded-md"
          @click="go_up_article(article)"
          v-if='article.userId == $store.state.userInfo.userInfo.id'
        >
          <!-- +关注 -->
          修改
        </button>
      </div>
      <div v-html="article.content" class=" px-3 md:px-18"></div>
    </div>
  </div>
</template>

<script>
import {Icon} from 'ant-design-vue'
import Banner from "../../views/banner";
export default {
  name: "article_detail",
  components:{
    Icon,
    Banner
  },
  data() {
    return {
      article:'',
    };
  },
  async created() {
    // this.$store.commit('change_show_header',false)
    this.$route.params.content ? this.article = this.$route.params : this.article = JSON.parse(localStorage.getItem('article_details'))
    localStorage.setItem('article_details',JSON.stringify(this.article))
  },
};
</script>

<style lang="less">
pre{
  background-color: #f6f8fa;
  display: flex;
  justify-content: space-between;
}
pre::after{
  content: '复制';
  color: rgb(190, 179, 179);
  cursor: pointer;
}
.h {
  img {
    width: 100%;
  }
}
</style>
