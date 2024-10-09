<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig.js';
  
  const event = ref([]);

  const fetchEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'events'));
    event.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Fetched events:', event.value);
  } catch (error) {
    console.error('Error fetching events: ', error);
  }
};

  
  onMounted(() => {
    fetchEvents();
  });
</script>

<template>
  <main>

    <div class="bg-[#6e3e3a] w-screen px-10 py-20 flex flex-col items-center">
      <!-- Title -->
      <p class="text-2xl font-medium font-serif text-white mb-12">
        Upcoming Events
      </p>
      <div class="relative w-full max-w-5xl">
        <div class="relative z-10">
          <div v-for="event in event" :key="event.id" class="mb-8 p-6 rounded-lg shadow-lg border opacity-100 border-[#6a3530] relative transition-transform transform hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-b from-[#f3e9e2] via-[#f0e6e6] to-[#f1e6d5] opacity-100 rounded-lg"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between">
                <!-- Date Box -->
                <div class="flex flex-col items-center justify-center shadow-lg bg-[#6e3e3a] w-36 h-24 rounded-lg text-center">
                  <span class="text-4xl font-bold text-[#ffffff]">{{ event.day }}</span>
                  <span class="text-sm text-[#ffffff]">{{ event.month }}</span>
                </div>

                <!-- Event Details -->
                <div class="flex flex-col w-full p-2 ml-5">
                  <h3 class=" font-bold mb-2">
                    <a :href="event.url" class="text-2xl font-bold text-[#b89d77] mb-2 ">{{ event.title }}</a>
                  </h3>
                  <!-- Location and Time on the Same Line -->
                  <div class="flex flex-row gap-5 ">
                  <div class="flex flex-col gap-2 text-black-200  text-sm">
                    <p class="flex items-center ">
                      <i class="fas fa-map-marker-alt mr-2"></i>{{ event.location }}
                    </p>
                    <p class="flex items-center">
                      <i class="fas fa-clock mr-2"></i>{{ event.time }}
                    </p>
                  </div>
                  
                  <!-- Cost and Number of People on the Same Line -->
                  <div class="flex flex-col gap-2 text-sm ">
                    <p class="flex items-center">
                      <i class="fas fa-dollar-sign mr-4"></i>{{ event.cost }}
                    </p>
                    <p class="flex items-center">
                      <i class="fas fa-users mr-2"></i>{{ event.number_of_people }} people
                    </p>
                  </div>
                </div>
                  <!-- Info Icon and Description -->
                  <div class="flex mt-2 text-sm">
                    <i class="fas fa-info-circle mt-1 mr-2"></i>
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
