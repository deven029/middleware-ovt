<%@ page contentType="text/html;charset=utf-8"%>
<%@ page import="com.ovt.idtv.boss.core.*,java.util.*,com.ovt.idtv.boss.core.service.sys.model.*,com.ovt.idtv.boss.web.sysext.feeItems.struts.*" %>


<%@ taglib uri="/tags/app" prefix="app" %>
<%@ taglib uri="/common/taglib/c.tld" prefix="c" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="<%=request.getContextPath() %>/common/css/zi.css" rel="stylesheet" type="text/css">
<script language="javascript" src="<%=request.getContextPath() %>/common/js/toolbar.js"></script>
<script language="javascript" src="<%=request.getContextPath() %>/common/js/sitech.js"></script>
<script language="JavaScript">
	var contextPath='<%=request.getContextPath() %>';
</script>
  <script language="javascript" src="<%= request.getContextPath() %>/common/js/xtree/xtree.js"></script>
  <link href="<%= request.getContextPath() %>/common/css/xtree.css" rel="stylesheet" type="text/css">
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

<%
	StringBuilder sbuilder = new StringBuilder("var feeItems0= new WebFXTree(\"<b>费用类型</b>\")\n");
	List<EFeeItemDefine> feeItemDefineList = Boss.getSysService().getFeeItemService().getRootFeeItem();
	FeeItemTree feeItemTree = new FeeItemTree();
	if( feeItemDefineList != null ){
		feeItemTree.getFeeItemTree(feeItemDefineList,sbuilder,"feeItems0");
	}
	sbuilder.append("document.write(feeItems0)\n");
	sbuilder.append("feeItems0.expandAll()\n");
	%>
<script language="JavaScript">
function getSelectedStr(){
	elements = document.all( "feeItems" ) ;
	if( !elements ){
		return false;
	}
	var result="";
	if(!elements.length){
		return elements.value;
	}
	for( i = 0 ; i < elements.length ; i++ ){
		if( !elements[i].checked ){
			continue ;
		} 			
		result = elements[i].value;	
	}
	return result ;
}
</script>
</head>

<body>
	<table width="100%">
	<form>
	<script language="JavaScript">
			<%=sbuilder.toString()%>
	</script>
		<tr align="center">
			<td><hr>
				<table width="30%"  border="0" cellspacing="0" cellpadding="0">
					<tr>
	  					<td>                           
	     					<table width="30%" border="0" cellspacing="0" cellpadding="0">
				   				<tr align='right'>
				   				<% String confirmJs = "var result=getSelectedStr();if(result==''){alert('请先选择收费项目!');return ;} else{opener.setPopResult_feeItemId(result);window.close();}";%>
				   					<app:button title="确定" image="" function="<%=confirmJs %>"/>
								</tr>
							</table>	 
						</td>
					</tr>
				</table>
			</td>
		</tr>
		</form>
	</table>
</body>
</html>