/*发票显示封装*/
function drawInvoiceDiv($invoice,contentId){
	var content ="";
	content = content +"<div id = 'invoiceShow"+contentId+"' class='hide invoice_input_class'>";
	content = content +"<div id='invoiceMain_title"+contentId+"' class='dialog_title'><span id='invoiceMain_close_icon"+contentId+"' class='ui_icon dialog_close_icon'></span></div>";
	content = content +"<div id = 'invoiceMain"+contentId+"' class='payment_div_class'>";
	content = content +"<div>发票信息:</div>";
	
	content = content +"<table class = 'tableBorder' id = 'invoice_info_main"+contentId+"'><tr>";
	content = content +"<td colspan='2'><span id = 'name_invoice_info_title"+contentId+"'>发票抬头:</span><span id = 'value_invoice_info_title"+contentId+"'><input type='text' id='invoice_info_title"+contentId+"' size = '50' maxlength='100'/></span></td>";
	content = content +"<td><span id = 'name_invoice_info_invoiceNo"+contentId+"'>发票号码:</span><span id = 'value_invoice_info_invoiceNo"+contentId+"'><input type='text' id='invoice_info_invoiceNo"+contentId+"'/></span></td>";
	content = content +"</tr><tr>";
	content = content +"<td colspan='2'><span id = 'name_invoice_info_address"+contentId+"'>发票地址:</span><span id = 'value_invoice_info_address"+contentId+"'><input type='text' id='invoice_info_address"+contentId+"' size = '50' maxlength='100'/></span></td>";
	content = content +"<td><span id = 'name_invoice_info_industryType"+contentId+"'>行业分类:</span><span id = 'value_invoice_info_industryType"+contentId+"'><select id='invoice_info_industryType"+contentId+"'></select></span></td>";
	content = content +"</tr><tr>";
	content = content +"<td colspan='2'><span id = 'name_invoice_info_payee"+contentId+"'>收款单位:</span><span id = 'value_invoice_info_payee"+contentId+"'><select id='invoice_info_payee"+contentId+"'></select></span></td>";
	content = content +"<td><span id = 'name_invoice_info_payType"+contentId+"'>付款方式:</span><span id = 'value_invoice_info_payType"+contentId+"'><select id='invoice_info_payType"+contentId+"'></select></span></td>";
	content = content +"</tr><tr>";
	content = content +"<td><span id = 'name_invoice_info_totalMoney"+contentId+"'>发票总额:</span><span id = 'value_invoice_info_totalMoney"+contentId+"'><input type='text' id='invoice_info_totalMoney"+contentId+"' style='text-align:right;'/></span></td>";
	content = content +"<td><span id = 'name_invoice_info_openDate"+contentId+"'>开票时间:</span><span id = 'value_invoice_info_openDate"+contentId+"'><input type='text' id='invoice_info_openDate"+contentId+"' size='12' maxlength='20' /></span></td>";
	content = content +"<td><span id = 'name_invoice_info_openOper"+contentId+"'>开票人名:</span><span id = 'value_invoice_info_openOper"+contentId+"'><input type='text' id='invoice_info_openOper"+contentId+"'/></span></td>";
	content = content + "</tr></table>"

	
	content = content +"<div><table class = 'tableBorder'><tr><td colspan='3'><span>备注：</span><span><textarea rows='3' cols='70'  id='invoice_remark"+contentId+"' /></span></td></tr>";//显示订购的备注信息 2012-4-5 yzy
	content = content +"<tr><td colspan='3'>提示:备注信息如需打印时，请将每一行的字数限制在30个字内，超过时请手动换行，否则影响打印效果。</td></tr></table></div>";
	content = content +"<div>发票项目:</div>"
	content = content +"<table class = 'tableBorder'  id = 'invoice_details"+contentId+"'>";
//	content = content +"<tr id = 'invoice_detail_1"+contentId+"'><td><span>项目名称:</span><span><input type='text' id='invoice_detail_itemName_1"+contentId+"'/></span></td><td><span>单价:</span><span><input type='text' id='invoice_detail_price_1"+contentId+"'  size = '10' maxlength='10'/></span></td><td><span>数量:</span><span><input type='text' id='invoice_detail_count_1"+contentId+"'  size = '10' maxlength='10'/></span></td><td><span>金额:</span><span><input type='text' id='invoice_detail_balance_1"+contentId+"'  size = '10' maxlength='10'/></span></td></tr>";
	content = content +"</table>";
	content = content +"<div id = 'invoice_otherContent"+contentId+"'>";
//	content = content +"<div style='margin:5px;'><input type ='button' value='增加项目' id ='invoice_detail_but_add"+contentId+"'/><input type ='button' value='删除收费项' id ='invoice_detail_but_sub"+contentId+"'/></div>";
//	content = content +"<div class='border_top'><input type ='button' value='打印' class='bigButton' id ='invoice_but_print"+contentId+"'/><input type ='button' value='关闭' class='bigButton'  id ='invoice_but_cancel"+contentId+"'/></div>"
	content = content + "</div>";
	content = content + "</div>";
//	content = content +"<div id='print_back"+contentId+"'></div>";
	content = content + "</div>";
//	content = content +"<div id='print_back"+contentId+"'></div>";
	content = content +"<input type = 'hidden' id='invoice_receiptIds"+contentId+"'/><input type = 'hidden' id='invoice_details_count"+contentId+"' value='0' /><input type = 'hidden' id='invoice_id"+contentId+"' />";//添加订购备注 2012-3-7 yzy //去掉隐藏备注信息<input type = 'hidden' id='invoice_remark"+contentId+"' />
	$invoice.empty().append(content);
}

