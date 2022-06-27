<template>
  <div class="w-full h-aotu" style="background-color: #f4f8fb" @click="()=>{showexpression = false;return false}">
    <iframe
      frameborder="0"
      scrolling="no"
      src="http://47.107.243.60:5005/colokBanner.html"
      class="w-full"
      height="500px"
    ></iframe>
    <div class=" w-screen md:w-1/2 mx-auto flex justify-center py-2">
      <span class="px-5 text-yellow-500 cursor-pointer">
        <svg @click="shareSpace" t="1656318782892" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2494" width="30" height="30"><path d="M648.64 366.4S538.56 87.36 512 87.36 375.36 366.4 375.36 366.4 80 387.52 70.08 411.2s220.96 217.28 220.96 217.28-68.16 293.76-52.16 306.72S512 790.4 512 790.4s256 163.04 273.28 144.8c12.8-13.28-20.16-166.56-39.52-251.2a148 148 0 0 1 29.28-8.32 78.4 78.4 0 0 0 25.6-9.44s-61.44 13.92-241.92 17.76-231.36-5.12-231.36-5.12l254.4-190.88s-79.04-14.56-139.04-20c-85.92-7.84-161.12-7.68-151.68-10.08A1320.32 1320.32 0 0 1 512 448a1475.84 1475.84 0 0 1 184.96 20.16L442.72 650.88s55.52 8.48 101.6 10.4c87.84 3.36 195.04 0.8 194.88 0-3.36-14.08-6.24-32-6.24-32S962.24 434.88 954.08 411.2s-305.44-44.8-305.44-44.8z" fill="#F5BE3F" p-id="2495"></path></svg>
      </span>
      <div class="px-5 relative cursor-pointer">
        <svg @click="()=>{
          shoeqrcode = !shoeqrcode
            if(shoeqrcode){
            $nextTick(()=>{
              createQrcode()
            })}
          }" t="1656318853875" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4634" width="30" height="30"><path d="M669.3 369.4c9.8 0 19.6 0 29.4 1.6C671 245.2 536.9 152 383.2 152 211.6 152 71 269.7 71 416.8c0 85 45.8 156.9 124.2 210.9l-31.1 93.2L273.6 667c39.2 8.2 70.3 16.3 109.5 16.3 9.8 0 19.6 0 31.1-1.6-6.5-21.3-9.8-42.5-9.8-65.4 0.1-135.7 116.2-246.9 264.9-246.9z m-168.4-85c24.5 0 39.2 16.3 39.2 39.2 0 22.9-16.3 39.2-39.2 39.2-24.5 0-47.4-16.4-47.4-39.2 0-24.5 24.6-39.2 47.4-39.2z m-216.3 73.1c-24.7 0-47.8-16.2-47.8-38.8 0-24.3 24.7-38.8 47.8-38.8s39.5 16.2 39.5 38.8c0.1 22.7-16.4 38.8-39.5 38.8z" fill="#24DB5A" p-id="4635"></path><path d="M953.8 613c0-125.9-124.2-227.2-264.8-227.2-148.8 0-266.5 103-266.5 227.2 0 125.9 117.7 227.2 266.5 227.2 31.1 0 62.1-8.2 93.2-16.3l85 47.4-22.9-78.5c62.1-47.4 109.5-109.5 109.5-179.8z m-351.5-39.2c-14.7 0-31.1-14.7-31.1-31.1 0-14.7 16.3-31.1 31.1-31.1 22.9 0 39.2 16.3 39.2 31.1 0 16.4-14.7 31.1-39.2 31.1z m178-7.6c-14.8 0-31.3-14.6-31.3-30.7 0-14.6 16.5-30.7 31.3-30.7 23.1 0 39.5 16.2 39.5 30.7 0 16.2-16.4 30.7-39.5 30.7z" fill="#24DB5A" p-id="4636"></path></svg>
        <div class="absolute -left-4"  ref="qrcode" v-if="shoeqrcode"></div>
      </div>
      <span class="px-5 cursor-pointer">
        <svg t="1656318884148" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5506" width="30" height="30"><path d="M676.16 232.48s113.28-12 161.44 58.24 27.36 158.56 27.36 158.56a21.92 21.92 0 0 0 22.56 26.08h11.2A30.4 30.4 0 0 0 928 449.12s26.08-138.56-54.4-215.68c-62.72-60.32-148.64-66.88-183.04-66.88h-15.2a27.04 27.04 0 0 0-26.4 26.88v13.12a25.6 25.6 0 0 0 27.2 25.92zM453.12 758.08c79.04-16 132.48-81.92 119.52-148.64-11.2-57.44-67.84-96-133.76-96a163.52 163.52 0 0 0-32 3.2c-79.04 16-132.48 81.92-119.52 148.64s86.88 108.16 165.76 92.8z m2.24-171.68A24.64 24.64 0 1 1 432 611.04a24.48 24.48 0 0 1 23.36-24.64zM368 624.96c24.32-11.36 51.04-5.6 59.52 12.96s-3.52 42.72-27.52 54.08a60.96 60.96 0 0 1-25.12 5.76 36 36 0 0 1-34.4-18.88c-8.96-18.4 3.68-42.56 27.52-53.92z" fill="#F56467" p-id="5507"></path><path d="M467.52 857.44c208 0 374.4-110.24 374.4-246.4 0-114.88-141.76-114.88-141.76-122.4s70.72-74.08 0-115.68c-42.24-24.96-105.6-12.16-148.8 0a330.24 330.24 0 0 1-47.04 14.4c55.68-97.12-23.68-128-64-128-96 0-348.64 214.88-348.64 350.88s168.16 247.2 375.84 247.2z m-34.4-392.64c132.64-18.72 250.24 37.28 262.56 124.8s-85.28 173.76-218.08 192a365.28 365.28 0 0 1-50.72 3.52c-110.72 0-200.96-52.16-211.68-128-12.32-87.52 85.28-173.76 217.92-192.32z" fill="#F56467" p-id="5508"></path><path d="M780.64 444.16h16a21.44 21.44 0 0 0 20.64-17.44s18.88-73.12-24.96-113.12a111.04 111.04 0 0 0-75.84-28.16 108.32 108.32 0 0 0-25.28 2.56 21.12 21.12 0 0 0-17.44 20.16v6.88a16 16 0 0 0 17.92 16.8s48-6.56 71.36 21.6 5.12 73.76 5.12 73.76a12.32 12.32 0 0 0 12.48 16.96z" fill="#F56467" p-id="5509"></path></svg>
      </span>
    </div>
    <div
      class="w-full md:w-3/5 md:mt-10 pt-1 mx-auto border-4 border-light-blue-500 border-opacity-100 bg-white shadow-2xl rounded-b-3xl"
    >
      <div
        class="text-xl md:text-2xl lg:text-3xl font-bold md:px-1 mt-3 md:mt-0"
      >
        {{ article.article_title }}
      </div>
      <div class="w-full flex justify-between items-center my-3 shadow-sm">
        <div class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
          <img :src="article.uper.avatarUrl" class="w-full h-full rounded-full" alt="" crossorigin />
        </div>
        <div class="felx justify-start items-start flex-grow text-xs ml-1 md:ml-3 lg:ml-5">
          <p class="m-0 text-black md:text-base">{{ article.uper.nickname }}</p>
          <p class="m-0 w-48 md:w-72 lg:w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
            {{ article.publish_time }} 阅读9866
          </p>
        </div>
        <button class="editBtn text-xs md:text-base" @click="go_up_article(article)"
          v-if="article.userId == $store.state.userInfo.userInfo.id">
          修改
        </button>
        <Tooltip>
          <template slot="title">
            {{
                article.userId == $store.state.userInfo.userInfo.id
                  ? tip
                  : "谢谢喜欢 🤪"
            }}
          </template>
          <button class="follows text-xs md:text-base" @click="followsAuthor">
            <span class="button-content">
              关注
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H24V24H0z" fill="none"></path>
                <path
                  d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z"
                  fill="currentColor"></path>
              </svg>
            </span>
          </button>
        </Tooltip>
      </div>
      <div v-html="article.content" class="px-3 md:px-18 w-full"></div>
    </div>
    <!-- 评论区 -->
    <aside
      class="w-full px-3 md:w-3/5 md:mt-14 mt-5 mx-auto border-4 border-light-blue-500 border-opacity-100 bg-white shadow-2xl rounded-t-3xl">
      <div class="w-full text-xs flex justify-between pt-5" style='color:#999999'>
        <span>热门评论（76）</span>
        <span class=" cursor-pointer">
          <Icon type="menu" />按热度
        </span>
      </div>
      <!-- 输入框 -->
     <div class="py-3 flex justify-between">
       <div class=" w-12">
         <img src="https://p3.music.126.net/WTRxTrA1rUhPgAcCWKEYWw==/109951163339630057.jpg" alt="" class=" w-7 h-7 rounded-full">
       </div>
       <form class="flex-1 relative" v-on:submit.prevent>
         <input type="text" v-model="commentContent" placeholder="发一条友善的评论" class="focus:outline-none focus:ring focus:border-blue-300 border-none w-full h-8 md:h-12 bg-gray-100 rounded py-1 px-2 box-border text-0a1 md:text-sm text-xs block">
        <p class="text-red-500 text-sm twinkle" v-if="is_commentContent && !commentContent">**请输入内容</p>
        <div class="mt-3 flex justify-between">
          <div @click="(e)=>{this.showexpression = true;e.stopPropagation();return false}" type='button' class="text-sm px-2 border border-solid border-gray-300 rounded cursor-pointer bg-white text-061 text-opacity-80 outline-none h-6">
            <Icon type='smile' class='mr-1'/>
            <span>表情</span>
          </div>
          <button @click="PutComment" type="submit" class="text-sm text-white outline-none px-2 rounded h-6 w-17 cursor-pointer " style="background:#fb7299;border: 1px solid #fb7299">
            发布
          </button>
         </div>
         <!-- 表情 -->
        <div @click="(e)=>{e.stopPropagation()}" v-if="showexpression" class="absolute -bottom-56 bg-white z-100 md:w-86 md:h-60  w-56 h-42 rounded border border-solid border-gray-300 shadow-md ">
          <p class='pt-1 pb-2 m-0 h-1/6 text-xs'>小表情</p>
          <div class="w-full h-2/3 flex justify-around flex-wrap overflow-auto bg-white z-999">
             <div  v-for="i in BiLiEmailTotal" :key="i" class="md:w-14 md:h-10 w-9 h-6 flex justify-center items-center">
               <img :src="'http://47.107.243.60:5005/img/BiLiEmail/'+ BiLiEmaili + i +'.png'" alt="" class="md:w-7 w-5 md:h-7 h-5" @click="inputexpression(BiLiEmaili + i)">
             </div>
          </div>
          <div class="w-full h-1/6 bg-gray-300 flex justify-start">
            <div @click="(e)=>{BiLiEmaili = 'Default/default0';BiLiEmailTotal = 80;e.stopPropagation()}" class="h-full w-1/5 flex justify-center items-center" :class="BiLiEmaili == 'Default/default0' ? 'bg-white' : ''" style="border-right:solid #CCC 1px">
               <img src="http://47.107.243.60:5005/img/BiLiEmail/Default/default01.png" alt="" class="md:w-7 w-5 md:h-7 h-5">
            </div>
            <div @click="(e)=>{BiLiEmaili = 'BiLiTV/BiLITV_';BiLiEmailTotal = 5;e.stopPropagation()}" class="h-full w-1/5  flex justify-center items-center" :class="BiLiEmaili == 'BiLiTV/BiLITV_' ? 'bg-white' : ''"  style="border-right:solid #CCC 1px">
               <img :src="'http://47.107.243.60:5005/img/BiLiEmail/BiLiTV/BiLITV_1.png'" alt="" class="md:w-7 w-5 md:h-7 h-5">
            </div>
          </div>
          </div>
        </form>
      </div>
      <!-- 评论展示区 -->
      <section>
        <div class="w-full pb-3 pl-10 relative" v-for="(i, index) in comment" :key="index">
          <div class=" absolute left-0">
            <img :src="i.avatarUrl" alt="" class=" w-10 h-10 rounded-full">
          </div>
          <div class="md:px-4 px-2" style="border-bottom:solid #e5e7eb 1px">
            <p class="text-sm"><span>{{ i.nickname }}</span><span class="text-xs inline-block ml-2">04-26</span></p>
            <p class="text-0a1" v-html="i.comment"></p>
            <div class='w-full flex justify-between text-0a1 opacity-60 items-center'>
              <div class="w-1/3 md:w-28 flex justify-between ">
                <Icon type="like" title="点赞" class="hover:text-pink-400 cursor-pointer" />
                <Icon type="dislike" title='点踩' class="hover:opacity-100 cursor-pointer" />
                <Icon type="message" title="评论" class="hover:text-blue-400 cursor-pointer" />
              </div>
              <!-- $set给没再data中定义的数据添加响应式 -->
              <div class="relative cursor-pointer" @click="() => {
                if (deleteVisi.r == index) {
                  deleteVisi.r = null
                  return
                }
                $set(deleteVisi, 'r', index)
              }">
                <Icon type="more" />
                <div @click='deleteComment(index)' v-if="deleteVisi.r == index"
                  class="absolute -top-5 -left-10 w-10 text-center shadow-md border border-solid border-gray-200 text-xs cursor-pointer hover:text-blue-500">
                  <Icon type="delete" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 无评论时 -->
      <Empty v-if='comment.length == 0'
        image="https://s1.hdslb.com/bfs/static/laputa-search/client/assets/empty.3709c24c.png" :image-style="{
          height: '200px',
        }">
        <span slot="description"> 🤡 🤡</span>
      </Empty>
    </aside>
  </div>
