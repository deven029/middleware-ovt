
var commonFunc = new Object();

//---------------------------------------------设备使用变量方法封装--写在本文件方便修改为jsp形式------------
//定义各种通过参数

var BINDING_TYPE_VALUE_UNBINDING = "0";//未绑定
var BINDING_TYPE_VALUE_BINDING = "1";//已绑定

var STB_GET_TYPE_HTML = "";//机顶盒来源HTML信息
// add by jhg
var bwNoHtml = ""; // 宽带账户号
var bandwidthFlag = ""; // 宽带业务开关
var bandwidthSubmitFlag = ""; // 宽带业务自动提交开关
var isLongSTBNoFlag = ""; // 是否支持输入超长机顶盒编号开关
var bwServiceDescMap = "";//保存宽带产品与产品描述对应的map
var payCustomerId = "_";
var useableMoneyFlag = ""; // 缴费时是否计算可用余额  2012-10-25 liuxu
var minusValueFlag = "";   // 缴费时是否可以输入负值  add by jhg 2012-11-27
var couponValueFlag = "";  // 缴费时是否可以输入券账户 add by jhg 2012-11-27
var presentValueFlag = ""; // 缴费时是否可以输入点账户 add by jhg 2012-11-27
var isPayByStandard = ""; // 是否按标准策略计费 add by jhg 2013-03-18
var isPayCalcFeeType = ""; // 退订时退费计费方式 add by jhg 2013-05-17
var isOrderPermitType = ""; // 订购限制是否启用 add by jhg 2013-06-11
var equInputType = ""; // 系统默认的设备的输入方式 add by jhg 2013-08-23
var forceWarnFlag = ""; // 费用补交强制提醒标记 add by jhg 2013-09-05  

function getChineseNum(num){
	num = num +"";
	if(num == "")
		return "";
	var units = new Array("十", "百", "千", "万");
	var numeric = new Array("零", "一", "二", "三", "四", "五", "六","七", "八", "九"); 
	var res = "";
	for(var i = -1; num.length > 0 ; i+=1){
		var inte = Number(num.substring(num.length-1,num.length));
		var rtemp = numeric[inte];
		if(num.length == 1 && i == 0 && inte == 1){
			rtemp = "";
		}
		if(inte != 0 && i != -1){
			rtemp += units[i];
		}
		res = rtemp + res;
		num = num.substring(0,num.length -1 );
	}
	//while(res.indexOf(numeric[0]) == res.length-1){
	//	res = res.substring(0,res.lastIndexOf(numeric[0]));
	//}
	while(res.indexOf(numeric[0]+numeric[0])!=-1){
		res = res.replace(numeric[0] + numeric[0], numeric[0]);
	}
	//去掉末尾为零情况
	while(res.lastIndexOf(numeric[0]) == res.length-1){
		res = res.substring(0,res.lastIndexOf(numeric[0]));
	}
	for (var i = 1; i < units.length; i+=1) {
		res = res.replace(/numeric[0] + units[i]/g, units[i]);
	}
	return res;
}

//---------------------------------------------设备使用变量方法封装--结束-----------------------------------





//显示初始化
function init(){
	$("#message").addClass("hide");
	$("#mask").addClass("hide");
	$("#equMask").addClass("hide");
}


//----------------------------------------------所属集团公用方法封装--------------------------------------
//输入框点击弹窗
function groupTextClick(opId){
		if(opId==""||!$("#customer_group"+opId).attr("readonly")){
			$("#customer_group_search_dialog"+opId).css("top",event.clientY+$("#customer_group"+opId).height());
			$("#customer_group_search_dialog"+opId).css("left",event.clientX-$("#customer_group_search_dialog"+opId).width()/2);
			$("#customer_group_search_dialog"+opId).removeClass("hide");
			$("#customer_group_search_name"+opId)[0].focus();
			$("#mask").toggle();
		}
}
//所属集团弹出搜索及ajax返回封装
function groupSearchButClick(opId){
		var groupName = $("#customer_group_search_name"+opId).val();
		if($.trim(groupName)==""){
			alert("请输入需要搜索的集团名称");
			$("#customer_group_search_name"+opId).focus();
			return;
		}
		//ajax查找信息
		var ajaxResponse={customer_group_search_name:$.trim(groupName)};
		ovtAjaxMethod(ajaxRegPath+"ajaxSearchCorp.do",ajaxResponse,function(data,textStatus){
			$("#customer_group_search_result"+opId).empty();
			$("#customer_group_search_result"+opId).append(data);
			$("#customer_group_search_result"+opId).find("tr:not(:first-child)").click(function(){
				$("#customer_group"+opId).val($(this).children().eq(1).text());
				$("#customer_group_hidden"+opId).val($(this).find("input").val());
				$("#customer_group_search_dialog"+opId).addClass("hide");
				$("#mask").toggle();
			}).hover(function(){
				$(this).css("background-color","#FFF68F");
			},function(){
				$(this).css("background-color","#EEE");
			});
		});
}

//所属集团弹出清空按钮方法
function groupCleanButClick(opId){
		$("#customer_group"+opId).val("");
		$("#customer_group_hidden"+opId).val("");
		$("#customer_group_search_dialog"+opId).addClass("hide");
		$("#mask").toggle();
}

//所属集团弹出取消按钮方法
function groupCancelButClick(opId){
		$("#customer_group_search_dialog"+opId).addClass("hide");
		$("#mask").toggle();
}


//--------------------------------------------所属集团公用方法封装---结束-----------------------------------

//--------------------------------------------显示提示信息封装---------------------------------------------

//显示提示信息方法
function showMsg(text){
	$("#mask").toggle();
	$("#message_content").text("正在进行"+text+"操作，请稍等……");
	$("#message_icon").addClass("message_submit");
	$("#message").toggle();
}
//隐藏提示信息方法
function hideMsg(){
	$("#mask").toggle();
	$("#message").toggle();
}
//--------------------------------------------显示提示信息封装---结束--------------------------------------------

//--------------------------------------------显示隐藏标题信息方法封装-----------------------------------------------

function changeHide(hideId,iconId){//交替显示隐藏方法，第一个参数为被隐藏的id，第二个参数为显示隐藏图片的id
	var $opId= $("#"+hideId),$chaId=$("#"+iconId);
	$opId.toggleClass("hide");
	$chaId.toggleClass("open_icon").toggleClass("close_icon");
}
function setShow(hideId,iconId){//显示方法
	var $opId= $("#"+hideId),$chaId=$("#"+iconId);
	if($opId.hasClass("hide")){
		$opId.removeClass("hide");
		$chaId.addClass("open_icon").removeClass("close_icon");		
	}
}
function setHide(hideId,iconId){//隐藏方法
	var $opId= $("#"+hideId),$chaId=$("#"+iconId);
	if(!$opId.hasClass("hide")){
		$opId.addClass("hide");
		$chaId.removeClass("open_icon").addClass("close_icon");		
	}
}
//--------------------------------------------显示隐藏标题信息方法封装---结束-----------------------------------------------


//--------------------------------------------片区方法封装----------------------------------------------------------------
function getAreaLevel(contentId,level){
	var areaObj = {
			areaId:""
	};
	if(level == 1){
		var areaLevel1 = $("#customer_areaLevel1"+contentId).val();
		if(areaLevel1 == null){
			areaLevel1 = -1;
		}
		areaObj.areaId = areaLevel1;
	}else if(level == 2){
		var areaLevel2 = $("#customer_areaLevel2"+contentId).val();
		if(areaLevel2 == null){
			areaLevel2 = -1;
		}
		areaObj.areaId = areaLevel2;
	}
	ovtAjaxMethod(ajaxBusPath+"ajaxShowRelatedAreas.do",areaObj,function(data){
		var option = "";
		$(data).each(function(n,value){
			option = option + value ;
		});
		if(level == 1){
			$("#customer_areaLevel2"+contentId).find("option[value!=-1]").remove();
			$("#customer_areaLevel2"+contentId).append(option);
			getAreaLevel(contentId,2);
		}else if(level == 2){
			$("#customer_areaLevel3"+contentId).find("option[value!=-1]").remove();
			$("#customer_areaLevel3"+contentId).append(option);
		}
	});
}

//--------------------------------------------片区方法封装---结束---------------------------------------------------------

//--------------------------------------------确认收费项信息-----------------------------------------------------------

//定义营业类别
var BUSINESS_TYPE = {
		OPEN_ACCOUNT_CODE:"101",//开户
		TRANSFEROR_ACCOUNT_CODE:"102",//过户
		CHANGE_ADDR_CODE:"103",//移机
		SUSPEND_CODE:"104",//报停
		REOPEN_CODE:"105",//开通
		ADD_STB_CODE:"106",//增机/增卡
		ORDER_CODE:"107",//订购
		CANCEL_ORDER_CODE:"108",//退订
		PAYMENT_CODE:"109",//缴费
		REPOT_LOSS_CODE:"110",//挂失
		REPORT_FIND_CODE:"131",//智能卡找回 YanxuLiu 20120328
		CHANGE_INFO_CODE:"111",//信息变更
		REPAIR_CODE:"112",//保修
		SUPPLY_VOUCHER_CODE:"113",//补证
		SUPPLY_CARD_CODE:"114",//补卡
		SUPPLY_PRINT_CODE:"115",//票据补打
		DESTROY_CODE:"116",//注销
		CHANGE_STB_CODE:"117",//换机
		USER_BLACK_LIST_CODE:"118",//设为黑名单
		CANCEL_BLACK_LIST_CODE:"119",//取消黑名单
		CARD_RECYCLE_CODE:"120",//卡回收
		STB_RECYCLE_CODE:"121",//盒回收
		CHANGE_CARD_CODE:"122",//换卡
		EQU_PROMOTION_CODE:"219",//设备服务升级
		EQU_REPAIR_FEE_CODE:"220" // 费用补交
}

