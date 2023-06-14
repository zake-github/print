import jsbarcode from 'jsbarcode';
import { eventBus } from '@/packages/bus';
import type { CSSProperties } from 'vue';

import type {
  sourceType,
  contentTypes,
  staticTextType,
  valueTextType,
  lineType,
  barcodeType,
  rectangleType,
  commonTableType,
  codeTableType,
  tableColumnsType,
  cellTableType,
  layoutTableType,
  layoutTableCellType,
  qrcodeType,
  imageType
} from '@/packages/config';
interface linePointtype {
  top: string;
  left: string;
  border: string;
  width: string;
  height: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}
interface staticTextType1 {
  style: CSSProperties;
  text: string;
}
interface rectangleTypez1 {
  style: CSSProperties;
  text: string;
}
interface responseType {
  status: boolean;
  code?: 9001 | 9999;
  data?: string;
}
interface imageDataCtxType {
  imageData: any;
  width: number;
  height: number;
}
interface columnHeaderType {
  top: string;
  left: string;
  rowNum: number;
  style: CSSProperties;
  heights: string[];
  field: string;
  tableField: string;
  text: string;
  showSummary: boolean;
  summaryStyle: CSSProperties;
  columnHeaderStyle: CSSProperties;
}

interface sizeDataType {
  size: [number, number];
  mag: string | null;
}
type imgDataType = string[];
type lineAllType = string[];

let instruction: string | boolean = '';
let imgData: imgDataType = [];
let imgCount: number = 0;
let isBus: boolean = false;
let lineAll: lineAllType = []; // 所有line指令
// 字体粗细
const fontWeightMap = {
  normal: 0,
  100: 0,
  200: 0,
  300: 1,
  400: 1,
  500: 2,
  600: 2,
  700: 2,
  bold: 2
};

// 打印dpi 页面宽度 高度 打印份数
const CPCLDPI = [200, 200, 800, 400, 1];
const newLine = `\r\n`;
function perform(): responseType | undefined {
  if (imgCount > imgData.length) {
    setTimeout(() => {
      perform();
    }, 500);
    isBus = true;
    return {
      status: false,
      code: 9001
    };
  }
  const s: string = `! 0 ${CPCLDPI[0]} ${CPCLDPI[1]} ${CPCLDPI[2]} ${CPCLDPI[4]}${newLine}PAGE-WIDTH ${CPCLDPI[3]}${newLine}`;
  if (imgData.length) {
    imgData.forEach(v => {
      instruction += v;
    });
  }
  if (lineAll.length) {
    const arr: string[] = Array.from(new Set(lineAll));
    arr.forEach(v => {
      instruction += `${v}${newLine}`;
    });
  }
  const res: string = s + instruction + `FORM${newLine}PRINT${newLine}`;
  const response = {
    status: true,
    data: res
  };
  if (isBus) {
    eventBus.emit('cpclModel', true, response);
  } else {
    return response;
  }
}

// 模版处理
export function saveTemplate(model): responseType | undefined {
  imgData = [];
  lineAll = [];
  instruction = templateParsing(model);
  if (instruction === false)
    return {
      status: false,
      code: 9999
    };
  return perform();
}

// 模版解析
function templateParsing(model: sourceType) {
  let isPass = true;
  let r: string | false = '';
  const { width, height } = model.style;
  CPCLDPI[2] = Number(height.replace('mm', '')) * 8;
  CPCLDPI[3] = Number(width.replace('mm', '')) * 8;
  const models: contentTypes[] = model.list;
  const res: string = models.reduce((str, i) => {
    if (!isPass) {
      return str;
    }
    switch (i.type) {
      // 横线 竖线
      case 'horizontal':
      case 'vertical':
        str += onlyLine(i as lineType);
        break;
      // 文字文本
      case 'staticText':
        str += staticText(i);
        break;
      // 取值文本
      case 'valueText':
        r = valueText(i as valueTextType);
        if (r) {
          str += r;
        } else {
          isPass = false;
        }
        break;
      // 一维码
      case 'barcode':
        r = barcode(i as barcodeType);
        if (r) {
          str += r;
        } else {
          isPass = false;
        }
        break;
      // 二维码
      case 'qrcode':
        r = qrcode(i as qrcodeType);
        if (r) {
          str += r;
        } else {
          isPass = false;
        }
        break;
      // 圆形
      case 'image':
        // case 'round':
        str += images(i as imageType);
        break;
      // 方形
      case 'rectangle':
        str += rectangle(i);
        break;
      // 表格
      case 'commonTable':
        r = commonTable(i as commonTableType);
        if (r) {
          str += r;
        } else {
          isPass = false;
        }
        break;
      // 格子表格
      case 'cellTable':
        r = cellTable(i as cellTableType);
        if (r) {
          str += r;
        } else {
          isPass = false;
        }
        break;
      // 表格布局
      case 'layoutTable':
        r = layoutTable(i as layoutTableType);
        if (r) {
          str += r;
        } else {
          isPass = false;
        }
        break;
      // 码单表格
      case 'codeTable':
        r = codeTable(i as codeTableType);
        if (r) {
          str += r;
        } else {
          isPass = false;
        }
        break;
    }
    return str;
  }, '');
  if (isPass) {
    return res;
  } else {
    return false;
  }
}

