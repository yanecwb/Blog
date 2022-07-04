<template>
  <div>
    <Banner :bg="module_headerBg" />
    <div
      class="content_moduleBox mt-5 mx-auto my-0 w-full flex justify-between animate__animated animate__fadeInUp"
      v-show="article_moduleList.length > 0"
      ref="Article1"
    >
      <Bgcanvas :height="articleHeight" />
      <article class="content_list w-full md:w-3/5 my-0 mx-auto shadow-xl">
        <section
          v-for="(list, index) in article_moduleList"
          :key="index"
          :style="index == 0 ? { padding: 'none' } : ''"
          class="cursor-pointer py-0 px-4  hover:bg-gray-100"
        >
          <li
            class="mb-1 flow-root list-none  pt-4 hover:opacity-100"
            :style="index == 0 ? {border:'none'} : ''"
            @click="$router.push({ name: `article_detail`, params: list })"
          >
            <div
              :class="list.coverUrl ? 'float-left w-64 md:w-56 lg:w-64' : ''"
            >
              <div class="content_list_author">
                <span class="mr-2">{{
                  list.uper.nickname
                }}</span>
                <span class="text-xs">{{
                 list.publish_time
                }}</span>
                <!-- <span>面试</span> -->
              </div>
              <a class="title md:text-base font-semibold mt-1 md:w-56 xl:w-180 w-full text-xs whitespace-nowrap overflow-hidden ">
                <span>{{ list.article_title}}_</span>
              </a>
              <p
                class="my-2 md:my-4 md:w-56  xl:w-180 w-full text-xs whitespace-nowrap overflow-hidden"
              >
                {{list.article_introduction}}
              </p>
              <div class="content_list_flow flex">
                <div style="padding-left: 0"><Icon type="eye" />1.1w</div>
                <div class="zan"><Icon type="like" />105</div>
                <div class="comment"> <Icon type="message" />{{list.commentCount}}</div>
              </div>
            </div>
            <div  v-if="list.coverUrl" class="w-28 md:w-32 h-16 md:h-20 float-right mt-5" :style="{backgroundImage:`url(${list.coverUrl})`,backgroundSize:'100% 100%'}"></div>
          </li>
        </section>
      </article>
    </div>
    <Empty
      v-if='article_moduleList.length == 0'
      class="my-24"
      image="https://s1.hdslb.com/bfs/static/laputa-search/client/assets/empty.3709c24c.png"
      :image-style="{
        height: '200px',
      }"
    >
      <span slot="description">💨</span>
    </Empty>
  </div>
</template>

<script>
import { Icon , Empty } from "ant-design-vue";
import Banner from "../../views/banner";
import Bgcanvas from "../../components/Bgcanvas/index.vue";
import { Get_Article_ModuleList } from "../../api/article_list";
export default {
  name: "content_module",
  data() {
    return {
      article_moduleList: [],
      articleHeight: 0,
    };
  },
  components: {
    Icon,
    Banner,
    Empty,
    Bgcanvas,
  },
  computed: {
    module_name() {
      return this.$route.params.module;
    },
    module_headerBg() {
      return `http://47.107.243.60:5005/img/module_headerBg/${this.$route.params.module}.jpg`;
    },
  },
  watch: {
    module_name: {
      immediate: true,
      async handler(newval) {
        const res = await Get_Article_ModuleList(newval);
        this.article_moduleList = res.data.article_moduleList.map(item=>{
          let commentCount = 0
          if(item.commenter && item.commenter.length > 0){
            item.commenter.forEach(i=>{
              commentCount += i.comment.length
            })
          }
          return {
            ...item,
            commentCount,
            publish_time:this.format_publishTime(item.publish_time)
          }
        })
        this.$nextTick(()=>{
            this.articleHeight = this.$refs.Article1.offsetHeight;
            if(this.article_moduleList.length < 5 && this.article_moduleList.length>0 ){
                this.articleHeight = 520
               this.$store.commit('change_isfixed',1)
            }else{
                this.$store.commit('change_isfixed',0)
            }
        })
      },
    },
  },
  created() {
    this.$store.commit("change_show_header", true);
  },
};
</script>

<style lang="less" scoped>
.content_moduleBox {
  .content_list {
    background-color: white;
    opacity: 0.9;
    li {
      border-top: solid 1px #e5e6eb;
      .title {
        line-height: 24px;
        color: #1d2129;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }

      p {
        color: #86909c;
        line-height: 22px;
        text-overflow: ellipsis;
      }

      .content_list_flow {
        display: flex;

        div {
          padding: 0 8px;
          cursor: pointer;
        }

        .comment:hover,
        .zan:hover {
          color: #5869da;
        }
      }
    }
  }

  .aside {
    width: calc(100% - 790px);
    height: 200px;
    background-color: white;

    .t {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