//var confirmShow = 0;//实际显示收费项确认信息，0为显示，其他为不显示

//将下列参数放到此处定义，可以处理关闭显示确认项操作
var businessType = "";//页面保存营业类别
var ajaxResData = new Object();//页面保存请求数据
var ajaxConfirmPath = "";//页面保存ajax请求路径
var $ajaxTriggerBut;//页面保存模拟点击按钮
var $confirmCallback;
var $confirmCallbackOption;
var $hideDiv;//页面保存隐藏显示
var ajaxConfirmEquDesc = "";//收费项传递设备信息使用

//收费项页面点击继续按钮操作
function confirmBut(contentId){
	$("#showRegister").addClass("hide");
	seacherUser(contentId);
}

//开户时页面点击保存按钮操作 add by 2012-10-30 jhg
function confirmRegisterBut(contentId){
	//得到收费项
	var code = "" ;
	var userId = "";
	// modify by jhg 2013-01-18 开户时先将“保存”按钮置灰，
	// 开户成功或者失败时将按钮恢复，已解决系统响应缓慢时多次点击保存产生重复数据的问题
	$("#confirmBut").attr("disabled",true);
	ajaxResData.confirmCost = confirmContinue(contentId);
	ovtAjaxMethod(ajaxConfirmPath,ajaxResData,function(data){
		$("#confirmBut").attr("disabled",false);
		if($confirmCallback != undefined){
			if($confirmCallbackOption!=undefined && $confirmCallbackOption.operId == 'addEqu'){
				
			}
		}
		code = (data.code.split("_"))[0] ;
		userId = (data.code.split("_"))[1];
		if(code == '1'){
			alert(data.value);
		}else{
			var skipFlag = false;
			if(commonFunc.operConfirm1("equCommand",data.value + "是否进入缴费页面进行缴费!")){
				skipFlag = true;
			}
			if(skipFlag) {
				confirmBut(userId);
			}else{
				//模拟点击刷新按钮
				if($ajaxTriggerBut)
					$ajaxTriggerBut.trigger("click");
				if($confirmCallback != undefined){
					$confirmCallback($confirmCallbackOption);
					$confirmCallback = undefined;
					$confirmCallbackOption =undefined;
				}
			}
		}
	});
	//2012-01-17 lyj
	if($hideDiv!=undefined && code !='1'){
		$hideDiv.addClass("hide");
		$("#mask").toggle();
	} else if($hideDiv==undefined) {
		$("#mask").toggle();
	}
}


//收费项页面点击继续按钮操作
function confirmContinueBut(contentId){
	//得到收费项
	var code = "" ;
	ajaxResData.confirmCost = confirmContinue(contentId);
	ovtAjaxMethod(ajaxConfirmPath,ajaxResData,function(data){
		if($confirmCallback != undefined){
			if($confirmCallbackOption!=undefined && $confirmCallbackOption.operId == 'addEqu'){
				
			}
			
		}
		alert(data.value);
		if(data.code == "0"){
			//模拟点击刷新按钮
			if($ajaxTriggerBut)
				$ajaxTriggerBut.trigger("click");
			if($confirmCallback != undefined){
				$confirmCallback($confirmCallbackOption);
				$confirmCallback = undefined;
				$confirmCallbackOption =undefined;
			}
		}
		
		code = data.code ;
	});
	//2012-01-17 lyj
	if($hideDiv!=undefined && code !='1'){
		$hideDiv.addClass("hide");
		$("#mask").toggle();
	} else if($hideDiv==undefined) {
		$("#mask").toggle();
	}
//	if($hideDiv!=undefined ){
//		$hideDiv.addClass("hide");
//	}
//	$("#mask").toggle();

}

//封装收费项数据
function confirmFee(contentId,busiType,newFlag){
	
	var $confirmDiv = $("#confirm_cost_div"+contentId);
//	$("#mask").toggle();
	var confirmCost = "";//返回值
	var ajaxRes = {
			businessType:busiType,
			equDesc:ajaxConfirmEquDesc
	};
	ovtAjaxMethod(ajaxBusPath+"ajaxConfirmCost.do",ajaxRes,function(data){
		if(data.code!='0'){
			alert(data.value);
			return ;
		}
		var $costTable = $("#confirm_cost_table"+contentId);
		var tableContent;
		var trLength = $(data.value).length;
		var isShow = true;//如果为空则不显示收费项
		if(trLength == 0){
			isShow = false;
		}else{
			tableContent = "<tr><th>项目&nbsp;&nbsp;&nbsp;&nbsp;</th><th>单价(单位:元)</th><th>数量</th><th>合计(单位:元)</th><th>出入标志</th></tr>";
			var readOnly = '';
			var tdDis = '';
			$(data.value).each(function(n,value){
				if(value.canEdit == WebInitParameter.FEE_ITEM_DEFINE_READONLY){
					readOnly = 'readOnly';
				}else{
					readOnly = '';
				}
				if(value.display != WebInitParameter.DISPLAY_FEE_ITEM){
					tdDis = '<tr>';
				}else{
					tdDis = '<tr class = \'hide\'>'
				}
				//2013-6-7 设备出入标志，默认为1 设备出售，自购设备记为2 yzy
				var valueFlag = value.flag==''?"1":value.flag;
				tableContent = tableContent + tdDis + "<td>"+value.feeName+"<input type='hidden' value='"+value.id+":"+value.feeCode+":"+value.parentId+":"+value.feeName+":"+value.itemType+":"+value.remark+":"+value.isFee+"'/></td><td><input type= 'text' class = 'input_text' size='3' maxlength='5' value ='"+Number(value.defaultValue).toFixed(2)+"' "+readOnly+"/></td><td><input type= 'text' class = 'input_text'  size='3' maxlength='5'  value ='"+value.count+"'/></td><td>"+(Number(value.defaultValue)*Number(value.count)).toFixed(2)+"</td><td><input type='text' value='"+valueFlag+"'/></td></tr>";
			});
			$costTable.empty()
			.append(tableContent)
			.find("input[type=text]")
			.focus(function(){
				$(this).toggleClass("text_focus");
			})
			.blur(function(){
				$(this).toggleClass("text_focus");
			})
			.keyup(function(){
				$(this).parent().parent().find("td").eq(3).text((Number($(this).parent().parent().find("td").eq(1).find("input").val())*Number($(this).parent().parent().find("td").eq(2).find("input").val())).toFixed(2));
			});
			//使用propertychange有可能会有问题，多次重复执行
//			.bind("propertychange",function(o){
//				$(this).parent().parent().find("td").eq(3).text(Number($(this).parent().parent().find("td").eq(1).find("input").val())*Number($(this).parent().parent().find("td").eq(2).find("input").val()));
//			});
			//清空收费项设备信息
			ajaxConfirmEquDesc = "";
			// 增加缴费权限控制代码 add by jhg
			paymentRight(contentId,data.other);
		}
		//显示收费项
		if(WebInitParameter.CONFIRM_SHOW == 0 && busiType!=undefined && isShow){
			showConfirm(contentId);
		}else{
			if(newFlag !=undefined && newFlag == "new"){
				confirmRegisterBut(contentId);
			}else{
				confirmContinueBut(contentId);
			}
		}
	});
}

// add by jhg 控制缴费券账户与点账户的权限
function paymentRight(contentId,value){
	var payRights = "";
	if(value != undefined && value.length >0){
		payRights = value.split(",");
		minusValueFlag = payRights[0];
		couponValueFlag = payRights[1];
		presentValueFlag = payRights[2];
		// 如果没有券账户输入功能
		if(couponValueFlag == 'false'){
			$("#payment_coupon_input"+contentId).attr("disabled",true);
		}else{
			$("#payment_coupon_input"+contentId).attr("disabled",false);
		}
		// 如果没有点账户输入功能
		if(presentValueFlag == 'false'){
			$("#payment_present_input"+contentId).attr("disabled",true);
		}else{
			$("#payment_present_input"+contentId).attr("disabled",false);
		}
	}
}
//显示收费项函数
function showConfirm(contentId){
	var $confirmDiv = $("#confirm_cost_div"+contentId);
	$confirmDiv.css("top",$("body").height()/4+"px");
	$confirmDiv.css("left",$("body").width()/4+"px");
	$confirmDiv.find(".font14").text(WebInitParameter.MSG_INFO_C04);
	$confirmDiv.removeClass("hide");
}

