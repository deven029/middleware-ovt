<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="../../../taglib/c.tld" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
</head>
<body>
	<span style="font-size:20px;font-weight:bold "><c:out value="${helpInfo.name}" /></span>
	<ul>
		<c:forEach items="${helpInfoChildList}" var="info" varStatus="state">
			<li><a target="mainFrame" href="<%=request.getContextPath()%>/common/jsp/rights/help/helpManage.do?methodToCall=showHelpList&helpInfoId=<c:out value="${state.index}"/>"><c:out value="${info.name}"/></a></li>
		</c:forEach>
	</ul>
</body>
</html>