<!-- <template>
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
    <div class="print-content">
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
          class="ml10"
          style="width: 80px"
          placeholder=""
        />
        <el-input
          v-model="modelSizeHeight"
          class="ml10"
          style="width: 80px"
          placeholder=""
        />
        <el-button @click="setContentSize" type="primary" plain class="ml10"
          >确定</el-button
        >
        <el-button @click="contentRotate" type="primary" plain class="ml10"
          >旋转</el-button
        >
      </div>
      <!-- 画板 -->
      <div
        class="content-canvas-wrapper"
        ref="canvasWrapper"
        @mousemove.stop="moveingCanvas($event)"
      >
        <div class="content-canvas" ref="contentCanvas">
          <div
            class="content-canvas-drag"
            ref="canvasContent"
            @dragover="dragover"
            :style="`${canvasSize}left: ${canvasPosition.left}px;top: ${canvasPosition.top}px;right: auto;bottom:auto;`"
            @mousedown.stop="moveCanvasStart($event)"
          >
            <template v-for="(item, index) in dragContent" :key="item.type">
              <div
                class="print-content_item"
                :class="{ isActive: activeItem === item.id }"
                :data-id="item.id"
                @click.stop="contentItemActive"
                :ref="`contentItem${String(index)}`"
                :style="item.style"
                @mousedown.stop="$event => moveItemStart($event, index)"
              >
                {{ item.text }}
                <div
                  class="right-point"
                  @mousedown.stop="
                    $event => resizeItemStart($event, index, 'width', item.id)
                  "
                  v-show="activeItem === item.id"
                ></div>
                <div
                  class="bottom-point"
                  @mousedown.stop="
                    $event => resizeItemStart($event, index, 'height', item.id)
                  "
                  v-show="activeItem === item.id"
                ></div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- 属性设置 -->
    <div class="print-attrs"></div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import type { VNodeRef, PropType, Directive, DirectiveBinding } from 'vue';
import {
  dragData,
  sizesBasicData,
  staticText,
  createUniqueString
} from './config';
import type { sizesBasic, contentTypes, staticTextType } from './config';

interface canvasPosition {
  left: number;
  top: number;
}

interface position {
  left: number;
  top: number;
}

interface propsType {
  customTools?: customTools[];
  dragFieldDetail?: string;
}

interface customTools {
  children?: Array<customTools>;
  defaultValue: string | null;
  fieldCode: string;
  fieldListCode?: string;
  fieldName: string;
  remark: string | null;
}

const sizesBasic = ref<sizesBasic[]>(sizesBasicData);
// const props = defineProps({
//   customTools: {
//     type: Array as PropType<customTools[]>,
//     default: () => [
//       {
//         fieldName: '品名',
//         children: [],
//         fieldCode: 'spuName',
//         defaultValue: '1',
//         remark: '',
//         fieldListCode: ''
//       },
//       {
//         fieldName: '颜色',
//         children: [],
//         fieldCode: 'color',
//         defaultValue: '1',
//         remark: '',
//         fieldListCode: ''
//       },
//       {
//         fieldName: '幅宽',
//         children: [],
//         fieldCode: 'gateWidth',
//         defaultValue: '1',
//         remark: '',
//         fieldListCode: ''
//       },
//       {
//         fieldName: '缸号',
//         children: [],
//         fieldCode: 'cylinderNumber',
//         defaultValue: '1',
//         remark: '',
//         fieldListCode: ''
//       },
//       {
//         fieldName: '细码数量',
//         children: [],
//         fieldCode: 'fineQuantity',
//         defaultValue: '1',
//         remark: '',
//         fieldListCode: ''
//       }
//     ]
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
      children: [],
      fieldCode: 'fineQuantity',
      defaultValue: '1',
      remark: '',
      fieldListCode: ''
    }
  ]
});

const customToolsList = computed(() => {
  return props.customTools.map(v => ({ ...v, type: 'valueText' }));
});
let mousePosition = <position>{
  left: 0,
  top: 0
};

const modelSize = ref<sizesBasic>({
  size: '自定义',
  width: 50,
  height: 100
});
const modelSizeWidth = ref<number | null>(50);
const modelSizeHeight = ref<number | null>(100);
const canvasSize = computed<string>(() => {
  return `width: ${modelSize.value.width}mm; height: ${modelSize.value.height}mm;`;
});
const canvasPosition = ref<canvasPosition>({
  left: 0,
  top: 0
});
const vMove: Directive<any, canvasPosition> = (
  el: HTMLElement,
  binding: DirectiveBinding
) => {
  const mousedown = (evt: MouseEvent) => {
    evt.preventDefault();
    const X = evt.pageX;
    const Y = evt.pageY;
    const { left, top } = binding.value;
    const move = (e: MouseEvent) => {
      binding.value.left = left + e.pageX - X;
      binding.value.top = top + e.pageY - Y;
    };
    canvasWrapper.value.addEventListener('mousemove', move);
    document.addEventListener('mouseup', () => {
      canvasWrapper.value.removeEventListener('mousemove', move);
    });
  };
  el.addEventListener('mousedown', mousedown);
};
const drarElement = ref<string | null>();

