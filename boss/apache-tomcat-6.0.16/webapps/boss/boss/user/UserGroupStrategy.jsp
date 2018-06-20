<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ page isELIgnored = "false" %>
<%@ page isELIgnored = "false" %>
<%
String path = request.getContextPath();
response.setHeader("Pragma","No-Cache"); response.setHeader("Cache-Control","No-Cache"); response.setDateHeader("Expires", 0);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>组策略管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/tabs.css" />
	<link href="<%=request.getContextPath()%>/common/css/zi.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/boss/charge/table.css"   />
	<link type="text/css" rel="stylesheet"  href="<%=request.getContextPath()%>/common/jquery/themes/default/dialog.css"/>
	<link type="text/css" rel="stylesheet"  href="<%=request.getContextPath()%>/common/jquery/themes/default/easyui.css"/>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_product.js"></script>
	<script language="javascript" src="<%=request.getContextPath()%>/datepicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_parameter.js"></script>
	<!--<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_common.js"></script>-->
	
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/user/js/jquery_user_GroupStrategy.js"></script>	
	<script type="text/javascript" src="<%=request.getContextPath()%>/common/jquery/jquery.easyui.min.js"></script>
	
	<SCRIPT language=JavaScript src="<%=request.getContextPath()%>/common/js/sitech.js"></SCRIPT>
	<SCRIPT language=JavaScript src="<%=request.getContextPath()%>/js/web.js"></SCRIPT>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/tabs.js"> </script>
    <base ><%String basePath = request.getContextPath();%>
     <script language="JavaScript">
    	 function openme(object){
    	 object.style.background="#FFFFCC";}
    	 function closeme(object){
    	 object.style.background="#ffffff";}		
	 </script>
		<style type="text/css">
		#proDiv{
			margin-top:0px;
			width:600px;
			height:auto;
			max-height:500px;
			display:none;
		}
		.uptop{margin-top: 0px;}
		.small{width:60px}
		.tableBorder {border:1px solid #67BF7F;border-collapse:collapse ;border-spacing:0px;empty-cells:show}
		.tableBorder td{border:1px solid #67BF7F;bgcolor:#ffffff;width:150px;text-align: center;}
		.tableBorder th{border:1px solid #67BF7F;font-weight:bold;background:#EED2A9;width:150px}
		.orderTableBorder{border:1px solid #67BF7F;border-collapse:collapse ;border-spacing:0px;empty-cells:show}
		.orderTableBorder td{border:1px solid #67BF7F;}
		.orderTableBorder th{border:1px solid #67BF7F;font-weight:bold;background:#FDF1DE}
		
		</style>
    
  </head>
  <app:position/>
  <body style="margin-top:0px"> 
  <table width="98%"  border="0" align="center" cellpadding="0" cellspacing="0">
	<tr> 
		<td width="31" height="23"><img src="<%=request.getContextPath() %>/common/images/bar_left.gif" width="31" height="23"></td>
		<td width="100%" background="<%=request.getContextPath() %>/common/images/bar_bg.gif" class="L style2" onclick="swhichshow()">添加组策略</td>
		<td><img src="<%=request.getContextPath() %>/common/images/bar_right.gif" width="9" height="23"></td>
	</tr>
  </table><br/>
  <div style="display:none;">
<%--    保存需要批量订购的用户id--%>
  <input id="batchUserIds" value="<%=request.getAttribute("batchUserIds") %>"/>
  <input id="conditionStr" value="<%=request.getAttribute("conditionStr") %>"/>
  <input id="groupId" value="<%=request.getAttribute("groupId") %>"/>
  
<%--     已经订购的产品id--%>
  <input id="oldProIds"/>
  </div>
  <div  >
  	<div>
  	<b>下面列出的是当前组下已应用的策略:</b>
  	<table class="tableBorder">
  	<tr><th>产品简称</th>
		<th>产品名称</th>
		<th>策略名称</th>
		<th>优惠策略有效期</th>
		<th>优惠时间类型</th>
		<th>优惠生效时间</th>
		<th>优惠失效时间</th>
		<th>优惠策略</th>
  		<th>操作</th></tr>
  		
	  	<c:forEach var="listInfo" items="${listInfo}" varStatus="j" >
	  	<tr style="background: none repeat scroll 0% 0% rgb(255, 255, 255);" onmouseover="openme(this);" onmouseout="closeme(this);">
			<c:forEach var="Info" items="${listInfo}" varStatus="i" >
				  	<c:choose>
				  		<c:when test="${i.count eq 5}">
				  		<td><select name=''  id = 'datetype${j.count }' onchange='changeDateType(this,${j.count })' >
							<option <c:if test="${ Info eq 1  }"> selected="selected" </c:if>  value='1'>按日期优惠</option>
							<option <c:if test="${ Info eq 2  }"> selected="selected" </c:if>  value='2'>按时段优惠</option>
						</select></td>
						</c:when>
						<c:when test="${i.count eq 6}"><td><input id="effectDate${j.count }" type='text' onclick="isTimeOrDate( '${Info}' )" value='${Info}' class='Wdate'></input></td></c:when>
						<c:when test="${i.count eq 7}"><td><input id="expiryDate${j.count }" type='text' onclick="isTimeOrDate( '${Info}' )" value='${Info}' class='Wdate'></input></td></c:when>
						<c:when test="${i.count eq 10}">
							<input id="policyid${j.count }" type='hidden' value='${Info}'></input>
						</c:when>
				  		<c:when test="${i.count eq 9}">
						  	<td id="buttonshow${Info}">
						  	<input id="modifyid${Info}" title="${j.count }" name='${Info}' onclick="ModifyDiscount('<%=basePath%>/jsp/boss/user/userGroup.do?methodToCall=ajaxMoidfyDiscount',${Info})"
						  				 type="button" value="修改"></input>
						  	<input id='deldis${Info}' name='${Info}'  onclick="DelDiscount('<%=basePath%>/jsp/boss/user/userGroup.do?methodToCall=ajaxDelDiscount',${Info})"
						  				 type="button" value="删除"></input>
						  	</td>
				  		</c:when>
						<c:otherwise><td><c:out value="${Info}"></c:out></td></c:otherwise> 
					</c:choose>
		  	</c:forEach>
	  	</tr>
	  	</c:forEach>
  	
  	</table>
  	</div>
  
  	<!-- <form name="batchProductForm" id="batchProductForm" method="post"> -->
  	<div id="proDiv_orderCondition">
  	
  	</div>
  	<div>
  	<table  width="50%"  border="0"  cellpadding="0" cellspacing="0"  >
   	<tr>
   	
   	<td align="left" width="10%">
		<br />
   		<br />
	 	<table width="100" border="0" cellspacing="0" cellpadding="0">
			<tr id="returnPre"  onclick="javascript:window.location.href='<%=basePath %>/jsp/boss/user/userGroup.do?methodToCall=openQuery';"
						align="center" style="cursor:hand"><td>
				<img src="<%=basePath %>/common/images/but_left.gif" width="6" height="20"></td>
				<td width="100%" background=" <%=basePath %>/common/images/but_bg.gif"><div>返回</div></td>
				<td><img src=" <%=basePath %>/common/images/but_right.gif" width="6" height="20"></td>
			</tr>
		</table>
	</td>
   	
   	<td align="left" width="10%">
   		<br />
   		<br />
	 	<table width="100" border="0" cellspacing="0" cellpadding="0">
			<tr id="proBut" onclick="getProLists('<%=basePath%>/jsp/boss/user/userGroup.do?methodToCall=ajaxAddDiscount')"
						align="center" style="cursor:hand"><td>
				<img src="<%=basePath %>/common/images/but_left.gif" width="6" height="20"></td>
				<td width="100%" background=" <%=basePath %>/common/images/but_bg.gif"><div>选择策略</div></td>
				<td><img src=" <%=basePath %>/common/images/but_right.gif" width="6" height="20"></td>
			</tr>
		</table>
	</td> 
	<td align="left" width="10%">
		<br />
   		<br />
	 	<table width="100" border="0" cellspacing="0" cellpadding="0">
			<tr id="buyProBut" onclick="selDiscountLists('<%=basePath%>/jsp/boss/user/userGroup.do?methodToCall=ajaxSelDiscount')"
						align="center" style="cursor:hand"><td>
				<img src="<%=basePath %>/common/images/but_left.gif" width="6" height="20"></td>
				<td width="100%" background=" <%=basePath %>/common/images/but_bg.gif"><div>提交</div></td>
				<td><img src=" <%=basePath %>/common/images/but_right.gif" width="6" height="20"></td>
			</tr>
		</table>
	</td>
	
	<td align="left" width="40%">
	
	<!-- 
 	<table width="100" border="0" cellspacing="0" cellpadding="0">
		<tr  onclick="window.close()"
					align="center" style="cursor:hand"><td>
			<img src="<%=basePath %>/common/images/but_left.gif" width="6" height="20"></td>
			<td width="100%" background=" <%=basePath %>/common/images/but_bg.gif"><div>返回</div></td>
			<td><img src=" <%=basePath %>/common/images/but_right.gif" width="6" height="20"></td>
		</tr>
	</table> --></td>
	</tr>
   	</table>
   	</div>
  	<!-- </form> -->
  </div>
  
  <div id="proDiv"><!-- 可以订购的产品显示对话框，放置在这个层 -->
	  <div id="proDiv_selTitle" class="uptop">
	  </div> 
	  <div id="proDiv_proList"  style="margin-top:10px">
	  </div>	
	  <iframe id='iframebar' marginHeight=0 marginWidth=0 style="position:absolute;top:0px;left:0px;height:100%;width:100%;z-Index:-100;">
	  </iframe>
  </div>
  
  <br/>
  
  <div id="proDiv_batchSelected" style="display:none">
  <b>下面列出的是已选择但未提交的优惠策略，如需应用请点击提交按钮:</b>
  <table id="batchSelected" class="tableBorder" >
  <tr><th>产品简称</th>
		<th>产品名称</th>
		<th>策略名称</th>
		<th>优惠策略有效期</th>
		<th>优惠时间类型</th>
		<th>优惠生效时间</th>
		<th>优惠失效时间</th>
		<th>优惠策略</th>
		<th style="width:60">操作</th></tr>
  
  </table>
  </div>
  
  <br/>
  <br/>
  <div id='proDiv_waitNote'>
		<%--  处理结果显示   --%>
  </div>
  
  <div >
  <br/>
  <br/>
  <font color="red">
	<%-- <br /> 此处可加提示信息 --%>
  </font>
  </div>
  </body>
</html>