//收费项取消按钮
function confirmCancel(contentId){
	$("#confirm_cost_div"+contentId).addClass("hide");
//	$("#mask").toggle();
	if(!$hideDiv)
		$("#mask").toggle();
}
//得到所有收费项信息
function confirmContinue(contentId){
	//得到缴费确认信息
	var $costTrs = $("#confirm_cost_table"+contentId).find("tr:not(:first-child)");
	var ret = "";
	$costTrs.each(function(){
		$tds = $(this).find("td");
		ret = ret + $tds.eq(0).find("input").val()+":"+$tds.eq(1).find("input").val()+":"+$tds.eq(2).find("input").val();
		//增加设备出入标志，默认为1 设备出售，自购设备记为2   2013-6-7  yzy
		ret = ret + ":" + $tds.eq(4).find("input").val();
		ret = ret + "&";
	});
	$("#confirm_cost_table"+contentId).empty();//20110322 清除掉原有信息
	$("#confirm_cost_div"+contentId).addClass("hide");
	return ret;
}


//--------------------------------------------确认收费项信息---结束----------------------------------------------------

//--------------------------------------------用户账户信息---------------------------------------------------------
var CUSTOMER_ACCOUNT_HIS_INVOICE_STATUS_UNPRINT = 0;
var CUSTOMER_ACCOUNT_HIS_INVOICE_STATUS_PRINT = 1;

/*通过ajax单独获取账户信息 */
function flushCustomerAccount($account,contentId,userId){
	var content = "";
	var resAccount = {
			customer_id:userId
	};
	ovtAjaxMethod(ajaxRegPath+"ajaxGetUserAccount.do",resAccount,function(data){
		if(data.code == '0'){
			customerAccountInit($account,contentId,data.value);
		}else{
			alert(data.value);
		}
	});
}
/*将数据添加到相应位置*/
function customerAccountInit($account,contentId,data){
	var content="";
//	content = content + "<table class='account_table_border'><tr><td><div><span class = 'accountHead'>账号:冻结金额</span><span>"+data.accountNo+"</span>&nbsp;&nbsp;<span class = 'accountHead'>账户状态:</span><span id='customer_account_status"+contentId+"'>"+data.status+"</span>";
//	content = content + "<div><span class = 'accountHead'>账户余额:</span><span id='customer_account_balance"+contentId+"'>"+data.balance+"元</span>&nbsp;&nbsp;<span class = 'accountHead'>冻结金额:</span><span id='customer_account_lockMoney"+contentId+"'>"+data.lockMoney+"元</span>&nbsp;&nbsp;<span class = 'accountHead'>赠送金额:</span><span id='customer_account_presentMoney"+contentId+"'>"+data.presentMoney+"元</span></div>";
//	content = content + "<div><span class = 'accountHead'>最后变动时间:</span><span>"+data.modifyDate+"</span></div></td></tr></table>";
	content = content + "<table class='account_table_border'><tr><td><div><span class = 'accountHead'>可用余额:</span><span><input type='text' class='text_readonly_money moneyTotal' id='customer_account_useable_money"+contentId+"' value='"+(Number(data.balance)+Number(data.coupon)+Number(data.presentMoney)-Number(data.lockMoney)).toFixed(2)+"' />元</span>&nbsp;&nbsp;<span class = 'accountHead'>账户余额:</span><span><input type='text' class='text_readonly' id='customer_account_money"+contentId+"' value='"+(Number(data.balance)+Number(data.coupon)+Number(data.presentMoney)).toFixed(2)+"' />元</span>&nbsp;&nbsp;<span class = 'accountHead'>冻结金额:</span><span><input type='text' class='text_readonly' id='customer_account_lockMoney"+contentId+"' value='"+Number(data.lockMoney).toFixed(2)+"' />元</span>&nbsp;&nbsp;<span class = 'accountHead'>账户状态:</span><span><input id='customer_account_status"+contentId+"' value='"+data.status+"' class='text_readonly'/></span>";
	content = content + "<div><span class = 'accountHead'>现金账号:</span><span><input id='customer_account_balance"+contentId+"' value='"+Number(data.balance).toFixed(2)+"' type='text' class='text_readonly'>元</span>&nbsp;&nbsp;<span class='accountHead'>券账号:</span><span><input type='text' class='text_readonly' id='customer_account_coupon"+contentId+"' value='"+Number(data.coupon).toFixed(2)+"' />元</span>&nbsp;&nbsp;<span class = 'accountHead'>点账号:</span><span><input type='text' class='text_readonly' id='customer_account_presentMoney"+contentId+"' value='"+Number(data.presentMoney).toFixed(2)+"'>元</span>&nbsp;&nbsp;<span class = 'accountHead'>最后变动时间:</span><span><input type='text' class='text_readonly' style='width:120px;' value='"+data.modifyDate+"' /></span></div>";
	content = content + "<div><input id='customer_account_accountNo"+contentId+"' value='"+data.accountNo+"' type='hidden'/></div></td></tr></table>";
	$account.empty().append(content).find("span").addClass("accountSpan");
	//只读属性
	$(".text_readonly").attr("readOnly",true);
}
//--------------------------------------------用户账户信息----结束-------------------------------------------------

//--------------------------------------------缴费信息------------------------------------------------------------
//var ORDER_STATUS_STOP = 4;//欠费停用，用在订单状态判断中，在封装订购隐藏信息时，使用该常量进行封装


/*封装未缴费账单明细*/
function unpaidDetailBill(contentId,customerId){
	var ajaxProRes = {
			customer_id:customerId
	};
	ovtAjaxMethod(ajaxRegPath+"ajaxGetUserUnpaidDetailBills.do",ajaxProRes,function(data){
		var content = "" ;
//		content = content + "<div class='payment_width payment_inner_div'><div><table width='100%' class='tableBorder' id='payment_unpaidDetailBill_table_head"+contentId+"'><tr><th width='25%'>收费项</th><th width='10%'>单价</th><th width='10%'>数量</th><th width='10%'>发生费用</th><th width='10%'>优惠费用</th><th width='10%'>实际费用</th><th width='25%'>产生时间</th></tr></table></div>";
//		content = content + "<div><table class='tableBorder' width='100%'  id='payment_unpaidDetailBill_table"+contentId+"'></table></div>";
//		content = content + "<div id='payment_paymentItemList"+contentId+"'></div>";
//		content = content + "<div><span>本次应缴费合计:</span><input readOnly='readOnly' id='payment_upaid_detail_bills_total"+contentId+"' class='text_readonly' value='0.0'/><span>元</span></div></div>";
//		$("#payment_unpaidDetailBill_div"+contentId).empty().append(content);
//		content = "";
		var totalM = 0.0;
		if(data.code !='0'){
			content = content + "<tr><td colspan = '7'>获取缴费账单失败</td></tr>";
		}else{
			if($(data.value).length == 0){
				content = content + "<tr><td colspan = '7'>目前没有需要缴费的账单</td></tr>";
			}else{
				$(data.value).each(function(n,value){
					content = content + "<tr><td width='25%'><input type='hidden' value='"+value.feeItemId+"' />"+value.feeItemName+"</td><td width='10%'>"+Number(value.unitPrice).toFixed(2)+"</td><td width='10%'>"+value.count+"</td><td width='10%'>"+Number(value.occurFee).toFixed(2)+"</td><td width='10%'>"+Number(value.rebateFee).toFixed(2)+"</td><td width='10%'>"+Number(value.fee).toFixed(2)+"</td><td width='25%'>"+value.createDate+"</td></tr>";
					totalM = totalM + Number(value.fee);
				});
//				content = content + "<tr><td>总计:</td><td colspan = '5' class='account_input_align'>"+totalM.toFixed(2)+"</td><td>&nbsp;</td></tr>";
			}
		}
		$("#payment_unpaidDetailBill_table"+contentId).empty().append(content);
		$("#payment_unpaidDetailBill_table"+contentId).after("<input id='payment_unpaidDetailBill_total_hidden"+contentId+"' type='hidden' value='"+totalM+"'/>");
		//增加隐藏账单明细汇总信息
		commonFunc.upaidTotal(contentId,0,totalM);
		commonFunc.flushTotalMoney(contentId,0,totalM);
		
		
		//测试滚动条对齐
		var orderInfoTableParent = $("#payment_unpaidDetailBill_table"+contentId).parent();
		if(orderInfoTableParent.height()> Number(WebInitParameter.BILL_DETAIL_HEIGHT)){
			orderInfoTableParent.css("height",WebInitParameter.BILL_DETAIL_HEIGHT+"px");
			orderInfoTableParent.css("overflow-y","scroll");
			orderInfoTableParent.width(orderInfoTableParent.width()+17);
		}
	});
	
	
}



