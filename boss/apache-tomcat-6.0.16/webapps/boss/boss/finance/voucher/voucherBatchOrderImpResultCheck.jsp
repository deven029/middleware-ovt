<%@ page language="java" import="org.apache.commons.lang.StringUtils,java.util.*,com.ovt.idtv.boss.web.finance.voucher.command.VoucherBatchAddImpCommand,com.ovt.idtv.boss.web.finance.voucher.struts.VoucherBatchAddImpThreadManage,com.ovt.common.web.rights.model.WorkNoRightAModel" pageEncoding="UTF-8"%>
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
    
    <title>代金券批量导入结果检测</title>
    
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
		VoucherBatchAddImpCommand impCommand = VoucherBatchAddImpThreadManage.createBatchOrderImpCommand(null,null,loginNo);
		if(impCommand != null){
			if(impCommand.getState()==VoucherBatchAddImpCommand.runing){
				if(viewType.equals("1")){
					if(impCommand.getImpCount() > 0){
						info.append("runing@上次导入正在进行中，已成功导入代金券数量：").append(impCommand.getImpCount()).append(",请稍后..");
						if(impCommand.getLossVoucher().size() > 0){
							info.append(impCommand.getFailStr());
						}
					}else{
						info.append("runing@上次导入正在进行数据准备,请稍后..");
					}
				}else{
					if(impCommand.getImpCount() > 0){
						info.append("runing@导入正在进行中，已成功导入代金券数量：").append(impCommand.getImpCount()).append(",请稍后..");
						if(impCommand.getLossVoucher().size() > 0){
							info.append(impCommand.getFailStr());
						}
					}else{
						info.append("runing@导入正在进行数据准备,请稍后..");
					}
					
				}
			}else if( impCommand.getState()==VoucherBatchAddImpCommand.runed){
				info.append("上次代金券导入完毕!</br>");
				if(impCommand.getLossVoucher().size() > 0){
					info.append(impCommand.getFailStr());
				}
				VoucherBatchAddImpThreadManage.removeBatchOrderImpCommand(loginNo);
			}else if(impCommand.getState()==VoucherBatchAddImpCommand.newImp){
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
