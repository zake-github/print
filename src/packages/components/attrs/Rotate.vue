<template>
  <el-input-number
    v-model="numValue"
    :min="0"
    :max="360"
    controls-position="right"
    class="ipt-number"
    @change="valueChange"
  >
  </el-input-number>
</template>
<script setup lang="ts">
import { ref, watchEffect, onActivated, onDeactivated } from 'vue';
const props = defineProps<{
  modelValue: string;
}>();

const numValue = ref<number>();
const getReg = (r) => {
  let n = 0 
  const m = r.match(/^rotate\(+(\w{1,3})+deg\)$/)
  if(m) {
    n = m[1]
  }
  return n
}
numValue.value = Number(getReg(props.modelValue));
let effect = watchEffect(() => {
  numValue.value = Number(getReg(props.modelValue));
});

onDeactivated(() => {
  effect();
});

const emits = defineEmits(['update:modelValue']);
const valueChange = val => {
  emits('update:modelValue', `rotate(${val}deg)`);
};
</script>
<style lang="less" scoped></style>
