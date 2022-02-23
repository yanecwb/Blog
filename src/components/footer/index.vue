<template>
  <div style="height: 500px">
    <footer class="footer_box" v-if="show_footer">
      <div class="about_me" ref="about_me">
        <h4>ABOUT ME</h4>
        <p style="color: black">
          Start writing, no matter what. The water does not flow until the
          faucet is turned on.
        </p>
        <strong style="color: black">Address</strong>
        <p style="margin: 0; font-size: 12px">123 Main Street</p>
        <p style="font-size: 12px">New York, NY 10001</p>
        <h5>Follow me</h5>
      </div>
      <div class="quick_link" ref="quick_link">
        <h4>QUICK LINK</h4>
        <ul>
          <li>About me</li>
          <li>Help & Support</li>
          <li>​​Licensing Policy</li>
          <li>Refund Policy</li>
          <li>Hire me</li>
        </ul>
      </div>
      <div class="tagcloud" ref="tagcloud"><h4>TAGCLOUD</h4></div>
      <div class="newsletter" ref="newsletter"><h4>NEWSLETTER</h4></div>
    </footer>
  </div>
</template>

<script>
import "./footer.css";
import Vue from "vue";
export default {
  name: "Footer",
  data() {
    return {
      show_footer: false,
    };
  },
  props: ["scrollTop"],
  watch: {
    scrollTop(newval) {
      if (this.show_footer) return;
      if (newval >= 270) {
        this.show_footer = true;
        Vue.nextTick(() => {
          console.log(this.$refs);
          for (let key in this.$refs) {
            this.$refs[key].className =
              this.$refs[key].className +
              " " +
              "animate__animated animate__fadeInUp animate__slow";
          }
        });
      }
    },
  },
};
</script>

<style>
</style>