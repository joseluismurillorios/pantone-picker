<template>
  <div
    class="relative"
    :class="className"
  >
    <button ref="wrapper" @click="togglePopover">
      <slot name="text"></slot>
    </button>
    <transition name="fade">
      <div class="absolute z-10" v-if="show" ref="dropdown" :style="style">
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
// import tooltip from '@/components/atoms/tooltip/tooltip.vue';

export default {
  name: 'popover',
  components: {
    // tooltip,
  },
  data: () => ({
    style: {
      right: 0,
    },
    show: false,
  }),
  props: {
    name: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.alignPopover();
    window.addEventListener('click', this.closePopover);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closePopover);
  },
  methods: {
    changes(e) {
      this.onChange({
        name: this.name,
        value: e.target.value,
      });
    },
    togglePopover(e) {
      e.preventDefault();
      e.stopPropagation();
      this.show = !this.show;
    },
    closePopover() {
      if (this.show) {
        this.show = false;
      }
    },
    alignPopover() {
      const wrapperRef = this.$refs.wrapper;
      const wrapperRect = wrapperRef.getBoundingClientRect();
      // const dropdownRef = this.$refs.dropdown;
      // const dropdownRect = dropdownRef.getBoundingClientRect();
      const {
        clientWidth,
        clientHeight,
      } = document.documentElement;
      const centerX = clientWidth / 2;
      const centerY = clientHeight / 2;
      const newStyle = {};
      if (wrapperRect.bottom < centerX) {
        newStyle.top = `${wrapperRect.height + 5}px`;
      } else {
        newStyle.bottom = `${wrapperRect.height + 5}px`;
      }
      if (wrapperRect.left < centerY) {
        newStyle.left = '0px';
      } else {
        newStyle.right = '0px';
      }
      this.style = newStyle;
    },
  },
};
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
