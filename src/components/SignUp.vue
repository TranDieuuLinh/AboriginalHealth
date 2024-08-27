<template>
    <div class="signUp-parent h-screen flex items-center justify-center">
      <div class="flex md:flex-row items-center justify-between bg-white sm:max-w-xl md:max-w-3xl lg:max-w-4xl rounded-2xl shadow-lg">
        
        <div class="flex flex-col p-6 md:p-10 w-full md:w-1/2">
          <h1 class="text-3xl md:text-4xl  font-bold brownColorText mb-2">Join Us</h1>
          <p class="text-xs md:text-sm text-gray-400 mb-5">Help Us Build a Healthier Future for Aboriginal Communities</p>
          <form @submit.prevent="handleSubmission">
            <div class="mb-4">
                <label for="role" class="block text-xs md:text-sm font-medium text-gray-700">Role</label>
                <select v-model="formData.role"  id="role" required
                class="mt-1 block w-full md:w-[90%] p-2 border border-gray-300  rounded-md shadow-sm appearance-none"
                :class="{'text-gray-400':formData.role === '', 'text-black':formData.role!==''}">
                    <option value="" disabled selected>I sign up as...</option>
                    <option value="admin">an admin</option>
                    <option value="user">a general user</option>
                </select>
            </div>

            <div class="mb-4">
                <label for="name" class="block text-xs md:text-sm font-medium text-gray-700">Name</label>
                <input type="name" @blur="validateFullName(true)" v-model="formData.fullName" @input="validateFullName" required id="name" class="mt-1 block w-full md:w-[90%] text-xs md:text-base p-2 border border-gray-300 rounded-md shadow-sm" placeholder="Enter your name">
                <div v-if="errors.fullName" class="text-orange-700 text-xs md:text-sm mt-1">{{ errors.fullName }} </div>
            </div>
    
            <div class="mb-4">
                <label for="email" class="block text-xs md:text-sm font-medium text-gray-700">Email</label>
                <input type="email" v-model="formData.email" required id="email" class="mt-1 block w-full md:w-[90%] text-xs md:text-base p-2 border border-gray-300 rounded-md shadow-sm" placeholder="Enter your email">
            </div>
    
            <div class="mb-6">
                <label for="password" class="block text-xs md:text-sm font-medium text-gray-700">Password</label>
                <input type="password" @blur="validatePassword(true)" v-model="formData.password" @input="validatePassword" required id="password" class="mt-1 block w-full md:w-[90%] text-xs md:text-base p-2 border border-gray-300 rounded-md shadow-sm" placeholder="Enter your password">
                <div v-if="errors.password" class="text-orange-700 text-xs md:text-sm mt-1">{{ errors.password }} </div>
            </div>
    
            <button type="submit" class="w-full md:w-[90%] text-xs md:text-base text-white py-2 px-4 rounded-md signUp-parent ">
                Sign Up
            </button>
    
            <p class="text-xs md:text-sm text-gray-600 mt-4">
                Already have an account? 
                <RouterLink to="/login" class="text-blue-600 hover:text-blue-500">Sign in</RouterLink>
            </p>
          </form>
        </div>
  
        <!-- Right Side: Image -->
        <div class="hidden md:flex justify-center items-center w-1/2">
          <img src="../assets/signUpImg.png" alt="Sign Up Image" class="w-full h-full rounded-lg">
        </div>
        
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue';
    const submittedCards = ref([]);

    const validatePassword = (blur) => {
        const password = formData.value.password;
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);

        if (password.length < minLength) {
            if (blur) errors.value.password = `Your password must be at least ${minLength} characters long.`;
        } else if (!hasUpperCase) {
            if (blur) errors.value.password = 'Your password must have at least 1 uppercase letter.';
        } else if (!hasLowerCase) {
            if (blur) errors.value.password = 'Your password must have at least 1 lowercase letter.';
        } else {
            errors.value.password = null; 
        }
        };


    const validateFullName = (blur) => {
        const fullName = formData.value.fullName; 
        const hasUpperCase = /[A-Z]/.test(fullName);

        if (!hasUpperCase) {
            if (blur) errors.value.fullName = 'Name must contain at least one capital letter.';
        } else {
            errors.value.fullName = null; 
        }
    };

    const formData = ref({
        password:'',
        email:'',
        fullName:'',
        role:''
    });

    const errors = ref({
        password:null,
        fullName:null
    });

    const handleSubmission=() =>{
        validatePassword(true),
        validateFullName(true)
        if( !errors.value.password && !errors.value.fullName && formData.value.email!=='' && formData.value.password!=='' ){
            clearForm();
        }
    };

    const clearForm=() =>{
        formData.value={
            email: '',
            password: '',
            fullName: '',
            role:''
        };
    }
  </script>
  
  <style scoped>
  .signUp-parent {
    background-color: #82502D;
  }
  
  .brownColorText {
    color: #82502D;
  }
  </style>
  