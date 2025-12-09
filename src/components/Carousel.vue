<script setup lang="ts">
import {ref} from "vue";

const automatic = ref(false);
const currentImage = ref(0);
</script>
<template>
  <div class="carousel">
    <slot />

    <div class="overlay">

    </div>
  </div>
</template>
<style lang="scss">
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
  }
}
</style>
