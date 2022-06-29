<template>
    <div class=" relative">
      <Bgcanvas :height="930"/>
      <div class="flex justify-between mx-auto md:px-0 py-1 px-6 w-full md:w-400">
        <h4 v-if="!$store.state.is_phone">FEATURED POSTS</h4>
        <p class="text-sm">
          <Icon type="tags" />Hot tags:
          <span># Covid-19</span>
          <span># Inspiration</span>
          <span># Work online</span>
          <span># Stay home</span>
        </p>
      </div>
      <div class="w-300 md:w-400 mx-auto flex justify-between" v-if="!$store.state.is_phone" :class="$store.state.is_phone ? '' : 'min-w-300'">
        <div
          class="w-160 md:w-200 lg:w-260 rounded relative bg-[center_top_8rem] ease-in-out duration-700 hover:h-100 bg-[url('http://47.107.243.60:5005/img/home_img/007b2c15bec553e470cab896bdb62de4.jpg')] bg-cover animate__animated animate__backInLeft"
          ref="carousel">
          <Carousel autoplay arrows class="h-full">
            <div slot="prevArrow"  class="custom-slick-arrow" style="left: 10px;zIndex:1">
              <Icon type="left-circle" />
            </div>
            <div slot="nextArrow"  class="custom-slick-arrow" style="right: 10px">
              <Icon type="right-circle" />
            </div>
            <img class="bg-cover" src="http://47.107.243.60:5005/img/home_img/179a6b23268afbc89b9120039a6befce.jpg">
            <img class="bg-cover" src="http://47.107.243.60:5005/img/home_img/8d31879a29c39de8295b8412262df9c3.jpg">
            <img class="bg-cover" src="http://47.107.243.60:5005/img/home_img/0c90e65e2f5995645ff016ac14436189.jpg">
          </Carousel>
        </div>
        <div class=" md:w-108 lg:w-112  shadow-lg animate__animated animate__backInRight" ref="food">
          <img class="w-full h-64 rounded-t-xl" src="http://47.107.243.60:5005/img/home_img/007b2c15bec553e470cab896bdb62de4.jpg" alt />
          <!-- <div class="backcolor"></div> -->
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
      </div>
      <div class="flex mx-auto md:mt-7  w-screen md:w-400 md:justify-between">
        <div class="article_left w-full md:w-200 lg:w-260 animate__animated animate__backInLeft">
          <div class="article_left_hot felx md:justify-between justify-center" ref="article_left_hot"
            v-if="!$store.state.is_phone">
            <div class="article_left_hot_img  bg-center overflow-hidden bg-no-repeat h-110 w-full"></div>
            <div class="article_left_hot_content group block_border">
              <div class="article_left_hot_content_desc">
                <a href="#">Gadgets</a>
                <span>
                  <Icon type="calendar" />March 14, 2020
                </span>
                <span>
                  <Icon type="message" />099
                </span>
              </div>
              <div class="article_left_hot_content_title">
                <h2>Nest Protect: 2nd Gen Smoke + CO Alarm</h2>
              </div>
              <div class="article_left_hot_content_content">
                <p style="font-family: 'Gabriola'; font-size: 20px">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip.
                </p>
              </div>
              <div
                class="readmore_btn">
                Read More</div>
            </div>
          </div>
          <div class="flex justify-center md:justify-between flex-wrap w-full">
            <div class="md:w-96 lg:w-108  md:mb-14 lg:mb-16 block_border  mb-10 md:rounded-2xl group hover:shadow-lg"
              v-for="item in article_list" :key="item.id" ref="article_left_natural">
              <div class="w-full h-68 md:rounded-2xl bg-cover bg-origin-content"
                :style="{ backgroundImage: 'url(' + item.imgUrl + ')' }"></div>
              <div class=" bg-white py-4 px-8 w-full relative bottom-5">
                <div class=" article_left_natural_content_desc">
                  <a href="#">Gadgets</a>
                  <span>
                    <Icon type="calendar" />
                    {{ item.date }}
                  </span>
                  <span>
                    <Icon type="message" />
                    {{ item.read_count }}
                  </span>
                </div>
                <div class="article_left_natural_content_title">
                  <h3 class="m-0">{{ item.title }}</h3>
                </div>
                <div class="article_left_natural_content_content">
                  <p style="font-family: 'Gabriola'; font-size: 12px">
                    {{ item.synopsis }}
                  </p>
                </div>
                <div
                  class="readmore_btn">
                  Read More</div>
              </div>
            </div>
            <div class="w-full mb-12 flex justify-center">
              <Pagination size="small" :total="total" :pageSize="size" @change="current_Change" :current='current' />
            </div>
          </div>
        </div>
        <div
          class=" h-1/2 md:w-108 lg:w-112 p-5 block_border animate__animated animate__backInRight"
         v-if="!$store.state.is_phone">
          <div class="input_top mx-auto">
            <h1 class="m-0 text-blue-600">——</h1>
            <span class="text-black">NewsLetter</span>
          </div>
          <div class="flex items-center  justify-center">
            <input type="text" placeholder="search more"  class="w-56 p-3 box-border h-8 outline-none block_border border-r-0 font-serif"/>
            <div class="search_icon h-8 text-center inline-block border-l-0 cursor-pointer" title="搜索文章">
              <Icon type="search" />
            </div>
          </div>
          <div class="list_ul mt-5 flex justify-center">
            <ul>
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
      <div class=" absolute md:2-108 w-86 h-24 bottom-0 right-0 -z-50" style="background-image:url(http://47.107.243.60:5005/img/static_img/fan_girl.gif);background-size:100% 100%"></div>
    </div>