</template>

<script>
import { Tooltip,Icon,Empty } from "ant-design-vue";
import QRCode from 'qrcodejs2'
import {putComment,getComment,deleteComment} from '../../api/comment'
export default {
  name: "article_detail",
  components: {
    Tooltip,
    Icon,
    Empty
  },
  data() {
    return {
      article: {
        commenter: []
      },
      comment: [],
      tip: "您时刻都在关注您自己！😁",
      count: 0,
      commentContent: '',//内容
      showexpression: false,//小表情展示框判断变量
      BiLiEmaili: 'Default/default0',//表情地址
      BiLiEmailTotal: 80,//该系列表情数量,
      is_commentContent: false,
      deleteVisi: {},//删除按钮
      sendtext:true,
      shoeqrcode:false,
      href : window.location.href
    };
  },
  methods: {
    shareSpace(){
      const url = 'http://47.107.243.60/home'
      const title = this.article.article_title
      // const desc = this.article.article_introduction
      const href = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&sharesource=qzone&title=${title}&pics=https://p3.music.126.net/WTRxTrA1rUhPgAcCWKEYWw==/109951163339630057.jpg`
      window.open(href)
    },
    // 微信分享二维码
    createQrcode(){
       let text = this.href
      // let qrcode =
       new QRCode(this.$refs.qrcode, {
        text: text, //二维码内容字符串
        width: 108, //图像宽度
        height: 108, //图像高度
        colorDark: '#000000', //二维码前景色
        colorLight: '#ffffff', //二维码背景色
        correctLevel: QRCode.CorrectLevel.H, //容错级别
      })
      // console.log(qrcode);
    },
    // 格式化评论
   formatComment(comment) {
      if (comment.indexOf('@') >= 0) {
        let a = comment.match(/(?<=@).*?(?=!)/g)
        for (let i = 0; i < a.length; i++) {
          comment = comment.replace('@' + a[i] + '!', `<img src='http://47.107.243.60:5005/img/BiLiEmail/${a[i]}.png' class='w-6 h-6'/>`)
      }
    }
    return comment
    },
    followsAuthor() {
      this.count++;
      if (this.article.userId == this.$store.state.userInfo.userInfo.id) {
        if (this.count > 10) {
          this.tip = "别调皮😤";
        }
        return;
      }
    },
    // 输入表情处理
    inputexpression(expression_val) {
      this.commentContent += '@' + expression_val + '!'
      // this.showexpression = false
    },
    //发布评论
    PutComment() {
      if (this.noLogin()) return // 未登录
      console.log(this.$store);
      if (!this.commentContent) {
        this.is_commentContent = true
        return
      }
      this.sendtext = false
      let req = {
        uper: this.$route.params.userId ? this.$route.params.userId : JSON.parse(localStorage.getItem('article_details')).userId,
        article_id: this.$route.params.id,
        userId: this.$store.state.userInfo.userInfo.id,
        comment: this.commentContent,
      }
      this.is_commentContent = false
      this.commentContent = ''
      putComment(req).then(async () => {
        this.miniMessage('评论成功🥰', 'success')
        delete req.comment
        // 更新评论
        this.getComments(req)
        this.sendtext = true
      })
    },
    async getComments(req) {
      const res = await getComment(req)
      let arr = []
      console.log(res);
      res.data.commenter.forEach(i => {
        for (let index = 0; index < i.comment.length; index++) {
          const comment = this.formatComment(i.comment[index])
          arr.push({ comment, avatarUrl: i.avatarUrl, nickname: i.nickname })
        }
      })
      this.comment = arr
    },
    // 删除评论
    async deleteComment(index) {
      let req = {
        uper: this.$route.params.userId ? this.$route.params.userId : JSON.parse(localStorage.getItem('article_details')).userId,
        article_id: this.$route.params.id,
        index
      }
      await deleteComment(req)
      this.getComments(req)
      this.miniMessage('删除成功👌', 'success')
    }
  },
  async created() {
    this.$route.params.content
      ? this.article = this.$route.params
      : (this.article = JSON.parse(localStorage.getItem("article_details")));
    const req = {
      uper: this.$route.params.userId ? this.$route.params.userId : JSON.parse(localStorage.getItem('article_details')).userId,
      article_id: this.$route.params.id,
    }
    this.getComments(req)
    localStorage.setItem("article_details", JSON.stringify(this.article));

    //页面标题为文章标题
    document.title  = this.article.article_title
  },
  mounted() {
    // 代码块内容复制
    const pre = document.getElementsByTagName("pre");
    // 给伪元素添加事件，采用事件冒泡的机制实现
    Array.from(pre).forEach((item) => {
      item.children[0].onclick = (e) => {
        e.stopPropagation();
        return;
      };
      item.addEventListener(
        "click",
        () => {
          const content = item.children[0].innerText;
          navigator.clipboard
            .writeText(content)
            .then(() => {
              this.miniMessage('复制成功🥰', 'success')
            })
            .catch(() => { });
        },
        false
      );
    });
  },
};
</script>

