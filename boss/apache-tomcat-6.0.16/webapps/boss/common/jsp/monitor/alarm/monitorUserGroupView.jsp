<%@ page contentType="text/html;charset=utf-8" %>
<%@include file="/common/jsp/frame/check.jsp"%>
<%@ page isELIgnored = "false" %>
<%@ taglib uri="/tags/app" prefix="app" %>
<%@ taglib uri="/common/taglib/struts-html.tld" prefix="html" %>
<%@ taglib uri="/common/taglib/c.tld" prefix="c" %>
<%@ taglib uri="/common/taglib/fn.tld" prefix="fn" %>
<%@ taglib uri="/common/taglib/fmt.tld" prefix="fmt" %>
<%@ taglib uri="/common/taglib/format.tld" prefix="format" %>
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

<app:position/>

<form name="userForm" action="<c:out value="${submitAddr}"/>" method="post" enctype="multipart/form-data">
	<c:if test="${opr!='add'}"><input type="hidden" name="id" value="<c:out value="${userGroup.id}"/>"/></c:if>
	<table width="100%"  border="0" cellspacing="0" cellpadding="0">
    	<tr> 
    		<td>
       			<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         			<tr> 
					  <td width="6" height="25"><img src="<%=request.getContextPath()%>/common/images/bar_left.gif" width="31" height="23"></td>
					  <td width="100%" background="<%=request.getContextPath()%>/common/images/bar_bg.gif"><span class="L style2"><c:out value="${title}"/></span></td>
					  <td width="6" align="right"><img src="<%=request.getContextPath()%>/common/images/bar_right.gif" width="9" height="23"></td>
			   		</tr>
         			<tr>
           				<td colspan="3">
	           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
	             				<tr>
	              					<td bgcolor="F3F6FF">                    
	              						<table width="100%" border="0" cellspacing="0" cellpadding="3">
	    
		<tr>
			<td width="127" align="right">用户组名称：</td>
			<td width="460" colspan="3"><input type="text" name="name" value="<c:out value="${userGroup.name}"/>" id="name"<c:if test="${isView == '1'}"> readonly</c:if>/></td>
		</tr>
		<tr>
			<td width="127" align="right">用户组描述：</td>
			<td width="460" colspan="3"><textarea name="description" rows="5" cols="76"<c:if test="${isView == '1'}"> readonly</c:if>><c:out value="${userGroup.description}"/></textarea></td>
		</tr>
		<tr>
			<td width="127" align="right">用户列表：</td>
			<td width="460" colspan="3"><textarea name="users" rows="20" cols="76"<c:if test="${isView == '1'}"> readonly</c:if>><c:out value="${userGroup.users}"/></textarea></td>
		</tr>
	
	                 					 	<tr align="center">
	                    						<td colspan="4"><hr>
	                    							<table width="30%"  border="0" cellspacing="0" cellpadding="0">
	                       								<tr>
	                          								<td>                           
			                           							<table width="30%" border="0" cellspacing="0" cellpadding="0">
														   			<tr align='right'>
														   				<c:if test="${isView != '1'}">
				     														<app:button alias="!alias" title="提交" image="" function="if( validateForm( userForm) ){ userForm.submit();}"/>
				     													</c:if>
				     													<c:if test="${isView == '1'}">
				     														<app:button title="返回" image="" function="if( validateForm( userForm) ){ userForm.submit();}"/>
				     													</c:if>
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
<script type="text/javascript"> 
<!--
     var bCancel = false; 

    function validateForm(form) {   
    		                                  
        if (bCancel) 
	    	return true; 
        else 
       		return validateRequired(form) && validateInteger(form) && validateDate(form); 
   } 

    function required () { 
     	this.aa = new Array("name", "用户组名称 不能为空！", new Function ("varName", " return this[varName];"));
     	this.ab = new Array("users", "用户列表 不能为空！", new Function ("varName", " return this[varName];"));
     
    } 

    function IntegerValidations () { 
     
    } 

    function DateValidations () { 
    } 
	
	
	<jsp:include page="/common/js/strutsValidate.js" flush="true" /> 
-->
</script>
</html>