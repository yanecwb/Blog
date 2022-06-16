<template>
  <div
    :style="
      is_home
        ? { backgroundImage: `url(${bg})` }
        : {
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
    "
  >
    <div
      class="banner_box mx-auto"
      :class="
        is_home ? 'h-screen' : 'h-36 md:h-100 lg:h-120 xl:h-140 2xl:h-160'
      "
      ref="banner_box"
      :style="
        is_home
          ? { backgroundImage: `url(${bg})` }
          : { backgroundImage: `url(${bg})` }
      "
    >
      <div class="banner_info" v-if="is_home">
        <div class="banner_info_content">
          <div class="msg">{{ msg }}|</div>
          <h2 class="m-0">
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
      <Icon
        type="down"
        class="absolute left-1/2 text-gray text-3xl font-bold cursor-pointer"
        :style="{bottom:bottom+'px'}"
        @click="down"
      />
    </div>
  </div>
</template>

<script>
import "./banner.css";
import { Icon } from "ant-design-vue";
export default {
  name: "Banner",
  components: {
    Icon,
  },
  data() {
    return {
      msg: "",
      bottom:-2,
      isbottom:true
    };
  },
  props: ["bg", "is_home"],
  methods:{
    down(){
      this.timer = setInterval(() => {
        document.documentElement.scrollTop += 5
        if (document.documentElement.scrollTop > window.innerHeight) {
          clearInterval(this.timer);
        }
      }, 1);
    }
  },
  mounted() {
      setInterval(() => {
        if (this.isbottom) {
          this.bottom++;
        } else{
          this.bottom--
        }
        if(this.bottom == 9){
          this.isbottom = false
        }
        if(this.bottom == -2){
          this.isbottom = true
        }

      },70);
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
