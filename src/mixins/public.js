let mixin = {
  created(){
    this.commit = this.$store.commit
  },
  methods:{
    goBack(params){
      this.$router.back()
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
      if(now - pub_time < 60*2){
        return '刚刚'
      }
      if(now - pub_time < 60*60*24){
        return '今天 '+ publish_time.substring(9)
      }
      return parseInt((now - pub_time)/(60*60*24)) + '天前'
    }
  }
}

export default mixin
