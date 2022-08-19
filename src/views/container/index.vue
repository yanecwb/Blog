<template>
    <div class="relative initBg">
      <Bgcanvas :height="1300"/>
      <div class="flex mx-auto pt-7 w-screen md:w-400 md:justify-between">
        <div class="article_left w-full md:w-200 lg:w-260 ">
          <div class="flex justify-start mb-3 p-2 bg-white shadow-lg rounded-xl text-base cursor-pointer">
            <div>
              <Icon type="smile" class="mr-2"/>
              <span>碎碎念</span>
            </div>
            <div class="text-center flex-1">
              <span>再也不晚上喝冰红茶了</span>
            </div>
          </div>
          <div class="felx md:justify-between justify-center animate__animated animate__backInLeft mb-52"
            v-if="!$store.state.is_phone">
            <div class="article_left_hot_img  bg-center overflow-hidden bg-no-repeat h-110 w-full rounded-2xl shadow-lg" :style="{ backgroundImage:hotUrl || scrolltop > 100 ? 'url(https://tva1.sinaimg.cn/large/e8a55238gy1h51vhndza5j22yo1o01kx.jpg)' && (hotUrl = 'url(https://tva1.sinaimg.cn/large/e8a55238gy1h51vhndza5j22yo1o01kx.jpg)') : ''}"></div>
            <div class="article_left_hot_content group block_border rounded-2xl">
              <div class="article_left_hot_content_desc">
                <a href="#">Gadgets</a>
                <span>
                  <Icon type="calendar" />{{format_publishTime(selectedArticle.publish_time)}}
                </span>
                <span>
                  <Icon type="message" />{{selectedArticle.commentCount}}
                </span>
              </div>
              <div class="article_left_hot_content_title mb-5">
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
          <div class="flex justify-center md:justify-between flex-wrap w-full">
            <div class="md:w-96 lg:w-108  md:mb-14 lg:mb-16 block_border  mb-10 md:rounded-2xl group shadow-lg"  v-for="(item,index) in article_list" :key="item.id">
              <div v-if="arr[index]" class="animate__animated  animate__fadeIn animate__slower">
              <div class="w-full h-68 md:rounded-t-2xl bg-cover bg-center  bg-origin-content article_left_natural bg-no-repeat" :style="{ backgroundImage: 'url(' + article_listBg[index] + ')' }"></div>
              <div class=" bg-white py-4 px-8 w-full relative md:rounded-b-2xl">
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
        <div class=" h-1/2 md:w-108 lg:w-112  animate__animated animate__backInRight" v-if="!$store.state.is_phone" ref="animate__backInRight">
         <div class="mb-20">
          <div class=" bg-white px-5 rounded-lg">
            <div class="input_top mx-auto">
            <h1 class="m-0 text-blue-600">——</h1>
            <span class="text-black">NewsLetter</span>
          </div>
          <div class="flex items-center  justify-center ">
             <div class="w-56">
              <input type="text"  v-model="serachText" placeholder="search more for title"  class="w-full p-3 box-border h-8 outline-none block_border  font-serif " style="border-right: 0;"/>
              <ul class=" absolute block_border w-56" style="border-top:none">
                <li class="bg-white hover:bg-indigo-50 hover:text-blue-400 p-2 cursor-pointer whitespace-nowrap overflow-hidden" v-for="(i,index) in searchArticle" :key="index" @click="goRouter(`/article_detail/${i.id}`)" :title="i.article_title">{{i.article_title}}</li>
              </ul>
            </div>
            <div @click="SearchArticle" class="search_icon h-8 text-center  border-l-0 cursor-pointer flex justify-center items-center " title="搜索文章">
              <Icon type="search" />
            </div>
          </div>
          <!-- 标签 -->
          <div class="py-6">
            <Tag :color="randomColor()" @click="searchTag(i)" v-for="i in tagList" class="cursor-pointer mb-5 hvr-float-shadow">{{i}}</Tag>
          </div>
          </div>
          <!-- miniMusic -->
          <div class="mt-5 flex justify-center w-full ">
             <iframe src="http://flechazoblog.site/MusicPlay/index.html" width="100%" height="150px" style="border: none;border-radius: 8px" scrolling="no"></iframe>
          </div>
         </div>
        </div>
      </div>
    </div>
</template>

<script>
import "./container.css";
import { Icon,Tag } from "ant-design-vue";
import Bgcanvas from '../../components/Bgcanvas/index.vue'

// api
import { getArticle_list, getSide_list,serach_article } from "../../api/article_list";
export default {
  name: "container",
  data() {
    return {
      article_list: [],
      side_list: [],
      arr:[],
      hotUrl:'',
      article_listBg:[
        'https://tva1.sinaimg.cn/large/e8a55238gy1h5ckjsapysj21gs0xc0xz.jpg',
        'https://tva1.sinaimg.cn/large/e8a55238gy1h5ckju6l5wj22301h4qq6.jpg',
        'https://tva1.sinaimg.cn/large/e8a55238gy1h5ckthi9e4j21xg15qaqv.jpg',
        'https://tva1.sinaimg.cn/large/e8a55238gy1h5ckjuezhnj22yo1uoqk5.jpg',
        'https://tva1.sinaimg.cn/large/e8a55238gy1h5ckjwwytuj23pc2yo7wi.jpg',
        'https://tva1.sinaimg.cn/large/e8a55238gy1h5ckjvcej5j21hc0xck0b.jpg',
      ],
      selectedArticle:{},
      serachText:'',
      searchArticle:[]
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
    return {
      tagList
    }
  },
  components: {
    Icon,
    Tag,
    Bgcanvas
  },
  methods: {
    randomColor(){
      return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6,'0')
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
      const res2 = await getSide_list();
      this.side_list = res2.data.list;
    },
    watch_scrolltop() {
      let unwatch_scrolltop = this.$watch("scrolltop", (newval) => {
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
        if (newval > 1500) {
          unwatch_scrolltop();
        }
      },{immediate:true});
    },
  },
  watch:{
    serachText(newVal){
      if(!newVal){
        this.searchArticle = []
      }
    }
  },
  computed: {
    scrolltop() {
      return this.$store.state.scroll.scrollTop;
    },
  },
  mounted() {
    this.left = this.$refs.animate__backInRight.offsetLeft
    console.log(this.left);
    this.get_article_list()
    this.watch_scrolltop();
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
