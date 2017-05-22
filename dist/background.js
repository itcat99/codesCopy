const API = 'http://localhost:3001';
const tesseract = window.Tesseract;
let img;

window.onload = () => {
  img = document.getElementById('bgImg');
}
// console.log(chrome.runtime.getURL('images/fre.png'))

chrome.contextMenus.create({
  title: '扫描--发现新世界',
  contexts: ['image'],
  onclick: scan
}, () => {});

chrome.contextMenus.create({
  title: 'screen shot',
  contexts: ['all'],
  onclick: screenShot
})

function scan(info, tab) {
  let imgUrl = info.srcUrl;

  // if (imgUrl.indexOf('data') === 0) return;
  sendMessage('codesCopy-init');

  tesseract.recognize(imgUrl)
    .then((result) => {
      console.log('successed!');
      console.log(result);
      let data = result.text;

      sendMessage('codesCopy-codes', data);
    });
}

function screenShot(info, tab) {
  sendMessage('screenShot');
}

chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  if (req.type === 'screenShop') {
    let data = req.data;
    let startX = Math.min(data.start[0], data.end[0]);
    let startY = Math.min(data.start[1], data.end[1]);
    let width = Math.abs(data.start[0] - data.end[0]);
    let height = Math.abs(data.start[1] - data.end[1]);

    chrome.tabs.captureVisibleTab({
      format: 'png'
    }, screenshotUrl => {
      img.src = screenshotUrl;

      let cropper = new Cropper(img, {
        data: {
          x: startX,
          y: startY,
          width: width,
          height: height
        },
        autoCrop: true,
        crop: function (e) {
          let imgUrl = cropper.getCroppedCanvas().toDataURL();
          scan({imgUrl: imgUrl});
        },
        cropend: function (e) {
          console.log('croped');
        }
      });
    });
  }

  sendRes({
    back: 'success'
  });
});

/* Util Methods */
function sendMessage(type, data = null) {
  const value = data ? unescape(data) : '';

  const code = JSON.stringify({
    "type": type,
    "value": value
  });

  chrome.tabs.executeScript({
    code: `window.postMessage(${code},"*");`
  });
}