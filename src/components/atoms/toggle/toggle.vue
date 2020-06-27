<template>
  <label class="hidden sm:inline" :for="name">
    <span class="mr-2 cursor-pointer select-none text-sm">Hex</span>
    <div class="switch">
      <input
        :id="name"
        name="grouped"
        type="checkbox"
        class="sr-only"
        :checked="checked"
        @change="changes"
      />
      <div class="track"></div>
      <div class="thumb"></div>
    </div>
    <span class="ml-2 cursor-pointer select-none text-sm">Name</span>
  </label>
</template>

<script>
export default {
  name: 'toggle',
  props: {
    name: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    changes(e) {
      this.onChange({
        name: this.name,
        value: e.target.checked,
      });
    },
  },
};
</script>

<style scoped lang="postcss">
  .switch {
    @apply relative inline-block align-middle cursor-pointer select-none bg-transparent;
  }
  .track {
    @apply w-10 h-5 bg-gray-600 rounded-full shadow-inner;
  }
  .thumb {
    @apply
      transition-all
      duration-300
      ease-in-out
      absolute
      top-0
      left-0
      w-5
      h-5
      bg-white
      border-2
      border-gray-600
      rounded-full;
  }
  input[type='checkbox']:checked ~ .thumb {
    @apply transform translate-x-full border-indigo-500;
  }
  input[type='checkbox']:checked ~ .track {
    @apply transform transition-colors bg-indigo-500;
  }
  input[type='checkbox']:disabled ~ .track {
    @apply bg-gray-500;
  }
  input[type='checkbox']:disabled ~ .thumb {
    @apply bg-gray-100 border-gray-500;
  }
  input[type='checkbox']:focus + .track,
  input[type='checkbox']:active + .track {
    @apply shadow-outline;
  }
</style>
