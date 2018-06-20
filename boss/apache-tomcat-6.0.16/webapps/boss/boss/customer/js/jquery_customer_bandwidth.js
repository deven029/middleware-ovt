//----------------------------------------------刷新隐藏宽带帐号信息 jhg----------------------------------------------------
var bandwidthFunc = new Object();
bandwidthFunc.bwNameMap = new UserMap();//保存宽带帐号号码和名称对应的map
bandwidthFunc.userbwVar = new UserMap();// 保存用户宽带帐号关系信息
bandwidthFunc.bandWidthVar = new UserMap();//保存宽带帐号信息

// 同步该用户宽带帐户信息
function synBandWidth(customerId){
	var syncRes = {
		customer_id:customerId
	};
	var ajaxSyncQueryPath = ajaxBwPath+"ajaxSyncUserBw.do"; //得到请求地址
	ovtAjaxMethod(ajaxSyncQueryPath,syncRes,function(data){
		if(data.code != "0"){
			alert(data.value);
			return;
		}
	});
}

//刷新隐藏宽带帐号信息
function flushBandWidthAccount(contentId,customerId,synFlag){
	//数据量大,首先遮挡
//	$("#equMask").removeClass("hide");
	showMsg("宽带账户查询");
	var searchRes = {
			customer_id:customerId,
			synFlag:synFlag
	};
	var ajaxPath = "ajaxSearchUserBWList.do"; //得到请求地址
	ovtAjaxMethod(ajaxBusPath+ajaxPath,searchRes,function(data){
		$("#bandwidthTable"+contentId).find("tr:not(:first-child)").remove();
		var bandwidthContent = "";
		if(data.code != "0"){
			alert(data.value);
			hideMsg();
			return;
		}
		var tableHeader = getBandWidthTableHeader(); //得到表头信息
		$("#bandwidthTable"+contentId).empty().append(tableHeader);
		//清空map中的数据
		bandwidthFunc.bwNameMap.clearCustomer(customerId);
		bandwidthFunc.userbwVar.clearCustomer(customerId);
		bandwidthFunc.bandWidthVar.clearCustomer(customerId);
		
		if($(data.value).length==0){
			bandwidthContent = "<tr><td colspan = '9'>没有该用户的宽带账户信息</td></tr>";
		}else{
			
			$(data.value).each(function(n,inValue){

				//得到订购信息
				var orderInfo;
				// 销户状态的不显示订购信息
				if(inValue.status != "2"){
					orderInfo = "<td>";
					if ($(inValue.orderList).length>0){
						orderInfo = orderInfo + "<table class ='orderTableBorder' width='100%'>";
						orderInfo = orderInfo +"<tr><th width='25%'>产品名称</th><th width='33%'>计费策略</th><th width='14%'>订购时间</th><th width='14%'>生效时间</th><th width='14%'>失效时间</th></tr>";
						$(inValue.orderList).each(function(n,innVal){
							orderInfo = orderInfo + "<tr><td>"+innVal.name+"</td><td>"+innVal.feeTypeList[0].commodity_name+"</td><td>"+inValue.createDateStr+"</td><td>"+inValue.effectDateStr+"</td><td>"+inValue.endDateStr+"</td></tr>";
						});
						orderInfo = orderInfo + "</table>";
					}
				}else{
					orderInfo = "<td colspan='5'>";
				}
				orderInfo = orderInfo + "</td>";

				var bwStatusStr = "";
				if(inValue.status == "0"){
					bwStatusStr = "正常";
				}else if(inValue.status == "1"){
					bwStatusStr = "欠费停用";
				}else if(inValue.status == "2"){
					bwStatusStr = "销户";
				}else if(inValue.status == "3"){
					bwStatusStr = "用户申请停用";
				}else if(inValue.status == "4"){
					bwStatusStr = "用户自助申请停用";
				}else if(inValue.status == "5"){
					bwStatusStr = "其他停用";
				}else if(inValue.status == "6"){
					bwStatusStr = "上线绑定";
				}else if(inValue.status == "7"){
					bwStatusStr = "用户超过信用额停用";
				}else if(inValue.status == "8"){
					bwStatusStr = "欠费";
				}else{
					bwStatusStr = "未知";
				}
				bandwidthContent = bandwidthContent + "<tr><td><input type='checkbox' value= '"+inValue.bwId+"'/></td><td>"+inValue.bwNo+"</td><td>"+inValue.createDateStr+"</td><td>"+bwStatusStr+"</td><td>"+Number(inValue.balance).toFixed(2)+"</td>"+orderInfo+"</tr>";
				//保存隐藏宽带帐号关系对象
				bandwidthFunc.bandWidthVar.put(customerId,inValue.bwNo,inValue);
			});
		}
		hideMsg();
		$("#bandwidthTable"+contentId).append(bandwidthContent);
		
		//增加勾选事件-操作按钮响应事件
		$("#bandwidthTable"+contentId).find("tr").click(function(){
			if($("#bandwidthTable"+contentId).find("tr:has(:checked)").length == 1){
				bwNoHtml = $("#bandwidthTable_"+customerId).find("tr:has(:checked)").children("td").eq(1).text();
				var userBandwidthInfo = bandwidthFunc.bandWidthVar.get(customerId,bwNoHtml);
				if(userBandwidthInfo.status != 2){
					// 业务变更
					$("#bandwidth_content_bandwidth_but_modifySub"+contentId).attr("disabled",false);
					// 密码重置
					$("#bandwidth_content_bandwidth_but_resetPWSub"+contentId).attr("disabled",false);
					// 密码修改
					$("#bandwidth_content_bandwidth_but_changePWSub"+contentId).attr("disabled",false);
					// 续订/充值
					$("#bandwidth_content_bandwidth_but_renewAndfeeSub"+contentId).attr("disabled",false);
					// 销户
					$("#bandwidth_content_bandwidth_but_repoSub"+contentId).attr("disabled",false);
					// 信息同步
					$("#bandwidth_content_bandwidth_but_syncSub"+contentId).attr("disabled",false);
				}else{
					// 续订/充值
					$("#bandwidth_content_bandwidth_but_renewAndfeeSub"+contentId).attr("disabled",false);
					// 删除
					$("#bandwidth_content_bandwidth_but_deleteSub"+contentId).attr("disabled",false);
				}
			}else{
				$("#bandwidth_content_bandwidth_but_modifySub"+contentId).attr("disabled",true);
				// 密码重置
				$("#bandwidth_content_bandwidth_but_resetPWSub"+contentId).attr("disabled",true);
				// 密码修改
				$("#bandwidth_content_bandwidth_but_changePWSub"+contentId).attr("disabled",true);
				// 续订/充值
				$("#bandwidth_content_bandwidth_but_renewAndfeeSub"+contentId).attr("disabled",true);
				// 销户
				$("#bandwidth_content_bandwidth_but_repoSub"+contentId).attr("disabled",true);
				// 信息同步
				$("#bandwidth_content_bandwidth_but_syncSub"+contentId).attr("disabled",true);
				// 删除
				$("#bandwidth_content_bandwidth_but_deleteSub"+contentId).attr("disabled",true);
			}
		});
		
		// 行添加鼠标悬停事件
		$("#bandwidthTable"+contentId).find("tr").bind("mouseover",function(){
			$(this).css("background-color","rgb(255,246,143)");
		});
		
		// 行添加鼠标移除事件
		$("#bandwidthTable"+contentId).find("tr").bind("mouseout",function(){
			$(this).css("background-color","rgb(255,255,255)");			
		});
	});
}

