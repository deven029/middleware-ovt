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
  </head>
  
  <body>
  	     <table width='100%' cellspacing='0' cellpadding='0' border='0'>
			<tr>
				<td nowrap height="30">
					当前位置:
					<span class='DD'>系统管理-->数据迁移-->导出数据</span>
				</td>
			</tr>
		</table>
        <form  name="userForm" method="post" action="<%=request.getContextPath()%>/common/jsp/rights/transfer/choiceExport.do?methodToCall=operFuncPlugin">
         <center>
        	
        		<%=request.getAttribute("funcPluginHTML")%>
        	
        	  <hr/>
        	  <table> 
        	  	<tr align="center">
        	  		<td >
        	  			<app:button title="上一步" image="" function="javascript:history.back()"/>
        	  		</td>
        	  		<td>
        	  			<app:button title="下一步" image="" function="javascript:userForm.submit()"/>  
        	  		</td>
        	    </tr>
        	  </table>
    	 
          </center>
        </form>
     
  </body>
</html>
