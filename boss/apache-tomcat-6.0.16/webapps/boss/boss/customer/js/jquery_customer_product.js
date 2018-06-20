//---------------------------------------------产品使用变量方法封装-----------------------------------------
var productFunc = new Object();

var PRODUCT_TYPE_SERVICE = "1";//产品类型常量定义：1代表服务，0代表套餐
var PRODUCT_TYPE_COMBO = "0";//产品类型常量定义：1代表服务，0代表套餐
var PRODUCT_SCOPE_BASE = "1";//产品内容常量定义：0代表增值服务, 1代表基本服务
var PRODUCT_SCOPE_VALUABLE = "0";//产品内容常量定义：0代表增值服务, 1代表基本服务


function getProductTypeName(type){
	if(type == PRODUCT_TYPE_SERVICE){
		return WebInitParameter.PRODUCT_TYPE_SERVICE_NAME;
	}else if(type == PRODUCT_TYPE_COMBO){
		return WebInitParameter.PRODUCT_TYPE_COMBO_NAME;
	}
}

function getProductScopeName(type,scope){
	if(type == PRODUCT_TYPE_SERVICE){
		if(scope == PRODUCT_SCOPE_BASE){
			return WebInitParameter.PRODUCT_SERVICE_SCOPE_BASE_NAME;
		}else if(scope == PRODUCT_SCOPE_VALUABLE){
			return WebInitParameter.PRODUCT_SERVICE_SCOPE_VALUABLE_NAME;
		}
	}else if(type == PRODUCT_TYPE_COMBO){
		if(scope == PRODUCT_SCOPE_BASE){
			return WebInitParameter.PRODUCT_COMBO_SCOPE_BASE_NAME;
		}else if(scope == PRODUCT_SCOPE_VALUABLE){
			return WebInitParameter.PRODUCT_COMBO_SCOPE_VALUABLE_NAME;
		}
	}
}


/*产品订购页面显示封装*/
function drawProductDiv(contentId,permitFlag,reflushOrderDIV){
	//画出产品弹出页面
	var productShowContent =  "<div id='base_product_info_title"+contentId+"' class='dialog_title'><span id='base_dialog_close_icon"+contentId+"' class='ui_icon dialog_close_icon'></span></div>"+
	"<table>"+
	"<tr><td><span><input type='radio' name='filter"+contentId+"' checked='checked' id='base_product_all"+contentId+"'/>全部</span><span><input type='radio' name='filter"+contentId+"' id='base_product_top"+contentId+"'  disabled/>订购排名</span><span><input type='radio' id='base_product_part"+contentId+"' name='filter"+contentId+"' />过滤</span><span><span id='filterSpan'>产品名称:<input type='text' class='input_text' id='base_product_filterName"+contentId+"' disabled='disabled'/>类型:<select id='base_product_filterType"+contentId+"' disabled='disabled'><option value='-1'>请选择</option><option value='"+PRODUCT_TYPE_COMBO+"'>"+WebInitParameter.PRODUCT_TYPE_COMBO_NAME+"</option><option value='"+PRODUCT_TYPE_SERVICE+"'>"+WebInitParameter.PRODUCT_TYPE_SERVICE_NAME+"</option></select>计费策略:<input type='text' class='input_text' id='base_product_filterPolicy"+contentId+"' disabled='disabled'/></span></span><span><input type='button' value='搜索' id='base_product_filterSearch"+contentId+"' disabled='disabled'/></span></td></tr>"+
	"<tr><td>"+
	"<table id='base_productTable"+contentId+"'  width='100%' class='tableBorder productTable'>"+
	"<tr><th>选择</th><th>产品简称</th><th>产品名称</th><th>类型</th><th>内容</th><th>策略</th><th>数量</th><th>价格（元）</th><th>周期</th><th>折扣</th><th>实价（元） </th></tr>"+
	"</table>"+
	"</td></tr>"+
	"</table>"+
	"<div><span id='checkGroupPro"+contentId+"'></span><input type='button' id='selectEqu"+contentId+"' value = '选择终端'/></div>"+
	"<div id='productPageBar"+contentId+"'></div>" +
	"<div id='productButtomButtons"+contentId+"'><input type='button' value='确定' id='productAddOrderButton"+contentId+"'/><input type='button' value='取消' id='base_product_info_cancelButton"+contentId+"'/><input type ='hidden' id='base_product_info_equipment_cardNo"+contentId+"'/></div>";
	$("#base_product_info"+contentId).empty().append(productShowContent);
	
	//画出显示订购信息用表格
	var productOrderDiv = "";
	if(contentId == ""){//开户
		productOrderDiv = "<table width='100%' id='selectedBaseProductTable"+contentId+"'  class='tableBorder'>" +
		"<tr><th>选择</th><th>智能卡号</th><th>产品简称</th><th>产品名称</th><th>类型</th><th>内容</th><th>计费策略</th></tr>" +
		"</table>";
	}else{
		productOrderDiv = "<table width='100%' id='selectedBaseProductTable"+contentId+"'  class='tableBorder'>" +
		"<tr><th>详细信息</th><th>产品简称</th><th>产品名称</th><th>类型</th><th>内容</th><th>计费策略</th></tr>" +
		"</table>";
	}
	if(reflushOrderDIV != undefined && reflushOrderDIV != "" && reflushOrderDIV == "0"){
		$("#productOrderDiv"+contentId).empty().append(productOrderDiv);
	}
	
	//画出弹出智能卡选择用表格
	var productEquDiv = "<div class = 'hide select_card_class' id = 'select_equ_div"+contentId+"'>" +
			"<div class='font14'></div><div>" +
			"<table id= 'select_equ_table"+contentId+"' class='tableBorder'></table>" +
			"</div><div id='checkGroupEqu"+contentId+"'></div>" +
			"<div><input type ='button' value='确定' id = 'select_equ_but_selected"+contentId+"'/><input type ='button' value='取消' id = 'select_equ_but_cancel"+contentId+"'/></div>" +
			"</div>";
	if(reflushOrderDIV != undefined && reflushOrderDIV != "" && reflushOrderDIV == "0"){
		$("#productOrderDiv"+contentId).append(productEquDiv);
	}
	
	//画出隐藏订购信息用表格
	var productVarTable = "<div class='"+WebInitParameter.DEBUG_MODE+"'><table id = 'productVar"+contentId+"'></table></div>";
	$("#proVarDiv"+contentId).empty().append(productVarTable);
	
}


