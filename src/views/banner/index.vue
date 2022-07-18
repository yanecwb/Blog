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
        is_home ? 'h-screen md:min-h-240' : 'h-36 md:h-100 lg:h-120 xl:h-140 2xl:h-160'
      "
      ref="banner_box"
    >
      <!-- <div class=" w-1/2 h-full bg-122 opacity-40 absolute left-0" v-if="is_home"></div> -->
      <div
        class="banner_info flex items-center justify-center mx-auto"
        v-if="is_home"
      >
        <div class="px-5 font-black text-center">
          <div
            class="text-base lg:text-2xl"
            style="font-family: 'Gabriola'; color: #789da6"
          >
            {{ msg }}|
          </div>
          <p class="m-0 text-3xl lg:text-5xl my-6 lg:my-8 text-white">
            你好, 我是 <span style="color: #4e81ba">Flechazo</span>
          </p>
          <p class="lg:text-xl md:text-base text-sm text-white" style="font-family: 'Gabriola';">
            {{mingrenmingyan}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      msg: "",
      mingrenmingyan:''
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
 async mounted() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://api.xygeng.cn/one');
    xhr.onreadystatechange =  ()=> {
      if (xhr.readyState === 4) {
        var data = JSON.parse(xhr.responseText);
        this.mingrenmingyan = data.data.content;
      }
    }
    xhr.send();
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
