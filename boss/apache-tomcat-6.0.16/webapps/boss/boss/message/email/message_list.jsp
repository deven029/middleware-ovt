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
		
		<title>邮件管理</title>
	</head>
 
<body>
	<table width='100%' cellspacing='0' cellpadding='0' border='0'>
			<tr>
				<td nowrap height="30">
					当前位置:
					<span class='DD'>消息管理-->邮件管理（缺省显示最新十封邮件）</span>
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
				<form name="commonQueryForm" method="post" action="<%=path %>/bossCoreMessage/email.do?method=query">
					<tr>
						<td align="center" width="16%" height="23">邮件标题: </td>
						<td align="left" width="34%" height="23"><input name="title" id="title" type="text" value="${title}" size="30" maxlength="10" ></td>
						<td align="center" width="16%" height="23">发布状态: </td>
						<td align="left" width="34%" height="23" colspan="1">
							<select name="status" size="1" >
								<option value="" <c:if test="${status==null}"> selected </c:if> >选择状态</option>
								<option value="0" <c:if test="${status==0}"> selected </c:if> >未发布</option><option value="1" <c:if test="${status==1}"> selected </c:if>>已发布</option>
							</select>
						</td>
					</tr>
					
					<tr>
						<td align="center" width="16%" height="23">邮件发布人: </td>
						<td align="left" width="34%" height="23"><input name="author" id="author" type="text" value="${author}" size="30" maxlength="10" ></td>
						<td align="center" width="16%" height="23">邮件类型: </td>
						<td align="left" width="34%" height="23" colspan="1">
							<select name="emailType" id="emailType" size="1" >
								<option value="" <c:if test="${emailType==null}"> selected </c:if> >选择类型</option>
								<option value="0" <c:if test="${emailType==0}"> selected </c:if> >单发</option><option value="1" <c:if test="${emailType==1}"> selected </c:if> >群发</option>
							</select>
						</td>
					</tr>
					
					<tr>
						<td align="center" width="16%" height="23">智能卡号: </td>
						<td align="left" width="34%" height="23">
							<input type="hidden" name="equId" name="equId" value="${equId}"/>
							<input name="equNo" id="equNo" type="text" value="${equNo}" size="30" maxlength="16" parameters="select id ,equ_no from boss_equ_info where equ_type = 'IC_CARD' and equ_no like ? order by equ_no "
								onKeyDown="CheckSend4UserNameClew();" onpropertychange="clewUserName(this,'equId',2,1);" >
						</td>
						
						<td align="center" width="16%" height="23">片区名称: </td>
						<td align="left" width="34%" height="23">
							<input type="hidden" name="areaId" name="areaId" value="${areaId}"/>
							<input name="areaName" id="areaName" type="text" value="${areaName}" size="30" maxlength="30"  parameters="select id , name , (select name from boss_area_info t where t.id = e.parent_id)  from boss_area_info e where e.name like ? order by e.area_level  "
							onKeyDown="CheckSend4UserNameClew();" onpropertychange="clewUserName(this,'areaId',3,1);" >
						</td>
					</tr>
					
					<tr>
						<td align="center" width="16%" height="23">发布时间-->开始: </td>
						<td align="left" width="34%" height="23">
							<input name="beginDate" type="text"   onclick="WdatePicker()" class="Wdate" value="${beginDate}" size="30" maxlength="50" >
						</td>
						<td align="center" width="16%" height="23">发布时间-->结束: </td>
						<td align="left" width="34%" height="23" colspan="1">
							<input name="endDate" type="text"   onclick="WdatePicker()" class="Wdate" value="${endDate}" size="30" maxlength="50" >
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
     											<c:if test="${func=='010002001'}">
     												<TD noWrap class=P onmouseover=MO() onmouseout=MU() onclick="addView_click()"><div style="CURSOR: hand"><IMG src="<%= path %>/common/images/detail.gif" hspace=1 border=0 align="absMiddle">增加</div></TD>
													<TD width="4" class=LL>|</TD>
												</c:if>
     										</logic:iterate>
     										
     										<logic:iterate id = "func" name = "funCodes" scope="request">
     											<c:if test="${func=='010002002'}">
     												<TD noWrap class=P onmouseover=MO() onmouseout=MU() onclick="modifyView_click()"><div style="CURSOR: hand"><IMG src="<%= path %>/common/images/detail.gif" hspace=1 border=0 align="absMiddle">修改</div></TD>
     												<TD width="4" class=LL>|</TD>
												</c:if>
     										</logic:iterate>
     										
     										<logic:iterate id = "func" name = "funCodes" scope="request">
     											<c:if test="${func=='010002003'}">
     												<TD noWrap class=P onmouseover=MO() onmouseout=MU() onclick="delete_click()"><div style="CURSOR: hand"><IMG src="<%= path %>/common/images/detail.gif" hspace=1 border=0 align="absMiddle">删除</div></TD>
     												<TD width="4" class=LL>|</TD>
												</c:if>
     										</logic:iterate>
     										
     										<logic:iterate id = "func" name = "funCodes" scope="request">
     											<c:if test="${func=='010002004'}">
     												<TD noWrap class=P onmouseover=MO() onmouseout=MU() onclick="send_click()"><div style="CURSOR: hand"><IMG src="<%= path %>/common/images/detail.gif" hspace=1 border=0 align="absMiddle">发布</div></TD>
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
					<td nowrap align="center" height="30" width="14.3%">发布状态</td>
					<td nowrap align="center" height="30" width="14.3%">邮件类型</td>
					<td nowrap align="center" height="30" width="14.3%">邮件标题</td>
					<td nowrap align="center" height="30" width="14.3%">邮件发布人</td>
					<td nowrap align="center" height="30" width="14.3%">邮件内容</td>
					<td nowrap align="center" height="30" width="14.3%">智能卡号/片区名称</td>
					<td nowrap align="center" height="30" width="14.2%">发布时间</td>
				</tr>
			</thead>
			
			<tbody>
				<logic:notEmpty name = "allEmailResults" >
					<logic:iterate id = "email" name = "allEmailResults" scope="session"  indexId="line_no">
						<tr bgcolor="#FFFFFF" onMouseOver="openme(this);" onMouseOut="closeme(this);" id="tr${line_no}">
							<td  align="center" height="30" width="0%"><input type="checkbox" id="id" name="id" value="<bean:write name = "email" property = "id" />"></td>
							<td  align="center" height="30" width="14.3%" id="tr${line_no}-1" >
								<c:if test="${email.publicDate==null}"><font color="red">未发布</font></c:if>
								<c:if test="${email.publicDate!=null}"><font color="green">已发布</font></c:if>
							</td>
							<td  align="center" height="30" width="14.3%"  >
								<c:if test="${email.emailType==0}">单发</c:if>
								<c:if test="${email.emailType==1}">群发</c:if>
							</td>
							<td  align="center" height="30" width="14.3%"><bean:write name = "email" property = "title" /></td>
							<td  align="center" height="30" width="14.3%"><bean:write name = "email" property = "author" /></td>
							<td  align="center" height="30" width="14.3%"><bean:write name = "email" property = "text" /></td>
							<td  align="center" height="30" width="14.3%">
								<c:if test="${email.emailType==0}">
									<bean:write name = "email" property = "equNo" />
									<input type="hidden" name="conditionNames" id="conditionNames" value="${email.equNo}" />
								</c:if>
								<c:if test="${email.emailType==1}">
									<bean:write name = "email" property = "areaName" />
									<input type="hidden" name="conditionNames" id="conditionNames" value="${email.areaName}" />
								</c:if>
							</td>
							<td  align="center" height="30" width="14.2%" id="tr${line_no}-2"><bean:write name = "email" property = "publicDate" format="yyyy-MM-dd HH:mm:ss" /></td>
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
			queryResultForm.action='<%=path%>/bossCoreMessage/email.do?method=add';
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
			
			queryResultForm.action='<%=path%>/bossCoreMessage/email.do?method=modify&id=' + v;
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
			
			oper = 'delete';
			
			deleteEmails(ids)
		}
		
		function send_click(){
			var c = document.getElementsByName( "id"); 
			var indexArray = new Array();
			var v = new Array();
			var num = 0;
			
			var conditionNames = new Array();
			conditionNames = document.getElementsByName("conditionNames");
			
			for(var i=0; i<c.length; i++){ 
	     		if(c[i].checked == true) {
	     			 if(conditionNames[i].value == ''){
						alert("所选邮件中存在【智能卡号/片区名称】为空的邮件，请重新选择");
						return ;
					 }
	     		
	     			 v[num] = c[i].value;
	     			 indexArray[num] = i;
	     			 ++num;
	            }
			}
			
			if(num == 0){
				alert('请您选择要发布的数据');
				return ;
			}
			
			var ids = "" ;
			for(var j=0; j<v.length; j++){
				ids = ids + v[j];
				if(j != v.length -1){
					ids = ids + ",";
				}
			}
			
			oper = 'send';
			sendEmails(ids);
		}
	
		function deleteEmails(ids){
			var url = "<%=path%>/boss/message/ajax/message_ajax_delete_email.jsp?ids=" + ids;
			send_request1(url);
		}
		
		function sendEmails(ids){
			var url = "<%=path%>/boss/message/ajax/message_ajax_send_email.jsp?ids=" + ids;
			send_request1(url);
		}
		
		var http_request1 = false;
		function send_request1(url){//初始化、指定处理函数、发送请求的函数
			http_request1 = false;
			//开始初始化XMLHttpRequest 对象
			if(window.XMLHttpRequest) 
			{ //Mozilla 浏览器
				http_request1 = new XMLHttpRequest();
				if (http_request1.overrideMimeType) 
				{//设置MiME 类别
					http_request1.overrideMimeType("text/xml");
				}
			}
			else if (window.ActiveXObject) 
			{ // IE 浏览器
				try 
				{
					http_request1 = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) 
				{
					try 
					{
						http_request1 = new ActiveXObject("Microsoft.XMLHTTP");
					} catch (e) {}
				}
			}
			
			if (!http_request1) 
			{ // 异常，创建对象实例失败
				window.alert("不能创建XMLHttpRequest 对象实例.");
				return false;
			}
			
			if(oper == 'delete'){
				http_request1.onreadystatechange = processRequest1;
			}else if(oper == 'send'){
				http_request1.onreadystatechange = processRequest2;
			}else {
				alert("传入的oper参数不正确");
			}
			
			
			// 确定发送请求的方式和URL 以及是否同步执行下段代码
			http_request1.open("GET", url, false);
			http_request1.send(null);
		}
		
		// 处理返回信息的函数（删除）
		function processRequest1() 
		{
			if (http_request1.readyState == 4) 
			{ // 判断对象状态
				if (http_request1.status == 200) 
				{ // 信息已经成功返回，开始处理信息
					var result = http_request1.responseXML.getElementsByTagName("result")[0].firstChild.nodeTypedValue;
					if(result == "fail"){
						alert("删除失败");
					}else{
						alert("删除成功");
						window.location.href = "<%= path %>/bossCoreMessage/email.do?method=list";
					}
				} else 
				{ //页面不正常
					alert("您所请求的页面有异常。");
				}
			}
		}
		
		// 处理返回信息的函数（发布）
		function processRequest2() 
		{
			if (http_request1.readyState == 4) 
			{ // 判断对象状态
				if (http_request1.status == 200) 
				{ // 信息已经成功返回，开始处理信息
					var result = http_request1.responseXML.getElementsByTagName("result")[0].firstChild.nodeTypedValue;
					if(result == "fail"){
						alert("发布失败");
					}else{
						changeTr(result);
						alert("发布成功");
					}
				} else 
				{ //页面不正常
					alert("发布异常，请检查CA服务器配置");
				}
			}
		}
		
		function changeTr(dateStr){
			var c = document.getElementsByName( "id"); 
			var indexArray = new Array();
			var num = 0;
			for(var j=0; j<c.length; j++){ 
	     		if(c[j].checked == true) {
	     			 indexArray[num] = j;
	     			 ++num;
	            }
			}
		
			for(var i=0; i<indexArray.length; i++){
				var realIndex = indexArray[i];
				
    			var td1 = document.getElementById('tr' + realIndex + "-1");
   				var td2 = document.getElementById('tr' + realIndex + "-2");
   				
   				td1.innerHTML = '<FONT color=green>已发布</>';
   				td2.innerHTML = dateStr;
			}
		}
	</script>
</html>