//搜索可用方法封装
function searchDis(contentId,bool){
	$("#base_product_filterName"+contentId).attr("disabled",bool);
	$("#base_product_filterType"+contentId).attr("disabled",bool);
	$("#base_product_filterSearch"+contentId).attr("disabled",bool);
	$("#base_product_filterPolicy"+contentId).attr("disabled",bool);
}


//产品信息列表封装
function productTrs (contentId,data,option){
	if(data.code!='0'){
		alert(data.value);
		return;
	}
	var trs = "";
	var policyInfoDiv = "";
	if($(data.value.objList).length == 0){
		trs = "<tr><td colspan = '7'>没有找到相应的产品</td>";
//		return;
	}
	$(data.value.objList).each(function(n,value){
		var outerId = value.id;
		//开始
		trs = trs + "<tr>";
		//前五项
		trs = trs+"<td><input type='checkbox' value='"+value.id+"'/></td><td>"+value.productCode+"</td><td>"+value.productName+"</td><td>"+getProductTypeName(value.productType)+"</td><td>"+getProductScopeName(value.productType,value.productScope)+"</td>";
		//策略
		var policyObj = new Object();
		trs = trs + "<td><select disabled = 'disabled'>";
		$(value.withPolicyList).each(function(n2,value){
			if(n2 == 0){
				policyObj = value;
			}
			trs = trs+"<option value='"+value.id+"'>"+value.policyName+"-"+value.productName+"</option>";
			//策略详细信息
			policyInfoDiv = policyInfoDiv + "<div id = 'product_policy_info_"+value.id+"' class='hide policy_info'>";
			policyInfoDiv = policyInfoDiv + "<table>";
			policyInfoDiv = policyInfoDiv + "<tr><td>策略名称：</td><td>"+value.policyName+"</td></tr>";
			policyInfoDiv = policyInfoDiv + "<tr><td>商品名称：</td><td>"+value.productName+"</td></tr>";
			policyInfoDiv = policyInfoDiv + "<tr><td>续订方式：</td><td>"+value.renewStr+"</td></tr>";
			policyInfoDiv = policyInfoDiv + "<tr><td>退费顺延：</td><td>"+value.postphoneTypeStr+"</td></tr>";
			policyInfoDiv = policyInfoDiv + "<tr><td>依赖策略：</td><td>"+value.relaServiceStr+"</td></tr>";
			policyInfoDiv = policyInfoDiv + "<tr><td>价格（元）：</td><td>"+Number(value.price).toFixed(2)+"</td></tr>";
			policyInfoDiv = policyInfoDiv + "<tr><td>周期：</td><td>"+value.cycle+"</td></tr>";
			policyInfoDiv = policyInfoDiv + "</table>";
			policyInfoDiv = policyInfoDiv + "<input type='hidden' value='"+value.discountRate+"'>";
			policyInfoDiv = policyInfoDiv + "</div>";
		});
		trs = trs + "</select><span class='policy_switch ui_icon policy_info_colse'><input type='hidden' value='"+policyObj.id+"'></span></td>";
		//数量
		trs = trs + "<td><input type='hidden' value='1'><span id='product_order_count_minus' class='clickable pruduct_span'>－</span><input type='text' value='1' class='input_text_short_part' disabled = 'disabled'><span id='product_order_count_add' class='clickable pruduct_span'>＋</span></td> " ;
		//价格、周期、折扣
		trs = trs + "<td>"+Number(policyObj.price).toFixed(2)+"</td><td>"+policyObj.cycle+"</td><td><input type='hidden' value='"+policyObj.discountRate+"'><input type='text' value='10.00' class='input_text_short' disabled = 'disabled'/>折</td>" ;
		//实价
		trs = trs + "<td><input type='hidden' value='"+(Number(policyObj.price)*(Number(policyObj.discountRate)/10.0)).toFixed(2)+"'><input type='text' value='"+Number(policyObj.price).toFixed(2)+"' class='input_text_short' disabled = 'disabled'></td>";
		//结束
		trs = trs + "</tr>";
		
	});
	$("#base_productTable"+contentId).find("tr:not(:first-child)").remove();//删掉原有的数据
	$("#base_productTable"+contentId).append(trs);
	$("#base_productTable"+contentId).after(policyInfoDiv);
	//增加分页标示
	var func = allProductsFunc;
	if($("#base_product_top"+contentId).attr("check")){
		func = topProductsFunc;
	}
	if($("#base_product_part"+contentId).attr("check")){
		func = searchProductsFunc;
	}
	$("#productPageBar"+contentId).pagination(contentId,data.value.currentPage,data.value.totalPage,func,
		{contentId:contentId,permitFlag:option.permitFlag,equNo:option.equNo,slaveType:option.slaveType});
	
	//增加勾选事件
	$("#base_productTable"+contentId).find("tr").click(function(){
		if($(this).find("td").eq(0).find("input").attr("checked")){
			$(this).find("select").attr("disabled",false);
			$(this).find("input[type=text]").attr("disabled",false);
		}else{
			$(this).find("select").attr("disabled",true);
			$(this).find("input[type=text]").attr("disabled",true);
		}
	});
	//增加显示详细策略事件
	$("#base_productTable"+contentId).find(".policy_switch").mouseenter(function(){
		if($(this).prev().attr("disabled"))
			return;
		$(this).addClass("policy_info_open");
		$(this).removeClass("policy_info_close");
		var id = $(this).find("input").val();
		var info = $("#product_policy_info_"+id);
		info.css("top",$(this).position().top+"px");
		info.css("left",($(this).position().left+16)+"px");
		info.fadeIn(500);
	}).mouseout(function(){
		$(this).removeClass("policy_info_open");
		$(this).addClass("policy_info_close");
		var id = $(this).find("input").val();
		var info = $("#product_policy_info_"+id);
		info.css("top",$(this).position().top+"px");
		info.css("left",($(this).position().left+16)+"px");
		info.fadeOut(500);
	});
	//增加更改下拉列表值事件，折扣输入框失去焦点事件，实价输入框失去焦点事件
	$("#base_productTable"+contentId).find("input[type=text]").focus(function(){
			$(this).addClass("text_focus");
		});
	$("#base_productTable"+contentId).find("tr").each(function(){
		var tds = $(this).find("td");
		//下拉列表
		tds.eq(5).find("select").change(function(){
			var policyId = $(this).val();
			var policyDiv = $("#product_policy_info_"+policyId);
			var policyTableTrs = policyDiv.find("table").find("tr");
			//详细信息
			tds.eq(5).find("span").find("input").val(policyId);
			//数量
			tds.eq(6).find("input[type=text]").val(1) ;
			//价格
			tds.eq(7).text(policyTableTrs.eq(5).find("td").eq(1).text());
			//周期
			tds.eq(8).text(policyTableTrs.eq(6).find("td").eq(1).text());
			//折扣隐藏域
			tds.eq(9).find("input[type=hidden]").val(policyDiv.find("input").val());
			//折扣输入框
			tds.eq(9).find("input[type=text]").val(10);
			//最低折价
			tds.eq(10).find("input[type=hidden]").val((Number(policyTableTrs.eq(5).find("td").eq(1).text())*(Number(policyDiv.find("input").val())/10.0)).toFixed(2));
			//实价
			tds.eq(10).find("input[type=text]").val(policyTableTrs.eq(5).find("td").eq(1).text());
		});
		//数量减少"-"操作
		tds.eq(6).find("#product_order_count_minus").click(function(){
			if($(this).next().attr("disabled"))
				return;
			var count = $(this).next().val();
			if(Number(count)<2){
				$(this).next().val(1);
			}else {
				$(this).next().val(Number(count)-1) ;
				$(this).parent().next().next().next().next().find("input[type=text]").val((Number($(this).next().val())*Number($(this).parent().next().text())*Number($(this).parent().next().next().next().find("input[type=text]").val())/10).toFixed(2));
			}
		});
		//数量增加"+"操作
		tds.eq(6).find("#product_order_count_add").click(function(){
			if($(this).prev().attr("disabled"))
				return;
			var count = $(this).prev().val();
			if(Number(count)>100){
				$(this).prev().val(1);
			}else {
				$(this).prev().val(Number(count)+1) ;
				$(this).parent().next().next().next().next().find("input[type=text]").val((Number($(this).prev().val())*Number($(this).parent().next().text())*Number($(this).parent().next().next().next().find("input[type=text]").val())/10).toFixed(2));
			}
		});
		//数量输入框操作
		tds.eq(6).find("input[type=text]").blur(function(){
			$(this).removeClass("text_focus");
			var bool = commonFunc.regexVilidator(false,$(this).val(),WebInitParameter.INPUT_DIGITAL_VILIGATE_REGEX);
			
			if(bool) {
				var count = $(this).val();
				if(Number(count)>100){
					alert("订购数量不能大于100");
					$(this).val(1);
				} else if(Number(count) < 1){
					$(this).val(1) ;
				}else {
					$(this).parent().next().next().next().next().find("input[type=text]").val((Number($(this).val())*Number($(this).parent().next().text())*Number($(this).parent().next().next().next().find("input[type=text]").val())/10).toFixed(2));
				}
			} else {
				alert("输入数量格式不正确");
				$(this).addClass("text_focus");
			}
		});
		//折扣输入框
		tds.eq(9).find("input[type=text]").blur(function(){
			$(this).removeClass("text_focus");
			var discountRate = $(this).prev().val();
			if(Number(discountRate)>Number($(this).val())){
				alert(WebInitParameter.MSG_BUSI_C41);
				$(this).trigger("focus").trigger("select");
			}else if(Number($(this).val())>10){
				alert(WebInitParameter.MSG_BUSI_C42);
				$(this).trigger("focus").trigger("select");
			}else {
				$(this).parent().next().find("input[type=text]").val(Number($(this).parent().prev().prev().prev().find("input[type=text]").val())*((Number($(this).val())/10).toFixed(2)*Number($(this).parent().prev().prev().text())).toFixed(2));
			}
		});
		//实价输入框
		tds.eq(10).find("input[type=text]").blur(function(){
			$(this).removeClass("text_focus");
//			var minValue = $(this).prev().val();
//			if(Number(minValue)>Number($(this).val())){
//				alert(WebInitParameter.MSG_BUSI_C43);
//				$(this).trigger("focus").trigger("select");
//			}else if(Number($(this).val())>$(this).parent().prev().prev().prev().text()){
//				alert(WebInitParameter.MSG_BUSI_C44);
//				$(this).trigger("focus").trigger("select");
//			}else{
//				var discountRate = Number($(this).parent().prev().prev().prev().text())*10;
//				if(discountRate == 0){
//					$(this).parent().prev().find("input[type=text]").val(Number(0.00).toFixed(2));
//				}else{
//					$(this).parent().prev().find("input[type=text]").val((Number($(this).val())/Number($(this).parent().prev().prev().prev().text())*10).toFixed(2));
//				}
//			}
			$(this).val((Number($(this).parent().prev().prev().prev().prev().find("input[type=text]").val())*Number($(this).parent().prev().prev().prev().text()).toFixed(2)*Number($(this).parent().prev().find("input[type=text]").val()).toFixed(2)/10).toFixed(2));
		});
	});
}

