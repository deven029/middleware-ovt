//----------------------------------------------自定义弹出显示框----------------------------------------------------
$(function(){
	//标记选中的行
	var selectedItem = -1;
	var outDatas = null;
	}
);
//输入框输入完毕，进行文本赋值和验证，回调函数callBackFun需单独实现
function inputValueFinish(customIn,callBackFun){
	var $customIn = $("#"+customIn);
	//blur事件替代click 2013-6-22
	$customIn.unbind("blur").bind("blur",function(event){
		event.stopPropagation();
		var $cusShowDiv = $("#cusShowDiv");
		var $trs = $cusShowDiv.find("tr");
		selectedSize = $trs.size()-1;
		var checkedEqu = 'no';
		$trs.each(function(index,inval){
			if(index==0)return;//第一行表头不处理
			if($(this).attr("class")=='selectlight'){
				//输入框赋值
				inputFormValues(index,callBackFun);
				checkedEqu = 'yes';
			}
		});
		if(checkedEqu == 'no'){
			cusClose();
			//验证
			//inputEquNoCheckFunc($customIn);
			//调用回调函数做验证，保证回调存在且必须是函数引用或者函数表达式2013-8-12
			(callBackFun && typeof(callBackFun)==='function' ) && callBackFun();
		}
	});
}
//用户按键 customIn 为用户输入控件的id
function cusKeyPress(customIn,basePath){
	//自定义查询语句
	var $customIn = $("#"+customIn);
	var keyNum = -1,i=0;
	$customIn.unbind("keyup").one("keyup",function(event){
		event.stopPropagation();
		keyNum = event.keyCode;
		if(i!=0)return;
		i=i+1;
		switch(keyNum){
		case 13 : cusKeyEnter(basePath);break;//enter
		case 27 : cusClose();break;//esc
		case 38 : cusKeyUp();break;
		case 40 : cusKeyDown();break;
		default : cusKeyChange(keyNum,$customIn,basePath);break;
		}
	});
	
}
//输入框的值改变
function cusKeyChange(keyNum,$customIn,basePath){
	var selectsql = $customIn.attr("selectsql");
	if(selectsql==null||selectsql=='')return;
	//字母数字，退格，空格
	if(keyNum>40||keyNum==8||keyNum==32){
		//var ajaxPath = basePath+"/jsp/boss/editType/popupSelectFrame/queryPopSelect.do";
		var ajaxPath ="../../../../jsp/boss/editType/popupSelectFrame/queryPopSelect.do";
		var $cusShowDiv = $("#cusShowDiv");
		var cusValue = $customIn.val();
		if(cusValue==undefined||cusValue==null||cusValue.replace(/^\s\s*/,'').replace(/\s\s*$/,'').length==0){
			cusClose();
			return;
		}
		var ajaxReq={
				selectsql:selectsql,
				cusValue:cusValue==null?"":cusValue
		};
		ovtAjaxMethod(ajaxPath,ajaxReq,function(data){
			if(data.code != "0"){
				var msg = data.value;
				if(data.value==null||data.value==undefined){
					msg = "连接超时，无法访问服务器！";
				}
				alert(msg);
				return;
			}
			var backData = data.value;
			var htmlData = backData[0];
			if(htmlData!=null&&htmlData!=undefined
					&&htmlData.replace(/^\s\s*/,'').replace(/\s\s*$/,'').length!=0){
				$cusShowDiv.empty().append(htmlData);
				outDatas = backData[1];
				cusShow($customIn,basePath);//刷新显示
			}else{
				cusClose();
			}
			//每次刷新后将默认为没选中值
			selectedItem=-1;
		});
	}
}
//显示框
function cusShow($customIn,basePath){
	var ypos = $customIn.position().top+$customIn.height()+5;
	var xpos = $customIn.position().left;
	$("#cusDiv").css({'position':'absolute','left':xpos + "px",'top':ypos +"px"});
	$("#cusDiv").show();
	mouseMove(basePath);
}
//鼠标移动
function mouseMove(basePath){
	var $cusShowDiv = $("#cusShowDiv");
	var $trs = $cusShowDiv.find("tr");
	selectedSize = $trs.size()-1;
	$trs.each(function(index,inval){
		if(index==0)return;//第一行表头不处理
		$(this)
		.hover(//鼠标进入事件
				function(e){
					e.stopPropagation();
					$(this).siblings().removeClass('selectlight'); 
					$(this).addClass('selectlight'); 
					selectedItem = index;
				},
				function(e){
					e.stopPropagation();
					//下拉列表每一项的事件，鼠标离开的操作 
					$(this).removeClass('selectlight'); 
					//当鼠标离开时索引置-1，当作标记 
					selectedItem = -1; 
				})
//		.click(function(){
//			//输入框赋值
//			mouseClickAndSetValue(index,basePath);
//			cusClose();
//		});
		;
	});
}
//鼠标单击确认，并根据id输出值
function mouseClickAndSetValue(index,basePath){
	// var ajaxPath = basePath+"/jsp/boss/editType/popupSelectFrame/queryOutSelected.do";
	var ajaxPath = "../../../../jsp/boss/editType/popupSelectFrame/queryOutSelected.do";
	var ajaxReq={
			index:index
	};
	ovtAjaxMethod(ajaxPath,ajaxReq,function(data){
		if(data.code != "0"){
			var msg = data.value;
			if(data.value==null||data.value==undefined){
				msg = "连接超时，无法访问服务器！";
			}
			alert(msg);
			return;
		}
		//给用户指定的文本框赋值
		var outKeyData = data.value;
		$(outKeyData).each(function(n,keyData){
			var key = keyData[0];
			var data = keyData[1];
			if(data!=null&&data!=undefined&&data.replace(/^\s\s*/,'').replace(/\s\s*$/,'').length!=0)
				$("#"+key).val(data);
		});
		
	});
}
//输入框确认赋值，根据选中项给文本框赋值代替 mouseClickAndSetValue方法
function inputFormValues(index,callBackFun){
	index -= Number(1);
	var outKeyData = outDatas[index];
	for(var i=0;i<outKeyData.length;i+=Number(1)){
		var keyData = outKeyData[i];
		var key = keyData[0];
		var data = keyData[1];
		if(data!=null&&data!=undefined&&data.replace(/^\s\s*/,'').replace(/\s\s*$/,'').length!=0)
			$("#"+key).val(data);
	}
	cusClose();
	//验证
	//inputEquNoCheckFunc($customIn);
	(callBackFun && typeof(callBackFun)==='function' ) && callBackFun();
}
//隐藏显示框
function cusClose(){
	$("#cusDiv").hide();
	//清空显示数据，避免多控件获取内容冲突，2013-6-23
	$("#cusShowDiv").empty();
}
//用户输入回车确认
function cusKeyEnter(basePath){
	if(selectedItem!=-1){
		//mouseClickAndSetValue(selectedItem,basePath,$customIn);
		inputFormValues(selectedItem);
	}
}
//用户按上键
function cusKeyUp(){
	var $cusShowDiv = $("#cusShowDiv");
	var $trs = $cusShowDiv.find("tr");
	var size = -1;
	if($trs==undefined||$trs.size()<=1 )
		return;
	else
		size = $trs.size()-1;
	if(selectedItem==-1||selectedItem==1)
		selectedItem=size;
	else
		selectedItem = selectedItem-1;
	cusKeyProcess($trs);
}
//用户按下键
function cusKeyDown(){
	var $cusShowDiv = $("#cusShowDiv");
	var $trs = $cusShowDiv.find("tr");
	var size = -1;
	if($trs==undefined||$trs.size()<=1 )
		return;
	else
		size = $trs.size()-1;
	if(selectedItem==-1||selectedItem==size)
		selectedItem=1;
	else
		selectedItem = selectedItem+1;
	cusKeyProcess($trs);
}
//上下键移动时修改高亮显示的行
function cusKeyProcess($trs){
	$trs.each(function(index,inval){
		if(index==0)return;//第一行表头不处理
		if(index==selectedItem){
			$(this).siblings().removeClass('selectlight'); 
			$(this).addClass('selectlight'); 
			selectedItem = index;
		}
	});
}
