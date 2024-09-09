<template>
  <div class="flex flex-col h-screen">
    <!-- Typing Effect -->
    <div
      ref="typedElement"
      v-show="!showIntro"
      :class="{'animate-up': isAnimating}"
      class="flex flex-col items-center justify-center flex-grow px-6 md:px-12 bg-black text-center cursor-pointer transition-opacity duration-200"
    >
      <p class="text-md md:text-xl font-light mb-8 max-w-2xl text-gray-100 typing"></p>
      <button 
        v-if="showButton" 
        @click="arrowAnimation" 
        :class="{'animate-up': isAnimating}"
        class="mt-4 py-2 px-4 rounded-full text-3xl bg-white text-red-700"
      >
        ↑
      </button>
    </div>

    <div v-if="showIntro">
      <!-- Navbar -->
      <div v-if="showNavbar" class="bg-black fixed w-full text-[#e6e6e6] flex flex-row justify-between items-center px-8 py-5 z-20">
        <span class="flex flex-row gap-2.5">
          <h1 class="font-thin logoTitle">HealingCountry</h1>
        </span>
        <span class="flex flex-row gap-4" v-if="displayAdminContent">
          <RouterLink to="/adminHome" class="hover:text-gray-600 font-semibold" active-class="text-stone-300">Home</RouterLink>
          <RouterLink to="/addNews" class="hover:text-gray-600 font-semibold" active-class="text-stone-300">News</RouterLink>
          <RouterLink to="/addEvents" class="hover:text-gray-600 font-semibold" active-class="text-stone-300">Events</RouterLink>
          <RouterLink to="/addFundStory" class="hover:text-gray-600 font-semibold" active-class="text-stone-300">Fundraising</RouterLink>
          <button @click="logout" class="text-red-500 flex items-center">Logout</button>
        </span>
        <span v-else>
          <span v-if="displayUserContent" class="gap-3 flex flex-row items-center">
            <RouterLink to="/" class="hover:text-gray-600 font-semibold" active-class="text-stone-300">HOME</RouterLink>
            <i class="fas fa-bars mt-0.5 text-xl cursor-pointer" @click="toggleSidebar"></i>
          </span>
          <span v-else class="flex flex-row gap-4 items-center">
            <RouterLink to="/login" class="hover:text-gray-600" active-class="text-stone-600">Login</RouterLink>
            <RouterLink to="/signup" class="hover:text-gray-600" active-class="text-stone-600">Signup</RouterLink>
            <i class="fas fa-bars mt-0.5 text-xl cursor-pointer" @click="toggleSidebar"></i>
          </span>
        </span>
      </div>

      <!-- Sidebar -->
      <div :class="sidebarClass" class="fixed top-0 right-0 w-60 h-full bg-black text-white z-40">
        <button @click="toggleSidebar" class="absolute top-2 right-2 text-2xl">&times;</button>
        <div class="p-4">
          <div class="flex flex-col items-center my-16">
            <p class="text-xl font-semibold">{{ userName }}</p>
            <p class="text-gray-400">{{ userRole }}</p>
            <p class="text-gray-400">{{ userEmail }}</p>
          </div>
          <div>
            <ul class="space-y-2">
              <li><RouterLink to="/" @click="toggleSidebar" class="hover:text-gray-400 flex items-center ml-5 mt-5"><i class="fas fa-home mr-2"></i> Home</RouterLink></li>
              <li><RouterLink to="/newsEvents" @click="toggleSidebar" class="hover:text-gray-400 flex items-center ml-5 mt-5"><i class="fas fa-calendar-alt mr-2"></i> News & Events</RouterLink></li>
              <li><RouterLink to="/fundraising" @click="toggleSidebar" class="hover:text-gray-400 flex items-center ml-5 mt-5"><i class="fas fa-hand-holding-heart mr-2"></i> Fundraising</RouterLink></li>
              <li><button @click="showReviewBox = true" class="hover:text-gray-400 flex items-center ml-5 mt-5"><i class="fas fa-star-half-alt mr-2"></i> Rate Us</button></li>
              <li v-if="displayUserContent"><button @click="logout" class="ml-5 mt-5 text-red-500 flex items-center"><i class="fas fa-sign-out-alt mr-2"></i> Log out</button></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Review Box -->
      <ReviewBox v-show="showReviewBox" @close="showReviewBox = false" />

      <!-- Main content area -->
      <main class="flex-grow pt-10">
        <RouterView class="p-0 m-0"/>
      </main>
    </div>

    <!-- Footer -->
    <footer  v-if="showNavbar" class="bg-black text-[#fff] py-4">
      <div class="w-full mx-2 max-w-screen-xl p-4 flex ">
        <div class="md:text-sm text-xs">
          © 2024 Healing Country. All Rights Reserved.
        </div>
      </div>
    </footer>


  </div>
</template>



<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import '@fortawesome/fontawesome-free/css/all.css';
import ReviewBox from './components/ReviewBox.vue';
import Typed from 'typed.js';

const route = useRoute();
const router = useRouter();
const userRole = ref('Guest');
const showSidebar = ref(false);
const userName = ref(' ');
const userEmail = ref(' ');
const showReviewBox = ref(false);
const showIntro = ref(false);
const showButton = ref(false);
const isAnimating = ref(false); 
const typedElement = ref(null);

const showNavbar = computed(() => {
  return route.path !== '/signup' && route.path !== '/login';
});

onMounted(() => {
  userRole.value = localStorage.getItem('userRole') || 'Guest';
  userName.value = localStorage.getItem('userName');
  userEmail.value = localStorage.getItem('userEmail');

  if (userRole.value === 'admin' && route.path === '/'){
    router.push('/adminHome')
  }

  const hasShownTypingEffect = localStorage.getItem('hasShownTypingEffect');
  if (hasShownTypingEffect) {
    showIntro.value = true;
  } else {
    const options = {
      strings: ['From 2020 to 2022, First Nations Australians faced an 8.8-year life expectancy gap. Males lived 71.9 years and females 75.6 years—let’s close this gap together.'],
      typeSpeed: 20,
      onComplete: () => {
        showButton.value = true;
        localStorage.setItem('hasShownTypingEffect', 'true');
      }
    };
    new Typed(typedElement.value.querySelector('.typing'), options);
  }
});

const arrowAnimation = () => {
  isAnimating.value = true; // Start the first animation

  setTimeout(() => {
    showIntro.value = true;  
    isAnimating.value = false; 
  }, 2000); 
};

const displayUserContent = computed(() => {
  return  userRole.value === 'user';
});

const displayAdminContent = computed(() => {
  return  userRole.value === 'admin';
});

const logout = () => {
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  router.push('/').then(() =>{router.go(0)});
};

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

const sidebarClass = computed(() => {
  return showSidebar.value ? 'transform translate-x-0' : 'transform translate-x-full';
});
</script>

<style scoped>
.logoTitle {
  font-family: 'Times New Roman', Times, serif;
  font-size: 20px;
}

/* First Animation - Moving up */
@keyframes flyUp {
  from {
    transform: translateY(0);
    opacity: 1; /* Keep consistent opacity */
  }
  to {
    transform: translateY(-100%);
    opacity: 1; /* No fade */
  }
}

.animate-up {
  animation: flyUp 2s ease-in-out forwards; /* Smooth transition */
  filter: none;
  transition: none;
}
</style>
