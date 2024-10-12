<script setup>
import { onMounted, ref, computed } from 'vue';
import { db } from '../../firebaseConfig.js';
import { getDocs, collection } from '@firebase/firestore';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


// Register Chart.js components
Chart.register(...registerables, ChartDataLabels);

const chartRef = ref(null);
const chartInstance = ref(null);
const roleCounts = ref({});

const accounts = ref([]);
const searchFilters = ref({ name: '', email: '', role: '', rating: '', comment: '' });
const sortKey = ref('');
const sortDirection = ref(1);
const currentPage = ref(1);
const rowsPerPage = 10;
const totalUsers = ref(0);

// Export to PDF Function
const exportToPDF = () => {
  const doc = new jsPDF();
  const headers = ['Name', 'Email', 'Role', 'Rating', 'Comment'];
  const rows = sortedAndFilteredAccounts.value.map(user => [
    user.name,
    user.email,
    user.role,
    user.rating,
    user.comment
  ]);

  // Using autoTable method
  doc.autoTable({
    head: [headers],
    body: rows,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [178, 157, 119] }, // Matches table header color
  });

  doc.save('user_data.pdf');
};

// Fetch Accounts from Firestore
const getAccounts = async () => {
  try {
    const q = collection(db, "usersAccount");
    const users = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    totalUsers.value = users.length;
    accounts.value = users;

    // Count the number of users by role
    const counts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    roleCounts.value = counts;
    createChart();
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
};

// Computed Property for Sorting and Filtering
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

// Function to Change Sorting Key and Direction
const changeSort = (key) => {
  if (sortKey.value === key) {
    sortDirection.value *= -1; // Toggle direction
  } else {
    sortKey.value = key;
    sortDirection.value = 1; // Default ascending
  }
};

// Create or Update the Chart
const createChart = () => {
  if (chartInstance.value) {
    chartInstance.value.destroy();  
  }

  const ctx = chartRef.value.getContext('2d');
  chartInstance.value = new Chart(ctx, {
    type: 'pie', 
    data: {
      labels: Object.keys(roleCounts.value),  
      datasets: [{
        label: 'Number of Users by Role',
        data: Object.values(roleCounts.value),  
        backgroundColor: generateColorPalette(Object.keys(roleCounts.value).length),
        borderWidth: 1,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 20,
            padding: 15,
          }
        },
        datalabels: {
          color: '#fff', // Label color
          font: {
            size: 14,
          },
          formatter: (value) => value + ' users', 
        },
      }
    },
  });
};


// Utility Function to Generate Color Palette
const generateColorPalette = (numColors) => {
  const palette = [
    '#b89d77', // Brownish
    '#142359', // Dark Blue
  ];
  return palette.slice(0, numColors);
};

onMounted(() => {
  getAccounts();
});
</script>

<template>
  <main class="p-10 bg-gray-100 min-h-screen flex flex-col items-center">
    <h1 class="text-2xl font-bold pt-10 text-gray-800 mb-2">User Data Table</h1>
    <p class="mb-8 mt-3 text-lg">Total users: {{ totalUsers }}</p>

    <!-- Search Filters -->
    <div class="mb-6 w-full max-w-4xl flex flex-wrap justify-center space-x-4 space-y-2">
      <input 
        v-model="searchFilters.name" 
        placeholder="Search by Name" 
        class="input-search px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#142359] focus:outline-none" 
        aria-label="Search by Name" 
        tabindex="0"
      >
      <input 
        v-model="searchFilters.email" 
        placeholder="Search by Email" 
        class="input-search px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#142359] focus:outline-none" 
        aria-label="Search by Email" 
        tabindex="0"
      >
      <input 
        v-model="searchFilters.role" 
        placeholder="Search by Role" 
        class="input-search px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#142359] focus:outline-none" 
        aria-label="Search by Role" 
        tabindex="0"
      >
      <input 
        v-model="searchFilters.rating" 
        placeholder="Search by Rating" 
        class="input-search px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#142359] focus:outline-none" 
        aria-label="Search by Rating" 
        tabindex="0"
      >
      <input 
        v-model="searchFilters.comment" 
        placeholder="Search by Comment" 
        class="input-search px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#142359] focus:outline-none" 
        aria-label="Search by Comment" 
        tabindex="0"
      >
      <button 
        @click="exportToPDF" 
        class="bg-[#142359] text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-800 transition duration-300" 
        tabindex="0" 
        aria-label="Export"
      >
        Export to PDF
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto w-full max-w-4xl">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg" role="table">
        <thead class="bg-[#b89d77] text-left">
          <tr role="row">
            <th 
              @click="changeSort('name')" 
              class="px-8 py-4 text-left cursor-pointer" 
              tabindex="0" 
              aria-label="Sort by Name"
            >
              Name 
              <span v-if="sortKey === 'name'" aria-hidden="true">
                {{ sortDirection === 1 ? '↑' : '↓' }}
              </span>
            </th>
            <th 
              @click="changeSort('email')" 
              class="px-8 py-4 text-left cursor-pointer" 
              tabindex="0" 
              aria-label="Sort by Email"
            >
              Email 
              <span v-if="sortKey === 'email'" aria-hidden="true">
                {{ sortDirection === 1 ? '↑' : '↓' }}
              </span>
            </th>
            <th 
              @click="changeSort('role')" 
              class="px-8 py-4 text-left cursor-pointer" 
              tabindex="0" 
              aria-label="Sort by Role"
            >
              Role 
              <span v-if="sortKey === 'role'" aria-hidden="true">
                {{ sortDirection === 1 ? '↑' : '↓' }}
              </span>
            </th>
            <th 
              @click="changeSort('rating')" 
              class="px-8 py-4 text-left cursor-pointer" 
              tabindex="0" 
              aria-label="Sort by Rating"
            >
              Rating 
              <span v-if="sortKey === 'rating'" aria-hidden="true">
                {{ sortDirection === 1 ? '↑' : '↓' }}
              </span>
            </th>
            <th 
              @click="changeSort('comment')" 
              class="px-8 py-4 text-left cursor-pointer" 
              tabindex="0" 
              aria-label="Sort by Comment"
            >
              Comment 
              <span v-if="sortKey === 'comment'" aria-hidden="true">
                {{ sortDirection === 1 ? '↑' : '↓' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="user in sortedAndFilteredAccounts" 
            :key="user.email"
            class="bg-white hover:bg-indigo-50 transition-all transform hover:scale-95" 
            role="row"
          >
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
      <button 
        @click="currentPage > 1 && currentPage--" 
        :disabled="currentPage === 1" 
        class="btn-pagination bg-[#b89d77] text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-700 transition duration-300" 
        tabindex="0" 
        aria-label="Previous Page"
      >
        Previous
      </button>
      <span class="text-lg">Page {{ currentPage }}</span>
      <button 
        @click="currentPage++" 
        :disabled="(currentPage * rowsPerPage) >= accounts.length" 
        class="btn-pagination bg-[#b89d77] text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-700 transition duration-300" 
        tabindex="0" 
        aria-label="Next Page"
      >
        Next
      </button>
    </div>

    <!-- Chart Section -->
    <div class="mt-10 w-full max-w-xl">
      <div class=" shadow-lg">
        <p class="text-xl text-center font-semibold p-5 shadow-lg text-gray-800 bg-[#b89d77] ">Users distribution by Role</p>
        <canvas ref="chartRef"></canvas>
      </div>
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

.btn-pagination:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
