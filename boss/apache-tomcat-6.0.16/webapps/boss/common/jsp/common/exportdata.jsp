<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<jsp:directive.page import="java.io.OutputStream"/>
<jsp:directive.page import="com.ovt.common.web.qlv.command.ExportCommandResult"/>
<jsp:directive.page import="java.lang.reflect.Method"/>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'exportdata.jsp' starting page</title>
    
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
 ExportCommandResult exportCommandResult=(ExportCommandResult)request.getSession().getAttribute("exportCommandResult");
 List list=exportCommandResult.getList();
			Class exportclass=exportCommandResult.getType();
			Method method=exportclass.getMethod("createSimpleExcel",new Class[]{List.class,OutputStream.class});
			String filename=exportCommandResult.getFilename();
			String filenameresult= new String(filename.getBytes("GBK"),"iso8859-1");
            response.reset();
			response.setHeader("Content-Disposition","attachment;filename="+filenameresult+".xls");
			response.setContentType("application/vnd.ms-excel");
			OutputStream os=response.getOutputStream();
			//ExcelGenerator.createSimpleExcel(list,os);
			method.invoke(null,new Object[]{list,os});
   %>

  </body>
</html>