// 宽带产品信息列表封装  add by jhg
function bwServsTrs (contentId,data){
	bwServiceDescMap = new Map();
	if(data.code!='0'){
		alert(data.value);
		return;
	}
	var bandwidthCombox = "<option value ='0'>请选择</option>";
	if($(data.value.objList).length == 0){
		$("#setBandWidthProductBoxType_"+contentId).append(bandwidthCombox);
	}
	$(data.value.objList).each(function(n,value){
		var serviceID = value.serviceID;
		var serviceDesc = value.serviceDesc;
		// add by jhg 2012-08-10 宽带产品显示产品名称
		var bwProName = value.productName;
		$(value.withPolicyList).each(function(n2,value){
			bandwidthCombox = bandwidthCombox + "<option value='"+value.id+"_"+Number(value.price).toFixed(2)+"_"+serviceID+"'>"+bwProName+"-"+value.productName+"</option>";
			bwServiceDescMap.put(value.id+"_"+Number(value.price).toFixed(2)+"_"+serviceID,serviceDesc);
		});
	});
	$("#setBandWidthProductBoxType_"+contentId).append(bandwidthCombox);
	$("#setModifyBandWidthProductBoxType_"+contentId).append(bandwidthCombox);
}

//为分页提出的方法，参数0非分页调用，，非0，分页调用。
function allProductsFunc(option){
	var contentId = option.contentId,newPage = option.newPage;
	var areaLevel1 = $("#customer_areaLevel1"+contentId).val();
	if(areaLevel1 == null){
		areaLevel1 = -1;
	}
	var areaLevel2 = $("#customer_areaLevel2"+contentId).val();
	if(areaLevel2 == null){
		areaLevel2 = -1;
	}
	var areaLevel3 = $("#customer_areaLevel3"+contentId).val();
	if(areaLevel3 == null){
		areaLevel3 = -1;
	}
	var currentPage;
	if(newPage == 0 ){
		currentPaqe = 1;
	}else{
		currentPaqe = $("#currentPage"+contentId).text();
	}
	var ajaxResObj = {
			product_pageNoAll:currentPaqe,
			product_permit:option.permitFlag,
			product_equNo:option.equNo,
			product_userId:contentId,
			product_slaveType:option.slaveType,
			product_areaLevel1:areaLevel1,
			product_areaLevel2:areaLevel2,
			product_areaLevel3:areaLevel3
	};
	ovtAjaxMethod(ajaxProPath+"ajaxGetAllProducts.do",ajaxResObj,function(data){
		productTrs (contentId,data,option);
	});
}

