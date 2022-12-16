<template>
    <div class="relative initBg">
      <Bgcanvas :height="1300"/>
      <div class="relative flex w-screen mx-auto pt-7 md:w-400 md:justify-between">
        <div class="w-full article_left md:w-200 lg:w-260 ">
          <div class="flex justify-start p-2 mx-2 mb-3 text-base bg-white rounded-lg shadow-lg cursor-pointer md:mx-0 hvr-underline-from-left" @click="showNaggingModal = true">
            <div>
              <Icon type="smile" class="mr-2"/>
              <span>碎碎念</span>
            </div>
            <div class="flex-1 text-center" >
              <div  v-for="(i,index) in nagging" v-if="index == naggingIndex" class="animate__fadeInUp animate__animated" :key="index">{{i}}</div>
            </div>
            <div>
              <Icon type="api" />
            </div>
          </div>
          <section v-if="showNaggingModal" @click="(e)=>{ e.target.tagName == 'SECTION' ? showNaggingModal = false : ''}" class="fixed top-0 left-0 flex items-center justify-center w-screen h-screen z-999" style="background:rgba(0,0,0,.5)">
            <div class="p-3 overflow-auto bg-white rounded w-9/10 md:w-1/3 h-2/3 msgScoll initBg animate__animated animate__zoomInDown">
              <div class="flex justify-between font-bold"><h3><Icon type="smile" class="mr-2"/><span>碎碎念</span></h3><Icon type="close" @click="showNaggingModal = false"/></div>
               <input type="text" style="background: #FFF url(http://flechazoblog.site:5006/img/static_img/fan_girl.gif) right center no-repeat;background-size:100px" inputcentent v-model="naggingContent" placeholder="请开始你的表演"
              class="box-border block w-full h-12 px-2 py-1 my-3 text-xs bg-gray-100 border-none rounded msgScoll block_border focus:outline-none focus:ring focus:border-blue-300 md:h-16 text-0a1 md:text-sm" />
              <div class="flex-1 py-2 mb-4 text-xl text-center text-white rounded cursor-pointer bg-122" @click="sendNagging" style="background: rgb(0, 195, 255);">发布</div>
              <div v-for="(i,index) in Allnagging" class="relative block py-3 pl-20 pr-3 mb-3 bg-white rounded-xl hvr-float-shadow" style="box-shadow: 0 3px 8px 6px rgb(7 17 27 / 6%);" :key="index">
                <img src="http://www.flechazoblog.site:5006/img/3ccc1ce0-fb83-11ec-8f56-fd0c24eebc3f.png" class="absolute w-12 h-12 rounded-full left-2"  alt="">
                <p class="font-bold ">Flechazo<span class="inline-block ml-2" style="font-family: PingFang SC,Microsoft YaHei,sans-serif;
                    color: #FFF; padding: .1rem .25rem; font-size: .5rem; border-radius: .25rem;background-color: #ff5050;">博主</span></p>
                <p class="mt-1 mb-3 text-xs">{{format_publishTime(i.time)}}</p>
                <p class="w-full mb-2 text-black break-all">{{i.content}}</p>
                <div><Icon type="like" class="mr-6 "/><Icon type="message"/></div>
              </div>
            </div>
          </section>
          <div class="justify-center felx md:justify-between animate__animated animate__backInLeft mb-52"
            v-if="!$store.state.is_phone">
            <div class="w-full overflow-hidden bg-center bg-no-repeat rounded-lg shadow-lg article_left_hot_img h-110" :style="{ backgroundImage:hotUrl || scrolltop > 100 ? 'url(https://tva1.sinaimg.cn/large/e8a55238gy1h51vhndza5j22yo1o01kx.jpg)' && (hotUrl = 'url(https://tva1.sinaimg.cn/large/e8a55238gy1h51vhndza5j22yo1o01kx.jpg)') : ''}"></div>
            <div class="rounded-lg article_left_hot_content group block_border hvr-underline-from-left">
              <div class="article_left_hot_content_desc">
                <a href="#">Gadgets</a>
                <span>
                  <Icon type="calendar" />{{format_publishTime(selectedArticle.publish_time)}}
                </span>
                <span>
                  <Icon type="message" />{{selectedArticle.commentCount}}
                </span>
              </div>
              <div class="mb-5 article_left_hot_content_title">
                <h2>{{selectedArticle.article_title}}</h2>
              </div>
              <div class="article_left_hot_content_content">
                <p style="font-family: 'Gabriola'; font-size: 15px">
                  {{selectedArticle.article_introduction}}
                </p>
              </div>
              <a :href="`http://flechazoblog.site/article_detail/${selectedArticle.id}`" target="_blank" style="color: rgba(0,0,0,.65);text-decoration: none;">
                <div
                class="readmore_btn" >
                Read More</div>
              </a>
            </div>
          </div>
          <div class="flex flex-wrap justify-center w-full md:justify-between">
            <div class="w-screen mx-2 mb-10 shadow-lg md:w-96 lg:w-108 md:mb-14 lg:mb-16 block_border md:rounded-lg group"  v-for="(item,index) in article_list" :key="item.id">
              <div v-if="arr[index]" class="animate__animated animate__fadeIn animate__slower">
              <div class="w-full bg-center bg-no-repeat bg-cover h-68 md:rounded-t-lg bg-origin-content article_left_natural" :style="{ backgroundImage: 'url(' + article_listBg[index] + ')' }"></div>
              <div class="relative w-full px-8 py-4 bg-white md:rounded-b-lg hvr-underline-from-left">
                <div class=" article_left_natural_content_desc">
                  <a href="#">Gadgets</a>
                  <span>
                    <Icon type="calendar" />
                    {{ format_publishTime(item.publish_time) }}
                  </span>
                  <span>
                    <Icon type="message" />
                    {{ item.commentCount }}
                  </span>
                </div>
                <div class="article_left_natural_content_title">
                  <h3 class="m-0">{{ item.article_title }}</h3>
                </div>
                <div class="article_left_natural_content_content">
                  <p style="font-family: 'Gabriola'; font-size: 12px;height: 55px;">
                    {{ item.article_introduction }}
                  </p>
                </div>
                <a :href="`http://flechazoblog.site/article_detail/${item.id}`" target="_blank" style="color: rgba(0,0,0,.65);text-decoration: none;">
                  <div
                  class="readmore_btn" >
                  Read More</div>
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div class="relative h-1/2 md:w-108 lg:w-112 animate__animated animate__backInRight" v-if="!$store.state.is_phone" ref="animate__backInRight">
         <div class="mb-20">
          <div class="px-5 bg-white rounded-lg hvr-underline-from-left">
            <div class="mx-auto input_top">
            <p class="m-0 text-3xl text-blue-600">——</p>
            <span class="text-black">Sidebar</span>
          </div>
          <div class="flex items-center justify-center ">
             <div class="w-56">
              <input type="text"  v-model="serachText" placeholder="search more for title"  class="box-border w-full h-8 p-3 font-serif outline-none block_border " style="border-right: 0;"/>
              <ul v-if="searchArticle.length>0" class="absolute w-56 overflow-auto block_border z-999 animate__animated animate__fadeIn max-h-110 msgScoll" style="border-top:none">
                <li class="p-2 overflow-hidden bg-white cursor-pointer hover:bg-indigo-50 hover:text-blue-400 whitespace-nowrap" v-for="(i,index) in searchArticle" :key="index" :title="i.article_title">
                <a :href="`http://www.flechazoblog.site/article_detail/${i.id}`" target="_blank" class="underline">{{i.article_title}}</a>
                </li>
              </ul>
            </div>
            <div @click="SearchArticle" class="flex items-center justify-center h-8 text-center border-l-0 cursor-pointer search_icon " title="搜索文章">
              <Icon type="search" />
            </div>
          </div>
          <!-- 标签 -->
          <div class="py-6">
            <Tag :color="randomColor[index]" @click="searchTag(i)" v-for="i,index in tagList" class="mb-5 cursor-pointer hvr-float-shadow">{{i}}</Tag>
          </div>
          </div>
           <div @click="showImgwall = true" class="px-5 mt-5 bg-white bg-center bg-cover rounded-lg h-200" style="cursor: zoom-in;background-image: url(https://tva1.sinaimg.cn/large/e8a55238gy1h5ehntlyl7j20u01uoqsr.jpg);"></div>
           <div class="p-5 mt-5 text-white bg-center bg-cover rounded-lg " style="background-image: linear-gradient(to top,rgba(255,255,255,0.1),rgba(255,255,255,0.1)), url(https://tva1.sinaimg.cn/large/e8a55238gy1h5ehwid9wxj21hc0u07wj.jpg);">
              <p class="text-xl"><Icon type="dot-chart" class="mr-2" />网站信息</p>
              <p class="flex justify-between w-full my-5 px-7">
                <span>运行天数：</span>
                <span>{{
                parseInt((new Date().getTime()-1653595200000)/1000 / 60 / 60 / 24)+'天'+
                parseInt((new Date().getTime()-1653595200000)/ 1000 / 60 / 60 % 24)+'小时'+
                parseInt((new Date().getTime()-1653595200000)/ 1000 / 60 % 60)+'分'+
                parseInt((new Date().getTime()-1653595200000)/1000 % 60)+'秒'
                
                }}</span>
              </p>
              <p class="flex justify-between w-full px-7">
                <span>文章数：</span>
                <span>17</span>
              </p>
           </div>

          <!-- miniMusic -->
          <div class="flex justify-center w-full mt-5 ">
             <iframe src="http://flechazoblog.site/MusicPlay/index.html" width="100%" height="150px" style="border: none;border-radius: 8px" scrolling="no"></iframe>
          </div>
         </div>
        </div>
      </div>
      <viewerImg v-if="showImgwall" @hideImg="()=>{showImgwall = false}" :options="{contentImgUl:[{url:baseurl+'e8a55238gy1h5ehntlyl7j20u01uoqsr.jpg'}],contentImgUrl:baseurl+'e8a55238gy1h5ehntlyl7j20u01uoqsr.jpg'}"/>
    </div>
