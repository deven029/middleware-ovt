<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/common/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/common/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<html>

	<%
		String path = request.getContextPath();
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
					<span class='DD'>消息管理-->定期消息参数管理-->新增/编辑参数</span>
				</td>
			</tr>
		</table>
		</br>



		<form name="userForm" action="<%=path%>/bossCoreMessage/bossRemindThreadPara.do?methodToCall=executeViewCommand&viewId=COMMON_VIEW" method="post" enctype="multipart/form-data">

			<input type="hidden" id="id" name="id" value="${bossRemindThreadPara.id}" />

			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td>
						<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
							<tr>
								<td width="6" height="25">
									<img src="<%=path%>/common/images/bar_left.gif" width="31" height="23">
								</td>
								<td width="100%" background="<%=path%>/common/images/bar_bg.gif">
									<span class="L style2">定期消息参数定义</span>
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
															倍数:
														</td>
														<td width="75%" colspan="1">
															<input type="text" name="multiple" id="multiple" value="${bossRemindThreadPara.multiple}" size="30" maxlength="180" />
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
															提醒天数:
														</td>
														<td width="75%" colspan="1">
															<input type="text" name="day" id="day" value="${bossRemindThreadPara.day}" size="30" maxlength="180" />
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
															单价:
														</td>
														<td width="75%" colspan="1">
															<input type="text" name="price" id="price" value="${bossRemindThreadPara.price}" size="30" maxlength="180" />(精确到两位小数) 
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
															服务名称:
														</td>
														<td width="75%" colspan="1">
															<input type="hidden" name="servStatus" id="servStatus" value="false" />
															<input type="hidden" name="servId" name="servId" value="${bossRemindThreadPara.servId}"/>
															<input name="servName" id="servName" type="text" value="${bossRemindThreadPara.servName}" size="30" maxlength="30"  parameters="select id , name from boss_serv e where e.name like ? order by e.name "
																onKeyDown="CheckSend4UserNameClew();" onpropertychange="clewUserName(this,'servId',2,1);"  > 
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
															参数类别:
														</td>
														<td width="75%" colspan="1">
															<select name="typeId" id="typeId" size="1" >
																<option value="1" <c:if test="${bossRemindThreadPara.typeId==1}"> selected </c:if> >停送OSD通知</option>
																<option value="2" <c:if test="${bossRemindThreadPara.typeId==2}"> selected </c:if> >到期OSD提醒</option>
																<option value="3" <c:if test="${bossRemindThreadPara.typeId==3}"> selected </c:if> >到期邮件提醒</option>
															</select>
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
															是否有效:
														</td>
														<td width="75%" colspan="1">
															<select name="active" id="active" size="1" >
																<option value="1" <c:if test="${bossRemindThreadPara.active==1}"> selected </c:if> >有效</option>
																<option value="0" <c:if test="${bossRemindThreadPara.active==0}"> selected </c:if> >无效</option>
															</select>
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
		function submitFunc(){
			var multiple = document.getElementById("multiple");
			var day = document.getElementById("day");
			var servId = document.getElementById("servId");
			var servName = document.getElementById("servName");
			var typeId = document.getElementById("typeId");
			var active = document.getElementById("active");
			var price = document.getElementById("price");
			
			if(multiple.value != '' &&  isNaN(multiple.value)){
				alert('倍数请输入数值!');
				multiple.value = "";
				multiple.focus();
					
				return false;
			}
			
			if(day.value != '' &&  isNaN(day.value)){
				alert('提醒天数请输入数值!');
				day.value = "";
				day.focus();
					
				return false;
			}
			
			if ( typeId.value == 3 ) {

				if ( price.value == '' ){
					alert('单价不能为空!');
					return false;
				}

				
			}
			var patrn =  /^[0-9]+([.]\d{1,2})?$/   ;
			if (price.value != '' &&    !patrn.test(price.value)     ){
				alert('请正确输入单价的值!');
				return;
			} 


			if(typeId.value == 3 ){
				if(servName.value == "") {
					alert('服务名称不能为空!');
					servName.focus();
						
					return false;
				}
			}
			
			if(servName.value != ""){
				checkServName(servName.value);
				
				var obj = document.getElementById("servStatus");
				if(obj.value != null && obj.value == 'success'){
					userForm.action='<%=path%>/bossCoreMessage/remindThreadPara.do?method=saveOrUpdate';
					userForm.submit();
				}
			} else {
				userForm.action='<%=path%>/bossCoreMessage/remindThreadPara.do?method=saveOrUpdate';
				userForm.submit();
			}
		}
		
		function backFunc(){         
			userForm.action='<%=path%>/bossCoreMessage/remindThreadPara.do?method=list';
			userForm.submit();	
		}
		
		function checkServName(servName){
			var url = "<%=path%>/boss/message/ajax/message_ajax_verify_serv.jsp?servName=" + encodeURI(servName) ;
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
			
			http_request1.onreadystatechange = processRequest;
			
			// 确定发送请求的方式和URL 以及是否同步执行下段代码
			http_request1.open("GET", url, false);
			http_request1.send(null);
		}
		
		// 处理返回信息的函数
		function processRequest() 
		{
			var obj = document.getElementById("servStatus");
			
			if (http_request1.readyState == 4) 
			{ // 判断对象状态
				if (http_request1.status == 200) 
				{ // 信息已经成功返回，开始处理信息
					var result = http_request1.responseXML.getElementsByTagName("result")[0].firstChild.nodeTypedValue;
					if(result == "fail"){
						var servName = document.getElementById("servName");
						
						alert("服务名称【" + servName.value + "】不存在");
						servName.focus();
						
						obj.value = "false";
					}else{
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
			request.getSession().removeAttribute("bossRemindThreadPara");
		%>
</html>
