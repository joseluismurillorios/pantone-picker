<template>
  <div
    class="relative w-full sm:w-auto flex items-center justify-between mt-0 rounded-lg overflow-hidden text-gray-600 border-2 border-gray-300 bg-white"
      :class="className"
  >
    <input
      class="h-10 pl-5 flex-1 text-sm focus:outline-none min-w-0"
      type="search"
      name="search"
      placeholder="Search"
      :value="text"
      @input="onChange"
    />
    <button
      type="submit"
      class="flex items-center justify-center h-10 w-10 focus:outline-none focus:bg-gray-200"
    >
      <svg
        class="text-gray-600 h-4 w-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 56.966 56.966"
        xml:space="preserve"
        width="512px"
        height="512px"
      >
        <path
          d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'searchinput',
  props: {
    className: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    onUpdate: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    onChange(e) {
      this.onUpdate(e.target.value);
    },
  },
};
</script>