</template>

<script>
import "./container.css";
import { Icon,Tag } from "ant-design-vue";
import Bgcanvas from '@/components/Bgcanvas/index.vue'
import viewerImg from '@/components/viewerImg/index.vue'
// api
import { getArticle_list,serach_article,send_nagging,getNagging } from "@/api/article_list";
const baseUrl = 'https://tva1.sinaimg.cn/large/'
export default {
  name: "container",
  data() {
    return {
      article_list: [],
      arr:[],
      hotUrl:'',
      article_listBg:[
        baseUrl+'baseUrle8a55238gy1h5ckjsapysj21gs0xc0xz.jpg',
        baseUrl+'e8a55238gy1h5ckju6l5wj22301h4qq6.jpg',
        baseUrl+'e8a55238gy1h5ckthi9e4j21xg15qaqv.jpg',
        baseUrl+'e8a55238gy1h5ckjuezhnj22yo1uoqk5.jpg',
        baseUrl+'e8a55238gy1h5ckjwwytuj23pc2yo7wi.jpg',
        baseUrl+'e8a55238gy1h5ckjvcej5j21hc0xck0b.jpg',
      ],
      selectedArticle:{},
      serachText:'',
      searchArticle:[],
      naggingIndex:0,
      nagging:[],
      Allnagging:[],
      showNaggingModal:false,
      naggingContent:'',
      showImgwall:false
    };
  },
  setup(){
    const tagList = [
      'html',
      'css',
      'javascript',
      'vue',
      'react',
      'mysql',
      'node',
      '面试',
      '虚拟机',
      '其他'
    ]
    let randomColor = []
    for(let i = 0;i < tagList.length;i++){
      randomColor.push('#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6,'0'))
    }
    return {
      tagList,
      randomColor,
    }
  },
  components: {
    Icon,
    Tag,
    Bgcanvas,
    viewerImg
  },
  methods: {
    sendNagging(){
      if(!this.naggingContent){
        this.miniMessage('输入内容啊!混蛋','error')
        return
      }
      if(this.$store.state.userInfo.userInfo.id !== "ab7d2dc7-4635-4dad-8bbe-f3c896fc3d6a"){
        this.miniMessage(`这是我的地盘<img src='http://flechazoblog.site:5006/img/BiLiEmail/Default/default031.png' class='w-5 h-5'> ，您可在友链区留言哦`,'warning')
        return
      }
      send_nagging({content:this.naggingContent}).then((data)=>{
        data.data.code == 200 ? this.miniMessage('成功','success') : this.miniMessage('失败','error')
        this.naggingContent = ''
        this.getAllnagging()
      })
      
    },
    getAllnagging(){
      getNagging().then(data=>{
        this.nagging = ((data.data.data).slice(0,3)).map(i=>i.content)
        this.Allnagging = data.data.data
      }) 
    },
    takeNagging(){
      setInterval(()=>{
        if(this.naggingIndex == 2){
          this.naggingIndex = 0
          return 
        }
        this.naggingIndex += 1
      },3000)

    },
    searchTag(val){
      this.serachText = val
      this.SearchArticle()
    },
    SearchArticle(){
      if(!this.serachText){
        this.miniMessage('请输入搜索内容','warning')
        return
      }
      serach_article({serachText:this.serachText}).then((res)=>{
        this.searchArticle = res.data.result
      })
    },
    current_Change(current) {
      this.current = current
      this.get_article_list()
    },
    async get_article_list() {
      const res = await getArticle_list();
      this.selectedArticle = res.data.result.splice(3,1)[0];
      this.article_list = res.data.result
      this.article_list = res.data.result.map(item=>{
          let commentCount = 0 //文章评论量
          item.commenter = JSON.parse(item.commenter)
          if(item.commenter && item.commenter.length > 0){
            item.commenter.forEach(i=>{
              // i.like ? like++ : ''
              commentCount += i.comment.length
            })
          }
          return {
            ...item,
            commentCount,
          }
        })
    },
    watch_scrolltop() {
      let unwatch_scrolltop = this.$watch("scrolltop", (newval) => {
          const top = newval-966
          if(top>=630){
             this.$refs.animate__backInRight.style.top = 630 + 'px'
          }
          else if(top<=0){
            this.$refs.animate__backInRight.style.top = 0
          }
          else{
            this.$refs.animate__backInRight.style.top = top+'px'
          }
        if (newval >= 500) {
          if(this.arr.indexOf(1)<0) {
            this.arr.push(1)
            this.arr.push(2)
          }
        }
        if (newval >= 900) {
          if(this.arr.indexOf(3)<0) {
            this.arr.push(3)
            this.arr.push(4)
          }
        }
        if (newval >= 1400) {
          if(this.arr.indexOf(5)<0) {
            this.arr.push(5)
            this.arr.push(6)
          }
        }
        // if (newval > 1500) {
        //   unwatch_scrolltop();
        // }
      },{immediate:true});
    },
  },
  watch:{
    serachText(newVal){
      if(!newVal){
        this.searchArticle = []
      }
    },
  },
  computed: {
    scrolltop() {
      return this.$store.state.scroll.scrollTop;
    },
  },
  mounted() {
    this.get_article_list()
    this.getAllnagging()
    this.takeNagging()
    this.$store.state.is_phone ? this.arr = [1,2,3,4,5,6] : this.watch_scrolltop();
  },
};
</script>

<style scoped>


.ant-carousel >>> .slick-slide {
  text-align: center;
  line-height: 160px;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}


.input_top {
  width: 150px;
  height: 37px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search_icon {
  width: 50px;
  line-height: 32px;
  border: 1px solid #e9e9e9;
  color: white;
  transition: 0.5s;
  background-color: #338bd0;
}


li a {
  font-family: "Times New Roman", Times, serif;
  color: #777777;
  border-bottom: 2px dotted #eee;
  padding: 10px 5px 5px 0;
  transition: 1s;
}

a:hover {
  border-color: #6f6fff;
  color: #6f6fff;
}
</style>
