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
    <title>营业收入统计信息对账</title>
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
    <style type="text/css">
    	
    </style>
    <script language="javascript">
  	//对账完成
	function verifyAccountFinish(){
		if(confirm("您确认对账完成吗?")){
			document.verifyAccountInfoForm.action='<%=basePath%>/jsp/boss/finance/autoVerifyAccountManage/autoVerifyAccountManage.do?methodToCall=verifyAccountFinish';
			document.verifyAccountInfoForm.submit();
		}
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
		<td background="<%=basePath%>/common/images/bar_bg.gif" width="100%"><span class="l style2">对账统计信息</span></td>
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
		<td width="12%" align="right">描述: </td>
		<td width="37%"><textarea  id="remark" name="remark"  rows="4" cols="70" ><c:out value="${verifyInfo.remark}"/></textarea></td>
		<td width="12%" align="right"></td>
		<td width="37%"></td>
		</tr>
		</tbody></table></td></tr></tbody>
		</table></td></tr></tbody></table>
		
		<table border="0" cellspacing="0" cellpadding="0" width="100%" align="center"><tbody>
		<tr>
		<td height="25" width="6"><img src="<%=basePath%>/common/images/bar_left.gif" width="31" height="23"></td>
		<td background="<%=basePath%>/common/images/bar_bg.gif" width="100%"><span class="l style2">对账统计明细信息</span></td>
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
		<td width="12%" align="right">总收入: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.accountTotalBig}"/></td>
		<td width="12%" align="right">账户充值总收入: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.accountReceiptBig}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">非账户充值总收入: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.nonAccountBig}"/></td>
		<td width="12%" align="right">现金方式收入: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.inCashBig}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">券方式收入: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.inCouponBig}"/></td>
		<td width="12%" align="right">点方式收入: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.inPresentBig}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">现金账号充正值金额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.positiveCashBig}"/></td>
		<td width="12%" align="right">票据补打金额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.printBankInvoiceFeeBig}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">现金账号充负值金额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.negativeCashBig}"/></td>
		<td width="12%" align="right">票据补打张数: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.printBankInvoiceFeeNum}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">券账号充正值金额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.positiveCouponBig}"/></td>
		<td width="12%" align="right">冲红打印发票金额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.invoiceRedFeeBig}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">券账号充负值金额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.negativeCouponBig}"/></td>
		<td width="12%" align="right">冲红打印发票张数: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.invoiceRedFeeNum}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">点账号充正值金额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.positivePresentBig}"/></td>
		<td width="12%" align="right">作废打印发票金额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.invoiceCancelFeeBig}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">点账号充负值金额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.negativePresentBig}"/></td>
		<td width="12%" align="right">作废打印发票张数: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.invoiceCancelFeeNum}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">应打发票总额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.needInvoiceFeeBig}"/></td>
		<td width="12%" align="right">实打发票总额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.invoiceRealFeeBig}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">未打印金额 : </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.unPrintInvoiceFeeBig}"/></td>
		<td width="12%" align="right">实打发票张数: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.invoiceRealFeeNum}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">产品订购应收总金额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.productOrderNeedFeeBig}"/></td>
		<td width="12%" align="right">产品订购实收总金额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.productOrderRealFeeBig}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">产品订购优惠总金额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.productOrderRebateFeeBig}"/></td>
		<td width="12%" align="right">产品退订总金额: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.productOrderCancelFeeBig}"/></td>
		</tr>
		<tr><!-- 增加机顶盒出入库数量 2013-6-17 -->
		<td width="12%" align="right">机顶盒赠送数量: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.stbOutGiveNum}"/></td>
		<td width="12%" align="right">机顶盒购买数量: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.stbOutBuyNum}"/></td>
		</tr>
		<tr>
		<td width="12%" align="right">机顶盒自购数量: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.stbOutOwnNum}"/></td>
		<td width="12%" align="right">机顶盒回收数量: </td>
		<td width="37%"><c:out value="${verifyInfo.summaryModel.stbInNum}"/></td>
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
			<td width="37%"><c:out value="${feeModel.needFee}"/></td>
			<td width="12%" align="right"><c:out value="${feeModel.feeName}"/>:</td>
			<td width="37%"><c:out value="${feeModel.fee}"/></td>
			</tr>
		</c:forEach>
		</tbody></table></td></tr></tbody>
		</table></td></tr></tbody></table>
		<div>
		<c:if test="${verifyInfo.verifyStatus!=1}"><!-- 对账完成不允许重复对账 -->
		<input type="button" class="bigButton" onclick="verifyAccountFinish()" value="对账完成 "></input>
		</c:if>
		<input type="button" class="bigButton" onclick="verifyAccountInfoForm.action='<%=basePath%>/jsp/boss/finance/autoVerifyAccountManage/autoVerifyAccountManage.do?methodToCall=goBack';verifyAccountInfoForm.submit();" value="返回 "></input>
		</div>
		
  </form>
  </div>
  
  <br/>
  <br/>
  <br/>
  </body>
</html>
