// export interface attrItem {
//     label: string;
//     obj: object;
//     objKey?: string[];
//     component: string;
//     field: string;
//     [k: string]: any
// }
// export interface attrItem1 {
//     child: attrItem[];
// }

// export type attrsType = (attrItem | attrItem1)[];

// const textAttrs = [
//     {
//         child: [
//             {
//                 label: 'x轴坐标',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'left'
//             },
//             {
//                 label: 'y轴坐标',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'top'
//             }
//         ]
//     },
//     {
//         child: [
//             {
//                 label: '宽度',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'width'
//             },
//             {
//                 label: '高度',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'height'
//             }
//         ]
//     },
//     {
//         child: [
//             {
//                 label: '字体大小',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'fontSize'
//             },
//             {
//                 label: '行间距',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'lineHeight'
//             }
//         ]
//     },
//     {
//         label: '定位方式',
//         component: 'RadioButton',
//         objKey: ['style'],
//         obj: {},
//         config: [
//             {
//                 label: '绝对',
//                 value: 'absolute'
//             },
//             {
//                 label: '相对',
//                 value: 'relative'
//             },
//         ],
//         field: 'position'
//     },
//     {
//         label: '加粗',
//         component: 'RadioButton',
//         config: [
//             {
//                 label: '是',
//                 value: 'bold'
//             },
//             {
//                 label: '否',
//                 value: 'normal'
//             },
//         ],
//         objKey: ['style'],
//         obj: {},
//         field: 'fontWeight'
//     },
//     {
//         child: [
//             {
//                 label: '左边框',
//                 component: 'RadioButton',
//                 config: [
//                     {
//                         label: '有',
//                         value: '1px solid #000'
//                     },
//                     {
//                         label: '无',
//                         value: 'transparent'
//                     },
//                 ],
//                 objKey: ['style'],
//                 obj: {},
//                 field: 'borderLeft'
//             },
//             {
//                 label: '右边框',
//                 component: 'RadioButton',
//                 config: [
//                     {
//                         label: '有',
//                         value: '1px solid #000'
//                     },
//                     {
//                         label: '无',
//                         value: 'transparent'
//                     },
//                 ],
//                 objKey: ['style'],
//                 obj: {},
//                 field: 'borderRight'
//             },
//         ]
//     },
//     {
//         child: [
//             {
//                 label: '上边框',
//                 component: 'RadioButton',
//                 config: [
//                     {
//                         label: '有',
//                         value: '1px solid #000'
//                     },
//                     {
//                         label: '无',
//                         value: 'transparent'
//                     },
//                 ],
//                 objKey: ['style'],
//                 obj: {},
//                 field: 'borderTop'
//             },
//             {
//                 label: '下边框',
//                 component: 'RadioButton',
//                 config: [
//                     {
//                         label: '有',
//                         value: '1px solid #000'
//                     },
//                     {
//                         label: '无',
//                         value: 'transparent'
//                     },
//                 ],
//                 objKey: ['style'],
//                 obj: {},
//                 field: 'borderBottom'
//             },
//         ]
//     },
//     {
//         label: '内容排序',
//         component: 'RadioButton',
//         config: [
//             {
//                 label: '<i class="iconfont qb-print-radio_icon iconzuoduiqi"></i>',
//                 value: 'left'
//             },
//             {
//                 label: '<i class="iconfont qb-print-radio_icon iconjuzhongduiqi"></i>',
//                 value: 'center'
//             },
//             {
//                 label: '<i class="iconfont qb-print-radio_icon iconzuoduiqibeifen"></i>',
//                 value: 'right'
//             },
//         ],
//         objKey: ['style'],
//         obj: {},
//         field: 'textAlign'
//     },
//     {
//         child: [
//             {
//                 label: '左边距',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'marginLeft'
//             },
//             {
//                 label: '右边距',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'marginRight'
//             }
//         ]
//     },
//     {
//         child: [
//             {
//                 label: '上边距',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'marginTop'
//             },
//             {
//                 label: '下边距',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'marginBottom'
//             }
//         ]
//     },
//     {
//         child: [
//             {
//                 label: '左间距',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'paddingLeft'
//             },
//             {
//                 label: '右间距',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'paddingRight'
//             }
//         ]
//     },
//     {
//         child: [
//             {
//                 label: '上间距',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'paddingTop'
//             },
//             {
//                 label: '下间距',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'paddingBottom'
//             }
//         ]
//     },
// ]

