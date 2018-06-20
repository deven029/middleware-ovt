<%@ page contentType="text/html;charset=utf-8"%> 
<%@ taglib uri="/tags/app" prefix="app" %>
<% String path = request.getContextPath(); %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv='Expires' content='0'>
<meta http-equiv='Pragma'  content='no-cache'>
<meta http-equiv='Cache-Control' content='no-cache'>
<script language="javascript" src="<%= path %>/common/js/xtree/xtree.js"></script>
<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">

<script language="javascript">
window.returnValue="";
function set_personnel_code(){
  var checkbox = document.getElementsByName("select_id");
	var i1=0;
	var treevalue="";
	for(var i = 0; i < checkbox.length; i++) {
			if(checkbox[i].checked) {
				i1=i1+1;
				treevalue=checkbox[i].value
			}
	}
	if(i1==0){
		alert("请选择人事角色！");
		return false;
	}else{
		window.returnValue=treevalue;
    window.close();
	}

}
</script>
<title></title>
</head>

<body> 
  <app:tree treetype="get_personnel_code" step="2" />
  <br/>
  <table width="30%" border="0" cellspacing="0" cellpadding="0">
    <tr align='right'>
	     <app:button title="确定" image="" function="set_personnel_code()"/> 
    </tr>
  </table>	
</body>
</html>
