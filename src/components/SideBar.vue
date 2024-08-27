<template>
    <div class="fixed inset-0 flex z-40">
      <div class="absolute flex top-0 h-screen z-20" :class="[right ? 'right-0 flex-row' : 'left-0 flex-row-reverse']">
        <button
          @click.prevent="$emit('toggle')"
          class="w-12 h-48 p-1 my-auto rounded text-white bg-gray-600 text-center focus:outline-none hover:bg-gray-500 transition-color duration-300"
        >
          <span :class="[right ? '-rotate-90' : 'rotate-90']" class="block transform origin-center font-bold">
            Drawer
          </span>
        </button>
  
        <div
          class="transition-all duration-700 bg-yellow-200 overflow-hidden flex items-center justify-center"
          :class="[open ? 'max-w-lg' : 'max-w-0']"
        >
          <div class="w-48 text-center font-bold text-xl">Sidebar</div>
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      right: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Sidebar styles */
  </style>
  