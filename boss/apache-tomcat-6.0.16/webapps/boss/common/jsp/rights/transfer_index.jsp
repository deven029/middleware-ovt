<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="/tags/app" prefix="app"%> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title></title>
    <link href="<%=request.getContextPath()%>/common/css/zi.css" rel="stylesheet" type="text/css" />
	<script language="JavaScript">
		function openme(object){
				object.style.background="#FFFFCC";
			}
		function closeme(object){
				object.style.background="#ffffff";
				}
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

	<script language="JavaScript">
		function submitForm() 
		{
			var choice = document.userForm.transferData;

				
            if (  document.userForm.transferData[0].checked )
            	document.userForm.action = '<%=path%>' +  '/common/jsp/rights/transfer/choiceExport.do?methodToCall=initAction' ;
            if ( document.userForm.transferData[1].checked ) 
            {
            	window.location ='<%=path%>' + '/common/jsp/rights/transfer_data_upload.jsp' ;
            	return ;
            }


            document.userForm.submit();
		}
	</script>


  </head>
 
   
  <body>
  
     <table width='100%' cellspacing='0' cellpadding='0' border='0'>
			<tr>
				<td nowrap height="30">
					当前位置:
					<span class='DD'>系统管理-->数据迁移</span>
				</td>
			</tr>
		</table>
	<form name="userForm" id = "userForm" method="post" >
		   <table width='100%' cellspacing='0' cellpadding='0' border='0'>
		   	 <tr align="center">
		   	 	<td>
		   	 		<input type="radio" name="transferData" id = "export" value="export" checked/> 导出数据  
		   	 	</td>
		   	 </tr>
		   	 <tr align="center" >
		   	 	<td>
		   	 		<input type="radio" name="transferData" id ="import"  value="import"/> 导入数据 <br>
		   	 	</td>
		   	 </tr>		
			 <!-- tr align="center">
			 	<td>
			 			<input type="radio" name="transferData" id ="view"  value="view"/>     下载已有导出数据
			 	</td>
			 </tr-->
		
		   </table>
		<hr>
		<center>
			<app:button title="下一步" image="" function="javascript:submitForm()"/>  
		</center>
	</form>		
  </body>
</html>
