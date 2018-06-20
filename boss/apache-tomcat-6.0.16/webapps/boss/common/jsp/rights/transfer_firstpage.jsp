<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="/tags/app" prefix="app"%> 
<%@ page isELIgnored = "false" %>
<%@ taglib uri="../../taglib/c.tld" prefix="c"%>
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
    
    <jsp:include page="transfer_include.jsp" />
    
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
			var choice = document.userForm.pluginId;
            document.userForm.action = '<%=path%>' +  '/common/jsp/rights/transfer/choiceExport.do?methodToCall=firstStep' ;
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
		   <table width='50%' cellspacing='0' cellpadding='0' border='0'>
		   <c:forEach items="${webPointList}" var="point" varStatus="state">
		   	 <tr align="center">
		   	 	<td  align="right">
		   	 		 <input type="checkbox"  id = '<c:out value="${point.pluginId}" />' name="pluginId" value='<c:out value="${point.pluginId}" />'/>
		   	 	</td>
		   	 	<td  align="left">
		   	 		<c:out value="${point.pluginName }"></c:out>
		   	 	</td>
		   	 </tr>   
		   </c:forEach>
		
		   </table>
		<hr>
		<center>
			<app:button title="下一步" image="" function="javascript:submitForm()"/>  
		</center>
	</form>		
  </body>
</html>
