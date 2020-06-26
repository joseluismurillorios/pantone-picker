<template>
  <nav class="sticky top-0 z-10 flex items-center justify-between flex-wrap bg-white p-6">
    <div class="flex items-center flex-shrink-0 text-black mr-10">
      <span class="font-semibold text-xl tracking-tight">Pantone Picker</span>
    </div>
    <div class="block md:hidden">
      <button
        class="
          flex
          items-center
          px-3
          py-2
          border
          rounded
          text-gray-800
          border-gray-400
          hover:text-black
          hover:border-black
        "
      >
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
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
import { mapState } from 'vuex';

export default {
  name: 'Router',
  components: {
  },
  computed: {
    ...mapState({
      term: (state) => state.filter.term,
    }),
  },
  methods: {
  },
};
</script>
