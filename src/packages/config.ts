

import type { CSSProperties } from 'vue';
import type { FontWeightProperty, TextAlignProperty, BorderBottomProperty } from 'csstype';
import { deepClone } from '@/packages/utils';

export function createUniqueString() {
  const timestamp: string = Date.now().toFixed();
  const randomNum: string = Math.floor((1 + Math.random()) * 65536).toFixed();
  return (randomNum + timestamp).slice(0, 32);
}

// 常用工具
export const dragData = [
  {
    type: 'staticText',
    icon: 'iconwenzigongju',
    text: '静态文本'
  },
  {
    type: 'valueText',
    icon: 'iconquzhiwenben',
    text: '取值文本'
  },
  {
    type: 'horizontal',
    icon: 'iconhengxian',
    text: '横线'
  },
  {
    type: 'vertical',
    icon: 'iconshuxian',
    text: '竖线'
  },
  {
    type: 'barcode',
    icon: 'icontiaoma1',
    text: '条码'
  },
  {
    type: 'qrcode',
    icon: 'iconerweima1',
    text: '二维码'
  },
  {
    type: 'round',
    icon: 'iconquzhiwenbenbeifen3',
    text: '圆形'
  },
  {
    type: 'rectangle',
    icon: 'iconquzhiwenbenbeifen3',
    text: '矩形'
  },
  {
    type: 'commonTable',
    icon: 'iconbiaoge2',
    text: '表格'
  },
  {
    type: 'codeTable',
    icon: 'iconbiaoge2',
    text: '码单表格'
  },
  {
    type: 'cellTable',
    icon: 'iconbiaoge2',
    text: '格子布局'
  },
  {
    type: 'layoutTable',
    icon: 'iconbiaoge2',
    text: '表格布局'
  },
  {
    type: 'image',
    icon: 'icontupian',
    text: '图片'
  }
];

export interface customTools {
  children?: Array<customTools>;
  defaultValue: string | null;
  fieldCode: string;
  fieldListCode?: string;
  fieldName: string;
  remark: string | null;
}

// 默认尺寸
export interface sizesBasicType {
  size: string;
  value: string;
  width: number;
  height: number;
}

export const sizesBasicData: sizesBasicType[] = [
  {
    size: 'A3',
    value: 'A3',
    width: 420,
    height: 296
  },
  {
    size: 'A4',
    value: 'A4',
    width: 210,
    height: 296
  },
  {
    size: 'A5',
    value: 'A5',
    width: 210,
    height: 147
  },
  {
    size: 'B3',
    value: 'B3',
    width: 500,
    height: 352
  },
  {
    size: 'B4',
    value: 'B4',
    width: 250,
    height: 352
  },
  {
    size: 'B5',
    value: 'B5',
    width: 250,
    height: 175
  },
  {
    size: '自定义',
    value: 'custom',
    width: 50,
    height: 100
  }
];


// 默认数据
// 默认样式
let styleBasic: CSSProperties = {
  'boxSizing': 'border-box',
  'fontSize': '12px',
  'textAlign': 'center',
  'fontWeight': 'normal',
  'paddingLeft': '0px',
  'paddingRight': '0px',
  'paddingTop': '0px',
  'paddingBottom': '0px',
  'marginLeft': '0px',
  'marginRight': '0px',
  'marginTop': '0px',
  'marginBottom': '0px',
  'display': 'inline-block',
  'verticalAlign': 'top',
  'transform': 'rotate(0deg)',
  'top': '0px',
  'left': '0px'
};
//边框样式
let borderStyle: CSSProperties = {
  'borderLeft': '1px solid #000',
  'borderRight': '1px solid #000',
  'borderTop': '1px solid #000',
  'borderBottom': '1px solid #000'
};

// 静态文本
export interface staticTextType {
  style: CSSProperties;
  text: string;
  id: string;
  type: string;
}

// 取值文本
export interface valueTextType {
  style: CSSProperties;
  text: string;
  field: string;
  textData: string;
  templateContent: string;
  textLength: string;
  padText: number | null;
  id: string;
  type: string;
}

// 横线 竖线
export interface lineType {
  style: CSSProperties;
  className: string;
  id: string;
  text: string;
  type: string;
}

// 条码
export interface barcodeType {
  style: CSSProperties;
  text: string;
  barcodeValueStyle: {
    display: string;
    marginTop: string;
  };
  barcodeType: 'svg' | 'img' | 'canvas';
  field: string;
  textData: string;
  id: string;
  type: string;
}

