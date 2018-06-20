<%@ page contentType="text/html;charset=utf-8"%>

<%@include file="check.jsp"%> 
<%@ taglib uri="/tags/app" prefix="app"%>
<html>
<head>
<meta http-equiv='Expires' content='0'>
<meta http-equiv='Pragma'  content='no-cache'>
<meta http-equiv='Cache-Control' content='no-cache'>
<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">

<body style="BACKGROUND-ATTACHMENT: fixed" background="<%= path %>/common/images/intro_bg.gif">
<app:position func_code="<%=fsm.getFunc_code()%>"/>

<div class='content'>

<TABLE border="0"  width="95%">
<TR class="heading">
<TD valign="middle" align="left" bgcolor="D4E3F6" nowrap>
<%=fsm.getDesc_info()%></TD>
</TR>
</TABLE>
 <app:tree treetype="childrenMenu" step="2" />  
 
</div>
</body>
</html>