//不分页调用的方法，参数为0非分页调用，获取缓存中的宽带产品信息 add by jhg
function allBwServsFunc(option){
	var contentId = option.contentId,newPage = option.newPage;
	// 如果不实时刷新,只加载一次
	var bwSelect = $("#setBandWidthProductBoxType_"+contentId).children();
	var modifyBwSelect = $("#setModifyBandWidthProductBoxType_"+contentId).children();
	if(bwSelect.length > 0 && modifyBwSelect.length > 0){
		return;
	}
	// 如果要实时刷新,先清空
	//	$("#setBandWidthProductBoxType_"+contentId).empty();
	//	$("#setModifyBandWidthProductBoxType_"+contentId).empty();
	var ajaxResObj = {
			product_pageNoAll:0
	};
	ovtAjaxMethod(ajaxProPath+"ajaxGetAllBwServs.do",ajaxResObj,function(data){
		bwServsTrs(contentId,data);
	});
}

//订购排名显示
function topProductsFunc(option){
	var contentId = option.contentId,newPage = option.newPage;
	var currentPage;
	if(newPage == 0 ){
		currentPaqe = 1;
	}else{
		currentPaqe = $("#currentPage"+contentId).text();
	}
	var ajaxResObj = {
			product_pageNoTop:currentPaqe
	};
	ovtAjaxMethod(ajaxProPath+"ajaxGetTopProducts.do",ajaxResObj,function(data){
		productTrs (contentId,data,option);
	});
}

//得到产品列表
function searchProductsFunc(option){
	var contentId = option.contentId,newPage = option.newPage;
	var currentPage;
	if(newPage == 0 ){
		currentPaqe = 1;
	}else{
		currentPaqe = $("#currentPage"+contentId).text();
	}
	var filterValue = {
			product_filterName:$("#base_product_filterName"+contentId).val(),
			product_filterType:$("#base_product_filterType"+contentId).val(),
			product_filterPolicy:$("#base_product_filterPolicy"+contentId).val(),
			product_pageNoSearch:currentPaqe,
			product_permit:option.permitFlag,
			product_equNo:option.equNo,
			product_userId:contentId,
			product_slaveType:option.slaveType
		};
	ovtAjaxMethod(ajaxProPath+"ajaxSearchProducts.do",filterValue,function(data){
			productTrs (contentId,data,option);
	});
}


/*根据隐藏产品信息更新订购产品列表*/
function flushProducts(contentId){
	var $productVar = $("#productVar"+contentId);

	var productInfoContent = "";
	
	$productVar.children("tbody").children("tr").each(function(){
		var $varTds = $(this).children("td");
		productInfoContent = productInfoContent + "<tr>";
		if(contentId ==""){//开户
			productInfoContent = productInfoContent + "<td><input type='checkbox' value='"+$varTds.eq(0).text()+"'/></td>";
			productInfoContent = productInfoContent + "<td>"+$varTds.eq(1).html()+"</td>";
		}else{
			productInfoContent = productInfoContent + "<td>"+$varTds.eq(10).html()+"</td>";
		}
		productInfoContent = productInfoContent + "<td>"+$varTds.eq(2).text()+"</td>";
		productInfoContent = productInfoContent + "<td>"+$varTds.eq(3).text()+"</td>";
		productInfoContent = productInfoContent + "<td>"+$varTds.eq(4).text()+"</td>";
		productInfoContent = productInfoContent + "<td>"+$varTds.eq(5).text()+"</td>";
		productInfoContent = productInfoContent + "<td>"+$varTds.eq(6).text()+"</td>";
		productInfoContent = productInfoContent + "</tr>";
	});
	$("#selectedBaseProductTable"+contentId).find("tr:not(:first-child)").remove();
	$("#selectedBaseProductTable"+contentId).append(productInfoContent);
	
	if(contentId != ""){//如果不是开户取消选中状态和无效状态
		$("#selectedBaseProductTable"+contentId).find("input").attr("checked",false).attr("disabled",false);
	}
}
/*根据选择订购信息，刷新隐藏表*/
function flushProductVar(contentId){
	alert("asfdadsf");
	var $selectPro = $("#base_productTable"+contentId).find("tr:has(:checked)");
	var $equTrs = $("#select_equ_table"+contentId).find("tr:has(:checked)");
	var $productVar = $("#productVar"+contentId);
	if($equTrs.length==0){
		alert(WebInitParameter.MSG_EQU_C11);
		return false;
	}
	var productVarContent = "";
	
	var addProductVarArr = new Array();
	var flag = true;
	$selectPro.each(function(){
		var $selectTrs = $(this);
		var $selectTds = $selectTrs.find("td");
		var productId = $selectTds.eq(0).find("input").val();
		flag = true;
		$productVar.find("tr").each(function(){
			if($(this).find("td").eq(0).text()==productId){//如果相等，则表示已经添加过该产品，
				flag = false;//表示添加过该产品，清除原有的内容，变为现在的内容
				var equNos = new Array();
				productVarContent = "" ;
				$equTrs.each(function(){
					productVarContent = productVarContent+"<div>"+$(this).find("td").eq(1).html()+"</div>";
					equNos.push($(this).find("td").eq(0).find("input").val());
				});
				$(this).find("td").eq(1).html(productVarContent);
				$(this).find("td").eq(6).text($selectTds.eq(5).find("option:selected").text());
				$(this).find("td").eq(7).text(productId+","+$selectTds.eq(5).find("select").val()+","+$selectTds.eq(6).text()+","+$selectTds.eq(8).find("input[type=text]").val()+","+$selectTds.eq(9).find("input[type=text]").val());
				$(this).find("td").eq(8).text(equNos.join());
			}
		});
		if(flag){//全新的产品，直接添加
			var equNos = new Array();
			productVarContent = "<tr><td>"+productId+"</td>" ;
			productVarContent = productVarContent+"<td>";
			$equTrs.each(function(){
				productVarContent = productVarContent+"<div>"+$(this).find("td").eq(1).html()+"</div>";
				equNos.push($(this).find("td").eq(0).find("input").val());
			});
			productVarContent = productVarContent+"</td>";
			productVarContent = productVarContent+"<td>"+$selectTds.eq(1).text()+"</td>" +
					"<td>"+$selectTds.eq(2).text()+"</td>" +
					"<td>"+$selectTds.eq(3).text()+"</td>" +
					"<td>"+$selectTds.eq(4).text()+"</td>" +
					"<td>"+$selectTds.eq(5).find("option:selected").text()+"</td>" +
					"<td>"+productId+","+$selectTds.eq(5).find("select").val()+","+$selectTds.eq(6).text()+","+$selectTds.eq(8).find("input[type=text]").val()+","+$selectTds.eq(9).find("input[type=text]").val()+"</td>"+
					"<td>"+equNos.join()+"</td></tr>" ;
			$productVar.append(productVarContent);
		}
	});
	return true;
}


