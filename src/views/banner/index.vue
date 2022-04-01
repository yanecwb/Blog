<template>
  <div
    class="banner_box"
    ref="banner_box"
    :style="
      is_home
        ? { backgroundImage: `url(${bg})` }
        : { backgroundImage: `url(${bg})`, height: '30vh' }
    "
  >
    <div class="banner_info" v-if="is_home">
      <div class="banner_info_content">
        <div class="msg">{{ msg }}|</div>
        <h2 style="margin: 0">
          你好, 我是 <span style="color: #5869da">Flechazo</span>
        </h2>
        <!-- <h2>谢谢你留下的足迹</h2> -->
        <p>一往情深深几许？深山夕照深秋雨...</p>
        <!-- <form class="email_input">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </form> -->
      </div>
      <!-- <div class="banner_info_img">
        <img src="../../assets/featured.png" alt="" />
      </div> -->
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
  props: ["bg", "is_home"],
  mounted() {
    const msg_text = "Do what you like";
    let count = 0;
    this.timer = setInterval(() => {
      this.msg += msg_text[count];
      if (count == msg_text.length) {
        count = 0;
        this.msg = "";
      } else {
        count++;
      }
    }, 200);
  },
  beforeUnmounted() {
    console.log(123);
  },
};
</script>

<style></style>
