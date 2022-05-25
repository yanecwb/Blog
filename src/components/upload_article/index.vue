<template>
  <div style="width:75vw; margin: 5px auto 15px;display:flex;align-items:end;flex-direction: column">
    <div style="border: 1px solid #ccc; width: 100%;margin-bottom:20px">
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
    <Button type="primary" @click="uploadArticle">上传</Button>
  </div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { Button } from "ant-design-vue";
import { uploadArticle } from '../../api/upload_article'
export default {
  name: "upload_article",
  components: { Editor, Toolbar, Button },
  data() {
    return {
      editor: null,
      html: '',
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    aa() {
      console.log(this.html);
    },
   async uploadArticle(){
     if(this.html == '<p><br></p>'){
       this.$message.warning('请输入文章内容')
       return
     }
     console.log(this.$store);
      const res = await uploadArticle(this.html,this.$store.state.userInfo.userInfo.id)
      res.data.code == 200 ? this.$message.success('发布成功') : this.$message.error('发布失败，请重试')
    }
  },
  mounted() {
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
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style></style>
