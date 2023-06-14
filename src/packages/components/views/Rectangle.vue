<template>
  <div :style="item.style"></div>
</template>
<script setup lang="ts">
import type { rectangleType } from './../../config';
const props = defineProps<{
  item: rectangleType;
}>();
</script>
