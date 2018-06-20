<%@ page contentType="text/html;charset=utf-8"%>

<%@include file="/common/jsp/frame/check.jsp"%> 
<%@ taglib uri="/tags/app" prefix="app" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="<%=request.getContextPath() %>/common/css/zi.css" rel="stylesheet" type="text/css">
<script language="javascript" src="<%=request.getContextPath() %>/common/js/toolbar.js"></script>

<script language="JavaScript">
<jsp:include page="/common/js/sitech.js" flush="true" /> 
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
<title>用户组信息查询</title>
</head>

<body>
<app:position/>
<app:commonQuery id="queryDefine1.monitor.alarm.userGroup.Query" submitAddr="/common/jsp/monitor/alarm/userGroup.do?methodToCall=openQuery"/>

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
     <app:toolbar id="add" alias="monitor.alarm.userGroup.addview" title="增加" image="/common/images/detail.gif" function="queryResultForm.action='userGroup.do?methodToCall=view&amp;oper=add' ;queryResultForm.submit()"/>
     <app:toolbar id="delete" alias="monitor.alarm.userGroup.delete" title="删除" image="/common/images/detail.gif" function="if( rowId){setCurrentElement( 'id' , rowId );} if( !rowId &&  !checkMultipleSelect('id',1,10) ){alert('您必须至少选择一条需要删除的数据');return ;}queryResultForm.action='userGroup.do?methodToCall=delete' ;queryResultForm.submit()"/>
     <app:toolbar visible="false" id="modify" alias="monitor.alarm.userGroup.modifyview" title="修改" image="/common/images/detail.gif" function="if( rowId){setCurrentElement( 'id' , rowId );} if( !rowId && !checkMultipleSelect('id',1,1) ){alert('您必须选择唯一一条需要修改的数据');return ;}queryResultForm.action='userGroup.do?methodToCall=view&oper=modify' ;queryResultForm.submit()"/>
     <app:toolbar visible="false" id="view" alias="monitor.alarm.userGroup.view" title="查看" image="/common/images/detail.gif" function="if( rowId){setCurrentElement( 'id' , rowId );} if( !rowId && !checkMultipleSelect('id',1,1) ){alert('您必须选择唯一一条需要查看的数据');return ;}queryResultForm.action='userGroup.do?methodToCall=view&oper=view' ;queryResultForm.submit()"/>
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