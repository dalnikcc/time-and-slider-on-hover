import './vendor.js';
import './jquery-3.1.1.min.js';
import './slick.min.js';


//smooth view
$('.smooth_visible').each(function () {
	var _this = $(this);
	var smoothTop = _this.offset().top;
	var smoothPosition = smoothTop - $(window).height()

	if ($(window).height() > smoothTop) {
		_this.addClass('smooth_show')
	}

	$(document).scroll(function () {
		if ($(document).scrollTop() >= smoothPosition) {
			_this.addClass('smooth_show')
		}
	});

});

//change padding on fix header
$(document).scroll(function () {
	if ($(document).scrollTop() > 20) {
		$('.header').addClass('fixed_active')
	} else {
		$('.header').removeClass('fixed_active')
	}
});

//show language menu
if ($(window).width() > 992) {
	$('.header_lang').on('click', function () {
		$(this).toggleClass('header_lang__active')
		$('.header_lang-submenu').toggleClass('show_lang_menu')
	});
}

//slick
$('.slick').slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	dots: true,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				arrows: false
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				arrows: false
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				arrows: false
			}
		}
	]
});


//show pswrd
$('.icon-eye').on('click', function () {
	$(this).toggleClass('icon-eye_active');
	if ($(this).hasClass('icon-eye_active')) {
		$(this).siblings('.form_input').attr('type', 'text')
	} else {
		$(this).siblings('.form_input').attr('type', 'password')
	}
})



//form
var formAccessPass = false;
var formAccessEmail = false;
//check pswrd form
$('[name="user_psw"]').on('keyup', function () {

	if ($(this).val().length < 6) {
		$(this).siblings('.error_input').addClass('error_input-show');
		$(this).css('border-color', '#ff165e');
		formAccessPass = false
	} else {
		$(this).siblings('.error_input').removeClass('error_input-show');
		$(this).css('border-color', '#333b4c');
		formAccessPass = true
	}

});

//check email form
var mailValid = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
$('[name="user_email"]').on('keyup', function () {

	var userEmail = $(this).val();
	if (!mailValid.test(userEmail)) {
		$(this).siblings('.error_input').addClass('error_input-show');
		$(this).css('border-color', '#ff165e');
		formAccessEmail = false
	} else {
		$(this).siblings('.error_input').removeClass('error_input-show');
		$(this).css('border-color', '#333b4c');
		formAccessEmail = true;
	}
});

//send form 
$('#form_feedback').on('submit', function () {
	if (formAccessPass == true && formAccessEmail == true) {
		return true;
	}
	return false;
});


//slider Realization 
var numSlider = 300000000
var onePercent = 3000000;


$('.plan_slider--progress').on('mousemove', function (e) {
	var mousePosition = e.pageX;
	var sliderProgress = $(this).offset().left; //get slider position
	var sliderProgressW = $(this).width(); // get slider width

	var clickPosition = sliderProgress - mousePosition; // get click position on slider
	var remindW = sliderProgressW + clickPosition // get distance between start slider and click

	var clickPercent = remindW / sliderProgressW; // get percent distance
	var clickPercentPositive = +clickPercent; // change - value for +
	var finalPercent = clickPercentPositive.toFixed(2) * 100 //convert to poitive number
	var finalNumber = onePercent * finalPercent // 1% * click position in percent
	var currentNumber = numSlider - finalNumber;
	var progressNum = 100 - finalPercent


	//boundary values
	if (currentNumber >= numSlider) currentNumber = numSlider
	if (currentNumber <= 0) currentNumber = 0
	if (finalPercent >= 100) finalPercent = 100
	if (finalPercent <= 0) finalPercent = 0

	//moving slider
	$(this).find('.plan_slider--change').css('right', finalPercent + '%');
	$(this).find('.plan_slider--live').css('right', finalPercent + '%');

	//hightlight lines in quantity numbers
	if (progressNum >= 50) {
		$(this).next().find('.progress_num._2').addClass('progress_num--active')
	} else {
		$(this).next().find('.progress_num._2').removeClass('progress_num--active')
	}
	if (progressNum == 100) {
		$(this).next().find('.progress_num._3').addClass('progress_num--active')
	} else {
		$(this).next().find('.progress_num._3').removeClass('progress_num--active')
	}

	//change value dynamically
	$('.plan_numbers--dynamic').text(currentNumber.toLocaleString('en'))
});


//mobile menu
var mobileMenu = []
if ($(window).width() < 992) {

	//push items in mobile menu
	$('.header_ul').each(function () {
		$('.mobile_menu ul').append($(this).find(' > li'))
	});

	//toggle menu
	$('.mobile_toggle').on('click', function () {
		$(this).toggleClass('mobile_line--active');
		$('.mobile_menu').toggleClass('menu_show');
	});

	//toggle lang
	$('.header_lang').on('click', function () {
		$(this).toggleClass('header_lang__active')
		$('.header_lang-submenu').slideToggle()
	});
}

//counter
//finish date
var finishDate = new Date(2018, 12, 3, 20, 0, 0);

//remind Current Days
var currentDays
(function remindCurrentDays() {
	var now = new Date();
	var setdate = new Date(now.getFullYear(), 12, 1, 0, 0);  //left days from new Year
	var day = (now - setdate) / 1000 / 60 / 60 / 24;
	currentDays = Math.round(day);
})()

//remind Finish Days
var finishDays
(function remindFinishDays() {
	var setdate = new Date(finishDate.getFullYear(), 0, 1, 0, 0);
	var day = (finishDate - setdate) / 1000 / 60 / 60 / 24;
	finishDays = Math.round(day);
})()

//timer
setInterval(function () {
	var today = new Date();

	// create arr and add sum between finish date and current date
	var remainderDate = [];
	remainderDate[0] = finishDate.getFullYear() - today.getFullYear();
	remainderDate[1] = finishDate.getMonth() - today.getMonth();
	remainderDate[2] = finishDays - currentDays;
	remainderDate[3] = finishDate.getHours() - today.getHours();
	remainderDate[4] = finishDate.getMinutes() - today.getMinutes();
	remainderDate[5] = finishDate.getSeconds() - today.getSeconds();

	//create new date
	var newDate = new Date(remainderDate[0], remainderDate[1], remainderDate[2], remainderDate[3], remainderDate[4], remainderDate[5]);

	//add 0 if num < 10
	if (remainderDate[2] < 10) {
		var newDays = "0" + remainderDate[2]
	} else {
		var newDays = remainderDate[2]
	}

	if (newDate.getHours() < 10) {
		var newHours = "0" + newDate.getHours()
	} else {
		var newHours = newDate.getHours()
	}

	if (newDate.getMinutes() < 10) {
		var newMinutes = "0" + newDate.getMinutes()
	} else {
		var newMinutes = newDate.getMinutes()
	}

	if (newDate.getSeconds() < 10) {
		var newSeconds = "0" + newDate.getSeconds()
	} else {
		var newSeconds = newDate.getSeconds()
	}

	//set input text
	$('#timer_days .timer_time').text(newDays);
	$('#timer_hours .timer_time').text(newHours);
	$('#timer_minutes .timer_time').text(newMinutes);
	$('#timer_seconds .timer_time').text(newSeconds);
}, 1000);