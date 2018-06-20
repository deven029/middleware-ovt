<%@ page contentType="text/html;charset=utf-8"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%
  String func_code=(String)request.getParameter("func_code");
  String path = request.getContextPath();
%>
<html>
<head>
<meta http-equiv='Expires' content='0'>
<meta http-equiv='Pragma'  content='no-cache'>
<meta http-equiv='Cache-Control' content='no-cache'>
<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">
<app:position func_code="<%=func_code%>"/>
<body>
</body>
</html>






