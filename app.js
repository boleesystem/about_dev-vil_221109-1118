// 반응형 네비게이션바 만들기 출처: https://taesung1993.tistory.com/27
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    navLinks.forEach((link, index) => {
      if(link.style.animation) {
        link.style.animation = '';
      } else{
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
      }
    });

    burger.classList.toggle('toggle');

  });

  
}

navSlide();


// 스크롤 내릴 때 배경 바꾸기 출처: https://stickode.tistory.com/438
$(window).scroll(function() {
  
  var $window = $(window),
      $body = $('body'),
      $panel = $('.panel');
  
  var scroll = $window.scrollTop() + ($window.height() / 3);
 
  $panel.each(function () {
    var $this = $(this);
    
    if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
          
      $body.removeClass(function (index, css) {
        return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
      });
       
      $body.addClass('color-' + $(this).data('color'));
    }
  });    
  
}).scroll();

// 탑버튼만들기
$(window).scroll(function(){
	if ($(this).scrollTop() > 300){
		$('.btn_gotop').show();
	} else{
		$('.btn_gotop').hide();
	}
});
$('.btn_gotop').click(function(){
	$('html, body').animate({scrollTop:0},400);
	return false;
});