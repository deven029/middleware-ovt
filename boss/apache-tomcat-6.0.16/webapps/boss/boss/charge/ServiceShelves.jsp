<%@ page language="java"   pageEncoding="UTF-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ page isELIgnored = "false" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

response.setHeader("Pragma","No-Cache"); response.setHeader("Cache-Control","No-Cache"); response.setDateHeader("Expires", 0);
%>

<html>
  <head>
    
    <title></title>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/tabs.css" />
		<link href="<%=request.getContextPath()%>/common/css/zi.css" rel="stylesheet" type="text/css">
	
		<SCRIPT language=JavaScript
			src="<%=request.getContextPath()%>/common/js/sitech.js"></SCRIPT>
		<SCRIPT language=JavaScript
			src="<%=request.getContextPath()%>/js/web.js"></SCRIPT>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/tabs.js"> 
		</script>
    
    <script language="javascript" defer="defer" src="<%=request.getContextPath()%>/datepicker/WdatePicker.js"></script>
    
    <script language="JavaScript">
			function openme(object){
				object.style.background="#FFFFCC";}
			function closeme(object){
				object.style.background="#ffffff";}
		</script>
		<style type="text/css">
			<!--
			.style1 {
				color: #0c5bc4
			}
			
			.style2 {
				font-size: 14px;
				color: #003665;
			}
			
			body {
				margin-top: 0px;
			}
			-->
		</style>
    
    <script  language="javascript" >
    	function submitForm() 
    	{
    		var terminalDate = document.getElementById( 'exitDate' ).value  ;
    		var currentForm = document.getElementById( 'ServiceForm' ) ;
    		if ( terminalDate == '' )
    		{
    			alert( '服务下架时间不能为空 ' );
    			return ;
    		}

    		 if(!confirm('到了下架时间，用户将不能订购此服务，并且此服务也不能打包到套餐中，确定下架吗') ) 
    		 {
    			 currentForm.action = '<%=request.getContextPath() %>/jsp/boss/charge/service/shelves.do?methodToCall=openQuery' ; 
        	 }
    		
    		currentForm.submit();
    	}
    	
    	
    </script>
    
    <base href="<%=basePath%>">
    
  </head>
  
  
  
  <app:position/>
  <body>
  	<font color="red"><c:out value="${errMsg}" /> </font>
    <form name="ServiceForm" method="post" action="<%=request.getContextPath() %>/jsp/boss/charge/service/shelves.do?methodToCall=submitShelvesService">
    	<input type="hidden" id="id" name="id" value='<c:out value="${service.id}"/>'  />
    		<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
    			<tr>
		    		 <td width="12%" align="right">
						服务上架时间:
					</td>
					<td width="37%" colspan="1">
						<input type="text" name="publishDate"  size="30" maxlength="50"  disabled = "disabled" value='<c:out value="${publishDate}"/>'   class="Wdate"/> 
					</td>
		    				
    			</tr>
    			<tr>
    				<td width="12%" align="right">
						设置服务下架时间:
					</td>
					<td width="37%" colspan="1">
						<input type="text" name="exitDate" id = "exitDate"  value="" size="30" maxlength="50"  onfocus="WdatePicker(  {minDate:'%y-%M-{%d}'} )" class="Wdate"/>
						<font color="red">*</font>
					</td>
    			
    			</tr>
    		    <tr align="center" bgcolor="F3F6FF" >
	                <td colspan="2"><hr>
	                    							<table width="30%"  border="0" cellspacing="0" cellpadding="0" >
	                       								<tr>
	                          								<td>                           
			                           							<table width="30%" border="0" cellspacing="0" cellpadding="0">
														   			<tr align='center'>
														   				<app:button title="提交" image="" function="submitForm()"/>
				     													<app:button title="返回" image="" function="history.back()"/>
	       															</tr>
																</table>	 
	                        								</td>
	                        							</tr>
	                    							</table>
	                    						</td>
	           </tr>
    			
    		</table>
    </form>
  </body>
</html>
