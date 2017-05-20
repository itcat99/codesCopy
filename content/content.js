window.onload = () => {
  console.log('window onload');

  let template = `<section id="codesCopy">
      <h1 class="codesCopy-title"></h1>
      <span class="codesCopy-close">X</span>
      <div class="codesCopy-content"></div>
    </section>
    `

  $('body').append(template);
  let $wrap = $('body').find('#codesCopy');
  let $close = $wrap.find('.codesCopy-close');
  let $content = $wrap.find('.codesCopy-content');

  $close.on('click', () => {
    $content.html('');
    $wrap.removeClass('codesCopy-show');
  });

  window.addEventListener('message', (event) => {
    if (event.data.type === 'codes-copy') {
      let data = event.data.value;
      console.log(data);
      $wrap.addClass('codesCopy-show');

      $content.html(data);
    }
  }, false);
}