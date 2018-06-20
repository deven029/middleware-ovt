<%@ page contentType="text/html;charset=utf-8"%>
<%@ page import="java.util.*,
				com.ovt.common.web.taglib.tree_extends.*"%>
<%@ page isELIgnored = "false" %>
<%@ taglib uri="/tags/app" prefix="app" %>
<%@ taglib uri="/common/taglib/c.tld" prefix="c" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="<%=request.getContextPath() %>/common/css/zi.css" rel="stylesheet" type="text/css">
<script language="javascript" src="<%=request.getContextPath() %>/common/js/toolbar.js"></script>
<script language="javascript" src="<%=request.getContextPath() %>/common/js/sitech.js"></script>
  <script language="javascript" src="<%= request.getContextPath() %>/common/js/xtree/xtree.js"></script>
  <link href="<%= request.getContextPath() %>/common/css/xtree.css" rel="stylesheet" type="text/css">

<%ITreeDefine treeDefine = (ITreeDefine)Class.forName(request.getParameter("treeDefineClass")).newInstance(); %>
<script language="JavaScript">
var treeDefineSelectId = '<%=treeDefine.getSelectId()%>' ;
function getSelectedStr(){
	elements = document.all( treeDefineSelectId ) ;
	if( !elements ){
		return false;
	}
	
	if( elements.tagName ){
		if( !elements.checked ){
			return false ;
		}
		return elements.value ;//+ '$' + document.getElementByName( treeDefineSelectId + '_label' ).value ;
	}else{
		var result = '' ;
		elementsLabel = document.all( treeDefineSelectId + '_label' ) ;
		for( i = 0 ; i < elements.length ; i++ ){
			if( !elements[i].checked ){
				continue ;
			} 
			if( result != '' ) {
				result += '%' ;
			}
			result += elements[i].value ;//+ '$' + elementsLabel[i].value ;
		}
		if( result == '' ) {
			return false ;
		}
		return result ;
	}
}
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
<title></title>
</head>

<body>
<%String treeDefineClass=request.getParameter("treeDefineClass") ;%>
<app:tree treetype="custom" customTreeDefineClass="<%=treeDefineClass %>"/>

</body>
</html>