//获取DPI
function js_getDPI() {
  const arrDPI: Array<number> = [];
  // @ts-ignore
  if (window.screen.deviceXDPI !== undefined) {
    // @ts-ignore
    arrDPI[0] = window.deviceXDPI;
    // @ts-ignore
    arrDPI[1] = window.deviceYDPI;
  } else {
    const tmpNode = document.createElement('DIV');
    tmpNode.style.cssText =
      'position: fixed;width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden';
    document.body.append(tmpNode);
    arrDPI[0] = Math.round(tmpNode.offsetWidth);
    arrDPI[1] = Math.round(tmpNode.offsetHeight);
    tmpNode.parentNode?.removeChild(tmpNode);
  }
  return arrDPI;
}

// 转换像素点
function CPCLPX(size, dpi, direction) {
  const a = js_getDPI();
  return (size / a[direction]) * dpi;
}

function subSize(s1: string, s2: string): string {
  return Number(s1.replace('px', '')) + Number(s2.replace('px', '')) + 'px';
}

function getPath(field) {
  return `${field}`;
}

// 获取指定文字占位尺寸
function getTextSize(text, fontSize): [number, number] {
  const fz = fontSize || '12px';
  const size: [number, number] = [0, 0];
  const tmpNode = document.createElement('span');
  tmpNode.style.cssText = `font-size: ${fz};position: fixed;display: inline-block;width:auto;height:auto;line-height: 1;visibility:hidden;`;
  tmpNode.innerText = text;
  document.body.append(tmpNode);
  size[0] = Math.round(tmpNode.offsetWidth);
  size[1] = Math.round(tmpNode.offsetHeight);
  tmpNode.parentNode?.removeChild(tmpNode);
  return size;
}

// 获取边框指令
function getLinePoint({
  top,
  left,
  border,
  width,
  height,
  direction
}: linePointtype) {
  const bw = Number(border.match(/\d+px/)?.[0].replace('px', ''));
  const lineW = CPCLPX(bw, CPCLDPI[0], 0).toFixed(0);
  const lP = CPCLPX(Number(left.replace('px', '')), CPCLDPI[0], 0).toFixed(0);
  const tP = CPCLPX(Number(top.replace('px', '')), CPCLDPI[1], 0).toFixed(0);
  const wP = CPCLPX(Number(width.replace('px', '')), CPCLDPI[0], 0).toFixed(0);
  const hP = CPCLPX(Number(height.replace('px', '')), CPCLDPI[1], 0).toFixed(0);
  const rtx = (Number(lP) + Number(wP)).toFixed(0);
  const lby = (Number(tP) + Number(hP)).toFixed(0);

  if (direction) {
    if (direction === 'left') {
      lineAll = lineAll.concat([`LINE ${lP} ${tP} ${lP} ${lby} ${lineW}`]);
    }

    if (direction === 'right') {
      lineAll = lineAll.concat([`LINE ${rtx} ${tP} ${rtx} ${lby} ${lineW}`]);
    }

    if (direction === 'top') {
      lineAll = lineAll.concat([`LINE ${lP} ${tP} ${rtx} ${tP} ${lineW}`]);
    }

    if (direction === 'bottom') {
      lineAll = lineAll.concat([`LINE ${lP} ${lby} ${rtx} ${lby} ${lineW}`]);
    }
  } else {
    lineAll = lineAll.concat([
      `LINE ${lP} ${tP} ${rtx} ${tP} ${lineW}`,
      `LINE ${lP} ${tP} ${lP} ${lby} ${lineW}`,
      `LINE ${rtx} ${tP} ${rtx} ${lby} ${lineW}`,
      `LINE ${lP} ${lby} ${rtx} ${lby} ${lineW}`
    ]);
  }
}

