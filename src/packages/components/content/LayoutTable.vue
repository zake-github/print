<template>
  <table
    cellspacing="0"
    cellpadding="0"
    :border="1"
    :style="`min-width: ${countWidth}px;`"
    style="width: 100%"
  >
    <colgroup>
      <col
        v-for="i in item.cellList[0] || []"
        :key="i.id"
        :name="i.id"
        :width="(i.style.width as string).replace('px', '')"
      />
    </colgroup>
    <tr v-for="(i, index) in item.cellList" :key="`row_${index}`">
      <td
        v-for="(j, idx) in i"
        :key="j.id"
        rowspan="1"
        colspan="1"
        :rowindex="idx"
        :columnindex="idx"
        @dblclick.stop="cellClick(j.id)"
      >
        <div class="cell" :style="j.style" :class="{ 'is-active': activeAttrs?.id === j.id }">
          <span style="color: #358efe" v-if="j.textData || j.templateContent">
            {{ j.textData ||  j.templateContent}}
          </span>
          <span v-else>
            {{ j.text }}
          </span>
        </div>
      </td>
    </tr>
  </table>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import type { layoutTableType, layoutTableCellType } from './../../config';
const props = defineProps<{
  item: layoutTableType;
  activeAttrs: layoutTableCellType;
}>();
const countWidth = computed(() => {
  return props.item.cellList[0].reduce((count, v: layoutTableCellType) => {
    try {
      count = count + Number((v.style.width as string).replace('px', ''));
    } catch (e) {
      count = 0;
    }
    return count;
  }, 0);
});
const emits = defineEmits(['setActiveAttrs']);
const cellClick = (id: string) => {
  emits('setActiveAttrs', id);
};
</script>
<style lang="less" scoped>
.cell {
    position: relative;
    width: 100%;
    height: 100%;
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
