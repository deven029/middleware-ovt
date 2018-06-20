<%@ page contentType="text/html;charset=utf-8"%> 
<%@include file="../frame/check.jsp"%> 

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script language="javascript" src="../../js/xtree/xtree.js"></script>
<link href="../../css/zi.css" rel="stylesheet" type="text/css">

<script language="javascript">

</script>
<title>管理员门户</title>
</head>

<body>

<table width='100%' cellspacing='0' cellpadding='0' border='0'>
<tr> 
	<td width="0%" height="23" background="<%= path %>/common/images/bar_bg(1).gif"><img src="common/images/bar_left(1).gif" width="6" height="25"></td>
	<td align="center" width="98%" background="<%= path %>/common/images/bar_bg(1).gif" class="L style2">
			    操作结果</td>
	<td width="2%" align="right" background="<%= path %>/common/images/bar_bg(1).gif"><img src="common/images/bar_right(1).gif" width="6" height="25"></td>
</tr>
</table>
<br/>
<%=request.getAttribute("result")%>
<br/>
<a href='../frame/menu?func_code=<%=fsm.getFunc_code()%>'>返回</a>

</body>
</html>