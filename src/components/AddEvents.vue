<template>
  <div class="flex flex-col min-h-screen w-screen my-20">
    <!-- Donation Form -->
    <div class="flex flex-col items-center">
      <form
        class="max-w-md w-full p-5 bg-white rounded-lg shadow-lg"
        @submit.prevent="handleEventUpload"
        aria-labelledby="event-form-title"
      >
        <h2 id="event-form-title" class="text-xl font-bold mb-5">Add New Event</h2>

        <!-- Title -->
        <div class="mb-5">
          <label for="title" class="text-lg font-semibold">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Title"
            v-model="formData.title"
            class="w-full border rounded-md p-3 my-2"
            aria-required="true"
            :aria-invalid="errors.title ? 'true' : 'false'"
            aria-describedby="title-error"
          />
          <p v-if="errors.title" id="title-error" class="text-red-500 text-sm" role="alert">
            {{ errors.title }}
          </p>
        </div>

        <!-- Description -->
        <div class="mb-5">
          <label for="description" class="text-lg font-semibold">Description:</label>
          <textarea
            id="description"
            placeholder="Enter Description"
            v-model="formData.description"
            class="w-full border rounded-md p-3 my-2"
            aria-required="true"
            :aria-invalid="errors.description ? 'true' : 'false'"
            aria-describedby="description-error"
          ></textarea>
          <p v-if="errors.description" id="description-error" class="text-red-500 text-sm" role="alert">
            {{ errors.description }}
          </p>
        </div>

        <!-- Date -->
        <div class="mb-5">
          <label class="text-lg font-semibold">Date:</label>
          <div class="flex gap-2">
            <div class="w-1/2">
              <input
                type="text"
                id="day"
                placeholder="Day"
                v-model="formData.day"
                class="w-full border rounded-md p-3 my-2"
                aria-required="true"
                :aria-invalid="errors.date ? 'true' : 'false'"
                aria-describedby="date-error"
              />
            </div>
            <div class="w-1/2">
              <input
                type="text"
                id="month"
                placeholder="Month"
                v-model="formData.month"
                class="w-full border rounded-md p-3 my-2"
                aria-required="true"
                :aria-invalid="errors.date ? 'true' : 'false'"
                aria-describedby="date-error"
              />
            </div>
          </div>
          <p v-if="errors.date" id="date-error" class="text-red-500 text-sm" role="alert">
            {{ errors.date }}
          </p>
        </div>

        <!-- Location -->
        <div class="mb-5">
          <label for="location" class="text-lg font-semibold">Location:</label>
          <input
            type="text"
            id="location"
            placeholder="Enter Location"
            v-model="formData.location"
            class="w-full border rounded-md p-3 my-2"
            aria-required="true"
            :aria-invalid="errors.location ? 'true' : 'false'"
            aria-describedby="location-error"
          />
          <p v-if="errors.location" id="location-error" class="text-red-500 text-sm" role="alert">
            {{ errors.location }}
          </p>
        </div>

        <!-- Time -->
        <div class="mb-5">
          <label for="time" class="text-lg font-semibold">Time:</label>
          <input
            type="text"
            id="time"
            placeholder="Enter Time"
            v-model="formData.time"
            class="w-full border rounded-md p-3 my-2"
            aria-required="true"
            :aria-invalid="errors.time ? 'true' : 'false'"
            aria-describedby="time-error"
          />
          <p v-if="errors.time" id="time-error" class="text-red-500 text-sm" role="alert">
            {{ errors.time }}
          </p>
        </div>

        <!-- Event URL -->
        <div class="mb-5">
          <label for="url" class="text-lg font-semibold">Event URL:</label>
          <input
            type="text"
            id="url"
            placeholder="Enter Event URL"
            v-model="formData.url"
            class="w-full border rounded-md p-3 my-2"
            aria-required="true"
            :aria-invalid="errors.url ? 'true' : 'false'"
            aria-describedby="url-error"
          />
          <p v-if="errors.url" id="url-error" class="text-red-500 text-sm" role="alert">
            {{ errors.url }}
          </p>
        </div>

        <!-- Cost -->
        <div class="mb-5">
          <label for="cost" class="text-lg font-semibold">Cost:</label>
          <input
            type="text"
            id="cost"
            placeholder="Enter Cost"
            v-model="formData.cost"
            class="w-full border rounded-md p-3 my-2"
            aria-required="true"
            :aria-invalid="errors.cost ? 'true' : 'false'"
            aria-describedby="cost-error"
          />
          <p v-if="errors.cost" id="cost-error" class="text-red-500 text-sm" role="alert">
            {{ errors.cost }}
          </p>
        </div>

        <!-- Number of People -->
        <div class="mb-5">
          <label for="number_of_people" class="text-lg font-semibold">Number of People:</label>
          <input
            type="number"
            id="number_of_people"
            placeholder="Enter Number of People"
            v-model="formData.number_of_people"
            class="w-full border rounded-md p-3 my-2"
            aria-required="true"
            :aria-invalid="errors.number_of_people ? 'true' : 'false'"
            aria-describedby="people-error"
          />
          <p v-if="errors.number_of_people" id="people-error" class="text-red-500 text-sm" role="alert">
            {{ errors.number_of_people }}
          </p>
        </div>

        <!-- Submit Button -->
        <div class="mb-5 flex justify-end max-w-md">
          <button
            type="submit"
            class="bg-[#b89d77] text-white p-3 rounded-lg w-full"
            aria-label="Add Event"
          >
            Add
          </button>
        </div>
      </form>
    </div>

    <!-- Search and Sort -->
    <div class="flex-grow mx-20 mt-10 text-black">
      <div class="flex justify-between items-center mb-5">
        <input
          type="text"
          placeholder="Search by Title"
          v-model="searchQuery"
          class="border text-black rounded-md p-3"
          aria-label="Search by Title"
        />
        <div class="flex items-center">
          <button
            @click="toggleSort"
            class="ml-2 bg-[#b89d77] text-white p-3 rounded-lg"
            aria-label="Sort Events by Name"
          >
            Sort by Name <span>{{ isAscending ? '▲' : '▼' }}</span>
          </button>
        </div>
      </div>

      <h2 class="font-semibold text-xl font-serif my-5 text-black">Events</h2>
      <div class="relative w-full">
        <div
          v-for="event in filteredEvents"
          :key="event.id"
          class="mb-8 p-6 rounded-lg shadow-lg border border-gray-700 relative transition-transform transform hover:scale-105 bg-gray-800"
          role="article"
          aria-labelledby="event-title-{{ event.id }}"
        >
          <div class="absolute inset-0 rounded-lg"></div>
          <div class="relative z-10">
            <!-- Highlight Checkbox -->
            <div class="flex items-center mt-2">
              <input
                type="checkbox"
                v-model="event.isHighlighted"
                @change="updateHighlightStatus(event)"
                id="highlight-{{ event.id }}"
                class="mr-2"
                aria-label="Highlight event {{ event.title }}"
              />
              <label for="highlight-{{ event.id }}" class="text-sm font-medium text-white">Highlight?</label>
            </div>

            <div class="flex items-center justify-between mt-4">
              <!-- Date Box -->
              <div class="flex flex-col items-center justify-center bg-[#b89d77] w-36 h-24 rounded-lg text-center" aria-label="Event Date">
                <span class="text-4xl font-bold text-white">{{ event.day }}</span>
                <span class="text-sm text-white">{{ event.month }}</span>
              </div>

              <!-- Event Details -->
              <div class="flex flex-col w-full p-2 ml-4 text-white">
                <h3
                  id="event-title-{{ event.id }}"
                  class="text-2xl font-bold mb-2"
                  role="heading"
                  aria-level="3"
                >
                  <a
                    :href="event.url"
                    class="underline text-[#b89d77]"
                    aria-label="View details for {{ event.title }}"
                  >
                    {{ event.title }}
                  </a>
                </h3>

                <!-- Location and Time -->
                <div class="flex flex-row gap-5">
                  <div class="flex flex-col gap-2 text-sm">
                    <p class="flex items-center">
                      <i class="fas fa-map-marker-alt mr-2" aria-hidden="true"></i>
                      <span class="sr-only">Location:</span>{{ event.location }}
                    </p>
                    <p class="flex items-center">
                      <i class="fas fa-clock mr-2" aria-hidden="true"></i>
                      <span class="sr-only">Time:</span>{{ event.time }}
                    </p>
                  </div>

                  <!-- Cost and Number of People -->
                  <div class="flex flex-col gap-2 text-sm">
                    <p class="flex items-center">
                      <i class="fas fa-dollar-sign mr-2" aria-hidden="true"></i>
                      <span class="sr-only">Cost:</span>{{ event.cost }}
                    </p>
                    <p class="flex items-center">
                      <i class="fas fa-users mr-2" aria-hidden="true"></i>
                      <span class="sr-only">Number of People:</span>{{ event.number_of_people }} people
                    </p>
                  </div>
                </div>

                <!-- Info Icon and Description -->
                <div class="flex mt-2 text-sm">
                  <i class="fas fa-info-circle mt-1 mr-2" aria-hidden="true"></i>
                  <p>{{ event.description }}</p>
                </div>
              </div>

              <!-- Delete Button -->
              <button
                @click="deleteEvent(event.id)"
                class="absolute top-1 right-2 bg-black text-white px-4 py-2 rounded-lg"
                aria-label="Delete Event {{ event.title }}"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 space-x-4">
      <button @click="previousPage" :disabled="currentPage === 1" class="btn-pagination" aria-label="Previous Page">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="filteredEvents.length < 10" class="btn-pagination" aria-label="Next Page">Next</button>
    </div>
    </div>



    <!-- Loading Spinner -->
    <div v-if="loading" class="inset-0 z-20 fixed flex items-center justify-center" role="status" aria-live="polite">
      <i class="fa-solid fa-spinner animate-spin" aria-hidden="true"></i>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { db, storage } from '../../firebaseConfig.js';
