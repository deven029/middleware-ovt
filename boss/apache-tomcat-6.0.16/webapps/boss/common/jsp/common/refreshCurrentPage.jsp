<%@ page contentType="text/html; charset=utf-8"%><%
String refreshURL = java.net.URLDecoder.decode( request.getParameter( "refreshURL" ) , "UTF-8" ) ;
response.sendRedirect( refreshURL ); %>