<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String info = (String) request.getAttribute("stbCardImpResultInfo");
	String viewType = (String)request.getAttribute("impResultViewType");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta http-equiv="Pragma" content="no-cache">
		<title></title>
		<link href="<%=path%>/common/css/zi.css" rel="stylesheet"
			type="text/css">
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/common/jquery/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/common/jquery/themes/icon.css">

		<script type="text/javascript"
			src="<%=path%>/common/jquery/jquery-1.4.2.min.js"></script>
		<script type="text/javascript"
			src="<%=path%>/common/jquery/jquery.easyui.min.js"></script>
		<script language="javascript"
			src="<%=path%>/common/js/xtree/xtree.js"></script>
		<link href="<%=path%>/common/css/xtree.css" rel="stylesheet"
			type="text/css">

		<SCRIPT language=JavaScript src="<%=path%>/common/js/sitech.js"></SCRIPT>
		<script type=text/javascript src="<%=path%>/common/js/date/date.js"></script>
		<script language="javascript" src="<%=path%>/common/js/calendar.js"></script>
		<script language="javascript"
			src="<%=path%>/datepicker/WdatePicker.js"></script>
		<script language="JavaScript">
		var showNextInt;
function openme(object) {
		object.style.background = "#FFFFCC";
	}
	function closeme(object) {
		object.style.background = "#ffffff";
	}

	var ch = 0;
	function checkStbCardImpResult(){
		if(ch<1){//执行完后不再执行
		$.ajax({
			url:"<%=path %>/boss/resource/stbCardImpResultCheck.jsp",
			dataType:"html",
			async:false,
			data:"viewType=<%=viewType %>",
			success:function(data){
			if(data != null&&data!=""){
			  	if(data != null && data!= ""){
			  		var datas = data.split("@");
			  		if(datas[1]=='runed'){
			  			ch = ch+1;
			  		}
			  		$("#stbCardImpResultInfo").html(datas[2]);
			  	}else{
			  		showNextInt.clear();
			  	}
			 }
			},
			error:function(msg){
				//alert(msg);
			}
			});
		}
	}

	function doBack(){
		window.document.location="<%=path %>/bossCoreResource/stb.do?methodToCall=openQuery";
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
	<body>
		<table width='100%' cellspacing='0' cellpadding='0' border='0'><tr><td nowrap height="30">当前位置: <span class='DD'>资源管理-->机顶盒管理-->按文件批量入库</span></td></tr></table><br/>
		
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td>
					<table width="100%" border="0" align="center" cellpadding="0"
						cellspacing="0">
						<tr>
							<td width="6" height="25">
								<img src="<%=path%>/common/images/bar_left.gif" width="31"
									height="23">
							</td>
							<td width="100%" background="<%=path%>/common/images/bar_bg.gif">
								<span class="L style2">机顶盒批量入库</span>
							</td>
							<td width="6" align="right">
								<img src="<%=path%>/common/images/bar_right.gif" width="9"
									height="23">
							</td>
						</tr>
						<tr>
							<td colspan="3">
							<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
	             				<tr>
	              					<td bgcolor="F3F6FF">                    
	              						<table width="100%" border="0" cellspacing="0" cellpadding="3">
	    
		<tr>
			
			<td width="25%" align="center">
				<img  src="<%=path %>/boss/resource/images/showmsg.gif"><font color="red" id="stbCardImpResultInfo"><%=info%></font>
			</td>
			
			
			
		</tr>
		
		<tr align="center">
	                    				<td colspan="2"><hr>
	                    							<table width="30%"  border="0" cellspacing="0" cellpadding="0">
	                       								<tr>
	                          								<td>                           
			                           							<table width="30%" border="0" cellspacing="0" cellpadding="0">
														   			<tr align='right'>
				     													
														   				<td align="center"><table width="70" border="0" cellspacing="0" cellpadding="0"><tr onclick="doBack();" align="center" style="cursor:hand"><td><img src="<%=path %>/common/images/but_left.gif" width="6" height="20"></td><td width="100%" background="<%=path %>/common/images/but_bg.gif"><div>返回</div></td><td><img src="<%=path %>/common/images/but_right.gif" width="6" height="20"></td></tr></table></td>

				     													
				     													
	       															</tr>
		</table>
							
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<script type="text/javascript">
			showNextInt = setInterval("checkStbCardImpResult()",1000);
		</script>
	</body>
</html>
