<template>
  <div
    class="w-screen bg-cover bg-center py-20 "
    style="background-image: url(http://tva1.sinaimg.cn/large/e8a55238gy1h51qsqcej4j22yo1o0tvb.jpg)"
    @click="() => { showexpression = false; return false }"
  >
    <article
      class="w-2/3 mx-auto min-w-300  py-8 px-10 bg-cover"
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
                href="http://flechazoblog.site"
                target="_blank"
                class="text-red-500 hover:text-red-500"
                >http://flechazoblog.site</a
              ><br />博客描述：做自己喜欢的事情。<br />链接头像：<a
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
          <a v-for="item in friendLink" :href="item.link" target="_blank" class="inline-block cursor-pointer group mb-6" @mouseenter="(e)=>{e.target.style.textShadow = '0px 0px 5px rgb(4 26 37)'}" @mouseleave="(e)=>{e.target.style.textShadow = ''}">
            <div class="p-2 rounded" style="box-shadow: rgb(0 0 0 / 20%) 0 0 5px 0">
                <img :src="item.avatarUrl"  class="w-12 h-12 rounded-full"/>
                <span class="text-0a1 text-sm inline-block pl-3 pr-12 group-hover:text-pink-500">{{item.remarks}}</span>
            </div>
          </a>
          <a v-for="item in 5-(friendLink.length%5)"  href="" target="_blank" class="inline-block cursor-pointer group mb-5">
            <div style="box-shadow: rgb(0 0 0 / 20%) 0 0 5px 0;width:165.6px">
            </div>
          </a>
      </div>

      <!-- 留言 -->
      <aside class="w-full px-3  md:mt-10 mt-5 mx-auto border-4 border-light-blue-500 border-opacity-100 bg-white shadow-2xl">
         <div class="w-full text-xs flex justify-between pt-5" style='color:#999999'>
          <span>最新评论（{{ CommentFriendLink.length }}）</span>
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
              class="msgScoll block_border focus:outline-none focus:ring focus:border-blue-300 border-none w-full h-8 md:h-24 bg-gray-100 rounded py-1 px-2 box-border text-0a1 md:text-sm text-xs block" ></textarea>
            <p class="text-red-500 text-sm twinkle" v-if="is_commentContent[1] && !commentContent">*请输入内容*</p>
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

        <section>
          <div class="w-full pb-3 pl-10 relative" v-for="(i, index) in CommentFriendLink" :key="index">
            <div class=" absolute left-0">
              <img :src="i.avatarUrl" alt="" class=" w-10 h-10 rounded-full">
            </div>
            <div class="md:px-4 px-2 relative" :style="index !== CommentFriendLink.length-1 ? 'border-bottom:solid #e5e7eb 1px' : ''">
              <div class=" absolute right-10 top-5 text-6xl text-gray opacity-10"><i>{{index + 1}}</i></div>
              <p><span class="text-blue-400 font-bold" :style="i.userId == '0' ? 'color: #ff5f40;' : ''">{{ i.nickname}}</span><span
                  class="text-xs inline-block ml-2 font-semibold opacity-80" style="font-family: cursive;">{{ format_publishTime(i.commentTime) }}</span></p>
              <p class="text-0a1 text-sm py-3 w-9/10" v-html="formatComment(i.content)"></p>
              <div class='w-full flex justify-between text-0a1 opacity-60 items-center mb-2' >
                <!-- $set给没再data中定义的数据添加响应式 -->
                <div style="font-family: cursive;">
                  <img :src="getSystemIcon(i.System)" class="w-4 mr-1" alt=""><span class="text-xs" >{{i.System}}</span>
                  <img :src="getBrowserIcon((i.BrowserVersion).split(':')[0])" class="w-4 ml-5 mr-1" alt=""><span class="text-xs" >{{(i.BrowserVersion).split(':')[0] +  ((i.BrowserVersion).split(':')[1]).split('.')[0]}}</span>
                </div>
                <div class="relative cursor-pointer" @click="showreplyInput = i.id">
                  <img src="http://flechazoblog.site/Img/reply.svg" class="w-5" alt="">
                </div>
              </div>
              <!-- 回复区 -->
            <div style="background:#f7f8fc" class="rounded-xl">
              <div v-for="(reply,index) in JSON.parse(i.reply)" :key="index" class="m-3 pl-10 py-4 relative" :style="index !== JSON.parse(i.reply).length-1 ? 'border-bottom:solid #e5e7eb 1px' : ''">
                <div class="px-2" >
                  <div class=" absolute left-0">
                      <img src="http://www.flechazoblog.site:5006/img/3ccc1ce0-fb83-11ec-8f56-fd0c24eebc3f.png" alt="" class="w-9 h-9 rounded-full">
                  </div>
                  <p><span class="text-blue-400">{{ 'Flechazo'}}<span class=" inline-block ml-2" style="font-family: PingFang SC,Microsoft YaHei,sans-serif;
                    color: #FFF; padding: .1rem .25rem; font-size: .5rem; border-radius: .25rem;background-color: #ff5050;">博主</span></span><span
                      class="text-sm inline-block ml-2" style="font-family: cursive;">{{ format_publishTime(reply.commentTime) }}</span></p>
                  <p class="text-0a1 py-3 text-xs" v-html="formatComment(reply.content)"></p>
                  <div class='w-full flex justify-start text-0a1 opacity-60 items-center mb-2'>
                    <div style="font-family: cursive;">
                      <img :src="getSystemIcon(reply.System)" class="w-4 mr-1" alt=""><span class="text-xs" >{{reply.System}}</span>
                      <img :src="getBrowserIcon((reply.BrowserVersion).split(':')[0])" class="w-4 ml-5 mr-1" alt=""><span class="text-xs" >{{(reply.BrowserVersion).split(':')[0] +  ((reply.BrowserVersion).split(':')[1]).split('.')[0]}}</span>
                    </div>
                    <!-- <div class="relative cursor-pointer" @click="showreplyInput = i.id">
                      <img src="http://flechazoblog.site/Img/reply.svg" class="w-5" alt="">
                    </div> -->
                  </div>
                </div>
              </div>
           </div>
              <div v-if="showreplyInput==i.id" class="animate__animated animate__lightSpeedInRight">
               <input type="text" style="background: #FFF url(https://s1.328888.xyz/2022/08/11/6Lkbw.gif) right center no-repeat;background-size:130px" inputcentent v-model="replyContent" placeholder="请开始你的表演"
              class="msgScoll block_border focus:outline-none focus:ring focus:border-blue-300 border-none w-full h-8 md:h-16 bg-gray-100 rounded py-1 px-2 box-border text-0a1 md:text-sm text-xs block" />
                 <p class="text-red-500 text-sm twinkle" v-if="is_commentContent[2] && !replyContent">*请输入内容*</p>
                <div class="w-full flex justify-between items-center m-2">
                  <div @click="smallExpression(2,$event)" type='button' class="text-sm px-2 border border-solid border-gray-300 rounded cursor-pointer bg-white text-061 text-opacity-80 outline-none h-6 flex items-center">
                  <Icon type='smile' class='mr-1' />
                  <span>表情</span>
                </div>
                <div>
                  <button @click="showreplyInput = ''" class="py-1 px-5 border-none rounded text-black text-sm block_border mr-2 cursor-pointer" style="background:#fff">取消</button>
                  <button @click="replyCommentFriendLink(i.id)" class="py-1 px-5 border-none rounded text-white text-sm cursor-pointer" style="background:#00c3ff">评论</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        <!-- 无评论时 -->
      <Empty v-if='CommentFriendLink.length==0'
        image="https://s1.hdslb.com/bfs/static/laputa-search/client/assets/empty.3709c24c.png" :image-style="{
          height: '200px',
          'margin-bottom':'20px'
        }">
        <span slot="description" class="inline-block "> </span>
      </Empty>
      </aside>

    </article>
  </div>
