<%@ page language="java" import="java.util.*" 
import="com.ovt.idtv.boss.web.finance.verifyAccount.model.VerifyAccountInfoForm"
import="com.ovt.idtv.boss.web.stat.util.StatConstants"
pageEncoding="UTF-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ page isELIgnored = "false" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>营业收入统计信息调账</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
    <base ><%String basePath = request.getContextPath();%>
	<link href="<%=basePath%>/css/tabs.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>/common/css/zi.css" rel="stylesheet" type="text/css">
	<link href="<%=basePath%>/boss/charge/table.css" rel="stylesheet" type="text/css"  />
	
	<script language=JavaScript src="<%=basePath%>/common/js/sitech.js"></script>
	<script language=JavaScript src="<%=basePath%>/js/web.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/tabs.js"> </script>
	<script type="text/javascript" src="<%=basePath%>/boss/customer/js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>/boss/customer/js/jquery_customer_parameter.js"></script>
	<script type="text/javascript" src="<%=basePath%>/datepicker/WdatePicker.js"> </script>
	<script type="text/javascript" src="<%=basePath%>/boss/finance/verifyAccount/js/jquery_finance_verifyAccount.js"></script>
    <style type="text/css">
    	.bigButton{font-size:14px;font-weight:700;width:70px;height:25px;}
    </style>
    <script language="javascript">
	
	//保存所有调账信息
	function saveAccountFee(){
		if(confirm("您确认要保存本次调账信息吗?")){
			//
			document.verifyAccountInfoForm.action='<%=basePath%>/jsp/boss/finance/autoVerifyAccountManage/autoVerifyAccountManage.do?methodToCall=saveAccountFee';
			document.verifyAccountInfoForm.submit();
		}
	}
	//取消调账操作
	function cancelAccountFee(name,oriValue,adjustValue){
		var html = '';
		var $me = $("#"+name+"Div");
		$me.empty();
		html += "<a ondblclick=\"editFeeForm(this,'"+name+"','"+oriValue+"','"+adjustValue+"')\">";
		html += oriValue+"&nbsp;&nbsp;"+adjustValue;
		html += "</a>"
		$me.append(html);
	}
	//局部修改金额，修改完成后，将编辑框重新修改成不可变文本
	function modifyAccountFee(name,oriValue,adjustValue){
		var html = '';
		var $me = $("#"+name+"Div");
		var newValue = $("#"+name).val();
		//调账值必须是数据 ，isNaN(newValue)不是数字返回 true
		if(null==newValue || newValue=='' || isNaN(newValue)){
			alert("输入非法!");
			return;
		}
		var para = {
			feeName:name,
			feeValue:newValue
			};
		
		//将调账数据更新到缓存
		var ajaxPath = '<%=basePath%>/jsp/boss/finance/autoVerifyAccountManage/autoVerifyAccountManage.do?methodToCall=modifyAccountFee';
		ovtAjaxMethod(ajaxPath,para,function(data){
			if(data.code != "0"){
				var msg = data.value;
				if(data.value==null||data.value==undefined){
					msg = "连接超时，无法访问服务器！";
				}
				alert(msg);
				return;
			}else if (data.code == "0"){
				//成功后更新
				$me.empty();
				html += "<a ondblclick=\"editFeeForm(this,'"+name+"','"+oriValue+"','"+newValue+"')\">";
				html += oriValue+"&nbsp;&nbsp;"+newValue;
				html += "</a>"
				$me.append(html);
			}
		});
		
		//失败不变
			
	}
	//将不可编辑文本变成 编辑框
	function editFeeForm(me,name,oriValue,adjustValue){
		var html = '';
		//动态给div命名id，外层无法动态设定，使用空名称
		var $me = $(me).parent();
		$me.attr("id",name+'Div');
		$me.empty();
		
		html += oriValue+"&nbsp;";
		html += "<input id=\""+name+"\" value=\""+adjustValue+"\"/>";
		html += "<input type=\"button\" onclick=\"modifyAccountFee('"+name+"','"+oriValue+"','"+adjustValue+"')\" value=\"修改\"/>";
		html += "<input type=\"button\" onclick=\"cancelAccountFee('"+name+"','"+oriValue+"','"+adjustValue+"')\" value=\"取消\"/>";
		$me.append(html);
		
	}

	</script>
  </head>
  <app:position/>
  <body style="margin-top:0px">
  
  <%
  VerifyAccountInfoForm verifyInfo = (VerifyAccountInfoForm)request.getSession().getAttribute("verifyInfo");
  %>
  <div id="condition" style="text-align: center;">
  <form name="verifyAccountInfoForm" id="verifyAccountInfoForm" method="post">
		<table border="0" cellspacing="0" cellpadding="0" width="100%" align="center"><tbody>
		<tr>
		<td height="25" width="6"><img src="<%=basePath%>/common/images/bar_left.gif" width="31" height="23"></td>
		<td background="<%=basePath%>/common/images/bar_bg.gif" width="100%"><span class="l style2">对账统计基本信息</span></td>
		<td width="6" align="right"><img src="<%=basePath%>/common/images/bar_right.gif" width="9" height="23"></td></tr>
		<tr>
		<td colspan="3">
		<table class="t" border="0" cellspacing="1" cellpadding="0" width="100%">
		<tbody>
		<tr>
		<td bgcolor="#f3f6ff">
		<input type="hidden" name="id" id="id" value="${verifyInfo.id}"/>
		<table border="0" cellspacing="0" cellpadding="3" width="100%">
		<tbody>
		<tr>
		<td width="12%" align="right">对账类型: </td>
		<td width="37%"><%=StatConstants.verifyTypeName(verifyInfo.getVerifyType()) %></td>
		<td width="12%" align="right">对账主体: </td>
		<td width="37%"><%=VerifyAccountInfoForm.formateVerifyName(verifyInfo.getVerifyType(),verifyInfo.getVerifyName()) %></td>
		</tr>
		<tr>
		<td width="12%" align="right">对账开始时间: </td>
		<td width="37%"><%=VerifyAccountInfoForm.formateDate(verifyInfo.getVerifyStartTime()) %></td>
		<td width="12%" align="right">对账结束时间: </td>
		<td width="37%"><%=VerifyAccountInfoForm.formateDate(verifyInfo.getVerifyEndTime()) %></td>
		</tr>
		<tr>
		<td width="12%" align="right">对账状态: </td>
		<td width="37%"><%=StatConstants.verifyStatusName(verifyInfo.getVerifyStatus()) %></td>
		<td width="12%" align="right">调账状态: </td>
		<td width="37%"><%=StatConstants.adjustStatusName(verifyInfo.getAdjustStatus()) %></td>
		</tr>
		<tr>
		<td width="12%" align="right">创建人: </td>
		<td width="37%"><c:out value="${verifyInfo.creator}"/></td>
		<td width="12%" align="right">创建时间: </td>
		<td width="37%"><c:out value="${verifyInfo.createTime}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">财务员: </td>
		<td width="37%"><c:out value="${verifyInfo.treasurer}"/></td>
		<td width="12%" align="right">对账时间: </td>
		<td width="37%"><c:out value="${verifyInfo.verifyTime}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">调账备注: </td>
		<td width="37%">
		<textarea rows="4" cols="70" id="remark" name="remark" ><c:out value="${verifyInfo.remark}"/></textarea>
		</td>
		<td width="12%" align="right"></td>
		<td width="37%"></td>
		</tr>
		</tbody></table></td></tr></tbody>
		</table></td></tr></tbody></table>
		
		<table border="0" cellspacing="0" cellpadding="0" width="100%" align="center"><tbody>
		<tr>
		<td height="25" width="6"><img src="<%=basePath%>/common/images/bar_left.gif" width="31" height="23"></td>
		<td background="<%=basePath%>/common/images/bar_bg.gif" width="100%"><span class="l style2">对账统计调账后明细信息</span></td>
		<td width="6" align="right"><img src="<%=basePath%>/common/images/bar_right.gif" width="9" height="23"></td></tr>
		<tr>
		<td colspan="3">
		<table class="t" border="0" cellspacing="1" cellpadding="0" width="100%">
		<tbody>
		<tr>
		<td bgcolor="#f3f6ff">
		<!-- 调账后 -->
		<table border="0" cellspacing="0" cellpadding="3" width="100%">
		<tbody>
		<tr>
		<td width="12%" align="right">总收入: </td>
		<td width="37%">
		<div id="accountTotalDiv">
		<a ondblclick="editFeeForm(this,'accountTotal','${verifyInfo.summaryModel.accountTotalBig}','${verifyInfo.adjustModel.accountTotalBig}')" >
		<c:out value="${verifyInfo.summaryModel.accountTotalBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.accountTotalBig!=null}">
		<c:out value="${verifyInfo.adjustModel.accountTotalBig}"/>
		</c:if>
		</a>
		</div>
		</td>
		<td width="12%" align="right">账户充值总收入: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'accountReceipt','${verifyInfo.summaryModel.accountReceiptBig}','${verifyInfo.adjustModel.accountReceiptBig}')" >
		<c:out value="${verifyInfo.summaryModel.accountReceiptBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.accountReceiptBig!=null}">
		<c:out value="${verifyInfo.adjustModel.accountReceiptBig}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr>
		<td width="12%" align="right">非账户充值总收入: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'nonAccount','${verifyInfo.summaryModel.nonAccountBig}','${verifyInfo.adjustModel.nonAccountBig}')" >
		<c:out value="${verifyInfo.summaryModel.nonAccountBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.nonAccountBig!=null}">
		<c:out value="${verifyInfo.adjustModel.nonAccountBig}"/>
		</c:if>
		</a>
		</td>
		<td width="12%" align="right">现金方式收入: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'inCash','${verifyInfo.summaryModel.inCashBig}','${verifyInfo.adjustModel.inCashBig}')" >
		<c:out value="${verifyInfo.summaryModel.inCashBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.inCashBig!=null}">
		<c:out value="${verifyInfo.adjustModel.inCashBig}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr>
		<td width="12%" align="right">券方式收入: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'inCoupon','${verifyInfo.summaryModel.inCouponBig}','${verifyInfo.adjustModel.inCouponBig}')" >
		<c:out value="${verifyInfo.summaryModel.inCouponBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.inCouponBig!=null}">
		<c:out value="${verifyInfo.adjustModel.inCouponBig}"/>
		</c:if>
		</a>
		</td>
		<td width="12%" align="right">点方式收入: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'inPresent','${verifyInfo.summaryModel.inPresentBig}','${verifyInfo.adjustModel.inPresentBig}')" >
		<c:out value="${verifyInfo.summaryModel.inPresentBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.inPresentBig!=null}">
		<c:out value="${verifyInfo.adjustModel.inPresentBig}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr>
		<td width="12%" align="right">现金账号充正值金额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'positiveCash','${verifyInfo.summaryModel.positiveCashBig}','${verifyInfo.adjustModel.positiveCashBig}')" >
		<c:out value="${verifyInfo.summaryModel.positiveCashBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.positiveCashBig!=null}">
		<c:out value="${verifyInfo.adjustModel.positiveCashBig}"/>
		</c:if>
		</a>
		</td>
		<td width="12%" align="right">票据补打金额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'printBankInvoiceFee','${verifyInfo.summaryModel.printBankInvoiceFeeBig}','${verifyInfo.adjustModel.printBankInvoiceFeeBig}')" >
		<c:out value="${verifyInfo.summaryModel.printBankInvoiceFeeBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.printBankInvoiceFeeBig!=null}">
		<c:out value="${verifyInfo.adjustModel.printBankInvoiceFeeBig}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr>
		<td width="12%" align="right">现金账号充负值金额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'negativeCash','${verifyInfo.summaryModel.negativeCashBig}','${verifyInfo.adjustModel.negativeCashBig}')" >
		<c:out value="${verifyInfo.summaryModel.negativeCashBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.negativeCashBig!=null}">
		<c:out value="${verifyInfo.adjustModel.negativeCashBig}"/>
		</c:if>
		</a>
		</td>
		<td width="12%" align="right">票据补打张数: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'printBankInvoiceFeeNum','${verifyInfo.summaryModel.printBankInvoiceFeeNum}','${verifyInfo.adjustModel.printBankInvoiceFeeNum}')" >
		<c:out value="${verifyInfo.summaryModel.printBankInvoiceFeeNum}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.printBankInvoiceFeeNum!=null}">
		<c:out value="${verifyInfo.adjustModel.printBankInvoiceFeeNum}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr>
		<td width="12%" align="right">券账号充正值金额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'positiveCoupon','${verifyInfo.summaryModel.positiveCouponBig}','${verifyInfo.adjustModel.positiveCouponBig}')" >
		<c:out value="${verifyInfo.summaryModel.positiveCouponBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.positiveCouponBig!=null}">
		<c:out value="${verifyInfo.adjustModel.positiveCouponBig}"/>
		</c:if>
		</a>
		</td>
		<td width="12%" align="right">冲红打印发票金额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'invoiceRedFee','${verifyInfo.summaryModel.invoiceRedFeeBig}','${verifyInfo.adjustModel.invoiceRedFeeBig}')" >
		<c:out value="${verifyInfo.summaryModel.invoiceRedFeeBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.invoiceRedFeeBig!=null}">
		<c:out value="${verifyInfo.adjustModel.invoiceRedFeeBig}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr>
		<td width="12%" align="right">券账号充负值金额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'negativeCoupon','${verifyInfo.summaryModel.negativeCouponBig}','${verifyInfo.adjustModel.negativeCouponBig}')" >
		<c:out value="${verifyInfo.summaryModel.negativeCouponBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.negativeCouponBig!=null}">
		<c:out value="${verifyInfo.adjustModel.negativeCouponBig}"/>
		</c:if>
		</a>
		</td>
		<td width="12%" align="right">冲红打印发票张数: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'invoiceRedFeeNum','${verifyInfo.summaryModel.invoiceRedFeeNum}','${verifyInfo.adjustModel.invoiceRedFeeNum}')" >
		<c:out value="${verifyInfo.summaryModel.invoiceRedFeeNum}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.invoiceRedFeeNum!=null}">
		<c:out value="${verifyInfo.adjustModel.invoiceRedFeeNum}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr>
		<td width="12%" align="right">点账号充正值金额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'positivePresent','${verifyInfo.summaryModel.positivePresentBig}','${verifyInfo.adjustModel.positivePresentBig}')" >
		<c:out value="${verifyInfo.summaryModel.positivePresentBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.positivePresentBig!=null}">
		<c:out value="${verifyInfo.adjustModel.positivePresentBig}"/>
		</c:if>
		</a>
		</td>
		<td width="12%" align="right">作废打印发票金额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'invoiceCancelFee','${verifyInfo.summaryModel.invoiceCancelFeeBig}','${verifyInfo.adjustModel.invoiceCancelFeeBig}')" >
		<c:out value="${verifyInfo.summaryModel.invoiceCancelFeeBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.invoiceCancelFeeBig!=null}">
		<c:out value="${verifyInfo.adjustModel.invoiceCancelFeeBig}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr>
		<td width="12%" align="right">点账号充负值金额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'negativePresent','${verifyInfo.summaryModel.negativePresentBig}','${verifyInfo.adjustModel.negativePresentBig}')" >
		<c:out value="${verifyInfo.summaryModel.negativePresentBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.negativePresentBig!=null}">
		<c:out value="${verifyInfo.adjustModel.negativePresentBig}"/>
		</c:if>
		</a>
		</td>
		<td width="12%" align="right">作废打印发票张数: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'invoiceCancelFeeNum','${verifyInfo.summaryModel.invoiceCancelFeeNum}','${verifyInfo.adjustModel.invoiceCancelFeeNum}')" >
		<c:out value="${verifyInfo.summaryModel.invoiceCancelFeeNum}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.invoiceCancelFeeNum!=null}">
		<c:out value="${verifyInfo.adjustModel.invoiceCancelFeeNum}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr>
		<td width="12%" align="right">应打发票总额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'needInvoiceFee','${verifyInfo.summaryModel.needInvoiceFeeBig}','${verifyInfo.adjustModel.needInvoiceFeeBig}')" >
		<c:out value="${verifyInfo.summaryModel.needInvoiceFeeBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.needInvoiceFeeBig!=null}">
		<c:out value="${verifyInfo.adjustModel.needInvoiceFeeBig}"/>
		</c:if>
		</a>
		</td>
		<td width="12%" align="right">实打发票总额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'invoiceRealFee','${verifyInfo.summaryModel.invoiceRealFeeBig}','${verifyInfo.adjustModel.invoiceRealFeeBig}')" >
		<c:out value="${verifyInfo.summaryModel.invoiceRealFeeBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.invoiceRealFeeBig!=null}">
		<c:out value="${verifyInfo.adjustModel.invoiceRealFeeBig}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr>
		<td width="12%" align="right">未打印金额 : </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'unPrintInvoiceFee','${verifyInfo.summaryModel.unPrintInvoiceFeeBig}','${verifyInfo.adjustModel.unPrintInvoiceFeeBig}')" >
		<c:out value="${verifyInfo.summaryModel.unPrintInvoiceFeeBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.unPrintInvoiceFeeBig!=null}">
		<c:out value="${verifyInfo.adjustModel.unPrintInvoiceFeeBig}"/>
		</c:if>
		</a>
		</td>
		<td width="12%" align="right">实打发票张数: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'invoiceRealFeeNum','${verifyInfo.summaryModel.invoiceRealFeeNum}','${verifyInfo.adjustModel.invoiceRealFeeNum}')" >
		<c:out value="${verifyInfo.summaryModel.invoiceRealFeeNum}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.invoiceRealFeeNum!=null}">
		<c:out value="${verifyInfo.adjustModel.invoiceRealFeeNum}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr>
		<td width="12%" align="right">产品订购应收总金额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'productOrderNeedFee','${verifyInfo.summaryModel.productOrderNeedFeeBig}','${verifyInfo.adjustModel.productOrderNeedFeeBig}')" >
		<c:out value="${verifyInfo.summaryModel.productOrderNeedFeeBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.productOrderNeedFeeBig!=null}">
		<c:out value="${verifyInfo.adjustModel.productOrderNeedFeeBig}"/>
		</c:if>
		</a>
		</td>
		<td width="12%" align="right">产品订购实收总金额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'productOrderRealFee','${verifyInfo.summaryModel.productOrderRealFeeBig}','${verifyInfo.adjustModel.productOrderRealFeeBig}')" >
		<c:out value="${verifyInfo.summaryModel.productOrderRealFeeBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.productOrderRealFeeBig!=null}">
		<c:out value="${verifyInfo.adjustModel.productOrderRealFeeBig}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr>
		<td width="12%" align="right">产品订购优惠总金额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'productOrderRebateFee','${verifyInfo.summaryModel.productOrderRebateFeeBig}','${verifyInfo.adjustModel.productOrderRebateFeeBig}')" >
		<c:out value="${verifyInfo.summaryModel.productOrderRebateFeeBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.productOrderRebateFeeBig!=null}">
		<c:out value="${verifyInfo.adjustModel.productOrderRebateFeeBig}"/>
		</c:if>
		</a>
		</td>
		<td width="12%" align="right">产品退订总金额: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'productOrderCancelFee','${verifyInfo.summaryModel.productOrderCancelFeeBig}','${verifyInfo.adjustModel.productOrderCancelFeeBig}')" >
		<c:out value="${verifyInfo.summaryModel.productOrderCancelFeeBig}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.productOrderCancelFeeBig!=null}">
		<c:out value="${verifyInfo.adjustModel.productOrderCancelFeeBig}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr><!-- 增加机顶盒出入库数量 2013-6-17 -->
		<td width="12%" align="right">机顶盒赠送数量: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'stbOutGiveNum','${verifyInfo.summaryModel.stbOutGiveNum}','${verifyInfo.adjustModel.stbOutGiveNum}')" >
		<c:out value="${verifyInfo.summaryModel.stbOutGiveNum}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.stbOutGiveNum!=null}">
		<c:out value="${verifyInfo.adjustModel.stbOutGiveNum}"/>
		</c:if>
		</a>
		</td>
		<td width="12%" align="right">机顶盒购买数量: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'stbOutBuyNum','${verifyInfo.summaryModel.stbOutBuyNum}','${verifyInfo.adjustModel.stbOutBuyNum}')" >
		<c:out value="${verifyInfo.summaryModel.stbOutBuyNum}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.stbOutBuyNum!=null}">
		<c:out value="${verifyInfo.adjustModel.stbOutBuyNum}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr>
		<td width="12%" align="right">机顶盒自购数量: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'stbOutOwnNum','${verifyInfo.summaryModel.stbOutOwnNum}','${verifyInfo.adjustModel.stbOutOwnNum}')" >
		<c:out value="${verifyInfo.summaryModel.stbOutOwnNum}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.stbOutOwnNum!=null}">
		<c:out value="${verifyInfo.adjustModel.stbOutOwnNum}"/>
		</c:if>
		</a>
		</td>
		<td width="12%" align="right">机顶盒回收数量: </td>
		<td width="37%">
		<a ondblclick="editFeeForm(this,'stbInNum','${verifyInfo.summaryModel.stbInNum}','${verifyInfo.adjustModel.stbInNum}')" >
		<c:out value="${verifyInfo.summaryModel.stbInNum}"/>&nbsp;&nbsp;
		<c:if test="${verifyInfo.adjustModel.stbInNum!=null}">
		<c:out value="${verifyInfo.adjustModel.stbInNum}"/>
		</c:if>
		</a>
		</td>
		</tr>
		<tr>
		<td width="12%" align="right">&nbsp; </td>
		<td width="37%">&nbsp;</td>
		<td width="12%" align="right">&nbsp;</td>
		<td width="37%">&nbsp;</td>
		</tr>
		<!-- 系统自定义费用 -->
		<c:forEach items="${verifyInfo.summaryModel.userDefineFeeList}" var="feeModel">
			<tr>
			<td width="12%" align="right"><c:out value="${feeModel.needFeeName}"/>:</td>
			<td width="37%">
			<div id="">
			<a ondblclick="editFeeForm(this,'needFee${feeModel.feeId}','${feeModel.needFee}','${feeModel.adjustNeedFee}')" >
			<c:out value="${feeModel.needFee}"/>&nbsp;&nbsp;<c:out value="${feeModel.adjustNeedFee}"/>
			</a>
			</div>
			</td>
			<td width="12%" align="right"><c:out value="${feeModel.feeName}"/>:</td>
			<td width="37%">
			<div id="">
			<a ondblclick="editFeeForm(this,'printFee${feeModel.feeId}','${feeModel.fee}','${feeModel.adjustFee}')" >
			<c:out value="${feeModel.fee}"/>&nbsp;&nbsp;<c:out value="${feeModel.adjustFee}"/>
			</a>
			</div>
			</td>
			</tr>
		</c:forEach>
		</tbody></table></td></tr></tbody>
		</table></td></tr></tbody></table>
		<div>
		<input type="button" class="bigButton" onclick="saveAccountFee()" value="确认调账 "></input>
		<input type="button" class="bigButton" onclick="verifyAccountInfoForm.action='<%=basePath%>/jsp/boss/finance/autoVerifyAccountManage/autoVerifyAccountManage.do?methodToCall=goBack';verifyAccountInfoForm.submit();" value="取消"></input>
		</div>
  </form>
  </div>
  
  <br/>
  <br/>
  <br/>
  </body>
</html>
