<%@ page contentType="text/html;charset=utf-8"%>
<%@include file="../frame/check.jsp"%>

<html>
<head>
<title>业务角色权限管理</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv='Expires' content='0'>
<meta http-equiv='Pragma'  content='no-cache'>
<meta http-equiv='Cache-Control' content='no-cache'>
</head>

<frameset rows="10%,*" cols="*" frameborder="no" border="0" framespacing="0">
  <frame src="innerloc.jsp?func_code=<%=fsm.getFunc_code()%>" name="topFrame" scrolling="no" id="topFrame" />   
  <frameset rows="*" cols="25%,*" frameborder="no" border="0" framespacing="0">       
	  <%
	    String func="";
		  for (int i=0;i<next_list.size();i++){
		      FunctionSModel fsm_next=Rights.getFunc_hash((String)next_list.get(i));
		      if (fsm_next.getAlias().equals("servicetree")){
		           func=fsm_next.getFunc_code();
		      }
    }%>
	  <frame src="list.do?listtype=service_func_s&func_code=<%=func%>" name="inleft" scrolling="auto" />
    <frame src="" name="inright" scrolling="auto" />
    <!--<frame src="list.do?listtype=service_func_f&id=" name="inright" scrolling="no" />
    -->
   </frameset>
</frameset>
</html>






