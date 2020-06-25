<template>
  <div class="home">
    <!-- <DeckList msg="Welcome to Your Vue.js Apps" /> -->
    <ColorList />
    <div class="md:flex bg-white rounded-lg p-6">
      <img
        class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
        src="../assets/logo.png"
      >
      <div class="text-center md:text-left">
        <h2 class="text-lg">Erin Lindford</h2>
        <div class="text-purple-500">Customer Support</div>
        <div class="text-gray-600">erinlindford@example.com</div>
        <div class="text-gray-600">(555) 765-4321</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import DeckList from '@/components/molecules/decklist/DeckList.vue';
import ColorList from '@/components/molecules/colorlist/ColorList.vue';

export default {
  name: 'Home',
  components: {
    // DeckList,
    ColorList,
  },
};
</script>
