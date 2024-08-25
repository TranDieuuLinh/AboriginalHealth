<template>
    <div class="signUp-parent h-screen flex items-center justify-center">
      <div class="flex flex-row items-center justify-between bg-white p-10 gap-20 w-full max-w-4xl rounded-lg shadow-lg">
        
        <!-- Left Side: Sign Up Form -->
        <div class="flex flex-col gap-6 text-gray-800 w-1/2">
          <h1 class="text-4xl font-bold mb-4">Join Us</h1>
          
          <!-- User Type Select Box -->
          <div>

    
            <select id="role" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none">
                <option selected>I sign up as</option>
                <option value="admin">an admin</option>
                <option value="user">a general user</option>
            </select>


          </div>
  
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email">
          </div>
  
          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your password">
          </div>
  
          <!-- Sign Up Button -->
          <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Sign Up
          </button>
  
          <!-- Sign In Link -->
          <p class=" text-sm text-gray-600 mt-4">
            Already have an account? 
            <RouterLink to="/signin" class="text-blue-600 hover:text-blue-500">Sign in</RouterLink>
          </p>
        </div>
  
        <!-- Right Side: Image -->
        <div class="flex justify-center items-center w-1/2">
          <img src='../assets/signUpImg.png' alt="Sign Up Image" class="max-w-full h-auto rounded-lg">
        </div>
        
      </div>
    </div>
  </template>
  
  <script setup>
  // Your script here
  </script>
  
  <style scoped>
  .signUp-parent {
    background-color: #82502D;
  }
  </style>
  