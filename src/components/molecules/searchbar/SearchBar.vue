<template>
  <div class="colors__list p-4 mb-4 w-full bg-white rounded shadow-sm">
    <div class="colors__list--inner flex flex-wrap">
      <SearchInput />
    </div>
  </div>
</template>

<script>
import SearchInput from './SearchInput.vue';

export default {
  name: 'ColorList',
  components: {
    SearchInput,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
