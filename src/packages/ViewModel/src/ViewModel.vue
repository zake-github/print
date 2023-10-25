<template>
  <div :style="`width: ${modelSizeWidth};height: ${modelSizeHeight};`">
    <template v-for="(item, index) in dragContentData" :key="item.type">
      <component
        :is="viewsComponents[componentEnum[item.type]]"
        :item="item"
        :drawData="drawData"
      ></component>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { viewsComponents } from '@/packages/components';

import {
  dragData,
  sizesBasicData,
  staticText,
  valueText,
  horizontal,
  vertical,
  barcode,
  qrcode,
  rectangle,
  commonTable,
  tableColumns,
  cellTable,
  cellColumns,
  layoutTable,
  image1,
  codeTable,
  createUniqueString,
  componentEnum,
  layoutTableCell
} from '@/packages/config';
import type {
  sourceType,
  sizesBasicType,
  contentTypes,
  customType,
  staticTextType,
  valueTextType,
  lineType,
  barcodeType,
  roundType,
  rectangleType,
  commonTableType,
  codeTableType,
  tableColumnsType,
  cellTableType,
  cellColumnsType,
  layoutTableType,
  layoutTableCellType,
  qrcodeType,
  imageType,
  customTools
} from '@/packages/config';
export interface propsType {
  drawData: object;
  source: sourceType;
}
const props = withDefaults(defineProps<propsType>(), {});
const dragContentData = ref<contentTypes[]>([]);

const modelSizeWidth = ref<string>('50mm');
const modelSizeHeight = ref<string>('100mm');
function initSource(importData: sourceType) {
  try {
    const { list, style } = importData;
    dragContentData.value = list;
    const { width = '', height = '' } = style;
    modelSizeWidth.value = width;
    modelSizeHeight.value = height;
  } catch (e) {}
}
if (props.source) {
  initSource(props.source);
}
if (Object.prototype.toString.call(props.drawData) !== '[object Object]') {
  ElMessage({
    message: '请传入要绘制的数据',
    type: 'warning'
  });
}
</script>
<style lang="less" scoped></style>
