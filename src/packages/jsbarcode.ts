// const JsBarcode = require('jsbarcode');
import JsBarcode from 'jsbarcode';

type types = 'svg' | 'canvas' | 'img';

interface params {
  data: string;
  type?: types;
  displayValue?: boolean;
  height?: number;
}
interface res {
  status: boolean;
  data: null | string | HTMLElement | ChildNode;
}
export const getBarCodeDom = ({
  data,
  type = 'img',
  displayValue,
  height
}: params): res => {
  const res: res = {
    status: true,
    data: null
  };
  displayValue = typeof displayValue === 'boolean' ? displayValue : true;
  if (data === '' || typeof data !== 'string') {
    res.status = false;
    return res;
  }
  if (type === 'canvas') {
    const canvas = document.createElement('canvas');
    try {
      JsBarcode(canvas, data, {
        margin: 0,
        height: height || 100,
        displayValue
      });
      res.data = canvas;
    } catch (err: any) {
      console.error(err);
      res.status = false;
    }
  } else if (type === 'svg') {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('preserveAspectRatio', 'none')
    try {
      JsBarcode(svg, data, {
        margin: 0,
        height: height || 100,
        displayValue
      });
      res.data = svg;
    } catch (err: any) {
      console.error(err);
      res.status = false;
    }
  } else {
    try {
      const img = document.createElement('img');
      JsBarcode(img, data, {
        margin: 0,
        height: height || 100,
        displayValue
      });
      res.data = img;
    } catch (err: any) {
      console.error(err);
      res.status = false;
    }
  }
  return res;
};
