<template>
  <div class="flex justify-center items-center h-screen bg-[#82502d] xs:px-5">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm" role="form" aria-labelledby="login-title">
      <h2 id="login-title" class="text-2xl font-bold text-center mb-4">Login</h2>
      <form @submit.prevent="login" aria-describedby="login-error">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
            aria-label="Email"
            aria-required="true"
            aria-invalid="loginError !== ''"
            aria-describedby="email-description"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
          <span id="email-description" class="sr-only">Please enter your email address.</span>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
            aria-label="Password"
            aria-required="true"
            aria-invalid="loginError !== ''" 
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
          <span id="password-description" class="sr-only">Please enter your password.</span>
        </div>
        <button
          type="submit"
          class="w-full bg-[#82502d] text-white font-semibold py-2 rounded hover:bg-[#6c3e1d]"
        >
          Login
        </button>
        <div v-if="loginError" id="login-error" class="text-red-500 text-sm text-center mt-2">{{ loginError }}</div>
      </form>
      <p class="mt-4 text-center text-sm">
        Don't have an account? 
        <RouterLink to="/signup" class="text-blue-600 hover:text-blue-500">Sign up</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '../../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const loginError = ref('');

const router = useRouter();
const auth = getAuth();

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    // Create a document reference
    const docRef = doc(db, 'usersAccount', email.value); 
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      if (docData.password === password.value) {
        localStorage.setItem('userRole', docData.role);
        localStorage.setItem('userName', docData.name);
        localStorage.setItem('userEmail', docData.email);

        const routePath = docData.role === 'admin' ? '/adminHome' : '/';
        router.push(routePath).then(() => {
          router.go(0); // Refresh the page
        });
      } else {
        loginError.value = 'Invalid email or password';
      }
    } else {
      loginError.value = 'User does not exist!';
    }
  } catch (error) {
    console.error('Error getting document: ', error);
    loginError.value = 'An error occurred while logging in. Please try again.';
  }
};
</script>

<style scoped>
/* Screen reader only class for descriptions */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap; /* added for consistency */
  word-wrap: normal; /* added for consistency */
}
</style>