function getFontSize(fontSize: string): sizeDataType {
  const s = Number(fontSize.replace('px', ''));
  let res: sizeDataType = {
    size: [55, 0],
    mag: null
  };
  if (s >= 12) {
    res = {
      size: [2, 0],
      mag: null
    };
  }
  if (s >= 16) {
    res = {
      size: [55, 0],
      mag: '2 2'
    };
  }
  if (s >= 20) {
    res = {
      size: [2, 0],
      mag: '2 2'
    };
  }
  if (s >= 28) {
    res = {
      size: [55, 0],
      mag: '4 4'
    };
  }
  if (s >= 36) {
    res = {
      size: [55, 0],
      mag: '5 5'
    };
  }
  if (s >= 44) {
    res = {
      size: [55, 0],
      mag: '6 6'
    };
  }
  if (s >= 52) {
    res = {
      size: [55, 0],
      mag: '7 7'
    };
  }
  return res;
}

// 静态文本
function staticText(temp: staticTextType | staticTextType1, field?: string) {
  const pointS: Array<string> = [];
  const {
    top,
    left,
    paddingLeft,
    paddingRight,
    paddingTop,
    width,
    textAlign,
    lineHeight,
    fontWeight,
    fontSize
  } = temp.style;

  const textSize = getTextSize(temp.text, fontSize);
  const FZ = getFontSize(fontSize as string);
  const textContentW =
    Number((width as string).replace('px', '')) -
    Number((paddingLeft as string).replace('px', '')) -
    Number((paddingRight as string).replace('px', ''));

  let leftS =
    Number((left as string).replace('px', '')) +
    Number((paddingLeft as string).replace('px', ''));
  let topS =
    Number((top as string).replace('px', '')) +
    Number((paddingTop as string).replace('px', ''));

  if (textContentW >= textSize[0]) {
    if (textAlign === 'center') {
      leftS += (textContentW - textSize[0]) / 2;
    }
    if (textAlign === 'right') {
      leftS += textContentW - textSize[0];
    }
  }
  let LH = 0;
  if (lineHeight) {
    LH = Number((lineHeight as string).replace('px', ''));
    if (LH && LH > textSize[1]) {
      topS += (LH - textSize[1]) / 2;
    }
  }

  pointS[0] = CPCLPX(leftS, CPCLDPI[0], 0).toFixed(0);
  pointS[1] = CPCLPX(topS, CPCLDPI[1], 1).toFixed(0);

  rectangle(temp);
  let printText = temp.text;
  if (field) {
    printText = `{{${getPath(field)}}}`;
  }
  let sTop = '';
  const bold: number = fontWeightMap[fontWeight as string | number] || 0;
  if (bold > 0) {
    sTop += `SETBOLD ${bold}${newLine}`;
  }
  if (FZ.mag) {
    sTop += `SETMAG ${FZ.mag}${newLine}`;
  }
  sTop += `TEXT ${FZ.size[0]} ${FZ.size[1]} ${pointS[0]} ${pointS[1]} ${printText}${newLine}`;
  if (FZ.mag) {
    sTop += `SETMAG 0 0${newLine}`;
  }
  if (bold > 0) {
    sTop += `SETBOLD 0${newLine}`;
  }
  return sTop;
}

// 取值文本
function valueText(temp: valueTextType) {
  temp.text = temp.templateContent || temp.textData;
  const field = temp.field;
  const res = staticText(temp, field);
  return field ? res : false;
}

// 横线 竖线
function onlyLine(temp: lineType) {
  const { top, left, width, height, borderWidth } = temp.style;
  const bw = Number((borderWidth as string).replace('px', ''));
  const lineW = CPCLPX(bw, CPCLDPI[0], 0).toFixed(0);
  const lP = Number(
    CPCLPX(Number((left as string).replace('px', '')), CPCLDPI[0], 0).toFixed(0)
  );
  const tP = Number(
    CPCLPX(Number((top as string).replace('px', '')), CPCLDPI[1], 0).toFixed(0)
  );
  const wP = Number(
    CPCLPX(Number((width as string).replace('px', '')), CPCLDPI[0], 0).toFixed(
      0
    )
  );
  const hP = Number(
    CPCLPX(Number((height as string).replace('px', '')), CPCLDPI[1], 0).toFixed(
      0
    )
  );
  const rtx = (lP + wP).toFixed(0);
  const lby = (tP + hP).toFixed(0);
  const line =
    temp.type === 'horizontal'
      ? `LINE ${lP} ${tP} ${rtx} ${tP} ${lineW}`
      : `LINE ${lP} ${tP} ${lP} ${lby} ${lineW}`;
  lineAll = lineAll.concat([line]);
  return '';
}

