<script setup>
import { onMounted, ref, computed } from 'vue';
import { db } from '../../firebaseConfig.js';
import { getDocs, collection } from '@firebase/firestore';

const accounts = ref([]);
const searchFilters = ref({ name: '', email: '', role: '', rating: '', comment: '' });
const sortKey = ref('name');  // Default sort by name
const sortDirection = ref(1);  // Default sort direction: ascending
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
      <input v-model="searchFilters.name" placeholder="Search by Name" class="input-search">
      <input v-model="searchFilters.email" placeholder="Search by Email" class="input-search">
      <input v-model="searchFilters.role" placeholder="Search by Role" class="input-search">
      <input v-model="searchFilters.rating" placeholder="Search by Rating" class="input-search">
      <input v-model="searchFilters.comment" placeholder="Search by Comment" class="input-search">
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead class="bg-[#b89d77] text-left">
          <tr>
            <th @click="changeSort('name')" class="px-8 py-4 text-left cursor-pointer">
              Name <span v-if="sortKey === 'name'">{{ sortDirection === 1 ? '↑' : '↓' }}</span>
            </th>
            <th @click="changeSort('email')" class="px-8 py-4 text-left cursor-pointer">
              Email <span v-if="sortKey === 'email'">{{ sortDirection === 1 ? '↑' : '↓' }}</span>
            </th>
            <th @click="changeSort('role')" class="px-8 py-4 text-left cursor-pointer">
              Role <span v-if="sortKey === 'role'">{{ sortDirection === 1 ? '↑' : '↓' }}</span>
            </th>
            <th @click="changeSort('rating')" class="px-8 py-4 text-left cursor-pointer">
              Rating <span v-if="sortKey === 'rating'">{{ sortDirection === 1 ? '↑' : '↓' }}</span>
            </th>
            <th @click="changeSort('comment')" class="px-8 py-4 text-left cursor-pointer">
              Comment <span v-if="sortKey === 'comment'">{{ sortDirection === 1 ? '↑' : '↓' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in sortedAndFilteredAccounts" :key="user.email"
              class="bg-white hover:bg-indigo-50 transition-all transform hover:scale-95">
            <td class="px-8 py-4 text-gray-800 border-b text-left">{{ user.name }}</td>
            <td class="px-8 py-4 text-gray-800 border-b text-left">{{ user.email }}</td>
            <td class="px-8 py-4 text-gray-800 border-b text-left">{{ user.role }}</td>
            <td class="px-8 py-4 text-gray-800 border-b text-left">{{ user.rating }}</td>
            <td class="px-8 py-4 text-gray-800 border-b text-left">{{ user.comment }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 space-x-4">
      <button @click="currentPage > 1 && currentPage--" :disabled="currentPage === 1" class="btn-pagination">
        Previous
      </button>
      <span>Page {{ currentPage }} </span>
      <button @click="currentPage++" :disabled="(currentPage * rowsPerPage) >= accounts.length" class="btn-pagination">
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
