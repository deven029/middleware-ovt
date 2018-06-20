<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.ovt.idtv.boss.core.service.finance.remind.RemindFormulaByUserType"%>
<%@ taglib uri="/common/taglib/struts-html.tld" prefix="html"%>    
<%@ taglib uri="/common/taglib/struts-bean.tld" prefix="bean"%>    
<%@ taglib uri="/common/taglib/struts-logic.tld" prefix="logic"%>    
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
<link rel="stylesheet" type="text/css" href="../common/jquery/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../common/jquery/themes/icon.css">
 
<script type="text/javascript" src="../common/jquery/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="../common/jquery/jquery.easyui.min.js"></script>
<script type=text/javascript src="../common/js/date/date.js"></script>
<script language="javascript" src="../common/js/calendar.js"></script>
<script language="javascript" src="../common/js/toolbar.js"></script>
<script language="javascript" src="../common/js/sitech.js"></script>
<script language="javascript" src="<%=path %>/datepicker/WdatePicker.js"></script>
 
<script language="JavaScript"> 
	var contextPath='/Boss';
</script>
<script language="javascript" src="<%=path %>/common/js/xtree/xtree.js"></script>
<link href="<%=path %>/common/css/xtree.css" rel="stylesheet" type="text/css">
<script language="JavaScript"> 
function openme(object){
	object.style.background="#FFFFCC";
}
function closeme(object){
	object.style.background="#ffffff";
}
function form_submit(){
	var inputs = document.getElementsByTagName("input");
	var flag = false;
	for(i=0;i<inputs.length;i++){
		var name = inputs[i].name;
		if(name.indexOf("balance") > 0 || name.indexOf("send_times") > 0 || name.indexOf("send_time") > 0){
			var value = inputs[i].value;
			if(value.search(/^[\+\-]?\d+\.?\d*$/) != 0){
				alert("金额阀值、发送日期和发总次数必须填写数字，请重新填写！");
				return false;
			}
			flag = true;
		}
	}
	if(flag){
		document.forms[0].submit();
	}
}
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

<table width='100%' cellspacing='0' cellpadding='0' border='0'><tr><td nowrap height="30">当前位置: <span class='DD'>账单管理-->用户账单管理-->催缴规则定义</span></td></tr></table></br>
 
<script language="JavaScript">function swhichshow(){if(document.getElementById("condition").style.display=="none") {       document.getElementById("condition").style.display="";}else{document.getElementById("condition").style.display="none";}}</script>

<div id="condition">
<html:form action="/jsp/boss/finance/rfUserType.do?methodToCall=userTypeSubmit" method="post">
	<table width="100%"  border="0" cellspacing="0" cellpadding="0">
    	<tr> 
    		<td colspan="2">
    		<html:hidden name="reminderFormulaForm" property="id"/>
    		<html:hidden name="reminderFormulaForm" property="defineId"/>
    			<logic:iterate id="userTypeReminderFormula" name="reminderFormulaForm" property="userTypeReminderFormula" indexId="index">
    				<html:hidden name="userTypeReminderFormula" property="code" indexed="true"/>
    				<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
	         			<tr> 
						  <td width="6" height="25"><img src="<%=path %>/common/images/bar_left.gif" width="31" height="23"></td>
						  <td width="100%" background="<%=path %>/common/images/bar_bg.gif"><span class="L style2"><bean:write name="userTypeReminderFormula" property="code_name"/></span></td>
						  <td width="6" align="right"><img src="<%=path %>/common/images/bar_right.gif" width="9" height="23"></td>
				   		</tr>
	         			<tr>
	           				<td colspan="3">
		           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
		             				<tr>
		              					<td bgcolor="F3F6FF">                    
		              						<table width="100%" border="0" cellspacing="0" cellpadding="3">	    
												<tr>			
													<td width="12%" align="right">催缴标志:</td>
													<td width="37%" colspan="1">
														<html:select name="userTypeReminderFormula" property="remind_flag" indexed="true">
															<html:option value="0">不催缴</html:option>
															<html:option value="1">催缴</html:option>
														</html:select>
													</td>			
													<td width="12%" align="right">金额阀值:</td>
													<td width="37%" colspan="1">
														<html:text name="userTypeReminderFormula" property="balance" indexed="true"></html:text>
													</td>
												</tr>	
												
												<tr>			
													<td width="12%" align="right">消息内容:</td>
													<td width="37%" colspan="1">
														<html:textarea name="userTypeReminderFormula" property="message" indexed="true"></html:textarea>
													</td>			
													<td width="12%" align="right">发送方式:</td>
													<td width="37%" colspan="1">
														<html:checkbox name="userTypeReminderFormula" property="send_type_zero" indexed="true">上门催缴</html:checkbox>
														<html:checkbox name="userTypeReminderFormula" property="send_type_one" indexed="true">邮件催缴</html:checkbox>
														<html:checkbox name="userTypeReminderFormula" property="send_type_two" indexed="true">短信催缴</html:checkbox>
														<html:checkbox name="userTypeReminderFormula" property="send_type_three" indexed="true">电话催缴</html:checkbox>
														<html:checkbox name="userTypeReminderFormula" property="send_type_four" indexed="true">滚动消息</html:checkbox>
													</td>
												</tr>	
												
												<tr>			
													<td width="12%" align="right">发送日期:</td>
													<td width="37%" colspan="1">
														<html:text name="userTypeReminderFormula" property="send_time" indexed="true"></html:text>日
													</td>			
													<td width="12%" align="right">发送次数:</td>
													<td width="37%" colspan="1">
														<html:text name="userTypeReminderFormula" property="send_times" indexed="true"></html:text>
													</td>
												</tr>	
												
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
    			</logic:iterate>
			</td>
		</tr>
		
		<tr>
			<td colspan="2"><hr/></td>
		</tr>
		
		<tr>
			<td align="right">
				<table width="70" border="0" cellspacing="0" cellpadding="0">
					<tr onclick="form_submit();" align="center" style="cursor:hand">
						<td><img src="<%=path %>/common/images/but_left.gif" width="6" height="20"></td>
						<td width="100%" background="<%=path %>/common/images/but_bg.gif"><div>确定</div></td>
						<td><img src="<%=path %>/common/images/but_right.gif" width="6" height="20"></td>
					</tr>
				</table>
			</td>
			<td align="left">
				<table width="70" border="0" cellspacing="0" cellpadding="0">
					<tr onclick="javascript:history.back()" align="center" style="cursor:hand">
						<td><img src="<%=path %>/common/images/but_left.gif" width="6" height="20"></td>
						<td width="100%" background="<%=path %>/common/images/but_bg.gif"><div>返回</div></td>
						<td><img src="<%=path %>/common/images/but_right.gif" width="6" height="20"></td>
					</tr>
				</table>
			</td>
		</tr>
		
		
	</table>
</html:form>
</div>
<br>

<table width="99%" border="0" align="center" cellpadding="0" cellspacing="00" class="stat"><tr></tr></table>
 
</body>
</html>


