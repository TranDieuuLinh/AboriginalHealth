<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
      <div class="flex-grow flex items-center justify-center ">
        <div class="flex flex-col shadow-lg rounded-lg p-6 bg-white max-w-xl w-full">
          <!-- Top: Image -->
          <div class="mb-6">
            <img :src="story.imageUrl" :alt="story.title" class="rounded-lg w-full h-auto object-cover" />
          </div>
  
          <!-- Title & Description -->
          <h1 class="text-2xl font-bold text-[#642E08] mb-4">{{ story.title }}</h1>
          <p class="text-gray-700 mb-6">{{ story.description }}</p>
  
        <!-- Donate Button -->
          <button
            @click="donate"
            class="w-full py-3 px-4 bg-[#642E08] text-white rounded-lg hover:bg-[#b89d77] transition-colors duration-300">
            Donate 
          </button>
        </div>
      </div>
    </div>
  </template>
    

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute,useRouter } from 'vue-router'; 
    import { db } from '../../firebaseConfig.js';
    import { doc, getDoc } from 'firebase/firestore';

    const story = ref({});
    const router = useRouter();
    const route = useRoute();
    const donate = () => {
    router.push({ name: 'DonateForm', query: { title: story.value.title } });
};


    const fetchStoryDetails = async () => {
    try {
        const storyDocRef = doc(db, 'donateStory', route.params.id); 
        const docSnap = await getDoc(storyDocRef);

        if (docSnap.exists()) {
        story.value = docSnap.data(); 
        } else {
        console.error('No document found!');
        }
    } catch (error) {
        console.error('Error fetching story details:', error);
    }
    };

    onMounted(() => {
    fetchStoryDetails();
    });
</script>