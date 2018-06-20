<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/common/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/common/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ page import = "com.ovt.common.web.rights.model.*"%>
<html>
	<head>
		<%
			String path = request.getContextPath();
			
			WorkNoRightAModel wam = (WorkNoRightAModel)request.getSession().getAttribute("workno_right");
			String[] funcArray = wam.getFunc_array();
			request.setAttribute("funCodes" , funcArray);
		%>
		<meta http-equiv="Pragma" content="no-cache">
		<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" type="text/css" href="<%= path %>/common/jquery/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%= path %>/common/jquery/themes/icon.css">

		<script type="text/javascript" src="<%= path %>/common/jquery/jquery-1.4.2.min.js"></script>
		<script type="text/javascript" src="<%= path %>/common/jquery/jquery.easyui.min.js"></script>
		<script type=text/javascript src="<%= path %>/common/js/date/date.js"></script>
		<script language="javascript" src="<%= path %>/common/js/calendar.js"></script>
		<script language="javascript" src="<%= path %>/common/js/toolbar.js"></script>
		<script language="javascript" src="<%= path %>/common/js/sitech.js"></script>
		<script language="javascript" src="<%= path %>/datepicker/WdatePicker.js"></script>
		<script language="JavaScript">var contextPath = '<%= path %>';</script>
		<script language="javascript" src="<%= path %>/common/js/xtree/xtree.js"></script>
		<link href="<%= path %>/common/css/xtree.css" rel="stylesheet" type="text/css">
		
		<script language="JavaScript">
		function openme(object) {
			object.style.background = "#FFFFCC";
		}
		function closeme(object) {
			object.style.background = "#ffffff";
		}
		</script>

		<style type="text/css">
		<!--
		.anniu,.anniu1,.anniu2 {
			width: 32px;
			height: 14px;
			padding: 0px;
			border: 0px;
		}
		
		.anniu {
			background-image: url(<%= path %>/images/up.gif);
		}
		
		.anniu1 {
			background-image: url(<%= path %>/images/down.gif);
		}
		
		.anniu2 {
			background-image: url(<%= path %>/images/top.gif);
		}
		
		.stat {
			background-image: url(<%= path %>/ common/ images/ bar_bg(1) . gif );
			height: 25px;
		}
		
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
		
		<title>定期消息参数管理</title>
	</head>
 
