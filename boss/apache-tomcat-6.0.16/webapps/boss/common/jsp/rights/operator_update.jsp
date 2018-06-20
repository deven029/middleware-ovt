<%@ page contentType="text/html;charset=utf-8"%>
<%@ page import="com.ovt.common.web.rights.model.OperatorSModel"%>
<%@include file="../frame/check.jsp"%>
<%@ taglib uri="/tags/app" prefix="app"%> 

<%
OperatorSModel osm=(OperatorSModel)request.getAttribute("osm");
%>

<html>
<head>
<meta http-equiv='Expires' content='0'>
<meta http-equiv='Pragma'  content='no-cache'>
<meta http-equiv='Cache-Control' content='no-cache'>
<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">
<Script Language="JavaScript" src="<%= path %>/common/datepicker/WdatePicker.js"></script>
<script language="javascript">

function form_submit(actionvalue){
	if (work_form.personnel_code.value=="") {
	  alert("请选择隶属人事角色！")
	  	return false;
	}
	
	/*if (work_form.phone.value=="") {
	    alert("请输入工号所有者电话！")
	  	return false;
	}
	if (work_form.email.value=="") {
	  alert("请输入工号所有者邮箱号码！")
	  	return false;
	}*/
	if (work_form.login_ip.value=="") {
	  work_form.login_ip.value='*'
	}
	if (work_form.effect_begin_time.value=="") {
	  work_form.effect_begin_time.value='2004-01-01'
	}
	
	if (work_form.effect_end_time.value=="") {
	   work_form.effect_end_time.value='2005-01-01'
	}
	if (work_form.can_login_begin_time.value=="") {
	   work_form.can_login_begin_time.value='00:00:00'
	}
	
	if (work_form.can_login_end_time.value=="") {
	  work_form.can_login_end_time.value='23:59:59'
	}
	if(work_form.login_no.value.length>10){
	    alert("登录名不能大于10个字符！")
	    return false;
	}
	if(work_form.pass_word.value.length>20){
	    alert("密码不能大于20个字符！")
	    return false;
	}
	if(work_form.can_login_begin_time.value.length!=8){
	    alert("允许登录开始时间格式如23:59:59！")
	    return false;
	}
	if(work_form.can_login_end_time.value.length!=8){
	    alert("允许登录结束时间格式如23:59:59！")
	    return false;
	}

  if(work_form.login_ip.value.length>20){
	    alert("登录IP不能大于20个字符！")
	    return false;
	}
	
	if(work_form.login_name.value.length>40){
	    alert("用户姓名不能大于40个字符！")
	    return false;
	}
	if(work_form.email.value.length>50){
	    alert("用户EMAIL不能大于50个字符！")
	    return false;
	}
	if(work_form.phone.value.length>13){
	    alert("用户电话不能大于13个字符！")
	    return false;
	}
	work_form.action=actionvalue
	work_form.submit();
}
function getpersonnel_code(){
  var h=480;
	var w=650;
	var t=screen.availHeight/2-h/2;
	var l=screen.availWidth/2-w/2;
  var prop="dialogHeight "+100+"px; dialogWidth "+100+"px; dialogLeft "+l+"px; dialogTop "+t+"px;toolbar no; menubar no; scrollbars yes; resizable no;location no;status no";
	var str=window.showModalDialog('<%= path %>/common/jsp/rights/list.do?listtype=get_personnel_code',"",prop);
	if (str.length>0){
		work_form.personnel_code.value=str.substring(str.indexOf("|")+1)
		work_form.personnel_name.value=str.substring(0,str.indexOf("|"))
	}
}

</script>
<body>
<app:position func_code="<%=fsm.getFunc_code()%>"/>

<form method='POST' name='work_form' action='operator.do' >
<input type="hidden" name="action_type" value="update">
<input type='hidden' name='login_flag' value='0'>
<input type="hidden" name="pass_word" value="">
<input type="hidden" name="personnel_code" value="<%=osm.getPersonnel_code()%>">
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
    <tr> 
      <td>
       <table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         <tr> 
					  <td width="6" height="25"><img src="<%= path %>/common/images/bar_left.gif" width="31" height="23"></td>
					  <td width="100%" background="<%= path %>/common/images/bar_bg.gif"><span class="L style2">修改系统用户信息</span></td>
					  <td width="6" align="right"><img src="<%= path %>/common/images/bar_right.gif" width="9" height="23"></td>
			   </tr>
         <tr>
           <td colspan="3"><table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
             <tr>
              <td bgcolor="F3F6FF">                    
              <table width="100%" border="0" cellspacing="0" cellpadding="3">
                  <tr>
                    <td>登录名：</td>
                    <td><input type="text" name="login_no" value="<%=osm.getLogin_no()%>" readonly></td>
                    <td>隶属人事角色(单击输入框选择)：</td>
                    <td><input type='text' name='personnel_name' value='<%=osm.getPersonnel_name()==null?"":osm.getPersonnel_name()%>' tabindex='1' size='20' readonly onclick="getpersonnel_code();"><font color="#FF0000">*</font></td>
                  </tr>
                  <tr>
                    <td>生效日期：</td>
                    <td><input type='text' name='effect_begin_time' value='<%=osm.getEffect_begin_time()%>' tabindex='5' size='20' readonly onclick="WdatePicker()"></td>
                    <td>失效日期:</td>
                    <td><input type='text' name='effect_end_time' value='<%=osm.getEffect_end_time()%>' tabindex='6' size='20' readonly onclick="WdatePicker()"></td>
                  </tr>
                  <tr>
                    <td>允许登录开始时间：</td>
                    <td><input type='text' name='can_login_begin_time' value='<%=osm.getCan_login_begin_time()%>' tabindex='7' size='20'></td>
                    <td>允许登录结束时间:</td>
                    <td><input type='text' name='can_login_end_time' value='<%=osm.getCan_login_end_time()%>' tabindex='8' size='20'></td>
                  </tr>
                  <tr>
                    <td>允许登录IP(输入*表示不限制):</td>
                    <td><input type='text' name='login_ip' value='<%=osm.getLogin_ip()%>' tabindex='9' size='20'></td>
                    <td>用户类型:</td>
                    <td><select name="operator_type" tabindex='8'>
										       <option value="0" <%=osm.getOperator_type().equals("0") ?"selected":""%>>超级用户</option>
													 <option value="1" <%=osm.getOperator_type().equals("1") ?"selected":""%>>普通用户</option>
												</select><font color="#FF0000">*</font>
										</td>
                  </tr>
                  <tr>
                    <td>状态: </td>
                    <td><select name="status" tabindex='9'>
										         <option value="1" <%=osm.getStatus().equals("1") ?"selected":""%>>可用</option>
														 <option value="0" <%=osm.getStatus().equals("0") ?"selected":""%>>禁用</option>
												</select><font color="#FF0000">*</font>
										</td>
                    <td>用户姓名:</td>
                    <td><input type='text' name='login_name' value='<%=osm.getLogin_name()==null ?"":osm.getLogin_name()%>' tabindex='10' size='20'><font color="#FF0000">*</font></td>
                  </tr>
                  
                  <tr>
                    <td>用户邮箱: </td>
                    <td><input type='text' name='email' value='<%=osm.getEmail()==null ?"":osm.getEmail()%>' tabindex='11' size='20'></input>
										</td>
                    <td>用户电话:</td>
                    <td><input type='text' name='phone' value='<%=osm.getPhone()==null ?"":osm.getPhone()%>' tabindex='12' size='20'></td>
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






