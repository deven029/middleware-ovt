<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/common/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/common/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@page import="com.ovt.idtv.web.plugin.IcRightParameterProvider,com.ovt.idtv.web.plugin.SysParameterCache"%><!-- add by liuxu -->
<html>

	<%
		String path = request.getContextPath();
	String isEquNumCheck = SysParameterCache.getInstance().getParameterValue(IcRightParameterProvider.IS_EQU_NUM_CHECK); 	
	%>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta http-equiv="Pragma" content="no-cache">
		<title></title>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/ext/resources/css/ext-all.css" />
		<link href="<%=path%>/common/css/zi.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/common/jquery/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/common/jquery/themes/icon.css">

		<script type="text/javascript" src="<%=path%>/common/jquery/jquery-1.4.2.min.js"></script>
		<script type="text/javascript" src="<%=path%>/common/jquery/jquery.easyui.min.js"></script>
		<script language="javascript" src="<%=path%>/common/js/xtree/xtree.js"></script>
		<link href="<%=path%>/common/css/xtree.css" rel="stylesheet" type="text/css">

		<SCRIPT language=JavaScript src="<%=path%>/common/js/sitech.js"></SCRIPT>
		<script type=text/javascript src="<%=path%>/common/js/date/date.js"></script>
		<script language="javascript" src="<%=path%>/common/js/calendar.js"></script>
		<script language="javascript" src="<%=path%>/datepicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path%>/js/verify/formVerify.js"></script>
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/common/ext/adapter/ext/ext-base.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/common/ext/ext-all.js"></script>
		
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
					<span class='DD'>消息管理-->邮件管理-->新增/编辑 OSD</span>
				</td>
			</tr>
		</table>
		</br>



		<form name="userForm" action="<%=path%>/bossCoreMessage/osd.do?methodToCall=executeViewCommand&viewId=COMMON_VIEW" method="post" enctype="multipart/form-data">

			<input type="hidden" id="id" name="id" value="${bossOsd.id}" />
			<input type="hidden" id="icId" name="icId" value="${bossOsd.icId }" />

			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td>
						<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
							<tr>
								<td width="6" height="25">
									<img src="<%=path%>/common/images/bar_left.gif" width="31" height="23">
								</td>
								<td width="100%" background="<%=path%>/common/images/bar_bg.gif">
									<span class="L style2">OSD信息定义（统一为下滚动，持续时间90秒）</span>
								</td>
								<td width="6" align="right">
									<img src="<%=path%>/common/images/bar_right.gif" width="9" height="23">
								</td>
							</tr>
							<tr>
								<td colspan="3">
									<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
										<tr>
											<td bgcolor="F3F6FF">
												<table width="100%" border="0" cellspacing="0" cellpadding="3" >
													<tr>
														<td width="25%" align="right">
															OSD类型:
														</td>
														<td width="75%" colspan="1">
															<select name="osdType" id="osdType" size="1" onchange="changeParam()">
																<option value="" <c:if test="${bossOsd.osdType==null}"> selected </c:if> >选择类型</option>
																<option value="0" <c:if test="${bossOsd.osdType==0}"> selected </c:if> >单发</option>
																<option value="1" <c:if test="${bossOsd.osdType==1}"> selected </c:if> >群发</option>
															</select>
															<font color="#FF0000">*</font>
														</td>
													</tr>
													
													<tr>
														<td width="25%" align="right">
															&nbsp;
														</td>
														<td width="75%" colspan="1">
															&nbsp;
														</td>	
													</tr>
													
													<tr>
														<td width="25%" align="right">
															OSD内容:
														</td>
														<td width="75%" colspan="1">
															<input type="text" name="text" id="text" value="${bossOsd.text}" size="30" maxlength="180" onclick="edittext(this,'编辑OSD内容');" />
															<font color="#FF0000">*&nbsp;&nbsp;最多限九十个汉字</font>
														</td>
													</tr>
													
													<tr>
														<td width="25%" align="right">
															&nbsp;
														</td>
														<td width="75%" colspan="1">
															&nbsp;
														</td>	
													</tr>
													
													<tr>
														<td width="25%" align="right">
															智能卡号:
														</td>
														<td width="75%" colspan="1">
															<!-- <input type="text" name="equNo" id="equNo" value="${bossOsd.equNo}" size="30" maxlength="16" onpropertychange="checkNum()" style="ime-mode:disabled"/> -->
															<input type="hidden" name="equId" name="equId" value="${bossOsd.icId}"/>
															<input type="hidden" name="icStatus" id="icStatus" value="false" />
															<input type="hidden" name="areaStatus" id="areaStatus" value="false" />
															<input name="isOpen" id="isOpen" type="hidden" value=<%=isEquNumCheck %> /> <!-- add by liuxu --> <!-- modify 增加按设备位数排序，将长度短的设备优先显示   2012-5-19 yzy  -->
															<input name="equNo" id="equNo" type="text" value="${bossOsd.equNo}" size="30" maxlength="16" parameters="select id ,equ_no from boss_equ_info where equ_type = 'IC_CARD' and equ_no like ? order by length(equ_no) ,  equ_no "
																	onKeyDown="CheckSend4UserNameClew();" onpropertychange="clewUserName(this,'equId',2,1);" 
																	<c:if test="${bossOsd.osdType==1}"> disabled="true" </c:if> >
															<font color="#FF0000">*</font>
														</td>
													</tr>
													
													<tr>
														<td width="25%" align="right">
															&nbsp;
														</td>
														<td width="75%" colspan="1">
															&nbsp;
														</td>	
													</tr>
													
													<tr>
														<td width="25%" align="right">
															区域名称:
														</td>
														<td width="75%" colspan="1">
															<!-- <input type="text" name="equNo" id="equNo" value="${bossOsd.equNo}" size="30" maxlength="16" onpropertychange="checkNum()" style="ime-mode:disabled"/> -->
															<input type="hidden" name="areaId" name="areaId" value="${bossOsd.areaId}"/>
															<input name="areaName" id="areaName" type="text" value="${bossOsd.areaName}" size="30" maxlength="30"  parameters="select id , name , (select name from boss_area_info t where t.id = e.parent_id)  from boss_area_info e where e.name like ? order by e.area_level  "
																onKeyDown="CheckSend4UserNameClew();" onpropertychange="clewUserName(this,'areaId',3,1);" 
																<c:if test="${bossOsd.osdType==0}"> disabled="true" </c:if> >
																		
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
														   				
														   				<td align="center"><table width="70" border="0" cellspacing="0" cellpadding="0"><tr onclick="submitFunc()" align="center" style="cursor:hand"><td><img src="<%= path %>/common/images/but_left.gif" width="6" height="20"></td><td width="100%" background="<%= path %>/common/images/but_bg.gif"><div>提交</div></td><td><img src="<%= path %>/common/images/but_right.gif" width="6" height="20"></td></tr></table></td>
 
				     													
				     													
														   				<td align="center"><table width="70" border="0" cellspacing="0" cellpadding="0"><tr onclick="backFunc()" align="center" style="cursor:hand"><td><img src="<%= path %>/common/images/but_left.gif" width="6" height="20"></td><td width="100%" background="<%= path %>/common/images/but_bg.gif"><div>返回</div></td><td><img src="<%= path %>/common/images/but_right.gif" width="6" height="20"></td></tr></table></td>
 
				     													
				     													
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
	 
	
	<table width="30%" border="0" cellspacing="0" cellpadding="0">
  		 <tr align='right'>
   
   		</tr>
	</table>

		</form>
		
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
		
		<script type="text/javascript">
		var validateType ;
		
		function changeParam(){
			var sIndex = document.getElementById("osdType").options.selectedIndex;
			var v = document.getElementById("osdType").options[sIndex].value;
			
			var areaName = document.getElementById("areaName");
			var areaId = document.getElementById("areaId");
			
			var equNo = document.getElementById("equNo");
			var equId = document.getElementById("equId");
			
			//单发：禁止区域名称行，将区域ID的值清空
			if(v == 0){
   				areaName.value = "";
   				areaId.value = "";
   				
   				areaName.disabled = true;
   				equNo.disabled = false;
   			}
			if(v == 1){  //群发：禁止智能卡号
   				equNo.value = "";
   				equId.value = "";
   				
   				areaName.disabled = false;
   				equNo.disabled = true;
			}
			if(v == ""){
				areaName.disabled = false;
				equNo.disabled = false;
			}
		}
		
		/*function insertTr(type){
			var tbInner = document.getElementById('paramTable');
			var rowNum = tbInner.rows.length;
			
			alert("目前行号为：" + rowNum);
			
			//只创建智能卡号行
			if(type == 1){
				//在最后一行之上创建
				var newRow1 = tbInner.insertRow(rowNum - 1);
				
				alert(newRow1.id);
				
				//在行上创建两列
				newRow1.insertCell(0);
				newRow1.insertCell(1);
				
				newRow1.cells[0].innerHTML = "<td width='25%' align='right' >智能卡号:</td>";
				newRow1.cells[1].innerHTML = "<td width=\"75%\" colspan=\"1\"><input type=\"hidden\" name=\"equId\" name=\"equId\" /><input name=\"equNo\" id=\"equNo\" type=\"text\"  size=\"30\" maxlength=\"16\" parameters=\"select id ,equ_no from boss_equ_info where equ_type = 'IC_CARD' and equ_no like ? order by equ_no \" onKeyDown=\"CheckSend4UserNameClew();\" onpropertychange=\"clewUserName(this,'equId',2,1);\" ><font color=\"#FF0000\">*</font></td>";
				
			}
		}*/
		
		function edittext(obj,thetitle,themsg){
			if(thetitle == undefined){thetitle = "编辑"};
			if(themsg == undefined){themsg = ""};
			var thetext=obj.value;

			Ext.MessageBox.show({ 
				title: thetitle,                    //标题 
				msg:themsg,                         //正文信息 
				width:800,                          //宽度
				defaultTextHeight:2000,
				//buttons: Ext.MessageBox.OKCANCEL, //按钮设定 使用 Ext.MessageBox.OKCANCEL 可选 YESNOCANCEL 
				buttons:{"ok":"确定","cancel": "取消"},
				//multiline: true,                  //多行编辑 
				multiline:"number",
				value:thetext,
				fn:function(e,text){
					if(e == 'ok'){
						obj.value=text;
						obj.title=text;
						
						if(thetext != text){
							checkFieldLength(obj,3000);
						}
					}
				}
			}); 
		}
		
		function submitFunc(){
			var osdType = document.getElementById("osdType");
			var title = document.getElementById("title");
			var author = document.getElementById("author");
			var text = document.getElementById("text");
			var equNo = document.getElementById("equNo");
			var areaName = document.getElementById("areaName");
			var isOpen = document.getElementById("isOpen");	// add by liuxu 2012/5/19
			
			if(osdType.value == ""){
				alert("请选择OSD类型");
				osdType.focus();
				
				return false;
			}else if(text.value == ""){
				alert("OSD内容不能为空");
				text.focus();
				
				return false;
			}
			
			if(osdType.value == 0){
				if(equNo.value == ""){
					alert("智能卡号不能为空");
					equNo.focus();
					
					return false;
				}else if(isOpen.value=="1" && equNo.value.length != 16){ // modify by liuxu
					alert("智能卡号必须为16位");
					equNo.focus();
					
					return false;
				}else if(isOpen.value=="0" || equNo.value.length == 16){
					if(isNaN(equNo.value)){
						alert('请输入数值!');
						equNo.value = "";
						equNo.focus();
						return false;
					}
				}
				
				checkEquNo(equNo.value);
			
				var obj = document.getElementById("icStatus");
				if(obj.value != null && obj.value == 'success'){
					userForm.action='<%=path%>/bossCoreMessage/osd.do?method=saveOrUpdate';
					userForm.submit();
				}
			}else if(osdType.value == 1){
				if(areaName.value == ""){
					alert("区域名称不能为空");
					areaName.focus();
					
					return false;
				}
				
				checkAreaName(areaName.value);
				
				var obj = document.getElementById("areaStatus");
				if(obj.value != null && obj.value == 'success'){
					userForm.action='<%=path%>/bossCoreMessage/osd.do?method=saveOrUpdate';
					userForm.submit();
				}
			}
		}
		
		function backFunc(){
			userForm.action='<%=path%>/bossCoreMessage/osd.do?method=list';
			userForm.submit();	
		}
		
		function checkEquNo(equNo){
			validateType = "ic";
			var url = "<%=path%>/boss/message/ajax/message_ajax_verify_ic.jsp?equNo=" + equNo ;
			send_request1(url);
		}
		
		function checkAreaName(areaName){
			validateType = "area";
			var url = "<%=path%>/boss/message/ajax/message_ajax_verify_area.jsp?areaName=" + encodeURI(areaName) ;
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
			
			if(validateType != null && validateType == 'ic'){
				http_request1.onreadystatechange = processRequest1;
			}else if(validateType != null && validateType == 'area'){
				http_request1.onreadystatechange = processRequest2;
			}
			
			// 确定发送请求的方式和URL 以及是否同步执行下段代码
			http_request1.open("GET", url, false);
			http_request1.send(null);
		}
		
		// 处理返回信息的函数
		function processRequest1() 
		{
			var obj = document.getElementById("icStatus");
			
			if (http_request1.readyState == 4) 
			{ // 判断对象状态
				if (http_request1.status == 200) 
				{ // 信息已经成功返回，开始处理信息
					var result = http_request1.responseXML.getElementsByTagName("result")[0].firstChild.nodeTypedValue;
					if(result == "fail"){
						var equNo = document.getElementById("equNo");
						
						alert("智能卡号【" + equNo.value + "】不存在");
						equNo.focus();
						
						obj.value = "false";
					}else{
						//var icId = result;
						//document.getElementById("icId").value = icId;
						
						obj.value="success";
					}
				} else 
				{ //页面不正常
					alert("您所请求的页面有异常。");
				}
			}
		}
		
		// 处理返回信息的函数
		function processRequest2() 
		{
			var obj = document.getElementById("areaStatus");
			
			if (http_request1.readyState == 4) 
			{ // 判断对象状态
				if (http_request1.status == 200) 
				{ // 信息已经成功返回，开始处理信息
					var result = http_request1.responseXML.getElementsByTagName("result")[0].firstChild.nodeTypedValue;
					if(result == "fail"){
						var areaName = document.getElementById("areaName");
						
						alert("片区名称【" + areaName.value + "】不存在");
						areaName.focus();
						
						obj.value = "false";
					}else{
						//var areaId = result;
						//document.getElementById("areaId").value = areaId;
						
						obj.value="success";
					}
				} else 
				{ //页面不正常
					alert("您所请求的页面有异常。");
				}
			}
		}
		</script>
		
		<%
			request.getSession().removeAttribute("bossOsd");
		%>
</html>
