<template>
  <div id="app" class="print-model-wrapper">
    <!-- 数据项 -->
    <div class="print-drags">
      <div class="print-drags-title">常用工具</div>
      <template v-for="(element, index) in dragData" :key="element.type">
        <div
          class="print-drag-tool_item"
          :data-type="element.type"
          @dragstart="dragStart"
          @dragend="dragEnd"
          draggable="true"
        >
          <i class="iconfont font30" :class="element.icon"></i>
          <span class="font12">{{ element.text }}</span>
        </div>
      </template>
      <div class="print-drags-title">
        可拖拽字段&nbsp;&nbsp;{{ dragFieldDetail }}
      </div>
      <template v-for="(element, index) in customToolsList" :key="element.type">
        <div
          class="print-drag-tool_item print-drag-tool_item-field"
          :data-type="element.type"
          :data-field="index"
          @dragstart="dragStart"
          @dragend="dragEnd"
          draggable="true"
        >
          <span class="font12">{{ element.fieldName }}</span>
        </div>
      </template>
    </div>
    <!-- 模版 -->
    <div class="print-content" @click="contenthandle">
      <!-- 操作 设置 -->
      <div class="content-btns">
        <el-select
          v-model="modelSize"
          @change="contentSizeChange"
          value-key="size"
          style="width: 120px"
          class="ml10"
          placeholder="请选择"
        >
          <el-option
            v-for="item in sizesBasic"
            :key="item.size"
            :label="item.size"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-input
          v-model="modelSizeWidth"
          max="1000"
          class="ml10"
          style="width: 80px"
          placeholder=""
        />
        <el-input
          v-model="modelSizeHeight"
          class="ml10"
          max="1000"
          style="width: 80px"
          placeholder=""
        />
        <el-button @click="setContentSize" type="primary" plain class="ml10"
          >确定</el-button
        >
        <el-button @click="contentRotate" type="primary" plain class="ml10"
          >旋转</el-button
        >
        <el-button @click="clearAll" type="primary" plain class="ml10"
          >清空</el-button
        >
        <el-button @click="saveModel" type="primary" plain class="ml10"
          >保存</el-button
        >
        <el-button
          v-if="showExport"
          @click="exportModel"
          type="primary"
          plain
          class="ml10"
          >导出</el-button
        >
        <el-button
          v-if="showImport"
          type="primary"
          plain
          class="ml10 import-btn"
          >导入
          <input type="file" id="importFile" @change="importModel" />
        </el-button>
      </div>
      <!-- 画板 -->
      <div class="content-canvas-wrapper">
        <div class="content-canvas" ref="contentCanvas">
          <div
            v-move="canvasPosition"
            class="content-canvas-drag"
            ref="canvasContent"
            @dragover="dragover"
            :style="`${canvasSize}left: ${canvasPosition.left};top: ${canvasPosition.top};right: auto;bottom:auto;`"
          >
            <template v-for="(item, index) in dragContentData" :key="item.type">
              <div
                class="print-content_item"
                :class="{
                  'is-active':
                    activeItem === item.id &&
                    ![
                      'commonTable',
                      'cellTable',
                      'codeTable',
                      'layoutTable'
                    ].includes(item.type),
                  'is-dashed': [
                    'commonTable',
                    'barcode',
                    'qrcode',
                    'codeTable',
                    'layoutTable'
                  ].includes(item.type)
                }"
                :data-id="item.id"
                @click.stop="contentItemActive(item.id)"
                v-move.stop.item="item.style"
                :ref="`contentItem${String(index)}`"
                :style="item.style"
              >
                <component
                  @setActiveAttrs="setActiveAttrs"
                  :activeAttrs="activeAttrs"
                  :is="contentComponents[componentEnum[item.type]]"
                  :item="item"
                ></component>
                <div
                  class="right-point"
                  v-move.stop.width="item.style"
                  v-show="
                    activeItem === item.id && !['vertical'].includes(item.type)
                  "
                ></div>
                <div
                  class="bottom-point"
                  v-move.stop.height="item.style"
                  v-show="
                    activeItem === item.id &&
                    ![
                      'horizontal',
                      'qrcode',
                      'commonTable',
                      'codeTable',
                      'cellTable',
                      'layoutTable'
                    ].includes(item.type)
                  "
                ></div>
                <div class="moving-left"></div>
                <div class="moving-right"></div>
                <div class="moving-top"></div>
                <div class="moving-bottom"></div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- 属性设置 -->
    <div class="print-attrs">
      <attrs
        v-if="activeAttrs"
        :item="activeAttrs"
        :customToolsList="customToolsList"
        :customToolsChildList="customToolsListChild"
        @copyItem="copyItem"
        @removeItem="removeItem"
        @fieldChange="fieldChange"
        @numChange="numChange"
        @addTableColumn="addTableColumn"
        @addTableRow="addTableRow"
        @addCell="addCell"
        @removeTableColumn="removeTableColumn"
        @removeTableRow="removeTableRow"
        @removeCell="removeCell"
      ></attrs>
    </div>
  </div>
  <canvas id="printmodeljsbar" style="opacity: 0; position: fixed" />
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { debounce, deepClone } from '@/packages/utils';
import attrs from './attrs.vue';
import { eventBus } from '@/packages/bus';
import { saveTemplate } from './../print';
import {
  ref,
  onMounted,
  computed,
  watch,
  nextTick,
  defineComponent
} from 'vue';
import type {
  VNodeRef,
  PropType,
  Directive,
  DirectiveBinding,
  CSSProperties
} from 'vue';
import { contentComponents } from '@/packages/components';
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

