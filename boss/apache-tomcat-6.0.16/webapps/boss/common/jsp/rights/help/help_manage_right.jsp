<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="../../../taglib/c.tld" prefix="c"%>
<%@ taglib uri="/tags/app" prefix="app"%> 

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link href="<%=request.getContextPath()%>/common_extends/jsp/help/main.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<app:help/>
	<jsp:include page="<%=((com.ovt.idtv.common.web.help.model.IHelpInfoModel)session.getAttribute("helpInfo")).getContentUrl()%>" />
	<app:help/>
</body>
</html>