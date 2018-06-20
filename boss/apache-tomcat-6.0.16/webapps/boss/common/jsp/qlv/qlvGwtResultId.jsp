<%@ page contentType="text/html;charset=UTF-8"%><%
String resultId = (String)request.getAttribute( "resultId") ;
if( resultId != null ){
	out.print( "ResultId:" + resultId ) ;
}
%>