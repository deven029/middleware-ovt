<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="com.ovt.idtv.boss.core.service.finance.model.BillInfo"%>
<%@page import="com.ovt.idtv.boss.core.service.finance.model.BillDetailInfo"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.text.SimpleDateFormat"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Pragma" content="no-cache">
<link href="<%=path %>/common/css/zi.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="<%=path %>/common/jquery/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=path %>/common/jquery/themes/icon.css">
 
<script type="text/javascript" src="../common/jquery/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="../common/jquery/jquery.easyui.min.js"></script>
<script type=text/javascript src="<%=path %>/common/js/date/date.js"></script>
<script language="javascript" src="<%=path %>/common/js/calendar.js"></script>
<script language="javascript" src="<%=path %>/common/js/toolbar.js"></script>
<script language="javascript" src="<%=path %>/common/js/sitech.js"></script>
<script language="javascript" src="<%=path %>/datepicker/WdatePicker.js"></script>
 
<script language="JavaScript"> 
	var contextPath='/Boss';
</script>
<script language="javascript" src="<%=path %>/common/js/xtree/xtree.js"></script>
<link href="<%=path %>/common/css/xtree.css" rel="stylesheet" type="text/css">
<script language="JavaScript"> 
function openme(object){
object.style.background="#FFFFCC";}
function closeme(object){
object.style.background="#ffffff";}
</script>
<style type="text/css"> 
<!--
.anniu,.anniu1,.anniu2{width:32px; height:14px; padding:0px; border:0px;}
.anniu{background-image:url(<%=path %>/images/up.gif);} 
.anniu1{background-image:url(<%=path %>/images/down.gif); }
.anniu2{ background-image:url(<%=path %>/images/top.gif); }
 
