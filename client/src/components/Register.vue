<template>
  <div class="my-5">
    <center>
      <div class="register-container">
        <h2>{{ currentStep === 1 ? 'Create an Account' : 'Additional Info' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div v-if="currentStep === 1">
            <div class="input-group">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="Email" v-model.trim="eml" required />
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <input type="password" id="password" placeholder="Password" v-model.trim="pw1" required />
            </div>
            <div class="input-group">
              <label for="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" placeholder="Confirm Password" v-model.trim="pw2" required />
            </div>
          </div>
          <div v-else>
            <div class="input-group">
              <label for="first-name">First Name</label>
              <input type="text" id="first-name" placeholder="First Name" v-model.trim="firstName" required />
            </div>
            <div class="input-group">
              <label for="last-name">Last Name</label>
              <input type="text" id="last-name" placeholder="Last Name" v-model.trim="lastName" required />
            </div>
            <div class="input-group">
              <label for="dob">Date of Birth</label>
              <input type="date" id="dob" v-model="dob" required />
            </div>
            <div class="input-group">
              <label for="phone">Phone:</label>
              <input type="tel" id="phone" placeholder="Phone Number" v-model.trim="phone" required />
            </div>
          </div>
          <button type="submit" class="submit-button">{{ currentStep === 1 ? 'Next' : 'Register' }}</button>
        </form>
        <p class="footer-text">Already have an account? <a href="/"><b>Log In</b></a></p>
      </div>
    </center>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let currentStep = ref(1);
let eml = ref('');
let pw1 = ref('');
let pw2 = ref('');
let firstName = ref('');
let lastName = ref('');
let dob = ref('');
let phone = ref('');

const handleSubmit = () => {
  if (currentStep.value === 1) {
    if (!eml.value || !pw1.value || !pw2.value) {
      alert('Please fill in all fields.');
      return;
    }
    if (pw1.value !== pw2.value) {
      alert('Passwords do not match.');
      return;
    }
    currentStep.value = 2;
  } else {
    if (!firstName.value || !lastName.value || !dob.value || !phone.value) {
      alert('Please fill in all fields.');
      return;
    }
    console.log('User registered:', {
      email: eml.value,
      password: pw1.value,
      firstName: firstName.value,
      lastName: lastName.value,
      dob: dob.value,
      phone: phone.value
    });

    eml.value = '';
    pw1.value = '';
    pw2.value = '';
    firstName.value = '';
    lastName.value = '';
    dob.value = '';
    phone.value = '';
    currentStep.value = 1; 
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  font-family: 'Arial', sans-serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-container {
  width: 90vw;
  max-width: 400px;
  padding: 5vh 3vw;
  border-radius: 15px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  background: white;
  text-align: center;
  overflow: hidden; /* Prevent overflow */
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
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

.footer-text {
  margin-top: 15px;
  font-size: 14px;
  color: #555;
}

.footer-text a {
  color: #6a11cb;
  text-decoration: none;
}

.footer-text a:hover {
  text-decoration: underline;
}

/* Responsive Styles */
@media (max-width: 600px) {
  .register-container {
    padding: 5vh 2vw;
    max-width: 90%;
  }

  h2 {
    font-size: 1.5rem;
  }

  .input-group {
    margin-bottom: 10px; 
  }

  .submit-button {
    padding: 8px;
  }

  .footer-text {
    font-size: 12px; 
  }
}
</style>
