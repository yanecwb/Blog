<template>
    <div class="menu" ref="menu">
        <div class="userInfo_box">
            <div class="backgroundUrl">
                <img :src="userInfo.backgroundUrl" alt="">
            </div>
            <div class="usershow">
                <img :src="userInfo.avatarUrl" class="avatar" alt="">
                <p>{{userInfo.nickname}}</p>
            </div>
        </div>
        <Button style="background:#5869da;color:white;margin:0 10px" @click="logout" >切换账号</Button>
        <Button style="background:#5869da;color:white;margin:0 10px" @click="logout" >退出登陆</Button>
    </div>
</template>

<script>
import { Icon,Button } from "ant-design-vue";
export default {
    name: "MoreMenu",
    components: {
        Icon,
        Button
    },
    data(){
        return {
            userInfo:{}
        }
    },
    created(){
        this.userInfo = this.$store.state.userInfo.userInfo || {}
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
    methods:{
        change_showmenu(){
            this.$emit('change_showmenu')
        },
        logout(){
            localStorage.clear('avatarUrl')
            this.goRouter('/login')
        }
    }
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
    z-index: 1100;
    box-shadow: -1px -5px 17px 5px #888888;
    background-color: #f1f2f3
}
.userInfo_box{
    width: 100%;
    height: 90vh;
    position: relative;
}
.userInfo_box .backgroundUrl{
    width: 100%;
    height: 210px;
}
.backgroundUrl img{
    width: 100%;
    height: 100%;
}
.usershow{
    width: 90%;
    height: 120px;
    position: absolute;
    top: 190px;
    left: 15px;
    border-radius:10px ;
    background-color: white;
    box-shadow:1px 1px 9px 1px #888888 ;
    opacity: 0.93;
}
.usershow .avatar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: -30px;
    left: 110px;
}
.usershow p{
    font-weight: 800;
    position: absolute;
    top: 25px;
    left: 120px;
}
</style>