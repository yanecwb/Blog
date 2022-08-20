<template>
  <div class="initBg">
    <Banner :bg="module_headerBg"/>
    <div v-if="!loadingLottie">
      <div
      class="content_moduleBox pt-5 mx-auto my-0 w-full flex justify-between  flex-col items-center"
      v-if="!loadingLottie &&article_moduleList.length > 0"
      ref="Article1"
    >
      <!-- <Bgcanvas  />  -->
      <article class="content_list opacity-90 bg-white w-full md:w-3/5 my-0 mx-auto shadow-xl min-h-116 animate__animated animate__fadeInUp rounded-lg">
        <a :href="formatHref(list.id)" target="_blank"  v-for="(list, index) in article_moduleList" :key="index"  style="text-decoration:none">
          <section
            :style="index == 0 ? { padding: 'none' } : ''"
            class="cursor-pointer py-0 px-4  hover:bg-gray-100 group"
          >
            <li
              class="mb-1 flow-root list-none  pt-4 hover:opacity-100"
              :style="index == 0 ? {border:'none'} : ''"
            >
              <div
                :class="list.coverUrl ? 'float-left w-64 md:w-56 lg:w-64' : ''"
              >
                <div class="content_list_author">
                  <span class="mr-2">{{
                    list.nickname
                  }}<span v-if="list.nickname == 'Flechazo'" class=" inline-block ml-2" style="font-family: PingFang SC,Microsoft YaHei,sans-serif;
                    color: #FFF; padding: .1rem .25rem; font-size: .5rem; border-radius: .25rem;background-color: #ff5050;">博主</span></span>
                  <span class="text-xs">{{
                    list.publish_time
                  }}</span>
                  <!-- <span>面试</span> -->
                </div>
                <p class="title md:text-base font-semibold mt-1 md:w-96 xl:w-180 w-full text-xs group-hover:underline" >
                  {{ list.article_title}}_
                </p>
                <p
                  class="my-2 md:my-4 md:w-96  xl:w-180 w-full text-xs whitespace-nowrap overflow-hidden group-hover:underline"
                >
                  {{list.article_introduction}}
                </p>
                <div class="content_list_flow flex">
                  <div style="padding-left: 0"><Icon type="eye" />{{list.readCount}}</div>
                  <div class="zan"><Icon type="like" />{{list.likeCount}}</div>
                  <div class="comment"> <Icon type="message" />{{list.commentCount}}</div>
                </div>
              </div>
              <div  v-if="list.coverUrl" class="w-28 md:w-32 h-16 md:h-20 float-right mt-5" :style="{backgroundImage:`url(${list.coverUrl})`,backgroundSize:'100% 100%'}"></div>
            </li>
          </section>
        </a>
      </article>
      <Pagination v-model="current" :total="total" show-less-items class="my-5" @change='current_Change'/>
    </div>
    <Empty
      v-if='!loadingLottie && article_moduleList.length == 0'
      class="my-24 min-h-116"
      image="https://s1.hdslb.com/bfs/static/laputa-search/client/assets/empty.3709c24c.png"
      :image-style="{
        height: '200px',
      }"
    >
      <span slot="description">💨</span>
    </Empty>
    </div>
    <lottie
        v-else
        style="width: 200px; height: 600px;"
        :options="defaultOptions"
        class="z-9999 opacity-80"
      />
  </div>
</template>

<script>
import { Icon , Empty,Pagination } from "ant-design-vue";
import animationData from "../../assets/lottie/loadingLottie.json";
import Banner from "../../views/banner";
import Bgcanvas from "../../components/Bgcanvas/index.vue";
import { Get_Article_ModuleList } from "../../api/article_list";
export default {
  name: "content_module",
  data() {
    return {
      article_moduleList: [],
      articleHeight: 0,
      total:0,
      current:1,
      defaultOptions: { animationData: animationData },
      loadingLottie:true
    };
  },
  components: {
    Icon,
    Banner,
    Empty,
    Bgcanvas,
    Pagination
  },
  computed: {
    module_name() {
      return this.$route.params.module;
    },
    module_headerBg() {
      const obj = {
        'frontend':()=> 'https://tva1.sinaimg.cn/large/e8a55238gy1h51v48hzmaj22yo1o0wxb.jpg',
        'backend':()=>'https://tva1.sinaimg.cn/large/e8a55238gy1h51v48ifl7j22yo1o0njp.jpg',
        'android':()=>'https://tva1.sinaimg.cn/large/e8a55238gy1h51v48kxy9j22yo1tohdt.jpg',
        'news':()=>'https://tva1.sinaimg.cn/large/e8a55238gy1h51vnfkhcbj23vc2qdhdu.jpg'
      }
      return obj[this.$route.params.module]()
    },
  },
  watch: {
    module_name: {
      immediate: true,
      async handler(newval) {
        this.getArticle(newval,1)
        this.$nextTick(()=>{
            if(!this.$refs.Article1) return
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
  methods:{
    async getArticle(newval,current){
        this.loadingLottie = true
        const res = await Get_Article_ModuleList(newval,current);
        this.total = res.data.total
        this.article_moduleList = res.data.article_moduleList.map(item=>{
          let commentCount = 0 //文章评论量
          let like = 0//文章点赞量
          item.commenter = JSON.parse(item.commenter)
          if(item.commenter && item.commenter.length > 0){
            item.commenter.forEach(i=>{
              // i.like ? like++ : ''
              commentCount += i.comment.length
            })
          }
          return {
            ...item,
            commentCount,
            like,
            publish_time:this.format_publishTime(item.publish_time)
          }
        })
        this.lottieTimer = setTimeout(() => {
            this.loadingLottie=false
        }, 300);
    },
    current_Change(current){
      this.current = current
      this.getArticle(this.$route.fullPath.split('/')[2],current)
    },
    formatHref(id){
      return location.origin + '/article_detail/'+id
    }
  },
  created() {
    this.$store.commit("change_show_header", true);
  },
  beforeDestroy(){
    clearTimeout(this.lottieTimer)
  }
};
</script>

<style lang="less" scoped>
.content_moduleBox {
  .content_list {
    li {
      border-top: solid 1px #e5e6eb;
      .title {
        line-height: 24px;
        color: #1d2129;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
}
</style>