export interface canvasPosition {
  left: string;
  top: string;
}

export interface position {
  left: number;
  top: number;
}

export interface propsType {
  customTools?: customTools[];
  dragFieldDetail?: string;
  source?: sourceType;
  showExport?: boolean;
  showImport?: boolean;
}

const sizesBasic = ref<sizesBasicType[]>(sizesBasicData);
// const props = defineProps({
//   customTools: {
//     type: Array as PropType<customTools[]>,
//     default: () => []
//   },
//   dragFieldDetail: {
//     type: String,
//     default: ''
//   }
// });

const props = withDefaults(defineProps<propsType>(), {
  dragFieldDetail: '',
  customTools: () => [
    {
      fieldName: '品名',
      children: [],
      fieldCode: 'spuName',
      defaultValue: '1',
      remark: '',
      fieldListCode: ''
    },
    {
      fieldName: '颜色',
      children: [],
      fieldCode: 'color',
      defaultValue: '1',
      remark: '',
      fieldListCode: ''
    },
    {
      fieldName: '幅宽',
      children: [],
      fieldCode: 'gateWidth',
      defaultValue: '1',
      remark: '',
      fieldListCode: ''
    },
    {
      fieldName: '缸号',
      children: [],
      fieldCode: 'cylinderNumber',
      defaultValue: '1',
      remark: '',
      fieldListCode: ''
    },
    {
      fieldName: '细码数量',
      children: [
        {
          fieldName: '品名',
          children: [],
          fieldCode: 'spuName',
          defaultValue: '1',
          remark: '',
          fieldListCode: ''
        },
        {
          fieldName: '颜色',
          children: [],
          fieldCode: 'color',
          defaultValue: '1',
          remark: '',
          fieldListCode: ''
        },
        {
          fieldName: '幅宽',
          children: [],
          fieldCode: 'gateWidth',
          defaultValue: '1',
          remark: '',
          fieldListCode: ''
        },
        {
          fieldName: '缸号',
          children: [],
          fieldCode: 'cylinderNumber',
          defaultValue: '1',
          remark: '',
          fieldListCode: ''
        }
      ],
      fieldCode: 'fineQuantity',
      defaultValue: '1',
      remark: '',
      fieldListCode: ''
    }
  ],
  showExport: true,
  showImport: true
});

const customToolsList = computed(() => {
  const list = props.customTools.map(v => ({ ...v, type: 'valueText' }));
  eventBus.emit('customToolsList', true, list);
  return list;
});
let mousePosition = <position>{
  left: 0,
  top: 0
};

const modelSize = ref<sizesBasicType>({
  size: '自定义',
  value: 'custom',
  width: 50,
  height: 100
});
const modelSizeWidth = ref<number | null>(50);
const modelSizeHeight = ref<number | null>(100);
const canvasSize = computed<string>(() => {
  return `width: ${modelSize.value.width}mm; height: ${modelSize.value.height}mm;`;
});