</template>

<script>
import "./container.css";
import { Icon, Pagination, Carousel } from "ant-design-vue";
import Bgcanvas from '../../components/Bgcanvas/index.vue'

// api
import { getArticle_list, getSide_list } from "../../api/article_list";
export default {
  name: "container",
  data() {
    return {
      article_list: [],
      side_list: [],
      current: 1,
      size: 6,
      total: 0,
    };
  },
  components: {
    Icon,
    Pagination,
    Carousel,
    Bgcanvas
  },
  methods: {
    current_Change(current) {
      this.current = current
      this.get_article_list()
    },
    async get_article_list() {
      const { current, size } = this
      const res = await getArticle_list({ current, size });
      this.article_list = res.data.list;
      this.total = res.data.total;
      const res2 = await getSide_list();
      this.side_list = res2.data.list;
    },
    // watch_scrolltop() {
    //   const css = "article_left_natural animate__animated animate__slideInUp";
    //   let unwatch_scrolltop = this.$watch("scrolltop", (newval) => {
    //     if (newval >= 700) {
    //       for (let i = 0; i < this.$refs.article_left_natural.length; i++) {
    //         this.$refs.article_left_natural[i].className = css;
    //         if (i == 1) {
    //           break;
    //         }
    //       }
    //       if (newval >= 1500) {
    //         this.$refs.article_left_natural[2].className += css;
    //         this.$refs.article_left_natural[3].className += css;
    //       }
    //       if (newval >= 2000) {
    //         this.$refs.article_left_natural[4].className += css;
    //         this.$refs.article_left_natural[5].className += css;
    //       }
    //     }
    //     if (newval > 2100) {
    //       unwatch_scrolltop();
    //     }
    //   });
    // },
  },
  computed: {
    scrolltop() {
      return this.$store.state.scroll.scrollTop;
    },
  },
  mounted() {
    this.get_article_list()
    // this.watch_scrolltop();
  },
};
</script>

<style scoped>


.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 348px;
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
  line-height: 30px;
  border: 1px solid #e9e9e9;
  color: #777777;
  transition: 0.5s;
}

.search_icon:hover {
  background-color: #6f6fff;
  color: white;
}


.list_ul ul li {
  height: 34px;
  width: 380px;
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
