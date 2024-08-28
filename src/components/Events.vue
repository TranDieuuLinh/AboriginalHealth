<script setup>
import events from '../assets/json/events.json';
</script>

<template>
  <main>
    <div class="w-screen p-20 flex flex-col bg-black text-white">
      <!-- Title -->
      <p class="font-semibold text-xl font-serif my-5">Events</p>
      <div class="relative w-full">
        <div class="relative z-10">
          <div v-for="event in events" :key="event.id" class="mb-8 p-6 rounded-lg shadow-lg border  relative">
            <div class="absolute inset-0 rounded-lg"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between">
                <!-- Date Box -->
                <div class="flex flex-col items-center justify-center bg-[#6e3e3a] w-36 h-24 rounded-lg text-center">
                  <span class="text-4xl font-bold text-[#ffffff]">{{ event.day }}</span>
                  <span class="text-sm text-[#ffffff]">{{ event.month }}</span>
                </div>

                <!-- Event Details -->
                <div class="flex flex-col w-full p-2 ml-4">
                  <h3 class="text-2xl font-bold mb-2">
                    <a :href="event.url" class="hover:underline underline">{{ event.title }}</a>
                  </h3>
                  <!-- Location and Time on the Same Line -->
                  <div class="flex flex-row gap-5">
                  <div class="flex flex-col gap-2   text-sm">
                    <p class="flex items-center ">
                      <i class="fas fa-map-marker-alt mr-2"></i>{{ event.location }}
                    </p>
                    <p class="flex items-center">
                      <i class="fas fa-clock mr-2"></i>{{ event.time }}
                    </p>
                  </div>
                  
                  <!-- Cost and Number of People on the Same Line -->
                  <div class="flex flex-col gap-2 text-sm">
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
