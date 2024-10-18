<template>
    <div>
        <Navbar />
    </div>
    <div id="app">
        <form class="row g-3 p-4 mx-auto" style="max-width: 640px;" @submit.prevent="handleSubmit" >
            <div class="col-sm-6">
                <label for="fn" class="form-label">Name</label>
                <input type="text" id="fn" class="form-control" v-model.trim="firstname" required />
            </div>
            <div class="col-sm-6">
                <label for="ln" class="form-label">Lastname</label>
                <input type="text" id="ln" class="form-control" v-model.trim="lastname" required />
            </div>
            <div class="col-sm-6">
                <label for="bd" class="form-label">Birthday</label>
                <input type="date" id="bd" class="form-control" v-model.trim="birthday" required />
            </div>
            <div class="col-sm-6">
                <label for="sl" class="form-label">Salary</label>
                <input type="number" id="sl" class="form-control" v-model.trim="salary" required />
            </div>
            <div class="col-12">
                <label for="ad" class="form-label">Address</label>
                <textarea id="ad" class="form-control" v-model.trim="address" required></textarea>
            </div>
            <div class="col-12">
                <table class="table table-bordered table-hover">
                    <caption class="caption-top" style="font-size: 1.5em; margin-bottom: 10px;">Preview</caption>
                    <thead>
                        <tr style="background-color: #f2f2f2;">
                            <th style="padding: 10px;">Field</th>
                            <th style="padding: 10px;">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name : Lastname</td>
                            <td>{{ firstname }} {{ lastname }}</td>
                        </tr>
                        <tr>
                            <td>Birthday</td>
                            <td>{{ birthday }}</td>
                        </tr>
                        <tr>
                            <td>Salary</td>
                            <td>{{ salary }}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{{ address }}</td>
                        </tr>
                    </tbody>
                </table>
                <button class="submit-button form-control">Send</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '../Navbar/Navbar.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:8000'

let firstname = ref('');
let lastname = ref('');
let birthday = ref('');
let salary = ref();
let address = ref('');

const handleSubmit = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/history`, {
            name: firstname.value,
            lastname: lastname.value,
            birthday: birthday.value,
            salary: salary.value,
            address: address.value
        })

        

        localStorage.setItem('token', response.data.token);

        Swal.fire({
            icon: 'success',
            title: 'Add history successfully!',
            confirmButtonColor: '#6a11cb',
            showConfirmButton: true
        })
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Please Try again!',
            confirmButtonColor: '#6a11cb',
            showConfirmButton: true
        })
        console.log(error)
    }
} 
</script>

<style scoped>
.table {
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
}

.table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.table tr:hover {
    background-color: #f1f1f1;
}

.submit-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: #6a11cb;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.submit-button:hover {
    background-color: #5e0f99;
    transform: translateY(-2px);
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

textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

textarea:focus {
    border-color: #6a11cb;
    box-shadow: 0 0 5px rgba(106, 17, 203, 0.5);
    outline: none;
}

@media (max-width: 600px) {
    .form-control {
        font-size: 14px;
    }

    .caption-top {
        font-size: 1.2em;
    }

    .btn {
        font-size: 14px;
    }

    .row {
        padding: 0;
    }
}
</style>