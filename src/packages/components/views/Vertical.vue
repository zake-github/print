<template>
  <div :style="item.style"></div>
</template>
<script setup lang="ts">
import type { lineType } from './../../config';
const props = defineProps<{
  item: lineType;
}>();
</script>
