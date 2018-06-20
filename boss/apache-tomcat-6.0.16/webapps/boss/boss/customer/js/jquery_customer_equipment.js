//----------------------------------------------刷新隐藏设备信息----------------------------------------------------
var equipmentFunc = new Object();
equipmentFunc.equNameMap = new UserMap();//保存设备号码和名称对应的map
equipmentFunc.equVar = new UserMap();//保存设备关系信息
// 缓存退订记录信息MAP add by jhg 2013-03-26
equipmentFunc.cancelOrderMap = new UserMap();
// 缓存终端属性 add by jhg 2013-06-21
equipmentFunc.orderEquSlaveMap = new UserMap();
// 缓存选择订购记录信息MAP add by jhg 2013-07-23
equipmentFunc.checkOrderMap = new UserMap();
// 缓存智能卡设备信息,key 用户Id+智能卡号 add by jhg 2013-08-22
equipmentFunc.icCardVarInfo = new UserMap();
// 缓存机顶盒设备信息,key 用户Id+机顶盒号 add by jhg 2013-08-22
equipmentFunc.stbBoxVarInfo = new UserMap();
// 终端订购参数
var orderParamStr = "";
// 终端订购序号参数
var supplyOrderSeq = "";
// 费用补交订购参数
var repairOrderSeq = "";
var repairOrderParam = "";

