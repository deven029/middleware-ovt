<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
</head>
<frameset rows="*" cols="197,*" framespacing="1" border="1" bordercolor="#999999">
  <frameset rows="191,*" cols="*" framespacing="1" border="1" bordercolor="#999999">
    <frame src="<%=request.getContextPath()%>/common/jsp/rights/help/help_manage_left_top.jsp" frameborder="yes" />
    <frame src="<%=request.getContextPath()%>/common/jsp/rights/help/help_manage_left_bottom.jsp" name="leftFrame" frameborder="yes" id="leftFrame" title="leftFrame" />
  </frameset>
  <frame src="<%=request.getContextPath()%>/common/jsp/rights/help/help_manage_right.jsp" name="mainFrame" frameborder="yes" id="mainFrame" title="mainFrame" />
</frameset>
</html>