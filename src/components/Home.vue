<template>
  <div class="relative w-screen h-screen">
    <!-- Hero Section -->
          <div class="relative w-screen h-full">
            <img src="../assets/attentionHomeImg.png" alt="Image" class="absolute w-full h-full object-cover" />
            <div class="absolute inset-0 flex flex-col items-center justify-between p-4">
              <div class="flex flex-col items-center justify-center flex-grow mt-40">
                <p class="text-white text-center font-popping font-black text-4xl md:text-5xl">
                  Healing Our History <br />Strengthening Our Future
                </p>
              </div>
              <div class="mb-[8rem]">
                <button type="submit" class="bg-[#68251D]  text-white text-lg  py-3 px-14 font-serif rounded-lg">
                  Give Today
                </button>
              </div>
            </div>
          </div>


          <div class="px-4 md:px-8 lg:px-40 py-20">
  <div class="flex justify-center items-center">
    <div class="bg-[#f1e6d5] p-6 md:p-10 lg:p-10 rounded-3xl border-b-4 border-[#824640]">
      <p class="text-center font-semibold text-2xl md:text-3xl lg:text-4xl font-serif mb-5 text-gray-800">Highlight Articles</p>
      <div class="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="(item, index) in limitedNews"
          :key="index"
          :href="item.url"
          :class="{'col-span-1': item.span !== 2, 'lg:col-span-2': item.span === 2}"
          class="text-[#642E08] p-4 md:p-6 bg-[#f1e6d5] rounded-lg shadow-lg border-b-2 border-[#824640] flex flex-col items-center justify-center text-md font-bold transition-colors duration-300"
          target="_blank">
          <div class="flex items-center justify-center overflow-hidden border-b-4 border-[#824640] rounded-md mb-4 w-full h-48">
            <img :src="item.imgUrl" :alt="item.title" class=" object-cover w-full h-full rounded-md" />
          </div>
          <p class="text-center">{{ item.title }}</p>
        </a>
      </div>
    </div>
  </div>
</div>










  <div class="bg-[#6e3e3a] w-screen px-10 py-20 flex flex-col items-center">
  <!-- Title -->
  <h2 class="text-4xl font-medium font-serif text-white mb-12">
    Upcoming Events of  Aboriginal Community
  </h2>
  <div class="relative w-full max-w-4xl">
    <div class="relative z-10">
      <div v-for="event in limitedEvents" :key="event.id" class="mb-8 p-6 rounded-lg shadow-lg border relative">
        <div class="absolute inset-0 bg-gradient-to-b from-[#f3e9e2] via-[#f0e6e6] to-[#f1e6d5] opacity-100 rounded-lg"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between">
            <!-- Date Box -->
            <div class="flex flex-col items-center justify-center bg-[#6e3e3a] w-36 h-24 rounded-lg text-center">
              <span class="text-4xl font-bold text-[#ffffff]">{{ event.day }}</span>
              <span class="text-sm text-[#ffffff]">{{ event.month }}</span>
            </div>

            <!-- Event Details -->
            <div class="flex flex-col w-full p-2 ml-4">
              <h3 class="text-2xl font-bold text-[#b89d77] mb-2">
                <a :href="event.url" class="hover:underline">{{ event.title }}</a>
              </h3>
              <!-- Location and Time on the Same Line -->
              <div class="flex items-center mb-2 text-[#444444] text-sm">
                <p class="flex items-center mr-8">
                  <i class="fas fa-map-marker-alt mr-2"></i>{{ event.location }}
                </p>
                <p class="flex items-center">
                  <i class="fas fa-clock mr-2"></i>{{ event.time }}
                </p>
              </div>
              <!-- Info Icon and Description -->
              <div class="flex items-start text-[#444444] text-sm">
                <i class="fas fa-info-circle mr-2"></i>
                <p>{{ event.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Read More Button -->
      <div class="flex justify-end mt-10">
        <RouterLink to="/newsEvents" class="px-6 py-2 text-white font-semibold transition-transform transform hover:scale-105 ">
          More Events →
        </RouterLink>
      </div>
    </div>
  </div>
</div>


    
    <!-- Reviews Section -->
    <div class="w-full flex flex-col items-center py-28">
      <div class="flex flex-col items-center mb-6">
        <hr class="bg-[#882B2B] h-3 w-80 rounded-lg" />

  </div>
      <h2 class="text-5xl font-bold text-center font-serif mb-8">What do active platform <br />users say about us</h2>
      <div class="rounded-lg p-4 mb-8 w-full max-w-4xl">
        <p class="text-lg text-gray-500 font-semibold text-center font-serif">
          <span>Average Rating: {{ averageTotalReviews }}/5 based on {{ countTotalReviews }} reviews</span>
        </p>
      </div>
      <div class="w-full px-5">
        <div class="overflow-x-auto flex no-scrollbar">
          <!-- Review Box -->
          <div v-for="user in generalUserRole" :key="user.email" class=" flex-shrink-0 w-80 bg-white shadow-lg rounded-lg p-4 border  border-b-4 border-[#824640] mr-4 relative flex flex-col">
            <div class="flex flex-col items-center  flex-grow gap-3">
              <div class=" w-12 h-12 bg-gray-200 mt-2 rounded-full flex items-center justify-center border border-gray-300">
              <p class="text-gray-600 text-3xl">🐥</p>
            </div>
              <p class="text-md font-bold mb-1">{{ user.name }}</p>
              <div class="flex mb-2">
                <i v-for="n in Math.floor(user.rating)" :key="n" class="fas fa-star"></i>
              </div>
              <p class="text-md text-center">{{ user.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    







  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

</style>

<script setup>
import { computed } from 'vue';
import accounts from '../assets/json/accounts.json';
import events from '../assets/json/events.json';
import news from '../assets/json/news.json';


const generalUserRole = computed(() => {
  return accounts.filter((account) => account.role === "general user");
});

const countTotalReviews = computed(() => {
  return generalUserRole.value.length;
});

const averageTotalReviews = (function() {
  const totalRating = generalUserRole.value.reduce((sum, user) => sum + user.rating, 0);
  return (totalRating / countTotalReviews.value) || 0; // Avoid division by zero
})();

const limitedEvents = computed(() => events.slice(0,3));
const limitedNews = computed(() => news.slice(0, 5));
</script>
