<%@ page import="com.ovt.common.web.taglib.table.util.*,
									java.util.*,com.ovt.common.web.util.*,com.ovt.common.web.rights.memoryright.Rights,
									com.ovt.common.web.taglib.table.listTable.QueryTableDataModel"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ taglib uri="/tags/app" prefix="app" %>
<% String path = request.getContextPath(); %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">
<script language="javascript" src="<%= path %>/common/js/toolbar.js"></script>
<SCRIPT language=JavaScript src="<%= path %>/common/js/sitech.js"></SCRIPT>
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
<script language="JavaScript" type="text/JavaScript">
<!--
function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}
//-->
</script>
<title>查询</title>
</head>
<%
String submitAddr = request.getAttribute( "submitAddr" ).toString() ;
int contextId = -1 ;

if( submitAddr.startsWith( "!" ) ){
	submitAddr = submitAddr.substring( 1 ) ;
	
	Object queryModel = request.getAttribute( "queryModel" ) ;
	contextId = FunctionContext.newContextId() ;
	FunctionContext.setAttribute( "" + contextId , request , "queryModel" , queryModel ) ;
	
	if( submitAddr.indexOf( "?" ) > 0 ) {
		submitAddr += "&contextId=" + contextId ;
	}else{
		submitAddr += "?contextId=" + contextId ;
	}
	response.sendRedirect( submitAddr ) ; 
}
submitAddr = path + "/common/jsp/common/querySubmit.do?submitAddr=" + QueryTableDataModel.encodeURL( submitAddr);
%>
<body>
<app:position/>
<br>
<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
              <tr> 
                <td width="31" height="23"><img src="<%= path %>/common/images/bar_left.gif" width="31" height="23"></td>
                <td width="100%" background="<%= path %>/common/images/bar_bg.gif" class="L style2">　　查询页面/请输入查询条件</td>
                <td><img src="<%= path %>/common/images/bar_right.gif" width="9" height="23"></td>
              </tr>
              </table>
 <form name="form1" method="post" action="<%= path %>/common/jsp/common/querySubmit.do">
  <table width="100%"  border="0">
    <tr>
      <td>保存的查询：
      <%QueryModel queryModel = (QueryModel)request.getAttribute("queryModel");
        List savedQueryNames = QueryModelHelper.loadAllQueryModelNames( Rights.getWorkNo( request ) ,
      																	Rights.getCurrent_Func_code( request ) ,
      																	queryModel.getID() ,
      																	queryModel.getVersion() );
      	String savedQueryList = request.getParameter( "savedQueryList" ) ;
      	boolean found = false ;%>
        <select name="savedQueryList" id="savedQueryList">
        <%for( int i = 0 ; i < savedQueryNames.size() ; i++ ){
        	if( savedQueryList!= null && savedQueryNames.get(i).toString().equals(savedQueryList) ){
        		found = true ;
        	}%>
          <option value="<%=savedQueryNames.get(i)%>"<%if( savedQueryList!= null && savedQueryNames.get(i).toString().equals(savedQueryList) ){%> selected<%}%>><%=savedQueryNames.get(i)%></option>
          <%}
          if( !found ){
          	if( savedQueryNames.size() > 0 ) {
          		savedQueryList = savedQueryNames.get(0).toString() ;
          	}else{
          		savedQueryList = "" ;
          	}
          }%>
        </select>
        <input name="modifySavedQuery" type="submit" id="modifySavedQuery" value="编辑">
        <input name="deleteSavedQuery" type="submit" id="deleteSavedQuery" value="删除">
        <input name="deleteAllSavedQuery" type="submit" id="deleteAllSavedQuery" value="删除所有保存的查询">
      </td>
    </tr>
  </table>
</form>
<hr>
 <%
 		List queryFields = queryModel.getFields() ;
		QueryField field ;
		QueryModel.QueryGroup queryGroup = queryModel.getQueryData() ;
		QueryModel.QueryLeaf queryLeaf ;
		List queryLeafs = queryGroup.getChildren() ;
		List queryRelations = queryGroup.getRelations() ;
		Integer relation ;
		
		int i ,j ;
		int fieldId , operator;
		String fieldValue ;
		String cellData ;%>