/*初始化新增加发票信息*/
function createInvoiceInit($invoice,customerId,contentId,userInfo,receiptIds){
	drawInvoiceDiv($invoice,contentId);
	
	//发票地址
	$("#invoice_info_address"+contentId).val(userInfo.address);
	//发票抬头
	$("#invoice_info_title"+contentId).val(userInfo.name);
	//发票总额
//	var $trs = $("#other_content_accountHis_table"+contentId).find("tr:has(:checked)");
//	var total = 0;
//	$trs.each(function(n,value){
//		total = total + Number($(this).find("td").eq(4).text());
//	});
	
	$("#invoice_receiptIds"+contentId).val(receiptIds);//账户变动历史id
	//初始化发票信息，使用查看发票信息一样的方法
	var ajaxObj = {receiptIds : receiptIds,customer_id:customerId};//将账户变动id传递过去，返回收费项
	ovtAjaxMethod(ajaxInvoicePath+"ajaxGetInvoice.do",ajaxObj,function(data){
		if(data.code!="0"){
			alert(data.value);
			return;
		}
		$("#invoice_info_industryType"+contentId).html(data.value.industryTypeInfo);
		$("#invoice_info_payee"+contentId).html(data.value.payeeInfo);
		$("#invoice_info_payType"+contentId).html(data.value.payTypeInfo);
		$("#invoice_info_openDate"+contentId).attr("readOnly",true).val(data.value.openDateStr);
		$("#invoice_info_openOper"+contentId).attr("readOnly",true).val(data.value.openOper);
		$("#invoice_info_totalMoney"+contentId).attr("readOnly",true).val(Number(data.value.totalMoney).toFixed(2));
		$("#invoice_remark"+contentId).val(data.value.remark);//添加订购备注 2012-3-7 yzy
		//封装显示的发票项
		if($(data.value.detailList).length == 0){
			var content ="";
			content = content +"<tr id = 'invoice_detail_1"+contentId+"'><td><input type='checkbox' /></td><td><span>项目名称:</span><span><input type='text' id='invoice_detail_itemName_1"+contentId+"'/></span></td><td><span>单价:</span><span><input type='text' id='invoice_detail_price_1"+contentId+"'  size = '10' maxlength='10'  style='text-align:right;'/></span></td><td><span>数量:</span><span><input type='text' id='invoice_detail_count_1"+contentId+"'  size = '10' maxlength='10'/></span></td><td><span>金额:</span><span><input type='text' id='invoice_detail_balance_1"+contentId+"'  size = '10' maxlength='10'  readOnly='readOnly'  style='text-align:right;'/><input type='hidden' id='invoice_detail_itemType_1"+contentId+"' value=' '/></span></td></tr>";
			addDetailsCount(contentId);
		}else{
			var content ="";
			$(data.value.detailList).each(function(n,value){
				content = content +"<tr id = 'invoice_detail_"+(n+1)+contentId+"'><td><input type='checkbox' /></td><td><span>项目名称:</span><span><input type='text' id='invoice_detail_itemName_"+(n+1)+contentId+"' value='"+value.itemName+"'/></span></td><td><span>单价:</span><span><input type='text' id='invoice_detail_price_"+(n+1)+contentId+"'  size = '10' maxlength='10' value='"+Number(value.price).toFixed(2)+"'  style='text-align:right;'/></span></td><td><span>数量:</span><span><input type='text' id='invoice_detail_count_"+(n+1)+contentId+"'  size = '10' maxlength='10' value='"+value.count+"' /></span></td><td><span>金额:</span><span><input type='text' id='invoice_detail_balance_"+(n+1)+contentId+"'  size = '10' maxlength='10'  readOnly='readOnly' value='"+Number(value.balance).toFixed(2)+"'  style='text-align:right;'/><input type='hidden' id='invoice_detail_itemType_"+(n+1)+contentId+"' value='"+value.itemType+"'/></span></td></tr>";
				addDetailsCount(contentId);
			});
		}
		
		$("#invoice_details"+contentId).append(content);
		
		$("#invoice_details"+contentId).find("tr").each(function(n,value){
			$("#invoice_detail_price_"+(n+1)+contentId).keyup(function(){
				changeMoeny(contentId,(n+1));
			});
			$("#invoice_detail_count_"+(n+1)+contentId).keyup(function(){
				changeMoeny(contentId,(n+1));
			});
			
		});
		
		//增加获取焦点样式
		$invoice.find("input[type=text]").addClass("input_text").clickChangeColor("text_focus");
		
	});
	
	
	
	content = "<div style='margin:5px;'><input type ='button' value='增加项目' id ='invoice_detail_but_add"+contentId+"'/><input type ='button' value='删除收费项' id ='invoice_detail_but_sub"+contentId+"'/></div>";
	content = content +"<div class='border_top'><input type ='button' value='打印' class='bigButton' id ='invoice_but_print"+contentId+"'/><input type ='button' value='关闭' class='bigButton'  id ='invoice_but_cancel"+contentId+"'/></div>"
	$("#invoice_otherContent"+contentId).append(content);
	
	//增加css样式
//	$invoice.find("input[type=text]").addClass("input_text").clickChangeColor("text_focus");
	//允许拖拽
	$("#invoiceMain_title"+contentId).drag("#invoiceShow"+contentId);
	
	
	//增加按钮事件----关闭
	$("#invoiceMain_close_icon"+contentId).click(function(){
		$("#invoiceShow"+contentId).addClass("hide");
		$("#mask").toggle();		
	});
	$("#invoice_but_cancel"+contentId).click(function(){
		$("#invoiceShow"+contentId).addClass("hide");
		$("#mask").toggle();
	});
	
	//增加项目
	$("#invoice_detail_but_add"+contentId).click(function(){
		var $detailTable = $("#invoice_details"+contentId);
		var count = addDetailsCount(contentId);
		var content = "<tr id ='invoice_detail_"+count+contentId+"'><td><input type='checkbox' /></td><td><span>项目名称:</span><span><input type='text' id='invoice_detail_itemName_"+count+contentId+"'/></span></td><td><span>单价:</span><span><input type='text' id='invoice_detail_price_"+count+contentId+"'  size = '10' maxlength='10'/></span></td><td><span>数量:</span><span><input type='text' id='invoice_detail_count_"+count+contentId+"'  size = '10' maxlength='10'/></span></td><td><span>金额:</span><span><input type='text' id='invoice_detail_balance_"+count+contentId+"'  size = '10' maxlength='10' readOnly='readOnly'/><input type='hidden' id='invoice_detail_itemType_"+count+contentId+"' value=' '/></span></td></tr>";
		$detailTable.append(content);
		$("#invoice_detail_"+count+contentId).find("input[type=text]").addClass("input_text").clickChangeColor("text_focus");

		$("#invoice_detail_price_"+count+contentId).keyup(function(){
			changeMoeny(contentId,count);
		});
		$("#invoice_detail_count_"+count+contentId).keyup(function(){
			changeMoeny(contentId,count);
		});
		
	});
	//删除项目
	$("#invoice_detail_but_sub"+contentId).click(function(){
		var $detailTable = $("#invoice_details"+contentId);
		var $removeTrs = $detailTable.find("tr:has(:checked)");
		if($detailTable.find("tr").length <=1 || $detailTable.find("tr").length == $removeTrs.length){
			alert(WebInitParameter.MSG_BUSI_C24);
			return ;
		}
		if($removeTrs.length == 0){
			alert(WebInitParameter.MSG_BUSI_C18);
			return;
		}
		$detailTable.find("tr:has(:checked)").remove();
	});
	
	//打印发票页面----打印按钮响应
	$("#invoice_but_print"+contentId).click(function(){
		// add by jhg 按钮触发时将按钮置为不可用
		$("#invoice_but_print"+contentId).attr("disabled",true);
		var ajaxInvoice = invoiceValue(contentId);
		if(ajaxInvoice == false){
			alert(WebInitParameter.MSG_INFO_C08);
			return;
		}
		if(!moneyOk($invoice,contentId)){
			alert(WebInitParameter.MSG_BUSI_C32);
			return;
		}
		ajaxInvoice.customer_id = customerId;
		ovtAjaxMethod(ajaxInvoicePath+"ajaxSaveInvoice.do",ajaxInvoice,function(data){
			// add by jhg 后台调用返回后将按钮恢复
			$("#invoice_but_print"+contentId).attr("disabled",false);
			if(data.code!="0"){
				alert(data.value);
			}else{
				var ajaxPrintRes = {
						userId:customerId,
						printType:0,
						registerId:"0001",
						invoiceId:data.value,
						operatingCompany:WebInitParameter.PARAM_OPERATING_COMPANY
				}
				printCredential(ajaxPrintRes,contentId,receiptFunc.flushReceiptAndInvoice,{customerId:customerId,contentId:contentId,newPage:0});
//				flushInovice({contentId:contentId,customerId:customerId,newPage:0});
			}
			//调用liuyajie打印方法，传输发票号过去
			$("#invoiceShow"+contentId).addClass("hide");
			$("#mask").toggle();
		});
	});
}

