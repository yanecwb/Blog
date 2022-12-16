<template>
  <div>
    <div @click="(e) => { e.stopPropagation() }" :style="{left:options.expressionLeft+'px',top:options.expressionTop+'px'}"
        class="fixed w-56 bg-white border border-gray-300 border-solid rounded shadow-md z-100 md:w-86 md:h-60 h-42 " >
        <p class='pt-1 pb-2 m-0 text-xs h-1/6'>小表情</p>
        <div class="flex flex-wrap justify-around w-full overflow-auto bg-white h-2/3 z-999">
          <div v-for="i in BiLiEmailTotal" :key="i"
            class="flex items-center justify-center h-6 md:w-14 md:h-10 w-9">
            <img :src="'http://flechazoblog.site:5006/img/BiLiEmail/' + BiLiEmaili + i + '.png'" alt=""
              class="w-5 h-5 md:w-7 md:h-7" @click="()=>{$emit('inputexpression',BiLiEmaili + i)}">
          </div>
        </div>
        <div class="flex justify-start w-full bg-gray-300 h-1/6">
          <div @click="(e) => { BiLiEmaili = 'Default/default0'; BiLiEmailTotal = 80; e.stopPropagation() }"
            class="flex items-center justify-center w-1/5 h-full"
            :class="BiLiEmaili == 'Default/default0' ? 'bg-white' : ''" style="border-right:solid #CCC 1px">
            <img src="http://flechazoblog.site:5006/img/BiLiEmail/Default/default01.png" alt=""
              class="w-5 h-5 md:w-7 md:h-7">
          </div>
          <div @click="(e) => { BiLiEmaili = 'BiLiTV/BiLITV_'; BiLiEmailTotal = 53; e.stopPropagation() }"
            class="flex items-center justify-center w-1/5 h-full"
            :class="BiLiEmaili == 'BiLiTV/BiLITV_' ? 'bg-white' : ''" style="border-right:solid #CCC 1px">
            <img :src="'http://flechazoblog.site:5006/img/BiLiEmail/BiLiTV/BiLITV_1.png'" alt=""
              class="w-5 h-5 md:w-7 md:h-7">
          </div>
        </div>
      </div>
  </div>
</template>
 
<script>
import {ref } from 'vue'
export default {
  setup() {
    const BiLiEmaili =ref('Default/default0')//表情地址
    const BiLiEmailTotal =  ref(80)//该系列表情数量,
    return {BiLiEmaili,BiLiEmailTotal};
  },
  props: {
     options: {
      type: Object,
    },
  },
};
</script>