<body>
	<table width='100%' cellspacing='0' cellpadding='0' border='0'>
			<tr>
				<td nowrap height="30">
					当前位置:
					<span class='DD'>消息管理-->定期消息参数管理（缺省显示最新十个定期消息参数）</span>
				</td>
			</tr>
		</table>
		</br>


		<script language="JavaScript">
		function swhichshow() {
			if (document.getElementById("condition").style.display == "none") {
				document.getElementById("condition").style.display = "";
			} else {
				document.getElementById("condition").style.display = "none";
			}
		}
		</script>
		
		<table width="98%" border="0" align="center" cellpadding="0"
			cellspacing="0">
			<tr>
				<td width="31" height="23">
					<img src="<%= path %>/common/images/bar_left.gif" width="31" height="23">
				</td>
				<td width="100%" background="<%= path %>/common/images/bar_bg.gif"
					class="L style2" onclick=swhichshow(); >
					查询页面/请输入查询条件
				</td>
				<td>
					<img src="<%= path %>/common/images/bar_right.gif" width="9" height="23">
				</td>
			</tr>
		</table>
		<br>
		<div id="condition">
			<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="0">
				<form name="commonQueryForm" method="post" action="<%=path %>/bossCoreMessage/remindThreadPara.do?method=query">
					<tr>
						<td align="center" width="16%" height="23">倍数: </td>
						<td align="left" width="34%" height="23" colspan="1">
							<input type="text" size="30" name="multiple" id="multiple" value="${multiple}" />
						</td>	
						<td align="center" width="16%" height="23">提醒天数: </td>
						<td align="left" width="34%" height="23" colspan="1">
							<input type="text" size="30" name="day" id="day" value="${day}" />
						</td>
					</tr>
					
					<tr>
						<td align="center" width="16%" height="23">服务名称: </td>
						<td align="left" width="34%" height="23">
							<input type="hidden" name="servId" name="servId" value="${servId}"/>
							<input name="servName" id="servName" type="text" value="${servName}" size="30"  parameters="select id , name from boss_serv e where e.name like ? order by e.name  "
							onKeyDown="CheckSend4UserNameClew();" onpropertychange="clewUserName(this,'servId',2,1);" >
						</td>
						<td align="center" width="16%" height="23">是否有效: </td>
						<td align="left" width="34%" height="23" colspan="1">
							<select name="active" id="active" size="1" >
								<option value="" <c:if test="${active==null}"> selected </c:if> >-----</option>
								<option value="0" <c:if test="${active==0}"> selected </c:if> >无效</option>
								<option value="1" <c:if test="${active==1}"> selected </c:if> >有效</option>
							</select>
						</td>
						
					</tr>
					
					<tr>
					
						
						<td align="center" width="16%" height="23">参数类型: </td>
						<td align="left" width="34%" height="23">
							<select name="typeId" id="typeId" size="1" >
								<option value="" <c:if test="${typeId==null}"> selected </c:if> >-----</option>
								<option value="1" <c:if test="${typeId==1}"> selected </c:if> >停送OSD通知</option>
								<option value="2" <c:if test="${typeId==2}"> selected </c:if> >到期OSD提醒</option>
								<option value="3" <c:if test="${typeId==3}"> selected </c:if> >到期邮件提醒</option>
							</select>
						</td>
					</tr>
					
					<tr>
						<td colspan="4" align="center">
							<table width="70" border="0" cellspacing="0" cellpadding="0">
								<tr onclick="commonQueryForm.submit()" align="center" style="cursor:hand">
									<td><img src="<%= path %>/common/images/but_left.gif" width="6" height="20"></td>
									<td width="100%" background=" <%= path %>/common/images/but_bg.gif"><div>查询</div></td>
									<td><img src="<%= path %>/common/images/but_right.gif" width="6" height="20"></td>
								</tr>
							</table>
						</td>
					</tr>
				</form>
			</table>
		<br>
		</div>


 	<table width="99%"  border="0" align="center" cellpadding="0" cellspacing="0">
    	<tr> 
        	<td width="31" height="23">
        		<img src="<%= path %>/common/images/bar_left(1).gif" width="6" height="25"></td>
            <td width="100%" background="<%= path %>/common/images/bar_bg(1).gif" class="L style2"> 
            	<TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>
                	<TBODY>
                    	<TR> 
                        	<TD> 
                        		<TABLE border=0 cellPadding=0 cellSpacing=0 class=O>
                            		<TBODY>
                              			<TR> 
                                			<TD width="8" style="WIDTH: 8px"> <IMG height=1 src="<%= path %>/common/images/spacer.gif" width=8></TD>
     										
     										<logic:iterate id = "func" name = "funCodes" scope="request">
     											<c:if test="${func=='010004001'}">
     												<TD noWrap class=P onmouseover=MO() onmouseout=MU() onclick="addView_click()"><div style="CURSOR: hand"><IMG src="<%= path %>/common/images/detail.gif" hspace=1 border=0 align="absMiddle">增加</div></TD>
													<TD width="4" class=LL>|</TD>
												</c:if>
     										</logic:iterate>
     										
     										<logic:iterate id = "func" name = "funCodes" scope="request">
     											<c:if test="${func=='010004002'}">
     												<TD noWrap class=P onmouseover=MO() onmouseout=MU() onclick="modifyView_click()"><div style="CURSOR: hand"><IMG src="<%= path %>/common/images/detail.gif" hspace=1 border=0 align="absMiddle">修改</div></TD>
     												<TD width="4" class=LL>|</TD>
												</c:if>
     										</logic:iterate>
     										
     										<logic:iterate id = "func" name = "funCodes" scope="request">
     											<c:if test="${func=='010004003'}">
     												<TD noWrap class=P onmouseover=MO() onmouseout=MU() onclick="delete_click()"><div style="CURSOR: hand"><IMG src="<%= path %>/common/images/detail.gif" hspace=1 border=0 align="absMiddle">删除</div></TD>
     												<TD width="4" class=LL>|</TD>
												</c:if>
     										</logic:iterate>
     										
     									</TR>
                            		</TBODY>
                          		</TABLE>
							</TD>
						</TR>
					</TBODY>
				</TABLE>
			</td>
            <td><img src="<%= path %>/common/images/bar_right(1).gif" width="6" height="25"></td>
		</tr>
	</table>
	
	
		<table id='scrollTable'  width="99%" border="0" cellspacing="1" cellpadding="0" align="center" bgcolor="#999999">
			<form name="queryResultForm" method="post" action="temp">
			<thead>
				<tr bgcolor="#CCCCCC">
					<td nowrap align="center" height="30" width="0%"></td>
					<td nowrap align="center" height="30" width="16%">参数类型</td>
					<td nowrap align="center" height="30" width="16%">倍数</td>
					<td nowrap align="center" height="30" width="16%">提醒天数</td>
					<td nowrap align="center" height="30" width="16%">单价</td>
					<td nowrap align="center" height="30" width="16%">服务名称</td>
					<td nowrap align="center" height="30" width="16%">是否有效</td>
				</tr>
			</thead>
			
			<tbody>
				<logic:notEmpty name = "allParas" >
					<logic:iterate id = "para" name = "allParas" scope="session"  indexId="line_no">
						<tr bgcolor="#FFFFFF" onMouseOver="openme(this);" onMouseOut="closeme(this);" id="tr${line_no}">
							<td  align="center" height="30" width="0%"><input type="checkbox" id="id" name="id" value="<bean:write name = "para" property = "id" />"></td>
							<td  align="center" height="30" width="20%" >
								<c:if test="${para.typeId == 1}">停送OSD通知</c:if>
								<c:if test="${para.typeId == 2}">到期OSD提醒</c:if>
								<c:if test="${para.typeId == 3}">到期邮件提醒</c:if>
							</td>
							<td  align="center" height="30" width="20%" ><bean:write name = "para" property = "multiple" /></td>
							<td  align="center" height="30" width="20%" ><bean:write name = "para" property = "day" /></td>
							<td  align="center" height="30" width="20%" ><bean:write name = "para" property = "price" /></td>
							<td  align="center" height="30" width="20%" ><bean:write name = "para" property = "servName" /></td>
							<td  align="center" height="30" width="20%" >
								<c:if test="${para.active == 0}"><font color="red">无效</font></c:if>
								<c:if test="${para.active == 1}"><font color="green">有效</font></c:if>
							</td>
						</tr>
					</logic:iterate>
				</logic:notEmpty>
			</tbody>
			</form>
		</table> 
	  

	<table width="99%" border="0" align="center" cellpadding="0" cellspacing="00" class="stat">
    	<tr>
		</tr>
	</table>
	
