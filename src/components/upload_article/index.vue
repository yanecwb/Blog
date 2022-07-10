<template>
  <div class="upload_article_box">
    <div class="stars" ref="stars"></div>
    <h1 class="h1_title mt-9 text-center m-0" style="font-family: 黑体">
      分享你的知识
      <Icon
        type="edit"
        @click="modal_visible = true"
        class="text-base"
        title="修改基本信息"
      />
    </h1>
    <div class="flex items-end flex-col mt-1 mx-auto mb-4 w-4/5">
      <div style="border: 1px solid #ccc" class="w-full mb-5">
        <div id="toolbar-container"></div>
        <div id="editor-container" :style=" $store.state.is_phone ? { height: '50vh' } : { height: '70vh' }" ></div>
      </div>
      <div class="flex justify-between w-full">
        <button class="backBtn font-bold" @click="goBack()">
          <svg
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024"
          >
            <path
              d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"
            ></path>
          </svg>
          <span>首页</span>
        </button>
        <div class="w-3/5 text-white text-center font-bold" >
          <p>1.如果文章有图片请务必点击图片选择图片百分比大小，不要自定义。否则可能出现超出显示区的情况</p>
          <p>2.不要上传视频，必须上传时可将视屏给我，我把链接地址发你（懒得写视频的上传配置了😳）</p>
        </div>
        <button class="sendBtn" @click="uploadArticle">
          <div class="svg-wrapper-1">
            <div class="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span> {{ $route.params.id ? "修改" : "发布" }}</span>
        </button>
      </div>
    </div>
    <Modal
      title="请先确定基本信息"
      okText="确定"
      cancelText="取消"
      :closable="false"
      :mask="true"
      v-model="modal_visible"
      :maskClosable="false"
      @ok="modal_close('ok')"
      @cancel="modal_close()"
    >
      <div class="first_msg">
        <div class="inline-block w-16 font-bold">
          标题<span :class="base_info.article_title ? 'hidden' : 'text-red-600'"
            >*</span
          >：
        </div>
        <Input
          ref="article_title"
          v-model="base_info.article_title"
          class="w-84"
          allow-clear
        />
      </div>
      <div class="first_msg">
        <div class="inline-block w-16 font-bold">
          简介<span :class="base_info.article_introduction ? 'hidden' : 'text-red-600'"
            >*</span
          >：
        </div>
        <textarea
          ref="article_introduction"
          v-model="base_info.article_introduction"
          rows="5"
          class="w-84 focus:outline-none focus:ring focus:border-blue-200  py-1 px-2 box-border"
          allow-clear
        />
      </div>
      <div class="first_msg">
        <div class="inline-block w-16 font-bold">
          分类<span
            :class="base_info.article_classify ? 'hidden' : 'text-red-600'"
            >*</span
          >：
        </div>
        <select
          class="w-32 h-8 rounded-md text-center"
          v-model="base_info.article_classify"
          ref="article_classify"
        >
          <option value="frontend">前端</option>
          <option value="backend">后端</option>
          <option value="android">安卓</option>
          <option value="news">我的生活趣闻</option>
        </select>
        <!-- <Input
          v-model="base_info.article_classify"
          class="w-84"
          allow-clear
        /> -->
      </div>
      <div class="first_msg">
        <div class="inline-block w-16 font-bold">封面：</div>
        <div class="w-64">
          <Upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="/node_api/up/profile"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img
              class="w-36 h-24"
              v-if="base_info.coverUrl"
              :src="base_info.coverUrl"
              alt="avatar"
            />
            <div v-else>
              <Icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </Upload>
        </div>
        <a @click="base_info.coverUrl = ''">不要封面</a>
      </div>
    </Modal>
  </div>
</template>

<script>
import Vue from "vue";
// 富文本编辑器
// import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import {
  createEditor,
  createToolbar,
  // IEditorConfig,
  // IDomEditor,
} from "@wangeditor/editor";
import "@wangeditor/editor/dist/css/style.css";

// 基本信息表单
import { Modal, Upload, Icon, Input } from "ant-design-vue";
Vue.use(Modal);

// api
import { uploadArticle, updateArticle } from "../../api/upload_article";
import { uploadImg,deleteImg } from "../../api/upload_img";

