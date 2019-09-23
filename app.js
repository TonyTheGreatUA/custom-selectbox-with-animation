$(function () {

	var defaultselectbox = $('#cusSelectbox');
	var numOfOptions = $('#cusSelectbox').children('option').length;

	defaultselectbox.addClass('s-hidden');

	defaultselectbox.wrap('<div class="cusSelBlock"></div>');

	defaultselectbox.after('<div class="selectLabel"></div>');

	$('.selectLabel').text(defaultselectbox.children('option').eq(0).text());


	var cusList = $('<ul/>', { 'class': 'options'} ).insertAfter($('.selectLabel'));

	for(var i=0; i< numOfOptions; i++) {
		$('<li/>', {
		text: defaultselectbox.children('option').eq(i).text(),
		rel: defaultselectbox.children('option').eq(i).val()
		}).appendTo(cusList);
	}

	function openList() {
		for(var i=0; i< numOfOptions; i++) {
			$('.options').children('li').eq(i).attr('tabindex', i).css(
				'transform', 'translateY('+(i*100+100)+'%)').css(
				'transition-delay', i*30+'ms');
		}
	}

	function closeList() {
		for(var i=0; i< numOfOptions; i++) {
			$('.options').children('li').eq(i).css(
				'transform', 'translateY('+i*0+'px)').css('transition-delay', i*0+'ms');
		}
		$('.options').children('li').eq(1).css('transform', 'translateY('+2+'px)');
		$('.options').children('li').eq(2).css('transform', 'translateY('+4+'px)');
	}

	$('.selectLabel').click(function () {
		$(this).toggleClass('active');
		if( $(this).hasClass('active') ) {
			openList();
			focusItems();
		}
		else {
			closeList();
		}
	});

	$(".options li").on('keypress click', function(e) {
		e.preventDefault();
		$('.options li').siblings().removeClass();
		closeList();
		$('.selectLabel').removeClass('active');
		$('.selectLabel').text($(this).text());
		defaultselectbox.val($(this).text());
		$('.selected-item p span').text($('.selectLabel').text());
	});
	
});

function focusItems() {

	$('.options').on('focus', 'li', function() {
		$this = $(this);
		$this.addClass('active').siblings().removeClass();
	}).on('keydown', 'li', function(e) {
		$this = $(this);
		if (e.keyCode == 40) {
			$this.next().focus();
			return false;
		} else if (e.keyCode == 38) {
			$this.prev().focus();
			return false;
		}
	}).find('li').first().focus();

}