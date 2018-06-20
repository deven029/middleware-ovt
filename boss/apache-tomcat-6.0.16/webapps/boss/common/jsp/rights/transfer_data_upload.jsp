<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="/tags/app" prefix="app"%> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title> </title>
        <link href="<%=request.getContextPath()%>/common/css/zi.css" rel="stylesheet" type="text/css" />
	<script language="JavaScript">
		function openme(object){
				object.style.background="#FFFFCC";
			}
		function closeme(object){
				object.style.background="#ffffff";
				}
	</script>
		<style type="text/css">
		<!--
			.style1 {
				color: #0c5bc4
			}

			.style2 {
				font-size: 14px;
				color: #003665;
			}

			body {
				margin-top: 0px;
			}
		-->
     </style>
	 
  </head>
  
  <body>
  	     <table width='100%' cellspacing='0' cellpadding='0' border='0'>
			<tr>
				<td nowrap height="30">
					当前位置:
					<span class='DD'>系统管理-->数据迁移-->数据导入</span>
				</td>
			</tr>
		</table>
  
     <form name="userForm" method="post" action = "<%=request.getContextPath()%>/common/jsp/rights/transfer/choiceImport.do?methodToCall=uploadFile" enctype="multipart/form-data">
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td>
						<table width="100%" border="0" align="center" cellpadding="0"
							cellspacing="0">
							<tr>
								<td width="6" height="25">
									<img
										src="<%=request.getContextPath()%>/common/images/bar_left.gif"
										width="31" height="23">
								</td>
								<td width="100%"
									background="<%=request.getContextPath()%>/common/images/bar_bg.gif">
									<span class="L style2">导入文件</span>
								</td>
								<td width="6" align="right">
									<img
										src="<%=request.getContextPath()%>/common/images/bar_right.gif"
										width="9" height="23">
								</td>
							</tr>
							<tr>
								<td colspan="3">
									<table width="100%" border="0" cellpadding="0" cellspacing="1"
										class="T">
										<tr>
											<td bgcolor="F3F6FF">
												<table width="100%" border="0" cellspacing="0"
													cellpadding="3">

													<tr>

														<td width="25%" align="right">
															文件名称:
														</td>
														<td width="75%" colspan="1">
															<input type="file" name="formFile" value="" size="30" maxlength="100" onkeydown="return false" onpaste="return false"/>
															<font color="#FF0000">*</font>
														</td>
																
													</tr>
											        <tr align="center">
	                    							<td colspan="2"><hr>
	                    							<table width="30%"  border="0" cellspacing="0" cellpadding="0">
	                       								<tr>
	                          								<td>                           
			                           							<table width="30%" border="0" cellspacing="0" cellpadding="0">
														   			<tr align='right'>
														   				<td align="center">
														   					<app:button title="上一步" image="" function="javascript:history.back()"/>
														   				</td>
														   				<td align="center">
														   					  <app:button title="下一步" image="" function="javascript:userForm.submit()"/>  
														   				</td>
														   				
														   	</tr>
														   </table>
														  </td>
														 </tr>
													</table>
												   </td>
												  </tr> 		   	
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>

     </form>
  </body>
</html>
