<%@ page language="java"   pageEncoding="UTF-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ page isELIgnored = "false" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

response.setHeader("Pragma","No-Cache"); response.setHeader("Cache-Control","No-Cache"); response.setDateHeader("Expires", 0);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title></title>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/tabs.css" />
		<link href="<%=request.getContextPath()%>/common/css/zi.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/jquery/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/jquery/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/boss/charge/table.css"   />
	
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
    		var currentForm = document.getElementById( 'productForm' ) ;
    		if ( terminalDate == '' )
    		{
    			alert( '套餐下架时间不能为空 ' );
    			return ;
    		}
    		 if(!confirm('到了下架时间，用户将不能订购此套餐，确实下架吗') ) 
    		 {
    			 currentForm.action = '<%=request.getContextPath() %>/jsp/boss/charge/product/shelves.do?methodToCall=openQuery';
        	 }
    		
    		
    		currentForm.submit();
    	}
    	
    	
    </script>
    <base href="<%=basePath%>">
  </head>
  
  
  
  <app:position/>
  <body>
    <form name="productForm" method="post" action="<%=request.getContextPath() %>/jsp/boss/charge/product/shelves.do?methodToCall=submitShelvesProduct">
    	<input type="hidden" id="id" name="id" value='<c:out value="${product.id}"/>'  />
    		<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
    			<tr>
		    		 <td width="12%" align="right">
						套餐上架时间:
					</td>
					<td width="37%" colspan="1">
						<input type="text" name="publishDate"  size="30" maxlength="50"  disabled = "disabled" value='<c:out value="${publishDate}"/>'   class="Wdate"/> 
					</td>
		    				
    			</tr>
    			<tr>
    				<td width="12%" align="right">
						设置套餐下架时间:
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
