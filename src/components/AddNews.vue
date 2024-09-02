<template>
    <div class="flex flex-col min-h-screen mt-20">
      <!-- Form for uploading image, title, and URL -->
      <form @submit.prevent="handleSubmission">
        <div>
          <label for="image">Upload Image:</label>
          <input type="file" id="image" @change="handleImageUpload" />
        </div>
  
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="formData.title" placeholder="Enter Title" />
        </div>
  
        <div>
          <label for="url">URL:</label>
          <input type="text" id="url" v-model="formData.url" placeholder="Enter URL" />
        </div>
  
        <button type="submit">Add Image</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { storage, db } from '../../firebaseConfig.js';
  import { uploadBytes, getDownloadURL, ref as storageRef } from 'firebase/storage';
  import { doc, setDoc } from 'firebase/firestore';
  
  const formData = ref({
    title: '',
    url: '',
    imageFile: null,
  });
  

  
  const handleImageUpload = (event) => {
    formData.value.imageFile = event.target.files[0];
  };
  
  const handleSubmission = async () => {
    if (!formData.value.imageFile || !formData.value.title || !formData.value.url) {
      alert('Please fill out all fields and upload an image.');
      return;
    }
  
    try {
      // Upload Image to Firebase Storage
      const imageRef = storageRef(storage, `images/${formData.value.imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, formData.value.imageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);
  
      // Save article details in Firestore
      const articleDocRef = doc(db, 'articles', formData.value.title);
      await setDoc(articleDocRef, {
        title: formData.value.title,
        url: formData.value.url,
        imageUrl: imageUrl,
        isHighlighted: false,
        span: null,
      });
  
      
  
      alert('Image uploaded and data saved successfully!');
  
      // Clear the form
      formData.value.title = '';
      formData.value.url = '';
      formData.value.imageFile = null;
    } catch (e) {
      console.error('Error uploading image or saving data:', e);
    }
  };
  
 

  </script>
  