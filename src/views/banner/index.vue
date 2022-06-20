<template>
  <div
    class="bg-cover bg-center"
    :style="
      is_home
        ? { backgroundImage: `url(${bg})` }
        : { backgroundImage: `url(${bg})` }
    "
  >
    <div
      class="w-full flex justify-center items-center"
      :class="
        is_home ? 'h-screen' : 'h-36 md:h-100 lg:h-120 xl:h-140 2xl:h-168'
      "
      ref="banner_box"
    >
      <div
        class="banner_info flex items-center justify-center mx-auto"
        v-if="is_home"
      >
        <div class="px-5 font-black">
          <div
            class="text-base lg:text-xl"
            style="font-family: 'Gabriola'; color: wheat"
          >
            {{ msg }}|
          </div>
          <p class="m-0 text-3xl lg:text-5xl my-6 lg:my-8 text-white">
            你好, 我是 <span style="color: #5869da">Flechazo</span>
          </p>
          <p class="lg:text-base text-sm text-white">
            一往情深深几许？深山夕照深秋雨...
          </p>
        </div>
        <Icon
          v-if="is_home"
          type="down"
          class="absolute left-1/2 text-white text-4xl font-bold cursor-pointer transform -translate-x-3"
          :style="{ bottom: bottom + 10 + 'px' }"
          @click="down"
          title="别这么懒🚀"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "ant-design-vue";
export default {
  name: "Banner",
  components: {
    Icon,
  },
  data() {
    return {
      msg: "",
      bottom: -4,
      isbottom: true,
    };
  },
  props: ["bg", "is_home"],
  watch: {
    $route: {
      immediate: true,
      handler(newval) {
        if (newval.name != "home") {
          clearInterval(this.timer);
          clearInterval(this.timer1);
        }
      },
    },
  },
  methods: {
    down() {
      // console.log(this.timer1);
      // console.log(document.documentElement.scrollTop);
      // if (this.timer1) return;
      // let h = document.documentElement.scrollTop;
      // const maxH = this.$refs.banner_box.clientHeight;
      // this.timer1 = setInterval(() => {
      //   // h += 3;
      //   document.documentElement.scrollTop += 1;
      //   console.log(document.documentElement.scrollTop);
      //   // if (document.documentElement.scrollTop > maxH) {
      //   //   clearInterval(this.timer1);
      //   // }
      // }, 1);
      console.log(document.documentElement.scrollTop);
    },
  },
  mounted() {
    setInterval(() => {
      if (this.isbottom) {
        this.bottom++;
      } else {
        this.bottom--;
      }
      if (this.bottom == 9) {
        this.isbottom = false;
      }
      if (this.bottom == -2) {
        this.isbottom = true;
      }
    }, 70);
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
};
</script>