.stat{
	background-image:url(<%=path %>/common/images/bar_bg(1).gif); height:25px;
}
.style1 {color: #0c5bc4}
.style2 {
	font-size: 14px;
	color: #003665;
}
body {
	margin-top: 0px;
}
-->
</style>
<title>用户账单管理</title>
</head>
 
<body>
<%
	BillInfo billInfo = (BillInfo)request.getAttribute("billInfo");
	DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
%>
<table width='100%' cellspacing='0' cellpadding='0' border='0'><tr><td nowrap height="30">当前位置: <span class='DD'>账单管理-->用户账单管理-->查看账单明细</span></td></tr></table></br>
 
<script language="JavaScript">function swhichshow(){if(document.getElementById("condition").style.display=="none") {       document.getElementById("condition").style.display="";}else{document.getElementById("condition").style.display="none";}}</script>

<div id="condition">
	<table width="100%"  border="0" cellspacing="0" cellpadding="0">
    	<tr> 
    		<td>
       			<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         			<tr> 
					  <td width="6" height="25"><img src="<%=path %>/common/images/bar_left.gif" width="31" height="23"></td>
					  <td width="100%" background="<%=path %>/common/images/bar_bg.gif"><span class="L style2">用户账单信息</span></td>
					  <td width="6" align="right"><img src="<%=path %>/common/images/bar_right.gif" width="9" height="23"></td>
			   		</tr>
         			<tr>
           				<td colspan="3">
	           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
	             				<tr>
	              					<td bgcolor="F3F6FF">                    
	              						<table width="100%" border="0" cellspacing="0" cellpadding="3">	    
											<tr>			
												<td width="12%" align="right">对应月份:</td>
												<td width="37%" colspan="1"><%=billInfo.getBillMonth() == null ? "" : df.format(billInfo.getBillMonth())%></td>			
												<td width="12%" align="right">客户名称:</td>
												<td width="37%" colspan="1"><%=billInfo.getUserName() == null ? "" : billInfo.getUserName()%></td>
											</tr>		
											<tr>			
												<td width="12%" align="right">本期发生金额（元）:</td>
												<td width="37%" colspan="1"><%=billInfo.getOccurFee() == null ? "" : billInfo.getOccurFee() %></td>			
												<td width="12%" align="right">本期优惠金额（元）:</td>												
												<td width="37%" colspan="1"><%=billInfo.getRebateFee() == null ? "" : billInfo.getRebateFee()%></td>
											</tr>
											<tr>
												<td width="12%" align="right">本期应缴金额（元）:</td>
												<td width="37%" colspan="1"><%=billInfo.getCurRealFee() == null ? "" : billInfo.getCurRealFee()%></td>
												<td width="12%" align="right">上期应缴金额（元）:</td>
												<td width="37%" colspan="1"><%=billInfo.getPreRealFee() == null ? "" : billInfo.getPreRealFee()%></td>
											</tr>
											<tr>
												<td width="12%" align="right">滞纳金（元）:</td>
												<td width="37%" colspan="1"><%=billInfo.getOverDue() == null ? "" : billInfo.getOverDue()%></td>			
												<td width="12%" align="right">应收总计金额（元）:</td>
												<td width="37%" colspan="1"><%=billInfo.getRealFee() == null ? "" : billInfo.getRealFee()%></td>
											</tr>
											<tr>
												<td width="12%" align="right">调账金额（元）:</td>
												<td width="37%" colspan="1"><%=billInfo.getManualAdjustFee() == null ? "" : billInfo.getManualAdjustFee()%></td>
												<td width="12%" align="right">销账金额（元）:</td>
												<td width="37%" colspan="1"><%=billInfo.getWriteOffFee() == null ? "" : billInfo.getWriteOffFee()%></td>
											</tr>
											<tr>
												<td width="12%" align="right">账单标志:</td>
												<td width="37%" colspan="1"><%=billInfo.getFlagValue() == null ? "" : billInfo.getFlagValue()%></td>
												<td width="12%" align="right">付款标志:</td>
												<td width="37%" colspan="1"><%=billInfo.getPayFlagValue() == null ? "" : billInfo.getPayFlagValue()%></td>
											</tr>
											<tr>
												<td width="12%" align="right">付款方式:</td>
												<td width="37%" colspan="1"><%=billInfo.getPayWayValue() == null ? "" : billInfo.getPayWayValue()%></td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</div>
<br>
 
<table width="99%"  border="0" align="center" cellpadding="0" cellspacing="0">
              <tr> 
                <td width="31" height="23"><img src="<%=path %>/common/images/bar_left(1).gif" width="6" height="25"></td>
                <td width="100%" background="<%=path %>/common/images/bar_bg(1).gif" class="L style2"> 
                  <TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>
                    <TBODY>
                      <TR> 
                        <TD> 
                        	<TABLE border=0 cellPadding=0 cellSpacing=0 class=O>
                            <TBODY>
                              <TR> 
                                <TD width="8" style="WIDTH: 8px"> <IMG height=1 src="<%=path %>/common/images/spacer.gif" width=8></TD>     
     							<script language="JavaScript">
     							function print_click(rowId){
     								if( rowId){
     									setCurrentElement( 'id' , rowId );
     								} 
     								if( !rowId &&  !checkMultipleSelect('id',1,1) ){
     									alert('您必须选择1条要打印的账单明细数据');
     									return ;
     								}
     								alert('系统暂不支持此功能！');
     								//queryResultForm.action='<%=path %>/jsp<%=path %>/finance/bill.do?methodToCall=executeTableCommand&commandId=adjust';
     								//queryResultForm.submit();
     							}
     							</script>
     							<TD noWrap class=P onmouseover=MO() onmouseout=MU() onclick="print_click()">
									<div style="CURSOR: hand"><IMG src="<%=path %>/common/images/detail.gif" hspace=1 border=0 align="absMiddle">打印账单明细</div>
								</TD>
								<TD width="4" class=LL>|</TD>
								<td noWrap class=P onmouseover=MO() onmouseout=MU() onclick="history.back()">
									<div style="CURSOR: hand"><IMG src="<%=path %>/common/images/detail.gif" hspace=1 border=0 align="absMiddle">返回</div>
								</td>
								<TD width="4" class=LL>|</TD>
							</TR>
                            </TBODY>
                          </TABLE></TD>
                      </TR>
                    </TBODY>
                  </TABLE></td>
                <td><img src="<%=path %>/common/images/bar_right(1).gif" width="6" height="25"></td>
              </tr>
             </TABLE>
<table id='scrollTable'  width="99%" border="0" cellspacing="1" cellpadding="0" align="center" bgcolor="#999999"><thead>
	<tr  bgcolor="#CCCCCC">
	<form name="queryResultForm" method="post" action="temp">
		<td   nowrap align="center" height="30" width="0%">
		<script language="JavaScript" type="text/JavaScript">
		<!--
		function MM_jumpMenu2(targ,selObj,restore){ //v3.0
		eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
		if (restore) selObj.selectedIndex=0;
		}
		//-->
		</script>
		<input type="checkbox" id="select" name="select" onclick="javascript:allchecked_click()"> 
		<script language="JavaScript"> 
		function allchecked_click(){ 
			var allCB=document.getElementsByName("id");
			var len=allCB.length;
			if(window.document.getElementById("select").checked){
				for(i=0;i<len;i++){
					allCB[i].checked=true;
				}
			}else{
				for(i=0;i<len;i++){
					allCB[i].checked=!allCB[i].checked;
				}
			}
		}
		</script>
		</td>
		<td nowrap align="center" height="30" width="8%">
			<a href="#">流水号</a>
		</td>
		<td nowrap align="center" height="30" width="8%">
			<a href="#">设备编号</a>
		</td>
		<td nowrap align="center" height="30" width="8%">
			<a href="#">收费项名称</a>
		</td>
		<td nowrap align="center" height="30" width="8%">
			<a href="#">收费说明</a>
		</td>
		<td nowrap align="center" height="30" width="8%">
			<a href="#">对应订购</a>
		</td>
		<td nowrap align="center" height="30" width="8%">
			<a href="#">价格</a>
		</td>
		<td nowrap align="center" height="30" width="8%">
			<a href="#">数量</a>
		</td>
		<td nowrap align="center" height="30" width="8%">
			<a href="#">发生金额</a>
		</td>
		<td nowrap align="center" height="30" width="8%">
			<a href="#">优惠金额</a>
		</td>
		<td nowrap align="center" height="30" width="8%">
			<a href="#">应收金额</a>
		</td>
		<td nowrap align="center" height="30" width="8%">
			<a href="#">对应月份</a>
		</td>
		<td nowrap align="center" height="30" width="8%">
			<a href="#">费用所属期开始时间</a>
		</td>
		<td nowrap align="center" height="30" width="8%">
			<a href="#">费用所属期结束时间</a>
		</td>
		<td nowrap align="center" height="30" width="8%">
			<a href="#">创建时间</a>
		</td>
	</tr></thead>
	<tbody>
	<%
		List<BillDetailInfo> billDs = billInfo.getDetailList();
		for(BillDetailInfo billD : billDs){
	%>
		<tr  bgcolor="#FFFFFF" onMouseOver="openme(this);" onMouseOut="closeme(this);">
			<td  align="center" height="30" width="0%">
				<input type="checkbox" id="id" name="id" value="<%=billD.getSerialNo() %>">
			</td>
			<td  align="center" height="30" width="8%"><%=billD.getId() %></td>
			<td  align="center" height="30" width="8%"><%=billD.getEquNo() == null ? "" : billD.getEquNo()%></td>
			<td  align="center" height="30" width="8%"><%=billD.getFeeItemName() == null ? "" : billD.getFeeItemName()%></td>
			<td  align="center" height="30" width="8%"><%=billD.getFeeDesc() == null ? "" : billD.getFeeDesc()%></td>
			<td  align="center" height="30" width="8%"><%=billD.getUserOrderName() == null ? "" : billD.getUserOrderName()%></td>
			<td  align="center" height="30" width="8%"><%=billD.getPrice() == null ? "" : billD.getPrice()%></td>
			<td  align="center" height="30" width="8%"><%=billD.getNum() == null ? "" : billD.getNum()%></td>
			<td  align="center" height="30" width="8%"><%=billD.getOccurFee() == null ? "" : billD.getOccurFee()%></td>
			<td  align="center" height="30" width="8%"><%=billD.getRebateFee() == null ? "" : billD.getRebateFee()%></td>
			<td  align="center" height="30" width="8%"><%=billD.getFee() == null ? "" : billD.getFee()%></td>
			<td  align="center" height="30" width="8%"><%=billD.getBillMonth() == null ? "" : df.format(billD.getBillMonth())%></td>
			<td  align="center" height="30" width="8%"><%=billD.getBeginDate() == null ? "" : billD.getBeginDate()%></td>
			<td  align="center" height="30" width="8%"><%=billD.getEndDate() == null ? "" : billD.getEndDate()%></td>
			<td  align="center" height="30" width="8%"><%=billD.getCreateDate() == null ? "" : billD.getCreateDate()%></td>
		</tr>
	<%
		}
	%>
		
	</tbody>
</table>
<table width="99%" border="0" align="center" cellpadding="0" cellspacing="00" class="stat">
  <tr>
   
 
</tr>
</table>
 
</body>
</html>


