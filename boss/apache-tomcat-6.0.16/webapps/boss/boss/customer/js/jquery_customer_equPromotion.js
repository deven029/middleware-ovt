var equPromotionFunc = new Object();

// 设备升级界面，终端修改控件初始化
function equPromotionInit(thisIcCard,$trs){
	$("#equipment_promotion_equTable_"+thisIcCard).empty();
	var oldIcNo = $trs.eq(0).find("td").eq(1).text();
	var oldIcCardObj = "";
	if(oldIcNo != ""){
		oldIcCardObj = equipmentFunc.icCardVarInfo.get(thisIcCard,oldIcNo);
	}
	var oldStbNo = $trs.eq(0).find("td").eq(7).text();
	var oldStbObj = "";
	if(oldStbNo != ""){
		oldStbObj = equipmentFunc.stbBoxVarInfo.get(thisIcCard,oldStbNo);
	}
	var inputTypeSelect = null;
	if(equInputType == "" || equInputType == '1'){
		inputTypeSelect = "<option value ='1' selected='selected'>模糊匹配</option><option value ='2'>扫枪</option>";
	}else{
		inputTypeSelect = "<option value ='1'>模糊匹配</option><option value ='2' selected='selected'>扫枪</option>";
	}
	var orderEquContent = "";
	if(oldIcCardObj != ""){
		orderEquContent = orderEquContent + 
						  "<tr><td width='70px'>原智能卡号:</td><td width='130px'><input disabled='disabled' id='promotionEqu_OrderEquInfo_"+thisIcCard+"' " +
						  "value='"+oldIcNo+"'></input></td>" +
						  "<td width='130px'><input disabled='disabled' id='promotionEqu_OrderEquInfo_"+thisIcCard+"' " +
						  "value='"+oldIcCardObj.icModel+"'></input></td>" +
						  "<td width='70px'>现智能卡号:</td>" +
						  "<td width='100px'><select id='equipment_promotion_equIcCardIputType_'"+thisIcCard+"' onchange=icCardInputTypeChange(this);>" + inputTypeSelect +"</select></td>"+
						  "<td><input width='150px' type='text' onblur=\"inputValueFinish('icCardValue\',function(){inputEquCheckFunc('icCardValue',"+thisIcCard+");})\" onkeyup=\"cusKeyPress('icCardValue','')\" class='input_text' id='icCardValue'/><input width='150px' type='text' class='input_text_model' id='icCardModel' />" +
						  "<div id='cusDiv' class='upHideDiv'><div id='cusShowDiv'></div></div></td>"+
						  "</tr>";
	}
	if(oldStbObj != ""){
		orderEquContent = orderEquContent + 
		 				  "<tr><td width='70px'>原机顶盒号:</td><td width='130px'><input disabled='disabled' id='promotionEqu_OrderEquInfo_"+thisIcCard+"' " +
						  "value='"+oldStbNo+"'></input></td>" +
						  "<td width='130px'><input disabled='disabled' id='promotionEqu_OrderEquInfo_"+thisIcCard+"' " +
						  "value='"+oldStbObj.stbModel+"'></input></td>" +
						  "<td width='70px'>现机顶盒号:</td>" +
						  "<td width='100px'><select id='equipment_promotion_equStbBoxIputType_'"+thisIcCard+"' onchange=stbInputTypeChange(this);>" + inputTypeSelect +"</select></td>"+
						  "<td><input input width='150px' type='text' onblur=\"inputValueFinish('setBoxValue',function(){inputEquCheckFunc('setBoxValue',"+thisIcCard+");})\" onkeyup=\"cusKeyPress('setBoxValue','')\" class='input_text'  id='setBoxValue'/><input input width='150px' type='text' class='input_text_model' id='stbModel' /></td>"+
						  "<div id='cusDiv' class='upHideDiv'><div id='cusShowDiv'></div></div></td>"+
						  "</tr>";
	}
	$("#equipment_promotion_equTable_"+thisIcCard).append(orderEquContent);
	// 默认方式处理
	if(equInputType == "" || equInputType == '1'){
		var obj = new Object();
		obj.value = '1';
		equInputTypeInitChange(obj)
	}
	$("#checkEquValid_"+thisIcCard).removeClass("hide");
}

