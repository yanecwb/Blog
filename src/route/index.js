import Vue from "vue";
import VueRouter from "vue-router";
import {Home ,Login , About_me ,Content_module} from './router-path.js'

Vue.use(VueRouter);
const routes = [
    { path: "/", redirect: "/home" },
    {
        path: "/home",
        name: 'home',
        component: Home,
    },
    {
        path: "/login",
        name: 'login',
        component: Login,
    },
    {
        path:'/about_me',
        name:'about_me',
        component:About_me
    },
    {
        path:'/content/:module',
        name:'content',
        component:Content_module
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