// 圆形
export interface roundType {
  style: CSSProperties;
  id: string;
  text: string;
  type: string;
}

// 矩形
export interface rectangleType {
  style: CSSProperties;
  id: string;
  text: string;
  type: string;
}

// 表格
export interface commonTableType {
  style: CSSProperties;
  field: string;
  columnNum: number;
  showtableHeader: boolean;
  tableBorder: boolean;
  columnList: Array<tableColumnsType>;
  text: string;
  id: string;
  type: string;
}

// 码单表格
export interface codeTableType {
  style: CSSProperties;
  tableNum: number;
  rowNum: number;
  columnNum: number;
  showColumnHeader: boolean;
  showRowHeader: boolean;
  rowHeaderField: string;
  columnHeaderField: string;
  rowHeaderTextData: string;
  columnHeaderTextData: string;
  showtableHeader: boolean;
  showSummary: boolean;
  summaryField: string;
  summaryTextData: string;
  summaryStyle: {
    minHeight: string;
    lineHeight: string;
  };
  fullBin: true;
  columnList: Array<tableColumnsType>;
  tableStyle: {
    marginLeft: string;
  };
  tableBorder: true;
  text: string;
  id: string;
  field: string;
  type: string;
}

// 表格单元格
export interface tableColumnsType {
  style: CSSProperties;
  field: string;
  textData: string;
  text: string;
  id: string;
  type: string;
}

// 格子布局
export interface cellTableType {
  style: CSSProperties;
  cellRowNum: number;
  border: boolean;
  cellList: Array<Array<cellColumnsType>>;
  text: string;
  id: string;
  type: string;
}

// 格子布局单元格
export interface cellColumnsType {
  field: string;
  textData: string;
  templateContent: string;
  textLength: string;
  padText: number | null;
  style: CSSProperties;
  text: string;
  id: string;
  type: string;
}

// 表格布局
export interface layoutTableType {
  style: CSSProperties;
  cellRowNum: number;
  columnNum: number;
  cellList: Array<Array<layoutTableCellType>>;
  text: string;
  id: string;
  type: string;
}

// 表格布局单元格
export interface layoutTableCellType {
  id: string;
  type: string;
  field: string;
  textData: string;
  text: string;
  templateContent: string;
  rowspan: number;
  colspan: number;
  show: boolean;
  style: {
    width: string;
    textAlign: 'left' | 'center' | 'right';
    height: string;
    fontWeight: 'bold' | 'normal';
    lineHeight: string;
    fontSize: string;
    paddingLeft: string;
    paddingRight: string;
    paddingTop: string;
    paddingBottom: string;
    position: 'absolute' | 'relative' | 'static';
  };
}

// 二维码
export interface qrcodeType {
  style: CSSProperties;
  qrcodeValueStyle: {
    display: string;
    marginTop: string;
  };
  qrcodeType: 'svg' | 'canvas' | 'img';
  qrcodeLevel: 'L' | 'M' | 'Q' | 'H';
  field: string;
  textData: string;
  id: string;
  text: string;
  type: string;
}

// 图片
export interface imageType {
  style: CSSProperties;
  field: string;
  url: string;
  text: string;
  id: string;
  type: string;
}

export const componentEnum = {
  "staticText": "StaticText",
  "valueText": "ValueText",
  "horizontal": "Horizontal",
  "vertical": "Vertical",
  "barcode": "Barcode",
  "round": "Round",
  "rectangle": "Rectangle",
  "commonTable": "CommonTable",
  "codeTable": "CodeTable",
  "tableColumns": "TableColumns",
  "cellTable": "CellTable",
  "cellColumns": "CellColumns",
  "layoutTable": "LayoutTable",
  "layoutTableCell": "LayoutTableCell",
  "qrcode": "Qrcode",
  "image": "Image1",
}

export interface attrItem {
  label: string;
  obj: object;
  objKey?: string[];
  component: string;
  field: string;
  [k: string]: any
}

export interface attrItem1 {
  child: attrItem[];
}

export type attrsType = (attrItem | attrItem1)[];

export type contentTypes =
  staticTextType |
  valueTextType |
  lineType |
  barcodeType |
  roundType |
  rectangleType |
  commonTableType |
  codeTableType |
  cellTableType |
  layoutTableType |
  qrcodeType |
  imageType;

