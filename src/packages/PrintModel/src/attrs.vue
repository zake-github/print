<template>
  <div class="wrapper">
    <div class="title">属性</div>
    <template v-for="i in attrsBaseF">
      <div class="item" v-if="!i.child && !fields.includes(i.field)">
        <div>
          <label>{{ i.label }}</label>
          <el-input
            v-if="i.component === 'input'"
            v-model="i.obj[i.field]"
            style="width: 100%"
          ></el-input>
          <el-input
            v-if="i.component === 'input1'"
            :disabled="true"
            v-model="i.obj[i.field]"
            style="width: 100%"
          ></el-input>
          <el-input-number
            v-if="i.component === 'inputNumber'"
            :min="i.min || 0"
            controls-position="right"
            v-model="i.obj[i.field]"
            @change="numChange"
            style="width: 100%"
          ></el-input-number>
          <attrsComponents.SelectField
            v-if="i.component === 'select' && defer(5)"
            v-model="i.obj[i.field]"
            @change="fieldChange"
          >
          </attrsComponents.SelectField>
          <el-select
            v-if="i.component === 'select2' && defer(10)"
            v-model="i.obj[i.field]"
            placeholder="请选择"
            @change="fieldChange"
            style="width: 100%"
          >
            <el-option
              v-for="f in customToolsChildList"
              :key="f.fieldCode"
              :label="f.fieldName"
              :value="f.fieldCode"
            >
            </el-option>
          </el-select>
          <el-select
            v-if="i.component === 'select1' && defer(15)"
            v-model="i.obj[i.field]"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="isel in i.config"
              :key="isel.value"
              :label="isel.label"
              :value="isel.value"
            >
            </el-option>
          </el-select>
          <attrsComponents.Rotate
            v-if="i.component === 'Rotate'"
            v-model="i.obj[i.field]"
          ></attrsComponents.Rotate>
          <attrsComponents.InputNumberPX
            v-if="i.component === 'InputNumberPX'"
            v-model="i.obj[i.field]"
          ></attrsComponents.InputNumberPX>
          <attrsComponents.RadioButton
            v-if="i.component === 'RadioButton'"
            :configs="i.config"
            v-model="i.obj[i.field]"
          ></attrsComponents.RadioButton>
        </div>
      </div>
      <div class="item" v-if="i.child">
        <template v-for="ic in i.child">
          <div class="item" v-show="!fields.includes(ic.field)">
            <div>
              <label>{{ ic.label }}</label>
              <el-input
                v-if="ic.component === 'input'"
                v-model="ic.obj[ic.field]"
              ></el-input>
              <el-input-number
                v-if="ic.component === 'inputNumber'"
                :min="ic.min || 0"
                controls-position="right"
                v-model="ic.obj[ic.field]"
                style="width: 100%"
                @change="numChange"
              ></el-input-number>
              <attrsComponents.InputNumberPX
                v-if="ic.component === 'InputNumberPX'"
                v-model="ic.obj[ic.field]"
              ></attrsComponents.InputNumberPX>
              <el-select
                v-if="ic.component === 'select' && defer(20)"
                v-model="ic.obj[ic.field]"
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
              <attrsComponents.RadioButton
                v-if="ic.component === 'RadioButton'"
                v-model="ic.obj[ic.field]"
                :configs="ic.config"
              ></attrsComponents.RadioButton>
            </div>
          </div>
        </template>
      </div>
    </template>
    <div class="btn-group" v-show="['cellColumns'].includes(item.type)">
      <el-button type="primary" plain size="small" @click.stop="addCell"
        >插入单元格</el-button
      >
      <el-button @click.stop="removeCell" size="small">删除单元格</el-button>
    </div>
    <div
      class="btn-group"
      v-show="['cellColumns', 'layoutTableCell'].includes(item.type)"
    >
      <el-button
        type="primary"
        plain
        size="small"
        @click.stop="addTableRow('before')"
        >向上插入行</el-button
      >
      <el-button
        type="primary"
        plain
        size="small"
        @click.stop="addTableRow('after')"
        >向下插入行</el-button
      >
      <el-button @click.stop="removeTableRow" size="small">删除行</el-button>
    </div>
    <div
      class="btn-group"
      v-show="['tableColumns', 'layoutTableCell'].includes(item.type)"
    >
      <el-button
        type="primary"
        plain
        size="small"
        @click.stop="addTableColumn('before')"
        >向前插入列</el-button
      >
      <el-button
        type="primary"
        plain
        size="small"
        @click.stop="addTableColumn('after')"
        >向后插入列</el-button
      >
      <el-button @click.stop="removeTableColumn" size="small">删除列</el-button>
    </div>
    <div class="title mt20">按钮</div>
    <div class="btn-group">
      <el-button type="primary" plain @click.stop="copyItem">复制</el-button>
      <el-button @click.stop="removeItem">删除</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue';
