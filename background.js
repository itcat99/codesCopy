const API = 'http://localhost:3001';

chrome.contextMenus.create({
    title: '扫描--发现新世界',
    contexts: ['image'],
    onclick: scan
}, () => {});

function scan(info, tab) {
    let imgUrl = info.srcUrl;

    if (imgUrl.indexOf('data') === 0) return;


    axios.post(API, {
        url: imgUrl
    }).then((res) => {
        console.log(res.data);
        const data = escape(res.data);
        const code = `document.getElementById("codesCopy").style.display = "block"; document.getElementById("codesCopyInput").value = unescape("${data}")`;
        console.log(code);
        chrome.tabs.executeScript({
            code: code
        });
    });
}