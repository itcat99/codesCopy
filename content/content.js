var w, h, className;

$(function () {
  let template = `<div id="codesCopy">

	<header><h2>代码收藏</h2></header>
	
	<div class="box">
		<div class="demo">
			<a href="javascript:;" class="bounceIn">按钮</a>
		</div>
		
		<div id="dialogBg"></div>
		<div id="dialog" class="animated">
			<img class="dialogIco" width="50" height="50" src="images/ico.png" alt="" />
			<div class="dialogTop">
				<a href="javascript:;" class="claseDialogBtn">close</a>
			</div>
			<form action="" method="post" id="editForm">
				&nbsp;&nbsp;<h3>代码工具</h3>
				<ul class="editInfos">
				<li><textarea id="codesCopyInput" name="reworkmes" cols="60"  rows="6" style="OVERFLOW: hidden"></textarea>	</li>
				</ul>
			</form>
		</div>
	</div>
	
</div>
<script>
  function show(data) {
    let $codesCopy = $('#codesCopy');
    let input = $codesCopy.find('textarea');

    $codesCopy.addClass('codesCopy-show');
    $input.val(data);
  }
</script>
`

  $('body').append(template);
});

function getSrceenWH() {
  w = $(window).width();
  h = $(window).height();
  $('#dialogBg').width(w).height(h);
}

window.onresize = function () {
  getSrceenWH();
}
$(window).resize();

$(function () {
  getSrceenWH();

  className = $(this).attr('class');
  $('#dialogBg').fadeIn(300);
  $('#dialog').removeAttr('class').addClass('animated ' + className + '').fadeIn();

  $('.claseDialogBtn').click(function () {
    $('#dialogBg').fadeOut(300, function () {
      $('#dialog').addClass('bounceOutUp').fadeOut();
    });
  });
});