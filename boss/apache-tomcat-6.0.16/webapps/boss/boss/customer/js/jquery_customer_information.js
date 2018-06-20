//---------------------------------------------用户信息输入显示封装-----------------------------------------

/*用户信息表现结构*/
function drawCustomer(contentId){
//	var content = "<table width='100%'>" +
//		"<tr id='customer_table_line1"+contentId+"'><td><span id='name_customer_name"+contentId+"'>用户名称:</span></td><td colspan ='3'><span id='value_customer_name"+contentId+"'><input type='text' size='70' maxlength='100' class='input_text' id='customer_name"+contentId+"'/></span></td><td><span id='name_customer_account"+contentId+"'>用户账号:</span></td><td><span id='value_customer_account"+contentId+"'><input class='input_text' type='text' id='customer_account"+contentId+"'/><input class='input_text' type='hidden' id='customer_id"+contentId+"'/></span></td></tr>" +
//		"<tr id='customer_table_line2"+contentId+"'><td><span id='name_customer_customerType"+contentId+"'>用户类型:</span></td><td><span id='value_customer_customerType"+contentId+"'><select id='customer_customerType"+contentId+"'></select></span></td><td><span id='name_customer_idType"+contentId+"'>证件类型:</span></td><td><span id='value_customer_idType"+contentId+"'><select id='customer_idType"+contentId+"'></select></span></td><td><span id='name_customer_idCardNo"+contentId+"'>证件号码:</span></td><td><span id='value_customer_idCardNo"+contentId+"'><input type='text' class='input_text' id='customer_idCardNo"+contentId+"'/></span></td></tr>" +
//		"<tr id='customer_table_line3"+contentId+"'><td><span id='name_customer_areaLevel1"+contentId+"'>一级片区:</span></td><td><span id='value_customer_areaLevel1"+contentId+"'><select id ='customer_areaLevel1"+contentId+"'></select></span></td><td><span id='name_customer_areaLevel2"+contentId+"'>二级片区:</span></td><td><span id='value_customer_areaLevel2"+contentId+"'><select id ='customer_areaLevel2"+contentId+"'></select></span></td><td><span id='name_customer_areaLevel3"+contentId+"'>三级片区:</span></td><td><span id='value_customer_areaLevel3"+contentId+"'><select id ='customer_areaLevel3"+contentId+"'></select></span></td></tr>" +
//		"<tr id='customer_table_line4"+contentId+"'><td><span id='name_customer_installAddress"+contentId+"'>安装地址:</span></td><td colspan='3'><span id='value_customer_installAddress"+contentId+"'><input type='text' size='70' maxlength='100' class='input_text'  id='customer_installAddress"+contentId+"'/></span></td><td><span id='name_customer_email"+contentId+"'>电子邮箱:</span></td><td><span id='value_customer_email"+contentId+"'><input type='text' class='input_text' id='customer_email"+contentId+"'/></span></td></tr>" +
//		"<tr id='customer_table_line5"+contentId+"'><td><span id='name_customer_contactAddress"+contentId+"'>联系地址:</span></td><td colspan='3'><span id='value_customer_contactAddress"+contentId+"'><input type='text' size='70' maxlength='100' class='input_text'  id='customer_contactAddress"+contentId+"'/></span></td><td><span id='name_customer_contactPostcode"+contentId+"'>邮政编码:</span></td><td><span id='value_customer_contactPostcode"+contentId+"'><input type='text' value='315300' class='input_text' id='customer_contactPostcode"+contentId+"'/></span></td></tr>" +
//		"<tr id='customer_table_line6"+contentId+"'><td><span id='name_customer_contact"+contentId+"'>联系人:</span></td><td><span id='value_customer_contact"+contentId+"'><input type='text' class='input_text' id ='customer_contact"+contentId+"'/></span></td><td><span id='name_customer_phone"+contentId+"'>固定电话:</span></td><td><span id='value_customer_phone"+contentId+"'><input type='text' class='input_text' id='customer_phone"+contentId+"'/></span></td><td><span id='name_customer_cellPhone"+contentId+"'>移动电话:</span></td><td><span id='value_customer_cellPhone"+contentId+"'><input type='text' class='input_text' id='customer_cellPhone"+contentId+"'/></span></td></tr>" +
//		"<tr id='customer_table_line7"+contentId+"'><td><span id='name_customer_relateBank"+contentId+"'>代扣银行:</span></td><td><span id='value_customer_relateBank"+contentId+"'><select id='customer_relateBank"+contentId+"'></select></span></td><td><span id='name_customer_bankAccount"+contentId+"'>银行账号:</span></td><td><span id='value_customer_bankAccount"+contentId+"'><input type='text' class='input_text' id='customer_bankAccount"+contentId+"'/></span></td><td>&nbsp;</td><td>&nbsp;</td></tr>" +
//		"</table>";
	// modify by jhg 2013-01-17 将片区信息的显示由第三行放到开户及业务受理查询界面的第一行
	var content = "<table id='customerInformationTable"+contentId+"' width='100%'>" +
	"<tr id='customer_table_line3"+contentId+"'><td><span id='name_customer_areaLevel1"+contentId+"'>"+WebInitParameter.USER_INFO_AREA_LEVEL1+"</span><span id='value_customer_areaLevel1"+contentId+"'><select id ='customer_areaLevel1"+contentId+"'></select></span></td><td><span id='name_customer_areaLevel2"+contentId+"'>"+WebInitParameter.USER_INFO_AREA_LEVEL2+"</span><span id='value_customer_areaLevel2"+contentId+"'><select id ='customer_areaLevel2"+contentId+"'></select></span></td><td><span id='name_customer_areaLevel3"+contentId+"'>"+WebInitParameter.USER_INFO_AREA_LEVEL3+"</span><span id='value_customer_areaLevel3"+contentId+"'><select id ='customer_areaLevel3"+contentId+"'></select></span></td></tr>" +
	"<tr id='customer_table_line1"+contentId+"'><td colspan ='2'><span id='name_customer_name"+contentId+"'>"+WebInitParameter.USER_INFO_NAME+"</span><span id='value_customer_name"+contentId+"'><input type='text' size='70' maxlength='100' class='input_text' id='customer_name"+contentId+"'/></span></td><td><span id='name_customer_coding"+contentId+"'>"+WebInitParameter.USER_INFO_USER_CODING+"</span><span id='value_customer_coding"+contentId+"'><input class='input_text' type='text' id='customer_coding"+contentId+"'/></span><input class='input_text' type='hidden' id='customer_id"+contentId+"'/></td></tr>" +
	"<tr id='customer_table_line2"+contentId+"'><td><span id='name_customer_customerType"+contentId+"'>"+WebInitParameter.USER_INFO_TYPE+"</span><span id='value_customer_customerType"+contentId+"'><select id='customer_customerType"+contentId+"'></select></span></td><td><span id='name_customer_idType"+contentId+"'>"+WebInitParameter.USER_INFO_IDENTITY_TYPE+"</span><span id='value_customer_idType"+contentId+"'><select id='customer_idType"+contentId+"'></select></span></td><td><span id='name_customer_idCardNo"+contentId+"'>"+WebInitParameter.USER_INFO_IDENTITY_CARD+"</span><span id='value_customer_idCardNo"+contentId+"'><input type='text' class='input_text' id='customer_idCardNo"+contentId+"'/></span></td></tr>" +
	"<tr id='customer_table_line4"+contentId+"'><td colspan ='2'><span id='name_customer_installAddress"+contentId+"'>"+WebInitParameter.USER_INFO_ADDRESS+"</span><span id='value_customer_installAddress"+contentId+"'><input type='text' size='70' maxlength='100' class='input_text'  id='customer_installAddress"+contentId+"'/></span></td><td><span id='name_customer_email"+contentId+"'>"+WebInitParameter.USER_INFO_EMAIL+"</span><span id='value_customer_email"+contentId+"'><input type='text' class='input_text' id='customer_email"+contentId+"'/></span></td></tr>" +
	"<tr id='customer_table_line5"+contentId+"'><td colspan ='2'><span id='name_customer_contactAddress"+contentId+"'>"+WebInitParameter.USER_INFO_MESSAGE_ADDRESS+"</span><span id='value_customer_contactAddress"+contentId+"'><input type='text' size='70' maxlength='100' class='input_text'  id='customer_contactAddress"+contentId+"'/></span></td><td><span id='name_customer_contactPostcode"+contentId+"'>"+WebInitParameter.USER_INFO_MESSAGE_POSTCODE+"</span><span id='value_customer_contactPostcode"+contentId+"'><select id='customer_contactPostcode"+contentId+"'></select></span></td></tr>" +
	"<tr id='customer_table_line6"+contentId+"'><td><span id='name_customer_contact"+contentId+"'>"+WebInitParameter.USER_INFO_CONTACT+"</span><span id='value_customer_contact"+contentId+"'><input type='text' class='input_text' id ='customer_contact"+contentId+"'/></span></td><td><span id='name_customer_phone"+contentId+"'>"+WebInitParameter.USER_INFO_TEL+"</span><span id='value_customer_phone"+contentId+"'><input type='text' class='input_text' id='customer_phone"+contentId+"'/></span></td><td><span id='name_customer_cellPhone"+contentId+"'>"+WebInitParameter.USER_INFO_MOBILE+"</span><span id='value_customer_cellPhone"+contentId+"'><input type='text' class='input_text' id='customer_cellPhone"+contentId+"'/></span></td></tr>" +
	"<tr id='customer_table_line7"+contentId+"'><td><span id='name_customer_relateBank"+contentId+"'>"+WebInitParameter.USER_INFO_RELATE_BANK+"</span><span id='value_customer_relateBank"+contentId+"'><select id='customer_relateBank"+contentId+"'></select></span></td><td><span id='name_customer_bankAccount"+contentId+"'>"+WebInitParameter.USER_INFO_BANK_INFO+"</span><span id='value_customer_bankAccount"+contentId+"'><input type='text' class='input_text' id='customer_bankAccount"+contentId+"'/></span></td><td><span id='name_customer_account"+contentId+"'>"+WebInitParameter.USER_INFO_ACCOUNT_NO+"</span><span id='value_customer_account"+contentId+"'><input class='input_text' type='text' id='customer_account"+contentId+"'/></span></td></tr>" +
	"<tr id='customer_table_line8"+contentId+"'><td><span id='name_customer_status"+contentId+"'>"+WebInitParameter.USER_INFO_STATUS+"</span><span id='value_customer_status"+contentId+"'><select id='customer_status"+contentId+"'></select></span></td><td><span id='name_customer_validStatus"+contentId+"'>"+WebInitParameter.USER_INFO_VALID_STATUS+"</span><span id='value_customer_validStatus"+contentId+"'><select id='customer_validStatus"+contentId+"'></select></span></td><td><span id='name_customer_bwAccountNo"+contentId+"'>宽带账号:</span><span id='value_customer_bwAccountNo"+contentId+"'><input type='text' class='input_text' id='customer_bwAccountNo"+contentId+"'/></span></td><td>&nbsp;</td></tr>" +
	"<tr id='customer_table_line9"+contentId+"'><td><span id='name_customer_icNo"+contentId+"'>"+WebInitParameter.USER_INFO_IC_NO+"</span><span id='value_customer_icNo"+contentId+"'><input type='text' class='input_text' id='customer_icNo"+contentId+"' /></span></td><td><span id='name_customer_stbNo"+contentId+"'>"+WebInitParameter.USER_INFO_STB_NO+"</span><span id='value_customer_stbNo"+contentId+"'><input type='text' class='input_text' id='customer_stbNo"+contentId+"'/></span></td><td>&nbsp;</td></tr>" +
	"<tr id='customer_table_line10"+contentId+"'><td><span id='name_customer_registerDate"+contentId+"'>"+WebInitParameter.USER_INFO_REGISTER_DATE+"</span><span id='value_customer_registerDate"+contentId+"'><input type='text' class='input_text'  id='customer_registerDate"+contentId+"' /></span></td><td>&nbsp;</td><td>&nbsp;</td></tr>" +
	"<tr id='customer_table_line11"+contentId+"'><td><span id='name_customer_businessTypes"+contentId+"'>业务类别:</span><span id='value_customer_businessTypes"+contentId+"'><select id='customer_businessTypes"+contentId+"'></select></span></td><td><span id='name_customer_baseservDate"+contentId+"'>模拟电视收费结束时间：</span><span id='value_customer_baseservDate"+contentId+"'><input type='text' disabled='disabled' class='input_text' id='customer_baseservDate"+contentId+"'/></span></td><td>&nbsp;</td></tr>"+
	"<tr id='customer_table_line12"+contentId+"'><td colspan ='3'><span id='name_customer_remark"+contentId+"'>"+WebInitParameter.USER_INFO_REMARK+"</span><span id='value_customer_remark"+contentId+"'><textarea  rows='3' cols='80'  id='customer_remark"+contentId+"'></textarea></span></td></tr>" +
	"</table>";

	return content;
}
/*初始化开户用户信息*/
function customerInit($showDiv,contentId){
	$showDiv.append(drawCustomer(contentId));
	parameterInit(contentId,"-1");
	$("#customer_table_line8"+contentId).remove();
	$("#customer_table_line9"+contentId).remove();
	$("#customer_table_line10"+contentId).remove();
	
	//禁止账号手动输入，联动账号和编号
	$("#customer_account"+contentId).attr("readOnly",true);
	
	//增加必填项显示
	var inputRequired = "<span class= 'input_required'>*</span>";
	$("#value_customer_name"+contentId).append(inputRequired);
	$("#value_customer_coding"+contentId).append(inputRequired);
	$("#value_customer_account"+contentId).append(inputRequired);
}
/*代办人信息表现结构*/
function drawAgent(contentId){
	var content = "<table agentInformationTable width='100%'>" +
			"<tr id='agent_table_line1"+contentId+"'><td><span id= 'name_agent_name"+contentId+"'>"+WebInitParameter.AGENT_INFO_NAME+"</span><span id= 'value_agent_name"+contentId+"'><input type='text' class='input_text' id='agent_name"+contentId+"'/></span></td><td><span id= 'name_agent_idType"+contentId+"'>"+WebInitParameter.AGENT_INFO_IDENTITY_TYPE+"</span><span id= 'value_agent_idType"+contentId+"'><select id='agent_idType"+contentId+"'></select></span></td><td><span id= 'name_agent_idCardNo"+contentId+"'>"+WebInitParameter.AGENT_INFO_IDENTITY_CARD+"</span><span id= 'value_agent_idCardNo"+contentId+"'><input type='text' class='input_text' id='agent_idCardNo"+contentId+"'/></span></td></tr>" +
			"<tr id='agent_table_line2"+contentId+"'><td><span id= 'name_agent_contactAddress"+contentId+"'>"+WebInitParameter.AGENT_INFO_MESSAGE_ADDRESS+"</span><span id= 'value_agent_contactAddress"+contentId+"'><input type='text' class='input_text'  size='20' maxlength='100' id='agent_contactAddress"+contentId+"'/></span></td><td><span id= 'name_agent_phone"+contentId+"'>"+WebInitParameter.AGENT_INFO_TEL+"</span><span id= 'value_agent_phone"+contentId+"'><input type='text' class='input_text' id='agent_phone"+contentId+"'/></span></td><td><span id= 'name_agent_cellphone"+contentId+"'>"+WebInitParameter.AGENT_INFO_MOBILE+"</span><span id= 'value_agent_cellphone"+contentId+"'><input type='text' class='input_text' id='agent_cellphone"+contentId+"'/></span></td></tr>" +
			"" +
			"" +
			"</table>";
	return content;
}
/*初始化代办人信息*/
function agentInit($showDiv,contentId){
	$showDiv.append(drawAgent(contentId));
}

