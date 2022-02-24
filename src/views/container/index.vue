<template>
  <div style="width: 100%">
    <div class="crumbs">
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
      <div class="article">
        <img
          style="width: 100%; border-radius: 10px"
          src="../../assets/img/news-1.jpg"
          alt=""
        />
        <div class="backcolor"></div>
        <div class="article_desc">
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
</style>