/*显示页面*/
function invoiceShow(contentId,customerId,receiptIds,userInfo){
	//显示页面
	createInvoiceInit($("#invoice_content_showDiv"+contentId),customerId,contentId,userInfo,receiptIds);
	$("#invoiceShow"+contentId).locateLeftTop().removeClass("hide");
	$("#mask").toggle();
}

/*得到发票值*/
function invoiceValue(contentId){
	var ajaxRes = {
			receiptIds:$("#invoice_receiptIds"+contentId).val(),
			invoiceNo:$("#invoice_info_invoiceNo"+contentId).val(),
			title:$("#invoice_info_title"+contentId).val(),
			address:$("#invoice_info_address"+contentId).val(),
			industryType:$("#invoice_info_industryType"+contentId).val(),
			payType:$("#invoice_info_payType"+contentId).val(),
			payee:$("#invoice_info_payee"+contentId).val(),
			totalMoney:$("#invoice_info_totalMoney"+contentId).val(),
			openDate:$("#invoice_info_openDate"+contentId).val(),
			openOper:$("#invoice_info_openOper"+contentId).val(),
			remark:$("#invoice_remark"+contentId).val()==null?'':('null'==$("#invoice_remark"+contentId).val()?'':$("#invoice_remark"+contentId).val()),//添加订购备注 2012-3-7 yzy
			invoiceDetail:""
	};
	var $detailTrs = $("#invoice_details"+contentId).find("tr");
	var ret = true;
	$detailTrs.each(function(){
		var $tds = $(this).find("td");
		$tds.find("input[type=text]").each(function(){
			if(!$(this).attr("disabled")&&$(this).val() == ""){
				ret = ret && false;
			}
		});
		if(!ret)
			return ret;
		ajaxRes.invoiceDetail = ajaxRes.invoiceDetail + $tds.eq(1).find("input").val() +":" +$tds.eq(2).find("input").val() +":"+$tds.eq(3).find("input").val() +":"+$tds.eq(4).find("input").eq(0).val()+":"+$tds.eq(4).find("input").eq(1).val() ;
		ajaxRes.invoiceDetail = ajaxRes.invoiceDetail + "&";
	});
	if(!ret)
		return ret;
//	alert(ajaxRes.invoiceDetail);
	return ajaxRes;
}