// 条码
function barcode(temp: barcodeType) {
  let str = '';
  const { textData, barcodeValueStyle, field } = temp;
  if (!field) {
    return false;
  }
  const { top, left, width, height, fontSize, transform } = temp.style;
  const reg = Number(transform?.replace('rotate(', '').replace('deg)', ''));
  const { display, marginTop } = barcodeValueStyle;
  const lP = Number(
    CPCLPX(Number((left as string).replace('px', '')), CPCLDPI[0], 0).toFixed(0)
  );
  const tP = Number(
    CPCLPX(Number((top as string).replace('px', '')), CPCLDPI[1], 0).toFixed(0)
  );
  const wP = Number(
    CPCLPX(Number((width as string).replace('px', '')), CPCLDPI[0], 0).toFixed(
      0
    )
  );
  const hP = Number(
    CPCLPX(Number((height as string).replace('px', '')), CPCLDPI[1], 0).toFixed(
      0
    )
  );
  let res = ``;
  if (reg !== 270) {
    if (display !== 'none') {
      const top1 = subSize(subSize(top as string, height as string), marginTop);
      const item: staticTextType1 = {
        style: {
          ...temp.style,
          height: fontSize,
          lineHeight: fontSize,
          top: top1,
          border: 'none'
        },
        text: textData
      };
      str = staticText(item, field);
    }
    const jsbar = document.getElementById(
      'printmodeljsbar'
    ) as HTMLCanvasElement;
    let barWidthdef;
    if (jsbar) {
      const barText = textData || '12312312312';
      jsbarcode('#printmodeljsbar', encodeURI(barText), {
        width: 1,
        displayValue: false
      });
      barWidthdef = jsbar.width - 16;
    }
    const wPix = Number((width as string).replace('px', ''));
    let w = 1;
    if (barWidthdef && wPix > barWidthdef) {
      let wpro = wPix / barWidthdef;
      w = Math.round(wpro / 0.5 - 1);
    }
    if (w > 10) {
      w = 10;
    }
    res = `BARCODE-TEXT OFF${newLine}BARCODE 128 ${w} 1 ${hP} ${lP} ${tP} {{${getPath(
      field
    )}}}${newLine}${str}`;
  } else {
    const centerX = lP + wP / 2;
    const centerY = tP + hP / 2;
    const lP270 = Math.round(centerX - hP / 2);
    const tP270 = Math.round(centerY + wP / 2);
    if (display !== 'none') {
      let topS = tP270;
      let leftS =
        lP270 +
        hP +
        Number(
          CPCLPX(
            Number((marginTop as string).replace('px', '')),
            CPCLDPI[0],
            0
          ).toFixed(0)
        );
      const textContentW = Number((width as string).replace('px', ''));
      const textSize = getTextSize(textData, fontSize);
      const FZ = getFontSize(fontSize as string);
      if (textContentW >= textSize[0]) {
        topS -= Number(
          CPCLPX((textContentW - textSize[0]) / 2, CPCLDPI[0], 0).toFixed(0)
        );
      }
      if (FZ.mag) {
        str += `SETMAG ${FZ.mag}${newLine}`;
      }
      str += `TEXT90 ${FZ.size[0]} ${FZ.size[1]} ${leftS} ${topS} {{${getPath(
        field
      )}}}${newLine}`;
      if (FZ.mag) {
        str += `SETMAG 0 0${newLine}`;
      }
    }
    res = `BARCODE-TEXT OFF${newLine}VBARCODE 128 1 1 ${hP} ${lP270} ${tP270} {{${getPath(
      field
    )}}}${newLine}${str}`;
  }
  return res;
}

// 二维码
function getQRSize(width: string) {
  const USize = 7;
  const w = Number(width.replace('px', ''));
  let res = USize + Math.floor((w - 100) / 13);
  if (res > 32) {
    res = 32;
  }
  if (res < 1) {
    res = 1;
  }
  return res;
}