<form name="queryForm" method="post" action="<%=submitAddr%>">
  <div align="center"></div>
  <table width="100%">
    <tr>
      <td width="84" height="23">查询项目</td>
      <td width="90">操作符</td>
      <td width="117">查询值</td>
      <td width="68">关系</td>
      <td width="606"><input name="rowCount" type="hidden" id="rowCount" value="<%=queryLeafs.size()%>"></td>
    </tr>
    <%for( i = 0 ; i < queryLeafs.size() ; i++ ){
    		queryLeaf = (QueryModel.QueryLeaf)queryLeafs.get(i) ;
				
				fieldId = queryLeaf.getFieldId() ;
				operator = queryLeaf.getOperator() ;
				fieldValue = queryLeaf.getFieldValue() ;
				
				relation = (Integer)queryRelations.get(i) ;
				if( fieldId < 0 || fieldId > queryFields.size() ){
					continue; 
				}
				
				
		%>
    <tr>
      <td height="22"><select name="item<%=i%>" id="item<%=i%>" onChange="MM_jumpMenu('self',this,0)">
     			<%for( j = 0 ; j < queryFields.size() ; j++ ){
     				field = (QueryField)queryFields.get( j ) ;%>
          	<option value="<%= path %>/common/jsp/common/querySubmit.do?index=<%=i%>&forFieldSelect=true&fieldIndex=<%=j%>"<%if( j == fieldId ){%> selected<%}%>><%=field.getFieldName()%></option>
          	<%}
          	field = (QueryField)queryFields.get( fieldId ) ;%>
      </select></td>
      <td><select name="oper<%=i%>" id="oper<%=i%>">
          <option value="1"<%if(operator==QueryModel.QueryLeaf.LARGER){%> selected<%}%>>大于</option>
          <option value="2"<%if(operator==QueryModel.QueryLeaf.LARGER_EQUAL){%> selected<%}%>>大于或等于</option>
          <option value="3"<%if(operator==QueryModel.QueryLeaf.EQUAL){%> selected<%}%>>等于</option>
          <option value="4"<%if(operator==QueryModel.QueryLeaf.SMALLER){%> selected<%}%>>小于</option>
          <option value="5"<%if(operator==QueryModel.QueryLeaf.SMALLER_EQUAL){%> selected<%}%>>小于或等于</option>
          <option value="6"<%if(operator==QueryModel.QueryLeaf.LEFT_LIKE){%> selected<%}%>>左匹配</option>
          <option value="7"<%if(operator==QueryModel.QueryLeaf.RIGHT_LIKE){%> selected<%}%>>右匹配</option>
          <option value="18"<%if(operator==QueryModel.QueryLeaf.FULL_LIKE){%> selected<%}%>>全匹配</option>
          <option value="8"<%if(operator==QueryModel.QueryLeaf.IS_NULL){%> selected<%}%>>为空</option>
          <option value="9"<%if(operator==QueryModel.QueryLeaf.ISNOT_NULL){%> selected<%}%>>不为空</option>
      </select></td>
      <td><%=field.getEditType().getHTML( ""+i+"" , fieldValue )%></td>
      <td><select name="relation<%=i%>" id="relation<%=i%>">
          <option value="1"<%if( relation == QueryModel.QueryGroup.AND ){%> selected<%}%>>并且</option>
          <option value="2"<%if( relation == QueryModel.QueryGroup.OR ){%> selected<%}%>>或者</option>
      </select></td>
      <td><input name="delete<%=i%>" type="submit" id="delete<%=i%>" value="删除"></td>
    </tr>
    <%}%>
    <tr>
      <td height="22"><select name="newitem" id="newitem" onChange="MM_jumpMenu('self',this,0)">
        <%int fieldIndex2 = 0 ;
        int temp = 0;
          if( request.getParameter( "fieldIndex" ) != null ){
          	fieldIndex2 = Integer.parseInt( request.getParameter( "fieldIndex" ) ) ;
          }
          for( j = 0 ; j < queryFields.size() ; j++ ){
     				field = (QueryField)queryFields.get( j ) ;%>
          	<option value="<%= path %>/common/jsp/common/querySubmit.do?index=10000&forFieldSelect=true&fieldIndex=<%=j%>"<%if( j == fieldIndex2 ){ temp = j ;%> selected<%}%>><%=field.getFieldName()%></option>
          	<%}
          	field = (QueryField)queryFields.get( temp ) ; 
          	%>
      </select></td>
      <td><select name="newoper" id="newoper">
        <option value="1">大于</option>
        <option value="2">大于或等于</option>
        <option value="3" selected>等于</option>
        <option value="4">小于</option>
        <option value="5">小于或等于</option>
        <option value="6">左匹配</option>
        <option value="7">右匹配</option>
        <option value="18">全匹配</option>
        <option value="8">为空</option>
        <option value="9">不为空</option>
      </select></td>
      <td><%=field.getEditType().getHTML( "10000" , "" )%></td>
      <td><select name="newrelation" id="newrelation">
        <option value="1" selected>并且</option>
        <option value="2">或者</option>
      </select></td>
      <td><input name="add" type="submit" id="add" value="增加"></td>
    </tr>
  </table>
  <p><hr>查询名称：
    <input name="savedQueryName" type="text" id="savedQueryName" value="<%=request.getParameter( "savedQueryList" ) != null?request.getParameter( "savedQueryList" ):""%>" maxlength="100">
    <input name="saveOnly" type="submit" id="saveOnly" value="只保存">
    <input name="saveAndQuery" type="submit" id="saveAndQuery" value="保存并查询">
    <input name="query" type="submit" id="query" value="查询">
 
     
</form>

</body>
</html>