
(function(bingo, $){
	"use strict";

	var app = bingo.app('demo');
	app.controller('icon', ['$view', '$site', function($view, $site){

		/*$view.title = 'icon ok';*/

		$view.checkbox = false;
		$view.radio = false;
		$view.switchA = false;

		$view.bgOnDispose(function(){
			console.log('icon bgOnDispose');
		});

	}]);

})(bingoV2, window.jQuery);