function equInit($showTable,contentId){
	if(WebInitParameter.STB_IC_BAND == WebInitParameter.STB_IC_BAND_BAND) {
		$("#icBoxBinding").attr("checked",true);
	}
}

/*初始化搜索用户信息*/
function searchInit($showDiv,contentId){
	$showDiv.append(drawCustomer(contentId));
	$("#customer_table_line10"+contentId).remove();
	$("#customer_table_line12"+contentId).remove();
//	var newTds = "<td><span id='name_customer_status"+contentId+"'>用户状态:</span><span id='value_customer_status"+contentId+"'><select id='customer_status"+contentId+"'></select></span></td><td><span id='name_customer_validStatus"+contentId+"'>有效状态:</span><span id='value_customer_validStatus"+contentId+"'><select id='customer_validStatus"+contentId+"'></select></span></td><td>&nbsp;</td>";
	parameterInit(contentId,"-2");
}

/*增加用户信息行----由于未知的添加数据错误，导致该思路不能实现，现在思路修改为，初始化时，将所有的行都添加，然后根据不同需求，去掉应该的行*/
function addInfoTableTr(contentId,newTds){
	$cusInfo = $("#customerInformationTable"+contentId);
	var content;
	var trNum = $cusInfo.find("tr").length+1;//行数增加1个
	content = "<tr id = 'customer_table_line"+trNum+contentId+"'>";
	content = content + newTds;
	content = content + "</tr>";
	$cusInfo.append(content);
}


