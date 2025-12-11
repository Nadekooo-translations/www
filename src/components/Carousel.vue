<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { GetImageResult } from "astro";
const props = defineProps({ images: { type: Array, required: true } }) as { readonly images: Partial<GetImageResult>[] };

let intervalRef: number|undefined;

const automatic = ref(true);
const currentImage = ref(0);

const move = (offset: number, fromAutomatic: boolean = false) => {
  if (!fromAutomatic) {
    automatic.value = false;
  }

  currentImage.value += offset;

  if (currentImage.value >= props.images.length) {
    currentImage.value = 0;
  } else if (currentImage.value < 0) {
    currentImage.value = props.images.length - 1;
  }
};

onMounted(() => {
  // @ts-ignore TS thinks this is node's setInterval for some reason
  intervalRef = setInterval(() => {
    if (automatic.value) {
      move(1, true);
    }
  }, 5000);
});

onUnmounted(() => {
  clearTimeout(intervalRef);
});
</script>
<template>
  <div class="carousel">
    <Transition name="carousel" v-for="(img, idx) in props.images">
      <img alt="" :src="img.src" :width="img.attributes.width" :height="img.attributes.height" v-show="currentImage === idx" />
    </Transition>

    <div class="overlay">
      <button @click="move(-1)"><i class="ph ph-caret-left"></i></button>
      <div class="pagination">
        <i v-for="(_, idx) in props.images" class="ph ph-dot" :class="{'current': currentImage === idx}"></i>
      </div>
      <button @click="move(1)"><i class="ph ph-caret-right"></i></button>
    </div>
  </div>
</template>
<style lang="scss">
@use "../styles/colors";
@use "sass:color";

$height: 45ch;

div.carousel {
  display: flex;
  height: $height;
  width: 75ch;
  user-select: none;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;

  background: colors.$stone-900;

  img {
    position: absolute;
    height: $height;
    width: auto;

    &.carousel-enter-active,
    &.carousel-leave-active {
      transition: opacity 0.5s ease;
    }

    &.carousel-enter-from,
    &.carousel-leave-to {
      opacity: 0;
    }
  }

  div.overlay {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    pointer-events: none;

    button {
      height: 100%;
      color: colors.$white;
      background: none;
      border: none;
      font-size: 2em;

      text-shadow: 0 0 4px black;
      cursor: pointer;
      pointer-events: all;

      &:hover {
        background: color.change(colors.$stone-950, $alpha: 50%);
      }
    }

    div.pagination {
      display: flex;
      align-items: end;
      font-size: 2em;
      text-shadow: 0 0 4px black;
      color: color.change(colors.$white, $alpha: 50%);

      i.current {
        color: colors.$white;
      }
    }
  }
}
</style>