/*封装订购信息列表*/
function paymentOrderInfo(contentId){
	payCustomerId = contentId;
	//刷新隐藏信息
//	flushOrder2Var(contentId,customerId,paymentOrderInfo);
	
	//画出显示订购信息用表格
	var productOrderTableHead = "<div class='payment_width payment_inner_div'><div><table width='100%' id='payment_orderInfo_table_head"+contentId+"'  class='tableBorder'>" +
	"<tr><!--th>选择</th--><th width='70%'>详细信息</th><!--th>产品简称</th--><th width='20%'>商品名称</th><!--th>类型</th><th>内容</th--><th width='10%'>计费策略</th></tr>" +
	"</table></div>";

	var productOrderDiv = "<div><table id='payment_orderInfo_table"+contentId+"'  class='tableBorder' style='width:100%'>" +
			"</table></div>";
	productOrderDiv = productOrderDiv + "<span></span><span id = 'payment_order_stop_checkBar"+contentId+"'></span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span>产品订购所需合计:</span><input type='text' id='order_money"+contentId+"' class='text_readonly'/>元</div>";//选择栏
	
	$("#payment_orderInfo"+contentId).empty().append(productOrderTableHead + productOrderDiv);
	//得到订购隐藏信息
	
	//测试滚动条对齐
//	$("#payment_orderInfo_table"+contentId).parent().width($("#payment_orderInfo_table"+contentId).parent().width()+17);
	
	var $productVar = $("#productVar"+contentId);


	var productInfoContent = "";
//	alert($productVar.html());
	$productVar.children("tbody").children("tr").each(function(){
//		var $varTds = $(this).find("td");
		var $varTds = $(this).children("td");
//		alert("$varTds.eq(0).text():"+$varTds.eq(0).text());
		productInfoContent = productInfoContent + "<tr>";
//		productInfoContent = productInfoContent + "<td><input type='checkbox' value='"+$varTds.eq(0).text()+"'/></td>";
//		productInfoContent = productInfoContent + "<td>"+$varTds.eq(1).html()+"</td>";
//		productInfoContent = productInfoContent + "<td>"+$varTds.eq(10).html()+"</td>";
		productInfoContent = productInfoContent + "<td width='70%'>"+$varTds.eq(10).html()+"</td>";
//		productInfoContent = productInfoContent + "<td>"+$varTds.eq(2).text()+"</td>";
		productInfoContent = productInfoContent + "<td width='20%'>"+$varTds.eq(3).text()+"</td>";
//		productInfoContent = productInfoContent + "<td>"+$varTds.eq(4).text()+"</td>";
//		productInfoContent = productInfoContent + "<td>"+$varTds.eq(5).text()+"</td>";
		productInfoContent = productInfoContent + "<td width='10%'>"+$varTds.eq(6).text()+"</td>";
		productInfoContent = productInfoContent + "</tr>";
	});
	$("#payment_orderInfo_table"+contentId).find("tr:not(:first-child)").remove();
	$("#payment_orderInfo_table"+contentId).append(productInfoContent);
	//增加选择栏
	$("#payment_order_stop_checkBar"+contentId).checkGroup("OrderStop"+contentId,$("#payment_orderInfo_table"+contentId),totalOrderMoney,{contentId:contentId});
	
	// 汇总冻结金额
	totalOrderMoney({contentId:contentId});
	$("#payment_orderInfo_table"+contentId).children("tbody").children("tr").find("input").change(function(){
		totalOrderMoney({contentId:contentId});
	});
	
	// start 用户改变勾选时，封装订购信息，将订购信息保存到备注框里     yzy 2012-3-2
	$("#payment_order_stop_checkBar"+contentId).checkGroup("OrderStop"+contentId,$("#payment_orderInfo_table"+contentId),addOrderRemark,{contentId:contentId});
	addOrderRemark({contentId:contentId});
	$("#imitate_payment_input"+contentId).change(function(){
		//刷新总合计金额
    	commonFunc.flushTotalMoney(contentId,-999,$("#imitate_payment_input"+contentId).val());
		addOrderRemark({contentId:contentId});
	});
	$("#payment_orderInfo_table"+contentId).children("tbody").children("tr").find("input").change(function(){
		addOrderRemark({contentId:contentId});
	});
	// end 用户改变勾选时，封装订购信息，将订购信息保存到备注框里     yzy 2012-3-2
	
	//隐藏不可选择的订购信息
	$("#payment_orderInfo_table"+contentId).children("tbody").children("tr").each(function(){
		var $varTds = $(this).children("td");
//		alert($varTds.eq(0).html());
//		alert($varTds.eq(0).find("tr:not(:first-child)").length);
		$varTds.eq(0).find("tr:not(:first-child)").each(function(){
//			alert($(this).find("td").eq(0).find("input").attr("disabled"));
			if($(this).find("td").eq(0).find("input").attr("disabled")){
				$(this).remove();
			}
		});
		if($varTds.eq(0).find("tr:not(:first-child)").length==0){
			$(this).remove();
		}
	});
	//更新汇总信息
//	commonFunc.flushTotalMoney(contentId,"0",$("#order_money"+contentId).val());
	
	//测试滚动条对齐
	var orderInfoTableParent = $("#payment_orderInfo_table"+contentId).parent();
	if(orderInfoTableParent.height()>Number(WebInitParameter.ORDER_UNNORMAL_HEIGHT)){
		orderInfoTableParent.css("height",WebInitParameter.ORDER_UNNORMAL_HEIGHT+"px");
		orderInfoTableParent.css("overflow-y","scroll");
		orderInfoTableParent.width(orderInfoTableParent.width()+17);
	}

}

// 
function startCDayFunc(){
	var startMoniTimeStr = $dp.cal.getNewDateStr();
	var contentId = payCustomerId;
	addOrderRemark({contentId:contentId,timeStartStr:startMoniTimeStr});
}

function clearStartDayFunc(){
	var contentId = payCustomerId;
	addOrderRemark({contentId:contentId,clearStartStr:'clear'});
}
function endCDayFunc(){
	var endMoniTimeStr = $dp.cal.getNewDateStr();
	var contentId = payCustomerId;
	addOrderRemark({contentId:contentId,timeEndStr:endMoniTimeStr});
}
function clearEndDayFunc(){
	var contentId = payCustomerId;
	addOrderRemark({contentId:contentId,clearEndStr:'clear'});
}

/*待开通金额汇总*/
function totalOrderMoney(option){
	var contentId = option.contentId;
	var totalMoney = 0;
	$("#payment_orderInfo_table"+contentId).children("tbody").children("tr").each(function(){
		$(this).children("td").eq(0).find("tr:has(:checked)").each(function(){
//			$(this).find("td").eq(3).text("1");
			totalMoney = totalMoney + Number($(this).find("td").eq(4).text());
		});
	});
	var oldValue = (Number($("#order_money"+contentId).val())).toFixed(2);
	$("#order_money"+contentId).val(totalMoney.toFixed(2));
	// 当现金账号充值金额为负值时，不管用户是否选择订购服务作为缴费项，总合计金额为现金账号金额 2012-10-24 liuxu
	if (Number($("#payment_normal_input"+contentId).val()) < 0) { 
		return;
	}
	
	// 获得缴费时是否计算可用余额开关 2012-10-25 liuxu
	if (useableMoneyFlag == "1") {
		// 判断可用余额设置现金账号和总合计默认金额 2012-10-24 liuxu
		var needTotalMoney = (Number((Number($("#order_money"+contentId).val())).toFixed(2)
				- (Number($("#customer_account_useable_money"+contentId).val())).toFixed(2)
				- (Number($("#payment_coupon_input"+contentId).val())).toFixed(2)
				- (Number($("#payment_present_input"+contentId).val())).toFixed(2))).toFixed(2);	
		var oldNnormalMoney = (Number($("#payment_normal_input"+contentId).val())).toFixed(2);
		// 可用余额不足
		if(needTotalMoney > 0) {
			$("#payment_normal_input"+contentId).val(needTotalMoney);
		}
		// 可用余额足够
		else {
			needTotalMoney = 0.00;
			$("#payment_normal_input"+contentId).val(0.00);
		}
		commonFunc.flushTotalMoney(contentId,oldNnormalMoney,needTotalMoney);
	} else {
		var normalInputValue = (Number($("#payment_normal_input"+contentId).val())-oldValue + totalMoney).toFixed(2);
	//	$("#payment_normal_input"+contentId).val(totalMoney.toFixed(2));
		$("#payment_normal_input"+contentId).val(normalInputValue);
		//刷新总合计金额
		commonFunc.flushTotalMoney(contentId,oldValue,totalMoney.toFixed(2));
	}
}