function qrcode(temp: qrcodeType) {
  const { textData, qrcodeLevel, field, id } = temp;
  if (!field) {
    return false;
  }
  const { top, left, width, paddingLeft, paddingTop, fontSize, transform } =
    temp.style;
  const { display, marginTop } = temp.qrcodeValueStyle;
  const reg = Number(transform?.replace('rotate(', '').replace('deg)', ''));
  const lP = CPCLPX(
    Number((left as string).replace('px', '')),
    CPCLDPI[0],
    0
  ).toFixed(0);
  const tP = CPCLPX(
    Number((top as string).replace('px', '')),
    CPCLDPI[1],
    0
  ).toFixed(0);
  const pl = CPCLPX(
    Number((paddingLeft as string).replace('px', '')),
    CPCLDPI[1],
    0
  ).toFixed(0);
  const pt = CPCLPX(
    Number((paddingTop as string).replace('px', '')),
    CPCLDPI[1],
    0
  ).toFixed(0);
  const x = (Number(lP) + Number(pl)).toFixed(0);
  const y = (Number(tP) + Number(pt)).toFixed(0);
  let res = '';
  let str = '';

  if (reg !== 270) {
    if (display !== 'none') {
      const top1 = subSize(subSize(top as string, width as string), marginTop);
      const item = {
        style: {
          ...temp.style,
          height: fontSize,
          lineHeight: fontSize,
          top: top1,
          border: 'none'
        },
        text: textData
      };
      str = staticText(item, field);
    }
    res = `BARCODE QR ${x} ${y} M 2 U ${getQRSize(
      width as string
    )}${newLine}${qrcodeLevel}A,{{${getPath(
      field
    )}}}${newLine}ENDQR${newLine}${str}`;
  } else {
    const height = document.getElementById(id)?.offsetHeight;
    const wP = Number(
      CPCLPX(
        Number((width as string).replace('px', '')),
        CPCLDPI[0],
        0
      ).toFixed(0)
    );
    const hP = Number(CPCLPX(Number(height || 100), CPCLDPI[1], 0).toFixed(0));
    const centerX = Number(lP) + wP;
    const centerY = Number(tP) + hP;
    const lP270 = Math.round(centerX - hP / 2);
    const tP270 = Math.round(centerY + wP / 2);
    if (display !== 'none') {
      let topS = tP270;
      let leftS =
        lP270 +
        wP +
        Number(
          CPCLPX(Number(marginTop.replace('px', '')), CPCLDPI[0], 0).toFixed(0)
        );
      const textContentW = Number((width as string).replace('px', ''));
      const textSize = getTextSize(textData, fontSize);
      const FZ = getFontSize(fontSize as string);
      if (textContentW >= textSize[0]) {
        topS -= Number(
          CPCLPX((textContentW - textSize[0]) / 2, CPCLDPI[0], 0).toFixed(0)
        );
      }
      if (FZ.mag) {
        str += `SETMAG ${FZ.mag}${newLine}`;
      }
      str += `TEXT90 ${FZ.size[0]} ${FZ.size[1]} ${leftS} ${topS} {{${getPath(
        field
      )}}}${newLine}`;
      if (FZ.mag) {
        str += `SETMAG 0 0${newLine}`;
      }
    }
    res = `VBARCODE QR ${lP270} ${tP270} M 2 U ${getQRSize(
      width as string
    )}${newLine}${qrcodeLevel}A,{{${getPath(
      field
    )}}}${newLine}ENDQR${newLine}${str}`;
  }

  return res;
}

// 边框
function rectangle(temp: rectangleType | rectangleTypez1) {
  const top: string = temp.style.top as string;
  const left: string = temp.style.left as string;
  const width: string = temp.style.width as string;
  const height: string = temp.style.height as string;
  const border: string = temp.style.border as string;
  const borderLeft: string = temp.style.borderLeft as string;
  const borderRight: string = temp.style.borderRight as string;
  const borderTop: string = temp.style.borderTop as string;
  const borderBottom: string = temp.style.borderBottom as string;
  if (border && border !== 'none') {
    getLinePoint({ top, left, border, width, height });
  }
  if (borderLeft && borderLeft !== 'none') {
    getLinePoint({
      top,
      left,
      border: borderLeft,
      width,
      height,
      direction: 'left'
    });
  }
  if (borderRight && borderRight !== 'none') {
    getLinePoint({
      top,
      left,
      border: borderRight,
      width,
      height,
      direction: 'right'
    });
  }
  if (borderTop && borderTop !== 'none') {
    getLinePoint({
      top,
      left,
      border: borderTop,
      width,
      height,
      direction: 'top'
    });
  }
  if (borderBottom && borderBottom !== 'none') {
    getLinePoint({
      top,
      left,
      border: borderBottom,
      width,
      height,
      direction: 'bottom'
    });
  }
  return '';
}

// 圆圈 图形
function images(temp: imageType) {
  let { top, left, width, height } = temp.style;
  if (width === 'auto' || (height && !width)) {
    width = height;
  }
  const { url } = temp;
  const lP = CPCLPX(
    Number((left as string).replace('px', '')),
    CPCLDPI[0],
    0
  ).toFixed(0);
  const tP = CPCLPX(
    Number((top as string).replace('px', '')),
    CPCLDPI[1],
    0
  ).toFixed(0);
  const w = Number((width as string).replace('px', ''));
  const h = Number((height as string).replace('px', ''));
  img2pix(url, w, h, lP, tP);
  imgCount++;
  return '';
}
export const img2pix = (
  src: string,
  width: number,
  height: number,
  left: string,
  top: string
) => {
  const img = new Image();
  if (width) {
    img.width = 100;
  }
  if (height) {
    img.height = 100;
  }
  img.crossOrigin = '';
  img.src = src;
  img.onload = () => {
    const imgItem = initCanvas(img);
    const str = `EG ${imgItem.width} ${imgItem.height} ${left} ${top} ${imgItem.str16}${newLine}`;
    imgData.push(str);
  };
  img.onerror = e => {
    console.error(e);
  };
};

