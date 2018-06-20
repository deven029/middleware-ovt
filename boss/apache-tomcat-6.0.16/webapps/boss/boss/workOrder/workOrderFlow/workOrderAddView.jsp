<%@ page language="java" import="java.util.*" import="com.ovt.idtv.boss.web.workOrder.struts.edittype.*" import="com.ovt.idtv.boss.web.workOrder.struts.form.WorkOrderForm" pageEncoding="UTF-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ page isELIgnored = "false" %>
<%@ page import="com.ovt.common.web.rights.memoryright.Rights"%>
<%@ page import="com.ovt.common.web.util.OAMPResourceUtil"%>
<%
	String path = request.getContextPath();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	java.util.Date currentTime = new java.util.Date();
	String strDate = formatter.format(currentTime).toString();
    String currentUser = Rights.getWorkNo(request);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>工单转队列</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/tabs.css" />
	<link href="<%=request.getContextPath()%>/common/css/zi.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/boss/charge/table.css"   />
	<link type="text/css" rel="stylesheet"  href="<%=request.getContextPath()%>/common/jquery/themes/default/dialog.css"/>
	<link type="text/css" rel="stylesheet"  href="<%=request.getContextPath()%>/common/jquery/themes/default/easyui.css"/>
	
	<script language="javascript" src="<%=request.getContextPath()%>/datepicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=path%>/common/jquery/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="<%=path%>/common/jquery/jquery.easyui.min.js"></script>
    <script language="javascript"  src="<%=path%>/common/js/xtree/xtree.js"></script>
	<SCRIPT language=JavaScript src="<%=request.getContextPath()%>/common/js/sitech.js"></SCRIPT>
	<SCRIPT language=JavaScript src="<%=request.getContextPath()%>/js/web.js"></SCRIPT>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/tabs.js"> </script>
	<script type="text/javascript">
		function getNewOperHTML(value) {
			var newQueueId = value.split("#")[0];
			$.ajax({
				url:"<%=path %>/jsp/boss/workOrder/workOrderInfo.do?methodToCall=ajaxShowRelatedOpers&queueId="+newQueueId,
				dataType:"html",
				async:false,
				success:function(data){
				  if(data != null && data!= ""){
			  		var option = "<select name='proQueueOper'>" +data+"</select>";
			  		document.getElementById("operInfoDiv").innerHTML = option;
				  }
				},
				error:function(msg){
					//alert(msg);
				}
			});
		}
	</script>
    <base ><%String basePath = request.getContextPath();%>
    
  </head>
  <app:position/>
  <body style="margin-top:0px">
  	<form name="workOrderForm" id="workOrderForm" method="post">
		<%
		WorkOrderQueueEditType que = new WorkOrderQueueEditType();
		WorkOrderTypeEditType type = new WorkOrderTypeEditType();
		WorkOrderForm order = (WorkOrderForm)request.getAttribute("addWorkOrder");
		String errorStr = "";
		if(null != order && null != order.getWebErrorStr()){
			errorStr = order.getWebErrorStr();
		}
		%>
		<c:if test="${errorStr != ''}">
			<div><font color="red"><%=errorStr%></font></div>
		</c:if>
  		<table border=0 cellspacing=0 cellpadding=0 width="100%" align=center><tbody>
		<tr>
		<td height=25 width=6><img src="<%=basePath%>/common/images/bar_left.gif" width=31 height=23></td>
		<td background="<%=basePath%>/common/images/bar_bg.gif" width="100%"><span class="l style2">工单信息定义</span></td>
		<td width=6 align=right><img src="<%=basePath%>/common/images/bar_right.gif" width=9 height=23></td></tr>
		<tr>
		<td colspan=3>
		<table class=t border=0 cellspacing=1 cellpadding=0 width="100%">
		<tbody>
		<tr>
		<td bgcolor=#f3f6ff>
		<table border=0 cellspacing=0 cellpadding=3 width="100%">
		<tbody>
		<tr>
		<td width="12%" align=right>工单分类: </td>
		<td width="37%"><%=type.getHTML(true,false,"woType",null)%></td>
		</tr>
		<tr>
		<td width="12%" align=right>发起人队列: </td>
		<td width="37%"><%=que.getHTML(false,true,"initQueueName",currentUser)%></td>
		</tr>
		<tr>
		<td width="12%" align=right>处理人队列: </td>
		<td width="37%"><%=que.getHTML(true,false,"proQueue",null)%></td>
		<td width="12%" align=right>处理人: </td>
		<td width="27%"><div id = "operInfoDiv"><%=que.getOperHTML(true,false,"proQueueOper","unselected",null)%></div></td>
		</tr>
		<td width="12%" align=right>工单描述: </td>
		<td width="37%"><textarea rows=8 cols=70 name="woDesc" value=""></textarea></td>
		<td width="12%" align=right>目标完成时间: </td>
		<td width="37%"><input type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" value="<%=strDate %>" name="performTime" class="Wdate"></input></td></tr></tbody></table></td></tr></tbody>
		</table></td></tr></tbody></table>
		
		<table border=0 cellspacing=0 cellpadding=0 width="100%" align=center><tbody>
		<tr>
		<td height=25 width=6><img src="<%=basePath%>/common/images/bar_left.gif" width=31 height=23></td>
		<td background="<%=basePath%>/common/images/bar_bg.gif" width="100%"><span class="l style2">客户信息定义</span></td>
		<td width=6 align=right><img src="<%=basePath%>/common/images/bar_right.gif" width=9 height=23></td></tr>
		<tr>
		<td colspan=3>
		<table class=t border=0 cellspacing=1 cellpadding=0 width="100%">
		<tbody>
		<tr>
		<td bgcolor=#f3f6ff>
		<table border=0 cellspacing=0 cellpadding=3 width="100%">
		<tbody>
		<tr>
		<td width="12%" align=right>关联客户标识 : </td>
		<td width="37%"><input type="text" name="userCoding" value=""/></td>
		<td width="12%" align=right>关联客户名称:  </td>
		<td width="37%"><input type="text" name="userName" value=""/></td></tr>
		<tr>
		<td width="12%" align=right>关联客户电话:  </td>
		<td width="37%"><input type="text" name="userTel" value=""/></td>
		<td width="12%" align=right>关联客户地址:  </td>
		<td width="37%"><input type="text" style="width:350px" name="userAddr" value=""/></td></tr>
		<tr>
		<td width="12%" align=right>客户要求 : </td>
		<td width="37%"><textarea rows=5 cols=70 name=userDemand value=""></textarea> </td>
		</tr></tbody></table></td></tr></tbody>
		</table></td></tr></tbody></table>
  	</form>
  <div  style="align:center">
  	<div >
  	<table  width="100%"  border="0"  cellpadding="0" cellspacing="0"  >
   	<tr>
   	<td width="30%"></td>
	<td align="center" width="10%">
 	<table width="100" border="0" cellspacing="0" cellpadding="0">
		<tr id="buyProBut" onclick="workOrderForm.action='<%=basePath%>/jsp/boss/workOrder/workOrderInfo.do?methodToCall=addWorkOrder&commandId=submit';workOrderForm.submit();"
					align="center" style="cursor:hand"><td>
			<img src="<%=basePath %>/common/images/but_left.gif" width="6" height="20"></td>
			<td width="100%" background=" <%=basePath %>/common/images/but_bg.gif"><div>提交</div></td>
			<td><img src=" <%=basePath %>/common/images/but_right.gif" width="6" height="20"></td>
		</tr>
	</table></td>
	<td align="left" width="50%">
 	<table width="100" border="0" cellspacing="0" cellpadding="0">
		<tr  onclick="workOrderForm.action='<%=basePath%>/jsp/boss/workOrder/workOrderInfo.do?methodToCall=openQuery&commandId=submit';workOrderForm.submit();"
					align="center" style="cursor:hand"><td>
			<img src="<%=basePath %>/common/images/but_left.gif" width="6" height="20"></td>
			<td width="100%" background=" <%=basePath %>/common/images/but_bg.gif"><div>返回</div></td>
			<td><img src=" <%=basePath %>/common/images/but_right.gif" width="6" height="20"></td>
		</tr>
	</table></td>
	</tr>
   	</table>
   	</div>
  </div>
  
  <br/>
  <br/>
  <br/>
  </body>
</html>
