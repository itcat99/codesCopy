chrome.contextMenus.create({
  title: 'right menu',
  contexts: ['image'],
  onclick(info, tab) {
    let imgUrl = info.srcUrl;
    
  }
}, () => {
  console.log('successed');
});