import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';

// State variables
const loading = ref(false);
const events = ref([]);
const searchQuery = ref('');
const isAscending = ref(true);
const currentPage = ref(1);

// Form data and errors
const formData = ref({
  title: '',
  description: '',
  day: '',
  month: '',
  location: '',
  time: '',
  url: '',
  cost: '',
  number_of_people: null,
});
const errors = ref({
  title: '',
  description: '',
  date: '',
  location: '',
  time: '',
  url: '',
  cost: '',
  number_of_people: '',
});

// Validation function
const validateForm = () => {
  let valid = true;
  errors.value = {
    title: '',
    description: '',
    date: '',
    location: '',
    time: '',
    url: '',
    cost: '',
    number_of_people: '',
  };

  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required.';
    valid = false;
  }
  if (!formData.value.description.trim()) {
    errors.value.description = 'Description is required.';
    valid = false;
  }
  if (!formData.value.day.trim() || !formData.value.month.trim()) {
    errors.value.date = 'Day and Month are required.';
    valid = false;
  }
  if (!formData.value.location.trim()) {
    errors.value.location = 'Location is required.';
    valid = false;
  }
  if (!formData.value.time.trim()) {
    errors.value.time = 'Time is required.';
    valid = false;
  }
  if (!formData.value.url.trim()) {
    errors.value.url = 'Event URL is required.';
    valid = false;
  }
  if (!formData.value.cost.trim()) {
    errors.value.cost = 'Cost is required.';
    valid = false;
  }
  if (!formData.value.number_of_people || formData.value.number_of_people <= 0) {
    errors.value.number_of_people = 'Number of people must be greater than zero.';
    valid = false;
  }

  return valid;
};

