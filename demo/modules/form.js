
(function(bingo, $){
	"use strict";

	var app = bingo.app('demo');
	app.controller('form', ['$view', '$site', function($view, $site){

		/*$view.title = '标题';*/

		$view.model = {
			name:'',
			phone:'',
			identity:'',
			code:'',
			code1:'',
			placeholder:'',
			placeholder1:'',
			textarea:''
		};

	}]);

})(bingoV2, window.jQuery);
