<template>
  <div style="width: 100%">
    <div class="bg">
      <div class="crumbs w-full  md:w-280">
        <h4  v-if="!$store.state.is_phone">FEATURED POSTS</h4>
        <p class="text-sm">
          <Icon type="tags" />Hot tags:
          <span># Covid-19</span>
          <span># Inspiration</span>
          <span># Work online</span>
          <span># Stay home</span>
        </p>
      </div>
      <div class="container_box" v-if="!$store.state.is_phone">
        <div class="carousel" ref="carousel">
          <Icon class="icon" type="heart" />
          <div class="backcolor"></div>
          <div class="carousel_desc">
            <span style="color: #4da7d4">TRAVEL</span>.
            <span style="color: #28a745">ANIMAL</span>.
            <h2>
              Beachmaster Elephant Seal Fights off Rival Male, The match is
              uncompromising
            </h2>
            <p>
              <span>20minutes ago</span> ·
              <span>23k View</span>
            </p>
          </div>
        </div>
        <div class="food" ref="food">
          <img
          class="w-full h-64 rounded-xl"
            src="https://img.zcool.cn/community/03104da622ab30f11013f785b4ff8f1.jpg@520w_390h_1c_1e_2o_100sh.jpg"
            alt
          />
          <div class="backcolor"></div>
          <div class="food_desc">
            <span style="color: #4da7d4">Travel</span>.
            <span style="color: #28a745">Food</span>.
            <h2>Want fluffy Japanese pancakes but can’t fly to Tokyo?</h2>
            <p class="text-xs">
              <span>20minutes ago</span> ·
              <span>23k View</span>
            </p>
          </div>
        </div>
      </div>
      <div class="article mt-7 w-screen md:w-280 md:justify-between justify-center">
        <div class="article_left w-full md:w-180">
          <div class="article_left_hot felx md:justify-between justify-center" ref="article_left_hot"  v-if="!$store.state.is_phone">
            <div class="article_left_hot_img"></div>
            <div class="article_left_hot_content">
              <div class="article_left_hot_content_desc">
                <a href="#">Gadgets</a>
                <span> <Icon type="calendar" />March 14, 2020 </span>
                <span> <Icon type="message" />099 </span>
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
              <div class="readmore">Read More</div>
            </div>
          </div>
          <div class="article_left_natural_box">
            <div
              class="article_left_natural"
              v-for="item in article_list"
              :key="item.id"
              ref="article_left_natural"
            >
              <div class="article_left_natural_img">
                <img :src="item.imgUrl" alt />
              </div>
              <div class="article_left_natural_content">
                <div class="article_left_natural_content_desc">
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
                  <h3>{{ item.title }}</h3>
                </div>
                <div class="article_left_natural_content_content">
                  <p style="font-family: 'Gabriola'; font-size: 12px">
                    {{ item.synopsis }}
                  </p>
                </div>
                <div class="readmore">Read More</div>
              </div>
            </div>
          </div>
          <div class="pagination">
            <Pagination
              size="small"
              :total="total"
              :pageSize="size"
              :show-total="(total) => `共 ${total} 篇文章`"
              @change="current_Change"
              :current='current'
            />
          </div>
        </div>
        <div class="article_right" ref="article_right"  v-if="!$store.state.is_phone">
          <div class="input_top">
            <h1>——</h1>
            <span>NewsLetter</span>
          </div>
          <div class="search_input">
            <input type="text" placeholder="search more" />
            <div class="search_icon" title="搜索文章">
              <Icon type="search" />
            </div>
          </div>
          <div class="list_ul">
            <ul>
              <li v-for="item in side_list" :key="item.id">
                <a href>
                  <span>{{ item.title }}</span>
                  <span>
                    {{ item.read_count }}
                    <Icon type="smile" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./container.css";
import { Icon, Pagination } from "ant-design-vue";

// api
import { getArticle_list, getSide_list } from "../../api/article_list";
export default {
  name: "container",
  data() {
    return {
      article_list: [],
      side_list: [],
      current:1,
      size:6,
      total: 0,
    };
  },
  components: {
    Icon,
    Pagination,
  },
  methods: {
    current_Change(current) {
      this.current = current
      this.get_article_list()
  },
  async get_article_list(){
    const { current ,size } = this
    const res = await getArticle_list({current,size});
    this.article_list = res.data.list;
    this.total = res.data.total;
    const res2 = await getSide_list();
    this.side_list = res2.data.list;
    },
    watch_scrolltop() {
      const css = "article_left_natural animate__animated animate__slideInUp";
      let unwatch_scrolltop = this.$watch("scrolltop", (newval) => {
        if (newval >= 700) {
          for (let i = 0; i < this.$refs.article_left_natural.length; i++) {
            this.$refs.article_left_natural[i].className = css;
            if (i == 1) {
              break;
            }
          }
          if (newval >= 1500) {
            this.$refs.article_left_natural[2].className = css;
            this.$refs.article_left_natural[3].className = css;
          }
          if (newval >= 2000) {
            this.$refs.article_left_natural[4].className = css;
            this.$refs.article_left_natural[5].className = css;
          }
        }
        if (newval > 2100) {
          unwatch_scrolltop();
        }
      });
    },
  },
  computed: {
    scrolltop() {
      return this.$store.state.scroll.scrollTop;
    },
  },
  mounted() {
    this.get_article_list()
    this.watch_scrolltop();
    this.$refs.carousel.className =
      "carousel animate__animated animate__backInLeft";
    this.$refs.food.className = "food animate__animated animate__backInRight";
    this.$refs.article_left_hot.className =
      "article_left_hot animate__animated animate__backInLeft";
    this.$refs.article_right.className =
      "article_right animate__animated animate__backInRight";
  },
};
</script>

<style scoped>
.bg {
  background-image: url("https://tailwind.wyz.xyz/_next/static/media/hero@75.4dea7ab….jpg");
  background-size: 100% 100%;
}
.article_right {
  width: 340px;
  height: 500px;
  padding: 20px;
  border: 1px #e9e9e9 solid;
}
.search_input {
  display: flex;
  align-items: center;
}
.search_input input {
  width: 230px;
  padding: 10px;
  box-sizing: border-box;
  height: 30px;
  outline: none;
  color: #777777;
  border: 1px solid #e9e9e9;
  border-right: none;
  font-family: "宋体";
}
.input_top {
  width: 150px;
  height: 37px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.input_top h1 {
  color: #6f6fff;
  margin: 0;
}
.input_top span {
  color: black;
}
.search_icon {
  text-align: center;
  display: inline-block;
  width: 50px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  border: 1px solid #e9e9e9;
  border-left: none;
  color: #777777;
  cursor: pointer;
  transition: 0.5s;
}
.search_icon:hover {
  background-color: #6f6fff;
  color: white;
}
.list_ul {
  margin-top: 20px;
}
.list_ul ul {
  list-style: none;
}
.list_ul ul li {
  height: 34px;
  width: 280px;
  margin: 12px 0;
}
li a {
  font-family: "Times New Roman", Times, serif;
  color: #777777;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px dotted #eee;
  padding: 10px 5px 5px 0;
  transition: 1s;
}
a:hover {
  border-color: #6f6fff;
  color: #6f6fff;
}
</style>