</body>
	<!-- 渐进下拉式录入通用功能 -->
	<jsp:include page="/boss/common/publicSearch/publicSearch_include.jsp" flush="true" />   
		
	<script type="text/javascript">
		//设置提示的个数
		setClewUserNameLineCount(30);
		//设置主分隔符,请勿用@符号
		setSplitor('$$$');
		//设置附分隔符,请勿用@符号
		setSplitor_ad('---');
	</script>


	<script language="JavaScript">
		var oper = '';
		
		function addView_click(){
			queryResultForm.action='<%=path%>/bossCoreMessage/remindThreadPara.do?method=add';
			queryResultForm.submit();
		}
		
		function modifyView_click(){
			var c = document.getElementsByName( "id"); 
			
			var v;
			var num = 0;
			
			for(var i=0; i<c.length; i++){ 
	     		if(c[i].checked == true) {
	     			++num;
	     			v = c[i].value;
	            }
			}
			
			if(num > 1 || num == 0){
				alert('您必须选择1条要修改的数据');
				return ;
			}
			
			queryResultForm.action='<%=path%>/bossCoreMessage/remindThreadPara.do?method=modify&id=' + v;
			queryResultForm.submit();
		}
		
		function delete_click(){
			var c = document.getElementsByName( "id"); 
			var indexArray = new Array();
			var v = new Array();
			var num = 0;
			
			for(var i=0; i<c.length; i++){ 
	     		if(c[i].checked == true) {
	     			 v[num] = c[i].value;
	     			 indexArray[num] = i;
	     			 ++num;
	            }
			}
			
			if(num == 0){
				alert('请您选择要删除的数据');
				return ;
			}
			
			var ids = "" ;
			for(var j=0; j<v.length; j++){
				ids = ids + v[j];
				if(j != v.length -1){
					ids = ids + ",";
				}
			}
			
			deleteParas(ids)
		}
	
		function deleteParas(ids){
			queryResultForm.action='<%=path%>/bossCoreMessage/remindThreadPara.do?method=delete&ids=' + ids;
			queryResultForm.submit();
		}
		
		
	</script>
</html>
