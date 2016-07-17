
//设置route资源路由
;(function(bingo, $){
	"use strict";

	var app = bingo.app('demo');

	app.command('header', function(cp){

		//如果header有内容，使用内容为模板
		//如果没内容使用#header为模板, 存放于tmpls/commands.html
		cp.$tmpl(function(){ return cp.$contents ? ['<header class="header">', cp.$contents, '</header>'].join('')
			: cp.$loadTmpl('#header');});

		cp.$view.title = cp.$attrs.$getAttr('title');
	});

	app.command('main', function(cp){

		cp.$tmpl(function(){ return  ['<main class="page-wrap">' , cp.$contents , '</main>'].join(''); });

	});

	app.command('footer', function(cp){

		cp.$tmpl(function(){ return  ['<footer class="fixed-bottom">' , cp.$contents , '</footer>'].join(''); });

	});

	app.command('preLoadTmpl', function(cp) {

		cp.$ready(function() {
			var files = cp.$attrs.src.$result();
			if (bingo.isArray(files)){
				bingo.each(files, function(item){
					app.tmpl('view::'+item);
				});
			}
		});

	});

})(bingoV2, window.jQuery);
