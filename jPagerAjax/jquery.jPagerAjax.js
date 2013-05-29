/*
author: Joanna
date: 2013.5.22

 * @config {string} 			position 分页显示的位置； after: 在内容的后面，before: 在内容的前面
 * @config {Boolean} 			showLength 首否显示总共多少条；true: 显示共多少条信息, false: 不显示
 * @config {Boolean} 			showSelect 是否显示选择下拉框；true: 显示下拉框选择条数, false: 不显示
 * @config {Boolean} 			showAction 是否显示首页，末页，上一页，下一页；true: 显示, false: 不显示
 * @config {int}                perPage 每页显示多少条信息
 * @config {int}                totalCount 总共多少条信息
 * @config {array}              select 下拉框的信息，这个是showSelect为true时设置才有效 [10, 20, 50, 100]
 * @config {int}                curPage 默认显示哪一页
 * @config {int}                pageCount 总共多少页
 * @config {object}             textmap: {
									first: "首页",
									last: "末页",
									prev: "上一页",
									next: "下一页"
								}
 * @config {function}           onPageClick 页码点击事件
 * @config {function}           onSelect 下拉框点击事件
 * @config {string}             children 孩子元素

*/

;(function($){
	$.extend($.fn, {
		jPagerAjax: function(options){

			var options = $.extend({
				position: "after",           
				showLength: true,            
				showSelect: true,
				showAction: true,           
				perPage: 10,                 
				totalCount: '',               
				select: [10, 20, 50, 100],
				curPage: 1,                
				pageCount: "" ,              
				textmap: {
					first: "首页",
					last: "末页",
					prev: "上一页",
					next: "下一页"
				},
				onPageClick:  function(curPage){ // page click event

				},
				onSelect: function(perPage){

				},               
				children: "li"                // 要分页的元素
			}, options);

			
			return this.each(function(){
				var self = $(this),
					html = "",
					pageHtml = '',
					m = 0,
					page_btn = $(".page_num", self),
					select = $(".jPager_Select_element", self);

				self.children(".jPager_container", self).remove();

				// 是否显示选择页码
				if(options.showSelect){
					html +='<div class="jPager_container"><div class="jPager_Select"><span>每页显示</span><select class="jPager_Select_element">';
					for (; m<options.select.length; m++){
						if(options.perPage==options.select[m]){
							html += '<option value="'+options.select[m]+'" selected>'+options.select[m]+'</option>';
						}else {
							html += '<option value="'+options.select[m]+'">'+options.select[m]+'</option>';
						}
						
					}
					html += '</select></div></div>';
				}else {
					html += '<div class="jPager_container"></div>';
				}

				// 分页是否是元素前显示，还是在元素后显示
				if(options.position=="before"){
					self.prepend(html);
				} else if (options.position=="after"){
					self.append(html);
				}

				// 页码点击
				page_btn.die().live("click", function(){
					var that = $(this),
						curPage = that.attr("data-page");
					
					options.onPageClick(curPage);
				});

				// 下拉框选择
				select.die().live("change", function(){
					var that = $(this),
						perPage = that.val();

					options.perPage = perPage;
					options.onSelect(perPage);
				});

				renderPage();

				// 页码
				function renderPage(){
					var i = 1;					
					if(options.pageCount>1){

						if(options.showAction){

							if(options.curPage==1){
								pageHtml += '<ul class="jPager"><li data-page="" class="page_num disabled"><a href="javascript:;">'+options.textmap.first+'</a></li><li class="page_num disabled" data-page=""><a href="javascript:;" >'+options.textmap.prev+'</a></li>';
							}else {
								pageHtml += '<ul class="jPager"><li data-page="1" class="page_num"><a href="javascript:;">'+options.textmap.first+'</a></li><li class="page_num" data-page="'+(options.curPage-1)+'"><a href="javascript:;" >'+options.textmap.prev+'</a></li>';
							}	
						}else {
							pageHtml += '<ul class="jPager">';
						}
																								
						
						for (; i<=options.pageCount; i++){
							if(i==options.curPage){
								pageHtml += '<li class="page_num disabled" data-page=""><a href="javascript:;">'+i+'</a></li>';	
							}else {
								pageHtml += '<li class="page_num" data-page="'+i+'"><a href="javascript:;">'+i+'</a></li>';	
							}
												
						}

						if(options.showAction){
							if(options.curPage==options.pageCount){
								pageHtml += '<li class="page_num disabled" data-page="" ><a href="javascript:;">'+options.textmap.next+'</a></li><li class="page_num disabled" data-page=""><a href="javascript:;">'+options.textmap.last+'</a></li>';
							}else {
								pageHtml += '<li class="page_num" data-page="'+(options.curPage+1)+'"><a href="javascript:;">'+options.textmap.next+'</a></li><li class="page_num" data-page="'+options.pageCount+'"><a href="javascript:;">'+options.textmap.last+'</a></li>';
							}
						}
						
						
						// 是否显示共多少条
						if(options.showLength){
							pageHtml += '<li><span>共'+options.totalCount+'条</span></li></ul>';
						}else {
							pageHtml += '</ul>';
						}

						$(".jPager", self).remove();
						if(options.showSelect) {				
							$(".jPager_container", self).append(pageHtml);
							
						}else {
							// 分页是否是元素前显示，还是在元素后显示
							if(options.position=="before"){
								self.prepend(pageHtml);
							} else if (options.position=="after"){
								self.append(pageHtml);
							}
						}
																											
					}
				};
								
			});
			
		}
	});
})(jQuery);