//刷新隐藏设备信息
function flushCustomerEqu(contentId,customerId,callbackFunc){
	//数据量大,首先遮挡
//	$("#equMask").removeClass("hide");
	showMsg("设备查询");
	var searchRes = {
			customer_id:customerId
	};
	var ajaxPath = getEquipmentAjaxPath(); //得到请求地址
	ovtAjaxMethod(ajaxBusPath+ajaxPath,searchRes,function(data){
		$("#equipmentTable"+contentId).find("tr:not(:first-child)").remove();
		var equipmentContent = "";
		if(data.code != "0"){
			alert(data.value);
			hideMsg();
			return;
		}
		var tableHeader = getEquipmentTableHeader(); //得到表头信息
		$("#equipmentTable"+contentId).empty().append(tableHeader);
		//清空map中的数据
		equipmentFunc.equNameMap.clearCustomer(customerId);
		equipmentFunc.equVar.clearCustomer(customerId);
		// add by jhg 2013-06-21 缓存终端属性
		equipmentFunc.orderEquSlaveMap.clearCustomer(customerId);
		equipmentFunc.icCardVarInfo.clearCustomer(customerId);
		equipmentFunc.stbBoxVarInfo.clearCustomer(customerId);
		if($(data.value).length==0){
			equipmentContent = "<tr><td colspan = '10'>没有该用户的设备信息</td></tr>";
		}else{
			
			var bindingType = "";
			var equVar = "";//保存隐藏的设备关系
			var equSlaveName = "";
			var equGroupMaxNum = 0;
			//得到用户类型
			var userType = $("#customer_customerType"+contentId).val();
			
			$(data.value).each(function(n,inValue){
				if(inValue.bindingType == BINDING_TYPE_VALUE_BINDING){
					bindingType = WebInitParameter.BINDING_TYPE_BINDING;
				}else if(inValue.bindingType == BINDING_TYPE_VALUE_UNBINDING){
					bindingType = WebInitParameter.BINDING_TYPE_UNBINDING;
				}
//				if(inValue.groupId == ""){
//					equSalveName = "";
//				}else{
//					equSalveName = WebInitParameter.CHINESE_SEQ + getChineseNum(inValue.groupId)+ WebInitParameter.CHINESE_GROUP
//				}
				//得到订购信息
				var orderInfo = "<td>";
				if ($(inValue.orderList).length>0){
					orderInfo = orderInfo + "<table class ='orderTableBorder' width='100%'>";
//					orderInfo = orderInfo +"<tr><th width='9%'>产品简称</th><th width='25%'>商品名称</th><th width='10%'>类型</th><th width='13%'>内容</th><th width='13%'>计费策略</th><th width='15%'>订购时间</th><th width='15%'>失效时间</th></tr>";
					// 去掉产品简称 Xu Liu 2012/06/18
					orderInfo = orderInfo +"<tr><th width='25%'>商品名称</th><th width='23%'>计费策略</th><th width='11%'>状态</th><th width='14%'>订购时间</th><th width='14%'>生效时间</th><th width='14%'>失效时间</th></tr>";
					$(inValue.orderList).each(function(n,innVal){
//						orderInfo = orderInfo + "<tr><td>"+innVal.productCode+"</td><td>"+innVal.productName+"</td><td>"+getProductTypeName(innVal.productType)+"</td><td>"+getProductScopeName(innVal.productType,innVal.productScope)+"</td><td>"+innVal.policyName+"</td><td>"+innVal.orderTimeStr+"</td><td>"+innVal.expiryDateStr+"</td></tr>";
						orderInfo = orderInfo + "<tr><td>"+innVal.productName+"</td><td>"+innVal.policyName+"</td><td>"+innVal.statusStr+"</td><td>"+innVal.orderTimeStr+"</td><td>"+innVal.effectiveDateStr+"</td><td>"+innVal.expiryDateStr+"</td></tr>";
					});
					orderInfo = orderInfo + "</table>";
				}
				orderInfo = orderInfo + "</td>";
				var cardNo = "";
//				if(inValue.equSlaveType != "0" && inValue.icId !=""){//有智能卡，不是主终端
//					cardNo = "<span class='ui_icon secondary_icon'></span>";
//					equSlaveName = WebInitParameter.CHINESE_SEQ + getChineseNum(inValue.groupId)+ WebInitParameter.CHINESE_GROUP
//					equSlaveName = equSlaveName + WebInitParameter.CHINESE_SEQ + getChineseNum(inValue.equSlaveType) + WebInitParameter.GROUP_VALUE_SLAVE;
//				}else if(inValue.icId != ""){//有智能卡，并且是主终端
//					equSlaveName = WebInitParameter.CHINESE_SEQ + getChineseNum(inValue.groupId)+ WebInitParameter.CHINESE_GROUP
//					equSlaveName = equSlaveName + WebInitParameter.GROUP_VALUE_MAIN;
//					//最大组号
//					equGroupMaxNum = equGroupMaxNum + 1;
//				}else{//没有智能卡
//					equSlaveName = "&nbsp;";
//					inValue.icId = "&nbsp;";
//					inValue.cardDesc  = "&nbsp;";
//				}
				if(inValue.icNo != "" && inValue.equSlaveType != ""){//有智能卡
					//终端名称
//					if(WebInitParameter.FIRST_GROUP_NAME != WebInitParameter.FIRST_GROUP_NAME_DISPLAY){
//						if(inValue.groupId != '1'){
//							if(userType == WebInitParameter.RESIDENT){
//								equSlaveName = getChineseNum(inValue.groupId)+ WebInitParameter.CHINESE_GROUP + WebInitParameter.GROUP_VALUE_MAIN;
//							}else{
//								equSlaveName = WebInitParameter.GROUP_VALUE_MAIN + inValue.groupId;
//							}
//						}else{
//							equSlaveName = WebInitParameter.GROUP_VALUE_MAIN;
//						}
//					}else{
//						equSlaveName = WebInitParameter.CHINESE_SEQ + getChineseNum(inValue.groupId)+ WebInitParameter.CHINESE_GROUP + WebInitParameter.GROUP_VALUE_MAIN;
//					}
//					if(inValue.equSlaveType != "0"){//不是主终端
//						cardNo = "<span class='ui_icon secondary_icon'></span>";
//						equSlaveName = equSlaveName + WebInitParameter.CHINESE_SEQ + getChineseNum(inValue.equSlaveType) + WebInitParameter.GROUP_VALUE_SLAVE;
//					}else{//是主终端
//						equSlaveName = equSlaveName + WebInitParameter.GROUP_VALUE_MAIN;
//						equGroupMaxNum = equGroupMaxNum + 1;
//					}
					
					if(WebInitParameter.FIRST_GROUP_NAME != WebInitParameter.FIRST_GROUP_NAME_DISPLAY){
						if(inValue.equSlaveType == "0"){//主终端
							if(inValue.groupId != '1'){
								if(userType == WebInitParameter.RESIDENT){
									equSlaveName = getChineseNum(inValue.groupId)+ WebInitParameter.CHINESE_GROUP + WebInitParameter.GROUP_VALUE_MAIN;
								}else{
									equSlaveName = WebInitParameter.GROUP_VALUE_MAIN + inValue.groupId;
								}
							}else{
								equSlaveName = WebInitParameter.GROUP_VALUE_MAIN;
							}
							equGroupMaxNum = equGroupMaxNum + 1;
						}else{//副终端
							cardNo = "<span class='ui_icon secondary_icon'></span>";
							if(inValue.groupId != '1'){
								equSlaveName = getChineseNum(inValue.groupId)+ WebInitParameter.CHINESE_GROUP + WebInitParameter.CHINESE_SEQ + getChineseNum(inValue.equSlaveType) + WebInitParameter.GROUP_VALUE_SLAVE;
							}else{
								equSlaveName = WebInitParameter.CHINESE_SEQ + getChineseNum(inValue.equSlaveType) + WebInitParameter.GROUP_VALUE_SLAVE;
							}
						}
					}else{
						if(inValue.equSlaveType == "0"){//主终端
							equSlaveName = WebInitParameter.CHINESE_SEQ + getChineseNum(inValue.groupId)+ WebInitParameter.CHINESE_GROUP + WebInitParameter.GROUP_VALUE_MAIN;
							equGroupMaxNum = equGroupMaxNum + 1;
						}else{//副终端
							cardNo = "<span class='ui_icon secondary_icon'></span>";
							equSlaveName = WebInitParameter.CHINESE_SEQ + getChineseNum(inValue.groupId)+ WebInitParameter.CHINESE_GROUP + WebInitParameter.CHINESE_SEQ + getChineseNum(inValue.equSlaveType) + WebInitParameter.GROUP_VALUE_SLAVE;
						}
					}
					
				}else if(inValue.equSlaveType == ""){
					equSlaveName = "&nbsp;";
				}else{//没有智能卡
					equSlaveName = "&nbsp;";
					inValue.icNo = "&nbsp;";
					inValue.cardDesc  = "&nbsp;";
					
				}
				// 如果当前基本服务结束时间为0,不在页面上显示，将它设为null liuxu
				if(inValue.basicCurrEndtime == 0) {
					inValue.basicCurrEndtime = "";
				}
				if(inValue.icStatusChangeTime == 0) {
					inValue.icStatusChangeTime = "";
				}
				if(WebInitParameter.ORDER_VIEW_TYPE_V1 == WebInitParameter.ORDER_VIEW_TYPE){
					// 增加基本服务当前到期时间和IC卡状态改变时间显示 liuxu 20120528
					// 增加开卡时间 Xu Liu 2012-06-18
					equipmentContent = equipmentContent + "<tr><td><input type='checkbox' value= '"+inValue.id+"'/></td><td>"+cardNo+inValue.icNo+"</td><td>"+equSlaveName+"</td><td>"+inValue.basicCurrEndtime+"</td><td>"+inValue.icStatusChangeTime+"</td><td>"+inValue.cardCreateDate+"</td><td>"+inValue.cardDesc+"</td><td>"+inValue.stbNo+"</td><td>"+inValue.stbModel+"</td><td>"+inValue.stbGetType+"</td><td>"+inValue.stbDesc+"</td><td>"+bindingType+"</td></tr>";
					equVar = equVar + "<tr id='"+inValue.id+"'><td>"+inValue.groupId+"</td><td>"+inValue.icNo+"</td><td>"+inValue.mainEquId+"</td><td>"+inValue.equSlaveType+"</td><td>"+inValue.stbNo+"</td><td>"+inValue.stbModel+"</td><td>"+inValue.stbGetType+"</td><td>"+inValue.bindingType+"</td><td>"+equSlaveName+"</td><td>"+inValue.cardDesc+"</td><td>"+inValue.stbDesc+"</td><td>"+inValue.id+"</td><td>"+inValue.icStatus+"</td><td>"+inValue.stbStatus+"</td></tr>";
				}else{
					equipmentContent = equipmentContent + "<tr><td><input type='checkbox' value= '"+inValue.id+"'/></td><td>"+cardNo+inValue.icNo+"</td><td>"+equSlaveName+"</td><td>"+inValue.basicCurrEndtime+"</td><td>"+inValue.icStatusChangeTime+"</td><td>"+inValue.cardCreateDate+"</td><td>"+inValue.cardDesc+"</td><td>"+inValue.stbNo+"</td><td>"+inValue.stbModel+"</td><td>"+inValue.stbGetType+"</td><td>"+inValue.stbDesc+"</td><td>"+bindingType+"</td>"+orderInfo+"</tr>";
					equVar = equVar + "<tr id='"+inValue.id+"'><td>"+inValue.groupId+"</td><td>"+inValue.icNo+"</td><td>"+inValue.mainEquId+"</td><td>"+inValue.equSlaveType+"</td><td>"+inValue.stbNo+"</td><td>"+inValue.stbModel+"</td><td>"+inValue.stbGetType+"</td><td>"+inValue.bindingType+"</td><td>"+equSlaveName+"</td><td>"+inValue.cardDesc+"</td><td>"+inValue.stbDesc+"</td><td>"+inValue.id+"</td><td>"+inValue.icStatus+"</td><td>"+inValue.stbStatus+"</td>"+orderInfo+"</tr>";
					inValue.orderInfo = orderInfo;
				}
				//保存设备号码和名称映射Map
				equipmentFunc.equNameMap.put(customerId,inValue.icNo,inValue.icNo+"&nbsp;"+equSlaveName);
				//保存隐藏设备关系对象
				inValue.equSlaveName = equSlaveName;
				inValue.cardNoAndIcNo = cardNo+inValue.icNo;
				inValue.bindingTypeStr = bindingType;
				equipmentFunc.equVar.put(customerId,inValue.id,inValue);
				equipmentFunc.orderEquSlaveMap.put(customerId,inValue.icNo,inValue.equSlaveType);
				equipmentFunc.icCardVarInfo.put(customerId,inValue.icNo,inValue);
				equipmentFunc.stbBoxVarInfo.put(customerId,inValue.stbNo,inValue);
			});
			
		}
		
//		$("#equMask").addClass("hide");
		hideMsg();
		$("#equipmentTable"+contentId).append(equipmentContent);
		//增加点击购买方法
		equipmentFunc.equipmentClickOrder({contentId:contentId,customerId:customerId});
		$("#equVar"+contentId).empty().append(equVar);
		$("#equ_GroupMaxNum"+contentId).empty().append(equGroupMaxNum);
		//刷新机卡绑定页面，解决异步操作的问题
		if(typeof callbackFunc =='function')
			callbackFunc();
	});
}

