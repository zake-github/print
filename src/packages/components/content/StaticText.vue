<template>
  <div
    :class="{
      'bd-left': item.style.borderLeft === 'none',
      'bd-top': item.style.borderTop === 'none',
      'bd-right': item.style.borderRight === 'none',
      'bd-bottom': item.style.borderBottom === 'none'
    }"
  >
    {{ item.text }}
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { staticTextType } from './../../config';
const props = defineProps<{
  item: staticTextType;
}>();
</script>
<style lang="less" scoped>
.bd-left {
  border-left: 1px dashed #cebcbc;
}
.bd-top {
  border-top: 1px dashed #cebcbc;
}
.bd-right {
  border-right: 1px dashed #cebcbc;
}
.bd-bottom {
  border-bottom: 1px dashed #cebcbc;
}
</style>
