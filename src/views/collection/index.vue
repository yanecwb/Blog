<template>
  <div class="relative top-0 about_me_box">
    <Banner
      bg="http://flechazoblog.site:5006/img/module_headerBg/about_mg.jpg"
      class="absolute w-screen h-full"
      style="z-index: -100"
    />
    <div class="top-0 w-4/5 h-full about_me_bg md:w-1/2">
      <div
        class="h-full p-3 overflow-auto msgScoll"
        style="background-color: rgba(255, 255, 255, 0.6)"
      >
        <div class="flex items-center justify-between pb-6"><p class="text-base font-bold opacity-90 md:text-xl">我的收藏</p><input type="text" placeholder="搜索"><Icon type="search" class="text-xl cursor-pointer hover:text-blue-500"/></div>
        <div class="flex flex-col justify-start mb-3">
          <div
          class="relative float-left w-full"
          :style="index == 5 ? '':'border-bottom: 1px solid gray'"
          :class="index == 0 ? '' : 'pt-6'"
          v-for="(i, index) in 6"
          :key="index"
        >
        <div class="absolute text-6xl text-black right-10 top-5 opacity-10"><i>{{index + 1}}</i></div>
          <div class="content_list_author">
            <span class="mr-2"
              >{{ "作者名"
              }}<span
                class="inline-block px-1 py-0 ml-2 text-xs text-white rounded-sm bg-122"
                >作者</span
              ></span
            >
            <span class="text-xs">{{ "2022-11-2 12:12" }}</span>
          </div>
          <p
            class="w-full mt-1 text-xs font-semibold title text1-overHidden md:text-base md:w-96 xl:w-180 group-hover:underline"
          >
            {{ "文章标题" }}
          </p>
          <p
            class="w-full my-2 overflow-hidden text-xs md:my-4 md:w-96 xl:w-180 whitespace-nowrap group-hover:underline"
          >
            {{ "文章描述" }}
          </p>
          <div class="flex content_list_flow">
            <div style="padding-left: 0"><Icon type="eye" />{{ 99 }}</div>
            <div class="zan"><Icon type="like" />{{ 99 }}</div>
            <div class="comment"><Icon type="message" />{{ 99 }}</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import { Icon } from 'ant-design-vue'
import Banner from '@/views/banner'
import {getCOllection} from '@/api/userInfo.js'
export default defineComponent({
  name: 'myCollection',
  components: { Icon, Banner },
  setup() {
    getCOllection({userId:JSON.parse(localStorage.getItem('userInfo')).id}).then((data)=>{data}).catch((err)=>{console.log(err);})
    return {}
  }
})
</script>

<style lang="less" scoped>
.about_me_box {
  width: 100%;
  height: 100vh;

  .about_me_bg {
    margin: 0 auto;
    padding-top: 80px;
  }
}

input {
  outline-style: none;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px 14px;
  width: 800px;
  font-size: 14px;
  font-weight: 700;
  font-family: "Microsoft soft";
  background-color: transparent;
}

.content_list_flow {
  div {
    padding: 0 8px;
    cursor: pointer;
  }

  .comment:hover,
  .zan:hover {
    color: #5869da;
  }
}
</style>
