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

  $('body').append(template);
  let $wrap = $('body').find('#codesCopy');
  let $close = $wrap.find('.codesCopy-close');
  let $content = $wrap.find('.codesCopy-content');
  let codeBlock = CodeMirror($content[0], {
    theme: 'zenburn',
    tabSize: 2,
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    mode:  "javascript"
  });

  $close.on('click', () => {
    $content.html('');
    $wrap.fadeOut(100);
    $content.fadeOut(100);
    $wrap.removeClass('codesCopy-content-show');
  });

  window.addEventListener('message', (event) => {
    let type = event.data.type;

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
  }, false);
}