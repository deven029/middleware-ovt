<%@ page contentType="text/html;charset=utf-8" errorPage="/common/jsp/common/error.jsp"%>
<%@ page import="java.util.*,
				com.ovt.common.web.qlv.*,com.ovt.common.web.qlv.command.HibernateDeleteRowsCommand"%>
<%@ page isELIgnored = "false" %>
<%@include file="/common/jsp/frame/check.jsp"%> 
<%@ taglib uri="/tags/app" prefix="app" %>
<%@ taglib uri="/common/taglib/c.tld" prefix="c" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Pragma" content="no-cache">
<link href="<%=request.getContextPath() %>/common/css/zi.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/jquery/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/jquery/themes/icon.css">

<script type="text/javascript" src="<%=request.getContextPath()%>/common/jquery/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/jquery/jquery.easyui.min.js"></script>
<%--<link href="<%=request.getContextPath() %>/common/css/table.css" rel="stylesheet" type="text/css">
--%><script type=text/javascript src="<%=request.getContextPath() %>/common/js/date/date.js"></script>
<script language="javascript" src="<%=request.getContextPath() %>/common/js/calendar.js"></script>
<script language="javascript" src="<%=request.getContextPath() %>/common/js/toolbar.js"></script>
<script language="javascript" src="<%=request.getContextPath() %>/common/js/sitech.js"></script>
<%--<script language="javascript" src="<%=request.getContextPath() %>/common/js/table.js"></script>
--%><script language="javascript" src="<%=request.getContextPath() %>/datepicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/dwr/engine.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/dwr/util.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/dwr/interface/AreaGw2Manager.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/dwr/interface/StatisticsAreaGw2Manager.js"></script>		
<script type="text/javascript" src="<%=request.getContextPath()%>/dwr/interface/FirstAndSecondAreaManager.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/dwr/interface/SuveyFirstAndSecondManager.js"></script>

  <script language="JavaScript">
	var contextPath='<%=request.getContextPath() %>';
</script>
 <script language="javascript" src="<%=request.getContextPath() %>/common/js/xtree/xtree.js"></script>
 <link href="<%=request.getContextPath() %>/common/css/xtree.css" rel="stylesheet" type="text/css">
<script language="JavaScript">
function openme(object){
object.style.background="#FFFFCC";}
function closeme(object){
object.style.background="#ffffff";}
</script>
<style type="text/css">
<!--
.anniu,.anniu1,.anniu2{width:32px; height:14px; padding:0px; border:0px;}
.anniu{background-image:url(<%=request.getContextPath() %>/images/up.gif);} 
.anniu1{background-image:url(<%=request.getContextPath() %>/images/down.gif); }
.anniu2{ background-image:url(<%=request.getContextPath() %>/images/top.gif); }

.stat{
	background-image:url(<%=request.getContextPath() %>/common/images/bar_bg(1).gif); height:25px;
}
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
<title><c:out value="${funcName}"/></title>
</head>
<c:if test="${refreshTree == 'true'}">
<script language="JavaScript">
window.top.left.location="<%=request.getContextPath() %>/common/jsp/frame/tree.jsp<%if( request.getAttribute("refreshTreeMenuItemId")!=null){out.write("?expandTreeItem=" + (String)request.getAttribute("refreshTreeMenuItemId"));}%>";
</script>
</c:if>
<body>

<app:position/>
<%
	String queryDefineId = (String)request.getAttribute("queryDefineId") ;
	String querySubmitURL = request.getAttribute("requestURI") + "?methodToCall=openQuery" ;
	
	//String vodselect=(String)request.getSession().getAttribute("vodselect");
	//String total=querySubmitURL+"&"+vodselect;
 %>
