/**
 * 自定义drawer抽屉插件
 * created by mengbing  2020/12/28
 * 
 * 属性：
 *		placement: 抽屉方向，可选值'left'/'right'，默认'left'
 * 		width: drawer的宽度，类型String，默认250px
 * 		closable: 是否显示右上角关闭按钮，类型Boolean，默认true
 *		mask: 是否展示遮罩，类型Boolean，默认true
 *      maskClosable: 点击遮罩是否允许关闭，类型Boolean，默认true
 *      title: 标题，类型String
 * 		afterOpenCallback: 打开抽屉后回调方法，类型function
 *		afterCloseCallback: 关闭抽屉后回调方法，类型function
 * 		
 * 方法：
 *		open: 打开抽屉
 *   	close: 关闭抽屉
 */
;(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}(function ($) {
	var mDrawer = {
		// 初始化drawer
		init (options) {
			var _this = $(this)
			mDrawer.el = _this

			var defaultOptions = {
				placement: 'left',
				width: '250px',
				closable: true,
				mask: true,
				maskClosable: true
			}
			$.extend(true, defaultOptions, options || {})
			mDrawer.options = defaultOptions

			// 获取目标元素内容并移除
			var contentBody = _this.addClass('drawer ' + defaultOptions.placement).children().remove()

			// mask
			var drawerMask = $('<div>', {
				class: 'drawer-mask'
			})
			_this.append(drawerMask)
			// 是否显示mask
			if (defaultOptions.mask) {
				drawerMask.addClass("drawer-mask-show")
			}
			// 点击mask是否允许关闭
			if (defaultOptions.maskClosable) {
				drawerMask.click(function() {
					mDrawer.close()
				})
			}

			// 构建drawer内容
			var drawerContent = $('<div>', {
				class: 'drawer-content',
				style: 'width: ' + defaultOptions.width
			})
			_this.append(drawerContent)

			if (defaultOptions.closable || defaultOptions.title) {
				var drawerContentHeader = $('<div>', {
					class: 'drawer-content-header'
				})
				drawerContent.append(drawerContentHeader)

				if (defaultOptions.title) {
					var drawerContentTitle = $('<div>', {
						class: 'drawer-content-title',
						text: defaultOptions.title
					})
					drawerContentHeader.append(drawerContentTitle)
				}

				if (defaultOptions.closable) {
					var drawerClose = $('<div>', {
						class: 'drawer-close',
						text: '×'
					})
					drawerContentHeader.append(drawerClose)

					drawerClose.click(function() {
						mDrawer.close()
					})
				}
			}

			var drawerContentBody = $('<div>', {
				class: 'drawer-content-body'
			})
			contentBody.appendTo(drawerContentBody)
			drawerContent.append(drawerContentBody)

			return mDrawer
		},
		// 打开抽屉
		open () {
			this.el.addClass("active")
			this._runCallback(this.options.afterOpenCallback)
		},
		// 关闭抽屉
		close () {
			this.el.removeClass("active")
			this._runCallback(this.options.afterCloseCallback)
		},
		// 调用回调函数
		_runCallback (callback) {
			if (!callback) return

			if (typeof callback === 'function') {
				try {
					callback()
				} catch(e) {
					console.error('回调函数调用失败：', e)
				}
			} else {
				console.error('callback is not a function')
			}
		}
	}
	
	$.fn.drawer = function (options) {
	    return mDrawer.init.call(this, options)
	};
}))