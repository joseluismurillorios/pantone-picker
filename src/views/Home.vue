<template>
  <div class="home p-4 bg-gray-200">
    <ColorList />
</template>

<script>
// @ is an alias to /src
import ColorList from '@/components/molecules/colorlist/ColorList.vue';

export default {
  name: 'Home',
  components: {
    // DeckList,
    ColorList,
  },
};
</script>
