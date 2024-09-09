<template>
    <div class="flex flex-col min-h-screen bg-gray-100 p-6">
      <div class="flex-grow flex items-center justify-center">
        <div class="flex flex-col shadow-lg rounded-lg p-6 bg-white max-w-lg w-full">
          <!-- Donation For Section -->
          <div class="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
            <h2 class="text-xl font-semibold text-[#642E08]">You are supporting</h2>
            <p class="text-lg text-gray-700">{{ title }}</p>
          </div>
  
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
              <input v-model="cardNumber" type="text" id="cardNumber" placeholder="Enter card number" class="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#642E08]" />
            </div>
            <div class="flex gap-4 mb-4">
              <div class="flex-1">
                <label class="block text-gray-700 mb-1" for="expiryDate">Expiry Date</label>
                <input v-model="expiryDate" type="text" id="expiryDate" placeholder="MM/YY" class="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#642E08]" />
              </div>
              <div class="flex-1">
                <label class="block text-gray-700 mb-1" for="cvv">CVV</label>
                <input v-model="cvv" type="text" id="cvv" placeholder="CVV" class="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#642E08]" />
              </div>
            </div>
          </div>
  
          <!-- Submit Button -->
          <button
            @click="submitPayment"
            class="w-full py-3 px-4 bg-[#642E08] text-white rounded-lg hover:bg-[#b89d77] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#b89d77]">
            Donate
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const title = route.query.title || '';
  
  const customAmount = ref('');
  const cardNumber = ref('');
  const expiryDate = ref('');
  const cvv = ref('');
  
  const setDonationAmount = (amount) => {
    customAmount.value = amount;
  };
  
  const submitPayment = () => {
    // Handle payment submission here
    console.log('Payment details submitted:', {
      title,
      amount: customAmount.value,
      cardNumber: cardNumber.value,
      expiryDate: expiryDate.value,
      cvv: cvv.value,
    });
  };
  </script>
  