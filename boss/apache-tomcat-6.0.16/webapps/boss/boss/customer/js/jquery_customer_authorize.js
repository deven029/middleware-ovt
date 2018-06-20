// 增加调用增卡指令按钮和从设备信息中移入刷新授权，清除授权按钮时增加的映射 liuxu 2012-07-09
var authorizeFunc = new Object();
authorizeFunc.equNameMap = new UserMap();//保存设备号码和名称对应的map
authorizeFunc.equVar = new UserMap();//保存设备关系信息

function flushCustomerAuthorize(contentId,customerId) {
	showMsg("授权查询");
	var searchRes = {
		customer_id : customerId
	};
	ovtAjaxMethod(ajaxBusPath+"ajaxSearchUserEquList.do",searchRes,function(data){
		$("#authorizeTable"+contentId).find("tr:not(:first-child)").remove();
		var authorizeContent = "";
		if(data.code != "0") {
			alert(data.value);
			hideMsg();
			return;
		}
		//清空map中的数据
		authorizeFunc.equNameMap.clearCustomer(customerId);
		authorizeFunc.equVar.clearCustomer(customerId);
		
		if($(data.value).length == 0) {
			authorizeContent = "<tr><td colspan='10'>没有该用户的授权信息</td></tr>";
		} else {
			var bindingType = "";
			var equSlaveName = "";
			var userType = $("#customer_customerType"+contentId).val();
			$(data.value).each(function(n,inValue) {
				if(inValue.bindingType == BINDING_TYPE_VALUE_BINDING) {
					bindingType = WebInitParameter.BINDING_TYPE_BINDING;
				} else if(inValue.bindingType == BINDING_TYPE_VALUE_UNBINDING) {
					bindingType = WebInitParameter.BINDING_TYPE_UNBINDING;
				}
				var orderInfo = "<td>";
				if($(inValue.orderAuthList).length > 0) {
					orderInfo += "<table class='orderTableBorder' width='100%'>";
					orderInfo += "<tr><th>服务名称</th><th>服务ID</th><th>所属系统</th><th>开始时间</th><th>结束时间</th><th>状态</th></tr>";
					$(inValue.orderAuthList).each(function(n,innValue) {
						orderInfo += "<tr><td width='20%'>"+innValue.productName+"</td><td width='10%'>"+innValue.serviceDesc+"</td>" +
								"<td width='20%'>"+innValue.thirdSysName+"</td>" + 
								"<td width='20%'>"+innValue.effectiveDateStr+"</td><td width='20%'>"+innValue.expiryDateStr+"</td>" +
								"<td width='10%'>"+innValue.statusStr+"</td></tr>";
					});
					orderInfo += "</table>";
				}
				orderInfo += "</td>";
				var cardNo = "";
				if(inValue.icNo != "" && inValue.equSlaveType != "") {
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
						}else{//副终端
							cardNo = "<span class='ui_icon secondary_icon'></span>";
							equSlaveName = WebInitParameter.CHINESE_SEQ + getChineseNum(inValue.groupId)+ WebInitParameter.CHINESE_GROUP + WebInitParameter.CHINESE_SEQ + getChineseNum(inValue.equSlaveType) + WebInitParameter.GROUP_VALUE_SLAVE;
						}
					}
				} else if(inValue.equSlaveType == ""){
					equSlaveName = "&nbsp;";
				}else{//没有智能卡
					equSlaveName = "&nbsp;";
					inValue.icNo = "&nbsp;";
					inValue.cardDesc = "&nbsp;";
				}
				if(WebInitParameter.ORDER_VIEW_TYPE_V1 == WebInitParameter.ORDER_VIEW_TYPE){
					authorizeContent = authorizeContent + "<tr name='authorize_table_content'><td><input type='checkbox' value= '"+inValue.id+"'/></td><td>"+cardNo+inValue.icNo+"</td><td>"+equSlaveName+"</td><td>"+inValue.cardDesc+"</td><td>"+inValue.stbNo+"</td><td>"+inValue.stbModel+"</td><td>"+inValue.stbGetType+"</td><td>"+inValue.stbDesc+"</td><td>"+bindingType+"</td></tr>";
				}else{
					authorizeContent = authorizeContent + "<tr name='authorize_table_content'><td><input type='checkbox' value= '"+inValue.id+"'/></td><td>"+cardNo+inValue.icNo+"</td><td>"+equSlaveName+"</td><td>"+inValue.cardDesc+"</td><td>"+inValue.stbNo+"</td><td>"+inValue.stbModel+"</td><td>"+inValue.stbGetType+"</td><td>"+inValue.stbDesc+"</td><td>"+bindingType+"</td>"+orderInfo+"</tr>";
					inValue.orderInfo = orderInfo;
				}
				//保存设备号码和名称映射Map
				authorizeFunc.equNameMap.put(customerId,inValue.icNo,inValue.icNo+"&nbsp;"+equSlaveName);
				//保存隐藏设备关系对象
				inValue.equSlaveName = equSlaveName;
				inValue.cardNoAndIcNo = cardNo+inValue.icNo;
				inValue.bindingTypeStr = bindingType;
				authorizeFunc.equVar.put(customerId,inValue.id,inValue);
			});
		}
		hideMsg();
		$("#authorizeTable"+contentId).append(authorizeContent);
	});
}

authorizeFunc.operConfirm = function(commandId,text){
	if(WebInitParameter.OPERATION_CONFIRM == "yes"){
		return confirm("确定进行"+text+"操作吗？");
	}
	return true;
}