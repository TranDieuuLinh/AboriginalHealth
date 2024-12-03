<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs} from 'firebase/firestore';
import { db } from '../../firebaseConfig.js';
import { useRouter } from 'vue-router';
  
  const event = ref([]);
  const router = useRouter();

  const fetchEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'events'));
    event.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Fetched events:', event.value);
  } catch (error) {
    console.error('Error fetching events: ', error);
  }
};

const subscribe = (event) => {
  router.push({ name: 'Booking', params: { eventId: event.id } });
};

  
  onMounted(() => {
    fetchEvents();
  });
</script>

<template>
  <main id="mainContent" role="main" aria-label="Upcoming Events">
  <div class="bg-[#6e3e3a] w-screen lg:px-10 px-10 py-20 xs:px-2  flex flex-col items-center">
    <!-- Title -->
    <p class="text-2xl font-medium font-serif text-white mb-12">Upcoming Events</p>
    <div class="relative w-full max-w-5xl">
      <div class="relative z-10">
          <div
            v-for="event in event"
            :key="event.id"
            class="mb-8 p-6 rounded-lg shadow-lg border opacity-100 border-[#6a3530] relative transition-transform transform hover:scale-105"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-[#f3e9e2] via-[#f0e6e6] to-[#f1e6d5] opacity-100 rounded-lg"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between">
                <!-- Date Box -->
                <div class="flex flex-col items-center justify-center bg-[#b89d77] w-36 h-24 rounded-lg text-center" aria-label="Event Date">
                  <span class="md:text-4xl text-4xl xs:text-lg font-bold text-white">{{ new Date(event.date).getDate() }} </span>
                  <span class="md:text-sm text-sm xs:text-sm text-white">{{ new Date(event.date).toLocaleString('default', { month: 'short' }) }}, {{ new Date(event.date).getFullYear() }} </span>
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
        </div>
    </div>
  </div>
  
</main>

</template>

<style scoped>
/* Ensure consistent spacing and alignment for icons and text */

</style>
