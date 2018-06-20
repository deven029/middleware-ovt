<%@ page contentType="text/html;charset=utf-8"%>
<%@include file="/common/jsp/frame/check.jsp"%> 
<%@ taglib uri="/tags/app" prefix="app" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="<%=request.getContextPath() %>/common/css/zi.css" rel="stylesheet" type="text/css">
<script language="javascript" src="<%=request.getContextPath() %>/common/js/toolbar.js"></script>
<script language="javascript" src="<%=request.getContextPath() %>/common/js/calendar.js"></script>
<SCRIPT language=JavaScript src="<%=request.getContextPath() %>/common/js/sitech.js"></SCRIPT>
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
body {
	margin-top: 0px;
}
-->
</style>
<title>告警查询</title>
</head>

<body>
<app:position/>
<app:commonQuery id="queryDefine1.oamp.monitor.eventQuery" submitAddr="/common/jsp/monitor/alarm/eventMonitor.do?methodToCall=openQuery"/>

<table width="99%"  border="0" align="center" cellpadding="0" cellspacing="0">
              <tr> 
                <td width="31" height="23"><img src="<%=request.getContextPath() %>/common/images/bar_left(1).gif" width="6" height="25"></td>
                <td width="100%" background="<%=request.getContextPath() %>/common/images/bar_bg(1).gif" class="L style2"> 
                  <TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>
                    <TBODY>
                      <TR> 
                        <TD> <TABLE border=0 cellPadding=0 cellSpacing=0 class=O>
                            <TBODY>
                              <TR> 
                                <TD width="8" style="WIDTH: 8px"> <IMG height=1 src="<%=request.getContextPath() %>/common/images/spacer.gif" width=8></TD>
     <app:toolbar alias="oamp.monitor.event.delete" title="删除" image="/common/images/detail.gif" function="queryResultForm.action='eventMonitor.do?methodToCall=delete' ;queryResultForm.submit()"/>
     													</TR>
                            </TBODY>
                          </TABLE></TD>
                      </TR>
                    </TBODY>
                  </TABLE></td>
                <td><img src="<%=request.getContextPath() %>/common/images/bar_right(1).gif" width="6" height="25"></td>
              </tr>
</TABLE>

<app:table/>
<input type="hidden" name="contextId" value="<%=request.getAttribute("contextId")%>"/>

</body>
</html>