<style lang="less" >
@font-face {
  font-family: firaCode;
  src: url("../../assets/font/FiraCode-Bold-5.ttf") format("truetype")
}

pre {
  background-color: #292a25;
  display: flex;
  justify-content: space-between;
  color: white;
  margin: 0 15px;
  code{
  font-family:'firaCode';
  font-size: 14px;
  }

  &::after {
    content: "";
    width: 20px;
    height: 20px;
    background-image: url(http://img1.3png.com/81c41e9a6ac6aefdef1845b4d9bc2b994130.png);
    background-size: 100% 100%;
    color: rgb(190, 179, 179);
    cursor: pointer;
  }
}

.h {
  img {
    width: 100%;
  }
}

/* From uiverse.io */
.follows {
  font-family: inherit;
  font-weight: 700;
  padding: 4px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  color: black;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  background: linear-gradient(0deg,
      #df5e88,
      rgba(0, 91, 187, 1) 47%,
      rgba(0, 91, 187, 1) 100%);
}

.follows .button-content {
  display: flex;
  align-items: center;
  background: white;
  padding: 0.2em 0.9em;
  // padding-left: 1.2em;
  border-radius: 16px;
}

.follows svg {
  width: 18px;
  height: 18px;
  margin-left: 6px;
  color: #ff0000;
  transition: transform 0.3s;
}

.follows:hover svg {
  transform: scale(1.2);
}

.editBtn {
  width: 90px;
  height: 35px;
  margin: 0.5em;
  background: black;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.editBtn:hover {
  color: black;
}

.editBtn:after {
  content: "";
  background: white;
  position: absolute;
  z-index: -1;
  left: -20%;
  right: -20%;
  top: 0;
  bottom: 0;
  transform: skewX(-45deg) scale(0, 1);
  transition: all 0.5s;
}

.editBtn:hover:after {
  transform: skewX(-45deg) scale(1, 1);
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}

textarea {
  transition: 0.5s;
}

textarea:focus {
  height: 60px;
}

// 文字闪烁
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
/* From uiverse.io by @mrhyddenn */
</style>
<style>
/* From uiverse.io by @mrhyddenn */
.mover {
  background: rgba(56, 111, 173, 0.979);
  height: 2px;
  width: 10px;
  border-radius: 10px;
  position: relative;
  animation: mover5 2s ease-in-out infinite;
}

.mover::before,
.mover::after {
  content: '';
  position: absolute;
  height: 2px;
  width: 10px;
  border-radius: 10px;
  animation: mover5 2s ease-in-out infinite;
}

.mover::before {
  background: rgb(105, 188, 236);
  top: 4px;
}

.mover::after {
  background: rgb(116, 201, 226);
  top: -4px;
}

@keyframes mover5 {
  0% {
    transform: translateX(5px) scale(1);
  }

  50% {
    transform: translateX(-5px) scale(1.2);
  }

  100% {
    transform: translateX(5px) scale(1);
  }
}
</style>
