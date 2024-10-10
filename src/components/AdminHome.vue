<script setup>
import { onMounted, ref, computed } from 'vue';
import { db } from '../../firebaseConfig.js';
import { getDocs, collection } from '@firebase/firestore';

const accounts = ref([]);
const searchFilters = ref({ name: '', email: '', role: '', rating: '', comment: '' });
const sortKey = ref('');
const sortDirection = ref(1);
const currentPage = ref(1);
const rowsPerPage = 10;

const getAccounts = async () => {
  try {
    const q = collection(db, "usersAccount");
    const users = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    accounts.value = users;
  } catch (error) {
    console.error('Error getting document: ', error);
  }
};

const sortedAndFilteredAccounts = computed(() => {
  let filtered = accounts.value.filter(user => {
    return Object.keys(searchFilters.value).every(key =>
      String(user[key]).toLowerCase().includes(searchFilters.value[key].toLowerCase())
    );
  });

  if (sortKey.value) {
    filtered = filtered.sort((a, b) => {
      if (a[sortKey.value] < b[sortKey.value]) return -1 * sortDirection.value;
      if (a[sortKey.value] > b[sortKey.value]) return 1 * sortDirection.value;
      return 0;
    });
  }

  return filtered.slice((currentPage.value - 1) * rowsPerPage, currentPage.value * rowsPerPage);
});

const changeSort = (key) => {
  if (sortKey.value === key) {
    sortDirection.value *= -1; // toggle direction
  } else {
    sortKey.value = key;
    sortDirection.value = 1; // default ascending
  }
};

onMounted(() => {
  getAccounts();
});
</script>

<template>
  <main class="p-10 bg-gray-100 min-h-screen text-center">
    <h1 class="text-2xl font-bold my-5 pt-10 text-gray-800">User Data Table</h1>

    <!-- Search Filters -->
    <div class="mb-4 flex justify-center space-x-4">
      <input v-model="searchFilters.name" placeholder="Search by Name" class="input-search" aria-label="Search by Name" tabindex="0">
      <input v-model="searchFilters.email" placeholder="Search by Email" class="input-search" aria-label="Search by Email" tabindex="0">
      <input v-model="searchFilters.role" placeholder="Search by Role" class="input-search" aria-label="Search by Role" tabindex="0">
      <input v-model="searchFilters.rating" placeholder="Search by Rating" class="input-search" aria-label="Search by Rating" tabindex="0">
      <input v-model="searchFilters.comment" placeholder="Search by Comment" class="input-search" aria-label="Search by Comment" tabindex="0">
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg" role="table">
        <thead class="bg-[#b89d77] text-left">
          <tr role="row">
            <th @click="changeSort('name')" class="px-8 py-4 text-left cursor-pointer" tabindex="0" aria-label="Sort by Name">
              Name <span v-if="sortKey === 'name'" aria-hidden="true">{{ sortDirection === 1 ? '↑' : '↓' }}</span>
            </th>
            <th @click="changeSort('email')" class="px-8 py-4 text-left cursor-pointer" tabindex="0" aria-label="Sort by Email">
              Email <span v-if="sortKey === 'email'" aria-hidden="true">{{ sortDirection === 1 ? '↑' : '↓' }}</span>
            </th>
            <th @click="changeSort('role')" class="px-8 py-4 text-left cursor-pointer" tabindex="0" aria-label="Sort by Role">
              Role <span v-if="sortKey === 'role'" aria-hidden="true">{{ sortDirection === 1 ? '↑' : '↓' }}</span>
            </th>
            <th @click="changeSort('rating')" class="px-8 py-4 text-left cursor-pointer" tabindex="0" aria-label="Sort by Rating">
              Rating <span v-if="sortKey === 'rating'" aria-hidden="true">{{ sortDirection === 1 ? '↑' : '↓' }}</span>
            </th>
            <th @click="changeSort('comment')" class="px-8 py-4 text-left cursor-pointer" tabindex="0" aria-label="Sort by Comment">
              Comment <span v-if="sortKey === 'comment'" aria-hidden="true">{{ sortDirection === 1 ? '↑' : '↓' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in sortedAndFilteredAccounts" :key="user.email"
              class="bg-white hover:bg-indigo-50 transition-all transform hover:scale-95" role="row">
            <td class="px-8 py-4 text-gray-800 border-b text-left" role="cell">{{ user.name }}</td>
            <td class="px-8 py-4 text-gray-800 border-b text-left" role="cell">{{ user.email }}</td>
            <td class="px-8 py-4 text-gray-800 border-b text-left" role="cell">{{ user.role }}</td>
            <td class="px-8 py-4 text-gray-800 border-b text-left" role="cell">{{ user.rating }}</td>
            <td class="px-8 py-4 text-gray-800 border-b text-left" role="cell">{{ user.comment }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 space-x-4">
      <button @click="currentPage > 1 && currentPage--" :disabled="currentPage === 1" class="btn-pagination" tabindex="0" aria-label="Previous Page">
        Previous
      </button>
      <span>Page {{ currentPage }}</span>
      <button @click="currentPage++" :disabled="(currentPage * rowsPerPage) >= accounts.length" class="btn-pagination" tabindex="0" aria-label="Next Page">
        Next
      </button>
    </div>
  </main>
</template>


<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0;
}

th:first-child, td:first-child {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

th:last-child, td:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

tbody tr {
  transition: background-color 0.3s, box-shadow 0.3s;
}

tbody tr:nth-child(even) {
  background-color: #f9fafb;
}

th, td {
  padding: 12px 20px; /* Adjust padding for better alignment */
  text-align: left;   /* Ensure alignment consistency */
}

.input-search {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
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
</style>