/*刷新发票列表*/
function flushInovice(option){
	var contentId = option.contentId,customerId=option.customerId,newSearch=option.newPage;
	var $invoice = $("#invoice_content_table"+contentId);
	var searchObj = {
			customer_id:customerId,
			invoiceSartDate:$("#invoice_contnet_startDate"+contentId).val(),
			invoiceEndDate:$("#invoice_contnet_endDate"+contentId).val()
	}
	if(newSearch == 0){
		searchObj.currentPage = 1;
	}else{
		searchObj.currentPage = $("#currentPage"+"_invoice"+contentId).text();
	}
	ovtAjaxMethod(ajaxInvoicePath+"ajaxSearchInvoices.do",searchObj,function(data){
		if(data.code!='0'){
			alert(data.value);
			return;
		}
		$invoice.find("tr:not(:first-child)").remove();
		if($(data.value.objList).length!=0){
			var content = "";
			$(data.value.objList).each(function(n,value){
				content = content +"<tr><td><input type='radio' value='"+value.id+"' name='invoice_check"+contentId+"'/></td><td>"+value.invoiceNo+"</td><td align='right'>"+value.totalMoney+"</td><td>"+value.openDateStr+"</td><td>"+value.openOper+"</td><td><input type='hidden' value='"+value.validStatus+"'>"+value.validStatusStr+"</td><td><input type='hidden' value='"+value.printStatus+"'>"+value.printStatusStr+"</td></tr>";
			});
			$invoice.append(content);
			$("#invoice_content_pageBar"+contentId).pagination("_invoice"+contentId,data.value.currentPage,data.value.totalPage,flushInovice,{contentId:contentId,customerId:customerId});
		}
	});
}

//查看发票信息初始化
function viewInvoiceInit($invoice,contentId,invoiceId,customerId){
	drawInvoiceDiv($invoice,contentId);
	var ajaxInvoice = {
			invoiceId:invoiceId,
			customer_id:customerId
	};
	ovtAjaxMethod(ajaxInvoicePath+"ajaxGetInvoice.do",ajaxInvoice,function(data){
		if(data.code!="0"){
			alert(data.value);
			return;
		}
		inputInoviceInfo(contentId,data.value,true);
		var content ="";
		content = "<tr><td><span>有效状态:<input type='text' readOnly='readOnly' value='"+data.value.validStatusStr+"'/></span></td><td><span>打印状态:<input type='text' readOnly='readOnly' value='"+data.value.printStatusStr+"'/></span></td><td>&nbsp;</td></tr>"
		
		$("#invoice_info_main"+contentId).append(content);
		
		
		//发票明细
//		content = "<tr><th>项目名称</th><th>单价</th><th>数量</th><th>金额</th></tr>";
		content ="";
		$(data.value.detailList).each(function(n,value){
			content = content + "<tr><td>项目名称:<input type='text' value='"+value.itemName+"' readOnly='readOnly'/></td><td>单价:<input type='text' value='"+value.price+"'  size = '10' maxlength='10' readOnly='readOnly'/></td><td>数量:<input type='text' value='"+value.count+"'  size = '10' maxlength='10' readOnly='readOnly'/></td><td>金额:<input type='text' value='"+value.balance+"'  size = '10' maxlength='10' readOnly='readOnly'/></td></th>";
		});
		
		$("#invoice_details"+contentId).empty().append(content);
		
//		content ="<div>关联缴费历史信息:</div>";
//		content = content + "<table class='tableBorder'><tr><th>变动时间</th><th>变动类型</th><th>出入标志</th><th>变动金额</th><th>变动原因</th></tr>";
//		
//		$(data.value.userAccountHisList).each(function(n,value){
//			content = content + "<tr><td>"+value.createDate+"</td><td>"+value.paymentTypeStr+"</td><td>"+value.flag+"</td><td>"+value.mainMoney+"</td><td>"+value.cause+"</td></tr>";
//		});
//		content = content + "</table>";
		content = "";
		content = content +"<div class='border_top'><input type ='button' value='关闭' class='bigButton'  id ='invoice_but_cancel"+contentId+"'/></div>"

		$("#invoice_otherContent"+contentId).empty().append(content);
		
		$("#invoiceMain_title"+contentId).drag("#invoiceShow"+contentId);
		
		$invoice.find("input[type=text]").addClass("input_text");
		
		//增加按钮事件----关闭
		$("#invoiceMain_close_icon"+contentId).click(function(){
			$("#invoiceShow"+contentId).addClass("hide");
			$("#mask").toggle();		
		});
		$("#invoice_but_cancel"+contentId).click(function(){
			$("#invoiceShow"+contentId).addClass("hide");
			$("#mask").toggle();
		});

		$("#invoiceShow"+contentId).locateLeftTop().removeClass("hide");
		$("#mask").toggle();

		
	});
}

/*回填发票信息*/
function inputInoviceInfo(contentId,invoice,readOnly){
	$("#invoice_info_title"+contentId).attr("readOnly",readOnly).val(invoice.title);
	$("#invoice_info_invoiceNo"+contentId).attr("readOnly",readOnly).val(invoice.invoiceNo);
	$("#invoice_info_address"+contentId).attr("readOnly",readOnly).val(invoice.address);
	$("#invoice_info_industryType"+contentId).attr("disabled",readOnly).html(invoice.industryTypeInfo);
	$("#invoice_info_payee"+contentId).attr("disabled",readOnly).html(invoice.payeeInfo);
	$("#invoice_info_payType"+contentId).attr("disabled",readOnly).html(invoice.payTypeInfo);
	$("#invoice_info_totalMoney"+contentId).attr("readOnly",readOnly).val(invoice.totalMoney);
	$("#invoice_info_openDate"+contentId).attr("readOnly",readOnly).val(invoice.openDateStr);
	$("#invoice_info_openOper"+contentId).attr("readOnly",readOnly).val(invoice.openOper);
	$("#invoice_remark"+contentId).val(invoice.remark),//添加订购备注 2012-3-7 yzy

	$("#invoice_id"+contentId).val(invoice.id);
}