/*根据订购信息刷新设备信息表*/
function flushProductEquipment(contentId){
	var $selectPro = $("#base_productTable"+contentId).find("tr:has(:checked)");
	var $equTrs = $("#selectedEquipmentTable"+contentId).find("tr:has(:checked)");
	var $productVar = $("#productVar"+contentId);
	if($equTrs.length==0){
		alert(WebInitParameter.MSG_EQU_C11);
		return false;
	}
	var productVarContent = "";
}

/*根据查询订购信息，刷新隐藏变量表*/
function flushOrder2Var(contentId,userId,callbackFunc,isShowMsg,isNormal){
	var ajaxProRes = {
			customer_id:userId
	};
	if(isShowMsg == undefined)
		showMsg("查询订购信息");
	if(isNormal != undefined)
		ajaxProRes.notNormal = 0;
	ovtAjaxMethod(ajaxProPath+"ajaxSearchUserProducts.do",ajaxProRes,function(data){
//		alert("data.code："+data.code);
		if(data.code != '0'){
			alert(data.value);
			hideMsg();
			return;
		}
		var $productVar = $("#productVar"+contentId);
//		var $equVar = $("#equVar"+contentId);
//		var map = new Map();
//		$equVar.children("tbody").children("tr").each(function(){
//			map.put($(this).find("td").eq(1).text(),$(this).find("td").eq(1).text() +"&nbsp;"+$(this).find("td").eq(7).text());
//		});
		
		var content = "";
		$(data.value).each(function(n,value){
			var equNos = new Array();
			var equIds = new Array();
			var equNoIds = new Array();
			var productVarContent = "" ;
			var orderStatus = "";
			var disabled = "";
	//		alert("value.id++$(value.userOrderList)："+value.id+"++"+$(value.userOrderList).length);
			orderStatus = "<table class ='orderTableBorder' width='100%'>";
			orderStatus = orderStatus + "<tr><th width='5%'>选择</th><th width='25%'>智能卡号</th><th width='10%'>订购状态</th><th width='8%'>数量</th><th width='15%'>订购费用(元)</th><th width='13%'>订购时间</th><th width='13%'>生效时间</th><th width='13%'>失效时间</th></tr>"
			$(value.userOrderList).each(function(n,inValue){
				var equNo = inValue.equNo;
				equIds.push(inValue.id);
				equNoIds.push(inValue.id+"_"+inValue.equNo);
				var equName = "";
//				$equVar.find("tr").each(function(){
//					if(equNo == $(this).find("td").eq(1).text()){
//						equName = equNo+"&nbsp;"+$(this).find("td").eq(7).text();
//						return false;//跳出
//					}
//				});
//				equName = equNo+"&nbsp;"+$(".equVar_"+inValue.equNo).text();//从隐藏设备表拿到信息
//				equName = map.get(equNo);
				equName = equipmentFunc.equNameMap.get(userId,equNo);
				productVarContent = productVarContent+"<div>"+equName+"</div>";
				disabled = WebInitParameter.ORDER_STATUS_APPLY == inValue.status ? "checked" : "disabled";
				if(disabled == "disabled"){
					disabled = WebInitParameter.ORDER_STATUS_STOP == inValue.status ? "checked" : "disabled";
				}
				orderStatus = orderStatus + "<tr><td><input type = 'checkbox' value='"+inValue.id+"' "+disabled+" /></td><td>"+equName+"</td><td>"+inValue.statusStr+"</td><td>"+inValue.count+"</td><td>"+inValue.currLockMoney+"</td><td>"+inValue.orderTimeStr+"</td><td>"+inValue.effectiveDateStr+"</td><td>"+inValue.expiryDateStr+"</td></tr>";
				equNos.push(equNo);
			});
			orderStatus = orderStatus + "</table>";
			content = content + "<tr><td>"+value.id+"</td><td>"+productVarContent+"</td><td>"+value.productCode+"</td><td>"+value.productName+"</td><td>"+getProductTypeName(value.productType)+"</td><td>"+getProductScopeName(value.productType,value.productScope)+"</td><td>"+value.policyName+"</td><td>"+equNos.join()+"</td><td>"+equIds.join()+"</td><td>"+equNoIds.join()+"</td><td>"+orderStatus+"</td></tr>"
		});
//		alert(content);
		$productVar.empty().append(content);
		if(isShowMsg == undefined)
			hideMsg()
		//根据变量信息刷新订购信息
//		flushProducts(contentId);
		callbackFunc(contentId);
		
	});
}

/*根据隐藏表，得到订购信息字符串----订购使用*/
function getProductFromVar(contentId){
	var $productVar = $("#productVar"+contentId);
	var ret = "";
	$productVar.children("tbody").children("tr").each(function(){
		ret = ret + $(this).children("td").eq(7).text()+":";
		ret = ret + $(this).children("td").eq(8).text();
		ret = ret + "&";
	});
	return ret;
}
/*根据隐藏表，得到订购信息字符串----退订使用*/
function getOrdersFromVar(contentId){
	var $productVar = $("#productVar"+contentId);
	var ret = "";
	$productVar.find("tr").each(function(){
		ret = ret + $(this).find("td").eq(0).text()+":";
		ret = ret + $(this).find("td").eq(9).text();
		ret = ret + "&";
	});
	return ret;
}

