$(function(){
	webInit(function(){
	/*调用初始化方法*/
	init();
	customerInit($("#customer_base_table"),"");

	agentInit($("#agent_info"),"");
	
	equInit($("#equipment_info"),"");
	/*输入框得到焦点改变样式方法*/
	$(".input_text").clickChangeColor("text_focus");
	/*型号禁止修改，去掉tab的索引*/
	$(".input_text_model").attr("readOnly",true).attr("tabindex",-1);
	/*代办人信息  点击方法*/
	$("#agent_title").click(function(){
		changeHide("agent_info","agent_title_icon");
	});
	
	/*用户信息 点击方法*/
	$("#info_title").click(function(){
		changeHide("info_content","reg_title_icon");
//		setHide("equipment_info","equipment_title_icon");
//		setHide("product_base_info","product_base_title_icon");
//		setHide("product_valuable_info","product_valuable_title_icon");//隐藏增值产品信息
	});
	
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
	
	/* 用户编号验证方法 */
	var userCodingValidator=function(){
		var bool = commonFunc.textVilidator(false,$("#customer_coding"),undefined,WebInitParameter.MSG_INFO_C10);
		if(bool){
			$("#customer_account").val($("#customer_coding").val());
		}
	};
	
	//用户编号文本框绑定失去焦点时内容验证
	$("#customer_coding").bind('blur',userCodingValidator);
	
	/*二级片区联动*/
	$("#customer_areaLevel1").change(function(){
		getAreaLevel("",1);
		if(WebInitParameter.AUTO_ADD_USER_CODE==WebInitParameter.AUTO_ADD_USER_CODE_ON){
			var areaLevel1 = $("#customer_areaLevel1").val();
			if(areaLevel1 == null){
				areaLevel1 = -1;
			}
			var ajaxRes = {customer_areaLevel1:areaLevel1};
			ovtAjaxMethod(ajaxRegPath+"ajaxGetUserCoding.do",ajaxRes,function(data){
				if(data.code != '0'){
					$("#customer_coding").unbind('blur',userCodingValidator);
					alert(data.value);
					return;
				}
				$("#customer_coding").val(data.value);
				$("#customer_account").val($("#customer_coding").val());
			});
		}
	});
	/*三级片区联动*/
	$("#customer_areaLevel2").change(function(){
		getAreaLevel("",2);
		// 按二级片区自动生成用户编号 2012-10-30 liuxu
		if (WebInitParameter.AUTO_ADD_USER_CODE==WebInitParameter.AUTO_ADD_USER_CODE_BY_SECOND_AREA) {
			var areaLevel2 = $("#customer_areaLevel2").val();
			if(areaLevel2 == null){
				areaLevel2 = -1;
			}
			var ajaxRes = {
				customer_areaLevel2:areaLevel2
			};
			ovtAjaxMethod(ajaxRegPath+"ajaxGetUserCoding.do",ajaxRes,function(data){
				if (data.code != '0') {
					$("#customer_coding").unbind('blur',userCodingValidator);
					alert(data.value);
					return;
				}
				$("#customer_coding").val(data.value);
				$("#customer_account").val($("#customer_coding").val());
			});
		}
		
		// 自动填充二级片区到用户编号 2012-10-30 liuxu
		if (WebInitParameter.AUTO_ADD_USER_CODE==WebInitParameter.AUTO_ADD_USER_CODE_WITH_SECOND_AREA) {
			var areaLevel2 = $("#customer_areaLevel2").val();
			if(areaLevel2 == null){
				areaLevel2 = -1;
			}
			var ajaxRes = {
				customer_areaLevel2:areaLevel2
			};
			ovtAjaxMethod(ajaxRegPath+"ajaxGetUserCoding.do",ajaxRes,function(data){
				if (data.code != '0') {
					$("#customer_coding").unbind('blur',userCodingValidator);
					alert(data.value);
					return;
				}
				$("#customer_coding").val(data.value);
				$("#customer_account").val($("#customer_coding").val());
			});
		}
	});
	/*用户编号生成以及验证*/
	$("#customer_coding").focus(function(){
	//	alert(WebInitParameter.AUTO_ADD_USER_CODE+":"+WebInitParameter.AUTO_ADD_USER_CODE_ON);
		if(WebInitParameter.AUTO_ADD_USER_CODE==WebInitParameter.AUTO_ADD_USER_CODE_ON){
			var areaLevel1 = $("#customer_areaLevel1").val();
			if(areaLevel1 == null){
				areaLevel1 = -1;
			}
			if($("#customer_coding").val()==''){
				var ajaxRes = {customer_areaLevel1:areaLevel1};
				ovtAjaxMethod(ajaxRegPath+"ajaxGetUserCoding.do",ajaxRes,function(data){
					if(data.code != '0'){
//						codingError = codingError +1;
						$("#customer_coding").unbind('blur',userCodingValidator);
						$("#customer_coding").trigger("blur");
						alert(data.value);
						return;
					}
					$("#customer_coding").val(data.value);
				});
			}
		}
		
		// add by liuxu 2012-10-30
		if (WebInitParameter.AUTO_ADD_USER_CODE==WebInitParameter.AUTO_ADD_USER_CODE_BY_SECOND_AREA 
				|| WebInitParameter.AUTO_ADD_USER_CODE==WebInitParameter.AUTO_ADD_USER_CODE_WITH_SECOND_AREA) {
			if($("#customer_coding").val()==''){
				var areaLevel2 = $("#customer_areaLevel2").val();
				if(areaLevel2 == null){
					areaLevel2 = -1;
				}
				var ajaxRes = {customer_areaLevel2:areaLevel2};
				ovtAjaxMethod(ajaxRegPath+"ajaxGetUserCoding.do",ajaxRes,function(data){
					if(data.code != '0'){
						$("#customer_coding").unbind('blur',userCodingValidator);
						$("#customer_coding").trigger("blur");
						alert(data.value);
						return;
					}
					$("#customer_coding").val(data.value);
				});
			}
		 }
	});

	
//	$("#customer_coding").blur(function(){
////		if(codingError!=0)
////			return;
////		var bool = commonFunc.textVilidator(false,$("#customer_coding"),undefined,WebInitParameter.MSG_INFO_C10);
////		if(bool){
////			$("#customer_account").val($("#customer_coding").val());
////		}else{
////			alert(WebInitParameter.MSG_INFO_C10);
////		}
//	});
	
//-------------------------------------各种信息的验证---------------------------------------------------------
	/*用户名称验证*/
	$("#customer_name").blur(function(){
		var bool = commonFunc.textVilidator(false,$("#customer_name"),undefined,WebInitParameter.MSG_INFO_C09);
	});
	
	/*电子邮箱验证*/
	$("#customer_email").blur(function(){
		var bool = commonFunc.textVilidator(true,$("#customer_email"),WebInitParameter.CUSTOMER_EMAIL_VILIDATE_REGEX,WebInitParameter.MSG_INFO_C11);
	});
	
	/*固定电话号码验证*/
	$("#customer_phone").blur(function(){
		var bool = commonFunc.textVilidator(true,$("#customer_phone"),WebInitParameter.CUSTOMER_TEL_VILIDATE_REGEX,WebInitParameter.MSG_INFO_C12);
	});
	
	/*手机号码验证*/
	$("#customer_cellPhone").blur(function(){
		var bool = commonFunc.textVilidator(true,$("#customer_cellPhone"),WebInitParameter.CUSTOMER_MOBILE_VILIDATE_REGEX,WebInitParameter.MSG_INFO_C13);
	});
	
	/*保存用户基本信息方法*/
	$("#customer_base_save").click(function(){
		
		showMsg(WebInitParameter.MSG_SHOW_C01);
		

		var ajaxResponse = getUserInfo("");
		
		ovtAjaxMethod(ajaxRegPath+"ajaxUserInfoSave.do",ajaxResponse,function(data){
			hideMsg();
			if(data.code == "0"){
				alert(WebInitParameter.MSG_INFO_C01);
				//将用户id保存到隐藏域中
				$("#customer_id").val(data.value);
			}else{
				alert(WebInitParameter.MSG_INFO_C02+data.value);
			}
		});

	});
	
	/*购买设备显示隐藏方法*/
	$("#equipment_title").click(function(){
		changeHide("equipment_info","equipment_title_icon");
	});
	
	/*主副终端单选按钮响应方法*/
	$("#setBoxTypeMain").click(function(){
		$("#setBoxTypeSecondarySelect").attr("disabled",true);
	});
	$("#setBoxTypeSecondary").click(function(){
		//判断是否需要验证用户类型
		if(commonFunc.addEquConfine("")){
			$("#setBoxTypeMain").trigger("click");//模拟点击
			return;
		}
		var $table = $("#selectedEquipmentTable");
		if($table.find("tr").length==1){
			alert(WebInitParameter.MSG_EQU_C01);
			$("#setBoxTypeMain").trigger("click");//模拟点击
			return ;
		}
		$("#setBoxTypeSecondarySelect").attr("disabled",false);	
	});
	
	//设备隐藏信息的表示
	$("#equVarDiv").empty().append("<div class = '"+WebInitParameter.DEBUG_MODE+"'><span id = 'equ_GroupMaxNum'></span><table id='equVar'></table></div>");
	
	/*安装地址自动填充片区信息*/
	if(WebInitParameter.AUTO_ADD_AREA == WebInitParameter.AUTO_ADD_AREA_ON){
			$("#customer_installAddress").focus(function(){
//				if($.trim($(this).val())==''){
					// 修改 开户时三级片区为空时自动添加"---无---"的情况  2012-06-26 Xu Liu
					var tempContent = $("#customer_areaLevel1").find("option:selected").text() + $("#customer_areaLevel2").find("option:selected").text();
					if ($("#customer_areaLevel3").find("option:selected").text() != "---无---") {
						tempContent = tempContent + $("#customer_areaLevel3").find("option:selected").text();
					}
					$(this).val(tempContent).trigger("select");
//				}
			}).blur(function(){
//				if($.trim($("#customer_contactAddress").val())==''){
//					$("#customer_contactAddress").val($(this).val());
//				}
				$("#customer_contactAddress").val($(this).val());
			});
	}
	/*联系地址自动填充片区信息*/
//	if(WebInitParameter.AUTO_ADD_AREA == WebInitParameter.AUTO_ADD_AREA_ON){
//			$("#customer_contactAddress").focus(function(){
//				$(this).val($("#customer_installAddress").val())
//				.trigger("select");
//			});
//	}
	//-------------------------------------增加设备-----------------------------------------------------

	$("#addEquipmentRecord").click(function(){
		var icCardVal = $("#icCardValue").val(),//如果为空则设置为空
		setBoxVal = $("#setBoxValue").val(),//如果为空则设置为空
		setBoxGetValue = $("#setBoxGetType").val(),//机顶盒来源
		setBoxGetName = $("#setBoxGetType").find("option:selected").text(),//来源名称
		icBoxBinding = $("#icBoxBinding").attr("checked"),
		setBoxTypeSecondarySelect = $("#setBoxTypeSecondarySelect").val();
		
		// 获取用户业务类别
		var userBusinessTypes = $("#customer_businessTypes").val();
		if(userBusinessTypes == 0 ){
			alert("模拟电视用户不支持增加设备，请确认选择的业务类型是否正确！");
			return;
		}
		//空判断
		if($.trim(icCardVal)==""){
			alert(WebInitParameter.MSG_EQU_C05);
			$("#icCardValue").focus();
			return ;
		}
//		}else if($.trim(setBoxVal)==""){
//			alert("机顶盒编号不能为空！");
//			$("#setBoxValue").focus();
//			return ;			
//		}
		
		//如果单独添加设备则机卡绑定无效
		if($.trim(icCardVal)==""||$.trim(setBoxVal)==""){
			icBoxBinding = false;
		}
		
		var $table = $("#selectedEquipmentTable");	
		
		//重复判断
		if($table.find("#"+icCardVal).length!=0){
			alert(WebInitParameter.MSG_EQU_C02);
			$("#icCardValue").focus();
			return;
		}
		//得到主副终端判断
		var setBoxTypeVal = $("#setBoxTypeMain").attr("checked");
		var setBoxTypeName = "";
		var newRow = "";
		var $icCardVar = $("#equVar");//保存变量到页面
		var newRecord = "";
		var $secSel = $("#setBoxTypeSecondarySelect");//修改副终端隶属select
		var icBoxBindingVal= icBoxBinding?WebInitParameter.BINDING_TYPE_BINDING:WebInitParameter.BINDING_TYPE_UNBINDING;//获得绑定信息
		var icBoxBindingValue = icBoxBinding?BINDING_TYPE_VALUE_BINDING:BINDING_TYPE_VALUE_UNBINDING;//隐藏表格使用

		//得到用户类型
		var userType = $("#customer_customerType").val();
		
		
		if(setBoxTypeVal){//主终端
			//判断组别
			var groupMaxNum = Number($("#equ_GroupMaxNum").text());
			//判断是否为上限
			groupMaxNum += 1;
			if(groupMaxNum > WebInitParameter.IC_GROUP_MAX_LENGTH){
				alert(WebInitParameter.MSG_EQU_C03);
				return;
			}
			//if(groupMaxNum == 1){
				//setBoxTypeName = CHINESE_SEQ+getChineseNum(groupMaxNum)+GROUP_VALUE_MAIN;
			//}else{
//				setBoxTypeName = WebInitParameter.CHINESE_SEQ+getChineseNum(groupMaxNum)+WebInitParameter.CHINESE_GROUP+WebInitParameter.GROUP_VALUE_MAIN;
			//}
			if(WebInitParameter.FIRST_GROUP_NAME != WebInitParameter.FIRST_GROUP_NAME_DISPLAY){
				if(groupMaxNum == 1){
					setBoxTypeName = WebInitParameter.GROUP_VALUE_MAIN;
				}else{
					if(userType == WebInitParameter.RESIDENT){
						setBoxTypeName = getChineseNum(groupMaxNum)+WebInitParameter.CHINESE_GROUP + WebInitParameter.GROUP_VALUE_MAIN;
					}else{
						setBoxTypeName = WebInitParameter.GROUP_VALUE_MAIN + groupMaxNum;
					}
				}
			}else{
				setBoxTypeName = WebInitParameter.CHINESE_SEQ+getChineseNum(groupMaxNum)+WebInitParameter.CHINESE_GROUP + WebInitParameter.GROUP_VALUE_MAIN;
			}
//			setBoxTypeName = setBoxTypeName + WebInitParameter.GROUP_VALUE_MAIN;
			//修改副终端隶属select
			$secSel.append("<option value='"+icCardVal+"'>"+icCardVal+"&nbsp;"+setBoxTypeName+"</option>");
			//隐藏变量保存
			newRecord = "<tr id='equVar_"+icCardVal+"'><td>"+groupMaxNum+"</td><td>"+icCardVal+"</td><td>"+icCardVal+"</td><td>"+0+"</td><td>"+setBoxVal+"</td><td>"+setBoxGetValue+"</td><td>"+icBoxBindingValue+"</td><td>"+setBoxTypeName+"</td></tr>";
			$icCardVar.append(newRecord);
			//已选设备保存
			newRow = "<tr id='"+icCardVal+"'><td><input type='checkbox' value='"+icCardVal+"' checked = 'checked'/></td><td>"+icCardVal+"</td><td>"+setBoxTypeName+"</td><td>"+setBoxVal+"</td><td>"+setBoxGetName+"</td><td>"+icBoxBindingVal+"</td></tr>";
			$table.append(newRow);
			//终端组数量
			$("#equ_GroupMaxNum").text(groupMaxNum);
			
		}else{//副终端
			if(setBoxTypeSecondarySelect=='-1'){
				alert(WebInitParameter.MSG_EQU_C06);
				$("#setBoxTypeSecondarySelect").focus();
				return;
			}
			//判断组别
			var groupNum = $("#equVar_"+setBoxTypeSecondarySelect).find("td").eq(0).text();
			//判断上限
			var $trs = $icCardVar.find("tr");
			var groupMaxNum = 0;
			$trs.each(function(){
				 var mainIcId = $(this).find("td").eq(2).text();
				 if(setBoxTypeSecondarySelect == Number(mainIcId)){
					 groupMaxNum +=1;
				 }
			});
//			alert("groupMaxNum："+groupMaxNum);
			if (groupMaxNum >= WebInitParameter.IC_GROUP_HAS_SIZE){
				alert(WebInitParameter.MSG_EQU_C04);
				return;
			}
			if(WebInitParameter.FIRST_GROUP_NAME != WebInitParameter.FIRST_GROUP_NAME_DISPLAY){
				if(groupNum == 1){
					setBoxTypeName = "";
				}else{
					setBoxTypeName = getChineseNum(groupNum)+WebInitParameter.CHINESE_GROUP;
				}
			}else{
				setBoxTypeName = WebInitParameter.CHINESE_SEQ+getChineseNum(groupNum)+WebInitParameter.CHINESE_GROUP;
			}
			
			setBoxTypeName = setBoxTypeName + WebInitParameter.CHINESE_SEQ+getChineseNum(groupMaxNum)+WebInitParameter.GROUP_VALUE_SLAVE;
			//隐藏变量保存
			newRecord = "<tr id='equVar_"+icCardVal+"'><td>"+groupNum+"</td><td>"+icCardVal+"</td><td>"+setBoxTypeSecondarySelect+"</td><td>"+groupMaxNum+"</td><td>"+setBoxVal+"</td><td>"+setBoxGetValue+"</td><td>"+icBoxBindingValue+"</td><td>"+setBoxTypeName+"</td></tr>";
//			$icCardVar.append(newRecord);
			var $insertVarTr = $("#equVar_"+setBoxTypeSecondarySelect);
			for(var i = 1 ;i<groupMaxNum; i+=1){
				$insertVarTr = $insertVarTr.next();
			}
			$insertVarTr.after(newRecord);
			//已选设备保存
			newRow = "<tr id='"+icCardVal+"'><td><input type='checkbox' value='"+icCardVal+"'  checked = 'checked'/></td><td><span class='ui_icon secondary_icon'></span>"+icCardVal+"</td><td>"+setBoxTypeName+"</td><td>"+setBoxVal+"</td><td>"+setBoxGetName+"</td><td>"+icBoxBindingVal+"</td></tr>";
			var $insertTr = $("#"+setBoxTypeSecondarySelect);
			for(var i = 1 ;i<groupMaxNum; i+=1){
				$insertTr = $insertTr.next();
			}
			$insertTr.after(newRow);
		}
		//清除输入框文本，获取焦点
		$("#icCardValue").val("");
		$("#setBoxValue").val("");
		$("#icCardModel").val("");
		$("#stbModel").val("");
		$("#icCardValue").trigger("focus");
		
		
		//增加可以编辑的方法
		//对新增加的行的IC卡，增加点击操作
		var $modifyIcTd = $("#"+icCardVal).find("td").eq(1);
		var clicked = 0;
		//alert($modifyTd);
		$modifyIcTd.click(function(){
			if(clicked == 1)
				return;
			var tdVal = $(this).text();
			if($.trim(tdVal)=="")
				return;
			clicked = 1;
			//处理卡信息
			var tdOldVal = $(this).parent().attr("id");//更新id
			var tdHtml = $(this).html();
			$(this).text("");
			$(this).append("<input class='input_text text_focus' type = 'text' id= 'input_ic_td_"+tdOldVal+"' value='"+tdVal+"'>");
			$("#input_ic_td_"+tdOldVal).trigger("focus").trigger("select");
			//阻止事件冒泡
			$("#input_ic_td_"+tdOldVal).click(
					function(event)
					{
					   event.stopPropagation();
					}
			);
			//卡失去焦点
			$("#input_ic_td_"+tdOldVal).blur(function(){
				var tdNewVal = $(this).val();
				//前台验证
				if($.trim(tdNewVal) == ""){
					alert(WebInitParameter.MSG_EQU_C09);
					 $(this).trigger("focus");
					return ;
				}
				$(this).remove();
				//如果没有改变，则返回
				if(tdNewVal == tdVal){
					$modifyIcTd.html(tdHtml);//保证保留副终端号码前面的符号
					return
				}
				modifyIcInSelectedTable($modifyIcTd,tdNewVal,tdVal,tdOldVal);
				//联动盒信息
				var ajaxRes = {
						equType:"card",
						equDesc:tdNewVal
				}
				ovtAjaxMethod(ajaxEquPath+"ajaxSTBCardCascade.do",ajaxRes,function(data){
					if(data.code=='0'){
						if(data.value.equNo!=""){
							modifyStdInSelectTable($modifyIcTd.next().next(),data.value.equNo,tdNewVal);
						}
					}
				});
			});
			clicked = 0;
		});
		//对新增加的行的机顶盒，增加点击操作
		var $modifyStbTd = $("#"+icCardVal).find("td").eq(3);
		$modifyStbTd.click(function(){
			if(clicked == 1)
				return;
			var tdVal = $(this).text();
			if($.trim(tdVal)=="")
				return;

			clicked = 1;
			//处理盒信息
			var tdOldVal = $(this).parent().attr("id");//更新id
			$(this).text("");
			$(this).append("<input class='input_text text_focus' type = 'text' id= 'input_stb_td_"+tdOldVal+"' value='"+tdVal+"'>");
			$("#input_stb_td_"+tdOldVal).trigger("focus").trigger("select");
			
			//阻止事件冒泡
			$("#input_stb_td_"+tdOldVal).click(
					function(event)
					{
					   event.stopPropagation();
					}
			);
			//失去焦点
			$("#input_stb_td_"+tdOldVal).blur(function(){
				var tdNewVal = $(this).val();
				//前台验证
				if($.trim(tdNewVal) == ""){
					alert(WebInitParameter.MSG_EQU_C10);
					$(this).trigger("focus");
					return ;
				}
				$(this).remove();
				//如果没有改变，则返回
				if(tdNewVal == tdVal){
					$modifyStbTd.text(tdVal);
					return;
				}
				modifyStdInSelectTable($modifyStbTd,tdNewVal,tdOldVal);
				//联动卡信息
				var ajaxRes = {
						equType:"stb",
						equDesc:tdNewVal
				}
				ovtAjaxMethod(ajaxEquPath+"ajaxSTBCardCascade.do",ajaxRes,function(data){
					if(data.code=='0'){
						if(data.value.equNo!=""){
							modifyIcInSelectedTable($modifyStbTd.prev().prev(),data.value.equNo,$modifyStbTd.prev().prev().text(),tdOldVal);
						}
					}
				});
			});
			clicked = 0;
		});

	});

	$("#customer_businessTypes").change(function(){
		if($("#customer_businessTypes").val() == 0){
			if($("#selectedEquipmentTable").find("tr:has(:checked)").length > 0){
				alert("该用户下有设备存在，不能够更改为模拟电视用户!");
				$("#customer_businessTypes").val(1);
				return;
			}
		}
	});
		
	//修改已选设备表，卡信息方法封装
	function modifyIcInSelectedTable($modifyIcTd,tdNewVal,tdVal,tdOldVal){
		var $secSel = $("#setBoxTypeSecondarySelect");//修改副终端隶属select
		var tdContent = "";
		
		//判断是否为主终端
		if(tdOldVal != $("#equVar_"+tdOldVal).find("td").eq(2).text()){
			tdContent = "<span class='ui_icon secondary_icon'></span>";
		}else{
			//修改所有的主终端为该号码的副终端的主终端
			var groupNo = $("#equVar_"+tdOldVal).find("td").eq(0).text();
			var $equTrs = $("#equVar").find("tr");
			$equTrs.each(function(){
				var $equTds  = $(this).find("td");
				if($equTds.eq(0).text()==groupNo){
					$equTds.eq(2).text(tdNewVal);
				}
			});
		}
		//修改隐藏关系表格，
		$("#equVar_"+tdOldVal).attr("id","equVar_"+tdNewVal);//id
		$("#equVar_"+tdNewVal).find("td").eq(1).text(tdNewVal);//卡号
		$modifyIcTd.html(tdContent+tdNewVal);
		
		//修改所列表格的行的id
		$("#"+tdOldVal).attr("id",tdNewVal);
		//修改隐藏关系表格，修改主终端下拉列表
		if($secSel.find("option[value='"+tdVal+"']").length!=0){
			$("#setBoxTypeSecondarySelect").find("option[value='"+tdOldVal+"']").remove();
			$secSel.append("<option value='"+tdNewVal+"'>"+tdNewVal+"&nbsp;"+$("#"+tdNewVal).find("td").eq(2).text()+"</option>");
		}
		
		//判断是否已经购买产品，如果已经购买产品，则修改该产品信息
		var $productVar = $("#productVar");
		if($productVar.find("tr").length!=0){
			$productVar.find("tr").each(function(n,value){
				var cardNos = $(this).find("td").eq(7).text();
				var $cardNoDivs = $(this).find("td").eq(1).find("div");
				var cardNoNews = new Array();
				$(cardNos.split(",")).each(function(nn,inValue){
					if(inValue==tdVal){
						cardNoNews.push(tdNewVal);
						$cardNoDivs.each(function(){
							var cont = $(this).html().replace(inValue,tdNewVal);
							$(this).html(cont);
						});
					}else{
						cardNoNews.push(inValue);
					}
				});
				$(this).find("td").eq(7).text(cardNoNews.join());
			});
			flushProducts("");
		}
	}
	
	
	//修改已选设备表，盒信息方法封装
	function modifyStdInSelectTable($modifyStbTd,tdNewVal,tdOldVal){
		$modifyStbTd.text(tdNewVal);
		$("#equVar_"+tdOldVal).find("td").eq(4).text(tdNewVal);//机顶盒号
	}
	
	//机卡绑定联动--卡 //机卡联动使用下拉显示控件替代 2012-11-8 yzy
//	$("#icCardValue").blur(function(){
//		equCascade("card",$("#icCardValue"),$("#setBoxValue"),$("#icCardModel"),$("#stbModel"));
//	});
//	//机卡绑定联动--盒
//	$("#setBoxValue").blur(function(){
//		equCascade("stb",$("#setBoxValue"),$("#icCardValue"),$("#stbModel"),$("#icCardModel"));
//	});

	//-------------------------------------增加设备--完成-------------------------------------------------
	
	//-------------------------------------删除设备-----------------------------------------------------
	$("#delEquipmentRecord").click(function(){
		var $table = $("#selectedEquipmentTable");
		var $icCardVar = $("#equVar");
		var selectTrIds = new Array();
//		alert($table.find("tr:has(:checked)").length);
		//首先删除设备，其次删除订购
		$table.children("tbody").children("tr").each(function(){
			var $tr = $(this);
			if($(this).children("td").eq(0).find("input").attr("checked")){
				selectTrIds.push($tr.attr("id"));
			}
		});
		var selectTrIdsLength = selectTrIds.length;
		for(var i =0 ; i<selectTrIdsLength; i+=1){
			var icCardVal = selectTrIds.pop();
			
			//判断是否已经购买产品，如果已经购买产品，则不允许删除
			var $productVar = $("#productVar");
			var usedFlag = false;
			$productVar.find("tr").each(function(n,value){
				var cardNos = $(this).find("td").eq(8).text();
				$(cardNos.split(",")).each(function(nn,inValue){
					if(inValue==icCardVal){
						usedFlag = true;
					}
				});
			});
			
			if(usedFlag){
				alert(WebInitParameter.MSG_EQU_C15);
				return;
			}
				
			
			var $tr = $("#equVar_"+icCardVal);//得到隐藏行
			var $tds = $tr.find("td");////得到隐藏行td组
			var groupNo = $tds.eq(0).text();//得到组号
			var groupMaxNum = 0 ;// 得到同组的行数
			$icCardVar.find("tr").each(function(){
				if($(this).find("td").eq(0).text()==groupNo){
					groupMaxNum+=1;
				}
			});
			
			var equCode = Number($tds.eq(3).text());//终端编号，主终端为0,第一副终端为1等
			if(equCode != 0){
				if(groupMaxNum == equCode+1){//最后一个副终端，则直接删除
					$tr.remove();
					$("#"+icCardVal).remove();
				}else{//否则提示
					alert(WebInitParameter.MSG_EQU_C07);
					return;
				}
			}else{//主终端
				if(groupMaxNum>1){//还存在副终端
					alert(WebInitParameter.MSG_EQU_C07);
					return;
				}else{
					//判断是否为最后的主终端
					if(groupNo < Number($("#equ_GroupMaxNum").text())){
						alert(WebInitParameter.MSG_EQU_C08);
						return;
					}
					//删除已选表
					$("#"+icCardVal).remove();
					//删除隐藏关系表
					$tr.remove();
					//减少当前全部组数
					$("#equ_GroupMaxNum").text(($("#equ_GroupMaxNum").text())-1);
					//删除从属下拉列表
					$("#setBoxTypeSecondarySelect").find("option[value='"+icCardVal+"']").remove();
				}
			}
		}
		
		//删除订购
		$orderTable = $table.children("tbody").children("tr").children("td").children("table");
		$orderTable.each(function(){
			var $trs = $(this).find("tr:has(:checked)");
			$trs.each(function(){
				var $td = $(this).find("td");
				var icNos = $(this).parent().parent().parent().parent().children("td").eq(1).text();
				var $equVarTrs = $("#equVar_"+icNos);
				var equVarOrderArr  = $equVarTrs.find("td").eq(8).text().split("$");
				var addOrderArr = new Array();
				for(var k = 0; k < equVarOrderArr.length;k+=1){
					if($td.find("input").val()==equVarOrderArr[k].split(",")[0]){
						$(this).remove();
					}else{
						addOrderArr.push(equVarOrderArr[k]);
					}
				}
				$equVarTrs.find("td").eq(8).text(addOrderArr.join("$"));
			});
		});
	});
	
	
	
	
	//-------------------------------------删除设备--完成-----------------------------------------------
	

	
	
	//-------------------------------------购买基本产品操作-----------------------------------------------------
	/*购买基本产品显示隐藏方法*/
	$("#product_base_title").click(function(){
		changeHide("product_base_info","product_base_title_icon");//切换显示隐藏购买产品信息
	});
	
	/*画出产品弹出页面*/
//	$("#base_product_info").append(drawProductDiv(""));
	orderInit("");
	
	/*购买基本产品弹出页面*/
	$("#addBaseProductButton").click(function(){
		$("#base_selectedProductIcCard").find(":not(:first-child)").remove();
		var $trs = $("#equVar").find("tr");
		var trsIndex = 0;
		$trs.each(function(){
			$("#base_selectedProductIcCard").append("<option value='"+$(this).find("td").eq(1).text()+"'>"+$(this).find("td").eq(1).text()+"&nbsp;"+$(this).find("td").eq(4).text()+"</option>")
		});	
		
//		$("#base_product_info").locateCenter();
		$("#base_product_info").position("relitive")
		var x = $("#base_product_info").position();
		$("#base_product_info").css("top",x.top + 200);
		$("#base_product_info").css("left","220px");
		$("#base_product_info").removeClass("hide");
		$("#mask").toggle();
	});
	
	//删除已选基本产品
	$("#delBaseProduct").click(function(){
		var $trs = $("#selectedBaseProductTable").find("tr:has(:checked)");
		var $varTrs = $("#productVar").find("tr");
		var idsArr = new Array();
		if($trs.length == 0){
			alert(WebInitParameter.MSG_EQU_C12);
		}else{
			$trs.each(function(){
				idsArr.push($(this).find("td").find("input").val());
				$(this).remove();
			});
			$(idsArr).each(function(n,value){
				var idVar = value;
				$varTrs.each(function(){
					if($(this).find("td").eq(0).text() == idVar){
						$(this).remove();
					}
				});
			});
		}
	});
	
	
	/*购买产品选择终端弹出页面--确定按钮响应方法*/
	$("#select_equ_but_selected").click(function(){
		if(!flushProductVar("")){
			return;
		}
		flushProducts("");
		
		$("#base_product_info").addClass("hide");
		$("#select_equ_div").addClass("hide");
		$("#mask").toggle();
	});
	
	//-------------------------------------购买基本产品操作--修改-----------------------------------------------
	$("#addBaseProductButtonInEquipment").click(function(){
		var $checkeds = $("#selectedEquipmentTable").find("input:checked");
		if($checkeds.length == 0){
			alert(WebInitParameter.MSG_EQU_C11);
			return false;
		}
//		$("#base_product_info").locateCenter();
		$("#base_product_info").position("relitive")
		var x = $("#base_product_info").position();
		$("#base_product_info").css("top",x.top + 200);
		$("#base_product_info").css("left","220px");
		$("#base_product_info").removeClass("hide");
		$("#mask").toggle();
	});
	
	

	//--------------------------------------处理费用确认消息页-------------------------------------------------------
	//收费项弹出窗口
	$("#confirmBut").click(function(){
		$("#mask").toggle();
		//得到用户基本信息
		var ajaxResponse = getUserInfo("");

		//得到设备信息并进行封装
		ajaxConfirmEquDesc = getEquDescForFeeItem();
		//根据配置的参数决定使用哪种方式获取设备和订购信息
		if(WebInitParameter.ORDER_VIEW_TYPE_V1 == WebInitParameter.ORDER_VIEW_TYPE){
			getEquAndOrder1(ajaxResponse);
		}else if(WebInitParameter.ORDER_VIEW_TYPE_V2 == WebInitParameter.ORDER_VIEW_TYPE){
			getEquAndOrder2(ajaxResponse);
		}
		//保存需要传输的数据
		ajaxResData = ajaxResponse;
		//保存ajax请求地址
		ajaxConfirmPath = ajaxRegPath+"ajaxUserAllInfoSave.do";
		//保存callback函数
		$confirmCallback = saveUserInfoSuccess;
		confirmFee("",BUSINESS_TYPE.OPEN_ACCOUNT_CODE,"new");
		
	});
	//收费确认返回
	$("#confirm_cancel").click(function(){
		$("#confirm_cost_div").addClass("hide");
		$("#mask").toggle();
	});
	
	//--------------------------------------处理保存全部信息和打印开户信息--------------------------------------------
	
	/*保存全部信息*/
	$("#confirm_continue").click(function(){
		
		//在确认页面已经显示蒙板，故此处关闭蒙板，后面会自动重开蒙板
		$("#mask").toggle();
		$("#confirm_cost_div").addClass("hide");
		
		
		
		showMsg(WebInitParameter.MSG_SHOW_C02);
		
		//得到用户基本信息
		var ajaxResponse = getUserInfo("");
		
//		//得到选择的设备信息并组装字符串
//		var $equipmentTable = $("#selectedEquipmentTable");
//		var $icCardVar = $("#equVar");
//		var customer_account = $("#customer_account").val()==""?"?":$("#customer_account").val();
//		
//		var equipmentResult = "";
//		var mainEqu = "";
//		
//		$("#equVar").find("tr").each(function(){
//			var $tds = $(this).find("td");
//			equipmentResult = equipmentResult + $tds.eq(0).text();//组号
//			equipmentResult = equipmentResult +":"+ $tds.eq(1).text();//智能卡号
//			equipmentResult = equipmentResult +":"+ $tds.eq(2).text();//主终端卡号
//			equipmentResult = equipmentResult +":"+ $tds.eq(3).text();//终端编号
//			equipmentResult = equipmentResult +":"+ $tds.eq(4).text();//机顶盒编号
//			equipmentResult = equipmentResult +":"+ $tds.eq(5).text();//机顶盒来源
//			equipmentResult = equipmentResult +":"+ $tds.eq(6).text();//绑定类型
//			equipmentResult = equipmentResult + "&";
//		});
//		
		//测试json对象数组的返回
//		ovtAjaxMethod(ajaxRegPath+"ajaxTest.do",{aa:"123123"},function(data){
//			alert($(data).length);
//			$(data).each(function(n,value){
//				alert(n+":"+value.userCoding+":"+value.name+":"+value.gender);
//			});
//		});

		//测试json返回数组对象
//		ovtAjaxMethod(ajaxRegPath+"ajaxTest.do",{aa:"123123"},function(data){
//			alert("$(data).length:"+$(data).length);
//			alert("code:"+data.code);
//			alert("value.length:"+data.value.length);
//			$(data.value).each(function(n,val){
//				alert(val);
//			});
//		});
//		
//		ajaxResponse.equipmentResult = equipmentResult;//封装设备信息
//		
//		ajaxResponse.customerOrder = getProductFromVar("");//封装用户订购信息
//		alert("customerOrder:"+ajaxResponse.customerOrder);
		//得到订购的产品信息并组装字符串
		
		
		//根据配置的参数决定使用哪种方式获取设备和订购信息
		if(WebInitParameter.ORDER_VIEW_TYPE_V1 == WebInitParameter.ORDER_VIEW_TYPE){
			getEquAndOrder1(ajaxResponse);
		}else if(WebInitParameter.ORDER_VIEW_TYPE_V2 == WebInitParameter.ORDER_VIEW_TYPE){
			getEquAndOrder2(ajaxResponse);
		}
		
		//得到缴费确认信息
		
		ajaxResponse.confirmCost = confirmContinue("");
		//提交ajax，完成返回
		ovtAjaxMethod(ajaxRegPath+"ajaxUserAllInfoSave.do",ajaxResponse,function(data){
			
			if(data.code == "0"){
				alert("保存成功!");
				window.location.href="../../../../jsp/boss/customer/register/register.do";
//				showPayment("",data.value);
			}else{
				alert("保存失败："+data.value);
			}
			hideMsg();
		});
	});
	});//webInit方法
	/*结束*/
});

