<template>
    <div class="menu" ref="menu">
        <div class="userInfo_box">
            <div class="backgroundUrl">
                <div class="savebg" v-if="is_savebg">
                    <span>更换图片</span>
                    <span
                        style="border-bottom:none"
                        @click="savabgimg(userInfo.backgroundUrl,userInfo.nickname+'的背景图片')"
                    >保存图片</span>
                </div>
                <img :src="userInfo.backgroundUrl" alt @click="show_savabgimg" />
            </div>
            <div class="usershow" ref="usershow">
                <img :src="userInfo.avatarUrl" class="avatar" alt />
                <p>{{userInfo.nickname}}</p>
                <div class="userlv">
                    <span>{{userInfo.accountInfo.follows}}关注</span>
                    <span>{{userInfo.accountInfo.fans}}粉丝</span>
                    <span>lv{{userInfo.accountInfo.lv}}</span>
                </div>
                <div class="userlabel">
                    <span>
                        <Icon type="man" v-if="userInfo.sex == 'man'" style="color:#5869da" />
                        <Icon
                            type="woman"
                            v-else-if="userInfo.sex == 'woman'"
                            style="color:#5869da"
                        />95后 双鱼座
                    </span>
                    <span>江西 九江</span>
                    <span>博龄{{userInfo.accountInfo.blog_years}}年</span>
                </div>
                <div class="useredit" @click="user_edit">
                    <span>
                        编辑资料
                        <Icon :type="is_useredit ? 'up':'down'" />
                    </span>
                </div>
                <div class="useredit_form_show useredit_form_hide" ref="useredit_form">
                    <form action="">
                        <ul>
                        <li><span >昵称</span><span>{{userInfo.nickname}}</span></li>
                        <li><span>性别</span><span>{{userInfo.sex == 'man' ? '男':'女'}}</span></li>
                        <li style="border:none"><span>生日</span><span>{{userInfo.birthday}}</span></li>
                    </ul>
                     <ul>
                        <li><span>地区</span><span>{{userInfo.city}}</span></li>
                        <li><span>大学</span><span>{{userInfo.university}}</span></li>
                        <li style="border:none"><span>简介</span><span>{{userInfo.autograph || '这个人很懒，什么都没留下' }}</span></li>
                    </ul>
                        <div class="save_useredit"><Button style="background:#0baaeb;color:white;margin:0 10px" >保存</Button></div>
                    </form>

                </div>
            </div>
        </div>
      <div class="login_button">
            <Button style="background:#5869da;color:white;margin:0 10px" @click="logout('switch')">切换账号</Button>
        <Button style="background:#5869da;color:white;margin:0 10px" @click="logout('out')">退出登陆</Button>
      </div>
    </div>
</template>

<script>
import { Icon, Button } from "ant-design-vue";
export default {
    name: "MoreMenu",
    components: {
        Icon,
        Button,
    },
    data() {
        return {
            userInfo: {},
            is_useredit: false,
            is_savebg: false,
        };
    },
    created() {
        this.userInfo = this.$store.state.userInfo.userInfo || {};
    },
    // emits:['change_showmenu'],
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
        change_showmenu() {
            this.$emit("change_showmenu");
        },
        logout(type) {
            localStorage.clear("avatarUrl");
            if(type == 'out'){
                this.$store.state.userInfo.userInfo = {}
            }
            this.goRouter("/login");
        },
        user_edit() {
            const { usershow, useredit_form } = this.$refs;
            if (!this.is_useredit) {
                usershow.style.height = 500 + "px";
                useredit_form.className =
                    "useredit_form_show animate__animated animate__fadeIn animate__slow";
            } else {
                useredit_form.className =
                    "useredit_form_show useredit_form_hide";
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
        savabgimg(imgsrc, name) {
            this.downloadImg(imgsrc, name);
        },
    },
};
</script>

<style  scoped>
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
.useredit_form_show ul{
    list-style: none;
    text-align: left;
    border-bottom: 5px #e8e8e8 solid;
    width: 100%;
    margin: 0;
    padding:0 10px;
}
.useredit_form_show ul li{
    height: 30px;
        border-bottom: 1px #e8e8e8 solid;
display: flex;
justify-content: space-between;
line-height: 30px;
}
.useredit_form_show ul li span:nth-of-type(1){
   font-size:13px;
   color:rgba(0, 0, 0, 0.95);
   display: inline-block;
   transform: scale(0.96);
}

.useredit_form_hide {
    display: none !important;
}

.save_useredit{
    top: 95px;
    left: 99px;
}



.login_button{
    width: 100%;
    padding: 20px;
    text-align: center;
}
</style>