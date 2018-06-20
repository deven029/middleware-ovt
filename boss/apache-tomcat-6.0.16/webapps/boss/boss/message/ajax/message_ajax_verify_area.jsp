<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="java.io.*,java.sql.*,java.util.*,com.ovt.idtv.boss.core.service.common.query.*,com.ovt.idtv.boss.core.service.sys.*"%>
<%@page import="com.ovt.idtv.boss.core.service.resource.IEquService,com.ovt.idtv.boss.core.service.resource.model.*"%>
<%@page import="com.ovt.idtv.boss.core.Boss,com.ovt.idtv.boss.core.service.sys.model.*"%>

<%
	response.setContentType("text/xml");
	response.setHeader("Cache-Control", "no-cache");

	//从url得到areaName的值
	//String areaName = new String (request.getParameter("areaName").getBytes("iso-8859-1"));
	//String areaName = new String (request.getParameter("areaName").getBytes("iso-8859-1"),"GBK");
	
	
	Properties props = System.getProperties();
	String osName = props.getProperty("os.name"); 
	
	String areaName = (String)request.getParameter("areaName");
	//System.out.println("转换之前的字符串为： " + areaName);
	
	if(osName.contains("Windows")){
		//areaName = new String(areaName.getBytes("ISO-8859-1"),"UTF-8");
		//System.out.println("Windows下转换之后的字符串为： " + areaName);
	}else{
		//System.out.println("Linux下不需要转换,字符串为： " + areaName);
	}
	
	//areaName = new String(areaName.getBytes("ISO-8859-1"),"UTF-8");
	//System.out.println("转换之后的字符串为： " + areaName); 
	
	String result = "";

	try{
		IAreaService areaService = Boss.getSysService().getAreaService();
		
		AreaInfoQueryCondition condition = new AreaInfoQueryCondition();
		CommonQueryItemGroup itemGroup = new CommonQueryItemGroup();
		itemGroup.addChildItem(  new CommonQueryItem( AreaInfoQueryCondition.QUERY_ITEM_AREAINFO_NAME , OPER.EQUAL , areaName	) ) ;
		condition.setAutoItemsGroup(itemGroup);
		List<AreaInfo> areaInfos = null;
		AreaInfoCollection areaInfoColle = areaService.queryByCondition(condition);
		
		if (areaInfoColle != null ) {
			areaInfos = areaInfoColle.getAreaInfoList();
		}
		
		if(areaInfos.size() > 0){
			Long icId = ((AreaInfo)areaInfos.get(0)).getId();
		
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