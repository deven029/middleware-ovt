<%@ page contentType="text/html; charset=utf-8" isErrorPage="true"%>
<%@ page import="com.ovt.common.web.util.*"%>

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
		String errMsg = (String) request.getAttribute("errMsg");
		if ((errMsg == null) || (errMsg.length() == 0)) {
			errMsg = (String) request.getParameter("errMsg");
		}

		String errMsg2 = ResourceUtil.getString(errMsg);

		if (errMsg2 == null) {
			errMsg2 = errMsg;
		}

		if (errMsg2 == null) {
			errMsg2 = "请按汇总方式查询，再查看曲线图！" ;
		}
		//get func_code 
		String backurl = (String) request.getAttribute("func_code");
		if ((backurl == null) || (backurl.length() == 0)) {
			backurl = (String) request.getParameter("func_code");
		}

		if ((backurl != null) && (backurl.length() != 0)) {
			backurl = path + "/common/jsp/frame/menu?func_code=" + backurl;
		} else {
			//get Alias
			backurl = (String) request.getAttribute("alias");
			if ((backurl == null) || (backurl.length() == 0)) {
				backurl = (String) request.getParameter("alias");
			}
			if ((backurl != null) && (backurl.length() != 0)) {
				backurl = path + "/common/jsp/frame/menu?check_type=1&alias="
				+ backurl;
			} else {
				backurl = (String) request.getAttribute("url");
				if ((backurl == null) || (backurl.length() == 0)) {
			backurl = (String) request.getParameter("url");
				}
				if ((backurl != null) && (backurl.length() != 0)) {

				} else {
			backurl = "javascript:history.back()";
				}
			}
		}
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
																			<td width="25%">
																				操作结果：
																			</td>
																			<td width="58%">
																				<%= errMsg2%>
 																		<%
                                                                       final   org.apache.log4j.Logger logger = org.apache.log4j.Logger.getLogger(Exception.class) ;
 																		logger.info("error info",exception);%>
																			</td>
																		</tr>

																	</table>
																</td>
															</tr>
															<tr>
																<td height="150">
																	<p align="center">
																		<a href="<%=backurl%>">确定</a> 
																	</p>
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
</html>
