<template>
    <div class="flex flex-col min-h-screen w-screen my-20">
      <div class="flex flex-col items-center">
        <form class="max-w-md w-full p-5 bg-white rounded-lg shadow-lg" @submit.prevent="handleEventUpload">
          <div class="mb-5">
            <label for="title" class="text-lg font-semibold">Title:</label>
            <input type="text" id="title" placeholder="Enter Title" v-model="formData.title" class="w-full border rounded-md p-3 my-2"/>
            <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
          </div>
          <div class="mb-5">
            <label for="description" class="text-lg font-semibold">Description:</label>
            <textarea id="description" placeholder="Enter Description" v-model="formData.description" class="w-full border rounded-md p-3 my-2"></textarea>
            <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</p>
          </div>
          <div class="mb-5">
            <label for="date" class="text-lg font-semibold">Date:</label>
            <div class="flex gap-2">
              <input type="text" id="day" placeholder="Day" v-model="formData.day" class="w-1/2 border rounded-md p-3 my-2"/>
              <input type="text" id="month" placeholder="Month" v-model="formData.month" class="w-1/2 border rounded-md p-3 my-2"/>
            </div>
            <p v-if="errors.date" class="text-red-500 text-sm">{{ errors.date }}</p>
          </div>
          <div class="mb-5">
            <label for="location" class="text-lg font-semibold">Location:</label>
            <input type="text" id="location" placeholder="Enter Location" v-model="formData.location" class="w-full border rounded-md p-3 my-2"/>
            <p v-if="errors.location" class="text-red-500 text-sm">{{ errors.location }}</p>
          </div>
          <div class="mb-5">
            <label for="time" class="text-lg font-semibold">Time:</label>
            <input type="text" id="time" placeholder="Enter Time" v-model="formData.time" class="w-full border rounded-md p-3 my-2"/>
            <p v-if="errors.time" class="text-red-500 text-sm">{{ errors.time }}</p>
          </div>
          <div class="mb-5">
            <label for="url" class="text-lg font-semibold">Event URL:</label>
            <input type="text" id="url" placeholder="Enter Event URL" v-model="formData.url" class="w-full border rounded-md p-3 my-2"/>
            <p v-if="errors.url" class="text-red-500 text-sm">{{ errors.url }}</p>
          </div>
          <div class="mb-5">
            <label for="cost" class="text-lg font-semibold">Cost:</label>
            <input type="text" id="cost" placeholder="Enter Cost" v-model="formData.cost" class="w-full border rounded-md p-3 my-2"/>
            <p v-if="errors.cost" class="text-red-500 text-sm">{{ errors.cost }}</p>
          </div>
          <div class="mb-5">
            <label for="number_of_people" class="text-lg font-semibold">Number of People:</label>
            <input type="number" id="number_of_people" placeholder="Enter Number of People" v-model="formData.number_of_people" class="w-full border rounded-md p-3 my-2"/>
            <p v-if="errors.number_of_people" class="text-red-500 text-sm">{{ errors.number_of_people }}</p>
          </div>
          <div class="mb-5 flex justify-end max-w-md">
            <button type="submit" class="bg-black text-white p-3 rounded-lg w-full">Add</button>
          </div>
        </form>
      </div>
      <div class="flex-grow mx-20 mt-10 text-white">
        <p class="font-semibold text-xl font-serif my-5 text-black">Events</p>
        <div class="relative w-full">
          <div v-for="event in events" :key="event.id" class="mb-8 p-6 rounded-lg shadow-lg border border-gray-700 relative transition-transform transform hover:scale-105 bg-gray-800" >
            <div class="absolute inset-0 rounded-lg"></div>
            <div class="relative z-10">
                 <!-- Highlight Checkbox -->
                 <div class="flex items-center mt-2">
                    <input type="checkbox" v-model="event.isHighlighted" @change="updateHighlightStatus(event)" class="mr-2"/>
                    <label class="text-sm font-medium ">Highlight?</label>
                  </div>
              <div class="flex items-center justify-between">
                <!-- Date Box -->
                <div class="flex flex-col items-center justify-center bg-[#6e3e3a] w-36 h-24 rounded-lg text-center">
                  <span class="text-4xl font-bold text-white">{{ event.day }}</span>
                  <span class="text-sm text-white">{{ event.month }}</span>
                </div>
  
                <!-- Event Details -->
                <div class="flex flex-col w-full p-2 ml-4">
                  <h3 class="text-2xl font-bold mb-2">
                    <a :href="event.url" class="underline text-yellow-200">{{ event.title }}</a>
                  </h3>
                  <!-- Location and Time on the Same Line -->
                  <div class="flex flex-row gap-5">
                    <div class="flex flex-col gap-2 text-sm">
                      <p class="flex items-center">
                        <i class="fas fa-map-marker-alt mr-2"></i>{{ event.location }}
                      </p>
                      <p class="flex items-center">
                        <i class="fas fa-clock mr-2"></i>{{ event.time }}
                      </p>
                    </div>
                    
                    <!-- Cost and Number of People on the Same Line -->
                    <div class="flex flex-col gap-2 text-sm">
                      <p class="flex items-center">
                        <i class="fas fa-dollar-sign mr-2"></i>{{ event.cost }}
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
      <div v-if="loading" class="inset-0 z-20 fixed flex items-center justify-center">
        <i class="fa-solid fa-spinner animate-spin"></i>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { collection, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore';
  import { db } from '../../firebaseConfig.js';
  
  const events = ref([]);
  const loading = ref(false);
  
  const formData = ref({
    title: '',
    description: '',
    day: '',
    month: '',
    location: '',
    time: '',
    url: '',
    cost: '',
    number_of_people: '',
    isHighlighted: false
  });
  
  const errors = ref({
    title: '',
    description: '',
    date: '',
    location: '',
    time: '',
    url: '',
    cost: '',
    number_of_people: ''
  });
  
  const validateForm = () => {
    errors.value = {
      title: '',
      description: '',
      date: '',
      location: '',
      time: '',
      url: '',
      cost: '',
      number_of_people: ''
    };
  
    let isValid = true;
  
    if (!formData.value.title) {
      errors.value.title = 'Title is required.';
      isValid = false;
    }
    if (!formData.value.description) {
      errors.value.description = 'Description is required.';
      isValid = false;
    }
    if (!formData.value.day || isNaN(formData.value.day) || formData.value.day < 1 || formData.value.day > 31) {
      errors.value.date = 'Day must be a number between 1 and 31.';
      isValid = false;
    }
    if (!formData.value.month || !['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].includes(formData.value.month)) {
      errors.value.date = 'Month must be a valid month abbreviation.';
      isValid = false;
    }
    if (!formData.value.location) {
      errors.value.location = 'Location is required.';
      isValid = false;
    }
    if (!formData.value.time) {
      errors.value.time = 'Time is required.';
      isValid = false;
    }
    if (!formData.value.url || !/^https?:\/\/.*$/.test(formData.value.url)) {
      errors.value.url = 'Event URL must be a valid URL.';
      isValid = false;
    }
    if (isNaN(formData.value.cost) || parseFloat(formData.value.cost) < 0) {
      errors.value.cost = 'Cost must be a valid number greater than or equal to 0.';
      isValid = false;
    }
    if (isNaN(formData.value.number_of_people) || parseInt(formData.value.number_of_people) < 1) {
      errors.value.number_of_people = 'Number of People must be a valid number greater than or equal to 1.';
      isValid = false;
    }
  
    return isValid;
  };
  
  const handleEventUpload = async () => {
    if (validateForm()) {
      loading.value = true;
      try {
        await setDoc(doc(db, 'events', formData.value.title), formData.value);
        await fetchEvents();
        formData.value = {
          title: '',
          description: '',
          day: '',
          month: '',
          location: '',
          time: '',
          url: '',
          cost: '',
          number_of_people: '',
          isHighlighted: false
        };
      } catch (error) {
        console.error('Error adding document: ', error);
      } finally {
        loading.value = false;
      }
    }
  };
  
  const updateHighlightStatus = async (event) => {
    try {
      await updateDoc(doc(db, 'events', event.id), { isHighlighted: event.isHighlighted });
      alert('Highlight status updated successfully! 🎉');
    } catch (error) {
      console.error('Error updating highlight status: ', error);
      alert('Failed to update highlight status. ❌');
    }
  };
  
  const fetchEvents = async () => {
    loading.value = true;
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      events.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching events: ', error);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    fetchEvents();
  });
  </script>
  
  <style scoped>
  /* Add component-specific styles here */
  </style>
  