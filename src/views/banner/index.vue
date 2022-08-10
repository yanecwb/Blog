<template>
  <div
    class="bg-cover bg-center  animate__animated animate__fadeInDown"
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
          <div class=" group lg:text-xl md:text-base text-white h-20 rounded-2xl p-3 flex flex-col justify-between mingyan" >
            <span>{{'『'+mingrenmingyan+'』'}}</span>
            <span class="mingyanfrom">{{'--'+from}}</span>
          </div>
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
      mingrenmingyan:'',
      from:''
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
  methods:{
    clearmasg_text(){
      this.clearmasg_timer = setInterval(() => {
        this.msg=this.msg.slice(0,this.msg.length-1)
        if(!this.msg){
          clearInterval(this.clearmasg_timer)
          this.addmsg_text()
        }
      }, 50);
    },
    addmsg_text(){
      const msg_text = "Do what you like";
      let count = 0;
      this.timer = setInterval(() => {
        this.msg += msg_text[count];
        if (count == msg_text.length-1) {
          count = 0;
          this.clearmasg_text()
          clearInterval(this.timer)
        } else {
          count++;
        }
      }, 200);
    }
  },
  async mounted() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://v1.hitokoto.cn/?c=i&encode=json');
    // xhr.setRequestHeader('signaturekey','U2FsdGVkX18c0tV1HrDsOxE1GpqOjSFRnXUCZfiOKS4=')
    xhr.onreadystatechange =  ()=> {
      if (xhr.readyState === 4) {
        var data = JSON.parse(xhr.responseText);
        this.mingrenmingyan = data.hitokoto;
        this.from = data.from
      }
    }
    xhr.send();

    this.addmsg_text()
  },
};
</script>

<style lang="less" scoped>
.mingyan{
  font-family: 'fangsong';
  background: rgba(255, 255, 255,0);
  font-size: small;
  transition: 1s;
      color: rgb(119, 116, 116);
  .mingyanfrom{
    transition: 1s;
    opacity: 0;
  }
}
.mingyan:hover{
    background: rgba(255, 255, 255,.2);
}
.mingyan:hover .mingyanfrom{
      opacity: 1;
}

</style>