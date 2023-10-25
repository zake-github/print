<template>
  <div class="radio-group">
    <span
      v-for="i in configs"
      :key="i.label"
      class="radio-button__inner"
      :class="{ 'is-active': modelValue === i.value }"
      @click="valueChange(i.value)"
      v-html="i.label"
      ></span
    >
  </div>
</template>
<script setup lang="ts">
export interface c {
  label: string;
  value: string;
}
const props = defineProps<{
  modelValue: string | boolean | number;
  configs: c[];
}>();

const emits = defineEmits(['update:modelValue']);
const valueChange = val => {
  emits('update:modelValue', val);
};
</script>
<style lang="less" scoped>
@radius: 2px;
.radio-group {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0;
}

.radio-button__inner {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-left: 0;
  color: rgb(96, 98, 102);
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 6px 14px;
  font-size: 12px;
  border-radius: 0;
}

.radio-button__inner:first-child {
  border-left: 1px solid #dcdfe6;
  border-radius: @radius 0 0 @radius;
}

.radio-button__inner:last-child {
  border-radius: 0 @radius @radius 0;
}

.is-active {
  color: rgb(64, 158, 255);
  background-color: rgb(236, 245, 255);
}
</style>
