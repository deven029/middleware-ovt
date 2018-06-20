$(function(){
	/*二级片区联动*/
	$("#areaLevel1").change(function(){
		getChildAreaLevel("",1);
	});
	/*三级片区联动*/
	$("#areaLevel2").change(function(){
		getChildAreaLevel("",2);
	});
	
	$("#statAccountIncome").click(function(){
		$("#resultTable").empty();
		$("#infoTable").empty();
		$("#printTimeInfo").empty();
		$("#dataForPrint").empty();
		var startTime = $("#startTime").val();
		var endTime = $("#endTime").val();
		var areaLevel1 = $("#areaLevel1").val();
		var areaLevel2 = $("#areaLevel2").val();
		var areaLevel3 = $("#areaLevel3").val();
		
		// 如果开始时间为空，或1级片区为空，则给出提示并返回
		if (startTime == '' || startTime == null) {
			$("#statResult").addClass("hide");
			$("#comments").addClass("hide");
			alert("请选择开始时间!");
			return;
		}
		if (areaLevel1 == '' || areaLevel1 == null || areaLevel1 == '-1') {
			$("#statResult").addClass("hide");
			$("#comments").addClass("hide");
			alert("请选择一级片区!");
			return;
		}
		
		var infoTableContent = "<tr><td align='left' width='35%' height='23'>统计对象:"+getStatObj()+"</td>" +
						  "<td align='center' width='35%' height='23'>统计时段:"+getStatDate()+"</td>" +
						  "<td align='right' width='30%' height='23'><input type=\"button\" value=\"打印\" onclick=\"print()\" /></td></tr>";
		$("#infoTable").append(infoTableContent);
		
		var printTimeContent = "<tr align='right'><td align='right' width='80%'>统计时间:</td><td id='printTime' align='left' width='20%'>"+(new Date()).toLocaleString()+"</td></tr>";
		$("#printTimeInfo").append(printTimeContent);
		
		var statPara = {
			start_time : startTime,
			end_time : endTime,
			area_level1 : areaLevel1,
			area_level2 : areaLevel2,
			area_level3 : areaLevel3,
			stat_obj : getStatObj(),
			stat_date : getStatDate(),
			print_date : $("#printTime").text()
		}
		
		var path = "../../../jsp/boss/stat/accountIncomeStat.do?methodToCall=statAccountIncome";
		var tableContent = "";
		var hideContent="";
		var tableHeader = "<tr><th align='center' width='16%' height='23'>&nbsp;</th>" +
						  "<th align='center' width='14%' height='23'>总额</th>" +
						  "<th align='center' width='14%' height='23'>现金</th>" +
						  "<th align='center' width='14%' height='23'>券</th>" +
						  "<th align='center' width='14%' height='23'>点</th>" +
						  "<th align='center' width='14%' height='23'>银行转账</th>" +
						  "<th align='center' width='14%' height='23'>其它</th></tr>";
		$("#resultTable").append(tableHeader);
		ovtAjaxMethod(path, statPara, function(data){
			if(data.code != "0") {
				$("#statResult").addClass("hide");
				$("#comments").addClass("hide");
				alert(data.value);
				return;
			}
			if($(data.value).length == 0) {
				tableContent = "<tr><td colspan='7' align='center' height='23'>没有该账户的收入信息</td></tr>";
			} else {
				$(data.value).each(function(n,inValue) {
					// 这里往表中插入数据
					if (inValue.flag == 'previous') {
						tableContent = tableContent + "<tr><td align='center' width='16%' height='23'>上期结余</td>";
					} else if (inValue.flag == 'charge') {
						tableContent = tableContent + "<tr><td align='center' width='16%' height='23'>本期充值</td>";
					} else if (inValue.flag == 'sub') {
						tableContent = tableContent + "<tr><td align='center' width='16%' height='23'>本期扣款</td>";
					} else if (inValue.flag == 'return') {
						tableContent = tableContent + "<tr><td align='center' width='16%' height='23'>本期退还</td>";
					} else if (inValue.flag == 'back') {
						tableContent = tableContent + "<tr><td align='center' width='16%' height='23'>本期退出</td>";
					} else if (inValue.flag == 'balance') {
						tableContent = tableContent + "<tr><td align='center' width='16%' height='23'>本期充值余额</td>";
					} else if (inValue.flag == 'now') {
						tableContent = tableContent + "<tr><td colspan='7' height='46'>&nbsp;</td></tr><tr><td align='center' width='16%' height='23'>本期结余</td>";
					} else if (inValue.flag == 'current') {
						tableContent = tableContent + "<tr><td align='center' width='16%' height='23'>当前结余</td>";
					}
					tableContent = tableContent + generateDataLine(inValue);
					
					// 隐藏域用于打印
					hideContent = hideContent + "<tr><td id='"+inValue.flag+"_total'>"+Number(inValue.totalMoney).toFixed(2)+"</td>" +
					"<td id='"+inValue.flag+"_cash'>"+Number(inValue.cash).toFixed(2)+"</td>" +
					"<td id='"+inValue.flag+"_coupon'>"+Number(inValue.coupon).toFixed(2)+"</td>" +
					"<td id='"+inValue.flag+"_present'>"+Number(inValue.present).toFixed(2)+"</td>";
					if (inValue.flag == 'charge') {
						hideContent = hideContent + "<td id='"+inValue.flag+"_bank'>"+Number(inValue.bankTransfer).toFixed(2)+"</td>"
						+ "<td id='"+inValue.flag+"_others'>"+Number(inValue.others).toFixed(2)+"</td>";
					}
					hideContent = hideContent + "</tr>";
				});
			}
			$("#resultTable").append(tableContent);
			$("#dataForPrint").append(hideContent);
			$("#statResult").removeClass("hide");
			$("#comments").removeClass("hide");
			//$("#printTimeInfo").removeClass("hide");
			tableContent = "";
		});
	});
});

