<template>
  <div :style="item.style">
    <img
      :src="drawData?.[item.field]"
      :style="{
        height: item.style.height,
        width: item.style.width
      }"
    />
  </div>
</template>
<script setup lang="ts">
import type { imageType } from './../../config';
const props = defineProps<{
  item: imageType;
  drawData: Object;
}>();
</script>
