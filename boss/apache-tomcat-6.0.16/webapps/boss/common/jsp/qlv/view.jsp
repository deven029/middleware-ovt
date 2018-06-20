<%@ page contentType="text/html;charset=utf-8" errorPage="/common/jsp/common/error.jsp?errMsg=unknown error occur,please contact OVT."%>
<%@ page import="java.util.*,
				com.ovt.common.web.qlv.view.*,
				com.ovt.common.web.qlv.view.impl.*,
				com.ovt.common.web.qlv.IActionDefine,
				com.ovt.common.web.qlv.impl.*,
				com.ovt.common.web.edittype.EditTypeContext"%>
<%@include file="/common/jsp/frame/check.jsp"%>
<%@ taglib uri="/tags/app" prefix="app" %>
<%@ page isELIgnored = "false" %>
<%@ taglib uri="/common/taglib/struts-html.tld" prefix="html" %>
<%@ taglib uri="/common/taglib/c.tld" prefix="c" %>
<%@ taglib uri="/common/taglib/fn.tld" prefix="fn" %>
<%@ taglib uri="/common/taglib/fmt.tld" prefix="fmt" %>
<%@ taglib uri="/common/taglib/format.tld" prefix="format" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Pragma" content="no-cache">
<title><c:out value="${VIEW_TITLE}"/></title>
<link href="<%=request.getContextPath()%>/common/css/zi.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/jquery/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/jquery/themes/icon.css">

<script type="text/javascript" src="<%=request.getContextPath()%>/common/jquery/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/jquery/jquery.easyui.min.js"></script>
 <script language="javascript" src="<%=request.getContextPath() %>/common/js/xtree/xtree.js"></script>
 <link href="<%=request.getContextPath() %>/common/css/xtree.css" rel="stylesheet" type="text/css">

<SCRIPT language=JavaScript src="<%=request.getContextPath()%>/common/js/sitech.js"></SCRIPT>
<script type=text/javascript src="<%=request.getContextPath()%>/common/js/date/date.js"></script>
</script>
<script language="javascript" src="<%=request.getContextPath()%>/common/js/calendar.js"></script>
</script>
<script language="javascript" src="<%=request.getContextPath()%>/datepicker/WdatePicker.js"></script>
</script>
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
</head>

<c:if test="${refreshTree == 'true'}">
<script language="JavaScript">
window.top.left.location="<%=request.getContextPath() %>/common/jsp/frame/tree.jsp<%if( request.getAttribute("refreshTreeMenuItemId")!=null){out.write("?expandTreeItem=" + (String)request.getAttribute("refreshTreeMenuItemId"));}%>";


</script>
</c:if>
<%
	String viewId = request.getParameter( "viewId" ) ;
	if( viewId == null ){
		viewId = (String)request.getAttribute( "viewId");
	}
	String errMsg = (String)request.getAttribute( "errMsg" ) ;
	IActionDefine actionDefine = (IActionDefine)request.getAttribute( "actionDefine" ) ;
	IViewDefine viewDefine = actionDefine.getViewDefine( viewId ) ;
	viewDefine.setCommandContext( new DefaultCommandContext(request) ); 
	String submitAddr = request.getContextPath() + request.getAttribute("requestURI") + "?methodToCall=executeViewCommand&viewId=" + viewDefine.getId() ;
	String oper = (String)request.getAttribute( "ARG_OPER" ) ;
	List<IViewCommand> commandsList = viewDefine.getCommandList() ;
	ViewModel viewModel = (ViewModel)request.getAttribute( "viewData" ) ;
	
	if( oper == null ){
		oper = (String)viewModel.getFieldData("ARG_OPER") ;
	}
	ViewPartModel firstViewPart = viewModel.getViewPart(0) ;
%>
<body>

