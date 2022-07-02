<template>
  <div class="menu" ref="menu">
    <div class="userInfo_box">
      <div
        :class="
          userInfo.backgroundUrl
            ? 'backgroundUrl'
            : 'not_login_bg backgroundUrl'
        "
      >
        <div class="savebg" v-if="is_savebg">
          <span @click="changeImg">更换图片</span>
          <span
            style="border-bottom: none"
            @click="
              savabgimg(
                userInfo.backgroundUrl,
                userInfo.nickname + '的背景图片'
              )
            "
            >保存图片</span
          >
        </div>
        <img
          :src="userInfo.backgroundUrl"
          alt
          @click="show_savabgimg"
          crossorigin
        />
      </div>
      <div class="usershow" ref="usershow">
        <div
          @click="changeAvatarUrl"
          :style="`background-image:url(${userInfo.avatarUrl || 'https://img.zcool.cn/community/01b91e5d368512a80120695c617f59.jpg@1280w_1l_2o_100sh.jpg'})`"
          class="avatar"
          title="点击更换头像"
        />
        <p>{{ userInfo.nickname || "请登录" }}</p>
        <div class="userlv">
          <span>{{ userInfo.accountInfo.follows || "" }}关注</span>
          <span>{{ userInfo.accountInfo.fans || "" }}粉丝</span>
          <span>lv{{ userInfo.accountInfo.lv || "" }}</span>
        </div>
        <div class="userlabel">
          <span>
            <svg t="1656662054472" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1835" width="15" height="15"><path d="M672.694989 342.528L558.518989 69.12c-1.536-2.56-3.072-6.144-5.632-10.24-2.56-4.096-5.632-8.704-8.704-12.288-3.584-4.096-8.192-7.68-12.8-10.752-5.632-3.072-11.776-4.608-17.92-4.608-11.264-0.512-22.528 3.584-30.72 11.776-7.68 8.192-13.312 17.408-17.408 28.16l-117.76 273.408-315.392 28.672c-7.68 1.536-14.848 4.608-20.48 10.24C5.558989 389.632 1.462989 397.312 0.438989 406.016c-1.536 9.728 1.024 19.968 6.656 28.16 5.632 9.216 12.8 17.92 20.992 25.088 0.512 0.512 4.608 4.096 11.264 9.728 6.656 5.632 15.36 13.312 26.112 22.528s22.528 19.456 35.84 30.72l40.448 34.304c0.512 0.512 223.744-65.536 231.936-69.632 0-25.088 14.336-47.616 36.864-58.88 8.704-4.608 18.432-6.656 28.16-7.168 35.84 0.512 65.024 29.184 65.024 65.024 0 10.752-2.56 21.504-8.192 30.72 3.072 3.584 125.44 136.704 126.464 138.24 6.144-2.56 12.8-3.584 19.456-3.584h2.56c2.048-5.12 163.84-292.352 165.376-295.936l-136.704-12.8z" fill="#AEC9FF" p-id="1836"></path><path d="M1016.246989 384.512c-8.704-6.144-18.432-10.24-28.672-12.288l-129.536-12.288c-1.024 2.048-171.52 306.688-174.592 311.296v0.512c7.168 9.216 11.264 20.48 11.264 32.256 0 29.184-23.552 52.736-52.736 52.736-29.184 0-52.736-23.552-52.736-52.736 0-6.144 1.024-11.776 3.072-17.408-0.512-1.024-126.976-137.216-129.536-139.776-7.68 3.072-15.872 4.608-24.064 4.608-19.968 0-38.912-9.216-51.2-25.088l-205.312 65.024s43.008 36.864 67.072 57.856l-34.816 142.848c-4.608 18.432-9.216 36.352-13.824 54.272-4.608 17.92-8.192 33.792-11.776 48.64-3.584 14.848-6.656 27.136-9.216 37.888-2.56 10.752-4.608 17.408-5.12 19.968-1.536 6.144-0.512 12.288 2.048 17.92 3.072 6.144 7.168 11.264 12.8 14.848 5.632 4.096 12.288 6.656 19.456 7.68 7.168 1.024 14.336 0 20.992-3.584 6.656-3.072 13.312-6.656 19.968-10.24 9.728-5.632 21.504-12.288 35.328-20.48s28.672-16.896 45.568-26.624c16.384-9.728 33.28-18.944 50.688-28.672 39.424-22.528 83.456-48.128 131.584-76.8l266.24 155.136c3.584 1.536 8.192 3.072 14.848 5.632 4.608 2.048 9.728 3.072 14.848 3.584 9.728 0 18.944-2.048 27.648-6.656 8.192-4.608 11.264-13.312 9.216-27.136-0.512-2.56-2.048-9.216-4.096-19.968-2.048-10.752-4.608-23.04-7.68-38.4-3.072-14.848-6.144-31.744-9.728-50.176s-7.168-36.864-11.264-55.296c-8.704-43.52-18.944-92.16-30.72-145.92l211.456-189.44c8.704-10.24 16.384-18.944 22.016-26.112 5.632-7.168 8.704-15.872 8.704-24.576 0.512-8.704-2.56-16.896-8.192-23.04z" fill="#3366FF" p-id="1837"></path><path d="M142.262989 555.008z" p-id="1838"></path></svg>
            {{ userInfo.xz || "星 座" }}
          </span>
          <span><svg t="1656662104080" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2890" width="15" height="15"><path d="M581.536 328.416a16 16 0 0 0 0 32h230.336v98.256a16 16 0 0 0 32 0V272.816a16 16 0 0 0-16-16h-43.264a89.568 89.568 0 0 0-63.904-46.864V176a16 16 0 0 0-32 0v33.968a89.568 89.568 0 0 0-63.872 46.848h-43.312a16 16 0 0 0 0 32H635.2a15.776 15.776 0 0 0 15.184-11.968c0.128-0.288 0.384-0.464 0.496-0.752 8.688-21.344 29.856-35.68 53.824-35.68 24.448 0 45.968 14.944 54.304 36.928a15.52 15.52 0 0 0 3.84 5.696 15.728 15.728 0 0 0 12.064 5.792h36.976v39.584H581.536z" fill="#0F13AE" p-id="2891"></path><path d="M312 312.88h271.04V944H312zM712 512H944v432H712z" fill="#95EAFF" p-id="2892"></path><path d="M285.584 307.344a16 16 0 0 0-32 0v632.352a16 16 0 0 0 32 0V307.344zM784 601.232a16 16 0 0 0-32 0v54.464a16 16 0 0 0 32 0v-54.464zM784 761.232a16 16 0 0 0-32 0v54.464a16 16 0 0 0 32 0v-54.464z" fill="#49A3FE" p-id="2893"></path><path d="M575.392 288h-304.8a16 16 0 0 0 0 32h288.8v94.64H346.496a16 16 0 0 0 0 32h212.896v96H282.496a16 16 0 0 0 0 32h276.896v96H282.496a16 16 0 0 0 0 32h276.896v250.896a16 16 0 0 0 32 0V304a16 16 0 0 0-16-16z" fill="#49A3FE" p-id="2894"></path><path d="M508.32 798.64H282.496a16 16 0 0 0 0 32H508.32a16 16 0 0 0 0-32z" fill="#49A3FE" p-id="2895"></path><path d="M832 585.232a16 16 0 0 0-16 16v54.464a16 16 0 0 0 32 0v-54.464a16 16 0 0 0-16-16zM832 745.232a16 16 0 0 0-16 16v54.464a16 16 0 0 0 32 0v-54.464a16 16 0 0 0-16-16z" fill="#0F13AE" p-id="2896"></path><path d="M973.888 941.84h-34.976a15.84 15.84 0 0 0 1.168-5.776V519.856a16 16 0 0 0-16-16h-240a16 16 0 0 0-16 16v422h-462.4V385.968a16 16 0 0 0-32 0v555.872H126.704V348.64l211.408-157.696V288h32V65.392a16 16 0 0 0-32 0v85.632L101.136 327.792a16 16 0 0 0-6.432 12.832v601.232H50.112a16 16 0 0 0 0 32h923.776a16 16 0 0 0 0-32.016z m-273.808 0.016V535.856h208v400.224a15.84 15.84 0 0 0 1.168 5.776H700.08z" fill="#0F13AE" p-id="2897"></path></svg>{{ userInfo.city || "城 市" }}</span>
          <span><svg t="1656662202066" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3903" width="15" height="15"><path d="M674.56 634.026667a347.306667 347.306667 0 0 1-77.226667-8.106667 21.333333 21.333333 0 0 1-16.64-19.2A305.493333 305.493333 0 0 1 661.76 384c75.946667-76.373333 245.76-88.746667 253.013333-89.173333a21.76 21.76 0 0 1 16.64 6.4 20.906667 20.906667 0 0 1 5.973334 16.213333c0 7.253333-12.8 177.493333-88.746667 253.44a242.346667 242.346667 0 0 1-174.08 63.146667z m-51.626667-46.506667c38.826667 5.546667 136.533333 12.8 195.413334-46.08 49.066667-48.64 67.84-152.32 73.813333-200.533333-47.786667 6.4-151.466667 24.746667-200.533333 73.813333a264.106667 264.106667 0 0 0-68.693334 172.8z" p-id="3904" fill="#36ab60"></path><path d="M601.173333 603.733333a397.226667 397.226667 0 0 1-128 271.36" fill="#36ab60" p-id="3905"></path><path d="M473.173333 896a21.76 21.76 0 0 1-15.786666-7.253333 20.906667 20.906667 0 0 1 0-29.866667 381.013333 381.013333 0 0 0 120.746666-256 21.333333 21.333333 0 0 1 21.333334-21.333333 23.466667 23.466667 0 0 1 21.333333 21.333333 416.853333 416.853333 0 0 1-134.826667 287.146667 21.333333 21.333333 0 0 1-12.8 5.973333z" p-id="3906" fill="#36ab60"></path><path d="M601.6 615.68a13.226667 13.226667 0 0 1-5.546667 0 11.093333 11.093333 0 0 1-3.413333-14.933333 613.12 613.12 0 0 1 198.4-192 10.666667 10.666667 0 0 1 14.506667 4.266666 11.093333 11.093333 0 0 1-4.266667 14.506667 592.213333 592.213333 0 0 0-190.293333 184.746667 11.52 11.52 0 0 1-9.386667 3.413333z" p-id="3907" fill="#36ab60"></path><path d="M486.826667 634.026667a369.92 369.92 0 0 1-264.533334-93.866667C106.24 424.106667 85.333333 161.28 85.333333 150.186667a20.906667 20.906667 0 0 1 5.973334-16.213334 20.053333 20.053333 0 0 1 17.92-5.973333c11.093333 0 273.493333 20.053333 389.546666 136.106667a466.346667 466.346667 0 0 1 123.733334 338.773333 20.906667 20.906667 0 0 1-16.213334 19.2 542.72 542.72 0 0 1-119.466666 11.946667z m114.346666-33.28z m-469.333333-426.666667c7.68 66.986667 35.84 251.733333 121.173333 337.066667 101.973333 102.4 274.773333 82.346667 327.68 73.386666A426.666667 426.666667 0 0 0 469.333333 293.546667C384 208.64 198.826667 180.48 131.413333 172.8z" p-id="3908" fill="#36ab60"></path><path d="M601.173333 611.413333a11.093333 11.093333 0 0 1-8.96-4.693333 942.506667 942.506667 0 0 0-301.226666-291.84 10.666667 10.666667 0 0 1 10.666666-18.773333 981.333333 981.333333 0 0 1 308.906667 298.666666 11.52 11.52 0 0 1-3.413333 14.933334 14.933333 14.933333 0 0 1-5.973334 1.706666z" p-id="3909" fill="#36ab60"></path></svg>博龄{{ userInfo.accountInfo.blog_years || "/" }}年</span>
        </div>
        <div class="useredit" @click="user_edit">
          <span>
            编辑资料
            <Icon :type="is_useredit ? 'up' : 'down'" />
          </span>
        </div>
        <div class="useredit_form_show useredit_form_hide" ref="useredit_form">
          <form action @submit="(e)=>{e.preventDefault()}">
            <ul>
              <li @click="showinput('nickname')">
                <span :class="inspectObj == 'nickname' ? 'text-red-500' : 'text-0a1'">昵称{{inspectObj== 'nickname' ? '*' : ''}}</span>
                <Input placeholder="不超过5个字符" :default-value="userInfo.nickname||''" ref='nickname' v-model="changeInfo.nickname" v-if="showIpunt == 'nickname'" class="py-0 w-44"/>
                <span v-else>{{ changeInfo.nickname || userInfo.nickname || '' }}</span>
              </li>
              <li @click="showinput('sex')">
                <span :class="inspectObj == 'sex' ? 'text-red-500' : 'text-0a1'">性别{{inspectObj == 'sex' ? '*' : ''}}</span>
                <Input placeholder='man或者woman' :default-value="userInfo.sex" ref='sex' v-model="changeInfo.sex" v-if="showIpunt == 'sex'" class="py-0 w-44"/>
                <span v-else>{{  changeInfo.sex || (userInfo.sex == "man" ? "男♂" : "女♀") }}</span>
              </li>
              <li style="border: none" @click="showinput('birthday')">
                <span :class="inspectObj== 'birthday' ? 'text-red-500' : 'text-0a1'">生日{{inspectObj=='birthday'? '*' : ''}}</span>
                <Input placeholder='1999-01-01' :default-value='userInfo.birthday' ref='birthday' v-model="changeInfo.birthday" v-if="showIpunt == 'birthday'" class="py-0 w-44"/>
                <span  v-else>{{ changeInfo.birthday || userInfo.birthday }}</span>
              </li>
            </ul>
            <ul style="border: none">
              <li @click="showinput('city')">
                <span>地区</span>
                <Input placeholder='所在地区' :default-value='userInfo.city' ref='city' v-model="changeInfo.city" v-if="showIpunt == 'city'" class="py-0 w-44"/>
                <span v-else>{{ changeInfo.city||userInfo.city }}</span>
              </li>
              <li @click="showinput('university')">
                <span>大学</span>
                <Input placeholder='毕业院校' :default-value='userInfo.university' ref='university' v-model="changeInfo.university" v-if="showIpunt == 'university'" class="py-0 w-44"/>
                <span v-else>{{ changeInfo.university||userInfo.university }}</span>
              </li>
              <li style="border: none" @click="showinput('autograph')">
                <span>简介</span>
                <Input placeholder='说点什么...' :default-value='userInfo.autograph' ref='autograph' v-model="changeInfo.autograph" v-if="showIpunt == 'autograph'" class="py-0 w-44"/>
                <div class="autograph" v-else :title="changeInfo.autograph || userInfo.autograph">{{ changeInfo.autograph||(userInfo.autograph || "这个人很懒，什么都没留下")}}</div>
              </li>
            </ul>
            <div class="save_useredit">
              <Button style="background: #5869da; color: white; margin: 0 10px" @click='changeInfoHandler'>保存</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="login_button" v-if="userInfo.id">
      <Button
        style="background: #5869da; color: white; margin: 0 10px"
        @click="logout('switch')"
        >切换账号</Button
      >
      <Button
        style="background: #5869da; color: white; margin: 0 10px"
        @click="logout('out')"
        >退出登陆</Button
      >
    </div>
    <div class="login_button" v-else>
      <Button
        style="background: #5869da; color: white; margin: 0 10px"
        @click="game_visible = true"
        >Play Game</Button
      >
      <Button
        style="background: #5869da; color: white; margin: 0 10px"
        @click="ToLogin"
        >Login</Button
      >
      <Modal v-model="game_visible" title="Basic Modal" width="100">
        <iframe
          src="http://47.107.243.60:3009/"
          frameborder="0"
          width="700"
          height="410"
        ></iframe>
      </Modal>
    </div>
  </div>
