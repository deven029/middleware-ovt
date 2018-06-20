<%@ page language="java" import="java.util.*,com.ovt.idtv.boss.web.resource.command.IcCardImpCommand,com.ovt.idtv.boss.web.resource.command.IcCardImpThreadManage,com.ovt.common.web.rights.model.WorkNoRightAModel,com.ovt.idtv.boss.core.service.resource.model.EquTypeConstants" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>IC卡批量导入结果检测</title>
    
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
	IcCardImpCommand impCommand = IcCardImpThreadManage.createIcCardImpCommand(null,null,EquTypeConstants.EQU_TYPE_ICCARD, loginNo);
	if(impCommand != null){
		if(impCommand.getState()==IcCardImpCommand.runing){
			if(viewType.equals("1")){
				if(impCommand.getImpCount() > 0){
					info.append("runing@上次导入正在进行中，已成功导入卡数量：").append(impCommand.getImpCount()).append(",请稍后..");
					if(impCommand.getImpFailData().size() > 0){
						info.append("导入失败卡数量").append(impCommand.getImpFailData().size()).append("个，请检测卡是否存在，卡号如下：</br>");
						info.append(impCommand.getImpFailDataInfo());
					}
				}else{
					info.append("runing@上次导入正在进行数据准备,请稍后..");
				}
			}else{
				if(impCommand.getImpCount() > 0){
					info.append("runing@导入正在进行中，已成功导入卡数量：").append(impCommand.getImpCount()).append(",请稍后..");
					if(impCommand.getImpFailData().size() > 0){
						info.append("导入失败卡数量").append(impCommand.getImpFailData().size()).append("个，请检测卡是否存在，卡号如下：</br>");
						info.append(impCommand.getImpFailDataInfo());
					}
				}else{
					info.append("runing@导入正在进行数据准备,请稍后..");
				}
				
			}
		}else if( impCommand.getState()==IcCardImpCommand.runed){
			if(viewType.equals("1")){
				info.append("runed@上次导入完毕，成功导入卡数量："+impCommand.getImpCount()).append("个。");
				if(impCommand.getImpFailData().size() > 0){
					info.append("导入失败卡数量").append(impCommand.getImpFailData().size()).append("个，请检测卡是否存在，卡号如下：</br>");
					info.append(impCommand.getImpFailDataInfo());
				}
			}else{
				info.append("runed@导入完毕，成功导入卡数量：").append(impCommand.getImpCount()).append("个。");
				if(impCommand.getImpFailData().size() > 0){
					info.append("导入失败卡数量").append(impCommand.getImpFailData().size()).append("个，请检测卡是否存在，卡号如下：</br>");
					info.append(impCommand.getImpFailDataInfo());
				}
			}
			IcCardImpThreadManage.removeIcCardImpCommand(loginNo);
		}else if(impCommand.getState()==IcCardImpCommand.newImp){
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
