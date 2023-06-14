<template>
  <div>
    <div style="line-height: 1" v-show="!item.url">
      <i
        class="iconfont icontupian font60"
        index="0"
        :style="{
          height: item.style.height,
          width: item.style.width,
          fontSize: item.style.height
        }"
      ></i>
    </div>
    <img
      v-show="item.url"
      :src="item.url"
      :style="{
        height: item.style.height,
        width: item.style.width
      }"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { imageType } from './../../config';
const props = defineProps<{
  item: imageType;
}>();
</script>
<style lang="less" scoped></style>
