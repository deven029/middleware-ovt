<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.ovt.common.web.util.ResourceUtil"%>
<%@ page import="com.ovt.common.web.util.OAMPResourceUtil"%>
<%@ page import="com.ovt.common.web.rights.memoryright.Rights"%>

<%
  if( OAMPResourceUtil.getString( "isSPAdmin") == null || OAMPResourceUtil.getString( "isSPAdmin").equals("false") ){
  	response.sendRedirect( request.getContextPath() + "/common/jsp/frame/login.jsp" ) ;
  }
  String system_name = ResourceUtil.getString("system.name.full");		
  String login_01 = ResourceUtil.getString("oamp.image.login_01");		
  String login_02 = ResourceUtil.getString("oamp.image.login_02");		
    
  String path = request.getContextPath();
  String errorMessage=(String)session.getAttribute("errorMessage");
  session.removeAttribute("errorMessage");
  errorMessage=(errorMessage==null ?"":errorMessage);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title><%=system_name%></title>
<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">
<script language="javascript" src="<%= path %>/common/js/sitech.js"></script>
<script language="JavaScript" type="text/JavaScript">
function form_submit(){
 	if (document.forms["main"].login_no.value=="") {
	    alert("请输入用户名称！")
	  	return false;
	}
	if (document.forms["main"].pass_word.value=="") {
	    alert("请输入密码！")
	  	return false;
	}
	document.forms["main"].submit();
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
  document.forms["main"].login_no.focus();
}

function aa(){
  if(event.keyCode==13){
    document.forms["main"].elements["pass_word"].focus();
  }
}
function bb(){
  if(event.keyCode==13){
    document.forms["main"].submit();
  }
}
</script>
<style type="text/css">
<!--
body {
	margin-top: 0px;
	background-image:  url(<%= path %>/common/images/img_bg.gif);
	margin-left: 0px;
	font-size:12px;
}
.main_bd{
width:760px;
height:416px;
margin-left:auto;
margin-right:auto;
border:1px solid #003863;
background:url(<%=path%>/common/images/mmsc.jpg);
margin-top:60px;}
-->
</style>
<script language="JavaScript" type="text/JavaScript">
<!--
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);
//-->
</script>
</head>

<body onLoad="MM_preloadImages('<%=path %>/common/images/but_login_over.gif')">aaaaaaaaaaaaaa
<form method="POST" name="main" action="<%= path %>/common/jsp/frame/spLogin.do" target="_parent">
<div class="main_bd">
	  <table width="40%" height="75"  border="0" cellpadding="0" cellspacing="0" style="margin-left:100px; margin-top:250px; color:#fff; font-weight:bold;">
          <tr>
            <td width="21%">&nbsp;</td>
            <td width="45%"><%=errorMessage%></td>
            <td width="34%">&nbsp;</td>
          </tr>
          <tr>
            <td>用户名: </td>
            <td><input type="text" name="login_no" onkeyup="aa()"></td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>密&nbsp;&nbsp;&nbsp;&nbsp;码: </td>
            <td><input type="password" name="pass_word" onkeyup="bb()"></td>
            <td><table width="70" border="0" cellspacing="0" cellpadding="0">
              <tr onclick="form_submit()" style="cursor:hand">
                <td><img src="<%= path %>/common/images/but_left.gif" width="6" height="20"></td>
                <td width="100%" background="<%= path %>/common/images/but_bg.gif"><div align="center" style="color:#000;">登 录</div></td>
                <td><img src="<%= path %>/common/images/but_right.gif" width="6" height="20"></td>
              </tr>
             </table>            </td>
          </tr>
    </table></div>
</form>
</body>
</html>