<app:position/>
<%
EditTypeContext editTypeContext = new EditTypeContext() ;
editTypeContext.setRequest( request ) ;
Set jsurlset=new HashSet();
Set cssurlset=new HashSet();
for( int index = 0 ; index < viewModel.getSize() ; index ++ ){
	ViewPartModel addviewPart = viewModel.getViewPart(index) ;
	//System.out.println("1:"+addviewPart);
	IViewField[][] fieldadds =addviewPart.getFields();
	//System.out.println("2:"+fieldadds.length);
	for(int i=0;i<fieldadds.length;i++){
		IViewField[] rowFieldadds = fieldadds[i] ;
		//System.out.println("3:"+rowFieldadds.length);
	 	for( int j = 0 ; j < rowFieldadds.length ; j++ ) {
		 	rowFieldadds[j].getFieldEditType().setEditTypeContext( editTypeContext ) ;
	 		String[] jsurl=rowFieldadds[j].getFieldEditType().getDependJsUrls();
	
	 		if(jsurl==null){
	  			continue;
	 		}
	
	 		if(jsurl!=null){
	  //System.out.println("4:"+jsurl.length);
	  //System.out.println("5:"+jsurl[0]);
	 			for(int l=0;l<jsurl.length;l++){
	
	 				jsurlset.add(jsurl[l]);
	
	 			}
	 		}
	 		String[] cssurl=rowFieldadds[j].getFieldEditType().getDependCssUrls();
	 		if(cssurl!=null){
	 			for(int l=0;l<cssurl.length;l++){
	 				cssurlset.add(cssurl[l]);
	  				//System.out.println(cssurl[l]);
	 			}
	 		}
	  	}
	}
}
Iterator jsit=jsurlset.iterator();
  //System.out.println("5:"+jsurlset.size());
while(jsit.hasNext()){
String jsite=(String)jsit.next();%>
<script src="<%=request.getContextPath()%><%=jsite %>"></script>
<% 
}
Iterator cssite= cssurlset.iterator();
while(cssite.hasNext()){
  String cssurl=(String)cssite.next();%>
  <link href="<%=request.getContextPath()%><%=cssurl %>" rel="stylesheet" type="text/css">
   <% 
}

 %>
 <%
String formheadhtml=viewModel.getFormHeaderHtml();

 if( errMsg != null ){	 
 	%>
 	<font color="red"><%=errMsg %></font>
 	<%
 }
if(formheadhtml!=null)
out.print(formheadhtml);
 %>
