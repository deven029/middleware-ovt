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
 		<div>
			common/jsp/rights/transfer_step_test.jsp
			这是正确的地址
		</div>
     
  </body>
</html>