/*订购信息抽象方法*/
productFunc.productCommonInit = function (contentId,permitFlag,equNo,slaveType){
	/*允许拖拽*/
	$("#base_product_info_title"+contentId).drag("#base_product_info"+contentId);  
	
	//得到全部产品信息
	$("#base_product_all"+contentId).click(function(){
		searchDis(contentId,true);
		allProductsFunc({contentId:contentId,newPage:0,permitFlag:permitFlag,equNo:equNo,slaveType:slaveType});
	});

	//模拟点击全部按钮
	$("#base_product_all"+contentId).trigger("click");
	
	
	//得到订购排名
	$("#base_product_top"+contentId).click(function(){
		searchDis(contentId,true);
		topProductsFunc({contentId:contentId,newPage:0});
	});
	
	//过滤信息
	$("#base_product_part"+contentId).click(function(){
		searchDis(contentId,false);
	});
	
	//搜索按钮
	$("#base_product_filterSearch"+contentId).click(function(){
		searchProductsFunc({contentId:contentId,newPage:0,permitFlag:permitFlag,equNo:equNo,slaveType:slaveType});
	});
	
	
	
	/*产品订购页面的取消按钮方法*/
	$("#base_product_info_cancelButton"+contentId).click(function(){
		$("#base_product_info"+contentId).addClass("hide");
		$("#mask").toggle();
	});
	/*产品订购页面的关闭图标方法*/
	$("#base_dialog_close_icon"+contentId).click(function(){
		$("#base_product_info"+contentId).addClass("hide");
		$("#mask").toggle();
	});
	
	
	$("#checkGroupPro"+contentId).checkGroup("Product"+contentId,$("#base_productTable"+contentId));
}

//-----------------------------------------------------------------------------------订购显示类型1----------------------------------------------------------------

/*产品初始化*/
function productInit(contentId){
	
	drawProductDiv(contentId);

	//设备表头
	$("#selectedEquipmentTable"+contentId).append("<tr id='selectedEquipmentTable_top'><th>选择</th><th>智能卡号</th><th>终端名称</th><th>机顶盒号</th><th>来源</th><th>机卡绑定</th></tr>");
	
	productFunc.productCommonInit(contentId);
	
	
	/*购买产品选择终端弹出页面*/
	$("#selectEqu"+contentId).click(function(){
		var $selectEquDiv = $("#select_equ_div"+contentId);
		var $selectPro = $("#base_productTable"+contentId).find("tr:has(:checked)");
		var $equTrs = $("#equVar"+contentId).find("tr");
		var content = "";
		//如果没有终端，则弹出提示，返回
		if($equTrs.length==0){
			alert(WebInitParameter.MSG_EQU_C14);
			return;
		}
		//如果没有 选择产品，则弹出提示，返回
		if($selectPro.length==0){
			alert(WebInitParameter.MSG_INFO_C05);
			return;
		}
		
		$equTrs.each(function(){
			var $equTds = $(this).find("td");
			if($equTds.eq(2).text()!=""){
				content = content + "<tr><td><input type='checkbox' value='"+$equTds.eq(1).text()+"' /></td><td>";
				if($equTds.eq(3).text()!="0"){
					content = content + "<span class='ui_icon secondary_icon'></span>" + $equTds.eq(1).text()+"&nbsp;"+$equTds.eq(7).text();
				}else{
					content = content + $equTds.eq(1).text()+"&nbsp;"+$equTds.eq(7).text();
				}
				content = content + "</td></tr>";
			}
		});
//		$(equipmentFunc.equVar.getValue(customerId).value).each(function(){
//			content = content + "<tr><td><input type='checkbox' value='"+this.icNo+"' /></td><td>";
//			if(this.equSlaveType!="0"){
//				content = content + "<span class='ui_icon secondary_icon'></span>" + this.icNo+"&nbsp;"+this.equSlaveName;
//			}else{
//				content = content + this.icNo + "&nbsp;"+this.equSlaveName;
//			}
//			content = content + "</td></tr>";
//		});
		$("#select_equ_table"+contentId).empty().append(content);
		
		//增加选择栏
		$("#checkGroupEqu"+contentId).checkGroup("Equ"+contentId,$("#select_equ_table"+contentId));
		//增加滚动条
		productFunc.setEquSelectedTableScroll(contentId);

		$selectEquDiv.locateCenter();
		$selectEquDiv.find(".font14").text(WebInitParameter.MSG_EQU_C11);
		$selectEquDiv.removeClass("hide");
	})

	
	/*购买产品选择终端弹出页面--取消按钮响应方法*/
	$("#select_equ_but_cancel"+contentId).click(function(){
		$("#select_equ_div"+contentId).addClass("hide");
	});

}