// 设备升级界面，终端订购控件初始化
function equPromotionOrderInit(thisIcCard,$trs){
	$("#equipment_promotion_equOrderTable_"+thisIcCard).empty();
	var oldIcNo = $trs.eq(0).find("td").eq(1).text();
	var showUserOrderTr = "<tr><th>产品名称</th><th>类型</th><th>计费策略</th><th>到期时间</th><th>新类型</th><th>新产品名称</th><th>新计费策略</th></tr>"
	var policyInfoStr = "";
	var equOrderTrNum = 1;
	var equOrders = equipmentFunc.icCardVarInfo.get(thisIcCard,oldIcNo);
	var equOrderLength = equOrders.orderList.length;
	// 新产品选择框
	var newOrderTypeSelect = "";
	var newProductSelect = "";
	var newPolicySelect = "";
	if(equOrderLength > 0){
		$(equOrders.orderList).each(function(n,inValue){
			// 新产品选择框
			newOrderTypeSelect = "<td><select id='newOrderTypeSelect_"+thisIcCard+"_"+inValue.orderId+"' onchange=newOrderType("+thisIcCard+","+inValue.orderId+",this)><option value='-1'>请选择</option><option value='0'>套餐</option><option value='1'>服务</option></select></td>";
			newProductSelect = "<td><select id='newProductSelect_"+thisIcCard+"_"+inValue.orderId+"' onchange=newProduct("+thisIcCard+","+inValue.orderId+",this)><option value='-1'>请选择</option></select></td>";
			newPolicySelect = "<td><select id='newPolicySelect_"+thisIcCard+"_"+inValue.orderId+"')><option value='-1'>请选择</option></select></td>";
			showUserOrderTr = showUserOrderTr + "<tr><td>"+inValue.productName+"</td><td>"+getProductTypeName(inValue.productType)+"</td><td>"+inValue.policyName+"</td><td>"+inValue.expiryDateStr+"</td>"+newOrderTypeSelect+newProductSelect+newPolicySelect+"</tr>";
			equOrderTrNum = equOrderTrNum +1;
		});
	}else{
		showUserOrderTr = showUserOrderTr + "<tr><td>该终端下没有订购信息</td></tr>";
	}
	$("#equipment_promotion_equOrderTable_"+thisIcCard).empty();
	$("#equipment_promotion_equOrderTable_"+thisIcCard).append(showUserOrderTr);
}

// 产品类型选择下拉框事件
function newOrderType(thisIcCard,orderId,obj){
	var orderType = obj.value;
	$("#newProductSelect_"+thisIcCard+"_"+orderId).empty();
	$("#newPolicySelect_"+thisIcCard+"_"+orderId).empty();
	if(orderType == "-1"){
		$("#newProductSelect_"+thisIcCard+"_"+orderId).append("<option value='-1'>请选择</option>");
		$("#newPolicySelect_"+thisIcCard+"_"+orderId).append("<option value='-1'>请选择</option>");
		return;
	}
	var ajaxQueryProducts = {
		orderType:orderType
	};
	ovtAjaxMethod(ajaxProPath+"queryOrderProducts.do",ajaxQueryProducts,function(data){
		if(data.code == 1){
			return;
		}else{
			var productInfos = "<option value='-1'>请选择</option>";
			var dataLength = data.value.length;
			if(dataLength > 0){
				$(data.value).each(function(n,inValue){
					productInfos = productInfos + "<option value='"+inValue.id+"'>"+inValue.name+"</option>";
				});
			}
			$("#newProductSelect_"+thisIcCard+"_"+orderId).append(productInfos);
			$("#newPolicySelect_"+thisIcCard+"_"+orderId).append("<option value='-1'>请选择</option>");
		}
	});
}