// export const staticTextAttrs: attrsType = [
//     {
//         label: '文本内容',
//         component: 'input',
//         obj: {},
//         field: 'text'
//     },
//     ...textAttrs
// ];

// export const valueTextAttrs: attrsType = [
//     {
//         label: '字段',
//         component: 'select',
//         obj: {},
//         field: 'field'
//     },
//     {
//         label: '模版内容',
//         component: 'input',
//         obj: {},
//         field: 'textData'
//     },
//     ...textAttrs,
//     {
//         child: [
//             {
//                 label: '显示位数',
//                 component: 'input',
//                 obj: {},
//                 field: 'padText'
//             },
//             {
//                 label: '填充字段',
//                 component: 'input',
//                 obj: {},
//                 field: 'textLength'
//             },
//         ]
//     }
// ];

// export const horizontalAttrs: attrsType = [
//     {
//         child: [
//             {
//                 label: 'x轴坐标',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'left'
//             },
//             {
//                 label: 'y轴坐标',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'top'
//             }
//         ]
//     },
//     {
//         label: '边框宽度',
//         objKey: ['style'],
//         obj: {},
//         component: 'InputNumberPX',
//         field: 'borderWidth'
//     },
//     {
//         label: '宽度',
//         objKey: ['style'],
//         obj: {},
//         component: 'InputNumberPX',
//         field: 'width'
//     },
//     {
//         label: '定位方式',
//         component: 'RadioButton',
//         objKey: ['style'],
//         obj: {},
//         config: [
//             {
//                 label: '绝对',
//                 value: 'absolute'
//             },
//             {
//                 label: '相对',
//                 value: 'relative'
//             },
//         ],
//         field: 'position'
//     },
//     {
//         label: '边框样式',
//         component: 'select1',
//         objKey: ['style'],
//         obj: {},
//         config: [
//             {
//                 label: '实线',
//                 value: 'solid'
//             },
//             {
//                 label: '虚线',
//                 value: 'dashed'
//             },
//             {
//                 label: '点线',
//                 value: 'dotted'
//             },
//         ],
//         field: 'borderStyle'
//     },
// ];

// export const verticallAttrs: attrsType = [
//     {
//         child: [
//             {
//                 label: 'x轴坐标',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'left'
//             },
//             {
//                 label: 'y轴坐标',
//                 objKey: ['style'],
//                 obj: {},
//                 component: 'InputNumberPX',
//                 field: 'top'
//             }
//         ]
//     },
//     {
//         label: '边框宽度',
//         objKey: ['style'],
//         obj: {},
//         component: 'InputNumberPX',
//         field: 'borderWidth'
//     },
//     {
//         label: '高度',
//         objKey: ['style'],
//         obj: {},
//         component: 'InputNumberPX',
//         field: 'height'
//     },
//     {
//         label: '定位方式',
//         component: 'RadioButton',
//         objKey: ['style'],
//         obj: {},
//         config: [
//             {
//                 label: '绝对',
//                 value: 'absolute'
//             },
//             {
//                 label: '相对',
//                 value: 'relative'
//             },
//         ],
//         field: 'position'
//     },
//     {
//         label: '边框样式',
//         component: 'select1',
//         objKey: ['style'],
//         obj: {},
//         config: [
//             {
//                 label: '实线',
//                 value: 'solid'
//             },
//             {
//                 label: '虚线',
//                 value: 'dashed'
//             },
//             {
//                 label: '点线',
//                 value: 'dotted'
//             },
//         ],
//         field: 'borderStyle'
//     },
// ];

// export const fieldsMap = {
//     'staticText': {
//         fields: ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
//         defaultValue: {
//             marginLeft: '0px',
//             marginRight: '0px',
//             marginTop: '0px',
//             marginBottom: '0px',
//         }
//     },
//     'valueText': {
//         fields: ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
//         defaultValue: {
//             marginLeft: '0px',
//             marginRight: '0px',
//             marginTop: '0px',
//             marginBottom: '0px',
//         }
//     }
// }