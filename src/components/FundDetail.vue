



<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <div class="flex-grow flex items-center justify-center">
      <div class="flex flex-col shadow-lg rounded-lg p-6 bg-white max-w-xl w-full">
        <!-- Top: Image -->
        <div class="mb-6">
          <img :src="story.imageUrl" :alt="story.title" class="rounded-lg w-full h-auto object-cover" />
        </div>

        <!-- Title & Description -->
        <h1 class="text-2xl font-bold text-[#642E08] mb-4">{{ story.title }}</h1>
        <p class="text-gray-700 mb-6">{{ story.description }}</p>

        <!-- Donation Amount Options -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-[#642E08] mb-4">Select Donation Amount</h2>
          <div class="flex flex-wrap gap-2 mb-4">
            <button @click="setDonationAmount(10)" class="py-2 px-4 bg-[#EAEAEA] text-[#642E08] rounded-lg hover:bg-[#D3D3D3] transition-colors duration-300">
              $10
            </button>
            <button @click="setDonationAmount(20)" class="py-2 px-4 bg-[#EAEAEA] text-[#642E08] rounded-lg hover:bg-[#D3D3D3] transition-colors duration-300">
              $20
            </button>
            <button @click="setDonationAmount(30)" class="py-2 px-4 bg-[#EAEAEA] text-[#642E08] rounded-lg hover:bg-[#D3D3D3] transition-colors duration-300">
              $30
            </button>
            <input v-model="customAmount" type="number" placeholder="Other amount" class="flex-grow py-2 px-4 border border-gray-300 rounded-lg" />
          </div>
        </div>

        <!-- Payment Details -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-[#642E08] mb-4">Payment Details</h2>
          <div class="mb-4">
            <label class="block text-gray-700 mb-1" for="cardNumber">Card Number</label>
            <input v-model="cardNumber" type="tel" id="cardNumber" placeholder="Enter card number" class="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#642E08]" />
          </div>
          <div class="flex gap-4 mb-4">
            <div class="flex-1">
              <label class="block text-gray-700 mb-1" for="expiryDate">Expiry Date (MM/YY)</label>
              <input v-model="expiryDate" type="text" id="expiryDate" placeholder="MM/YY" class="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#642E08]" />
            </div>
            <div class="flex-1">
              <label class="block text-gray-700 mb-1" for="cvv">CVV</label>
              <input v-model="cvv" type="tel" id="cvv" placeholder="CVV" class="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#642E08]" />
            </div>
          </div>
        </div>

        <!-- Donate Button -->
        <button
          @click="donate"
          class="w-full py-3 px-4 bg-[#642E08] text-white rounded-lg hover:bg-[#b89d77] transition-colors duration-300">
          Donate 
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 
import { db } from '../../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';

const story = ref({});
const route = useRoute();
const cardNumber = ref('');
const expiryDate = ref('');
const cvv = ref('');
const customAmount = ref('');
const donationAmount = ref(0); // To keep track of the selected amount

const donate = () => {
  // Validate input fields
  if (!cardNumber.value || !expiryDate.value || !cvv.value || (!customAmount.value && donationAmount.value === 0)) {
    alert('Please fill in all fields.');
    return;
  }

  // Log payment details
  console.log('Payment details submitted:', {
    title: story.value.title,
    amount: customAmount.value || donationAmount.value, // Use custom amount or selected amount
    cardNumber: cardNumber.value,
    expiryDate: expiryDate.value,
    cvv: cvv.value,
  });

  alert('Payment successful! Thank you for your donation.'); // Show success message

  // Clear all fields after donation
  clearFields();
};

// Function to clear input fields
const clearFields = () => {
  cardNumber.value = '';
  expiryDate.value = '';
  cvv.value = '';
  customAmount.value = '';
  donationAmount.value = 0; // Reset donation amount
};

const fetchStoryDetails = async () => {
  try {
    const storyDocRef = doc(db, 'donateStory', route.params.id); 
    const docSnap = await getDoc(storyDocRef);

    if (docSnap.exists()) {
      story.value = docSnap.data(); 
    } else {
      console.error('No document found!');
    }
  } catch (error) {
    console.error('Error fetching story details:', error);
  }
};

const setDonationAmount = (amount) => {
  customAmount.value = amount; 
};

onMounted(() => {
  fetchStoryDetails();
});
</script>







