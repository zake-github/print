<template>
  <el-select
    :modelValue="modelValue"
    @change="fieldChange"
    placeholder="请选择"
    style="width: 100%"
  >
    <el-option
      v-for="f in customToolsList"
      :key="f.fieldCode"
      :label="f.fieldName"
      :value="f.fieldCode"
    >
    </el-option>
  </el-select>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { customTools } from '@/packages/config';
import { eventBus } from '@/packages/bus';
const props = defineProps<{
  modelValue: string | undefined | null;
  customToolsList?: customTools[];
}>();
const customToolsList = ref<customTools[] | undefined>(props.customToolsList);
function setCustomToolsList(list: customTools[]) {
  customToolsList.value = list;
}
eventBus.on('customToolsList', true, setCustomToolsList);
const emits = defineEmits(['update:modelValue', 'change']);
const fieldChange = val => {
  emits('update:modelValue', val);
  emits('change', val);
};
</script>
<style lang="less" scoped></style>