/*第一种显示模式下的设备和订购信息获取方式*/
function getEquAndOrder1(ajaxResponse){
	//得到选择的设备信息并组装字符串
	var $icCardVar = $("#equVar");
	var equipmentResult = "";
	
	$("#equVar").find("tr").each(function(){
		var $tds = $(this).find("td");
		equipmentResult = equipmentResult + $tds.eq(0).text();//组号
		equipmentResult = equipmentResult +":"+ $tds.eq(1).text();//智能卡号
		equipmentResult = equipmentResult +":"+ $tds.eq(2).text();//主终端卡号
		equipmentResult = equipmentResult +":"+ $tds.eq(3).text();//终端编号
		equipmentResult = equipmentResult +":"+ $tds.eq(4).text();//机顶盒编号
		equipmentResult = equipmentResult +":"+ $tds.eq(5).text();//机顶盒来源
		equipmentResult = equipmentResult +":"+ $tds.eq(6).text();//绑定类型
		equipmentResult = equipmentResult + "&";
	});

	ajaxResponse.equipmentResult = equipmentResult;//封装设备信息
	
	ajaxResponse.customerOrder = getProductFromVar("");//封装用户订购信息
	
	return ajaxResponse;
}


/*第二种显示模式下的设备和订购信息获取方式*/
function getEquAndOrder2(ajaxResponse){
	//得到选择的设备信息并组装字符串
	var $icCardVar = $("#equVar");
	var equipmentResult = "";
	var mainEqu = "";
	
	$("#equVar").find("tr").each(function(){
		var $tds = $(this).find("td");
		equipmentResult = equipmentResult + $tds.eq(0).text();//组号
		equipmentResult = equipmentResult +":"+ $tds.eq(1).text();//智能卡号
		equipmentResult = equipmentResult +":"+ $tds.eq(2).text();//主终端卡号
		equipmentResult = equipmentResult +":"+ $tds.eq(3).text();//终端编号
		equipmentResult = equipmentResult +":"+ $tds.eq(4).text();//机顶盒编号
		equipmentResult = equipmentResult +":"+ $tds.eq(5).text();//机顶盒来源
		equipmentResult = equipmentResult +":"+ $tds.eq(6).text();//绑定类型
		equipmentResult = equipmentResult +":"+ $tds.eq(8).text();//订购信息
		equipmentResult = equipmentResult + "&";
	});

	ajaxResponse.equipmentResult = equipmentResult;//封装设备信息
	return ajaxResponse;
}

