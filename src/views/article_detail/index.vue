<template>
  <div class="article_detailBox">
    123
    <div style="border: 1px solid #ccc">
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
    <div>
      <ul>
        <li>
          😀模拟&nbsp;Ajax&nbsp;异步设置内容&nbsp;HTML发<span
            style="color: rgb(120, 6, 80)"
            ><strong>射点犯</strong></span
          ><a href="www.baidu.com" target="_blank"
            ><span style="color: rgb(120, 6, 80)"
              ><strong>得上发电公司地方dasd</strong></span
            ><span
              style="
                color: rgb(120, 6, 80);
                background-color: rgb(245, 219, 77);
              "
              ><strong>;"sd&nbsp;</strong></span
            ></a
          >
        </li>
        <li>:</li>
      </ul>
      <h1>'gdfgdfd&nbsp;&nbsp;as&nbsp;s&nbsp;</h1>
    </div>
    <button @click="aa">按钮</button>
  </div>
</template>

<script>
export default {
  name: "article_detail",

};
</script>

<style lang="less" scoped></style>
