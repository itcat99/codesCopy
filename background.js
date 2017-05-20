const API = 'https://api.ocr.space/parse/imageurl';

chrome.contextMenus.create({
  title: 'codes',
  contexts: ['image'],
  onclick: update
}, () => {});

function update(info, tab) {
  let imgUrl = info.srcUrl;

  if (imgUrl.indexOf('data') === 0) {
    return;
  }

  const res = axios.get(API, {
    params: {
      apikey: '2feae35e4188957',
      url: imgUrl
    }
  });
  console.log('successed');

  res.then((response) => {
    console.log(response);
  });
}