<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/global/global.jsp"%>
<%
	String url=(String)request.getAttribute("url");
	//System.out.println("url=["+url+"]");
	if(url==null) url=cp;
 
%>
<script type="text/javascript">
	window.location='<%=url%>';
</script>
<%
	request.setAttribute("url",null);
%>