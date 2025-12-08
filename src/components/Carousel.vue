<script setup lang="ts">
  const props = defineProps<{images: string[]}>();
  const images = props.images.map(path => import(path));
</script>
<template>
  <img v-for="image in images" alt="" :src="image" />
</template>
