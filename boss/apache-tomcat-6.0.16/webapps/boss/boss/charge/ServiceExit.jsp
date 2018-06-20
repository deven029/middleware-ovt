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
    <base href="<%=basePath%>">
    
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
    
    <script language="javascript" src="<%=request.getContextPath()%>/datepicker/WdatePicker.js"></script>
    
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
    		var currentForm = document.getElementById( 'ServiceForm' ) ;
    		var terminalDate = document.getElementById( 'terminalDate' ).value  ;
    		if ( terminalDate == '' )
    		{
    			alert( '服务退出时间不能为空 ' );
    			return ;
    		}

			 if(!confirm('到了服务退出时间的下一天，用户将不能观看此服务，确定退出吗') )
			 {
				 currentForm.action = '<%=request.getContextPath() %>/jsp/boss/charge/service/exit.do?methodToCall=openQuery';
			 }
			 
    		
    		currentForm.submit();
    	}
    	
    	
    </script>
    
  </head>
  
  
  
  <app:position/>
  <body>
    <form name="ServiceForm" method="post" action="<%=request.getContextPath() %>/jsp/boss/charge/service/exit.do?methodToCall=submitExitService">
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
						设置服务退出时间:
					</td>
					<td width="37%" colspan="1">
						<input type="text" name="terminalDate" id = "terminalDate"  value="" size="30" maxlength="50"  onfocus="WdatePicker(  {minDate:'%y-%M-{%d}'} )" class="Wdate"/>
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
