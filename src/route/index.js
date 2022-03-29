import Vue from "vue";
import VueRouter from "vue-router";

const Home = ()=> import('../views/home')
const Login = ()=> import('../views/login')
const About_me = () => import('../views/about_me')
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
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
