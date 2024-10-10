<template>
  <div class="flex flex-col min-h-screen py-20 bg-gray-100">
    <div class="flex-grow flex items-center justify-center">
      <div
        class="flex flex-col shadow-lg rounded-lg p-6 bg-white max-w-xl w-full"
        role="main"
        aria-labelledby="donation-title"
      >
        <!-- Top: Image -->
        <div class="mb-6">
          <img
            :src="story.imageUrl"
            :alt="story.title ? `Image for ${story.title}` : 'Donation story image'"
            class="rounded-lg w-full h-auto object-cover"
          />
        </div>

        <!-- Title & Description -->
        <h1
          id="donation-title"
          class="text-2xl font-bold text-[#642E08] mb-4"
          role="heading"
          aria-level="1"
        >
          {{ story.title }}
        </h1>
        <p class="text-gray-700 mb-6" tabindex="0">{{ story.description }}</p>

        <!-- Donation Amount Options -->
        <div class="mb-6">
          <h2
            class="text-xl font-semibold text-[#642E08] mb-4"
            id="donation-amount-title"
            role="heading"
            aria-level="2"
          >
            Select Donation Amount
          </h2>
          <div
            class="flex flex-wrap gap-2 mb-4"
            role="radiogroup"
            aria-labelledby="donation-amount-title"
          >
            <button
              @click="setDonationAmount(10)"
              :aria-checked="customAmount === 10"
              role="radio"
              class="py-2 px-4 bg-[#EAEAEA] text-[#642E08] rounded-lg hover:bg-[#D3D3D3] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#642E08]"
            >
              $10
            </button>
            <button
              @click="setDonationAmount(20)"
              :aria-checked="customAmount === 20"
              role="radio"
              class="py-2 px-4 bg-[#EAEAEA] text-[#642E08] rounded-lg hover:bg-[#D3D3D3] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#642E08]"
            >
              $20
            </button>
            <button
              @click="setDonationAmount(30)"
              :aria-checked="customAmount === 30"
              role="radio"
              class="py-2 px-4 bg-[#EAEAEA] text-[#642E08] rounded-lg hover:bg-[#D3D3D3] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#642E08]"
            >
              $30
            </button>
            <div class="flex-grow flex flex-col">
              <label for="customAmount" class="sr-only">Other donation amount</label>
              <input
                v-model="customAmount"
                type="number"
                id="customAmount"
                placeholder="Other amount"
                aria-label="Other donation amount"
                :aria-invalid="isDonationAmountInvalid"
                class="flex-grow py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#642E08]"
              />
              <span
                v-if="isDonationAmountInvalid"
                class="text-red-500 text-sm"
                role="alert"
              >
                Please enter a valid amount.
              </span>
            </div>
          </div>
        </div>

        <!-- Payment Details -->
        <div class="mb-6">
          <h2
            class="text-xl font-semibold text-[#642E08] mb-4"
            id="payment-details-title"
            role="heading"
            aria-level="2"
          >
            Payment Details
          </h2>
          <form @submit.prevent="donate" aria-labelledby="payment-details-title">
            <div class="mb-4">
              <label class="block text-gray-700 mb-1" for="cardNumber">Card Number</label>
              <input
                v-model="cardNumber"
                type="tel"
                id="cardNumber"
                placeholder="Enter card number"
                aria-required="true"
                :aria-invalid="isCardNumberInvalid"
                class="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#642E08]"
              />
              <span
                v-if="isCardNumberInvalid"
                class="text-red-500 text-sm"
                role="alert"
              >
                Please enter a valid card number.
              </span>
            </div>
            <div class="flex gap-4 mb-4">
              <div class="flex-1">
                <label class="block text-gray-700 mb-1" for="expiryDate">Expiry Date (MM/YY)</label>
                <input
                  v-model="expiryDate"
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  aria-required="true"
                  :aria-invalid="isExpiryDateInvalid"
                  class="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#642E08]"
                />
                <span
                  v-if="isExpiryDateInvalid"
                  class="text-red-500 text-sm"
                  role="alert"
                >
                  Please enter a valid expiry date.
                </span>
              </div>
              <div class="flex-1">
                <label class="block text-gray-700 mb-1" for="cvv">CVV</label>
                <input
                  v-model="cvv"
                  type="tel"
                  id="cvv"
                  placeholder="CVV"
                  aria-required="true"
                  :aria-invalid="isCvvInvalid"
                  class="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#642E08]"
                />
                <span
                  v-if="isCvvInvalid"
                  class="text-red-500 text-sm"
                  role="alert"
                >
                  Please enter a valid CVV.
                </span>
              </div>
            </div>
          </form>
        </div>

        <!-- Donate Button -->
        <button
          @click="donate"
          class="w-full py-3 px-4 bg-[#642E08] text-white rounded-lg hover:bg-[#b89d77] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#642E08]"
          aria-label="Submit donation"
        >
          Donate
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'; 
import { db } from '../../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';

const story = ref({});
const route = useRoute();
const cardNumber = ref('');
const expiryDate = ref('');
const cvv = ref('');
const customAmount = ref('');

// Error states
const isDonationAmountInvalid = computed(() => {
  return customAmount.value <= 0;
});

const isCardNumberInvalid = computed(() => {
  // Simple validation: card number should be 13-19 digits
  const regex = /^\d{13,19}$/;
  return !regex.test(cardNumber.value);
});
const isExpiryDateInvalid = computed(() => {
  // Simple validation: MM/YY format
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return !regex.test(expiryDate.value);
});
const isCvvInvalid = computed(() => {
  // Simple validation: CVV is 3 or 4 digits
  const regex = /^\d{3,4}$/;
  return !regex.test(cvv.value);
});

const donate = () => {
  // Validate input fields
  if (isDonationAmountInvalid.value || isCardNumberInvalid.value || isExpiryDateInvalid.value || isCvvInvalid.value) {
    alert('Please ensure all fields are correctly filled.');
    return;
  }

  // Log payment details (In production, handle securely)
  console.log('Payment details submitted:', {
    title: story.value.title,
    amount: customAmount.value, // Use custom amount or selected amount
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
  customAmount.value = amount; // Reset custom amount when a preset amount is selected
};

onMounted(() => {
  fetchStoryDetails();
});
</script>

<style scoped>
@keyframes rotate {
  from {
    transform: rotate(-10deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}

.rotating-image {
  animation: rotate 0.5s ease-out;
  transform-origin: center;
}

/* Ensure focus styles are visible */
:focus {
  outline: 3px solid #642E08; /* Change color as needed */
}

/* Screen reader only class for descriptions */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap; /* added for consistency */
  word-wrap: normal; /* added for consistency */
}
</style>
