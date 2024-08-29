<template>
    <div class="fixed inset-0 flex items-center justify-center z-30 bg-gray-900 bg-opacity-50">
      <div class="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full relative">
        <button class="absolute top-4 right-4 text-gray-600 text-2xl" @click="closeReviewBox">&times;</button>
        <h2 class="text-3xl font-extrabold mb-4 text-center text-gray-800">Rate Us!</h2>
        <p class="text-gray-600 mb-6 text-center">Your feedback is super important to us. Please rate us and let us know how we're doing!</p>
        
        <div class="flex justify-center mb-6">
          <div class="flex items-center space-x-1">
            <button @click="setRating(1)" :class="getStarClass(1)">&#9733;</button>
            <button @click="setRating(2)" :class="getStarClass(2)">&#9733;</button>
            <button @click="setRating(3)" :class="getStarClass(3)">&#9733;</button>
            <button @click="setRating(4)" :class="getStarClass(4)">&#9733;</button>
            <button @click="setRating(5)" :class="getStarClass(5)">&#9733;</button>
          </div>
        </div>
        
        <textarea v-model="comment" class="w-full p-3 border border-gray-300 rounded-lg mb-4" rows="4" placeholder="Write your comments here..."></textarea>
        
        <button @click="submitReview" class="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300">Submit Review</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { db } from '../../firebaseConfig.js';
  import { doc,  updateDoc } from 'firebase/firestore';
  
  const emit = defineEmits(['close']);
  const rating = ref(0);
  const comment = ref('');
  
  const setRating = (star) => {
    if (rating.value === star) {
        rating.value -=1; 
    } else {
        rating.value = star;
    }
    };
  
  const getStarClass = (star) => {
    return star <= rating.value ? 'text-yellow-400 text-4xl' : 'text-gray-300 text-4xl';
  };
  
  const submitReview = async () =>  {
    if (rating.value && comment.value) {
      
      try {
            const userDocRef = doc(db, 'usersAccount', localStorage.getItem('userEmail')); 
            await updateDoc(userDocRef, {
                comment: comment.value,
                rating: rating.value
            });
            alert("Your review has been successfully submitted✅")
            console.log("Document written with ID: ", localStorage.getItem('userRole'));
            rating.value = "";
            comment.value = "";
            } catch (e) {
            console.error("Error adding document: ", e);
            }
      emit('close');
    } else {
      alert("❗️Please put in your star and comment before submiting❗️")
    }
  };
  
  const closeReviewBox = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .text-yellow-400 {
    color: #f59e0b;
  }
  .text-gray-300 {
    color: #d1d5db;
  }
  </style>
  