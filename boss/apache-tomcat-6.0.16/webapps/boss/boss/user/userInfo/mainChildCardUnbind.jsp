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
function allchecked_click()
{ 	
	var allCB=document.getElementsByName("equIccard");
	var len=allCB.length;
	if(document.getElementById("all").checked)
	{
		for(i=0;i<len;i++)
		{
			allCB[i].checked=true;
		}
	}else
	{
		for(i=0;i<len;i++)
		{
			allCB[i].checked=!allCB[i].checked;
		}
	}
}
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
 
<table width='100%' cellspacing='0' cellpadding='0' border='0'><tr><td nowrap height="30">当前位置: <span class='DD'>用户管理-->用户管理-->设备维护-->子母卡解绑</span></td></tr></table></br>
 
 
<font color="red"><%=request.getAttribute("errMsg")==null ? "":new String(((String)request.getAttribute("errMsg")).getBytes(),"iso8859-1") %></font>
<form name="userForm" action="<%=request.getContextPath() %>/jsp/boss/user/userInfo/equInfo.do?methodToCall=mainChildCardUnbind" method="post" >
	
	<table width="100%"  border="0" cellspacing="0" cellpadding="0">
    	<tr> 
    		<td>
       			<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         			<tr> 
					  <td width="6" height="25"><img src="/admin/common/images/bar_left.gif" width="31" height="23"></td>
					  <td width="100%" background="/admin/common/images/bar_bg.gif"><span class="L style2">子母卡解绑操作</span></td>
					  <td width="6" align="right"><img src="/admin/common/images/bar_right.gif" width="9" height="23"></td>
			   		</tr>
         			<tr>
           				<td colspan="3">
	           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
	             				<tr>
	              					<td bgcolor="F3F6FF">                    
	              						<table width="100%" border="0" cellspacing="0" cellpadding="3">
	    
		<%
		
			EquRelationCollection equRelations = null;
			Map<Long,String> equIdCodeMap = null;
			String userId = (String)request.getSession().getAttribute("userId");
			equRelations = Boss.getResourceService().getEquService().getUserEquRelationsInfo(new Long(userId));
			List<EquRelation> equRelationList = equRelations.getEquRelations().get(EquTypeRelationConstants.IC_MAIN_SUB_RELATION);
			equIdCodeMap = Boss.getResourceService().getEquService().getEquIdCodeMap(null);
		%>
		<tr>
			<td width="20%" colspan="1" align="center">
				<input type="checkbox" id="all" onclick="allchecked_click()">
			</td>
			<td width="40%" colspan="1" align="center">
				IC母卡
			</td>
			<td width="40%" colspan="1" align="center">
				IC子卡
			</td>
		</tr>
		
		<%
		if(equRelationList!=null&&equRelationList.size()>0)
		{
			for(int i=0 ;i<equRelationList.size();i++)
			{
			%>
			<tr>
			<%
				EquRelation relation = equRelationList.get(i);
				%>
				<td width="20%" colspan="1" align="center">
					<input type="checkbox" name="mainChildCard" value="<%=relation.getId() %>">
				</td>
				<td width="40%" colspan="1" align="center">
					<%=equIdCodeMap.get(relation.getEquId1()) %>
				</td>
				<td width="40%" colspan="1" align="center">
					<%=equIdCodeMap.get(relation.getEquId2()) %>
				</td>
			</tr>
			<%
			}
		}
		%>
										<tr align="center">
	                    				<td colspan="4"><hr>
	                    							<table width="30%"  border="0" cellspacing="0" cellpadding="0">
	                       								<tr>
	                          								<td>                           
			                           							<table width="30%" border="0" cellspacing="0" cellpadding="0">
														   			<tr align='right'>
														   				
														   				<td align="center"><table width="70" border="0" cellspacing="0" cellpadding="0"><tr onclick="userForm.submit();" align="center" style="cursor:hand"><td><img src="/admin/common/images/but_left.gif" width="6" height="20"></td><td width="100%" background="/admin/common/images/but_bg.gif"><div>提交</div></td><td><img src="/admin/common/images/but_right.gif" width="6" height="20"></td></tr></table></td>
 
				     													
				     													
														   				<td align="center"><table width="70" border="0" cellspacing="0" cellpadding="0"><tr onclick="history.back()" align="center" style="cursor:hand"><td><img src="/admin/common/images/but_left.gif" width="6" height="20"></td><td width="100%" background="/admin/common/images/but_bg.gif"><div>返回</div></td><td><img src="/admin/common/images/but_right.gif" width="6" height="20"></td></tr></table></td>
 
				     													
				     													
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