//-----------------------------------------------------------------------------------订购显示类型2----------------------------------------------------------------
/*产品初始化*/
function productInit2(contentId){
	
	drawProductDiv(contentId);

	//显示隐藏信息
	$("#product_base_title"+contentId).addClass("hide");
	$("#product_base_info"+contentId).addClass("hide");
	//设备表头
	$("#selectedEquipmentTable"+contentId).append("<tr id='selectedEquipmentTable_top'><th>选择</th><th>智能卡号</th><th>终端名称</th><th>机顶盒号</th><th>来源</th><th>机卡绑定</th><th width='50%'>订购信息</th></tr>");

	productFunc.productCommonInit(contentId);
	
	
	/*订购页面确定按钮响应方法*/
	$("#productAddOrderButton"+contentId).click(function(){
//		alert("^_^");
		var $selectPro = $("#base_productTable"+contentId).children("tbody").children("tr:has(:checked)");
		//如果没有 选择产品，则弹出提示，返回
		if($selectPro.length==0){
			alert(WebInitParameter.MSG_INFO_C05);
			return;
		}
		var $checkeds = $("#selectedEquipmentTable").children("tbody").children("tr:has(:checked)");
		if($checkeds.length==0){
			alert(WebInitParameter.MSG_EQU_C11);
			return;
		}
		$checkeds.each(function(n,value){
			var $equTds = $(this).children("td");
			//得到原有的订购信息
			var $td8 = $("#equVar_"+$equTds.eq(1).text()).find("td").eq(8);
			if( $td8.length == 0){
				var tdContent = "<td><table class ='orderTableBorder' width='100%'>";
				tdContent = tdContent +　"<tr><th width = '5%'></th><th width='14%'>产品简称</th><th width='37%'>产品名称</th><th width='8%'>类型</th><th width='18%'>内容</th><th width='18%'>计费策略</th></tr>";
				var equVarOrderArr = new Array();
				$selectPro.each(function(){
					var $proTds = $(this).children("td");
					tdContent = tdContent + "<tr>";
					tdContent = tdContent + "<td>"+"<input type='checkbox' value='"+$proTds.eq(0).find("input").val()+"'></td>";
					tdContent = tdContent + "<td>"+$proTds.eq(1).text()+"</td>";
					tdContent = tdContent + "<td>"+$proTds.eq(2).text()+"</td>";
					tdContent = tdContent + "<td>"+$proTds.eq(3).text()+"</td>";
					tdContent = tdContent + "<td>"+$proTds.eq(4).text()+"</td>";
					tdContent = tdContent + "<td>"+$proTds.eq(5).find("option:selected").text()+"</td>";
					tdContent = tdContent + "</tr>";
//					equVarOrderArr.push($proTds.eq(0).find("input").val()+","+$proTds.eq(5).find("select").val()+","+$proTds.eq(6).text()+","+$proTds.eq(8).find("input[type=text]").val()+","+$proTds.eq(9).find("input[type=text]").val());
					equVarOrderArr.push($proTds.eq(0).find("input").val()+","+$proTds.eq(5).find("select").val()+","+$proTds.eq(6).find("input[type=text]").val()+","+$proTds.eq(7).text()+","+$proTds.eq(9).find("input[type=text]").val()+","+$proTds.eq(10).find("input[type=text]").val());
				});
				tdContent = tdContent + "</table></td>";
				$equTds.eq(6).remove();//如果有，则先删除
				$(this).append(tdContent);
//				$("#equVar_"+$equTds.eq(1).text()).find("td").eq(8).remove();//如果有，则先删除
				$("#equVar_"+$equTds.eq(1).text()).append("<td>"+equVarOrderArr.join("$")+"</td>");//保存到隐藏变量区
			}else{
				var hasOrderArr = $td8.text().split("$");
				$selectPro.each(function(){
					var $proTds = $(this).children("td");
					var productId = $proTds.eq(0).find("input").val();
					for(var i = 0;i<hasOrderArr.length; i++){
						if(productId == hasOrderArr[i].split(",")[0]){
							return;
						}
					}
					tdContent = "";
					tdContent = tdContent + "<tr>";
					tdContent = tdContent + "<td>"+"<input type='checkbox' value='"+$proTds.eq(0).find("input").val()+"'></td>";
					tdContent = tdContent + "<td>"+$proTds.eq(1).text()+"</td>";
					tdContent = tdContent + "<td>"+$proTds.eq(2).text()+"</td>";
					tdContent = tdContent + "<td>"+$proTds.eq(3).text()+"</td>";
					tdContent = tdContent + "<td>"+$proTds.eq(4).text()+"</td>";
					tdContent = tdContent + "<td>"+$proTds.eq(5).find("option:selected").text()+"</td>";
					tdContent = tdContent + "</tr>";
					$equTds.eq(6).find("table").append(tdContent);
//					hasOrderArr.push($proTds.eq(0).find("input").val()+","+$proTds.eq(5).find("select").val()+","+$proTds.eq(6).text()+","+$proTds.eq(8).find("input[type=text]").val()+","+$proTds.eq(9).find("input[type=text]").val());
					// --- 2011/12/01 -- 增加数量 -- liuyajie
					hasOrderArr.push($proTds.eq(0).find("input").val()+","+$proTds.eq(5).find("select").val()+","+$proTds.eq(6).find("input[type=text]").val()+","+$proTds.eq(7).text()+","+$proTds.eq(9).find("input[type=text]").val()+","+$proTds.eq(10).find("input[type=text]").val());
				});
				$td8.text(hasOrderArr.join("$"));
			}
		});
		$("#base_product_info"+contentId).addClass("hide");
		$("#mask").toggle();
	});
}

//-----------------------------------------------------------------------------------订购显示类型3----------------------------------------------------------------
/*产品初始化*/ 
/* modify by jhg 2013-06-20 增加参数
 * permitFlag 是否使用订购限制策略，0不使用，1使用
 * equNo 操作的智能卡号
 * slaveType 操作的智能卡终端序号，比如：0主终端，1第一副终端
 * reflushOrderDIV 是否刷新订购页面数据，0刷新，1 不刷新
 */
