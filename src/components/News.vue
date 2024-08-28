<script setup>
    import news from '../assets/json/news.json';
</script>

<template>
  <main>
    <div class=" md:px-8 lg:px-20 pt-20 ">
  <div class="flex flex-col ">
  
      <p class="font-semibold text-xl font-serif my-5 ">Articles</p>
      <div class="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <a
          v-for="(item, index) in news"
          :key="index"
          :href="item.url"
          class="text-[#642E08] p-4 md:p-6  rounded-lg shadow-lg flex flex-col text-md font-bold transition-colors duration-300"
          target="_blank">
          <div class="flex  overflow-hidden rounded-md mb-4 w-full h-48">
            <img :src="item.imgUrl" :alt="item.title" class="object-cover w-full h-full rounded-md" />
          </div>
          <p class="text-center">{{ item.title }}</p>
        </a>

    </div>
  </div>
</div>
  </main>
</template>

<style scoped>
</style>
