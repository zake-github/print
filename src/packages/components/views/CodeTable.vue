<template>
  <div
    class="content-table"
    :style="{
      ...item.style,
      minWidth:
        countWidth * item.tableNum +
        (item.tableNum - 1) *
          Number(item.tableStyle.marginLeft.replace('px', '')) +
        'px',
      display: 'flex'
    }"
  >
    <table
      v-for="(v, tabIdx) in item.tableNum"
      cellspacing="0"
      cellpadding="0"
      :class="{ 'table-border': item.tableBorder }"
      :border="0"
      style="width: 100%"
      :style="`min-width: ${countWidth}px;margin-left: ${item.tableStyle.marginLeft};`"
    >
      <colgroup>
        <col v-if="item.showRowHeader" width="35" />
        <col
          v-for="i in item.columnList"
          :key="i.id"
          :name="i.id"
          :width="(i.style.width as string).replace('px', '')"
        />
      </colgroup>
      <tr v-show="item.showColumnHeader">
        <th v-if="item.showRowHeader"></th>
        <th :colspan="item.columnNum" class="column-header">
          {{ getData(item.columnHeaderField, tabIdx) }}
        </th>
      </tr>
      <tr v-show="item.showtableHeader">
        <th v-if="item.showRowHeader"></th>
        <th v-for="i in item.columnList" :key="i.id" :style="i.style">
          <span class="cell">
            {{ i.textData }}
          </span>
        </th>
      </tr>
      <tr v-for="(j, rowIdx) in item.rowNum" :key="'row' + j">
        <td v-if="item.showRowHeader" class="row-header">
          <span class="cell" v-show="item.rowHeaderField">
            {{ getData(item.rowHeaderField, rowIdx) }}
          </span>
        </td>
        <td v-for="(i, rowIdx) in item.columnList" :key="i.id" :style="i.style">
          <span class="cell" v-show="i.field">
            {{ getData1(item.field, rowIdx, i.field) }}
          </span>
        </td>
      </tr>
      <tr v-show="item.showSummary">
        <th v-if="item.showRowHeader"></th>
        <th :colspan="item.columnNum" class="column-header">
            {{ getData(item.summaryField, tabIdx) }}
        </th>
      </tr>
    </table>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { codeTableType, tableColumnsType } from './../../config';
const props = defineProps<{
  item: codeTableType;
  drawData: Object;
}>();

const countWidth = computed(() => {
  let count = props.item.columnList.reduce((count, v: tableColumnsType) => {
    try {
      count = count + Number((v.style.width as string).replace('px', ''));
    } catch (e) {
      count = 0;
    }
    return count;
  }, 0);
  return count;
});
const getData = (field, idx) => {
  if (Array.isArray(props.drawData[field])) {
    return props.drawData[field][idx];
  }
  return '';
};
const getData1 = (field, idx, field1) => {
  if (Array.isArray(props.drawData[field])) {
    return props.drawData[field][idx][field1];
  }
  return '';
};
</script>
<style lang="less" scoped>
.content-table {
  display: flex;
}
.content-table table:first-child {
  margin-left: 0 !important;
}
table {
  border-color: #303133;
  font-weight: 400;
  border-collapse: collapse;
  float: left;
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
table table th {
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
    // color: #358efe;
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
.row-header {
  min-width: 35px;
}

.column-header {
  height: 35px;
}
</style>
