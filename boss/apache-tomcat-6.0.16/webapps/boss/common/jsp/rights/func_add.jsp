<%@ page contentType="text/html;charset=utf-8"%>
<%@ page isELIgnored = "false" %>            
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
<script language="javascript">

function form_submit(actionvalue){
 	if (work_form.func_name.value=="") {
	    alert("请输入功能名称！")
	  	return false;
	}

	if (work_form.src_file.value=="") {
	   if (work_form.leafage_flag.value==1){
		    alert("当功能类型为功能时，需要输入源文件名称！")
		  	return false;
	  	}
	}
	
	if (work_form.func_name.value.length>40) {
	    alert("功能名称不能大于40个字符！")
	  	return false;
	}
	if (work_form.alias.value.length>40) {
	    alert("功能别名不能大于40个字符！")
	  	return false;
	}
	if (work_form.src_file.value.length>200) {
	    alert("源文件不能大于200个字符！")
	  	return false;
	}
	if (work_form.desc_info.value.length>200) {
	    alert("功能描述不能大于200个字符！")
	  	return false;
	}
	var seq_no = work_form.seq_no.value;
	var pattern = /^[0-9]{1,10}$/;
	if(seq_no!="")
	{
		if(!pattern.test(seq_no))  
		{
			alert("序号必须为数字！")
	  		return false;
		}
	}
	
	work_form.action=actionvalue
	work_form.submit();
}

</script>
<body>
<app:position func_code="<%=fsm.getFunc_code()%>"/>

<form method='POST' name='work_form' action='' >
<input type="hidden" name="action_type" value="add">
<input type="hidden" name="func_code" value="1">
<input type='hidden' name='parent_code' value='<%=tree_value%>'>
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
    <tr> 
      <td>
       <table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         <tr> 
					  <td width="6" height="25"><img src="<%= path %>/common/images/bar_left.gif" width="31" height="23"></td>
					  <td width="100%" background="<%= path %>/common/images/bar_bg.gif"><span class="L style2">添加系统功能</span></td>
					  <td width="6" align="right"><img src="<%= path %>/common/images/bar_right.gif" width="9" height="23"></td>
			   </tr>
         <tr>
           <td colspan="3"><table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
             <tr>
              <td bgcolor="F3F6FF">                    
              <table width="100%" border="0" cellspacing="0" cellpadding="3">
                  <tr>
                    <td>功能名称:</td>
                    <td><input type='text' name='func_name' value='' tabindex='1' size='35' ><font color="#FF0000">*</font></td>
                    <td>功能别名:</td>
                    <td><input type='text' name='alias' value='' tabindex='2' size='20'></td>
                  </tr>
                  <tr>
                    <td>源文件：</td>
                    <td><input type='text' name='src_file' value='' tabindex='3' size='35'><font color="#FF0000">*</font></td>
                    <td>功能类型：</td>
                    <td>
                    <select name="leafage_flag" tabindex='4'>
								        <option value="0">菜单</option>
								        <option value="1">功能</option>
								        <option value="2">按钮</option>
										</select><font color="#FF0000">*</font>
                    </td>
                  </tr>
                  <tr>
                    <td>功能描述：</td>
                    <td><textarea rows="4" name="desc_info" cols="35" tabindex='5'></textarea></td>
                    <td>状态：</td>
                    <td>
                     <select name="status" tabindex='6'>
									       <option value="1">可用</option>
												 <option value="0">不可用</option>
											</select><font color="#FF0000">*</font>
                    </td>
                  </tr>
				  <tr>
				  	<td>序号：</td>
				  	<td><input type="text" name="seq_no"></td>
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
															      FunctionSModel fsm_next=Rights.getFunc_hash( (String)next_list.get(i) );
															      String func="";
															      if (fsm_next.getAlias().equals("ok")){
															      func="form_submit('function.do?func_code="+fsm_next.getFunc_code()+"')";
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
	
<table width="30%" border="0" cellspacing="0" cellpadding="0">
   <tr align='right'>
   
   </tr>
</table>	 
 </form>
</body>
</html>






