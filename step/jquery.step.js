;(function($){
	$.fn.extend({
		initStep: function(options) {
			var _this = $(this);
			var defaultOption = {
				width: '70%',
				nodeData: [{
					title: '第一步',
					desc: '第一步描述'
				},{
					title: '第二步',
					desc: '第二步描述'
				},{
					title: '第三步',
					desc: '第三步描述'
				}]
			}
			$.extend(true, defaultOption, options || {});
			var nodeData = defaultOption.nodeData;

			if (!(nodeData instanceof Array)) {
				alert('the node data must be an Array object');
			}else {
				_this.css({
					width: defaultOption.width,
					margin: '0 auto'
				});

				var html = '<ul class="stepBox">';
				nodeData.forEach(function(item, index){
					var order = index + 1;
					html += '<li class="item">';
					html += '<div class="top">';
					html += '<i class="state">';
					html += '<span class="order">'+order+'</span>';
					html += '</i>';
					html += '<span class="title">'+item.title+'</span>';
					html += '</div>';
					html += '<div class="desc">'+item.desc+'</div>';
					html += '</li>';
				})
				html += '</ul>';
				_this.append(html);
				_this.clickNode(1);  // 默认选中第一步

				return _this;
			}
		},
		clickNode: function(order) {
			var _this = $(this);
			_this.find(".item").each(function(i, element){
				index = i + 1;
				var className = '';
				if (order > index) {
					className = 'finish';
				}else if (order == index) {
					className = 'process';
				}else{
					className = 'wait';
				}
				$(element).removeClass().addClass("item").addClass(className);
			});

			return _this;
        },
        clickLastNode: function() {
            var _this = $(this);
            let activeIndex = 0;
			_this.find(".item").each(function(i, element){
                var className = element.className;
                if(className.indexOf('process') > 0) {
                    activeIndex = i;
                }
			});
            if(activeIndex - 1 < 0) {
                return _this;
            }
            
            _this.clickNode(activeIndex);
			return _this;
        },
        clickNextNode: function() {
            var _this = $(this);
            let activeIndex = 0;
			_this.find(".item").each(function(i, element){
                var className = element.className;
                if(className.indexOf('process') > 0) {
                    activeIndex = i;
                }
			});
            if(activeIndex + 1 > _this.find(".item").length - 1) {
                return _this;
            }
            
            _this.clickNode(activeIndex + 2);
			return _this;
        }
	})
})(jQuery);