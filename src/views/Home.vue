<template>
  <div class="home p-4">
    <!-- <alert /> -->
    <SearchBar />
    <ColorList />
  </div>
</template>

<script>
// @ is an alias to /src
import ColorList from '@/components/molecules/colorlist/ColorList.vue';
import SearchBar from '@/components/molecules/searchbar/SearchBar.vue';
// import alert from '@/components/snippets/alert.vue';

export default {
  name: 'Home',
  components: {
    ColorList,
    SearchBar,
    // alert,
  },
};
</script>
