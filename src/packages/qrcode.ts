import QRCode from 'qrcode';
type correctionLevel = 'L' | 'M' | 'Q' | 'H';
type types = 'svg' | 'canvas' | 'img';

interface res {
  status: boolean;
  data: null | string | HTMLElement | ChildNode;
}

interface params {
  data: string;
  level?: correctionLevel;
  type?: types;
  width?: number;
}

export const getQRCodeDom = ({
  data,
  level = 'H',
  type = 'img',
  width
}: params): res => {
  const res: res = {
    status: true,
    data: null
  };
  if (data === '' || typeof data !== 'string') {
    res.status = false;
    return res;
  }
  if (type === 'canvas') {
    const canvas = document.createElement('canvas');
    QRCode.toCanvas(
      canvas,
      data,
      { errorCorrectionLevel: level, margin: 0, width },
      function (err: any) {
        if (err) {
          console.error(err);
          res.status = false;
        } else {
          res.data = canvas;
        }
      }
    );
  } else if (type === 'svg') {
    QRCode.toString(
      data,
      { type: 'terminal', errorCorrectionLevel: level, margin: 0, width },
      function (err: any, url: string) {
        if (err) {
          console.error(err);
          res.status = false;
        } else {
          const div = document.createElement('div');
          div.innerHTML = url;
          res.data = div.firstChild;
        }
      }
    );
  } else {
    QRCode.toDataURL(
      data,
      { errorCorrectionLevel: level, margin: 0, width },
      function (err: any, url: string) {
        if (err) {
          console.error(err);
          res.status = false;
        } else {
          const img = document.createElement('img');
          img.src = url;
          res.data = img;
        }
      }
    );
  }
  return res;
};