/* start 用户改变勾选时，封装订购信息，将订购信息保存到备注框里     yzy 2012-3-2*/
function addOrderRemark(option){
	var contentId = option.contentId;
	var startTimeStr = option.timeStartStr;
	var endTimeStr = option.timeEndStr;
	var clearStartFlag = option.clearStartStr;
	var clearEndFlag = option.clearEndStr;
	var remark = '';//保存备注信息
	var userType = $("#customer_customerType"+contentId).val();//用户类型信息
	var firstCardMsg;//集团用户需要显示第一张卡信息
	var ajPros = new Array();
	/*2*/
	$("#payment_orderInfo_table"+contentId).children("tbody").children("tr").each(function(){
		var pron = $(this).children("td").eq(1).text();//商品名称
		var pros = $(this).children("td").eq(2).text();//收费策略
		pros = pros.substring(pros.indexOf('-')+1,pros.length);//去除策略名称
		var $orderMsg = $(this).children("td").eq(0).find("tr:has(:checked)");
		if( '1'==userType ){
			var productsMsg;
			$orderMsg.each(function(){//集团用户只显示单卡 2012-6-2 yzy
				var card = $(this).find("td").eq(1).text();//智能卡号
				if( firstCardMsg == undefined ){
					firstCardMsg = card.substring(0,card.indexOf(" "))+" 等";
				}
				if(productsMsg == undefined){//一个商品只取一次
					productsMsg = "  " + pron + " (" + pros + ")\r\n";//产品策略信息
				}
				//统计订购卡的数量
				var ind=true;
				for(i=0;i<ajPros.length;i++){
					if(ajPros[i]==card){//存在卡
						ind = false;
						i = ajPros.length;//return
					}
				}
				if(ind) ajPros.push(card);
			});
			if(productsMsg != undefined)//购买了产品
				remark += productsMsg;//产品策略信息
		}else{												//个人用户
			$orderMsg.each(function(){
				var card = $(this).find("td").eq(1).text();//智能卡号
				card = card.replace(/\s/g,'');
				card = card.replace(" ",'');//ie下使用，此处空格要使用拷贝方式，否则无法匹配。
				var count  = $(this).find("td").eq(3).text();//订购数量2012-6-15 yzy
				var start = $(this).find("td").eq(6).text();//生效时间
				var end = $(this).find("td").eq(7).text();//失效时间
				var remarktt = "  " + pron + "（" + pros + " x "+count+" ，" + start + " 到 " + end + "）\r\n";
				var ajPro	= {
						card : '',
						detail : ''
					};
				var ind = -1; //以下部分查找该智能卡号是否已经含有订购信息，如果已经存在，则把订购信息放到原有卡的后面。
				for(var i=0;i<ajPros.length;i++){
					var nowajPro = ajPros[i];
					if(nowajPro.card == card){
						ind = i;//返回已经存在的订购信息索引
						i = ajPros.length;//return func
					}
				}
				if(ind != -1){//card alridy exist
					ajPros[ind].detail = ajPros[ind].detail + remarktt;
				}else{
					ajPro.card = card;
					ajPro.detail = remarktt;
					ajPros.push(ajPro);
				}
			});
		}
	});
	if( '1'==userType ){				//集团用户只显示卡数量和订购的产品
		if(ajPros.length > 0)
			remark = firstCardMsg + "共" + ajPros.length + "张智能卡\r\n" + remark;
		else
			remark = '';
	}else{								//居民用户保存卡及订购信息 2012-6-2 yzy
		while( ajPros.length > 0 ){
			var ajPro = ajPros.shift();//取出数，其他元素前移
			remark += ajPro.card+'\r\n';
			remark += ajPro.detail;
		}
	}
	/*2*/
	// add imitate infos to remark liuxu 2012/5/16
	if($("#customer_businessTypes"+contentId).val() == 0) {
	remark += "模拟电视收费:\r\n" 
	var oldStartTimeStr = $("#imitate_start_date"+contentId).val();
	var oldEndTimeStr = $("#imitate_end_date"+contentId).val();
	if(clearStartFlag == undefined && (oldStartTimeStr != "" || startTimeStr != undefined)){
		if(startTimeStr != undefined && oldStartTimeStr != startTimeStr){
			remark += " 开始时间:"+ startTimeStr;
		}else if(startTimeStr == undefined){
			remark += " 开始时间:"+ oldStartTimeStr;
		}else{
			remark += " 开始时间:"+ startTimeStr;
		}
	}
	if(clearEndFlag  == undefined && (oldEndTimeStr != "" || endTimeStr != undefined)){
		if(endTimeStr != undefined && oldEndTimeStr != endTimeStr){
			remark += " 结束时间:"+ endTimeStr;
		}else if(endTimeStr == undefined){
			remark += " 结束时间:"+ oldEndTimeStr;
		}else{
			remark += " 结束时间:"+ endTimeStr;
		}
	}
	remark += " 收费金额:" + $("#imitate_payment_input"+contentId).val() + " 元\r\n";
	}
	//备注字段的限制，大小不超过512，汉字不能超过256
	if(remark.length>256){
		remark = remark.substring(0, 254);
		remark += '..';
	}
	//刷新备注
	commonFunc.flushOrderRemark(contentId,remark);
}
/* end 用户改变勾选时，封装订购信息，将订购信息保存到备注框里     yzy 2012-3-2*/

/*封装缴费收费项*/
commonFunc.paymentCost = function(contentId,customerId){
	var ajaxRes = {
			businessType:BUSINESS_TYPE.PAYMENT_CODE
	};
	ovtAjaxMethod(ajaxBusPath+"ajaxConfirmCost.do",ajaxRes,function(data){
		var tableContent = "<table>";
		var trsRows = 0;
		var feeItemNormalCount = 0;
		var size = $(data.value).length;
		var baseServiceStr = WebInitParameter.BASE_SERVICE_FEE;//包含有第二个输入框的特殊收费项
		var baseServiceArr = baseServiceStr.split(",");
		var specificFeeItemArr = new Array();
		if($(data.value).length==0)
			return;
		$(data.value).each(function(n,value){
			for(var i = 0; i < baseServiceArr.length; ++i){
				if(value.feeCode == baseServiceArr[i]){
					specificFeeItemArr.push(value);//如果有特殊收费项则，保存，并单独处理
					size -= 1;
					return;
				}
			}
			if(feeItemNormalCount%3 == 0){
				tableContent = tableContent + "<tr>";
				trsRows += 1;
			}
			tableContent = tableContent + "<td><input type='checkbox' value ='"+value.id+"'/></td><td>"+value.feeName+":<input type='hidden' value='"+value.id+":"+value.feeCode+":"+value.parentId+":"+value.feeName+":"+value.itemType+":"+value.remark+":"+value.isFee+"'/></td><td><input type= 'text' class = 'input_text_short account_input_align totalMoneyInput normalMoneyInput'  value ='"+Number(value.defaultValue).toFixed(2)+"' disabled='disabled'/></td><td>元</td>";
			if(feeItemNormalCount%3 == 2 || feeItemNormalCount == size-1){
				tableContent = tableContent + "</tr>";
			}
			feeItemNormalCount += 1;
		});
		// 增加缴费权限控制代码 add by jhg
		paymentRight(contentId,data.other);
		//处理单独保存的收费项
		for(var i = 0; i < specificFeeItemArr.length; ++i){
			var value = specificFeeItemArr[i];
			tableContent = tableContent + "<tr>";
			tableContent = tableContent + "<td><input type='checkbox' value ='"+value.id+"' /></td><td>"+value.feeName+":<input type='hidden' value='"+value.id+":"+value.feeCode+":"+value.parentId+":"+value.feeName+":"+value.itemType+":"+value.remark+":"+value.isFee+"'/></td><td><input type= 'text' class = 'input_text_short account_input_align totalMoneyInput baseServiceMoneyInput'  value ='"+Number(value.defaultValue).toFixed(2)+"' disabled='disabled'/></td><td>元</td><td colspan='3'><input type = 'text' maxlength = '30' class = 'input_text account_input_align baseServiceMoneyInput'  disabled='disabled'/></td><td></td>";
			tableContent = tableContent + "</tr>";
		}
		tableContent = tableContent + "</table>";

		tableContent = tableContent + "<input id = 'payment_paymentItemNormalTrsRows"+contentId+"' type = 'hidden' value='"+trsRows+"'/>";
		
		$("#payment_paymentItemList"+contentId).empty().append(tableContent);
		$("#payment_paymentItemList"+contentId).find(".input_text_short").clickChangeColor("text_focus");
		$("#payment_paymentItemList"+contentId).find(".input_text").clickChangeColor("text_focus");
		//增加滚动条
		var paymentFeeItemDiv = $("#payment_paymentItemList"+contentId);
		if(paymentFeeItemDiv.find("table").find("tr").length > WebInitParameter.PAYMENT_FEE_ITEM_SELECTED_COUNT){
			paymentFeeItemDiv.css("height",Number(WebInitParameter.PAYMENT_FEE_ITEM_SELECTED_COUNT)*22.5+"px");//计算高度
			paymentFeeItemDiv.css("overflow-y","scroll");
//			paymentFeeItemDiv.width(paymentFeeItemDiv.width()+17);
		}

		//增加选择栏
		$("#payment_fee_item_checkBar"+contentId).checkGroup("FeeItem"+contentId,$("#payment_paymentItemList"+contentId).find("table"),commonFunc.feeItemTotal,{contentId:contentId});

		//并入汇总，修改汇总规则，增加勾选，只有勾选的才会汇总，默认都是不勾选的。
		var money = 0;
		$("#payment_paymentItemList"+contentId).find(".totalMoneyInput").each(function(data){
			money += Number($(this).val());
		});
//		commonFunc.upaidTotal(contentId,0,money);
//		commonFunc.feeItemTotal({contentId:contentId});
//		commonFunc.flushTotalMoney(contentId,0,money);
		//添加勾选事件
		$("#payment_paymentItemList"+contentId).find("input[type=checkbox]").change(function(){
			commonFunc.feeItemTotal({contentId:contentId});
		});
		//添加修改事件
		var oldValue = "0";
		$("#payment_paymentItemList"+contentId).find(".totalMoneyInput").focus(function(){
			oldValue = $(this).val();
		}).blur(function(){
			var oldupaidTotalValue = $("#payment_upaid_detail_bills_total"+contentId).val();
			commonFunc.upaidTotal(contentId,oldValue,$(this).val());
			commonFunc.flushTotalMoney(contentId,oldupaidTotalValue,$("#payment_upaid_detail_bills_total"+contentId).val());
		});
	});	
}

