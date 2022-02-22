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
          <div>Buy Now</div>
        </div>
      </div>
    </div>
    <div class="header_box_navBar">
      <ul>
        <li><Icon type="home" style="margin-right: 2px" />Home<Icon type="down" style="margin-left: 2px" /></li>
        <li>Traver</li>
        <li>Guides</li>
        <li>Food</li>
        <li>Hotels</li>
        <li>Review</li>
        <li>Healthy</li>
        <li>Lifestyle</li>
      </ul>
    </div>
  </div>
</template>

<script>
import "./header.css";
import { Icon } from "ant-design-vue";
export default {
  name: "Header",
  components: {
    Icon,
  },
};
</script>
