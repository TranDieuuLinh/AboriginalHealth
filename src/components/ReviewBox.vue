<template>
    <div class="fixed inset-0 flex items-center justify-center z-30 bg-gray-900 bg-opacity-50">
      <div class="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full relative">
        <button class="absolute top-4 right-4 text-gray-600 text-2xl" @click="$emit('close')">&times;</button>
        <h2 class="text-3xl font-extrabold mb-4 text-center text-gray-800">Rate Us!</h2>
        <p class="text-gray-600 mb-6 text-center">Your feedback is super important to us. Please rate us and let us know how we're doing!</p>
        
        <div class="flex justify-center mb-6">
          <div class="flex items-center space-x-1">
            <button :class="getStarClass(1)" @click="toggleRating(1)" class="text-4xl">&#9733;</button>
            <button :class="getStarClass(2)" @click="toggleRating(2)" class="text-4xl">&#9733;</button>
            <button :class="getStarClass(3)" @click="toggleRating(3)" class="text-4xl">&#9733;</button>
            <button :class="getStarClass(4)" @click="toggleRating(4)" class="text-4xl">&#9733;</button>
            <button :class="getStarClass(5)" @click="toggleRating(5)" class="text-4xl">&#9733;</button>
          </div>
        </div>
        
        <textarea v-model="comment" class="w-full p-3 border border-gray-300 rounded-lg mb-4" rows="4" placeholder="Write your comments here..."></textarea>
        
        <button @click="submitReview" class="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300">Submit Review</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  
  const emit = defineEmits(['close']);
  
  const rating = ref(0);
  const comment = ref('');
  
  const toggleRating = (star) => {
    rating.value = rating.value === star ? 0 : star;
  };
  
  const getStarClass = (star) => {
    return star <= rating.value ? 'text-yellow-400' : 'text-gray-300';
  };
  
  const submitReview = () => {
  
    if( rating.value !== 0 && comment.value !== ''){
        emit('close');
    }
  };
  
  
  </script>
  
  <style scoped>
  .text-yellow-400 {
    color: #f59e0b;
  }
  .text-gray-300 {
    color: #d1d5db;
  }
  .text-gray-800 {
    color: #2d3748;
  }
  </style>
  