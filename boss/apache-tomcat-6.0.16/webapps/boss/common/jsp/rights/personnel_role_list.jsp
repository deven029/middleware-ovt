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
<script language="javascript" src="<%= path %>/common/js/toolbar.js"></script>
<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">
<script language="javascript" src="<%= path %>/common/js/sitech.js"></script>

<script language="javascript">
</script>
<title>spms_func</title>
</head>

<body>
<app:position func_code="<%=fsm.getFunc_code()%>"/>

<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
  <tr> 
    <td width="31" height="23"><img src="<%= path %>/common/images/bar_left(1).gif" width="6" height="25"></td>
    <td width="100%" background="<%= path %>/common/images/bar_bg(1).gif" class="L style2"> 
      <TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>
        <TBODY>
          <TR> 
            <TD> 
              <TABLE border=0 cellPadding=0 cellSpacing=0 class=O>
                <TBODY>
                  <TR> 
                  <TD width="8" style="WIDTH: 8px"> <IMG height=1 src="<%= path %>/common/images/spacer.gif" width=8></TD>

     <%
		  for (int i=0;i<next_list.size();i++){
		      FunctionSModel fsm_next=Rights.getFunc_hash((String)next_list.get(i));
		      String func="",pic="";
		      if (fsm_next.getAlias().equals("add")){
		      pic= "/common/images/ico_new.gif";
		      func="addItem('tree.do?table_type=personnel_role&action_type=add&func_code="+fsm_next.getFunc_code()+"')";
		      }else if (fsm_next.getAlias().equals("update")){
		      pic= "/common/images/ico_edit.gif";
		      func="updateItem('tree.do?table_type=personnel_role&action_type=update&func_code="+fsm_next.getFunc_code()+"')";
		      }else if (fsm_next.getAlias().equals("delete")){
		       pic=  "/common/images/ico_delete.gif";
		       func="deleteTreeItem('tree.do?table_type=personnel_role&action_type=delete&func_code="+fsm_next.getFunc_code()+"')";
		      }else if (fsm_next.getAlias().equals("operator")){
		      pic= "/common/images/ico_search.gif";
		      func="operatorItem('tree.do?table_type=personnel_role&action_type=operator&func_code="+fsm_next.getFunc_code()+"')";
		      }
		       if (func.length()>0){
		  %>
		   <app:toolbar title="<%=fsm_next.getFunc_name()%>" image="<%=pic%>" function="<%=func%>"/>  
     <%}}%>
     </TR>
              </TBODY>
            </TABLE>
          </TD>
        </TR>
      </TBODY>
    </TABLE>
    </td>
    <td><img src="<%= path %>/common/images/bar_right(1).gif" width="6" height="25"></td>
  </tr>
</table>

<table width="100%"  border="2"  align="center" cellpadding="3" cellspacing="0">
<tr>
<td>
	<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
		 <form name="work_form" method="post" action="">
		   <input type="hidden" name="tree_value" value="">
		   <app:tree treetype="personnel_role" step="2" />
		 </form>
	  </tr>
	</table>
</td>
</tr>
</table>
</body>
</html>
