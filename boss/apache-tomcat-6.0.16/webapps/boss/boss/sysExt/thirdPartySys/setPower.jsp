<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/common/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/common/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/common/taglib/struts-bean.tld" prefix="bean"%>
<HTML>
	<HEAD>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<link href="<%=request.getContextPath()%>/common/css/zi.css"
			rel="stylesheet" type="text/css">
		<script language="javascript"
			src="<%=request.getContextPath()%>/common/js/toolbar.js"></script>
		<script language="javascript"
			src="<%=request.getContextPath()%>/common/js/prototype.js"></script>
		<script language="javascript"
			src="<%=request.getContextPath()%>/common/js/sitech.js"></script>
		<script language="javascript" src="<%=request.getContextPath()%>/common/js/xtree/xtree.js"></script>
		<link href="<%=request.getContextPath()%>/common/css/xtree.css" rel="stylesheet" type="text/css">
<script language="javaScript">
	var contextPath='<%=request.getContextPath()%>';
</script>
<script language="javaScript">
	var contextPath='<%=request.getContextPath()%>';
</script>
<style type="text/css">
.not-null{color: red;}
</style>
<script language="javaScript" type="text/javascript"> 
function powerSubmit(){
	var authUser = document.getElementById("authUser").value;
	if(authUser==null||authUser==""){
		alert("授权用户名不能为空！");
			return false;
	}
	var authPass = document.getElementById("authPass").value;
	if(authPass==null||authPass==""){
		alert("授权密码不能为空！");
			return false;
	}
	var obj = document.getElementsByName("pid");
	var flag = 0;
    //如果CheckBox有两个以上   
	for(var i=0;i<obj.length;i++){
		if(obj[i].checked){
			flag++;
		}
	}
	if(flag==0){
		alert("请选择权限接口！");
		return false;
	}
	document.forms[0].submit();
}
</script> 

	</HEAD>
	<BODY>
		<app:position />
		<html:form action="/jsp/boss/sysext/thirdPartySys" method="post" >
			<html:hidden property="methodToCall" value="modifyPower"/>
			<html:hidden property="id" />
		    <table width="100%" border="0" cellspacing="0" cellpadding="0">
		    	<tr>
					<td width="25%" align="right">
						名称：
					</td>
					<td>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</td>
					<td width="55%" colspan="1"><bean:write name="thirdPartySysForm" property="name"/>
					</td>
				</tr>
				<tr>
					<td width="25%" align="right">
						授权用户名：
					</td>
					<td>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</td>
					<td width="55%" colspan="1"><html:text name="thirdPartySysForm" property="authUser"/>
					<span class="not-null">*</span>
					</td>
				</tr>
				<tr>
					<td width="25%" align="right">
						授权密码：
					</td>
					<td>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</td>
					<td width="55%" colspan="1"><html:password name="thirdPartySysForm" property="authPass"/>
					<span class="not-null">*</span>
					</td>
				</tr>
				<tr>
					<td width="25%" align="right">
						功能授权：
					</td>
					<td>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</td>
					<td width="55%" colspan="1">
						<logic:empty name="thirdPartySysForm" property="powerList">
							不存在的功能接口，请去创建功能接口权限！
						</logic:empty>
						<logic:notEmpty name="thirdPartySysForm" property="powerList">
							<logic:iterate id="obj1" name="thirdPartySysForm" property="powerList" indexId="index1" >
							<bean:define id="tempid" property="id" name="obj1" type="java.lang.Long"/>
							<html:multibox property="pid" value="<%=String.valueOf(tempid)%>"></html:multibox><bean:write name="obj1" property="name"/>
							</logic:iterate><span class="not-null">*</span>
						</logic:notEmpty>
					</td>
				</tr>
				<tr align='right'>
					<td>
					<app:button title="确定" image="" function="powerSubmit();"  />
					
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<app:button title="取消" image="" function="window.close();" />
					</td>
					<td>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</td>
					<td>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</td>
				</tr>
			</table>
		</html:form>
	</BODY>
</HTML>


