import { createRouter, createWebHistory } from "vue-router";

// Component
import Register from './../Register.vue'
import InputHistory from './../InputHistory.vue'
import Home from './../Home.vue'
import Login from './../Login.vue'
import ManageHistory from "../ManageHistory.vue";
import ManageUser from "../ManageUser.vue";
import { getAuth } from "./auth";


const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/history',
        name: 'History',
        component: InputHistory
    },
    {
        path: '/manage',
        name: 'Manage',
        component: ManageHistory
    },
    {
        path: '/manageuser',
        name: 'ManageUser',
        component: ManageUser
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = getAuth()

    if(to.meta.reqiresAuth && !isAuthenticated){
        next({ name: 'Login'});
    }else{
        next()
    }
})

export default router