/*获取用户初始化参数，包含代办人参数*/
function parameterInit(contentId,userId){
	var resPara = {userBusiCode:userId};
	var parameter ;
	ovtAjaxMethod(ajaxRegPath+"ajaxParameters.do",resPara,function(data){
		if(data.code != '0'){
			alert(WebInitParameter.MSG_INFO_C06);
			return;
		}
		$("#customer_customerType"+contentId).append(data.value.customerType);
		$("#customer_idType"+contentId).append(data.value.idType);
		//代办人信息封装
		$("#agent_idType"+contentId).empty().append(data.value.idType);
		$("#customer_businessTypes"+contentId).empty().append(data.value.businessTypes); // liuxu 2012/5/7
		$("#customer_areaLevel1"+contentId).empty().append(data.value.areaLevel1);
		$("#customer_areaLevel2"+contentId).empty().append(data.value.areaLevel2);
		$("#customer_areaLevel3"+contentId).empty().append(data.value.areaLevel3);
		$("#customer_contactPostcode"+contentId).empty().append(data.value.messagePostcode);
		$("#customer_relateBank"+contentId).empty().append(data.value.relateBank);
		$("#customer_status"+contentId).empty().append(data.value.status);
		$("#customer_validStatus"+contentId).empty().append(data.value.validStatus);
		$("#setBoxGetType"+contentId).empty().append(data.value.stbGetType);//增加机顶盒来源显示
		STB_GET_TYPE_HTML = data.value.stbGetType;//增加机顶盒来源显示
		// 增加机顶盒编号超长的显示设置
		isLongSTBNoFlag = data.value.isLongSTBNoFlag;
		if(isLongSTBNoFlag != undefined || isLongSTBNoFlag != ""){
			if(isLongSTBNoFlag == "0"){
				$("#setBoxValue").css("width","130px");
			}else{
				$("#setBoxValue").css("width","260px");
			}
		}
	});
}

