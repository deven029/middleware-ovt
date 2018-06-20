function disableCustomer(contentId,bool){
	$("#customer_info_content_"+contentId).find("input[type!=checkbox]").attr("readonly",bool);
	$("#customer_info_content_"+contentId).find("select").attr("disabled",bool);
	$("#customer_info_content_"+contentId).find("input[type=checkbox]").attr("disabled",bool);
	$("#customer_info_content_"+contentId).find("textarea").attr("disabled",bool);
	$("#submit_modify_customer_button_"+contentId).attr("disabled",bool);
	$("#cancel_modify_customer_button_"+contentId).attr("disabled",bool);
	$("#modify_customer_button_"+contentId).attr("disabled",!bool);

	//片区信息，用户状态，有效状态禁止修改
	$("#customer_areaLevel1_"+contentId).attr("disabled",true);
	$("#customer_areaLevel2_"+contentId).attr("disabled",true);
	$("#customer_areaLevel3_"+contentId).attr("disabled",true);
	$("#customer_status_"+contentId).attr("disabled",true);
	$("#customer_validStatus_"+contentId).attr("disabled",true);
	
	//20110511代扣银行和银行账号禁止修改 liuyajie
	$("#customer_relateBank_"+contentId).attr("disabled",true);
	$("#customer_bankAccount_"+contentId).attr("disabled",true);
	
	//禁止账号手动输入，联动账号和编号
	$("#customer_account_"+contentId).attr("disabled",true);
	
	// 禁止修改用户宽带账号 liuxu 2012-10-17
	$("#customer_bwAccountNo_"+contentId).attr("disabled",true);
}
	
// add by jhg
function showOrHiddenBandWidth(contentId,value){
	// 处理宽带业务的显示与关闭
	if(value != undefined || value != ""){
		if(value == "0"){
			$("#bandwidth_title_"+contentId).addClass("hide");
		}else{
			$("#bandwidth_title_"+contentId).removeClass("hide");
		}
	}
}

// add by jhg
function showOrHiddenBandWidthSubmitButton(contentId,value){
	// 处理宽带业务的显示与关闭
	if(value != undefined || value != ""){
		if(value == "0"){
			$("#bandwidth_content_bandwidth_but_submitSub_"+contentId).removeClass("hide");
		}else{
			$("#bandwidth_content_bandwidth_but_submitSub_"+contentId).addClass("hide");
		}
	}
}

// 系统是否支持输入超长的机顶盒编号
function showLongSTBInputDIV (contentId,value){
	// 机顶盒号超长显示设置
	if(value != undefined || value != ""){
		if(value == "0"){
			$("#equipment_content_equipment_addEquipment_text_stb_"+contentId).css("width","130px");
			$("#equipment_content_equipment_addEquipment_text_card_"+contentId).css("width","130px");
			$("#icCardModel_"+contentId).css("width","130px");
			$("#equipment_content_equipment_change_text_"+contentId).css("width","130px");
		}else{
			$("#icCardModel_"+contentId).css("width","130px");
			$("#equipment_content_equipment_addEquipment_text_card_"+contentId).css("width","130px");
			$("#equipment_content_equipment_addEquipment_text_stb_"+contentId).css("width","260px");
			$("#equipment_content_equipment_change_text_"+contentId).css("width","260px");
		}
	}
}

/*搜索tab标题鼠标滑过的变化*/
$("#search_title").hover(function(){
	if(!$(this).hasClass("tab_title_head_click")){
		$(this).removeClass("tab_title_head_out");
		$(this).removeClass("tab_title_head_click");
		$(this).addClass("tab_title_head_over");
	}
},function(){
	if(!$(this).hasClass("tab_title_head_click")){
		$(this).removeClass("tab_title_head_over");
		$(this).removeClass("tab_title_head_click");
		$(this).addClass("tab_title_head_out");
	}
});

/*搜索tab标题被点击后的操作*/
$("#search_title").click(function(){
	$(this).removeClass("tab_title_head_out");
	$(this).removeClass("tab_title_head_over");
	$(this).addClass("tab_title_head_click");
	//$(this).hover(function(){},function(){});
	$(this).siblings().removeClass("tab_title_head_click").addClass("tab_title_head_out");
	
	$("#search_info").siblings().addClass("hide");
	$("#search_info").removeClass("hide");
});


/*输入框得到焦点改变样式方法*/
$(".input_text").focus(function(){
	$(this).addClass("text_focus");
}).blur(function(){
	$(this).removeClass("text_focus");
})


/*所属集团弹窗方法*/
$("#customer_group").click(function(){
	groupTextClick("");
});

/*搜索按钮响应ajax操作*/
$("#customer_group_but_search").click(function(){
	groupSearchButClick("");
});
		
/*所属集团弹出取消按钮方法*/
$("#customer_group_but_cancel").click(function(){
	groupCancelButClick("");
});

/*所属集团弹出清空按钮方法*/
$("#customer_group_but_clear").click(function(){
	groupCleanButClick("");
});

/*搜索条件标题点击方法*/
$("#search_info_title").click(function(){
	changeHide("search_info_content","search_info_title_icon");
});

/*二级片区联动*/
$("#customer_areaLevel1").change(function(){
	getAreaLevel("",1);
});
/*三级片区联动*/
$("#customer_areaLevel2").change(function(){
	getAreaLevel("",2);
});

/*搜索条件按钮点击方法--未完成*/
$("#search_customer_button").click(function(){
	seatchCustomer(0);
});
/*回车键搜索响应*/
$("#customerInformationTable").keydown(function(e){
	if(e.keyCode==13){
		seatchCustomer(0);
	}
});

// 如果有权限，操作员可对退费金额手动修改方法 add by jhg 2013-03-19
function payFeeModifyProcess(thisIcCard,id,value,modifyRight,cancelFeeType){
	if(!modifyRight || modifyRight == 'false'){
		//alert("您没有修改退费金额的权限，请联系管理员！");
		return;
	}
	var modifyObjInner = document.getElementById("inputText_"+id);
	var oldHtml = modifyObjInner.innerText;
	// 对于申请中、未生效或者已到期的订购不支持修改金额
	if(cancelFeeType == '0' || cancelFeeType == '4'){
		return;
	}
	var newstr=oldHtml.replace("取消","");
	var defaultMoney = Number(value).toFixed(2);
	$("#cancelModifyPay_"+id).empty();
	modifyObjInner.innerHTML = "<div style='float:right'><div style='float:left'><input type='hidden' style='width:100px' name='showPay' " +
							  "id= 'showPay_"+id+"' value='"+defaultMoney+"'></input><font color='red' size='14' onDblClick=payFeeModifyProcess("+thisIcCard+","+id+","+value+","+modifyRight+","+cancelFeeType+")>" + newstr + "</font></div>" +
							  "<div id = 'cancelModifyPay_"+id+"' style='float:left'><input style='width:50px' name='showPay' id= 'modifyShowPay_"+id+"' value='"+defaultMoney+"' onKeyUp=clearNoNum(event,this) onBlur=checkNum(this) onpropertychange=changeMoneyShow("+thisIcCard+","+id+",1)></input>" +
							  "<font color='blue' size='14' onClick=changeMoneyShow("+thisIcCard+","+ id + ",0)>取消</font></div></div>";
}

// 修改录入金额操作
function changeMoneyShow(thisIcCard,id,type){
	if(type=='0'){
		$("#cancelModifyPay_"+id).empty();
	}
	var $orderIds = $("#selectedBaseProductTable_"+thisIcCard).find("input:checked");
	var newTotalFeeVal = 0.0;
	var showPayFee = 0.0;
	var modifyShowPayFee = 0.0;
	$orderIds.each(function(){
		// 通过计费规则计算出的退费金额
		showPayFee = $("#showPay_"+$(this).val()).val();
		// 操作员手动录入退费金额
		modifyShowPayFee = $("#modifyShowPay_"+$(this).val()).val();
		// 如果操作员手动录入了，使用录入的金额
		if(modifyShowPayFee != undefined && modifyShowPayFee != ""){
			newTotalFeeVal = newTotalFeeVal + parseFloat(Number(modifyShowPayFee).toFixed(2));
		}else{
			newTotalFeeVal = newTotalFeeVal + parseFloat(Number(showPayFee).toFixed(2));
		}
	});
	$("#recedeTotalFeeInputText_"+thisIcCard).val(Number(newTotalFeeVal).toFixed(2));
};

// 如果有权限，操作员可对补充订购的计算金额手动修改方法 add by jhg 2013-08-02
function supplyOrderPayFeeModifyProcess(thisIcCard,id,value,modifyRight){
	if(!modifyRight || modifyRight == 'false'){
		//alert("您没有修改订购金额的权限，请联系管理员！");
		return;
	}
	var modifyObjInner = document.getElementById("inputSupplyOrderFeeText_"+thisIcCard+"_"+id);
	var oldHtml = modifyObjInner.innerText;
	var newstr=oldHtml.replace("取消","");
	var defaultMoney = Number(value).toFixed(2);
	$("#cancelSupplyModifyPay_"+thisIcCard+"_"+id).empty();
	modifyObjInner.innerHTML = "<div style='float:right'><div style='float:left'><input type='hidden' style='width:100px' name='showSupplyOrderPay' " +
							  "id= 'showSupplyOrderPay_"+thisIcCard+"_"+id+"' value='"+defaultMoney+"'></input><font color='red' size='14' onDblClick=supplyOrderPayFeeModifyProcess("+thisIcCard+","+id+","+value+","+modifyRight+")>" + newstr + "</font></div>" +
							  "<div id = 'cancelSupplyModifyPay_"+thisIcCard+"_"+id+"' style='float:left'><input style='width:50px' name='showSupplyOrderPay' id= 'modifySupplyShowPay_"+thisIcCard+"_"+id+"' value='"+defaultMoney+"' onKeyUp=clearNoNum(event,this) onBlur=checkNum(this) onpropertychange=changeSupplyMoneyShow("+thisIcCard+","+id+",1)></input>" +
							  "<font color='blue' size='14' onClick=changeSupplyMoneyShow("+thisIcCard+","+ id + ",0)>取消</font></div></div>";
}

// 修改录入补充订购金额操作
function changeSupplyMoneyShow(thisIcCard,id,type){
	if(type=='0'){
		$("#cancelSupplyModifyPay_"+thisIcCard+"_"+id).empty();
	}
	var $supplyOrderIds = supplyOrderSeq.split(",");
	var newTotalFeeVal = 0.0;
	var showPayFee = 0.0;
	var modifyShowPayFee = 0.0;
	var supplyOrderId = "";
	for(var index=0;index < $supplyOrderIds.length;index++){
		supplyOrderId = $supplyOrderIds[index];
		if(supplyOrderId != ""){
			// 通过计费规则计算出的退费金额
			showPayFee = $("#showSupplyOrderPay_"+supplyOrderId).val();
			// 操作员手动录入退费金额
			modifyShowPayFee = $("#modifySupplyShowPay_"+supplyOrderId).val();
			// 如果操作员手动录入了，使用录入的金额
			if(modifyShowPayFee != undefined && modifyShowPayFee != ""){
				newTotalFeeVal = newTotalFeeVal + parseFloat(Number(modifyShowPayFee).toFixed(2));
			}else{
				newTotalFeeVal = newTotalFeeVal + parseFloat(Number(showPayFee).toFixed(2));
			}
		}
	};
	$("#supplyOrderTotalFeeInputText_"+thisIcCard).val(Number(newTotalFeeVal).toFixed(2));
};

function clearNoNum(event,obj){
    //响应鼠标事件，允许左右方向键移动 
    event = window.event||event; 
    if(event.keyCode == 37 | event.keyCode == 39){ 
        return; 
    } 
    //先把非数字的都替换掉，除了数字和. 
    obj.value = obj.value.replace(/[^\d.]/g,""); 
    //必须保证第一个为数字而不是. 
    obj.value = obj.value.replace(/^\./g,""); 
    //保证只有出现一个.而没有多个. 
    obj.value = obj.value.replace(/\.{2,}/g,"."); 
    //保证.只出现一次，而不能出现两次以上 
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
}
function checkNum(obj){
    //为了去除最后一个. 
    obj.value = obj.value.replace(/\.$/g,""); 
}

// add by jhg 2013-07-23 同步订购时根据选择的订购信息改变最大时间的显示
function checkOrderInfo(contentId){
	$("#equipment_content_equipment_syncOrderInfo_cardTable_"+contentId).empty();
	orderParamStr = "";
	supplyOrderSeq = "";
	var equOrderSelected = $("#equipment_content_equipment_orderInfo_cardTable_"+contentId).find("td:has(:checked)");
	var orderCheckIds = "";
	var compareCheckTime = new Array();
	equOrderSelected.each(function(){
		orderCheckIds = $(this).find("input");
		orderCheckIds.each(function(){
			compareCheckTime.push(equipmentFunc.checkOrderMap.get(contentId,$(this).val()));
		});
	});
	var maxTime = "";
	var rowSelectTime = "";
	var maxTimeNum = 0;
	var rowSelectTimeNum = 0;
	for(var maxIndex=0;maxIndex<compareCheckTime.length;maxIndex++){
		rowSelectTime = compareCheckTime[maxIndex];
		rowSelectTimeNum = rowSelectTime.replace("-","");
		if(maxTime==""){
			maxTime = rowSelectTime;
			maxTimeNum = maxTime.replace("-","");
		}
		if(maxTimeNum < rowSelectTimeNum){
			maxTime = rowSelectTime;
		}
	}
	if(maxTimeNum != 0){
		$("#order_contnet_maxExpiryDate_"+contentId).val(maxTime);
	}else{
		$("#order_contnet_maxExpiryDate_"+contentId).val("");
	}
}

function checkEquQueryOrderInfo(contentId,allEquFlag){
	// 如果选择的是所有终端
	var allEqu = false;
	if(allEquFlag != undefined && allEquFlag == "allEqu" ){
		allEqu = true;
	}
	// 记录选择的记录
	var equSelected = $("#equipment_content_equipment_syncOrderTable_"+contentId).find("td:has(:checked)");
	if(equSelected.length == 0 && !allEqu){
		$("#equipment_content_equipment_orderInfo_cardTable_"+contentId).empty();
		$("#equipment_content_equipment_syncOrderInfo_cardTable_"+contentId).empty();
		$("#order_contnet_maxExpiryDate_"+contentId).val("");
		$("#syncOrder_checkIds_"+contentId).addClass("hide");
		return;
	}
	var equCheckTds;
	var checkEquId = "";
	var equIdStr = "";
	var checkFlag = true;
	if(!allEqu){
		equSelected.each(function(){
			$equCheckTds = $(this).find("input");
			$equCheckTds.each(function(){
				equIdStr = $(this).val().split("_");
				if(equIdStr[1] != 1){
					checkFlag = false;
					return false;
				} 
				checkEquId = checkEquId + equIdStr[0] + ",";
			});
		});
	}
	if(!checkFlag){
		alert("您选择的终端有未启用的状态，请重新选择！");
		return;
	}
	var ajaxQueryEquOrderProduct = {
		customer_id:contentId,
		checkEquIds:checkEquId
	};
	ovtAjaxMethod(ajaxProPath+"queryOrderByEqu.do",ajaxQueryEquOrderProduct,function(data){
		if(data.code == 1){
			alert(data.value);
			return;
		}else{
			var showUserOrderTr = "<tr>"
			var policyInfoStr = "";
			var equOrderTrNum = 1;
			var maxExpiryDate = "";
			equipmentFunc.checkOrderMap.clearCustomer(contentId);
			var equOrderLength = data.value.length;
			if(equOrderLength > 0){
				$(data.value).each(function(n,inValue){
					if(n == 0){
						maxExpiryDate = inValue.maxExpiryDate;
						orderExpiryMap = inValue.orderMaxTime;
						var orderDateArray = orderExpiryMap.split("&");
						var checkMaxArray = "";
						for(var index=0;index < orderDateArray.length;index++){
							checkMaxArray = orderDateArray[index].split(",");
							equipmentFunc.checkOrderMap.put(contentId,checkMaxArray[0],checkMaxArray[1]);
						}
					}
					if(equOrderTrNum > 3){
						equOrderTrNum = 1;
					//	showUserOrderTr = showUserOrderTr + "</tr><tr><td><input type='checkbox' value="+inValue.productId+" onclick='checkOrderInfo("+contentId+");'/></td><td>"+inValue.productName+"</td><td><select id='equOrder_checkTds_policy_"+ contentId+"_"+ inValue.productId+"'>";
						showUserOrderTr = showUserOrderTr + "</tr><tr><td><input type='checkbox' value="+inValue.productId+" onclick='checkOrderInfo("+contentId+");'/></td><td>"+inValue.productName+"</td>";
					}else{
					//	showUserOrderTr = showUserOrderTr + "<td><input type='checkbox' value="+inValue.productId+" onclick='checkOrderInfo("+contentId+");'/></td><td>"+inValue.productName+"</td><td><select id='equOrder_checkTds_policy_"+ contentId+"_"+ inValue.productId+"'>";
						showUserOrderTr = showUserOrderTr + "<td><input type='checkbox' value="+inValue.productId+" onclick='checkOrderInfo("+contentId+");'/></td><td>"+inValue.productName+"</td>";
					}
					// $(inValue.policyList).each(function(m,innValue){
					//	 policyInfoStr = innValue.split(",");
					//	 showUserOrderTr = showUserOrderTr + "<option value="+inValue.productId+"_"+ policyInfoStr[0] + ">" + policyInfoStr[1] + "</option>";
					// });
					// showUserOrderTr = showUserOrderTr + "</select></td><td>"+ inValue.expiryDate +"</td>";
					showUserOrderTr = showUserOrderTr + "<td>"+ inValue.expiryDate +"</td>";
					equOrderTrNum = equOrderTrNum +1;
				});
			}else{
				showUserOrderTr = showUserOrderTr + "<td>终端下没有订购信息</td>";
			}
			showUserOrderTr = showUserOrderTr + "</tr>";
			$("#order_contnet_maxExpiryDate_"+contentId).val(maxExpiryDate);
			$("#equipment_content_equipment_orderInfo_cardTable_"+contentId).empty();
			$("#equipment_content_equipment_syncOrderInfo_cardTable_"+contentId).empty();
			$("#equipment_content_equipment_orderInfo_cardTable_"+contentId).append(showUserOrderTr);
			if(equOrderLength != 0){
				$("#syncOrder_checkIds_"+contentId).removeClass("hide");
			}
		}
	});
}

// 同步订购操作弹出页面数据初始化方法封装
function syncOrderInit(thisIcCard,indexPage){
	$("#equipment_content_equipment_syncOrderTable_"+thisIcCard).empty();
	$("#equipment_content_equipment_orderInfo_cardTable_"+thisIcCard).empty();
	$("#equipment_content_equipment_syncOrderInfo_cardTable_"+thisIcCard).empty();
	$("#order_contnet_maxExpiryDate_"+thisIcCard).val("");
	var equTrNum = 1;
	var equTotalNum = 0;
	var orderEquContent = "<tr>";
	var totalRowNum = 1;
	$(equipmentFunc.equVar.getValue(thisIcCard).value).each(function(){
		if(this.icNo != ""){
			equTotalNum = equTotalNum + 1;
			if(equTotalNum <= (indexPage - 1) * 6){
				return true;
			}
			if(equTotalNum > indexPage * 6){
				return true;
			}
			if(equTrNum > 3){
				equTrNum = 1;
				orderEquContent = orderEquContent + "</tr><tr><td><input type ='checkBox' value='"+this.icId+"_"+this.icStatus+"' name = 'orderCard_"+thisIcCard+"' onclick='checkEquQueryOrderInfo("+thisIcCard+");'/></td><td><input type='hidden' id='syncEqu_checkEquInfo_"+thisIcCard+"_"+this.icId+"' value='"+this.groupId+"."+this.equSlaveType+"_"+this.icNo+"'>"+this.icNo+"</input></td><td>"+this.equSlaveName+"("+this.cardDesc+")</td>";
			}else{
				orderEquContent = orderEquContent + "<td><input type ='checkBox' value='"+this.icId+"_"+this.icStatus+"' name = 'orderCard_"+thisIcCard+"' onclick='checkEquQueryOrderInfo("+thisIcCard+");'/></td><td><input type='hidden' id='syncEqu_checkEquInfo_"+thisIcCard+"_"+this.icId+"' value='"+this.groupId+"."+this.equSlaveType+"_"+this.icNo+"'>"+this.icNo+"</input></td><td>"+this.equSlaveName+"("+this.cardDesc+")</td>";
			}
			equTrNum = equTrNum +1;
		}
	});
	if(equTotalNum == 0){
		orderEquContent = orderEquContent + "<td>该用户下没有关联的终端</td>";
	}
	if(equTotalNum > 6){
		var showPageBar = "<tr><td width='30px'><span id='supplyFirstPage_"+thisIcCard+"' class='pageGroup clickable' onclick='supplyPageSelect(0,"+thisIcCard+");'>首页</span></td>" +
					"<td width='40px'>|<span id='supplyPrevPage_"+thisIcCard+"' class='pageGroup clickable' onclick='supplyPageSelect(1,"+thisIcCard+");'>上一页</span></td>" +
					"<td width='40px'>|<span id='supplyNextPage_"+thisIcCard+"' class='pageGroup clickable' onclick='supplyPageSelect(2,"+thisIcCard+");'>下一页</span></td>" +
					"<td width='30px'>|<span id='supplyLastPage_"+thisIcCard+"' class='pageGroup clickable' onclick='supplyPageSelect(3,"+thisIcCard+");'>末页</span></td>" +
					"<td width='40px'>|第<span id='supplyCurrentPage_"+thisIcCard+"' value='" + indexPage + "'>"+indexPage+"</span>页</td>" +
					"<td width='40px'>|共" + Math.ceil(equTotalNum/6) + "页</td>" +
					"<td width='70px'>|跳到<input type='text' maxlength='10' style='width: 20px;' id='supplyInputPage_"+thisIcCard+"' class='input_text'/>页</td>" +
					"<td width='510px'><span id='supplyGoBut_"+thisIcCard+"' class='pageGroup clickable' onclick='supplyPageSelect(4,"+thisIcCard+");'>GO</span></td></tr>";
		$("#supplyProductPageTableBar_"+thisIcCard).empty();
		$("#supplyProductPageTableBar_"+thisIcCard).append(showPageBar);
	}
	orderEquContent = orderEquContent + "</tr>";
	$("#equipment_content_equipment_syncOrderTable_"+thisIcCard).append(orderEquContent);
}

// 终端同步订购设备翻页操作事件
function supplyPageSelect(pageFlag,contentId){
	// 当前页
	var currentPage = $("#supplyCurrentPage_"+contentId).val();
	// 需要访问的页
	var indexPageNum = 1;
	// 终端总数
	var equLength = $(equipmentFunc.equVar.getValue(contentId).value).length;
	// 最大页数
	var maxPageNum = Math.ceil(equLength/6);
	if(pageFlag == '0'){ // 首页
		if(Number(currentPage) == 1){
			return;
		}
		$("#syncOrder_checkIds_"+contentId).addClass("hide");
		$("#equipment_content_equipment_syncOrderInfo_cardTable_"+contentId).empty();
		syncOrderInit(contentId,indexPageNum);
	}else if(pageFlag == '1'){ // 上一页
		if(Number(currentPage) == 1){
			return;
		}else{
			$("#syncOrder_checkIds_"+contentId).addClass("hide");
			$("#equipment_content_equipment_syncOrderInfo_cardTable_"+contentId).empty();
			indexPageNum = Number(currentPage) - 1;
		}
		syncOrderInit(contentId,indexPageNum);
	}else if(pageFlag == '2'){ // 下一页
		indexPageNum = Number(currentPage) + 1; 
		if(indexPageNum > maxPageNum){
			return;
		}
		$("#syncOrder_checkIds_"+contentId).addClass("hide");
		$("#equipment_content_equipment_syncOrderInfo_cardTable_"+contentId).empty();
		syncOrderInit(contentId,indexPageNum);
	}else if(pageFlag == '3'){ // 末页
		if(Number(currentPage) == maxPageNum){
			return;
		}
		$("#syncOrder_checkIds_"+contentId).addClass("hide");
		$("#equipment_content_equipment_syncOrderInfo_cardTable_"+contentId).empty();
		syncOrderInit(contentId,maxPageNum);
	}else if(pageFlag == '4'){ // 根据输入页码跳到第几页
		var inputPageNum = $("#supplyInputPage_"+contentId).val();
		if(inputPageNum == "" || Number(currentPage) == Number(inputPageNum)){
			return;
		}
		$("#syncOrder_checkIds_"+contentId).addClass("hide");
		$("#equipment_content_equipment_syncOrderInfo_cardTable_"+contentId).empty();
		syncOrderInit(contentId,inputPageNum);
	}
}

