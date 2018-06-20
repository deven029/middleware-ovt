<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.ovt.idtv.boss.core.Boss,com.ovt.idtv.boss.core.service.sys.IAreaService" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta http-equiv='Expires' content='0'>
		<meta http-equiv='Pragma' content='no-cache'>
		<meta http-equiv='Cache-Control' content='no-cache'>
		<script language="javascript" src="/admin/common/js/xtree/xtree.js"></script>
		<script language="javascript" src="/admin/common/js/toolbar.js"></script>
		<script language="javascript" src="/admin/common/js/sitech.js"></script>
		<link href="/admin/common/css/zi.css" rel="stylesheet" type="text/css">
		<title>片区管理</title>
	</head>

	<body>
		<table width='100%' cellspacing='0' cellpadding='0' border='0'>
			<tr>
				<td nowrap height="30">
					当前位置:
					<span class='DD'>系统管理-->片区管理</span>
				</td>
			</tr>
		</table>
		</br>

		<table width="100%" border="0" align="center" cellpadding="0"
			cellspacing="0">
			<tr>
				<td width="31" height="23">
					<img src="/admin/common/images/bar_left(1).gif" width="6"
						height="25">
				</td>
				<td width="100%" background="/admin/common/images/bar_bg(1).gif"
					class="L style2">
					<TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>
						<TBODY>
							<TR>
								<TD>
									<TABLE border=0 cellPadding=0 cellSpacing=0 class=O>
										<TBODY>
											<TR>
												<TD width="8" style="WIDTH: 8px">
													<IMG height=1 src="/admin/common/images/spacer.gif" width=8>
												</TD>

												<TD noWrap class=P onmouseover=MO() onmouseout=MU()
													onclick="addItem('<%=request.getContextPath() %>/jsp/boss/areaInfo/areaInfo.do?methodToCall=addNode')">
													<div style="CURSOR: hand">
														<IMG src="/admin/common/images/ico_new.gif" hspace=1
															border=0 align="absMiddle">
														增加
													</div>
												</TD>
												<TD width="4" class=LL>
													|
												</TD>


												<TD noWrap class=P onmouseover=MO() onmouseout=MU()
													onclick="updateItem('<%=request.getContextPath() %>/jsp/boss/areaInfo/areaInfo.do?methodToCall=modifyNode')">
													<div style="CURSOR: hand">
														<IMG src="/admin/common/images/ico_edit.gif" hspace=1
															border=0 align="absMiddle">
														修改
													</div>
												</TD>
												<TD width="4" class=LL>
													|
												</TD>


												<TD noWrap class=P onmouseover=MO() onmouseout=MU()
													onclick="deleteTreeItem('<%=request.getContextPath() %>/jsp/boss/areaInfo/areaInfo.do?methodToCall=deleteNode')">
													<div style="CURSOR: hand">
														<IMG src="/admin/common/images/ico_delete.gif" hspace=1
															border=0 align="absMiddle">
														删除
													</div>
												</TD>
												<TD width="4" class=LL>
													|
												</TD>


												<TD noWrap class=P onmouseover=MO() onmouseout=MU()
													onclick="operatorItem('tree.do?table_type=func&action_type=operator&func_code=002001004')">
													<div style="CURSOR: hand">
														<IMG src="/admin/common/images/ico_search.gif" hspace=1
															border=0 align="absMiddle">
														对应用户
													</div>
												</TD>
												<TD width="4" class=LL>
													|
												</TD>


											</TR>
										</TBODY>
									</TABLE>
								</TD>
							</TR>
						</TBODY>
					</TABLE>
				</td>
				<td>
					<img src="/admin/common/images/bar_right(1).gif" width="6"
						height="25">
				</td>
			</tr>
		</table>
		<table width="100%" border="2" align="center" cellpadding="3"
			cellspacing="0">
			<tr>
				<td>
					<table width="100%" border="0" align="center" cellpadding="0"
						cellspacing="0">
						<tr>
							<form name="work_form" method="post" action="">
								<input type="hidden" name="tree_value" value="">
								<script language="javascript">
									<%
										IAreaService areaService = (IAreaService)Boss.getSysService().getAreaService();
										String areaTree = areaService.getAreaInfoTree();
									%>
									<%=areaTree%>
								</script>
							</form>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>
