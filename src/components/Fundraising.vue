<template>
    <div class="flex flex-col min-h-screen bg-[#f1e6d5]">
      <div class="flex-grow">
        <!-- Main content -->
        <div class="flex flex-col w-screen mt-10 px-4 md:px-10">
          <div class="flex flex-col md:flex-row items-center">
            <div class="rotating-image">
              <img class="w-[10em] md:w-[20em] mt-10" src="../assets/fundLogo.png" />
            </div>
            <div class="pt-4 md:pt-10 leading-snug text-[#626161] font-thin w-full md:w-3/4 text-center md:text-left">
              <div >
                <hr class="my-5 border-t-1 border-gray-600" />
                <h1 class="text-sm md:text-xl italic">
                  " Our Highest Ambition is to Help Bridge the Gap Between Indigenous and Non-Indigenous Communities ✿
                </h1>
                <p class="pt-2 text-xs md:text-sm font-sans">
                  With just one gift, you are changing lives and inspiring hope to heal this country.
                </p>
                <hr class="my-5 border-t-1 border-gray-600" />
              </div>
            </div>
          </div>

          <div class="mt-10 rounded-xl overflow-hidden mx-auto" style="width: 60%;"  v-for="each in ourStory" :key="each.description">
            <!-- Highlight Picture Section -->
            <hr class="my-10 border-t-1 border-gray-600" />
            <div class="relative">
              <img :src ="each.imageUrl" alt="Highlight" class=" object-cover">
              <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white p-4">
                <h1 class="text-2xl">Our Success Story</h1>
              </div>
            </div>
            <hr class="my-10 border-t-1 border-gray-600" />
            <div class="px-4">
              <p class="text-gray-700">
                {{ each.description }}
              </p>
            </div>
            <hr class="my-10 border-t-1 border-gray-600" />
          </div>
        </div>
      </div>
  
      <div class=" md:px-10 lg:px-20 py-10 mb-10">
  <div class="flex flex-col ">
    <p class="font-semibold text-xl font-serif my-5 ">Donate Now</p>
      <div class="grid grid-cols-1 gap-5 md:gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <router-link
          v-for="item in donationStories"
          :key="item.title"
          :to="{name: 'detail', params:{id:item.title}}"
          class="text-[#642E08] p-4 md:p-6  rounded-lg shadow-lg flex flex-col text-md hover:bg-[#b89d77]"
          target="_blank">
          <div class="flex  overflow-hidden rounded-md mb-4 w-full h-48 ">
            <img :src="item.imageUrl" :alt="item.title" class="object-cover w-full h-full rounded-md" />
          </div>
          <h1 class="font-semibold">{{ item.title }}</h1>
        </router-link>
        
    </div>
  </div>
</div>
    </div>
  </template>
  <script setup>
    import { db } from '../../firebaseConfig.js';
  import { ref, onMounted } from 'vue';
  import { getDocs, collection} from 'firebase/firestore';

  const ourStory = ref([]);
  const donationStories = ref([]);

  const getOurStory = async() =>{
    
    try{
    const story = [];
    const storyDocRef = collection(db,'ourStory');
    const querySnapshot = await getDocs(storyDocRef);

    querySnapshot.forEach((doc) => {
      story.push(doc.data());
    });
    console.log('Fetched our story:', story); 
    ourStory.value = story;
    
  }
  catch (error) {
      console.error('Error getting document: ', error);
      alert('Failed to get our story. ❌');
    }
  };

  const getDonationStories = async() =>{
    
    try{
    const story = [];
    const storyDocRef = collection(db,'donateStory');
    const querySnapshot = await getDocs(storyDocRef);

    querySnapshot.forEach((doc) => {
      story.push(doc.data());
    });
    console.log('Fetched donate stories:', story); 
    donationStories.value = story;
    
  }
  catch (error) {
      console.error('Error getting document: ', error);
      alert('Failed to get donate stories. ❌');
    }
  };

  onMounted(() => {
    getOurStory();
    getDonationStories();
  });
</script>
  <style scoped>
  @keyframes rotate {
    from {
      transform: rotate(-10deg);
      opacity: 0;
    }
    to {
      transform: rotate(0deg);
      opacity: 1;
    }
  }
  
  .rotating-image {
    animation: rotate 0.5s ease-out;
    transform-origin: center;
  }
  
  
  </style>
  