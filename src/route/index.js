import Vue from "vue";
import VueRouter from "vue-router";

const Home = ()=> import('../views/home')
const Login = ()=> import('../views/login')
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
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
