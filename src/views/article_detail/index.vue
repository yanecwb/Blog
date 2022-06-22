<template>
  <div class="w-full h-aotu" style="background-color: #f4f8fb">
    <iframe
      frameborder="0"
      scrolling="no"
      src="http://47.107.243.60:5003/colokBanner.html"
      class="w-full"
      height="500px"
    ></iframe>
    <div
      class="w-full md:w-3/5 md:mt-14 pt-1 mx-auto border-4 border-light-blue-500 border-opacity-100 bg-white shadow-2xl);"
    >
      <div
        class="text-xl md:text-2xl lg:text-3xl font-bold md:px-1 mt-3 md:mt-0"
      >
        {{ article.article_title }}
      </div>
      <div class="w-full flex justify-between items-center my-3 shadow-sm">
        <div class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
          <img
            :src="article.uper.avatarUrl"
            class="w-full h-full rounded-full"
            alt=""
            crossorigin
          />
        </div>
        <div
          class="felx justify-start items-start flex-grow text-xs ml-1 md:ml-3 lg:ml-5"
        >
          <p class="m-0 text-black md:text-base">{{ article.uper.nickname }}</p>
          <p
            class="m-0 w-48 md:w-72 lg:w-full overflow-hidden whitespace-nowrap overflow-ellipsis"
          >
            {{ article.publish_time }} 阅读9866
          </p>
        </div>
        <button
          class="editBtn text-xs md:text-base"
          @click="go_up_article(article)"
          v-if="article.userId == $store.state.userInfo.userInfo.id"
        >
          修改
        </button>
        <Tooltip>
          <template slot="title">
            {{
              article.userId == $store.state.userInfo.userInfo.id
                ? tip
                : "谢谢喜欢 🤪"
            }}
          </template>
          <button class="follows text-xs md:text-base" @click="followsAuthor">
            <span class="button-content">
              关注
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H24V24H0z" fill="none"></path>
                <path
                  d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </button>
        </Tooltip>
      </div>
      <div v-html="article.content" class="px-3 md:px-18"></div>
    </div>
  </div>
</template>

<script>
import { Tooltip } from "ant-design-vue";
export default {
  name: "article_detail",
  components: {
    Tooltip,
  },
  data() {
    return {
      article: "",
      tip: "您时刻都在关注您自己！😁",
      count: 0,
    };
  },
  methods: {
    followsAuthor() {
      this.count++;
      if (this.article.userId == this.$store.state.userInfo.userInfo.id) {
        if (this.count > 10) {
          this.tip = "别调皮😤";
        }
        return;
      }
    },
  },
  async created() {
    // this.$store.commit('change_show_header',false)
    this.$route.params.content
      ? this.article = this.$route.params
      : (this.article = JSON.parse(localStorage.getItem("article_details")));
    localStorage.setItem("article_details", JSON.stringify(this.article));
  },
  mounted() {
    // 代码块内容复制
    const pre = document.getElementsByTagName("pre");
    // 给伪元素添加事件，采用事件冒泡的机制实现
    Array.from(pre).forEach((item) => {
      item.children[0].onclick = (e) => {
        e.stopPropagation();
        return;
      };
      item.addEventListener(
        "click",
        () => {
          const content = item.children[0].innerText;
          navigator.clipboard
            .writeText(content)
            .then(() => {
              const Toast = this.$Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", this.$Swal.stopTimer);
                  toast.addEventListener("mouseleave", this.$Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "success",
                title: "复制成功🥰",
              });
            })
            .catch((err) => {});
        },
        false
      );
    });
  },
};
</script>

<style lang="less">
pre {
  background-color: #f6f8fa;
  display: flex;
  justify-content: space-between;
  &::after {
    content: "copy";
    color: rgb(190, 179, 179);
    cursor: pointer;
  }
}
.h {
  img {
    width: 100%;
  }
}
/* From uiverse.io */
.follows {
  font-family: inherit;
  font-weight: 700;
  padding: 4px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  color: black;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  background: linear-gradient(
    0deg,
    #df5e88,
    rgba(0, 91, 187, 1) 47%,
    rgba(0, 91, 187, 1) 100%
  );
}

.follows .button-content {
  display: flex;
  align-items: center;
  background: white;
  padding: 0.2em 0.9em;
  // padding-left: 1.2em;
  border-radius: 16px;
}

.follows svg {
  width: 18px;
  height: 18px;
  margin-left: 6px;
  color: #ff0000;
  transition: transform 0.3s;
}

.follows:hover svg {
  transform: scale(1.2);
}
.editBtn {
 width: 90px;
 height: 35px;
 margin: 0.5em;
 background: black;
 color: white;
 border: none;
  border-radius: 50px;
 font-weight: bold;
 cursor: pointer;
 position: relative;
 overflow: hidden;
}

.editBtn:hover {
 color: black;
}

.editBtn:after {
 content: "";
 background: white;
 position: absolute;
 z-index: -1;
 left: -20%;
 right: -20%;
 top: 0;
 bottom: 0;
 transform: skewX(-45deg) scale(0, 1);
 transition: all 0.5s;
}

.editBtn:hover:after {
 transform: skewX(-45deg) scale(1, 1);
 -webkit-transition: all 0.5s;
 transition: all 0.5s;
}
</style>
