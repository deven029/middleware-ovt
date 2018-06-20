<%@ page contentType="text/html;charset=utf-8"%>
<%@ taglib uri="/tags/app" prefix="app" %>
<% String path = request.getContextPath(); %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
 <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="cache-control" content="no-cache">
  <meta http-equiv="expires" content="0">    
  <script language="javascript" src="<%= path %>/common/js/xtree/xtree.js"></script>
  <link href="<%= path %>/common/css/xtree.css" rel="stylesheet" type="text/css">
<style type="text/css">
<!--
.style2 {font-size: 14px}
body {
	margin-top: 0px;
	background-image: url();
	margin-left: 0px;
}
-->
</style>
 <script>
<!--
function windowopen(){
var target="search_top.htm"
newwindow=window.open("","","scrollbars")
if (document.all){
newwindow.moveTo(0,0)
newwindow.resizeTo(screen.width,screen.height)
}
newwindow.location=target
}
//-->
</script>
</head>
<body topmargin="0" bgcolor="D4E3F6">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr bgcolor="418DDA">
    <td colspan="2"><img src="<%= path %>/common/images/arrow.gif" width="20" height="10"></td>
  </tr>
  <tr>
  <td>
	  <table width=100% border=0 cellpadding=0 cellspacing=0><br/>
		    <div id=divList>
		    <app:tree treetype="workno_func" step="2" />  
		    </div>
	   </TABLE>
  </td>
  </tr>
</table>
</body>
</html>
<%if(request.getParameter( "expandTreeItem" )!=null){ %>
<script language="JavaScript">
	treenode0.expandToTreeItem( '<%=request.getParameter( "expandTreeItem" )%>' ) ;
</script>
<%} %>
