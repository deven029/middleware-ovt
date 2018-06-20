<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="java.io.*,java.sql.*,java.util.*,com.ovt.idtv.boss.core.service.common.query.*,com.ovt.idtv.boss.core.service.sys.*"%>
<%@page import="com.ovt.idtv.boss.core.service.charge.IServiceService,com.ovt.idtv.boss.core.service.charge.model.*"%>
<%@page import="com.ovt.idtv.boss.core.Boss,com.ovt.idtv.boss.core.service.charge.model.*"%>

<%
	response.setContentType("text/xml");
	response.setHeader("Cache-Control", "no-cache");
	
	String servName = (String)request.getParameter("servName");
	String result = "";

	try{
		IServiceService serviceService = Boss.getChargeService().getServiceService();
		
		ServiceQueryCondition condition = new ServiceQueryCondition(ServiceQueryCondition.QUERY_ITEM_NAME ,OPER.EQUAL , servName );
		List<Service> tempList = serviceService.queryServices(condition).getServiceList() ; 
		if ( tempList == null || tempList.size() == 0 ) {
			result = "fail";
		} else {
			Service model = serviceService.queryServices(condition).getServiceList().get( 0 ) ;
			
			result = "" + model.getId();
		}
	}catch(RuntimeException re)
	{
		re.printStackTrace();
		result = "fail";
	}

	PrintWriter pw = response.getWriter();
	pw.print("<obj><result>" + result + "</result></obj>");

%>