//刷新隐藏宽带帐号信息
function showSubmitTip(contentId,customerId){
	//数据量大,首先遮挡
	showMsg("提交业务信息查询");
	var searchRes = {
			customer_id:customerId
	};
	var ajaxQueryPath = ajaxBwPath+"ajaxQuerySubmitOpr.do"; //得到请求地址
	ovtAjaxMethod(ajaxQueryPath,searchRes,function(data){
		$("#showUnSubmitTipTable"+contentId).empty();
		var summitShowInfo = "";
		if(data.code != "0"){
			alert(data.value);
			hideMsg();
			return;
		}else{
			var showTips = data.value.split("_");
			summitShowInfo = "<tr><font>操作日志提醒:未提交</font><font color='red'>"+showTips[0]+"</font><font>条,提交成功</font><font color='red'>"+showTips[1]+"</font><font>条,提交失败</font><font color='red'>"+showTips[2]+"</font><font>条!</font></tr>";
		}
		hideMsg();
		$("#showUnSubmitTipTable"+contentId).append(summitShowInfo);
	});
}

/*得到宽带帐号表头*/
function getBandWidthTableHeader(){
	return "<tr><th>选择</th><th>账户号</th><th>开户时间</th><th>账户状态</th><th>余额</th><th width= '45%'>订购信息</th></tr>";
}

bandwidthFunc.operConfirm = function(text){
	if(WebInitParameter.OPERATION_CONFIRM == "yes"){
		return confirm("确定进行"+text+"操作吗？");
	}
	return true;
}
bandwidthFunc.operConfirm1 = function(text) {
	if(WebInitParameter.OPERATION_CONFIRM == "yes"){
		return confirm(text);
	}
	return true;
}

