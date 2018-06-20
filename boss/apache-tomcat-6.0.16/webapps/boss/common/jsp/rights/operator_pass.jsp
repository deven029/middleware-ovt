<%@ page contentType="text/html;charset=utf-8"%>
<%@include file="../frame/check.jsp"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%
  String treevalue=(String)request.getAttribute("treevalue");
  String tree_value=treevalue.length()==0 ?"-1":treevalue;
%>
<html>
<head>
<meta http-equiv='Expires' content='0'>
<meta http-equiv='Pragma'  content='no-cache'>
<meta http-equiv='Cache-Control' content='no-cache'>
<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">

<Script Language="JavaScript" src="<%= path %>/common/js/PublicDate.js"></script>
<script language="javascript">
function form_submit(actionvalue){
  if (work_form.login_name.value=="") {
	  alert("请输入原始密码！")
	  	return false;
	}
	if (work_form.pass_word.value=="") {
	    alert("请输入新密码！")
	    return false;
	}else if (work_form.pass_word_check.value==""){
	    alert("请输入校验密码！")
	    return false;
	}else if(work_form.pass_word_check.value!=work_form.pass_word.value){
	    alert("密码与校验密码不一致！")
	    return false;
	}else if(work_form.pass_word.value.length>20){
	    alert("密码超长！")
	    return false;
	}
	work_form.action=actionvalue
	work_form.submit();
}

</script>
<body>
<app:position func_code="<%=fsm.getFunc_code()%>"/>


<form method='POST' name='work_form' action='operator.do' >
<input type="hidden" name="action_type" value="pass">
<input type="hidden" name="login_no" value="<%=tree_value%>">
    
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
    <tr> 
      <td>
       <table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         <tr> 
					  <td width="6" height="25"><img src="<%= path %>/common/images/bar_left.gif" width="31" height="23"></td>
					  <td width="100%" background="<%= path %>/common/images/bar_bg.gif"><span class="L style2">修改系统用户密码</span></td>
					  <td width="6" align="right"><img src="<%= path %>/common/images/bar_right.gif" width="9" height="23"></td>
			   </tr>
         <tr>
           <td colspan="3"><table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
             <tr>
              <td bgcolor="F3F6FF">                    
              <table width="100%" border="0" cellspacing="0" cellpadding="3">
                  <tr>
                    <td>原始密码：</td>
                    <td><input type='password' name='login_name' value='' tabindex='1' size='20'><font color="#FF0000">*</font></td>
                  </tr>
                  <tr>
                    <td>新密码：</td>
                    <td><input type='password' name='pass_word' value='' tabindex='2' size='20'><font color="#FF0000">*</font></td>
                    <td>新密码校验：</td>
                    <td><input type='password' name='pass_word_check' value='' tabindex='3' size='20'><font color="#FF0000">*</font></td>
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
															      func="form_submit('operator.do?func_code="+fsm_next.getFunc_code()+"')";
															      }
															      if (func.length()>0){
															      %>
															   <app:button title="<%=fsm_next.getFunc_name()%>" image="" function="<%=func%>"/>  
													     <%   }
													       }%>
													       <td>&nbsp;&nbsp;&nbsp;&nbsp;<td>
													       <app:button title="返回" image="" function="javascript:history.back()"/>  
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
          </table></td>
        </tr>
       </table>
      </td>
    </tr>
  </table>  
 </form>
</body>
</html>






