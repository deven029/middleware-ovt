<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ page isELIgnored = "false" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>用户批量订购</title>
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
	
	<script language="javascript" src="<%=request.getContextPath()%>/datepicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_parameter.js"></script>
	<!--<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_common.js"></script>-->
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_product.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/business/js/jquery_business_batchOrder.js"></script>	
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
			width:800px;
			height:500px;
			display:none;
		}
		.uptop{margin-top: 0px;}
		.small{width:60px}
		.tableBorder {border:1px solid #67BF7F;border-collapse:collapse ;border-spacing:0px;empty-cells:show}
		.tableBorder td{border:1px solid #67BF7F;bgcolor:#ffffff;width:150px}
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
		<td width="100%" background="<%=request.getContextPath() %>/common/images/bar_bg.gif" class="L style2" onclick="swhichshow()">批量订购产品</td>
		<td><img src="<%=request.getContextPath() %>/common/images/bar_right.gif" width="9" height="23"></td>
	</tr>
  </table><br/>
  <div style="display:none;">
     保存需要批量订购的用户id
  <input id="batchUserIds" value="<%=request.getAttribute("batchUserIds") %>"/>
  <input id="conditionStr" value="<%=request.getAttribute("conditionStr") %>"/>
     已经订购的产品id
  <input id="oldProIds"/>
  </div>
  <div  >
  	<div>
  	<b>下面列出的是部分订购用户的信息:</b>
  	<table class="tableBorder">
  	<tr><th>用户编号</th><th>用户名称</th><th>用户地址</th></tr>
  	<c:forEach var="userInfo" items="${userInfoList}">
  	<tr style="background: none repeat scroll 0% 0% rgb(255, 255, 255);" onmouseover="openme(this);" onmouseout="closeme(this);">
  	<td><c:out value="${userInfo.userCoding}"></c:out></td>
  	<td><c:out value="${userInfo.name}"></c:out></td>
  	<td><c:out value="${userInfo.address }"></c:out></td>
  	
  	</tr>
  	</c:forEach>
  	</table>
  	</div>
  	<div>
  	<c:if test="${conditionStr!=null}">
  	您选择按搜索条件订购<!-- ：<c:out value="${conditionStr}"></c:out> --><br/>
  	</c:if>
  	<c:if test="${conditionStr==null}">
  	你共选择了：<c:out value="${userLength}"></c:out>个用户进行批量操作<br/>
  	</c:if>
    <br/>
    </div>
  	<!-- <form name="batchProductForm" id="batchProductForm" method="post"> -->
  	<div id="proDiv_orderCondition">
  	<table class="tableBorder" id="proTab_orderCondition">
  	<tr>
  	<td width="40%">订购充值<input name="payment" type="radio" value="orderPay" checked/></td>
  	<td>订购开通<input name="payment" type="radio" value="orderOpen"/></td>
  	<td>订购<input name="payment" type="radio" value="order"/></td>
  	</tr>
  	<tr><!--卡 终端：类型 -->
  	
  	<c:forEach var="equType" items="${equTypeList}">
  	<td><input type="checkbox" name="equType" value="${equType.value}"/><c:out value="${equType.name}"></c:out></td>
  	</c:forEach>
  	</tr>
  	</table>
  	</div>
  	<div>
  	<table  width="50%"  border="0"  cellpadding="0" cellspacing="0"  >
   	<tr>
   	
   	<td align="left" width="10%">
 	<table width="100" border="0" cellspacing="0" cellpadding="0">
		<tr id="proBut" onclick="getProLists('<%=basePath%>/jsp/boss/business/batchUserOrder/batchUserOrder.do?methodToCall=ajaxSelectProduct')"
					align="center" style="cursor:hand"><td>
			<img src="<%=basePath %>/common/images/but_left.gif" width="6" height="20"></td>
			<td width="100%" background=" <%=basePath %>/common/images/but_bg.gif"><div>选择产品</div></td>
			<td><img src=" <%=basePath %>/common/images/but_right.gif" width="6" height="20"></td>
		</tr>
	</table></td>
	<td align="left" width="10%">
 	<table width="100" border="0" cellspacing="0" cellpadding="0">
		<tr id="buyProBut" onclick="buyProLists('<%=basePath%>/jsp/boss/business/batchUserOrder/batchUserOrder.do?methodToCall=ajaxBuyProduct')"
					align="center" style="cursor:hand"><td>
			<img src="<%=basePath %>/common/images/but_left.gif" width="6" height="20"></td>
			<td width="100%" background=" <%=basePath %>/common/images/but_bg.gif"><div>提交订购</div></td>
			<td><img src=" <%=basePath %>/common/images/but_right.gif" width="6" height="20"></td>
		</tr>
	</table></td>
	<td align="left" width="40%">
 	<table width="100" border="0" cellspacing="0" cellpadding="0">
		<tr  onclick="history.back()"
					align="center" style="cursor:hand"><td>
			<img src="<%=basePath %>/common/images/but_left.gif" width="6" height="20"></td>
			<td width="100%" background=" <%=basePath %>/common/images/but_bg.gif"><div>返回</div></td>
			<td><img src=" <%=basePath %>/common/images/but_right.gif" width="6" height="20"></td>
		</tr>
	</table></td>
	</tr>
   	</table>
   	</div>
  	<!-- </form> -->
  </div>
  
  <div id="proDiv"><!-- 可以订购的产品显示对话框，放置在这个层 -->
  <div id="proDiv_selTitle" class="uptop">
  <!-- 	过滤产品名称:<input id="selBox"/><input type="button" value="搜索" style="cursor:hand"/>-->
  </div> 
  <div id="proDiv_proList"  style="margin-top:10px">
  </div>	
  </div>
  <br/>
  <div id="proDiv_batchSelected" style="display:none">
  <table id="batchSelected" class="tableBorder" >
  <tr>
  <th >产品简称</th>
  <th >产品名称</th>
  <th >策略</th>
  <th >开始时间</th>
  <th >结束时间</th>
  <th >金额（元）</th>
  <th style="width:60">操作</th></tr>
  
  </table>
  <div >
  <br/>
  <br/>
     单个用户单张卡金额总计：<input id='sumMoney' value='0.0' disabled/>
  </div>
  </div>
  <br/>
  <br/>
  <div id='proDiv_waitNote' style="display:none">
     <br/><font color='red'>正在处理请稍后...</font>
  </div>
  <div id='proDiv_batchNote' style="display:none" ><!-- 操作返回的失败信息 -->
     <font>以下用户订购中出现问题，<font color='red'>请立即做好记录</font>：</font>
  <table id='proTab_BatchNote' class="tableBorder">
  	<tr><th>用户编号</th><th>用户名称</th><th>用户状态</th><th>有效状态</th><th style="width:170">用户设备</th></tr>
  	
  	</table>
  </div>
  <div >
  <br/>
  <br/>
  <font color="red">
  <br/>注意：
  <br/>1，订购的套餐中已经包含的服务，不能在订单中重复订购。
  <br/>2，如果用户已经订购该产品，它的有效时间段，不能和原有订购时间段重叠。
  <br/>3，不选择任何终端类型，代表为全部终端订购产品。
  <br/>4，订购充值：订购产品且会开通产品，系统将为用户重新充值并扣款，用户原有余额不变。
  <br/>   &nbsp;&nbsp;&nbsp;&nbsp;订购开通：订购产品，但是不对账户充值，系统将按订购价格从原有账户扣款，如果扣款成功则为用户开通服务，否则产品为申请中。
  <br/>   &nbsp;&nbsp;&nbsp;&nbsp;订购：订购产品，系统不扣款，产品为申请中。
  </font>
  </div>
  </body>
</html>
