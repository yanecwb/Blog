<template>
  <div class="w-full h-aotu" style="background-color: #f4f8fb" @click="()=>{showexpression = false;return false}">
    <iframe
      frameborder="0"
      scrolling="no"
      src="http://47.107.243.60:5003/colokBanner.html"
      class="w-full"
      height="500px"
    ></iframe>
    <div
      class="w-full md:w-3/5 md:mt-14 pt-1 mx-auto border-4 border-light-blue-500 border-opacity-100 bg-white shadow-2xl rounded-b-3xl"
    >
      <div
        class="text-xl md:text-2xl lg:text-3xl font-bold md:px-1 mt-3 md:mt-0"
      >
        {{ article.article_title }}
      </div>
      <div class="w-full flex justify-between items-center my-3 shadow-sm">
        <div class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
          <img
            :src="article.uper.avatarUrl"
            class="w-full h-full rounded-full"
            alt=""
            crossorigin
          />
        </div>
        <div
          class="felx justify-start items-start flex-grow text-xs ml-1 md:ml-3 lg:ml-5"
        >
          <p class="m-0 text-black md:text-base">{{ article.uper.nickname }}</p>
          <p
            class="m-0 w-48 md:w-72 lg:w-full overflow-hidden whitespace-nowrap overflow-ellipsis"
          >
            {{ article.publish_time }} 阅读9866
          </p>
        </div>
        <button
          class="editBtn text-xs md:text-base"
          @click="go_up_article(article)"
          v-if="article.userId == $store.state.userInfo.userInfo.id"
        >
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
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </button>
        </Tooltip>
      </div>
      <div v-html="article.content" class="px-3 md:px-18 w-full"></div>
    </div>
    <!-- 评论区 -->
    <aside class="w-full px-3 md:w-3/5 md:mt-14 mt-5 mx-auto border-4 border-light-blue-500 border-opacity-100 bg-white shadow-2xl rounded-t-3xl">
      <div class="w-full text-xs flex justify-between pt-5" style='color:#999999'>
        <span>热门评论（76）</span>
        <span class=" cursor-pointer"><Icon type="menu" />按热度</span>
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
               <img :src="'http://47.107.243.60:5003/img/BiLiEmail/'+ BiLiEmaili + i +'.png'" alt="" class="md:w-7 w-5 md:h-7 h-5" @click="inputexpression(BiLiEmaili + i)">
             </div>
          </div>
          <div class="w-full h-1/6 bg-gray-300 flex justify-start">
            <div @click="(e)=>{BiLiEmaili = 'Default/default0';BiLiEmailTotal = 80;e.stopPropagation()}" class="h-full w-1/5 flex justify-center items-center" :class="BiLiEmaili == 'Default/default0' ? 'bg-white' : ''" style="border-right:solid #CCC 1px">
               <img src="http://47.107.243.60:5003/img/BiLiEmail/Default/default01.png" alt="" class="md:w-7 w-5 md:h-7 h-5">
            </div>
            <div @click="(e)=>{BiLiEmaili = 'BiLiTV/BiLITV_';BiLiEmailTotal = 5;e.stopPropagation()}" class="h-full w-1/5  flex justify-center items-center" :class="BiLiEmaili == 'BiLiTV/BiLITV_' ? 'bg-white' : ''"  style="border-right:solid #CCC 1px">
               <img :src="'http://47.107.243.60:5003/img/BiLiEmail/BiLiTV/BiLITV_1.png'" alt="" class="md:w-7 w-5 md:h-7 h-5">
            </div>
          </div>
       </div>
       </form>
     </div>
       <!-- 评论展示区 -->
      <section>
        <div class="w-full pb-3 pl-10 relative" v-for="(i,index) in article.comment" :key="index">
          <div class=" absolute left-0">
            <img src="https://img.zcool.cn/community/01b91e5d368512a80120695c617f59.jpg@1280w_1l_2o_100sh.jpg" alt="" class=" w-10 h-10 rounded-full">
          </div>
          <div class="md:px-4 px-2" style="border-bottom:solid #e5e7eb 1px">
            <p class="text-sm"><span>yaner</span><span class="text-xs inline-block ml-2">04-26</span></p>
            <p class="text-0a1" v-html="i"></p>
            <div class='w-full flex justify-between text-0a1 opacity-60 items-center'>
              <div class="w-1/3 md:w-28 flex justify-between ">
                <Icon type="like" title="点赞" class="hover:text-pink-400 cursor-pointer"/>
                <Icon type="dislike" title='点踩' class="hover:opacity-100 cursor-pointer" />
                <Icon type="message" title="评论" class="hover:text-blue-400 cursor-pointer" />
              </div>
              <!-- $set给没再data中定义的数据添加响应式 -->
              <div class="relative cursor-pointer" @click="()=>{
                if(deleteVisi.r == index){
                   deleteVisi.r = null
                   return
                }
                $set(deleteVisi,'r',index)
                }">
                <Icon type="more"/>
                <div @click='deleteComment(index)' v-if="deleteVisi.r == index" class="absolute -top-5 -left-10 w-10 text-center shadow-md border border-solid border-gray-200 text-xs cursor-pointer hover:text-blue-500"><Icon type="delete" /></div>
              </div>
            </div>
          </div>
      </div>
      </section>
      <!-- 无评论时 -->
      <Empty
      v-if='article.comment.length == 0'
      image="https://s1.hdslb.com/bfs/static/laputa-search/client/assets/empty.3709c24c.png"
      :image-style="{
        height: '200px',
      }"
    >
      <span slot="description"> 🤡 🤡</span>
    </Empty>
    </aside>
  </div>
