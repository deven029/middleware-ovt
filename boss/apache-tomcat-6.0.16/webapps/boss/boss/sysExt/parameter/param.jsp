<%@ page language="java" pageEncoding="utf-8"%>
<%@page import="com.ovt.idtv.boss.core.service.sys.model.SysParameter"%>
<%@include file="/common/jsp/frame/check.jsp"%>
<%@ page import="java.util.*"%>
<link href="/pm/common/css/zi.css" rel="stylesheet" type="text/css">

<jsp:directive.page import="com.ovt.common.web.edittype.*"/>
<%@ taglib uri="/tags/app" prefix="app" %>



<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

  <head>
   
    
    <title>MyJsp.jsp</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<SCRIPT language=JavaScript src="/pm/common/js/sitech.js"></SCRIPT>
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
  <app:position/>
 <table width='100%' cellspacing='0' cellpadding='0' border='0'><tr><td nowrap height="30">当前位置:<span class='DD'>配置管理-->系统参数配置</span></td></tr></table></br>

 
  <form name="parmForm" action="<%=request.getContextPath()%>/jsp/pm/param/param.do?methodToCall=update" method="post">
   <table width="100%"  border="0" cellspacing="0" cellpadding="0">
    	<tr> 
    		<td>
       			<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         			<tr>                                                                               
					  <td width="6" height="25"><img src="<%=request.getContextPath()%>/common/images/bar_left.gif" width="31" height="23"></td>
					  <td width="100%" background="<%=request.getContextPath()%>/common/images/bar_bg.gif"><span class="L style2">系统参数</span></td>
					  <td width="6" align="right"><img src="<%=request.getContextPath()%>/common/images/bar_right.gif" width="9" height="23"></td>
			   		</tr>
         			<tr>
           				<td colspan="3">
	           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
	             				<tr>
	              					<td bgcolor="F3F6FF">                    
	              						<table width="100%" border="0" cellspacing="0" cellpadding="3">
  <%
 List<SysParameter> list= (List<SysParameter>)request.getAttribute("list");
 
 for(int i=0;i<list.size();i++){
	 SysParameter pmparameter=(SysParameter)list.get(i);

 %>
 <tr>
 <td width="12%"  align="right">

 <%=pmparameter.getName() %>:
 </td>
 <td>
  <%
  IFieldEditType fieldEditType = EditType.decodeEditType(pmparameter.getEditType());
  
if(Integer.parseInt( pmparameter.getEditProp())==1){
out.print(fieldEditType.getHTML(false, false, pmparameter.getCode(), pmparameter.getValue() )) ;
}
if(Integer.parseInt( pmparameter.getEditProp())==0){
out.print(fieldEditType.getHTML(true, false,pmparameter.getCode(), pmparameter.getValue() ) );
}
%>

</td>
 </tr>
 <% 
 }
 %> 
 
 <tr align="center">
	                    						<td colspan="2"><hr>
	                    							<table width="30%"  border="0" cellspacing="0" cellpadding="0">
	                       								<tr>
	                          								<td>                           
			                           							<table width="30%" border="0" cellspacing="0" cellpadding="0">
														   			<tr align='right'>
														   				<app:button title="提交" image="" function="parmForm.submit()"/>
				     													
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

