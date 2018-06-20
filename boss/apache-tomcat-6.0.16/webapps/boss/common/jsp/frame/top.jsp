<%@ page contentType="text/html; charset=utf-8" %>

<%@ page import="com.ovt.common.web.rights.memoryright.Rights"%>
<%@ page import="com.ovt.common.web.util.OAMPResourceUtil"%>

 
<%
  String _contextPath = request.getContextPath();
  String currentUser = Rights.getWorkNo(request);
  if( OAMPResourceUtil.getString( "isSPAdmin") != null && OAMPResourceUtil.getString( "isSPAdmin").equals("true") ){
  	currentUser = (String)request.getSession().getAttribute("currentSpName") ;
  }
%>


<html>
<head>
<title>管理平台</title>
<link href="<%= _contextPath %>/common/css/zi.css" rel="stylesheet" type="text/css">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script language="JavaScript">
function showhide() {
  var i, ss, cc, rr;
  cc = showhide.arguments;
  for (i=0; i<(cc.length-2); i+=3) 
     {  ss   = cc[i+2];
       if (navigator.appName == 'Netscape' && document.layers != null)
        { rr = eval(cc[i]);
          if (rr) rr.visibility = ss;
        } else if (document.all != null) 
              { if (ss == 'show') ss = 'visible'; 
                if (ss == 'hide') ss = 'hidden'; rr = eval(cc[i+1]);
                if (rr) rr.style.visibility = ss;
              }
     }}
function keepIE(WinName,WinTop,WinLeft) {
document.all[WinName].style.top=WinTop
document.all[WinName].style.left=WinLeft
}
function keepNN(WinName,WinTop,WinLeft) {
document.layers[WinName].moveTo(self.pageXOffset+WinLeft+window.innerWidth-80,self.pageYOffset+WinTop+window.innerHeight-90)}
</script>
</head>
<form name="frmtabhead">
  <input type="hidden" name="tabnums" value="3">
	<input type="hidden" name="tabnow" value="1">
</form>
<body leftmargin="0" topmargin="0">
<table width="100%"  border="0" cellpadding="0" cellspacing="0" style="background:url(../../images/mmsc2.jpg)" height="58">
  <tr>
    <td width="746">&nbsp;</td>
    <td align="right" valign="top" background="<%= _contextPath %>/common/images/oamp_img_title_2.jpg"><table width  border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td width="13%"><img src="<%= _contextPath %>/common/images/top_arc.gif" width="31" height="21"></td>
        <td width="87%" align="center" height="16" bgcolor="00324d" class="G"> 您好, 
                  <%=currentUser%></td>
      </tr>
    </table></td>
  </tr>
</table>

	<table width="100%"  border="0" cellspacing="0" cellpadding="0">
      <tr>
         <!--<td width="80%" height="19" align="right" background="../../common/images/bar_white.gif"><img src="<%= _contextPath %>/common/images/img_index.gif" width="17" height="17" align="absmiddle">主页</td>-->
         <!--<td width="95%" align="right" background="<%= _contextPath %>/common/images/bar_white.gif"><img src="<%= _contextPath %>/common/images/img_help.gif" width="17" height="17" align="absmiddle"><a href=../help/index.jsp target=_blank>帮助</a><span class="G"></span></td>-->
        <td width="100%" align="right" background="<%= _contextPath %>/common/images/bar_white.gif"><img src="<%= _contextPath %>/common/images/img_logout.gif" width="17" height="17" align="absmiddle"><a href="loginout.jsp" target="_top">退出</a>　</td>
      </tr>
    </table>
</body>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr> 
    <td width="100%" colspan="19"> 
	<form name="frmtabcontent">
        <div id="tabcontent1" style="display:block"></div>
        <div id="tabcontent2" style="display:none"></div>
        <div id="tabcontent3" style="display:none"></div>
      </form></td>
  
</table>
</html>
<script language="javascript" type="text/javascript">
function tabclick(node){
	window.focus();
	var tabnow = parseInt(document.frmtabhead.tabnow.value);
	var tabclicked = parseInt(node.value);
	if(tabnow == tabclicked) return;
	
	var tabnums = parseInt(document.frmtabhead.tabnums.value);	
	for(i=1;i<=tabnums;i++){
		var obj = eval("tabhead" + i);
		if(obj.className == "tabdisp"){
			obj.className = "tabnodisp";
			eval("tabcontent" + i + ".style").display = "none";
			break;
		}
	}
	
	node.className = "tabdisp";
	eval("tabcontent" + tabclicked + ".style").display = "block";
	document.frmtabhead.tabnow.value = tabclicked;
}
</script>