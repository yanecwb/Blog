<template>
    <div class="menu" ref="menu">
        <ul>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
        </ul>
    </div>
</template>

<script>
import { Icon } from "ant-design-vue";
export default {
    name: "MoreMenu",
    components: {
        Icon,
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
        }
    }
};
</script>

<style  scoped>
.menu {
    width: 300px;
    height: 100vh;
    background-color: white;
    position: fixed;
    right: -300px;
    top: 0;
    transition: 0.7s;
    z-index: 999;
    box-shadow: -1px -5px 17px 5px #888888;
}
.menu ul {
    list-style: none;
}
</style>