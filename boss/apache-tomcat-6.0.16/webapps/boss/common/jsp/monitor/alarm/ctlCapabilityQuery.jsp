<%@ page contentType="text/html;charset=UTF-8"%>
<%@include file="/common/jsp/frame/check.jsp"%> 
<%@ taglib uri="/tags/app" prefix="app" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">

<link href="<%=request.getContextPath() %>/common/css/zi.css" rel="stylesheet" type="text/css">
<script language="javascript" src="<%=request.getContextPath() %>/common/js/toolbar.js"></script>
<SCRIPT language=JavaScript src="<%=request.getContextPath() %>/common/js/sitech.js"></SCRIPT>
<script language="JavaScript">
function openme(object){
object.style.background="#FFFFCC";}
function closeme(object){
object.style.background="#ffffff";}
</script>
<style type="text/css">
<!--
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
<title>性能监控查询</title>
</head>

<body>
<app:position/>
<app:commonQuery id="queryDefine1.oamp.ctlCapability.Query" submitAddr="/common/jsp/monitor/alarm/ctlCapability.do?methodToCall=realtimeMonitor"/>

</body>
</html>