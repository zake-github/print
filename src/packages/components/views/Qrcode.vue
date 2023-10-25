<template>
  <div :style="item.style">
    <div
      ref="barRef"
      class="bar-content"
      :style="{ height: item.style.height }"
    ></div>
    <div
      :style="{
        display: item.qrcodeValueStyle.display,
        marginTop: item.qrcodeValueStyle.marginTop
      }"
    >
    {{ drawData?.[item.field] }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, watchEffect, onDeactivated, onMounted } from 'vue';
import type { qrcodeType } from './../../config';
import { getQRCodeDom } from './../../qrcode';

const props = defineProps<{
  item: qrcodeType;
  drawData: Object;
}>();
const barRef = ref();
let barcodeData: any = null;
let effect = watchEffect(() => {
  const { field, qrcodeType, qrcodeLevel } = props.item;
  const textData = props.drawData?.[field];
  if (!textData) {
    return;
  }
  const { width } = props.item.style;
  const dom = getQRCodeDom({
    data: textData,
    level: qrcodeLevel,
    type: qrcodeType,
    width: Number((width as string).replace('px', ''))
  });
  barcodeData = dom;
  if (barRef.value) {
    barRef.value.innerHTML = '';
    barRef.value.append(barcodeData.data);
  }
});
onMounted(() => {
  barRef.value.innerHTML = '';
  barRef.value.append(barcodeData.data);
});
onDeactivated(() => {
  effect();
});
</script>
<style lang="less">
.bar-content {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.bar-content > img,
.bar-content > svg {
  width: 100% !important;
  height: 100% !important;
}
</style>
