<template>
    <div @click="hideImg" class="z-999 fixed top-0 w-screen h-screen flex justify-center items-center" style="background: rgba(0,0,0,.5)">
      <div @click="(e)=>{e.stopPropagation();rotateImg(1);if(contentImgUrlIndex !== 0){contentImgUrl = contentImgUl[contentImgUrlIndex-1].url}}" class="absolute left-0 md:left-10 cursor-pointer" style="transform: rotate(180deg);" :title="contentImgUrlIndex !== 0 ? '上一张' : '已经是第一张'"><svg t="1659973617758" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2257" width="30" height="30"><path d="M220.742316 86.988416a47.894798 47.894798 0 0 1 0-70.972314A61.403588 61.403588 0 0 1 300.157623 13.252941l3.172518 2.763161 479.459681 454.795906 2.353804 1.842108c1.637429 1.228072 3.172519 2.558483 4.605269 3.940064 20.058505 18.932773 20.979559 48.099477 2.91667 68.055643l-2.8655 2.91667-484.678986 459.810532a61.250079 61.250079 0 0 1-82.587825 0 47.741289 47.741289 0 0 1-2.865501-68.055643l2.865501-2.96784 446.76227-423.787094L220.742316 86.988416z" p-id="2258" fill="#ffffff"></path></svg></div>
      <img @click="(e)=>{e.stopPropagation();}" :src="contentImgUrl" alt="" ref="contentImgRef" :class="hasmaxHeight ? 'animate__zoomIn max-h-full' : 'animate__zoomIn'" class="w-4/5 md:w-1/3 animate__fast animate__animated" >
      <div @click="(e)=>{e.stopPropagation();rotateImg(1);if(contentImgUrlIndex !== contentImgUl.length-1){contentImgUrl = contentImgUl[contentImgUrlIndex+1].url}}" class="absolute right-0 md:right-10  cursor-pointer" :title="contentImgUrlIndex !== contentImgUl.length-1 ? '下一张' : '已经是最后一张'"><svg t="1659973617758" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2257" width="30" height="30"><path d="M220.742316 86.988416a47.894798 47.894798 0 0 1 0-70.972314A61.403588 61.403588 0 0 1 300.157623 13.252941l3.172518 2.763161 479.459681 454.795906 2.353804 1.842108c1.637429 1.228072 3.172519 2.558483 4.605269 3.940064 20.058505 18.932773 20.979559 48.099477 2.91667 68.055643l-2.8655 2.91667-484.678986 459.810532a61.250079 61.250079 0 0 1-82.587825 0 47.741289 47.741289 0 0 1-2.865501-68.055643l2.865501-2.96784 446.76227-423.787094L220.742316 86.988416z" p-id="2258" fill="#ffffff"></path></svg></div>
      <div @click="(e)=>{e.stopPropagation();}" class="absolute bottom-0 flex w-full justify-center" style="background: rgba(0,0,0,.5)">
            <div class=" absolute top-1 right-1 md:right-8 flex justify-center">
              <div @click="enlargeImg" class="ml-3 cursor-pointer" title="放大"><svg t="1660014231884" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5252" width="20" height="20"><path d="M490.382222 895.374222c221.980444 0 403.171556-181.134222 404.992-404.650666A404.821333 404.821333 0 0 0 490.382222 85.504 404.764444 404.764444 0 0 0 85.504 490.382222a404.764444 404.764444 0 0 0 404.935111 404.935111zM462.449778 447.146667H277.390222a42.723556 42.723556 0 0 0 0 85.504h185.002667v185.002666a42.723556 42.723556 0 1 0 85.447111 0V532.707556h185.002667a42.723556 42.723556 0 0 0 0-85.504H547.84V262.257778a42.723556 42.723556 0 1 0-85.447111 0V447.146667z m28.046222 533.617777A490.211556 490.211556 0 0 1 0 490.439111 490.211556 490.211556 0 0 1 490.382222 0c271.075556 0 490.439111 219.477333 490.439111 491.064889-2.104889 270.677333-221.354667 489.813333-490.382222 489.813333z" fill="#ffffff" p-id="5253"></path></svg></div>
              <div @click="narrowImg" class="ml-3 cursor-pointer" title="缩小"><svg t="1660014206812" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4260" width="20" height="20"><path d="M490.382222 895.374222c221.980444 0 403.171556-181.134222 404.992-404.650666A404.821333 404.821333 0 0 0 490.382222 85.504 404.764444 404.764444 0 0 0 85.504 490.382222a404.764444 404.764444 0 0 0 404.935111 404.935111z m0 85.447111A490.211556 490.211556 0 0 1 0 490.439111 490.211556 490.211556 0 0 1 490.382222 0c271.075556 0 490.439111 219.477333 490.439111 491.064889-2.104889 270.677333-221.354667 489.813333-490.382222 489.813333zM277.447111 532.707556h455.452445a42.723556 42.723556 0 0 0 0-85.504H277.390222a42.723556 42.723556 0 0 0 0 85.504z" fill="#ffffff" p-id="4261"></path></svg></div>
              <div @click="rotateImg(0)" class="ml-3 cursor-pointer" title="旋转"><svg t="1660017877452" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13886" width="20" height="20"><path d="M148.361503 873.076215a33.27639 33.27639 0 0 1 0.204778-47.150084 33.583556 33.583556 0 0 1 47.354862 0.204778A444.316592 444.316592 0 0 0 511.944454 957.291078c104.436669 0 203.293143-35.938501 280.852728-99.317224l35.580139-32.81564a33.583556 33.583556 0 0 1 47.303668 1.791806 33.27639 33.27639 0 0 1-1.791806 47.09889l-37.064778 34.146695A511.176537 511.176537 0 0 1 511.944454 1023.99744a511.43251 511.43251 0 0 1-363.582951-150.921225z m863.49671-248.497838a33.481167 33.481167 0 0 1-65.426501-14.385639 443.139119 443.139119 0 0 0-299.129144-518.394954A33.327584 33.327584 0 1 1 667.575568 28.265477a509.58951 509.58951 0 0 1 344.180256 596.3129zM275.374922 138.640701a443.036731 443.036731 0 0 0-198.788032 467.456481 33.481167 33.481167 0 0 1-65.52889 13.771306A509.999065 509.999065 0 0 1 279.624061 59.596478C328.821923 31.439533 431.415591-4.191801 507.336954 0.620477c8.549472-1.689417 17.96925 0 25.597223 5.938555 6.4505 5.119445 9.982917 12.081889 11.109194 20.273001 0.255972 2.713306-0.409556 5.221833-1.023889 8.037528a22.832723 22.832723 0 0 1-7.781555 12.133083L341.262173 263.759926a28.208139 28.208139 0 0 1-29.999945 6.91125 30.204723 30.204723 0 0 1-20.836139-23.703028l-15.051167-108.378641z m-4.965861 785.322793c-2.969278-0.46075-7.269611 31.740556-34.402668 17.918056-48.225168-24.624528-138.225003-97.781391-174.93142-168.736892a31.331001 31.331001 0 0 1-8.037528-24.931695c1.023889-8.191111 5.221833-14.846389 11.62114-19.965834 2.201361-1.638222 4.658695-2.354944 7.423194-3.276444a22.832723 22.832723 0 0 1 14.385639 0.409555l285.7162 54.675668c10.392472 1.945389 18.839556 10.750834 21.399278 22.116a30.204723 30.204723 0 0 1-9.573361 30.102334l-113.651669 91.689252z m716.671041-436.688619c1.126278 2.815694 30.921445-10.085306 33.020417 20.273 3.737195 54.061334-12.542639 168.890475-54.522084 236.825504a31.331001 31.331001 0 0 1-17.201334 19.812251 29.999945 29.999945 0 0 1-23.139889 0.307167c-2.559722-1.023889-4.402722-2.815694-6.655278-4.709889a22.832723 22.832723 0 0 1-7.013639-12.54264l-100.341113-273.071171a28.208139 28.208139 0 0 1 7.986333-29.692779 30.204723 30.204723 0 0 1 30.716668-7.320805l137.149919 50.170556z" fill="#ffffff" p-id="13887"></path></svg></div>
            </div>
            <li v-for="item,index in contentImgUl" :key="index" class="mx-3 list-none cursor-pointer relative" :class="item.url == contentImgUrl ? '':'mask'"  @click="()=>{contentImgUrl = item.url;rotateImg(1);}"><div  class="w-14 h-20 bg-cover bg-center" :style="{backgroundImage:'url('+item.url+')'}" ></div></li>
      </div>
    </div>
</template>

<script>
export default {
  name:'viewerImg',
  data(){
    return {
      hasmaxHeight:true,
      Imgrotate:0,
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
    rotateImg(change){
      change ? this.Imgrotate = 0 : this.Imgrotate += 45
      this.$nextTick(()=>{
        this.$refs.contentImgRef.style.transform = 'rotate('+ this.Imgrotate +'deg)'
      })
    }
  }
}
</script>

<style>

</style>
