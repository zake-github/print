<template>
  <div
    :class="{
      'bd-left': item.style.borderLeft === 'none',
      'bd-top': item.style.borderTop === 'none',
      'bd-right': item.style.borderRight === 'none',
      'bd-bottom': item.style.borderBottom === 'none'
    }"
  >
    <template v-if="item.text">
      {{ item.text }}
    </template>
    <template v-else>
      {{ item.textData }}
    </template>
  </div>
</template>
<script setup lang="ts">
import type { valueTextType } from './../../config';
const props = defineProps<{
  item: valueTextType;
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
