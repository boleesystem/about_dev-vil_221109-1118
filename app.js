// 반응형 네비게이션바 만들기 출처: https://taesung1993.tistory.com/27
const navSlide = () => {
  const burger = document.querySelector('.burger'); //jquery 없이 경로지정하기
  const nav = document.querySelector('.nav-links'); //jquery 없이 경로지정하기
  const navLinks = document.querySelectorAll('.nav-links li'); //jquery 없이 경로지정하기

  burger.addEventListener('click', () => { //클릭 이벤트를 생성
    nav.classList.toggle('nav-active'); //classList - toggle은 클래스의 유무를 체크해서 없으면 add, 있으면 remove를 자동으로 시켜준다.

    //navLinks의 각요소를 if조건문을 써서 순차적으로 나오게 만드는 것
    navLinks.forEach((link, index) => {
      if(link.style.animation) {
        link.style.animation = '';
      } else{
        link.style.animation = `navLinkFade 0.5s ease forwards ${ index /7 + 0.5}s`;
      }
    });

    burger.classList.toggle('toggle'); //classList - toggle은 클래스의 유무를 체크해서 없으면 add, 있으면 remove를 자동으로 시켜준다.

  });


}

navSlide();


// 스크롤 내릴 때 배경 바꾸기 출처: https://stickode.tistory.com/438
$(window).scroll(function() {

  //var로 변수 지정
  var $window = $(window),
      $body = $('body'),
      $panel = $('.panel');

  var scroll = $window.scrollTop() + ($window.height() / 3);

  $panel.each(function () {
    var $this = $(this);

    //if조건문으로 스크롤을 내린 양만큼 기존 색상을 지우고 새로운 색상으로 바꿔주는 것을 반복하는 조건문(추가설명 찾아봄)
    if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {

      $body.removeClass(function (index, css) {
        return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
      });

      $body.addClass('color-' + $(this).data('color'));
    }
  });

}).scroll();

// 탑버튼만들기 https://help.campaignus.me/article/272-topbutton
$(window).scroll(function(){

  //스크롤을 위에서부터 300이상으로 내리면 탑버튼이 나타나고 기본적으로 사라져있는 조건문
	if ($(this).scrollTop() > 300){
		$('.btn_gotop').show();
	} else{
		$('.btn_gotop').hide();
	}
});

//버튼을 누르면 스크롤탑0으로 올려주는 함수
$('.btn_gotop').click(function(){
	$('html, body').animate({scrollTop:0},400);
	return false;
});

// 해당 칸 놀렀을 떄 인카드 나오고 사라지게하는 코드
function open_box1(){
  $('#introduce1').show()
  $('#introduce2').hide()
  $('#introduce3').hide()
  $('#introduce4').hide()
}
function close_box1(){
  $('#introduce1').hide()
}
function open_box2(){
  $('#introduce2').show()
  $('#introduce1').hide()
  $('#introduce3').hide()
  $('#introduce4').hide()
}
function close_box2(){
  $('#introduce2').hide()
}
function open_box3(){
  $('#introduce3').show()
  $('#introduce1').hide()
  $('#introduce2').hide()
  $('#introduce4').hide()
}
function close_box3(){
  $('#introduce3').hide()
}
function open_box4(){
  $('#introduce4').show()
  $('#introduce1').hide()
  $('#introduce2').hide()
  $('#introduce3').hide()
}
function close_box4(){
  $('#introduce4').hide()
}
function chat_open() {
  $('.btn_chat_open').hide()
  $('.btn_chat_close').show()
}
function chat_close() {
  $('.btn_chat_close').hide()
  $('.btn_chat_open').show()
}