/* 获取用户初始化参数，初始化初始化银行代扣资料审核--代扣银行 */
function customerParameterInit(thisIcCard, userId) {
//	var resPara = {userBusiCode:userId};
//	ovtAjaxMethod(ajaxRegPath+"ajaxParameters.do",resPara,function(data){
//		if(data.code != '0'){
//			alert(WebInitParameter.MSG_INFO_C06);
//			return;
//		}
//		$("#customer_bankinfo_verify_select_relateBank_"+thisIcCard).empty().append(data.value.relateBank);
//	});
}

/* 初始化银行代扣资料审核信息*/
function customerInfoInit(thisIcCard, userinfo) {
//	$("#customer_bankinfo_verify_select_relateBank_"+thisIcCard).empty().append("<option value='-1'>---无---</option>");
	$("#customer_bankinfo_verify_select_relateBank_"+thisIcCard).empty().append(userinfo.relateBankInfo);
	$("#customer_bankinfo_verify_text_bankInfo_"+thisIcCard).val(userinfo.bankInfo);
	$("#customer_bankinfo_verify_select_verifyFlag_"+thisIcCard).attr("value",userinfo.bankCheckFlag);
	$("#customer_bankinfo_verify_text_date_"+thisIcCard).val(userinfo.bankCheckDate);
}

