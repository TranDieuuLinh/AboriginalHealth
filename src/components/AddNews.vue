<template>
  <div class="flex flex-col min-h-screen w-screen my-20">
    <div class="flex flex-col items-center">
      <form class="max-w-md w-full p-5 bg-white rounded-lg shadow-lg" @submit.prevent="handleImageUpload">
        <div class="mb-5">
          <label for="image" class="text-lg font-semibold">Upload file:</label>
          <div
            class="my-2 shadow-sm p-5 bg-gray-100 text-center cursor-pointer"
            @click="imageInput.click()"
            role="button"
            tabindex="0"
            @keydown.enter="imageInput.click()"
            aria-label="Choose image to upload">
            <i class="fa fa-upload mr-2"></i> Choose Image
          </div>
          <input type="file" ref="imageInput" id="image" @change="handleImageInput" class="hidden" aria-required="true"/>
          <div v-if="formData.imageFile" class="text-green-600" aria-live="polite">File selected: {{ formData.imageFile.name }}</div>
        </div>
        <div class="mb-5">
          <label for="title" class="text-lg font-semibold">Title:</label>
          <input type="text" id="title" placeholder="Enter Title" v-model="formData.title" class="w-full border rounded-md p-3 my-2" aria-required="true"/>
        </div>
        <div class="mb-5">
          <label for="articleUrl" class="text-lg font-semibold">Article Url:</label>
          <input type="text" id="articleUrl" placeholder="Enter Article Url" v-model="formData.articleUrl" class="w-full border rounded-md p-3 my-2" aria-required="true"/>
        </div>
        <div class="mb-5 flex justify-end max-w-md">
          <button type="submit" class="bg-[#b89d77] text-white p-3 rounded-lg w-full" aria-label="Submit form to upload image">Add</button>
        </div>
      </form>
    </div>
    <div class="flex-grow mx-20 mt-10">
      <h1 class="text-xl">Articles</h1>
      <div class="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="each in articles"
          :key="each.title"
          class="text-[#642E08] p-4 md:p-6 rounded-xl shadow-lg flex flex-col text-md bg-white"
          tabindex="0"
          aria-label="Article with title {{ each.title }}">
          <div class="flex overflow-hidden h-48 w-full">
            <img :src="each.imageUrl" :alt="'Image for ' + each.title" class="w-full h-full object-cover">
          </div>
          <div class="flex font-bold py-3 text-md">
            <h2>{{ each.title }}</h2>
          </div>
          <div class="flex-grow"></div>
          <div class="flex mb-4 justify-start items-center">
            <input id="default-checkbox" type="checkbox" @change="handleHighlight(each)" v-model="each.isHighlighted" class="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" :aria-checked="each.isHighlighted.toString()">
            <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Highlight</label>
          </div>
          <div class="flex flex-col justify-between mt-auto gap-2">
            <div class="relative text-white" v-if="each.isHighlighted">
              <select @change="handleSpanHighlight(each)" v-model="each.spanHighlight" class="block w-full p-2 pl-3 pr-10 text-sm bg-[#b89d77] border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200" aria-required="true" :aria-disabled="!each.isHighlighted">
                <option value="" disabled selected>Choose a highlight width</option>
                <option v-for="span in [1, 2, 3]" :key="span" :value="span" :disabled="selectedSpan.includes(span)">
                  Span {{ span }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-2 flex items-center px-2 pointer-events-none">
                <i class="fas fa-chevron-down text-white"></i>
              </div>
            </div>
            <button @click="handleDeleteArticle(each.title)" class="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 text-center" aria-label="Delete article {{ each.title }}">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="inset-0 z-20 fixed flex items-center justify-center" aria-live="assertive">
      <i class="fa-solid fa-spinner animate-spin" aria-label="Loading"></i>
    </div>
  </div>
</template>


<script setup>
  import { db, storage } from '../../firebaseConfig.js';
  import { ref, onMounted } from 'vue';
  import { doc, setDoc, getDocs, collection, deleteDoc, updateDoc, query,where } from 'firebase/firestore';
  import { uploadBytes, getDownloadURL, ref as storageRef } from 'firebase/storage';


  const imageInput = ref(null);
  const loading  = ref(false);
  const articles = ref([]);
  const selectedSpan = ref([]);

  const formData = ref({
    imageFile :null,
    title: '',
    articleUrl: ''
  });


  const getSpanHighlight = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'articles'), where('spanHighlight', '>', 0))
    );
    selectedSpan.value = querySnapshot.docs.map(doc => doc.data().spanHighlight);
  } catch (error) {
    console.error('Error fetching spanHighlight values:', error);
    alert('Failed to fetch spanHighlight values. ❌');
  }
};


  const handleSpanHighlight = async (each) =>{
    try{  
        await updateDoc(doc(db,'articles', each.title),{spanHighlight: each.spanHighlight});
        getArticles();
        getSpanHighlight();
        alert('Highlight width update successfully! 🎉');
      }
      catch (error) {
          console.error('Error update document: ', error);
          alert('Failed to update highlight width. ❌');}
  };

  const handleHighlight = async(each) =>{
    
    const countHighlighted = articles.value.filter((article) => article.isHighlighted).length;
    if (countHighlighted > 3) {
      alert("You can only highlight up to 3 articles")
      each.isHighlighted = false;
      return;
    }
    try{  
      if (each.isHighlighted === false){
        await updateDoc(doc(db,'articles', each.title),{spanHighlight: 0})
      }
      await updateDoc(doc(db,'articles', each.title),{isHighlighted: each.isHighlighted});
      getArticles();
      getSpanHighlight();
      alert('Highlight update successfully! 🎉');
    }
    catch (error) {
        console.error('Error update document: ', error);
        alert('Failed to highlight the article. ❌');}
    
  };

  const handleDeleteArticle = async(docId) =>{
    try{
        await deleteDoc(doc(db,'articles', docId));
        alert('Article deleted successfully! 🎉');
        getArticles();
        getSpanHighlight();
      }
      catch (error) {
          console.error('Error delete document: ', error);
          alert('Failed to delete the article. ❌');
        }
  };

  const handleImageInput=(event) =>{
      formData.value.imageFile = event.target.files[0];
    }; 

  const handleImageUpload = async() =>{
    if(!formData.value.title || !formData.value.imageFile || !formData.value.articleUrl){
      alert("Please fill in all the fields before submitting!❌")
      return;
    } else {
      const imageRef = storageRef(storage, `articleImages/${formData.value.imageFile.name}`);
      loading.value = true;
      await uploadBytes(imageRef, formData.value.imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      const articleDocRef = doc(db,'articles', formData.value.title);
      await setDoc(articleDocRef,{
        title: formData.value.title,
        articleUrl: formData.value.articleUrl,
        imageUrl:imageUrl,
        isHighlighted: false,
        spanHighlight: 0
      });

      formData.value.title = '';
      formData.value.imageFile = null;
      formData.value.articleUrl = '';
      loading.value=false;
      alert ("Your file has been uploaded Successfully!☘️")
      getArticles();
    }
  };

  const getArticles = async() =>{
    
    try{
    const article = [];
    const articleDocRef = collection(db,'articles');
    const querySnapshot = await getDocs(articleDocRef);

    querySnapshot.forEach((doc) => {
      article.push(doc.data());
    });
    console.log('Fetched articles:', article); 
    articles.value = article;
    
  }
  catch (error) {
      console.error('Error getting document: ', error);
      alert('Failed to get articles. ❌');
    }
  };

  onMounted(() => {
    getArticles();
    getSpanHighlight();
  });

  
</script>
