var equRepairFeeFunc = new Object();
equRepairFeeFunc.repairOrderInfo = new UserMap();
equRepairFeeFunc.orderStr = "";

// 费用补交界面，初始化补交信息提醒
function equRepairFeeHit(thisIcCard){
	repairOrderParam = "";
	$("#equipment_repairFee_showEquInvalidTable_"+thisIcCard).empty();
	$("#repairFeeCheckEquValid_"+thisIcCard).removeClass("hide");
	var ajaxQuerys = {
		customer_id:thisIcCard
	};
	ovtAjaxMethod(ajaxBusPath+"showRepairFeeHit.do",ajaxQuerys,function(data){
		if(data.code == 1){
			alert(data.value);
			return;
		}else{
			equRepairFeeFunc.repairOrderInfo.clearCustomer(thisIcCard);
			var length = data.value.length;
			var redHit = "<font color='red'>";
			var showEquInfo = "";
			if(length > 0){
				$(data.value).each(function(n,inValue){
					if(n == 0){
						equRepairFeeFunc.orderStr = inValue.orderStr;
					}
					showEquInfo = showEquInfo + (inValue.lableStr+"【"+redHit+inValue.equNo+"</font>】订购的产品【"+redHit+inValue.productName+"</font>】已为【"+redHit+inValue.expiryDate+"</font>】号到期；<br>");
					equRepairFeeFunc.repairOrderInfo.put(thisIcCard,inValue.equNo,inValue);
				});
			}else{
				showEquInfo = showEquInfo + "该用户没有需要补交的订购信息！";
				$("#repairFeeCheckEquValid_"+thisIcCard).addClass("hide");
			}
			showEquInfo = showEquInfo + "</font>";
			$("#equipment_repairFee_showEquInvalidTable_"+thisIcCard).append("<tr><td>"+showEquInfo+"</td></tr>");
		}
	});
}

// 费用补交界面，初始化需要补充的订购信息
function equRepairFeeOrderInit(thisIcCard){
	$("#equipment_repairFee_equOrderTable_"+thisIcCard).empty();
	var checkEquId = "";
	$(equRepairFeeFunc.repairOrderInfo.getValue(thisIcCard).value).each(function(){
		checkEquId = checkEquId + (this.equId+"_"+this.lable+"_"+this.equNo) + ",";
	});

	var ajaxShowEquOrderProduct = {
		customer_id:thisIcCard,
		checkEquIds:checkEquId,
		orderCheckIds:equRepairFeeFunc.orderStr,
		maxExpiryTime:"",
		repairFeeFlag:"0"
	};
	
	ovtAjaxMethod(ajaxProPath+"showOrderByEqu.do",ajaxShowEquOrderProduct,function(data){
		if(data.code == 1){
			alert(data.value);
			return;
		}else{
			var showUserOrderTr = "";
			var totalMoney = 0.0;
			if(data.value.length == 0){
				repairOrderParam = "0";
			}else{
				repairOrderSeq = "";
				repairOrderParam = "";
			}
			var orderFeeInnerHtml = "";
			$(data.value).each(function(n,inValue){
				var showCalcVal = inValue.showCalcStr;
				var showCalc = showCalcVal.substr(0,showCalcVal.length-1);
				var yearStr=showCalc.replace("year","年");
				var monthStr=yearStr.replace("month","月");
				var dayStr=monthStr.replace("day","天");
				var nullStr=dayStr.replace("nullnull","");
				var newStr=nullStr.replace("null","");
				repairOrderParam = repairOrderParam + inValue.id+","+inValue.productId+","+inValue.effectiveDate+","+inValue.expiryDate+"&"
				repairOrderSeq = repairOrderSeq + (thisIcCard+"_"+inValue.id+",");
				orderFeeInnerHtml = "<div id='inputRepairOrderFeeText_"+thisIcCard+"_"+inValue.id+"'><input type='hidden' style='width:100px' name='showRepairOrderPay' " +
								 "id= 'showRepairOrderPay_"+thisIcCard+"_"+inValue.id+"' value='"+Number(inValue.lockMoney).toFixed(2)+"'></input>" +
								 "<font color='red' size='14'>" + inValue.lockMoney +"("+ newStr +")"+"</font></div>";
				if(n == 0){
					totalMoney = inValue.totalMoney;
				}
				showUserOrderTr = showUserOrderTr + "<tr>" +
				"<td>"+inValue.equNo+"("+inValue.lableStr+")</td>" +
				"<td>"+inValue.productName+"</td>" +
				"<td>"+inValue.commonName+"</td>" +
				"<td>"+inValue.effectiveDate+"</td>" +
				"<td>"+inValue.expiryDate+"</td>" +
				"<td align='right'>"+ orderFeeInnerHtml +"</td></tr>";
			});
			showUserOrderTr = showUserOrderTr + "<tr align='right'><td colspan='6'>订购费用总金额：<input disabled='disabled' style='width:50px' id='repairOrderTotalFeeInputText_"+thisIcCard+"' value="+ Number(totalMoney).toFixed(2) +"></input>（元）</td></tr>";
			var repairFeeTotal = $("#repairFee_"+thisIcCard);
			if(repairFeeTotal.length > 0){
				$("#repairFee_"+thisIcCard).val(Number(totalMoney).toFixed(2));
			}
			$("#equipment_repairFee_equOrderTable_"+thisIcCard).append("<tr><th>智能卡号</th><th>订购产品</th><th>策略名称</th><th>开始时间</th><th>失效时间</th><th>订购费用(元)</th></tr>");
			$("#equipment_repairFee_equOrderTable_"+thisIcCard).append(showUserOrderTr);
		}
	});
};

