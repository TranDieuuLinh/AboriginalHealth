<template>
    <div class="signUp-parent h-screen flex items-center justify-center">
      <div class="flex md:flex-row items-center justify-between bg-white sm:max-w-xl md:max-w-3xl lg:max-w-4xl rounded-2xl shadow-lg">
        
        <!-- Form Section -->
        <div class="flex flex-col p-6 md:p-10 w-full md:w-1/2">
          <h1 class="text-3xl md:text-5xl  font-bold brownColorText mb-2">Join Us</h1>
          <p class="text-xs md:text-sm text-gray-400 mb-5">Help Us Build a Healthier Future for Aboriginal Communities</p>
  
          <div class="mb-4">
            <label for="role" class="block text-xs md:text-sm font-medium text-gray-700">Role</label>
            <select id="role" class="mt-1 block w-full md:w-[90%] p-2 border border-gray-300 text-gray-400 rounded-md shadow-sm appearance-none">
              <option selected>I sign up as</option>
              <option value="admin">an admin</option>
              <option value="user">a general user</option>
            </select>
          </div>
  
          <div class="mb-4">
            <label for="email" class="block text-xs md:text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" class="mt-1 block w-full md:w-[90%] text-xs md:text-base p-2 border border-gray-300 rounded-md shadow-sm" placeholder="Enter your email">
          </div>
  
          <div class="mb-6">
            <label for="password" class="block text-xs md:text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" class="mt-1 block w-full md:w-[90%] text-xs md:text-base p-2 border border-gray-300 rounded-md shadow-sm" placeholder="Enter your password">
          </div>
  
          <button class="w-full md:w-[90%] text-xs md:text-base text-white py-2 px-4 rounded-md signUp-parent ">
            Sign Up
          </button>
  
          <p class="text-xs md:text-sm text-gray-600 mt-4">
            Already have an account? 
            <RouterLink to="/signin" class="text-blue-600 hover:text-blue-500">Sign in</RouterLink>
          </p>
        </div>
  
        <!-- Right Side: Image -->
        <div class="hidden md:flex justify-center items-center w-1/2">
          <img src="../assets/signUpImg.png" alt="Sign Up Image" class="w-full h-full rounded-lg">
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
  
  .brownColorText {
    color: #82502D;
  }
  </style>
  