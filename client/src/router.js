import { createRouter, createWebHistory } from "vue-router";

// Component
import Register from "./components/Register.vue";
import InputHistory from "./components/InputHistory.vue";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import ManageHistory from "./components/ManageHistory.vue";
import ManageUser from "./components/ManageUser.vue";


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

export default router