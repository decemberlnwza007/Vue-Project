import { createRouter, createWebHistory } from "vue-router";

// Component
import Register from "./components/Register.vue";
import InputHistory from "./components/InputHistory.vue";
import AddCart from "./components/AddCart.vue";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";

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
        path: '/cart',
        name: 'Cart',
        component: AddCart
    },
    {
        path: '/history',
        name: 'History',
        component: InputHistory
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router