function productInit3(contentId,customerId,permitFlag,equNo,slaveType,reflushOrderDIV){
	
	drawProductDiv(contentId,permitFlag,reflushOrderDIV);

	//显示隐藏信息
	$("#product_base_title"+contentId).addClass("hide");
	$("#product_base_info"+contentId).addClass("hide");
	//设备表头
	$("#selectedEquipmentTable"+contentId).append("<tr id='selectedEquipmentTable_top'><th>选择</th><th>智能卡号</th><th>终端名称</th><th>机顶盒号</th><th>来源</th><th>机卡绑定</th><th width='50%'>订购信息</th></tr>");

	productFunc.productCommonInit(contentId,permitFlag,equNo,slaveType);
	
	/*订购页面确定按钮响应方法*/
	$("#productAddOrderButton"+contentId).click(function(){
//		alert("^_^");
		var $selectPro = $("#base_productTable"+contentId).find("input:checked");
		//如果没有 选择产品，则弹出提示，返回
		if($selectPro.length==0){
			alert(WebInitParameter.MSG_INFO_C05);
			return;
		}
		
		var cardNo = equNo;
		if(cardNo == ""){
			cardNo = $("#base_product_info_equipment_cardNo"+contentId).val();	
		}
//		alert($("#base_productTable"+contentId).html());
//		alert($selectPro.html());
		var customerOrder = "";
		$selectPro.each(function(){
			var tds = $(this).parent().parent().find("td");
			//增加用户订购增加数量--2011/11/29 --- liuyajie重写
			customerOrder = customerOrder + $(this).val() + "," +tds.eq(5).find("select").val()+","+tds.eq(7).text()+","+tds.eq(6).find("input[type=text]").val()+","+tds.eq(9).find("input[type=text]").val()+","+tds.eq(10).find("input[type=text]").val()+":";
			customerOrder = customerOrder + cardNo + ",";
			customerOrder = customerOrder + "&";
		});
		var areaLevel1 = $("#customer_areaLevel1_"+customerId).val();
		if(areaLevel1 == null){
			areaLevel1 = -1;
		}
		var areaLevel2 = $("#customer_areaLevel2_"+customerId).val();
		if(areaLevel2 == null){
			areaLevel2 = -1;
		}
		var areaLevel3 = $("#customer_areaLevel3_"+customerId).val();
		if(areaLevel3 == null){
			areaLevel3 = -1;
		}
		var ajaxProduct = {
				customer_id:customerId,
				// add by jhg 2012-03-23 处理用户订购时增加片区信息
				areaLevelId1:areaLevel1,
				areaLevelId2:areaLevel2,
				areaLevelId3:areaLevel3,
				customerOrder:customerOrder
		};
		$(this).attr("disabled",true);//置灰
		ovtAjaxMethod(ajaxProPath+"ajaxDoUserOrder.do",ajaxProduct,function(data){
			var skipFlag = false;
//			if(data.code != '0'){
//				alert(data.value);
//			}
			if(equipmentFunc.operConfirm1("equCommand",data.value + "请进入缴费页面进行缴费!")){
				skipFlag = true;
			}
			$("#productAddOrderButton"+contentId).attr("disabled",false);//恢复
			$("#base_product_info"+contentId).addClass("hide");
			$("#mask").toggle();
//			flushOrder();//刷新订购信息
			flushCustomerEqu(contentId,customerId);
			if(skipFlag) {
				$("#common_bar_but_payment"+contentId).trigger("click");
			}
		});
		
	});
	

	/*购买产品选择终端弹出页面*/
	$("#selectEqu"+contentId).click(function(){
		var $selectEquDiv = $("#select_equ_div"+contentId);
		var $selectPro = $("#base_productTable"+contentId).find("tr:has(:checked)");
//		var $equTrs = $("#equVar"+contentId).find("tr");
//		var $equTrs = $("#equVar"+contentId).children("tbody").children("tr");
		var content = "";
		//如果没有终端，则弹出提示，返回
		if(equipmentFunc.equVar.getValue(customerId).value.length==0){
			alert(WebInitParameter.MSG_EQU_C14);
			return;
		}
		//如果没有 选择产品，则弹出提示，返回
		if($selectPro.length==0){
			alert(WebInitParameter.MSG_INFO_C05);
			return;
		}
		
		//判断该智能卡状态是否可以订购
		var icValidStatusArr = WebInitParameter.IC_VALID_VALUE.split(",");

//		$equTrs.each(function(){
//			var $equTds = $(this).children("td");
//			var icStatus = $equTds.eq(11).text();
//			var flag = false;
//			for(var i=0;i<icValidStatusArr.length;i++){
//				if(icStatus==icValidStatusArr[i]){
//					flag = true;
//					break;
//				}
//			}
//			if(!flag){
//				return;
//			}
//
//			content = content + "<tr><td><input type='checkbox' value='"+$equTds.eq(1).text()+"' /></td><td>";
//			if($equTds.eq(3).text()!="0"){
//				content = content + "<span class='ui_icon secondary_icon'></span>" + $equTds.eq(1).text()+"&nbsp;"+$equTds.eq(7).text();
//			}else{
//				content = content + $equTds.eq(1).text()+"&nbsp;"+$equTds.eq(7).text();
//			}
//			content = content + "</td></tr>";
//		});
//		
		$(equipmentFunc.equVar.getValue(customerId).value).each(function(){
			
			var icStatus = this.icStatus;
			var flag = false;
			for(var i=0;i<icValidStatusArr.length;i++){
				if(icStatus==icValidStatusArr[i]){
					flag = true;
					break;
				}
			}
			if(!flag){
				return;
			}
			if(this.icNo==""){
				return;
			}
			content = content + "<tr><td><input type='checkbox' value='"+this.icNo+"' /></td><td>";
			if(this.equSlaveType!="0"){
				content = content + "<span class='ui_icon secondary_icon'></span>" + this.icNo +"&nbsp;"+this.equSlaveName;
			}else{
				content = content + this.icNo+"&nbsp;"+this.equSlaveName;
			}
			content = content + "</td></tr>";

		});
		
		
		$("#select_equ_table"+contentId).empty().append(content);
		
		if($("#select_equ_table"+contentId).find("tr").length == 0){
			alert(WebInitParameter.MSG_EQU_C18);
			return;
		}
		
		//增加选择栏
		$("#checkGroupEqu"+contentId).checkGroup("Equ"+contentId,$("#select_equ_table"+contentId));
		
		//增加滚动条
		productFunc.setEquSelectedTableScroll(contentId);
		
		$selectEquDiv.locateCenter();
		$selectEquDiv.find(".font14").text(WebInitParameter.MSG_EQU_C11);
		$selectEquDiv.removeClass("hide");
		
	})

	
	/*购买产品选择终端弹出页面--取消按钮响应方法*/
	$("#select_equ_but_cancel"+contentId).click(function(){
		$("#select_equ_div"+contentId).addClass("hide");
	});

}

/*订购形式展现*/
function orderInit(contentId){
	if(WebInitParameter.ORDER_VIEW_TYPE_V1 == WebInitParameter.ORDER_VIEW_TYPE){
		productInit(contentId);
		productFunc.setOrderViewTypeV1(contentId);
	}else if(WebInitParameter.ORDER_VIEW_TYPE_V2 == WebInitParameter.ORDER_VIEW_TYPE){
		productInit2(contentId);
		productFunc.setOrderViewTypeV2(contentId);
	}
}

productFunc.setOrderViewTypeV1 = function(contentId){
	/*隐藏订购模式2中的添加产品按钮*/
	$("#addBaseProductButtonInEquipment"+contentId).addClass("hide");
	/*隐藏确定，取消按钮*/
	$("#productButtomButtons"+contentId).addClass("hide");
	
	/*显示选择终端按钮*/
	$("#selectEqu"+contentId).removeClass("hide");
	
	productFunc.clearSelected(contentId);
}
productFunc.setOrderViewTypeV2 = function(contentId){
	/*隐藏选择终端按钮*/
	$("#selectEqu"+contentId).addClass("hide");
	/*显示增加产品按钮*/
	$("#addBaseProductButtonInEquipment"+contentId).removeClass("hide");
	/*显示确定，取消按钮*/
	$("#productButtomButtons"+contentId).removeClass("hide");
	productFunc.clearSelected(contentId);
}


productFunc.setEquSelectedTableScroll = function(contentId){
	var equSelectedTableParent = $("#select_equ_table"+contentId).parent();
	if(equSelectedTableParent.find("table").find("tr").length> WebInitParameter.EQU_SELECTED_COUNT){
		equSelectedTableParent.css("height",Number(WebInitParameter.EQU_SELECTED_COUNT)*22.5+"px");//计算高度
		equSelectedTableParent.css("overflow-y","scroll");
		equSelectedTableParent.width(equSelectedTableParent.width()+17);
	}
}

/*去掉所有勾选的信息*/
productFunc.clearSelected = function(contentId){
	var $table = $("#base_productTable"+contentId);
	$table.find(":checked").attr("checked",false);
}
