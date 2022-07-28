<template>
    <div class=" relative">
      <Bgcanvas :height="1300"/>
      <div class="flex justify-between mx-auto md:px-0 py-1 px-6 w-full md:w-400">
        <h4 v-if="!$store.state.is_phone" class="m-0 text-base font-mono" >今日精选博客</h4>
        <!-- <p class="text-sm m-0">
          <Icon type="tags" />Hot tags:
          <span># Covid-19</span>
          <span># Inspiration</span>
          <span># Work online</span>
          <span># Stay home</span>
        </p> -->
      </div>
      <!-- <div class="w-full md:w-400 min-w-200 mx-auto flex justify-between">
        <div
          class="w-2/3 md:w-200 lg:w-260 rounded relative bg-[center_top_8rem] ease-in-out duration-700 hover:h-100 animate__animated animate__backInLeft"
          ref="carousel">
          <Carousel  arrows >
            <div slot="prevArrow"  class="custom-slick-arrow" style="left: 10px;zIndex:1">
              <Icon type="left-circle" />
            </div>
            <div slot="nextArrow"  class="custom-slick-arrow" style="right: 10px">
              <Icon type="right-circle" />
            </div>
            <img src="http://47.107.243.60:5005/img/home_img/179a6b23268afbc89b9120039a6befce.jpg" :onload="()=>{}" class="md:h-100 lg:h-144">
            <img src="http://47.107.243.60:5005/img/home_img/8d31879a29c39de8295b8412262df9c3.jpg" class="md:h-100 lg:h-144">
            <img src="http://47.107.243.60:5005/img/home_img/0c90e65e2f5995645ff016ac14436189.jpg" class="md:h-100 lg:h-144">
          </Carousel>
        </div>
        <div class="w-1/3 md:w-108 lg:w-112  md:h-100 lg:h-144 shadow-lg animate__animated animate__backInRight" ref="food">
          <img class="w-full rounded-t-xl" src="http://47.107.243.60:5005/img/home_img/007b2c15bec553e470cab896bdb62de4.jpg" alt />
          <div class="backcolor"></div>
          <div class="bg-white px-5 pt-9 pb-0 box-border">
            <span style="color: #4da7d4">或许你能从中得到些什么🐋，</span>
            <span style="color: #28a745">也说不定😜</span>
            <p class="md:text-xl lg:text-2xl font-bold">Want fluffy Japanese pancakes but can’t fly to Tokyo?</p>
            <p class="text-xs m-0 pb-2">
              <span>20minutes ago</span> ·
              <span>23k View</span>
            </p>
          </div>
        </div>
      </div> -->
      <div class="flex mx-auto   w-screen md:w-400 md:justify-between">
        <div class="article_left w-full md:w-200 lg:w-260 ">
          <div class="article_left_hot felx md:justify-between justify-center animate__animated animate__backInLeft" ref="article_left_hot"
            v-if="!$store.state.is_phone">
            <div class="article_left_hot_img  bg-center overflow-hidden bg-no-repeat h-110 w-full " :style="{ backgroundImage:hotUrl || scrolltop > 100 ? 'url(http://flechazoblog.site:5006/img/home_img/fa7a162e40a540f57b3c80aeb8c8fe0f.jpg)' && (hotUrl = 'url(http://flechazoblog.site:5006/img/home_img/fa7a162e40a540f57b3c80aeb8c8fe0f.jpg)') : ''}"></div>
            <div class="article_left_hot_content group block_border">
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
              <div
                class="readmore_btn" @click="goRouter(`/article_detail/${selectedArticle.id}`)">
                Read More</div>
            </div>
          </div>
          <div class="flex justify-center md:justify-between flex-wrap w-full">
            <div class="md:w-96 lg:w-108  md:mb-14 lg:mb-16 block_border  mb-10 md:rounded-2xl group hover:shadow-lg"  v-for="(item,index) in article_list" :key="item.id" ref="article_left_natural">
              <div v-if="arr[index]" class="animate__animated  animate__fadeIn animate__slower">
              <div class="w-full h-68 md:rounded-2xl bg-cover bg-origin-content" :style="{ backgroundImage: 'url(http://flechazoblog.site:5006/img/home_img/' + article_listBg[index] + ')' }"></div>
              <div class=" bg-white py-4 px-8 w-full relative bottom-5">
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
                  <p style="font-family: 'Gabriola'; font-size: 12px">
                    {{ item.article_introduction }}
                  </p>
                </div>
                <div  @click="goRouter(`/article_detail/${item.id}`)"
                  class="readmore_btn" >
                  Read More</div>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div class=" h-1/2 md:w-108 lg:w-112 p-5 block_border animate__animated animate__backInRight" v-if="!$store.state.is_phone">
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
            <div @click="SearchArticle" class="search_icon h-8 text-center  border-l-0 cursor-pointer" title="搜索文章">
              <Icon type="search" />
            </div>
          </div>
          <div class="list_ul mt-5 flex justify-center w-full">
            <ul class="w-full">
              <li v-for="item in side_list" :key="item.id" class=" my-3 list-none">
                <a class="flex justify-between text-base">
                  <span>{{ item.title }}</span>
                  <span>
                    {{ item.read_count }}
                   😃
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="arr[5]" class="md:absolute md:2-108 w-86 h-24 bottom-0 right-0 -z-50" style="background-image:url(http://flechazoblog.site:5006/img/static_img/fan_girl.gif);background-size:100% 100%"></div>
    </div>
</template>

<script>
import "./container.css";
import { Icon } from "ant-design-vue";
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
        '031ab8a623a963f0002c3290f17ce00.jpg520w_390h_1c_1e_2o_100sh.jpg',
        '0317981623fc7660002c4212c6f0166.jpg520w_390h_1c_1e_2o_100sh.jpg',
        '01e11062427f6b0002c4212ceee019.jpg520w_390h_1c_1e_2o_100sh.jpg',
        '01d1fa623c5a920002c3290fef58ff.jpg520w_390h_1c_1e_2o_100sh.jpg',
        '015a5e621d330a11013f01cda0ced0.jpg520w_390h_1c_1e_2o_100sh.jpg',
        '0106b2624121050002c4212c00bd01.jpg520w_390h_1c_1e_2o_100sh.jpg'
      ],
      selectedArticle:{},
      serachText:'',
      searchArticle:[]
    };
  },
  components: {
    Icon,
    Bgcanvas
  },
  methods: {
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
        if (newval >= 750) {
          if(this.arr.indexOf(1)<0) {
            this.arr.push(1)
            this.arr.push(2)
          }
        }
        if (newval >= 1200) {
          if(this.arr.indexOf(3)<0) {
            this.arr.push(3)
            this.arr.push(4)
          }
        }
        if (newval >= 1600) {
          if(this.arr.indexOf(5)<0) {
            this.arr.push(5)
            this.arr.push(6)
          }
        }
        if (newval > 2100) {
          unwatch_scrolltop();
        }
      });
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
  background-color: #6f6fff;
}


.list_ul ul li {
  height: 34px;
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
