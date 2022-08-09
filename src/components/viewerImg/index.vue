<template>
    <div @click="hideImg" class=" fixed top-0 w-screen h-screen flex justify-center items-center" style="background: rgba(0,0,0,.5)">
      <div @click="(e)=>{e.stopPropagation();if(contentImgUrlIndex !== 0){contentImgUrl = contentImgUl[contentImgUrlIndex-1].url}}" class="absolute left-0 md:left-10 cursor-pointer" style="transform: rotate(180deg);" :title="contentImgUrlIndex !== 0 ? '上一张' : '已经是第一张'"><svg t="1659973617758" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2257" width="30" height="30"><path d="M220.742316 86.988416a47.894798 47.894798 0 0 1 0-70.972314A61.403588 61.403588 0 0 1 300.157623 13.252941l3.172518 2.763161 479.459681 454.795906 2.353804 1.842108c1.637429 1.228072 3.172519 2.558483 4.605269 3.940064 20.058505 18.932773 20.979559 48.099477 2.91667 68.055643l-2.8655 2.91667-484.678986 459.810532a61.250079 61.250079 0 0 1-82.587825 0 47.741289 47.741289 0 0 1-2.865501-68.055643l2.865501-2.96784 446.76227-423.787094L220.742316 86.988416z" p-id="2258" fill="#ffffff"></path></svg></div>
      <img @click="(e)=>{e.stopPropagation();}" :src="contentImgUrl" alt="" ref="contentImgRef" :class="hasmaxHeight ? 'animate__zoomIn max-h-4/5' : 'animate__zoomIn'" class="w-4/5 md:w-1/3 animate__fast animate__animated" >
      <div @click="(e)=>{e.stopPropagation();if(contentImgUrlIndex !== contentImgUl.length-1){contentImgUrl = contentImgUl[contentImgUrlIndex+1].url}}" class="absolute right-0 md:right-10  cursor-pointer" :title="contentImgUrlIndex !== contentImgUl.length-1 ? '下一张' : '已经是最后一张'"><svg t="1659973617758" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2257" width="30" height="30"><path d="M220.742316 86.988416a47.894798 47.894798 0 0 1 0-70.972314A61.403588 61.403588 0 0 1 300.157623 13.252941l3.172518 2.763161 479.459681 454.795906 2.353804 1.842108c1.637429 1.228072 3.172519 2.558483 4.605269 3.940064 20.058505 18.932773 20.979559 48.099477 2.91667 68.055643l-2.8655 2.91667-484.678986 459.810532a61.250079 61.250079 0 0 1-82.587825 0 47.741289 47.741289 0 0 1-2.865501-68.055643l2.865501-2.96784 446.76227-423.787094L220.742316 86.988416z" p-id="2258" fill="#ffffff"></path></svg></div>
      <div @click="(e)=>{e.stopPropagation();}" class="absolute bottom-0 flex w-full justify-center" style="background: rgba(0,0,0,.5)">
            <div class=" absolute bottom-1 right-0 md:right-2 flex justify-center">
              <div @click="enlargeImg" class="ml-3 cursor-pointer" title="放大"><svg t="1660014231884" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5252" width="20" height="20"><path d="M490.382222 895.374222c221.980444 0 403.171556-181.134222 404.992-404.650666A404.821333 404.821333 0 0 0 490.382222 85.504 404.764444 404.764444 0 0 0 85.504 490.382222a404.764444 404.764444 0 0 0 404.935111 404.935111zM462.449778 447.146667H277.390222a42.723556 42.723556 0 0 0 0 85.504h185.002667v185.002666a42.723556 42.723556 0 1 0 85.447111 0V532.707556h185.002667a42.723556 42.723556 0 0 0 0-85.504H547.84V262.257778a42.723556 42.723556 0 1 0-85.447111 0V447.146667z m28.046222 533.617777A490.211556 490.211556 0 0 1 0 490.439111 490.211556 490.211556 0 0 1 490.382222 0c271.075556 0 490.439111 219.477333 490.439111 491.064889-2.104889 270.677333-221.354667 489.813333-490.382222 489.813333z" fill="#ffffff" p-id="5253"></path></svg></div>
              <div @click="narrowImg" class="ml-3 cursor-pointer" title="缩小"><svg t="1660014206812" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4260" width="20" height="20"><path d="M490.382222 895.374222c221.980444 0 403.171556-181.134222 404.992-404.650666A404.821333 404.821333 0 0 0 490.382222 85.504 404.764444 404.764444 0 0 0 85.504 490.382222a404.764444 404.764444 0 0 0 404.935111 404.935111z m0 85.447111A490.211556 490.211556 0 0 1 0 490.439111 490.211556 490.211556 0 0 1 490.382222 0c271.075556 0 490.439111 219.477333 490.439111 491.064889-2.104889 270.677333-221.354667 489.813333-490.382222 489.813333zM277.447111 532.707556h455.452445a42.723556 42.723556 0 0 0 0-85.504H277.390222a42.723556 42.723556 0 0 0 0 85.504z" fill="#ffffff" p-id="4261"></path></svg></div>
            </div>
            <li v-for="item,index in contentImgUl" :key="index" class="mx-3 list-none cursor-pointer relative" :class="item.url == contentImgUrl ? '':'mask'"  @click="()=>{contentImgUrl = item.url}"><div  class="w-14 h-20 bg-cover bg-center" :style="{backgroundImage:'url('+item.url+')'}" ></div></li>
      </div>
    </div>
</template>

<script>
export default {
  name:'viewerImg',
  data(){
    return {
      hasmaxHeight:true,
      ...this.options
    }
  },
  props:['options'],
  computed:{
    contentImgUrlIndex(){
      return this.contentImgUl.findIndex(i=>i.url == this.contentImgUrl)
    },
  },
  methods:{
    hideImg(){
      this.hasmaxHeight = true
      this.$emit('hideImg')
    },
    narrowImg(){
      this.$nextTick(()=>{
        const w = this.$refs.contentImgRef.offsetWidth
        if (w<=200) {
          this.$message.info('不能再小了')
          return
        }
        this.$refs.contentImgRef.style.width = (w - 100)+'px'
      })
    },
    enlargeImg(){
      this.hasmaxHeight = false
      this.$nextTick(()=>{
        const w = this.$refs.contentImgRef.offsetWidth
        if (w>=2000) {
          this.$message.info('不能再大了')
          return
        }
        this.$refs.contentImgRef.style.width = (w + 100)+'px'
      })
    },
  }
}
</script>

<style>

</style>
