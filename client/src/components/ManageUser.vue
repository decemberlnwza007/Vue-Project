<template>
    <div>
        <Navbar />
    </div>
    <br>
    <br>
    <br>
    <div class="my-5">
        <div class="content">
            <div class="container body shadow mb-5 p-5 rounded">
                <!-- Search Input -->
                <div class="row mb-4">
                    <div class="col-md-8 mx-auto">
                        <input v-model="searchQuery" type="text" class="form-control"
                            placeholder="Search by name or address..." />
                    </div>
                </div>
                <table class="table">
                    <thead align="center">
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Birthday</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in filteredUsers" :key="index" align="center">
                            <td>{{ item.user_id }}</td>
                            <td>{{ item.user_email }}</td>
                            <td>{{ item.user_fname }}</td>
                            <td>{{ item.user_lname }}</td>
                            <td>{{ item.birthday }}</td>
                            <td>{{ item.user_phone }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';
const users = ref([]);
const searchQuery = ref('');

const fetchUser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user`);
        console.log(response);
        users.value = response.data;
    } catch (error) {
        console.error('Error fetching User:', error);
    }
};

const filteredUsers = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return users.value.filter(item => {
        return (
            item.user_email.toLowerCase().includes(query) ||
            item.user_fname.toLowerCase().includes(query) ||
            item.user_lname.toLowerCase().includes(query) ||
            item.birthday.toLowerCase().includes(query) ||
            item.phone.toLowerCase().includes(query)
        );
    });
});

onMounted(() => {
    fetchUser();
});
</script>

<style scoped>
.table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
}

.table th {
    background-color: #6a11cb;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    box-shadow: 0 4px 8px rgba(106, 17, 203, 0.2);
}

.table td {
    background-color: #fafafa;
    color: #333;
}

.table tr:nth-child(even) td {
    background-color: #f1f1f1;
}

.table tr:hover td {
    background-color: #e0e0e0;
    transform: scale(1.02);
    transition: all 0.2s ease;
}

.form-control {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
}

.form-control:focus {
    outline: none;
    border-color: #6a11cb;
    box-shadow: 0 0 5px rgba(106, 17, 203, 0.3);
}
</style>
