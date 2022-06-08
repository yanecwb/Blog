<template>
  <div class="upload_article_box">
    <div class="stars" ref="stars"></div>
    <h1
      class="h1_title mt-9 text-center m-0 "
      style="font-family: 黑体"
    >
      分享你的知识
      <Icon
        type="edit"
        @click="modal_visible = true"
        class="text-base"
        title="修改基本信息"
      />
    </h1>
    <div
      class="flex items-end flex-col mt-1 mx-auto mb-4 w-4/5"
    >
      <div style="border: 1px solid #ccc;" class="w-full mb-5">
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
      <div style="width: 79vw;" class="flex justify-between">
        <button class="btn back_btn" @click="goBack()">返回</button>
        <button class="btn upload_article_btn" @click="uploadArticle">
          {{ $route.params.id ? "修改" : "发布" }}
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
            @preview="handlePreview"
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
      </div>
    </Modal>
  </div>
</template>

<script>
import Vue from "vue";
// 富文本编辑器
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";

// 基本信息表单
import { Modal, Upload, Icon, Input } from "ant-design-vue";
Vue.use(Modal);

// api
import { uploadArticle, updateArticle } from "../../api/upload_article";
import { uploadImg } from "../../api/upload_img";

async function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "upload_article",
  components: { Editor, Toolbar, Modal, Upload, Icon, Input },
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
      base_info: {
        article_classify: "frontend",
      },
      modal_visible: true,
      loading: false,
      previewVisible: false,
      previewImage: "",
    };
  },
  methods: {
    // 取消Modal
    modal_close() {
      this.modal_visible = false;
    },
    // 图片放大
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange(info) {
      console.log(this.base_info);
      console.log(info);
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      console.log(info);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (coverUrl) => {
        if (coverUrl == localStorage.getItem("coverUrl")) {
          this.$Swal.fire({
            title: "请勿上传同一张图片",
            icon: "warning",
          });
          this.loading = false;
          return;
        }
        localStorage.setItem("coverUrl", coverUrl);
        uploadImg(coverUrl).then((img) => {
          this.base_info.coverUrl = img.data.coverUrl;
          this.loading = false;
        });
      });
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },

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

      if (!this.base_info.article_title) {
        this.$message.error("请填写标题");
        this.modal_visible = true;
        this.$nextTick(() => {
          this.$refs.article_title.focus();
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
      res.data.code == 200
        ? this.$Swal.fire({
            title: `${this.$route.params.id ? '修改' : '发布'}成功...`,
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
    localStorage.removeItem("coverUrl", "");
    this.$store.commit("change_show_footer", false);
    this.$store.commit("change_show_header", false);
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
    if (this.$route.params.id) {
      //后续修改文章判断
      setTimeout(() => {
        this.base_info.article_classify = this.$route.params.article_classify;
        this.base_info.article_title = this.$route.params.article_title;
        this.base_info.coverUrl = this.$route.params.coverUrl;
        this.html = this.$route.params.content;
      }, 100);
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
          width: "80%",
          height: "100px",
          icon: "info",
          title: "请在PC端发布或修改文章...",
          heightAuto: false,
        });
        next("/article_detail");
      }
    });
  },
};
</script>

<style lang="less">
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
