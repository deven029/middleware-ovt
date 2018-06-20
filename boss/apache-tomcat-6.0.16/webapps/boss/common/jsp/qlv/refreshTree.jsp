<%@ page contentType="text/html;charset=utf-8" errorPage="/jsp/pm/error/error.jsp"%>
<%@ page import="java.util.*,
				com.ovt.common.web.qlv.*,com.ovt.common.web.qlv.command.HibernateDeleteRowsCommand"%>
<%@ page isELIgnored = "false" %>
<%@include file="/common/jsp/frame/check.jsp"%> 
<%@ taglib uri="/tags/app" prefix="app" %>
<%@ taglib uri="/common/taglib/c.tld" prefix="c" %>

<html>
<head>

</head>
	<%
		String url = request.getParameter("url");
	%>
<c:if test="${refreshTree == 'true'}">
	<script language="JavaScript">
		window.top.left.location="<%=request.getContextPath() %>/common/jsp/frame/tree.jsp<%if( request.getAttribute("refreshTreeMenuItemId")!=null){out.write("?expandTreeItem=" + (String)request.getAttribute("refreshTreeMenuItemId"));}%>";
		window.location="<%=request.getContextPath()+url %>";
	</script>
</c:if>
<script language="JavaScript">
	window.location="<%=request.getContextPath()+url %>";
</script>
<body>
	
</body>
</html>