/*查询到用户信息使用*/
function userInfoInit($showDiv,contentId,userInfo){
	$showDiv.append(drawCustomer(contentId));
	setUserInfo(contentId,userInfo);
//	$("#customer_table_line8"+contentId).remove();
	$("#customer_table_line9"+contentId).remove();
	//增加必填项显示
	var inputRequired = "<span class= 'input_required'>*</span>";
	$("#value_customer_name"+contentId).append(inputRequired);
	$("#value_customer_coding"+contentId).append(inputRequired);
	$("#value_customer_account"+contentId).append(inputRequired);
}

/*封装用户信息数据方法*/
function setUserInfo(contentId,userInfo){
	$("#customer_id"+contentId).val(userInfo.id);
	$("#customer_coding"+contentId).val(userInfo.userCoding);
	$("#customer_account"+contentId).val(userInfo.accountNo),
	$("#customer_name"+contentId).val(userInfo.name),
	$("#customer_idType"+contentId).empty().append(userInfo.identityTypeInfo),
	$("#customer_idCardNo"+contentId).val(userInfo.identityCard),
	$("#customer_phone"+contentId).val(userInfo.tel),
	$("#customer_cellPhone"+contentId).val(userInfo.mobile),
	$("#customer_email"+contentId).val(userInfo.email),
	$("#customer_areaLevel1"+contentId).empty().append(userInfo.areaLevel1Info),
	$("#customer_areaLevel2"+contentId).empty().append(userInfo.areaLevel2Info),
	$("#customer_areaLevel3"+contentId).empty().append(userInfo.areaLevel3Info),
	$("#customer_contact"+contentId).val(userInfo.contact),
	$("#customer_relateBank"+contentId).empty().append(userInfo.relateBankInfo),
	$("#customer_bankAccount"+contentId).val(userInfo.bankInfo),
	$("#customer_customerType"+contentId).empty().append(userInfo.userTypeInfo),
	$("#customer_businessTypes"+contentId).empty().append(userInfo.businessTypesInfo),  // liuxu
	$("#customer_baseservDate"+contentId).val(userInfo.baseservDateInfo);// liuxu
	$("#customer_contactAddress"+contentId).val(userInfo.messageAdr),
	$("#customer_contactPostcode"+contentId).empty().append(userInfo.messagePostcodeInfo),
	$("#customer_installAddress"+contentId).val(userInfo.address),
	$("#customer_status"+contentId).empty().append(userInfo.userStatusInfo),
	$("#customer_validStatus"+contentId).empty().append(userInfo.validStatusInfo),
	$("#customer_registerDate"+contentId).val(userInfo.registerDate.indexOf(".")!=-1?userInfo.registerDate.substring(0,userInfo.registerDate.indexOf(".")):userInfo.registerDate)
	$("#customer_remark"+contentId).val(userInfo.remark);
	$("#customer_bwAccountNo"+contentId).val(userInfo.bwAccountNo); // liuxu 2012-10-15
}

