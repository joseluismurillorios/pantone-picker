<template>
  <div class="books overflow-y-hidden p-4">
    <div class="p-4 w-full mb-4 bg-white rounded shadow-sm">
      <div class="inline-flex items-center w-full h-10 md:w-1/2 mb-2 md:mb-0">
        <span class="text-sm font-bold mr-2 leading-3">Size: </span>
        <slider
          className="w-full md:w-auto min-w-1/4"
          name="thumbSize"
          :value="thumbSize"
          :onChange="onThumbSize"
          min="50"
          max="360"
        />
        <span class="text-xs font-bold ml-2 leading-3"> {{ thumbSize }}</span>
      </div>
      <div class="inline-block w-full md:w-1/2 ">
        <dropdown
          className="min-w-1/4"
          name="bookList"
          :options="bookList"
          :selected="selected"
          :onChange="onBookChange"
        />
      </div>
    </div>
    <div class="p-4 w-full bg-white rounded shadow-sm text-center">
      <template v-for="color in records">
        <div
          class="pantone inline-block max-w-full p-2"
          :key="color.name"
        >
          <div class="card shadow rounded-lg overflow-hidden">
            <p
              class="top w-full h-20 cursor-pointer flex items-center justify-center text-center truncate"
              :style="{
                'background-color': color.hex,
                color: color.hex,
                maxHeight: `${thumbSize}px`,
                width: `${thumbSize}px`,
              }"
              v-on:click="copy(color.hex, color.name)"
            >
              {{ color.name }}
            </p>
            <div v-if="+thumbSize > 80" class="bottom p-2 leading-3 text-left">
              <p v-if="+thumbSize > 100" class="text-xs truncate pb-1">
                <b v-if="+thumbSize > 160">{{ prefix }}</b>
                <b>{{ color.name.replace(prefix, '') }}</b>
              </p>
              <p>
                <small>{{ color.hex }}</small>
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import chroma from 'chroma-js';

import dropdown from '@/components/atoms/dropdown/dropdown.vue';
import slider from '@/components/atoms/slider/slider.vue';

import { copyText } from '@/helpers/helper-util';