// 产品选择下拉框事件
function newProduct(thisIcCard,orderId,obj){
	var productId = obj.value;
	var orderType = $("#newOrderTypeSelect_"+thisIcCard+"_"+orderId).val();
	$("#newPolicySelect_"+thisIcCard+"_"+orderId).empty();
	if(productId == "-1"){
		$("#newPolicySelect_"+thisIcCard+"_"+orderId).append("<option value='-1'>请选择</option>");
		return;
	}
	var ajaxQueryProducts = {
		orderType:orderType,
		productId:productId
	};
	ovtAjaxMethod(ajaxProPath+"queryOrderProducts.do",ajaxQueryProducts,function(data){
		if(data.code == 1){
			return;
		}else{
			var dataLength = data.value.length;
			var productInfos = "<option value='-1'>请选择</option>";
			if(dataLength > 0){
				$(data.value).each(function(n,inValue){
					if(orderType == "0"){
						productInfos = productInfos + "<option value='"+inValue.id+"'>"+inValue.commodityName+"</option>";
					}else{
						productInfos = productInfos + "<option value='"+inValue.id+"'>"+inValue.commodity_name+"</option>";
					}
				});
			}
			$("#newPolicySelect_"+thisIcCard+"_"+orderId).append(productInfos);
		}
	});
}

// 设备升级界面，产生费用控件初始化
function equPromotionFeeInit(thisIcCard,$trs){
	$("#equipment_promotion_equFeeTable_"+thisIcCard).empty();
	var ajaxQuerys = {
		businessType:BUSINESS_TYPE.EQU_PROMOTION_CODE
	};
	ovtAjaxMethod(ajaxBusPath+"ajaxConfirmCost.do",ajaxQuerys,function(data){
		if(data.code == 1){
			alert(data.value);
			return;
		}else{
			var showFeeTr = "<tr align='left'><th width='70px'>产生费用：</th>"
			var feeLength = data.value.length;
			if(feeLength > 0){
				equPromotionFunc.feeItemValue = data.value;
				$(data.value).each(function(n,inValue){
					if(n == 0){
						if(inValue.canEdit == 0){
							showFeeTr = showFeeTr + "<td width='100px'>"+inValue.feeName+"</td><td width='130px'><input id='promotion_"+thisIcCard+"_"+inValue.id+"' disabled='disabled' size='5' maxlength='10' type='text' value='"+inValue.defaultValue+"' onKeyUp=clearNoNum(event,this) onBlur=checkNum(this) />元</td></tr>";
						}else{
							showFeeTr = showFeeTr + "<td width='100px'>"+inValue.feeName+"</td><td width='130px'><input id='promotion_"+thisIcCard+"_"+inValue.id+"' size='5' maxlength='10' type='text' value='"+inValue.defaultValue+"' onKeyUp=clearNoNum(event,this) onBlur=checkNum(this) />元</td></tr>";
						}
					}else{
						if(inValue.canEdit == 0){
							showFeeTr = showFeeTr + "<tr><td width='70px'></td><td width='100px'>"+inValue.feeName+"</td><td width='130px'><input id='promotion_"+thisIcCard+"_"+inValue.id+"' disabled='disabled' size='5' maxlength='10' type='text' value='"+inValue.defaultValue+"' onKeyUp=clearNoNum(event,this) onBlur=checkNum(this) />元</td></tr>";							
						}else{
							showFeeTr = showFeeTr + "<tr><td width='70px'></td><td width='100px'>"+inValue.feeName+"</td><td width='130px'><input id='promotion_"+thisIcCard+"_"+inValue.id+"' size='5' maxlength='10' type='text' value='"+inValue.defaultValue+"' onKeyUp=clearNoNum(event,this) onBlur=checkNum(this) />元</td></tr>";
						}
					}
				});
				$("#equipment_promotion_equFeeTable_"+thisIcCard).append(showFeeTr);
			}
		}
	});
}
