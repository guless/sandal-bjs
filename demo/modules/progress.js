
(function(bingo, $){
	"use strict";

	var app = bingo.app('demo');
	app.controller('progress', ['$view', '$site', function($view, $site){

		/*$view.title = '标题';*/


		$view.$ready(function() {

			// 圆形进度条
			var $circleProgress = $('.circle-progress'),
					deg1 = 60,
					deg2 = 230,
					deg3 = deg2 - 180;
				var $progress1 = $circleProgress.eq(0),
					$progress2 = $circleProgress.eq(1);
				$progress1.find('.progress-num').html(parseInt(deg1 * 100 / 360) + '%');
				$progress2.find('.progress-num').html(parseInt(deg2 * 100 / 360) + '%');
				$progress1.find('.right-inner').css('transform', 'rotate(' + deg1 + 'deg)');
				$circleProgress.eq(1).find('.right-inner').css('transform', 'rotate(180deg)');
				$circleProgress.eq(1).find('.left-inner').css('transform', 'rotate(' + deg3 + 'deg)');
		});


	}]);

})(bingoV2, window.jQuery);
