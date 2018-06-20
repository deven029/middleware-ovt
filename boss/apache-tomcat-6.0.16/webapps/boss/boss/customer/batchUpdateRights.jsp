<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ page isELIgnored = "false" %>

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
	<link href="<%=request.getContextPath()%>/common/css/zi.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/boss/charge/table.css"   />
	
	<script language="javascript" src="<%=request.getContextPath()%>/datepicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_parameter.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_common.js"></script>	
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_batchUpdateRights.js"></script>	
	
	<SCRIPT language=JavaScript src="<%=request.getContextPath()%>/common/js/sitech.js"></SCRIPT>
	<SCRIPT language=JavaScript src="<%=request.getContextPath()%>/js/web.js"></SCRIPT>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/tabs.js"> </script>
    
     <script language="JavaScript">
			function openme(object){
				object.style.background="#FFFFCC";}
			function closeme(object){
				object.style.background="#ffffff";}

			function GetRadioValue(RadioName){
			    var obj;    
			    obj=document.getElementsByName(RadioName);
			    if(obj!=null){
			        var i;
			        for(i=0;i<obj.length;i++){
			            if(obj[i].checked){
			                return obj[i].value;            
			            }
			        }
			    }
			    return null;
			}
			
			function chooseCondition () {
				 var conditionValue=GetRadioValue("conditionLimit");
				 if ( conditionValue == 'time' ){
					 updateRightsForm.startTime.disabled = false ;
					 updateRightsForm.endTime.disabled = false ;


					 updateRightsForm.startCardNumber.disabled = true;
					 updateRightsForm.endCardNumber.disabled = true;


					 updateRightsForm.customer_areaLevel1.disabled = true;
					 updateRightsForm.customer_areaLevel2.disabled = true;
					 updateRightsForm.customer_areaLevel3.disabled = true;

					 //按文件刷新 2013-5-6 yzy
					 updateRightsForm.fileRefreshFile.disabled = true ;
					 updateRightsForm.fileRefreshFileType.disabled = true ;
				 } 

				 if ( conditionValue == 'cardRange' ){
					 updateRightsForm.startTime.disabled = true ;
					 updateRightsForm.endTime.disabled = true ;


					 updateRightsForm.startCardNumber.disabled = false;
					 updateRightsForm.endCardNumber.disabled = false ;


					 updateRightsForm.customer_areaLevel1.disabled = true;
					 updateRightsForm.customer_areaLevel2.disabled = true;
					 updateRightsForm.customer_areaLevel3.disabled = true;
					 //按文件刷新 2013-5-6 yzy
					 updateRightsForm.fileRefreshFile.disabled = true ;
					 updateRightsForm.fileRefreshFileType.disabled = true ;
				}

				 if ( conditionValue == 'area' ){
					 updateRightsForm.startTime.disabled = true ;
					 updateRightsForm.endTime.disabled = true ;


					 updateRightsForm.startCardNumber.disabled = true;
					 updateRightsForm.endCardNumber.disabled = true ;


					 updateRightsForm.customer_areaLevel1.disabled = false;
					 updateRightsForm.customer_areaLevel2.disabled = false;
					 updateRightsForm.customer_areaLevel3.disabled = false ;

					 //按文件刷新 2013-5-6 yzy
					 updateRightsForm.fileRefreshFile.disabled = true ;
					 updateRightsForm.fileRefreshFileType.disabled = true ;
				}
				 //按文件刷新 2013-5-6 yzy
				 if ( conditionValue == 'fileRefresh' ){
					 updateRightsForm.startTime.disabled = true ;
					 updateRightsForm.endTime.disabled = true ;


					 updateRightsForm.startCardNumber.disabled = true;
					 updateRightsForm.endCardNumber.disabled = true ;


					 updateRightsForm.customer_areaLevel1.disabled = true;
					 updateRightsForm.customer_areaLevel2.disabled = true;
					 updateRightsForm.customer_areaLevel3.disabled = true ;

					 updateRightsForm.fileRefreshFile.disabled = false ;
					 updateRightsForm.fileRefreshFileType.disabled = false ;
					 
				}
					
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
				ul {
				    list-style-type: none;
				    margin:8px 0 4px 0;
				} 
				li {
				    margin-top:4px;
				}
		
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
			.tableBorder {border:1px solid #000;border-collapse:collapse ;border-spacing:0px;empty-cells:show}
			.tableBorder td{border:1px solid #000;bgcolor:#ffffff;width:150px}
		
		</style>
    
  </head>
  
   <app:position/>
  <body onload="chooseCondition()">
  	 <table width="98%"  border="0" align="center" cellpadding="0" cellspacing="0">
		<tr> 
			<td width="31" height="23"><img src="<%=request.getContextPath() %>/common/images/bar_left.gif" width="31" height="23"></td>
 			<td width="100%" background="<%=request.getContextPath() %>/common/images/bar_bg.gif" class="L style2" onclick="swhichshow()">请选择处理方式</td>
 			<td><img src="<%=request.getContextPath() %>/common/images/bar_right.gif" width="9" height="23"></td>
 		</tr>
 	</table>
 	<br/>
    <form name="updateRightsForm" enctype="multipart/form-data"  method="post" action="<%=request.getContextPath() %>/jsp/boss/customer/batchUpdateRights/updateRights.do?methodToCall=updateRights">
      	
      	
      	<fieldset> 
      		<legend>按时间范围处理<input type="radio"  name="conditionLimit" value="time"  checked="checked" onclick="chooseCondition()"/> </legend>
      		 <ul> 
     			<li>
     				<table>
     					<tr >
			      			<td  align="center" width="10%" height="23" >
			      				开始日期：
			      			</td>
			      			<td   align="left" width="20%" height="23" >
			      				<input name="startTime" id="startTime" type="text"     onclick="WdatePicker()" class="Wdate" value=""size="30" maxlength="50" >
			      			</td>
			      			<td align="center" width="10%" height="23" >
			      				&nbsp;
			      			</td>
			      			<td  align="left" width="20%" height="23"  >
			      				&nbsp;
			      			</td>
			      			<td  align="center" width="10%" height="23" >
			      				结束日期：
			      			</td>
			      			<td   align="left" width="20%" height="23" >
			      				 <input name="endTime" type="text" id="endTime"  onclick="WdatePicker()" class="Wdate" value=""size="30" maxlength="50" >
			      			</td>
		      			</tr>
     				</table>
     			</li> 
  			 </ul> 
      		
      	</fieldset>
      	<fieldset> 
      		<legend>按智能卡号段处理<input type="radio"  name="conditionLimit" value="cardRange"  onclick="chooseCondition()"/> </legend>
      		 <ul> 
     			<li>
     				<table>
     					<tr >
			      			<td  align="center" width="10%" height="23" >
			      				起始智能卡号段：
			      			</td>
			      			<td   align="left" width="20%" height="23" >
			      				 <input name="startCardNumber" type="text" value="" size="30" maxlength="50" >
			      			</td>
			      			<td align="center" width="10%" height="23" >
			      				&nbsp;
			      			</td>
			      			<td  align="left" width="10%" height="23"  >
			      				&nbsp;
			      			</td>
			      			<td  align="left" width="10%" height="23" >
			      				结束智能卡号段：
			      			</td>
			      			<td   align="left" width="20%" height="23" >
			      				  <input name="endCardNumber" type="text" value="" size="30" maxlength="50" >
			      			</td>
		      			</tr>
     				</table>
     			</li> 
  			 </ul> 
      		
      	</fieldset>
      	<fieldset> 
      		<legend>按片区处理 <input type="radio"  name="conditionLimit" value="area" onclick="chooseCondition()" /> </legend>
      		 <ul> 
     			<li>
     				<table>
     					<tr >
			      				<td  align="center" width="10%" height="23" >
				      				一级片区名称：
				      			</td>
				      			<td   align="left" width="20%" height="23" >
				      				<select name="customer_areaLevel1" id = "customer_areaLevel1"> 
				      					<c:forEach var="area" items="${areaInfoList}" >
				      						<option value="<c:out value="${area.id}" />"  ><c:out value="${area.name}" /></option>
				      					</c:forEach>
				      				</select>
				      			</td>
				      			<td  align="center" width="10%" height="23" >
				      				二级片区名称：
				      			</td>
				      			<td   align="left" width="20%" height="23" >
				      				<select name="customer_areaLevel2" id = "customer_areaLevel2"> 
				      				</select>
				      			</td>
				      			<td  align="center" width="10%" height="23" >
				      				三级片区名称：
				      			</td>
				      			<td   align="left" width="20%" height="23" >
				      				<select name="customer_areaLevel3" id = "customer_areaLevel3"> 
				      				</select>
				      			</td>
		      			</tr>
     				</table>
     			</li> 
  			 </ul> 
      		
      	</fieldset>
      	<fieldset> 
      		<legend>按导入文件刷新<input type="radio"  name="conditionLimit" value="fileRefresh"  onclick="chooseCondition()"/> </legend>
      		<ul> 
     			<li>
     				<table>
     					<tr >
			      			<td  align="center" width="10%" height="23" >
			      				导入文件数据类型：
			      			</td>
			      			<td   align="left" width="20%" height="23" >
			      			<select id="fileRefreshFileType" name="fileRefreshFileType">
			      			<option value="">--请选择--</option>
			      			<option value="userCoding">导入用户编号</option>
			      			<option value="userEquNo">导入用户智能卡号</option>
			      			</select>
			      			</td>
			      			<td align="center" width="10%" height="23" >
			      				&nbsp;
			      			</td>
			      			<td  align="left" width="10%" height="23"  >
			      				&nbsp;
			      			</td>
			      			<td  align="left" width="10%" height="23" >
			      				导入文件：
			      			</td>
			      			<td  align="left" width="20%" height="23" >
			      				 <input type="file" id="fileRefreshFile" name="fileRefreshFile" />
			      			</td>
		      			</tr>
     				</table>
     			</li> 
  			 </ul>
        </fieldset>
        <fieldset> 
      		<legend>公用刷新控制参数</legend>
      		<ul> 
     			<li>
     				<table>
     					<tr >
			      			<td  align="center" width="10%" height="23" >
			      				每次最大刷新数量：
			      			</td>
			      			<td   align="left" width="20%" height="23" >
			      			<input type="text" name="refreshMaxSize" value="300"/>
			      				 
			      			</td>
			      			<td align="center" width="10%" height="23" >
			      				&nbsp;
			      			</td>
			      			<td  align="left" width="10%" height="23"  >
			      				&nbsp;
			      			</td>
			      			<td  align="left" width="10%" height="23" >
			      				下次刷新间隔时间（秒）：
			      			</td>
			      			<td   align="left" width="20%" height="23" >
			      				 <input type="text" name="nextRefreshSpaceTime" value="5"/>
			      			</td>
		      			</tr>
     				</table>
     			</li> 
  			 </ul>
        </fieldset>
      	<br/>
      	<table  width="100%"  border="0" align="center" cellpadding="0" cellspacing="0"  >
      		<tr>
      			<td colspan="2" align="right" width="25%">
      				<table width="100"  cellspacing="0" cellpadding="0">
 						<tr onclick="updateRightsForm.submit();" align="center" style="cursor:hand"><td>
 							<img src="<%=request.getContextPath() %>/common/images/but_left.gif" width="6" height="20"></td>
 							<td width="100%" background=" <%=request.getContextPath() %>/common/images/but_bg.gif"><div>生成/刷新授权</div></td>
 							<td><img src=" <%=request.getContextPath() %>/common/images/but_right.gif" width="6" height="20"></td>
 						</tr>
 					</table>
 				</td>
 				<td colspan="2" align="center" width="25%">
      				<table width="70" border="0" cellspacing="0" cellpadding="0">
 						<tr onclick="updateRightsForm.action = '<%=request.getContextPath() %>/jsp/boss/customer/batchUpdateRights/updateRights.do?methodToCall=updateRights&create=1'  ; updateRightsForm.submit();" 
 									align="center" style="cursor:hand"><td>
 							<img src="<%=request.getContextPath() %>/common/images/but_left.gif" width="6" height="20"></td>
 							<td width="100%" background=" <%=request.getContextPath() %>/common/images/but_bg.gif"><div>刷新授权</div></td>
 							<td><img src=" <%=request.getContextPath() %>/common/images/but_right.gif" width="6" height="20"></td>
 						</tr>
 					</table>
 				</td>
 				<td colspan="2" align="center" width="25%">
      				<table width="100" border="0" cellspacing="0" cellpadding="0">
 						<tr onclick="updateRightsForm.action = '<%=request.getContextPath() %>/jsp/boss/customer/batchUpdateRights/updateRights.do?methodToCall=updateRights&create=2'  ; updateRightsForm.submit();" 
 									align="center" style="cursor:hand"><td>
 							<img src="<%=request.getContextPath() %>/common/images/but_left.gif" width="6" height="20"></td>
 							<td width="100%" background=" <%=request.getContextPath() %>/common/images/but_bg.gif"><div>用户同步</div></td>
 							<td><img src=" <%=request.getContextPath() %>/common/images/but_right.gif" width="6" height="20"></td>
 						</tr>
 					</table>
 				</td>
 				<td colspan="2" align="left" width="25%">
      				<table width="100" border="0" cellspacing="0" cellpadding="0">
 						<tr onclick="updateRightsForm.action = '<%=request.getContextPath() %>/jsp/boss/customer/batchUpdateRights/updateRights.do?methodToCall=updateRights&create=3'  ; updateRightsForm.submit();" 
 									align="center" style="cursor:hand"><td>
 							<img src="<%=request.getContextPath() %>/common/images/but_left.gif" width="6" height="20"></td>
 							<td width="100%" background=" <%=request.getContextPath() %>/common/images/but_bg.gif"><div>智能卡同步</div></td>
 							<td><img src=" <%=request.getContextPath() %>/common/images/but_right.gif" width="6" height="20"></td>
 						</tr>
 					</table>
 				</td>
 			</tr>
      	</table>
      </form>
      <br/>
      <div>
      <ul>
		<li><font color="red">按导入文件刷新说明：</font></li>
		<li>1、导入文件使用 Excel 97-2003或兼容版本；</li>
		<li>2、导入文件格式定义：一、导入数据只包含一列；二、导入数据列的第一行是数据描述，第二行开始为导入数据；</li>
	  </ul>
	  <table>
	  <tr>
	  <td>用户编号导入Excel样式：</td>
	  <td>
	  <table class="tableBorder">
		<tr><td>用户编号</td></tr>
		<tr><td>210034</td></tr>
		<tr><td>210035</td></tr>
		</table>
	  </td>
	  <td>用户卡号导入Excel样式：</td>
	  <td>
	  <table class="tableBorder">
		<tr><td>用户智能卡号</td></tr>
		<tr><td>0293002500000370</td></tr>
		<tr><td>0293002500000385</td></tr>
		</table>
	  </td>
	  </tr>
	  </table>
	 </div>
  </body>
</html>