// 费用补交界面，初始化产生费用控件
function equRepairFeeFeeInit(thisIcCard,forceWarnFlag){
	$("#equipment_repairFee_equFeeTable_"+thisIcCard).empty();
	var ajaxQuerys = {
		businessType:BUSINESS_TYPE.EQU_REPAIR_FEE_CODE
	};
	ovtAjaxMethod(ajaxBusPath+"ajaxConfirmCost.do",ajaxQuerys,function(data){
		if(data.code == 1){
			alert(data.value);
			return;
		}else{
			var showFeeTr = "<tr align='left'><th width='70px'>产生费用：</th>"
			var feeLength = data.value.length;
			if(feeLength > 0){
				equRepairFeeFunc.feeItemValue = data.value;
				$(data.value).each(function(n,inValue){
					if(n == 0){
						if(inValue.canEdit == 0){
							showFeeTr = showFeeTr + "<td width='100px'>"+inValue.feeName+"</td><td width='130px'><input id='repairFee_"+thisIcCard+"' disabled='disabled' size='5' maxlength='10' type='text' value='"+inValue.defaultValue+"' onKeyUp=clearNoNum(event,this) onBlur=checkNum(this) />元</td></tr>";
						}else{
							showFeeTr = showFeeTr + "<td width='100px'>"+inValue.feeName+"</td><td width='130px'><input id='repairFee_"+thisIcCard+"' size='5' maxlength='10' type='text' value='"+inValue.defaultValue+"' onKeyUp=clearNoNum(event,this) onBlur=checkNum(this) />元</td></tr>";
						}
					}else{
						if(inValue.canEdit == 0){
							showFeeTr = showFeeTr + "<tr><td width='70px'></td><td width='100px'>"+inValue.feeName+"</td><td width='130px'><input id='repairFee_"+thisIcCard+"' disabled='disabled' size='5' maxlength='10' type='text' value='"+inValue.defaultValue+"' onKeyUp=clearNoNum(event,this) onBlur=checkNum(this) />元</td></tr>";							
						}else{
							showFeeTr = showFeeTr + "<tr><td width='70px'></td><td width='100px'>"+inValue.feeName+"</td><td width='130px'><input id='repairFee_"+thisIcCard+"' size='5' maxlength='10' type='text' value='"+inValue.defaultValue+"' onKeyUp=clearNoNum(event,this) onBlur=checkNum(this) />元</td></tr>";
						}
					}
				});
				$("#equipment_repairFee_equFeeTable_"+thisIcCard).append(showFeeTr);
			}
		}
	});
}
