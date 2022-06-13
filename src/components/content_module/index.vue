<template>
  <div>
    <Banner
      :bg='module_headerBg'
    />
    <div class="content_moduleBox w-full">
      <article class="content_list w-full md:w-300 my-0 mx-auto">
        <section
          v-for="(list, index) in article_moduleList"
          :key="index"
          :style="index == 0 ? { padding: 'none' } : ''"
        >
          <li class="li mb-1" @click="$router.push({name:`article_detail`,params:list})">
            <div :class="list.coverUrl  ? 'float-left w-64': ''">
              <div class="content_list_author">
                <span style="padding-left: 0">{{article_classify(list.article_classify)}}</span>
                <span class="text-xs">{{format_publishTime(list.publish_time)}}</span>
                <!-- <span>面试</span> -->
              </div>
              <a class="title md:text-base">{{list.article_title}}</a>
              <p class="my-2 md:my-4">
                Web3.0来了，花呗借呗前端团队开源的Web图形引擎会成为元宇宙的技术支撑吗？
              </p>
              <div class="content_list_flow">
                <div style="padding-left: 0"><Icon type="eye" />1.1w</div>
                <div class="zan"><Icon type="like" />105</div>
                <div class="comment">
                  <Icon type="message" />
                </div>
              </div>
            </div>
            <img
              v-if="list.coverUrl"
              :src="list.coverUrl"
              class=" w-28 md:32 h-16 md:h-20 float-right mt-5"
            />
          </li>
        </section>
      </article>
    </div>
  </div>
</template>

<script>
import { Icon } from "ant-design-vue";
import Banner from "../../views/banner";
import { Get_Article_ModuleList } from "../../api/article_list";
export default {
  name: "content_module",
  data() {
    return {
      article_moduleList: [],
    };
  },
  components: {
    Icon,
    Banner,
  },
  computed: {
    module_name() {
      return this.$route.params.module;
    },
    module_headerBg(){
      return `http://47.107.243.60:5003/img/module_headerBg/${this.$route.params.module}.jpg`
    }

  },
  watch: {
    module_name: {
      immediate: true,
      async handler(newval) {
        const res = await Get_Article_ModuleList(newval);
        this.article_moduleList = res.data.article_moduleList
      },
    },
  },
  methods:{
    article_classify(classify){
      const obj = {
        frontend:'前端',
        backend:'后端',
        android:'安卓',
        news:'生活趣闻'
      }
      return obj[classify]
    },
  },
  created(){
    this.$store.commit("change_show_header", true);
  }
};
</script>

<style lang="less" scoped>
.content_moduleBox {
  height: auto;
  // padding: 15px calc((100vw - 1110px) / 2) 0 calc((100vw - 1110px) / 2);
  padding-bottom: 20px;
  margin: 0 auto;
  background-color: #f1f2f3;
  display: flex;
  justify-content: space-between;
  .content_list {
    background-color: white;
    section {
      padding: 0 15px;
      cursor: pointer;
    }
    .li:hover {
      background-color: #fbfbfb;
    }
    li {
      list-style: none;
      border-top: 1px solid #e5e6eb;
      padding-top: 15px;
      .title {
        font-weight: 600;
        line-height: 24px;
        color: #1d2129;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      p {
        width: 100%;
        color: #86909c;
        font-size: 12px;
        line-height: 22px;
        white-space: nowrap;
        overflow: hidden;
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
