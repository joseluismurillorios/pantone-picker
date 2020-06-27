<template>
  <div class="colors__list p-4 w-full bg-white rounded shadow-sm">
    <div class="colors__list--inner flex flex-wrap">
      <template v-if="results.length > 0">
        <template
          v-for="(color, i) in results"
        >
          <ColorItem
            v-if="color.name !== 'NextPage'"
            :color="color"
            :key="'group-' + i"
            classProp="color relative w-1/7 lg:w-1/19"
            :onEnter="showTooltip"
            :onExit="closeTooltip"
            :onCopy="showToast"
          />
        </template>
      </template>
      <template v-else>
        <div
          v-for="(group, i) in groups"
          :key="'group-' + i"
          class="colors__list--group flex lg:flex-col text-center w-full lg:w-1/19"
          :class="i > 0 && i % 18 === 0 ? 'mb-5' : ''"
        >
          <ColorItem
            v-for="(color, j) in group"
            :key="color.name + j"
            :color="color"
            classProp="color relative w-1/7 lg:w-full"
            :onEnter="showTooltip"
            :onExit="closeTooltip"
            :onCopy="showToast"
          />
        </div>
      </template>
    </div>

    <tooltip
      className="bg-black px-4 py-1 rounded text-white text-2xs font-bold tracking-wider transform -translate-x-1/2 truncate"
      :show="tooltip.show"
      :x="tooltip.x"
      :y="tooltip.y"
      :text="tooltip.text"
    />

    <transition name="fade">
      <div v-if="toast.show" class="toast__holder fixed z-10 right-0 top-0 p-4 md:p-6">
        <div class="toast text-center">
          <div
            class="p-3 bg-indigo-800 items-center text-indigo-100 leading-none rounded-lg flex lg:inline-flex"
            role="alert"
          >
            <span
              class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3"
            >
              Copied
            </span>
            <span
              class="hidden md:block font-semibold mr-2 text-left flex-auto"
            >
              {{toast.name}}
            </span>
            <span class="font-semibold mr-2 text-left flex-auto">{{toast.hex}}</span>
            <svg
              class="fill-current opacity-75 h-4 w-4"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              v-on:click="closeToast"
            >
              <title>Close</title>
              <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
              />
            </svg>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import tooltip from '@/components/atoms/tooltip/tooltip.vue';

import ColorItem from './ColorItem.vue';

export default {
  name: 'ColorList',
  components: {
    ColorItem,
    tooltip,
  },
  data: () => ({
    tooltip: {
      x: 0,
      y: 0,
      show: false,
      text: 'Tooltip',
    },
    toast: {
      show: false,
      hex: '#222222',
      name: 'PANTONE 125 C',
    },
  }),
  computed: {
    ...mapState({
      groups: (state) => state.colorGroups,
      results: (state) => state.filter.results,
    }),
    ...mapGetters({
      resultsCount: 'resultsCount',
    }),
  },
  created() {
    window.addEventListener('scroll', this.closeTooltip);
  },
  mounted() {
    console.log(this.$store);
    console.log(this.resultsCount);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.closeTooltip);
  },
  methods: {
    closeTooltip() {
      this.$set(this.tooltip, 'show', false);
    },
    showTooltip(e, elem) {
      const rect = elem.getBoundingClientRect();
      this.tooltip = {
        x: rect.x + (rect.width / 2),
        // y: rect.y - rect.height + window.scrollY,
        y: rect.y - rect.height - 5,
        text: e,
        show: true,
      };
    },
    closeToast() {
      this.$set(this.toast, 'show', false);
    },
    showToast(hex, name) {
      this.toast = {
        hex,
        name,
        show: true,
      };
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.closeToast();
      }, 3000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
