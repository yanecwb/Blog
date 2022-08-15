<template>
    <div class="about_me_box relative top-0">
        <Banner bg="http://flechazoblog.site:5006/img/module_headerBg/about_mg.jpg" class="w-screen h-full" style="z-index:-100"/>
        <div class="about_me_bg w-4/5 md:w-1/2 left-1/2 mt-20 absolute top-0">
          <div class="p-3" style="background-color: rgba(255,255,255,.6);">
            <div class="mb-3">
              <p class="font-bold opacity-90 md:text-xl text-base">基本信息</p>
              <div class="p-6">
                <ul>
                  <li class="font-bold opacity-60 mb-3 md:text-sm text-xs">陈文滨(Flechazo)/男/汉/1998</li>
                  <li class="font-bold opacity-60 mb-3 md:text-sm text-xs">九江学院(JJU)/软件技术/2020</li>
                  <li class="font-bold opacity-60 mb-3 md:text-sm text-xs">TEL:18397871804/EMAIL:cwb_offer@163.com</li>
                  <li class="font-bold opacity-60 mb-3 md:text-sm text-xs">职业专长:web前端开发工程师,Vue,React,Nodejs,Java,MySql...</li>
                  <li class="font-bold opacity-60 mb-3 md:text-sm text-xs">GitHub:<a href="https://github.com/yanecwb?tab=repositories">https://github.com/yanecwb?tab=repositories</a></li>
                </ul>
              </div>
            </div>
            <div class="mb-3">
              <p class="font-bold opacity-90 md:text-xl text-base">工作经历</p>
              <div class="p-6">
                  <div class="font-bold  mb-3" v-for="item in experienceInfo">
                    <p class="md:text-xl opacity-80 mb-2"  >{{item.time}}</p>
                    <p class="font-bold opacity-60 mb-3 md:text-sm text-xs" v-html="item.desc"></p>
                  </div>
              </div>
            </div>
            <div class="mb-3">
              <a @click="showEnterpw = true" class="font-bold text-xs md:text-xl opacity-90">查看更多>></a>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Banner from "../../views/banner";
import { ref } from 'vue';
import {getResume} from '../../api/userInfo'
export default {
    name: "about_me",
    components:{Banner},
    setup(){
      const experienceInfo = [
        {
          time:'2021-12 ~ 今',
          desc:'<p>1.负责 Dapp 智能合约应用的前端开发和维护；</p><p>2.与后端和链上进行交互，完成主要的业务逻辑；</p><p>3.项目官网的前端开发和维护；</p> <p>4.Web 端，移动端的 UI 适配和交互实现。</p>'
        },
        {
          time:'2021-1 ~ 2021-12',
          desc:'<p>1、参与项目的前端研发工作，包括PC端、移动端；</p><p>2、增强用户视觉和交互体验, 提高页面性能，确保UI设计的高度还原；</p><p>3、配合与后端开发工程师进行接口联调，完成WEB前端开发；</p><p>4、配合项目经理、技术经理完成其他技术工作。</p>'
        },
        {
          time:'2019-12 ~ 2020-12',
          desc:'<p>、参与公司各项目中的web前端功能设计和实现；</p><p>2、后台开发人员协同完成前端数据呈现，负责页面重构以及前端开发；</p><p>3、维护优化产品前端页面性能，不断实现更好的交互体验。</p>'
        }
      ]
      // const ctx = getCurrentInstance()
      const showEnterpw = ref(false)
      return {
        experienceInfo,
        showEnterpw
      }
    },
    watch:{
      async showEnterpw(newval){
        if(newval){
          const res = await this.$Swal.fire({
            title: '请输入访问密码',
            input: 'password',
            inputPlaceholder: 'Enter resume password',
            confirmButtonText:'确定',
            inputAttributes: {
              maxlength: 6,
              autocapitalize: 'off',
              autocorrect: 'off'
            }
          })
          const {value:password,isConfirmed} = res
          this.showEnterpw = false
          if(!password) return
          const getResumeHandler =async ()=>{
            const {code,msg} = (await getResume({password})).data
            if(code == 200){
              window.open( 'http://flechazoblog.site:5006/resume/Cwb_WebResume.pdf')
            }else{
              this.miniMessage(msg, 'error')
            }
          }
          isConfirmed && getResumeHandler()

        }
      }
    }
};
</script>

<style lang="less" scoped>
.about_me_box{
  width: 100%;
  height: 100vh;
  .about_me_bg{
    transform: translateX(-50%);
  }
}
</style>