</template>

<script>
import { Icon, Button, Modal,Input } from "ant-design-vue";
import { mapMutations } from "vuex";
import {changeUserInfo} from '../../api/userInfo.js'
import { uploadImg } from "../../api/upload_img";
export default {
  name: "MoreMenu",
  components: {
    Icon,
    Button,
    Input,
    Modal,
  },
  data() {
    return {
      is_useredit: false,
      is_savebg: false,
      game_visible: false,
      showIpunt:'',
      changeInfo:{},
      inspectObj:[]
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo.userInfo;
    },
  },
  props: ["showmenu"],
  watch: {
    showmenu(newval) {
      if (newval) {
        this.$refs.menu.style.right = 0;
      } else {
        this.$refs.menu.style.right = -300 + "px";
      }
    },
  },
  methods: {
    changeAvatarUrl(){
          var inputObj=document.createElement('input')
          inputObj.setAttribute('id','my_inputObj');
          inputObj.setAttribute('type','file');
          inputObj.setAttribute("style",'visibility:hidden');
          document.body.appendChild(inputObj);
          inputObj.click();
          inputObj.addEventListener('change',(e)=>{
              const file = e.target.files[0];
              if(file.size > 1024000){
                this.miniMessage('头像不要超过1M','error')
                return
              }
              getBase64(file,(img) => {
                const userId = this.$store.state.userInfo.userInfo.id
                uploadImg(img,userId,'avatarUrl').then((data) => {
                  const { url, alt, href } = data.data.data;
                  this.userInfo.avatarUrl = url
                  localStorage.setItem('userInfo',JSON.stringify(this.userInfo))
                });
              })
          })
          function getBase64(img, callback) {
            const reader = new FileReader();
            reader.addEventListener("load", () => callback(reader.result));
            reader.readAsDataURL(img);
          }
    },
    ...mapMutations({
      SAVE_USERINFO: "userInfo/" + "SAVE_USERINFO",
    }),
    change_showmenu() {
      this.$emit("change_showmenu");
    },
    ToLogin() {
      this.goRouter("/login");
      this.change_showmenu();
    },
    logout(type) {
      localStorage.clear("avatarUrl");
      this.SAVE_USERINFO({ accountInfo: {} });
      this.$refs.useredit_form.className =
        "useredit_form_show useredit_form_hide";
      this.$refs.usershow.style.height = 155 + "px";
      this.$emit("change_showmenu");
      this.goRouter("/login");
    },
    user_edit() {
      const UserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!UserInfo || !UserInfo.id) {
        this.$message.info("请先登录");
        return;
      }
      const { usershow, useredit_form } = this.$refs;
      if (!this.is_useredit) {
        usershow.style.height = 500 + "px";
        useredit_form.className =
          "useredit_form_show animate__animated animate__fadeIn animate__slow";
      } else {
        useredit_form.className = "useredit_form_show useredit_form_hide";
        usershow.style.height = 155 + "px";
      }
      this.is_useredit = !this.is_useredit;
    },
    show_savabgimg(e) {
      this.is_savebg = !this.is_savebg;
      if (this.is_savebg) {
        this.$nextTick(() => {
          const { target, layerX, layerY } = e;
          target.previousElementSibling.style.left = layerX + "px";
          target.previousElementSibling.style.top = layerY + "px";
        });
      }
    },
    // 更换图片
    changeImg() {
      console.log(123);
    },
    // 保存图片
    savabgimg(imgsrc, name) {
      this.downloadImg(imgsrc, name);
    },
    // 修改信息
    showinput(inputkey){
      this.showIpunt = inputkey
      this.$nextTick(()=>{
        this.$refs[inputkey].focus()
      })
    },
    async changeInfoHandler(){
      this.showIpunt = ''
      const {changeInfo} = this
      if(Object.keys(changeInfo).length === 0){
        this.miniMessage('未作修改','warning')
        return
      }
      if(changeInfo.nickname && changeInfo.nickname.length>5){
        this.inspectObj = 'nickname' 
        return 
      }
      if(changeInfo.sex && (changeInfo.sex != 'man' && changeInfo.sex != 'woman')){
        this.inspectObj = 'sex' 
        return 
      }
      if(changeInfo.birthday && (!/^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$/.test(changeInfo.birthday))){
        this.inspectObj = 'birthday'
        return 
      }
      const req = {
        changeInfo,
        userId:this.$store.state.userInfo.userInfo.id
      }
      const res = await changeUserInfo(req)
      if(res.data.code == 200){
        this.miniMessage('修改成功，请重新登陆！','success').then(()=>{
          setTimeout(()=>{
            this.inspectObj = []
            this.logout('out')
          },1200)
        })
      }
    }
  },
};
</script>

