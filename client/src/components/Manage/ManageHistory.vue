<template>
    <div>
        <Navbar />
    </div>
    <br>
    <br>
    <br>
    <div class="my-5">
        <div class="content">
            <div class="container body shadow mb-5 p-5 rouded">
                <div class="row mb-4">
                    <div class="col-md-8 mx-auto">
                        <input v-model="searchQuery" type="text" class="form-control"
                            placeholder="Search by name or address..." />
                    </div>
                </div>
                <table class="table">
                    <thead align="center">
                        <tr>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Birthday</th>
                            <th>Salary</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in filteredHistory" :key="index" align="center">
                            <td>{{ item.name }}</td>
                            <td>{{ item.lastname }}</td>
                            <td>{{ item.birthday }}</td>
                            <td>{{ item.salary }}</td>
                            <td>{{ item.address }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Navbar from '../Navbar/Navbar.vue';

const BASE_URL = 'http://localhost:8000';
const histories = ref([]);
const searchQuery = ref('');

const fetchHistory = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/history`);
        histories.value = response.data;
    } catch (error) {
        console.error('Error fetching history:', error);
    }
};

const filteredHistory = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return histories.value.filter(item => {
        return (
            item.name.toLowerCase().includes(query) ||
            item.address.toLowerCase().includes(query)
        );
    });
});

onMounted(() => {
    fetchHistory();
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

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #6a11cb;
  box-shadow: 0 0 5px rgba(106, 17, 203, 0.5);
  outline: none;
}

</style>