// Handle form submission
const handleEventUpload = async () => {
  if (!validateForm()) {
    alert('Please fix the errors in the form before submitting.');
    return;
  }

  try {
    loading.value = true;

    // Create a unique ID for the event
    const eventId = doc(collection(db, 'events')).id;

    // Add event to Firestore
    await setDoc(doc(db, 'events', eventId), {
      id: eventId,
      title: formData.value.title,
      description: formData.value.description,
      day: formData.value.day,
      month: formData.value.month,
      location: formData.value.location,
      time: formData.value.time,
      url: formData.value.url,
      cost: formData.value.cost,
      number_of_people: formData.value.number_of_people,
      isHighlighted: false,
    });

    // Reset form
    formData.value = {
      title: '',
      description: '',
      day: '',
      month: '',
      location: '',
      time: '',
      url: '',
      cost: '',
      number_of_people: null,
    };

    alert('Event added successfully! 🎉');
    await getAllEvents(); // Refresh the events list
  } catch (error) {
    console.error('Error adding event:', error);
    alert('Failed to add the event. ❌');
  } finally {
    loading.value = false;
  }
};

// Fetch all events from Firestore
const getAllEvents = async () => {
  try {
    loading.value = true;
    const eventCollection = collection(db, 'events');
    const eventSnapshot = await getDocs(eventCollection);
    events.value = eventSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error('Error fetching events:', error);
    alert('Failed to fetch events. ❌');
  } finally {
    loading.value = false;
  }
};

