<template>
  <el-input-number
    v-model="numValue"
    :min="0"
    controls-position="right"
    class="ipt-number"
    @change="valueChange"
  >
  </el-input-number>
</template>
<script setup lang="ts">
import { ref, watchEffect, onActivated, onDeactivated } from 'vue';
const props = defineProps<{
  modelValue: string | undefined | null;
}>();
const numValue = ref<number>();
numValue.value = Number(props.modelValue?.replace('px', ''));
let effect = watchEffect(() => {
  numValue.value = Number(props.modelValue?.replace('px', ''));
});

onDeactivated(() => {
  effect();
});

const emits = defineEmits(['update:modelValue']);
const valueChange = val => {
  emits('update:modelValue', `${val}px`);
};
</script>
<style lang="less" scoped></style>
