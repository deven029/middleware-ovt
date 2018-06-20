<%@ page contentType="text/html;charset=utf-8"%>
<%@ page import="com.ovt.common.web.rights.model.ServiceRoleSModel"%>
<%@include file="../frame/check.jsp"%> 
<%@ taglib uri="/tags/app" prefix="app"%>

<%
	String treevalue=(String)request.getAttribute("treevalue");
	ServiceRoleSModel ssm=(ServiceRoleSModel)request.getAttribute("ssm");
%>

<html>
<head>
<meta http-equiv='Expires' content='0'>
<meta http-equiv='Pragma'  content='no-cache'>
<meta http-equiv='Cache-Control' content='no-cache'>
<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">
<script language="javascript">

function form_submit(actionvalue){
 	if (work_form.service_role_name.value=="") {
	  alert("请输入功能名称！")
	  	return false;
	}
	if(work_form.service_role_name.value.length>40){
	    alert("功能角色名称不能大于40个字符！")
	    return false;
	}
	work_form.action=actionvalue
	work_form.submit();
}

</script>
<body>
<app:position func_code="<%=fsm.getFunc_code()%>"/>

<form method='POST' name='work_form' action='' >
<input type="hidden" name="action_type" value="update">
<input type="hidden" name="service_role_code" value="<%=ssm.getService_role_code()%>">
<input type='hidden' name='parent_code' value='<%=ssm.getParent_code()%>'>
<input type="hidden" name="leafage_flag" value="1">
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
    <tr> 
      <td>
       <table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         <tr> 
					  <td width="6" height="25"><img src="<%= path %>/common/images/bar_left.gif" width="31" height="23"></td>
					  <td width="100%" background="<%= path %>/common/images/bar_bg.gif"><span class="L style2">修改功能角色</span></td>
					  <td width="6" align="right"><img src="<%= path %>/common/images/bar_right.gif" width="9" height="23"></td>
			   </tr>
         <tr>
           <td colspan="3"><table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
             <tr>
              <td bgcolor="F3F6FF">                    
              <table width="100%" border="0" cellspacing="0" cellpadding="3">
                  <tr>
                    <td>功能角色名称：</td>
                    <td><input type='text' name='service_role_name' value='<%=ssm.getService_role_name()%>' tabindex='2' size='20'><font color="#FF0000">*</font></td>
                    <td>状态：</td>
                    <td><select name="status" tabindex='6'>
										       <option value="1" <%=ssm.getStatus().equals("1") ?"selected":""%>>可用</option>
													 <option value="0" <%=ssm.getStatus().equals("0") ?"selected":""%>>不可用</option>
												</select><font color="#FF0000">*</font>
										</td>
                  </tr>

                  <tr align="center">
                    <td colspan="4"><hr>
                    <table width="30%"  border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                           
                           <table width="30%" border="0" cellspacing="0" cellpadding="0">
													   <tr align='right'>
													   <%
															  for (int i=0;i<next_list.size();i++){
															      FunctionSModel fsm_next=Rights.getFunc_hash((String)next_list.get(i));
															      String func="";
															      if (fsm_next.getAlias().equals("ok")){
															      func="form_submit('serviceRole.do?func_code="+fsm_next.getFunc_code()+"')";
															      }
															     
															      if (func.length()>0){
															      %>
															   <app:button title="<%=fsm_next.getFunc_name()%>" image="" function="<%=func%>"/>  
													     <%   }
													       }%>
													       <td>&nbsp;&nbsp;&nbsp;&nbsp;<td>
													       <app:button title="返回" image="" function="javascript:history.back()"/>  													   </tr>
													</table>	 
                        </td>
                        </tr>
                    </table>
                    </td>
                  </tr>
                </table>
               </td>
              </tr>
          </table></td>
        </tr>
       </table>
      </td>
    </tr>
  </table>  	 	 
</form>
</body>
</html>