/*封装数据，得到显示层*/
function paymentInit(contentId,customerId,paymentUseableMoneyFlag){
	useableMoneyFlag = paymentUseableMoneyFlag; // 2012-10-25
	var content;
	
	content = "<div class='hide payment_class' id = 'paymentShow"+contentId+"'>";
	content = content + "<div id='payment_info_title"+contentId+"' class='dialog_title'><span id='payment_info_title_close_icon"+contentId+"' class='ui_icon dialog_close_icon'></span></div>";
	content = content + "<div class = 'payment_div_class' id = 'paymentDiv"+contentId+"'>";
	
	//封装未缴费账单明细
	content = content + "<div style = 'text-align:left'>账单信息:</div>";
	content = content + "<div id='payment_unpaidDetailBill_div"+contentId+"'>";

	content = content + "<div class='payment_width payment_inner_div'><div><table width='100%' class='tableBorder' id='payment_unpaidDetailBill_table_head"+contentId+"'><tr><th width='25%'>收费项</th><th width='10%'>单价</th><th width='10%'>数量</th><th width='10%'>发生费用</th><th width='10%'>优惠费用</th><th width='10%'>实际费用</th><th width='25%'>产生时间</th></tr></table></div>";
	content = content + "<div><table class='tableBorder' width='100%'  id='payment_unpaidDetailBill_table"+contentId+"'></table></div>";
	content = content + "<div>";
	content = content + "<div id='payment_paymentItemList"+contentId+"'></div>";
	content = content + "<div><span id='payment_fee_item_checkBar"+contentId+"'></span></div>";
	content = content + "</div>";
	content = content + "<div><span>本次应缴费合计:</span><input readOnly='readOnly' id='payment_upaid_detail_bills_total"+contentId+"' class='text_readonly' value='0.0'/><span>元</span></div></div>";

	content = content + "</div>";

	
	//封装订购信息
	content = content + "<div style = 'text-align:left'>待开通产品信息:</div>";
	content = content + "<div id='payment_orderInfo"+contentId+"'></div>";
	
	content = content + "<div style = 'text-align:left'>当前账户信息:</div>";
	content = content + "<div id='payment_account"+contentId+"'></div>";
//	content = content + "<tr><td colspan='3'>本次充值:</td></tr>";
//	content = content + "<tr><td width='20%'>&nbsp;</td><td>现金账号:</td><td><input type = 'text' id = 'payment_normal_input"+contentId+"' class='input_text account_input_align' value = '0.00'/>元<td></tr>";
//	content = content + "<tr><td width='20%'>&nbsp;</td><td>券账号:</td><td><input type='text' id='payment_coupon_input"+contentId+"' class='input_text account_input_align' value='0.00'>元</td></tr>";
//	content = content + "<tr><td width='20%'>&nbsp;</td><td>点账号:</td><td><input type = 'text' id = 'payment_present_input"+contentId+"' class='input_text account_input_align'  value = '0.00'/>元</td></tr>";
//	content = content + "<div>本次应缴纳的费用为：<span id='payment_totalAllMoney"+contentId+"' class = 'accountHead font14' style='font-size:16px;font-weight:700;margin-left:2px;margin-right:2px;color = red'>0</span>元</div>";
	// 把充值信息的4列修改为一列，并将其放入一个独立的div中，当用户业务类别为模拟时，设置为隐藏   liuxu
	content = content + "<div id='payment_with_three_way"+contentId+"' style = 'text-align:left'><table>";
	content = content + "<tr><td>本次充值:</td><td>现金账号:</td><td><input type = 'text' id = 'payment_normal_input"+contentId+"' class='input_text account_input_align' value = '0.00'/>元<td>" +
														  "<td>券账号:</td><td><input type='text' id='payment_coupon_input"+contentId+"' class='input_text account_input_align' value='0.00'>元</td>"+
														  "<td>点账号:</td><td><input type = 'text' id = 'payment_present_input"+contentId+"' class='input_text account_input_align'  value = '0.00'/>元</td></tr></table>";
	content = content + "</div>"; // end of div : payment_with_three_way
	// 如果用户业务类别为0，则显示模拟电视收费  --liuxu
	content = content + "<div id='imitate_tv_payment"+contentId+"' style = 'text-align:left'>";
	content = content + "模拟电视收费:开始时间:<input class='Wdate' type = 'text' id = 'imitate_start_date"+contentId+"' onfocus='WdatePicker({dchanging:startCDayFunc,oncleared:clearStartDayFunc,Mchanging:startCDayFunc})' size='12' maxLength='20'/>" +
	  								 "结束时间:<input class='Wdate' id='imitate_end_date"+contentId+"' onfocus='WdatePicker({dchanging:endCDayFunc,oncleared:clearEndDayFunc,Mchanging:endCDayFunc})' type='text' size='12' maxLength='20' />"+
	  								 "收费金额:<input type = 'text' id = 'imitate_payment_input"+contentId+"' class='input_text account_input_align'  value = '0.00'/>元";
	content = content + "</div>"; // end of div : imitate_tv_payment
	content = content + "<div class = 'border_top'>";
	content = content + "<div><span class='moneyTotal'>总合计：</span><span class='moneyTotal_money' id='payment_totalAllMoney"+contentId+"'></span><span class='moneyTotal_money'>元</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>付款方式：</span><span id='payment_type"+contentId+"'><input type='radio' name ='payment_type' value='0' checked='checked'/>现金<input type='radio' name ='payment_type' value='1'/>刷卡<input type='radio' name ='payment_type' value='2'/>转账</span><div>";
	content = content + "<div>备注:<textarea rows='3' cols='80' id='payment_remark"+contentId+"'></textarea></div>";
	content = content +"<input type='button' id='payment_but_payment"+contentId+"' class='bigButton' value='缴费'><input type = 'button' id = 'payment_but_close"+contentId+"' class='bigButton' value='关闭'/>";
	content = content + "</div>";
	content = content + "</div>";
	content = content + "</div>";
	
	$("#tab_content"+contentId).append(content);//放在本页显示中
	
	// 用customer_id查询该用户的businessTypes,先将div:imitate_tv_payment隐藏起来，如果为0，则去掉隐藏 liuxu 2012/5/15
	$("#imitate_tv_payment"+contentId).addClass("hide");
	var userBusinessTypes = $("#customer_businessTypes"+contentId).val();
	if(userBusinessTypes == 0) {
		$("#payment_with_three_way"+contentId).addClass("hide");
		$("#imitate_tv_payment"+contentId).removeClass("hide");
	}

	$("#paymentDiv"+contentId+" .input_text").clickChangeColor("text_focus");

	
//	//刷新未缴费账单明细
//	unpaidDetailBill(contentId,customerId);
//	
//	//刷新用户账户信息
//	flushCustomerAccount($("#payment_account"+contentId),contentId,customerId);
//	
//	//根据订购刷新隐藏表
//	flushOrder2Var(contentId,customerId,paymentOrderInfo);
//	
//	paymentOrderInfo($("#payment_orderInfo"+contentId),contentId,customerId);

	// 券账号输入联动 2012-10-24 liuxu
	var preCouponMoney = 0;
	var preCashMoneyOnCoupon = 0;
	$("#payment_coupon_input"+contentId).change(function(){
		if (useableMoneyFlag == "1") {
			var cashPayment = Number($("#payment_normal_input"+contentId).val());
			preCashMoneyOnCoupon = cashPayment;
			var couponPayment = Number($("#payment_coupon_input"+contentId).val());
			if (cashPayment > 0 && cashPayment <= couponPayment) {
				$("#payment_normal_input"+contentId).val(0.00);
			} else if (cashPayment > 0 && cashPayment > couponPayment) {
				$("#payment_normal_input"+contentId).val((cashPayment + preCouponMoney - couponPayment).toFixed(2));
			}
			preCouponMoney = couponPayment;
			commonFunc.flushTotalMoney(contentId,preCashMoneyOnCoupon,$("#payment_normal_input"+contentId).val());
		}
	});
	
	// 点账号输入联动 2012-10-24 liuxu
	var prePresentMoney = 0;
	var preCashMoneyOnPresent = 0;
	$("#payment_present_input"+contentId).change(function(){
		if (useableMoneyFlag == "1") {
			var cashPayment = Number($("#payment_normal_input"+contentId).val());
			preCashMoneyOnPresent = cashPayment;
			var presentPayment = Number($("#payment_present_input"+contentId).val());
			if (cashPayment > 0 && cashPayment <= presentPayment) {
				$("#payment_normal_input"+contentId).val(0.00);
			} else if (cashPayment > 0 && cashPayment > presentPayment) {
				$("#payment_normal_input"+contentId).val((cashPayment + prePresentMoney - presentPayment).toFixed(2));
			}
			prePresentMoney = presentPayment;
			commonFunc.flushTotalMoney(contentId,preCashMoneyOnPresent,$("#payment_normal_input"+contentId).val());
		}
	});
	
	/*缴费页面关闭按钮及关闭图标响应*/
	$("#payment_but_close"+contentId).click(function(){
		// 点击关闭时将金额缓存字段重置  2012-10-25 liuxu
		preCouponMoney = 0;
		preCashMoneyOnCoupon = 0;
		prePresentMoney = 0;
		preCashMoneyOnPresent = 0;
		$("#paymentShow"+contentId).addClass("hide");
		$("#mask").toggle();
	});
	
	$("#payment_info_title_close_icon"+contentId).click(function(){
		preCouponMoney = 0;
		preCashMoneyOnCoupon = 0;
		prePresentMoney = 0;
		preCashMoneyOnPresent = 0;
		$("#paymentShow"+contentId).addClass("hide");
		$("#mask").toggle();
	});
	
	/*现金账户的输入框联动*/
	var normalInputValue = 0;
	$("#payment_normal_input"+contentId).focus(function(){
		if(isNaN(Number($(this).val()))){
			return;
		}
		normalInputValue = $(this).val();
	}).blur(function(){
		if(isNaN(Number($(this).val()))){
			return;
		}
		commonFunc.flushTotalMoney(contentId,normalInputValue,$(this).val());
	});

	/*缴费页面，缴费按钮响应*/
	$("#payment_but_payment"+contentId).click(function(){
		preCouponMoney = 0;
		preCashMoneyOnCoupon = 0;
		prePresentMoney = 0;
		preCashMoneyOnPresent = 0;
		// 当可用余额+现金账号+点账号+券账号 < 订购服务需要金额,则给出提示：当前的充值金额不足以开通您订购的所有服务，
		// 是否继续完成缴费操作？,当选择“确定”时，按原来缴费流程处理，当选择“取消”时，返回到缴费操作页面。 2012-10-24 liuxu
		if (Number($("#customer_account_useable_money"+contentId).val()) 
				+ Number($("#payment_normal_input"+contentId).val())
				+ Number($("#payment_coupon_input"+contentId).val())
				+ Number($("#payment_present_input"+contentId).val()) 
				< Number($("#order_money"+contentId).val())) {
			if (!confirm("当前的充值金额不足以开通您订购的所有服务\n是否继续完成缴费操作？")) {
				return;
			}
		} else if(!confirm("确认进行缴费操作么？")){
			return;
		}
		//按钮置灰
		$("#payment_but_payment"+contentId).attr("disabled",true);
		var ajaxResObj = {
				customer_id:customerId,
				accountNo:$("#customer_account_accountNo"+contentId).val(),
				normal:$("#payment_normal_input"+contentId).val(),
				present:$("#payment_present_input"+contentId).val(),
				coupon:$("#payment_coupon_input"+contentId).val(),
				// 增加模拟电视收费录入信息 --liuxu 2012/5/9
				imitateStartDate:$("#imitate_start_date"+contentId).val(),
				imitateEndDate:$("#imitate_end_date"+contentId).val(),
				imitatePayment:$("#imitate_payment_input"+contentId).val(),
				//businessTypes:$("#customer_businessTypes"+contentId).val(),
				businessTypes:userBusinessTypes,
				billTotal:$("#payment_upaid_detail_bills_total"+contentId).val(),
				orderTotal:$("#order_money"+contentId).val(),
				remark:$("#payment_remark"+contentId).val(),
				paymentType:"",
				billDetails:"",
				orderIds:"",
				confirmCost : ""
		};
		
		//允许只充值赠送金额
//		if(ajaxResObj.normal == "" || ajaxResObj.normal == "0.0"){
//			alert(WebInitParameter.MSG_INFO_C07);
//			$("#payment_normal_input"+contentId).focus();
//			return ;
//		}
		
		// 根据权限是否允许充负值
		if(minusValueFlag == 'false'){
			if(ajaxResObj.normal < 0 || ajaxResObj.present < 0 || ajaxResObj.coupon < 0){
				alert("没有给您分配充负值的权限，请与管理员联系！");
				$("#payment_but_payment"+contentId).attr("disabled",false);
				return ;
			}
		}
		//账单信息
		var $unpaidBillTrs = $("#payment_unpaidDetailBill_table"+contentId).find("tr");
		$unpaidBillTrs.each(function(){
			if($(this).find("td").length ==7){//为1时说明没有账单，为2时说明是汇总
				ajaxResObj.billDetails = ajaxResObj.billDetails  +$(this).find("td").eq(0).find("input").val()+ ":" +$(this).find("td").eq(0).text()+ ":" +$(this).find("td").eq(1).text()+ ":" +$(this).find("td").eq(2).text()+ ":" +$(this).find("td").eq(5).text()+ "&";
			}
		});
		//缴费收费项
		var $paymentFeeItemTrs = $("#payment_paymentItemList"+contentId).find("tr");
		var itemNormalTrsRows = $("#payment_paymentItemNormalTrsRows"+contentId).val();
		var trsRows = 0;
		$paymentFeeItemTrs.each(function(){
			var tds = $(this).find("td");
			trsRows += 1;
			if(trsRows<=itemNormalTrsRows){
				if(tds.eq(0).find("input").attr("checked")){
					ajaxResObj.confirmCost = ajaxResObj.confirmCost + tds.eq(1).find("input").val() +":" + tds.eq(2).find("input").val() + ":" + "1" +"&";
				}
				if(tds.length>4 && tds.eq(4).find("input").attr("checked")){
					ajaxResObj.confirmCost = ajaxResObj.confirmCost + tds.eq(5).find("input").val()  +":" + tds.eq(6).find("input").val() + ":" + "1" + "&";
				}
				if(tds.length>8 && tds.eq(8).find("input").attr("checked")){
					ajaxResObj.confirmCost = ajaxResObj.confirmCost + tds.eq(9).find("input").val()  +":" + tds.eq(10).find("input").val() + ":" + "1" + "&";
				}
			}else{
				if(tds.eq(0).find("input").attr("checked")){
					var feeItemArr = tds.eq(1).find("input").val().split(":");
					feeItemArr[5] = tds.eq(4).find("input").val();
					ajaxResObj.confirmCost = ajaxResObj.confirmCost + feeItemArr.join(":") + ":" + tds.eq(2).find("input").val()+ ":" + "1" + "&";
				}
			}
		});
		// if user's businessTypes equals 0,then add the payments to confirmCost liuxu
		if(userBusinessTypes == 0 && $("#imitate_payment_input"+contentId).val() != 0.0) {
			if(ajaxResObj.confirmCost != ""){
				alert("模拟电视服务费与其他收费项目不能同时缴纳，请分开缴费！");
				$("#payment_but_payment"+contentId).attr("disabled",false);
				return;
			}else{
				ajaxResObj.confirmCost = ajaxResObj.confirmCost + $("#imitate_payment_input"+contentId).val() + ":" + "1" + "&";
			}
		}
		//订购信息
		$("#payment_orderInfo_table"+contentId).children("tbody").children("tr").each(function(){
			$(this).children("td").eq(0).find("tr:has(:checked)").each(function(){
				ajaxResObj.orderIds = ajaxResObj.orderIds + $(this).find("td").eq(0).find("input").val() +",";
			});
		});
		//付款方式
		ajaxResObj.paymentType = $("#payment_type"+contentId).find("input:checked").val();
		
		ovtAjaxMethod(ajaxRegPath+"ajaxPayment.do",ajaxResObj,function(data){
			alert(data.value);
			$("#paymentShow"+contentId).addClass("hide");
			$("#payment_but_payment"+contentId).attr("disabled",false);
			//刷新用户账户信息
//			flushCustomerAccount($("#payment_account"+contentId),contentId,customerId);
			//刷新页面上面的账户信息
	//		flushCustomerAccount($("#customer_acount_info"+contentId),contentId,customerId);
			//刷新页面上面的账户变动历史
//			getAccountHis({customerId:customerId,contentId:contentId,newPage:0});
			//刷新未缴费账单明细
//			unpaidDetailBill(contentId,customerId);
			
//			//根据订购刷新隐藏表
//			flushOrder2Var(contentId,customerId,paymentOrderInfo);

			//刷新缴费历史
//			receiptFunc.flushReceipt({customerId:customerId,contentId:contentId,newPage:0});
			
//			paymentDataInit(contentId,customerId);
			
			$("#mask").toggle();
		});
	});
//	var $payment = paymentInit(contentId,customerId);
	/*允许拖拽*/
	$("#payment_info_title"+contentId).drag("#paymentShow"+contentId);  
	
	return $("#paymentShow"+contentId);
}
//缴费数据封装
function paymentDataInit(contentId,customerId){
	//费用汇总归零
	$("#payment_totalAllMoney"+contentId).text("0");
	$("#order_money"+contentId).val(0);
	// 增加模拟电视收费信息 --liuxu 2012/5/9
	$("#imitate_payment_input"+contentId).val("0.00");
	$("#payment_normal_input"+contentId).val(0);
	$("#payment_coupon_input"+contentId).val("0.00");
	$("#payment_present_input"+contentId).val("0.00");
	$("#payment_upaid_detail_bills_total"+contentId).val(0);
	
	
	//刷新未缴费账单明细
	unpaidDetailBill(contentId,customerId);
	
	//封装缴费营业类别对应的收费项
	commonFunc.paymentCost(contentId,customerId);

	//刷新用户账户信息
	flushCustomerAccount($("#payment_account"+contentId),contentId,customerId);
	
	//根据订购刷新隐藏表
	flushOrder2Var(contentId,customerId,paymentOrderInfo,"No","unNormal");

}

