<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.io.PrintWriter"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="java.io.File"%>
<%@page import="com.ovt.report.source.ReportConfigConstants"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort() + request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'printdata.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
  <% 	
  		String parameter = "";
		String isPrint = (String)session.getAttribute("isPrint");
  		String defaultPrinter = (String)session.getAttribute("defaultPrinter");
		String urlAddition = (String)session.getAttribute("urlAddition");
		String actionPathToCall = (String)session.getAttribute("actionPathToCall");
		String contextId = (String)session.getAttribute("contextId");
		if(StringUtils.isBlank(isPrint)) {
			isPrint = ReportConfigConstants.PIRNT_REPORT_IS_PRINT_YES;
		}
		if(StringUtils.isBlank(defaultPrinter)) {
			defaultPrinter = ReportConfigConstants.PRINT_REPORT_DEFAULT_PRINTER_YES;
		}
		if(!StringUtils.isBlank(urlAddition)) {
			if(urlAddition.startsWith("&")) {
				parameter = "isPrint=" + isPrint + "&defaultPrinter=" + defaultPrinter + urlAddition;
			} else {
				parameter = "isPrint=" + isPrint + "&defaultPrinter=" + defaultPrinter + "&" + urlAddition;
			}
		} else {
			parameter = "isPrint=" + isPrint + "&defaultPrinter=" + defaultPrinter;
		}
		if(!StringUtils.isBlank("actionPathToCall")) {
			if(!actionPathToCall.startsWith("/")) {
				actionPathToCall = "/" + actionPathToCall;
			}
		}
		session.removeAttribute("isPrint");
		session.removeAttribute("defaultPrinter");
		session.removeAttribute("urlAddition");
		session.removeAttribute("actionPathToCall");
		
		String codebase = basePath + "/applets/jre-6u4-windows-i586-p.exe";
		String reportUrl = basePath + actionPathToCall + ".do?" + parameter + "&contextId=" + contextId;
		String classid = "clsid:8AD9C840-044E-11D1-B3E9-00805F499D93";
		String ARCHIVE = "reportprint.jar";
		String paramCodebase = basePath + "/applets";
		String paramType = "application/x-java-applet;version=1.6";
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		out.println("<object classid='" + classid + "' codebase='" + codebase + "'  width='" + 0 + "' height='"+ 0 + "'  > ");
		out.println("<PARAM NAME = 'CODE' VALUE='PrintReportApplet.class'>");
		out.println("<PARAM NAME = 'CODEBASE' VALUE='" + paramCodebase + "'>");
		out.println("<PARAM NAME = 'ARCHIVE' VALUE='" + ARCHIVE + "'>");
		out.println("<PARAM NAME = 'type' VALUE='" + paramType + "'>");
		out.println("<PARAM NAME = 'scriptable' VALUE='false'>");
		out.println("<PARAM NAME = 'reportUrl' VALUE='" + reportUrl + "'>");
		out.println("<PARAM NAME = 'isPrint' VALUE='" + isPrint + "'>");
		out.println("<PARAM NAME = 'defaultPrinter' VALUE='" + defaultPrinter + "'>");
		out.println("</object>");
		out.println();
		out.flush();
	%>
  </body>
</html>