function getStatObj() {
	var statObj = "";
	if ($("#areaLevel3").val() != '-1') {
		statObj = "三级片区:"+ $("#areaLevel3").find("option:selected").text();
	} else if ($("#areaLevel2").val() != '-1') {
		statObj = "二级片区:"+ $("#areaLevel2").find("option:selected").text();
	} else if ($("#areaLevel1").val() != '-1') {
		statObj = "一级片区:"+ $("#areaLevel1").find("option:selected").text();
	}
	return statObj;
}

function getStatDate() {
	var statDate = "";
	if ($("#startTime").val() != ' ' && $("#endTime").val() != ' ') {
		statDate = $("#startTime").val() +" 至 " + $("#endTime").val();
	} else if ($("#startTime").val() != ' ') {
		statDate = "开始时间:"+$("#startTime").val();
	} else if ($("#endTime").val() != ' ') {
		statDate = "结束时间:" + $("#endTime").val();
	}
	return statDate;
}

function generateDataLine(inValue) {
	var dataLine = "";
	if (inValue.flag == 'balance') {
		dataLine = dataLine + "<td align='center' width='14%' height='23'>"+Number(inValue.totalMoney).toFixed(2)
				+"</td><td align='center' width='14%' height='23'>"+Number(inValue.cash).toFixed(2)
				+"</td><td align='center' width='14%' height='23'>"+Number(inValue.coupon).toFixed(2)
				+"</td><td align='center' width='14%' height='23'>"+Number(inValue.present).toFixed(2);
	} else {
		dataLine = dataLine + "<td align='center' width='14%' height='23'>"+generateUrl(Number(inValue.totalMoney).toFixed(2),inValue.flag,"total")
				+"</td><td align='center' width='14%' height='23'>"+generateUrl(Number(inValue.cash).toFixed(2),inValue.flag,"cash")
				+"</td><td align='center' width='14%' height='23'>"+generateUrl(Number(inValue.coupon).toFixed(2),inValue.flag,"coupon")
				+"</td><td align='center' width='14%' height='23'>"+generateUrl(Number(inValue.present).toFixed(2),inValue.flag,"present");
	}
	
	if (inValue.flag == 'charge') {
		dataLine = dataLine	+"</td><td align='center' width='14%' height='23'>"+generateUrl(Number(inValue.bankTransfer).toFixed(2),inValue.flag,"bank")
							+"</td><td align='center' width='14%' height='23'>"+generateUrl(Number(inValue.others).toFixed(2),inValue.flag,"others")+"</td></tr>";
	} else {
		dataLine = dataLine +"</td><td align='center' width='14%' height='23'>&nbsp;</td>"
							+"<td align='center' width='14%' height='23'>&nbsp;</td></tr>";
	}
	return dataLine;
}

function generateUrl(val, flag, label) {
	if (val == '0.00') {
		return val;
	} else {
		var url = "<a href=\"#\" onclick=\"openWin('"+flag+"', '"+label+"')\">"+val+"</a>"
		return url;
	}
}

function openWin(typeFlag, label) {
	if (confirm("您确认要导出该金额的明细数据吗?")) {
		var startTime = $("#startTime").val();
		var endTime = $("#endTime").val();
		var areaLevel1 = $("#areaLevel1").val();
		var areaLevel2 = $("#areaLevel2").val();
		var areaLevel3 = $("#areaLevel3").val();
		window.location.href="../../../jsp/boss/stat/accountIncomeStat.do?methodToCall=export&flag="+typeFlag
			+"&start_time="+startTime
			+"&end_time="+endTime
			+"&area_level1="+areaLevel1
			+"&area_level2="+areaLevel2
			+"&area_level3="+areaLevel3
			+"&label="+label;
	}
}

function print() {	
	var ifr = document.createElement('iframe');
	ifr.height='0px' ;
	ifr.src = '../../../jsp/boss/stat/accountIncomeStat.do?methodToCall=printInit';
	document.body.appendChild(ifr);
}

function getAreaLevels() {
	var resPara = {userBusiCode:"-2"};
	var ajaxRegPath="../../../jsp/boss/customer/register/";
	ovtAjaxMethod(ajaxRegPath+"ajaxParameters.do",resPara,function(data){
		if(data.code != '0'){
			alert(WebInitParameter.MSG_INFO_C06);
			return;
		}
		$("#areaLevel1").empty().append(data.value.areaLevel1);
		$("#areaLevel2").empty().append(data.value.areaLevel2);
		$("#areaLevel3").empty().append(data.value.areaLevel3);
	});
}

function getChildAreaLevel(contentId,level){
	var areaObj = {
			areaId:""
	};
	var ajaxBusPath="../../../jsp/boss/customer/baseBusiness/";
	if(level == 1){
		areaObj.areaId = $("#areaLevel1"+contentId).val();
	}else if(level == 2){
		areaObj.areaId = $("#areaLevel2"+contentId).val();
	}
	ovtAjaxMethod(ajaxBusPath+"ajaxShowRelatedAreas.do",areaObj,function(data){
		var option = "";
		$(data).each(function(n,value){
			option = option + value ;
		});
		if(level == 1){
			$("#areaLevel2"+contentId).find("option[value!=-1]").remove();
			$("#areaLevel2"+contentId).append(option);
			getChildAreaLevel(contentId,2);
		}else if(level == 2){
			$("#areaLevel3"+contentId).find("option[value!=-1]").remove();
			$("#areaLevel3"+contentId).append(option);
		}
	});
}

