<template>
  <div :style="item.style">
    {{ drawData?.[item.field] }}
  </div>
</template>
<script setup lang="ts">
import type { valueTextType } from './../../config';
const props = defineProps<{
  drawData: object;
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
