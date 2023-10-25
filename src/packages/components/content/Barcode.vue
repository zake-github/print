<template>
  <div>
    <div ref="barRef" class="bar-content" :style="{height: item.style.height}"></div>
    <div
      :style="{
        display: item.barcodeValueStyle.display,
        marginTop: item.barcodeValueStyle.marginTop
      }"
    >
      {{ item.textData }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, watchEffect, onDeactivated, onMounted } from 'vue';
import type { barcodeType } from './../../config';
import { getBarCodeDom } from './../../jsbarcode';

const props = defineProps<{
  item: barcodeType;
}>();
const barRef = ref();
let barcodeData: any = null;
let effect = watchEffect(() => {
  const { textData, barcodeType } = props.item;
  const { height, width } = props.item.style;
  const dom = getBarCodeDom({
    data: textData,
    type: barcodeType,
    displayValue: false,
    height: Number((height as string).replace('px', ''))
  });
  barcodeData = dom;
  if (barRef.value) {
    barRef.value.innerHTML = '';
    if(barcodeType === 'canvas') {
      const w = barcodeData.data.width
      barcodeData.data.style.transform = `scale(${(Number((width as string).replace('px', ''))/w).toFixed(2)} ,1)`;
    }
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

.bar-content > img, .bar-content > svg {
  width: 100%!important;
  height: 100%!important;
}
</style>