/*发票号码回填调用方法*/
function invoiceNoWriteBack($invoice,contentId,invoiceId,customerId){
	drawInvoiceDiv($invoice,contentId);
	var ajaxInvoice = {
			invoiceId:invoiceId,
			customer_id:customerId
	};
	ovtAjaxMethod(ajaxInvoicePath+"ajaxGetInvoice.do",ajaxInvoice,function(data){
		if(data.code!="0"){
			alert(data.value);
			return;
		}
		inputInoviceInfo(contentId,data.value,true);
		var content ="";
		content = "<tr><td><span>有效状态:<input type='text' readOnly='readOnly' value='"+data.value.validStatusStr+"'/></span></td><td><span>打印状态:<input type='text' readOnly='readOnly' value='"+data.value.printStatusStr+"'/></span></td><td>&nbsp;</td></tr>"
		
		$("#invoice_info_main"+contentId).append(content);

		content ="";
		$(data.value.detailList).each(function(n,value){
			content = content + "<tr><td>项目名称:<input type='text' value='"+value.itemName+"' readOnly='readOnly'/></td><td>单价:<input type='text' value='"+value.price+"'  size = '10' maxlength='10' readOnly='readOnly'/></td><td>数量:<input type='text' value='"+value.count+"'  size = '10' maxlength='10' readOnly='readOnly'/></td><td>金额:<input type='text' value='"+value.balance+"'  size = '10' maxlength='10' readOnly='readOnly'/></td></th>";
		});
		
		$("#invoice_details"+contentId).empty().append(content);

		
		content ="";
		content = content +"<div class='border_top'><input type ='button' value='保存' class='bigButton' id ='invoice_but_print"+contentId+"'/><input type ='button' value='关闭' class='bigButton'  id ='invoice_but_cancel"+contentId+"'/></div>"
		
		$("#invoice_otherContent"+contentId).empty().append(content);
		
		$("#invoiceMain_title"+contentId).drag("#invoiceShow"+contentId);
		
		$invoice.find("input[type=text]").addClass("input_text");
		
		$("#invoice_info_invoiceNo"+contentId).clickChangeColor("text_focus").attr("readOnly",false).focus();
		
		//增加按钮事件----关闭
		$("#invoiceMain_close_icon"+contentId).click(function(){
			$("#invoiceShow"+contentId).addClass("hide");
			$("#mask").toggle();		
		});
		$("#invoice_but_cancel"+contentId).click(function(){
			$("#invoiceShow"+contentId).addClass("hide");
			$("#mask").toggle();
		});

		
		$("#invoice_but_print"+contentId).click(function(){
			var invoiceNo = $("#invoice_info_invoiceNo"+contentId).val();
			if($.trim(invoiceNo) == ""){
				alert(WebInitParameter.MSG_BUSI_C26);
				return;
			}
			var ajaxInvoiceObj = {
					invoiceId:invoiceId,
					invoiceNo:invoiceNo
			};
			ovtAjaxMethod(ajaxInvoicePath+"ajaxInvoiceNoWriteBack.do",ajaxInvoiceObj,function(databack){
				alert(databack.value);
				$("#invoiceShow"+contentId).addClass("hide");
				$("#mask").toggle();
				if(data.code == "0"){
					flushInovice({contentId:contentId,customerId:customerId,newPage:0});
				}
			});
		});
		$("#invoiceShow"+contentId).locateLeftTop().removeClass("hide");
		$("#mask").toggle();
	});
}


/*发票作废方法*/
function invoiceDiscard($invoice,contentId,invoiceId,customerId){
	drawInvoiceDiv($invoice,contentId);
	var ajaxInvoice = {
			invoiceId:invoiceId,
			customer_id:customerId
	};
	ovtAjaxMethod(ajaxInvoicePath+"ajaxGetInvoice.do",ajaxInvoice,function(data){
		if(data.code!="0"){
			alert(data.value);
			return;
		}
		inputInoviceInfo(contentId,data.value,true);
		var content ="";
		content = "<tr><td><span>有效状态:<input type='text' readOnly='readOnly' value='"+data.value.validStatusStr+"'/></span></td><td><span>打印状态:<input type='text' readOnly='readOnly' value='"+data.value.printStatusStr+"'/></span></td><td>&nbsp;</td></tr>"
		
		$("#invoice_info_main"+contentId).append(content);

		content ="";
		$(data.value.detailList).each(function(n,value){
			content = content + "<tr><td>项目名称:<input type='text' value='"+value.itemName+"' readOnly='readOnly'/></td><td>单价:<input type='text' value='"+value.price+"'  size = '10' maxlength='10' readOnly='readOnly'/></td><td>数量:<input type='text' value='"+value.count+"'  size = '10' maxlength='10' readOnly='readOnly'/></td><td>金额:<input type='text' value='"+value.balance+"'  size = '10' maxlength='10' readOnly='readOnly'/></td></th>";
		});
		
		$("#invoice_details"+contentId).empty().append(content);

		
		content ="";
		content = content +"<div class='border_top'><input type ='button' value='作废' class='bigButton' id ='invoice_but_print"+contentId+"'/><input type ='button' value='关闭' class='bigButton'  id ='invoice_but_cancel"+contentId+"'/></div>"
		
		$("#invoice_otherContent"+contentId).empty().append(content);
		
		$("#invoiceMain_title"+contentId).drag("#invoiceShow"+contentId);
		
		//增加按钮事件----关闭
		$("#invoiceMain_close_icon"+contentId).click(function(){
			$("#invoiceShow"+contentId).addClass("hide");
			$("#mask").toggle();		
		});
		$("#invoice_but_cancel"+contentId).click(function(){
			$("#invoiceShow"+contentId).addClass("hide");
			$("#mask").toggle();
		});

		
		$("#invoice_but_print"+contentId).click(function(){
			var ajaxInvoiceObj = {
					invoiceId:invoiceId
			};
			ovtAjaxMethod(ajaxInvoicePath+"ajaxInvoiceDiscard.do",ajaxInvoiceObj,function(databack){
				alert(databack.value);
				$("#invoiceShow"+contentId).addClass("hide");
				$("#mask").toggle();
				if(data.code == "0"){
					flushInovice({contentId:contentId,customerId:customerId,newPage:0});
				}
			});
		});
		$("#invoiceShow"+contentId).locateLeftTop().removeClass("hide");
		$("#mask").toggle();
	});
}

