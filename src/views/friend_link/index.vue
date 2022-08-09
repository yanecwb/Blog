<template>
  <div
    class="w-screen bg-cover bg-center py-20"
    style="background-image: url(http://flechazoblog.site/Img/friend_linkBg.jpg)"
    @click="() => { showexpression = false; return false }"
  >
    <article
      class="w-2/3 mx-auto  py-8 px-10 bg-cover"
      style="
        box-shadow: 1px 1px 5px 2px #ccc;
        background-color: rgba(255, 255, 255,.7);
      "
    >
      <div class="text-center mb-5">
        <div
          class="px-1 py-2 rounded-full text-sm w-46 mx-auto"
          style="color: #17223b; background-color: #eeeeff"
        >
          <span
            class="inline-block py-1 px-2 cursor-pointer rounded-full"
            @click="changeTab(1)"
            :style="tab == 1 ? 'color:#17223b;background-color:#fff;' : ''"
            >友链申请</span
          >
          <span
            class="inline-block py-1 px-2 cursor-pointer rounded-full"
            @click="changeTab(2)"
            :style="tab == 2 ? 'color:#17223b;background-color:#fff;' : ''"
            >友情链接</span
          >
        </div>
      </div>

      <div v-show="tab == 1">
        <div class="song p-2 text-black" style="background-color: rgba(255, 255, 255,.9);">
          <h2 class="font-bold">申请条件：</h2>
          <blockquote
            class="pl-10 p-5 my-4"
            style="background: #f3f5f7; border-left: 3px solid #dde6e9"
          >
            <p>
              1：直接在下面留言申请，格式按照下面（本站链接的格式留言即可）；<br />2：确保您的网站/博客内容健康，不含政治内容以及擦边球内容；<br />3：与道德相违或明显违法的，本博客永远拒绝做友情链接；<br />4：注意：申请链接前先做好本站链接
            </p>
          </blockquote>
          <h2 class="font-bold">本站链接：</h2>
          <blockquote
            class="pl-10 p-5 my-4"
            style="background: #f3f5f7; border-left: 3px solid #dde6e9"
          >
            <p>
              博客名称：Flechazo`s Blog<br />博客地址：<a
                href="https://flechazoblog.site"
                target="_blank"
                class="text-red-500 hover:text-red-500"
                >https://flechazoblog.site</a
              ><br />博客描述：因为喜欢,所以折腾。<br />链接头像：<a
                href="http://www.flechazoblog.site/favicon.ico/"
                target="_blank"
                class="text-red-500 hover:text-red-500"
                >http://www.flechazoblog.site/favicon.ico</a
              >
            </p>
          </blockquote>
          <h2 class="font-bold">其他说明：</h2>
          <blockquote
            class="pl-10 p-5 my-4"
            style="background: #f3f5f7; border-left: 3px solid #dde6e9"
          >
            <p>
              1、本站将不定期检查死链等无效链接，如果发现贵站取消了本站的链接，我们也将删除，恕不通知;<br />2、对于长期无更新、无法访问的博客，本站有权终止其友情链接；<br />3、希望在友链之后，能互勉互动，在我看来友情最重要O(∩_∩)O<br />4、请确定贵站能长期稳定运营下去，再做申请！<br />5、链接变更请联系告知。
            </p>
          </blockquote>
        </div>
      </div>
      <div class="py-10 px-20 flex justify-between flex-wrap" style="background-color: rgba(255, 255, 255,.9);" v-show="tab == 2">
          <a v-for="item in 15" href="" target="_blank" class="inline-block cursor-pointer group mb-6" @mouseenter="(e)=>{e.target.style.textShadow = '0px 0px 5px rgb(4 26 37)'}" @mouseleave="(e)=>{e.target.style.textShadow = ''}">
            <div style="box-shadow: rgb(0 0 0 / 20%) 0 0 5px 0">
                <img src="https://www.lbzi.cn/tx.jpg"  class="w-12 h-12"/>
                <span class="text-0a1 text-sm inline-block pl-3 pr-12 group-hover:text-pink-500">轻微博客</span>
            </div>
          </a>
          <a v-for="item in 5-(15%5)"  href="" target="_blank" class="inline-block cursor-pointer group mb-5">
            <div style="box-shadow: rgb(0 0 0 / 20%) 0 0 5px 0;width:165.6px">
            </div>
          </a>
      </div>

      <!-- 留言 -->
      <aside class="w-full px-3  md:mt-10 mt-5 mx-auto border-4 border-light-blue-500 border-opacity-100 bg-white shadow-2xl">
         <div class="w-full text-xs flex justify-between pt-5" style='color:#999999'>
          <span>最新评论（{{ 9 }}）</span>
          <span class=" cursor-pointer">
            <Icon type="menu" />按时间
          </span>
        </div>
        <!-- 输入框 -->
        <div class="py-3 flex justify-between">
          <div class=" w-12">
            <div :style="{ backgroundImage: `url(${$store.state.userInfo.userInfo.avatarUrl || 'http://www.flechazoblog.site:5006/img/home_img/notLogin.svg'})`, backgroundSize: '100% 100%' }"
              class=" w-10 h-10 rounded-full"></div>
          </div>
          <form class="flex-1 relative" v-on:submit.prevent>
            <textarea type="text" style="background: #FFF url(https://rawchen.com/usr/themes/rawchen/images/comments-bg.jpg) right center no-repeat;background-size:130px" inputcentent v-model="commentContent" placeholder="轻轻敲醒沉睡的心灵，让我看看你的点评"
              class="block_border focus:outline-none focus:ring focus:border-blue-300 border-none w-full h-8 md:h-24 bg-gray-100 rounded py-1 px-2 box-border text-0a1 md:text-sm text-xs block" ></textarea>
            <p class="text-red-500 text-sm twinkle" v-if="is_commentContent && !commentContent">*请输入内容*</p>
            <div class="mt-3 flex justify-between">
              <div @click="smallExpression(1,$event)" type='button'
                class="text-sm px-2 border border-solid border-gray-300 rounded cursor-pointer bg-white text-061 text-opacity-80 outline-none h-6 flex items-center">
                <Icon type='smile' class='mr-1' />
                <span>表情</span>
              </div>
              <button @click="PutComment" type="submit"
                class="text-sm text-white outline-none px-2 rounded h-6 w-17 cursor-pointer "
                style="background:#fb7299;border: 1px solid #fb7299">
                发布
              </button>
            </div>
            <!-- 表情 -->
            <div @click="(e) => { e.stopPropagation() }" v-if="showexpression"
              class="fixed bg-white z-100 md:w-86 md:h-60  w-56 h-42 rounded border border-solid border-gray-300 shadow-md " :style="{left:expressionLeft+'px',top:expressionTop+'px'}">
              <p class='pt-1 pb-2 m-0 h-1/6 text-xs'>小表情</p>
              <div class="w-full h-2/3 flex justify-around flex-wrap overflow-auto bg-white z-999">
                <div v-for="i in BiLiEmailTotal" :key="i"
                  class="md:w-14 md:h-10 w-9 h-6 flex justify-center items-center">
                  <img :src="'http://flechazoblog.site:5006/img/BiLiEmail/' + BiLiEmaili + i + '.png'" alt=""
                    class="md:w-7 w-5 md:h-7 h-5 cursor-pointer" @click="inputexpression(BiLiEmaili + i)">
                </div>
              </div>
              <div class="w-full h-1/6 bg-gray-300 flex justify-start">
                <div @click="(e) => { BiLiEmaili = 'Default/default0'; BiLiEmailTotal = 80; e.stopPropagation() }"
                  class="h-full w-1/5 flex justify-center items-center"
                  :class="BiLiEmaili == 'Default/default0' ? 'bg-white' : ''" style="border-right:solid #CCC 1px">
                  <img src="http://flechazoblog.site:5006/img/BiLiEmail/Default/default01.png" alt=""
                    class="md:w-7 w-5 md:h-7 h-5">
                </div>
                <div @click="(e) => { BiLiEmaili = 'BiLiTV/BiLITV_'; BiLiEmailTotal = 53; e.stopPropagation() }"
                  class="h-full w-1/5  flex justify-center items-center"
                  :class="BiLiEmaili == 'BiLiTV/BiLITV_' ? 'bg-white' : ''" style="border-right:solid #CCC 1px">
                  <img :src="'http://flechazoblog.site:5006/img/BiLiEmail/BiLiTV/BiLITV_1.png'" alt=""
                    class="md:w-7 w-5 md:h-7 h-5">
                </div>
              </div>
            </div>

          </form>
        </div>
      </aside>

    </article>
  </div>
</template>

<script>
import {Icon} from 'ant-design-vue'
import { putCommentFriendLink } from '../../api/friendlink'
export default {
  name: "friend_link",
  components:{Icon},
  data() {
    return {
      tab: 1,
      is_commentContent: false,
      commentContent:'',
      BiLiEmaili: 'Default/default0',//表情地址
      BiLiEmailTotal:80,
      expressionLeft:0,
      expressionTop:0,//表情定位
      showexpression: false,//小表情展示框判断变量
      inputType:1
    };
  },
  methods: {
    changeTab(val) {
      this.showexpression = false
      this.tab = val;
    },
    smallExpression(type,e){
      this.showexpression = true
      e.stopPropagation();
      type == 2 ? this.inputType = 2 : this.inputType = 1
      this.$nextTick(()=>{
        this.expressionLeft = e.clientX
        this.expressionTop = e.clientY
      })
      return false
    },
    // 输入表情处理
    inputexpression(expression_val) {
      this.inputType == 1 ? this.commentContent += '@' + expression_val + '!' :  this.replyContent += '@' + expression_val + '!'
    },
    PutComment() {
      if (!this.$store.state.userInfo.userInfo.id) {// 未登录
        this.noLogin()
        return
      }
      if (!this.commentContent && (this.is_commentContent = true)) return
      let req = {
        userId: this.$store.state.userInfo.userInfo.id,
        comment: this.commentContent,
      }
      console.log(req);
      this.is_commentContent = false
      this.commentContent = ''
      putCommentFriendLink(req).then(async (res) => {
        if(res.data.code == 200 ){
          this.miniMessage(res.data.msg, 'success')
          delete req.comment
          delete req.userId
          // 更新评论
          this.getCommentsFriendLink(req)
        }else{
          this.miniMessage(res.data.msg, 'error')
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
article {
  font-family: serif;
}
.song:hover {
  box-shadow: 1px 1px 5px 5px rgb(255 222 233);
}
.twinkle {
  animation: twinkle 0.5s linear 3;
}

@-webkit-keyframes twinkle {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  50.1% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

.link_body_friend {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}
.link_body_name {
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 50px;
  font-weight: 600;
  text-align: center;
  padding: 0 10px;
}
#link_info:checked ~ .link_body,
#link_friend:checked ~ .links_body_friend,
#link_recom:checked ~ .links_body_recom {
  display: block;
}
</style>
