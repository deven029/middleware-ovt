<%@ page contentType="text/html;charset=utf-8" %>
<%@include file="/common/jsp/frame/check.jsp"%>
<%@ page isELIgnored = "false" %>
<%@ taglib uri="/tags/app" prefix="app" %>
<%@ taglib uri="/common/taglib/struts-html.tld" prefix="html" %>
<%@ taglib uri="/common/taglib/c.tld" prefix="c" %>
<%@ taglib uri="/common/taglib/fn.tld" prefix="fn" %>
<%@ taglib uri="/common/taglib/fmt.tld" prefix="fmt" %>
<%@ taglib uri="/format" prefix="format" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<c:if test="${refreshTree == 'true'}">
<script language="JavaScript">
parent.left.location="<%=request.getContextPath() %>/common/jsp/frame/tree.jsp<%if( request.getAttribute("refreshTreeMenuItemId")!=null){out.write("?expandTreeItem=" + (String)request.getAttribute("refreshTreeMenuItemId"));}%>";
</script>
</c:if>
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

<app:position/>
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
			<td align="center">提示：当前费用类型没有收费项目和子费用类别，请您选择添加收费项目或子费用类别。</td>
		</tr>
		<tr align="center">
		    <td><a href="<%=request.getContextPath() %>/jsp/boss/sysext/feeItems.do?methodToCall=selectDispatch&typeOrItem=item">添加收费项目</a> | <a href="<%=request.getContextPath() %>/jsp/boss/sysext/feeItems.do?methodToCall=selectDispatch&typeOrItem=type">添加子费用类别</a> </td>
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

</html>