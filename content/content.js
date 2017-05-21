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
        <textarea class="codesCopy-content"></textarea>
      </div>
    </section>
    `

      // <div class="codesCopy-content"></div>
  $('body').append(template);
  let $wrap = $('body').find('#codesCopy');
  let $close = $wrap.find('.codesCopy-close');
  let $content = $wrap.find('.codesCopy-content');

  $close.on('click', () => {
    $content.html('');
    // $wrap.removeClass('codesCopy-show');
    $wrap.fadeOut(100);
  });

  window.addEventListener('message', (event) => {
    let type = event.data.type;

    if(type === 'codesCopy-init'){
      // $wrap.addClass('codesCopy-show');
      $wrap.fadeIn(500);
    }

    if (type === 'codesCopy-codes') {
      let data = event.data.value;
      console.log(data);
      $wrap.addClass('codesCopy-content-show');
      $content.fadeIn();
      $content[0].value = data;
    }
  }, false);
}