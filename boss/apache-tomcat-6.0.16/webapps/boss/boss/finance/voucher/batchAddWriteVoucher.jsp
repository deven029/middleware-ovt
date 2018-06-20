<%@ page language="java" import="java.util.*" import="com.ovt.idtv.boss.web.workOrder.struts.edittype.*" import="com.ovt.idtv.boss.web.workOrder.struts.form.WorkOrderForm" pageEncoding="UTF-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ page isELIgnored = "false" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>批量录入</title>
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
		<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_parameter.js"></script>
	<script language="javascript" src="<%=request.getContextPath()%>/datepicker/WdatePicker.js"></script>
	
	<SCRIPT language=JavaScript src="<%=request.getContextPath()%>/common/js/sitech.js"></SCRIPT>
	<SCRIPT language=JavaScript src="<%=request.getContextPath()%>/js/web.js"></SCRIPT>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/tabs.js"> </script>
    <base ><%String basePath = request.getContextPath();%>
  </head>
  <app:position/>
  <body style="margin-top:0px">
  	<form name="bossVoucherForm" id="bossVoucherForm" method="post">
  		<table border=0 cellspacing=0 cellpadding=0 width="100%" align=center><tbody>
		<tr>
		<td height=25 width=6><img src="<%=basePath%>/common/images/bar_left.gif" width=31 height=23></td>
		<td background="<%=basePath%>/common/images/bar_bg.gif" width="100%"><span class="l style2">批量录入代金券</span></td>
		<td width=6 align=right><img src="<%=basePath%>/common/images/bar_right.gif" width=9 height=23></td></tr>
		<tr>
		<td colspan=3>
		<table class=t border=0 cellspacing=1 cellpadding=0 width="100%">
		<tbody>
		<tr>
		<td bgcolor=#f3f6ff>

		<table border=0 cellspacing=0 cellpadding=3 width="100%">
			<tbody>
			<tr>
			<td width="12%" align=right>券类型: </td>
			<td width="37%">
			<select name='vType'  id = 'vType'>
				<option  value='0'>代金券</option>
				<option  value='1'>押金条</option>
				<option  value='2'>领导特批条</option>
				<option  value='3'>其它</option>
			</select>
			<span style="color:red;" >&nbsp;&nbsp;&nbsp;*</span></td></tr>
			<tr><td width="12%" align=right>券金额: </td>
			<td width="37%"><input type="text" size="30" id="vMoney" name="vMoney"></input><span style="color:red;" >&nbsp;&nbsp;&nbsp;*</span></td></tr>
			<tr>
			<td width="12%" align=right>起始券代码: </td>
			<td width="37%"><input type="text" size="30" id="vCode" name="vCode"></input><span style="color:red;" >&nbsp;&nbsp;&nbsp;*&nbsp;代金券代码由字母和数字组成，其它券类型代码可不填</span></td></tr>
			<tr><td width="12%" align=right>录入张数: </td>
			<td width="37%"><input type="text" size="10" id="addCount" name="addCount"></input><span style="color:red;" >&nbsp;&nbsp;&nbsp;*&nbsp;录入张数大于0小于1000张</span></td></tr>
			<tr><td width="12%" align=right>使用人代码: </td>
			<td width="37%"><input type="text" size="20" id="userCoding" name="userCoding"></input></td></tr>
			<tr>
			<td width="12%" align=right>生效日期: </td>
			<td width="37%"><input id="effictiveDate" name="effictiveDate" type='text' onclick="WdatePicker()" value='' class='Wdate'></input></td></tr>
			<tr><td width="12%" align=right>失效日期: </td>
			<td width="37%"><input id="expiryDate" name="expiryDate" type='text' onclick="WdatePicker()" value='' class='Wdate'></input></td></tr>
			<tr>
			<td width="12%" align=right>注意事项: </td>
			<td width="37%"><textarea rows=8 cols=70 name="vNote" id="vNote"></textarea> </td></tr>
			<tr><td width="12%" align=right>备注: </td>
			<td width="37%"><textarea rows=8 cols=70 name="vDesc" id="vDesc"></textarea></td>
			</tr>
			</tbody>
		</table></td></tr></tbody>
		</table></td></tr></tbody></table>
		
  	</form>
  <div  style="align:center">
  	<div >
  	<table  width="50%"  border="0"  cellpadding="0" cellspacing="0"  >
   	<tr>
   	<td align="left" width="10%">
 	</td>
	<td align="left" width="10%">
 	<table width="100" border="0" cellspacing="0" cellpadding="0">
		<tr id="buyProBut" onclick="checkVoucherData();"
					align="center" style="cursor:hand"><td>
			<img src="<%=basePath %>/common/images/but_left.gif" width="6" height="20"></td>
			<td width="100%" background=" <%=basePath %>/common/images/but_bg.gif"><div>确定</div></td>
			<td><img src=" <%=basePath %>/common/images/but_right.gif" width="6" height="20"></td>
		</tr>
	</table></td>
	<td align="left" width="40%">
 	<table width="100" border="0" cellspacing="0" cellpadding="0">
		<tr  onclick="bossVoucherForm.action='<%=basePath%>/jsp/boss/finance/bossVoucher.do?methodToCall=openQuery';bossVoucherForm.submit();"
					align="center" style="cursor:hand"><td>
			<img src="<%=basePath %>/common/images/but_left.gif" width="6" height="20"></td>
			<td width="100%" background=" <%=basePath %>/common/images/but_bg.gif"><div>返回</div></td>
			<td><img src=" <%=basePath %>/common/images/but_right.gif" width="6" height="20"></td>
		</tr>
	</table></td>
	</tr>
   	</table>
   	</div>
  </div>
  
  <br/>
  <br/>
  <br/>
  
  <script language="JavaScript">
  
  /**检查批量录入代金券数据是否合法*/
	function checkVoucherData(){
	
	var vMoney = $('#vMoney').val();//券金额
	var vCode = $('#vCode').val();//券代码
	var addCount = $('#addCount').val();//录入张数
	var effectDate = $('#effictiveDate').val();//生效时间
	var expiryDate = $('#expiryDate').val();//失效时间
	var userCoding = $('#userCoding').val();//使用人代码
	var vNote = $('#vNote').val();//注意事项
	var vDesc = $('#vDesc').val();//备注
	
	if(vMoney ==""){
		alert("券金额不能为空！");
		return false;
	}

	if(vCode ==""){
		alert("券代码不能为空！");
		return false;
	}
	
	if(addCount ==""){
		alert("代金券张数不能为空！");
		return false;
	}
	
	if(isNaN(vMoney)){
		alert("券金额只能输入数值型数据！");
		return false;
	}
	
	if(vMoney<0){
		alert("券金额必须为正数！");
		return false;
	}
	
	if(vCode.length>10){
		alert("起始券代码长度超出(1-10)限制！");
		return false;
	}

	if(!(/(^[1-9]\d*$)/.test(addCount))){
		alert("代金券张数必须为正整数！");
		return false;
	}
	
	if(addCount>1000||addCount<1){
		alert("输入的代金券张数范围出错(1-1000)");
		return false;
	}
	
	if(userCoding.length>20){
		alert("注意事项字数超出20字限制！");
		return false;
	}
	
	if(vNote.length>100){
		alert("注意事项字数超出100字限制！");
		return false;
	}
	
	if(vDesc.length>200){
		alert("注意事项字数超出200字限制！");
		return false;
	}
	
	var start = effectDate.replace(/-/g,"");
	var end = expiryDate.replace(/-/g,"");
	
	if(Number(end-start)<0 && end!="" && start!=""){
		alert(" 生效时间"+effectDate+"大于失效时间"+expiryDate+"！");
		checkFlag += 1;
		return false;
	}
	
	document.bossVoucherForm.action='<%=basePath%>/jsp/boss/finance/bossVoucher.do?methodToCall=batchAddVoucher';
	document.bossVoucherForm.submit();
	}
</script>
</body>
</html>