const canvasPosition = ref<canvasPosition>({
  left: '0px',
  top: '0px'
});
const vMove: Directive = (el: HTMLElement, binding: DirectiveBinding) => {
  const { modifiers } = binding;
  const mousedown = (evt: MouseEvent) => {
    modifiers.stop && evt.stopPropagation();
    let refDom = contentCanvas.value;
    if (modifiers.item) {
      refDom = canvasContent.value;
      el.classList.add('moving');
    }
    const X = evt.pageX;
    const Y = evt.pageY;
    const left: number = binding.value.left
      ? Number(binding.value.left.replace('px', ''))
      : 0;
    const top: number = binding.value.top
      ? Number(binding.value.top.replace('px', ''))
      : 0;
    const dom = (evt.target as HTMLDivElement).parentNode as HTMLDivElement;
    const { width, height } = dom.getBoundingClientRect();
    if (modifiers.width || modifiers.height) {
      dom.classList.add('moving');
    }
    const move = debounce((e: MouseEvent) => {
      if (modifiers.width || modifiers.height) {
        if (modifiers.width) {
          const w = width + e.pageX - X;
          binding.value.width = `${w > 0 ? w : 0}px`;
          return;
        }
        if (modifiers.height) {
          const h = height + e.pageY - Y;
          binding.value.height = `${h > 0 ? h : 0}px`;
          return;
        }
      } else {
        binding.value.left = (left + e.pageX - X).toFixed(2) + 'px';
        binding.value.top = (top + e.pageY - Y).toFixed(2) + 'px';
      }
    }, 10);
    refDom.addEventListener('mousemove', move);
    document.addEventListener('mouseup', () => {
      el.classList.remove('moving');
      dom.classList.remove('moving');
      refDom.removeEventListener('mousemove', move);
    });
  };
  el.addEventListener('mousedown', mousedown);
};
const drarElement = ref<string | null>();

const contentCanvas = ref<VNodeRef | null>(null);
const canvasContent = ref<VNodeRef | null>(null);
const dragContentData = ref<contentTypes[]>([]);
const activeItem = ref<string | null>();
const activeAttrs = ref<any>();

watch(
  () => activeItem.value,
  () => {
    setActiveAttrs();
  }
);
const customToolsListChild = ref<customTools[]>([]);
const setActiveAttrs = (id?: string) => {
  const i = dragContentData.value.find(v => v.id === activeItem.value);
  if (!id) {
    activeAttrs.value = i;
  } else {
    const item = activeAttrs.value;
    const { field, type } = item;
    const c = customToolsList.value.find(v => v.fieldCode === field);
    if (c && c.children) {
      customToolsListChild.value = c.children;
    }
    if (type === 'commonTable' || type === 'codeTable') {
      activeAttrs.value = (i as commonTableType).columnList.find(
        v => v.id === id
      );
    }
    if (type === 'cellTable') {
      for (const j of (i as cellTableType).cellList) {
        const v = j.find(v => v.id === id);
        if (v) {
          activeAttrs.value = v;
          break;
        }
      }
    }
    if (type === 'layoutTable') {
      for (const j of (i as layoutTableType).cellList) {
        const v = j.find(v => v.id === id);
        if (v) {
          activeAttrs.value = v;
          break;
        }
      }
    }
  }
};

const dragStart = (event: DragEvent) => {
  drarElement.value = (event.target as HTMLDivElement).dataset.type;
  const p = (event.target as HTMLDivElement).getBoundingClientRect();

  mousePosition = {
    left: event.pageX - p.x,
    top: event.pageY - p.y
  };
};

const dragover = (event: DragEvent) => {
  event.preventDefault();
};

const contentMap = {
  valueText: valueText,
  horizontal: horizontal,
  vertical: vertical,
  barcode: barcode,
  qrcode: qrcode,
  image: image1,
  codeTable: codeTable,
  rectangle: rectangle,
  commonTable: commonTable,
  cellTable: cellTable,
  layoutTable: layoutTable
};
const getItemBase = (
  left: number,
  top: number,
  type: string,
  fieldIndex?: number
) => {
  const { style, ...args } = deepClone(staticText);
  let item: contentTypes = {
    style: {
      ...(style as CSSProperties),
      left: `${left.toFixed(2)}px`,
      top: `${top.toFixed(2)}px`
    },
    ...args,
    id: createUniqueString()
  };
  if (
    [
      'valueText',
      'horizontal',
      'vertical',
      'barcode',
      'qrcode',
      'rectangle',
      'commonTable',
      'cellTable',
      'image',
      'codeTable',
      'layoutTable'
    ].includes(type)
  ) {
    const { style, ...args } = deepClone(contentMap[type]);
    item = {
      style: {
        ...style,
        left: `${left}px`,
        top: `${top}px`
      },
      ...args,
      id: createUniqueString()
    };
  }
  if (type === 'valueText' && typeof fieldIndex === 'number') {
    (item as valueTextType).field = props.customTools[fieldIndex].fieldCode;
  }
  return item;
};
const copyItem = () => {
  const item = dragContentData.value.find(v => v.id === activeItem.value);
  if (item) {
    const i = deepClone(item);
    dragContentData.value = [
      ...dragContentData.value,
      { ...i, id: createUniqueString() }
    ];
  }
};

