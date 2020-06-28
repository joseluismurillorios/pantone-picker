<template>
  <nav class="sticky top-0 z-10 flex items-center justify-between flex-wrap bg-white p-6">
    <div class="flex items-center flex-shrink-0 text-black mr-10">
      <span class="font-semibold text-xl tracking-tight">Pantone Picker</span>
    </div>
    <div class="block md:hidden">
      <popover>
        <template v-slot:text>
          <div
            class="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-200 hover:text-black hover:border-black"
          >
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </div>
        </template>
        <template v-slot:dropdown>
          <div
            class="bg-white text-base z-50 float-left py-2 list-none text-left border border-gray-200 rounded shadow-lg mt-1"
            style="min-width:12rem"
          >
            <router-link
              to="/"
              class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800 hover:bg-gray-200"
            >
              Home
            </router-link>
            <div class="h-0 my-2 border border-solid border-t-0 border-gray-200"></div>
            <router-link
              to="/books"
              class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800 hover:bg-gray-200"
            >
              Books
            </router-link>
            <router-link
              to="/about"
              class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800 hover:bg-gray-200"
            >
              About
            </router-link>
          </div>
        </template>
      </popover>
    </div>
    <div class="w-full hidden md:block flex-grow md:flex md:items-center md:w-auto">
      <div class="text-sm md:flex-grow">
        <router-link
          to="/"
          class="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-black font-bold mr-0 md:mr-8"
        >
          Home
        </router-link>
        <router-link
          to="/books"
          class="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-black font-bold mr-0 md:mr-8"
        >
          Books
        </router-link>
        <router-link
          to="/about"
          class="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-black font-bold mr-0 md:mr-8"
        >
          About
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import popover from '@/components/atoms/popover/popover.vue';

export default {
  name: 'Router',
  components: {
    popover,
  },
  methods: {},
};
</script>
