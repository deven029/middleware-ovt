<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.ovt.common.web.util.*"%>

<%
   String contextPath = request.getContextPath();
   String error = (String)request.getAttribute("error");
   if (error!=null){
       error=contextPath+"/common/images/error.gif";
   }else{
       error=contextPath+"/common/images/succeed.gif";
   }
   //get errMsg
   String errMsg = (String)request.getAttribute("errMsg");
 
   String errorMsg = ResourceUtil.getString(errMsg);

   if ( errorMsg == null ) {
     errorMsg = "";
   }
    
    //get func_code 
    String backurl = (String)request.getAttribute("func_code");
   
    if ((backurl!=null)&&(backurl.length()!=0)){
        backurl = contextPath + "/common/jsp/frame/menu?func_code="+ backurl;
    }else{
        //get Alias
	      backurl = (String)request.getAttribute("alias");
	      if ((backurl!=null)&&(backurl.length()!=0)){
	         backurl = contextPath + "/common/jsp/frame/menu?alias="+ backurl;
	      }else{
	         backurl = "javascript:history.back()";
	      }
    }
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
<link href="../../css/zi.css" rel="stylesheet" type="text/css">
<SCRIPT language=JavaScript src="../../js/sitech.js"></SCRIPT>
<script language="JavaScript">
function openme(object){
object.style.background="#FFFFCC";}
function closeme(object){
object.style.background="#ffffff";}
</script>
<style type="text/css">
<!--
.style1 {color: #0c5bc4}
.style2 {
	font-size: 14px;
	color: #003665;
}
-->
</style>
</head>

<body leftmargin="0" topmargin="0">
<table width="99%"  border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td valign="top"><table width="100%"  border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
          <table width="500"  border="0" align="center" cellpadding="0" cellspacing="0">
              <tr> 
                <td width="0%" height="23" background="<%=contextPath%>/common/images/bar_bg(1).gif"><img src="<%=contextPath%>/common/images/bar_left(1).gif" width="6" height="25"></td>
                <td width="98%" background="<%=contextPath%>/common/images/bar_bg(1).gif" class="L style2">　　提示信息</td>
                <td width="2%" align="right" background="<%=contextPath%>/common/images/bar_bg(1).gif"><img src="<%=contextPath%>/common/images/bar_right(1).gif" width="6" height="25"></td>
              </tr>
              
              <tr> 
                <td colspan="3"><table width="100%" border="0" cellspacing="1" cellpadding="0">
                  <tr>
                    <td bgcolor="F3F6FF"><table width="100%" border="0" cellspacing="0" cellpadding="3">
                        <tr>
                            <td width="13%" height="150" align="center" valign="top"><p>&nbsp;</p>
                              <table width="75%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td width="17%" align="center"><img src="<%=error%>" width="32" height="32"></td>
                                  <td width="83%"><%= "操作结果：" + errorMsg %></td>
                                </tr>
                                 
                            </table>
                          </td>
                        </tr>
                       <tr> 
										      <td  height="150"><p align="center"><a href="<%=backurl%>">返回</a></p></td>
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
</table>
</body>
</html>

  
