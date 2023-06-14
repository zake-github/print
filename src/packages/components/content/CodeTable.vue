<template>
  <div
    class="content-table"
    :style="`min-width: ${
      countWidth * item.tableNum +
      (item.tableNum - 1) * Number(item.tableStyle.marginLeft.replace('px', ''))
    }px`"
  >
    <table
      v-for="v in item.tableNum"
      cellspacing="0"
      cellpadding="0"
      :class="{ 'table-border': item.tableBorder }"
      :border="0"
      style="width: 100%"
      :style="`min-width: ${countWidth}px;margin-left: ${item.tableStyle.marginLeft};`"
    >
      <colgroup>
        <col v-if="item.showRowHeader" width="35"/>
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
          <span class="cell" style="color: #358efe">
            {{ item.columnHeaderTextData }}
          </span>
        </th>
      </tr>
      <tr v-show="item.showtableHeader">
        <th v-if="item.showRowHeader"></th>
        <th
          v-for="i in item.columnList"
          :key="i.id"
          :style="i.style"
          :class="{ 'is-active': activeAttrs?.id === i.id }"
          @dblclick.stop="columnClick(i.id)"
        >
          <span class="cell">
            {{ i.textData }}
          </span>
        </th>
      </tr>
      <tr v-for="j in item.rowNum" :key="'row' + j">
        <td v-if="item.showRowHeader" class="row-header">
          <span class="cell" v-show="item.rowHeaderField">
            {{ item.rowHeaderTextData }}
          </span>
        </td>
        <td v-for="i in item.columnList" :key="i.id" :style="i.style">
          <span class="cell" v-show="i.field">
            {{ i.textData }}
          </span>
        </td>
      </tr>
      <tr v-show="item.showSummary">
        <th v-if="item.showRowHeader"></th>
        <th :colspan="item.columnNum" class="column-header">
          <span class="cell" style="color: #358efe">
            {{ item.summaryTextData }}
          </span>
        </th>
      </tr>
    </table>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import type { codeTableType, tableColumnsType } from './../../config';
const props = defineProps<{
  item: codeTableType;
  activeAttrs: tableColumnsType;
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

const emits = defineEmits(['setActiveAttrs']);
const columnClick = (id: string) => {
  emits('setActiveAttrs', id);
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
    color: #358efe;
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