const removeItem = () => {
  dragContentData.value = dragContentData.value.filter(
    v => v.id !== activeItem.value
  );
};

const fieldChange = (field?: string) => {
  const { type } = activeAttrs.value;
  if (field) {
    const fieldMap = [
      {
        field: 'rowHeaderField',
        fieldText: 'rowHeaderTextData'
      },
      {
        field: 'summaryField',
        fieldText: 'summaryTextData'
      },
      {
        field: 'columnHeaderField',
        fieldText: 'columnHeaderTextData'
      }
    ];
    const fieldI = fieldMap.find(f => f.field === field);
    if (type === 'codeTable' && fieldI) {
      const fieldK = activeAttrs.value[field];
      const c = customToolsList.value.find(v => v.fieldCode === fieldK);
      activeAttrs.value[fieldI.fieldText] = c?.fieldName;
    }

    if (type === 'cellColumns' || type === 'layoutTableCell' || type === 'tableColumns') {
      const c = customToolsList.value.find(v => v.fieldCode === field);
      activeAttrs.value.textData = c?.fieldName;
    }
  }
  if (type === 'commonTable' || type === 'codeTable') {
    activeAttrs.value.columnList.forEach(v => {
      v.field = '';
    });
  }
};
const numChange = () => {
  const { type } = activeAttrs.value;
  if (type === 'commonTable' || type === 'codeTable') {
    const { columnList, columnNum } = activeAttrs.value as commonTableType;
    if (columnNum > 0) {
      const b: tableColumnsType[] = [];

      new Array(columnNum).fill('').forEach((v, index) => {
        if (columnList[index]) {
          b.push(columnList[index]);
        } else {
          const i: tableColumnsType = deepClone(tableColumns);
          b.push({ ...i, id: createUniqueString() });
        }
      });
      activeAttrs.value.columnList = b;
    } else {
      activeAttrs.value.columnNum = 1;
      const idx = dragContentData.value.findIndex(
        v => v.id === activeItem.value
      );
      (dragContentData.value[idx] as commonTableType).columnNum = 1;
    }
  }
  if (type === 'cellTable') {
    const { cellList, cellRowNum } = activeAttrs.value as cellTableType;
    if (cellRowNum > 0) {
      const b: cellColumnsType[][] = [];

      new Array(cellRowNum).fill('').forEach((v, index) => {
        if (cellList[index]) {
          b.push(cellList[index]);
        } else {
          const i: cellColumnsType = deepClone(cellColumns);
          b.push([{ ...i, id: createUniqueString() }]);
        }
      });
      activeAttrs.value.cellList = b;
    } else {
      activeAttrs.value.cellRowNum = 1;
      const idx = dragContentData.value.findIndex(
        v => v.id === activeItem.value
      );
      (dragContentData.value[idx] as cellTableType).cellRowNum = 1;
    }
  }
};

