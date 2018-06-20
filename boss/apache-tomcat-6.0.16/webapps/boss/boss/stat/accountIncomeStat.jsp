<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c" %>
<%@ taglib uri="/tags/app" prefix="app" %>
<%@ page isELIgnored="false" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title></title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/tabs.css" />
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/css/zi.css" />
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/boss/charge/table.css" />
	<link type="text/css" href="<%=request.getContextPath()%>/boss/customer/css/customer/style.css" rel="stylesheet" />	
	<script language="javascript" src="<%=request.getContextPath()%>/datepicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_parameter.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_common.js"></script>	
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/stat/js/jquery_stat_accountIncomeStat.js"></script>
	<script language=JavaScript src="<%=request.getContextPath()%>/common/js/sitech.js"></script>
	<script language=JavaScript src="<%=request.getContextPath()%>/js/web.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/tabs.js"> </script>
	
	<script language="JavaScript">
			function openme(object){
				object.style.background="#FFFFCC";}
			function closeme(object){
				object.style.background="#ffffff";}
			
			function initAccountIncomeStat() {
				getAreaLevels();
			}
	</script>
	<style type="text/css">
		fieldset {
		    padding:10px;
		    margin:10px;
		    color:#333; 
		    border:#06c dashed 1px;
		} 
		legend {
		    color:#06c;
		    font-weight:800; 
		    background:#fff;
		}
		h1 {
			font-size:24px;
		}
	</style>
  </head>
  
  <body onload="initAccountIncomeStat()">
  	 <table width="98%"  border="0" align="center" cellpadding="0" cellspacing="0">
		<tr> 
			<td width="31" height="23"><img src="<%=request.getContextPath() %>/common/images/bar_left.gif" width="31" height="23"></td>
 			<td width="100%" background="<%=request.getContextPath() %>/common/images/bar_bg.gif" class="L style2" onclick="swhichshow()">账户收入统计</td>
 			<td><img src="<%=request.getContextPath() %>/common/images/bar_right.gif" width="9" height="23"></td>
 		</tr>
 	</table>
 	<br/>
 	<fieldset> 
      	<legend>统计条件</legend>
		  <table width="98%" border="0" align="center" cellpadding="0" cellspacing="0">
			<tr >
	 			<td  align="center" width="10%" height="23" >
	 				开始日期：
	 			</td>
	 			<td   align="left" width="20%" height="23" >
	 				<input name="startTime" id="startTime" type="text" onclick="WdatePicker()" class="Wdate" value=""size="30" maxlength="50" >
	 			</td>
	 			<td  align="center" width="10%" height="23" >
	 				结束日期：
	 			</td>
	 			<td   align="left" width="20%" height="23" >
	 				 <input name="endTime" type="text" id="endTime" onclick="WdatePicker()" class="Wdate" value=""size="30" maxlength="50" >
	 			</td>
			</tr>
			<tr >
	  			<td  align="center" width="10%" height="23" >
	   				一级片区：
	   			</td>
	   			<td align="left" width="20%" height="23" >
	   				<select name="areaLevel1" id = "areaLevel1"> 
	   					<c:forEach var="area" items="${areaInfoList}" >
	   						<option value="<c:out value="${area.id}" />" ><c:out value="${area.name}" /></option>
	   					</c:forEach>
	   				</select>
	   			</td>
	   			<td  align="center" width="10%" height="23" >
	   				二级片区：
	   			</td>
	   			<td   align="left" width="20%" height="23" >
	   				<select name="areaLevel2" id = "areaLevel2"> 
	   				</select>
	   			</td>
	   			<td  align="center" width="10%" height="23" >
	   				三级片区：
	   			</td>
	   			<td   align="left" width="20%" height="23" >
	   				<select name="areaLevel3" id = "areaLevel3"> 
	   				</select>
	   			</td>
	 		</tr>
		 	<tr>
	 			<td align="center" colspan="6" height="23" >
	 				<input type="button" id="statAccountIncome" value="查询" height="23"  style="cursor:hand"/>
	 			</td>
		 	</tr>
		</table>
  	</fieldset>
  	<div id="statResult" class="hide">
	  	<fieldset>
	  		<legend>统计结果</legend>
	  		<div align="center"><h1>账户收入统计</h1></div>
	  		<table id="infoTable" width="98%">
	  		</table>
	  		<table id="resultTable" width="98%" border="1" align="center" cellpadding="0" cellspacing="0" class="tableBorder">
	  			
	  		</table>
			<table id="printTimeInfo" width="98%">
				
			</table>
	  	</fieldset>
  	</div>
  	<table id="dataForPrint" class="hide">
  	
  	</table>
  	<div id="comments" class="hide">
  		<fieldset>
	  		<legend>注意事项及说明</legend>
	  		<table align="left" width="98%"><tr>
	  			<td width="50%">
	  				<font color="red"><br/>
			  			0. 点击统计结果中非0数值的链接可以导出该数据的明细数据表(excel格式)<br/>
			  			2. 本期扣款:用户所开通服务所需要支付的金额总和<br/>
			  			4. 本期退出:操作员手动从用户的账户余额中充的负值<br/>
			  			6. 当前余额:截止到当前统计时间为止用户账户中所剩的余额<br/>
			  			8. 上期结余:统计到开始时间前一天对象下所有账户的余额
			  		</font>
	  			</td>
	  			<td width="50%">
		  			<font color="red"><br/>
			  			1. 本期充值:所有在营业厅充值，以银行代扣或以其他方式充缴的金额总和<br/>
			  			3. 本期退还:用户在退订产品时所产生的金额总和<br/>
			  			5. 本期充值余额:充值余额(本期充值-本期扣款+本期退还-本期退出)<br/>
			  			7. 上期结余和本期结余以一级片区来统计,其余统计按三级片区统计<br/>
			  			9. 本期结余:统计到结束时间对象下所有账户的余额
			  		</font>
	  			</td>
	  		</tr></table>
	  		
  		</fieldset>
  	</div>
  	<br/>
  </body>
</html>
