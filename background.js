const API = 'http://localhost:3000';

chrome.contextMenus.create({
  title: 'codes',
  contexts: ['image'],
  onclick: scan
}, () => {});

function scan(info, tab) {
  let imgUrl = info.srcUrl;

  if (imgUrl.indexOf('data') === 0) return;

  axios.get(API, {
    params: {
      url: imgUrl
    }
  }).then((res) => {
    const data = encodeURI(res.data);
    console.log(data);
    const code = show(data);
    chrome.tabs.executeScript({
      code
    });
  });
}

function show(data){
  let $input = $('#codesCopy textarea');

  $input.val(data);
}

