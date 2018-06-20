<%@ page contentType="text/html;charset=utf-8"%>
<%@ page import="java.util.*,
				com.ovt.common.web.qlv.*"%>

<%@ taglib uri="/tags/app" prefix="app" %>
<%@ taglib uri="/common/taglib/c.tld" prefix="c" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="<%=request.getContextPath() %>/common/css/zi.css" rel="stylesheet" type="text/css">
<script language="javascript" src="<%=request.getContextPath() %>/common/js/toolbar.js"></script>
<script language="javascript" src="<%=request.getContextPath() %>/common/js/sitech.js"></script>

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
<title><%=request.getParameter("winTitle")==null?"数据选择窗口":request.getParameter("winTitle") %></title>
</head>

<body>
	<iframe id="tree"
	 	src="<%=request.getContextPath() + "/common/jsp/common/popTreeSelect.jsp?treeDefineClass=" + request.getParameter( "treeDefineClass" )%>" width="100%" height="90%">
	</iframe>
	<table width="100%">
		<tr align="center">
			<td><hr>
				<table width="30%"  border="0" cellspacing="0" cellpadding="0">
					<tr>
	  					<td>                           
	     					<table width="30%" border="0" cellspacing="0" cellpadding="0">
				   				<tr align='right'>
				   				<% String confirmJs = "selectedStr=parent.document.frames('tree').getSelectedStr();if(!selectedStr){alert('请先选择返回的数据!');return ;}opener.setPopResult_" + request.getParameter("id") + "(selectedStr);window.close();" ;%>
				   					<app:button title="确定" image="" function="<%=confirmJs %>"/>
				   					<app:button title="取消" image="" function="window.close()"/>
								</tr>
							</table>	 
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>