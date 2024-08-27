<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <div v-if="showNavbar" class="sticky top-0 w-full flex flex-row justify-between items-center px-8 py-5 bg-black text-neutral-200 z-10">
      <span class="flex flex-row gap-2.5">
        <RouterLink to="/" class="hover:text-gray-600 font-semibold logoTitle">HealingCountry</RouterLink>
      </span>

      <span v-if="displayUserContent"  class="gap-3 flex flex-row">
        <RouterLink to="/" class="hover:text-gray-600 font-semibold" active-class="text-stone-300">HOME</RouterLink>
        <i class="fas fa-bars mt-0.5 text-xl cursor-pointer" @click="toggleSidebar"></i>
      </span>
      <span v-else class="flex flex-row gap-2.5">
        <RouterLink to="/login" class="hover:text-gray-600" active-class="text-stone-600">Login</RouterLink>
        <RouterLink to="/signup" class="hover:text-gray-600" active-class="text-stone-600">Signup</RouterLink>
      </span>
    </div>

    <!-- Sidebar -->
    <div :class="sidebarClass" class="fixed top-0 right-0 w-60 h-full bg-black text-white z-20">
      <button @click="toggleSidebar" class="absolute top-2 right-2 text-white text-2xl">&times;</button>
      <div class="p-4">
        <div class="flex flex-col items-center my-16">
          <p class="text-xl font-semibold">{{ userName }}</p>
          <p class="text-gray-400">{{ userRole }}</p>
          <p class="text-gray-400">{{ userEmail }}</p>
        </div>
        <div>
          <ul>
            <li><RouterLink to="/events" @click="toggleSidebar" class="hover:text-gray-400"> <i class="fas fa-calendar-alt mr-2"></i> Events</RouterLink></li>
            <li><RouterLink to="/fundraising" @click="toggleSidebar" class="hover:text-gray-400"><i class="fas fa-hand-holding-heart mr-2"></i>Fundraising</RouterLink></li>
            <li><RouterLink to="/health" @click="toggleSidebar" class="hover:text-gray-400"><i class="fas fa-medkit mr-2"></i>Health</RouterLink></li>
            <li><button @click="showReviewBox = true" class="hover:text-gray-400 ml-2 mt-4"><i class="fas fa-star-half-alt mr-2"></i>Rate Us</button></li>
            <li><button @click="logout" class="ml-3 mt-5 text-red-500"><i class="fas fa-sign-out-alt mr-2"></i>Log out</button></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Review Box -->
    <ReviewBox v-show="showReviewBox" @close="showReviewBox = false" />


    <!-- Main content area -->
    <RouterView class="flex-1" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import '@fortawesome/fontawesome-free/css/all.css';
import ReviewBox from './components/ReviewBox.vue';

const route = useRoute();
const router = useRouter();
const userRole = ref('guest');
const showSidebar = ref(false);
const userName = ref(' ');
const userEmail = ref(' ');
const showReviewBox = ref(false);

const showNavbar = computed(() => {
  return route.path !== '/signup' && route.path !== '/login';
});

onMounted(() => {
  userRole.value = localStorage.getItem('userRole') || 'guest';
  userName.value = localStorage.getItem('userName');
  userEmail.value = localStorage.getItem('userEmail');
});

const displayUserContent = computed(() => {
  return userRole.value === 'admin' || userRole.value === 'general user';
});

const logout = () => {
  userRole.value = 'guest';
  localStorage.removeItem('userRole');
  router.push('/');
};

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

const sidebarClass = computed(() =>{
  return showSidebar.value? 'sidebar-open sidebar' : 'sidebar'
});
</script>

<style scoped>
.logoTitle {
  font-family: 'Times New Roman', Times, serif;
  font-size: 20px;
}

.sidebar {
  transition: transform 0.3s ease;
  transform: translateX(100%);
}

.sidebar-open {
  transform: translateX(0%);
}



.sidebar a {
  text-decoration: none;
  color: white;
  display: block;
  padding: 10px;
}
</style>
