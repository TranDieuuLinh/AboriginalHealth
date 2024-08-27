<template>
    <div class="login-container">
      <div class="login-form">
        <h2 class="login-title">Login</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" class="submit-button">Login</button>
          <div v-if="loginError" class="error-message">{{ loginError }}</div>
        </form>
        <p class="signup-link">
        Don't have an account? 
        <RouterLink to="/signup" class="text-blue-600 hover:text-blue-500">Sign up</RouterLink>
      </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import accounts from '../assets/json/accounts.json';
  
  const email = ref('');
  const password = ref('');
  const loginError = ref('');
  
  const router = useRouter();
  
  const user = computed(() => {
    return accounts.find((u) => u.email === email.value && u.password === password.value);
  });
  
  const login = () => {
    if (user.value) {
      localStorage.setItem('userRole', user.value.role);
      localStorage.setItem('userName', user.value.name);
      localStorage.setItem('userEmail', user.value.email);

      const path = user.value.role === 'admin'? '/adminHome' : '/'
      router.push(path).then(() =>{router.go(0)})
      
    } else {
      loginError.value = 'Invalid email or password';
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #82502d;
  }
  
  .login-form {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  
  .login-title {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .submit-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #82502d;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #6c3e1d;
  }
  
  .error-message {
    color: red;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
  }

  .signup-link {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
}
  </style>
  