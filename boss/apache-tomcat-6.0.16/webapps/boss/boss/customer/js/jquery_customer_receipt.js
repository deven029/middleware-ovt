var receiptFunc = new Object();

//----------------------------------------------------刷新缴费日志列表---------------------------------------------
receiptFunc.flushReceipt = function(option){
	var contentId=option.contentId,customerId=option.customerId,newPage=option.newPage;
	var $receipt = $("#receipt_content_table"+contentId);
	var ajaxRes = {
			customer_id:customerId,
			receiptStartDate:$("#receipt_content_startDate"+contentId).val(),
			receiptEndDate:$("#receipt_content_endDate"+contentId).val()
	}
	if(newPage == 0){
		ajaxRes.currentPage = 1;
	}else{
		ajaxRes.currentPage = $("#currentPage"+"_receipt"+contentId).text();
	}
	if($("#other_content_receipt_radio_flushAll"+contentId).attr("checked")){
		ajaxRes.print = "0";
	}else{
		ajaxRes.print = "1";
	}
	ovtAjaxMethod(ajaxReceiptPath+"ajaxGetUserReceipt.do",ajaxRes,function(data){
		if(data.code!='0'){
			alert(data.value);
			return;
		}
		$receipt.find("tr:not(:first-child)").remove();
		if($(data.value.objList).length!=0){
			var content = "";
			var disabled = "disabled";

			$(data.value.objList).each(function(n,value){
				if((value.operType==WebInitParameter.OPER_TYPE_BUY_EQU || value.operType==WebInitParameter.OPER_TYPE_PAYMENT )&& value.invoiceStatus == WebInitParameter.INVOICE_STATUS_UNRELATIVE_INVOICE){
					disabled = "";
				}else{
					disabled = "disabled";
				}
				content = content +"<tr><td><input type='checkbox' value='"+value.id+"'"+disabled+"/></td><td>"+value.operDateStr+"</td><td align='right'>"+value.operMoney+"</td><td><input type='hidden' value='"+value.operType+"'>"+value.operTypeStr+"</td><td>"+value.receiptTypeStr+"</td><td>"+value.loginNo+"</td><td><input type='hidden' value='"+value.invoiceStatus+"'>"+value.invoiceStatusStr+"</td></tr>";
			});
			$receipt.append(content);
			$("#receipt_content_pageBar"+contentId).pagination("_receipt"+contentId,data.value.currentPage,data.value.totalPage,receiptFunc.flushReceipt,{contentId:contentId,customerId:customerId});
		}
	});
	
}

//----------------------------------------------------------------------刷新缴费历史和发票历史--------------------------------------------------------------------
receiptFunc.flushReceiptAndInvoice = function(option){
	receiptFunc.flushReceipt(option);
	flushInovice(option);
}