<template>
    <div class="my-5">
      <center>
        <div class="login-container">
          <h2>Welcome!</h2>
          <form @submit.prevent="handleLogin">
            <div class="input-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="email" placeholder="Email" required />
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <input type="password" id="password" placeholder="Password" v-model="password" required />
            </div>
            <button type="submit" class="submit-button">Log In</button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          </form>
          <p class="footer-text">Don't have an account? <a href="/register"><b>Sign up</b></a></p>
        </div>
      </center>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');
  
  const handleLogin = () => {
    if (email.value === 'test@example.com' && password.value === 'password') {
      alert('Login successful!');
    } else {
      errorMessage.value = 'Invalid email or password.';
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
  
  .login-container {
    width: 90vw;
    max-width: 400px;
    padding: 5vh 3vw;
    border-radius: 15px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    background: white;
    text-align: center;
    /* Removed hover animation */
  }
  
  /* Remove this section if you want no hover effect */
  /*
  .login-container:hover {
    transform: translateY(-5px);
  }
  */
  
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
  
  .error {
    color: red;
    margin-top: 10px;
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
  </style>
  