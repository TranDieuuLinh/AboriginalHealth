<template>
    <div>
      <div id="map" class="w-screen h-screen fixed top-0 left-0"></div>
      <div class="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white px-5 py-2 rounded-lg shadow-md text-lg font-bold z-50">
        Total Distance: {{ totalDistance }} km
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { defineProps } from 'vue';
  import mapboxgl from 'mapbox-gl';
  
  const totalDistance = ref(0);
  
  const props = defineProps({
    id: String,
    location: {
      type: String,
      default: 'Melbourne'
    }
  });
  
  // Set the Mapbox access token
  mapboxgl.accessToken = 'pk.eyJ1IjoidHJhbmRpZXV1bGluaCIsImEiOiJjbTIxMmJzNzAwbXB6MnFxNWZieG9nOWJtIn0.qt_wWGPvRMMwwWMzgXx0Ww';
  
  // Convert a location name to longitude and latitude using the Mapbox Geocoding API
  const convertLocationToLatLng = async (location) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        return data.features[0].center; // [longitude, latitude]
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
    return [0, 0]; 
  };
  
  // Get the user's current location using Geolocation API
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            resolve([longitude, latitude]); // Return as [lng, lat]
          },
          error => {
            console.error('Error getting current location:', error);
            reject([0, 0]); // Default location if error
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        reject([0, 0]); // Default location if unsupported
      }
    });
  };
  
  // Get directions between two points
  const getDirections = async (start, end) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
  
      // Ensure there are routes available
      if (data.routes && data.routes.length > 0) {
        const coordinates = data.routes[0].geometry.coordinates;
        const distance = data.routes[0].distance;
        return { routeCoordinates: coordinates, distance };  // Return both coordinates and distance
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
      return { routeCoordinates: [], distance: 0 };  // Return empty array and 0 distance in case of error
    }
  };
  
  // Initialize the map
  onMounted(async () => {
    // Get the user's current location
    const userLocation = await getCurrentLocation(); // Wait for user's location
    const eventCoordinates = await convertLocationToLatLng(props.location);
  
    // Create the map instance and set the center to the user's coordinates
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: userLocation, // Set center to user's location
      zoom: 12
    });

    // Get directions from the user's location to the event location
    const { routeCoordinates, distance } = await getDirections(userLocation, eventCoordinates);
  
    // Set the total distance in kilometers
    if (distance) {
      totalDistance.value = (distance / 1000).toFixed(2);
    }
  
    // Draw the route on the map if routeCoordinates are available
    if (routeCoordinates.length > 0) {
      map.on('load', () => {
        // Add the route to the map
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: routeCoordinates
            }
          }
        });
  
        // Add a layer to visualize the route
        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#888',
            'line-width': 8
          }
        });
      });
    } else {
      console.error('No route coordinates available');
    }
  });
  </script>
  
  <style scoped>
  </style>
  