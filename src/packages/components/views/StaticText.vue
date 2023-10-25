<template>
  <div :style="item.style">
    {{ item.text }}
  </div>
</template>
<script setup lang="ts">
import type { staticTextType } from './../../config';
const props = defineProps<{
  item: staticTextType;
}>();
</script>
<style lang="less" scoped></style>