/*根据设备信息封装收费项使用*/
function getEquDescForFeeItem(){
	var equDesc = "";//设备类型:设备编号
	var $icCardVar = $("#equVar");
	$("#equVar").find("tr").each(function(){
		var $tds = $(this).find("td");
		equDesc = equDesc + "card" ;
		equDesc = equDesc + ":" + $tds.eq(1).text();//智能卡号
		equDesc = equDesc + ":" + " ";
		equDesc = equDesc + "&";
		equDesc = equDesc + "stb";
		equDesc = equDesc + ":" + $tds.eq(4).text();//机顶盒编号
		equDesc = equDesc + ":" + $tds.eq(5).text();
		equDesc = equDesc + "&";
	});
	return equDesc;
}

function saveUserInfoSuccess(data){
	window.location.href="../../../../jsp/boss/customer/register/register.do";
}
//开户设备输入验证 2013-6-22 yzy
function inputEquNoCheckFunc(customIn){
	if(customIn=="icCardValue"){
		if($("#cusDiv").css("display")==undefined || $("#cusDiv").css("display")=='none'){
			equCascade("card",$("#icCardValue"),$("#setBoxValue"),$("#icCardModel"),$("#stbModel"));
		}
	}
	if(customIn=="setBoxValue"){
		if($("#cusDiv").css("display")==undefined || $("#cusDiv").css("display")=='none'){
			equCascade("stb",$("#setBoxValue"),$("#icCardValue"),$("#stbModel"),$("#icCardModel"));
		}
	}
}
//开户设备输入方式查询sql动态修改  2013-6-22 yzy
function cardInputTypeChange(){
	var inType = $("#cardInputTypeSelect").val();
	if(inType==null||'1'==inType){
		//做模糊查询sql
		var selectsql="";
		selectsql+="select equ_info.equ_no as '卡号' into icCardValue, equ_info.model as '型号' into icCardModel , ic_stb_equ_no.stb as '机顶盒号' into setBoxValue , ic_stb_equ_no.stb_model as '型号' into stbModel"; 
		selectsql+="	 from    ";
		selectsql+="	(";
		selectsql+="select e.id id  ,e.equ_no equ_no  , equ_model.name model   from boss_equ_info e ,   (";
		selectsql+="	            select p.value value ,p.name name  from pms_parameter p  where menu_id ='equModel'";
		selectsql+="		            ) equ_model   where  e.model=equ_model.value and  equ_type='IC_CARD' and status=2 and  equ_no like '%inparavalue%'  and  rownum<11   order by length(e.equ_no)";
		selectsql+=")  equ_info   left join ";
		selectsql+="	(";
		selectsql+="select r.equ_id1 id1  ,e1.equ_no stb  ,model_name1.name stb_model , r.equ_id2 id2 ,e2.equ_no ic   , model_name2.name  ic_model";
		selectsql+="	  from boss_equ_info  e1  ,  boss_equ_rela r   , boss_equ_info  e2  , ";
		selectsql+="(";
		selectsql+="  select p.value value ,p.name name  from pms_parameter p  where menu_id ='equModel'";
		selectsql+="  ) model_name1, ";
		selectsql+="  (";
		selectsql+="   select p.value value ,p.name name  from pms_parameter p  where menu_id ='equModel'";
		selectsql+="    ) model_name2   ";
		selectsql+="	  where  e2.id in  ( select id   from boss_equ_info    where  equ_type='IC_CARD' and status=2 and  equ_no like '%inparavalue%'    )";    
		selectsql+="        and    e1.id=r.equ_id1 and e2.id=r.equ_id2  and  model_name1.value=e1.model and model_name2.value=e2.model and  r.rela_id='STB-IC_CARD'   ";         
		selectsql+="	) ic_stb_equ_no    on equ_info.id = ic_stb_equ_no.id2 ";
		$("#icCardValue").attr("selectsql",selectsql);
		
		var stbselectsql="";
		stbselectsql+="  	select ic_stb_equ_no.ic as '卡号' into icCardValue, ic_stb_equ_no.ic_model as '型号' into icCardModel , equ_info.equ_no as '机顶盒号' into setBoxValue , equ_info.model as '型号' into stbModel"; 
		stbselectsql+="	   from    ";
		stbselectsql+="	(";
		stbselectsql+="	select e.id id  ,e.equ_no equ_no  , equ_model.name model   from boss_equ_info e ,   (";
		stbselectsql+="	            select p.value value ,p.name name  from pms_parameter p  where menu_id ='equModel'";
		stbselectsql+="	            ) equ_model   where  e.model=equ_model.value and  equ_type='STB' and status=2 and  equ_no like '%inparavalue%'  and  rownum<11  order by length(e.equ_no)";
		stbselectsql+="	)  equ_info   left join ";
		stbselectsql+="	(";
		stbselectsql+="	select r.equ_id1 id1  ,e1.equ_no stb  ,model_name1.name stb_model , r.equ_id2 id2 ,e2.equ_no ic   , model_name2.name  ic_model";
		stbselectsql+="	  from boss_equ_info  e1  ,  boss_equ_rela r   , boss_equ_info  e2  , ";
		stbselectsql+="	    (";
		stbselectsql+="	    select p.value value ,p.name name  from pms_parameter p  where menu_id ='equModel'";
		stbselectsql+="	    ) model_name1, ";
		stbselectsql+="	    (";
		stbselectsql+="	    select p.value value ,p.name name  from pms_parameter p  where menu_id ='equModel'";
		stbselectsql+="	    ) model_name2   ";
		stbselectsql+="	  where  e1.id in  ( select id  from boss_equ_info    where  equ_type='STB' and status=2 and  equ_no like '%inparavalue%'   )";    
		stbselectsql+="	         and    e1.id=r.equ_id1 and e2.id=r.equ_id2  and  model_name1.value=e1.model and model_name2.value=e2.model and  r.rela_id='STB-IC_CARD'  ";          
		stbselectsql+="	) ic_stb_equ_no    on equ_info.id = ic_stb_equ_no.id1  ";
		$("#setBoxValue").attr("selectsql",stbselectsql);
		
	}else if('2'==inType){
		//扫枪不做模糊查询
		$("#icCardValue").attr("selectsql","");
		$("#setBoxValue").attr("selectsql","");
	}
}
//开户设备输入查询sql初始赋值  2013-6-22 yzy
function cardInputTypeInit(){
	var init = $("#cardInputTypeInit").val();
	if(init=='0'){
		$("#cardInputTypeInit").val(init+=1);
		cardInputTypeChange();
	}
}