/*得到设备表头*/
function getEquipmentTableHeader(){
	var tableHeader = "";
	// 在表头中增加基本服务当前到期时间和IC卡状态改变时间 liuxu 20120528
	if(WebInitParameter.ORDER_VIEW_TYPE_V1 == WebInitParameter.ORDER_VIEW_TYPE){
		tableHeader = "<tr><th>选择</th><th>智能卡号</th><th>终端名称</th><th>基本服务到期时间</th><th>IC卡状态改变时间</th><th>开卡时间</th><th>智能卡状态</th><th>机顶盒号</th><th>机顶盒型号</th><th>来源</th><th>机顶盒状态</th><th>机卡绑定</th></tr>";
	}else if(WebInitParameter.ORDER_VIEW_TYPE_V2 == WebInitParameter.ORDER_VIEW_TYPE){
		tableHeader = "<tr><th>选择</th><th>智能卡号</th><th>终端名称</th><th>基本服务到期时间</th><th>IC卡状态改变时间</th><th>开卡时间</th><th>智能卡状态</th><th>机顶盒号</th><th>机顶盒型号</th><th>来源</th><th>机顶盒状态</th><th>机卡绑定</th><th width= '40%'>订购信息</th></tr>";
	}
	return tableHeader;
}
/*得到请求设备地址*/
function getEquipmentAjaxPath(){
	var ajaxPath = "";
	if(WebInitParameter.ORDER_VIEW_TYPE_V1 == WebInitParameter.ORDER_VIEW_TYPE){
		ajaxPath = "ajaxSearchUserEquList.do";
	}else if(WebInitParameter.ORDER_VIEW_TYPE_V2 == WebInitParameter.ORDER_VIEW_TYPE){
		ajaxPath = "ajaxSearchUserEquList.do";
	}
	return ajaxPath;
}