const initCanvas = (img: HTMLImageElement) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });
  let width = img.width;
  const yu = width % 8;
  if (yu !== 0) {
    width += 8 - yu;
  }
  let height = img.height;
  canvas.width = width;
  canvas.height = height;
  context!.drawImage(img, 0, 0, width, height);
  context!.drawImage(img, 0, 0, width, height);
  const imgRawData = context!.getImageData(0, 0, width, height);

  return overwriteImageData({
    imageData: imgRawData.data,
    width: imgRawData.width,
    height: imgRawData.height
  });
};

const overwriteImageData = (data: imageDataCtxType) => {
  function grayPixle(pix: number[]) {
    return pix[0] * 0.299 + pix[1] * 0.587 + pix[2] * 0.114;
  }

  let sendWidth = data.width,
    sendHeight = data.height;
  // const threshold = data.threshold || 130;
  const threshold = 130;
  let sendImageData = new ArrayBuffer((sendWidth * sendHeight) / 8);
  sendImageData = new Uint8Array(sendImageData);
  let pix: Array<number> = data.imageData;
  const part: Array<number> = [];
  const part1: Array<number> = [];
  const part2: Array<Array<number>> = [];
  let str16 = '';
  let index = 0;
  for (let i = 0; i < pix.length; i += 32) {
    for (let k = 0; k < 8; k++) {
      const grayPixle1 = grayPixle(pix.slice(i + k * 4, i + k * 4 + (4 - 1)));
      part1.push(grayPixle1);
      part2.push(pix.slice(i + k * 4, i + k * 4 + (4 - 1)));
      if (grayPixle1 > threshold) {
        part[k] = 0;
      } else {
        part[k] = 1;
      }
    }
    let temp = 0;
    for (let a = 0; a < part.length; a++) {
      temp += part[a] * Math.pow(2, part.length - 1 - a);
    }
    str16 += temp.toString(16).padStart(2, '0');
    sendImageData[index++] = temp;
  }
  return {
    array: sendImageData,
    str16,
    width: sendWidth / 8,
    height: sendHeight
  };
};

// 表格
function commonTable(temp: commonTableType) {
  let isField = true;
  let { top, left } = temp.style;
  const { columnList, tableBorder, id } = temp;
  const field = temp.field;
  if (!field) {
    isField = false;
  }
  let tableWidth = 0;
  const tableDom = document.getElementById(id);
  if (tableDom) {
    tableWidth = tableDom.offsetWidth;
  }
  const widthSub = Number(
    columnList
      .reduce((sub, v) => {
        const { width } = v.style;
        sub = subSize(sub, width as string);
        return sub;
      }, '0px')
      .replace('px', '')
  );
  if (!tableWidth) {
    tableWidth = widthSub;
  }
  columnList.forEach(v => {
    const { width } = v.style;
    const w = Number((width as string).replace('px', ''));
    const ws = (w / widthSub) * tableWidth;
    v.style.width = `${ws}px`;
  });
  const tdHeight = columnList.reduce((h, i) => {
    const { height } = i.style;
    const ih = Number((height as string).replace('px', ''));
    h = ih > h ? ih : h;
    return h;
  }, 0);
  const border = tableBorder ? '1px solid #000' : 'none';

  const res = columnList.reduce((str, i) => {
    const item: staticTextType1 = {
      style: {},
      text: ''
    };
    const item1: staticTextType1 = {
      style: {},
      text: ''
    };
    const style = {
      ...i.style,
      height: `${tdHeight}px`,
      left,
      top,
      border,
      lineHeight: `${tdHeight}px`
    };
    item.text = i.textData;
    item.style = style;
    item1.text = i.textData;
    item1.style = { ...style, top: subSize(top as string, `${tdHeight}px`) };
    const width = style.width;
    str += staticText(item);
    if (!i.field) {
      isField = false;
    }
    str += staticText(item1, `${field}.${i.field}`);
    left = subSize(left as string, width as string);
    return str;
  }, '');
  return isField ? res : isField;
}

