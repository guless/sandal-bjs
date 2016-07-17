
(function(bingo, $){
	"use strict";

	var app = bingo.app('demo');
	app.controller('main', ['$view', '$site', function($view, $site){

		$view.title = '测试';
		console.log('main ok!', $view.$site);

	}]);

})(bingoV2, window.jQuery);
