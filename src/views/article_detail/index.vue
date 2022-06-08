<template>
  <div class="w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 ">
    <div
      class="w-full md:w-3/5 p-3 mx-auto border-4 border-light-blue-500 border-opacity-100 bg-white );"
    >
      <!-- <div v-html="html"></div> -->
      <div class="text-base md:text-2xl lg:text-3xl font-bold px-32">
        {{ article.article_title }}
      </div>
      <div class="w-full flex justify-between items-center my-3 px-10">
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
          @click="
            $router.push({name:'upload_article',params:article})
          "
          v-if='article.userId == $store.state.userInfo.userInfo.id'
        >
          <!-- +关注 -->
          修改
        </button>
      </div>
      <div v-html="article.content" class="h px-24"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "article_detail",
  data() {
    return {
      article:'',
    };
  },
  async created() {
    console.log(this.$store.state.userInfo.userInfo.id);
    this.$store.commit('change_show_header',false)
    this.$route.params.content ? this.article = this.$route.params : this.article = JSON.parse(localStorage.getItem('article_details'))
    localStorage.setItem('article_details',JSON.stringify(this.article))
  },
};
</script>

<style lang="less">
.h {
  img {
    width: 100%;
}
}
</style>
