<%@ page language="java" import="java.util.*" import="com.ovt.idtv.boss.web.workOrder.struts.edittype.*" import="com.ovt.idtv.boss.web.stat.busiVerifyAccount.query.OperatingReceiptSummaryModel" import="com.ovt.idtv.boss.core.service.sys.model.FeeItemDefine" pageEncoding="UTF-8"%>
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
    <base ><%String basePath = request.getContextPath();%>
    <style type="text/css">
    	
    	.inTable td.bt   {border-bottom:none;} 
		.inTable td.rt   {border-right:none;} 
		.inTable td.ll   {border-left:none;}
		.inTable td.tp   {border-top:none;}
		.table td.rt   {border-right:none;}
		.table td.tp   {border-top:none;}
		.table td.bt   {border-bottom:none;}
		
		.table td.mrt {margin-right: none;}
		
		
		a  {text-decoration: none;color:black;cursor:hand;}
		
    	
		.content{vertical-align: middle;}
		.contentTable{margin-left:40px;width:750px;text-align: center;position:relative;float:left;}
		.contentDesc{margin-left:10px;width:300px;position:relative;float:left;font-size: 12px;}
		.tableName{width:750px; text-align: center;font-size: 15px;}
		.userFeeContain{width:750px;margin:0px;padding:0px; }
		.userFeeItem{width:375px;height:22px; position:relative;margin:0px;padding:0px;background-color:#ffffff;
			overflow: auto;float:left;border:1px solid #67BF7F; }
			
		.inTable{border:0px solid #67BF7F;font-size: 15px;width:750px;height: 22px;margin:0px; padding:0px;}
		
    	
    	.table {bgColor:#67BF7F;margin:0px;padding:0px;border-collapse:collapse;font-size: 15px;
	    	border-collapse:collapse ;
	    	empty-cells:show;width:750px;}
		.table td{border:1px solid #67BF7F;bgcolor:#ffffff;width:375px;height: 22px;}
		.table th{border:1px solid #67BF7F;font-weight:bold;background:#EED2A9;}
		.bigButton{font-size:14px;font-weight:700;width:70px;height:25px;}
		
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
	</script>
  </head>
  <app:position/>
  <body style="margin-top:0px">
  <input type="button" class="bigButton"   onclick="print()" value="打 印 "></input>
  <input type="button" class="bigButton"   onclick="history.back()" value="返 回"></input>
  <br/>
  <div class="content">
  <div class="contentTable">
  <table class="table" bgColor="#67BF7F" cellSpacing="1px">
	<tr><th colspan="2" class="tableName">营业收入对账表</th></tr>
	<tr bgColor="#ffffff" style="border-left:1px;margin:none;padding:none;">
		<td class="bt" style="margin:none;padding:none;">统计对象：<c:out value="${summary.depName}"/></td>
		<td class="bt" style="margin:none;padding:none;">统计时段：<c:out value="${summary.dateArea}"/></td>
	</tr>
	<tr bgColor="#ffffff" style="border-left:1px;margin:none;padding:none;">
		<td colspan="2" style="height:10px;"></td>
	</tr>
	<tr bgColor="#ffffff" ><td colspan="2" bgColor="#67BF7F" class="rt" style="border:0px;">
		<table  class="inTable" bgColor="#67BF7F" cellSpacing="0px" style="border: none;margin:none;padding:none;">
			<tr bgColor="#ffffff" >
				<td class="tp ll">
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
				<td  class="tp">
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
				<td  class="tp rt">
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
			<tr bgColor="#ffffff">
				<td  class="ll">
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
				<td>
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
				<td  class="rt">
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
			</tr><!-- 
			<tr bgColor="#ffffff">
				<td  class=" ll bt">
				银行转账方式：
				<c:if test="${ summary.inBankBig == 0 }">
				  <c:out value="${summary.inBankBig}"/>
				</c:if>
				<c:if test="${ summary.inBankBig != 0 }">
				  <a href="<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=inBank">
				  <c:out value="${summary.inBankBig}"/>
				  </a>
				</c:if>
				</td>
				<td  class="bt">
				卡充值方式：
				<c:if test="${ summary.inTVCardBig == 0 }">
				  <c:out value="${summary.inTVCardBig}"/>
				</c:if>
				<c:if test="${ summary.inTVCardBig != 0 }">
				  <a href="<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=inTVCard">
				  <c:out value="${summary.inTVCardBig}"/>
				  </a>
				</c:if>
				</td>
				<td  class="bt rt">
				其它方式：
				<c:if test="${ summary.inOtherBig == 0 }">
				  <c:out value="${summary.inOtherBig}"/>
				</c:if>
				<c:if test="${ summary.inOtherBig != 0 }">
				  <a href="<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=inOther">
				  <c:out value="${summary.inOtherBig}"/>
				  </a>
				</c:if>
				</td>
			</tr> -->
		</table>
	</td></tr>
	
	
				<tr bgColor="#ffffff">
					<td class="tp">
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
					<td class="tp">
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
				<tr bgColor="#ffffff">
					<td>
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
					<td>
					票据补打张数：<c:out value="${summary.printBankInvoiceFeeNum}"/>
					</td>
				</tr>
				<tr bgColor="#ffffff">
					<td>
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
					<td>
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
				<tr bgColor="#ffffff">
					<td>
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
					<td>
					冲红打印发票张数：<c:out value="${summary.invoiceRedFeeNum}"/>
					</td>
				</tr>
				<tr bgColor="#ffffff">
					<td>
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
					<td>
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
				<tr bgColor="#ffffff">
					<td>
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
					<td>
					作废打印发票张数：<c:out value="${summary.invoiceCancelFeeNum}"/>
					</td>
				</tr>
				<tr bgColor="#ffffff">
					<td>
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
					<td>
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
				<tr bgColor="#ffffff" >
					<td class=" bt">
					</td>
					<td class=" bt">
					实打发票张数：<c:out value="${summary.invoiceRealFeeNum}"/>
					</td>
				</tr>
			
	<c:forEach items="${summary.userDefineFeeList}" var="feeModel">
	<tr bgColor="#ffffff">
		<td><c:out value="${feeModel.needFeeName}"/>:
			<a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=needFeeItemId&feeItemId=${feeModel.needFeeId}&feeItemName=${feeModel.needFeeName}');" >
			  <c:out value="${feeModel.needFee}"/>
			</a>
		</td>
		<td><c:out value="${feeModel.feeName}"/>:
			<a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=feeItemId&feeItemId=${feeModel.feeId}&feeItemName=${feeModel.feeName}');" >
			  <c:out value="${feeModel.fee}"/>
			</a>
		</td>
	</tr>
	</c:forEach><!--
	<tr bgColor="#ffffff"> 配置的收费项统计
		<td colspan="2" bgColor="#67BF7F" style="height:10px;border: none;margin:none;padding:none;">
		<div style="border-bottom:1px ;margin:none;padding:none;width:750px;height:5px;background-color: #ffffff"></div>
		<div class="userFeeContain" style="border: none">
			<div class="userFeeItem">
			服务收视费：
			<c:if test="${ summary.servFeeBig == 0 }">
			  <c:out value="${summary.servFeeBig}"/>
			</c:if>
			<c:if test="${ summary.servFeeBig != 0 }">
			  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=servFee');" >
			  <c:out value="${summary.servFeeBig}"/>
			  </a>
			</c:if>
			</div>
			
			<c:forEach items="${summary.userDefineFeeMap}" var="feeItem">
			<div class="userFeeItem">
				<c:out value="${feeItem.value.feeName}"/> ：
				<c:if test="${feeItem.value.feeBig == 0}">
				  <c:out value="${feeItem.value.feeBig}"/> 
				</c:if>
				<c:if test="${feeItem.value.feeBig != 0}">
				  <a onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=itemId&feeItemId=${feeItem.key}&feeItemName=${feeItem.value.feeName}');">
				  <c:out value="${feeItem.value.feeBig}"/>
				  </a>  
				</c:if>
			</div>
			</c:forEach>
			<c:if test="${ summary.addDiv == 'add' }">
			<div class="userFeeItem"></div>
			</c:if>
		</div>
		</td>
	</tr> --><!-- 
	<tr bgColor="#ffffff" style="border:none;height:10px;margin:none;padding:none;">
		<td colspan="2" style="border:none;height:10px;margin:none;padding:none;"></td>
	</tr> -->
	<tr bgColor="#ffffff">
		<td class="tp"> 
		未收费项目明细：
		<a style="cursor: hand"  onclick="exportDetail('<%=basePath%>/jsp/boss/stat/busiVerifyAccount/queryExport/exportOperatingReceipt.do?type=unChargeFee');">
		0.00
		</a>
		</td>
		<td class="tp">
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
	 
	<tr bgColor="#ffffff" style="border:none;height:10px;margin:none;padding:none;">
		<td colspan="2" style="border:none;height:10px;margin:none;padding:none;"></td>
	</tr>
	<tr bgColor="#ffffff" style="border-top:none; margin:none;padding-top:none;">
		<td colspan="2" style="width:750px;border-top:none; margin-top:none;padding-top:none;">打印人：<c:out value="${summary.loginName}"/>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		打印时间：<c:out value="${summary.printDate}"/>
		</td>
	</tr><!-- -->
	
  </table>
  <br/>
  </div>
  <div class="contentDesc">
  <br/>
  导出对账明细方法：
  通过点击统计金额后面的数字可以导出统计项的所有统计明细，<font color="red">由于统计数据量大请耐心等待，导出时请不要点击多次</font>。
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
  21 系统定义费用项：是统计对象在统计时间段内，系统配置中定义的所有费用名称对应的充值金额。
  <br/>
  21 未打印金额：是统计对象在统计时间段内数字电视用户进行现金缴费但没有打印发票的所有金额。
  
  </div>
  </div>
  
  <br/>
  
  <br/>
  <br/>
  <br/>
  </body>
</html>
