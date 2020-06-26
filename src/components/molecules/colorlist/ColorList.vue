<template>
  <div class="colors__list p-4 w-full bg-white rounded shadow-sm">
    <div class="colors__list--inner flex flex-wrap">
      <template v-if="sarchItems.length > 0">
        <template
          v-for="(color, i) in sarchItems"
        >
          <ColorItem
            v-if="color.name !== 'NextPage'"
            :color="color"
            :key="'group-' + i"
            classProp="color relative w-1/7 lg:w-1/19"
            :onEnter="enter"
            :onExit="exit"
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
            :onEnter="enter"
            :onExit="exit"
            :onCopy="showToast"
          />
        </div>
      </template>
    </div>
    <transition name="fade">
      <div
        class="tooltip fixed z-10 bg-black px-4 py-1 rounded text-white text-2xs font-bold tracking-wider transform -translate-x-1/2 truncate"
        :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }"
        v-if="tooltip.show"
        transition="fade"
      >
        {{tooltip.text}}
      </div>
    </transition>

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
import { mapState } from 'vuex';

import { throttle } from '@/helpers/helper-util';
import colors from '@/helpers/helper-color';
import ColorItem from './ColorItem.vue';

export default {
  name: 'ColorList',
  components: {
    ColorItem,
  },
  data: () => ({
    colors,
    sarchItems: [],
    groups: {},
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
      term: (state) => state.filter.term,
    }),
  },
  created() {
    this.groupColors();
    this.$store.watch(
      (state) => state.filter.term,
      (newValue) => {
        this.search(newValue, this.colors, this.updateSearchItems);
      },
    );
    window.addEventListener('scroll', this.exit);
  },
  mounted() {
    console.log(this.$store);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.exit);
  },
  methods: {
    groupColors() {
      this.groups = {};
      let currentRowIndex = 0;
      let currentIndex = 0;
      for (let i = 0; i < colors.length; i += 1) {
        if (colors[i].name === 'NextPage') {
          currentRowIndex += 1;
          currentIndex = 0;
        } else {
          if (i !== 0 && (currentIndex + 1) % 8 === 0) {
            currentRowIndex += 1;
            currentIndex = 0;
          }
          if (!this.groups[currentRowIndex]) {
            this.groups[currentRowIndex] = [];
          }
          this.groups[currentRowIndex].push(colors[i]);
          currentIndex += 1;
        }
      }
    },
    enter(e, elem) {
      const rect = elem.getBoundingClientRect();
      this.tooltip = {
        x: rect.x + (rect.width / 2),
        // y: rect.y - rect.height + window.scrollY,
        y: rect.y - rect.height,
        text: e,
        show: true,
      };
    },
    exit() {
      this.$set(this.tooltip, 'show', false);
    },
    search: throttle((term, clrs, fn) => {
      if (term.length > 1) {
        const sarchItems = clrs.filter((color) => (
          new RegExp(term, 'gi').test(color.name)
            || new RegExp(term, 'gi').test(color.components)
        ));
        fn(sarchItems);
      } else {
        fn([]);
      }
    }, 500),
    updateSearchItems(sarchItems) {
      this.sarchItems = sarchItems;
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