import type { customTools, contentTypes } from '@/packages/config';
import { attrsComponents } from '@/packages/components';
import {
  attrItem,
  attrsType,
  staticTextAttrs,
  valueTextAttrs,
  horizontalAttrs,
  verticallAttrs,
  barcodeAttrs,
  qrcodeAttrs,
  rectangleAttrs,
  commonTableAttrs,
  codeTableAttrs,
  tableColumnsAttrs,
  cellTableAttrs,
  cellColumnsAttrs,
  image1Attrs,
  layoutTableAttrs,
  layoutTableCellAttrs,
  fieldsMap
} from './../../config';

export interface propsType {
  customToolsList?: customTools[];
  customToolsChildList?: customTools[];
  item: contentTypes;
}

const props = withDefaults(defineProps<propsType>(), {
  customToolsList: () => []
});

const fields = computed(() => {
  let arr: string[] = [];
  if (['staticText', 'valueText'].includes(props.item.type)) {
    Object.entries(fieldsMap[props.item.type].defaultValue).forEach(i => {
      props.item.style[i[0]] = i[1];
    });
    if (props.item.style.position === 'absolute') {
      arr = fieldsMap[props.item.type].fields;
    }
  }
  return arr;
});

const getItemObj = (objKey: string[]) => {
  const keys = [...objKey];
  let obj: Object = {};
  while (keys.length) {
    const k = keys.shift();
    if (props.item && k) {
      obj = props.item[k];
    }
  }
  return obj;
};

const attrsF = <T extends Array<any>>(arr: T) => {
  return arr.map(i => {
    if (Object.keys(i).includes('child')) {
      return {
        child: attrsF<attrItem[]>(i.child)
      };
    } else {
      i.obj = i.objKey ? getItemObj(i.objKey) : props.item;
      return i;
    }
  });
};

const attrsBase = {
  staticText: staticTextAttrs,
  valueText: valueTextAttrs,
  horizontal: horizontalAttrs,
  vertical: verticallAttrs,
  barcode: barcodeAttrs,
  qrcode: qrcodeAttrs,
  rectangle: rectangleAttrs,
  commonTable: commonTableAttrs,
  codeTable: codeTableAttrs,
  tableColumns: tableColumnsAttrs,
  cellTable: cellTableAttrs,
  cellColumns: cellColumnsAttrs,
  image: image1Attrs,
  layoutTable: layoutTableAttrs,
  layoutTableCell: layoutTableCellAttrs
};

const attrsBaseF = computed(() => {
  return attrsF<attrsType>(attrsBase[props.item.type]);
});

let num = ref<number>(0);
const addNum = () => {
  if (num.value > 20) {
    return;
  }
  num.value++;
  window.requestAnimationFrame(addNum);
};
onMounted(() => {
  addNum();
});
const defer = n => {
  return num.value >= n;
};
const emits = defineEmits([
  'copyItem',
  'removeItem',
  'fieldChange',
  'numChange',
  'addTableColumn',
  'addTableRow',
  'addCell',
  'removeTableColumn',
  'removeTableRow',
  'removeCell'
]);
const copyItem = () => {
  emits('copyItem');
};

const removeItem = () => {
  emits('removeItem');
};

const fieldChange = (field?: string) => {
  emits('fieldChange', field);
};

const numChange = () => {
  emits('numChange');
};

const addTableColumn = (position: string) => {
  emits('addTableColumn', position);
};
const removeTableColumn = () => {
  emits('removeTableColumn');
};

const addTableRow = (position: string) => {
  emits('addTableRow', position);
};
const removeTableRow = () => {
  emits('removeTableRow');
};

const addCell = () => {
  emits('addCell');
};
const removeCell = () => {
  emits('removeCell');
};
console.log('item', props.item);
console.log('attrsBaseF', attrsBaseF);
</script>
<style lang="less" scoped>
.mt20 {
  margin-top: 20px;
}
.wrapper {
  font-size: 12px;
  font-weight: 400;
  color: #31394d;
  padding: 10px 16px;
  .title {
    text-align: center;
    font-size: 16px;
    color: #409eff;
    padding-bottom: 10px;
  }
  .item {
    display: flex;
    & > div {
      flex: 1;
      margin-top: 8px;
      display: inline-flex;
      align-items: center;
    }
    label {
      flex: 0 0 50px;
      width: 50px;
      text-align: right;
      margin-right: 6px;
    }
  }

  .btn-group {
    text-align: center;
    padding: 10px 0;
  }
}

:deep(.ipt-number) {
  width: 90px;
  .el-input__wrapper {
    padding-left: 2px !important;
    padding-right: 20px !important;
    height: 26px;
    line-height: 26px;
  }
  .el-input-number__decrease,
  .el-input-number__increase {
    width: 20px !important;
    height: 13px !important;
  }
}
</style>
