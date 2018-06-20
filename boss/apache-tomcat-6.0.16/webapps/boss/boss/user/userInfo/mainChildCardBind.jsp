<%@ page import="java.util.*,com.ovt.idtv.boss.core.service.resource.model.*,com.ovt.idtv.boss.core.*,org.apache.log4j.Logger" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Pragma" content="no-cache">
<title></title>
<link href="<%=request.getContextPath() %>/common/css/zi.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/common/jquery/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/common/jquery/themes/icon.css">
 
<script type="text/javascript" src="<%=request.getContextPath() %>/common/jquery/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/common/jquery/jquery.easyui.min.js"></script>
 <script language="javascript" src="<%=request.getContextPath() %>/common/js/xtree/xtree.js"></script>
 <link href="<%=request.getContextPath() %>/common/css/xtree.css" rel="stylesheet" type="text/css">
 
<SCRIPT language=JavaScript src="<%=request.getContextPath() %>/common/js/sitech.js"></SCRIPT>
<script type=text/javascript src="<%=request.getContextPath() %>/common/js/date/date.js"></script>
</script>
<script language="javascript" src="<%=request.getContextPath() %>/common/js/calendar.js"></script>
</script>
<script language="javascript" src="<%=request.getContextPath() %>/datepicker/WdatePicker.js"></script>
</script>
<script language="JavaScript"> 
function openme(object){
object.style.background="#FFFFCC";}
function closeme(object){
object.style.background="#ffffff";}
</script>
<style type="text/css"> 
<!--
.style1 {color: #0c5bc4}
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
 
<table width='100%' cellspacing='0' cellpadding='0' border='0'><tr><td nowrap height="30">当前位置: <span class='DD'>用户管理-->用户管理-->设备维护-->子母卡绑定</span></td></tr></table></br>
 
 
<font color="red"><%=request.getAttribute("errMsg")==null ? "":new String(((String)request.getAttribute("errMsg")).getBytes(),"iso8859-1") %></font>
<form name="userForm" action="<%=request.getContextPath() %>/jsp/boss/user/userInfo/equInfo.do?methodToCall=mainChildCardBind" method="post" >
	
	<table width="100%"  border="0" cellspacing="0" cellpadding="0">
    	<tr> 
    		<td>
       			<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         			<tr> 
					  <td width="6" height="25"><img src="<%=request.getContextPath() %>/common/images/bar_left.gif" width="31" height="23"></td>
					  <td width="100%" background="<%=request.getContextPath() %>/common/images/bar_bg.gif"><span class="L style2">子母卡绑定操作</span></td>
					  <td width="6" align="right"><img src="<%=request.getContextPath() %>/common/images/bar_right.gif" width="9" height="23"></td>
			   		</tr>
         			<tr>
           				<td colspan="3">
	           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
	             				<tr>
	              					<td bgcolor="F3F6FF">                    
	              						<table width="100%" border="0" cellspacing="0" cellpadding="3">
	    
		<%
			List<EquInfo> equs = null;
			Map<Long,String> equIdCodeMap = null;
			String userId = (String)request.getSession().getAttribute("userId");
			equs = Boss.getUserService().getUserEquRelationService().getUnBindEquListByUserId(new Long(userId),EquTypeRelationConstants.IC_MAIN_SUB_RELATION);
		%>
		<tr>
			<td width="50%" colspan="1" align="center">
				IC母卡
			</td>
			<td width="50%" colspan="1" align="center">
				IC子卡
			</td>
		</tr>
		
		<%
		for(int i=0 ;i<equs.size();i++)
		{
			%>
		<tr>
			<%
			EquInfo iccard = equs.get(i);
			%>
			<td width="50%" colspan="1" align="center">
				<input type="radio" name="iccard1" value="<%=iccard.getId()%>"><%=iccard.getEquCode() %>
			</td>
			<%
		
			%>
			<td width="50%" colspan="1" align="center">
				<input type="radio" name="iccard2" value="<%=iccard.getId()%>"><%=iccard.getEquCode() %>
			</td>
			<%
		}
			%>
		</tr>
	
										<tr align="center">
	                    				<td colspan="4"><hr>
	                    							<table width="30%"  border="0" cellspacing="0" cellpadding="0">
	                       								<tr>
	                          								<td>                           
			                           							<table width="30%" border="0" cellspacing="0" cellpadding="0">
														   			<tr align='right'>
														   				
														   				<td align="center"><table width="70" border="0" cellspacing="0" cellpadding="0"><tr onclick="userForm.submit();" align="center" style="cursor:hand"><td><img src="<%=request.getContextPath() %>/common/images/but_left.gif" width="6" height="20"></td><td width="100%" background="<%=request.getContextPath() %>/common/images/but_bg.gif"><div>提交</div></td><td><img src="<%=request.getContextPath() %>/common/images/but_right.gif" width="6" height="20"></td></tr></table></td>
 
				     													
				     													
														   				<td align="center"><table width="70" border="0" cellspacing="0" cellpadding="0"><tr onclick="history.back()" align="center" style="cursor:hand"><td><img src="<%=request.getContextPath() %>/common/images/but_left.gif" width="6" height="20"></td><td width="100%" background="<%=request.getContextPath() %>/common/images/but_bg.gif"><div>返回</div></td><td><img src="<%=request.getContextPath() %>/common/images/but_right.gif" width="6" height="20"></td></tr></table></td>
 
				     													
				     													
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
</html>