//显示缴费信息
function showPayment(contentId,customerId){
	//封装数据
	paymentDataInit(contentId,customerId);
	$("#mask").toggle();
	$("#paymentShow"+contentId).locateLeftTop().removeClass("hide");
}

//缴费费用汇总方法
commonFunc.flushTotalMoney = function(contentId,oldValue,money){
//	alert("oldValue:"+oldValue);
//	alert("money:"+money);
	if(oldValue == -999){
		var oldFeeValue = $("#payment_upaid_detail_bills_total"+contentId).val();
		$("#payment_totalAllMoney"+contentId).text((Number(oldFeeValue)+Number(money)).toFixed(2));
	}else{
		$("#payment_totalAllMoney"+contentId).text((Number($("#payment_totalAllMoney"+contentId).text())-Number(oldValue)+Number(money)).toFixed(2));
	}
}

//刷新备注 2012-3-2 yzy
commonFunc.flushOrderRemark = function(contentId,orderRemark){
	$("#payment_remark"+contentId).val(orderRemark);
}
/*本次应缴费合计*/
commonFunc.upaidTotal = function(contentId,oldValue,money){
//	alert("prev:"+$("#payment_upaid_detail_bills_total"+contentId).val());
//	alert("oldValue:"+oldValue);
//	alert("money:"+money);
	$("#payment_upaid_detail_bills_total"+contentId).val((Number($("#payment_upaid_detail_bills_total"+contentId).val())-Number(oldValue)+Number(money)).toFixed(2));
//	alert("post:"+$("#payment_upaid_detail_bills_total"+contentId).val());
}
commonFunc.feeItemTotal = function(option){
	var contentId = option.contentId;
	//所有输入框设置成无效
	$("#payment_paymentItemList"+contentId).find(".totalMoneyInput").attr("disabled",true);
	//将勾选的输入框设置为有效
	var $allChecked = $("#payment_paymentItemList"+contentId).find("input:checked");
	var totalMoney = 0.00;
	$allChecked.each(function(){
		var $normal = $(this).parent().parent().find(".normalMoneyInput");
		if($normal.length>0){
			var $input = $(this).parent().next().next().find("input");
			$input.attr("disabled",false);
			totalMoney += Number($input.val());
		}else{
			var $input = $(this).parent().next().next().find("input");
			$input.attr("disabled",false);
			$input.parent().next().next().find("input").attr("disabled",false);
			totalMoney += Number($input.val());
		}
	});
	//去掉原有的汇总信息，将新的信息填入。
	var unpaidDetailBillTotalHiddenVal = 0;
	if($("#payment_unpaidDetailBill_total_hidden"+contentId).length>0){
		unpaidDetailBillTotalHiddenVal = $("#payment_unpaidDetailBill_total_hidden"+contentId).val();
	}
//	alert("unpaidDetailBillTotalHiddenVal："+unpaidDetailBillTotalHiddenVal);
	var oldValue = $("#payment_upaid_detail_bills_total"+contentId).val();
//	alert("oldValue:"+oldValue);
	commonFunc.upaidTotal(contentId,oldValue,totalMoney+Number(unpaidDetailBillTotalHiddenVal));
	commonFunc.flushTotalMoney(contentId,oldValue,$("#payment_upaid_detail_bills_total"+contentId).val());
}
//--------------------------------------------缴费信息----结束----------------------------------------------------