const isMoveCanvas = ref<boolean>(false);
const isMoveItem = ref<boolean>(false);
const isResizeItem = ref<boolean>(false);
let dragStartPosition = {
  index: -1,
  left: 0,
  top: 0,
  pageX: 0,
  pageY: 0
};
let resizeItem = {
  id: '',
  type: '',
  index: -1,
  width: 0,
  height: 0,
  pageX: 0,
  pageY: 0
};
const canvasWrapper = ref<VNodeRef | null>(null);
const contentCanvas = ref<VNodeRef | null>(null);
const canvasContent = ref<VNodeRef | null>(null);
const dragContent = ref<contentTypes[]>([]);
const activeItem = ref<string | null>();
// 画板拖动
const moveCanvasStart = (e: MouseEvent) => {
  isMoveCanvas.value = true;
  isMoveItem.value = false;
  isResizeItem.value = false;
  activeItem.value = null;
  const { pageX, pageY } = e;
  const { left, top } = canvasPosition.value;
  dragStartPosition = {
    index: -1,
    left,
    top,
    pageX,
    pageY
  };
};
const moveingCanvas = _.debounce((e: MouseEvent) => {
  if (!isMoveCanvas.value && !isMoveItem.value && !isResizeItem.value) return;
  const {
    left,
    top,
    pageX: pageXSart,
    pageY: pageYSart,
    index
  } = dragStartPosition;

  const { pageX, pageY } = e;
  const leftNow = left + pageX - pageXSart;
  const topNow = top + pageY - pageYSart;
  if (isMoveCanvas.value) {
    canvasPosition.value = { left: leftNow, top: topNow };
  }
  if (isMoveItem.value) {
    dragContent.value[index].style.left = leftNow;
    dragContent.value[index].style.top = topNow;
  }
  if (isResizeItem.value) {
    const {
      type,
      width,
      height,
      pageX: pageXSart,
      pageY: pageYSart
    } = resizeItem;
    if (type === 'width') {
      const w = width + pageX - pageXSart;
      dragContent.value[index].style.width = `${w > 0 ? w : 0}px`;
    }
    if (type === 'height') {
      const h = height + pageY - pageYSart;
      dragContent.value[index].style.height = `${h > 0 ? h : 0}px`;
    }
  }
}, 10);
const moveCanvasEnd = () => {
  isMoveCanvas.value = false;
  isMoveItem.value = false;
  isResizeItem.value = false;
};
// 元素拖动
const moveItemStart = (e: MouseEvent, index: number) => {
  isMoveCanvas.value = false;
  isMoveItem.value = true;
  isResizeItem.value = false;
  const { pageX, pageY } = e;
  const { left, top } = dragContent.value[index].style;

  dragStartPosition = {
    index,
    left,
    top,
    pageX,
    pageY
  };
};
const resizeItemStart = (
  e: MouseEvent,
  index: number,
  type: string,
  id: string
) => {
  isMoveCanvas.value = false;
  isMoveItem.value = false;
  isResizeItem.value = true;
  const { pageX, pageY } = e;
  const dom = (e.target as HTMLDivElement).parentNode as HTMLDivElement;
  const { width, height } = dom.getBoundingClientRect();
  resizeItem = {
    id,
    type,
    index,
    width,
    height,
    pageX,
    pageY
  };
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

const dragEnd = (evt: DragEvent) => {
  const { pageX, pageY } = evt;
  const { left: leftMouse, top: topMouse } = mousePosition;
  const { x, y } = canvasContent.value.getBoundingClientRect();
  const left = Number((pageX - x - leftMouse).toFixed(1));
  const top = Number((pageY - y - topMouse).toFixed(1));
  const { style, ...args } = staticText;
  const item: staticTextType = {
    style: {
      ...style,
      left,
      top
    },
    ...args,
    id: createUniqueString()
  };
  dragContent.value.push(item);
};
const contentItemActive = (e: Event) => {
  const id = (e.target as HTMLDivElement).dataset.id;
  if (id) {
    activeItem.value = id;
  }
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
    left,
    top
  };
};
const contentSizeChange = (val: sizesBasic) => {
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
    width: w ?? width,
    height: h ?? height
  };
  setContentPosition();
};
const contentRotate = () => {
  const { width, height, size } = modelSize.value;
  modelSizeWidth.value = height;
  modelSizeHeight.value = width;
  modelSize.value = {
    size,
    width: height,
    height: width
  };

  setContentPosition();
};
onMounted(() => {
  const userAgent = navigator.userAgent.indexOf('Firefox') > -1;
  if (userAgent) {
    document.body.ondrop = function (event) {
      event.preventDefault();

      event.stopPropagation();
    };
  }
  document.addEventListener('mouseup', moveCanvasEnd);
  setContentPosition();
});
onUnmounted(() => {
  document.removeEventListener('mouseup', moveCanvasEnd);
});
</script>
<style scoped lang="less">
@import url('./style/iconfont.css');
@import url('./style/index.less');
</style> -->