interface contentConfigType {
  [k: string]: {
    base: {
      style: CSSProperties,
      [k: string]: any
    };
    attrs: attrsType;
    variableFields?: {
      fields: string[],
      defaultValue: {
        [k: string]: any
      }
    }
  }
}
const getAttrs = (label: string, component: string, field: string, objKey?: string[] | null, config?: object[] | null, entries?: any[]): attrItem => {
  const obj: attrItem = {
    label,
    component,
    obj: {},
    field
  }
  if (Array.isArray(objKey)) {
    obj.objKey = objKey
  }
  if (Array.isArray(config)) {
    obj.config = config
  }
  if (Array.isArray(entries)) {
    entries.forEach(v => {
      obj[v.k] = v.value
    })
  }
  return obj
}

const getAttrsArr = (arr: ['', '', ''][]) => {
  arr.map((c) => {
    getAttrs(...c)
  })
}

const attrsMap = {
  text: getAttrs('文本内容', 'input', 'text'),
  textData: getAttrs('预设文本', 'input', 'textData'),
  templateContent: getAttrs('模版内容', 'input', 'templateContent'),
  url: getAttrs('图片地址', 'input', 'url'),
  display: getAttrs('展示文字', 'RadioButton', 'display', ['barcodeValueStyle'], [
    {
      label: '有',
      value: 'block'
    },
    {
      label: '无',
      value: 'none'
    },
  ]),
  displayQR: getAttrs('展示文字', 'RadioButton', 'display', ['qrcodeValueStyle'], [
    {
      label: '有',
      value: 'block'
    },
    {
      label: '无',
      value: 'none'
    },
  ]),
  field: getAttrs('字段', 'select', 'field'),
  field1: getAttrs('字段名', 'input1', 'field'),
  field2: getAttrs('选择属性', 'select', 'field'),
  field3: getAttrs('字段名', 'select2', 'field'),
  padText: getAttrs('显示位数', 'inputNumber', 'padText'),
  textLength: getAttrs('填充字段', 'input', 'textLength'),
  cellRowNum: getAttrs('行数', 'inputNumber', 'cellRowNum', null, null, [{ k: 'min', value: 1 }]),
  barcodeType: getAttrs('条码类型', 'select1', 'barcodeType', null, [
    {
      label: 'img',
      value: 'img'
    },
    {
      label: 'svg',
      value: 'svg'
    },
    {
      label: 'canvas',
      value: 'canvas'
    },
  ]),
  qrcodeType: getAttrs('类型', 'select1', 'qrcodeType', null, [
    {
      label: 'img',
      value: 'img'
    },
    {
      label: 'svg',
      value: 'svg'
    },
    {
      label: 'canvas',
      value: 'canvas'
    },
  ]),
  qrcodeLevel: getAttrs('等级', 'select1', 'qrcodeLevel', null, [
    {
      label: 'L',
      value: 'L'
    },
    {
      label: 'M',
      value: 'M'
    },
    {
      label: 'Q',
      value: 'Q'
    },
    {
      label: 'H',
      value: 'H'
    },
  ]),
  leftStyle: getAttrs('x轴坐标', 'InputNumberPX', 'left', ['style']),
  topStyle: getAttrs('y轴坐标', 'InputNumberPX', 'top', ['style']),
  widthStyle: getAttrs('宽度', 'InputNumberPX', 'width', ['style']),
  heightStyle: getAttrs('高度', 'InputNumberPX', 'height', ['style']),
  fontSizeStyle: getAttrs('字体大小', 'InputNumberPX', 'fontSize', ['style']),
  transformStyle: getAttrs('旋转', 'Rotate', 'transform', ['style']),
  lineHeightStyle: getAttrs('行间距', 'InputNumberPX', 'lineHeight', ['style']),
  positionStyle: getAttrs('定位方式', 'RadioButton', 'position', ['style'], [
    {
      label: '绝对',
      value: 'absolute'
    },
    {
      label: '相对',
      value: 'relative'
    },
  ]),
  fontWeightStyle: getAttrs('加粗', 'RadioButton', 'fontWeight', ['style'], [
    {
      label: '是',
      value: 'bold'
    },
    {
      label: '否',
      value: 'normal'
    },
  ]),
  textAlignStyle: getAttrs('内容排序', 'RadioButton', 'textAlign', ['style'], [
    {
      label: '<i class="iconfont qb-print-radio_icon iconzuoduiqi"></i>',
      value: 'left'
    },
    {
      label: '<i class="iconfont qb-print-radio_icon iconjuzhongduiqi"></i>',
      value: 'center'
    },
    {
      label: '<i class="iconfont qb-print-radio_icon iconzuoduiqibeifen"></i>',
      value: 'right'
    },
  ]),
  tableBorder: getAttrs('表格边框', 'RadioButton', 'tableBorder', null, [
    {
      label: '有',
      value: true
    },
    {
      label: '无',
      value: false
    },
  ]),
  showtableHeader: getAttrs('表头', 'RadioButton', 'showtableHeader', null, [
    {
      label: '有',
      value: true
    },
    {
      label: '无',
      value: false
    },
  ]),
  fullBin: getAttrs('满格打印', 'RadioButton', 'fullBin', null, [
    {
      label: '有',
      value: true
    },
    {
      label: '无',
      value: false
    },
  ]),
  showRowHeader: getAttrs('首列', 'RadioButton', 'showRowHeader', null, [
    {
      label: '有',
      value: true
    },
    {
      label: '无',
      value: false
    },
  ]),
  rowHeaderField: getAttrs('首列取值', 'select', 'rowHeaderField'),
  showColumnHeader: getAttrs('分组列', 'RadioButton', 'showColumnHeader', null, [
    {
      label: '有',
      value: true
    },
    {
      label: '无',
      value: false
    },
  ]),
  columnHeaderField: getAttrs('分组值', 'select', 'columnHeaderField'),
  showSummary: getAttrs('求和行', 'RadioButton', 'showSummary', null, [
    {
      label: '有',
      value: true
    },
    {
      label: '无',
      value: false
    },
  ]),
  summaryField: getAttrs('求和值', 'select', 'summaryField'),
  lineHeightSummary: getAttrs('求和行高', 'InputNumberPX', 'lineHeight', ['summaryStyle']),
  tableNum: getAttrs('分组列数', 'inputNumber', 'tableNum', null, null, [{ k: 'min', value: 1 }]),
  columnNum: getAttrs('单元格数', 'inputNumber', 'columnNum', null, null, [{ k: 'min', value: 1 }]),
  rowNum: getAttrs('分组行数', 'inputNumber', 'rowNum', null, null, [{ k: 'min', value: 1 }]),
  marginLeftTable: getAttrs('列间隔', 'InputNumberPX', 'marginLeft', ['tableStyle']),
  border: getAttrs('边框', 'RadioButton', 'border', null, [
    {
      label: '有',
      value: true
    },
    {
      label: '无',
      value: false
    },
  ]),
  borderWidth: getAttrs('边框宽度', 'InputNumberPX', 'borderWidth', ['style']),
  borderStyle: getAttrs('边框样式', 'select1', 'borderStyle', ['style'], [
    {
      label: '实线',
      value: 'solid'
    },
    {
      label: '虚线',
      value: 'dashed'
    },
    {
      label: '点线',
      value: 'dotted'
    },
  ]),
  borderLeftStyle: getAttrs('左边框', 'RadioButton', 'borderLeft', ['style'], [
    {
      label: '有',
      value: '1px solid #000'
    },
    {
      label: '无',
      value: 'none'
    },
  ]),
  borderRightStyle: getAttrs('右边框', 'RadioButton', 'borderRight', ['style'], [
    {
      label: '有',
      value: '1px solid #000'
    },
    {
      label: '无',
      value: 'none'
    },
  ]),
  borderTopStyle: getAttrs('上边框', 'RadioButton', 'borderTop', ['style'], [
    {
      label: '有',
      value: '1px solid #000'
    },
    {
      label: '无',
      value: 'none'
    },
  ]),
  borderBottomStyle: getAttrs('下边框', 'RadioButton', 'borderBottom', ['style'], [
    {
      label: '有',
      value: '1px solid #000'
    },
    {
      label: '无',
      value: 'none'
    },
  ]),
  marginLeftStyle: getAttrs('左边距', 'InputNumberPX', 'marginLeft', ['style']),
  marginRightStyle: getAttrs('右边距', 'InputNumberPX', 'marginRight', ['style']),
  marginTopStyle: getAttrs('上边距', 'InputNumberPX', 'marginTop', ['style']),
  marginBottomStyle: getAttrs('下边距', 'InputNumberPX', 'marginBottom', ['style']),
  paddingLeftStyle: getAttrs('左间距', 'InputNumberPX', 'paddingLeft', ['style']),
  paddingRightStyle: getAttrs('右间距', 'InputNumberPX', 'paddingRight', ['style']),
  paddingTopStyle: getAttrs('上间距', 'InputNumberPX', 'paddingTop', ['style']),
  paddingBottomStyle: getAttrs('下间距', 'InputNumberPX', 'paddingBottom', ['style']),
}
const textAttrs = [
  {
    child: [
      attrsMap.leftStyle,
      attrsMap.topStyle,
    ]
  },
  {
    child: [
      attrsMap.widthStyle,
      attrsMap.heightStyle,
    ]
  },
  {
    child: [
      attrsMap.fontSizeStyle,
      attrsMap.lineHeightStyle,
    ]
  },
  attrsMap.positionStyle,
  attrsMap.fontWeightStyle,
  {
    child: [
      attrsMap.borderLeftStyle,
      attrsMap.borderRightStyle,
    ]
  },
  {
    child: [
      attrsMap.borderTopStyle,
      attrsMap.borderBottomStyle,
    ]
  },
  attrsMap.textAlignStyle,
  {
    child: [
      attrsMap.paddingLeftStyle,
      attrsMap.paddingRightStyle,
    ]
  },
  {
    child: [
      attrsMap.marginTopStyle,
      attrsMap.marginBottomStyle,
    ]
  },
  {
    child: [
      attrsMap.paddingLeftStyle,
      attrsMap.paddingRightStyle,
    ]
  },
  {
    child: [
      attrsMap.paddingTopStyle,
      attrsMap.paddingBottomStyle,
    ]
  },
]
const contentConfig: contentConfigType = {
  staticText: {
    base: {
      id: '',
      style: {
        ...styleBasic,
        ...borderStyle,
        position: 'absolute',
        width: '80px',
        height: '40px',
        lineHeight: '40px'
      },
      text: '静态文本',
      type: 'staticText',
    },
    attrs: [
      attrsMap.text,
      ...textAttrs
    ],
    variableFields: {
      fields: ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
      defaultValue: {
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
      }
    }
  },
  valueText: {
    base: {
      style: {
        ...styleBasic,
        ...borderStyle,
        position: 'absolute',
        width: '100px',
        height: '40px',
        lineHeight: '40px'
      },
      text: '',
      field: '',
      id: '',
      type: 'valueText',
      textData: '取值文本',
      templateContent: '',
      textLength: '',
      padText: null
    },
    attrs: [
      attrsMap.field,
      attrsMap.textData,
      ...textAttrs,
      {
        child: [
          attrsMap.padText,
          attrsMap.textLength,
        ]
      }
    ],
    variableFields: {
      fields: ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
      defaultValue: {
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
      }
    }
  },
  horizontal: {
    base: {
      id: '',
      text: '横线',
      type: 'horizontal',
      style: {
        ...styleBasic,
        width: '100px',
        height: '0px',
        position: 'absolute',
        borderColor: '#000',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderBottom: 'transparent',
        borderLeft: 'transparent',
        borderRight: 'transparent'
      },
      className: 'qb-print-border_solid'
    },
    attrs: [
      {
        child: [
          attrsMap.leftStyle,
          attrsMap.topStyle,
        ]
      },
      attrsMap.borderWidth,
      attrsMap.widthStyle,
      attrsMap.positionStyle,
      attrsMap.borderStyle,
    ]
  },
  vertical: {
    base: {
      id: '',
      text: '竖线',
      type: 'vertical',
      style: {
        ...styleBasic,
        width: '0px',
        height: '100px',
        position: 'absolute',
        borderColor: '#000',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRight: 'transparent',
        borderTop: 'transparent',
        borderBottom: 'transparent'
      },
      className: 'qb-print-border_solid'
    },
    attrs: [
      {
        child: [
          attrsMap.leftStyle,
          attrsMap.topStyle,
        ]
      },
      attrsMap.borderWidth,
      attrsMap.heightStyle,
      attrsMap.positionStyle,
      attrsMap.borderStyle,
    ]
  },
  barcode: {
    base: {
      id: '',
      text: '条形码',
      textData: '12312312312',
      type: 'barcode',
      style: {
        ...styleBasic,
        position: 'absolute',
        width: '120px',
        height: '60px'
      },
      barcodeValueStyle: {
        display: 'block',
        marginTop: '5px'
      },
      barcodeType: 'img',
      field: '',
    },
    attrs: [
      attrsMap.field,
      attrsMap.textData,
      attrsMap.display,
      {
        child: [
          attrsMap.leftStyle,
          attrsMap.topStyle,
        ]
      },
      {
        child: [
          attrsMap.widthStyle,
          attrsMap.heightStyle,
        ]
      },
      attrsMap.fontSizeStyle,
      attrsMap.transformStyle,
      attrsMap.positionStyle,
      attrsMap.barcodeType,
    ]
  },
  round: {
    base: {
      id: '',
      text: '圆形',
      type: 'round',
      style: { ...styleBasic, width: '120px', height: '120px' }
    },
    attrs: []
  },
  rectangle: {
    base: {
      id: '',
      text: '矩形',
      type: 'rectangle',
      style: {
        ...styleBasic,
        ...borderStyle,
        position: 'absolute',
        width: '120px',
        height: '120px'
      }
    },
    attrs: [
      {
        child: [
          attrsMap.leftStyle,
          attrsMap.topStyle,
        ]
      },
      {
        child: [
          attrsMap.widthStyle,
          attrsMap.heightStyle,
        ]
      },
      attrsMap.positionStyle,
      {
        child: [
          attrsMap.borderLeftStyle,
          attrsMap.borderRightStyle,
        ]
      },
      {
        child: [
          attrsMap.borderTopStyle,
          attrsMap.borderBottomStyle,
        ]
      },
    ]
  },
  commonTable: {
    base: {
      id: '',
      text: '表格',
      type: 'commonTable',
      style: { ...styleBasic, position: 'absolute', "border-width": '0' },
      field: '',
      columnNum: 4,
      showtableHeader: true,
      tableBorder: true,
      columnList: []
    },
    attrs: [
      attrsMap.field2,
      attrsMap.field1,
      {
        child: [
          attrsMap.leftStyle,
          attrsMap.topStyle,
        ]
      },
      attrsMap.positionStyle,
      attrsMap.tableBorder,
      {
        child: [
          attrsMap.paddingLeftStyle,
          attrsMap.paddingRightStyle,
        ]
      },
      {
        child: [
          attrsMap.paddingTopStyle,
          attrsMap.paddingBottomStyle,
        ]
      },
      attrsMap.showtableHeader,
      attrsMap.columnNum,
    ]
  },
  codeTable: {
    base: {
      id: '',
      text: '码单表格',
      field: '',
      type: 'codeTable',
      style: { ...styleBasic, position: 'absolute' },
      tableNum: 2,
      rowNum: 2,
      columnNum: 2,
      showColumnHeader: false,
      showRowHeader: false,
      rowHeaderField: '',
      columnHeaderField: '',
      rowHeaderTextData: '',
      columnHeaderTextData: '',
      showtableHeader: true,
      showSummary: false,
      summaryField: '',
      summaryTextData: '',
      summaryStyle: {
        minHeight: '12px',
        lineHeight: '35px'
      },
      fullBin: true,
      columnList: [],
      tableStyle: {
        marginLeft: '0px'
      },
      tableBorder: true
    },
    attrs: [
      attrsMap.field2,
      attrsMap.field1,
      {
        child: [
          attrsMap.leftStyle,
          attrsMap.topStyle,
        ]
      },
      attrsMap.positionStyle,
      attrsMap.tableBorder,
      {
        child: [
          attrsMap.paddingLeftStyle,
          attrsMap.paddingRightStyle,
        ]
      },
      {
        child: [
          attrsMap.paddingTopStyle,
          attrsMap.paddingBottomStyle,
        ]
      },
      {
        child: [
          attrsMap.showRowHeader,
          attrsMap.rowHeaderField,
        ]
      },
      {
        child: [
          attrsMap.showColumnHeader,
          attrsMap.columnHeaderField,
        ]
      },
      {
        child: [
          attrsMap.showSummary,
          attrsMap.summaryField,
        ]
      },
      attrsMap.lineHeightSummary,
      {
        child: [
          attrsMap.showtableHeader,
          attrsMap.fullBin,
        ]
      },
      {
        child: [
          attrsMap.tableNum,
          attrsMap.columnNum
          ,
        ]
      },
      {
        child: [
          attrsMap.rowNum,
          attrsMap.marginLeftTable
          ,
        ]
      },
    ]
  },
  tableColumns: {
    base: {
      id: '',
      text: '表格单元格',
      type: 'tableColumns',
      field: '',
      textData: `表头`,
      style: {
        width: '50px',
        height: '35px',
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: '12px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        position: 'relative'
      }
    },
    attrs: [
      attrsMap.field3,
      attrsMap.textData,
      {
        child: [
          attrsMap.widthStyle,
          attrsMap.heightStyle,
        ]
      },
      attrsMap.fontSizeStyle,
      attrsMap.textAlignStyle,
      {
        child: [
          attrsMap.paddingLeftStyle,
          attrsMap.paddingRightStyle,
        ]
      },
      {
        child: [
          attrsMap.paddingTopStyle,
          attrsMap.paddingBottomStyle,
        ]
      },
    ]
  },
  cellTable: {
    base: {
      id: '',
      text: '格子布局',
      type: 'cellTable',
      style: { ...styleBasic, ...borderStyle, position: 'absolute', width: '160px', height: 'auto' },
      cellRowNum: 2,
      border: true,
      cellList: []
    },
    attrs: [
      {
        child: [
          attrsMap.leftStyle,
          attrsMap.topStyle,
        ]
      },
      attrsMap.widthStyle,
      attrsMap.positionStyle,
      attrsMap.border,
      {
        child: [
          attrsMap.borderLeftStyle,
          attrsMap.borderRightStyle,
        ]
      },
      {
        child: [
          attrsMap.borderTopStyle,
          attrsMap.borderBottomStyle,
        ]
      },
      attrsMap.cellRowNum,
    ]
  },
  cellColumns: {
    base: {
      id: '',
      type: 'cellColumns',
      field: '',
      textData: '',
      text: '单元格',
      templateContent: '',
      textLength: '',
      padText: null,
      style: {
        width: '80px',
        textAlign: 'center',
        minHeight: '12px',
        fontWeight: 'normal',
        lineHeight: '12px',
        fontSize: '12px',
        paddingLeft: '5px',
        paddingRight: '5px',
        paddingTop: '5px',
        paddingBottom: '5px',
        position: 'relative',
        borderTop: '1px solid #000',
        borderRight: '1px solid #000'
      }
    },
    attrs: [
      attrsMap.field,
      attrsMap.text,
      attrsMap.textData,
      attrsMap.widthStyle,
      {
        child: [
          attrsMap.fontSizeStyle,
          attrsMap.lineHeightStyle,
        ]
      },
      attrsMap.fontWeightStyle,
      attrsMap.textAlignStyle,
      {
        child: [
          attrsMap.paddingLeftStyle,
          attrsMap.paddingRightStyle,
        ]
      },
      {
        child: [
          attrsMap.paddingTopStyle,
          attrsMap.paddingBottomStyle,
        ]
      },
      {
        child: [
          attrsMap.padText,
          attrsMap.textLength,
        ]
      },
    ]
  },
  layoutTable: {
    base: {
      id: '',
      text: '表格布局',
      type: 'layoutTable',
      style: { ...styleBasic, position: 'absolute' },
      cellRowNum: 4,
      columnNum: 4,
      cellList: []
    },
    attrs: [
      {
        child: [
          attrsMap.leftStyle,
          attrsMap.topStyle,
        ]
      },
      attrsMap.widthStyle,
      attrsMap.positionStyle,
    ]
  },
  layoutTableCell: {
    base: {
      id: '',
      type: 'layoutTableCell',
      field: '',
      textData: '',
      text: '',
      templateContent: '',
      rowspan: 1,
      colspan: 1,
      show: true,
      style: {
        width: '80px',
        textAlign: 'center',
        height: '80px',
        fontWeight: 'normal',
        lineHeight: '69px',
        fontSize: '12px',
        paddingLeft: '5px',
        paddingRight: '5px',
        paddingTop: '5px',
        paddingBottom: '5px',
        position: 'static'
      }
    },
    attrs: [
      attrsMap.field,
      attrsMap.text,
      attrsMap.templateContent,
      {
        child: [
          attrsMap.widthStyle,
          attrsMap.heightStyle,
        ]
      },
      {
        child: [
          attrsMap.fontSizeStyle,
          attrsMap.lineHeightStyle,
        ]
      },
      attrsMap.fontWeightStyle,
      attrsMap.textAlignStyle,
      {
        child: [
          attrsMap.paddingLeftStyle,
          attrsMap.paddingRightStyle,
        ]
      },
      {
        child: [
          attrsMap.paddingTopStyle,
          attrsMap.paddingBottomStyle,
        ]
      },
    ]
  },
  qrcode: {
    base: {
      id: '',
      text: '二维码',
      type: 'qrcode',
      style: {
        ...styleBasic,
        position: 'absolute',
        width: '100px'
      },
      qrcodeValueStyle: {
        display: 'block',
        marginTop: '5px'
      },
      qrcodeType: 'svg',
      qrcodeLevel: 'H',
      field: '',
      textData: 'example.com'
    },
    attrs: [
      attrsMap.field,
      attrsMap.textData,
      attrsMap.displayQR,
      {
        child: [
          attrsMap.leftStyle,
          attrsMap.topStyle,
        ]
      },
      {
        child: [
          attrsMap.widthStyle,
          attrsMap.heightStyle,
        ]
      },
      attrsMap.fontSizeStyle,
      attrsMap.transformStyle,
      attrsMap.positionStyle,
      attrsMap.qrcodeType,
      attrsMap.qrcodeLevel,
    ]
  },
  image: {
    base: {
      id: '',
      text: '图片',
      type: 'image',
      style: {
        ...styleBasic,
        position: 'absolute',
        height: '100px',
        width: 'auto'
      },
      field: '',
      url: ''
    },
    attrs: [
      attrsMap.field,
      attrsMap.url,
      {
        child: [
          attrsMap.leftStyle,
          attrsMap.topStyle,
        ]
      },
      {
        child: [
          attrsMap.widthStyle,
          attrsMap.heightStyle,
        ]
      },
      attrsMap.positionStyle,
    ]
  }
};

