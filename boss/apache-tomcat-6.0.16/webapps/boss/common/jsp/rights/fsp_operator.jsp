<%@ page contentType="text/html;charset=utf-8"%>
<%@include file="../frame/check.jsp"%> 
<%@ taglib uri="/tags/app" prefix="app" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv='Expires' content='0'>
<meta http-equiv='Pragma'  content='no-cache'>
<meta http-equiv='Cache-Control' content='no-cache'>
<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">
<script language="javascript" src="<%= path %>/common/js/toolbar.js"></script>
<script language="javascript" src="<%= path %>/common/js/sitech.js"></script>
<script language="JavaScript">
function openme(object){
object.style.background="#FFFFCC";}
function closeme(object){
object.style.background="#ffffff";}
</script>
<title>spms_func</title>
</head>
<body>
<app:position func_code="<%=fsm.getFunc_code()%>"/>
<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         <tr> 
					  <td width="6" height="25"><img src="<%= path %>/common/images/bar_left.gif" width="31" height="23"></td>
					  <td width="100%" background="<%= path %>/common/images/bar_bg.gif"><span class="L style2">对应登录名为:</span></td>
					  <td width="6" align="right"><img src="<%= path %>/common/images/bar_right.gif" width="9" height="23"></td>
			   </tr>
</table>			   
<app:table/> 
 <form name="work_form" method="post" action="">
   <input type="hidden" name="tree_value" value="">
    
</form>
<app:button title="返回" image="" function="javascript:history.back()"/>  
</body>
</html>