<style scoped lang="less">
.menu {
  width: 300px;
  height: 100vh;
  position: fixed;
  right: -300px;
  top: 0;
  transition: 0.7s;
  z-index: 1002;
  box-shadow: -1px -5px 17px 5px #888888;
  background-color: #f1f2f3;
}
.userInfo_box {
  width: 100%;
  height: 90vh;
  position: relative;
  .not_login_bg {
    background-image: url("https://img.zcool.cn/community/019e57623d72700002c3290fbab43f.jpg@520w_390h_1c_1e_2o_100sh.jpg");
    background-size: cover;
  }
}
.userInfo_box .backgroundUrl {
  width: 100%;
  height: 210px;
}
.backgroundUrl img {
  width: 100%;
  height: 95%;
}
.backgroundUrl .savebg {
  width: 55px;
  height: 48px;
  background-color: white;
  position: absolute;
  text-align: center;
  font-size: 12px;
  z-index: 1003;
  color: #8d8282;
  cursor: pointer;
}
.savebg span {
  display: inline-block;
  border-bottom: #888888 solid 1px;
  padding: 2px;
  margin: 0;
}
.savebg span:hover {
  color: #1890ff;
}
.usershow {
  width: 90%;
  height: 155px;
  position: absolute;
  top: 175px;
  left: 15px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 1px 1px 9px 1px #888888;
  opacity: 0.93;
  transition: 0.7s;
}
.usershow .avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: -30px;
  left: 110px;
  background-size: 100% 100%;
}
.usershow p {
  font-weight: 800;
  position: absolute;
  top: 25px;
  left: 120px;
  color: black;
}
.usershow div {
  text-align: center;
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.userlv {
  color: #8d8282;
  top: 50px;
  width: 175px;
  margin: 0 auto;
  transform: scale(0.9);
}
.userlv span {
  display: inline-block;
  width: 40px;
}
.userlabel {
  color: rgba(0, 0, 0, 0.7);
  top: 70px;
  width: 230px;
  margin: 0 auto;
  transform: scale(0.96);
}
.userlabel span,
.useredit span {
  display: inline-block;
  padding: 1px 5px;
  border-radius: 10px;
  border: #ddcece 1px solid;
}
.useredit {
  color: rgba(0, 0, 0, 1);
  top: 70px;
  width: 82px;
  margin: 15px auto;
  transform: scale(1.06);
  cursor: pointer;
}
.useredit span {
  padding: 2px 8px;
}
.useredit_form_show {
  top: 80px;
  display: block !important;
  width: 260px;
}
.useredit_form_show ul {
  list-style: none;
  text-align: left;
  border-bottom: 5px #e8e8e8 solid;
  width: 100%;
  margin: 0;
  padding: 0 10px;
}
.useredit_form_show ul li {
  height: 30px;
  border-bottom: 1px #e8e8e8 solid;
  display: flex;
  justify-content: space-between;
  line-height: 30px;
}
.useredit_form_show ul li span:nth-of-type(1) {
  font-size: 13px;
  width: 90px;
  display: block;
  transform: scale(0.96);
}
.autograph{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.useredit_form_hide {
  display: none !important;
}

.save_useredit {
  top: 95px;
  left: 99px;
}

.login_button {
  width: 100%;
  padding: 20px;
  text-align: center;
}
</style>
