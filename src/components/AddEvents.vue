<template>
  <div class="flex flex-col min-h-screen w-screen my-20">
    <div class="flex flex-col items-center">
      <form class="max-w-md w-full p-5 bg-white rounded-lg shadow-lg" @submit.prevent="handleEventUpload">
        <div class="mb-5">
          <label for="title" class="text-lg font-semibold">Title:</label>
          <input type="text" id="title" placeholder="Enter Title" v-model="formData.title" class="w-full border rounded-md p-3 my-2" />
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
            <input type="text" id="day" placeholder="Day" v-model="formData.day" class="w-1/2 border rounded-md p-3 my-2" />
            <input type="text" id="month" placeholder="Month" v-model="formData.month" class="w-1/2 border rounded-md p-3 my-2" />
          </div>
          <p v-if="errors.date" class="text-red-500 text-sm">{{ errors.date }}</p>
        </div>
        <div class="mb-5">
          <label for="location" class="text-lg font-semibold">Location:</label>
          <input type="text" id="location" placeholder="Enter Location" v-model="formData.location" class="w-full border rounded-md p-3 my-2" />
          <p v-if="errors.location" class="text-red-500 text-sm">{{ errors.location }}</p>
        </div>
        <div class="mb-5">
          <label for="time" class="text-lg font-semibold">Time:</label>
          <input type="text" id="time" placeholder="Enter Time" v-model="formData.time" class="w-full border rounded-md p-3 my-2" />
          <p v-if="errors.time" class="text-red-500 text-sm">{{ errors.time }}</p>
        </div>
        <div class="mb-5">
          <label for="url" class="text-lg font-semibold">Event URL:</label>
          <input type="text" id="url" placeholder="Enter Event URL" v-model="formData.url" class="w-full border rounded-md p-3 my-2" />
          <p v-if="errors.url" class="text-red-500 text-sm">{{ errors.url }}</p>
        </div>
        <div class="mb-5">
          <label for="cost" class="text-lg font-semibold">Cost:</label>
          <input type="text" id="cost" placeholder="Enter Cost" v-model="formData.cost" class="w-full border rounded-md p-3 my-2" />
          <p v-if="errors.cost" class="text-red-500 text-sm">{{ errors.cost }}</p>
        </div>
        <div class="mb-5">
          <label for="number_of_people" class="text-lg font-semibold">Number of People:</label>
          <input type="number" id="number_of_people" placeholder="Enter Number of People" v-model="formData.number_of_people" class="w-full border rounded-md p-3 my-2" />
          <p v-if="errors.number_of_people" class="text-red-500 text-sm">{{ errors.number_of_people }}</p>
        </div>
        <div class="mb-5 flex justify-end max-w-md">
          <button type="submit" class="bg-[#b89d77] text-white p-3 rounded-lg w-full">Add</button>
        </div>
      </form>
    </div>

    <!-- Search and Sort -->
    <div class="flex-grow mx-20 mt-10 text-white">
      <div class="flex justify-between items-center mb-5">
        <input type="text" placeholder="Search by Title" v-model="searchQuery" class="border text-black rounded-md p-3" />
        <div class="flex items-center">
          <button @click="toggleSort" class="ml-2 bg-[#b89d77] text-white p-3 rounded-lg">
            Sort by Name <span>{{ isAscending ? '▲' : '▼' }}</span>
          </button>
        </div>
      </div>

      <p class="font-semibold text-xl font-serif my-5 text-black">Events</p>
      <div class="relative w-full">
        <div v-for="event in filteredEvents" :key="event.id" class="mb-8 p-6 rounded-lg shadow-lg border border-gray-700 relative transition-transform transform hover:scale-105 bg-gray-800">
          <div class="absolute inset-0 rounded-lg"></div>
          <div class="relative z-10">
            <!-- Highlight Checkbox -->
            <div class="flex items-center mt-2">
              <input type="checkbox" v-model="event.isHighlighted" @change="updateHighlightStatus(event)" class="mr-2" />
              <label class="text-sm font-medium">Highlight?</label>
            </div>
            <div class="flex items-center justify-between">
              <!-- Date Box -->
              <div class="flex flex-col items-center justify-center bg-[#b89d77] w-36 h-24 rounded-lg text-center">
                <span class="text-4xl font-bold text-white">{{ event.day }}</span>
                <span class="text-sm text-white">{{ event.month }}</span>
              </div>

              <!-- Event Details -->
              <div class="flex flex-col w-full p-2 ml-4">
                <h3 class="text-2xl font-bold mb-2">
                  <a :href="event.url" class="underline text-[#b89d77]">{{ event.title }}</a>
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
              <!-- Delete Button in the Top Right -->
              <button @click="deleteEvent(event.id)" class="absolute top-1 right-2 bg-black text-white px-4 py-2 rounded-lg">delete</button>
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
import { ref, onMounted, computed } from 'vue';
import { collection, getDocs, setDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig.js';

const events = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const isAscending = ref(true); // State to track sorting order

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

// Validation logic
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
  if (!formData.value.day || !formData.value.month) {
    errors.value.date = 'Date is required.';
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
  if (!formData.value.url) {
    errors.value.url = 'Event URL is required.';
    isValid = false;
  }
  if (!formData.value.cost) {
    errors.value.cost = 'Cost is required.';
    isValid = false;
  }
  if (!formData.value.number_of_people) {
    errors.value.number_of_people = 'Number of people is required.';
    isValid = false;
  }

  return isValid;
};

// Function to handle event upload
const handleEventUpload = async () => {
  if (!validateForm()) return;

  loading.value = true;
  try {
    const newEventRef = doc(collection(db, 'events'));
    await setDoc(newEventRef, { ...formData.value, id: newEventRef.id });
    events.value.push({ ...formData.value, id: newEventRef.id });
    resetForm();
  } catch (error) {
    console.error('Error uploading event:', error);
  } finally {
    loading.value = false;
  }
};

// Function to reset form data
const resetForm = () => {
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
};

// Function to delete an event
const deleteEvent = async (id) => {
  loading.value = true;
  try {
    await deleteDoc(doc(db, 'events', id));
    events.value = events.value.filter(event => event.id !== id);
  } catch (error) {
    console.error('Error deleting event:', error);
  } finally {
    loading.value = false;
  }
};

// Function to update highlight status
const updateHighlightStatus = async (event) => {
  loading.value = true;
  try {
    await updateDoc(doc(db, 'events', event.id), { isHighlighted: event.isHighlighted });
  } catch (error) {
    console.error('Error updating highlight status:', error);
  } finally {
    loading.value = false;
  }
};

// Computed property for filtered and sorted events based on search query
const filteredEvents = computed(() => {
  const filtered = events.value.filter(event =>
    event.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  // Sort filtered events based on title
  return filtered.sort((a, b) => {
    const comparison = a.title.localeCompare(b.title);
    return isAscending.value ? comparison : -comparison;
  });
});

// Fetch events from Firestore on component mount
onMounted(async () => {
  loading.value = true;
  try {
    const querySnapshot = await getDocs(collection(db, 'events'));
    querySnapshot.forEach((doc) => {
      events.value.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    console.error('Error fetching events:', error);
  } finally {
    loading.value = false;
  }
});

// Toggle sorting order
const toggleSort = () => {
  isAscending.value = !isAscending.value;
};
</script>

<style scoped>
/* Add your styles here */
</style>
