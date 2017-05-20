const API = 'http://localhost:3001';
const tesseract = window.Tesseract;
// tesseract.workerOptions.workerPath = chrome.runtime.getURL('./node_modules/tesseract.js/dist/worker.js');
// tesseract.workerOptions.corePath = chrome.runtime.getURL('./node_modules/tesseract.js-core/index.js');

console.log(tesseract);
// console.log(chrome.runtime.getURL('images/fre.png'))

chrome.contextMenus.create({
  title: '扫描--发现新世界',
  contexts: ['image'],
  onclick: scan
}, () => {});

function scan(info, tab) {
  let imgUrl = info.srcUrl;

  if (imgUrl.indexOf('data') === 0) return;

  tesseract.recognize(imgUrl)
    .then((result) => {
      console.log('successed!');
      console.log(result);

      let value = result.text;
      let data = JSON.stringify({
        "type":"codes-copy",
        "value": value
      });
      chrome.tabs.executeScript({
        code: `window.postMessage(${data}, "*")`
      });
    });

  // axios.post(API, {
  //   url: imgUrl
  // }).then((res) => {
  //   console.log(res.data);
  //   const data = encodeURI(res.data);
  //   const code = `document.getElementById("codesCopy").style.display = "block"; document.getElementById("codesCopyInput").value = decodeURI("${data}")`;
  //   console.log(code);
  //   chrome.tabs.executeScript({
  //     code: code
  //   });
  // });
}