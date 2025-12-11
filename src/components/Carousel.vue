<script setup lang="ts">
import {ref} from "vue";
import type {GetImageResult} from "astro";
const props = defineProps({images: {type: Array, required: true}}) as {readonly images: Partial<GetImageResult>[]};

const automatic = ref(true);
const currentImage = ref(0);

const move = (offset: number) => {
  currentImage.value += offset;

  if (currentImage.value >= props.images.length) {
    currentImage.value = 0;
  } else if (currentImage.value < 0) {
    currentImage.value = props.images.length - 1;
  }
};
</script>
<template>
  <div class="carousel">
    <img alt="" v-for="(img, idx) in props.images" :src="img.src" v-show="currentImage === idx" />

    <div class="overlay">
      <button @click="move(-1)"><i class="ph ph-caret-left"></i></button>
      <button @click="move(1)"><i class="ph ph-caret-right"></i></button>
    </div>
  </div>
</template>
<style lang="scss">
@use "../styles/colors";

$height: 30ch;

div.carousel {
  display: flex;
  height: $height;
  width: 100%;

  img {
    height: $height;
    width: auto;
  }

  div.overlay {
    button {
      color: colors.$white;
      background: none;
      border: none;
      font-size: 2em;
    }
  }
}
</style>
