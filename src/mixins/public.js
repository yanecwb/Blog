let mixin = {
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
    }
  }
}

export default mixin
