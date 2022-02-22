<template>
  <div>
    <div class="header_box">
      <div class="header_box_top">
        <div class="logo">
          <img src="../../assets/logo.png" alt="" />
        </div>
        <div class="options">
          <ul>
            <li>Layouts<Icon type="down" style="margin-left: 2px" /></li>
            <li>Document<Icon type="container" style="margin-left: 2px" /></li>
            <li>Search<Icon type="search" style="margin-left: 2px" /></li>
          </ul>
          <div class="Buy_Now">Buy Now</div>
        </div>
      </div>
    </div>
    <div style="height: 54px">
      <div class="header_box_navBar" ref="navBar">
        <ul>
          <li>
            <Icon type="home" style="margin-right: 2px" />Home<Icon
              type="down"
              style="margin-left: 2px"
            />
          </li>
          <li>Traver</li>
          <li>Guides</li>
          <li>Food</li>
          <li>Hotels</li>
          <li>Review</li>
          <li>Healthy</li>
          <li>Lifestyle</li>
          <div style="color: blue; position: relative; left: 400px">
            <span class="iconfont icon-yu" style="color: blue"></span>
          </div>
        </ul>
      </div>
    </div>
    <div
      class="back_top animate__animated animate__fadeInDown"
      v-if="show_backtop"
      @click="backtop"
    >
      <span
        class="iconfont icon-icon--fanhuidingbu"
        style="font-size: 25px"
      ></span>
    </div>
  </div>
</template>

<script>
import "./header.css";
import "animate.css";
import NProgress from "nprogress";

import { Icon } from "ant-design-vue";
export default {
  name: "Header",
  components: {
    Icon,
  },
  data() {
    return {
      show_backtop: false,
    };
  },
  methods: {
    backtop() {
      document.documentElement.scrollTop = 0;
    },
  },
  mounted() {
    NProgress.configure({ showSpinner: false });
    const Document = document.documentElement;
    document.querySelector("body").onscroll = () => {
      if (Document.scrollTop == 100) {
        NProgress.set(0.0);
      }
      if (Document.scrollTop >= 180) {
        this.$refs.navBar.style.position = "fixed";
        this.$refs.navBar.style.top = 0;
        this.$refs.navBar.className =
          "header_box_navBar animate__animated animate__fadeInDown";
        this.show_backtop = true;
      } else {
        this.$refs.navBar.style.position = "";
        this.$refs.navBar.className = "header_box_navBar";
        this.show_backtop = false;
      }
    };
  },
};
</script>
