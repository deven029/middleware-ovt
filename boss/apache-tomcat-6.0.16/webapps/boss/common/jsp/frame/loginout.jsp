<%@ page import="com.ovt.common.web.rights.bo.*"%>
<%
	new RightsCheckLogBO().logout(request) ;
	session.invalidate();
  	response.sendRedirect("login.jsp");
%>