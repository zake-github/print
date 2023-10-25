<template>
  <div
    class="cell-table"
    :class="{
      'bd-left': item.style.borderLeft === 'none',
      'bd-top': item.style.borderTop === 'none',
      'bd-right': item.style.borderRight === 'none',
      'bd-bottom': item.style.borderBottom === 'none'
    }"
  >
    <div
      v-for="i in item.cellList"
      class="row"
    >
      <div
        v-for="j in i"
        :style="{ ...j.style }"
        class="cell"
        :class="{ 'is-active': activeAttrs?.id === j.id }"
        @dblclick.stop="cellClick(j.id)"
      >
        <span v-if="j.textData" style="color: #358efe">{{
          textFormat(j.textData, j.padText, j.textLength)
        }}</span>
        <span v-else>{{
          textFormat(j.text, j.padText, j.textLength)
        }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import type { cellColumnsType, cellTableType } from './../../config';
const props = defineProps<{
  item: cellTableType;
  activeAttrs: cellColumnsType;
}>();
const computeWidth = computed(() => {
  let w = props.item.cellList[0][0].style.width;
  try {
    props.item.cellList.forEach(i => {
      i.forEach(j => {
        const wd = j.style.width;
        if (
          Number((wd as string).replace('px', '')) >
          Number((w as string).replace('px', ''))
        ) {
          w = wd;
        }
      });
    });
  } catch (e) {
    w = props.item.cellList[0][0].style.width;
  }
  return w;
});
const emits = defineEmits(['setActiveAttrs']);
const cellClick = (id: string) => {
  emits('setActiveAttrs', id);
};
const textFormat = (
  text: string,
  padText: number | null,
  textLength: string
) => {
  return padText ? text.slice(0, padText).padEnd(padText, textLength) : text;
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