// Delete event
const deleteEvent = async (id) => {
  try {
    loading.value = true;
    await deleteDoc(doc(db, 'events', id));
    alert('Event deleted successfully! 🎉');
    await getAllEvents(); // Refresh the events list
  } catch (error) {
    console.error('Error deleting event:', error);
    alert('Failed to delete the event. ❌');
  } finally {
    loading.value = false;
  }
};

// Update highlight status
const updateHighlightStatus = async (event) => {
  try {
    loading.value = true;
    await setDoc(doc(db, 'events', event.id), {
      ...event,
      isHighlighted: event.isHighlighted,
    }, { merge: true });
    alert('Highlight status updated successfully! 🎉');
    await getAllEvents(); // Refresh the events list
  } catch (error) {
    console.error('Error updating highlight status:', error);
    alert('Failed to update highlight status. ❌');
  } finally {
    loading.value = false;
  }
};

// Toggle sort direction
const toggleSort = () => {
  isAscending.value = !isAscending.value;
};

// Computed property for filtered and sorted events
const filteredEvents = computed(() => {
  // Filter events based on search query
  let filtered = events.value.filter(event =>
    event.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  // Sort filtered events based on the title and sort direction
  filtered = filtered.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) return isAscending.value ? -1 : 1;
    if (a.title.toLowerCase() > b.title.toLowerCase()) return isAscending.value ? 1 : -1;
    return 0;
  });

  // Pagination logic: calculate the start and end index for the current page
  const startIndex = (currentPage.value - 1) * 10; // 10 items per page
  const endIndex = startIndex + 10;

  return filtered.slice(startIndex, endIndex); // Return the sliced array for the current page
});

// Function to go to the next page
const nextPage = () => {
  if (filteredEvents.value.length === 10) { // Only go to the next page if there are enough items
    currentPage.value++;
  }
};

// Function to go to the previous page
const previousPage = () => {
  if (currentPage.value > 1) { // Don't go back if we are on the first page
    currentPage.value--;
  }
};

// Function to reset the current page when the search query changes
const resetPage = () => {
  currentPage.value = 1;
};

// Watch for changes in the search query to reset the current page
watch(searchQuery, resetPage);

// Initialize on mount
onMounted(() => {
  getAllEvents();
});
</script>

<style scoped>
/* Ensure focus styles are visible */
:focus {
  outline: 3px solid #b89d77; /* Change color as needed for better visibility */
}

/* Screen reader only class for descriptions */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  border: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  word-wrap: normal;
}

/* Enhance focus for clickable divs */
div[role="button"]:focus {
  outline: 3px solid #b89d77;
}

.btn-pagination {
  background-color: #b89d77;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-pagination:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Additional styling as needed */
</style>
