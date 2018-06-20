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
    <title>代金券状态检测</title>
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

    
  </head>
  <body style="margin-top:0px"> 
	<form name="formVoucher" action="" method="post">
	
	</form>
  </body>
       <script language="JavaScript">
    	var aaa = confirm("选择的数据中已存在使用过的代金券，不能进行作废操作，忽略已使用的代金券？");
    	if(aaa == true){
    		document.formVoucher.action="<%=request.getContextPath()%>/jsp/boss/finance/bossVoucher.do?methodToCall=changeVoucherStatus&checkStatus=1";
    		//alert(document.formVoucher.action);
    	}
    	else{
    		document.formVoucher.action="<%=request.getContextPath()%>/jsp/boss/finance/bossVoucher.do?methodToCall=changeVoucherStatus&checkStatus=0";
    	}
    	document.formVoucher.submit();
	 </script>
</html>
