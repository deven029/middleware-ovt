<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.ovt.common.web.util.ResourceUtil"%>
<% String path = request.getContextPath(); %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
}
-->
</style>
<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">
</head>

<%
  String company = ResourceUtil.getString("system.company.name");		
%>


<body>
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="180" height="7" bgcolor="0676CC"></td>
    <td width="620" bgcolor="9EC4EB"></td>
  </tr>
  <tr align="center" valign="middle" background="../../images/bottom_bg.gif">
    <td height="20" colspan="2"> 版权所有 2010 北京东方广视科技股份有限公司 地址：中国·北京市昌平区回龙观国际信息产业基地（102206） </td>
  </tr>
</table>
</body>
</html>
