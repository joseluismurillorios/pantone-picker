<template>
  <div
    class="relative w-full sm:w-auto flex items-center justify-between mt-0 rounded-lg overflow-hidden text-gray-600 border-2 border-gray-300 bg-white"
    :class="className"
  >
    <select
      class="appearance-none h-10 pl-5 pr-10 flex-1 text-sm focus:outline-none"
      :name="name"
      :value="selected"
      @change="changes"
    >
      <option v-for="option in options" :key="option.text" :value="option.value">
        {{ option.text }}
      </option>
      <!-- <option value="">All</option>
      <option value="name">Name</option>
      <option value="component">Hex</option> -->
    </select>
    <div
      class="absolute pointer-events-none right-0 top-0 flex items-center justify-center h-10 w-10 focus:outline-none focus:bg-gray-200"
    >
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
</template>

<script>
// import tooltip from '@/components/atoms/tooltip/tooltip.vue';

export default {
  name: 'dropdown',
  components: {
    // tooltip,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    selected: {
      type: String,
      default: '*',
    },
    onChange: {
      type: Function,
      default: () => {},
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changes(e) {
      this.onChange({
        name: this.name,
        value: e.target.value,
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
