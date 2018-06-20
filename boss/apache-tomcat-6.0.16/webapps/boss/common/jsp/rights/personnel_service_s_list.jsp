<%@ page contentType="text/html;charset=utf-8"%> 
<%@include file="../frame/check.jsp"%>
<%@ taglib uri="/tags/app" prefix="app" %>
<%
	String id=(String)request.getAttribute("id");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv='Expires' content='0'>
<meta http-equiv='Pragma'  content='no-cache'>
<meta http-equiv='Cache-Control' content='no-cache'>
<script language="javascript" src="<%= path %>/common/js/xtree/xtree.js"></script>
<script language="javascript" src="<%= path %>/common/js/toolbar.js"></script>
<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">

<script language="javascript">
</script>
<title></title>
</head>

<body>
<form name="work_form" method="post" action="relation.do">
   <input type="hidden" name="id" value="<%=id%>">
   <input type="hidden" name="table_type" value="personnel_service">
   <input type="hidden" name="tree_value" value="">
   <table>
   <tr><td><app:tree treetype="personnel_service_s" step="2" /></td><td></td> <td></td> <td></td> <td></td> <td></td> 
   <td><app:tree treetype="dataPower_group_s" step="2" /></td></tr></table>
</form>
<TABLE border=0 cellPadding=0 cellSpacing=0 class=O>
    <%
		  for (int i=0;i<next_list.size();i++){
		      FunctionSModel fsm_next=Rights.getFunc_hash((String)next_list.get(i));
		      String func="";
		      if (fsm_next.getAlias().equals("ok")){
		        func="updatePersonnelRoleItem('relation.do?func_code="+fsm_next.getFunc_code()+"')";
		      }
		      if (func.length()>0){
		      %>
		   <app:button title="<%=fsm_next.getFunc_name()%>" image="" function="<%=func%>"/>  
     <%   }
       }%>
</TABLE>
   
</body>
</html>