</template>

<script>
// 获取浏览器名称及其版本号
function getBrowserNameVersion() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1]:
        (s = ua.match(/msie ([\d\.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/edge\/([\d\.]+)/)) ? Sys.edge = s[1] :
        (s = ua.match(/firefox\/([\d\.]+)/)) ? Sys.firefox = s[1] :
        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? Sys.opera = s[1] :
        (s = ua.match(/chrome\/([\d\.]+)/)) ? Sys.chrome = s[1] :
        (s = ua.match(/version\/([\d\.]+).*safari/)) ? Sys.safari = s[1] : 0;
    // 根据关系进行判断
    if (Sys.ie) return ('IE: ' + Sys.ie);
    if (Sys.edge) return ('Edge: ' + Sys.edge);
    if (Sys.firefox) return ('Firefox: ' + Sys.firefox);
    if (Sys.chrome) return ('Chrome: ' + Sys.chrome);
    if (Sys.opera) return ('Opera: ' + Sys.opera);
    if (Sys.safari) return ('Safari: ' + Sys.safari);

    return 0
}

function getSystem(){
    let Name = ''
    if (navigator.userAgent.indexOf("Win") != -1) Name =  "Windows"; 
    if (navigator.userAgent.indexOf("Mac") != -1) Name =  "Mac"; 
    if (navigator.userAgent.indexOf("Linux") != -1) Name ="Linux"; 
    if (navigator.userAgent.indexOf("Android") != -1) Name =  "Android"; 
    if (navigator.userAgent.indexOf("like Mac") != -1) Name =  "IOS"; 
    return Name
}


import {Icon,Empty} from 'ant-design-vue'
import { putCommentFriendLink,getCommentFriendLink,putReplyCommentFriendLink ,getFriendLink} from '../../api/friendlink'
export default {
  name: "friend_link",
  components:{Icon,Empty},
  data() {
    return {
      tab: 1,
      is_commentContent: {1:false,2:false},
      commentContent:'',
      BiLiEmaili: 'Default/default0',//表情地址
      BiLiEmailTotal:80,
      expressionLeft:0,
      expressionTop:0,//表情定位
      showexpression: false,//小表情展示框判断变量
      inputType:1,
      CommentFriendLink:[],
      showreplyInput:'',
      replyContent:'',
      friendLink:[]
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
      if (!this.commentContent && (this.is_commentContent[1] = true)) return
      let req = {
        userId: this.$store.state.userInfo.userInfo.id || '0',
        comment: this.commentContent,
        avatarUrl:this.$store.state.userInfo.userInfo.avatarUrl || 'http://www.flechazoblog.site:5006/img/home_img/notLogin.svg',
        nickname:this.$store.state.userInfo.userInfo.nickname || '游客',
        BrowserVersion:getBrowserNameVersion(),
        System:getSystem()
      }
      this.is_commentContent = false
      this.commentContent = ''
      putCommentFriendLink(req).then(async (res) => {
        if(res.data.code == 200 ){
          this.miniMessage(res.data.msg, 'success')
          // // 更新评论
          this.getNewComment()
        }else{
          this.miniMessage(res.data.msg, 'error')
        }
      })
    },
    async getNewComment(){
        const res =  await getCommentFriendLink()
        this.CommentFriendLink = res.data.data
    },
    async replyCommentFriendLink(id){
      if (!this.replyContent && (this.is_commentContent[2] = true)) return
      await putReplyCommentFriendLink({id,content:this.replyContent,BrowserVersion:getBrowserNameVersion(),System:getSystem()})
      this.replyContent = ''
      this.getNewComment()
    },
    //获取浏览器图标
    getBrowserIcon(browser){
      const obj = {
        'Firefox':"https://tva1.sinaimg.cn/large/e8a55238gy1h52w536n9uj200w00wgle.jpg",
        'Chrome':'https://tva1.sinaimg.cn/large/e8a55238gy1h52w52i5b4j200w00wgle.jpg',
        'Opera':'https://tva1.sinaimg.cn/large/e8a55238gy1h52w52o43gj200w00wgle.jpg',
        'Edge':'https://tva1.sinaimg.cn/large/e8a55238gy1h52w52ih18j200w00wgle.jpg',
        'Safari':'https://tva1.sinaimg.cn/large/e8a55238gy1h52w52h2pcj200w00wgle.jpg',
        'IE':'https://tva1.sinaimg.cn/large/e8a55238gy1h52w52j46hj200w00wjr6.jpg'
      }
      return obj[browser] || 'https://tva1.sinaimg.cn/large/e8a55238gy1h52wd1piqij200w00wdfm.jpg'
    } ,
    // 获取操作系统图标
    getSystemIcon(system){
      const obj = {
        'Windows':"https://tva1.sinaimg.cn/large/e8a55238gy1h52wnuqnhhj200w00wgle.jpg",
        'Mac':'https://tva1.sinaimg.cn/large/e8a55238gy1h52wudcue5j200w00w0sh.jpg',
        'Linux':'https://tva1.sinaimg.cn/large/e8a55238gy1h52wudd09mj200w00w3ya.jpg',
        'Android':'https://tva1.sinaimg.cn/large/e8a55238gy1h52wudd2g4j200w00wwe9.jpg',
        'IOS':'https://tva1.sinaimg.cn/large/e8a55238gy1h52wudd682j200w00w0ng.jpg',
      }
      return obj[system]
    }
  },
  watch:{
    showreplyInput(){
      this.replyContent = ''
    },
    tab(newval){
      newval == 2 ? getFriendLink().then((res)=>{this.friendLink = res.data.data}) : ''
    }
  },
  created(){
      this.$store.commit('change_show_header',true)
  },
  async mounted(){
    this.getNewComment()
  }
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