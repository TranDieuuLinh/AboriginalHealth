<template>
  <div class="flex flex-col min-h-screen w-screen my-20">
    <!-- Event Form -->
    <div class="flex flex-col items-center xs:mx-5 mx-0 md:mx-0">
      <form
        ref="eventForm"
        class="max-w-md w-full p-5 bg-white rounded-lg shadow-lg"
        @submit.prevent="handleEventUpload"
        aria-labelledby="event-form-title"
      >
        <h2 id="event-form-title" class="text-xl font-bold mb-5">
          {{ isEditing ? 'Edit Event' : 'Add New Event' }}
        </h2>

        <div v-if="isEditing" class="mb-4 p-2 bg-green-100 border rounded">
          You are editing an existing event. Make your changes below.
        </div>

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
          <label for="date" class="text-lg font-semibold">Date:</label>
          <input
            type="date"
            id="date"
            v-model="formData.date"
            class="w-full border rounded-md p-3 my-2"
            aria-required="true"
            :aria-invalid="errors.date ? 'true' : 'false'"
            aria-describedby="date-error"
          />
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

        <!-- Start Time -->
        <div class="mb-5">
          <label for="start-time" class="text-lg font-semibold">Start Time:</label>
          <input
            type="time"
            id="start-time"
            v-model="formData.startTime"
            class="w-full border rounded-md p-3 my-2"
            aria-required="true"
            :aria-invalid="errors.startTime ? 'true' : 'false'"
            aria-describedby="start-time-error"
          />
          <p v-if="errors.startTime" id="start-time-error" class="text-red-500 text-sm" role="alert">
            {{ errors.startTime }}
          </p>
        </div>

        <!-- End Time -->
        <div class="mb-5">
          <label for="end-time" class="text-lg font-semibold">End Time:</label>
          <input
            type="time"
            id="end-time"
            v-model="formData.endTime"
            class="w-full border rounded-md p-3 my-2"
            aria-required="true"
            :aria-invalid="errors.endTime ? 'true' : 'false'"
            aria-describedby="end-time-error"
          />
          <p v-if="errors.endTime" id="end-time-error" class="text-red-500 text-sm" role="alert">
            {{ errors.endTime }}
          </p>
        </div>

        <!-- Event URL -->
        <div class="mb-5">
          <label for="url" class="text-lg font-semibold">Event URL:</label>
          <input
            type="url"
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
            type="number"
            id="cost"
            placeholder="Enter Cost"
            v-model="formData.cost"
            class="w-full border rounded-md p-3 my-2"
            aria-required="true"
            :aria-invalid="errors.cost ? 'true' : 'false'"
            aria-describedby="cost-error"
            step="0.01"
            min="0"
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
            v-model.number="formData.number_of_people"
            class="w-full border rounded-md p-3 my-2"
            aria-required="true"
            :aria-invalid="errors.number_of_people ? 'true' : 'false'"
            aria-describedby="people-error"
            min="1"
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
            {{ isEditing ? 'Update' : 'Add' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Search and Sort -->
    <div class="flex-grow md:mx-20 xs:mx-10 mt-10 text-black">
      <div class="flex justify-between items-center mb-5">
        <input
          type="text"
          placeholder="Search by Title"
          v-model="searchQuery"
          class="border text-black rounded-md p-3 xs:text-[10px] md:text-[14px]"
          aria-label="Search by Title"
        />
        <div class="flex items-center">
          <button
            @click="toggleSort"
            class="ml-2 bg-[#b89d77] text-white p-3 rounded-lg xs:text-[10px] md:text-[14px]"
            aria-label="Sort Events by Name"
          >
            Sort by Name <span>{{ isAscending ? '▲' : '▼' }}</span>
          </button>
        </div>
      </div>

      <h2 class="font-semibold text-xl font-serif my-5 text-black">Events</h2>
      <div class="relative w-full">
        <div
          v-for="event in paginatedEvents"
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
              <label class="md:text-sm xs:text-[10px] font-medium text-white">Highlight?</label>
            </div>

            <div class="flex items-center justify-between mt-4">
              <div class="flex flex-col items-center justify-center bg-[#b89d77] w-36 h-24 rounded-lg text-center" aria-label="Event Date">
                <span class="md:text-4xl xs:text-lg font-bold text-white">{{ new Date(event.date).getDate() }} </span>
                <span class="md:text-sm xs:text-xs text-white">{{ new Date(event.date).toLocaleString('default', { month: 'short' }) }}, {{ new Date(event.date).getFullYear() }} </span>
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
                    class="underline text-[#b89d77] md:text-lg xs:text-base"
                    aria-label="View details for {{ event.title }}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ event.title }}
                  </a>
                </h3>

                <!-- Location and Time -->
                <div class="flex md:flex-row xs:flex-col md:gap-5 xs:gap-2 lg:text-sm text-sm xs:text-xs">
                  <div class="flex flex-col gap-2 ">
                    <p class="flex items-center">
                      <i class="fas fa-map-marker-alt mr-2" aria-hidden="true"></i>
                      {{ event.location }}
                    </p>
                    <p class="flex items-center">
                      <i class="fas fa-clock mr-2" aria-hidden="true"></i>
                      {{ event.startTime }} - {{ event.endTime }}
                    </p>
                  </div>

                  <!-- Cost and Number of People -->
                  <div class="flex flex-col gap-2 ">
                    <p class="flex items-center">
                      <i class="fas fa-dollar-sign mr-2" aria-hidden="true"></i>
                      {{ event.cost }}
                    </p>
                    <p class="flex items-center">
                      <i class="fas fa-users mr-2" aria-hidden="true"></i>
                      {{ event.number_of_people }} people
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
                class="absolute top-1 md:right-16 xs:right-11 bg-black text-white md:px-4 xs:px-2 py-2 rounded-lg xs:text-xs md:text-base"
                aria-label="Delete Event {{ event.title }}"
              >
                Delete
              </button>
              <!-- Edit Button -->
              <button
                @click="editEvent(event)"
                class="bg-[#aeaba6] absolute top-1 right-0 text-white md:px-3 xs:px-2 py-2 rounded-lg xs:text-xs md:text-base"
                aria-label="Edit event {{ event.title }}"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="mt-4 flex justify-center space-x-4">
        <button @click="previousPage" :disabled="currentPage === 1" class="btn-pagination" aria-label="Previous Page">Previous</button>
        <span>Page {{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage * itemsPerPage >= filteredEvents.length" class="btn-pagination" aria-label="Next Page">Next</button>
      </div>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="inset-0 z-20 fixed flex items-center justify-center bg-opacity-50 bg-gray-900" role="status" aria-live="polite">
      <i class="fa-solid fa-spinner animate-spin text-white text-3xl" aria-hidden="true"></i>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { db } from '../../firebaseConfig.js';
import { collection, doc, setDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

// State variables
const loading = ref(false);
const events = ref([]);
const searchQuery = ref('');
const isAscending = ref(true);
const currentPage = ref(1);
const isEditing = ref(false);
const eventForm = ref(null);

// Form data and errors
const formData = ref({
  id: '',
  title: '',
  description: '',
  date: '', // Combined date field
  location: '',
  startTime: '',
  endTime: '',
  url: '',
  cost: '',
  number_of_people: null,
});
const errors = ref({
  title: '',
  description: '',
  date: '',
  location: '',
  startTime: '',
  endTime: '',
  url: '',
  cost: '',
  number_of_people: '',
});

// Validation function
const validateForm = () => {
  let valid = true;
  // Reset errors
  errors.value = {
    title: '',
    description: '',
    date: '',
    location: '',
    startTime: '',
    endTime: '',
    url: '',
    cost: '',
    number_of_people: '',
  };

  // Title validation
  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required.';
    valid = false;
  }

  // Description validation
  if (!formData.value.description.trim()) {
    errors.value.description = 'Description is required.';
    valid = false;
  }

  // Date validation
  if (!formData.value.date) {
    errors.value.date = 'Date is required.';
    valid = false;
  }

  // Location validation
  if (!formData.value.location.trim()) {
    errors.value.location = 'Location is required.';
    valid = false;
  }

  // Start Time validation
  if (!formData.value.startTime) {
    errors.value.startTime = 'Start time is required.';
    valid = false;
  }

  // End Time validation
  if (!formData.value.endTime) {
    errors.value.endTime = 'End time is required.';
    valid = false;
  } else if (formData.value.startTime >= formData.value.endTime) {
    errors.value.endTime = 'End time must be later than start time.';
    valid = false;
  }

  // URL validation
  if (!formData.value.url.trim()) {
    errors.value.url = 'Event URL is required.';
    valid = false;
  } else if (!isValidURL(formData.value.url)) {
    errors.value.url = 'Invalid URL format.';
    valid = false;
  }

  // Cost validation
  if (formData.value.cost === '' || formData.value.cost === null) {
    errors.value.cost = 'Cost is required.';
    valid = false;
  } else if (isNaN(formData.value.cost) || parseFloat(formData.value.cost) < 0) {
    errors.value.cost = 'Cost must be a non-negative number.';
    valid = false;
  }

  // Number of People validation
  if (formData.value.number_of_people === null || formData.value.number_of_people <= 0) {
    errors.value.number_of_people = 'Number of people must be greater than zero.';
    valid = false;
  }

  return valid;
};

// URL validation helper
const isValidURL = (url) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-zA-Z0-9\\-\\.]+)\\.([a-zA-Z]{2,5}))|' + // domain name
      'localhost|' + // localhost
      '\\d{1,3}(\\.\\d{1,3}){3})' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?' + // port and path
      '(\\?[;&a-zA-Z0-9@:%_\\+.~#?&//=]*)?' + // query string
      '(\\#[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$',
    'i'
  );
  return pattern.test(url);
};

