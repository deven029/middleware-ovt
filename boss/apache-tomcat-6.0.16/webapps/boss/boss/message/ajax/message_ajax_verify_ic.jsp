<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="java.io.*,java.sql.*,java.util.*,com.ovt.idtv.boss.core.service.common.query.*"%>
<%@page import="com.ovt.idtv.boss.core.service.resource.IEquService,com.ovt.idtv.boss.core.service.resource.model.*"%>
<%@page import="com.ovt.idtv.boss.core.Boss"%>

<%
	response.setContentType("text/xml");
	response.setHeader("Cache-Control", "no-cache");

	//从url得到equNo的值
	String equNo = (String)request.getParameter("equNo");
	
	String result = "";

	try{
		IEquService equService = Boss.getResourceService().getEquService();
		
		EquQueryCondition condition = new EquQueryCondition();
		CommonQueryItemGroup itemGroup = new CommonQueryItemGroup();
		itemGroup.addChildItem(  new CommonQueryItem( EquQueryCondition.QUERY_ITEM_EQU_NO , OPER.EQUAL , equNo	) ) ;
		condition.setAutoItemsGroup(itemGroup);
		List<EquInfo> equInfos = null;
		EquInfoCollection equInfoColle = equService.queryEqus(condition);
		
		if (equInfoColle != null ) {
			equInfos = equInfoColle.getEquInfoList();
		}
		
		if(equInfos.size() > 0){
			Long icId = ((EquInfo)equInfos.get(0)).getId();
		
			result = "" + icId;
		}else{
			result = "fail";
		}
	}catch(RuntimeException re)
	{
		re.printStackTrace();
		result = "fail";
	}

	PrintWriter pw = response.getWriter();
	pw.print("<obj><result>" + result + "</result></obj>");

%>