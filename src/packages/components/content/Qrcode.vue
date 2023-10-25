<template>
  <div>
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
      {{ item.textData }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, watchEffect, onDeactivated, onMounted } from 'vue';
import type { qrcodeType } from './../../config';
import { getQRCodeDom } from './../../qrcode';

const props = defineProps<{
  item: qrcodeType;
}>();
const barRef = ref();
let barcodeData: any = null;
let effect = watchEffect(() => {
  const { textData, qrcodeType, qrcodeLevel } = props.item;
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
    // if (qrcodeType === 'canvas') {
    //   const w = barcodeData.data.width;
    //   barcodeData.data.style.transform = `scale('1', ${(
    //     Number((height as string).replace('px', '')) / w
    //   ).toFixed(2)})`;
    // }
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
