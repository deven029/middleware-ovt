<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="java.io.*,java.sql.*,java.util.*"%>
<%@page import="com.ovt.idtv.boss.core.service.message.*,com.ovt.idtv.boss.core.*"%>

<%
	response.setContentType("text/xml");
	response.setHeader("Cache-Control", "no-cache");

	IEmailService emailService = Boss.getMessageService().getEmailService();
	
	String ids = (String)request.getParameter("ids");
	String[] idsArray = ids.split(",");
	List<Long> idsList = new ArrayList<Long>();
	String result = "";
	
	try{
		if(null != ids && !ids.equals("")){
			for(int i=0 ; i<idsArray.length ; i++){
				idsList.add(Long.parseLong(idsArray[i]));
			}
		
			emailService.batchDeleteEmail(idsList);
			
			result = "success";
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