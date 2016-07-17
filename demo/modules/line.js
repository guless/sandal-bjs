
(function(bingo, $){
	"use strict";

	var app = bingo.app('demo');
	app.controller('line', ['$view', '$site', function($view, $site){

		/*$view.title = '标题';*/

		$view.citys = ['北京', '上海', '广州'];

		$view.selectIndex = 0;

		$view.mSelectIndex = [0];
		$view.mutlSelect = function(index){
			if ($view.mSelectIndex.indexOf(index) >= 0)
				$view.mSelectIndex=bingo.removeArrayItem(index, $view.mSelectIndex);
			else
				$view.mSelectIndex.push(index);
		};

		$view.flex1 = false;
		$view.flex2 = true;

	}]);

})(bingoV2, window.jQuery);
