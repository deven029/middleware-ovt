<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c" %>
<%@ taglib uri="/tags/app" prefix="app" %>
<%@ page import="com.ovt.idtv.boss.web.batch.updaterights.struts.*"%>
<%@ page import="com.ovt.idtv.boss.web.user.BatchMemberAdd.struts.UpdateBatchMemberAddThread"%>

<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta http-equiv="Expires" CONTENT="0">
		<meta http-equiv="Cache-Control" CONTENT="no-cache">
		<meta http-equiv="Pragma" CONTENT="no-cache">
		<script language="javascript" src="<%=path%>/common/js/xtree/xtree.js"></script>
		<link href="<%=path%>/common/css/zi.css" rel="stylesheet" type="text/css">

		<script language="javascript">

</script>
		<title>提示页面</title>
	</head>
	<%
		long alreadyProcessIcTimes = UpdateBatchMemberAddThread.alreadyProcessIcTimes;
		int allProcessIcNums = UpdateBatchMemberAddThread.allProcessIcNums ;
		int status = UpdateBatchMemberAddThread.status ;
		String tipMsg = UpdateBatchMemberAddThread.tipMsg;
	%>
	<body leftmargin="0" topmargin="0">
		<table width="99%" border="0" align="center" cellpadding="0"
			cellspacing="0">
			<tr>
				<td valign="top">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td>
								<table width="500" border="0" align="center" cellpadding="0"
									cellspacing="0">
									<tr>
										<td width="0%" height="23"
											background="<%=path%>/common/images/bar_bg(1).gif">
											<img src="<%=path%>/common/images/bar_left(1).gif" width="6"
												height="25">
										</td>
										<td width="98%" background="<%=path%>/common/images/bar_bg(1).gif"
											class="L style2">
											提示信息
										</td>
										<td width="2%" align="right"
											background="<%=path%>/common/images/bar_bg(1).gif">
											<img src="<%=path%>/common/images/bar_right(1).gif" width="6"
												height="25">
										</td>
									</tr>
									<tr>
										<td colspan="3">
											<table width="100%" border="0" cellspacing="1"
												cellpadding="0">
												<tr>
													<td bgcolor="F3F6FF">
														<table width="100%" border="0" cellspacing="0"
															cellpadding="3">
															<tr>
																<td width="13%" height="150" align="center" valign="top">
																	<p>
																		&nbsp;
																	</p>
																	<table width="75%" border="0" cellspacing="0"
																		cellpadding="0">
																		<tr>
																			<td width="17%" align="center">
																				<img src="<%=path%>/common/images/succeed.gif" width="32"
																					height="32">
																			</td>
																			<td width="83%">
																				批量处理添加用户结果：<%=tipMsg%><br>
																				<%if( ( status == UpdateBatchMemberAddThread.UPDAT_RIGHTS_STATUS_EXECUTING ) || ( status == UpdateBatchMemberAddThread.UPDAT_RIGHTS_STATUS_FINISH )) { %>
																					批量处理添加用户总数量&nbsp;&nbsp;&nbsp;<%=allProcessIcNums %> <br/>
																					<%--批量处理添加用户时间&nbsp;&nbsp;&nbsp;<%=alreadyProcessIcTimes %> <br/>--%>
																				<% } %>
																				<br/><br/><br/>
																				此页面自动刷新！
																			</td>
																		</tr> 
																			
																		<tr align="center">
																			<TD colspan="2" >
																					<a href="<%=request.getContextPath()%>/jsp/boss/user/groupMember.do?methodToCall=openQuery">
																						返回 
																					</a>																				   	
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
	</body>
	<script language="JavaScript">
	function run(){
		window.location='<%=request.getContextPath()%>/boss/user/monitorBatchMemberAddStatus.jsp' ;	
		clearInterval() ;
	}	
	setInterval( 'run()' , 1000*5 );
	</script>
</html>
