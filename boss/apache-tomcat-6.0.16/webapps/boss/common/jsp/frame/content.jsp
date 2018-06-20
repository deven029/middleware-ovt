<%@ page contentType="text/html;charset=utf-8"%>
<%@ taglib uri="/tags/app" prefix="app" %>
<%  
	String path = request.getContextPath();
%>
<html >
<head>
<meta http-equiv='Expires' content='0'>
<meta http-equiv='Pragma'  content='no-cache'>
<meta http-equiv='Cache-Control' content='no-cache'>
<link href="<%= path %>/common/css/menu.css" rel="stylesheet" type="text/css">
<title></title>
</head> 
<body style="BACKGROUND-ATTACHMENT: fixed" >

<table width='95%' cellspacing='0' cellpadding='0' border='0'>
 <tr>
   <td nowrap class='top-info-background' align='left'>
	 <span class='bannerstatus'>当前位置：首页</span>
   </td>
 </tr>
</table>
<div class='content'>
   <app:tree treetype="main_menu" step="2" />  
</div>
</body>
</html>
