<template>
  <div class="cell-table" :style="item.style">
    <div v-for="i in item.cellList" class="row">
      <div v-for="j in i" :style="{ ...j.style }" class="cell">
        <span>{{ textFormat(j.field, j.padText, j.textLength) }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import type { cellColumnsType, cellTableType } from './../../config';
const props = defineProps<{
  item: cellTableType;
  drawData: Object;
}>();
const textFormat = (
  field: string,
  padText: number | null,
  textLength: string
) => {
  const text = props.drawData[field] || '';
  return padText && text
    ? text.slice(0, padText).padEnd(padText, textLength)
    : text;
};
</script>
<style lang="less" scoped>
.cell-table {
  display: flex;
  flex-direction: column;
  .cell {
    cursor: pointer;
    border-left: none !important;
    border-bottom: none !important;
    border-top: 1px solid #000 !important;
    box-sizing: border-box;
  }
  .row {
    flex: 1 1 auto;
    display: flex;
    width: 100%;
    .cell:last-child {
      border-right: none !important;
      flex: 1 1 auto !important;
    }
  }
  .row:first-child {
    .cell {
      border-top: none !important;
    }
  }
}
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
.is-active::after {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
