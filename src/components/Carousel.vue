<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import type { GetImageResult } from "astro";
const props = defineProps({ images: { type: Array, required: true } }) as {
  readonly images: Partial<GetImageResult>[];
};

let intervalRef: number | undefined;

const automatic = ref(true);
const currentImageIndex = ref(0);

const currentImage = computed(() => props.images[currentImageIndex.value]);

const move = (offset: number, fromAutomatic: boolean = false) => {
  if (!fromAutomatic) {
    automatic.value = false;
  }

  currentImageIndex.value += offset;

  if (currentImageIndex.value >= props.images.length) {
    currentImageIndex.value = 0;
  } else if (currentImageIndex.value < 0) {
    currentImageIndex.value = props.images.length - 1;
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
      <img
        alt=""
        :src="img.src"
        :width="img.attributes?.width"
        :height="img.attributes?.height"
        v-show="currentImageIndex === idx"
      />
    </Transition>

    <div class="overlay">
      <button @click="move(-1)"><i class="ph ph-caret-left"></i></button>
      <div class="pagination">
        <i
          v-for="(_, idx) in props.images"
          class="ph ph-dot"
          :class="{ current: currentImageIndex === idx }"
        ></i>
      </div>
      <button @click="move(1)"><i class="ph ph-caret-right"></i></button>
    </div>

    <Transition name="caption">
      <div
        class="carousel-caption"
        v-if="currentImage.caption || currentImage.link"
      >
        <span v-if="currentImage.caption">{{ currentImage.caption }}</span>
        &ThinSpace;
        <a v-if="currentImage.link" :href="currentImage.link">{{
          currentImage.link
        }}</a>
      </div>
    </Transition>
  </div>
</template>
<style lang="scss">
@use "../styles/colors";
@use "sass:color";

$height: 45ch;

div.carousel {
  display: flex;
  flex-wrap: wrap;
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

  div.carousel-caption {
    flex-basis: 100%;
    color: colors.$neutral-400;
    margin-top: 0.5em;

    &.caption-enter-active,
    &.caption-leave-active {
      transition: opacity 0.5s ease;
    }

    &.caption-enter-from,
    &.caption-leave-to {
      opacity: 0;
    }
  }
}
</style>