// Handle form submission
const handleEventUpload = async () => {
  if (!validateForm()) {
    alert('Please fix the errors in the form before submitting.');
    return;
  }

  try {
    loading.value = true;

    if (isEditing.value) {
      // Editing existing event
      await updateEvent();
    } else {
      // Adding new event
      await addEvent();
    }

    resetForm();
    await getAllEvents();
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to submit the form. ❌');
  } finally {
    loading.value = false;
  }
};

// Add new event to Firestore
const addEvent = async () => {
  try {
    const eventId = doc(collection(db, 'events')).id; // Generate a unique ID
    await setDoc(doc(db, 'events', eventId), {
      id: eventId,
      title: formData.value.title,
      description: formData.value.description,
      date: formData.value.date, // YYYY-MM-DD
      location: formData.value.location,
      startTime: formData.value.startTime, // HH:MM
      endTime: formData.value.endTime,     // HH:MM
      url: formData.value.url,
      cost: parseFloat(formData.value.cost),
      number_of_people: parseInt(formData.value.number_of_people, 10),
      isHighlighted: false,
    });
    alert('Event added successfully! 🎉');
  } catch (error) {
    console.error('Error adding event:', error);
    alert('Failed to add the event. ❌');
  }
};

// Update existing event in Firestore
const updateEvent = async () => {
  try {
    const eventRef = doc(db, 'events', formData.value.id);
    await updateDoc(eventRef, {
      title: formData.value.title,
      description: formData.value.description,
      date: formData.value.date,
      location: formData.value.location,
      startTime: formData.value.startTime,
      endTime: formData.value.endTime,
      url: formData.value.url,
      cost: parseFloat(formData.value.cost),
      number_of_people: parseInt(formData.value.number_of_people, 10),
    });
    alert('Event updated successfully! 🎉');
  } catch (error) {
    console.error('Error updating event:', error);
    alert('Failed to update the event. ❌');
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

// Edit an event
const editEvent = (event) => {
  isEditing.value = true;
  formData.value = { ...event }; // Populate form with event data

  // Scroll to the form
  nextTick(() => {
    if (eventForm.value) {
      eventForm.value.scrollIntoView({ behavior: 'smooth' });
    }
  });
};

// Reset form to initial state
const resetForm = () => {
  formData.value = {
    id: '',
    title: '',
    description: '',
    date: '',
    location: '',
    startTime: '',
    endTime: '',
    url: '',
    cost: '',
    number_of_people: null,
  };
  errors.value = {
    title: '',
    description: '',
    date: '',
    location: '',
    startTime: '',
    endTime: '',
    url: '',
    cost: '',
    number_of_people: '',
  };
  isEditing.value = false;
};

// Delete event
const deleteEvent = async (id) => {
  if (confirm('Are you sure you want to delete this event?')) {
    try {
      loading.value = true;
      await deleteDoc(doc(db, 'events', id));
      alert('Event deleted successfully! 🎉');
      await getAllEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete the event. ❌');
    } finally {
      loading.value = false;
    }
  }
};

// Update highlight status
const updateHighlightStatus = async (event) => {
  try {
    const eventRef = doc(db, 'events', event.id);
    await setDoc(eventRef, { isHighlighted: event.isHighlighted }, { merge: true });
  } catch (error) {
    console.error('Error updating highlight status:', error);
    alert('Failed to update highlight status. ❌');
  }
};

// Toggle sort direction
const toggleSort = () => {
  isAscending.value = !isAscending.value;
};

// Computed properties for filtering and sorting
const filteredEvents = computed(() => {
  let filtered = events.value.filter(event =>
    event.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  // Sort events
  filtered.sort((a, b) => {
    const nameA = a.title.toLowerCase();
    const nameB = b.title.toLowerCase();
    if (isAscending.value) {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  return filtered;
});

// Pagination logic
const itemsPerPage = 10;
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredEvents.value.slice(start, start + itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value * itemsPerPage < filteredEvents.value.length) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Watch for search query changes to reset page
watch(searchQuery, () => {
  currentPage.value = 1;
});

// Fetch events on component mount
onMounted(() => {
  getAllEvents();
});

// Format date for display
const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
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

.error {
  color: red;
  font-size: 0.9em;
}

.bg-gray-800 .relative.z-10 {
  position: relative;
  z-index: 10;
}
</style>