</template>

<script>
import { Tooltip,Icon,Empty } from "ant-design-vue";
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
        comment:[]
      },
      tip: "您时刻都在关注您自己！😁",
      count: 0,
      commentContent:'',//内容
      showexpression:false,//小表情展示框判断变量
      BiLiEmaili:'Default/default0',//表情地址
      BiLiEmailTotal:80 ,//该系列表情数量,
      is_commentContent:false,
      deleteVisi:{}//删除按钮
    };
  },
  methods: {
    formatComment(comment){
    let arr = []
    comment.forEach(item=>{
      if(item.indexOf('@') >= 0){
        let a  = item.match(/(?<=@).*?(?=!)/g)
        for(let i = 0;i<a.length;i++){
          item = item.replace('@'+a[i]+'!',`<img src='http://47.107.243.60:5003/img/BiLiEmail/${a[i]}.png' class='w-6 h-6'/>`)
        }
      }
      arr.push(item)
    })
    return arr
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
    inputexpression(expression_val){
     this.commentContent += '@'+expression_val +'!'
     this.showexpression = false
    },
    //发布评论
    PutComment(){
      if(!this.commentContent){
        this.is_commentContent = true
        return
      }
      let req  = {
        uper:this.$route.params.userId ? this.$route.params.userId : JSON.parse(localStorage.getItem('article_details')).userId,
        article_id:this.$route.params.id,
        comment:this.commentContent,
      }
      this.is_commentContent = false
      this.commentContent = ''
      putComment(req).then(async()=>{
        this.miniMessage('评论成功🥰','success')
        delete req.comment
        // 更新评论
        const res = await getComment(req)
        this.article.comment = this.formatComment(res.data.comment)
      })
    },
    // 删除评论
    async deleteComment(index){
       let req  = {
        uper:this.$route.params.userId ? this.$route.params.userId : JSON.parse(localStorage.getItem('article_details')).userId,
        article_id:this.$route.params.id,
        index
      }
      await deleteComment(req)
      const res = await getComment(req)
      this.article.comment = this.formatComment(res.data.comment)
      this.miniMessage('删除成功👌','success')
    }
  },
  async created() {
    // this.$store.commit('change_show_header',false)
    this.$route.params.content
      ? this.article = this.$route.params
      : (this.article = JSON.parse(localStorage.getItem("article_details")));
      this.article.comment = []
      const res = await getComment({
          uper:this.$route.params.userId ? this.$route.params.userId : JSON.parse(localStorage.getItem('article_details')).userId,
          article_id:this.$route.params.id,
        })
    this.article.comment = this.formatComment(res.data.comment)
    localStorage.setItem("article_details", JSON.stringify(this.article));
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
              this.miniMessage('复制成功🥰','success')
            })
            .catch(() => {});
        },
        false
      );
    });
  },
};
</script>

<style lang="less">
@font-face {
  font-family: firaCode;
  src: url("../../assets/font/FiraCode-Bold-5.ttf") format("truetype")
}
pre {
  background-color: #292a25;
  display: flex;
  justify-content: space-between;
  color: white;
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
  background: linear-gradient(
    0deg,
    #df5e88,
    rgba(0, 91, 187, 1) 47%,
    rgba(0, 91, 187, 1) 100%
  );
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
input{
  transition: 0.5s;
}
input:focus{
  height: 60px;
}
// 文字闪烁
.twinkle{
  animation: twinkle 0.5s linear 3;
}
@-webkit-keyframes twinkle{
  0% {opacity: 1;}
  50% {opacity: 1;}
  50.1% {opacity: 0;}
  100% {opacity: 0;}
}
// .more{
//   display: none;
// }
// section:hover .more{
//   display: inline-block;
// }
</style>
