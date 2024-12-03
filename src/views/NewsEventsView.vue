<script setup>
import News from '../components/News.vue'
import Events from '../components/Events.vue'
</script>

<template>
  <main class="bg-[#f1e6d5]">
    <div class="py-40 text-center font-serif">
  <!-- Main Heading -->
  <h1 class="text-3xl font-bold mb-8 xs:text-base sm:text-xl md:text-2xl lg:text-3xl">
    Welcome to Our News & Events Page
  </h1>
  
  <!-- Subheading -->
  <p class="text-md mb-6 xs:text-sm sm:text-base md:text-lg lg:text-md">
    A Hub for Knowledge, Health, and Community Bonding
  </p>

  <!-- News Section -->
  <div class="flex flex-col items-center mb-10">
    <!-- Icon and Title -->
    <div class="flex items-center mb-4">
      <i class="fas fa-newspaper text-xl text-[#82502d] mr-2 xs:text-sm sm:text-lg md:text-xl lg:text-xl"></i>
      <h2 class="text-lg font-semibold xs:text-sm sm:text-base md:text-lg lg:text-lg">
        Stay Informed with the Latest News
      </h2>
    </div>
    <!-- Description -->
    <p class="mx-auto text-gray-700 xs:text-xs sm:text-sm md:text-base lg:text-md max-w-3xl">
      In our <strong>News</strong> section, we offer a carefully curated selection of articles and updates designed to broaden your understanding of key issues, with a special focus on topics that impact Aboriginal people and communities. From the latest health research and cultural preservation initiatives to stories that highlight community achievements, this section empowers you with the information needed to stay connected to the world around you.
    </p>
  </div>

  <!-- Events Section -->
  <div class="flex flex-col items-center">
    <!-- Icon and Title -->
    <div class="flex items-center mb-4">
      <i class="fas fa-users text-xl text-[#82502d] mr-2 xs:text-sm sm:text-lg md:text-xl lg:text-xl"></i>
      <h2 class="text-lg font-semibold xs:text-sm sm:text-base md:text-lg lg:text-lg">
        Upcoming Events for Connection & Healing
      </h2>
    </div>
    <!-- Description -->
    <p class="mx-auto text-gray-700 xs:text-xs sm:text-sm md:text-base lg:text-md max-w-3xl">
      Our <strong>Events</strong> section is where we spotlight opportunities to come together, build relationships, and strengthen bonds within the Aboriginal community. Featuring a range of cultural, educational, and health-related activities, these events provide the perfect chance to connect, share knowledge, and create lasting memories. Whether it's a local health initiative aimed at improving well-being, cultural gatherings to celebrate traditions, or workshops designed to foster learning, we believe that these events are vital for maintaining a sense of belonging and solidarity.
    </p>
  </div>
</div>

    <Events/>
    <News/>
  </main>
</template>

<style scoped>
/* Add any additional styles you want to enhance the look */
</style>
