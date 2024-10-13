<script setup>
import { db } from '../../firebaseConfig.js';
import { ref, onMounted } from 'vue';
import { getDocs, collection } from 'firebase/firestore';

const articles = ref([]);

const getArticles = async () => {
  try {
    const article = [];
    const articleDocRef = collection(db, 'articles');
    const querySnapshot = await getDocs(articleDocRef);

    querySnapshot.forEach((doc) => {
      article.push(doc.data());
    });
    console.log('Fetched articles:', article);
    articles.value = article;
  } catch (error) {
    console.error('Error getting document: ', error);
    alert('Failed to get articles. ❌');
  }
};

onMounted(() => {
  getArticles();
});
</script>

<template>
  <main>
    <div class="md:px-8 lg:px-20 py-20">
      <div class="flex-grow">
        <p class="text-xl py-5 font-serif">Articles</p>
        <div class="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="each in articles"
            :key="each.title"
            class="text-[#642E08] p-4 md:p-6 rounded-xl shadow-lg flex flex-col text-md bg-[#f1e6d5]"
            role="article"
            aria-labelledby="article-title-{{ each.title }}"
            tabindex="0" 
          >
            <div class="flex overflow-hidden h-48 w-full">
              <img 
                :src="each.imageUrl" 
                class="w-full h-full object-cover" 
                :alt="`Image for article titled ${each.title}`" 
                loading="lazy"
              />
            </div>
            <h1 
              id="article-title-{{ each.title }}" 
              class="font-bold my-2"
            >
              <a 
                :href="each.articleUrl" 
                class="flex justify-center hover:underline "
                aria-label="Read more about {{ each.title }}"
              >
                {{ each.title }}
              </a>
            </h1>
            <div class="flex-grow"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