/*发票作废重打*/
function discardReprint($invoice,contentId,invoiceId,customerId){
	drawInvoiceDiv($invoice,contentId);
	var ajaxInvoice = {
			invoiceId:invoiceId,
			customer_id:customerId
	};
	ovtAjaxMethod(ajaxInvoicePath+"ajaxGetInvoice.do",ajaxInvoice,function(data){
		if(data.code!="0"){
			alert(data.value);
			return;
		}
		//清除发票号码
		data.value.invoiceNo='';
		inputInoviceInfo(contentId,data.value,false);
		var content ="";
		content = "<tr><td><span>有效状态:<input type='text' readOnly='readOnly' value='"+data.value.validStatusStr+"'/></span></td><td><span>打印状态:<input type='text' readOnly='readOnly' value='"+data.value.printStatusStr+"'/></span></td><td>&nbsp;</td></tr>"
		
		$("#invoice_info_main"+contentId).append(content);
		
		
		//发票明细
//		content = "<tr><th>项目名称</th><th>单价</th><th>数量</th><th>金额</th></tr>";
		content ="";
		$(data.value.detailList).each(function(n,value){
			content = content + "<tr id = 'invoice_detail_"+(n+1)+contentId+"'><td><input type='checkbox' /></td><td><span>项目名称:</span><span><input type='text'  value='"+value.itemName+"'  id='invoice_detail_itemName_"+(n+1)+contentId+"'/></span></td><td><span>单价:</span><span><input type='text' id='invoice_detail_price_"+(n+1)+contentId+"'  value='"+value.price+"'   size = '10' maxlength='10'/></span></td><td><span>数量:</span><span><input type='text' id='invoice_detail_count_"+(n+1)+contentId+"'  value='"+value.count+"'  size = '10' maxlength='10'/></span></td><td><span>金额:</span><span><input type='text' id='invoice_detail_balance_"+(n+1)+contentId+"'  value='"+value.balance+"'  size = '10' maxlength='10'  readOnly='readOnly'/><input type='hidden' id='invoice_detail_itemType_"+(n+1)+contentId+"' value='"+value.itemType+"'/></span></td></tr>";
			addDetailsCount(contentId);
		});
		
		$("#invoice_details"+contentId).empty().append(content);
		
		$(data.value.detailList).each(function(n,value){
			$("#invoice_detail_price_"+(n+1)+contentId).keyup(function(){
				changeMoeny(contentId,(n+1));
			});
			$("#invoice_detail_count_"+(n+1)+contentId).keyup(function(){
				changeMoeny(contentId,(n+1));
			});
		});
		

		
		
//		content ="<div>关联缴费历史信息:</div>";
//		content = content + "<table class='tableBorder'><tr><th>变动时间</th><th>变动类型</th><th>出入标志</th><th>变动金额</th><th>变动原因</th></tr>";
//		
//		$(data.value.userAccountHisList).each(function(n,value){
//			content = content + "<tr><td>"+value.createDate+"</td><td>"+value.paymentTypeStr+"</td><td>"+value.flag+"</td><td>"+value.mainMoney+"</td><td>"+value.cause+"</td></tr>";
//		});
//		content = content + "</table>";

		content = "";
		content = content + "<div style='margin:5px;'><input type ='button' value='增加项目' id ='invoice_detail_but_add"+contentId+"'/><input type ='button' value='删除收费项' id ='invoice_detail_but_sub"+contentId+"'/></div>";
		content = content + "<div class='border_top'><input type ='button' value='作废重打' class='bigButton' id ='invoice_but_print"+contentId+"'/><input type ='button' value='关闭' class='bigButton'  id ='invoice_but_cancel"+contentId+"'/></div>"

//		$("#invoice_otherContent"+contentId).append(content);

		$("#invoice_otherContent"+contentId).empty().append(content);
		
		//发票总额不能修改
		$("#invoice_info_totalMoney"+contentId).attr("readOnly",true);
		
		$("#invoiceMain_title"+contentId).drag("#invoiceShow"+contentId);
		
		$invoice.find("input[type=text]").addClass("input_text");

		$("#invoiceShow"+contentId).locateLeftTop().removeClass("hide");
		$("#mask").toggle();

		
		//增加按钮事件----关闭
		$("#invoiceMain_close_icon"+contentId).click(function(){
			$("#invoiceShow"+contentId).addClass("hide");
			$("#mask").toggle();		
		});
		$("#invoice_but_cancel"+contentId).click(function(){
			$("#invoiceShow"+contentId).addClass("hide");
			$("#mask").toggle();
		});
		
		//增加项目
		$("#invoice_detail_but_add"+contentId).click(function(){
			var $detailTable = $("#invoice_details"+contentId);
			var count = addDetailsCount(contentId);
			var content = "<tr id ='invoice_detail_"+count+contentId+"'><td><input type='checkbox' /></td><td><span>项目名称:</span><span><input type='text' id='invoice_detail_itemName_"+count+contentId+"'/></span></td><td><span>单价:</span><span><input type='text' id='invoice_detail_price_"+count+contentId+"'  size = '10' maxlength='10'/></span></td><td><span>数量:</span><span><input type='text' id='invoice_detail_count_"+count+contentId+"'  size = '10' maxlength='10'/></span></td><td><span>金额:</span><span><input type='text' id='invoice_detail_balance_"+count+contentId+"'  size = '10' maxlength='10' readOnly/><input type='hidden' id='invoice_detail_itemType_"+count+contentId+"' value=' '/></span></td></tr>";
			$detailTable.append(content);
			$("#invoice_detail_"+count+contentId).find("input[type=text]").addClass("input_text").clickChangeColor("text_focus");
			

			$("#invoice_detail_price_"+count+contentId).keyup(function(){
				changeMoeny(contentId,count);
			});
			$("#invoice_detail_count_"+count+contentId).keyup(function(){
				changeMoeny(contentId,count);
			});
			

		});
		//删除项目
		$("#invoice_detail_but_sub"+contentId).click(function(){
//			var $detailTable = $("#invoice_details"+contentId);
//			if($detailTable.find("tr").length <=1){
//				alert(WebInitParameter.MSG_BUSI_C24);
//				return ;
//			}
//			$detailTable.find("tr:last-child").remove();
			var $detailTable = $("#invoice_details"+contentId);
			var $removeTrs = $detailTable.find("tr:has(:checked)");
			if($detailTable.find("tr").length <=1 || $detailTable.find("tr").length == $removeTrs.length){
				alert(WebInitParameter.MSG_BUSI_C24);
				return ;
			}
			if($removeTrs.length == 0){
				alert(WebInitParameter.MSG_BUSI_C18);
				return;
			}
			$detailTable.find("tr:has(:checked)").remove();

		});
		
		//作废重打按钮响应
		$("#invoice_but_print"+contentId).click(function(){
			var ajaxInvoice = invoiceValue(contentId);
			if(ajaxInvoice == false){
				alert(WebInitParameter.MSG_INFO_C08);
				return;
			}
			if(!moneyOk($invoice,contentId)){
				alert(WebInitParameter.MSG_BUSI_C32);
				return;
			}
			ajaxInvoice.customer_id = customerId;
			ajaxInvoice.invoiceId = invoiceId;
			ovtAjaxMethod(ajaxInvoicePath+"ajaxSaveInvoice.do",ajaxInvoice,function(data){
				if(data.code!="0"){
					alert(data.value);
				}else{
					var ajaxPrintRes = {
							userId:customerId,
							printType:0,
							registerId:"0001",
							invoiceId:data.value,
							operatingCompany:WebInitParameter.PARAM_OPERATING_COMPANY
					}
					//调用liuyajie打印方法，传输发票号过去
					printCredential(ajaxPrintRes,contentId);
					flushInovice({contentId:contentId,customerId:customerId,newPage:0});
				}
				$("#invoiceShow"+contentId).addClass("hide");
				$("#mask").toggle();
			});
		});
	});
}