/*得到页面上用户的信息*/
function getUserInfo(contentId){
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
	var ajaxResponse = {
				customer_id:$("#customer_id"+contentId).val(),
				customer_coding:$("#customer_coding"+contentId).val(),
				customer_account:$("#customer_account"+contentId).val(),
				customer_name:$("#customer_name"+contentId).val(),
				customer_idCardType:$("#customer_idType"+contentId).val(),
				customer_idCardNo:$("#customer_idCardNo"+contentId).val(),
	//			customer_houseAccount:$("#customer_houseAccount"+contentId).val(),	
				customer_phone:$("#customer_phone"+contentId).val(),
				customer_cellPhone:$("#customer_cellPhone"+contentId).val(),
				customer_email:$("#customer_email"+contentId).val(),
				customer_areaLevel1:areaLevel1,
				customer_areaLevel2:areaLevel2,
				customer_areaLevel3:areaLevel3,
	//			customer_group:$("#customer_group_hidden"+contentId).val(),
	//			customer_contract:$("#customer_contract"+contentId).val(),
				customer_contact:$("#customer_contact"+contentId).val(),
				customer_relateBank:$("#customer_relateBank"+contentId).val(),
				customer_bankAccount:$("#customer_bankAccount"+contentId).val(),
				customer_customerType:$("#customer_customerType"+contentId).val(),
				customer_businessTypes:$("#customer_businessTypes"+contentId).val(), // liuxu 2012/5/7
	//			customer_workAddress:$("#customer_workAddress"+contentId).val(),
				customer_contactAddress:$("#customer_contactAddress"+contentId).val(),
				customer_contactPostcode:$("#customer_contactPostcode"+contentId).val(),
				customer_installAddress:$("#customer_installAddress"+contentId).val(),
	//			customer_installPostcode:$("#customer_installPostcode"+contentId).val(),
				customer_status:$("#customer_status"+contentId).val(),
				customer_validStatus:$("#customer_validStatus"+contentId).val(),
				customer_icNo:$("#customer_icNo"+contentId).val(),
				customer_stbNo:$("#customer_stbNo"+contentId).val(),
				customer_remark:$("#customer_remark"+contentId).val(),
				agent_name:$("#agent_name"+contentId).val(),
				agent_idCardType:$("#agent_idType"+contentId).val(),
				agent_idCardNo:$("#agent_idCardNo"+contentId).val(),
				agent_phone:$("#agent_phone"+contentId).val(),
				agent_cellphone:$("#agent_cellphone"+contentId).val(),
				agent_contactAddress:$("#agent_contactAddress"+contentId).val(),
				// 增加用户宽带编号 liuxu 2012-10-17
				customer_bwAccountNo:$("#customer_bwAccountNo"+contentId).val()
			};
	
//	commonFunc.textVilidator(false,$("#customer_coding"),undefined,"请输入用户编号！");
//	commonFunc.textVilidator(false,$("#customer_name"),undefined,"请输入用户名称！");
//	commonFunc.textVilidator(true,$("#customer_email"),WebInitParameter.CUSTOMER_EMAIL_VILIDATE_REGEX,"请输入正确的电子邮箱！");
//	commonFunc.textVilidator(true,$("#customer_phone"),WebInitParameter.CUSTOMER_TEL_VILIDATE_REGEX,"请输入正确的固定电话号码！");
//	commonFunc.textVilidator(true,$("#customer_cellPhone"),WebInitParameter.CUSTOMER_MOBILE_VILIDATE_REGEX,"请输入正确的手机号码！");
	
	return ajaxResponse;
}


/*刷新用户信息--用于对用户黑名单处理，报停开通处理的刷新*/
function flushCustomer(contentId,customerId){
	var searchRes = {customer_id:customerId};
	//得到当前操作的用户
	ovtAjaxMethod(ajaxBusPath+"ajaxSearchUser.do",searchRes,function(data){
		if(data.code!="0"){
			alert(data.value);
			return;
		}
		var currentUserInfo;
		$(data.value.objList).each(function(n,value){
			if(value.id == customerId){
				currentUserInfo = value;
			}
		});
		if(currentUserInfo != undefined){
			setUserInfo(contentId,currentUserInfo);
		}
	});
}