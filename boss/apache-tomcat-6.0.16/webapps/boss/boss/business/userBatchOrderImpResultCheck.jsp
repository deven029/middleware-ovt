<%@ page language="java" import="org.apache.commons.lang.StringUtils,java.util.*,com.ovt.idtv.boss.web.business.batchUserOrder.command.UserBatchOrderImpCommand,com.ovt.idtv.boss.web.business.batchUserOrder.command.UserBatchOrderImpThreadManage,com.ovt.common.web.rights.model.WorkNoRightAModel" pageEncoding="UTF-8"%>
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
    
    <title>用户批量订购导入结果检测</title>
    
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
    StringBuffer info = new StringBuffer("");
	WorkNoRightAModel wam=(WorkNoRightAModel)session.getAttribute("workno_right");
	if(wam != null){
		String loginNo = wam.getOperator_model().getLogin_no() ;
		UserBatchOrderImpCommand impCommand = UserBatchOrderImpThreadManage.createBatchOrderImpCommand(null,null,loginNo);
		if(impCommand != null){
			if(impCommand.getState()==UserBatchOrderImpCommand.runing){
				if(viewType.equals("1")){
					if(impCommand.getImpCount() > 0){
						info.append("runing@上次导入正在进行中，已成功导入用户订购数量：").append(impCommand.getImpCount()).append(",请稍后..");
						if(impCommand.getImpFailUserEqus().size() > 0){
							info.append(impCommand.getImpFailUserCodinginfo());
						}
					}else{
						info.append("runing@上次导入正在进行数据准备,请稍后..");
					}
				}else{
					if(impCommand.getImpCount() > 0){
						info.append("runing@导入正在进行中，已成功导入用户订购数量：").append(impCommand.getImpCount()).append(",请稍后..");
						if(impCommand.getImpFailUserEqus().size() > 0){
							info.append(impCommand.getImpFailUserCodinginfo());
						}
					}else{
						info.append("runing@导入正在进行数据准备,请稍后..");
					}
					
				}
			}else if( impCommand.getState()==UserBatchOrderImpCommand.runed){
				if(viewType.equals("1")){
					if(impCommand.getImpCount() == 0 && impCommand.getImpFailUserEqus().size() == 0){
						if(!StringUtils.isBlank(impCommand.getFailStr())){
							info.append("runed@"+impCommand.getFailStr());
						}else{
							info.append("上传文件格式错误，请检查后上传！");
						}
					}else{
						info.append("runed@上次导入完毕，成功导入用户订购数量："+impCommand.getImpCount()).append("个。");
						if(impCommand.getImpFailUserEqus().size() > 0){
							info.append(impCommand.getImpFailUserCodinginfo());
						}
					}
				}else{
					if(impCommand.getImpCount() == 0 && impCommand.getImpFailUserEqus().size() == 0){
						if(!StringUtils.isBlank(impCommand.getFailStr())){
							info.append("runed@"+impCommand.getFailStr());
						}else{
							info.append("上传文件格式错误，请检查后上传！");
						}
					}else{
						info.append("runed@导入完毕，成功导入用户订购数量：").append(impCommand.getImpCount()).append("个。");
						if(impCommand.getImpFailUserEqus().size() > 0){
							info.append(impCommand.getImpFailUserCodinginfo());
						}
					}
				}
				UserBatchOrderImpThreadManage.removeBatchOrderImpCommand(loginNo);
			}else if(impCommand.getState()==UserBatchOrderImpCommand.newImp){
				Thread impThread = new Thread(impCommand);
				impThread.start();
				info.append("newImp@导入进行中，请稍后..");
			}
		}
	}
	out.write(info.toString());
    %>
  </body>
</html>
