<%@ page contentType="text/html;charset=utf-8"%>
<%@include file="../frame/check.jsp"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<html>
<head>
<meta http-equiv='Expires' content='0'>
<meta http-equiv='Pragma'  content='no-cache'>
<meta http-equiv='Cache-Control' content='no-cache'>
<link href="<%=path%>/common/css/zi.css" rel="stylesheet" type="text/css">
<Script Language="JavaScript" src="<%=path%>/common/datepicker/WdatePicker.js"></script>
<script language="javascript">
function form_submit(actionvalue){
  if (work_form.login_no.value=="") {
	    alert("请输入登录名！")
	  	return false;
	}
  if (work_form.pass_word.value=="") {
	    alert("请输入密码！")
	    return false;
	}else if (work_form.pass_word_check.value==""){
	    alert("请输入校验密码！")
	    return false;
	}else if(work_form.pass_word_check.value!=work_form.pass_word.value){
	    alert("密码与校验密码不一致！")
	    return false;
	}
	if (work_form.personnel_code.value=="") {
	  alert("请选择隶属人事角色！")
	  	return false;
	}
	if (work_form.login_ip.value=="") {
	  work_form.login_ip.value='*'
	}
	if (work_form.effect_begin_time.value=="") {
	  work_form.effect_begin_time.value='2007-01-01'
	}
	if (work_form.effect_end_time.value=="") {
	   work_form.effect_end_time.value='2020-01-01'
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
	    alert("允许登录IP不能大于20个字符！")
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
		//work_form.personnel_code.value=str
		work_form.personnel_code.value=str.substring(str.indexOf("|")+1)
		work_form.personnel_name.value=str.substring(0,str.indexOf("|"))
	}
}
</script>
<body>
<app:position func_code="<%=fsm.getFunc_code()%>"/>

<form method='POST' name='work_form' action='' >
<input type="hidden" name="action_type" value="add">
<input type='hidden' name='login_flag' value='0'>
<input type="hidden" name="personnel_code" value="">
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
    <tr> 
      <td>
       <table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         <tr> 
					  <td width="6" height="25"><img src="<%= path %>/common/images/bar_left.gif" width="31" height="23"></td>
					  <td width="100%" background="<%= path %>/common/images/bar_bg.gif"><span class="L style2">添加系统用户</span></td>
					  <td width="6" align="right"><img src="<%= path %>/common/images/bar_right.gif" width="9" height="23"></td>
			   </tr>
         <tr>
           <td colspan="3"><table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
             <tr>
              <td bgcolor="F3F6FF">                    
              <table width="100%" border="0" cellspacing="0" cellpadding="3">
                  <tr>
                    <td>登录名：</td>
                    <td><input type='text' name='login_no' value='' tabindex='1' size='20'><font color="#FF0000">*</font></td>
                    <td>隶属人事角色(单击输入框选择)：</td>
                    <td> <input type='text' name='personnel_name' value='' tabindex='4' size='20' readonly onclick="getpersonnel_code();"><font color="#FF0000">*</font></td>
                  </tr>
                  <tr>
                    <td>密码：</td>
                    <td><input type='password' name='pass_word' value='' tabindex='2' size='20'><font color="#FF0000">*</font></td>
                    <td>密码校验:</td>
                    <td><input type='password' name='pass_word_check' value='' tabindex='3' size='20'><font color="#FF0000">*</font></td>
                  </tr>
                  <tr>
                    <td>生效日期：</td>
                    <td><input type='text' name='effect_begin_time' value='2007-01-01' tabindex='5' size='20' readonly onclick="WdatePicker()"></td>
                    <td>失效日期:</td>
                    <td><input type='text' name='effect_end_time' value='2020-01-01' tabindex='6' size='20' readonly onclick="WdatePicker()"></td>
                  </tr>
                  <tr>
                    <td>允许登录开始时间：</td>
                    <td><input type='text' name='can_login_begin_time' value='00:00:00' tabindex='7' size='20'></td>
                    <td>允许登录结束时间:</td>
                    <td><input type='text' name='can_login_end_time' value='23:59:59' tabindex='8' size='20'></td>
                  </tr>
                  <tr>
                    <td>允许登录IP(输入*表示不限制):</td>
                    <td><input type='text' name='login_ip' value='*' tabindex='9' size='20'></td>
                    <td>登录名类型:</td>
                    <td><select name="operator_type" tabindex='10'>
													 <option value="1">普通用户</option>
													 <option value="0">超级用户</option>
												</select><font color="#FF0000">*</font>
										</td>
                  </tr>
                  <tr>
                    <td>状态: </td>
                    <td><select name="status" tabindex='11'>
										       <option value="1">可用</option>
													 <option value="0">禁用</option>
												</select><font color="#FF0000">*</font>
										</td>
                    <td>用户姓名:</td>
                    <td> <input type='text' name='login_name' value='' tabindex='12' size='20'><font color="#FF0000">*</font></td>
                  </tr>
                  
                  <tr>
                    <td>用户邮箱: </td>
                    <td><input type='text' name='email' value='' tabindex='13' size='20'></input>
										</td>
                    <td>用户电话:</td>
                    <td><input type='text' name='phone' value='' tabindex='14' size='20'></td>
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






