<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-30 bg-gray-900 bg-opacity-50"
    role="dialog"
    aria-labelledby="review-dialog-title"
    aria-describedby="review-dialog-description"
    tabindex="-1"
  >
    <div class="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full relative">
      <button
        class="absolute top-4 right-4 text-gray-600 text-2xl"
        @click="closeReviewBox"
        aria-label="Close review box"
      >
        &times;
      </button>
      <h2
        id="review-dialog-title"
        class="text-3xl font-extrabold mb-4 text-center text-gray-800"
      >
        Rate Us!
      </h2>
      <p
        id="review-dialog-description"
        class="text-gray-600 mb-6 text-center"
      >
        Your feedback is super important to us. Please rate us and let us know how we're doing!
      </p>

      <div class="flex justify-center mb-6" role="group" aria-label="Rating stars">
        <div class="flex items-center space-x-1">
          <button
            @click="setRating(1)"
            :class="getStarClass(1)"
            aria-label="Rate 1 star"
            tabindex="0"
          >
            &#9733;
          </button>
          <button
            @click="setRating(2)"
            :class="getStarClass(2)"
            aria-label="Rate 2 stars"
            tabindex="0"
          >
            &#9733;
          </button>
          <button
            @click="setRating(3)"
            :class="getStarClass(3)"
            aria-label="Rate 3 stars"
            tabindex="0"
          >
            &#9733;
          </button>
          <button
            @click="setRating(4)"
            :class="getStarClass(4)"
            aria-label="Rate 4 stars"
            tabindex="0"
          >
            &#9733;
          </button>
          <button
            @click="setRating(5)"
            :class="getStarClass(5)"
            aria-label="Rate 5 stars"
            tabindex="0"
          >
            &#9733;
          </button>
        </div>
      </div>

      <textarea
        v-model="comment"
        class="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows="4"
        placeholder="Write your comments here..."
        aria-label="Comments"
      ></textarea>

      <button
        @click="submitReview"
        class="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300"
        aria-label="Submit review"
      >
        Submit Review
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../../firebaseConfig.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const emit = defineEmits(['close']);
const rating = ref(0);
const comment = ref('');

const userEmail = ref(localStorage.getItem('userEmail'));

const setRating = (star) => {
  rating.value = rating.value === star ? star - 1 : star;
};

const getStarClass = (star) => {
  return star <= rating.value ? 'text-yellow-400 text-4xl' : 'text-gray-300 text-4xl';
};

const fetchExistingReview = async () => {
  if (!userEmail.value) return;

  const userDocRef = doc(db, 'usersAccount', userEmail.value);
  try {
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      rating.value = data.rating || 0;
      comment.value = data.comment || '';
    } else {
      console.log('No existing review found.');
    }
  } catch (error) {
    console.error('Error fetching existing review: ', error);
  }
};

const submitReview = async () => {
  if (rating.value && comment.value) {
    if (!userEmail.value) {
      alert("❗️You must sign in to rate for us❗️");
      return;
    }
    try {
      const userDocRef = doc(db, 'usersAccount', userEmail.value);

      await setDoc(userDocRef, {
        comment: comment.value,
        rating: rating.value
      }, { merge: true });

      // Disable button or show loading state if necessary
      await fetch('https://sendemailfunction-tayhlvlyjq-ts.a.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail.value,
          comment: comment.value,
          rating: rating.value
        }),
      });

      alert("Your review has been successfully submitted✅");
      emit('close');
    } catch (e) {
      console.error("Error submitting review: ", e);
      alert("❗️Failed to submit your review, please try again later❗️");
    }
  } else {
    alert("❗️Please put in your star and comment before submitting❗️");
  }
};

const closeReviewBox = () => {
  emit('close');
};

onMounted(() => {
  fetchExistingReview();
});
</script>

<style scoped>
.text-yellow-400 {
  color: #f59e0b;
}
.text-gray-300 {
  color: #d1d5db;
}
</style>
