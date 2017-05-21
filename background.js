const API = 'http://localhost:3001';
const tesseract = window.Tesseract;

console.log(tesseract);
// console.log(chrome.runtime.getURL('images/fre.png'))

chrome.contextMenus.create({
  title: '扫描--发现新世界',
  contexts: ['image'],
  onclick: scan
}, () => {});

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