// 单元格
function cellTable(temp: cellTableType) {
  const cellList = temp.cellList;
  const { borderBottom, borderLeft, borderRight, borderTop } = temp.style;
  let { left, top, width } = temp.style;
  let isField = true;
  const res = cellList.reduce((str, v) => {
    let left1 = left as string;
    let pt = 0,
      pb = 0;
    const lh = v.reduce((h, ii) => {
      const { lineHeight, paddingTop, paddingBottom } = ii.style;
      const pti = Number((paddingTop as string).replace('px', ''));
      pt = pti > pt ? pti : pt;
      const pbi = Number((paddingBottom as string).replace('px', ''));
      pb = pbi > pb ? pbi : pb;
      const ih = Number((lineHeight as string).replace('px', ''));
      h = ih > h ? ih : h;
      return h;
    }, 0);
    const boxH = `${lh + pt + pb}px`;

    str += v.reduce((s, ii) => {
      if (!ii.field) {
        isField = false;
        return s;
      }
      const item: staticTextType1 = {
        style: {},
        text: ''
      };
      item.style = {
        ...ii.style,
        borderBottom,
        height: boxH,
        lineHeight: `${lh}px`,
        borderLeft,
        borderRight,
        borderTop,
        top,
        left: left1,
        border: 'none'
      };
      if (v.length === 1) {
        item.style.width = width;
      }
      item.text = ii.templateContent || ii.text || ii.textData;
      s += staticText(item, ii.field);
      left1 = subSize(left1, ii.style.width as string);
      return s;
    }, '');
    top = subSize(top as string, boxH);
    return str;
  }, '');
  return isField ? res : isField;
}

// 表格布局
function layoutTable(temp: layoutTableType) {
  let { top, left, width } = temp.style;
  const id = temp.id;
  let wTable: number;
  const tableDom = document.getElementById(id);
  if (width) {
    wTable = Number((width as string).replace('px', ''));
  } else if (tableDom) {
    wTable = tableDom.offsetWidth;
  }
  const cellList: Array<Array<layoutTableCellType>> = temp.cellList;
  cellList.forEach(row => {
    const widthSub = Number(
      row
        .reduce((sub, v) => {
          const { width } = v.style;
          sub = subSize(sub, width);
          return sub;
        }, '0px')
        .replace('px', '')
    );
    if (!wTable) {
      wTable = widthSub;
    }
    row.forEach(v => {
      const { width } = v.style;
      const w = Number(width.replace('px', ''));
      const ws = (w / widthSub) * wTable;
      v.style.width = `${ws}px`;
    });
  });
  let isField = true;
  const res = cellList.reduce((str, row) => {
    let left1 = left as string;
    const tdHeight = row.reduce((h, i) => {
      const { height } = i.style;
      const ih = Number(height.replace('px', ''));
      h = ih > h ? ih : h;
      return h;
    }, 0);
    str += row.reduce((strRow, i) => {
      if (!i.field) {
        isField = false;
        return strRow;
      }
      const item: staticTextType1 = {
        style: {},
        text: ''
      };
      const style = {
        ...i.style,
        height: `${tdHeight}px`,
        left: left1,
        top,
        border: '1px solid #000'
      };
      item.text = i.templateContent || i.text || i.textData;
      item.style = style;
      const width = style.width;
      strRow += staticText(item, i.field);
      left1 = subSize(left as string, width);
      return strRow;
    }, '');
    top = subSize(top as string, `${tdHeight}px`);
    return str;
  }, '');
  return isField ? res : isField;
}

// 码单表格
function columnHeader({
  top,
  left,
  rowNum,
  style,
  heights,
  field,
  tableField,
  text,
  showSummary,
  summaryStyle,
  columnHeaderStyle
}: columnHeaderType) {
  let str = '';
  const h = heights.reduce((h, v) => {
    const hi = Number(v.replace('px', ''));
    if (hi > h) {
      h = hi;
    }
    return h;
  }, 0);
  const item: rectangleTypez1 = {
    style: {
      ...style,
      left,
      top,
      height: `${h}px`,
      lineHeight: `${h}px`
    },
    text: ''
  };
  rectangle(item);
  top = subSize(top, `${h}px`);
  let index = 0;
  while (index < rowNum) {
    const height = heights[index];
    const item = {
      style: { ...style, height, top, left },
      text
    };
    str += staticText(item, `${tableField}.${index}.${field}`);
    top = subSize(top, height);
    index++;
  }
  if (showSummary) {
    const { lineHeight } = summaryStyle;
    const item: rectangleTypez1 = {
      style: {
        ...columnHeaderStyle,
        height: lineHeight,
        lineHeight,
        top
      },
      text: ''
    };
    rectangle(item);
  }
  return str;
}

