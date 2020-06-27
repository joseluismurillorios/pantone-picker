<template>
  <div class="colors__list p-4 mb-4 w-full bg-white rounded shadow-sm">
    <div class="colors__list--inner flex items-center justify-between">
      <div>
        <span class="text-sm font-bold mr-2">Display: </span>
        <toggle name="showNames" :checked="showNames" :onChange="updateSearchFilter" />
      </div>
      <div class="flex">
        <dropdown
          className="mr-4"
          name="searchBy"
          :options="searchOptions"
          :selected="searchBy"
          :onChange="updateSearchFilter"
        />
        <searchinput :onUpdate="updateTerm" :text="searchTerm" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import dropdown from '@/components/atoms/dropdown/dropdown.vue';
import searchinput from '@/components/atoms/searchinput/searchinput.vue';
import toggle from '@/components/atoms/toggle/toggle.vue';

export default {
  name: 'SearchBar',
  components: {
    dropdown,
    searchinput,
    toggle,
  },
  computed: {
    ...mapState({
      searchTerm: (state) => state.filter.searchTerm,
      searchBy: (state) => state.filter.searchBy,
      searchOptions: (state) => state.filter.searchOptions,
      showNames: (state) => state.filter.showNames,
    }),
  },
  mounted() {
    console.log(this.searchOptions);
  },
  methods: {
    ...mapActions({
      updateSearchTerm: 'updateTerm',
      updateSearch: 'updateSearch',
    }),
    updateTerm(e) {
      this.updateSearchTerm(e);
    },
    updateSearchFilter(e) {
      this.updateSearch(e);
    },
  },
};
</script>

<style scoped lang="postcss">
</style>
