window.onload = () => {
  console.log('window onload');

  let template = `<section id="codesCopy">
      <h1 class="codesCopy-title">codes copy</h1>
      <div class="codesCopy-body">
        <span class="codesCopy-close">X</span>
        <div class="codesCopy-loading">
          <div class="cp-spinner cp-round"></div>
          <p>Loading...</p>
        </div>
        <div class="codesCopy-content"></div>
      </div>
    </section>
    `
  let selector = `<div class="codesCopy-selector"></div>`;

  $('body').append([template, selector]);
  let $wrap = $('body').find('#codesCopy');
  let $close = $wrap.find('.codesCopy-close');
  let $content = $wrap.find('.codesCopy-content');
  let codeBlock = CodeMirror($content[0], {
    theme: 'zenburn',
    tabSize: 2,
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    mode: "javascript"
  });

  $close.on('click', () => {
    $wrap.fadeOut(100);
    $content.fadeOut(100);
    $wrap.removeClass('codesCopy-content-show');
  });

  window.addEventListener('message', (event) => {
    let type = event.data.type;
    console.log(type)
    if (type === 'codesCopy-init') {
      // $wrap.addClass('codesCopy-show');
      $wrap.fadeIn(500);
    }

    if (type === 'codesCopy-codes') {
      let data = event.data.value;
      console.log(data);
      $wrap.addClass('codesCopy-content-show');
      $content.fadeIn();
      codeBlock.doc.setValue(data);
    }

    if (type === 'screenShot') {
      dragSelector();
    }
  }, false);

  function dragSelector() {
    let selector = document.querySelector('.codesCopy-selector'),
      x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0;

    let start = [x1, y1];
    let end = [x2, y2];

    document.onmousedown = (e) => {
      selector.style.display = 'block';

      x1 = e.clientX;
      y1 = e.clientY;
      start = [x1, y1];
      reCalc(selector, start, end);
    };
    document.onmousemove = (e) => {
      x2 = e.clientX;
      y2 = e.clientY;

      end = [x2, y2];
      reCalc(selector, start, end);
    };
    document.onmouseup = (e) => {
      selector.style.display = 'none';

      chrome.runtime.sendMessage({
        type: "screenShop",
        data: {
          start: start,
          end: end
        }
      }, (res) => {
        console.log(res);
      });
    };
  }

  function reCalc(el, start, end) {
    var x3 = Math.min(start[0], end[0]);
    var x4 = Math.max(start[0], end[0]);
    var y3 = Math.min(start[1], end[1]);
    var y4 = Math.max(start[1], end[1]);

    el.style.left = x3 + 'px';
    el.style.top = y3 + 'px';
    el.style.width = x4 - x3 + 'px';
    el.style.height = y4 - y3 + 'px';
  }
}