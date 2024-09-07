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

          <div class="mt-10 rounded-xl overflow-hidden mx-auto" style="width: 60%;">
            <!-- Highlight Picture Section -->
            <hr class="my-10 border-t-1 border-gray-600" />
            <div class="relative">
              <img src="../assets/successStory.jpg" alt="Highlight" class=" object-cover">
              <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white p-4">
                <h1 class="text-2xl">Our Success Story</h1>
              </div>
            </div>
            <hr class="my-10 border-t-1 border-gray-600" />
            <div class="px-4">
              <p class="text-gray-700">
                Mia lived in a remote Aboriginal village in northern Australia, facing daily challenges like limited access to education and healthcare. Recognizing the need for support in such communities, our team decided to visit Mia's village to understand their situation firsthand.
  
                During our visit, we conducted thorough research and spoke directly with Mia and other community members. We learned about their needs, aspirations, and the barriers they faced. This personal connection allowed us to tailor our support effectively.
  
                Through our website, we were able to connect Mia with generous donors who provided vital resources, including school supplies, medical care, and job training opportunities. These donations made a significant difference in Mia's life.
  
                With the help from the donors, Mia excelled in her studies and pursued her passion for technology. Thanks to a scholarship funded through our platform, she attended university and is now making a positive impact in her community.
  
                Mia’s story is a testament to the power of direct engagement and community-driven support. By visiting her village and understanding her needs, we were able to facilitate meaningful change and help her achieve her dreams.
              </p>
            </div>
            <hr class="my-10 border-t-1 border-gray-600" />
          </div>
        </div>
      </div>
  
      <div class=" md:px-8 lg:px-20 py-10 mb-10">
  <div class="flex flex-col ">
    <p class="font-semibold text-xl font-serif my-5 ">Donate Now</p>
      <div class="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <a
          v-for="(item, index) in news"
          :key="index"
          :href="item.url"
          class="text-[#642E08] p-4 md:p-6  rounded-lg shadow-lg flex flex-col text-md hover:bg-[#b89d77]"
          target="_blank">
          <div class="flex  overflow-hidden rounded-md mb-4 w-full h-48 ">
            <img :src="item.imgUrl" :alt="item.title" class="object-cover w-full h-full rounded-md" />
          </div>
          <p class="text-center">{{ item.title }}</p>
        </a>

    </div>
  </div>
</div>
    </div>
  </template>
  <script setup>
    import news from '../assets/json/news.json';
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
  