const colorBooks = [
  {
    text: 'ANPA Color',
    value: 'ANPA Color.json',
  },
  {
    text: 'DIC Color Guide',
    value: 'DIC Color Guide.json',
  },
  // {
  //   text: 'FOCOLTONE',
  //   value: 'FOCOLTONE.json',
  // },
  // {
  //   text: 'HKS E Process',
  //   value: 'HKS E Process.json',
  // },
  {
    text: 'HKS E',
    value: 'HKS E.json',
  },
  // {
  //   text: 'HKS K Process',
  //   value: 'HKS K Process.json',
  // },
  {
    text: 'HKS K',
    value: 'HKS K.json',
  },
  // {
  //   text: 'HKS N Process',
  //   value: 'HKS N Process.json',
  // },
  {
    text: 'HKS N',
    value: 'HKS N.json',
  },
  // {
  //   text: 'HKS Z Process',
  //   value: 'HKS Z Process.json',
  // },
  {
    text: 'HKS Z',
    value: 'HKS Z.json',
  },
  {
    text: 'PANTONE SkinTone™ Guide',
    value: 'PANTONE SkinTone™ Guide.json',
  },
  {
    text: 'PANTONE+ CMYK Coated',
    value: 'PANTONE+ CMYK Coated.json',
  },
  {
    text: 'PANTONE+ CMYK Uncoated',
    value: 'PANTONE+ CMYK Uncoated.json',
  },
  {
    text: 'PANTONE+ Color Bridge Coated-V3',
    value: 'PANTONE+ Color Bridge Coated-V3.json',
  },
  {
    text: 'PANTONE+ Color Bridge Coated',
    value: 'PANTONE+ Color Bridge Coated.json',
  },
  {
    text: 'PANTONE+ Color Bridge Uncoated-V3',
    value: 'PANTONE+ Color Bridge Uncoated-V3.json',
  },
  {
    text: 'PANTONE+ Color Bridge Uncoated',
    value: 'PANTONE+ Color Bridge Uncoated.json',
  },
  {
    text: 'PANTONE+ Extended Gamut Coated',
    value: 'PANTONE+ Extended Gamut Coated.json',
  },
  {
    text: 'PANTONE+ Metallic Coated',
    value: 'PANTONE+ Metallic Coated.json',
  },
  {
    text: 'PANTONE+ Metallics Coated',
    value: 'PANTONE+ Metallics Coated.json',
  },
  {
    text: 'PANTONE+ Pastels & Neons Coated',
    value: 'PANTONE+ Pastels & Neons Coated.json',
  },
  {
    text: 'PANTONE+ Pastels & Neons Uncoated',
    value: 'PANTONE+ Pastels & Neons Uncoated.json',
  },
  {
    text: 'PANTONE+ Premium Metallics Coated',
    value: 'PANTONE+ Premium Metallics Coated.json',
  },
  {
    text: 'PANTONE+ Solid Coated-V3',
    value: 'PANTONE+ Solid Coated-V3.json',
  },
  {
    text: 'PANTONE+ Solid Coated',
    value: 'PANTONE+ Solid Coated.json',
  },
  {
    text: 'PANTONE+ Solid Uncoated-V3',
    value: 'PANTONE+ Solid Uncoated-V3.json',
  },
  {
    text: 'PANTONE+ Solid Uncoated',
    value: 'PANTONE+ Solid Uncoated.json',
  },
  {
    text: 'PANTONE® F+H cotton TCX',
    value: 'PANTONE® F+H cotton TCX.json',
  },
  {
    text: 'PANTONE® F+H nylon brights TN',
    value: 'PANTONE® F+H nylon brights TN.json',
  },
  {
    text: 'PANTONE® FHI Color Guide',
    value: 'PANTONE® FHI Color Guide.json',
  },
  {
    text: 'PANTONE® GoeBridge™ coated',
    value: 'PANTONE® GoeBridge™ coated.json',
  },
  {
    text: 'PANTONE® Goe™ coated',
    value: 'PANTONE® Goe™ coated.json',
  },
  {
    text: 'PANTONE® Goe™ uncoated',
    value: 'PANTONE® Goe™ uncoated.json',
  },
  {
    text: 'TOYO 94 COLOR FINDER',
    value: 'TOYO 94 COLOR FINDER.json',
  },
  {
    text: 'TOYO COLOR FINDER',
    value: 'TOYO COLOR FINDER.json',
  },
];

// https://github.com/jacobbubu/acb
export default {
  name: 'Books',
  components: {
    dropdown,
    slider,
  },
  data: () => ({
    records: {},
    selected: 'PANTONE+ Pastels & Neons Uncoated.json',
    bookList: colorBooks,
    prefix: '',
    thumbSize: '160',
  }),
  created() {
    this.fetchBook(`/books/${this.selected}`);
  },
  methods: {
    copy(str, name) {
      copyText(str, name);
    },
    fetchBook(url) {
      fetch(url)
        .then((response) => response.json())
        .then((book) => {
          const cs = book.colorSpace.toLowerCase();
          // this.records = Object.freeze(book.records);
          this.records = Object.keys(book.records).map((key) => {
            const record = book.records[key];
            return {
              code: record.code,
              name: record.name,
              [cs]: record.components,
              hex: chroma[cs](...record.components).hex(),
            };
          });
          // console.log(cs);
          // console.log(book);
          this.prefix = book.prefix;
          console.log(book);
          // console.log(this.records);
        });
    },
    onBookChange(e) {
      this.fetchBook(`/books/${e.value}`);
    },
    onThumbSize(e) {
      this.thumbSize = e.value;
    },
  },
};
</script>

<style lang="scss"></style>
