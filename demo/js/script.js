

// 请忽略js，粗糙的为了简单的演示使用

$(function() {
	/*$('.js-back').on('click', function() {
		window.location.href = 'index.html' ;
	})*/
	// $('.js-toast-btn').on('click', function() {
	// 	$('.js-toast-wrap').addClass('active');
	// })

	var _doc = document,
		_docEle = _doc.documentElement;

	$(_doc).on('click', '.nav-list--tab>.nav-item', function(){
		$(this).addClass('active').siblings().removeClass('active');
	}).on('click', '.nav-list--btn>.nav-item', function(){
		$(this).addClass('active').siblings().removeClass('active');
	});

/*
	$('.fixed-quick-tool').click(function(){
		$(this).toggleClass('active');
	});

	$('.icon-switch').click(function(){
		$(this).toggleClass('active');
	})

	$('.icon-checkbox').add('.icon-radio').click(function(){
		if($(this).hasClass('disabled')){
			return;
		} 
		$(this).toggleClass('active');
	})

	$('.line-list--select').on('click', '.line-item', function(){
		$(this).siblings('.line-item').removeClass('active');
		$(this).toggleClass('active');
	})
	$('.line-list--multi-select').on('click', '.line-item', function(){
		$(this).toggleClass('active');
	})
*/
	/*$('.js-toast-btn').on('click', function(){
		var $toastWrap = $('.toast-wrap');
		var index = $(this).index();
		console.log(index);
		$toastWrap.removeClass('active').eq(index).addClass('active');
		setTimeout(function(){
			$toastWrap.removeClass('active')
		},2000)
	})*/
/*
	$('.js-dialog-btn').on('click', function(){
		var $dialogWrap = $('.dialog-wrap');
		var index = $(this).index();
		console.log(index);
		$dialogWrap.removeClass('active').eq(index).addClass('active')
		.on('click',function(){
			$(this).removeClass('active');
		});
	})

	$('.js-picker-btn').on('click', function(){
		$('.panel-wrap')
		.addClass('active')
		.on('click', function(){
			$(this).removeClass('active');
		});
	})	*/
});

// 圆形进度条
$(window).load(function(){
	var $circleProgress = $('.circle-progress'),
		deg1 = 60,
		deg2 = 230,
		deg3 = deg2 - 180;
	var $progress1 = $circleProgress.eq(0),
		$progress2 = $circleProgress.eq(1);
	$progress1.find('.progress-num').html(parseInt(deg1 * 100 / 360) +'%');
	$progress2.find('.progress-num').html(parseInt(deg2 * 100 / 360)+'%');
	$progress1.find('.right-inner').css('transform', 'rotate('+ deg1 +'deg)');
	$circleProgress.eq(1).find('.right-inner').css('transform', 'rotate(180deg)');
	$circleProgress.eq(1).find('.left-inner').css('transform', 'rotate('+ deg3 +'deg)');	
});

//设置route资源路由
;(function(bingo, $){
	"use strict";

	var app = bingo.app('demo');

	//app默认 route, 但priority最大（最后）
	app.route('**', {
		priority: 99999,
		url: '**',
		toUrl: function(url, param) {
			return url;
		}
	});

	//设置controller资源路由
	app.route('controller', {
		//优先级, 越小越前, 默认100
		//priority: 200,
		type: 'controller',
		//路由url, 如: user/list
		url: '{controller*}',
		//路由到目标url, 生成:modules/user/list.js
		toUrl: 'modules/{controller*}.js',
		//变量默认值, 框架提供内部用的变量: app, controller, service
		defaultValue: {
			controller: ''
		}
	});

	//设置tmpl资源路由
	app.route('view', {
		type: 'view',
		url: '{view*}',
		toUrl: 'modules/{view*}.html',
		defaultValue: {
			tmpl: ''
		}
	});

	//设置tmpl资源路由
	app.route('tmpl', {
		type: 'tmpl',
		url: '{tmpl*}',
		toUrl: 'tmpls/{tmpl*}.html',
		defaultValue: {
			tmpl: ''
		}
	});

	//设置command资源路由
	app.route('command', {
		type: 'command',
		url: '{command*}',
		toUrl: 'commands/{command*}.js',
		defaultValue: {
			command: ''
		}
	});

	//设置ajax资源路由
	app.route('ajax', {
		type: 'ajax',
		url: '{ajax*}',
		toUrl: '{ajax*}',
		defaultValue: {
			ajax: ''
		}
	});

	//设置service资源路由
	app.route('service', {
		type: 'service',
		url: '{service*}',
		toUrl: 'services/{service*}.js',
		defaultValue: {
			service: ''
		}
	});

	//设置route资源路由
	app.route('route', {
		type: 'route',
		url: '{routes*}',
		toUrl: 'routes/{routes*}.html',
		defaultValue: {
			routes: ''
		}
	});

	bingo.ready(function(){
		bingo.compile(document.getElementById('main'));
	});

})(bingoV2, window.jQuery);

//服务
;(function(bingo, $){
	"use strict";

	var app = bingo.app('demo');
	app.service('$site', function($view){
		if ($view.$site) return $view.$site;

		return $view.$site = {
			bgNoObserve: true,
			mainView: function() {
				return app.view('main');
			},
			pageContent: function() {
				return this.mainView().pageContent;
			},
			open: function(name, params) {
				var _cp = null,
					_page = {
						bgNoObserve: true,
						params: params,
						receive: function(callback) {
							this.bgOn('receive', callback);
							return this;
						},
						send: function(p) {
							this.bgTrigger('receive', arguments);
							return this;
						},
						close: function(ret) {
							try {

								arguments.length > 0 && this.bgTrigger('receive', arguments);
								_cp.$remove();
							$($view.$getNodes()).show();
								this.bgTrigger('onClosed', arguments);
							} finally {
								this.bgDispose();
								return this;

							}
						},
						onClosed: function(callback) {
							return this.bgOn('onClosed', callback);
						}
					}; //end _page

				var url = ['view', name].join('::');
				//动态编译模板
				app.tmpl(url).then(function(html) {
					return this.pageContent().$insertAfter(html, null, ['$view', function($pageView) {
						$($view.$getNodes()).hide();
						$pageView.__page_ = _page;
					}]);
				}.bind(this)).then(function(cp) {
					_cp = cp;
				});
				return _page;
			},
			page: function() {
				return $view.__page_;
			},
			params: function(defaultValue) {
				var page = this.page();
				return bingo.extend(defaultValue || {}, page && page.params);
			},
			close: function(ret) {
				var page = this.page();
				return page && page.close(ret);
			}
		}; //end $site
	});

})(bingoV2, window.jQuery);