const addTableColumn = (position: string) => {
  const item = dragContentData.value.find(v => v.id === activeItem.value);

  const { id } = activeAttrs.value;
  if (item && (item.type === 'commonTable' || item.type === 'codeTable')) {
    const { columnList, columnNum } = item as commonTableType;
    const iIndex = columnList.findIndex(v => v.id === id);
    const i = deepClone(tableColumns);
    (item as commonTableType).columnList = columnList.filter(v => v.id !== id);
    if (position === 'before') {
      columnList.splice(iIndex, 0, { ...i, id: createUniqueString() });
    }
    if (position === 'after') {
      columnList.splice(iIndex + 1, 0, { ...i, id: createUniqueString() });
    }
    (item as commonTableType).columnList = columnList;
    (item as commonTableType).columnNum = columnNum + 1;
  }
  if (item && item.type === 'layoutTable') {
    let { cellList, columnNum } = item as layoutTableType;
    let iIndex = -1;
    for (const v of cellList) {
      const idx = v.findIndex(i => i.id === id);
      if (idx > -1) {
        iIndex = idx;
        break;
      }
    }
    if (iIndex > -1) {
      cellList = cellList.map(v => {
        if (position === 'before') {
          v.splice(iIndex, 0, {
            ...deepClone(layoutTableCell),
            id: createUniqueString()
          });
        }
        if (position === 'after') {
          v.splice(iIndex + 1, 0, {
            ...deepClone(layoutTableCell),
            id: createUniqueString()
          });
        }
        return v;
      });
      (item as layoutTableType).cellList = cellList;
      (item as layoutTableType).columnNum = columnNum + 1;
    }
  }
};
const removeTableColumn = () => {
  const item = dragContentData.value.find(v => v.id === activeItem.value);
  const { id } = activeAttrs.value;
  if (item && (item.type === 'commonTable' || item.type === 'codeTable')) {
    let { columnList } = item as commonTableType;
    columnList = columnList.filter(v => v.id !== id);
    if (!columnList.length) {
      const i = deepClone(tableColumns);
      columnList.push({ ...i, id: createUniqueString() });
    }
    (item as commonTableType).columnList = columnList.filter(v => v.id !== id);
    (item as commonTableType).columnNum = columnList.length;
  }
  if (item && item.type === 'layoutTable') {
    let { cellList, cellRowNum, columnNum } = item as layoutTableType;
    let iIndex = -1;
    for (const v of cellList) {
      const idx = v.findIndex(i => i.id === id);
      if (idx > -1) {
        iIndex = idx;
        break;
      }
    }
    if (iIndex > -1) {
      cellList = cellList.map(v => {
        v.splice(iIndex, 1);
        return v;
      });
      const isEmpty = cellList.reduce((empty, i) => {
        if (i.length) {
          empty = false;
        }
        return empty;
      }, true);
      if (isEmpty) {
        cellList = new Array(cellRowNum).fill('').map(v => [
          {
            ...deepClone(layoutTableCell),
            id: createUniqueString()
          }
        ]);
      }
      (item as layoutTableType).cellList = cellList;
      (item as layoutTableType).columnNum = isEmpty ? 1 : columnNum - 1;
    }
  }
  setActiveAttrs();
};
const addTableRow = (position: string) => {
  const item = dragContentData.value.find(v => v.id === activeItem.value);

  const { id } = activeAttrs.value;
  if (item && item.type === 'cellTable') {
    const { cellList, cellRowNum } = item as cellTableType;
    let iIndex = -1;
    cellList.forEach(v => {
      for (const j of Object.keys(cellList)) {
        const v = cellList[j].findIndex(v => v.id === id);
        if (v > -1) {
          iIndex = Number(j);
          break;
        }
      }
    });
    if (iIndex > -1) {
      const i = deepClone(cellColumns);
      if (position === 'before') {
        cellList.splice(iIndex, 0, [{ ...i, id: createUniqueString() }]);
      }
      if (position === 'after') {
        cellList.splice(iIndex + 1, 0, [{ ...i, id: createUniqueString() }]);
      }
      (item as cellTableType).cellList = cellList;
      (item as cellTableType).cellRowNum = cellRowNum + 1;
    }
  }
  if (item && item.type === 'layoutTable') {
    const { cellList, cellRowNum, columnNum } = item as layoutTableType;
    let iIndex = -1;
    cellList.forEach(v => {
      for (const j of Object.keys(cellList)) {
        const v = cellList[j].findIndex(v => v.id === id);
        if (v > -1) {
          iIndex = Number(j);
          break;
        }
      }
    });
    if (iIndex > -1) {
      const row = new Array(columnNum).fill('').map(v => ({
        ...deepClone(layoutTableCell),
        id: createUniqueString()
      }));
      if (position === 'before') {
        cellList.splice(iIndex, 0, row);
      }
      if (position === 'after') {
        cellList.splice(iIndex + 1, 0, row);
      }
      (item as layoutTableType).cellList = cellList;
      (item as layoutTableType).cellRowNum = cellRowNum + 1;
    }
  }
};
const removeTableRow = () => {
  const item = dragContentData.value.find(v => v.id === activeItem.value);
  const { id } = activeAttrs.value;
  if (item && item.type === 'cellTable') {
    const { cellList, cellRowNum } = item as cellTableType;
    let iIndex = -1;
    cellList.forEach(v => {
      for (const j of Object.keys(cellList)) {
        const v = cellList[j].findIndex(v => v.id === id);
        if (v > -1) {
          iIndex = Number(j);
          break;
        }
      }
    });
    if (iIndex > -1) {
      cellList.splice(iIndex, 1);
      if (!cellList.length) {
        const i = deepClone(cellColumns);
        cellList.push([{ ...i, id: createUniqueString() }]);
      }
      (item as cellTableType).cellList = cellList;
      (item as cellTableType).cellRowNum =
        cellRowNum - 1 > 0 ? cellRowNum - 1 : 1;
    }
  }
  if (item && item.type === 'layoutTable') {
    const { cellList, cellRowNum, columnNum } = item as layoutTableType;
    let iIndex = -1;
    cellList.forEach(v => {
      for (const j of Object.keys(cellList)) {
        const v = cellList[j].findIndex(v => v.id === id);
        if (v > -1) {
          iIndex = Number(j);
          break;
        }
      }
    });
    if (iIndex > -1) {
      cellList.splice(iIndex, 1);
      if (!cellList.length) {
        const row = new Array(columnNum).fill('').map(v => ({
          ...deepClone(layoutTableCell),
          id: createUniqueString()
        }));
        cellList.push(row);
      }
      (item as layoutTableType).cellList = cellList;
      (item as layoutTableType).cellRowNum =
        cellRowNum - 1 > 0 ? cellRowNum - 1 : 1;
    }
  }
  setActiveAttrs();
};
const addCell = () => {
  const item = dragContentData.value.find(v => v.id === activeItem.value);

  const { id } = activeAttrs.value;
  if (item && item.type === 'cellTable') {
    const { cellList } = item as cellTableType;
    let iIndex = -1;
    let ivIndex = -1;
    cellList.forEach(v => {
      for (const j of Object.keys(cellList)) {
        const v = cellList[j].findIndex(v => v.id === id);
        if (v > -1) {
          iIndex = Number(j);
          ivIndex = v;
          break;
        }
      }
    });
    if (iIndex > -1 && ivIndex > -1) {
      const i = deepClone(cellColumns);
      const ci = cellList[iIndex];
      ci.splice(ivIndex + 1, 0, { ...i, id: createUniqueString() });
      cellList[iIndex] = ci;
      (item as cellTableType).cellList = cellList;
    }
  }
};
const removeCell = () => {
  const item = dragContentData.value.find(v => v.id === activeItem.value);
  const { id } = activeAttrs.value;
  if (item && item.type === 'cellTable') {
    let { cellList } = item as cellTableType;
    let iIndex = -1;
    cellList.forEach(v => {
      for (const j of Object.keys(cellList)) {
        const v = cellList[j].findIndex(v => v.id === id);
        if (v > -1) {
          iIndex = Number(j);
          break;
        }
      }
    });
    if (iIndex > -1) {
      cellList[iIndex] = cellList[iIndex].filter(v => v.id !== id);
      cellList = cellList.filter(v => v.length);
      if (!cellList.length) {
        const i = deepClone(cellColumns);
        cellList.push([{ ...i, id: createUniqueString() }]);
      }
      (item as cellTableType).cellList = cellList;
    }
  }
  setActiveAttrs();
};
const dragEnd = (evt: DragEvent) => {
  const { pageX, pageY } = evt;
  const { x, y, width, height } = canvasContent.value.getBoundingClientRect();
  if (pageX > x && pageX < x + width && pageY > y && pageY < y + height) {
    const { left: leftMouse, top: topMouse } = mousePosition;
    const left = Number((pageX - x - leftMouse).toFixed(1));
    const top = Number((pageY - y - topMouse).toFixed(1));
    const type = (evt.target as HTMLElement).dataset.type;
    const fieldIndex = (evt.target as HTMLElement).dataset.field;
    if (!type) return;
    let fieldIdx;
    if (fieldIndex) {
      fieldIdx = Number(fieldIndex);
    }
    const item = getItemBase(left, top, type, fieldIdx);
    dragContentData.value = [...dragContentData.value, item];
    setTimeout(() => {
      activeItem.value = item.id;
    });
  }
};
const contentItemActive = (id: string) => {
  activeItem.value = id;
  setActiveAttrs();
};
const contenthandle = () => {
  activeItem.value = null;
};
const setContentPosition = () => {
  const { width, height } = modelSize.value;
  const conWidth = width * 3.78;
  const conHeight = height * 3.78;
  const { width: canWidth, height: canHeight } =
    contentCanvas.value?.getBoundingClientRect();
  const left = canWidth > conWidth ? (canWidth - conWidth) / 2 : 10;
  const top = canHeight > conHeight ? (canHeight - conHeight) / 2 : 10;
  canvasPosition.value = {
    left: left + 'px',
    top: top + 'px'
  };
};
const contentSizeChange = (val: sizesBasicType) => {
  modelSizeWidth.value = val.width;
  modelSizeHeight.value = val.height;
  setContentPosition();
};

