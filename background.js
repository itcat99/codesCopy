const API = 'http://localhost:3001';

chrome.contextMenus.create({
  title: '扫描--发现新世界',
  contexts: ['image'],
  onclick: scan
}, () => {});

function scan(info, tab) {
  let imgUrl = info.srcUrl;

  if (imgUrl.indexOf('data') === 0) return;

  sendMessage('codesCopy-init');
  axios.post(API, {
    url: imgUrl
  }).then((res) => {
    console.log(res.data);
    const data = escape(res.data);

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