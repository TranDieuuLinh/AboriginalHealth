<template>
    <div>
      <full-calendar
        :events="formattedEvents"
        :headerToolbar="{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }"
        :initialView="'dayGridMonth'"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import FullCalendar from 'vue-fullcalendar';
  import { db } from '../../firebaseConfig.js';
  import { collection, getDocs } from 'firebase/firestore';
  
  // Reactive reference to hold events
  const events = ref([]);
  
  // Function to fetch events from Firestore
  const fetchEvents = async () => {
    try {
      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      events.value = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched events:', events.value); // Optional: for debugging
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  
  // Fetch events on component mount
  onMounted(() => {
    fetchEvents();
  });
  
  // Computed property to format events for the calendar
  const formattedEvents = computed(() => {
    return events.value.map(event => ({
      title: event.title,
      start: `${event.date}T${event.startTime}`,
      end: `${event.date}T${event.endTime}`,
      url: event.url,
      allDay: false,
    }));
  });
  </script>
  
  <style>
  /* Add any additional styling here */
  </style>
  