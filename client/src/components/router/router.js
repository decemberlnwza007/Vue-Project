import { createRouter, createWebHistory } from "vue-router";

// Component
import Register from '../Systems/Register.vue'
import InputHistory from '../History/InputHistory.vue'
import Home from './../Home.vue'
import Login from '../Systems/Login.vue'
import ManageHistory from "../Manage/ManageHistory.vue";
import ManageUser from "../Manage/ManageUser.vue";
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