<form name="userForm" action="<%=submitAddr %>" method="post" enctype="multipart/form-data">
	<%Enumeration attrEnum = request.getAttributeNames() ; 
	  while( attrEnum.hasMoreElements() ){
	  	String attrName = (String)attrEnum.nextElement() ;
	  	if( !attrName.startsWith( "ARG_" ) ){
	  		continue ;
	  	}
	  	String attrValue = (String)request.getAttribute( attrName ) ;
	  	attrName = attrName.substring( 4 ) ; 
	  	%>
	  	<input type="hidden" id="<%=attrName %>" name="<%=attrName %>" value="<%=attrValue %>"/>
	  	<input type="hidden" id="ARG_<%=attrName %>" name="ARG_<%=attrName %>" value="<%=attrValue %>"/>
	  <%} %>
	  	<input type="hidden" id="__VIEW_ID" name="__VIEW_ID" value="<%=viewId %>"/>
	<table width="100%"  border="0" cellspacing="0" cellpadding="0">
    	<tr> 
    		<td>
       			<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         			<tr> 
					  <td width="6" height="25"><img src="<%=request.getContextPath()%>/common/images/bar_left.gif" width="31" height="23"></td>
					  <td width="100%" background="<%=request.getContextPath()%>/common/images/bar_bg.gif"><span class="L style2"><%=firstViewPart.getTitle() %></span></td>
					  <td width="6" align="right"><img src="<%=request.getContextPath()%>/common/images/bar_right.gif" width="9" height="23"></td>
			   		</tr>
         			<tr>
           				<td colspan="3">
	           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
	             				<tr>
	              					<td bgcolor="F3F6FF">                    
	              						<table width="100%" border="0" cellspacing="0" cellpadding="3">
	    <%
	    	IViewField[][] fields = firstViewPart.getFields() ;
	    	int maxCols = 0; 
	    	for( int i = 0 ; i < fields.length ; i++ ) {
	    		IViewField[] rowFields = fields[i] ;
	    		int currentCols = 0 ;
	    		for( int j = 0 ; j < rowFields.length ; j++ ) { 
					currentCols +=rowFields[j].getSpanCols() + 1 ; 
				}
				if( maxCols < currentCols ){
					maxCols = currentCols ;
				}
			}
	    	for( int i = 0 ; i < fields.length ; i++ ) {
	    		IViewField[] rowFields = fields[i] ;
	    %>
		<tr>
			<%for( int j = 0 ; j < rowFields.length ; j++ ) { 
				boolean editable = false ;
				boolean containHidden = true ;
				if( oper.equals( "modifyView" ) ){ 
					if( ( rowFields[j].getEditProp() & IViewField.EDITABLE_MODIFY ) != 0){ 
						editable = true ;
						containHidden = false ;
					}else if( ( rowFields[j].getEditProp() & IViewField.CONTAIN_HIDDEN_MODIFY ) == 0 ){
						containHidden = false ;
					}
				}else if( oper.equals( "addView" ) ){ 
					if( ( rowFields[j].getEditProp() & IViewField.EDITABLE_ADD ) != 0){ 
						editable = true ;
						containHidden = false ;
					}else if( ( rowFields[j].getEditProp() & IViewField.CONTAIN_HIDDEN_ADD ) == 0 ){
						containHidden = false ;
					}
				}else if( oper.equals( "view" ) ){ 
					containHidden = false ;
				}
				%>
			<td width="<%=25 * 2/( maxCols )%>%" align="right">
				<%=rowFields[j].getName() %>:
			</td>
			<td width="<%=(100*( rowFields[j].getSpanCols() - 1 ) + 75 * 2)/maxCols%>%" colspan="<%=rowFields[j].getSpanCols() %>">
				<%=rowFields[j].getFieldEditType().getHTML( editable , containHidden , rowFields[j].getId() , viewModel.getFieldData(rowFields[j].getId() )) %>
			</td>
			<%} %>
		</tr>
		<%} 
		if( viewModel.getSize() == 1 ){%>
										<tr align="center">
	                    				<td colspan="<%=maxCols %>"><hr>
	                    							<table width="30%"  border="0" cellspacing="0" cellpadding="0">
	                       								<tr>
	                          								<td>                           
			                           							<table width="30%" border="0" cellspacing="0" cellpadding="0">
														   			<tr align='right'>
														   				<%for( int i = 0 ; i < commandsList.size() ; i++ ){
														   					 IViewCommand viewCommand = (IViewCommand)commandsList.get(i);
														   					 String appendArgs = "" ;
														   					 if( viewCommand.getAppendArgs()!=null&&viewCommand.getAppendArgs().length() > 0 ){
														   						 appendArgs = "&" + viewCommand.getAppendArgs() ;
														   					 }
														   					 String function=viewCommand.isBackCommand()?"history.back()":("userForm.action='" + submitAddr + "&commandId=" + viewCommand.getCommandId() + appendArgs + "';"+viewCommand.getBeforeSubmitJS()+";userForm.submit();" ) ;
														   					 %>
														   				<app:button title="<%=viewCommand.getCommandName() %>" image="" function="<%=function%>"/>
				     													
				     													<%} %>
	       															</tr>
																</table>	 
	                        								</td>
	                        							</tr>
	                    							</table>
	                    						</td>
	                  						</tr>	
	     <%} %>	
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
	
	<table width="30%" border="0" cellspacing="0" cellpadding="0">
  		 <tr align='right'>
   
   		</tr>
	</table>	 
	
	<%for( int index = 1 ; index < viewModel.getSize() ; index ++ ){
		maxCols = 0; 
		ViewPartModel viewPart = viewModel.getViewPart(index) ; 
	
		%>
	<table width="100%"  border="0" cellspacing="0" cellpadding="0">
    	<tr> 
    		<td>
    		  <div id="<%=viewPart.getDivId() %>"  style="display:<%=viewPart.getShow() %>" > 
       			<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         			<tr> 
					  <td width="6" height="25"><img src="<%=request.getContextPath()%>/common/images/bar_left.gif" width="31" height="23"></td>
					  <td width="100%" background="<%=request.getContextPath()%>/common/images/bar_bg.gif"><span class="L style2"><%=viewPart.getTitle() %></span></td>
					  <td width="6" align="right"><img src="<%=request.getContextPath()%>/common/images/bar_right.gif" width="9" height="23"></td>
			   		</tr>
         			<tr>
           				<td colspan="3">
	           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
	             				<tr>
	              					<td bgcolor="F3F6FF">                    
	              						<table width="100%" border="0" cellspacing="0" cellpadding="3">
	    
		<%
	    	fields = viewPart.getFields() ;
	    	//System.out.println("no1:!!!!!!!"+fields);
	    	
	    	for( int i = 0 ; i < fields.length ; i++ ) {
	    		IViewField[] rowFields = fields[i] ;
	    		int currentCols = 0 ;
	    		for( int j = 0 ; j < rowFields.length ; j++ ) {
					currentCols +=rowFields[j].getSpanCols() + 1 ; 
				}
				if( maxCols < currentCols ){
					maxCols = currentCols ;
				} 
			}
	    	for( int i = 0 ; i < fields.length ; i++ ) {
	    		IViewField[] rowFields = fields[i] ;
	    		
	    %>
		<tr>
			<%
			boolean rowVisible = false ;
			for( int j = 0 ; j < rowFields.length ; j++ ) {
				if( oper.equals( "modifyView" ) ){ 
					if( ( rowFields[j].getEditProp() & IViewField.UNVISIBLE_MODIFY ) == 0){ 
						rowVisible = true ;
						break ;
					}
				}else if( oper.equals( "addView" ) ){ 
					if( ( rowFields[j].getEditProp() & IViewField.UNVISIBLE_ADD ) == 0){ 
						rowVisible = true ;
						break ;
					}
				}else if( oper.equals( "view" ) ){ 
					if( ( rowFields[j].getEditProp() & IViewField.UNVISIBLE_MODIFY ) == 0 ||
						( rowFields[j].getEditProp() & IViewField.UNVISIBLE_ADD ) == 0 ){ 
						rowVisible = true ;
						break ;
					}
				}
			}
			if( !rowVisible ){
				continue ;
			}
			int addedSpanCols = 0 ;
			for( int j = 0 ; j < rowFields.length ; j++ ) {
				boolean editable = false ;
				boolean containHidden = true ;
				boolean visible = true ;
				if( oper.equals( "modifyView" ) ){ 
					if( ( rowFields[j].getEditProp() & IViewField.EDITABLE_MODIFY ) != 0){ 
					
						editable = true ;
						containHidden = false ;
					}else if( ( rowFields[j].getEditProp() & IViewField.CONTAIN_HIDDEN_MODIFY ) == 0 ){
						containHidden = false ;
					}
					
					if( ( rowFields[j].getEditProp() & IViewField.UNVISIBLE_MODIFY ) != 0){ 
						visible = false ;
					}
				}else if( oper.equals( "addView" ) ){ 
					if( ( rowFields[j].getEditProp() & IViewField.EDITABLE_ADD ) != 0){ 
						editable = true ;
						containHidden = false ;
					}else if( ( rowFields[j].getEditProp() & IViewField.CONTAIN_HIDDEN_ADD ) == 0 ){
						containHidden = false ;
					}
					if( ( rowFields[j].getEditProp() & IViewField.UNVISIBLE_ADD ) != 0){ 
						visible = false ;
					}
				}else if( oper.equals( "view" ) ){ 
					containHidden = false ;
					if( ( rowFields[j].getEditProp() & IViewField.UNVISIBLE_MODIFY ) != 0 &&
						( rowFields[j].getEditProp() & IViewField.UNVISIBLE_ADD ) != 0 ){ 
						visible = false ;
					}
				}
				if( !visible ){
					addedSpanCols += 1 + rowFields[j].getSpanCols() ;
					continue ;
				}
				%>
			<td width="<%=25 * 2/( maxCols )%>%" align="right">
				<%=rowFields[j].getName() %>
			</td>
			<td width="<%=(100*( rowFields[j].getSpanCols() + addedSpanCols - 1 ) + 75 * 2)/maxCols%>%" colspan="<%=rowFields[j].getSpanCols() %>">
				<%=rowFields[j].getFieldEditType().getHTML( editable , containHidden , rowFields[j].getId() , viewModel.getFieldData(rowFields[j].getId() )) %>
			   
			</td>
			<%} %>
		</tr>
		<%} %>
	                					</table>
	               					</td>
	              				</tr>
	          				</table>
	          			</td>
	        		</tr>
	       		</table>
	       	  </div>
	      	</td>
	    </tr>
	    <% if( index == viewModel.getSize() - 1 ){%>
	
	                 					<tr align="center">
	                    						<td colspan="<%=maxCols %>"><hr>
	                    							<table width="30%"  border="0" cellspacing="0" cellpadding="0" >
	                       								<tr>
	                          								<td   >                           
			                           							<table width="30%" border="0" cellspacing="0" cellpadding="0">
														   			<tr align='center'>
														   				<%for( int i = 0 ; i < commandsList.size() ; i++ ){
														   					 IViewCommand viewCommand = (IViewCommand)commandsList.get(i);
														   					 String appendArgs = "" ;
														   					 if( viewCommand.getAppendArgs()!=null&&viewCommand.getAppendArgs().length() > 0 ){
														   						 appendArgs = "&" + viewCommand.getAppendArgs() ;
														   					 }
														   					 String function=viewCommand.isBackCommand()?"history.back()":("userForm.action='" + submitAddr + "&commandId=" + viewCommand.getCommandId() + appendArgs + "';"+viewCommand.getBeforeSubmitJS()+";userForm.submit();" ) ;
														   					 %>
														   				<app:button title="<%=viewCommand.getCommandName() %>" image="" function="<%=function%>"/>
				     													
				     													<%} %>
	       															</tr>
																</table>	 
	                        								</td>
	                        							</tr>
	                    							</table>
	                    						</td>
	                  						</tr>
	 	<%} %>
	 </table>  
	
	<table width="30%" border="0" cellspacing="0" cellpadding="0">
  		 <tr align='right'>
   
   		</tr>
	</table>	 
	<%} %>
</form>
 <%
String formfooterhtml=viewModel.getFormFooterHtml();

if(formfooterhtml!=null)
out.print(formfooterhtml);
 %>
<script type="text/javascript"> 
<!--
     var bCancel = false; 

    function validateForm(form) {   
    		                                  
        if (bCancel) 
	    	return true; 
        else 
       		return validateRequired(form) && validateInteger(form) && validateDate(form); 
   } 

    function required () { 
     	
    } 

    function IntegerValidations () { 
     
    } 

    function DateValidations () { 
    } 
	
	
	<jsp:include page="/common/js/strutsValidate.js" flush="true" /> 
-->

</script>
<%
String js=viewModel.getJs();

if(js!=null)
out.print(js);
 %>
 
</html>