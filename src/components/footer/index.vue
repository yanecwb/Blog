<template>
  <div style="height: 300px;background-color:#071e37">
    <footer class="footer_box" >
      <div class="about_me" ref="about_me">
        <h4>ABOUT ME</h4>
        <p style="color: #777777">
          Start writing, no matter what. The water does not flow until the
          faucet is turned on.
        </p>
        <strong style="color: white">Address</strong>
        <p style="margin: 0; font-size: 12px">123 Main Street</p>
        <p style="font-size: 12px;color:#777777">New York, NY 10001</p>
        <h5 style="color: white">Follow me</h5>
      </div>
      <div class="quick_link" ref="quick_link">
        <h4>QUICK LINK</h4>
        <ul>
          <li>About me</li>
          <li>Help & Support</li>
          <li>Licensing Policy</li>
          <li>Refund Policy</li>
          <li>Hire me</li>
        </ul>
      </div>
      <div class="tagcloud" ref="tagcloud">
        <h4>TAGCLOUD</h4>
        <span
          style="
            display: inline-block;
            padding: 10px;
            background: #f2f3f5;
            color: #687385;
            border-radius: 22px;
            margin: 0 20px 20px 0;
          "
          v-for="(item, index) in 7"
          :key="index"
          >Droll</span
        >
      </div>
      <div class="newsletter" ref="newsletter">
        <h4>NEWSLETTER</h4>
        <p style="color: #777777; margin-bottom: 35px">
          Subscribe to our newsletter and get our newest updates right on your
          inbox.
        </p>
        <form class="email_input">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </form>
        <div class="agreement">
          <input type="checkbox" style="margin-right: 10px" />
          <span style="color: white"
            >I agree to the
            <span style="color: #687385;">terms & </span>
            <span style="color: #687385;"
              >conditions</span
            ></span
          >
        </div>
      </div>
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
      // show_footer: false,
    };
  },
  props:['show_footer'],
  computed:{
        scrolltop(){
            return this.$store.state.scroll.scrollTop
        }
    },
  watch: {
    // scrolltop(newval) {
    //   if (this.show_footer) return;
    //   if (newval >= 2770) {
    //     // this.show_footer = true;
    //     this.$emit('change_show_footer',true)
    //     Vue.nextTick(() => {
    //       for (let key in this.$refs) {
    //         this.$refs[key].className =
    //           this.$refs[key].className +
    //           " " +
    //           "animate__animated animate__fadeInUp animate__slow";
    //       }
    //     });
    //   }
    // },
  },
  mounted(){
  }
};
</script>

<style>
</style>