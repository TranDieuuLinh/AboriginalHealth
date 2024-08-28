<script setup>
import accounts from '../assets/json/accounts.json';
</script>

<template>
  <main class="p-10 bg-gray-100 min-h-screen text-center">
    <h1 class="text-2xl font-mono my-3 pt-10 text-gray-800">User Data Table</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <tr>
            <th class="px-8 py-4 text-left text-base font-semibold tracking-wide uppercase">Name</th>
            <th class="px-8 py-4 text-left text-base font-semibold tracking-wide uppercase">Email</th>
            <th class="px-8 py-4 text-left text-base font-semibold tracking-wide uppercase">Role</th>
            <th class="px-8 py-4 text-left text-base font-semibold tracking-wide uppercase">Rating</th>
            <th class="px-8 py-4 text-left text-base font-semibold tracking-wide uppercase">Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in accounts" :key="user.email" 
              class="bg-white hover:bg-indigo-50 transition-all transform hover:scale-95">
            <td class="px-8 py-4 text-gray-800 border-b">{{ user.name }}</td>
            <td class="px-8 py-4 text-gray-800 border-b">{{ user.email }}</td>
            <td class="px-8 py-4 text-gray-800 border-b">{{ user.role }}</td>
            <td class="px-8 py-4 text-gray-800 border-b" v-if="user.rating !== undefined">{{ user.rating }}</td>
            <td class="px-8 py-4 text-gray-800 border-b" v-if="user.comment !== undefined">{{ user.comment }}</td>
          </tr>
        </tbody>
      </table>
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
  padding: 12px 40px;
}
</style>
