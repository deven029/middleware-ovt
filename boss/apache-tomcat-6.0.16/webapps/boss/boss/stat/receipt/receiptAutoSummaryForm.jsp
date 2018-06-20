<%@ page language="java" import="java.util.*" 
import="com.ovt.idtv.boss.web.stat.busiVerifyAccount.query.OperatingReceiptSummaryModel" 
import="com.ovt.idtv.boss.core.service.sys.model.FeeItemDefine"
import="com.ovt.idtv.boss.web.stat.busiVerifyAccount.query.edit.VerifyOperatorEditType"  
import="com.ovt.idtv.boss.web.stat.busiVerifyAccount.query.edit.VerifyBusiDepEditType"
import="com.ovt.idtv.boss.web.stat.busiVerifyAccount.query.AutoAccountDefaultCondition"
pageEncoding="UTF-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ page isELIgnored = "false" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>营业收入统计表</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

	
	<SCRIPT language=JavaScript src="<%=request.getContextPath()%>/common/js/sitech.js"></SCRIPT>
	<SCRIPT language=JavaScript src="<%=request.getContextPath()%>/js/web.js"></SCRIPT>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/tabs.js"> </script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_parameter.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/datepicker/WdatePicker.js"> </script>
    <base ><%String basePath = request.getContextPath();%>
    <style type="text/css">
    	
		.table1{height: 30px; width:750px; bgcolor:#ffffff; bordercolor:#67BF7F;
			border-collapse:collapse; font-size: 14px;}
		.table1 td{border: solid 1px #67BF7F; height: 22px;}
		.table1 td.wd{width:375px;}
		.table1 td.wd1{width:190px;}
		.table1 td.wd2{	width:250px;}
		.info{margin-top:5px;margin-bottom: 6px;}
		.infoItem{width:370px; overflow: auto;float:left;}
		a  {text-decoration: none;color:black;cursor:hand;}
		
		.content{vertical-align: middle;}
		.contentTable{margin-left:40px;width:750px;text-align: center;position:relative;float:left;}
		.contentDesc{margin-left:10px;width:300px;position:relative;float:left;font-size: 12px;}
			
		.bigButton{font-size:14px;font-weight:700;width:70px;height:25px;}
		.query_td1{ width:16%; height:23px; align:center;}
		.query_td2{ width:34%; height:23px; align:left;}
    </style>
    <script language="javascript">
	//打印对账表
	function print(){
		if(confirm("您确认要打印对账统计表吗?")){
			var ifr = document.createElement('iframe');
			ifr.height='0px' ;
			var source = '<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/printRequest.do';
			ifr.src=source;
			document.body.appendChild(ifr);
		}
	}
	//导出调用
	function exportDetail(source){
		if(confirm("您确认要导出该金额的明细数据吗?")){
			var ifr = document.createElement('iframe');
			ifr.height='0px' ;
			ifr.src=source;
			document.body.appendChild(ifr);
		}else{
			return ;
		}
		
	}
	//隐藏查询条件
	function swhichshow(){
		if(document.getElementById("condition").style.display=="none") {
			document.getElementById("condition").style.display="";
		}else{
			document.getElementById("condition").style.display="none";
		}
	}
	//更换统计实体
	function changeVerifyEntity(){
		document.verifyConditionForm.action='<%=basePath%>/jsp/boss/stat/autoVerifyAccount/autoVerifyAccount.do?methodToCall=initData';
		document.verifyConditionForm.submit();
	}
	//保存对账统计信息
	function save(){
		if(confirm("您确认要保存本次对账统计信息吗?")){
			var ajaxPath = '<%=basePath%>/jsp/boss/stat/autoVerifyAccount/autoVerifyAccount.do?methodToCall=saveSummaryData';
			ovtAjaxMethod(ajaxPath,null,function(data){
				if(data.code != "0"){
					var msg = data.value;
					if(data.value==null||data.value==undefined){
						msg = "连接超时，无法访问服务器！";
					}
					alert(msg);
					return;
				}else if (data.code == "0"){
					alert(data.value);
				}
				var productsList = data.value;//产品列表
			});
		}
	}
	</script>
  </head>
  <app:position/>
  <body style="margin-top:0px">
  
  <%
  VerifyOperatorEditType oper = new VerifyOperatorEditType();
  VerifyBusiDepEditType dep = new VerifyBusiDepEditType();
  AutoAccountDefaultCondition autoCondition = (AutoAccountDefaultCondition)request.getAttribute("autoCondition");
  %>
  <table border=0 cellspacing=0 cellpadding=0 width="98%" align=center>
	<tr>
	<td height="23" width="31"><img src="<%=request.getContextPath()%>/common/images/bar_left.gif" width="31" height="23"></td>
	<td class="l style2" onclick=swhichshow() background="<%=request.getContextPath()%>/common/images/bar_bg.gif" width="100%">查询页面/请输入查询条件</td>
	<td><img src="<%=request.getContextPath()%>/common/images/bar_right.gif" width=9 height=23></td></tr>
  </table>
  <div id="condition" style="text-align: center;">
  <form name="verifyConditionForm" id="verifyConditionForm" method="post">
  <input type="hidden" id="verifyType" name="verifyType" value="${autoCondition.verifyType}"/>
  <table width="98%">
  <tr><td class="query_td1">营业单位：</td>
  <td class="query_td2"><%= dep.getHTML("busiDep",autoCondition.getBusiDep(),request)%></td>
  <td class="query_td1"> 操作员：</td>
  <td class="query_td2"><%= oper.getHTML("loginNo",(String)request.getParameter("loginNo"),request)%></td></tr>
  <tr class="query_td1"><td>开始时间：</td>
  <td class="query_td2"><input name="startTime" id="startTime" type="text" value="${autoCondition.startTime}" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'%y-%M-%d %H:%m:%s'})" class="Wdate"/></td>
  <td class="query_td1">结束时间：</td>
  <td class="query_td2"><input name="endTime" id="endTime" type="text" value="${autoCondition.endTime}" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'%y-%M-%d %H:%m:%s'})" class="Wdate"/></td></tr>
  <tr><td align="center" colSpan="4">
  <input type="button" class="bigButton"   onclick="verifyConditionForm.action='<%=basePath%>/jsp/boss/stat/autoVerifyAccount/autoVerifyAccount.do?methodToCall=processQuery&commandId=submit';verifyConditionForm.submit();" value="查询 "></input>
  <c:if test="${ queryFlag == 'query' }">
  <input type="button" class="bigButton"   onclick="print()" value="打 印 "></input>
  <input type="button" class="bigButton"   onclick="save()" value="产生对账"></input>
  <input type="button" class="bigButton"   onclick="history.back()" value="返 回"></input>
  </c:if>
  </td></tr>
  
  </table>
  </form>
  </div>
  <c:if test="${ queryFlag == 'query' }">
  
  <div class="content">
  <div class="contentTable">
  <div align="center"><h2>营业收入对账表</h2></div>
  <div class="info">
  <div class="infoItem">统计对象：<c:out value="${summary.depName}"/></div>
  <div class="infoItem">统计时段：<c:out value="${summary.dateArea}"/></div></div>
  <table class="table1">
				<tr >
				<td colspan="2" class="wd1">
				总收入:
				
				<c:if test="${ summary.accountTotalBig == 0 }">
				<c:out value="${summary.accountTotalBig}"/>
				</c:if>
				<c:if test="${ summary.accountTotalBig != 0 }">
				  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=accountTotal');" >
				  <c:out value="${summary.accountTotalBig}"/>
				  </a>
				</c:if>
				</td>
				<td  colspan="2" class="wd2">
				账户充值总收入：
				<c:if test="${ summary.accountReceiptBig == 0 }">
				<c:out value="${summary.accountReceiptBig}"/>
				</c:if>
				<c:if test="${ summary.accountReceiptBig != 0 }">
				  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=accountReceipt');" >
				  <c:out value="${summary.accountReceiptBig}"/>
				  </a>
				</c:if>
				</td>
				<td  colspan="2" class="wd2">
				非账户充值总收入：
				<c:if test="${ summary.nonAccountBig == 0 }">
				<c:out value="${summary.nonAccountBig}"/>
				</c:if>
				<c:if test="${ summary.nonAccountBig != 0 }">
				  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=nonAccount');" >
				  <c:out value="${summary.nonAccountBig}"/>
				  </a>
				</c:if>
				</td>
			</tr>
			<tr >
				<td  colspan="2" class="wd1">
				现金方式收入：
				<c:if test="${ summary.inCashBig == 0 }">
				  <c:out value="${summary.inCashBig}"/>
				</c:if>
				<c:if test="${ summary.inCashBig != 0 }">
				  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=inCash');" >
				  <c:out value="${summary.inCashBig}"/>
				  </a>
				</c:if>
				</td>
				<td colspan="2" class="wd2">
				券方式收入：
				<c:if test="${ summary.inCouponBig == 0 }">
				  <c:out value="${summary.inCouponBig}"/>
				</c:if>
				<c:if test="${ summary.inCouponBig != 0 }">
				  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=inCoupon');" >
				  <c:out value="${summary.inCouponBig}"/>
				  </a>
				</c:if>
				</td>
				<td  colspan="2" class="wd2">
				点方式收入：
				<c:if test="${ summary.inPresentBig == 0 }">
				  <c:out value="${summary.inPresentBig}"/>
				</c:if>
				<c:if test="${ summary.inPresentBig != 0 }">
				  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=inPresent');" >
				  <c:out value="${summary.inPresentBig}"/>
				  </a>
				</c:if>
				</td>
			</tr>
	
				<tr>
					<td colspan="3" class="wd">
					现金账号充正值金额：
					<c:if test="${ summary.positiveCashBig == 0 }">
					  <c:out value="${summary.positiveCashBig}"/>
					</c:if>
					<c:if test="${ summary.positiveCashBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=positiveCash');" >
					  <c:out value="${summary.positiveCashBig}"/>
					  </a>
					</c:if>
					</td>
					<td colspan="3" class="wd">
					票据补打金额：
					<c:if test="${ summary.printBankInvoiceFeeBig == 0 }">
					  <c:out value="${summary.printBankInvoiceFeeBig}"/>
					</c:if>
					<c:if test="${ summary.printBankInvoiceFeeBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=printBankInvoiceFee');" >
					  <c:out value="${summary.printBankInvoiceFeeBig}"/>
					  </a>
					</c:if>
					</td>
				</tr>
				<tr>
					<td colspan="3" class="wd">
					现金账号充负值金额：
					<c:if test="${ summary.negativeCashBig == 0 }">
					  <c:out value="${summary.negativeCashBig}"/>
					</c:if>
					<c:if test="${ summary.negativeCashBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=negativeCash');" >
					  <c:out value="${summary.negativeCashBig}"/>
					  </a>
					</c:if>
					</td>
					<td colspan="3" class="wd">
					票据补打张数：<c:out value="${summary.printBankInvoiceFeeNum}"/>
					</td>
				</tr>
				<tr>
					<td colspan="3" class="wd">
					券账号充正值金额：
					<c:if test="${ summary.positiveCouponBig == 0 }">
					  <c:out value="${summary.positiveCouponBig}"/>
					</c:if>
					<c:if test="${ summary.positiveCouponBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=positiveCoupon');" >
					  <c:out value="${summary.positiveCouponBig}"/>
					  </a>
					</c:if>
					</td>
					<td colspan="3" class="wd">
					冲红打印发票金额：
					<c:if test="${ summary.invoiceRedFeeBig == 0 }">
					  <c:out value="${summary.invoiceRedFeeBig}"/>
					</c:if>
					<c:if test="${ summary.invoiceRedFeeBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=invoiceRedFee');" >
					  <c:out value="${summary.invoiceRedFeeBig}"/>
					  </a>
					</c:if>
					</td>
				</tr>
				<tr>
					<td colspan="3" class="wd">
					券账号充负值金额：
					<c:if test="${ summary.negativeCouponBig == 0 }">
					  <c:out value="${summary.negativeCouponBig}"/>
					</c:if>
					<c:if test="${ summary.negativeCouponBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=negativeCoupon');" >
					  <c:out value="${summary.negativeCouponBig}"/>
					  </a>
					</c:if>
					</td>
					<td colspan="3" class="wd">
					冲红打印发票张数：<c:out value="${summary.invoiceRedFeeNum}"/>
					</td>
				</tr>
				<tr>
					<td colspan="3" class="wd">
					点账号充正值金额：
					<c:if test="${ summary.positivePresentBig == 0 }">
					  <c:out value="${summary.positivePresentBig}"/>
					</c:if>
					<c:if test="${ summary.positivePresentBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=positivePresent');" >
					  <c:out value="${summary.positivePresentBig}"/>
					  </a>
					</c:if>
					</td>
					<td colspan="3" class="wd">
					作废打印发票金额：
					<c:if test="${ summary.invoiceCancelFeeBig == 0 }">
					  <c:out value="${summary.invoiceCancelFeeBig}"/>
					</c:if>
					<c:if test="${ summary.invoiceCancelFeeBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=invoiceCancelFee');" >
					  <c:out value="${summary.invoiceCancelFeeBig}"/>
					  </a>
					</c:if>
					</td>
				</tr>
				<tr>
					<td colspan="3" class="wd">
					点账号充负值金额：
					<c:if test="${ summary.negativePresentBig == 0 }">
					  <c:out value="${summary.negativePresentBig}"/>
					</c:if>
					<c:if test="${ summary.negativePresentBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=negativePresent');" >
					  <c:out value="${summary.negativePresentBig}"/>
					  </a>
					</c:if>
					</td>
					<td colspan="3" class="wd">
					作废打印发票张数：<c:out value="${summary.invoiceCancelFeeNum}"/>
					</td>
				</tr>
				<tr>
					<td colspan="3" class="wd">
					应打发票总额：
					<c:if test="${ summary.needInvoiceFeeBig == 0 }">
					  <c:out value="${summary.needInvoiceFeeBig}"/>
					</c:if>
					<c:if test="${ summary.needInvoiceFeeBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=needInvoiceFee');" >
					  <c:out value="${summary.needInvoiceFeeBig}"/>
					  </a>
					</c:if>
					</td>
					<td colspan="3" class="wd">
					实打发票总额：
					<c:if test="${ summary.invoiceRealFeeBig == 0 }">
					  <c:out value="${summary.invoiceRealFeeBig}"/>
					</c:if>
					<c:if test="${ summary.invoiceRealFeeBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=invoiceRealFee');" >
					  <c:out value="${summary.invoiceRealFeeBig}"/>
					  </a>
					</c:if>
					</td>
				</tr>
				<tr >
					<td colspan="3" class="wd">
					</td>
					<td colspan="3" class="wd">
					实打发票张数：
					<c:if test="${ summary.invoiceRealFeeNum == 0 }"> 0 </c:if>
					<c:if test="${ summary.invoiceRealFeeNum != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=allInvoiceDetailFee');" >
					  <c:out value="${summary.invoiceRealFeeNum}"/>
					  </a>
					</c:if>
					</td>
				</tr>
				<tr >
					<td colspan="3" class="wd">
					产品订购应收总金额：
					<c:if test="${ summary.productOrderNeedFeeBig == 0 }">
					  <c:out value="${summary.productOrderNeedFeeBig}"/>
					</c:if>
					<c:if test="${ summary.productOrderNeedFeeBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=productOrderNeedFee');" >
					  <c:out value="${summary.productOrderNeedFeeBig}"/>
					  </a>
					</c:if>
					</td>
					<td colspan="3" class="wd">
					产品订购实收总金额：
					<c:if test="${ summary.productOrderRealFeeBig == 0 }">
					  <c:out value="${summary.productOrderRealFeeBig}"/>
					</c:if>
					<c:if test="${ summary.productOrderRealFeeBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=productOrderRealFee');" >
					  <c:out value="${summary.productOrderRealFeeBig}"/>
					  </a>
					</c:if>
					</td>
				</tr>
				<tr >
					<td colspan="3" class="wd">
					产品订购优惠总金额：
					<c:if test="${ summary.productOrderRebateFeeBig == 0 }">
					  <c:out value="${summary.productOrderRebateFeeBig}"/>
					</c:if>
					<c:if test="${ summary.productOrderRebateFeeBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=productOrderRebateFee');" >
					  <c:out value="${summary.productOrderRebateFeeBig}"/>
					  </a>
					</c:if>
					</td>
					<td colspan="3" class="wd">
					产品退订总金额：
					<c:if test="${ summary.productOrderCancelFeeBig == 0 }">
					  <c:out value="${summary.productOrderCancelFeeBig}"/>
					</c:if>
					<c:if test="${ summary.productOrderCancelFeeBig != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=productOrderCancelFee');" >
					  <c:out value="${summary.productOrderCancelFeeBig}"/>
					  </a>
					</c:if>
					</td>
				</tr>
				<tr >
					<td colspan="3" class="wd">
					机顶盒赠送数量：
					<c:if test="${ summary.stbOutGiveNum == 0 }">
					  <c:out value="${summary.stbOutGiveNum}"/>
					</c:if>
					<c:if test="${ summary.stbOutGiveNum != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=stbOutGiveNum');" >
					  <c:out value="${summary.stbOutGiveNum}"/>
					  </a>
					</c:if>
					</td>
					<td colspan="3" class="wd">
					机顶盒购买数量：
					<c:if test="${ summary.stbOutBuyNum == 0 }">
					  <c:out value="${summary.stbOutBuyNum}"/>
					</c:if>
					<c:if test="${ summary.stbOutBuyNum != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=stbOutBuyNum');" >
					  <c:out value="${summary.stbOutBuyNum}"/>
					  </a>
					</c:if>
					</td>
				</tr>
				<tr >
					<td colspan="3" class="wd">
					机顶盒自购数量：
					<c:if test="${ summary.stbOutOwnNum == 0 }">
					  <c:out value="${summary.stbOutOwnNum}"/>
					</c:if>
					<c:if test="${ summary.stbOutOwnNum != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=stbOutOwnNum');" >
					  <c:out value="${summary.stbOutOwnNum}"/>
					  </a>
					</c:if>
					</td>
					<td colspan="3" class="wd">
					机顶盒回收数量：
					<c:if test="${ summary.stbInNum == 0 }">
					  <c:out value="${summary.stbInNum}"/>
					</c:if>
					<c:if test="${ summary.stbInNum != 0 }">
					  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=stbInNum');" >
					  <c:out value="${summary.stbInNum}"/>
					  </a>
					</c:if>
					</td>
				</tr>
				<tr >
					<td colspan="3" class="wd">
					</td>
					<td colspan="3" class="wd">
					</td>
				</tr>
			
	<c:forEach items="${summary.userDefineFeeList}" var="feeModel">
	<tr>
		<td colspan="3" class="wd"><c:out value="${feeModel.needFeeName}"/>:
			<a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=needFeeItemId&feeItemId=${feeModel.needFeeId}&feeItemName=${feeModel.needFeeName}');" >
			  <c:out value="${feeModel.needFee}"/>
			</a>
		</td>
		<td colspan="3" class="wd"><c:out value="${feeModel.feeName}"/>:
			<a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=feeItemId&feeItemId=${feeModel.feeId}&feeItemName=${feeModel.feeName}');" >
			  <c:out value="${feeModel.fee}"/>
			</a>
		</td>
	</tr>
	</c:forEach>
	<tr>
		<td colspan="3" class="wd"> 
		未收费项目明细：
		<a style="cursor: hand"  onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=unChargeFee');">
		0.00
		</a>
		</td>
		<td colspan="3" class="wd">
		未打印金额：
		<c:if test="${ summary.unPrintInvoiceFeeBig == 0 }">
		  <c:out value="${summary.unPrintInvoiceFeeBig}"/>
		</c:if>
		<c:if test="${ summary.unPrintInvoiceFeeBig != 0 }">
		  <a style="cursor: hand" onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=unPrintInvoiceFee');" style="text-decoration: none" >
		  <c:out value="${summary.unPrintInvoiceFeeBig}"/>
		  </a>
		</c:if>
		</td>
	</tr>
	
  </table>
  <div class="info">
  <div class="infoItem">打印人：<c:out value="${summary.loginName}"/></div>
  <div class="infoItem">打印时间：<c:out value="${summary.printDate}"/></div>
  </div>
  </div>
  
  <div class="contentDesc">
  <br/>
  导出对账明细方法：
  通过点击统计金额后面的数字可以导出统计项的所有统计明细，如点击实打发票张数将导出发票主记录关联的所有子收费明细，<font color="red">由于统计数据量大请耐心等待，导出时请不要点击多次</font>。
  <br/>
  统计对象：是进行缴费操作的营业员或营业单位管理中定义的单位。
  <br/>
  操作时间：是营业员进行缴费或发票打印操作的执行时间点。
  <br/>
  统计时段：是操作时间在开始时间和结束时间的内的时间区域。
  <br/>
  统计明细说明:
  <br/>
  1 总收入：是统计对象在统计时间段内的所有营业收入之和。
  <br/>
  2 帐户充值总收入：是统计对象在统计时间段内的所有用户账户收入之和，即购买节目包充值的费用。
  <br/>
  3 非帐户充值总收入：是统计对象在统计时间段内的所有非用户账户收入之和，如用户购买机顶盒的费用等。
  <br/>
  4 现金方式收入：是统计对象在统计时间段内通过现金方式收取的所有费用。
  <br/>
  5 券方式收入：是统计对象在统计时间段内通过券方式收取的所有费用。
  <br/>
  6 点方式收入：是统计对象在统计时间段内通过点方式收取的所有费用。
  <br/>
  7 现金账号充正值金额：是统计对象在统计时间段内通过充值现金，进入用户现金账户且大于等于0的所有金额。
  <br/>
  8 现金账号充负值金额：是统计对象在统计时间段内通过充值现金，进入用户现金账户且小于0的所有金额。
  <br/>
  9 券账号充正值金额：是统计对象在统计时间段内通过充值券，进入用户券账户且大于等于0的所有金额。
  <br/>
  10 券账号充负值金额：是统计对象在统计时间段内通过充值券，进入用户券账户且小于0的所有金额。
  <br/>
  11 点账号充正值金额：是统计对象在统计时间段内通过充值点，进入用户点账户且大于等于0的所有金额。
  <br/>
  12 点账号充负值金额：是统计对象在统计时间段内通过充值点，进入用户点账户且小于0的所有金额。
  <br/>
  13 票据补打金额：是统计对象在统计时间段内数字电视用户通过银行，充值卡等其他方式缴费，并补打发票的所有金额。
  <br/>
  14 票据补打张数：是统计对象在统计时间段内数字电视用户通过银行，充值卡等其他方式缴费，并补打发票的所有张数。
  <br/>
  15 冲红打印发票金额：是统计对象在统计时间段内操作员打印冲红发票的所有金额。
  <br/>
  16 冲红打印发票张数：是统计对象在统计时间段内营业员打印冲红发票的张数。
  <br/>
  17 作废打印发票金额：是统计对象在统计时间段内操作员打印作废发票的所有金额。
  <br/>
  18 作废打印发票张数：是统计对象在统计时间段内营业员打印作废发票的张数。
  <br/>
  19 实打发票金额：是统计对象在统计时间段内营业员所有实际打印发票的金额。
  <br/>
  20 实打发票张数：是统计对象在统计时间段内营业员所有实际打印发票的张数。
  <br/>
  21 产品订购应收总金额：是统计对象在统计时间段内所有产品订购的金额。
  <br/>
  22 产品订购优惠总金额：是统计对象在统计时间段内所有产品订购的优惠金额。
  <br/>
  23 产品退订总金额：是统计对象在统计时间段内所有产品退订的金额。
  <br/>
  24 系统定义费用项：是统计对象在统计时间段内，系统配置中定义的所有费用名称对应的充值金额。
  <br/>
  25 未打印金额：是统计对象在统计时间段内数字电视用户进行现金缴费但没有打印发票的所有金额。
  
  </div>
  
  </div>
  
  </c:if>
  <br/>
  
  <br/>
  <br/>
  <br/>
  </body>
</html>
