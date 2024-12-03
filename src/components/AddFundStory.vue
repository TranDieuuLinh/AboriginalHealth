<template>
  <div class="flex flex-col min-h-screen w-screen my-20 ">
    <!-- Donation Form -->
    <div class="flex flex-col items-center xs:mx-5 mx-0 md:mx-0">
      <form class="max-w-md w-full p-5 bg-white rounded-lg shadow-lg" @submit.prevent="() => handleImageUpload('donation')">
        <div class="mb-5">
          <label for="donation-image" class="text-lg font-semibold">Upload Donation:</label>
          <div class="my-2 shadow-sm p-5 bg-gray-100 text-center cursor-pointer" @click="triggerFileInput('donation')" tabindex="0" @keypress.enter="triggerFileInput('donation')" role="button" aria-label="Upload Donation Image">
            <i class="fa fa-upload mr-2" aria-hidden="true"></i> <span>Choose Image</span>
          </div>
          <input type="file" ref="donationImageInput" id="donation-image" @change="event => handleImageInput('donation', event)" class="hidden" aria-label="Donation Image Input"/>
          <div v-if="formData.donation.imageFile" class="text-green-600">File selected: {{ formData.donation.imageFile.name }}</div>
        </div>
        <div class="mb-5">
          <label for="donation-title" class="text-lg font-semibold">Title:</label>
          <input type="text" id="donation-title" placeholder="Enter Title" v-model="formData.donation.title" class="w-full border rounded-md p-3 my-2" aria-required="true"/>
        </div>
        <div class="mb-5">
          <label for="donation-description" class="text-lg font-semibold">Description:</label>
          <input type="text" id="donation-description" placeholder="Enter Description" v-model="formData.donation.description" class="w-full border rounded-md p-3 my-2" aria-required="true"/>
        </div>
        <div class="mb-5 flex justify-end max-w-md">
          <button type="submit" class="bg-[#b89d77] text-white p-3 rounded-lg w-full" aria-label="Add Donation">Add</button>
        </div>
      </form>
    </div>

    <!-- Donation Stories Display -->
    <div class="flex-grow md:mx-20 mt-10 xs:mx-10">
      <h1 class="text-xl">Donation Stories</h1>
      <div class="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <div v-for="each in donationStories" :key="each.id" class="text-[#642E08] p-4 md:p-6 rounded-xl shadow-lg flex flex-col text-md bg-white">
          <div class="flex overflow-hidden h-48 w-full">
            <img :src="each.imageUrl" :alt="`Image of ${each.title}`" class="w-full h-full object-cover"/>
          </div>
          <div class="flex justify-center font-bold my-2">
            <h2>{{ each.title }}</h2>
          </div>
          <div class="flex text-black">
            <h2>{{ each.description }}</h2>
          </div>
          <div class="flex-grow"></div>
          <div class="flex flex-col justify-between my-3 gap-2">
            <button @click="() => handleDeleteDonationStories(each.id, 'donateStory')" class="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 text-center" aria-label="Delete Donation Story">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Our Story Form -->
    <div class="flex flex-col items-center pt-20">
      <form class="max-w-md w-full p-5 bg-white rounded-lg shadow-lg" @submit.prevent="() => handleImageUpload('our')">
        <div class="mb-5">
          <label for="our-image" class="text-lg font-semibold">Upload Our Story:</label>
          <div class="my-2 shadow-sm p-5 bg-gray-100 text-center cursor-pointer" @click="triggerFileInput('our')" tabindex="0" @keypress.enter="triggerFileInput('our')" role="button" aria-label="Upload Our Story Image">
            <i class="fa fa-upload mr-2" aria-hidden="true"></i> <span>Choose Image</span>
          </div>
          <input type="file" ref="ourImageInput" id="our-image" @change="event => handleImageInput('our', event)" class="hidden" aria-label="Our Story Image Input"/>
          <div v-if="formData.our.imageFile" class="text-green-600">File selected: {{ formData.our.imageFile.name }}</div>
        </div>
        <div class="mb-5">
          <label for="our-description" class="text-lg font-semibold">Description:</label>
          <input type="text" id="our-description" placeholder="Enter Description" v-model="formData.our.description" class="w-full border rounded-md p-3 my-2" aria-required="true"/>
        </div>
        <div class="mb-5 flex justify-end max-w-md">
          <button type="submit" class="bg-[#b89d77] text-white p-3 rounded-lg w-full" aria-label="Add Our Story">Add</button>
        </div>
      </form>
    </div>
    
    <!-- Our Stories Display -->
    <div class="flex-grow mx-20 md:mx-20 mt-10 xs:mx-10">
      <h1 class="text-xl">Our Stories</h1>
      <div v-for="each in ourStories" :key="each.id" class="text-[#642E08] p-4 md:p-10 rounded-xl shadow-lg flex flex-col text-md bg-white">
        <div class="flex overflow-hidden h-58 w-full">
          <img :src="each.imageUrl" :alt="`Our Story Image`" class="w-full h-full object-cover"/>
        </div>
        <div class="flex text-black py-4">
          <h2>{{ each.description }}</h2>
        </div>
        <div class="flex-grow"></div>
        <div class="flex flex-col justify-between my-3 gap-2">
          <button @click="() => handleDeleteDonationStories(each.id, 'ourStory')" class="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 text-center" aria-label="Delete Our Story">Delete</button>
        </div>
      </div>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="inset-0 z-20 fixed flex items-center justify-center" role="status" aria-live="polite">
      <i class="fa-solid fa-spinner animate-spin" aria-hidden="true"></i> <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db, storage } from '../../firebaseConfig.js';
