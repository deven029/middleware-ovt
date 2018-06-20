<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.ovt.common.web.util.ResourceUtil"%>
<%@include file="/common/jsp/frame/check.jsp"%> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<%
  String system_name = ResourceUtil.getString("system.name.full");	
%>
<%
  String province = ResourceUtil.getString("system.province");	
	int topHeight = 112 ;
  if( province.equals("cq") ){
  topHeight = 100 ;
}else if( province.equals("tj") ){
	topHeight = 75 ;
}%>
<title><%=system_name%></title>
</head>
<!--
<frameset rows="15%,*" cols="*" frameborder="0" border="0" framespacing="0">
  <frame src="top.htm" name="top" frameborder="0" scrolling="NO" noresize>
  <frameset rows="*" cols="25%,*" framespacing="0" frameborder="0" scrolling="auto" border="0">
    <frame src="tree.jsp" frameborder="0" name="left" scrolling="auto" >
    <frame src="content.jsp" frameborder="0"  name="right" scrolling="auto">
  </frameset>
</frameset>
-->
<frameset rows="<%=topHeight%>,*" cols="*" frameborder="no" border="0" framespacing="0">
  <frame src="top.jsp" name="top" scrolling="no" noresize>
  <frameset rows="*,24" cols="*" framespacing="0" frameborder="no" border="0">
    <frameset rows="*" cols="160,*" framespacing="0" frameborder="no" border="0">
      <frame src="tree.jsp" name="left" scrolling="auto">
      <frame src="../../../common/jsp/frame/content.jsp" name="right" scrolling="auto">
    </frameset>
    <frame src="../../../common/jsp/frame/buttom.jsp" name="bottomFrame" scrolling="no" noresize>
  </frameset>
</frameset>
<noframes>
<body>
</body>
</noframes>
</html>
