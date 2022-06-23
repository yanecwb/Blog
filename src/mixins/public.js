let mixin = {
  methods:{
    goBack(params){
        this.$router.push('/home')
    },
    goRouter(path){
      this.$router.push(path)
    },
    downloadImg(imgsrc,name){
      let image = new Image();
            image.setAttribute("crossOrigin", "anonymous");
            image.onload = function () {
                let canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                let context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                let url = canvas.toDataURL("image/png"); //base64编码数据
                let a = document.createElement("a");
                let event = new MouseEvent("click");
                a.download = name || "photo";
                a.href = url;
                a.dispatchEvent(event);
            };
            image.src = imgsrc;
    },
    // 格式化发布时间
    format_publishTime(publish_time){
      if(!publish_time) return
      const now = Date.parse(new Date()) / 1000 ;
      const pub_time = Date.parse(publish_time) / 1000
      const null_dian = (new Date(new Date().toDateString()).getTime())/1000
      console.log(null_dian);
      console.log(pub_time);
      if(now - pub_time < 60*2){
        return '刚刚'
      }
      if(pub_time > null_dian){//说明明是今天发布的
        return '今天 '+ publish_time.substring(10,18)
      }else{
        if(null_dian - pub_time < 86400){
          return '昨天 '+ publish_time.substring(10,18)
        }
        return parseInt((now - pub_time)/(60*60*24)) + '天前'
      }
    },
    go_up_article(article) {
      if (!JSON.parse(localStorage.getItem("userInfo")).id) {
        const Toast = this.$Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$Swal.stopTimer);
            toast.addEventListener("mouseleave", this.$Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "warning",
          title: "请先登录！",
        });
        return;
      }
      //  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      //   const Toast = this.$Swal.mixin({
      //     toast: true,
      //     position: "top",
      //     showConfirmButton: false,
      //     timer: 2000,
      //     timerProgressBar: true,
      //     didOpen: (toast) => {
      //       toast.addEventListener("mouseenter", this.$Swal.stopTimer);
      //       toast.addEventListener("mouseleave", this.$Swal.resumeTimer);
      //     },
      //   });

      //   Toast.fire({
      //     width: "80%",
      //     height: "100px",
      //     icon: "info",
      //     title: "请在PC端发布或修改文章...",
      //     heightAuto: false,
      //   });
      //   return
      // }
      article ? this.$router.push({name:'upload_article',params:article}) : this.goRouter("/upload_article");
    },
  }
}

export default mixin
