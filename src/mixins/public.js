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
      publish_time = publish_time * 1
      const now = Date.parse(new Date())  ;
      const null_dian = (new Date(new Date().toDateString()).getTime()) //当天0点
      if(now - publish_time < 60000*2){
        return '刚刚'
      }
      if(publish_time > null_dian){//说明明是今天发布的
        return '今天 '+ new Date(publish_time).toLocaleTimeString()
      }else{
        if(null_dian - publish_time < 86400000){
          return '昨天 '+ new Date(publish_time).toLocaleTimeString()
        }else{
          return parseInt((now - publish_time)/(60*60*24*1000) + 1) + '天前'
        }
      }
    },
    // 登陆拦截
    noLogin(){
        const Toast = this.$Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$Swal.stopTimer);
            toast.addEventListener("mouseleave", this.$Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "info",
          title: "请先登录！",
        });
    },
    go_up_article(article) {
      if(!JSON.parse(localStorage.getItem("userInfo")).id) {
        this.noLogin()
        return
      }
      article ? this.$router.push({name:'upload_article',params:article}) : this.goRouter("/upload_article");
    },
    miniMessage(msg,type){
     return new Promise((resolve,reject)=>{
        try {
          const Toast = this.$Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", this.$Swal.stopTimer);
              toast.addEventListener("mouseleave", this.$Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: type,
            title: msg,
          });
          resolve(1)
        } catch (error) {
          reject(0)
        }
     })
    }
  }
}

export default mixin
