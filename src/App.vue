<template>
  <PrintModel :source="source"></PrintModel>
  <!-- <ViewModel :source="source" :drawData="drawData"></ViewModel> -->
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ViewModel from './packages/ViewModel/src/ViewModel.vue';
// import { PrintModel } from './packages';
const drawData = ref({
  spuName: 'spuName',
  color: 'color',
  image:
    'https://img.alicdn.com/imgextra/i2/O1CN01FF1t1g1Q3PDWpSm4b_!!6000000001920-55-tps-508-135.svg',
  gateWidth: 'gateWidth',
  gateWidth1: ['gateWidth1', 'gateWidth2'],
  gateWidth2: ['gateWidth3', 'gateWidth4'],
  cylinderNumber: 'cylinderNumber',
  cylinderNumber1: ['cylinderNumber1', 'cylinderNumber2'],
  fineQuantity: [
    {
      spuName: 'spuName1',
      color: 'color1',
      gateWidth: 'gateWidth1',
      cylinderNumber: 'cylinderNumber1'
    },
    {
      spuName: 'spuName2',
      color: 'color1',
      gateWidth: 'gateWidth1',
      cylinderNumber: 'cylinderNumber1'
    },
    {
      spuName: 'spuName3',
      color: 'color1',
      gateWidth: 'gateWidth1',
      cylinderNumber: 'cylinderNumber1'
    }
  ]
});
const source = ref<any>({
  model: 'A5',
  list: [
    {
      style: {
        boxSizing: 'border-box',
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'normal',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        display: 'inline-block',
        verticalAlign: 'top',
        transform: 'rotate(0deg)',
        top: '36.5px',
        left: '62.5px',
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
        borderTop: '1px solid #000',
        borderBottom: '1px solid #000',
        position: 'absolute',
        width: '80px',
        height: '40px',
        lineHeight: '40px'
      },
      id: '688691685428853863',
      text: '静态文本',
      type: 'staticText'
    },
    {
      style: {
        boxSizing: 'border-box',
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'normal',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        display: 'inline-block',
        verticalAlign: 'top',
        transform: 'rotate(0deg)',
        top: '121.5px',
        left: '70.5px',
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
        borderTop: '1px solid #000',
        borderBottom: '1px solid #000',
        position: 'absolute',
        width: '100px',
        height: '40px',
        lineHeight: '40px'
      },
      text: '取值文本',
      field: 'spuName',
      id: '703701685428855678',
      type: 'valueText',
      textData: '取值文本',
      templateContent: '',
      textLength: '',
      padText: null
    },
    {
      style: {
        boxSizing: 'border-box',
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'normal',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        display: 'inline-block',
        verticalAlign: 'top',
        transform: 'rotate(0deg)',
        top: '42.5px',
        left: '225.9px',
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
      id: '1115191685435292436',
      text: '横线',
      type: 'horizontal',
      className: 'qb-print-border_solid'
    },
    {
      style: {
        boxSizing: 'border-box',
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'normal',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        display: 'inline-block',
        verticalAlign: 'top',
        transform: 'rotate(0deg)',
        top: '55.50px',
        left: '342.90px',
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
      id: '852621685435294853',
      text: '竖线',
      type: 'vertical',
      className: 'qb-print-border_solid'
    },
    {
      style: {
        boxSizing: 'border-box',
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'normal',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        display: 'inline-block',
        verticalAlign: 'top',
        transform: 'rotate(0deg)',
        top: '189.5px',
        left: '250.9px',
        position: 'absolute',
        width: '120px',
        height: '60px'
      },
      id: '895151685435297512',
      text: '条形码',
      textData: '12312312312',
      type: 'barcode',
      barcodeValueStyle: {
        display: 'block',
        marginTop: '5px'
      },
      barcodeType: 'img',
      field: 'cylinderNumber'
    },
    {
      style: {
        boxSizing: 'border-box',
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'normal',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        display: 'inline-block',
        verticalAlign: 'top',
        transform: 'rotate(0deg)',
        top: '56.50px',
        left: '223.90px',
        position: 'absolute',
        width: '100px'
      },
      id: '697831685435302271',
      text: '二维码',
      type: 'qrcode',
      qrcodeValueStyle: {
        display: 'block',
        marginTop: '5px'
      },
      qrcodeType: 'svg',
      qrcodeLevel: 'H',
      field: 'color',
      textData: 'example.com'
    },
    {
      style: {
        boxSizing: 'border-box',
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'normal',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        display: 'inline-block',
        verticalAlign: 'top',
        transform: 'rotate(0deg)',
        top: '110.5px',
        left: '60.89999999999998px',
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
        borderTop: '1px solid #000',
        borderBottom: '1px solid #000',
        position: 'absolute',
        width: '120px',
        height: '120px'
      },
      id: '1144151685435310778',
      text: '矩形',
      type: 'rectangle'
    },
    {
      style: {
        boxSizing: 'border-box',
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'normal',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        display: 'inline-block',
        verticalAlign: 'top',
        transform: 'rotate(0deg)',
        top: '204.50px',
        left: '427.90px',
        position: 'absolute',
        'border-width': '0'
      },
      id: '930321685516571126',
      text: '表格',
      type: 'commonTable',
      field: 'fineQuantity',
      columnNum: 4,
      showtableHeader: true,
      tableBorder: true,
      columnList: [
        {
          id: '814821685516554913',
          text: '表格单元格',
          type: 'tableColumns',
          field: 'spuName',
          textData: '品名',
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
        {
          id: '1192581685516554913',
          text: '表格单元格',
          type: 'tableColumns',
          field: 'gateWidth',
          textData: '幅宽',
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
        {
          id: '791051685516554913',
          text: '表格单元格',
          type: 'tableColumns',
          field: 'cylinderNumber',
          textData: '缸号',
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
        {
          id: '777191685516554913',
          text: '表格单元格',
          type: 'tableColumns',
          field: 'color',
          textData: '颜色',
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
        }
      ]
    },
    {
      style: {
        boxSizing: 'border-box',
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'normal',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        display: 'inline-block',
        verticalAlign: 'top',
        transform: 'rotate(0deg)',
        top: '292.50px',
        left: '190.90px',
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
        borderTop: '1px solid #000',
        borderBottom: '1px solid #000',
        position: 'absolute',
        width: '160px',
        height: 'auto'
      },
      id: '914021685516694746',
      text: '格子布局',
      type: 'cellTable',
      cellRowNum: 2,
      border: true,
      cellList: [
        [
          {
            id: '1079121685516554913',
            type: 'cellColumns',
            field: 'color',
            textData: '颜色',
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
          {
            id: '1289021685516699576',
            type: 'cellColumns',
            field: 'gateWidth',
            textData: '幅宽',
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
          }
        ],
        [
          {
            id: '1234251685516554913',
            type: 'cellColumns',
            field: 'spuName',
            textData: '品名',
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
          }
        ]
      ]
    },
    {
      style: {
        boxSizing: 'border-box',
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'normal',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        display: 'inline-block',
        verticalAlign: 'top',
        transform: 'rotate(0deg)',
        top: '300.50px',
        left: '414.90px',
        position: 'absolute'
      },
      id: '1250551685516858806',
      text: '表格布局',
      type: 'layoutTable',
      cellRowNum: 2,
      columnNum: 2,
      cellList: [
        [
          {
            id: '734601685516554913',
            type: 'layoutTableCell',
            field: 'color',
            textData: '颜色',
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
          {
            id: '810051685516554913',
            type: 'layoutTableCell',
            field: 'spuName',
            textData: '品名',
            text: '',
            templateContent: '321',
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
          }
        ],
        [
          {
            id: '1167251685516554913',
            type: 'layoutTableCell',
            field: 'cylinderNumber',
            textData: '缸号',
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
          {
            id: '1006531685516554913',
            type: 'layoutTableCell',
            field: 'gateWidth',
            textData: '幅宽',
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
          }
        ]
      ]
    },
    {
      style: {
        boxSizing: 'border-box',
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'normal',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        display: 'inline-block',
        verticalAlign: 'top',
        transform: 'rotate(0deg)',
        top: '52.50px',
        left: '389.90px',
        position: 'absolute',
        height: '100px',
        width: 'auto'
      },
      id: '1253021685605248593',
      text: '图片',
      type: 'image',
      field: 'image',
      url: 'https://img.alicdn.com/imgextra/i2/O1CN01FF1t1g1Q3PDWpSm4b_!!6000000001920-55-tps-508-135.svg'
    },
    {
      style: {
        boxSizing: 'border-box',
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'normal',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        display: 'inline-block',
        verticalAlign: 'top',
        transform: 'rotate(0deg)',
        top: '350.50px',
        left: '30.90px',
        position: 'absolute'
      },
      id: '919941685605412136',
      text: '码单表格',
      type: 'codeTable',
      tableNum: 2,
      rowNum: 2,
      columnNum: 2,
      showColumnHeader: true,
      showRowHeader: true,
      rowHeaderField: 'gateWidth2',
      columnHeaderField: 'gateWidth1',
      rowHeaderTextData: '品名',
      columnHeaderTextData: '幅宽',
      showtableHeader: true,
      showSummary: true,
      summaryField: 'cylinderNumber1',
      summaryTextData: '缸号',
      summaryStyle: {
        minHeight: '12px',
        lineHeight: '35px'
      },
      fullBin: true,
      columnList: [
        {
          id: '819901685605356499',
          text: '表格单元格',
          type: 'tableColumns',
          field: 'spuName',
          textData: '品名2',
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
        {
          id: '1112711685605356499',
          text: '表格单元格',
          type: 'tableColumns',
          field: 'gateWidth',
          textData: '幅宽1',
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
        }
      ],
      tableStyle: {
        marginLeft: '0px'
      },
      tableBorder: true,
      field: 'fineQuantity'
    }
  ],
  style: {
    position: 'relative',
    width: '210mm',
    height: '147mm'
  }
});
</script>
<style lang="less" scoped></style>