export const staticText = contentConfig.staticText.base as staticTextType
export const staticTextAttrs = contentConfig.staticText.attrs as attrsType

export const valueText = contentConfig.valueText.base as valueTextType
export const valueTextAttrs = contentConfig.valueText.attrs as attrsType

export const horizontal = contentConfig.horizontal.base as lineType
export const horizontalAttrs = contentConfig.horizontal.attrs as attrsType

export const vertical = contentConfig.vertical.base as lineType
export const verticallAttrs = contentConfig.vertical.attrs as attrsType

export const barcode = contentConfig.barcode.base as barcodeType
export const barcodeAttrs = contentConfig.barcode.attrs as attrsType

export const round = contentConfig.round.base as roundType

export const rectangle = contentConfig.rectangle.base as rectangleType
export const rectangleAttrs = contentConfig.rectangle.attrs as attrsType

export const commonTable = (() => {
  const b = contentConfig.commonTable.base;
  b.columnList = new Array(b.columnNum).fill('').map(() => {
    const i = deepClone(contentConfig.tableColumns.base);
    return { ...i, id: createUniqueString() }
  })
  return b as commonTableType
})()
export const commonTableAttrs = contentConfig.commonTable.attrs as attrsType
export const tableColumns = contentConfig.tableColumns.base as tableColumnsType