//--------------------------------------------打印确认信息--------------------------------------------------------

//打印通用方法
function printCredential(ajaxPrintRes,contentId,callbackFunc,option){
	ajaxPrintRes.isPrint = WebInitParameter.IS_PRINT;
	ajaxPrintRes.defaultPrinter = WebInitParameter.DEFAULT_PRINTER;
	ovtAjaxMethod(ajaxPrintPath,ajaxPrintRes,function(data){
		$("#print_back"+contentId).empty().append(data);
		if(typeof callbackFunc == 'function'){
			callbackFunc(option);
		}
	});
}
//--------------------------------------------打印确认信息----结束------------------------------------------------



//--------------------------------------------机卡联动方法封装----------------------------------------------------
function equCascade(equ,$equ1,$equ2,$model1,$model2){
	var equ1Text = $equ1.val();
	if(equ1Text == ""){
		return ;
	}
	var ajaxRes = {
			equType:equ,
			equDesc:equ1Text
	}
	ovtAjaxMethod(ajaxEquPath+"ajaxSTBCardCascade.do",ajaxRes,function(data){
		if(data.code=='0'){
			if($equ2!=undefined){
				if(!$equ2.attr("disabled")&&$.trim(data.value.equNo)!=""&&data.value.equNo!='null'){
					$equ2.val(data.value.equNo);
					$model2.val(data.value.description);
				}
				$model1.val(data.value.model);
				
			}
		}
		//判断是否录入信息有误
		if(equ=='card' && (data.code=='1'||'IC_CARD'!=data.value.equType)) {
			alert("【智能卡】号输入有误，请输入正确的智能卡号！") ;
		} else if(equ=='stb' && (data.code=='1'||'STB'!=data.value.equType)) {
			alert("【机顶盒】号输入有误，请输入正确的机顶盒号！") ;
		} else {
			if(0==data.value.status||2==data.value.status ) {
			} else {
				alert("请输入【待售中|新入库】设备！") ;
			}
		}
	});
}



//账户变动历史表
function getAccountHis(option){
	var newSearch = option.newPage,customerId = option.customerId,contentId = option.contentId;
//	alert(newSearch);
	var searchLog = {
			customer_id:customerId,
			accountSartDate:$("#other_content_accountHis_startDate"+contentId).val(),
			accountEndDate:$("#other_content_accountHis_endDate"+contentId).val(),
			print:0
	}
//	if($("#other_content_accountHis_radio_flushAll"+contentId).attr("checked")){
//		searchLog.print = 0;
//	}else{
//		searchLog.print = 1;
//	}
	if(newSearch == 0){
		searchLog.currentPage = 1;
	}else{
		searchLog.currentPage = $("#currentPage"+"_accountHis"+contentId).text();
	}
	ovtAjaxMethod(ajaxRegPath+"ajaxGetUserAccountHis.do",searchLog,function(data){
		if(data.code != '0'){
			alert(data.value);
//			$("#other_content_accountHis_print_div"+contentId).addClass("hide");
			return;
		}
		$("#other_content_accountHis_table"+contentId).find("tr:not(:first-child)").remove();
		if($(data.value.objList).length != 0){
			var content = "";
			var disabled = "disabled";
			var hasInvoice = "是";
			$(data.value.objList).each(function(n,value){
				content = content + "<tr><td>"+value.createDate+"</td><td>"+value.paymentTypeStr+"</td><td>"+value.flag+"</td><td align='right'>"+value.mainMoney+"</td><td align='right'>"+value.coupon+"</td><td align='right'>"+value.presentMoney+"</td><td>"+value.cause+"</td></tr>";
			});
			
			$("#other_content_accountHis_table"+contentId).append(content);
//			$("#other_content_accountHis_checkGroupBar"+contentId).checkGroup("_accountHis_checkGroup"+contentId,$("#other_content_accountHis_table"+contentId));
			$("#other_content_accountHis_pageBar"+contentId).pagination("_accountHis"+contentId,data.value.currentPage,data.value.totalPage,getAccountHis,{customerId:customerId,contentId:contentId});
//			$("#other_content_accountHis_print_div_"+thisIcCard).removeClass("hide");
		}
	});
//	$("#other_content_accountHis_print_div"+contentId).removeClass("hide");

}


//-------------------------------------------------非居民用户只能增加主终端--------------------------------------------
commonFunc.addEquConfine = function(contentId){
	if(WebInitParameter.ADD_EQU_CONFINE == WebInitParameter.ADD_EQU_CONFINE_YES){
		var userType = $("#customer_customerType"+contentId).val();
		if(userType != WebInitParameter.RESIDENT){
			alert(WebInitParameter.MSG_EQU_C17);
			return true;
		}
	}
	return false;
}

//----------------------------------------------------客服管理-文本内容验证-----------------------------------------------
commonFunc.regexVilidator = function(allowNull,strValue,vilidateRegex){
	if(strValue == ""){
		if(allowNull){
			return true;
		}
	}else{
		if(typeof(vilidateRegex) == "undefined"){
			return true;
		}else{
			if(vilidateRegex.test(strValue)){
				return true;
			}
		}
	}
	return false;
}

commonFunc.textVilidator = function(allowNull,$contentId,vilidateRegex,MSG){
	var bool = commonFunc.regexVilidator(allowNull,$contentId.val(),vilidateRegex);
	if(!bool){
		alert(MSG);
	}
	return bool;
}

commonFunc.operConfirm = function(commandId,text){
	if(WebInitParameter.OPERATION_CONFIRM == "yes"){
		return confirm("确定进行"+text+"操作吗？");
	}
	return true;
}
commonFunc.operConfirm1 = function(commandId,text) {
	if(WebInitParameter.OPERATION_CONFIRM == "yes"){
		return confirm(text);
	}
	return true;
}


