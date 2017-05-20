const API = 'http://localhost:3000';

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
            url: imgUrl
        }
    });
    console.log('successed');

    res.then((response) => {
        console.log(response);
    });
}