$(function(){
	webInit(function(){
		var resPara = {userBusiCode:"-2"};
		var parameter ;
		ovtAjaxMethod(ajaxRegPath+"ajaxParameters.do",resPara,function(data){
			if(data.code != '0'){
				alert(WebInitParameter.MSG_INFO_C06);
				return;
			}
		//	$("#customer_customerType"+contentId).append(data.value.customerType);
		//	$("#customer_idType"+contentId).append(data.value.idType);
			//代办人信息封装
		//	$("#agent_idType"+contentId).empty().append(data.value.idType);
			$("#customer_areaLevel1").empty().append(data.value.areaLevel1);
			$("#customer_areaLevel2").empty().append(data.value.areaLevel2);
			$("#customer_areaLevel3").empty().append(data.value.areaLevel3);
		//	$("#customer_contactPostcode"+contentId).empty().append(data.value.messagePostcode);
		//	$("#customer_relateBank"+contentId).empty().append(data.value.relateBank);
		//	$("#customer_status"+contentId).empty().append(data.value.status);
		//	$("#customer_validStatus"+contentId).empty().append(data.value.validStatus);
		//	$("#setBoxGetType"+contentId).empty().append(data.value.stbGetType);//增加机顶盒来源显示
		//	STB_GET_TYPE_HTML = data.value.stbGetType;//增加机顶盒来源显示
		});
					
		
		/*二级片区联动*/
		$("#customer_areaLevel1").change(function(){
			getAreaLevel("",1);
		});
		/*三级片区联动*/
		$("#customer_areaLevel2").change(function(){
			getAreaLevel("",2);
		});
	});
	
});