export const tableColumnsAttrs = contentConfig.tableColumns.attrs as attrsType

export const codeTable = (() => {
  const b = contentConfig.codeTable.base;
  b.columnList = new Array(b.columnNum).fill('').map(() => {
    const i = deepClone(contentConfig.tableColumns.base);
    return { ...i, id: createUniqueString() }
  })
  return b as codeTableType
})()

export const codeTableAttrs = contentConfig.codeTable.attrs as attrsType
export const cellTable = (() => {
  const b = contentConfig.cellTable.base;
  b.cellList = new Array(b.cellRowNum).fill('').map((v, index) => {
    const i = deepClone(contentConfig.cellColumns.base);
    return [{ ...i, id: createUniqueString() }]
  })
  return b as cellTableType
})()
export const cellTableAttrs = contentConfig.cellTable.attrs as attrsType
export const cellColumns = contentConfig.cellColumns.base as cellColumnsType
export const cellColumnsAttrs = contentConfig.cellColumns.attrs as attrsType
export const layoutTable = (() => {
  const b = contentConfig.layoutTable.base;
  b.cellList = new Array(b.cellRowNum).fill('').map((v, index) => {
    return new Array(b.columnNum).fill('').map((j, index) => {
      const i = deepClone(contentConfig.layoutTableCell.base);
      return { ...i, id: createUniqueString() }
    })
  })
  return b as layoutTableType
})()

export const layoutTableAttrs = contentConfig.layoutTable.attrs as attrsType

export const layoutTableCell = contentConfig.layoutTableCell.base as layoutTableCellType
export const layoutTableCellAttrs = contentConfig.layoutTableCell.attrs as attrsType
export const qrcode = contentConfig.qrcode.base as qrcodeType
export const qrcodeAttrs = contentConfig.qrcode.attrs as attrsType
export const image1 = contentConfig.image.base as imageType
export const image1Attrs = contentConfig.image.attrs as attrsType
export const fieldsMap = Object.entries(contentConfig).reduce((obj, item) => {
  if (item[1].variableFields) {
    obj[item[0]] = item[1].variableFields
  }
  return obj
}, {})

// 模版
export interface customType {
  model: string;
  list: contentTypes[];
  style: {
    position: string;
    width: string;
    height: string
  };
}

export interface sourceType {
  model: string;
  list: contentTypes[];
  style: {
    position: string;
    width: string;
    height: string;
  }
}