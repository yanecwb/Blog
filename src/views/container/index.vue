<template>
  <div style="width: 100%">
    <div class="crumbs bg-red-500">
      <h4>FEATURED POSTS</h4>
      <p style="font-size: 14px">
        <Icon type="tags" />Hot tags:<span> # Covid-19 </span
        ><span> # Inspiration </span><span> # Work online </span
        ><span> # Stay home </span>
      </p>
    </div>
    <div class="container_box">
      <div class="carousel">
        <Icon class="icon" type="heart" />
        <div class="backcolor"></div>
        <div class="carousel_desc">
          <span style="color: #4da7d4">TRAVEL</span>.<span
            style="color: #28a745"
            >ANIMAL</span
          >.
          <h2>
            Beachmaster Elephant Seal Fights off Rival Male, The match is
            uncompromising
          </h2>
          <p><span>20minutes ago</span> · <span>23k View</span></p>
        </div>
      </div>
      <div class="food">
        <img
          style="width: 100%; border-radius: 10px"
          src="../../assets/img/news-1.jpg"
          alt=""
        />
        <div class="backcolor"></div>
        <div class="food_desc">
          <span style="color: #4da7d4">Travel</span>.<span
            style="color: #28a745"
            >Food</span
          >.
          <h2>Want fluffy Japanese pancakes but can’t fly to Tokyo?</h2>
          <p style="font-size: 12px">
            <span>20minutes ago</span> · <span>23k View</span>
          </p>
        </div>
      </div>
    </div>
    <div class="article">
      <div class="article_left">
        <div class="article_left_hot">
          <div class="article_left_hot_img">
            <img src="../../assets/img/article/blog-1.jpg" alt="" />
          </div>
          <div class="article_left_hot_content">
            <div class="article_left_hot_content_desc">
              <a href="#">Gadgets</a>
              <span><Icon type="calendar" /> March 14, 2020</span>
              <span><Icon type="message" /> 099</span>
            </div>
            <div class="article_left_hot_content_title">
              <h2>Nest Protect: 2nd Gen Smoke + CO Alarm</h2>
            </div>
            <div class="article_left_hot_content_content">
              <p style="font-family: 'Gabriola'; font-size: 20px">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip.
              </p>
            </div>
            <div
              class="readmore"
            >
              Read More
            </div>
          </div>
        </div>
       <div class="article_left_natural_box">
          <div class="article_left_natural" v-for="item in 5">
          <div class="article_left_natural_img">
            <img src="../../assets/img/article/blog-small-1.jpg" alt="" />
          </div>
          <div class="article_left_natural_content" >
            <div class="article_left_natural_content_desc">
              <a href="#">Gadgets</a>
              <span><Icon type="calendar" /> March 14, 2020</span>
              <span><Icon type="message" /> 099</span>
            </div>
            <div class="article_left_natural_content_title">
              <h2>Nest Protect: 2nd Gen Smoke + CO Alarm</h2>
            </div>
            <div class="article_left_natural_content_content">
              <p style="font-family: 'Gabriola'; font-size: 20px">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore 
              </p>
            </div>
            <div
              class="readmore"
            >
              Read More
            </div>
          </div>
        </div>
       </div>
      </div>
      <div class="article_right">
        <div class="search_input">
          <input type="text" >
          <div class="search_icon"><Icon style="" type='search' /></Icon></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./container.css";
import { Icon } from "ant-design-vue";
export default {
  name: "container",
  components: {
    Icon,
  },
  methods: {},
};
</script>

<style scoped>
.article_right{
  width: 340px;
  height: 1000px;
  padding: 20px;
  border: 1px black solid;
}
.search_input {
  display: flex;
  align-items: center;
}
.search_input input{
  width: 230px;
  padding: 10px;
  box-sizing:border-box;
  height: 30px;
    outline:none;
    color:#777777;
    border:1px solid #e9e9e9;
    border-right: none;
    font-family: '宋体';
}
.search_icon{
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
}
</style>