// file转base64
async function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
var editor = {}
export default {
  name: "upload_article",
  components: {
    // Editor,
    // Toolbar,
    Modal,
    Upload,
    Icon,
    Input,
  },
  data() {
    return {
      // editor: null,
      html: "",
      toolbarConfig: {
        // excludeKeys: [ ], /* 隐藏哪些菜单 */
        /* 显示哪些菜单，如何排序、分组 */
        // toolbarKeys: [
        //   'headerSelect', '|', 'bold', 'underline', 'italic', 'color', 'bgColor', '|', 'fontSize', 'fontFamily', 'lineHeight', '|', 'bulletedList', 'numberedList', 'todo', '|', 'emotion', 'insertLink', 'insertTable', 'codeBlock', 'divider',
        // ],
      },
      mode: "default", // or 'simple'
      base_info: {
        article_classify: "frontend",
        coverUrl: "",
      },
      modal_visible: true,
      loading: false,
      imageList1: [], //收集所有上传或者插入的图片，记录为 imageList1
      imageList2: [], //获取当前编辑器的所有图片，记录为 imageList2
    };
  },
  methods: {
    // 取消Modal
    modal_close() {
      this.modal_visible = false;
    },
    handleChange(info) {
      // console.log(this.base_info);
      // console.log(info);
      getBase64(info.file.originFileObj, (coverUrl) => {
        if (coverUrl == localStorage.getItem("coverUrl")) {
          this.$Swal.fire({
            title: "请勿上传同一张图片",
            icon: "warning",
          });
          this.loading = false;
          return;
        }
        if (info.file.status === "uploading") {
          this.base_info.coverUrl = "";
          this.loading = true;
          return;
        }
        // Get this url from response in real world.

        localStorage.setItem("coverUrl", coverUrl);
        uploadImg(coverUrl).then((img) => {
          this.base_info.coverUrl = img.data.data.url;
          this.loading = false;
        });
      });
    },
    beforeUpload(file) {
      console.log(file.type);
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp" || file.type === "image/gif";
      if (!isJpgOrPng) {
        this.$message.error("你只能上传 Jpg/Png/Webp/Gif 类型的图片!");
      }
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("封面图不能大于1MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    async uploadArticle() {
      function getText(str) {
        return str
          .replace(/<[^<p>]+>/g, "") // 将所有<p>标签 replace ''
          .replace(/<[</p>$]+>/g, "") // 将所有</p>标签 replace ''
          .replace(/&nbsp;/gi, "") // 将所有 空格 replace ''
          .replace(/<[^<br/>]+>/g, ""); // 将所有 换行符 replace ''
      }
      function isNull(str) {
        if (str == "") return true;
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
      }

      if (!this.base_info.article_title) {
        this.$message.error("请填写标题");
        this.modal_visible = true;
        this.$nextTick(() => {
          this.$refs.article_title.focus();
        });
        return;
      }
      if (!this.base_info.article_introduction) {
        this.$message.error("请填写简介");
        this.modal_visible = true;
        this.$nextTick(() => {
          this.$refs.article_introduction.focus();
        });
        return;
      }
      if (!this.base_info.article_classify) {
        this.$message.error("请选择分类");
        this.modal_visible = true;
        return;
      }
      if (isNull(getText(this.html))) {
        this.$message.warning("请输入文章内容...");
        return;
      }
      let req = {
        ...this.base_info,
        upload_html: this.html,
        userId: this.$store.state.userInfo.userInfo.id,
        article_id: this.$route.params.id,
      };
      !this.$route.params.id && delete req.article_id;
      const res = this.$route.params.id
        ? await updateArticle(req)
        : await uploadArticle(req);
      this.base_info.coverUrl = "";
      this.base_info.article_title = "";
      this.base_info.article_introduction = "";
      this.html = "";
      // 批量删除不需要的图片
      this.vergleichenImg().length <= 0 ? "" : deleteImg (this.vergleichenImg())
      res.data.code == 200
        ? this.$Swal.fire({
            title: `${this.$route.params.id ? "修改" : "发布"}成功...`,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          }).then(()=>{this.$router.go(-1)})
        : this.$Swal.fire({
            icon: "error",
            title: "发布失败...，请重试",
            footer: '<a href="">遇到问题?</a>',
          })
    },
    // 此处比较之前插入的图片如当前文章任存在的图片
    vergleichenImg() {
      let arr = [];
      this.imageList1.forEach((item) => {
        const existImg = this.imageList2.indexOf(item);
        console.log(existImg);
        if (existImg < 0) {
          //不存在
          arr.push(item.slice(30, 66));
        }
      });
      return arr
    },
    // 星空背景
    starrySkyBg() {
      var stars = 800; /*星星的密集程度，数字越大越多*/
      var $stars = this.$refs.stars;
      var r = 800; /*星星的看起来的距离,值越大越远*/
      for (var i = 0; i < stars; i++) {
        var $star = document.createElement("div");
        $star.className = "star";
        $stars.appendChild($star);
      }
      document.querySelectorAll(".star").forEach(function (e) {
        var s = 0.2 + Math.random() * 1;
        var curR = r + Math.random() * 300;
        e.style.transformOrigin = "0 0 " + curR + "px";
        e.style.transform =
          "translate3d(0,0,-" +
          curR +
          "px) rotateY(" +
          Math.random() * 360 +
          "deg) rotateX(" +
          Math.random() * -50 +
          "deg) scale(" +
          s +
          "," +
          s +
          ")";
        e.style.width = "2px";
        e.style.height = "2px";
      });
    },
  },
  created() {
    localStorage.removeItem("coverUrl", "");
    this.$store.commit('change_isfixed',0)
    this.$store.commit("change_show_footer", false);
    this.$store.commit("change_show_header", false);

    // 模拟 ajax 请求，异步渲染编辑器
    if (this.$route.params.id) {
      //后续修改文章判断
      if (!this.$route.params.id) return;
      const { article_classify, article_title, article_introduction ,coverUrl, content } = JSON.parse(
        localStorage.getItem("article_details")
      );
      this.base_info.article_classify = article_classify;
      this.base_info.article_title = article_title;
      this.base_info.article_introduction = article_introduction
      this.base_info.coverUrl = coverUrl;
      this.html = content;
    }
  },
  mounted() {
    document.body.style.position = "fixed"; //解决再移动端hidden失效问题
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    this.starrySkyBg();

    // 编辑器配置
    const editorConfig = { MENU_CONF: {} };
    editorConfig.MENU_CONF["uploadImage"] = {
      //  base64LimitSize:5 * 1024, //如果图片小于这个大小，则直接是base64，不上传服务器
      async customUpload(file, insertFn) {
        getBase64(file, (img) => {
          uploadImg(img).then((data) => {
            const { url, alt, href } = data.data.data;
            insertFn(url, alt, href);
          });
        });
      },
    };
    // 收集所有上传或者插入的图片，记录为 imageList1
    editorConfig.MENU_CONF["insertImage"] = {
      onInsertedImage: (imageNode) => {
        if (imageNode == null) return;

        // const { src, alt, url, href } = imageNode;
        const { src } = imageNode;
        // console.log("inserted image", src);
        this.imageList1.push(src);
      },
    };
    editorConfig.placeholder = "请输入内容...";
    editorConfig.onChange = () => {
      // 当编辑器选区、内容变化时，即触发
      // const content = editor.children;
      // const contentStr = JSON.stringify(content);
      // document.getElementById("textarea-1").value = contentStr;

      this.html = editor.getHtml();
      // console.log(editor.getText());//获取纯文本内容。不包括媒体资源
    };
// 配置代码高亮
// editorConfig.MENU_CONF['codeSelectLang'] = {
//     // 代码语言
//     codeLangs: [
//         { text: 'CSS', value: 'css' },
//         { text: 'HTML', value: 'html' },
//         { text: 'XML', value: 'xml' },
//         { text: 'JavaScript', value: 'javascript' },
//         { text: 'TypeScript', value: 'typescript' },
//         { text: "JSX", value: "jsx" },
//         { text: 'Go', value: 'go' },
//         { text: 'Java', value: 'java' },
//         { text: 'Python', value: 'python' },
//         { text: 'PHP', value: 'php' },
//         { text: 'C++', value: 'cpp' },
//         { text: 'SQL', value: 'sql' },
//         { text: 'MarkDown', value: 'markdown' },
//         // 其他
//     ]
// }
    // 工具栏配置
    const toolbarConfig = {};
    // 创建编辑器
    editor = createEditor({
      selector: "#editor-container",
      config: editorConfig,
      mode: "default", // 或 'simple'
      html: this.html,
    });
    // console.log(this.editor);
    console.log(editor.getMenuConfig('codeSelectLang').codeLangs);
    // 创建工具栏
    createToolbar({
      editor,
      selector: "#toolbar-container",
      config: toolbarConfig,
      mode: "default",
    });
    document.querySelector("div[role='textarea']").onblur = () => {
      // console.log(editor.getElemsByType('image'));//获取当前编辑器的所有图片，记录为 imageList2
      this.imageList2 = editor.getElemsByType("image").map((item) => {
        return item.src;
      });
    };
  },
  beforeDestroy() {
    editor.destroy()
    document.body.style.position = "static"; //解决再移动端hidden失效问题
    document.getElementsByTagName("body")[0].style.overflow = 'auto';
    this.$store.commit("change_show_header", true);
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
};
</script>

<style lang="less">
/* From uiverse.io by @adamgiebl */
@font-face {
  font-family: firaCode;
  src: url("../../assets/font/FiraCode-Bold-5.ttf") format("truetype")
}

pre {
  background-color: rgb(236, 230, 230);
  display: flex;
  justify-content: space-between;
  color: rgb(29, 25, 25);
  code{
  background-color: rgb(236, 230, 230) !important;
  font-family:'firaCode';
  font-size: 14px;
  }
}
.sendBtn {
  font-family: inherit;
  width: 100px;
  height: 3em;
  font-size: 15px;
  background: royalblue;
  color: white;
  padding: 0.6em 1.2em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s;
}

.sendBtn span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

.sendBtn svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

.sendBtn:hover .svg-wrapper {
  animation: fly-1 0.6s ease-in-out infinite alternate;
}

.sendBtn:hover svg {
  transform: translateX(1.2em) rotate(45deg) scale(1.1);
}

.sendBtn:hover span {
  transform: translateX(5em);
}

.sendBtn:active {
  transform: scale(0.95);
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}

.backBtn {
  display: flex;
  height: 3em;
  width: 100px;
  font-size: 15px;
  padding: 0.6em 1.2em;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee4b;
  border-radius: 5px;
  letter-spacing: 1px;
  transition: all 0.2s linear;
  cursor: pointer;
  border: none;
  background: #fff;
}

.backBtn > svg {
  margin-right: 5px;
  margin-left: 5px;
  font-size: 20px;
  transition: all 0.4s ease-in;
}

.backBtn:hover > svg {
  font-size: 1.2em;
  transform: translateX(-5px);
}

.backBtn:hover {
  box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
  transform: translateY(-2px);
}

.avatar-uploader > .ant-upload {
  width: 160px;
  height: 90px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.first_msg {
  @apply flex justify-start w-full mt-6 items-center;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.swal2-popup.swal2-toast {
  padding: 7px 0;
}
.swal2-title {
  font-size: 16px !important;
}
.h1_title {
  color: #fff;
  text-shadow: 0 0 10px #0ebeff, 0 0 20px #0ebeff, 0 0 50px #0ebeff,
    0 0 100px #0ebeff, 0 0 200px #0ebeff;
}
.upload_article_box {
  width: 100vw;
  height: 100vh;
  background: radial-gradient(
    200% 100% at bottom center,
    #f7f7b6,
    #e96f92,
    #75517d,
    #1b2947
  );
  background: radial-gradient(
    220% 105% at top center,
    #1b2947 10%,
    #75517d 40%,
    #e96f92 65%,
    #f7f7b6
  );
  background-attachment: fixed;
  overflow: hidden;
  .stars {
    transform: perspective(500px);
    transform-style: preserve-3d;
    position: absolute;
    bottom: 0;
    perspective-origin: 50% 100%;
    left: 50%;
    animation: rotate 90s infinite linear;
    .star {
      width: 2px;
      height: 2px;
      background: #f7f7b6;
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: 0 0 -300px;
      transform: translate3d(0, 0, -300px);
      backface-visibility: hidden;
    }
  }
}

@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}
</style>
