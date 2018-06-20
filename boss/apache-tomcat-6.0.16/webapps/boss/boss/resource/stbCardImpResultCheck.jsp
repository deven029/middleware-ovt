<%@ page language="java" import="java.util.*,com.ovt.idtv.boss.web.resource.command.StbCardImpCommand,com.ovt.idtv.boss.web.resource.command.StbCardImpThreadManage,com.ovt.common.web.rights.model.WorkNoRightAModel" pageEncoding="UTF-8"%>
<%
response.setHeader("Cache-Control","no-store");  //  HTTP  1.1    
response.setHeader("Pragma","no-cache");  //  HTTP  1.0    
response.setDateHeader  ("Expires",0); 

String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>机顶盒号批量导入结果检测</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
    <%
    String viewType =  request.getParameter("viewType");
    StringBuffer bufferInfo = new StringBuffer("");
	WorkNoRightAModel wam=(WorkNoRightAModel)session.getAttribute("workno_right");
	if(wam != null){
		String loginNo = wam.getOperator_model().getLogin_no() ;
		StbCardImpCommand impCommand = StbCardImpThreadManage.getStbCardImpCommand(request,null,null,loginNo);
		if(impCommand != null){
			if(impCommand.getState()==StbCardImpCommand.runing){
				bufferInfo.append("@running@导入正在进行中,请稍后..</br>");
			}else if( impCommand.getState()==StbCardImpCommand.runed){
				bufferInfo.append("@runed@"+impCommand.getImpDataInfo());
			}else if(impCommand.getState()==StbCardImpCommand.newImp){
				Thread impThread = new Thread(impCommand);
				impThread.start();
				bufferInfo.append("@start@导入开始,请稍后..");
			}
			
		}
		
	}
	out.write(bufferInfo.toString());
    %>
  </body>
</html>