<app:commonQuery id="<%=queryDefineId %>" submitAddr="<%=querySubmitURL %>"/>

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
     <%
     List<ITableCommand> commandsList = (List<ITableCommand>)request.getAttribute("commandsList"); 
     for( int i = 0 ; i < commandsList.size() ; i++ ){
     	ITableCommand command = (ITableCommand)commandsList.get(i);
     	if( !command.isVisibleInToolBar() && !command.isVisibleInTableRow() ){
     		continue; 
     	}
     	//String deleteinfo=command.getDeleteinfo();
     	String commandId = command.getCommandId() ;
     	String commandName = command.getCommandName() ;
     	String commandAlias = request.getAttribute("appId") + "." + request.getAttribute("funcId") + "." + commandId ;
     	StringBuffer function = new StringBuffer() ;
     	
     	function.append( "if( rowId){setCurrentElement( 'id' , rowId );} if( !rowId &&  !checkMultipleSelect('id'," +
     			command.getMinSelectedRows() + "," +
     			command.getMaxSelectedRows() + ") ){alert('您必须选择" + command.getMinSelectedRows() + 
     			( command.getMinSelectedRows()!=command.getMaxSelectedRows()?("到" + command.getMaxSelectedRows() ):"" )+
     			 "条要" + command.getCommandName() + "的数据');return ;}" ) ; 
     			 String deleteinfo=null;
     	if( command.getCustomOnClickJS(request) != null ){
     		function.append( command.getCustomOnClickJS(request) ) ;
     	}else{
     	   if(commandId.equals("delete")){
     	   boolean frag=command instanceof HibernateDeleteRowsCommand;
     	   if(frag){
     	   HibernateDeleteRowsCommand delecommand=(HibernateDeleteRowsCommand)command;
     	    deleteinfo=delecommand.getDeleteinfo();
     	    function.append("if(!confirm('"+deleteinfo+"')){return;};");
     	   }
     	   //function.append("if(!confirm('"+deleteinfo+"')){return;};");
     	   }
	     	function.append( "queryResultForm.action='" + request.getContextPath() + request.getAttribute("requestURI") ) ; 
	     	String appendArgs = "" ;
	     	if( command.getCustomRequestArgs()!= null && command.getCustomRequestArgs().length() > 0 ){
	     		appendArgs = "&" + command.getCustomRequestArgs() ;
	     	}
	     	function.append( "?methodToCall=executeTableCommand&commandId=" + commandId + appendArgs ) ;
	     	function.append( "';queryResultForm.submit();" ) ;
	     }
     	String visibleFlag = command.isVisibleInToolBar()?"true":"false" ;
     %>
     	<app:toolbar visible="<%=visibleFlag %>" id="<%=commandId %>" alias="<%=commandAlias %>" title="<%=commandName %>" image="/common/images/detail.gif" function="<%=function.toString() %>"/>     	
     <%}%><%--	
     <%
     Object frag=request.getAttribute("ifallcheckedfrag");
      if(frag==null){ %>
     <script language="JavaScript">function allchecked_click(rowId){if( rowId){setCurrentElement( 'id' , rowId );} var allCB=document.getElementsByName("id");var len=allCB.length;for(i=0;i<len;i++){allCB[i].checked=true;}}</script><TD noWrap class=P onmouseover=MO() onmouseout=MU() onclick="allchecked_click()">
<div style="CURSOR: hand"><IMG src="<%=request.getContextPath() %>/common/images/detail.gif" hspace=1 border=0 align="absMiddle">
全选
</div></TD>
<TD width="4" class=LL>|</TD>
<script language="JavaScript">function notallchecked_click(rowId){if( rowId){setCurrentElement( 'id' , rowId );} var allCB=document.getElementsByName("id");var len=allCB.length;for(i=0;i<len;i++){allCB[i].checked=!allCB[i].checked;}}</script><TD noWrap class=P onmouseover=MO() onmouseout=MU() onclick="notallchecked_click()">
<div style="CURSOR: hand"><IMG src="<%=request.getContextPath() %>/common/images/detail.gif" hspace=1 border=0 align="absMiddle">
反选
</div></TD>
<TD width="4" class=LL>|</TD>
<%} %>
     												--%></TR>
                            </TBODY>
                          </TABLE></TD>
                      </TR>
                    </TBODY>
                  </TABLE></td>
                <td><img src="<%=request.getContextPath() %>/common/images/bar_right(1).gif" width="6" height="25"></td>
              </tr>
</TABLE>
<app:table/>
<%--<script type="text/javascript">
var t = new ScrollableTable(document.getElementById('scrollTable'),300);
</script>
--%><table width="99%" border="0" align="center" cellpadding="0" cellspacing="00" class="stat">
  <tr>
   
<%

String addtable = (String)request.getAttribute( "addtable") ;

 String[] result=addtable.split(";");
 if(!result[0].equals("null")&&!result[1].equals("null")){
 String[] title=result[0].split(",");
  String[] value=result[1].split(",");
  for(int i=0;i<title.length;i++){
  if(title[i]!=null&&value[i]!=null){
   %>
  <td align="right"><%=title[i] %></td>
   <td align="center"><%=value[i] %></td>
  <% 
  }
 }
  
  


 }


 %>
</tr>
 </table>

</body>
</html>