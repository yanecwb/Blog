<template>
  <div class="upload_article_box">
    <div class="stars" ref="stars"></div>
    <h1
      class="h1_title"
      style="text-align: center; margin: 0; font-family: 黑体"
    >
      分享你的知识
    </h1>
    <div
      style="
        width: 79vw;
        margin: 5px auto 15px;
        display: flex;
        align-items: end;
        flex-direction: column;
      "
    >
      <div style="border: 1px solid #ccc; width: 100%; margin-bottom: 20px">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 80vh; overflow-y: hidden"
          v-model="html"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
        />
      </div>
      <div style="width: 79vw; display: flex; justify-content: space-between">
        <button class="btn back_btn" @click="goBack()">返回</button>
        <button class="btn upload_article_btn" @click="uploadArticle">
          {{ $route.params.article_id ? "修改" : "上传" }}
        </button>
      </div>
    </div>
    <Modal v-model="modal_visible">
      <div class="clearfix">
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      list-type="picture-card"
      v-model="fileList"
      @preview="handlePreview"
    >
      <div v-if="fileList.length < 8">
        <PlusOutlined />
        <div class="ant-upload-text">Upload</div>
      </div>
    </Upload>
  </div>
    </Modal>
  </div>
</template>

<script>
// 富文本编辑器
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";

// 基本信息表单
import { Modal,Upload,PlusOutlined } from 'ant-design-vue'

// api
import { uploadArticle, updateArticle } from "../../api/upload_article";
export default {
  name: "upload_article",
  components: { Editor, Toolbar,Modal,Upload,PlusOutlined },
  data() {
    return {
      editor: null,
      html: '<h1 class=\'text-sm md:text-xl lg:text-2xl\' style="text-indent: 0px; text-align: start; line-height: 1.31;">Web3.0来了，花呗借呗前端团队开源的Web图形引擎会成为元宇宙的技术支撑吗？</h1><p><img class=\'w-full\' src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cb23c1cca34424c99ab8260bd88d482~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?" alt="" data-href="" style=""/></p><p><strong>前言</strong></p><p>项目启动会议上，大家各种出排期，各种出方案，大多数人的焦点都放在后端技术方案上，感情大家好像都觉得前期准备工作前端没啥好做的，不都有现成的脚手架吗？别人不都帮你做好了吗？💉💉我丢。。。。你说的好像不是没有道理，但是你真的用过官方的脚手架吗，除了帮我生成项目目录和打包编译之类的配置，还是有些框架层面的东西要我自己做的好吧。我不管我不管，你们都有启动准备排期，我他喵的也要！！🔫</p><p><strong>想想需要做什么</strong></p><p>我争取到了一周的准备（划水摸鱼）时间，主要还是后端的大佬们牛批会争取啊，我只能和他们持平了，啊哈哈哈。先用vue-cli生成一个project吧，想想做些什么，想到以前的做项目通用请求能力封装这一块前期做的不太好，导致后面写起来一堆冗余代码，着实恶心到我了。那我必须前期把这个整整🙌🙌</p>',
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
      module:'frontend',
      modal_visible:true,
      fileList:[{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      }]
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
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

      if (isNull(getText(this.html))) {
        this.$message.warning("请输入文章内容...");
        return;
      }
      const res = this.$route.params.article_id
        ? await updateArticle(
            this.html,
            this.$store.state.userInfo.userInfo.id,
            this.$route.params.article_id
          )
        : await uploadArticle(
            this.html,
            this.module,
            this.$store.state.userInfo.userInfo.id
          );
      res.data.code == 200
        ? this.$Swal.fire({
            title: "发布成功...",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          })
        : this.$Swal.fire({
            icon: "error",
            title: "发布失败...，请重试",
            footer: '<a href="">遇到问题?</a>',
          });

      this.html = "";
    },
  },
  created() {
    this.$store.commit("change_show_footer", false);
  },
  mounted() {
    document.body.style.position = "fixed"; //解决再移动端hidden失效问题
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    var stars = 800; /*星星的密集程度，数字越大越多*/
    var $stars = this.$refs.stars;
    var r = 800; /*星星的看起来的距离,值越大越远,可自行调制到自己满意的样子*/
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
    // 模拟 ajax 请求，异步渲染编辑器
    if (this.$route.params.article_id) {
      //后续修改文章判断
      setTimeout(() => {
        // this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
      }, 1500);
    }
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 销毁编辑器
    document.body.style.position = "static"; //解决再移动端hidden失效问题
    document.getElementsByTagName("body")[0].style.overflow = "";
  },
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("userInfo")) {
      alert(" 请先登录");
      return;
    }
    next((vm) => {
      if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        const Toast = vm.$Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", vm.$Swal.stopTimer);
            toast.addEventListener("mouseleave", vm.$Swal.resumeTimer);
          },
        });

        Toast.fire({
          width:'80%',
          height:'100px',
          icon: "info",
          title: "请在PC端发布或修改文章...",
          heightAuto:false
        });
        next('/article_detail')
      }
    });
  },
};
</script>

<style lang="less">
.swal2-popup.swal2-toast{
  padding: 7px 0;
}
.swal2-title{
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
