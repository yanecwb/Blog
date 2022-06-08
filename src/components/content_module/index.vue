<template>
  <div>
    <Banner
      bg="https://img.zcool.cn/community/018py56hjpacbuonvklo2l3938.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/format,webp/quality,Q_100"
    />
    <div class="content_moduleBox">
      <article class="content_list">
        <section
          v-for="(list, index) in article_moduleList"
          :key="index"
          :style="index == 0 ? { padding: 'none' } : ''"
        >
          <li class="li" @click="$router.push({name:`article_detail`,params:list})">
            <div :style="list.content.indexOf('<img') != 1 ? { float: 'left', width: '620px' } : ''">
              <div class="content_list_author">
                <span style="padding-left: 0">{{article_classify(list.article_classify)}}</span>
                <span class="text-xs">{{format_publishTime(list.publish_time)}}</span>
                <!-- <span>面试</span> -->
              </div>
              <a class="title">{{list.article_title}}</a>
              <p>
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
              style="width: 120px; height: 80px; float: right; margin-top: 10px"
            />
          </li>
        </section>
      </article>
      <aside class="aside">
        <div class="t">...</div>
        <div>2</div>
        <div>3</div>
      </aside>
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
  }
};
</script>

<style lang="less" scoped>
.content_moduleBox {
  width: 100%;
  height: auto;
  padding: 15px calc((100vw - 1110px) / 2) 0 calc((100vw - 1110px) / 2);
  padding-bottom: 20px;
  margin: 0 auto;
  background-color: #f1f2f3;
  display: flex;
  justify-content: space-between;
  .content_list {
    width: 780px;
    background-color: white;
    section {
      width: 780px;
      padding: 0 15px;
      cursor: pointer;
    }
    .li:hover {
      background-color: #fbfbfb;
    }
    li {
      list-style: none;
      width: 760px;
      height: 150px;
      border-top: 1px solid #e5e6eb;
      padding-top: 15px;

      .content_list_author {
        margin-bottom: 10px;
        width: 100%;
        span {
          position: relative;
          padding: 0 8px;
          line-height: 22px;
          font-size: 13px;
          flex-shrink: 0;
          color: #86909c;
          // border-right: 0.5px #e5e6eb solid;
        }
        span:before {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          display: block;
          width: 1px;
          height: 14px;
          background: #e5e6eb;
          content: " ";
        }
      }
      .title {
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #1d2129;
        width: 100%;
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
        margin: 12px 0;
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
