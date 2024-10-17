<template>
    <div>
        <Navbar />
    </div>
    <div id="app" class="p-5">
        <h6>Add To Cart</h6>
        <div class="form-check" v-for="(p, i) in product">
            <input type="checkbox" class="form-check-input" :id="'chk' + i" :value="p" v-model="cart">

        </div>
        
    </div>
</template>

<script setup>
    import Navbar from './Navbar.vue';
</script>

<script>
    export default {
        name: 'Cart'
    }
</script>