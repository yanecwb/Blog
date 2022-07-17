import Vue from "vue";
import VueRouter from "vue-router";
import {Home ,Login , About_me ,Content_module, Article_detail,Upload_article,Message_center} from './router-path.js'

Vue.use(VueRouter);
const routes = [
    { path: "/", redirect: "/home" },
    {
        path: "/home",
        name: 'home',
        component: Home,
        meta:{
          title:'Flechazo\'s Blog'
        }
    },
    {
        path: "/login",
        name: 'login',
        component: Login,
        meta:{
          title:'登陆'
        }
    },
    {
        path:'/about_me',
        name:'about_me',
        component:About_me,
        meta:{
          title:'关于本站作者'
        }
    },
    {
        path:'/content/:module',
        name:'content',
        component:Content_module,
        meta:{
          title:'博客列表'
        }
    },
    {
      path:'/article_detail/:id?',
      name:'article_detail',
      component:Article_detail,
      meta:{
        title:'博客详情'
      }
    },
    {
      path:'/Upload_article/:id?',
      name:'upload_article',
      component:Upload_article,
      meta:{
        title:'写博客'
      }
    },
    {
      path:'/message_center/:id?',
      name:'message_center',
      component:Message_center,
      meta:{
        title:'消息中心'
      }
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
    scrollBehavior (to, from, savedPosition) {
      if(to.meta.title == '博客列表' || to.meta.title == '博客详情'){
        return {x:0,y:0}
      }
    }
});
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router;