function codeTable(temp: codeTableType) {
  const {
    tableBorder,
    rowNum,
    tableNum,
    columnNum,
    field,
    columnList,
    showSummary,
    summaryStyle,
    summaryField,
    summaryTextData,
    tableStyle,
    showRowHeader,
    rowHeaderField,
    rowHeaderTextData,
    showColumnHeader,
    columnHeaderField,
    columnHeaderTextData
  } = temp;

  let isField = true;
  if (!field) {
    isField = false;
  }
  if (showRowHeader && !rowHeaderField) {
    isField = false;
  }
  if (showColumnHeader && !columnHeaderField) {
    isField = false;
  }
  columnList.forEach(row => {
    if (!row.field) {
      isField = false;
    }
  });
  if (showSummary && !summaryField) {
    isField = false;
  }
  if (!isField) {
    return isField;
  }

  const left: string = temp.style.left as string;
  const top: string = temp.style.top as string;
  const fontSize: string = temp.style.fontSize as string;
  let str = '';
  const columnHeaderStyle = {
    width: '35px',
    height: '35px',
    lineHeight: '35px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    textAlign: 'center',
    border: 'none',
    left,
    top,
    fontSize
  };
  if (tableBorder) {
    columnHeaderStyle.border = '1px solid #000';
  }
  const heights: string[] = columnList.map(v => v.style.height as string);

  if (showRowHeader && showColumnHeader) {
    const item: rectangleTypez1 = {
      style: {
        ...columnHeaderStyle,
        textAlign: 'center',
        height: '35px',
        lineHeight: '35px'
      },
      text: ''
    };
    rectangle(item);
  }
  if (showRowHeader) {
    str += columnHeader({
      top: showColumnHeader ? subSize(top, `35px`) : top,
      left,
      rowNum,
      style: { ...columnHeaderStyle, textAlign: 'center' },
      heights,
      field: rowHeaderField,
      tableField: field,
      text: rowHeaderTextData,
      showSummary,
      summaryStyle,
      columnHeaderStyle: { ...columnHeaderStyle, textAlign: 'center' }
    });
  }
  let tableIndex = 0;
  let left2: string = showRowHeader ? subSize(left, '35px') : left;
  const widthColumnI: number = columnList.reduce((widthColumn, v) => {
    const w = v.style.width as string;
    const w1 = Number(w.replace('px', ''));
    if (w1 > widthColumn) {
      widthColumn = w1;
    }
    return widthColumn;
  }, 0);

  const widthSub: string = columnList.reduce(sub => {
    sub = subSize(sub, `${widthColumnI}px`);
    return sub;
  }, '0px');
  while (tableIndex < tableNum) {
    let columnIndex = 0;
    let top2 = top;
    let top4 = top;
    if (showColumnHeader) {
      const item: staticTextType1 = {
        style: {
          ...columnHeaderStyle,
          height: '35px',
          lineHeight: '35px',
          textAlign: 'center',
          width: widthSub,
          left: left2
        },
        text: columnHeaderTextData
      };
      str += staticText(item, `${field}.${tableIndex}.${columnHeaderField}`);
      top2 = subSize(top2, '35px');
    }
    const border = tableBorder ? '1px solid #000' : 'none';
    while (columnIndex < columnNum) {
      let top3 = top2;
      const tdHeight = columnList.reduce((sub, v) => {
        const h = v.style.height as string;
        const h1 = Number(h.replace('px', ''));
        if (h1 > sub) {
          sub = h1;
        }
        return sub;
      }, 0);
      const columnData: tableColumnsType = columnList[columnIndex];
      const { textData, style } = columnData;
      const item: staticTextType1 = {
        style: {
          ...style,
          border,
          left: left2,
          height: `${tdHeight}px`,
          lineHeight: `${tdHeight}px`,
          top: top3,
          width: `${widthColumnI}px`
        },
        text: textData
      };
      str += staticText(item);
      top3 = subSize(top3, `${tdHeight}px`);
      const arr: tableColumnsType[] = [];
      arr.length = rowNum;
      arr.fill(columnData);
      str += arr.reduce((strItem, v, index) => {
        const { field: fieldItem, style, textData } = v;
        const item = {
          style: {
            ...style,
            border,
            left: left2,
            height: `${tdHeight}px`,
            lineHeight: `${tdHeight}px`,
            top: top3,
            width: `${widthColumnI}px`
          },
          text: textData
        };
        strItem += staticText(item, `${field}.${index}.${fieldItem}`);
        top3 = subSize(top3, `${tdHeight}px`);
        return strItem;
      }, '');
      left2 = subSize(left2, `${widthColumnI}px`);
      top4 = top3;
      columnIndex++;
    }
    if (showSummary) {
      const item: staticTextType1 = {
        style: {
          ...columnHeaderStyle,
          ...summaryStyle,
          textAlign: 'center',
          height: summaryStyle.lineHeight,
          width: widthSub,
          left: subSize(left2, `-${widthSub}`),
          top: top4
        },
        text: summaryTextData
      };
      str += staticText(item, `${field}.${tableIndex}.${summaryField}`);
    }
    if (tableStyle.marginLeft) {
      left2 = subSize(left2, tableStyle.marginLeft);
    }
    tableIndex++;
  }
  return str;
}
