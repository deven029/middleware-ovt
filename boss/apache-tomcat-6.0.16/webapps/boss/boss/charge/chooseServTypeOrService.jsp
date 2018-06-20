<%@ page contentType="text/html;charset=utf-8" %>
<%@include file="/common/jsp/frame/check.jsp"%>
<%@ page isELIgnored = "false" %>
<%@ taglib uri="/tags/app" prefix="app" %>
<%@ taglib uri="/common/taglib/struts-html.tld" prefix="html" %>
<%@ taglib uri="/common/taglib/c.tld" prefix="c" %>
<%@ taglib uri="/common/taglib/fn.tld" prefix="fn" %>
<%@ taglib uri="/common/taglib/fmt.tld" prefix="fmt" %>
<%@ taglib uri="/common/taglib/format.tld" prefix="format" %>
<%
response.setHeader("Pragma","No-Cache"); response.setHeader("Cache-Control","No-Cache"); response.setDateHeader("Expires", 0);
%>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<title><c:out value="${title}"/></title>
<link href="<%=request.getContextPath()%>/common/css/zi.css" rel="stylesheet" type="text/css">
<SCRIPT language=JavaScript src="<%=request.getContextPath()%>/common/js/sitech.js"></SCRIPT>
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
<c:if test="${refreshTree == 'true'}">
<script language="JavaScript">
parent.left.location="<%=request.getContextPath() %>/common_extends/jsp/frame/tree.jsp<%if( request.getAttribute("refreshTreeMenuItemId")!=null){out.write("?expandTreeItem=" + (String)request.getAttribute("refreshTreeMenuItemId"));}%>";
</script>
</c:if>
<app:position/>

<form name="userForm" action="<c:out value="${submitAddr}"/>" method="post" enctype="multipart/form-data">
	<input type="hidden" name="id" value="<c:out value="${areaInfo.id}"/>"/>
	<table width="100%"  border="0" cellspacing="0" cellpadding="0">
    	<tr> 
    		<td>
       			<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         			
         			<tr>
           				<td colspan="3">
	           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
	             				<tr>
	              					<td bgcolor="F3F6FF">                    
	              						<table width="100%" border="0" cellspacing="0" cellpadding="3">
	    
		<tr>
			<td align="center">提示：当前服务分类没有子服务分类和服务信息，请您选择添加子服务分类或添加服务信息。</td>
		</tr>
		<tr align="center">
		    <td><a href="<%=request.getContextPath() %>/jsp/boss/charge/servType.do?methodToCall=selectDispatch&groupOrItem=group">添加子服务分类</a> | <a href="<%=request.getContextPath() %>/jsp/boss/charge/servType/service.do?methodToCall=selectDispatch&groupOrItem=item">添加服务信息</a> </td>
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