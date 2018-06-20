//---------------------------------------------扩充JQuery封装--------------------------------------------------------
//拖拽方法
jQuery.fn.drag = function(target){  
        var draging = false;  
        var startLeft,startTop;  
        var startX,startY;  
        $(this).mousedown(function(event){ 
//        	$(this).css('cursor','move');  
        	var offset= $(target).offset();
            startLeft = offset.left;  
            startTop = offset.top;  
            startX = event.clientX;  
            startY = event.clientY;  
            draging = true;  
            $(this)[0].setCapture();
            return false;
        }).mousemove(function(event){  
            if (draging == false)return;  
            $(this)[0].setCapture();
            var deltaX = event.clientX - startX;  
            var deltaY = event.clientY - startY;  
            var left = startLeft + deltaX;  
            var top = startTop + deltaY;  
            $(target).css('left',left+'px').css('top',top+'px');  
            return false;
        }).mouseup(function(event){  
            draging = false;  
            $(this)[0].releaseCapture();
            return false;
        }).mouseout(function(event){
        	if (draging == false)return;  
            var deltaX = event.clientX - startX;  
            var deltaY = event.clientY - startY;  
            var left = startLeft + deltaX;  
            var top = startTop + deltaY;  
            $(target).css('left',left+'px').css('top',top+'px');  
            return false;
        });
        
    	return $(this);
}
//在body中间显示

jQuery.fn.locateCenter=function(){

//	$(this).css("top",$("body").height()/4+"px");
//	$(this).css("left",$("body").width()/4+"px");
	
	$(this).css("top",( $(window).height() - $(this).height() ) / 2+$(window).scrollTop() + "px");
	$(this).css("left",( $(window).width() - $(this).width() ) / 2+$(window).scrollLeft() + "px");

	return $(this);
}

//在body左上显示

jQuery.fn.locateLeftTop=function(){

//	$(this).css("top",$("body").height()/4+"px");
//	$(this).css("left",$("body").width()/4+"px");
	
//	$(this).css("top",( $(window).height() - $(this).height() ) / 4+$(window).scrollTop() + "px");
	$(this).css("top",( $(window).height() ) / 4+$(window).scrollTop() + "px");
	$(this).css("left",( $(window).width() - $(this).width() ) / 4+$(window).scrollLeft() + "px");

	return $(this);
}


//分页显示
//最后一个参数为回调函数的传入参数，如果未定义，则直接调用func(1)
jQuery.fn.pagination = function(contentId,currentPage,totalPage,func,option){
	var pageVarContent = "<span class='pageGroup' id='firstPage"+contentId+"'>首页</span>|" +
	"<span class='pageGroup' id='prevPage"+contentId+"'>上一页</span>|" +
	"<span class='pageGroup' id= 'nextPage"+contentId+"'>下一页</span>|" +
	"<span class='pageGroup' id='lastPage"+contentId+"'>末页</span>|" +
	"<span>第</span><span id='currentPage"+contentId+"'>"+currentPage+"</span><span>页</span>|" +
	"<span>共</span><span id='totalPage"+contentId+"'>"+totalPage+"</span><span>页</span>|" +
	"<span>跳到<input class= 'input_text' type ='text' id='inputPage"+contentId+"' style='width:20px;' maxlength='10'/></span><span class='pageGroup' id='goBut"+contentId+"'>GO</span>";
	$(this).empty()
	.append(pageVarContent)
	.find(".pageGroup")
	.addClass("clickable")
	.hover(function(){
		$(this).toggleClass("border_bottom");
	},function(){
		$(this).toggleClass("border_bottom");
	});
	
	function callBack(){
		if(option!=undefined){
			option.newPage = 1;
			func(option);
		}else{
			func(1);
		}
	}
	
	$("#firstPage"+contentId).click(function(){
		var currentPage = Number($("#currentPage"+contentId).text());
		if(currentPage!=1){
			$("#currentPage"+contentId).text("1");
			callBack();
		}
	});
	$("#prevPage"+contentId).click(function(){
		var currentPage = Number($("#currentPage"+contentId).text());
		if(currentPage > 1){
			$("#currentPage"+contentId).text((currentPage - 1)+"");
			callBack();
		}
	});
	$("#nextPage"+contentId).click(function(){
		var currentPage = Number($("#currentPage"+contentId).text());
		var totalPage = Number($("#totalPage"+contentId).text());
		if(currentPage < totalPage){
			$("#currentPage"+contentId).text((currentPage+1)+"");
			callBack();
		}
	});
	$("#lastPage"+contentId).click(function(){
		var totalPage = Number($("#totalPage"+contentId).text());
		var currentPage = Number($("#currentPage"+contentId).text());
		if(totalPage!=currentPage){
			$("#currentPage"+contentId).text(totalPage);
			callBack();
		}
	});
	$("#goBut"+contentId).click(function(){
		var goPage;
		var totalPage = Number($("#totalPage"+contentId).text()); 
		try{
			goPage = Number($("#inputPage"+contentId).val());
		}catch(e){
			alert(WebInitParameter.MSG_INFO_C03);
			$("#inputPage"+contentId).focus();
			$("#inputPage"+contentId).select();
			return;
		}
		if(isNaN(goPage)||goPage<=0||goPage>totalPage){
			alert(WebInitParameter.MSG_INFO_C03);
			$("#inputPage"+contentId).focus();
			$("#inputPage"+contentId).select();
			return;
		}
		var currentPage = Number($("#currentPage"+contentId).text());
		if(currentPage!=goPage){
			$("#currentPage"+contentId).text(goPage);
			callBack();
		}
	});
	
	return $(this);
}

//选择工具栏
jQuery.fn.checkGroup = function(name,$target,func,option){
	if($target.find("input").length == 0)
		return;
	var content = "<input type='checkbox' id='checkAll"+name+"'/>全选<input type='checkbox' id='cancelAll"+name+"'/>全不选<input type='checkbox' id='checkOther"+name+"'/>反选";
	$(this).empty().append(content);
	$("#checkAll"+name).click(function(){
		if($("#checkAll"+name).attr("checked")){
			$target.find("input[type=checkbox]").each(function(){
				if(!$(this).attr("disabled")){
					$(this).attr("checked",true);
				}
			});
			$("#cancelAll"+name).attr("checked",false);
			$("#checkOther"+name).attr("checked",false);
			if(func!= undefined){
				func(option);
			}
		}
	});
	$("#cancelAll"+name).click(function(){
		if($("#cancelAll"+name).attr("checked")){
			$target.find("input[type=checkbox]").each(function(){
				if(!$(this).attr("disabled")){
					$(this).attr("checked",false);
				}
			});
			$("#checkAll"+name).attr("checked",false);
			$("#checkOther"+name).attr("checked",false);
			if(func!= undefined){
				func(option);
			}
		}
	});
	$("#checkOther"+name).click(function(){
		$target.find("input[type=checkbox]").each(function(){
				if(!$(this).attr("disabled")){
					$(this).attr("checked",!$(this).attr("checked"));
				}
			
		});
		if($("#checkOther"+name).attr("checked")){
			$("#checkAll"+name).attr("checked",false);
			$("#cancelAll"+name).attr("checked",false);
		}
		if(func!= undefined){
			func(option);
		}
	});
	return $(this);
}

//输入框获取焦点变色
jQuery.fn.clickChangeColor=function(className){
	$(this).focus(function(){
		$(this).addClass(className);
	}).blur(function(){
		$(this).removeClass(className);
	})
	return $(this);
}