/*继续订购产品方法*/
equipmentFunc.equipmentOrderFunc = function (option){
	if(WebInitParameter.ORDER_VIEW_TYPE_V1 == WebInitParameter.ORDER_VIEW_TYPE){
		return;
	}else if(WebInitParameter.ORDER_VIEW_TYPE_V2 == WebInitParameter.ORDER_VIEW_TYPE){
		var contentId = option.contentId,customerId = option.customerId,cardNo = option.cardNo,slaveType = option.slaveType;
		if(cardNo == undefined)
			return;
		var confirmed = confirm(WebInitParameter.MSG_EQU_C16);
		if(!confirmed){
			return;
		}
		$("#base_product_info_equipment_cardNo"+contentId).val(cardNo);
		productFunc.setOrderViewTypeV2(contentId);
		if(isOrderPermitType != undefined && isOrderPermitType != "" && isOrderPermitType != "0"){
			productInit3(contentId,customerId,"1",cardNo,slaveType,"1");
			/*隐藏选择终端按钮*/
			$("#selectEqu"+contentId).addClass("hide");
		}
//		$("#base_product_info"+contentId).locateCenter();
		$("#base_product_info"+contentId).position("relitive")
		var x = $("#base_product_info"+contentId).position();
		$("#base_product_info"+contentId).css("top",x.top + 200);
		$("#base_product_info"+contentId).css("left","220px");
		$("#base_product_info"+contentId).removeClass("hide");
		$("#mask").toggle();
		
	}
}

