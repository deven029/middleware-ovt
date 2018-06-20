<%@ page contentType="text/html;charset=utf-8"%>

<%@include file="../frame/check.jsp"%>
<%@ taglib uri="/tags/app" prefix="app" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv='Expires' content='0'>
<meta http-equiv='Pragma'  content='no-cache'>
<meta http-equiv='Cache-Control' content='no-cache'>
<script language="javascript" src="<%= path %>/common/js/xtree/xtree.js"></script>
<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">

<script language="javascript">

</script>
<title></title>
</head>

<body>
    <%
	    String func="";
		  for (int i=0;i<next_list.size();i++){
		      FunctionSModel fsm_next=Rights.getFunc_hash((String)next_list.get(i));
		      if (fsm_next.getAlias().equals("righttree")){
		           func=fsm_next.getFunc_code();
		      }
    }%>
  <app:tree treetype="service_func_s" step="<%=func%>" />
</body>
</html>
