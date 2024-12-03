<template>
  <div>
    <!-- Hero Section -->
    <div class="relative w-screen h-screen">
      <img
        src="../assets/attentionHomeImg.png"
        alt="A serene landscape representing healing and community"
        class="absolute w-full h-full object-cover"
      />
      <div class="absolute inset-0 flex flex-col items-center justify-between p-4 flex-wrap">
        <div class="flex flex-col items-center justify-center flex-grow mt-40">
          <p class="text-white text-center font-popping font-black xs:font-sans text-4xl md:text-5xl xs:text-lg">
            Healing Our History <br />Strengthening Our Future
          </p>
        </div>
        <div class="mb-[8rem]">
          <button
            type="submit"
            class="bg-[#68251D] text-white text-lg py-3 px-14 xs:px-10 font-serif rounded-lg xs:text-sm"
            aria-label="Donate Now"
          >
            Give Today
          </button>
        </div>
      </div>
    </div>

    <!-- Highlight Articles Section -->
    <div class="flex flex-col justify-between mt-auto gap-2 p-8 md:p-12 lg:p-20">
      <div class="bg-white shadow-lg rounded-lg p-8 md:p-12 lg:p-16 border border-[#824640]">
        <p class="text-center font-semibold text-xl md:text-2xl lg:text-3xl font-serif mb-8 text-gray-800">
          Highlight Articles
        </p>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <a
            v-for="(item, index) in articles"
            :key="index"
            :href="item.articleUrl"
            :class="{
              'col-span-1': item.spanHighlight === 1,
              'lg:col-span-2': item.spanHighlight === 2,
              'lg:col-span-3': item.spanHighlight === 3
            }"
            class="text-[#000000] hover:bg-[#b89d77] text-md lg:text-xl font-serif p-4 md:p-6 bg-[#fefdfd] rounded-lg shadow-lg border-b-1 flex flex-col justify-between transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read article: {{ item.title }}"
          >
            <div class="flex items-center justify-center overflow-hidden border-b-1 rounded-md mb-4 w-full h-36">
              <img
                :src="item.imageUrl"
                :alt="item.title"
                class="object-cover w-full h-full rounded-md"
              />
            </div>
            <p class="text-center font-semibold mt-2 xs:text-xs lg:text-base">{{ item.title }}</p>
          </a>
        </div>
      </div>
    </div>


     <!-- Upcoming Events Section -->
    <div class="bg-[#6e3e3a] w-screen lg:px-10 px-10 py-20 xs:px-2 flex flex-col items-center flex-wrap">
      <!-- Title -->
      <p class="md:text-2xl text-2xl sm:text-base xs:text-base font-medium font-serif text-white mb-12">
        Upcoming Highlight Events of Aboriginal Community
      </p>
      <div class="relative w-full max-w-5xl">
        <div class="relative z-10">
          <div
            v-for="event in events"
            :key="event.id"
            class="mb-8 p-6 rounded-lg shadow-lg border opacity-100 border-[#6a3530] relative transition-transform transform hover:scale-105"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-[#f3e9e2] via-[#f0e6e6] to-[#f1e6d5] opacity-100 rounded-lg"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between">
                <!-- Date Box -->
                <div class="flex flex-col items-center justify-center bg-[#b89d77] w-36 h-24 rounded-lg text-center" aria-label="Event Date">
                  <span class="md:text-4xl text-4xl xs:text-sm font-bold text-white">{{ new Date(event.date).getDate() }} </span>
                  <span class="md:text-sm text-sm xs:text-xs text-white">{{ new Date(event.date).toLocaleString('default', { month: 'short' }) }}, {{ new Date(event.date).getFullYear() }} </span>
                </div>

                <!-- Event Details -->
                <div class="flex flex-col w-full p-2 ml-5">
                  <h3 class="font-bold mb-2">
                    <a
                      :href="event.url"
                      class="md:text-2xl text-2xl xs:text-base font-bold text-[#3d3c39] mb-2 hover:underline"
                      aria-label="Event: {{ event.title }}"
                    >
                      {{ event.title }}
                    </a>
                  </h3>
                  <!-- Location and Time on the Same Line -->
                  <div class="flex sm:flex-row xs:flex-col md:gap-5 xs:gap-3">
                    <div class="flex flex-col gap-2 text-black-200 lg:text-sm text-sm xs:text-xs">
                    <p class="flex items-center">
                      <i class="fas fa-map-marker-alt mr-2" aria-hidden="true"></i>
                      <router-link 
                        :to="{ 
                          name: 'map', 
                          params: { id: event.id }, 
                          query: { location: event.location } 
                        }" 
                        class="text-red-900 hover:underline"
                        aria-label="Location">
                        {{ event.location }}
                      </router-link>
                    </p>

                    <p class="flex items-center lg:text-sm text-sm xs:text-xs">
                      <i class="fas fa-clock mr-2" aria-hidden="true"></i>
                      <span class="sr-only">Time:</span>{{ event.startTime }} - {{ event.endTime }}
                    </p>
                  </div>

                    <!-- Cost and Number of People on the Same Line -->
                    <div class="flex flex-col gap-2 lg:text-sm text-sm xs:text-xs">
                      <p class="flex items-center" aria-label="Cost: {{ event.cost }}">
                        <i class="fas fa-dollar-sign mr-4" aria-hidden="true"></i>{{ event.cost }}
                      </p>
                      <p class="flex items-center" aria-label="Number of People: {{ event.number_of_people }}">
                        <i class="fas fa-users mr-2" aria-hidden="true"></i>{{ event.number_of_people }} people
                      </p>
                    </div>
                  </div>
                  <!-- Info Icon and Description -->
                  <div class="flex mt-2 lg:text-sm text-sm xs:text-xs">
                    <i class="fas fa-info-circle mt-1 mr-2" aria-hidden="true"></i>
                    <p>{{ event.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-10">
            <RouterLink
              to="/newsEvents"
              class="px-6 py-2 text-white font-semibold transition-transform transform hover:scale-105"
              aria-label="View more events"
            >
              More Events →
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    

     <!-- Reviews Section -->
     <div class="w-full flex flex-col items-center py-28">
  <div class="flex flex-col items-center mb-6">
    <hr class="bg-[#882B2B] lg:h-3 h-3 sm:h-1 xs:h-1 w-80 rounded-lg" />
  </div>
  <h2 class="text-5xl lg:text-5xl font-bold text-center font-serif mb-8 sm:text-lg xs:text-lg">
    What do active platform <br />users say about us
  </h2>
  
  <div v-if="averageTotalReviews > 0" class="w-full max-w-7xl text-center">
    <div class="rounded-lg p-4 mb-8">
      <p class="text-lg xs:text-sm lg:text-lg  text-gray-500 font-semibold font-serif">
        <span>Average Rating: {{ averageTotalReviews }}/5 based on {{ generalUsers.length }} reviews</span>
      </p>
    </div>
        <div class="w-full px-5">
          <div class="overflow-x-auto flex no-scrollbar">
            <div
              v-for="user in generalUsers"
              :key="user.email"
              class="flex-shrink-0 w-80 md:w-80 xs:w-64 bg-white shadow-lg rounded-lg p-4 border border-b-4 border-[#824640] mr-4 relative flex flex-col"
            >
              <div class="flex flex-col items-center flex-grow gap-1">
                <div class="w-12 h-12 bg-gray-200 mt-2 rounded-full flex items-center justify-center border border-gray-300">
                  <p class="text-gray-600 text-3xl">🐥</p>
                </div>
                <p class="text-md font-bold">{{ user.name }}</p>
                <p class="text-sm text-slate-500 font-bold mb-5">{{ user.email }}</p>
                <div class="flex mb-2">
                  <i
                    v-for="n in Math.floor(user.rating)"
                    :key="n"
                    class="fas fa-star"
                    aria-hidden="true"
                  ></i>
                </div>
                <p class="text-md text-center">{{ user.comment }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
  <div class="text-center flex-shrink-0 w-100 bg-white shadow-lg rounded-lg p-4 border border-b-4 border-[#824640] mr-4 relative flex flex-col items-center">
    <p class="text-xl font-bold text-gray-600 mb-2">No Reviews Yet</p>
    <p class="text-md text-slate-500 mb-5">Be the first to share your experience with us!</p>
    <p class="text-md text-gray-500">We value your feedback and would love to hear from you.💓💓</p>
    <button @click="showReviewBox = true" class="bg-[#68251D] text-white text-md py-2 px-6 mt-6 rounded-lg font-serif hover:bg-[#824640] transition duration-300">
      Leave a Review
    </button>
  </div>
</div>
<ReviewBox v-show="showReviewBox" @close="showReviewBox = false" />
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>

<script setup>
import { onMounted, ref } from 'vue';
import { db } from '../../firebaseConfig.js';
import { query, getDocs, collection, where, onSnapshot } from '@firebase/firestore';
import ReviewBox from './ReviewBox.vue';

const articles = ref([]);
const events = ref([]);
const showReviewBox = ref(false);

const getEvents = async () => {
  try {
    const eventArray = [];
    const eventsDocRef = collection(db, 'events');
    const q = query(eventsDocRef, where('isHighlighted', '==', true));
    const querySnapshot = await getDocs(q);

    console.log('QuerySnapshot:', querySnapshot); 

    querySnapshot.forEach((doc) => {
      eventArray.push({ id: doc.id, ...doc.data() });
    });

    console.log('Fetched events:', eventArray); 
    events.value = eventArray;
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
};

const getArticles = async () => {
  try {
    const article = [];
    const articleDocRef = collection(db, 'articles');
    const q = query(articleDocRef, where('spanHighlight', '>', 0));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      article.push(doc.data());
    });
    
    console.log('Fetched articles:', article); 
    articles.value = article;
    
  } catch (error) {
    console.error('Error getting documents: ', error);
    alert('Failed to get highlight articles. ❌');
  }
};


// Define reactive variables
const generalUsers = ref([]);
const averageTotalReviews = ref(0);

// Fetch user comments from Firestore and update the average rating
const usersComments = () => {
  const q = query(
    collection(db, 'usersAccount'),
    where('role', '==', 'user'),
    where('comment', '!=', '')
  );

  // Set up a real-time listener
  onSnapshot(q, (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    generalUsers.value = users;

    // Compute average rating after fetching the data
    const totalRating = users.reduce((sum, user) => sum + parseFloat(user.rating || 0), 0);
    averageTotalReviews.value = users.length > 0 ? (totalRating / users.length).toFixed(1) : 0;
  }, (error) => {
    console.error('Error getting documents: ', error);
  });
};

// Call the function on component mount
onMounted(() => {
  usersComments();
  getArticles();
  getEvents();
});
</script>
