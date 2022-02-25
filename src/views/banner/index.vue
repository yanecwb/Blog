<template>
  <div class="banner_box">
    <div class="banner_info">
      <div class="banner_info_content">
        <div class="msg">{{ msg }}|</div>
        <h2 style="margin: 0">
          Hello, I’m <span style="color: #5869da">Flechazo</span>
        </h2>
        <h2>Welcome to my blog</h2>
        <p>Study together and make progress together...</p>
        <form class="email_input">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </form>
      </div>
      <div class="banner_info_img">
        <img src="../../assets/featured.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import "./banner.css";
export default {
  name: "Banner",
  data() {
    return {
      msg: "",
    };
  },
  mounted() {
    const msg_text = "Do what you like";
    let count = 0;
    setInterval(() => {
      this.msg += msg_text[count];
      if (count == msg_text.length) {
        count = 0;
        this.msg = "";
      } else {
        count++;
      }
    }, 200);
  },
};
</script>

<style>
</style>