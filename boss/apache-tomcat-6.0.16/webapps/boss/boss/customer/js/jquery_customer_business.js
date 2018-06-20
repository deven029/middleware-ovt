$(function(){
	webInit(function(){

	/*调用初始化方法*/
	init();
	
	searchInit($("#search_info_div"),"");

	
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
		// 处理宽带业务的显示与关闭
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
	/*封装tab标题鼠标滑过的变化*/
//	function tabTitleHover(){
		//alert($(".tab_title_head").length);
		//$(".tab_title_head").each(function(){
		//	alert($(this));
//			$(this).hover(function(){
				//alert("over");
//				if(!$(this).hasClass("tab_title_head_click")){
//					$(this).removeClass("tab_title_head_out");
//					$(this).removeClass("tab_title_head_click");
//					$(this).addClass("tab_title_head_over");
//				}
//			},function(){
				//alert("out");
//				if(!$(this).hasClass("tab_title_head_click")){
//					$(this).removeClass("tab_title_head_over");
//					$(this).removeClass("tab_title_head_click");
//					$(this).addClass("tab_title_head_out");
//				}
//			});
		//});
//	}
	/*封装tab标题关闭鼠标滑过变化*/
//	function tabTitleCloseHover(){
//		alert("ok");
//		$(".tab_title_head").find("span").hover(function(){
//			$(this).removeClass("dialog_close_icon");
//			$(this).addClass("dialog_close_icon");
//		},function(){
//			$(this).removeClass("dialog_close_icon");
//			$(this).addClass("dialog_close_icon");
//		});
//	}
	
	
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
	function seatchCustomer(newSearch){
		var ajaxResponse = getUserInfo("");
		if(newSearch == 0){
			ajaxResponse.currentPage = 1;
		}else{
			ajaxResponse.currentPage = $("#currentPage").text();
		}
		//显示蒙板和提示信息
		showMsg("用户信息查询");
		
//		ovtAjaxMethod(ajaxBusPath+"ajaxSearchUser.do",ajaxResponse,function(data){
		ovtAjaxMethod(ajaxBusPath+"ajaxSearchUser.do",ajaxResponse,function(data){
			$("#search_info_result_content").empty();
			var userTrs  = "";
			if(data.code!=0){//对系统异常，弹出提示2012-10-18 yzy
				userTrs = userTrs+"<div>"+data.value+"</div>";
				alert(data.value);
			}
			else if($(data.value.objList).length==0){
				userTrs = userTrs+"<div>没有找到相应的用户</div>";
			}else{
				setHide("search_info_content","search_info_title_icon");

				userTrs = userTrs+"<div class='info_title'>点击需要操作的用户</div>";
				userTrs = userTrs+"<table width='100%' class='tableBorder' id='search_info_result_table'>";
				userTrs = userTrs+"<tr class='search_info_result_head'><th>用户编号</th><th>用户名称</th><th>证件号码</th><th>固定电话</th><th>移动电话</th><th>用户状态</th><th>有效状态</th><th>用户类型</th><!--th>所属集团</th><th>用户单位</th--><th>联系地址</th><th>安装地址</th></tr>"
				
				$(data.value.objList).each(function(n,value){
					userTrs = userTrs + "<tr class='search_info_result_content'><td><input type = 'hidden' value='"+value.id+"'/>"+value.userCoding+"</td><td>"+value.name+"</td><td>"+value.identityCard+"</td><td>"+value.tel+"</td><td>"+value.mobile+"</td><td>"+value.status+"</td><td>"+value.validStatus+"</td><td>"+value.type+"</td><!--td>"+value.corpId+"</td><td>"+value.units+"</td--><td>"+value.messageAdr+"</td><td>"+value.address+"</td></tr>";
				});
				
				userTrs = userTrs+"</table>";
				
				//增加分页显示信息
				userTrs = userTrs+"<div id='pageBar'></div>";
			}

			//隐藏蒙板和提示信息
			hideMsg();
			
			$("#search_info_result_content").append(userTrs);
			$("#pageBar").pagination("",data.value.currentPage,data.value.totalPage,seatchCustomer);
			
			/*搜索结果鼠标滑过方法*/
			$(".search_info_result_content").hover(function(){
				// modify by jhg 2013-07-10调整显示颜色
				$(this).css("background-color","rgb(255,255,204)");
			},function(){
				$(this).css("background-color","#FFFFFF");
			});
			
			
			
			/*点击搜索结果方法*/
			$(".search_info_result_content").dblclick(function(){//20110412 修改为双击
				
				var thisIcCard = $(this).find("input").val();
				seacherUser(thisIcCard);
			});//搜索结果点击方法返回结束
			
		});//搜索ajax返回结束
		
	}//点击搜索按钮方法结束
	
	

	
	});
	/*结束*/
});