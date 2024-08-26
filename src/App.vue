<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import {computed} from 'vue'

const route = useRoute()

const showNavbar = computed(() => {
    return route.path !== '/signup' && route.path !== '/login'
});
</script>

<template>
  <body class="flex flex-col">
    <div v-if="showNavbar" class=" sticky top-0 w-full flex flex-row justify-between items-center px-14 py-2.5">

      <span class="flex flex-row gap-2.5 text-gray-800 ">
        <RouterLink to="/" class="hover:text-gray-600 font-semibold" active-class="text-gray-400">HOME</RouterLink>
      </span>
      
      <span class="flex flex-row gap-2.5 text-gray-800">
        <RouterLink to="/signup" class="hover:text-gray-600" active-class="text-gray-400">SIGNUP</RouterLink>
      </span>

    </div>
    <RouterView class="mainbody"/>
  </body>
</template>

<style scoped>

</style>
