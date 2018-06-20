<%@ page language="java" import="java.util.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String realPath= getServletConfig().getServletContext().getRealPath("//");
String sourcePath= getClass().getResource(".").toString();
%>

<%@ page import="java.io.File"%>  
<%@ page import="java.awt.Desktop"%>  
<%
System.out.println("path="+realPath);
System.out.println("path="+sourcePath);
try { 

File helpFile = new File(realPath+"//common_extends//jsp//help//index.CHM"); 
Desktop.getDesktop().open(helpFile); }  
catch (Exception e) { // TODO: handle exception
System.out.print("异常:"+e.getMessage()); }

/****/
//Process pro=Runtime.getRuntime().exec("hh.exe index.CHM");


%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    

  </head>
  
</html>