//发票冲红初始化
function negativeInvoiceInit($invoice,contentId,invoiceId,customerId){
	drawInvoiceDiv($invoice,contentId);
	var ajaxInvoice = {
			invoiceId:invoiceId,
			negative:0,
			customer_id:customerId
	};
	ovtAjaxMethod(ajaxInvoicePath+"ajaxGetInvoice.do",ajaxInvoice,function(data){
		if(data.code!="0"){
			alert(data.value);
			return;
		}
		//清除发票号码
		data.value.invoiceNo='';
		inputInoviceInfo(contentId,data.value,false);
		var content ="";
		content = "<tr><td><span>有效状态:<input type='text' readOnly='readOnly' value='"+data.value.validStatusStr+"'/></span></td><td><span>打印状态:<input type='text' readOnly='readOnly' value='"+data.value.printStatusStr+"'/></span></td><td>&nbsp;</td></tr>"
		
		$("#invoice_info_main"+contentId).append(content);
		
		
		//发票明细
		content ="";
		$(data.value.detailList).each(function(n,value){
			content = content + "<tr id = 'invoice_detail_"+(n+1)+contentId+"'><td><input type='checkbox' /></td><td><span>项目名称:</span><span><input type='text'  value='"+value.itemName+"'  id='invoice_detail_itemName_"+(n+1)+contentId+"'/></span></td><td><span>单价:</span><span><input type='text' id='invoice_detail_price_"+(n+1)+contentId+"'  value='"+value.price+"'   size = '10' maxlength='10'/></span></td><td><span>数量:</span><span><input type='text' id='invoice_detail_count_"+(n+1)+contentId+"'  value='"+value.count+"'  size = '10' maxlength='10'/></span></td><td><span>金额:</span><span><input type='text' id='invoice_detail_balance_"+(n+1)+contentId+"'  value='"+value.balance+"'  size = '10' maxlength='10'  readOnly='readOnly'/><input type='hidden' id='invoice_detail_itemType_"+(n+1)+contentId+"' value='"+value.itemType+"'/></span></td></tr>";
			addDetailsCount(contentId);
		});
		
		$("#invoice_details"+contentId).empty().append(content);
		
		$(data.value.detailList).each(function(n,value){
			$("#invoice_detail_price_"+(n+1)+contentId).keyup(function(){
				changeMoeny(contentId,(n+1));
			});
			$("#invoice_detail_count_"+(n+1)+contentId).keyup(function(){
				changeMoeny(contentId,(n+1));
			});
		});
		

		content = "";
		content = content + "<div style='margin:5px;'><input type ='button' value='增加项目' id ='invoice_detail_but_add"+contentId+"'/><input type ='button' value='删除收费项' id ='invoice_detail_but_sub"+contentId+"'/></div>";
		content = content + "<div class='border_top'><input type ='button' value='发票冲红' class='bigButton' id ='invoice_but_print"+contentId+"'/><input type ='button' value='关闭' class='bigButton'  id ='invoice_but_cancel"+contentId+"'/></div>"

		$("#invoice_otherContent"+contentId).empty().append(content);
		
		//发票总额不能修改
		$("#invoice_info_totalMoney"+contentId).attr("readOnly",true);
		
		$("#invoiceMain_title"+contentId).drag("#invoiceShow"+contentId);
		
		$invoice.find("input[type=text]").addClass("input_text");

		$("#invoiceShow"+contentId).locateLeftTop().removeClass("hide");
		$("#mask").toggle();

		
		//增加按钮事件----关闭
		$("#invoiceMain_close_icon"+contentId).click(function(){
			$("#invoiceShow"+contentId).addClass("hide");
			$("#mask").toggle();		
		});
		$("#invoice_but_cancel"+contentId).click(function(){
			$("#invoiceShow"+contentId).addClass("hide");
			$("#mask").toggle();
		});
		
		//增加项目
		$("#invoice_detail_but_add"+contentId).click(function(){
			var $detailTable = $("#invoice_details"+contentId);
			var count = addDetailsCount(contentId);
			var content = "<tr id ='invoice_detail_"+count+contentId+"'><td><input type='checkbox' /></td><td><span>项目名称:</span><span><input type='text' id='invoice_detail_itemName_"+count+contentId+"'/></span></td><td><span>单价:</span><span><input type='text' id='invoice_detail_price_"+count+contentId+"'  size = '10' maxlength='10'/></span></td><td><span>数量:</span><span><input type='text' id='invoice_detail_count_"+count+contentId+"'  size = '10' maxlength='10'/></span></td><td><span>金额:</span><span><input type='text' id='invoice_detail_balance_"+count+contentId+"'  size = '10' maxlength='10' readOnly/><input type='hidden' id='invoice_detail_itemType_"+count+contentId+"' value=' '/></span></td></tr>";
			$detailTable.append(content);
			$("#invoice_detail_"+count+contentId).find("input[type=text]").addClass("input_text").clickChangeColor("text_focus");
			

			$("#invoice_detail_price_"+count+contentId).keyup(function(){
				changeMoeny(contentId,count);
			});
			$("#invoice_detail_count_"+count+contentId).keyup(function(){
				changeMoeny(contentId,count);
			});
			

		});
		//删除项目
		$("#invoice_detail_but_sub"+contentId).click(function(){
			var $detailTable = $("#invoice_details"+contentId);
			var $removeTrs = $detailTable.find("tr:has(:checked)");
			if($detailTable.find("tr").length <=1 || $detailTable.find("tr").length == $removeTrs.length){
				alert(WebInitParameter.MSG_BUSI_C24);
				return ;
			}
			if($removeTrs.length == 0){
				alert(WebInitParameter.MSG_BUSI_C18);
				return;
			}
			$detailTable.find("tr:has(:checked)").remove();

		});
		
		//发票冲红按钮响应
		$("#invoice_but_print"+contentId).click(function(){
			var ajaxInvoice = invoiceValue(contentId);
			if(ajaxInvoice == false){
				alert(WebInitParameter.MSG_INFO_C08);
				return;
			}
			if(!moneyOk($invoice,contentId)){
				alert(WebInitParameter.MSG_BUSI_C32);
				return;
			}
			ajaxInvoice.customer_id = customerId;
			ajaxInvoice.invoiceId = invoiceId;
			ajaxInvoice.negative = 0;
			ovtAjaxMethod(ajaxInvoicePath+"ajaxSaveInvoice.do",ajaxInvoice,function(data){
				if(data.code!="0"){
					alert(data.value);
				}else{
					var ajaxPrintRes = {
							userId:customerId,
							printType:0,
							registerId:"0001",
							invoiceId:data.value,
							operatingCompany:WebInitParameter.PARAM_OPERATING_COMPANY
					}
					//调用liuyajie打印方法，传输发票号过去
					printCredential(ajaxPrintRes,contentId);
					flushInovice({contentId:contentId,customerId:customerId,newPage:0});
				}
				$("#invoiceShow"+contentId).addClass("hide");
				$("#mask").toggle();
			});
		});
	});
}


/*判断发票项目明细汇总金额是否与发票总额相等*/
function moneyOk($invoice,contentId){
	var $detailTable = $("#invoice_details"+contentId);
	var totalMoney = $("#invoice_info_totalMoney"+contentId).val();
	var total = 0;
	$detailTable.find("tr").each(function(){
		total += Number($(this).find("td").eq(4).find("input").val());
	});
	if(total == Number(totalMoney)){
		return true;
	}
	return false;
}


/*项目金额变化*/
function changeMoeny(contentId,n){
	$("#invoice_detail_balance_"+n+contentId).val((Number($("#invoice_detail_price_"+n+contentId).val())*Number($("#invoice_detail_count_"+n+contentId).val())).toFixed(2));
}

function addDetailsCount(contentId){
	$("#invoice_details_count"+contentId).val(Number($("#invoice_details_count"+contentId).val())+1);
	return $("#invoice_details_count"+contentId).val();
}
