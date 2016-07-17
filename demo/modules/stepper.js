
(function(bingo, $){
	"use strict";

	var app = bingo.app('demo');
	app.controller('stepper', ['$view', '$site', function($view, $site){

		/*$view.title = '标题';*/
		$view.num = 1;

	}]);

})(bingoV2, window.jQuery);
