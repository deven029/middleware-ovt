<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="com.ovt.idtv.boss.web.stat.chart.util.JFdisplay"%>
<%@page import="org.jfree.chart.JFreeChart"%>
<%@page import="java.io.PrintWriter"%>
<%@page import="org.jfree.chart.ChartRenderingInfo"%>
<%@page import="org.jfree.chart.ChartUtilities"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<%@ page isELIgnored="false"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ taglib uri="/common/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/common/taglib/fn.tld" prefix="fn"%>
<%@ taglib uri="/common/taglib/fmt.tld" prefix="fmt"%>
<%@ taglib uri="/common/taglib/format.tld" prefix="format"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta http-equiv="Pragma" content="no-cache">
		<link href="<%=path %>/common/css/zi.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" type="text/css"
			href="<%=path %>/cms/concurrent/userconcurrent/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css"
			href="<%=path %>/cms/concurrent/userconcurrent/themes/icon.css">

		<script type="text/javascript"
			src="<%=path %>/cms/concurrent/userconcurrent/jquery-1.4.2.min.js"></script>
		<script type="text/javascript"
			src="<%=path %>/cms/concurrent/userconcurrent/jquery.easyui.min.js"></script>
		<script type=text/javascript src="<%=path %>/common/js/date/date.js"></script>
		<script language="javascript" src="<%=path %>/common/js/calendar.js"></script>
		<script language="javascript" src="<%=path %>/common/js/toolbar.js"></script>
		<script language="javascript" src="<%=path %>/common/js/sitech.js"></script>
		<script language="javascript" src="<%=path %>/datepicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/dwr/engine.js"></script>
		<script type="text/javascript" src="<%=path %>/dwr/util.js"></script>
		<script language="javascript" src="<%=path %>/common/js/xtree/xtree.js"></script>
		<link href="<%=path %>/common/css/xtree.css" rel="stylesheet"
			type="text/css">
		<script language="JavaScript">
function openme(object){
object.style.background="#FFFFCC";}
function closeme(object){
object.style.background="#ffffff";}
</script>
		<style type="text/css">
<!--
.anniu,.anniu1,.anniu2 {
	width: 32px;
	height: 14px;
	padding: 0px;
	border: 0px;
}

.anniu {
	background-image: url(<%=path %>/images/up.gif);
}

.anniu1 {
	background-image: url(<%=path %>/images/down.gif);
}

.anniu2 {
	background-image: url(<%=path %>/images/top.gif);
}

.stat {
	background-image: url(/ admin/ common/ images/ bar_bg(1) .   gif );
	height: 25px;
}

.style1 {
	color: #0c5bc4
}

.style2 {
	font-size: 14px;
	color: #003665;
}

body {
	margin-top: 0px;
}
-->
		
</style>
		<title>曲线图页面</title>
	</head>

	<body>
<app:position />
		<table width="1050" border="0" align="center" cellpadding="0"
			cellspacing="0">
			<tr>
				<td width="31" height="23">
					<img src="<%=path %>/common/images/bar_left.gif" width="31" height="23">
				</td>
				<td width="100%" background="<%=path %>/common/images/bar_bg.gif"
					class="L style2" onclick="swhichshow()">
					<%=request.getAttribute("title") %>曲线图
				</td>
				<td>
					<img src="<%=path %>/common/images/bar_right.gif" width="9" height="23">
				</td>
			</tr>
		</table>
			<div align="center">
			<c:if test="${graphURL != null && graphURL!=''}">
			<%
			String filename = (String) request.getAttribute("filename");
			String graphURL = (String) request.getAttribute("graphURL");
			ChartRenderingInfo info = (ChartRenderingInfo) request.getAttribute("chartInfo");
			PrintWriter pw = new PrintWriter(out);
			ChartUtilities.writeImageMap(pw, filename, info, false);
		%>
			<img src="<%= graphURL %>"  width="1050" height="500" border=0 usemap="#<%= filename %>">
			</c:if>
			</div>
			<div align="center"><input type="button" value="返回" onclick="window.location.href='../../../../boss<%=request.getAttribute("backUrl").toString() %>'"/></div>
	</body>
</html>