function seacherUser(thisIcCard){
	//如果已经打开了，则触发打开的tab，不再增加页面
	if($("#tab_title_"+thisIcCard).length>=1){
		$("#tab_title_"+thisIcCard).trigger("click");//模拟点击
		return;
	}
	//只能打开固定个tab标签，具体个数由系统配置
	if($("#tab_title").children().length > WebInitParameter.SEARCH_MAX_TAB_NUM){
		alert(WebInitParameter.MSG_BUSI_C01);
		return;
	}
	
	var searchRes = {customer_id:thisIcCard};
	//得到当前操作的用户
	ovtAjaxMethod(ajaxBusPath+"ajaxSearchUser.do",searchRes,function(data){
		
		var currentUserInfo;
		$(data.value.objList).each(function(n,value){
			if(value.id == thisIcCard){
				currentUserInfo = value;
			}
		});
		//增加tab的标题
		$("#tab_title").append("<span class='tab_title_head tab_title_head_out' id='tab_title_"+thisIcCard+"'>"+currentUserInfo.name+"&nbsp;<span class='ui_icon dialog_close_icon'></span></span>");
		
		//增加tab的内容
		
		//增加用户信息区
		$("#tab_main").append(businessContent(currentUserInfo,thisIcCard));
		//添加html内容完毕

		//增加用户信息
		userInfoInit($("#customer_info_div_"+thisIcCard),"_"+thisIcCard,currentUserInfo);
		
		//处理修改用户信息的js操作				

		//禁止修改内容
		disableCustomer(thisIcCard,true);
		
		// 宽带业务  add by jhg
		bandwidthFlag = currentUserInfo.bandwidthFlag;
		bandwidthSubmitFlag = currentUserInfo.bandwidthSubmitFlag;
		isLongSTBNoFlag = currentUserInfo.isLongSTBNoFlag;
		// 是否按标准策略计费 add by jhg 2013-03-18
		isPayByStandard = currentUserInfo.isPayByStandard;
		// 退订时退费计算方式 add by jhg 2013-05-17
		isPayCalcFeeType = currentUserInfo.isPayCalcFeeType;
		// 订购限制是否启用
		isOrderPermitType = currentUserInfo.isOrderPermitType;
		// 设备输入方式
		equInputType = currentUserInfo.equInputType;
		// 费用补交强制提醒
		forceWarnFlag = currentUserInfo.forceWarnFlag;
		showOrHiddenBandWidth(thisIcCard,bandwidthFlag);
		showOrHiddenBandWidthSubmitButton(thisIcCard,bandwidthSubmitFlag);
		// 缴费时是否计算可用余额开关 2012-10-25 liuxu
		paymentUseableMoneyFlag = currentUserInfo.paymentUseableMoneyFlag;
		// 设置是否支持超长机顶盒编号的输入框的显示
		showLongSTBInputDIV(thisIcCard,isLongSTBNoFlag);
		
		/*用户性别选择判断*/
		$("#regMale_"+thisIcCard).click(function(){
			if($("#regMale_"+thisIcCard).attr("checked")==true){
				$("#regFemale_"+thisIcCard).attr("checked",false);
			}
		});
		$("#regFemale_"+thisIcCard).click(function(){
			if($("#regFemale_"+thisIcCard).attr("checked")==true){
				$("#regMale_"+thisIcCard).attr("checked",false);
			}
		});
		/*输入框得到焦点改变样式方法*/
		$(".input_text_"+thisIcCard).focus(function(){
			if(!$(this).attr("readonly")){
				$(this).addClass("text_focus");
			}
		}).blur(function(){
			$(this).removeClass("text_focus");
		})				
		
		
		/*所属集团弹窗方法*/
		$("#customer_group_"+thisIcCard).click(function(){
			groupTextClick("_"+thisIcCard);
		});

		/*搜索按钮响应ajax操作*/
		$("#customer_group_but_search_"+thisIcCard).click(function(){
			groupSearchButClick("_"+thisIcCard);
		});
				
		/*所属集团弹出取消按钮方法*/
		$("#customer_group_but_cancel_"+thisIcCard).click(function(){
			groupCancelButClick("_"+thisIcCard);
		});
		
		/*所属集团弹出清空按钮方法*/
		$("#customer_group_but_clear_"+thisIcCard).click(function(){
			groupCleanButClick("_"+thisIcCard);
		});

		/*所有的文本框增加新样式*/
		$(".input_text_"+thisIcCard).addClass("input_text");
		
		
		//用户基本信息控制
		$("#customer_info_title_"+thisIcCard).click(function(){
			setHide("customer_oper_content_"+thisIcCard,"customer_oper_title_icon_"+thisIcCard);
			changeHide("customer_info_content_"+thisIcCard,"search_info_title_icon_"+thisIcCard);
		});
		$("#customer_oper_content_"+thisIcCard).addClass("hide");
		//用户基本操作控制
		//$("#customer_oper_content_"+thisIcCard).addClass("hide");
		$("#customer_oper_title_"+thisIcCard).click(function(){
			setHide("customer_info_content_"+thisIcCard,"search_info_title_icon_"+thisIcCard);
			changeHide("customer_oper_content_"+thisIcCard,"customer_oper_title_icon_"+thisIcCard);
		});
		
		//模拟双击操作，基本操作信息
		$("#customer_oper_title_"+thisIcCard).trigger("click");
		
		//修改按钮的方法
		$("#modify_customer_button_"+thisIcCard).click(function(){
			disableCustomer(thisIcCard,false);
		});
		//----------------------------------用户账号和用户编号同步---------------------------------------
		$("#customer_coding_"+thisIcCard).change(function(){
			$("#customer_account_"+thisIcCard).val($("#customer_coding_"+thisIcCard).val());
		});
		
		$("#customer_account_"+thisIcCard).change(function(){
			$("#customer_coding_"+thisIcCard).val($("#customer_account_"+thisIcCard).val());
		});
		
		//---------------------------------------修改信息时验证---开始--------------------------------------------
		
		/*用户编号验证*/
		$("#customer_coding_"+thisIcCard).blur(function(){
			if(!$("#customer_coding_"+thisIcCard).attr("readonly")){
				commonFunc.textVilidator(false,$("#customer_coding_"+thisIcCard),undefined,WebInitParameter.MSG_INFO_C10);
			}
		});
		
		/*用户账号验证*/
		$("#customer_account_"+thisIcCard).blur(function(){
			if(!$("#customer_account_"+thisIcCard).attr("readonly")){
				commonFunc.textVilidator(false,$("#customer_account_"+thisIcCard),undefined,WebInitParameter.MSG_INFO_C14);
			}
		});
		

		/*用户名称验证*/
		$("#customer_name_"+thisIcCard).blur(function(){
			if(!$("#customer_name_"+thisIcCard).attr("readonly")){
				commonFunc.textVilidator(false,$("#customer_name_"+thisIcCard),undefined,WebInitParameter.MSG_INFO_C09);
			}
		});
		
		/*电子邮箱验证*/
		$("#customer_email_"+thisIcCard).blur(function(){
			if(!$("#customer_email_"+thisIcCard).attr("readonly")){
				commonFunc.textVilidator(true,$("#customer_email_"+thisIcCard),WebInitParameter.CUSTOMER_EMAIL_VILIDATE_REGEX,WebInitParameter.MSG_INFO_C11);
			}
		});
		
		/*固定电话号码验证*/
		$("#customer_phone_"+thisIcCard).blur(function(){
			if(!$("#customer_phone_"+thisIcCard).attr("readonly")){
				commonFunc.textVilidator(true,$("#customer_phone_"+thisIcCard),WebInitParameter.CUSTOMER_TEL_VILIDATE_REGEX,WebInitParameter.MSG_INFO_C12);
			}
		});
		
		/*手机号码验证*/
		$("#customer_cellPhone_"+thisIcCard).blur(function(){
			if(!$("#customer_cellPhone_"+thisIcCard).attr("readonly")){
				commonFunc.textVilidator(true,$("#customer_cellPhone_"+thisIcCard),WebInitParameter.CUSTOMER_MOBILE_VILIDATE_REGEX,WebInitParameter.MSG_INFO_C13);
			}
		});
		//-------------------------------------修改用户信息验证--结束----------------------------------------------
		
		//增加用户编号失去焦点，账号信息联动方法
		$("#customer_coding_"+thisIcCard).blur(function(){
			$("#customer_account_"+thisIcCard).val($("#customer_coding_"+thisIcCard).val());
		});
		
		//取消按钮的方法
		$("#cancel_modify_customer_button_"+thisIcCard).click(function(){
			$("#customer_info_form_"+thisIcCard)[0].reset();
			//重新设置数据值
			setUserInfo("_"+thisIcCard,currentUserInfo);
			disableCustomer(thisIcCard,true);
		});
		//保存按钮的方法
		$("#submit_modify_customer_button_"+thisIcCard).click(function(){

			//显示蒙板和提示信息
			showMsg(WebInitParameter.MSG_SHOW_C01);
			

			ajaxResponse = getUserInfo("_"+thisIcCard);
//					alert("ajaxResponse.customer_id:"+ajaxResponse.customer_id);
			ovtAjaxMethod(ajaxRegPath+"ajaxUserInfoModify.do",ajaxResponse,function(data,textStatus){
				if(data.code == "0"){
					alert(WebInitParameter.MSG_INFO_C01);
					//将保存的后的用户信息更新一下
					var searchAngin = {customer_id:thisIcCard};
					//得到当前操作的用户
					ovtAjaxMethod(ajaxBusPath+"ajaxSearchUser.do",searchAngin,function(data){
						$(data.value.objList).each(function(n,value){
							if(value.id == thisIcCard){
								currentUserInfo = value;
							}
						});
						//更新用户信息
						setUserInfo("_"+thisIcCard,currentUserInfo);
					});
				}else{
					alert(WebInitParameter.MSG_INFO_C02+data.value);
					//更新用户信息
					setUserInfo("_"+thisIcCard,currentUserInfo);
				}
				
				
				//禁止修改用户信息
				disableCustomer(thisIcCard,true);

				//隐藏蒙板和提示信息
				hideMsg();

				
			});
		});
		
		//银行代扣审核按钮响应
		$("#bankinfo_verify_customer_button_"+thisIcCard).click(function(){
			//初始化参数信息
			//customerParameterInit(thisIcCard, "-1");
			customerInfoInit(thisIcCard, currentUserInfo);
			
			//显示控制
			var $content = $("#customer_bankinfo_verify_div_"+thisIcCard);
			$content.css("top",event.clientY/2-$(this).height()/2);
			$content.css("left",event.clientX);
			$(this).blur();
			$content.removeClass("hide");
			$("#mask").toggle();
		});
		
		//银行代扣审核修改按钮响应
//					$("#customer_bankinfo_verify_button_modify_"+thisIcCard).click(function(){
//						$("#customer_bankinfo_verify_div_"+thisIcCard).addClass("hide");
//						$("#mask").toggle();
//						var $relateBank = $("#customer_bankinfo_verify_select_relateBank_"+thisIcCard).val();
//						var $bankAccount = $("#customer_bankinfo_verify_text_bankInfo_"+thisIcCard).val();
//						var $bankCheckFlag = $("#customer_bankinfo_verify_select_verifyFlag_"+thisIcCard).val();
//						
//						ajaxChangeBankCheckFlag(ajaxRegPath,thisIcCard,$relateBank,$bankAccount,$bankCheckFlag);
//						
//					});
		
		//银行代扣审核取消按钮响应
		$("#customer_bankinfo_verify_button_cancel_"+thisIcCard).click(function(){
			$("#customer_bankinfo_verify_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
		//银行代扣功能
		function ajaxChangeBankCheckFlag(ajaxPath,customerID,relateBank,bankAccount,bankCheckFlag){
			var ajaxResponse={
					customerId:customerID,
					customer_relateBank:relateBank,
					customer_bankAccount:bankAccount,
					customer_bankCheckFlag:bankCheckFlag
			};
			ovtAjaxMethod(ajaxPath+"ajaxChangeBankCheckFlag.do",ajaxResponse,function(data){
				if(data.code == "0"){
					alert(WebInitParameter.MSG_BUSI_C47);
				}else{
					alert(WebInitParameter.MSG_BUSI_C46+data.value);
				}
				var searchRes = {customer_id:thisIcCard};
				//得到当前操作的用户
				ovtAjaxMethod(ajaxBusPath+"ajaxSearchUser.do",searchRes,function(data){
					$(data.value.objList).each(function(n,value){
						if(value.id == thisIcCard){
							currentUserInfo = value;
						}
						//刷新用户信息
						setUserInfo("_"+thisIcCard,currentUserInfo);
					});
				});
			});
		}
		
//					//代扣银行资料审核：对银行卡账号进行验证
//					$("#customer_bankinfo_verify_text_bankInfo_"+thisIcCard).blur(function(){
//						commonFunc.textVilidator(false,$("#customer_bankinfo_verify_text_bankInfo_"+thisIcCard),WebInitParameter.CUSTOMER_BANK_ACCOUNT_VILIDATE_REGEX,"请输入正确的银行账号！");
//					});
		
		//银行代扣资料审核：处理代扣银行选择
//					$("#customer_bankinfo_verify_select_relateBank_"+thisIcCard).blur(function() {
//						var $bankValue = $("#customer_bankinfo_verify_select_relateBank_"+thisIcCard).val();
//						if($bankValue == -1) {
//							$("#customer_bankinfo_verify_text_bankInfo_"+thisIcCard).attr("disabled", true);
//						} else {
//							$("#customer_bankinfo_verify_text_bankInfo_"+thisIcCard).attr("disabled", false);
//						}
//					});
		
		//增加点击变色方法和滑过变色方法
		$("#tab_title_"+thisIcCard).click(function(){
			$(this).removeClass("tab_title_head_out");
			$(this).removeClass("tab_title_head_over");
			$(this).addClass("tab_title_head_click");
			$(this).siblings().removeClass("tab_title_head_click").addClass("tab_title_head_out");
			
			//此处增加显示本tab页的方法
			$("#tab_content_"+thisIcCard).siblings().addClass("hide");//隐藏其他tab内容
			$("#tab_content_"+thisIcCard).removeClass("hide");//显示当前tab
			// 如果打开了多个用户标签页且基本操作为"宽带业务"时
			// 切换标签时刷需要刷新宽带业务提交记录的提示信息 add by jhg
			if($("#tab_title").children().length>2 && ($("#bandwidth_title_"+thisIcCard).hasClass("tab_title_head_click"))){
				//if(bandwidthFlag != "0" && bandwidthSubmitFlag == "0"){
					showSubmitTip("_"+thisIcCard,thisIcCard);
				//}
			}
		}).hover(function(){
			if(!$(this).hasClass("tab_title_head_click")){
				$(this).removeClass("tab_title_head_out");
				$(this).removeClass("tab_title_head_click");
				$(this).addClass("tab_title_head_over");
			}
		},function(){
			if(!$(this).hasClass("tab_title_head_click")){
				$(this).removeClass("tab_title_head_over");
				$(this).removeClass("tab_title_head_click");
				$(this).addClass("tab_title_head_out");
			}
		});
		//增加关闭标签变色方法和点击关闭方法
		$("#tab_title_"+thisIcCard).find("span").hover(function(){
			$(this).removeClass("dialog_close_icon");
			$(this).addClass("dialog_close_over_icon");
		},function(){
			$(this).removeClass("dialog_close_over_icon");
			$(this).addClass("dialog_close_icon");
		}).click(function(){
			$("#tab_title_"+thisIcCard).remove();//删掉该tab页
			$("#print_back_"+thisIcCard).empty();//先删除打印的
			$("#tab_content_"+thisIcCard).remove();//删掉该tab内容
			$("#search_title").trigger("click");//模拟搜索标题点击
		});
		
		
		//默认为被点击
		$("#tab_title_"+thisIcCard).trigger("click");//模拟点击
		
		//以下为增加其他操作的显示和事件
		
		//增加功能操作标签的滑过变色方法
		$("#tab_main_tab_title_"+thisIcCard).find("span").hover(function(){
			if(!$(this).hasClass("tab_title_head_click")){
				$(this).removeClass("tab_title_head_out");
				$(this).removeClass("tab_title_head_click");
				$(this).addClass("tab_title_head_over");
			}
		},function(){
			if(!$(this).hasClass("tab_title_head_click")){
				$(this).removeClass("tab_title_head_over");
				$(this).removeClass("tab_title_head_click");
				$(this).addClass("tab_title_head_out");
			}
		});
//					$("#tab_main_tab_title_"+thisIcCard).find("span").click(function(){
//						$(this).removeClass("tab_title_head_out");
//						$(this).removeClass("tab_title_head_over");
//						$(this).addClass("tab_title_head_click");
//						$(this).siblings().removeClass("tab_title_head_click").addClass("tab_title_head_out");
//						
//						//刷新信息
//						flushAll();
//						
//						//此处增加显示本操作tab页的方法
//						var tabId = $(this).get(0).id;
//						var tabIdArr = tabId.split("_");
//						var tabContentId = tabIdArr[0]+"_content_"+tabIdArr[2];
//						$("#"+tabContentId).removeClass("hide").siblings().addClass("hide");
//						
//					});
		//刷新设备响应
		$("#equipment_title_"+thisIcCard).click(function(){
			titleCommonFunc($(this));
			flushEquipment();
		});
		//刷新订购响应
		$("#product_title_"+thisIcCard).click(function(){
			titleCommonFunc($(this));
			flushOrder();
		});
		// 刷新授权响应 liuxu 20120521
		$("#authorize_title_"+thisIcCard).click(function(){
			titleCommonFunc($(this));
			flushAuthorize();
		});
		//刷新账户响应
		$("#other_title_"+thisIcCard).click(function(){
			titleCommonFunc($(this));
			flushAccount();
		});
		//刷新日志响应
		$("#log_title_"+thisIcCard).click(function(){
			titleCommonFunc($(this));
			flushBusiLog();
		});
		//刷新发票信息响应
		$("#invoice_title_"+thisIcCard).click(function(){
			titleCommonFunc($(this));
			flushInvoiceTab();
		});
		// 刷新宽带业务信息
		$("#bandwidth_title_"+thisIcCard).click(function(){
			titleCommonFunc($(this));
			// 同步宽带账户信息
			// synBandWidth(thisIcCard);
			// 刷新宽带信息
			flushBandWidth("1");
			// 刷新宽带产品
			allBwServsFunc({contentId:thisIcCard,newPage:0});
		});
		//点击标题公用方法
		function titleCommonFunc($this){
			$this.removeClass("tab_title_head_out")
			.removeClass("tab_title_head_over")
			.addClass("tab_title_head_click")
			.siblings().removeClass("tab_title_head_click").addClass("tab_title_head_out");
			//此处增加显示本操作tab页的方法
			var tabId = $this.attr("id");
			var tabIdArr = tabId.split("_");
			var tabContentId = tabIdArr[0]+"_content_"+tabIdArr[2];
			$("#"+tabContentId).removeClass("hide").siblings().addClass("hide");
		}
		//刷新设备
		function flushEquipment(){
			flushCustomerEqu("_"+thisIcCard,thisIcCard,bindingInit);
		}
		//刷新订购
		function flushOrder(){
			flushOrder2Var("_"+thisIcCard,thisIcCard,flushProducts);
		}
		// 刷新授权
		function flushAuthorize() {
			flushCustomerAuthorize("_"+thisIcCard,thisIcCard);
		}
		//刷新账户
		function flushAccount(){
			getAccountHis({customerId:thisIcCard,contentId:"_"+thisIcCard,newPage:0});
			flushCustomerAccount($("#customer_acount_info_"+thisIcCard),"_"+thisIcCard,thisIcCard);
		}
		//刷新日志
		function flushBusiLog(){
			getBusinessLog(0);
		}
		//刷新发票
		function flushInvoiceTab(){
			receiptFunc.flushReceiptAndInvoice({contentId:"_"+thisIcCard,customerId:thisIcCard,newPage:0});
//						//发票信息
//						flushInovice({contentId:"_"+thisIcCard,customerId:thisIcCard,newPage:0});
//						//缴费历史
//						receiptFunc.flushReceipt({contentId:"_"+thisIcCard,customerId:thisIcCard,newPage:0});
		}
		//刷新宽带业务 add by jhg
		function flushBandWidth(synFlag){
			// 刷新宽带账户信息
			flushBandWidthAccount("_"+thisIcCard,thisIcCard,synFlag);
			//if(bandwidthFlag != "0" && bandwidthSubmitFlag == "0"){
			// 刷新提交记录的提示信息
			showSubmitTip("_"+thisIcCard,thisIcCard);
			//}
			// 重置操作按钮
			// 业务变更
			$("#bandwidth_content_bandwidth_but_modifySub_"+thisIcCard).attr("disabled",true);
			// 密码重置
			$("#bandwidth_content_bandwidth_but_resetPWSub_"+thisIcCard).attr("disabled",true);
			// 密码修改
			$("#bandwidth_content_bandwidth_but_changePWSub_"+thisIcCard).attr("disabled",true);
			// 充值
			$("#bandwidth_content_bandwidth_but_renewAndfeeSub_"+thisIcCard).attr("disabled",true);
			// 销户
			$("#bandwidth_content_bandwidth_but_repoSub_"+thisIcCard).attr("disabled",true);
			// 信息同步
			$("#bandwidth_content_bandwidth_but_syncSub_"+thisIcCard).attr("disabled",true);
			// 删除
			$("#bandwidth_content_bandwidth_but_deleteSub_"+thisIcCard).attr("disabled",true);
		}
		//刷新完整信息
		function flushAll(){
			//设备信息
			flushEquipment();
			//订购信息
			flushOrder();
			//授权信息
			flushAuthorize();
			//账户信息
			flushAccount();
			//营业日志信息
			flushBusiLog();
			//刷新发票
			flushInvoiceTab();
			//刷新宽带业务
			if(bandwidthFlag != "0"){
				flushBandWidth("0");
			}
		}
		
		//缴费操作
		paymentInit("_"+thisIcCard,thisIcCard,paymentUseableMoneyFlag);
		//默认点击设备信息
		$("#equipment_title_"+thisIcCard).trigger("click");
		
		//----------------------------------收费项确认继续按钮操作--------------------------------------

		//收费项继续
		$("#confirm_continue_"+thisIcCard).click(function(){
			confirmContinueBut("_"+thisIcCard);
		});
		//收费项返回
		$("#confirm_cancel_"+thisIcCard).click(function(){
			confirmCancel("_"+thisIcCard);
			
		});

		
		//----------------------------------设备信息操作------------------------------------------------
		
		//刷新当前设备信息按钮
		$("#equipment_content_equipment_but_info_"+thisIcCard).click(function(){
//						flushCustomerEqu("_"+thisIcCard,thisIcCard,bindingInit);
			flushEquipment();
		});
		
		
		//增加设备按钮
		$("#equipment_content_equipment_but_equAdd_"+thisIcCard).click(function(event){
			//获取主终端信息
//						var $trs = $("#equipmentTable_"+thisIcCard).find("tr:contains(主终端)");
			
			var options = "";
//						$("#equVar_"+thisIcCard).find("tr").each(function(){
//							if($(this).find("td").eq(3).text()=="0"){
//								options = options + "<option value= '"+$(this).find("td").eq(1).text()+"'>"+$(this).find("td").eq(1).text()+"&nbsp;"+"&nbsp;"+ WebInitParameter.CHINESE_SEQ + getChineseNum($(this).find("td").eq(0).text())+ WebInitParameter.CHINESE_GROUP+"</option>";
//							}
//						});
			
			$(equipmentFunc.equVar.getValue(thisIcCard).value).each(function(){
				if(this.equSlaveType=="0"){
					options = options + "<option value= '"+this.icNo+"'>"+this.icNo+"&nbsp;"+"&nbsp;"+ this.equSlaveName+"</option>";
				}
			});
			$("#equipment_content_equipment_addEquipment_select_main_"+thisIcCard).find("option:not(:first-child)").remove();
			
			if(options!=""){
				$("#equipment_content_equipment_addEquipment_select_main_"+thisIcCard).append(options);
			}
			
			//清除原有信息
			$("#equipment_content_equipment_addEquipment_text_card_"+thisIcCard).val("");
			$("#equipment_content_equipment_addEquipment_text_stb_"+thisIcCard).val("");
			$("#icCardModel_"+thisIcCard).val("");
			$("#stbModel_"+thisIcCard).val("");
			
			//默认选择主终端
			$("#equipment_content_equipment_addEquipment_readio_main_"+thisIcCard).trigger("click");
			//默认选择机卡绑定
			if(WebInitParameter.STB_IC_BAND == WebInitParameter.STB_IC_BAND_BAND) {
				$("#equipment_content_equipment_addEquipment_checkbox_bindingType_"+thisIcCard).attr("checked",true);
			}
				
			//确定位置
			$("#equipment_content_equipment_addEquipment_div_"+thisIcCard).css("top",event.clientY+$(this).scrollTop()+$(this).height()+"px");
			$("#equipment_content_equipment_addEquipment_div_"+thisIcCard).css("left",event.clientX+$(this).scrollLeft()+"px");
			$("#equipment_content_equipment_addEquipment_div_"+thisIcCard).removeClass("hide");
			$("#mask").toggle();
		});
		
		// add by jhg start
		// 校验输入帐号的方法
		function checkBwNoValue(bwValue){
			var flag = true;
			var re = /^[A-Za-z0-9]*$/;
			if(bwValue.search(re)==-1){
				alert("宽带帐号输入非法，请重新输入！");
				flag = false;
			}
			return flag;
		}
		// 校验输入密码的方法
		function checkBwNoPasswordValue(pwStr,bwPasswordValue){
			var flag = true;
			var re = /^[A-Za-z0-9]*$/;
			if(bwPasswordValue.search(re)==-1){
				alert(pwStr+"输入非法，请重新输入！");
				flag = false;
			}else if(bwPasswordValue.length < 6 || bwPasswordValue.length>16){
				alert("请输入长度至少为6位且不超过16位的"+pwStr+"！");
				flag = false;
			}
			return flag;
		}
		// 校验输入金额的方法
		function checkFeeValue(feeValue){
			var flag = true;
			if(feeValue == ""){
				alert("请输入充值金额！");
				flag = false;
			}else{
				var re = /^[+-]?\d+\.?\d*$/;
				if(feeValue.search(re)==-1){
					alert("请输入数值类型的金额！");
					flag = false;
				}else if(feeValue > 10000000){
					alert("输入金额不能大于10000000！");
					flag = false;
				}
			}
			return flag;
		}
		
		//新建帐户按钮 
		$("#bandwidth_content_bandwidth_but_bwAdd_"+thisIcCard).click(function(event){
			//清除原有信息
			$("#bandwidth_content_addBandWidth_bwNo_"+thisIcCard).val("");
			$("#bandwidth_content_addBandWidth_macAddr_"+thisIcCard).val("");
			$("#setBandWidthProductBoxType_"+thisIcCard).val("0");
			$("#bandwidth_content_addBandWidth_descript_"+thisIcCard).val("");
			$("#bandwidth_content_addBandWidth_fee_"+thisIcCard).val("");
			
			//确定位置
			$("#bandwidth_content_addBandWidth_div_"+thisIcCard).css("top",event.clientY+$(this).scrollTop()+$(this).height()+"px");
			$("#bandwidth_content_addBandWidth_div_"+thisIcCard).css("left",event.clientX+$(this).scrollLeft()+"px");
			$("#bandwidth_content_addBandWidth_div_"+thisIcCard).css("width","600px");
			$("#bandwidth_content_addBandWidth_div_"+thisIcCard).css("height","203px");
			// 设置这个样式，宽、高才会生效
			$("#bandwidth_content_addBandWidth_div_"+thisIcCard).css("overflow","hidden");
			$("#bandwidth_content_addBandWidth_div_"+thisIcCard).removeClass("hide");
			$("#mask").toggle();
		});
		
		// 选号按钮操作事件
		$("#bandwidth_content_addBandWidth_select_but_"+thisIcCard).click(function(event){
			var bwNo = $("#bandwidth_content_addBandWidth_bwNo_"+thisIcCard).val();
			if(!checkBwNoValue(bwNo)){
				return;
			}
			var $content = $("#bwinfo_content_list_div_"+thisIcCard);
			$content.css("top",event.clientY+$(this).scrollTop()+$(this).height()+"px");
			$content.css("left",event.clientX+$(this).scrollLeft()+"px");
			$content.css("width","200px");
			$content.css("height","130px");
			$content.removeClass("hide");
			$("#mask").toggle();
			$("#bandwidth_content_addBandWidth_select_but_"+thisIcCard).attr("disabled",true);
			$("#bandwidth_content_addBandWidth_but_add_"+thisIcCard).attr("disabled",true);
			$("#bandwidth_content_addBandWidth_but_cancel_"+thisIcCard).attr("disabled",true);
			$("#bwinfo_query_text_"+thisIcCard).val(bwNo);
			selectBwNoFunc(bwNo);
		})
		
		// 选号弹出框"查询"操作事件
		$("#bwinfo_but_query_"+thisIcCard).click(function(event){
			var bwNo = $("#bwinfo_query_text_"+thisIcCard).val();
			selectBwNoFunc(bwNo);
		})
		
		// 宽带帐号查询方法
		function selectBwNoFunc(bwNo){
			// 检测合法性 
			if(!checkBwNoValue(bwNo)){
				 return;
			}
			var ajaxBandWidthNoResponse = {
				bandwidthNo:bwNo
			};
			// ajax提交信息
			ajaxConfirmPath = "../../../../bossCoreResource/bandWidth.do?methodToCall=getQuery";
			ovtAjaxMethod(ajaxConfirmPath,ajaxBandWidthNoResponse,function(data){
				// 清空表数据
				$("#bwInfoTable_"+thisIcCard).empty();
				// 用查询数据填充表结构
				$("#bwInfoTable_"+thisIcCard).find("tr:not(:first-child)").remove();
				var bwInfoContent = "";
				if(data.code != "0"){
					alert(data.value);
					hideMsg();
					return;
				}
				if($(data.value).length==0){
					bwInfoContent = "<tr><td colspan='2'>没有找到匹配的宽带帐号</td></tr>";
				}else{
					$(data.value).each(function(n,inValue){
						//得到宽带帐号信息
						var bwInfo = "<tr align='center'>";
						if ($(inValue).length>0){
							$(inValue).each(function(nn,innVal){
								// 默认选择第一行
								if(n == 0){
									bwInfo = bwInfo + "<td width='50px'><input type='radio' checked='true' name='bwInfo_"+thisIcCard+"' id='"+innVal.id+"' value='"+innVal.bandWidthNo+"'/></td><td width='150px'>"+innVal.bandWidthNo+"</td>";
								}else{
									bwInfo = bwInfo + "<td width='50px'><input type='radio' name='bwInfo_"+thisIcCard+"' id='"+innVal.id+"' value='"+innVal.bandWidthNo+"'/></td><td width='150px'>"+innVal.bandWidthNo+"</td>";
								}
							});
						}
						bwInfo = bwInfo + "</tr>"
						bwInfoContent = bwInfoContent + bwInfo;
						//保存隐藏宽带帐号关系对象
						bandwidthFunc.bandWidthVar.put(thisIcCard,inValue.bandWidthNo,inValue);
					});
				}
				$("#bwInfoTable_"+thisIcCard).append(bwInfoContent);
				
				// 行添加鼠标悬停事件
				$("#bwInfoTable_"+thisIcCard).find("tr").bind("mouseover",function(){
					$(this).css("background-color","rgb(238,210,169)");
				});
				
				// 行添加鼠标移除事件
				$("#bwInfoTable_"+thisIcCard).find("tr").bind("mouseout",function(){
					$(this).css("background-color","rgb(215,235,249)");			
				});
			})
		}
		
		// 选号弹出框按钮操作-- 取消按钮事件
		$("#bwinfo_but_cancel_"+thisIcCard).click(function(){
			$("#bwinfo_content_list_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
			$("#bandwidth_content_addBandWidth_select_but_"+thisIcCard).attr("disabled",false);
			$("#bandwidth_content_addBandWidth_but_add_"+thisIcCard).attr("disabled",false);
			$("#bandwidth_content_addBandWidth_but_cancel_"+thisIcCard).attr("disabled",false);
		});
		
		// 选号弹出框按钮操作-- 确定按钮事件
		$("#bwinfo_but_select_"+thisIcCard).click(function(){
			var bwInfoSelectValue = $("#bwInfoTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(0).find("input").val();
			$("#bandwidth_content_addBandWidth_bwNo_"+thisIcCard).val(bwInfoSelectValue);
			$("#bwinfo_content_list_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
			$("#bandwidth_content_addBandWidth_select_but_"+thisIcCard).attr("disabled",false);
			$("#bandwidth_content_addBandWidth_but_add_"+thisIcCard).attr("disabled",false);
			$("#bandwidth_content_addBandWidth_but_cancel_"+thisIcCard).attr("disabled",false);
		});
		
		// 新建用户时产品下拉列表选择操作事件
		$("#setBandWidthProductBoxType_"+thisIcCard).change(function(event){
			var productVal = $(this).val();
			var productDesc = bwServiceDescMap.get(productVal);
			var productPrice;
			if(productVal != "0"){
				productPrice = productVal.split("_")[3];
				$("#bandwidth_content_addBandWidth_fee_"+thisIcCard).val(productPrice);
				$("#bandwidth_content_addBandWidth_descript_"+thisIcCard).val(productDesc);
			}else{
				$("#bandwidth_content_addBandWidth_fee_"+thisIcCard).val("");
				$("#bandwidth_content_addBandWidth_descript_"+thisIcCard).val("");
			}
		})
		
		// 新开账户操作 -- 取消按钮事件
		$("#bandwidth_content_addBandWidth_but_cancel_"+thisIcCard).click(function(){
			$("#bandwidth_content_addBandWidth_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
			$("#bandwidth_content_addBandWidth_but_add_"+thisIcCard).attr("disabled",false);
		});
		
		// 新开账户操作 -- 确定按钮事件
		$("#bandwidth_content_addBandWidth_but_add_"+thisIcCard).click(function(){
			var ajaxUserBwResponse = {
					customer_id:thisIcCard,
					bandwidthID:"",
					bandwidthNo:"",
					orderId:"",
					stragyId:"",
					serviceId:"",
					price:"",
					feeValue :"",
					orderDesc:"",
					password:"",
					macAddr:""
			};
			ajaxUserBwResponse.bandwidthNo = $("#bandwidth_content_addBandWidth_bwNo_"+thisIcCard).val();
			var bandwidthInfo = bandwidthFunc.bandWidthVar.get(thisIcCard,ajaxUserBwResponse.bandwidthNo); 
			if(undefined != bandwidthInfo){
				ajaxUserBwResponse.bandwidthID = bandwidthInfo.id;
				ajaxUserBwResponse.password = bandwidthInfo.password;
			}else{
				ajaxUserBwResponse.bandwidthID = "";
				ajaxUserBwResponse.password = "";
			}
			// orderValue 宽带产品信息
			// 第一位为 产品类型 
			// 第二位为 产品ID 
			// 第三位为 策略ID 
			// 第四位为 产品价格  
			// 第五位为 服务ID
			var orderValue = $("#setBandWidthProductBoxType_"+thisIcCard).val().split("_");
			ajaxUserBwResponse.orderId = orderValue[1];
			ajaxUserBwResponse.stragyId = orderValue[2];
			ajaxUserBwResponse.price = orderValue[3];
			ajaxUserBwResponse.serviceId = orderValue[4];
			ajaxUserBwResponse.feeValue = $("#bandwidth_content_addBandWidth_fee_"+thisIcCard).val();
			ajaxUserBwResponse.orderDesc = $("#bandwidth_content_addBandWidth_descript_"+thisIcCard).val();
			ajaxUserBwResponse.macAddr = $("#bandwidth_content_addBandWidth_macAddr_"+thisIcCard).val();
			
			// 校验宽带帐号
			if($.trim(ajaxUserBwResponse.bandwidthNo)==""){
				alert("请输入宽带帐号！");
				return ;
			}
			
			// 检测合法性 
			if(!checkBwNoValue(ajaxUserBwResponse.bandwidthNo)){
				 return;
			}
			
			// 校验宽带产品
			if($("#setBandWidthProductBoxType_"+thisIcCard).val() == "0"){
				alert("请选择一个宽带产品！");
				return ;
			}
			// 开户时输入金额不能为负值
			if(ajaxUserBwResponse.feeValue < 0){
				alert("预充值金额不能小于0元,请重新输入！");
				return;
			};
			// 校验输入金额
			if(!checkFeeValue(ajaxUserBwResponse.feeValue)){
				return;
			};
			
			// 校验产品备注
			if(ajaxUserBwResponse.orderDesc.length > 255){
				alert("输入的产品描述信息不能超过255个字符！");
				return ;
			}
			
			// 操作确认框
			if(!bandwidthFunc.operConfirm("为账户 "+ajaxUserBwResponse.bandwidthNo+" 充值 "+ajaxUserBwResponse.feeValue+" 元")){
				return;
			}
			
			//ajax提交信息
			ajaxConfirmPath = ajaxBwPath+"ajaxAddUserBW.do";
			ajaxResData = ajaxUserBwResponse;
			$(this).attr("disabled",true);
			ovtAjaxMethod(ajaxConfirmPath,ajaxUserBwResponse,function(data){
				$("#bandwidth_content_addBandWidth_but_add_"+thisIcCard).attr("disabled",false);
				if(data.code!="0"){
					alert(data.value);
				}else{
					$("#bandwidth_content_addBandWidth_div_"+thisIcCard).addClass("hide");
					$("#mask").toggle();
					flushBandWidth("0");
				}
			})
		});
		
		// 业务变更按钮点击事件
		$("#bandwidth_content_bandwidth_but_modifySub_"+thisIcCard).click(function(event){
			//清除原有信息
			$("#modifyOrderHitTable_"+thisIcCard).empty();
			bwNoHtml = $("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(1).text();
			var userBwInfo = bandwidthFunc.bandWidthVar.get(thisIcCard,bwNoHtml);
			var selectFlag = "1_"+userBwInfo.productId+"_"+userBwInfo.stragyId+"_"+Number(userBwInfo.price).toFixed(2)+"_"+userBwInfo.serviceId;
			$("#bandwidth_content_modifyBandWidth_bwNo_"+thisIcCard).val(bwNoHtml);
			$("#bandwidth_content_modifyBandWidth_macAddr_"+thisIcCard).val(userBwInfo.macAddr);
			$("#bandwidth_content_modifyIncome_fee_"+thisIcCard).val("");
			$("#setModifyBandWidthProductBoxType_"+thisIcCard).val(selectFlag);
			//$("#bandwidth_content_modifyBandWidth_descript_"+thisIcCard).val(bwServiceDescMap.get(selectFlag));
			$("#bandwidth_content_modifyBandWidth_descript_"+thisIcCard).val(userBwInfo.productDesc);
			
			//确定位置
			$("#bandwidth_content_modifyBandWidth_div_"+thisIcCard).css("top",event.clientY+$(this).scrollTop()+$(this).height()+"px");
			$("#bandwidth_content_modifyBandWidth_div_"+thisIcCard).css("left",event.clientX+$(this).scrollLeft()+"px");
			$("#bandwidth_content_modifyBandWidth_div_"+thisIcCard).css("width","600px");
			$("#bandwidth_content_modifyBandWidth_div_"+thisIcCard).css("height","203px");
			// 设置这个样式，宽、高才会生效
			$("#bandwidth_content_modifyBandWidth_div_"+thisIcCard).css("overflow","hidden");
			$("#bandwidth_content_modifyBandWidth_div_"+thisIcCard).removeClass("hide");
			$("#mask").toggle();
		});
		
		// 业务变更时产品下拉列表选择操作事件
		$("#setModifyBandWidthProductBoxType_"+thisIcCard).change(function(event){
			$("#modifyOrderHitTable_"+thisIcCard).empty();
			var productVal = $(this).val();
			var productDesc = bwServiceDescMap.get(productVal);
			if(productVal != "0"){
				// 余额
				var balance = $("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(4).text();
				var orderValue = productVal.split("_");
				// 产品计费价格
				var productPrice = orderValue[3];
				var incomeFeeValue = productPrice - balance;
				if(incomeFeeValue <= 0){
					incomeFeeValue = 0;
				}
				$("#bandwidth_content_modifyBandWidth_descript_"+thisIcCard).val(productDesc);
				$("#bandwidth_content_modifyIncome_fee_"+thisIcCard).val(incomeFeeValue);
				$("#modifyOrderHitTable_"+thisIcCard).append("<tr>该账户余额为<font color='red'>"+balance+"</font>元，购买此产品需要<font color='red'>"+Number(productPrice).toFixed(2)+"</font>元，为保证该业务正常运行，您至少还需要充值<font color='red'>"+Number(incomeFeeValue).toFixed(2)+"</font>元！</tr>");
			}else{
				$("#bandwidth_content_modifyBandWidth_descript_"+thisIcCard).val("");
			}
		})
		
		// 业务变更操作 -- 取消按钮事件
		$("#bandwidth_content_modifyBandWidth_but_cancel_"+thisIcCard).click(function(){
			$("#bandwidth_content_modifyBandWidth_div_"+thisIcCard).addClass("hide");
			$("#bandwidth_content_modifyBandWidth_bwNo_"+thisIcCard).val("");
			$("#mask").toggle();
			$("#bandwidth_content_modifyBandWidth_but_modify_"+thisIcCard).attr("disabled",false);
		});
		
		// 业务变更操作 -- 确定按钮事件
		$("#bandwidth_content_modifyBandWidth_but_modify_"+thisIcCard).click(function(){
			var ajaxModifyUserBwResponse = {
					customer_id:thisIcCard,
					bandwidthNo:"",
					orderId:"",
					stragyId:"",
					serviceId:"",
					price:"",
					feeValue :"",
					orderDesc:""
			};
			//保存宽带账户收费项
			var equCost = "";
			ajaxModifyUserBwResponse.bandwidthNo = bwNoHtml;
			var incomeFee = $("#bandwidth_content_modifyIncome_fee_"+thisIcCard).val();
			ajaxModifyUserBwResponse.feeValue=incomeFee;
			ajaxModifyUserBwResponse.feeValue = incomeFee;
			var modifyBwNo = $("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(1).text();
			var userBwInfo = bandwidthFunc.bandWidthVar.get(thisIcCard,modifyBwNo);
			var selectFlag = "1_"+userBwInfo.productId+"_"+userBwInfo.stragyId+"_"+Number(userBwInfo.price).toFixed(2)+"_"+userBwInfo.serviceId;
			var selectProductValue = $("#setModifyBandWidthProductBoxType_"+thisIcCard).val();
			if(selectFlag == selectProductValue){
				alert("您没有变更宽带产品信息，请确认！");
				return;
			}
			if(selectProductValue == "0"){
				alert("请选择一个宽带产品！");
				return ;
			}
			// orderValue 宽带产品信息
			// 第一位为 产品类型 
			// 第二位为 产品ID 
			// 第三位为 策略ID 
			// 第四位为 产品价格  
			// 第五位为 服务ID
			var orderValue = selectProductValue.split("_");
			ajaxModifyUserBwResponse.orderId = orderValue[1];
			ajaxModifyUserBwResponse.stragyId = orderValue[2];
			ajaxModifyUserBwResponse.price = orderValue[3];
			ajaxModifyUserBwResponse.serviceId = orderValue[4];
			ajaxModifyUserBwResponse.orderDesc = $("#bandwidth_content_modifyBandWidth_descript_"+thisIcCard).val();
			
			// 校验产品备注
			if(ajaxModifyUserBwResponse.orderDesc.length > 255){
				alert("输入的产品描述信息不能超过255个字符！");
				return ;
			}
			// 业务变更时输入金额不能为负值
			if(incomeFee < 0){
				alert("预充值金额不能小于0元，请重新输入！");
				return;
			};
			
			// 校验输入金额
			if(!checkFeeValue(incomeFee)){
				return;
			};
			
			// 操作确认框
			if(!bandwidthFunc.operConfirm("为账户 "+ajaxModifyUserBwResponse.bandwidthNo+" 充值 "+incomeFee+" 元")){
				return;
			}
			
			//ajax提交信息
			ajaxConfirmPath = ajaxBwPath+"ajaxModifyUserBW.do";
			ajaxResData = ajaxModifyUserBwResponse;
			$(this).attr("disabled",true);
			ovtAjaxMethod(ajaxConfirmPath,ajaxModifyUserBwResponse,function(data){
				$("#bandwidth_content_modifyBandWidth_but_modify_"+thisIcCard).attr("disabled",false);
				if(data.code!="0"){
					alert(data.value);
				}else{
					$("#bandwidth_content_modifyBandWidth_div_"+thisIcCard).addClass("hide");
					$("#mask").toggle();
					flushBandWidth("0");
				}
			})
		});
		
		// 密码重置按钮点击事件
		$("#bandwidth_content_bandwidth_but_resetPWSub_"+thisIcCard).click(function(event){

			// 操作确认框
			if(!bandwidthFunc.operConfirm("密码重置")){
				return;
			}
			// 获取操作记录账户号
			bwNoHtml = $("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(1).text();
			
			var ajaxChangePwUserBwResponse = {
					customer_id:thisIcCard,
					bandwidthNo:bwNoHtml
			};
			//ajax提交信息
			ajaxConfirmPath = ajaxBwPath+"ajaxChangePwUserBW.do";
			ajaxResData = ajaxChangePwUserBwResponse;
			$(this).attr("disabled",true);
			ovtAjaxMethod(ajaxConfirmPath,ajaxChangePwUserBwResponse,function(data){
				$("#bandwidth_content_bandwidth_but_resetPWSub_"+thisIcCard).attr("disabled",false);
				if(data.code!="0"){
					alert(data.value);
				}else{
					alert("密码重置成功！新密码为："+data.value);
					flushBandWidth("0");
				}
			})
		});
		
		// 密码修改按钮点击事件
		$("#bandwidth_content_bandwidth_but_changePWSub_"+thisIcCard).click(function(event){
			$("#bwinfo_but_changepw_confime_"+thisIcCard).attr("disabled",false);
			var $content = $("#bwinfo_content_changepassword_div_"+thisIcCard);
			$content.css("top",event.clientY+$(this).scrollTop()+$(this).height()+"px");
			$content.css("left",event.clientX+$(this).scrollLeft()+"px");
			$content.css("width","250px");
			$(this).blur();
			$content.removeClass("hide");
			$("#mask").toggle();
			$("#bwinfo_but_readio_oldPW_"+thisIcCard).val("");
			$("#bwinfo_but_readio_newPW1_"+thisIcCard).val("");
			$("#bwinfo_but_readio_newPW2_"+thisIcCard).val("");
		});
		
		// 密码修改确定按钮点击事件
		$("#bwinfo_but_changepw_confime_"+thisIcCard).click(function(event){
			// 获取操作记录账户号
			var operBwNo = $("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(1).text();
			var userBwInfo = bandwidthFunc.bandWidthVar.get(thisIcCard,operBwNo);
			var oldPassword = userBwInfo.password;
			var inputOldPW = $("#bwinfo_but_readio_oldPW_"+thisIcCard).val();
			var inputnewPW1 = $("#bwinfo_but_readio_newPW1_"+thisIcCard).val();
			var inputnewPW2 = $("#bwinfo_but_readio_newPW2_"+thisIcCard).val();
			// 当前密码校验
			if(inputOldPW == ""){
				alert("当前密码不能为空！");
				return;
			}
			// 新密码校验
			if(inputnewPW1 == ""){
				alert("新密码不能为空！");
				return;
			}
			// 确认新密码校验
			if(inputnewPW2 == ""){
				alert("确认新密码不能为空！");
				return;
			}
			if(oldPassword != inputOldPW){
				alert("输入的当前密码不正确，请重新输入！");
				return;
			}
			if(inputnewPW1 != inputnewPW2){
				alert("输入的新密码与确认新密码不一致，请重新输入！");
				return;
			}
			if(!checkBwNoPasswordValue("当前密码",inputOldPW) 
					|| !checkBwNoPasswordValue("新密码",inputnewPW1) 
					|| !checkBwNoPasswordValue("确认新密码",inputnewPW2)){
				return;
			}
			// 操作确认框
			if(!bandwidthFunc.operConfirm("密码修改")){
				return;
			}
			var ajaxChangePwUserBwResponse = {
					customer_id:thisIcCard,
					bandwidthNo:bwNoHtml,
					newPassword:inputnewPW2
			};
			//ajax提交信息
			ajaxConfirmPath = ajaxBwPath+"ajaxChangePwUserBW.do";
			ajaxResData = ajaxChangePwUserBwResponse;
			$(this).attr("disabled",true);
			ovtAjaxMethod(ajaxConfirmPath,ajaxChangePwUserBwResponse,function(data){
				$("#bwinfo_but_changepw_confime_"+thisIcCard).attr("disabled",false);
				if(data.code!="0"){
					alert(data.value);
				}else{
					$("#bwinfo_content_changepassword_div_"+thisIcCard).addClass("hide");
					$("#mask").toggle();
					flushBandWidth("0");
				}
			})
		});
		
		// 密码修改操作 -- 取消按钮事件
		$("#bwinfo_but_changepw_cancel_"+thisIcCard).click(function(){
			$("#bwinfo_content_changepassword_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
			$("#bwinfo_but_changepw_confime_"+thisIcCard).attr("disabled",false);
		});
		
		// 充值按钮点击事件
		$("#bandwidth_content_bandwidth_but_renewAndfeeSub_"+thisIcCard).click(function(event){
			$("#base_feeHistoryTable_"+thisIcCard).empty();
			$("#feeHitTable_"+thisIcCard).empty();
			var $content = $("#bwinfo_content_fee_div_"+thisIcCard);
			$content.css("top",event.clientY+$(this).scrollTop()+$(this).height()+"px");
			$content.css("left",event.clientX+$(this).scrollLeft()+"px");
			$content.css("width","300px");
			$(this).blur();
			$content.removeClass("hide");
			$("#mask").toggle();
			var operBwNo = $("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(1).text();
			var userBwInfo = bandwidthFunc.bandWidthVar.get(thisIcCard,operBwNo);
			$("#feeHitTable_"+thisIcCard).append("<tr><td>帐号: "+operBwNo+" 订购的产品名称为: "+userBwInfo.orderList[0].name+" ,续订本产品您至少需要充值 <font color='red'>"+Number(userBwInfo.price).toFixed(2)+"</font> 元!</td></tr>");
			$("#bandwidth_content_fee_"+thisIcCard).val(Number(userBwInfo.price).toFixed(2));
		});
		
		// 充值操作 -- 确定按钮事件
		$("#bwinfo_but_fee_confime_"+thisIcCard).click(function(event){
			var feeValue = $("#bandwidth_content_fee_"+thisIcCard).val();
			bwNoHtml = $("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(1).text();
			var userBwInfo = bandwidthFunc.bandWidthVar.get(thisIcCard,bwNoHtml);
			var operFeeType;
			var hitStr;
			var hitFeeValue;
			if(feeValue < 0){
				operFeeType = 5; // 退费
				hitStr = "退费";
				hitFeeValue = 0-feeValue;
			}else{
				operFeeType = 4; // 充值
				hitStr = "充值";
				hitFeeValue = feeValue;
			}
			var status = userBwInfo.status;
			var ajaxFeeUserBwResponse = {
					customer_id:thisIcCard,
					bandwidthNo:bwNoHtml,
					feeValue:feeValue,
					operFeeType:operFeeType,
					accountStatus:status
			};
			// 校验输入金额
			if(!checkFeeValue(feeValue)){
				return;
			}
			// 退费金额不能大于账户余额
			// 余额
			var balance = $("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(4).text();
			if((0-feeValue)-balance > 0){
				alert("退费金额不能大于账户余额,请重新输入！");
				return;
			}
			// 操作确认框
			if(!bandwidthFunc.operConfirm("为账户 "+bwNoHtml+" "+hitStr+" "+hitFeeValue+" 元")){
				return;
			}
			//ajax提交信息
			ajaxConfirmPath = ajaxBwPath+"ajaxFeeUserBW.do";
			ajaxResData = ajaxFeeUserBwResponse;
			$(this).attr("disabled",true);
			ovtAjaxMethod(ajaxConfirmPath,ajaxFeeUserBwResponse,function(data){
				$("#bwinfo_but_fee_confime_"+thisIcCard).attr("disabled",false);
				if(data.code!="0"){
					alert(data.value);
				}else{
					$("#bwinfo_content_fee_div_"+thisIcCard).addClass("hide");
					$("#mask").toggle();
					if(feeValue >= 0){
						alert("充值成功，充值金额为："+data.value);
					}else{
						alert("退费成功，退费金额为："+(0-data.value));
					}
					flushBandWidth("0");
				}
			})
		});
		
		// 充值操作 -- 取消按钮事件
		$("#bwinfo_but_fee_cancel_"+thisIcCard).click(function(){
			$("#bwinfo_content_fee_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
			$("#bwinfo_but_fee_confime_"+thisIcCard).attr("disabled",false);
		});
		
		// 查询充值历史记录
		$("#bandwidth_content_feeHistory_"+thisIcCard).click(function(){
			if($("#base_feeHistoryTable_"+thisIcCard).children().length != 0){
				$("#base_feeHistoryTable_"+thisIcCard).empty();
				return;
			}else{
				bwNoHtml = $("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(1).text();
				var ajaxQueryFeeHistoryBwResponse = {
						customer_id:thisIcCard,
						bandwidthNo:bwNoHtml
				};
				ajaxConfirmPath = ajaxBwPath+"ajaxQueryFeeHistory.do";
				ajaxResData = ajaxQueryFeeHistoryBwResponse;
				ovtAjaxMethod(ajaxConfirmPath,ajaxQueryFeeHistoryBwResponse,function(data){
					if(data.code!="0"){
						alert(data.value);
					}else{
						//删掉原有的数据
						$("#base_feeHistoryTable_"+thisIcCard).empty();
						$("#base_feeHistoryTable_"+thisIcCard).append("<tr><th width='100px'>流水号</th><th width='120px'>充值日期</th><th width='80px'>充值金额</th></tr>");
						var trs = "<tr>";
						if(data.value == null || data.value.length == 0){
							trs = trs + "<td colspan = '3'>该账户没有充值历史记录</td></tr>";
						}else{
							$(data.value).each(function(n,value){
								var feeHisValue = value.dataStr;
								// 流水号
								trs = trs + "<td>"+feeHisValue.payFlowID+"</td> " ;
								// 充值日期
								trs = trs + "<td>"+value.createDateStr+"</td>";
								// 充值金额
								trs = trs + "<td>"+Number(feeHisValue.feeValue).toFixed(2)+"</td> " ;
								trs = trs + "</tr>";
							});
						}
					}
					$("#base_feeHistoryTable_"+thisIcCard).append(trs);
				})
			}
		});
		
		// 销户按钮点击事件
		$("#bandwidth_content_bandwidth_but_repoSub_"+thisIcCard).click(function(event){
			//操作确认框
			if(!bandwidthFunc.operConfirm("销户")){
				return;
			}
			// 获取操作记录账户号
			bwNoHtml = $("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(1).text();
			var ajaxLogoffUserBwResponse = {
					customer_id:thisIcCard,
					bandwidthNo:bwNoHtml
			};
			//ajax提交信息
			ajaxConfirmPath = ajaxBwPath+"ajaxUserBwLogoff.do";
			ajaxResData = ajaxLogoffUserBwResponse;
			$(this).attr("disabled",true);
			ovtAjaxMethod(ajaxConfirmPath,ajaxLogoffUserBwResponse,function(data){
				$("#bandwidth_content_bandwidth_but_repoSub_"+thisIcCard).attr("disabled",false);
				if(data.code!="0"){
					alert(data.value);
				}else{
					alert(data.value);
					flushBandWidth("0");
				}
			})
		});
		
		// 删除销户记录按钮点击事件
		$("#bandwidth_content_bandwidth_but_deleteSub_"+thisIcCard).click(function(event){
			//操作确认框
			if(!bandwidthFunc.operConfirm("删除")){
				return;
			}
			
			// 获取操作记录账户号
			bwNoHtml = $("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(1).text();
			// 如果用户还有余额，将不能删除
			if(($("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(4).text())!= "0.00"){
				alert("该账户还有余额，不能删除！");
				return;
			}
			var ajaxDelUserBwResponse = {
					customer_id:thisIcCard,
					bandwidthNo:bwNoHtml
			};
			//ajax提交信息
			ajaxConfirmPath = ajaxBwPath+"ajaxUserBwDel.do";
			ajaxResData = ajaxDelUserBwResponse;
			$(this).attr("disabled",true);
			ovtAjaxMethod(ajaxConfirmPath,ajaxDelUserBwResponse,function(data){
				$("#bandwidth_content_bandwidth_but_deleteSub_"+thisIcCard).attr("disabled",false);
				if(data.code!="0"){
					alert(data.value);
				}else{
					alert(data.value);
					flushBandWidth("0");
				}
			})
		});
		
	    // 信息同步按钮点击事件
		$("#bandwidth_content_bandwidth_but_syncSub_"+thisIcCard).click(function(event){
			//操作确认框
			if(!bandwidthFunc.operConfirm("信息同步")){
				return;
			}
			// 获取操作记录账户号
			bwNoHtml = $("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(1).text();
			var ajaxSyncUserBwResponse = {
					customer_id:thisIcCard,
					bandwidthNo:bwNoHtml
			};
			//ajax提交信息
			ajaxConfirmPath = ajaxBwPath+"ajaxSyncUserBw.do";
			ajaxResData = ajaxSyncUserBwResponse;
			$(this).attr("disabled",true);
			ovtAjaxMethod(ajaxConfirmPath,ajaxSyncUserBwResponse,function(data){
				$("#bandwidth_content_bandwidth_but_syncSub_"+thisIcCard).attr("disabled",false);
				if(data.code!="0"){
					alert(data.value);
				}else{
					alert(data.value);
					flushBandWidth("0");
				}
			})
		});
		
		// 业务提交按钮点击事件
		$("#bandwidth_content_bandwidth_but_submitSub_"+thisIcCard).click(function(event){
			$("#submitBwButton_"+thisIcCard).attr("disabled",false);
			//删掉原有的数据
			$("#base_submitTable_"+thisIcCard).empty();
			var submitContent = $("#submit_operation_info_"+thisIcCard);
			submitContent.css("top","100px");
			submitContent.css("left","200px");
			submitContent.css("width","300px");
			$(this).blur();
			submitContent.removeClass("hide");
			$("#mask").toggle();

			var ajaxQuerySubmitUserBwResponse = {
					customer_id:thisIcCard
					//bandwidthNo:""
			};
			ajaxConfirmPath = ajaxBwPath+"ajaxQueryUnSubmitOpr.do";
			ajaxResData = ajaxQuerySubmitUserBwResponse;
			$(this).attr("disabled",true);
			ovtAjaxMethod(ajaxConfirmPath,ajaxQuerySubmitUserBwResponse,function(data){
				$("#bandwidth_content_bandwidth_but_submitSub_"+thisIcCard).attr("disabled",false);
				if(data.code!="0"){
					alert(data.value);
				}else{
					$("#base_submitTable_"+thisIcCard).append("<tr><th>宽带账户</th><th>操作类型</th><th>提交状态</th></tr>");
					var trs = "<tr>";
					if(data.value == null || data.value.length == 0){
						trs = trs + "<td colspan = '3'>没有未提交的业务操作</td></tr>";
					}else{
						$(data.value).each(function(n,value){
							// 宽带帐号
							trs = trs + "<td>"+value.bwNo+"</td> " ;
							// 操作类型
							if(value.oprType == "0"){
								trs = trs + "<td>新建账户</td>" ;
							}else if(value.oprType == "1"){
								trs = trs + "<td>业务变更</td>" ;
							}else if(value.oprType == "2"){
								trs = trs + "<td>密码重置</td>" ;
							}else if(value.oprType == "3"){
								trs = trs + "<td>密码修改</td>" ;
							}else if(value.oprType == "4"){
								trs = trs + "<td>充值</td>" ;
							}else if(value.oprType == "5"){
								trs = trs + "<td>退费</td>" ;
							}else if(value.oprType == "6"){
								trs = trs + "<td>销户</td>" ;
							}else{
								trs = trs + "<td>未知操作</td>" ;
							}
							// 提交状态
							if(value.status == "0"){
								trs = trs + "<td>未提交</td>";
							}else{
								trs = trs + "<td>提交失败</td>";												
							}
							trs = trs + "</tr>";
						});
					}
				}
				$("#base_submitTable_"+thisIcCard).append(trs);
			})
		});
		
		// 业务提交"取消"按钮事件
		$("#submit_bw_operation_cancel_"+thisIcCard).click(function(){
			$("#submit_operation_info_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
			$("#bandwidth_content_bandwidth_but_submitSub_"+thisIcCard).attr("disabled",false);
		});
		
		// 业务提交"确定"按钮点击事件
		$("#submitBwButton_"+thisIcCard).click(function(event){
			//操作确认框
			if(!bandwidthFunc.operConfirm("业务提交")){
				return;
			}
			var ajaxSubmitUserBwResponse = {
					customer_id:thisIcCard
					//bandwidthNo:""
			};
			ajaxConfirmPath = ajaxBwPath+"ajaxSubmitUserBW.do";
			ajaxResData = ajaxSubmitUserBwResponse;
			$(this).attr("disabled",true);
			ovtAjaxMethod(ajaxConfirmPath,ajaxSubmitUserBwResponse,function(data){
				$("#submitBwButton_"+thisIcCard).attr("disabled",false);
				if(data.code!="0"){
					alert(data.value);
				}else{
					$("#submit_operation_info_"+thisIcCard).addClass("hide");
					$("#mask").toggle();
					$(this).attr("disabled",false);
					alert(data.value);
					flushBandWidth("0");
				}
			})
		});
		// 忽略同步失败操作按钮点击事件 add by jhg 2013-02-26
		$("#bandwidth_content_bandwidth_but_ignoreSub_"+thisIcCard).click(function(event){
			//操作确认框
			if(!bandwidthFunc.operConfirm("忽略同步失败")){
				return;
			}
			// 获取操作记录账户号
			bwNoHtml = $("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)").children("td").eq(1).text();
			var ajaxIgnoreUserBwResponse = {
					customer_id:thisIcCard,
					bandwidthNo:bwNoHtml
			};
			//ajax提交信息
			ajaxConfirmPath = ajaxBwPath+"ajaxUserBwIgnore.do";
			ajaxResData = ajaxIgnoreUserBwResponse;
			$(this).attr("disabled",true);
			ovtAjaxMethod(ajaxConfirmPath,ajaxIgnoreUserBwResponse,function(data){
				$("#bandwidth_content_bandwidth_but_ignoreSub_"+thisIcCard).attr("disabled",false);
				if(data.code!="0"){
					alert(data.value);
				}else{
					alert(data.value);
					flushBandWidth("0");
				}
			})
		});
		
		// 宽带业务受理单打印按钮点击事件2012-8-14 yzy
		$("#bandwidth_content_bandwidth_but_bandacceptSub_"+thisIcCard).click(function(event){
			var $checkedband = $("#bandwidthTable_"+thisIcCard).find("tr:has(:checked)");
			if($checkedband.length==1){
				bwNoHtml = $checkedband.children("td").eq(1).text();
				if(bwNoHtml==''||bwNoHtml==undefined||bwNoHtml=='null'||bwNoHtml=='undefined'){
					alert("账户号未定义！");
					return false;
				}
			}else{
				alert("请选择一个账户号打印受理单！");
				return false;
			}
			var ajaxPrintBwRes = {
									customer_id:thisIcCard,
									bandwidthNo:bwNoHtml,
									printType:4,
									isPrint:"yes",
									registerId:"0001",
									operatingCompany:WebInitParameter.PARAM_OPERATING_COMPANY
								};
			printCredential(ajaxPrintBwRes,"_"+thisIcCard);

		});
		// add by jhg end
		
		//增加设备--增卡增机失效通用方法封装
		function stbOrCard (equ){
			$("#equipment_content_equipment_addEquipment_text_card_"+thisIcCard).attr("disabled",true);
			$("#equipment_content_equipment_addEquipment_readio_main_"+thisIcCard).attr("disabled",true);
			$("#equipment_content_equipment_addEquipment_readio_slave_"+thisIcCard).attr("disabled",true);
			$("#equipment_content_equipment_addEquipment_text_stb_"+thisIcCard).attr("disabled",true);
			$("#setBoxGetType_"+thisIcCard).attr("disabled",true);
			$("#equipment_content_equipment_addEquipment_checkbox_bindingType_"+thisIcCard).attr("disabled",true);
			if(equ=="all"){
				$("#equipment_content_equipment_addEquipment_text_card_"+thisIcCard).attr("disabled",false);
				$("#equipment_content_equipment_addEquipment_readio_main_"+thisIcCard).attr("disabled",false);
				$("#equipment_content_equipment_addEquipment_readio_slave_"+thisIcCard).attr("disabled",false);
				$("#equipment_content_equipment_addEquipment_text_stb_"+thisIcCard).attr("disabled",false);
				$("#setBoxGetType_"+thisIcCard).attr("disabled",false);
				$("#equipment_content_equipment_addEquipment_checkbox_bindingType_"+thisIcCard).attr("disabled",false);
			}else if(equ =="stb"){
				$("#equipment_content_equipment_addEquipment_text_stb_"+thisIcCard).attr("disabled",false);
				$("#setBoxGetType_"+thisIcCard).attr("disabled",false);
				
			}else if(equ =="card"){
				$("#equipment_content_equipment_addEquipment_text_card_"+thisIcCard).attr("disabled",false);
				$("#equipment_content_equipment_addEquipment_readio_main_"+thisIcCard).attr("disabled",false);
				$("#equipment_content_equipment_addEquipment_readio_slave_"+thisIcCard).attr("disabled",false);
			}
		}
		//增加设备--增卡增机单选钮
		$("#equipment_content_equipment_addEquipment_readio_all_"+thisIcCard).click(function(){
			stbOrCard("all");
		});
		//增加设备--增机单选钮
		$("#equipment_content_equipment_addEquipment_readio_stb_"+thisIcCard).click(function(){
			stbOrCard("stb");
		});
		//增加设备--增卡单选钮
		$("#equipment_content_equipment_addEquipment_readio_card_"+thisIcCard).click(function(){
			stbOrCard("card");
		});
		//增加设备--主终端单选钮
		$("#equipment_content_equipment_addEquipment_readio_main_"+thisIcCard).click(function(){
			$("#equipment_content_equipment_addEquipment_select_main_"+thisIcCard).attr("disabled",true);
		});
		//增加设备--副终端单选钮
		$("#equipment_content_equipment_addEquipment_readio_slave_"+thisIcCard).click(function(){
			//判断是否需要验证用户类型
			if(commonFunc.addEquConfine("_"+thisIcCard)){
				$("#equipment_content_equipment_addEquipment_readio_main_"+thisIcCard).trigger("click");
				return;
			}
			
			if($("#equipment_content_equipment_addEquipment_select_main_"+thisIcCard).find("option:not(:first-child)").length==0){
				alert(WebInitParameter.MSG_EQU_C01);
				$("#equipment_content_equipment_addEquipment_readio_main_"+thisIcCard).trigger("click");
				return;
			}
			$("#equipment_content_equipment_addEquipment_select_main_"+thisIcCard).attr("disabled",false);
		});
		//增加设备--取消按钮
		$("#equipment_content_equipment_addEquipment_but_cancel_"+thisIcCard).click(function(){
			$("#equipment_content_equipment_addEquipment_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		//增加设备--判断终端组已有终端个数和组号方法封装
		function equGroupConut(mainEquNo){
			var $table = $("#equipmentTable_"+thisIcCard);/*.find("tr:not(:first-child)")*/
//						var $mainTrs = $("#equVar_"+thisIcCard).find("tr");
			var groupCount = 0;
			var groupNo = "";
//						$mainTrs.each(function(){
//							if($(this).find("td").eq(2).text()==mainEquNo){
//								groupCount=groupCount+1;
//								groupNo = $(this).find("td").eq(0).text();
//							}
//						});
			$(equipmentFunc.equVar.getValue(thisIcCard).value).each(function(){
				if(this.mainEquId == mainEquNo){
					groupCount=groupCount+1;
					groupNo = this.groupId;
				}
			});
			return groupNo+":"+groupCount;
		}
		//增加设备--增加按钮
		$("#equipment_content_equipment_addEquipment_but_add_"+thisIcCard).click(function(){
			var areaLevel1 = $("#customer_areaLevel1_"+thisIcCard).val();
			if(areaLevel1 == null){
				areaLevel1 = -1;
			}
			var areaLevel2 = $("#customer_areaLevel2_"+thisIcCard).val();
			if(areaLevel2 == null){
				areaLevel2 = -1;
			}
			var areaLevel3 = $("#customer_areaLevel3_"+thisIcCard).val();
			if(areaLevel3 == null){
				areaLevel3 = -1;
			}
			var ajaxEquResponse = {
					customer_id:thisIcCard,
					// add by jhg 2012-03-23 用户与设备关系增加片区信息
					areaLevelId1:areaLevel1,
					areaLevelId2:areaLevel2,
					areaLevelId3:areaLevel3,
					equType:"",
					equDesc:""
			};
			//保存设备收费项所需信息
			var equCost = "";
			if($("#equipment_content_equipment_addEquipment_readio_all_"+thisIcCard).attr("checked")){
				ajaxEquResponse.equType = "all";
				var cardNo = $("#equipment_content_equipment_addEquipment_text_card_"+thisIcCard).val();
				var slaveType = "";
				var mainEquNo = "";
				var groupNo = 0;
				var stbNo =$("#equipment_content_equipment_addEquipment_text_stb_"+thisIcCard).val();
				var stbGetType =$("#setBoxGetType_"+thisIcCard).val(); 
				
				if($.trim(cardNo)==""){
					alert(WebInitParameter.MSG_EQU_C09);
					return ;
				}
				
				if($.trim(stbNo)==""){
					alert(WebInitParameter.MSG_EQU_C10);
					return ;
				}
				
				if($("#equipment_content_equipment_addEquipment_readio_main_"+thisIcCard).attr("checked")){
					slaveType = "0";
					mainEquNo = cardNo;
					groupNo = Number($("#equ_GroupMaxNum_"+thisIcCard).text())+1;
					if(groupNo > WebInitParameter.IC_GROUP_MAX_LENGTH){
						alert(WebInitParameter.MSG_EQU_C03);
						return ;
					}
				}else if($("#equipment_content_equipment_addEquipment_readio_slave_"+thisIcCard).attr("checked")){
					mainEquNo = $("#equipment_content_equipment_addEquipment_select_main_"+thisIcCard).val();
					if(mainEquNo == "-1"){
						alert(WebInitParameter.MSG_EQU_C06);
						$("#equipment_content_equipment_addEquipment_select_main_"+thisIcCard).focus();
						return;
					}
					//判断第几终端
					var equArr = equGroupConut(mainEquNo).split(":");
					var groupCount = equArr[1];
					groupNo = equArr[0];
					groupCount = Number(groupCount);//得到的主终端匹配的数量，刚好是现在要添加的副终端的组数。
					if(groupCount >= WebInitParameter.IC_GROUP_HAS_SIZE){
						alert(WebInitParameter.MSG_EQU_C04);
						return;
					}
					slaveType = groupCount;
				}
				var bindingType;
				if($("#equipment_content_equipment_addEquipment_checkbox_bindingType_"+thisIcCard).attr("checked")){
					bindingType = BINDING_TYPE_VALUE_BINDING;
				}else{
					bindingType = BINDING_TYPE_VALUE_UNBINDING;
				}
//							alert(cardNo+":"+mainEquNo+":"+slaveType+":"+stbNo+":"+stbGetType+":"+bindingType);
				ajaxEquResponse.equDesc = groupNo+":"+cardNo+":"+mainEquNo+":"+slaveType+":"+stbNo+":"+stbGetType+":"+bindingType;
				equCost = "card" + ":" + cardNo + ":" + " " + "&" + "stb" + ":" + stbNo + ":" + stbGetType;
			}else if($("#equipment_content_equipment_addEquipment_readio_stb_"+thisIcCard).attr("checked")){
				ajaxEquResponse.equType = "stb";
				var stbNo =$("#equipment_content_equipment_addEquipment_text_stb_"+thisIcCard).val();
				
				if($.trim(stbNo)==""){
					alert(WebInitParameter.MSG_EQU_C10);
					return ;
				}
				
				var stbGetType =$("#setBoxGetType_"+thisIcCard).val(); 
				ajaxEquResponse.equDesc = " "+":"+" "+":"+" "+":"+" "+":"+stbNo+":"+stbGetType+":"+" ";
				equCost =  "stb" + ":" + stbNo + ":" + stbGetType;
			}else if($("#equipment_content_equipment_addEquipment_readio_card_"+thisIcCard).attr("checked")){
				ajaxEquResponse.equType = "card";
				var cardNo = $("#equipment_content_equipment_addEquipment_text_card_"+thisIcCard).val();
				var slaveType = "";
				var mainEquNo = "";
				var groupNo = 0;
				
				if($.trim(cardNo)==""){
					alert(WebInitParameter.MSG_EQU_C09);
					return ;
				}
				
				if($("#equipment_content_equipment_addEquipment_readio_main_"+thisIcCard).attr("checked")){
					slaveType = "0";
					mainEquNo = cardNo;
					groupNo = Number($("#equ_GroupMaxNum_"+thisIcCard).text())+1;
					if(groupNo > WebInitParameter.IC_GROUP_MAX_LENGTH){
						alert(WebInitParameter.MSG_EQU_C03);
						return ;
					}
				}else if($("#equipment_content_equipment_addEquipment_readio_slave_"+thisIcCard).attr("checked")){
					mainEquNo = $("#equipment_content_equipment_addEquipment_select_main_"+thisIcCard).val();
					if(mainEquNo == "-1"){
						alert(WebInitParameter.MSG_EQU_C06);
						$("#equipment_content_equipment_addEquipment_select_main_"+thisIcCard).focus();
						return;
					}
					//判断第几终端
//								var groupCount = equGroupConut(mainEquNo);
//								groupNo = Number($("#equ_GroupMaxNum_"+thisIcCard).text())+1;
//								if(groupCount == 1){//只有主终端
//									slaveType = "1";
//								}else if(groupCount == 2){//只有第一副终端
//									slaveType = "2";
//								}else {
//									alert(WebInitParameter.MSG_EQU_C04);
//									return;
//								}
					var equArr = equGroupConut(mainEquNo).split(":");
					var groupCount = equArr[1];
					groupNo = equArr[0];
					groupCount = Number(groupCount);//得到的主终端匹配的数量，刚好是现在要添加的副终端的组数。
					if(groupCount >= WebInitParameter.IC_GROUP_HAS_SIZE){
						alert(WebInitParameter.MSG_EQU_C04);
						return;
					}
					slaveType = groupCount;
				}
				ajaxEquResponse.equDesc =  groupNo+":"+cardNo+":"+mainEquNo+":"+slaveType+":"+" "+":"+" "+":"+" ";
				equCost = "card" + ":" + cardNo + ":" + " ";
			}
			
			//ajax提交信息
//						alert(ajaxEquResponse.equType+"&"+ajaxEquResponse.equDesc);
			ajaxConfirmPath = ajaxEquPath+"ajaxAddUserEqu.do";
			ajaxResData = ajaxEquResponse;
			$ajaxTriggerBut = $("#equipment_content_equipment_but_info_"+thisIcCard);
			$hideDiv = $("#equipment_content_equipment_addEquipment_div_"+thisIcCard);
			$confirmCallback = equipmentFunc.equipmentOrderFunc;
			// 使用订购限制策略修改 modify by jhg 2013-06-20
			$confirmCallbackOption = {contentId:"_"+thisIcCard,customerId:thisIcCard,cardNo:cardNo,slaveType:slaveType};
			//增加设备收费项信息
			ajaxConfirmEquDesc = equCost;
			confirmFee("_"+thisIcCard,BUSINESS_TYPE.ADD_STB_CODE);
		});
		
		//机卡联动点击变色
		$("#equipment_content_equipment_addEquipment_text_stb_"+thisIcCard).clickChangeColor("text_focus");
		$("#equipment_content_equipment_addEquipment_text_card_"+thisIcCard).clickChangeColor("text_focus");
		$("#icCardModel_"+thisIcCard).attr("readOnly",true).attr("tabindex",-1);
		$("#stbModel_"+thisIcCard).attr("readOnly",true).attr("tabindex",-1);
		//机卡联动方法--卡
		$("#equipment_content_equipment_addEquipment_text_card_"+thisIcCard).blur(function(){
			equCascade("card",$(this),$("#equipment_content_equipment_addEquipment_text_stb_"+thisIcCard),$("#icCardModel_"+thisIcCard),$("#stbModel_"+thisIcCard));
		});
		//机卡绑定联动--盒
		$("#equipment_content_equipment_addEquipment_text_stb_"+thisIcCard).blur(function(){
			equCascade("stb",$(this),$("#equipment_content_equipment_addEquipment_text_card_"+thisIcCard),$("#stbModel_"+thisIcCard),$("#icCardModel_"+thisIcCard));
		});
		
		
		//选择设备判断方法封装
		function checkChecked(){
			var $table = $("#equipmentTable_"+thisIcCard);
			if($table.find("tr:has(:checked)").length==0){
				alert(WebInitParameter.MSG_BUSI_C02);
				return false;
			}
			return $table.find("tr:has(:checked)");
		}
		
		//完全封装设备操作的通用ajax方法
		function ajaxEquRun(equTypeValue,msgText,ajaxPath,businessType){
			var $trs = checkChecked();
			if(!$trs){
				return;
			}
			//操作确认框
			if(!equipmentFunc.operConfirm("equCommand",msgText)){
				return;
			}
			$("#mask").toggle();
			var ajaxObj={
					customer_id : thisIcCard,
					equType:equTypeValue,
					equDesc:""
			};
			var tdNo = 0;
			if(equTypeValue == "stb"){
				tdNo = 4;
			}else if(equTypeValue == "card"){
				tdNo = 1;
			}

			$trs.each(function(){
				ajaxObj.equDesc = ajaxObj.equDesc + $(this).find(":checked").val()+":"+$(this).find("td").eq(tdNo).text()+"&";
			});
			
			ajaxConfirmPath = ajaxEquPath+ajaxPath;
			ajaxResData = ajaxObj;
			$ajaxTriggerBut = $("#equipment_content_equipment_but_info_"+thisIcCard);
			$hideDiv = undefined;
			$confirmCallback = undefined;
			confirmFee("_"+thisIcCard,businessType);
		}
		
		
		//智能卡注销单独写方法
		function ajaxCardLogoff(equTypeValue,msgText,ajaxPath,businessType){
			var $trs = checkChecked();
			if(!$trs){
				return;
			}
			var ajaxObj={
					customer_id : thisIcCard,
					equType:equTypeValue,
					equDesc:""
			};
			var tdNo = 0;
			if(equTypeValue != "card"){
				return;
			}

			//判断是否为最后的终端
			var checkedUserEquId = "";
			var userEquIdArr = new Array();
			$trs.each(function(){
				userEquIdArr.push($(this).find(":checked").val());
				ajaxObj.equDesc = ajaxObj.equDesc + $(this).find(":checked").val()+":"+$(this).find("td").eq(1).text()+"&";
			});
			var userEquIdStr = userEquIdArr.join(":");
			//有一个不符合则弹出提示，结束
//						var $equVarTrs = $("#equVar_"+thisIcCard).children("tbody").children("tr");
			var equVarArr = equipmentFunc.equVar.getValue(thisIcCard).value;
			var flag = false;
			var isNull = false;
			$(userEquIdArr).each(function(){
//							var $tds = $("#"+this).children("td");
//							var mainCardNo = $tds.eq(2).text();
//							if($tds.eq(3).text()==""){//没有智能卡，给出提示停止操作
//								alert(WebInitParameter.MSG_BUSI_C12);
//								return false;//停止操作
//							}else if($tds.eq(3).text()!="0"){//副终端
//								$equVarTrs.each(function(){
//									var $equVarTds = $(this).children("td");
//									if($equVarTds.eq(2).text()==mainCardNo && Number($equVarTds.eq(3).text())>Number($tds.eq(3).text())){
//										if(WebInitParameter.IC_LOGOFF_VALUE!=$equVarTds.eq(11).text()&&userEquIdStr.indexOf($equVarTds.eq(10).text())==-1){
////											alert("No:副终端");
//											flag = true;
//											return false;
//										}
//									}
//								});
//							}else{//主终端
//								$equVarTrs.each(function(){
//									//判断本组
//									var $equVarTds = $(this).children("td");
//									if($equVarTds.eq(2).text()==mainCardNo && WebInitParameter.IC_LOGOFF_VALUE !=$equVarTds.eq(11).text()&&userEquIdStr.indexOf($equVarTds.eq(10).text())==-1){
////										alert("No:判断本组");
//										flag = true;
//										return false;
//									}
//									//判断其他主终端
//									if($equVarTds.eq(2).text()!=mainCardNo && $equVarTds.eq(3).text()==0 && Number($equVarTds.eq(0).text())>Number($tds.eq(0).text())){
//										if(WebInitParameter.IC_LOGOFF_VALUE !=$equVarTds.eq(11).text()&&userEquIdStr.indexOf($equVarTds.eq(10).text())==-1){
////											alert("No:判断其他主终端");
//											flag = true;
//											return false;
//										}
//									}
//								});
//							}
//							if(flag)
//								return false;
				
				var equVar = equipmentFunc.equVar.get(thisIcCard,this);
				var mainCardNo = equVar.mainEquId;
				
				if(equVar.equSlaveType==""){//没有智能卡，给出提示停止操作
					isNull = true;
					alert(WebInitParameter.MSG_BUSI_C12);
					return false;//停止操作
				}else if(equVar.equSlaveType!="0"){//副终端
					$(equVarArr).each(function(){
						if(this.mainEquId == mainCardNo && Number(this.equSlaveType)>Number(equVar.equSlaveType)){
							if(WebInitParameter.IC_LOGOFF_VALUE!=this.icStatus && userEquIdStr.indexOf(this.id)==-1){
								flag = true;
								return false;
							}
						}
					});
				}else{//主终端
					$(equVarArr).each(function(){
						if(this.mainEquId == mainCardNo && WebInitParameter.IC_LOGOFF_VALUE !=this.icStatus && userEquIdStr.indexOf(this.id)==-1){
							flag = true;
							return false;
						}
						if(this.mainEquId != mainCardNo && this.equSlaveType == "0" && Number(this.groupId)>Number(equVar.groupId)){
							if(WebInitParameter.IC_LOGOFF_VALUE != this.icStatus && userEquIdStr.indexOf(this.id)==-1){
								flag = true;
								return false;
							}
						}
					});
				}
				if(flag)
					return false;
			});
			
			if(isNull){
				return;
			}
			
			if(flag){
				alert(WebInitParameter.MSG_BUSI_C17);
//							$("#mask").toggle();
				return;
			}
			
			//操作确认框
			if(!equipmentFunc.operConfirm("equCommand",msgText)){
				return;
			}
			
			$("#mask").toggle();

			ajaxConfirmPath = ajaxEquPath+ajaxPath;
			ajaxResData = ajaxObj;
			$ajaxTriggerBut = $("#equipment_content_equipment_but_info_"+thisIcCard);
			$hideDiv = undefined;
			$confirmCallback = undefined;
			confirmFee("_"+thisIcCard,businessType);
		}
		
		//机顶盒注销
		$("#equipment_content_equipment_but_stbLogoff_"+thisIcCard).click(function(){
			ajaxEquRun("stb","机顶盒注销","ajaxEquLogoff.do");
		});
		
		//机顶盒回收
		$("#equipment_content_equipment_but_recycleSTB_"+thisIcCard).click(function(){
			var $trs = checkChecked();
			if(!$trs){
				return;
			}
			//判断是否有空行现象
			var flag = false;
			$trs.each(function(){
				if(equipmentFunc.equVar.get(thisIcCard,$(this).find(":checked").val()).stbNo == ""){
					flag = true;
					return false;
				}
			});
			if(flag){
				alert(WebInitParameter.MSG_BUSI_C45);
				return;
			}
			equRecycleInit("stb");
			//增加页面显示
			var $content = $("#equipment_content_equipment_recycle_"+thisIcCard);
			$content.css("top",event.clientY+$(this).height());
			$content.css("left",event.clientX-$content.width()/2);
			$(this).blur();
			$("#mask").toggle();
			$content.removeClass("hide");
		});
		
		//智能卡报停 modify by liuxu 2012/6/13
		$("#equipment_content_equipment_but_cardStop_"+thisIcCard).click(function(){
			var $trs = checkChecked();
			if(!$trs){
				return;
			}
			//增加页面显示
			var $content = $("#equipment_content_equipment_cardStop_div_"+thisIcCard);
			// 默认点击即时报停
			$("#equipment_content_equipment_cardStop_radio_immediately_"+thisIcCard).trigger("click");
			$content.css("top",event.clientY+$(this).scrollTop()+$(this).height()+"px");
			$content.css("left",event.clientX+$(this).scrollLeft()+"px");
			$(this).blur();
			$("#mask").toggle();
			$content.removeClass("hide");
		});
		$("#equipment_content_equipment_cardStop_but_stop_"+thisIcCard).click(function(){
			var cardStopType = "card";
			if($("#equipment_content_equipment_cardStop_radio_immediately_"+thisIcCard).attr("checked")) {
				cardStopType += "_1";
				ajaxEquRun(cardStopType,"智能卡即时报停","ajaxCardStop.do",BUSINESS_TYPE.SUSPEND_CODE);
			}else if($("#equipment_content_equipment_cardStop_radio_byTime_"+thisIcCard).attr("checked")) {
				cardStopType += "_0";
				ajaxEquRun(cardStopType,"智能卡按基本服务结束时间报停","ajaxCardStop.do",BUSINESS_TYPE.SUSPEND_CODE);
			}
			$("#mask").toggle();
			$("#equipment_content_equipment_cardStop_div_"+thisIcCard).addClass("hide");
		});
		$("#equipment_content_equipment_cardStop_radio_immediately_"+thisIcCard).click(function(){
			$("#equipment_content_equipment_cardStop_description_"+thisIcCard).val("即时报停：\n报停后立即产生效果,退订所有服务并计费，取消所有服务授权!").attr("readOnly",true);
		});
		$("#equipment_content_equipment_cardStop_radio_byTime_"+thisIcCard).click(function(){
			$("#equipment_content_equipment_cardStop_description_"+thisIcCard).val("按基本服务结束时间报停：\n报停后卡的状态为报停状态，但基本服务结束时间不到期的服务仍可以观看，直至到期!").attr("readOnly",true);
		});
		// 取消报停
		$("#equipment_content_equipment_cardStop_but_cancel"+thisIcCard).click(function(){
			$("#equipment_content_equipment_cardStop_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
		//智能卡开通
		$("#equipment_content_equipment_but_cardReopen_"+thisIcCard).click(function(){
			ajaxEquRun("card","智能卡开通","ajaxCardReopen.do",BUSINESS_TYPE.REOPEN_CODE);
		});
							
		//智能卡注销
		$("#equipment_content_equipment_but_cardLogoff_"+thisIcCard).click(function(){
//						ajaxEquRun("card","智能卡注销","ajaxEquLogoff.do",BUSINESS_TYPE.DESTROY_CODE);
			ajaxCardLogoff("card","智能卡注销","ajaxEquLogoff.do",BUSINESS_TYPE.DESTROY_CODE);
		});

		//智能卡挂起
		$("#equipment_content_equipment_but_cardDisable_"+thisIcCard).click(function(){
			ajaxEquRun("card","智能卡挂起","ajaxCardDisable.do");
		});

		//智能卡启用
		$("#equipment_content_equipment_but_cardEnable_"+thisIcCard).click(function(){
			ajaxEquRun("card","智能卡启用","ajaxCardEnable.do");
		});

		//智能卡挂失
		$("#equipment_content_equipment_but_cardReportLoss_"+thisIcCard).click(function(){
			ajaxEquRun("card","智能卡挂失","ajaxCardReportLoss.do",BUSINESS_TYPE.REPOT_LOSS_CODE);
		});
		
		// 智能卡找回 YanxuLiu 20120328
		$("#equipment_content_equipment_but_cardReportFind_"+thisIcCard).click(function(){
			ajaxEquRun("card","智能卡找回","ajaxCardReportFind.do",BUSINESS_TYPE.REPORT_FIND_CODE);
		});
		
		//智能卡回收
		$("#equipment_content_equipment_but_recycleCard_"+thisIcCard).click(function(){
			var $trs = checkChecked();
			if(!$trs){
				return;
			}
			//判断是否有空行现象
			var flag = false;
			$trs.each(function(){
				if(equipmentFunc.equVar.get(thisIcCard,$(this).find(":checked").val()).icNo == ""){
					flag = true;
					return false;
				}
			});
			if(flag){
				alert(WebInitParameter.MSG_BUSI_C45);
				return;
			}
			equRecycleInit("card");
			//增加页面显示
			var $content = $("#equipment_content_equipment_recycle_"+thisIcCard);
			$content.css("top",event.clientY+$(this).height());
			$content.css("left",event.clientX-$content.width()/2);
			$(this).blur();
			$("#mask").toggle();
			$content.removeClass("hide");
		});
		//封装设备回收的ajax方法
		function equRecycleInit(equStr){
			var equStatusArr = WebInitParameter.RECYLE_EQU_STATUS.split(",");
			var content = "";
			$(equStatusArr).each(function(n,value){
				if(value==0)
					content = content + "<option value='0'>新入库</option>";
				if(value==1)
					content = content + "<option value='1'>库存测试中</option>";
				if(value==2)
					content = "<option value='2'>待售中</option>" + content;
				if(value==3)
					content = content + "<option value='3'>客户使用中</option>";
				if(value==4)
					content = content + "<option value='4'>返修入库</option>";
				if(value==5)
					content = content + "<option value='5'>退货入库</option>";
				if(value==6)
					content = content + "<option value='6'>报损入库</option>";
				if(value==7)
					content = content + "<option value='7'>返厂出库</option>";
				if(value==8)
					content = content + "<option value='8'>厂修入库</option>";
				if(value==99)
					content = content + "<option value='99'>其他</option>";
			});
			$("#equipment_content_equipment_recycle_"+thisIcCard).find("select").empty().append(content);
			$("#equipment_content_equipment_recycle_hidden_"+thisIcCard).val(equStr);
		}
		//设备回收，回收按钮响应
		$("#equipment_content_equipment_recycle_but_submit_"+thisIcCard).click(function(){
			var $trs = checkChecked();
			if(!$trs){
				return;
			}
			var equIDS = "";
			$trs.each(function(n,value){
				equIDS += $(this).find(":checked").val()+",";
			});
			var ajaxResponse = {customer_id:thisIcCard,equType:$("#equipment_content_equipment_recycle_hidden_"+thisIcCard).val(),equIDS:equIDS,equStatus:$("#equipment_content_equipment_recycle_"+thisIcCard).find("select").val()};
			
			ajaxConfirmPath = ajaxEquPath+"ajaxEquRetrieve.do";
			ajaxResData = ajaxResponse;
			$ajaxTriggerBut = $("#equipment_content_equipment_but_info_"+thisIcCard);
			$hideDiv = $("#equipment_content_equipment_recycle_"+thisIcCard);
			if($("#equipment_content_equipment_recycle_hidden_"+thisIcCard).val()=="stb"){
				businessType = BUSINESS_TYPE.STB_RECYCLE_CODE;
			}else{
				businessType = BUSINESS_TYPE.CARD_RECYCLE_CODE;
			}
			$confirmCallback = undefined;
			confirmFee("_"+thisIcCard,businessType);
		});
		//设备回收，取消按钮响应
		$("#equipment_content_equipment_recycle_but_cancel_"+thisIcCard).click(function(){
			$("#mask").toggle();
			$("#equipment_content_equipment_recycle_"+thisIcCard).addClass("hide");
		});
		
		//换卡换机按钮响应方法单独封装
		function changeCardStbRun(equType){
			var $trs = checkChecked();
			if(!$trs){
				return $trs;
			}
			if($trs.length > 1){
				alert(WebInitParameter.MSG_BUSI_C08);
				return false;
			}
			
			//封装数据
			$("#equipment_content_equipment_change_equType_"+thisIcCard).val(equType);
			
			//清空输入框
			 $("#equipment_content_equipment_change_text_"+thisIcCard).val("");
			 $("#equipment_content_equipment_change_text_"+thisIcCard).trigger("click");
			if(equType == "card"){
				$("#equipment_content_equipment_change_stbTable_"+thisIcCard).addClass("hide");
				$("#equipment_content_equipment_change_setBoxGetType_"+thisIcCard).addClass("hide");
				$("#equipment_content_equipment_change_cardTable_"+thisIcCard).removeClass("hide");
				$("#equipment_content_equipment_change_cardTable_"+thisIcCard).find("tr:not(:first-child)").remove();
				$("#equipment_content_equipment_change_cardTable_"+thisIcCard).append("<tr><td>"+$trs.eq(0).find("td").eq(1).text()+"</td><td>"+$trs.eq(0).find("td").eq(2).text()+"</td><td>"+$trs.eq(0).find("td").eq(6).text()+"</td></tr>");
				$("#equipment_content_equipment_change_equOther_"+thisIcCard).val($trs.eq(0).find("td").eq(7).text());
			}else if(equType == "stb"){
				$("#equipment_content_equipment_change_cardTable_"+thisIcCard).addClass("hide");
				$("#equipment_content_equipment_change_stbTable_"+thisIcCard).removeClass("hide");
				$("#equipment_content_equipment_change_setBoxGetType_"+thisIcCard).removeClass("hide");
				$("#equipment_content_equipment_change_stbTable_"+thisIcCard).find("tr:not(:first-child)").remove();
				$("#equipment_content_equipment_change_stbTable_"+thisIcCard).append("<tr><td>"+$trs.eq(0).find("td").eq(7).text()+"</td><td>"+$trs.eq(0).find("td").eq(10).text()+"</td></tr>");
				$("#equipment_content_equipment_change_equOther_"+thisIcCard).val($trs.eq(0).find("td").eq(1).text());
			}
			return true;
		}
		
		//换卡换机--更换按钮响应
		$("#equipment_content_equipment_change_but_change_"+thisIcCard).click(function(){
			
			//ajax操作
			var textNo = $("#equipment_content_equipment_change_text_"+thisIcCard).val();
			var equType = $("#equipment_content_equipment_change_equType_"+thisIcCard).val();
			var equOld = "";
			var equOther = $("#equipment_content_equipment_change_equOther_"+thisIcCard).val();
			var equDesc = "";
			var busiTypeTemp = BUSINESS_TYPE.CHANGE_STB_CODE;
			if(equType == "card"){
				equOld = $("#equipment_content_equipment_change_cardTable_"+thisIcCard).find("tr:not(:first-child)").eq(0).find("td").eq(0).text();
				busiTypeTemp = BUSINESS_TYPE.CHANGE_CARD_CODE;
			}else if(equType == "stb"){
				equOld = $("#equipment_content_equipment_change_stbTable_"+thisIcCard).find("tr:not(:first-child)").eq(0).find("td").eq(0).text();
				equDesc = $("#equipment_content_equipment_change_setBoxGetType_"+thisIcCard).val();
			}
			if($.trim(textNo)==""){
				alert(WebInitParameter.MSG_BUSI_C03);
				return;
			}
			if($.trim(equOld)==""||equOld==null||equOld=="null"||equOld==undefined||equOld=="undefined"){//用户没有可以更换的设备不提交 2012-4-25 yzy
				alert(WebInitParameter.MSG_EQU_C19);
				return;
			}
			var areaLevel1 = $("#customer_areaLevel1_"+thisIcCard).val();
			if(areaLevel1 == null){
				areaLevel1 = -1;
			}
			var areaLevel2 = $("#customer_areaLevel2_"+thisIcCard).val();
			if(areaLevel2 == null){
				areaLevel2 = -1;
			}
			var areaLevel3 = $("#customer_areaLevel3_"+thisIcCard).val();
			if(areaLevel3 == null){
				areaLevel3 = -1;
			}
			var ajaxChangeRes = {
					customer_id:thisIcCard,
					equType:equType,
					equOld:equOld,
					equNew:textNo,
					equOther:equOther,
					equDesc:equDesc,
					// 增加片区信息的参数 add by jhg
					areaLevelId1:areaLevel1,
					areaLevelId2:areaLevel2,
					areaLevelId3:areaLevel3
			};
//						ovtAjaxMethod(ajaxEquPath+"ajaxEquChange.do",ajaxChangeRes,function(data){
//							if(data.code == "0"){
//								//模拟点击刷新按钮
//								$("#equipment_content_equipment_but_info_"+thisIcCard).trigger("click");
//							}
//							alert(data.value);
//							//隐藏提示信息
//							$("#mask").toggle();
//							$("#equipment_content_equipment_change_div_"+thisIcCard).toggle();
//						});
			
//						$("#mask").toggle();
			ajaxConfirmPath = ajaxEquPath+"ajaxEquChange.do";
			ajaxResData = ajaxChangeRes;
			$ajaxTriggerBut = $("#equipment_content_equipment_but_info_"+thisIcCard);
			$hideDiv = $("#equipment_content_equipment_change_div_"+thisIcCard);
			$confirmCallback = undefined;
			confirmFee("_"+thisIcCard,busiTypeTemp);
//						$("#equipment_content_equipment_change_div_"+thisIcCard).addClass("hide");
			
		});
		//换卡换机--取消按钮响应
		$("#equipment_content_equipment_change_but_cancel_"+thisIcCard).click(function(){
			$("#mask").toggle();
			$("#equipment_content_equipment_change_div_"+thisIcCard).addClass("hide");
		});
		
		//智能卡换卡
		$("#equipment_content_equipment_but_cardChange_"+thisIcCard).click(function(){
			if(!changeCardStbRun("card")){
				return;
			}
			// add by liuxu 2012/6/11
			var $trs = checkChecked();
			if(!$trs){
				return $trs;
			}
			if($trs.length > 1){
				alert(WebInitParameter.MSG_BUSI_C08);
				return false;
			}
			if($trs.eq(0).find("td").eq(6).text() == "失效") {
				alert("失效的卡不能进行换卡操作!");
				return;
			}
			//显示
			$("#equipment_content_equipment_change_div_"+thisIcCard).css("top",event.clientY+$(this).height());
			$("#equipment_content_equipment_change_div_"+thisIcCard).css("left",event.clientX-$("#equipment_content_equipment_change_div_"+thisIcCard).width()/2);
			$(this).blur();
			$("#mask").toggle();
			$("#equipment_content_equipment_change_div_"+thisIcCard).removeClass("hide");
		});
		
		//机顶盒换机
		$("#equipment_content_equipment_but_stbChange_"+thisIcCard).click(function(){
			if(!changeCardStbRun("stb")){
				return;
			}
			//显示
			$("#equipment_content_equipment_change_div_"+thisIcCard).css("top",event.clientY+$(this).height());
			$("#equipment_content_equipment_change_div_"+thisIcCard).css("left",event.clientX-$("#equipment_content_equipment_change_div_"+thisIcCard).width()/6);
			$(this).blur();
			$("#mask").toggle();
			$("#equipment_content_equipment_change_div_"+thisIcCard).removeClass("hide");
		});
		
		//绑定操作弹出页面数据初始化方法封装
		function bindingInit(){
			//添加数据
//						var $bindingTrs = $("#equipmentTable_"+thisIcCard).find("tr:contains("+BINDING_TYPE_BINDING+")");
//						var $bindingTrs = $("#equVar_"+thisIcCard).find("tr");
			var bindingContent = "";
//						$bindingTrs.each(function(){
//							var tds = $(this).find("td");
//							if(tds.eq(6).text()==BINDING_TYPE_VALUE_BINDING){
//								bindingContent = bindingContent + "<tr><td><input type = 'checkbox' value = '"+tds.eq(10).text()+"'/></td><td>"+tds.eq(1).text()+"</td><td>"+tds.eq(7).text()+"</td><td>"+tds.eq(8).text()+"</td><td>"+tds.eq(4).text()+"</td><td>"+tds.eq(9).text()+"</td></tr>"
//							}
//						});
			$(equipmentFunc.equVar.getValue(thisIcCard).value).each(function(){
				if(this.bindingType==BINDING_TYPE_VALUE_BINDING){
					bindingContent = bindingContent + "<tr><td><input type = 'checkbox' value = '"+this.id+"'/></td><td>"+this.icNo+"</td><td>"+this.equSlaveName+"</td><td>"+this.cardDesc+"</td><td>"+this.stbNo+"</td><td>"+this.stbDesc+"</td></tr>"
				}
			});
			
//						var $unBindingTrs = $("#equipmentTable_"+thisIcCard).find("tr:contains("+BINDING_TYPE_UNBINDING+")");
//						alert($unBindingTrs.length);
			var unBindingCardContent = "";
			var unBindingStbContent = "";
//						$bindingTrs.each(function(){
//							var tds = $(this).find("td");
//							if(tds.eq(6).text()==BINDING_TYPE_VALUE_UNBINDING){
//								var cardNo = tds.eq(1).text();
//								var stbNo = tds.eq(4).text();
//								if(cardNo != ""){
//									unBindingCardContent = unBindingCardContent + "<tr><td><input type ='radio' value='"+cardNo+"' name = 'unbindingCard_"+thisIcCard+"'/></td><td>"+cardNo+"</td><td>"+$(this).find("td").eq(7).text()+"</td><td>"+$(this).find("td").eq(8).text()+"</td></tr>";
//								}
//								if(stbNo != ""){
//									unBindingStbContent = unBindingStbContent + "<tr><td><input type ='radio' value='"+stbNo+"' name = 'unbindingStb_"+thisIcCard+"'/></td><td>"+stbNo+"</td><td>"+$(this).find("td").eq(9).text()+"</td></tr>";
//								}
//							}
//						});
			$(equipmentFunc.equVar.getValue(thisIcCard).value).each(function(){
				if(this.bindingType==BINDING_TYPE_VALUE_UNBINDING){
					if(this.icNo != ""){
						unBindingCardContent = unBindingCardContent + "<tr><td><input type ='radio' value='"+this.icNo+"' name = 'unbindingCard_"+thisIcCard+"'/></td><td>"+this.icNo+"</td><td>"+this.equSlaveName+"</td><td>"+this.cardDesc+"</td></tr>";
					}
					if(this.stbNo != ""){
						unBindingStbContent = unBindingStbContent + "<tr><td><input type ='radio' value='"+this.stbNo+"' name = 'unbindingStb_"+thisIcCard+"'/></td><td>"+this.stbNo+"</td><td>"+this.stbDesc+"</td></tr>";
					}							}
			});
			
//						var bindingContent = "";
//						var unBindingCardContent = "";
//						var unBindingStbContent = "";
//						$("#equVar_"+thisIcCard).find("tr").each(function(){
//							if($(this).find("td").eq(7) == "1"){
//								bindingContent = bindingContent + "<tr><td><input type = 'checkbox' value = '"+$(this).attr("id")+"'/></td><td>"+$(this).find("td").eq(2).text()+"</td><td>"+$(this).find("td").eq(3).text()+"</td><td>"+$(this).find("td").eq(4).text()+"</td><td>"+$(this).find("td").eq(5).text()+"</td><td>"+$(this).find("td").eq(7).text()+"</td></tr>"
//							}
//						});
//						
			$("#equipment_content_equipment_binding_bindingTable_"+thisIcCard).find("tr:not(:first-child)").remove();
			$("#equipment_content_equipment_binding_bindingTable_"+thisIcCard).append(bindingContent);
			$("#equipment_content_equipment_binding_cardTable_"+thisIcCard).find("tr:not(:first-child)").remove();
			$("#equipment_content_equipment_binding_cardTable_"+thisIcCard).append(unBindingCardContent);
			$("#equipment_content_equipment_binding_stbTable_"+thisIcCard).find("tr:not(:first-child)").remove();
			$("#equipment_content_equipment_binding_stbTable_"+thisIcCard).append(unBindingStbContent);

		}
		//绑定操作按钮响应方法
		$("#equipment_content_equipment_but_binding_"+thisIcCard).click(function(){
			//初始化
			bindingInit();
			//显示
			$("#equipment_content_equipment_binding_div_"+thisIcCard).css("top",event.clientY+$(this).height());
			$("#equipment_content_equipment_binding_div_"+thisIcCard).css("left",event.clientX-$("#equipment_content_equipment_binding_div_"+thisIcCard).width()/4);
			$(this).blur();
			$("#mask").toggle();
			$("#equipment_content_equipment_binding_div_"+thisIcCard).removeClass("hide");
//						$("#equipment_content_equipment_binding_div_"+thisIcCard).show(200);
//						$("#equipment_content_equipment_binding_div_"+thisIcCard).fadeIn(400);
//						$("#equipment_content_equipment_binding_div_"+thisIcCard).slideDown(400);
		});
		
		//解除绑定按钮响应方法
		$("#equipment_content_equipment_binding_but_unbinding_"+thisIcCard).click(function(){
			var $trs = $("#equipment_content_equipment_binding_bindingTable_"+thisIcCard).find("tr:has(:checked)");
			if($trs.length == 0){
				alert(WebInitParameter.MSG_BUSI_C02);
				return;
			}
			var unBindingRes = {
					customer_id:thisIcCard,
					equDesc:""
			};
			$trs.each(function(){
				unBindingRes.equDesc = unBindingRes.equDesc + $(this).find("td").eq(1).text() + ":" +　$(this).find("td").eq(4).text() + ":" +　$(this).find("input").val() + "&" 
			});
			
			ovtAjaxMethod(ajaxEquPath+"ajaxUnBinding.do",unBindingRes,function(data){
				if(data.code!="0"){
					alert(WebInitParameter.MSG_BUSI_C04+data.value);
				}else{
//								$("#equipment_content_equipment_but_info_"+thisIcCard).trigger("click");
//								bindingInit();
					alert(data.value);
					flushEquipment();
					
				}
			});
			
		});
		//机卡绑定按钮响应方法
		$("#equipment_content_equipment_binding_but_binding_"+thisIcCard).click(function(){
			var $cardTrs = $("#equipment_content_equipment_binding_cardTable_"+thisIcCard).find("tr:has(:checked)").eq(0);
			if($cardTrs.length==0){
				alert(WebInitParameter.MSG_BUSI_C05);
				return ;
			}
			var $stbTrs = $("#equipment_content_equipment_binding_stbTable_"+thisIcCard).find("tr:has(:checked)").eq(0);
			if($stbTrs.length==0){
				alert(WebInitParameter.MSG_BUSI_C06);
				return ;
			}
			var bindingRes = {
					customer_id:thisIcCard,
					equDesc:$cardTrs.find("td").eq(1).text() + ":" +　$stbTrs.find("td").eq(1).text()
			};
			
			ovtAjaxMethod(ajaxEquPath+"ajaxBinding.do",bindingRes,function(data){
				if(data.code!="0"){
					alert(WebInitParameter.MSG_BUSI_C07+data.value);
				}else{
//								$("#equipment_content_equipment_but_info_"+thisIcCard).trigger("click");
//								bindingInit();
					alert(data.value);
					flushEquipment();
				}
			});
			
		});
		//绑定操作取消按钮响应方法
		$("#equipment_content_equipment_binding_but_cancel_"+thisIcCard).click(function(){
			$("#equipment_content_equipment_binding_div_"+thisIcCard).addClass("hide");
//						$("#equipment_content_equipment_binding_div_"+thisIcCard).fadeOut(400);
//						$("#equipment_content_equipment_binding_div_"+thisIcCard).slideUp(400);
//						$("#equipment_content_equipment_but_info_"+thisIcCard).trigger("click");
			$("#mask").toggle();
		});
		
		// add by jhg 2013-08-22 设备服务升级 start
		$("#equipment_order_content_but_equServUP_"+thisIcCard).click(function(){
			$("#equipment_promotion_showEquInvalidTable_"+thisIcCard).empty();
			var $trs = checkChecked();
			if(!$trs){
				return $trs;
			}
			if($trs.length > 1){
				alert(WebInitParameter.MSG_BUSI_C08);
				return false;
			}
			if($trs.eq(0).find("td").eq(6).text() != "启用") {
				alert("只有启用状态下的智能卡才能进行设备服务升级操作!");
				return;
			}
			// 初始化设备修改控件
			equPromotionInit(thisIcCard,$trs );
			// 初始化终端订购修改控件
			equPromotionOrderInit(thisIcCard,$trs );
			// 初始化费用修改控件
			equPromotionFeeInit(thisIcCard,$trs);
			//显示
			$("#equipment_promotion_change_div_"+thisIcCard).css("top",event.clientY+$(this).scrollTop()+$(this).height()+"px");
			$("#equipment_promotion_change_div_"+thisIcCard).css("left","200px");
			$(this).blur();
			$("#mask").toggle();
			$("#equipment_promotion_change_div_"+thisIcCard).removeClass("hide");
			// 允许退订框拖拽 
			$("#equipment_promotion_title_"+thisIcCard).drag("#equipment_promotion_change_div_"+thisIcCard);
		});
		
		// 服务升级取消按钮点击事件
		$("#equipment_promotion_change_but_cancel_"+thisIcCard).click(function(){
			$("#equipment_promotion_change_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
		//设备服务升级右上角图片点击事件
		$("#equipment_promotion_close_icon_"+thisIcCard).click(function(){
			$("#equipment_promotion_change_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
		// 设备检测操作事件
		$("#equipment_checkInvalid_"+thisIcCard).click(function(){
			var $trs = checkChecked();
			$("#equipment_promotion_showEquInvalidTable_"+thisIcCard).empty();
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
			var newIcCardNo = $("#icCardValue").val();
			var newIcCardModel = $("#icCardModel").val();
			var newStbNo = $("#setBoxValue").val();
			var newStbModel = $("#stbModel").val();
		
			if(newIcCardNo == "" && newStbNo == ""){
				return;
			}
			var ajaxCheckQuerys = {
				oldIcNo:oldIcNo,
				newIcCardNo:newIcCardNo,
				oldStbNo:oldStbNo,
				newStbNo:newStbNo
			};
			ovtAjaxMethod(ajaxEquPath+"checkEquChange.do",ajaxCheckQuerys,function(data){
				if(data.code == 1){
					alert(data.value);
					return;
				}else{
					var showEquInfo = "<font color='red'>可以更换</font>";
					var showContentHtml = "<tr><td>设备检测正常，"+showEquInfo+"，请确认！</td></tr>"
					$("#equipment_promotion_showEquInvalidTable_"+thisIcCard).append(showContentHtml);
				}
			});
		});
		
		// 确定升级按钮点击事件
		$("#equipment_promotion_change_but_change_"+thisIcCard).click(function(){
			var $trs = checkChecked();
			// 设备修改参数
			var oldIcNo = $trs.eq(0).find("td").eq(1).text();
			var oldIcCardObj = "";
			var oldIcId = "";
			if(oldIcNo != ""){
				oldIcCardObj = equipmentFunc.icCardVarInfo.get(thisIcCard,oldIcNo);
				oldIcId = oldIcCardObj.icId;
			}
			var oldStbNo = $trs.eq(0).find("td").eq(7).text();
			var oldStbObj = "";
			var oldStbId = "";
			if(oldStbNo != ""){
				oldStbObj = equipmentFunc.stbBoxVarInfo.get(thisIcCard,oldStbNo);
				oldStbId = oldStbObj.stbId;
			}
			var newIcCardNo = $("#icCardValue").val();
			var newIcCardModel = $("#icCardModel").val();
			var newStbNo = $("#setBoxValue").val();
			var newStbModel = $("#stbModel").val();
			// 设备检测
			if((newIcCardNo != undefined && newIcCardNo != "")|| (newStbNo != undefined && newStbNo != "")){
				var hasTr = $("#equipment_promotion_showEquInvalidTable_"+thisIcCard).has("tr");
				if(hasTr.length == 0){
					alert("请进行【设备检测】后再进行【确定升级】操作！");
					return;
				}
			}
			// 订购修改参数
			var equOrders = equipmentFunc.icCardVarInfo.get(thisIcCard,oldIcNo);
			var equOrderLength = equOrders.orderList.length;
			var orderType = "";
			var productId = "";
			var policyId = "";
			var newOrderSelect = "";
			if(equOrderLength > 0){
				$(equOrders.orderList).each(function(n,inValue){
					orderType = $("#newOrderTypeSelect_"+thisIcCard+"_"+inValue.orderId).val();
					productId = $("#newProductSelect_"+thisIcCard+"_"+inValue.orderId).val();
					policyId = $("#newPolicySelect_"+thisIcCard+"_"+inValue.orderId).val();
					if(orderType != "-1" && productId != "-1" && policyId != "-1"){
						newOrderSelect = newOrderSelect + (inValue.orderId + "_"+ orderType + "_"+ productId + "_"+ policyId)+";";
					}
				});
			}
			// 产生费用参数
			var feeItemLength = 0;
			var confirmCost = "";
			if(undefined != equPromotionFunc.feeItemValue){
				feeItemLength = equPromotionFunc.feeItemValue.length;
			}
			if(feeItemLength > 0){
				var feeValue = "";
				$(equPromotionFunc.feeItemValue).each(function(n,inValue){
					feeValue = $("#promotion_"+thisIcCard+"_"+inValue.id).val();
					if(feeValue != ""){
						confirmCost = confirmCost + (inValue.id+":"+inValue.feeCode+":"+inValue.parentId+":"
							  + inValue.feeName+":"+inValue.itemType+":"+inValue.remark+":"
							  + inValue.isFee+":"+feeValue+":1:1&");
					}
				});
			}
			if(confirmCost == ""){
				feeItemLength = 0;
			}
			var areaLevel1 = $("#customer_areaLevel1_"+thisIcCard).val();
			if(areaLevel1 == null){
				areaLevel1 = -1;
			}
			var areaLevel2 = $("#customer_areaLevel2_"+thisIcCard).val();
			if(areaLevel2 == null){
				areaLevel2 = -1;
			}
			var areaLevel3 = $("#customer_areaLevel3_"+thisIcCard).val();
			if(areaLevel3 == null){
				areaLevel3 = -1;
			}
			var ajaxPromotionQuerys = {
				customer_id:thisIcCard,
				businessType:BUSINESS_TYPE.EQU_PROMOTION_CODE,
				areaLevelId1:areaLevel1,
				areaLevelId2:areaLevel2,
				areaLevelId3:areaLevel3,
				oldIcNo:oldIcNo,
				oldIcId:oldIcId,
				newIcCardNo:newIcCardNo,
				oldStbNo:oldStbNo,
				oldStbId:oldStbId,
				newStbNo:newStbNo,
				newOrderSelect:newOrderSelect,
				confirmCost:confirmCost
			};
			$("#equipment_promotion_change_but_change_"+thisIcCard).attr("disabled",true);
			ovtAjaxMethod(ajaxEquPath+"ajaxEquOrderPromotion.do",ajaxPromotionQuerys,function(data){
				if(data.code == 1){
					alert(data.value);
					return;
				}else{
					if(feeItemLength > 0){
						var skipFlag = false;
						if(equipmentFunc.operConfirm1("equCommand",data.value + "请进入缴费页面进行缴费!")){
							skipFlag = true;
						}
						$("#equipment_promotion_change_but_change_"+thisIcCard).attr("disabled",false);//恢复
						$("#equipment_promotion_change_div_"+thisIcCard).addClass("hide");
						$("#mask").toggle();
						flushEquipment();
						if(skipFlag) {
							$("#common_bar_but_payment_"+thisIcCard).trigger("click");
						}
					}else{
						alert(data.value);
						$("#equipment_promotion_change_but_change_"+thisIcCard).attr("disabled",false);//恢复
						$("#equipment_promotion_change_div_"+thisIcCard).addClass("hide");
						$("#mask").toggle();
						flushEquipment();
					}
				}
			});
		});
		// add by jhg 2013-08-22 设备服务升级 end
		
		// add by jhg 2013-07-19 终端订购同步操作 start
		// 终端订购同步操作按钮响应方法 
		$("#equipment_content_equipment_but_syncOrder_"+thisIcCard).click(function(){
			$("#equipment_content_equipment_selectEqu_readio_"+thisIcCard).attr("checked", true);
			$("#supplyProductPageTableBar_"+thisIcCard).empty();
			//初始化
			syncOrderInit(thisIcCard,1);
			//确定位置
			$("#equipment_content_equipment_syncOrder_div_"+thisIcCard).css("top",event.clientY+$(this).scrollTop()+$(this).height()+"px");
			$("#equipment_content_equipment_syncOrder_div_"+thisIcCard).css("left","220px");
			$("#equipment_content_equipment_syncOrder_div_"+thisIcCard).removeClass("hide");
			$("#syncOrder_checkIds_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
			// 允许退订框拖拽 
			$("#equipment_syncOrder_info_title_"+thisIcCard).drag("#equipment_content_equipment_syncOrder_div_"+thisIcCard);  
		});
		
		// 选择终端点击事件
		$("#equipment_content_equipment_selectEqu_readio_"+thisIcCard).click(function(){
			$("#supplyProductPageTableBar_"+thisIcCard).empty();
			syncOrderInit(thisIcCard,1);
			$("#equipment_content_equipment_syncOrder_div_"+thisIcCard).removeClass("hide");
			$("#syncOrder_checkIds_"+thisIcCard).addClass("hide");
		});
		
		// "所有终端"点击事件
		$("#equipment_content_equipment_allEqu_readio_"+thisIcCard).click(function(){
			$("#equipment_content_equipment_syncOrderTable_"+thisIcCard).empty();
			$("#equipment_content_equipment_syncOrderInfo_cardTable_"+thisIcCard).empty();
			$("#supplyProductPageTableBar_"+thisIcCard).empty();
			orderParamStr = "";
			supplyOrderSeq = "";
			checkEquQueryOrderInfo(thisIcCard,"allEqu");
		});
		
		// 同步订购弹出框按钮操作-- 右上角关闭图片点击事件 add by jhg
		$("#equipment_syncOrder_close_icon_"+thisIcCard).click(function(){
			$("#equipment_content_equipment_syncOrder_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
		// 同步订购弹出框按钮操作-- 取消按钮点击事件 add by jhg
		$("#equipment_content_equipment_syncOrder_but_cancel_"+thisIcCard).click(function(){
			$("#equipment_content_equipment_syncOrder_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
		// 订购预览点击事件
		$("#equipment_content_equipment_viewSyncOrder_"+thisIcCard).click(function(){
			var allEquFlag = $("#equipment_content_equipment_allEqu_readio_"+thisIcCard).attr("checked");
			$("#equipment_content_equipment_syncOrderInfo_cardTable_"+thisIcCard).empty();
			// 记录选择的记录
			var equSelected = $("#equipment_content_equipment_syncOrderTable_"+thisIcCard).find("td:has(:checked)");
			if(equSelected.length == 0 && !allEquFlag){
				$("#equipment_content_equipment_orderInfo_cardTable_"+thisIcCard).empty();
				$("#equipment_content_equipment_syncOrderInfo_cardTable_"+thisIcCard).empty();
				$("#order_contnet_maxExpiryDate_"+thisIcCard).val("");
				$("#syncOrder_checkIds_"+thisIcCard).addClass("hide");
				return;
			}
			var equCheckTds;
			var checkEquId = "";
			var equIdStr = "";
			if(!allEquFlag){
				var checkFlag = true;
				equSelected.each(function(){
					$equCheckTds = $(this).find("input");
					$equCheckTds.each(function(){
						equIdStr = $(this).val().split("_");
						if(equIdStr[1] != 1){
							checkFlag = false;
							return false;
						} 
						var checkEquNo = $("#syncEqu_checkEquInfo_"+thisIcCard+"_"+equIdStr[0]).val();
						checkEquId = checkEquId + (equIdStr[0]+"_"+checkEquNo) + ",";
					});
				});
				
				if(!checkFlag){
					alert("您选择的终端有未启用的状态，请重新选择！");
					return;
				}
			}
			var equOrderSelected = $("#equipment_content_equipment_orderInfo_cardTable_"+thisIcCard).find("td:has(:checked)");
			var orderSelectTDIds = "";
			var orderCheckIds = "";
			equOrderSelected.each(function(){
				orderSelectTDIds = $(this).find("input");
				orderSelectTDIds.each(function(){
					orderCheckIds = orderCheckIds + $(this).val() + ",";
				});
			});
			var maxExpiryTime = $("#order_contnet_maxExpiryDate_"+thisIcCard).val();
			var ajaxShowEquOrderProduct = {
				customer_id:thisIcCard,
				checkEquIds:checkEquId,
				orderCheckIds:orderCheckIds,
				maxExpiryTime:maxExpiryTime
			};
			
			if(orderCheckIds == ""){
				alert("请选择需要同步的产品信息！");
				return;
			}
			
			if(maxExpiryTime == ""){
				alert("订购的最大到期时间不能为空，请选择！");
				return;
			}
			
			ovtAjaxMethod(ajaxProPath+"showOrderByEqu.do",ajaxShowEquOrderProduct,function(data){
				if(data.code == 1){
					alert(data.value);
					return;
				}else{
					var showUserOrderTr = "";
					var totalMoney = 0.0;
					if(data.value.length == 0){
						orderParamStr = "0";
					}else{
						supplyOrderSeq = "";
						orderParamStr = "";
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
						orderParamStr = orderParamStr + inValue.id+","+inValue.productId+","+inValue.effectiveDate+","+inValue.expiryDate+"&"
						supplyOrderSeq = supplyOrderSeq + (thisIcCard+"_"+inValue.id+",");
						orderFeeInnerHtml = "<div id='inputSupplyOrderFeeText_"+thisIcCard+"_"+inValue.id+"'><input type='hidden' style='width:100px' name='showSupplyOrderPay' " +
										 "id= 'showSupplyOrderPay_"+thisIcCard+"_"+inValue.id+"' value='"+Number(inValue.lockMoney).toFixed(2)+"'></input>" +
										 "<font color='red' size='14' onDblClick=supplyOrderPayFeeModifyProcess("+thisIcCard+","+inValue.id+","
										 +Number(inValue.lockMoney).toFixed(2)+","+data.other+")>" + inValue.lockMoney +"("+ newStr +")"+"</font></div>";
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
					showUserOrderTr = showUserOrderTr + "<tr align='right'><td colspan='6'>订购费用总金额：<input disabled='disabled' style='width:50px' id='supplyOrderTotalFeeInputText_"+thisIcCard+"' value="+ Number(totalMoney).toFixed(2) +"></input>（元）</td></tr>";
					$("#equipment_content_equipment_syncOrderInfo_cardTable_"+thisIcCard).append("<tr><th>智能卡号</th><th>订购产品</th><th>策略名称</th><th>开始时间</th><th>失效时间</th><th>订购费用(元)</th></tr>");
					$("#equipment_content_equipment_syncOrderInfo_cardTable_"+thisIcCard).append(showUserOrderTr);
				}
			});
		});
		
		// 关闭预览点击时间
		$("#equipment_content_equipment_closeSyncOrder_"+thisIcCard).click(function(){
			orderParamStr = "";
			supplyOrderSeq = "";
			$("#equipment_content_equipment_syncOrderInfo_cardTable_"+thisIcCard).empty();
		});
		
		// 同步订购"确认"按钮事件
		$("#equipment_content_equipment_syncOrder_sub_"+thisIcCard).click(function(){
			var allEquFlag = $("#equipment_content_equipment_allEqu_readio_"+thisIcCard).attr("checked");
			// 是否请求后台的标记  "0"准备参数充足可以请求 "1"准备参数不足 不请求
			var ajaxResFlag = "0";
			var supplyOrderId = "";
			var supplyOrderFee = "";
			var showSupplyPayFee = "";
			var showModifySupplyPayFee = "";
			if(supplyOrderSeq != ""){
				var supplyIds = supplyOrderSeq.split(",");
				for(var index=0;index<supplyIds.length;index++){
					supplyOrderId = supplyIds[index];
					if(supplyOrderId != ""){
						// 通过计费规则计算出的金额
						showSupplyPayFee = $("#showSupplyOrderPay_"+supplyOrderId).val();
						// 操作员手动录入金额
						showModifySupplyPayFee = $("#modifySupplyShowPay_"+supplyOrderId).val();
						if(showSupplyPayFee == undefined || showSupplyPayFee == ""){
							// 返回false时，如果有错误，直接退出each循环
							ajaxResFlag = "1";
							return false;
						}
						// 如果操作员手动录入了，使用录入的金额
						if(showModifySupplyPayFee != undefined && showModifySupplyPayFee != ""){
							supplyOrderFee = supplyOrderFee + supplyOrderId + "-" + showModifySupplyPayFee + ",";
						}else{
							supplyOrderFee = supplyOrderFee + supplyOrderId + "-" + showSupplyPayFee + ",";
						}
					}
				};
			}
			if(ajaxResFlag == "1"){
				return;
			}
			
			// 记录选择的记录
			var equSelected = $("#equipment_content_equipment_syncOrderTable_"+thisIcCard).find("td:has(:checked)");
			if(equSelected.length == 0 && !allEquFlag){
				alert("请选择需要同步的智能卡！");
				return;
			}
			
			if(orderParamStr == ""){
				alert("请点击【订购预览】后再操作！");
				return;
			}
			
			if(orderParamStr == "0"){
				alert("没有需要同步的订购信息，请重新选择后再操作！");
				return;
			}
			var ajaxSupplyProduct = {
				customer_id:thisIcCard,
				orderParamStr:orderParamStr,
				supplyOrderFee:supplyOrderFee
			};
			$(this).attr("disabled",true);//置灰
			ovtAjaxMethod(ajaxProPath+"ajaxDoUserOrder.do",ajaxSupplyProduct,function(data){
				var skipFlag = false;
				if(equipmentFunc.operConfirm1("equCommand",data.value + "请进入缴费页面进行缴费!")){
					skipFlag = true;
				}
				$("#equipment_content_equipment_syncOrder_sub_"+thisIcCard).attr("disabled",false);//恢复
				$("#equipment_content_equipment_syncOrder_div_"+thisIcCard).addClass("hide");
				$("#mask").toggle();
				flushOrder();//刷新订购信息
				if(skipFlag) {
					$("#common_bar_but_payment_"+thisIcCard).trigger("click");
				}
			});
		});
		// add by jhg 2013-07-19 终端订购同步操作 end
		
		// 授权信息中全选或取消全选授权信息项 liuxu 2012-07-09
		$("#authroize_content_authorize_but_selectAllItems_"+thisIcCard).change(function() {
			if ($("#authroize_content_authorize_but_selectAllItems_"+thisIcCard).attr("checked") == true) {
				$("#authorizeTable_"+thisIcCard).find("input").attr("checked", true);
			} 
			else {
				$("#authorizeTable_"+thisIcCard).find("input").attr("checked", false);
			}
		});					
		// 如果用户选择发送停止卡指令，则必须选择启用卡指令。
		// 这里当用户选择停止卡指令时，自动选中启用卡和刷新授权指令
		$("#authorize_content_authorize_but_stopCard_"+thisIcCard).change(function() {
			if ($("#authorize_content_authorize_but_stopCard_"+thisIcCard).attr("checked") == true) {
				$("#authorize_content_authorize_but_enableCard_"+thisIcCard).attr("checked", true);
				$("#authorize_content_authorize_but_flushRight_"+thisIcCard).attr("checked", true);
			}
		});
		
		// 在授权信息中点击发送指令处理 liuxu 2012-07-10
		$("#authorize_content_authorize_but_sendCommand_"+thisIcCard).click(function(){
			var $table = $("#authorizeTable_"+thisIcCard);
			if($table.find("tr:has(:checked)").length==0){
				alert(WebInitParameter.MSG_BUSI_C02);
				return false;
			}
			var $trs = $table.find("tr:has(:checked)");
			if (!$trs) {
				return;
			}
			// 判断是否有空行现象
			var flag = false;
			$trs.each(function() {
				if (authorizeFunc.equVar.get(thisIcCard,$(this).find(":checked").val()) != null) {
					if (authorizeFunc.equVar.get(thisIcCard,$(this).find(":checked").val()).icNo == ""){
						flag = true;
						return false;
					}
				}
			});
			if (flag) {
				alert(WebInitParameter.MSG_BUSI_C02);
				return;
			}
			// 要进行的操作指令集
			var commandCollection = ""; 
			var $commands = $("#authorize_content_authorize_command_div_"+thisIcCard).find(":checked");
			$commands.each(function() {
				commandCollection = commandCollection + $(this).val() + ",";
			});
			// 点击发送授权时应该判断是否有选中指令
			if ($commands.length == 0) {
				alert("请选择要执行的指令!");
				return;
			}
			//操作确认框
			if (!authorizeFunc.operConfirm("equCommand","发送授权指令")){
				return;
			}
			// 选中的要发送授权指令的智能卡信息
			var equNos = ""; 
			$trs.each(function() {
				if (authorizeFunc.equVar.get(thisIcCard,$(this).find(":checked").val()) != null) {
					equNos = equNos + authorizeFunc.equVar.get(thisIcCard,$(this).find(":checked").val()).icId + "&" + authorizeFunc.equVar.get(thisIcCard,$(this).find(":checked").val()).icNo +",";
				}
			});
			$("mask").toggle();
			var ajaxRes = {
					customer_id:thisIcCard,
					equNos:equNos,
					commandCollection:commandCollection
			};
			ovtAjaxMethod(ajaxEquPath+"ajaxSendAuthorizeCommand.do",ajaxRes,function(data){
				alert(data.value);
				$("#mask").toggle();
			})
			$("#mask").toggle();
		});
		
		//刷新授权
		$("#equipment_content_equipment_but_cardSync_"+thisIcCard).click(function(){
			var $trs = checkChecked();
			if(!$trs){
				return;
			}
			//判断是否有空行现象
			var flag = false;
			$trs.each(function(){
				if(equipmentFunc.equVar.get(thisIcCard,$(this).find(":checked").val()).icNo == ""){
					flag = true;
					return false;
				}
			});
			if(flag){
				alert(WebInitParameter.MSG_EQU_C05);
				return;
			}

			//操作确认框
			if(!equipmentFunc.operConfirm("equCommand","刷新授权")){
				return;
			}

			var equNos = "";
			$trs.each(function(){
				equNos = equNos + equipmentFunc.equVar.get(thisIcCard,$(this).find(":checked").val()).icNo +",";
			});
//						if($.trim(equNos)==""){
//							alert(WebInitParameter.MSG_EQU_C05);
//							return;
//						}
			$("#mask").toggle();
			var ajaxRes = {
					customer_id:thisIcCard,
					equNos:equNos
			}
			ovtAjaxMethod(ajaxRegPath+"ajaxUpdateIcRights.do",ajaxRes,function(data){
				alert(data.value);
				$("#mask").toggle();
			})
		});
		
		//清除授权
		$("#equipment_content_equipment_but_clearRight_"+thisIcCard).click(function(){
			var $trs = checkAuthorizeChecked();
			if(!$trs){
				return;
			}
			//判断是否有空行现象
			var flag = false;
			$trs.each(function(){
				if(authorizeFunc.equVar.get(thisIcCard,$(this).find(":checked").val()).icNo == ""){
					flag = true;
					return false;
				}
			});
			if(flag){
				alert(WebInitParameter.MSG_EQU_C05);
				return;
			}
			//操作确认框
			if(!authorizeFunc.operConfirm("equCommand","清除授权")){
				return;
			}
			var equNos = "";
			$trs.each(function(){
				equNos = equNos + authorizeFunc.equVar.get(thisIcCard,$(this).find(":checked").val()).icNo +",";
			});
			$("#mask").toggle();
			var ajaxRes = {
					customer_id:thisIcCard,
					equNos:equNos
			}
			ovtAjaxMethod(ajaxRegPath+"ajaxClearIcRights.do",ajaxRes,function(data){
				alert(data.value);
			})
			$("#mask").toggle();
		});
		
		//服务开通
		$("#equipment_content_equipment_but_openServ_"+thisIcCard).click(function(){
			//操作确认框
			if(!equipmentFunc.operConfirm("equCommand","开通【申请中/欠费停用】服务")){
				return;
			}
			$("#mask").toggle();
			var ajaxRes = {
					customer_id:thisIcCard
			}
			ovtAjaxMethod(ajaxRegPath+"ajaxOpenIcServ.do",ajaxRes,function(data){
				alert(data.value);
				$("#mask").toggle();
			})
		});
		
		//----------------------------------订购信息操作------------------------------------------------
		//订购信息列表刷新
		$("#product_content_product_but_info_"+thisIcCard).click(function(){
//						flushOrder2Var("_"+thisIcCard,thisIcCard,flushProducts);
			flushOrder();
		});
		// 使用订购限制策略修改 modify by jhg 2013-06-20
		productInit3("_"+thisIcCard,thisIcCard,"0","","","0");//初始化订购页面显示
		
//					orderInit("_"+thisIcCard);
		
		
		//订购产品页面方法----订购按钮方法----20100108 lidf 重写
//					$("#select_equ_but_selected_"+thisIcCard).click(function(){
//						if(flushProductVar("_"+thisIcCard) == false){
//							return ;
//						}
//						var ajaxProduct = {
//								customer_id:thisIcCard,
//								customerOrder:getProductFromVar("_"+thisIcCard)
//						};
//						ovtAjaxMethod(ajaxProPath+"ajaxDoUserOrder.do",ajaxProduct,function(data){
//							if(data.code != '0'){
//								alert(data.value);
//							}
//							$("#base_product_info_"+thisIcCard).addClass("hide");
//							$("#select_equ_div_"+thisIcCard).addClass("hide");
//							$("#mask").toggle();
//							$("#product_content_product_but_info_"+thisIcCard).trigger("click");
//						});
//					});
		
//					//订购产品页面方法----订购按钮方法----20100108 lidf 重写
//					$("#select_equ_but_selected_"+thisIcCard).click(function(){
//						var $selectPro = $("#base_productTable_"+thisIcCard).find("input:checked");
//						var $equs = $("#select_equ_table_"+thisIcCard).find("input:checked");
//						if($equs.length==0){
//							alert(WebInitParameter.MSG_EQU_C11);
//							return;
//						}
//						// id:智能卡号,智能卡号,
//						var customerOrder = "";
//						$selectPro.each(function(){
//							if($(this).attr("type")=="radio"){
//								customerOrder = customerOrder + $(this).val() +":";
//								$equs.each(function(){
//									customerOrder = customerOrder + $(this).val() + ",";
//								});
//								customerOrder = customerOrder + "&";
//							}
//						});
//						var ajaxProduct = {
//								customer_id:thisIcCard,
//								customerOrder:customerOrder
//						};
//						ovtAjaxMethod(ajaxProPath+"ajaxDoUserOrder.do",ajaxProduct,function(data){
////							if(data.code != '0'){
//								alert(data.value);
////							}
//							$("#base_product_info_"+thisIcCard).addClass("hide");
//							$("#select_equ_div_"+thisIcCard).addClass("hide");
//							$("#mask").toggle();
//							flushOrder();//刷新订购信息
//						});
//					});
		//订购产品页面方法----订购按钮方法----20110304 lidf 重写
		$("#select_equ_but_selected_"+thisIcCard).click(function(){
			var $selectPro = $("#base_productTable_"+thisIcCard).find("input:checked");
			var $equs = $("#select_equ_table_"+thisIcCard).find("input:checked");
			if($equs.length==0){
				alert(WebInitParameter.MSG_EQU_C11);
				return;
			}
			// id:智能卡号,智能卡号,
			var customerOrder = "";
			$selectPro.each(function(){
				var tds = $(this).parent().parent().find("td");
//							customerOrder = customerOrder + $(this).val() + "," +tds.eq(5).find("select").val()+","+tds.eq(6).text()+","+tds.eq(8).find("input[type=text]").val()+","+tds.eq(9).find("input[type=text]").val()+":";
				//增加用户订购增加数量--2011/11/29 --- liuyajie重写
				customerOrder = customerOrder + $(this).val() + "," +tds.eq(5).find("select").val()+","+tds.eq(7).text()+","+tds.eq(6).find("input[type=text]").val()+","+tds.eq(9).find("input[type=text]").val()+","+tds.eq(10).find("input[type=text]").val()+":";
				$equs.each(function(){
					customerOrder = customerOrder + $(this).val() + ",";
				});
				customerOrder = customerOrder + "&";
			});
			var areaLevel1 = $("#customer_areaLevel1_"+thisIcCard).val();
			if(areaLevel1 == null){
				areaLevel1 = -1;
			}
			var areaLevel2 = $("#customer_areaLevel2_"+thisIcCard).val();
			if(areaLevel2 == null){
				areaLevel2 = -1;
			}
			var areaLevel3 = $("#customer_areaLevel3_"+thisIcCard).val();
			if(areaLevel3 == null){
				areaLevel3 = -1;
			}
			var ajaxProduct = {
					customer_id:thisIcCard,
					// add by jhg 2012-03-23 处理用户订购时增加片区信息
					areaLevelId1:areaLevel1,
					areaLevelId2:areaLevel2,
					areaLevelId3:areaLevel3,
					customerOrder:customerOrder
			};
			$(this).attr("disabled",true);//置灰
			ovtAjaxMethod(ajaxProPath+"ajaxDoUserOrder.do",ajaxProduct,function(data){
				var skipFlag = false;
//							if(data.code != '0'){
//								alert(data.value);
//							}
				if(equipmentFunc.operConfirm1("equCommand",data.value + "请进入缴费页面进行缴费!")){
					skipFlag = true;
				}
				$("#select_equ_but_selected_"+thisIcCard).attr("disabled",false);//恢复
				$("#base_product_info_"+thisIcCard).addClass("hide");
				$("#select_equ_div_"+thisIcCard).addClass("hide");
				$("#mask").toggle();
				flushOrder();//刷新订购信息
				if(skipFlag) {
					$("#common_bar_but_payment_"+thisIcCard).trigger("click");
				}
			});
		});
		
		//订购产品按钮响应方法----显示页面
		$("#product_content_product_but_order_"+thisIcCard).click(function(){
			productFunc.setOrderViewTypeV1("_"+thisIcCard);
			// 使用订购限制策略时，重新刷新订购列表，modify by jhg 2013-06-20
			if(isOrderPermitType != undefined && isOrderPermitType != "" && isOrderPermitType != "0"){
				productInit3("_"+thisIcCard,thisIcCard,"0","","","1");
//				$("#base_product_info_"+thisIcCard).locateCenter();
				$("#base_product_info_"+thisIcCard).position("relitive")
				var x = $("#base_product_info_"+thisIcCard).position();
				$("#base_product_info_"+thisIcCard).css("top",x.top + 200);
				$("#base_product_info_"+thisIcCard).css("left","220px");
				$("#base_product_info_"+thisIcCard).removeClass("hide");
				/*隐藏确定和取消按钮*/
				$("#productButtomButtons_"+thisIcCard).addClass("hide");
				$("#mask").toggle();
			}else{
//				$("#base_product_info_"+thisIcCard).locateCenter();
				$("#base_product_info_"+thisIcCard).position("relitive")
				var x = $("#base_product_info_"+thisIcCard).position();
				$("#base_product_info_"+thisIcCard).css("top",x.top + 200);
				$("#base_product_info_"+thisIcCard).css("left","220px");
				$("#base_product_info_"+thisIcCard).removeClass("hide");
				$("#mask").toggle();
			}
		});
		
		
		//退订产品按钮响应方法----显示页面----lidf----20100108重写
//					$("#product_content_product_but_unsubscribe_"+thisIcCard).click(function(){
//						var $trs = $("#selectedBaseProductTable_"+thisIcCard).find("tr:has(:checked)");
//						var $equVarTrs = $("#equVar_"+thisIcCard).find("tr");
//						if($trs.length == 0){
//							alert(WebInitParameter.MSG_BUSI_C09);
//							return;
//						}
//						if($trs.length > 1){
//							alert(WebInitParameter.MSG_BUSI_C10);
//							return;
//						}
//						var modelId = $trs.find("td").eq(0).find("input").val();
//						var $productVar = $("#productVar_"+thisIcCard).find("tr");
//						var productIcCard = "";
//						$productVar.each(function(){
//							if($(this).find("td").eq(0).text() == modelId){
//								var $divs = $(this).find("td").eq(1).find("div");
//								var icCardArr = $(this).find("td").eq(7).text().split(",");
//								for(var i = 0;i<icCardArr.length;i+=1){
//									var icCard = icCardArr[i];
//									var equSlaveTypeName = "";
//									$equVarTrs.each(function(){
//										if($(this).find("td").eq(1).text()==icCard){
//											equSlaveTypeName = $(this).find("td").eq(7).text();
//										}
//									});
//									productIcCard = productIcCard + "<tr><td><input type= 'checkbox' value = '"+icCard+"' /></td><td>"+icCard+"&nbsp;"+equSlaveTypeName+"</td></tr>";
//								}
//							}
//						});
//						
//						$("#order_product_icCard_table_"+thisIcCard).empty().append(productIcCard);
//						
//						$("#order_product_cancel_div_"+thisIcCard).locateCenter();
//						$("#order_product_cancel_div_"+thisIcCard).removeClass("hide");
//						$("#mask").toggle();
//					});
		
		
		//退订产品按钮 ，是否按标准策略退费规则退费，0否；1是  add by jhg 2013-03-18
		if(isPayByStandard != undefined && isPayByStandard != ""){
			// 否 按原来逻辑处理
			if(isPayByStandard == "0"){
				$("#product_content_product_but_unsubscribe_"+thisIcCard).click(function(){
					var $orderIds = $("#selectedBaseProductTable_"+thisIcCard).find("input:checked");
					if($orderIds.length == 0){
						alert(WebInitParameter.MSG_BUSI_C09);
						return;
					}
					//操作确认框
					if(!equipmentFunc.operConfirm("equCommand","退订产品")){
						return;
					}
					
					var orderIds = "";
					$orderIds.each(function(){
						orderIds = orderIds + $(this).val() + ",";
					});
					var ajaxProduct = {
							customer_id:thisIcCard,
							orderIds:orderIds
					};
					ovtAjaxMethod(ajaxProPath+"ajaxUndoUserOrder2.do",ajaxProduct,function(data){
						alert(data.value);
						flushOrder();//刷新订购信息
					});
					}
				)
			}else{
				$("#product_content_product_but_unsubscribe_"+thisIcCard).click(function(){
					//确定位置
					$("#product_content_product_div_"+thisIcCard).css("top",event.clientY+$(this).scrollTop()+$(this).height()+"px");
					$("#product_content_product_div_"+thisIcCard).css("left",event.clientX+$(this).scrollLeft()+"px");
					$("#product_content_product_div_"+thisIcCard).removeClass("hide");
					// 记录选择的记录
					var orderSelected = $("#selectedBaseProductTable_"+thisIcCard).find("tr:has(:checked)");
					// 拼装选择记录显示内容
					var $newTableValue = "<tr align='center' height='22px'><th>智能卡号</th><th>订购产品</th><th>订购状态</th><th>类型</th><th>生效时间</th><th>失效时间</th><th>订购费用(元)</th><th>计算方式</th><th>退还费用(元)</th></tr>";
					// 选择的行
					var $orderTds;
					// 选择订购行ID
					var $orderId;
					// 先清空缓存
					equipmentFunc.cancelOrderMap.clearCustomer(thisIcCard);
					orderSelected.each(function(){
						$orderTds = $(this).find("td");
						if($orderTds.length < 14){
							return;
						}
						var calcTypeSelect = null;
						if(isPayByStandard != undefined && isPayByStandard != "" && isPayCalcFeeType == "0"){
							calcTypeSelect = "<option value ='0' selected='selected'>计算收费</option><option value ='1'>计算退费</option>";
						}else{
							calcTypeSelect = "<option value ='0'>计算收费</option><option value ='1' selected='selected'>计算退费</option>";
						}
						var rowLen = $orderTds.find("tr").length - 1;
						var $rowSelected = $orderTds.find("tr:has(:checked)");
						$rowSelected.each(function(){
							// 循环获取所选记录表格中的内容
							var indexRow = 0;
							$rowSelected.find("input").each(function(){
								$orderId = $(this).val();
								if($orderId == undefined || $orderId == 'undefined'){
									return;
								}
								var moneyPay = equipmentFunc.cancelOrderMap.get(thisIcCard,$orderId);
								if(moneyPay == undefined || moneyPay == 'undefined' || moneyPay == ''){
									var $selectedTds = $rowSelected.find("td");
									$newTableValue = $newTableValue + 
													"<tr height='22px'>" +
													"<td align='left'>"+$selectedTds.eq(indexRow * 8 + 1).text()+"</td>" +
													"<td align='left'>"+$orderTds.eq(rowLen * 8 + 2).text()+"</td>" +
													"<td align='left'>"+$selectedTds.eq(indexRow * 8 + 2).text()+"</td>" +
													"<td align='left'>"+$orderTds.eq(rowLen * 8 + 3).text()+"</td>" +
													"<td align='right'>"+$selectedTds.eq(indexRow * 8 + 6).text()+"</td>" +
													"<td align='right'>"+$selectedTds.eq(indexRow * 8 + 7).text()+"</td>" +
													"<td align='right'>"+$selectedTds.eq(indexRow * 8 + 4).text()+"</td>" +
													"<td align='center'><select id = 'calcType_"+$orderId+"'>" + calcTypeSelect + "</select></td>" +
													"<td align='right'><div id='inputText_"+$orderId+"'></div></td>" +
													"</tr>";
									equipmentFunc.cancelOrderMap.put(thisIcCard,$orderId,$selectedTds.eq(indexRow * 8 + 4).text());
									indexRow = indexRow + 1;
								}
							})
						});
					});
					$("#product_content_selectTabel_"+thisIcCard).empty();
					$("#product_content_selectTabel_"+thisIcCard).append($newTableValue);
					$("#recedeTotalFee_"+thisIcCard).empty();
					$("#mask").toggle();
					// 允许退订框拖拽 
					$("#cancel_product_info_title_"+thisIcCard).drag("#product_content_product_div_"+thisIcCard);  
				});
			}
		}
		
		// 计算退还费用
		$("#product_content_product_but_recedeFee_submit_"+thisIcCard).click(function(){
			var $orderIds = $("#selectedBaseProductTable_"+thisIcCard).find("input:checked");
			if($orderIds.length == 0){
				alert(WebInitParameter.MSG_BUSI_C09);
				return;
			}
			var orderIds = "";
			// 增加计算退费方式参数 modify by jhg 2013-05-17
			var calcType = "";
			$orderIds.each(function(){
				calcType = $("#calcType_"+$(this).val()).val();
				orderIds = orderIds + ($(this).val()+"_"+calcType) + ",";
			});
			var ajaxProduct = {
					customer_id:thisIcCard,
					orderIds:orderIds
			};
			ovtAjaxMethod(ajaxProPath+"undoCalcOrderPay.do",ajaxProduct,function(data){
				var payFeeList = eval('(' + data + ')');
				var recedeTotalFee = 0.0;
				var showCalcType = "";
				$(payFeeList.value).each(function(n,inValue){
					var objInner = document.getElementById("inputText_"+inValue.id);
					var showHtml = "";
					var recedeFee = "0.0";
					var totalFee = equipmentFunc.cancelOrderMap.get(thisIcCard,inValue.id);
					if(inValue.cancelFeeType == '0'){
						recedeFee = totalFee;
						showHtml = recedeFee+ " (全额退费)";
					}else if(inValue.cancelFeeType == '1'){
						recedeFee = "0.0";
						showHtml = "0.0 (该策略不支持退费)";
					}else if(inValue.cancelFeeType == '2'){
						recedeFee = "0.0";
						showHtml = "0.0 (该策略不支持退费)";
					}else if(inValue.cancelFeeType == '3'){
						recedeFee = inValue.recedeMoney;
						var formulaVal = inValue.calcFormula;
						var formulaVals = formulaVal.substr(0,formulaVal.length-1);
						var yearStr=formulaVals.replace("year","年");
						var monthStr=yearStr.replace("month","月");
						var dayStr=monthStr.replace("day","天");
						var nullStr=dayStr.replace("nullnull","");
						var newStr=nullStr.replace("null","");
						showCalcType = $("#calcType_"+inValue.id).val();
						if(showCalcType == 0){
							showHtml =  Number(recedeFee).toFixed(2)+ " ("+Number(recedeFee).toFixed(2)+"="+Number(totalFee).toFixed(2) +"-("+ newStr+"))";
						}else{
							showHtml =  Number(recedeFee).toFixed(2)+ " ("+Number(recedeFee).toFixed(2)+"="+ newStr+")";
						}
					}else if(inValue.cancelFeeType == '4'){
						recedeFee = "0.0";
						showHtml = inValue.calcFormula;
					}else{
						recedeFee = inValue.recedeMoney;
						showHtml = inValue.calcFormula;
					}
					recedeTotalFee = recedeTotalFee + parseFloat(Number(recedeFee).toFixed(2));
					objInner.innerHTML = "<input type='hidden' style='width:100px' name='showPay' " +
										 "id= 'showPay_"+inValue.id+"' value='"+Number(recedeFee).toFixed(2)+"'></input>" +
										 "<font color='red' size='14' onDblClick=payFeeModifyProcess("+thisIcCard+","+inValue.id+","+Number(recedeFee).toFixed(2)+","+payFeeList.other+","+inValue.cancelFeeType+")>" + showHtml +"</font>";
				});
				$("#recedeTotalFee_"+thisIcCard).empty();
				$("#recedeTotalFee_"+thisIcCard).append("<tr><td align='right'>退还费用总金额：<input disabled='disabled' style='width:50px' id='recedeTotalFeeInputText_"+thisIcCard+"' value="+ Number(recedeTotalFee).toFixed(2) +"></input>（元）</td></tr>");
			});
		});
		
		// add by jhg 2013-03-26 新退费规则退订确认按钮
		$("#product_content_product_but_unsubscribe_submit_"+thisIcCard).click(function(){
			var $orderIds = $("#selectedBaseProductTable_"+thisIcCard).find("input:checked");
			if($orderIds.length == 0){
				alert(WebInitParameter.MSG_BUSI_C09);
				return;
			}
			//操作确认框
			if(!equipmentFunc.operConfirm("equCommand","退订产品")){
				return;
			}
			var orderIds = "";
			var orderIdFees = "";
			var showPayFee = "";
			var modifyShowPayFee = "";
			// 是否请求后台的标记  "0"准备参数充足可以请求 "1"准备参数不足 不请求
			var ajaxResFlag = "0";
			$orderIds.each(function(){
				// 通过计费规则计算出的退费金额
				showPayFee = $("#showPay_"+$(this).val()).val();
				// 操作员手动录入退费金额
				modifyShowPayFee = $("#modifyShowPay_"+$(this).val()).val();
				if(showPayFee == undefined || showPayFee == ""){
					alert("请先计算退费金额再退订！");
					// 返回false时，如果有错误，直接退出each循环
					ajaxResFlag = "1";
					return false;
				}
				// 如果操作员手动录入了，使用录入的金额
				if(modifyShowPayFee != undefined && modifyShowPayFee != ""){
					orderIdFees = orderIdFees + $(this).val() + "-" + modifyShowPayFee + ",";
				}else{
					orderIdFees = orderIdFees + $(this).val() + "-" + showPayFee + ",";
				}
				orderIds = orderIds + $(this).val() + ",";
			});
			if(ajaxResFlag == "1"){
				return;
			}
			var ajaxCancelProduct = {
				customer_id:thisIcCard,
				orderIdFees:orderIdFees,
				orderIds:orderIds
			};
			$(this).attr("disabled",true);
			ovtAjaxMethod(ajaxProPath+"ajaxUndoUserOrder2.do",ajaxCancelProduct,function(data){
				$("#product_content_product_but_unsubscribe_submit_"+thisIcCard).attr("disabled",false);
				alert(data.value);
				$("#product_content_product_div_"+thisIcCard).addClass("hide");
				$("#mask").toggle();
				flushOrder();//刷新订购信息
			});
		});
		
		// 退订弹出框按钮操作-- 取消按钮事件 add by jhg
		$("#product_content_product_but_unsubscribe_cancel_"+thisIcCard).click(function(){
			$("#product_content_product_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
		// 退订弹出框按钮操作-- 右上角图片点击事件 add by jhg
		$("#cancel_dialog_close_icon_"+thisIcCard).click(function(){
			$("#product_content_product_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
//					/*退订产品选择框方法*/
		$("#checkboxGroup_orderEqu_"+thisIcCard).checkGroup("OrderEqu_"+thisIcCard,$("#order_product_icCard_table_"+thisIcCard));
		
		//退订产品弹出页面，取消按钮方法
		$("#product_content_product_but_unsubscribe_but_cancel_"+thisIcCard).click(function(){
			$("#order_product_cancel_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
		//退订产品弹出页面，退订按钮方法
		$("#product_content_product_but_unsubscribe_but_unsubscribe_"+thisIcCard).click(function(){
			var $proTrs = $("#selectedBaseProductTable_"+thisIcCard).find("tr:has(:checked)");
			var modelId = $proTrs.find("td").eq(0).find("input").val();
			var $productVarTrs = $("#productVar_"+thisIcCard).find("tr");
			var orderIds = "";
			$productVarTrs.each(function(){
				$tds = $(this).find("td");
				if($tds.eq(0).text()==modelId){
					orderIds = $tds.eq(9).text();
				}
			});
			var ajaxProduct = {
					customer_id:thisIcCard,
					customerOrder:modelId+":"+orderIds
			};
			ovtAjaxMethod(ajaxProPath+"ajaxUndoUserOrder.do",ajaxProduct,function(data){
				alert(data.value);
				$("#product_content_product_but_info_"+thisIcCard).trigger("click");
				$("#order_product_cancel_div_"+thisIcCard).addClass("hide");
				$("#mask").toggle();
			});

		});
		
		//退订申请中产品弹出页面，取消按钮方法
		$("#product_content_product_but_unsubscribe_apply_but_cancel_"+thisIcCard).click(function(){
			$("#apply_order_product_cancel_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
		$("#product_content_product_but_unsubscribe_apply_"+thisIcCard).click(function(){
			var $orderIds = $("#selectedBaseProductTable_"+thisIcCard).find("input:checked");
			if($orderIds.length == 0){
				alert(WebInitParameter.MSG_BUSI_C09);
				return;
			}
			//操作确认框
			if(!equipmentFunc.operConfirm("equCommand","退订申请中产品")){
				return;
			}
			
			var orderIds = "";
			$orderIds.each(function(){
				orderIds = orderIds + $(this).val() + ",";
			});
			var ajaxProduct = {
					customer_id:thisIcCard,
					orderIds:orderIds,
					apply:0
			};
			ovtAjaxMethod(ajaxProPath+"ajaxUndoUserOrder3.do",ajaxProduct,function(data){
				alert(data.value);
				flushOrder();//刷新订购信息
			});
		});
		
		//退订申请中产品弹出页面，退订按钮方法
		$("#product_content_product_but_unsubscribe_apply_but_unsubscribe_"+thisIcCard).click(function(){
			var $proTrs = $("#selectedBaseProductTable_"+thisIcCard).find("tr:has(:checked)");
			var modelId = $proTrs.find("td").eq(0).find("input").val();
			var $productVarTrs = $("#productVar_"+thisIcCard).find("tr");
			var orderIds = "";
			$productVarTrs.each(function(){
				$tds = $(this).find("td");
				if($tds.eq(0).text()==modelId){
					orderIds = $tds.eq(9).text();
				}
			});
			var ajaxProduct = {
					customer_id:thisIcCard,
					customerOrder:modelId+":"+orderIds,
					apply:0
			};
			ovtAjaxMethod(ajaxProPath+"ajaxUndoUserOrder.do",ajaxProduct,function(data){
				alert(data.value);
				$("#product_content_product_but_info_"+thisIcCard).trigger("click");
				$("#order_product_cancel_div_"+thisIcCard).addClass("hide");
				$("#mask").toggle();
			});

		});
		
		/*导出用户订购信息 add by jhg*/ 
		$("#product_content_product_but_export_order_"+thisIcCard).click(function(){
			window.location.href=ajaxProPath+"ajaxExportUserOrder.do?userId=" +thisIcCard;
		});
		
		//----------------------------------其他操作------------------------------------------------
		//过户弹出页面按钮响应
		$("#other_content_customer_but_transfer_"+thisIcCard).click(function(){
			//封装过户的终端设备
			var content="";
//						$("#equVar_"+thisIcCard).children("tbody").children("tr").each(function(){
//							var tds = $(this).children("td");
//							var checkedContent = "";
//							if(tds.eq(3).text()=="0"){//主终端
//								checkedContent = "<input type = 'checkbox' value='"+tds.eq(10).text()+"'/>"
//							}else{
//								checkedContent = "&nbsp;";
//							}
//							content =content + "<tr><td>"+checkedContent+"</td><td>"+tds.eq(1).text()+"</td><td>"+tds.eq(7).text()+"</td><td>"+tds.eq(8).text()+"</td></tr>"
//						});
			$(equipmentFunc.equVar.getValue(thisIcCard).value).each(function(){
				var checkedContent = "";
				if(this.equSlaveType == "0"){
					checkedContent = "<input type = 'checkbox' value='"+this.id+"'/>"
				}else{
					checkedContent = "&nbsp;";
				}
				content =content + "<tr><td>"+checkedContent+"</td><td>"+this.icNo+"</td><td>"+this.equSlaveName+"</td><td>"+this.cardDesc+"</td></tr>"
			});
			$("#other_content_customer_table_transfer_equList_"+thisIcCard).find("tr:not(:first-child)").remove();
			$("#other_content_customer_table_transfer_equList_"+thisIcCard).append(content);
			
			$("#other_content_customer_div_transfer_"+thisIcCard).locateLeftTop();
			
			//显示
//						$("#other_content_customer_div_transfer_"+thisIcCard).css("top",event.clientY+$(this).height());
//						$("#other_content_customer_div_transfer_"+thisIcCard).css("left",event.clientX-$("#equipment_content_equipment_change_div_"+thisIcCard).width()/2);
			$(this).blur();
			$("#other_content_customer_div_transfer_"+thisIcCard).removeClass("hide");
			$("#mask").toggle();
		});
		//过户弹出页面--搜索按钮响应方法
		$("#other_content_customer_transfer_but_search_"+thisIcCard).click(function(){
			var ajaxCusObj = getUserInfo("_transfer_"+thisIcCard);
//						ajaxCusObj.customer_id = null;
//						alert(ajaxCusObj.customer_name);
			ovtAjaxMethod(ajaxBusPath+"ajaxSearchUser.do",ajaxCusObj,function(data){
				$("#other_content_customer_div_result_transfer_"+thisIcCard).find("tr:not(:first-child)").remove();
				var userTrs  = "";
				if($(data.value.objList).length==0){
					userTrs = userTrs+"<tr><td colspan = '6'>"+WebInitParameter.MSG_BUSI_C19+"</td></tr>";
				}else{
					
					$(data.value.objList).each(function(n,value){
						userTrs = userTrs + "<tr><td><input name='other_content_customer_radio_result_transfer_"+thisIcCard+"' type = 'radio' value='"+value.id+"'/></td><td>"+value.userCoding+"</td><td>"+value.name+"</td><td>"+value.contact+"</td><td>"+value.tel+"</td><td>"+value.mobile+"</td></tr>";
					});
					if(data.value.totalPage>1){
						userTrs = userTrs + "<tr><td colspan = '6'>"+WebInitParameter.MSG_BUSI_C20+"</td></tr>";
					}
				}
				$("#other_content_customer_div_result_transfer_"+thisIcCard).append(userTrs);
			});
		});
		//过户弹出页面--过户按钮响应方法
		$("#other_content_customer_transfer_but_transfer_"+thisIcCard).click(function(){
			var $equTrs = $("#other_content_customer_table_transfer_equList_"+thisIcCard).find("tr:has(:checked)");
			var $customer =$("#other_content_customer_div_result_transfer_"+thisIcCard).find("tr:has(:checked)");
			
			if($equTrs.length==0){
				alert(WebInitParameter.MSG_BUSI_C13);
				return;
			}
			if($customer.length==0){
				alert(WebInitParameter.MSG_BUSI_C14);
				return;
			}
			//ajax过户操作
			var ajaxChange = {
					customer_id:thisIcCard,
					receive_id:$customer.find("input").val(),
					equDesc:""
			};
			$equTrs.each(function(){
				ajaxChange.equDesc= ajaxChange.equDesc + $(this).find("td").eq(1).text()+"&";
			});
			ajaxConfirmPath = ajaxEquPath+"ajaxTransferAccount.do";
			ajaxResData = ajaxChange;
			$ajaxTriggerBut = $("#equipment_content_equipment_but_info_"+thisIcCard);
			$hideDiv = $("#other_content_customer_div_transfer_"+thisIcCard);
			$confirmCallback = undefined;
			confirmFee("_"+thisIcCard,BUSINESS_TYPE.TRANSFEROR_ACCOUNT_CODE);

		});
		//过户弹出页面--取消按钮响应方法
		$("#other_content_customer_transfer_but_cancel_"+thisIcCard).click(function(){
			$("#other_content_customer_div_transfer_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
		
		
		//移机弹出页面--按钮响应
		$("#other_content_customer_but_addrChange_"+thisIcCard).click(function(){
			var $content = $("#other_content_customer_div_addrChange_"+thisIcCard);
			//显示
			$content.css("top",event.clientY+$(this).height());
			$content.css("left",event.clientX-$("#equipment_content_equipment_change_div_"+thisIcCard).width()/2);
			$(this).blur();
			$content.removeClass("hide");
			$("#mask").toggle();
		});
		
		//移机弹出页面--移机按钮响应方法
		$("#other_content_customer_addrChange_but_addrChange_"+thisIcCard).click(function(){
			var content= $("#customer_installAddress_addrChange_"+thisIcCard).val();
			if($.trim(content) == ""){
				alert(WebInitParameter.MSG_BUSI_C15);
				$("#customer_installAddress_addrChange_"+thisIcCard).focus();
				return;
			}
			if($.trim(content) == currentUserInfo.address){
				alert(WebInitParameter.MSG_BUSI_C16);
				return;
			}
			var ajaxResObj  = {
				customer_id:thisIcCard,
				address:content
			};
			var areaLevel1 = $("#customer_areaLevel1_other_content_customer_addrChange_"+thisIcCard).val();
			if(areaLevel1 == null){
				areaLevel1 = -1;
			}
			var areaLevel2 = $("#customer_areaLevel2_other_content_customer_addrChange_"+thisIcCard).val();
			if(areaLevel2 == null){
				areaLevel2 = -1;
			}
			var areaLevel3 = $("#customer_areaLevel3_other_content_customer_addrChange_"+thisIcCard).val();
			if(areaLevel3 == null){
				areaLevel3 = -1;
			}
			if($("#other_content_customer_div_addrChange_areaInfo_"+thisIcCard).attr("checked")){
				ajaxResObj.customer_areaLevel1 = areaLevel1;
				ajaxResObj.customer_areaLevel2 = areaLevel2;
				ajaxResObj.customer_areaLevel3 = areaLevel3;
			}
			
			
//						ovtAjaxMethod(ajaxBusPath+"ajaxSearchUser.do",ajaxResObj,function(data){
////							if(data.code == "0"){
////								//模拟点击刷新按钮
////								$("#equipment_content_equipment_but_info_"+thisIcCard).trigger("click");
////							}
//							alert(data.value);
//							$("#other_content_customer_div_addrChange_"+thisIcCard).addClass("hide");
//							$("#mask").toggle();
//						});
			
			ajaxConfirmPath = ajaxRegPath+"ajaxChangeAddr.do";
			ajaxResData = ajaxResObj;
			$ajaxTriggerBut = undefined;
			$hideDiv = $("#other_content_customer_div_addrChange_"+thisIcCard);
			$confirmCallback = undefined;
			confirmFee("_"+thisIcCard,BUSINESS_TYPE.CHANGE_ADDR_CODE);
			
		});
		
		var newAreaLevel1 = " ";
		var newAreaLevel2 = " ";
		var newAreaLevel3 = " ";
		//移机弹出页面--二级片区联动
		$("#customer_areaLevel1_other_content_customer_addrChange_"+thisIcCard).change(function(){
			getAreaLevel("_other_content_customer_addrChange_"+thisIcCard,1);
		});
		//移机弹出页面--三级片区联动
		$("#customer_areaLevel2_other_content_customer_addrChange_"+thisIcCard).change(function(){
			getAreaLevel("_other_content_customer_addrChange_"+thisIcCard,2);
		});
		// 更改片区信息时将其更新到“更换为新地址”输入框中 liuxu 2012/06/08
		$("#customer_areaLevel1_other_content_customer_addrChange_"+thisIcCard).click(function(){
			newAreaLevel1 = $("#customer_areaLevel1_other_content_customer_addrChange_"+thisIcCard).find("option:selected").text() ;
			$("#customer_installAddress_addrChange_"+thisIcCard).val(newAreaLevel1);
		});
		$("#customer_areaLevel2_other_content_customer_addrChange_"+thisIcCard).click(function(){
			newAreaLevel2 = $("#customer_areaLevel2_other_content_customer_addrChange_"+thisIcCard).find("option:selected").text() ;
			$("#customer_installAddress_addrChange_"+thisIcCard).val(newAreaLevel1 + newAreaLevel2);
		});
		$("#customer_areaLevel3_other_content_customer_addrChange_"+thisIcCard).click(function(){
			newAreaLevel3 = $("#customer_areaLevel3_other_content_customer_addrChange_"+thisIcCard).find("option:selected").text();
			$("#customer_installAddress_addrChange_"+thisIcCard).val(newAreaLevel1 + newAreaLevel2 + newAreaLevel3);
		});
		
		//移机弹出页面--移机中的修改片区
		$("#other_content_customer_div_addrChange_areaInfo_"+thisIcCard).click(function(){
			if($("#other_content_customer_div_addrChange_areaInfo_"+thisIcCard).attr("checked")){
				$("#customer_areaLevel1_other_content_customer_addrChange_"+thisIcCard).attr("disabled",false);
				$("#customer_areaLevel2_other_content_customer_addrChange_"+thisIcCard).attr("disabled",false);
				$("#customer_areaLevel3_other_content_customer_addrChange_"+thisIcCard).attr("disabled",false);
			}else{
				$("#customer_areaLevel1_other_content_customer_addrChange_"+thisIcCard).attr("disabled",true);
				$("#customer_areaLevel2_other_content_customer_addrChange_"+thisIcCard).attr("disabled",true);
				$("#customer_areaLevel3_other_content_customer_addrChange_"+thisIcCard).attr("disabled",true);
			}
		});
		
		//移机弹出页面--取消按钮响应方法
		$("#other_content_customer_addrChange_but_cancel_"+thisIcCard).click(function(){
			$("#other_content_customer_div_addrChange_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
		//终端对调--按钮响应
		$("#equipment_content_equipment_but_transPosition_"+thisIcCard).click(function(){
			var $trs = checkChecked();
			if(!$trs){
				return;
			}
			
			//操作确认框
			if(!equipmentFunc.operConfirm("equCommand","终端对调")){
				return;
			}

			
			var equIDS="";
			var equDesc="";
			if($trs.length == 2){
				$trs.each(function(n,value){
					equIDS += $(this).find(":checked").val()+"&";
				});
				equDesc = equIDS;
				ajaxEquTrans(undefined,thisIcCard,equDesc);
			}else{
				alert(WebInitParameter.MSG_BUSI_C37);
				return;
			}
		});
		
		//终端换组--终端组变更时初始化终端select
//					$("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).change(function(){
//						var $trs = checkChecked();
//						var equIDS = "";
//						var equFromID = "";
//						$trs.each(function(n,value){
//							equIDS += $(this).find(":checked").val()+",";
//						});
//						equFromID = equIDS.split(",")[0];
//					
//						var selectGroupID = $("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).val().split(",")[0];
//						var equOption="";
//						var $equTable = $("#equVar_"+thisIcCard);
//						
//						//判断终端是否置尾按钮是否禁用，如果是，则启用
//						if($("#equipment_content_equipment_equipTrans_radio_end_"+thisIcCard).attr("disabled")) {
//							$("#equipment_content_equipment_equipTrans_radio_end_"+thisIcCard).attr("disabled",false);
//						}
//						if($("#equipment_content_equipment_equipTrans_radio_notEnd_"+thisIcCard).attr("disabled")) {
//							$("#equipment_content_equipment_equipTrans_radio_notEnd_"+thisIcCard).attr("disabled",false);
//						}
//						//当group禁用时
//						if($("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).attr("disabled")){
//							selectGroupID = findMainByID(equFromID);
//						}
//						//选择新建组时
//						if($("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).val()==WebInitParameter.USER_EQUP_TRANSFER_VALUE){
//							$("#equipment_content_equipment_equipTrans_radio_end_"+thisIcCard).attr("disabled",true);
//							$("#equipment_content_equipment_equipTrans_radio_notEnd_"+thisIcCard).attr("disabled",true);
//						}
//						$equTable.children("tbody").children("tr").each(function(){
//							var $tds = $(this).children("td");
//							var equGroupID = findMainByID($tds.eq(10).text());
//							if($tds.eq(10).text()==selectGroupID){
//								equOption = equOption + "<option value='"+$(this).children("td").eq(10).text()+","+$(this).children("td").eq(3).text()+"'>"+$(this).children("td").eq(7).text()+"</option>";
//							}else if(equGroupID==selectGroupID){
//								equOption = equOption + "<option value='"+$(this).children("td").eq(10).text()+","+$(this).children("td").eq(3).text()+"'>"+"&nbsp;"+"&nbsp;"+$(this).children("td").eq(7).text()+"</option>";
//							}
//						});
//						$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).find("option:not(:first-child)").remove();
//						if(equOption!=""){
//							$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).append(equOption);
//						}
//					});
//					
//					//终端换组--按钮响应
//					$("#equipment_content_equipment_but_transGroup_"+thisIcCard).click(function(){
//						var $trs = checkChecked();
//						if(!$trs){
//							return;
//						}else if($trs.length != 1){
//							alert(WebInitParameter.MSG_BUSI_C38);
//							return;
//						}
//						//初始化select框
//						var groupOptions="";
//						var equOption="";
//						var $equTable = $("#equVar_"+thisIcCard);
//						$equTable.children("tbody").children("tr").each(function(){
//							var $tds = $(this).children("td");
//							if($tds.eq(3).text()=="0"){
//								groupOptions = groupOptions + "<option value='"+$(this).children("td").eq(10).text()+","+$(this).children("td").eq(3).text()+"'>"+$(this).children("td").eq(7).text()+"</option>";
//							}
////							if($tds.eq(3).text()!="0"){
////								equOption = equOption + "<option value='"+$(this).children("td").eq(10).text()+","+$(this).children("td").eq(3).text()+"'>"+"&nbsp;"+"&nbsp;"+$(this).children("td").eq(7).text()+"</option>";
////							}else{
////								equOption = equOption + "<option value='"+$(this).children("td").eq(10).text()+","+$(this).children("td").eq(3).text()+"'>"+$(this).children("td").eq(7).text()+"</option>";
////							}
//						});
//						$("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).find("option:not(:first-child)").remove();
//						//在选择组中增加新建组选项
//						groupOptions = groupOptions + "<option value='" + WebInitParameter.USER_EQUP_TRANSFER_VALUE + "'>" + WebInitParameter.USER_EQUP_TRANSFER + "</option>";
//						
//						if(groupOptions!=""){
//							$("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).append(groupOptions);
//						}
//						
//						//默认选中同组"是"、添加至末尾"是"
//						$("#equipment_content_equipment_equipTrans_radio_inGroup_"+thisIcCard).trigger("click");
//						$("#equipment_content_equipment_equipTrans_radio_end_"+thisIcCard).trigger("click");
//						//显示
//						$("#equipment_content_equipment_trans_group_div_"+thisIcCard).css("top",event.clientY+$(this).height()+"px");
//						$("#equipment_content_equipment_trans_group_div_"+thisIcCard).css("left",event.clientX/2-$(this).width()+"px");
//						$(this).blur();
//						$("#equipment_content_equipment_trans_group_div_"+thisIcCard).removeClass("hide");
//						$("#mask").toggle();
//					});
//					
//					//终端换组--确定按钮响应
//					$("#equipment_content_equipment_equipTrans_but_confirm_"+thisIcCard).click(function(){
//						var $trs = checkChecked();
//						var equDesc="";
//						var equIDS = "";
//						var equFromID = "";
//						var equToMainID = "";
//						var equCount=0;
//						var equOriSlavePos="";
//						var equOriSlaveID="";
//						var equFromMainID = "";
//						var equFromEquCount = 0;
//						var transPosition=false;
//						$trs.each(function(n,value){
//							equIDS += $(this).find(":checked").val()+",";
//						});
//						equFromID = equIDS.split(",")[0];
//						//得到原组的主终端和终端个数
//						equFromMainID = findMainByID(equFromID);
//						equFromEquCount = findEquCount(equFromMainID);
//						
//						if($("#equipment_content_equipment_equipTrans_radio_inGroup_"+thisIcCard).attr("checked")||$("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).val()=="-1"){
//							equToMainID = equFromMainID;
//						}else if($("#equipment_content_equipment_equipTrans_radio_outGroup_"+thisIcCard).attr("checked") && $("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).val()==WebInitParameter.USER_EQUP_TRANSFER_VALUE){
//							equToMainID = WebInitParameter.USER_EQUP_TRANSFER_VALUE;
//						}else{
//							equToMainID = $("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).val().split(",")[0];
//						}
//						equCount = findEquCount(equToMainID);
//						if($("#equipment_content_equipment_equipTrans_radio_end_"+thisIcCard).attr("checked")||$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).val()=="-1"){
//							if(equFromID == equToMainID){
//								equTransFail("noMain");
//								return;
//							}
//							equDesc=equFromID+"&"+equToMainID+"&"+equFromID+":"+equCount.toString();
//						}
//						//选择新建组
//						if($("#equipment_content_equipment_equipTrans_radio_outGroup_"+thisIcCard).attr("checked") && $("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).val()==WebInitParameter.USER_EQUP_TRANSFER_VALUE){
//							equDesc=equFromID+"&"+equToMainID+"&";
//						}
//						if($("#equipment_content_equipment_equipTrans_radio_notEnd_"+thisIcCard).attr("checked")||$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).val()!="-1"){
//							equOriSlavePos=$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).val().split(",")[1];
//							equOriSlaveID=$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).val().split(",")[0];
//							//对调
//							if($("#equipment_content_equipment_equipTrans_select_oriTransType_"+thisIcCard).val()==WebInitParameter.EQUIP_TRANS_TYPE_TRANSPOSITION_VALUE){
//								if(equFromID == equOriSlaveID){
//									equTransFail("sameEqu");
//									return;
//								}
//								equDesc=equFromID+"&"+equOriSlaveID+"&";
//								transPosition = true;
//							}
//							//置尾
//							if($("#equipment_content_equipment_equipTrans_select_oriTransType_"+thisIcCard).val()==WebInitParameter.EQUIP_TRANS_TYPE_END_VALUE){
//								if(equFromID == equToMainID){
//									equTransFail("noMain");
//									return;
//								}
//								equDesc=equFromID+"&"+equToMainID+"&"+equFromID+":"+equOriSlavePos+","+equOriSlaveID+":"+equCount;
//							}
//							//顺延
//							if($("#equipment_content_equipment_equipTrans_select_oriTransType_"+thisIcCard).val()==WebInitParameter.EQUIP_TRANS_TYPE_PUTOFF_VALUE){
//								var checkedIndex=$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).get(0).selectedIndex;
//								var maxIndex=$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard+" option:last").attr("index");
//								var equChanges="";
//								var oriEquID="";
//								var oriEquPos=0;
//								for(var i=checkedIndex;i<=maxIndex;i++){
//									oriEquPos=$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard+" option[index="+i+"]").val().split(",")[1];
//									oriEquID=$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard+" option[index="+i+"]").val().split(",")[0];
//									if(oriEquID==equFromID){
//										break;
//									}
//									if(equChanges ==""){
//										equChanges = equFromID + ":" + oriEquPos.toString() + "," + oriEquID + ":" ;
//									}else{
//										equChanges = equChanges + oriEquPos.toString() + "," + oriEquID + ":";
//									}
//								}
//								if(equChanges != ""){
//									equChanges = equChanges + (Number(oriEquPos) + 1).toString();
//									equDesc=equFromID+"&"+equToMainID+"&"+equChanges;
//								}else{
//									equTransFail("sameEqu");
//									return;
//								}
//								if(equFromID==equToMainID){
//									equTransFail("noMain");
//									return;
//								}
//							}
//						}
//						if(equFromID==equFromMainID&&equFromEquCount>1){
//							equTransFail("noMain");
//							return;
//						}
//						if(transPosition){
//							//调用对调的方法
//							ajaxEquTrans(undefined,thisIcCard,equDesc);
//						}else{
//							ajaxEquTrans(undefined,thisIcCard,equDesc);
//						}
//						
//						//显示控制
//						$("#equipment_content_equipment_trans_group_div_"+thisIcCard).addClass("hide");
//						$("#mask").toggle();
//					});
//					
//					//终端换组--取消按钮响应
//					$("#equipment_content_equipment_equipTrans_but_cancel_"+thisIcCard).click(function(){
//						$("#equipment_content_equipment_trans_group_div_"+thisIcCard).addClass("hide");
//						$("#mask").toggle();
//					});
//					
//					//终端换组--换组失败处理
//					function equTransFail(failType){
//						if(failType=="noMain"){
//							alert(WebInitParameter.MSG_BUSI_C40);
//						}
//						if(failType=="sameEqu"){
//							alert(WebInitParameter.MSG_BUSI_C39);
//						}
//						$("#equipment_content_equipment_trans_group_div_"+thisIcCard).addClass("hide");
//						$("#mask").toggle();
//					}
//					
//					//终端换组--根据组合ID查找主终端
//					function findMainByID(equID){
//						var tempID="";
//						var equMainID="";
//						var $equTable = $("#equVar_"+thisIcCard);
//						$equTable.children("tbody").children("tr").each(function(){
//							var $tds = $(this).children("td");
//							if($tds.eq(3).text()=="0"){
//								tempID = $(this).children("td").eq(10).text();
//							}
//							if($tds.eq(10).text()==equID){
//								equMainID = tempID;
//							}
//						});
//						return equMainID;
//					}
//					//终端换组--根据主终端id查找终端个数
//					function findEquCount(equMainID){
//						var equCount=0;
//						var $equTable = $("#equVar_"+thisIcCard);
//						$equTable.children("tbody").children("tr").each(function(){
//							var $tds = $(this).children("td");
//							if($(this).children("td").eq(10).text()==equMainID){
//								equCount=Number(equCount)+1;
//							}else if(Number(equCount)!=0&&$tds.eq(3).text()!="0"){
//								equCount=Number(equCount)+1;
//							}
//						});
//						return equCount;
//					}
//					
//					//终端换组--功能处理
		function ajaxEquTrans(ajaxPath,customerID,equDesc){
			var ajaxResponse={
					customer_id:customerID,
					equDesc:equDesc
			};
			ovtAjaxMethod(ajaxEquPath+"ajaxEquSwap.do",ajaxResponse,function(data){
				if(data.code == "0"){
					alert(WebInitParameter.MSG_BUSI_C35);
				}else{
					alert(WebInitParameter.MSG_BUSI_C36+data.value);
				}
				flushEquipment();
			});
		}
//					
//					//终端换组--单选按钮同组"是"被点击时响应
//					$("#equipment_content_equipment_equipTrans_radio_inGroup_"+thisIcCard).click(function(){
//						radioChecked("inGroup");
//						//组内时更新选择终端的select终端内容
//						$("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).trigger("change");
//					});
//					
//					//终端换组--单选按钮同组"否"被点击时响应
//					$("#equipment_content_equipment_equipTrans_radio_outGroup_"+thisIcCard).click(function(){
//						radioChecked("outGroup");
//					});
//					
//					//终端换组--单选按钮添加至末尾"是"被点击时响应
//					$("#equipment_content_equipment_equipTrans_radio_end_"+thisIcCard).click(function(){
//						radioChecked("end");
//					});
//					
//					//终端换组--单选按钮添加至末尾"否"被点击时响应
//					$("#equipment_content_equipment_equipTrans_radio_notEnd_"+thisIcCard).click(function(){
//						radioChecked("notEnd");
//					});
//					
//					//终端换组--选择终端select
//					$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).click(function(){
//						radioChecked("notEnd");
//					});
//					
//					//终端换组--失效通用方法封装
//					function radioChecked(equ){
//						if(equ=="inGroup"){
//							$("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).attr("disabled",true);
//						}else if(equ=="outGroup"){
//							$("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).attr("disabled",false);
//						}else if(equ=="end"){
//							$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).attr("disabled",true);
//							$("#equipment_content_equipment_equipTrans_select_oriTransType_"+thisIcCard).attr("disabled",true);
//						}else if(equ=="notEnd"){
//							if($("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).val()!="-1"){
//								$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).attr("disabled",false);
//								$("#equipment_content_equipment_equipTrans_select_oriTransType_"+thisIcCard).attr("disabled",false);
//							}else{
//								$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).attr("disabled",false);
//								$("#equipment_content_equipment_equipTrans_select_oriTransType_"+thisIcCard).attr("disabled",true);
//							}
//						}
//					}
		
		
		
		//---------------------------------------20110328----lidf--重写终端转组-简化操作---------------------------------------------------
		
		$("#equipment_content_equipment_but_transGroup_"+thisIcCard).click(function(){
			var $trs = checkChecked();
			if(!$trs){
				return;
			}
			if($trs.length > 1){
				alert(WebInitParameter.MSG_BUSI_C38);
				return;
			}
			var equTransId = "";
			equTransId = $trs.find(":checked").eq(0).val();
			$("#equipment_content_equipment_equipTrans_hidden_"+thisIcCard).val(equTransId);//保存所选
//						var $equVar = $("#equVar_"+thisIcCard);
			
			//初始化组数据
			var groupOptions="";
			var selected ="";
			//找到所在组的主终端
//						var equTransMainNo = $("#"+equTransId).children("td").eq(2).text();
			var equTransMainNo = equipmentFunc.equVar.getValue(thisIcCard).get(equTransId).mainEquId;
//						$equVar.children("tbody").children("tr").each(function(n,value){
//							var $tds = $(this).children("td");
//							if($tds.eq(3).text()=="0" && $tds.eq(1).text()!=equTransMainNo){//保证是主终端，不是自己，不是所在组的主终端
//								if(n==0){
//									selected = "selected";
//								}else{
//									selected = "";
//								}
//								groupOptions = groupOptions + "<option value='"+$tds.eq(0).text()+"' "+selected+">"+$tds.eq(1).text()+"&nbsp;"+$tds.eq(7).text()+"</option>";
//							}
//						});
			$(equipmentFunc.equVar.getValue(thisIcCard).value).each(function(n,value){
				if(this.equSlaveType == "0" && this.icNo!=equTransMainNo){//保证是主终端，不是自己，不是所在组的主终端
					if(n==0){
						selected = "selected";
					}else{
						selected = "";
					}
					groupOptions = groupOptions + "<option value='"+this.groupId+"' "+selected+">"+this.icNo+"&nbsp;"+this.equSlaveName+"</option>";
				}
			});
			var maxGroup = Number($("#equ_GroupMaxNum_"+thisIcCard).text())+1;//使用最大值加1保存新建组
			if(groupOptions == ""){
				selected = "selected";
			}else{
				selected = "";
			}
			groupOptions = groupOptions + "<option value='"+maxGroup+"' "+selected+">" + WebInitParameter.USER_EQUP_TRANSFER + "</option>";
			var $groupSelect =  $("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard);
			$groupSelect.empty().append(groupOptions);
			
			//初始化终端数据
			changeEquNameSelect();
			
			
			//显示控制
			var $content = $("#equipment_content_equipment_trans_group_div_"+thisIcCard);
			$content.css("top",event.clientY+$(this).height());
			$content.css("left",event.clientX-$("#equipment_content_equipment_trans_group_div_"+thisIcCard).width()/2);
			$(this).blur();
			$content.removeClass("hide");
			$("#mask").toggle();

		});
		
		//终端换组--取消按钮响应
		$("#equipment_content_equipment_equipTrans_but_cancel_"+thisIcCard).click(function(){
			$("#equipment_content_equipment_trans_group_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});	
		//终端换组--确定按钮响应
		$("#equipment_content_equipment_equipTrans_but_confirm_"+thisIcCard).click(function(){
			var ajaxResponse={
					customer_id:thisIcCard,
					equDesc:""
			};
			var equTransId = $("#equipment_content_equipment_equipTrans_hidden_"+thisIcCard).val();
			var groupNo = 0;
//						var $equTransTds = $("#"+equTransId).children("td");
			
//						var slaveType = $equTransTds.eq(3).text();
			var transEquVar = equipmentFunc.equVar.get(thisIcCard,equTransId);
			var slaveType = transEquVar.equSlaveType;
			var toNewGroup='';
			if(slaveType != "0"){
				groupNo = $("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).val();
			}else{//主终端，并且没有副终端，则减去1
//							var $equVar = $("#equVar_"+thisIcCard);
				var sub = false;
//							$equVar.children("tbody").children("tr").each(function(){
//								var $tds = $(this).children("td");
//								if($tds.eq(2).text() == $equTransTds.eq(1).text() && $tds.eq(3).text()!="0"){//该主终端下的副终端
//									sub = true;
//									return sub;
//								}
//							});
				$(equipmentFunc.equVar.getValue(thisIcCard).value).each(function(){
					if(this.mainEquId == transEquVar.icNo && this.equSlaveType !="0"){//该主终端下的副终端
						sub = true;
						return sub;
					}
				});
				if(!sub && $("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).attr("disabled") ){
					groupNo = Number($("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).val()-1);
					toNewGroup = 'toNewGroup';//主终端（没有副终端），转到新组标记 2012-10-17 yzy
				}else{
					groupNo = $("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).val();
				}
			}
			var position = 0;
			if(!$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).attr("disabled")){
				position = $("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).val();
			}
			ajaxResponse.equDesc =equTransId + ":" + groupNo +":" + position+":"+toNewGroup;
//						ajaxResponse.equDesc = $("#equipment_content_equipment_equipTrans_hidden_"+thisIcCard).val() +":"+$("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).val()+":"+$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).val();
//						alert(ajaxResponse.equDesc);
			ovtAjaxMethod(ajaxEquPath+"ajaxEquChangeGroup.do",ajaxResponse,function(data){
				if(data.code == "0"){
					alert(WebInitParameter.MSG_BUSI_C35);
					flushEquipment();
				}else{
					alert(WebInitParameter.MSG_BUSI_C36+data.value);
				}
			});
			$("#equipment_content_equipment_trans_group_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		//目标终端组改变方法
		$("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).change(function(){
			changeEquNameSelect();
		});
		
		//目标终端名称联动方法
		function changeEquNameSelect(){
			var maxGroup = Number($("#equ_GroupMaxNum_"+thisIcCard).text())+1;
			if ($("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).find("option:selected").val() == maxGroup){//如果相等，则表示新建组
				$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).attr("disabled",true);
			}else{//不是新建组，则更新组内值的方法
				var groupNo = $("#equipment_content_equipment_equipTrans_select_group_"+thisIcCard).val();
//							var groupMainNo = $("#"+groupMainId).children("td").eq(1).text();
//							var $equVar = $("#equVar_"+thisIcCard);
				var equOption="";
				var equMax = 0;
//							$equVar.children("tbody").children("tr").each(function(){
//								var $tds = $(this).children("td");
//								if($tds.eq(0).text()==groupNo){//该主终端下的所有副终端
//									equOption = equOption + "<option value='"+$tds.eq(3).text()+"'>"+$tds.eq(7).text()+"</option>";
//									equMax += 1;
//								}
//							});
				$(equipmentFunc.equVar.getValue(thisIcCard).value).each(function(){
					if(this.groupId == groupNo){
						equOption = equOption + "<option value='"+this.equSlaveType+"'>"+this.equSlaveName+"</option>";
						equMax += 1;
					}
				});
				equOption = equOption + "<option value='"+equMax+"'>设为新终端</option>";
				$("#equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard).empty().append(equOption).attr("disabled",false);
			}
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		//---------------------------------------------------------终端转组结束-----------------------------------------------------------
		
		//刷新账户变动历史表按钮
		$("#other_content_accountHis_customer_but_flushHis_"+thisIcCard).click(function(){
			getAccountHis({customerId:thisIcCard,contentId:"_"+thisIcCard,newPage:0});
			flushCustomerAccount($("#customer_acount_info_"+thisIcCard),"_"+thisIcCard,thisIcCard);
		});
		
		
		
//					//打印发票页面----打印按钮响应
//					$("#invoice_but_print"+"_"+thisIcCard).click(function(){
//						var ajaxInovice = invoiceValue("_"+thisIcCard);
//						alert("ajaxInvoice:"+ajaxInvoice);
//						if(ajaxInovice == false){
//							alert(WebInitParameter.MSG_INFO_C08);
//							return;
//						}
//						ajaxInovice.customer_id = thisIcCard;
//						ovtAjaxMethod(ajaxInvoicePath+"ajaxSaveInvoice.do",ajaxInovice,function(data){
//							if(data.code!="0"){
//								alert(data.value);
//							}else{
//								var ajaxPrintRes = {
//										userId:thisIcCard,
//										printType:0,
//										registerId:"0001",
//										invoiceNo:data.value
//								}
//								printCredential(ajaxPrintRes,"_"+thisIcCard);
//							}
//							//调用liuyajie打印方法，传输发票号过去
//							$("#invoiceShow"+"_"+thisIcCard).addClass("hide");
//							$("#mask").toggle();
//						});
//					});
//					
		/*用户操作通用方法*/
		function userService(servicePath,msgText){
			//操作确认框
			if(!equipmentFunc.operConfirm("equCommand",msgText)){
				return;
			}

			var ajaxRes = {
					customer_id:thisIcCard
			};
			ovtAjaxMethod(ajaxRegPath+servicePath,ajaxRes,function(data){
				alert(data.value);
				//刷新信息
				flushAll();
				flushCustomer("_"+thisIcCard,thisIcCard);
			});
		}
		// 模拟搜索按钮点击 -- 20120405 -- YanxuLiu
		function userServiceWithReturn(servicePath,msgText){
			//操作确认框
			if(!equipmentFunc.operConfirm("equCommand",msgText)){
				return;
			}
			var ajaxRes = {
					customer_id:thisIcCard
			};
			ovtAjaxMethod(ajaxRegPath+servicePath,ajaxRes,function(data){
				alert(data.value);
				if(data.code == "0")
				{
					//增加关闭标签变色方法和点击关闭方法
					$("#tab_title_"+thisIcCard).remove();//删掉该tab页
					$("#print_back_"+thisIcCard).empty();//先删除打印的
					$("#tab_content_"+thisIcCard).remove();//删掉该tab内容	
					$("#search_title").trigger("click");//模拟搜索标题点击
					// 用户删除成功后，关闭当前tab页面，回到用户搜索结果页面，且有刷新效果
					$("#search_customer_button").trigger("click"); 
				}
				//刷新信息
				flushAll();
				flushCustomer("_"+thisIcCard,thisIcCard);
			});
		}
		
		/*注销用户*/
		$("#other_content_customer_but_delSub_"+thisIcCard).click(function(){
			userService("ajaxLogoutUser.do","用户注销");
		});
		/*暂停用户*/
		$("#other_content_customer_but_stopSub_"+thisIcCard).click(function(){
			userService("ajaxPauseUser.do","用户报停");
		});
		/*开通用户*/
		$("#other_content_customer_but_reopenSub_"+thisIcCard).click(function(){
			userService("ajaxOpenUser.do","用户开通");
		});
		/* 注销用户开通 20120319 YanxuLiu*/
		$("#other_content_customer_but_logoutSubOpen_"+thisIcCard).click(function(){
			userService("ajaxLogoutUserOpen.do","注销用户开通");
		});
		/*设为黑名单 */
		$("#other_content_customer_but_addBlacklist_"+thisIcCard).click(function(){
			userService("ajaxUserBlackListOper.do","设为黑名单");
		});
		/*取消黑名单*/
		$("#other_content_customer_but_removeBlacklist_"+thisIcCard).click(function(){
			userService("ajaxUserBlackListUndoOper.do","取消黑名单");
		});
		
		/* 删除用户 20120319 YanxuLiu */
		$("#other_content_customer_but_logoutUserDrop_"+thisIcCard).click(function(data) {
			userServiceWithReturn("ajaxLogoutUserDrop.do","删除用户");
		});
									
		/*用户同步*/
		$("#other_content_customer_but_syncSub_"+thisIcCard).click(function(){
			userService("ajaxSyncUserNotify.do","用户同步");
		});
		
		/*打印用户证*/
		$("#other_content_customer_but_printCredential_"+thisIcCard).click(function(){
			//调用liuyajie方法
			var ajaxPrintRes = {
					userId:thisIcCard,
					printType:2,
					isPrint:"yes",
					registerId:"0001",
					operatingCompany:WebInitParameter.PARAM_OPERATING_COMPANY
			}
			printCredential(ajaxPrintRes,"_"+thisIcCard);
		});
		
		/*打印用户订购服务信息 */
		$("#other_content_customer_but_printUserOrderInfo_"+thisIcCard).click(function(){
			var ajaxPrintRes = {
					logIds:thisIcCard,
					printType:3,
					isPrint:"yes",
					registerId:"0001",
					operatingCompany:WebInitParameter.PARAM_OPERATING_COMPANY
			}
			printCredential(ajaxPrintRes,"_"+thisIcCard);
		});
		
		//----------------------------------营业日志操作------------------------------------------------
		//查询营业日志方法封装
		function getBusinessLog(newFlash){
			var searchLog = {
					customer_id:thisIcCard
			}
			searchLog.busitSartDate = $("#log_contnet_startDate_"+thisIcCard).val();
			searchLog.busiEndDate = $("#log_contnet_endDate_"+thisIcCard).val();
			if(newFlash == 0){
				searchLog.currentPage = 1;
			}else{
				searchLog.currentPage = $("#currentPage"+"_logList_"+thisIcCard).text();
			}
			ovtAjaxMethod(ajaxRegPath+"ajaxGetUserBusinessLog.do",searchLog,function(data){
				if(data.code != '0'){
					alert(data.value);
					return;
				}
				if($(data.value.objList).length == 0){
					return;
				}
				var content = "";
				$(data.value.objList).each(function(n,value){
//								content = content + "<tr><td><input type='checkbox' value='"+value.id+"'></td><td>"+value.tranNo+"</td><td>"+value.regionIdName+"</td><td>"+value.bussTypeName+"</td><td>"+value.tranTime+"</td><td>"+value.loginNo+"</td><td>"+value.userAgentIdName+"</td></tr>";
					// 如果是否默认选择标识为1则把单选框设为选择的 2012-10-22 Modify by liuxu
					if (value.isDefaultChecked == 1) {
						content = content + "<tr><td><input type='checkbox' checked='checked' value='"+value.id+"'></td><td>"+value.tranNo+"</td><td>"+value.regionIdName+"</td><td>"+value.bussTypeName+"</td><td>"+value.tranTime+"</td><td>"+value.loginNo+"</td><td>"+value.userAgentIdName+"</td></tr>";
					} else {
						content = content + "<tr><td><input type='checkbox' value='"+value.id+"'></td><td>"+value.tranNo+"</td><td>"+value.regionIdName+"</td><td>"+value.bussTypeName+"</td><td>"+value.tranTime+"</td><td>"+value.loginNo+"</td><td>"+value.userAgentIdName+"</td></tr>";
					}
				});
				
				$("#log_content_customer_but_logContent_table_"+thisIcCard).find("tr:not(:first-child)").remove();
				$("#log_content_customer_but_logContent_table_"+thisIcCard).append(content);
				
				//分页
				$("#log_content_customer_but_logContent_pageBar_"+thisIcCard).pagination("_logList_"+thisIcCard,data.value.currentPage,data.value.totalPage,getBusinessLog);
				//选择组
				$("#log_content_customer_but_logContent_checkGroup_"+thisIcCard).checkGroup("logList_"+thisIcCard,$("#log_content_customer_but_logContent_table_"+thisIcCard));
			});
		}
		
		$("#log_content_customer_but_flushLog_"+thisIcCard).click(function(){
			getBusinessLog(0);
		});
		
		//打印登记单
		$("#log_content_customer_but_printLog_"+thisIcCard).click(function(){
			var $checked = $("#log_content_customer_but_logContent_table_"+thisIcCard).find("input:checked");
			if($checked.length==0){
				alert(WebInitParameter.MSG_BUSI_C23);
				return ;
			}
			//调用liuyajie方法
			var ajaxPrintRes = {
					userId:thisIcCard,
					printType:1,
					isPrint:"yes",
					registerId:"0001",
					logIds:""
			}
			
			$checked.each(function(){
				ajaxPrintRes.logIds = ajaxPrintRes.logIds + $(this).val() + ",";
			});
			printCredential(ajaxPrintRes,"_"+thisIcCard);
		});
		
		//发票打印处理
//					flushInovice({contentId:"_"+thisIcCard,customerId:thisiIcCard,newPage:0});
//					
		//----------------------------------发票信息操作------------------------------------------------
		//查询发票列表信息
		$("#invoice_content_but_flushInvoice_"+thisIcCard).click(function(){
			flushInovice({contentId:"_"+thisIcCard,customerId:thisIcCard,newPage:0});
		});
		
		//号码回填
		$("#invoice_content_but_writeBack_"+thisIcCard).click(function(){
			var $invoiceInput = $("#invoice_content_table_"+thisIcCard).find("input:checked");
			if($invoiceInput.length == 0){
				alert(WebInitParameter.MSG_BUSI_C25);
				return;
			}
			var $invoiceTr = $("#invoice_content_table_"+thisIcCard).find("tr:has(:checked)");
			if($.trim($invoiceTr.find("td").eq(1).text())!=""){
				alert(WebInitParameter.MSG_BUSI_C27);
				return;
			}
			invoiceNoWriteBack($("#invoice_content_showDiv_"+thisIcCard),"_"+thisIcCard,$invoiceInput.val(),thisIcCard);
		});
		
		//查看详细信息
		$("#invoice_content_but_view_"+thisIcCard).click(function(){
			var $invoiceInput = $("#invoice_content_table_"+thisIcCard).find("input:checked");
			if($invoiceInput.length == 0){
				alert(WebInitParameter.MSG_BUSI_C25);
				return;
			}
			viewInvoiceInit($("#invoice_content_showDiv_"+thisIcCard),"_"+thisIcCard,$invoiceInput.val(),thisIcCard);
		});
		
		//发票作废
		$("#invoice_content_but_discard_"+thisIcCard).click(function(){
			var $invoiceInput = $("#invoice_content_table_"+thisIcCard).find("input:checked");
			if($invoiceInput.length == 0){
				alert(WebInitParameter.MSG_BUSI_C25);
				return;
			}
			//判断是否本来就是已经作废的发票
			var $invoiceTr = $("#invoice_content_table_"+thisIcCard).find("tr:has(:checked)");
			var invoiceStatus = $invoiceTr.find("td").eq(5).find("input").val();
			var printStaus = $invoiceTr.find("td").eq(6).find("input").val();
			//和数据库交互获取最新发票状态2013-2-1 yzy
			var ajaxInvoiceStatusResponse = {
					invoiceId:$invoiceInput.val()
				};
			var ajaxConfirmPath = ajaxInvoicePath + "ajaxGetInvoice.do";
			ovtAjaxMethod(ajaxConfirmPath,ajaxInvoiceStatusResponse,function(data){
				// 获取发票信息成功，进行验证
				if(data.code=='0'){
					invoiceStatus = data.value.validStatus;// 发票有效状态
					printStatus = data.value.printStatus;  // 发票打印状态
					if(invoiceStatus==WebInitParameter.INVOICE_VALID_STATUS_DISCARD){
						alert(WebInitParameter.MSG_BUSI_C28);
						return;
					}
					if(invoiceStatus == WebInitParameter.INVOICE_VALID_STATUS_RED){//冲红发票不能作废 2012-4-25 yzy
						alert(WebInitParameter.MSG_BUSI_C48);
						return;
					}
					if(WebInitParameter.INVOICE_STATUS_PRINT_SUCCESS!=printStatus){
						alert("发票未成功打印不能作废发票！");
						return;
					}
					invoiceDiscard($("#invoice_content_showDiv_"+thisIcCard),"_"+thisIcCard,$invoiceInput.val(),thisIcCard);
				}else{
					alert("获取发票信息异常！");
					return;
				}
			});
			
		});
		
		//发票延打
		$("#invoice_content_but_print_"+thisIcCard).click(function(){
			var $invoiceInput = $("#invoice_content_table_"+thisIcCard).find("input:checked");
			if($invoiceInput.length == 0){
				alert(WebInitParameter.MSG_BUSI_C25);
				return;
			}
			var $invoiceTr = $("#invoice_content_table_"+thisIcCard).find("tr:has(:checked)");
			var invoiceStatus = $invoiceTr.find("td").eq(5).find("input").val();
			var printStatus = $invoiceTr.find("td").eq(6).find("input").val();
			
			/* add by jhg 2013-01-24 
			 * 参数为选择的发票ID ajax提交信息，延期打印前先与数据库交互，将需要延期打印的发票信息找出来，通过实际的发票及打印状态进行打印判断
			 */
			var ajaxInvoiceStatusResponse = {
				invoiceId:$invoiceInput.val()
			};
			ajaxConfirmPath = ajaxInvoicePath + "ajaxGetInvoice.do";
			ovtAjaxMethod(ajaxConfirmPath,ajaxInvoiceStatusResponse,function(data){
				// 获取发票信息成功，进行验证
				if(data.code=='0'){
					invoiceStatus = data.value.validStatus;// 发票有效状态
					printStatus = data.value.printStatus;  // 发票打印状态
					// 作废的发票不能打印  add by jhg 正常 0,作废 1,被冲红 2,冲红 3
					if(invoiceStatus == WebInitParameter.INVOICE_VALID_STATUS_DISCARD){
						alert(WebInitParameter.MSG_BUSI_C29);
						return;
					}
					
					// 发票打印状态为未打印、打印预览、打印失败的都可以延期打印 ,其他的状态不能打印 add by jhg 
					if(printStatus != WebInitParameter.INVOICE_STATUS_NO_PRINT 
							&& printStatus != WebInitParameter.INVOICE_STATUS_PRINT_PREVIEW
							&& printStatus != WebInitParameter.INVOICE_STATUS_PRINT_FAILURE ){
						alert(WebInitParameter.MSG_BUSI_C30);
						flushInovice({contentId:"_"+thisIcCard,customerId:thisIcCard,newPage:0});
						return;
					}
					var ajaxPrintRes = {
							userId:thisIcCard,
							printType:0,
							registerId:"0001",
							invoiceId:$invoiceInput.val(),
							operatingCompany:WebInitParameter.PARAM_OPERATING_COMPANY
					}
					printCredential(ajaxPrintRes,"_"+thisIcCard);
				}else{
					alert("该发票延期打印异常，请检查发票状态！");
				}
			});
		});
		
		//作废重打
		$("#invoice_content_but_rePrint_"+thisIcCard).click(function(){
			var $invoiceInput = $("#invoice_content_table_"+thisIcCard).find("input:checked");
			if($invoiceInput.length == 0){
				alert(WebInitParameter.MSG_BUSI_C25);
				return;
			}
			var $invoiceTr = $("#invoice_content_table_"+thisIcCard).find("tr:has(:checked)");
			var invoiceStatus = $invoiceTr.find("td").eq(5).find("input").val();
			var printStatus = $invoiceTr.find("td").eq(6).find("input").val();
			if(invoiceStatus == WebInitParameter.INVOICE_VALID_STATUS_DISCARD){
				alert(WebInitParameter.MSG_BUSI_C29);
				return;
			}
			if(invoiceStatus == WebInitParameter.INVOICE_VALID_STATUS_RED){//冲红发票不能作废 2012-4-25 yzy
				alert(WebInitParameter.MSG_BUSI_C48);
				return;
			}
//						if(printStatus != WebInitParameter.INVOICE_STATUS_NO_PRINT && printStatus != WebInitParameter.INVOICE_STATUS_PRINT_FAILURE ){
//							alert(WebInitParameter.MSG_BUSI_C30);
//							return;
//						}
			
			//调用作废重打的方法
			discardReprint($("#invoice_content_showDiv_"+thisIcCard),"_"+thisIcCard,$invoiceInput.val(),thisIcCard);
		});
		//发票冲红
		$("#invoice_content_but_negative_"+thisIcCard).click(function(){
			var $invoiceInput = $("#invoice_content_table_"+thisIcCard).find("input:checked");
			if($invoiceInput.length == 0){
				alert(WebInitParameter.MSG_BUSI_C25);
				return;
			}
			var $invoiceTr = $("#invoice_content_table_"+thisIcCard).find("tr:has(:checked)");
			var invoiceStatus = $invoiceTr.find("td").eq(5).find("input").val();
			var printStatus = $invoiceTr.find("td").eq(6).find("input").val();
			//和数据库交互获取最新发票状态2013-2-1 yzy
			var ajaxInvoiceStatusResponse = {
					invoiceId:$invoiceInput.val()
				};
			var ajaxConfirmPath = ajaxInvoicePath + "ajaxGetInvoice.do";
			ovtAjaxMethod(ajaxConfirmPath,ajaxInvoiceStatusResponse,function(data){
				// 获取发票信息成功，进行验证
				if(data.code=='0'){
					invoiceStatus = data.value.validStatus;// 发票有效状态
					printStatus = data.value.printStatus;  // 发票打印状态
					if(invoiceStatus != WebInitParameter.INVOICE_VALID_STATUS_NORMAL){
						alert(WebInitParameter.MSG_BUSI_C29);
						return;
					}
					if(WebInitParameter.INVOICE_STATUS_PRINT_SUCCESS!=printStatus){
						alert("发票未成功打印不能冲红发票！");
						return;
					}
					negativeInvoiceInit($("#invoice_content_showDiv_"+thisIcCard),"_"+thisIcCard,$invoiceInput.val(),thisIcCard);
				}else{
					alert("获取发票信息异常！");
					return;
				}
			});
		});
		//查询缴费历史信息
		$("#receipt_content_but_flushReceipt_"+thisIcCard).click(function(){
			receiptFunc.flushReceipt({contentId:"_"+thisIcCard,customerId:thisIcCard,newPage:0});
		});
		
		//缴费历史信息按钮打印发票
		$("#receipt_content_but_print_"+thisIcCard).click(function(){
			var $receiptInput = $("#receipt_content_table_"+thisIcCard).find("input:checked");
			if($receiptInput.length == 0){
				alert(WebInitParameter.MSG_BUSI_C21);
				return;
			}
			var receiptIds = "";
			$receiptInput.each(function(){
				receiptIds = receiptIds + $(this).val()+",";
			});
			invoiceShow("_"+thisIcCard,thisIcCard,receiptIds,currentUserInfo);
		});
		
		//打印发票
		$("#other_content_accountHis_but_print_"+thisIcCard).click(function(){
			var $trs = $("#other_content_accountHis_table_"+thisIcCard).find("tr:has(:checked)");
			if($trs.length==0){
				alert(WebInitParameter.MSG_BUSI_C22);
				return;
			}
			var receiptIds = "";
			$trs.each(function(){
				receiptIds = receiptIds + $(this).find("td").eq(0).find("input").val() +",";
			});
			invoiceShow("_"+thisIcCard,thisIcCard,receiptIds,currentUserInfo);
		});
		
		//----------------------------------独立按钮--------------------------------------------------
		$("#common_bar_but_payment_"+thisIcCard).click(function(){
			flushAll(); // 2012-10-31 刷新用户 liuxu
			showPayment("_"+thisIcCard,thisIcCard);
		});
		
		
		//打印操作-----暂时废弃掉，打印分到各个功能中
		$("#common_bar_but_print_"+thisIcCard).click(function(){
			
		});
		
		// 当系统设置为费用补交强制提醒时，在双击用户时弹出费用补交对话框
		if(forceWarnFlag == "1"){
			// 初始化费用补交信息提示控件
			equRepairFeeHit(thisIcCard);
			// 初始化费用修改控件
			equRepairFeeFeeInit(thisIcCard,forceWarnFlag);
			$("#equipment_repairFee_equOrderTable_"+thisIcCard).empty();
			//显示
			$("#equipment_repair_fee_div_"+thisIcCard).css("top","150px");
			$("#equipment_repair_fee_div_"+thisIcCard).css("left","220px");
			$(this).blur();
			$("#mask").toggle();
			$("#equipment_repair_fee_div_"+thisIcCard).removeClass("hide");
			// 允许退订框拖拽 
			$("#equipment_repair_title_"+thisIcCard).drag("#equipment_repair_fee_div_"+thisIcCard);
		}
		
		// 手动点击”费用补交“时弹出费用补交对话框
		$("#equipment_order_content_but_repairFee_"+thisIcCard).click(function(){
			$("#equipment_repairFee_equOrderTable_"+thisIcCard).empty();
			// 初始化费用补交信息提示控件
			equRepairFeeHit(thisIcCard);
			// 初始化费用修改控件
			equRepairFeeFeeInit(thisIcCard);
			//显示
			$("#equipment_repair_fee_div_"+thisIcCard).css("top",event.clientY+$(this).scrollTop()+$(this).height()+"px");
			$("#equipment_repair_fee_div_"+thisIcCard).css("left","220px");
			$(this).blur();
			$("#mask").toggle();
			$("#equipment_repair_fee_div_"+thisIcCard).removeClass("hide");
			// 允许退订框拖拽 
			$("#equipment_repair_title_"+thisIcCard).drag("#equipment_repair_fee_div_"+thisIcCard);
		});
		
		// 费用补交右上角关闭图标事件
		$("#equipment_repair_close_icon_"+thisIcCard).click(function(){
			$("#equipment_repair_fee_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
		// 费用补交 取消按钮事件
		$("#equipment_repair_but_cancel_"+thisIcCard).click(function(){
			$("#equipment_repair_fee_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
		// 费用补交确定按钮事件
		$("#equipment_repair_but_"+thisIcCard).click(function(){
			$("#equipment_repair_fee_div_"+thisIcCard).addClass("hide");
			$("#mask").toggle();
		});
		
		// 费用补交 补充订购信息按钮事件
		$("#equipment_repairFee_checkInvalid_"+thisIcCard).click(function(){
			equRepairFeeOrderInit(thisIcCard);
		});
		
		// 费用补交"确认"按钮事件
		$("#equipment_repair_but_"+thisIcCard).click(function(){
			var repairOrderId = "";
			var repairOrderFee = "";
			if(repairOrderSeq != ""){
				var repairIds = repairOrderSeq.split(",");
				for(var index=0;index<repairIds.length;index++){
					repairOrderId = repairIds[index];
					repairOrderFee = repairOrderFee + repairOrderId + "-0.0,";
				};
			}
			
			if(repairOrderParam == ""){
				alert("请点击【补充订购】后再操作！");
				return;
			}
			
			if(repairOrderParam == "0"){
				alert("没有需要补充的订购信息，请确认！");
				return;
			}
			
			// 产生费用参数
			var repairFeeItemLength = 0;
			var confirmCost = "";
			if(undefined != equRepairFeeFunc.feeItemValue){
				repairFeeItemLength = equRepairFeeFunc.feeItemValue.length;
			}
			if(repairFeeItemLength > 0){
				var feeValue = "";
				$(equRepairFeeFunc.feeItemValue).each(function(n,inValue){
					feeValue = $("#repairFee_"+thisIcCard).val();
					if(feeValue != ""){
						confirmCost = confirmCost + (inValue.id+":"+inValue.feeCode+":"+inValue.parentId+":"
							  + inValue.feeName+":"+inValue.itemType+":"+inValue.remark+":"
							  + inValue.isFee+":"+feeValue+":1:1&");
					}
				});
			}
			if(confirmCost == ""){
				repairFeeItemLength = 0;
			}
			
			var ajaxRepairProduct = {
				customer_id:thisIcCard,
				orderParamStr:repairOrderParam,
				supplyOrderFee:repairOrderFee,
				confirmCost:confirmCost,
				repairFeeFlag:"0"
			};
			$(this).attr("disabled",true);//置灰
			ovtAjaxMethod(ajaxProPath+"ajaxDoUserOrder.do",ajaxRepairProduct,function(data){
				$("#equipment_repair_but_"+thisIcCard).attr("disabled",false);//恢复
				if(data.code == 1){
					alert(data.value);
					return;
				}else{
					if(repairFeeItemLength > 0){
						var skipFlag = false;
						if(equipmentFunc.operConfirm1("equCommand",data.value + "请进入缴费页面进行缴费!")){
							skipFlag = true;
						}
						$("#equipment_repair_fee_div_"+thisIcCard).addClass("hide");
						flushEquipment();
						if(skipFlag) {
							$("#common_bar_but_payment_"+thisIcCard).trigger("click");
						}
					}else{
						alert(data.value);
						$("#equipment_repair_fee_div_"+thisIcCard).addClass("hide");
						flushEquipment();
					}
				}
			});
		});
	});//再次查询用户基本信息方法返回结束
}