/*双击订购*/
equipmentFunc.equipmentClickOrder = function (option){
	if(WebInitParameter.ORDER_VIEW_TYPE_V1 == WebInitParameter.ORDER_VIEW_TYPE){
		return;
	}else if(WebInitParameter.ORDER_VIEW_TYPE_V2 == WebInitParameter.ORDER_VIEW_TYPE){
		var contentId = option.contentId,customerId = option.customerId,cardNo = option.cardNo;
		var slaveType = "";
		var $trs = $("#equipmentTable"+contentId).children("tbody").children("tr:not(:first-child)");
		$trs.hover(function(){
			// modify by jhg 2013-07-10调整显示颜色
			//$(this).css("background-color","#FFF68F");
			$(this).css("background-color","rgb(255,255,204)");
		},function(){
			$(this).css("background-color","#FFFFFF");
		});
		$trs.dblclick(function(){
			cardNo = $(this).children("td").eq(1).text();
			if($.trim(cardNo) == ""){
				alert(WebInitParameter.MSG_EQU_C18);
				return;
			}
			//判断该智能卡状态是否可以订购
			var userEquId = $(this).children("td").eq(0).find("input").val();
			var icStatus = $("#"+userEquId).children("td").eq(12).text();
			var icValidStatusArr = WebInitParameter.IC_VALID_VALUE.split(",");
			var flag = false;
			for(var i=0;i<icValidStatusArr.length;i++){
				if(icStatus==icValidStatusArr[i]){
					flag = true;
					break;
				}
			}
			if(!flag){
				alert(WebInitParameter.MSG_EQU_C18);
				return;
			}
			$("#base_product_info_equipment_cardNo"+contentId).val(cardNo);
			productFunc.setOrderViewTypeV2(contentId);
			if(isOrderPermitType != undefined && isOrderPermitType != "" && isOrderPermitType != "0"){
				slaveType = equipmentFunc.orderEquSlaveMap.get(customerId,cardNo);
				productInit3(contentId,customerId,"1",cardNo,slaveType,"1");
				/*隐藏选择终端按钮*/
				$("#selectEqu"+contentId).addClass("hide");
			}
//			$("#base_product_info"+contentId).locateCenter();
			$("#base_product_info"+contentId).position("relitive")
			var x = $("#base_product_info"+contentId).position();
			$("#base_product_info"+contentId).css("top",x.top + 200);
			$("#base_product_info"+contentId).css("left","220px");
			$("#base_product_info"+contentId).removeClass("hide");
			$("#mask").toggle();

		});
	}
}

equipmentFunc.operConfirm = function(commandId,text){
	if(WebInitParameter.OPERATION_CONFIRM == "yes"){
		return confirm("确定进行"+text+"操作吗？");
	}
	return true;
}
equipmentFunc.operConfirm1 = function(commandId,text) {
	if(WebInitParameter.OPERATION_CONFIRM == "yes"){
		return confirm(text);
	}
	return true;
}

