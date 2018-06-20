<%@ page language="java" import="java.util.*" 
pageEncoding="UTF-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ page isELIgnored = "false" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>大数据信息备份</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

	<link href="<%=request.getContextPath()%>/common/css/zi.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="<%=request.getContextPath()%>/common/js/sitech.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/web.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/tabs.js"> </script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/toolbar.js"> </script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_parameter.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/business/databack/dealog/js/jquery_backup_dealog.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/datepicker/WdatePicker.js"> </script>
    <base ><%String basePath = request.getContextPath();/*备份数据类型*/String backupDataType = (String)request.getAttribute("backupDataType");%>
    <style type="text/css">
		.table1{height: 30px; width:750px; bgcolor:#ffffff; bordercolor:#67BF7F;
			border-collapse:collapse; font-size: 14px;}
		.table1 td{border: solid 1px #67BF7F; height: 22px;}
		.bigButton{font-size:14px;font-weight:700;width:70px;height:25px;}
    </style>
    <script language="javascript">
    function backUpExportData(){
        var endTime = $("#endTime").val();
        var type = $("#backupType").val();
        if(endTime==null||endTime==''||type==null||type==''){
            alert('备份条件不能为空！');
            return;
        }
        var url = "<%=basePath%>/jsp/boss/databackup/databackup.do?methodToCall=backupDataType&backupDataType=<%=backupDataType%>";
		document.bossDataBackupForm.action=url;
		document.bossDataBackupForm.submit();
	}
	//隐藏查询条件
	function swhichshow1(){
		if(document.getElementById("bossDataBackupForm").style.display=="none") {
			document.getElementById("bossDataBackupForm").style.display="";
		}else{
			document.getElementById("bossDataBackupForm").style.display="none";
		}
	}
	</script>
  </head>
  <app:position/>
  <body style="margin-top:0px">
	<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="0">
	<tr><td height="23" width="31"><img src="<%=basePath%>/common/images/bar_left.gif" width="31" height="23"/></td><td class="L style2" onclick=swhichshow1() background="<%=basePath%>/common/images/bar_bg.gif" width="100%">备份页面/请输入备份条件</td><td><img src="<%=basePath%>/common/images/bar_right.gif" width="9" height="23"/></td></tr>
	</table>
	<div id="condition" style="text-align: center;">
		<form name="bossDataBackupForm" id="bossDataBackupForm" method="post">
		<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="0">
		<tr>
		<td align="center" width="16%" height="23">截止时间：</td>
		<td align="left" width="34%" height="23">
		<input id="endTime" name="endTime" type="text" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'%y-%M-%d %H:%m:%s'})" class="Wdate" size="30" maxlength="50" >
		</td>
		<td align="center" width="16%" height="23">备份方式: </td>
		<td align="left" width="34%" height="23" colspan="1">
		<select id="backupType" name="backupType">
		<option value="">--请选择--</option>
		<option value="backup">导出备份</option>
		<option value="backupAndDelete">导出备份并删除</option>
		</select>
		</td>
		</tr>
		<tr><td colspan="2" align="right">
		<table width="70" border="0" cellspacing="0" cellpadding="0">
		<tr onclick="backUpExportData()" align="center" style="cursor:hand">
		<td><img src="<%=basePath%>/common/images/but_left.gif" width="6" height="20"/></td>
		<td width="100%" background="<%=basePath%>/common/images/but_bg.gif"/><div>备份</div></td><td><img src="<%=basePath%>/common/images/but_right.gif" width="6" height="20"/></td></tr></table>
		</td>
		<td colspan="2" align="left">
		<table width="70" border="0" cellspacing="0" cellpadding="0">
		<tr onclick="bossDataBackupForm.action='<%=basePath%>/jsp/boss/databackup/databackup.do?methodToCall=openQuery';bossDataBackupForm.submit();" align="center" style="cursor:hand">
		<td><img src="<%=basePath%>/common/images/but_left.gif" width="6" height="20"/></td>
		<td width="100%" background="<%=basePath%>/common/images/but_bg.gif"/><div>返回</div></td><td><img src="<%=basePath%>/common/images/but_right.gif" width="6" height="20"/></td></tr></table>
		</td>
		</tr>
		</table>
		</form>
	</div>
   <div id="content"></div>
  </body>
</html>