import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { uploadBytes, getDownloadURL, ref as storageRef } from 'firebase/storage';

// State variables
const imageInput = {
  donation: ref(null),
  our: ref(null)
};
const loading = ref(false);
const donationStories = ref([]);
const ourStories = ref([]);

// Form data state
const formData = ref({
  donation: { imageFile: null, title: '', description: '' },
  our: { imageFile: null, description: '' }
});

// Handle image input change
const handleImageInput = (type, event) => {
  if (event.target.files && event.target.files[0]) {
    formData.value[type].imageFile = event.target.files[0];
  } else {
    alert('No file selected ❌');
  }
};

// Trigger file input click
const triggerFileInput = (type) => {
  const inputElement = document.getElementById(type === 'donation' ? 'donation-image' : 'our-image');
  if (inputElement) {
    inputElement.click();
  } else {
    console.error('File input element not found');
  }
};



// Handle image upload and form submission
// Handle image upload and form submission
const handleImageUpload = async (type) => {
  if (type === 'donation' && (!formData.value.donation.title || !formData.value.donation.imageFile || !formData.value.donation.description)) {
    alert("Please fill in all fields before submitting! ❌");
    return;
  }

  if (type === 'our' && (!formData.value.our.imageFile || !formData.value.our.description)) {
    alert("Please fill in all fields before submitting! ❌");
    return;
  }

  try {
    loading.value = true;
    const imageRef = storageRef(storage, `${type === 'donation' ? 'donateStory' : 'ourStory'}/${formData.value[type].imageFile.name}`);
    await uploadBytes(imageRef, formData.value[type].imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Add to the correct collection
    if (type === 'our') {
      const ourStoryCollection = collection(db, 'ourStory');
      const docRef = doc(ourStoryCollection, formData.value.our.description); // or another unique identifier
      await setDoc(docRef, {
        description: formData.value.our.description,
        imageUrl: imageUrl
      });
    } else {
      const donationStoryCollection = collection(db, 'donateStory');
      const docRef = doc(donationStoryCollection, formData.value.donation.title); // or another unique identifier
      await setDoc(docRef, {
        title: formData.value.donation.title,
        description: formData.value.donation.description,
        imageUrl: imageUrl
      });
    }

    // Reset form and file input
    formData.value[type].title = '';
    formData.value[type].imageFile = null;
    formData.value[type].description = '';
    if (imageInput[type].value) {
      imageInput[type].value.value = '';  // Reset file input field
    }

    alert("Your file has been uploaded successfully! ☘️");
    await getAllStories(); // Refresh the list after successful upload
  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Failed to upload the file. ❌');
  } finally {
    loading.value = false;
  }
};





// Fetch donation stories from Firestore
const getAllStories = async () => {
  try {
    loading.value = true;

    // Fetch donation stories
    const donationStoryCollection = collection(db, 'donateStory');
    const donationSnapshot = await getDocs(donationStoryCollection);
    donationStories.value = donationSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch our stories
    const ourStoryCollection = collection(db, 'ourStory');
    const ourSnapshot = await getDocs(ourStoryCollection);
    ourStories.value = ourSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  } catch (error) {
    console.error('Error fetching stories:', error);
    alert('Failed to fetch stories. ❌');
  } finally {
    loading.value = false;
  }
};


// Call getAllStories on component mount
onMounted(() => {
  getAllStories();
});

// Delete donation story
const handleDeleteDonationStories = async (id, collectionName) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    alert('Story deleted successfully! 🎉');
    await getAllStories(); // Refresh the list after deletion
  } catch (error) {
    console.error('Error deleting story:', error);
    alert('Failed to delete the story. ❌');
  }
};


</script>