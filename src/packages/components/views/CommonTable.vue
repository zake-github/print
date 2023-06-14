<template>
  <div :style="item.style">
    <table
      cellspacing="0"
      cellpadding="0"
      :class="{ 'table-border': item.tableBorder }"
      :border="0"
      style="width: 100%"
      :style="countWidth"
    >
      <colgroup>
        <col
          v-for="i in item.columnList"
          :key="i.id"
          :name="i.id"
          :width="(i.style.width as string).replace('px', '')"
        />
      </colgroup>
      <tr v-show="item.showtableHeader">
        <th v-for="i in item.columnList" :key="i.id" :style="i.style">
          <span class="cell">
            {{ i.textData }}
          </span>
        </th>
      </tr>
      <tr v-for="row in drawData?.[item.field] || []">
        <td v-for="i in item.columnList" :key="i.id" :style="i.style">
          <span class="cell">
            {{ row?.[i.field] }}
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import type { commonTableType, tableColumnsType } from './../../config';
import { ITEM_RENDER_EVT } from 'element-plus/es/components/virtual-list/src/defaults';
const props = defineProps<{
  item: commonTableType;
  drawData: Object;
}>();
const countWidth = computed(() => {
  const count = props.item.columnList.reduce((count, v: tableColumnsType) => {
    try {
      count = count + Number((v.style.width as string).replace('px', ''));
    } catch (e) {
      count = 0;
    }
    return count;
  }, 0);
  return `min-width: ${count}px`;
});
</script>
<style lang="less" scoped>
table {
  border-color: #303133;
  font-weight: 400;
  border-collapse: collapse;
  tr {
    border-left: 1px dashed #cebcbc;
    border-top: 1px dashed #cebcbc;
  }
  tr th,
  tr td {
    border-right: 1px dashed #cebcbc;
    border-bottom: 1px dashed #cebcbc;
  }
}
table th {
  cursor: pointer;
}
.table-border {
  tr {
    border-left: 1px solid #000;
    border-top: 1px solid #000;
  }
  tr th,
  tr td {
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }
  td .cell {
    overflow: hidden;
    word-break: break-all;
  }
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
