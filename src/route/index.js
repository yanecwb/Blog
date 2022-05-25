import Vue from "vue";
import VueRouter from "vue-router";
import {Home ,Login , About_me ,Content_module, Article_detail,Upload_article} from './router-path.js'

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
        component:Content_module,
    },
    {
      path:'/article_detail/:id?',
      name:'article_detail',
      component:Article_detail
    },
    {
      path:'/Upload_article',
      name:'upload_article',
      component:Upload_article
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