const setContentSize = () => {
  const w = modelSizeWidth.value;
  const h = modelSizeHeight.value;
  const { width, height } = modelSize.value;
  const i = sizesBasic.value.find(v => v.width === w && v.height === h);

  modelSize.value = {
    size: (i && i.size) ?? '自定义',
    value: (i && i.value) ?? 'custom',
    width: w ?? width,
    height: h ?? height
  };
  setContentPosition();
};

const contentRotate = () => {
  const { width, height, size, value } = modelSize.value;
  modelSizeWidth.value = height;
  modelSizeHeight.value = width;
  modelSize.value = {
    size,
    value,
    width: height,
    height: width
  };

  setContentPosition();
};

const clearAll = () => {
  dragContentData.value = [];
  activeAttrs.value = null;
};
const formatModel = (): sourceType => {
  return {
    model: modelSize.value.value,
    list: dragContentData.value,
    style: {
      position: 'relative',
      width: modelSize.value.width + 'mm',
      height: modelSize.value.height + 'mm'
    }
  };
};
const emits = defineEmits(['success']);
const saveModel = () => {
  delete eventBus.cache.cpclModel;
  delete eventBus.cacheValue.cpclModel;
  const data: sourceType = formatModel();
  let aa: any = saveTemplate(data);
  function setCpcl(m) {
    if (m.status) {
      aa = m;
      console.log('setCpcl', data);
      console.log('setCpcl', aa);
      emits('success', {
        model: data,
        cpclModel: aa.data
      });
    }
  }
  if (aa.status === false && aa.code === 9001) {
    eventBus.on('cpclModel', true, setCpcl);
  } else if (aa.status === false && aa.code === 9999) {
    ElMessage({
      message: '请先选择字段',
      type: 'warning'
    });
  } else {
    emits('success', {
      model: data,
      cpclModel: aa.data
    });
    console.log(data);
    console.log(aa);
  }
};
const exportModel = () => {
  const contentModel = formatModel();
  const a = document.createElement('a');
  const content = JSON.stringify(contentModel);
  var blob = new Blob([content], { type: 'application/octet-stream' });
  a.href = window.URL.createObjectURL(blob);
  a.download = 'custom.text';
  a.click();
};
function initSource(importData: sourceType) {
  try {
    const { model, list, style } = importData;
    dragContentData.value = list;
    const { width = '', height = '' } = style;
    modelSize.value = {
      size: model === 'custom' ? '自定义' : model,
      value: model,
      width: Number(width.replace('mm', '')),
      height: Number(height.replace('mm', ''))
    };
  } catch (e) {}
}
if (props.source) {
  initSource(props.source);
}
const importModel = e => {
  const self: any = this;
  const input = e.target;
  if (window.FileReader) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.onload = (res: ProgressEvent) => {
      input.value = '';
      try {
        const importData: customType = JSON.parse((res.target as any).result);
        initSource(importData);
      } catch (e) {}
    };
    reader.readAsText(file);
  }
};
onMounted(() => {
  const userAgent = navigator.userAgent.indexOf('Firefox') > -1;
  if (userAgent) {
    document.body.ondrop = function (event) {
      event?.preventDefault();
      event?.stopPropagation();
    };
  }
  setContentPosition();
});
</script>
<script lang="ts">
export default defineComponent({
  name: 'PrintModel'
});
</script>
<style>
@import url('./../../style/iconfont.css');
</style>
<style scoped lang="less">
@import url('./../../style/index.less');
:deep(table) {
  border: none;
  border-collapse: collapse;
  border-color: rgb(44, 62, 80);
  box-sizing: border-box;
  position: relative;
  th,
  td {
    box-sizing: border-box;
    border: 1px solid #000;
    position: relative;
  }
}
</style>
