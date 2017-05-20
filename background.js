const API = 'http://localhost:3000';

chrome.contextMenus.create({
    title: 'codes',
    contexts: ['image'],
    onclick: scan
}, () => {});

function scan(info, tab) {
    let imgUrl = info.srcUrl;

    if (imgUrl.indexOf('data') === 0) return;

    axios.post(API, {
        url: imgUrl
    }).then((res) => {
        const data = encodeURI(res.data);
        const code = `console.log("${data}")`;
        console.log(code);
        chrome.tabs.executeScript({
            code: code
        });
    });
}