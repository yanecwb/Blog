<template>
  <div class="box">
    <div class="stars" ref="stars"></div>
    <h1
      style="text-align: center;margin: 0;font-family: 黑体"
    >
      分享你的知识
    </h1>
    <div
      style="width: 79vw;margin: 5px auto 15px; display: flex;align-items: end;flex-direction: column;"
    >
      <div style="border: 1px solid #ccc; width: 100%; margin-bottom: 20px">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 500px; overflow-y: hidden"
          v-model="html"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
        />
      </div>
      <div style='width:79vw;display:flex;justify-content: space-between;'>
      <button class="btn back_btn" @click="goBack()">返回</button>
        <button class="btn upload_article" @click="uploadArticle">上传</button>
      </div>
    </div>
  </div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { uploadArticle } from "../../api/upload_article";
export default {
  name: "upload_article",
  components: { Editor, Toolbar, },
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
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
      const res = await uploadArticle(
        this.html,
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
    document.body.style.overflow = 'hidden' 
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
    if (Number(0)) {
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
    document.body.style.overflow = ''
  },
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("userInfo")) {
      alert(" 请先登录");
      return;
    }
    next();
  },
};
</script>

<style lang="less" scoped>
h1{
   color: #fff;
    text-shadow:
        0 0 10px #0ebeff,
        0 0 20px #0ebeff,
        0 0 50px #0ebeff,
        0 0 100px #0ebeff,
        0 0 200px #0ebeff
}
.box {
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
