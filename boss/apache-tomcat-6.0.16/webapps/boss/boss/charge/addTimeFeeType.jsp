<%@ page language="java"   pageEncoding="UTF-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/common/taglib/fn.tld" prefix="fn"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ page isELIgnored = "false" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
response.setHeader("Pragma","No-Cache"); response.setHeader("Cache-Control","No-Cache"); response.setDateHeader("Expires", 0);

java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
java.util.Date currentTime = new java.util.Date();
String strDate = formatter.format(currentTime).toString();
%>
<html>
  <head>
    <base target=_self></base>
    <title>按次收费策略信息定义</title>
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/tabs.css" />
		<link href="<%=request.getContextPath()%>/common/css/zi.css" rel="stylesheet" type="text/css"/>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/jquery/themes/default/easyui.css"/>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/jquery/themes/icon.css"/>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%><%= path%>/charge/table.css"   />
		<script language="javascript" src="<%=request.getContextPath()%>/datepicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery-1.4.2.min.js"></script>
	
		<SCRIPT language=JavaScript
			src="<%=request.getContextPath()%>/common/js/sitech.js"></SCRIPT>
		<SCRIPT language=JavaScript
			src="<%=request.getContextPath()%>/js/web.js"></SCRIPT>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/tabs.js"> 
		</script>
    
    <script language="javascript" src="<%=request.getContextPath()%>/datepicker/WdatePicker.js"></script>
    
    <script language="JavaScript">
			function openme(object){
				object.style.background="#FFFFCC";}
			function closeme(object){
				object.style.background="#ffffff";}
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
			
			.tableBorder {border:1px solid #67BF7F;border-collapse:collapse ;border-spacing:0px;empty-cells:show}
			.tableBorder td{border:1px solid #67BF7F;bgcolor:#ffffff;width:150px;text-align: center;}
			.tableBorder th{border:1px solid #67BF7F;font-weight:bold;background:#EED2A9;width:150px}
			.orderTableBorder{border:1px solid #67BF7F;border-collapse:collapse ;border-spacing:0px;empty-cells:show}
			.orderTableBorder td{border:1px solid #67BF7F;}
			.orderTableBorder th{border:1px solid #67BF7F;font-weight:bold;background:#FDF1DE}
			-->
		</style>

<script type="text/javascript">
		var index = 1 ;
		
        function addFeeType() 
		{
        	 var divArray = document.getElementById("monthFeeType").getElementsByTagName("div") ;//获取所有 DIV
    		 var exitIndex  ; 
        	 for ( var i = 0 ; i <divArray.length ; i ++ )
    		 {
        		 if(divArray[i].id != 'month' &&  !divArray[i].id.startWith('month_') && divArray[i].id.startWith('month'))
				 {
        			 exitIndex =  divArray[i].id ;
        			 break ;
				 }
    		 }
        	 var currentIndex = ++index ;
        	 var newFeeType = document.createElement("div");   
        	 newFeeType.innerHTML = document.getElementById( exitIndex ).innerHTML; 
        	 newFeeType.id = 'month' + currentIndex  ; 

        	 var reg =  new RegExp(exitIndex,"g");
        	 newFeeType.innerHTML = newFeeType.innerHTML.replace(reg,'month'+currentIndex);//替换 策略标识 
					
        	 document.getElementById('monthFeeType').appendChild(newFeeType); 

        	 document.getElementById( 'month_rebate_type_month'+currentIndex ).value = '0' ;// 还原优惠方式 
			 showDiscountPolicy('0' , 'month' , 'month'+currentIndex ) ;  
		}


        function delFeeType ( divId )
        {
        	var divArray = document.getElementById("monthFeeType").getElementsByTagName("div") ;//获取所有 DIV


			 var num =0 ; 
      		 for ( var i = 0 ; i <divArray.length ; i ++ )
  			 {
      			 if( divArray[i].id != 'month' &&  !divArray[i].id.startWith('month_') && divArray[i].id.startWith('month'))
				 	{
      				 num ++ ;
					}
  			 }	 
			 if( num == 1  )
			 {
				 alert('最后一个计费策略不能删除');
				 return ;
			 } 
			 document.getElementById( divId ).removeNode(true);
        } 
		/**
			显示优惠策略名称 的 DIV 
		*/
	   function showDiscountPolicy( value , feeTypeId , postPrex ) {  
			  if(  value != '0'  ){   
				  showDiscountDiv(  document.getElementsByName(''+feeTypeId+'_discountPolicyDefineId_'+postPrex ) ,  feeTypeId  , 'false' , postPrex ) ;   
			      document.getElementById( ''+feeTypeId+'_discount_policy_'+postPrex ).style.display = 'block' ;  
			  }else{    
				  showDiscountDiv(  document.getElementsByName(''+feeTypeId+'_discountPolicyDefineId_'+postPrex ) ,  feeTypeId  , true , postPrex  ) ;   
				  document.getElementById( ''+feeTypeId+'_discount_policy_'+postPrex  ).style.display = 'none' ;    	
			 }
        } 

		/**
			显示优惠策略 的 DIV 
		*/
	  function showDiscountDiv( checkBoxName , feeTypeId , force ,  postPrex ) {     
		  var checkobj;   
		  for( var i = 0 ; i < checkBoxName.length ; i ++ ) {   
			   checkobj=checkBoxName[i].value; if ( checkobj =='' ) 
				   continue;  checkobj = feeTypeId +'_'+ checkobj +'_'+ postPrex  ;   ;  
			   if(  force == 'false' && checkBoxName[i].checked ) {   
				      document.getElementById( checkobj ).style.display = 'block' ; 
				} else   {   
					  document.getElementById( checkobj ).style.display = 'none' ; 
					  checkBoxName[i].checked = false; 
				  }
		 	}  
		 } 

	 /**
	 	保存表单数据 
	 */	
	 function 	saveFeeType() 
	 {
		 var inputArray ;
		 var divArray = document.getElementById("monthFeeType").getElementsByTagName("div") ;//获取所有 DIV
		 var tagName  ;
		 var saveData = '' , and = '' , element_value = ''  , feeTypeData = ''; 
		 var index = 1 ;//每种计费策略的序号 
		 var feeTypeName  =  document.getElementById('feeTypeName').value  ;
		 var realIndexId = '<c:out value="${timeFeeType.indexId}"/>' ;  
		 var timesSeqNo = "";
		 var timesStandard = "";
		 for ( var i = 0 ; i <divArray.length ; i ++ )
		 {
			 if(  divArray[i].id != 'month' &&  !divArray[i].id.startWith('month_') && divArray[i].id.startWith('month') ) {
				 saveData = '';
				 inDivArray = divArray[i].getElementsByTagName("div") ;
				 var modify = 0;
				 if ( realIndexId == '' ){
						modify = 1
					 } 
				  var div0Inputs = inDivArray[0].getElementsByTagName("input");
		 		  var div0Selects = inDivArray[0].getElementsByTagName("select");
				  if (div0Inputs[0+modify].value =='' || div0Inputs[1+modify].value==''){
					  alert( '红色标识的策略属性的值都不可以为空   ！' );
						return  ; 
					}
					else
					{
						saveData+=div0Inputs[0+modify].value+"@"+div0Inputs[1+modify].value
								+"@"+div0Selects[0].value+"@"+div0Inputs[2+modify].value+"@"+div0Inputs[3+modify].value
								+"@"+div0Selects[1].value;
					}
					timesSeqNo = div0Inputs[div0Inputs.length - 1].value;
					timesStandard = div0Selects[2].value;
					if(timesSeqNo != "" && !checkNumFlag(timesSeqNo)){
						return;
					}
					if(div0Selects[1].value == '0')
					{
						saveData += ("@" + timesSeqNo + "@" + timesStandard);
						feeTypeData += ( feeTypeName +"@" + saveData + '&' ) ;
						continue;
					}else{
					/**
						var div1Checkboxs = inDivArray[1].getElementsByTagName("input");
						if(!div1Checkboxs[0].checked && !div1Checkboxs[1].checked  ){
					  		alert( '必须选择一个优惠策略 ！' );
							return  ; 
		
							}
						if(div1Checkboxs[0].checked)
							saveData+= "@"+ div1Checkboxs[0].value;
						else
							saveData+= "@"+ 'no_check';
						
						if(div1Checkboxs[1].checked)
							saveData+= "@"+ div1Checkboxs[1].value;
						else
							saveData+= "@"+ 'no_check';

					 	
						if(div1Checkboxs[2].checked)
							saveData+= "@"+ div1Checkboxs[2].value;
						else
				    **/			
						saveData+= "@"+ 'by_user_type';
						saveData+= "@"+ 'no_check';
						saveData+= "@"+ 'no_check';
					


						var tempSelect = inDivArray[1].getElementsByTagName("select");
						var tempInput = inDivArray[1].getElementsByTagName("input");
						
						var nullYhcl = '<c:out value="${yhcl}"/>';
						var nullIndexId = '<c:out value="${indexYhclId}"/>';
						/**
						if(div1Checkboxs[2].checked)
							saveData+= "@"+ div1Checkboxs[2].value;
						else

					    **/		
						saveData+= "@"+ 'no_check';//套餐策略
						var tempString = "";
						for(var n =0 ; n < tempSelect.length/2 ; n=n+1){
							var num = n*5;  //找到下一个优惠策略的位置
							var nums = n*2; 
							tempString+= "*"+ tempSelect[0+nums].value;
							tempString+= "*"+ tempInput[1+num].value;
							tempString+= "*"+ tempSelect[1+nums].value;
							tempString+= "*"+ tempInput[2+num].value;
							tempString+= "*"+ tempInput[3+num].value;
							tempString+= "*"+ tempInput[4+num].value;

							//alert(nullIndexId);
							if (nullIndexId!='' ) {
								//alert('aaaaaa:'+nullIndexId);
								var realValue = realIndexId-2;
								tempString = tempString + "*" + realValue;//判断是否为修改,如果为修改操作，将修改的行号放到字符串末尾
							}
							else{
								tempString+="*final";
							}
							
							tempString+= ",";
							if (tempInput[1+num].value == null || tempInput[1+num].value == "") {
								alert("第"+(n+1)+"项优惠策略名称不能为空！");
								return;
							}
							if (tempInput[2+num].value == null || tempInput[2+num].value == "") {
								alert("第"+(n+1)+"项优惠计算参数值不能为空！");
								return;
							}


							var sfzh = tempInput[1+num].value;
							sfzh = sfzh.match(/^(\*)|^(\#)/);
							//alert(sfzh);

							if(sfzh!=null){
								alert("第"+(n+1)+"项优惠策略名称包含特殊字符[*,#]，请重新输入！");
								return;
							}
							
							var sfzh = tempInput[2+num].value;
							sfzh = sfzh.match(/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/);

							if(sfzh==null){
								alert("第"+(n+1)+"项优惠计算参数值错误，请输入正实数！");
								return;
							}


							var startT = tempInput[3+num].value;
							var endT = tempInput[4+num].value;
							var start = startT.replace(/-/g,"");
							var end = endT.replace(/-/g,"");
							
							if(Number(end-start)<=0 && end!='' ){
								alert("第"+(n+1)+"项开始时间"+startT+"大于结束时间"+endT+"！");
								return false;
							}

							var realFee = saveData.split("@");
							var realSign = tempSelect[1+nums].value;
							var realVal = tempInput[2+num].value;
							var realFinal = 0;
							//alert(realSign);
							if(realSign == '1'){
								realFinal = parseFloat(realFee[1]) - parseFloat(realVal);
								}
							if(realSign == '2'){
								realFinal = parseFloat(realFee[1]) * parseFloat(realVal);
								}
							if(realSign == '3'){
								realFinal = parseFloat(realFee[1]) / parseFloat(realVal);
								}
							if(realSign == '4'){
								realFinal = parseFloat(realFee[1]) + parseFloat(realVal);
								}

							//alert(realFinal);
							//alert(saveData);

							if(realFinal<0){
								alert("第" + (n+1) + "项优惠策略计算后收费小于零，请重新输入！");
								return false;
							}
								
						}

						
						tempString+="#";
						
						saveData+= "@"+ tempString;//现在的优惠策略信息，拼装
						//原来的优惠策略信息， 不能删除，否则出错
						saveData+= "@"+ "bbb";
						saveData+= "@"+ "ccc";
						saveData += "@" + timesSeqNo;
						saveData += "@" + timesStandard;
						
						/** 
						if(div1Checkboxs[0].checked==true){
							
							saveData+= "@"+ inDivArray[2].getElementsByTagName("select")[0].value;
		 				 var div2Inputs = inDivArray[2].getElementsByTagName("input");
							for(var div2InputsI= 0; div2InputsI < div2Inputs.length;div2InputsI++){
									if(div2Inputs[div2InputsI].value ==''){
										  alert( '红色标识的策略属性的值都不可以为空   ！' );
											return  ; 
									}else{
										saveData+= "@"+ div2Inputs[div2InputsI].value;
									}
								}
								
						}
						if(div1Checkboxs[1].checked==true){
							saveData+= "@"+ inDivArray[3].getElementsByTagName("select")[0].value;
							 var div3Inputs = inDivArray[3].getElementsByTagName("input");
							for(var div3InputsI= 0; div3InputsI < div3Inputs.length;div3InputsI++){
									if(div3Inputs[div3InputsI].value ==''){
										  alert( '红色标识的策略属性的值都不可以为空   ！' );
											return  ; 
									}else{
										saveData+= "@"+ div3Inputs[div3InputsI].value;
									}
								}
								
						}
					
						if(div1Checkboxs[2].checked==true){
							saveData+= "@"+ inDivArray[4].getElementsByTagName("select")[0].value;
							saveData+= "@"+ inDivArray[4].getElementsByTagName("select")[1].value;
							saveData+= "@"+ inDivArray[4].getElementsByTagName("select")[2].value;
							
							 var div4Inputs = inDivArray[4].getElementsByTagName("input");
							for(var div4InputsI= 0; div4InputsI < div4Inputs.length;div4InputsI++){
									if(div4Inputs[div4InputsI].value ==''){
										  alert( '每个策略属性的值都不可以为空 ！' );
											return  ; 
									}else{
										saveData+= "@"+ div4Inputs[div4InputsI].value;
									}
								}
								
						}
					**/	
						
					}
					 feeTypeData += ( feeTypeName +"@" + saveData + '&' ) ;
			 }	 
		 } 	
		 <%
		 	request.getSession().removeAttribute("indexYhclId") ;
		 %>

		 window.dialogArguments.addFeeType(  feeTypeData , realIndexId ,'',  '<%=request.getParameter("feeTypeId") %>'  );	
		 window.close();
	 }


	 function clearNoNum(event,obj){ 
	        //响应鼠标事件，允许左右方向键移动 
	        event = window.event||event; 
	        if(event.keyCode == 37 | event.keyCode == 39){ 
	            return; 
	        } 
	        //先把非数字的都替换掉，除了数字和. 
	        obj.value = obj.value.replace(/[^\d.]/g,""); 
	        //必须保证第一个为数字而不是. 
	        obj.value = obj.value.replace(/^\./g,""); 
	        //保证只有出现一个.而没有多个. 
	        obj.value = obj.value.replace(/\.{2,}/g,"."); 
	        //保证.只出现一次，而不能出现两次以上 
	        obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
	    } 
	    function checkNum(obj){ 
	        //为了去除最后一个. 
	        obj.value = obj.value.replace(/\.$/g,""); 
	    } 
	 
	    function checkNumFlag(value){
	        var flag = true;
			var re = /^[0-9]*[1-9][0-9]*$/;
			if(value.search(re)==-1 || value > 99999){
				alert("序号值输入非法，请输入1~99999之间的整数！");
				flag = false;
			}
			return flag;
	    } 
	    
	    function setPopResult_relativeServiceIds(popResult){
		    var resultPos = popResult.indexOf( '%' );
		    if( resultPos >= 0 ){ 
			    popResult = popResult.substring(0,resultPos);
			 }
			var resultPos = popResult.indexOf( ';' );
			var index = 0;
			var valuesMap = new Array();
			while( resultPos > 0){	
				var item=popResult.substring(0,resultPos);	
				popResult=popResult.substr(resultPos + 1);	var pos2 =item.indexOf('=');	
				var item1 =item.substring(0,pos2);	
				var item2 =item.substr(pos2+1);	
				valuesMap[item1] = item2;	
				resultPos = popResult.indexOf( ';' );
			}	
			document.getElementById( 'relativeServiceIds_helpLabel').value=valuesMap['relativeServiceIds_helpLabel'];	
			document.getElementById( 'relativeServiceIds').value=valuesMap['relativeServiceIds'];

			<%
		 	request.getSession().removeAttribute("editTypeId") ;
			request.getSession().removeAttribute("serviceId") ;	
			request.getSession().removeAttribute("feeTypeId") ;
		   %>
			
	} 

	    String.prototype.startWith = function  ( str ) {
	    	if(str==null||str==''||this.length==0||str.length>this.length)
	    		 return false;
	    	if(this.substr(0,str.length)==str)
	    		 return true;
	    	else
	    		return false; 
	        return true; 
	    }  
	    
		
</script>

  </head>
  
  <body>
  <form name="userForm" action="" method="post" enctype="multipart/form-data">
  		<input type="hidden" name = "feeTypeName" id = "feeTypeName" value="<%=request.getParameter("feeTypeName") %>"  />
    	<div id ="monthFeeType" >
			   <div id="month1">
			     <table width="100%"  border="0" cellspacing="0" cellpadding="0">
			    	<tr> 
			    		<td>
			    		  <div id="month"  style="display:block" > 
			       			<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
			         			<tr> 
								  <td width="6" height="25"><img src="<%= path%>/common/images/bar_left.gif" width="31" height="23"></td>
								  <td width="100%" background="<%= path%>/common/images/bar_bg.gif"><span class="L style2">按次收费策略信息定义
								  		<c:if test="${ timeFeeType.OPER !=   'modify' }"><input type = 'button' onclick="delFeeType(  'month1'    )"  value='删除' /></c:if>   </span></td>
								  <td width="6" align="right"><img src="<%= path%>/common/images/bar_right.gif" width="9" height="23"></td>
						   		</tr>
			         			<tr>
			           				<td colspan="3">
				           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
				             				<tr>
				              					<td bgcolor="F3F6FF">                    
				              						<table width="100%" border="0" cellspacing="0" cellpadding="3">
				    
					
					<tr>
						
						<td width="12%" align="right">
							商品名称
						</td>
						<td width="37%" colspan="1">
							<input type="text" name="month_commodity_name_month1" id="month_commodity_name_month1" value="<c:out value="${timeFeeType.commodity_name }" />" size="30" maxlength="50"/>
						    1~50个字符(字母、数字、特殊符号)<font color="#FF0000">*</font>
						</td>
						
						<td width="12%" align="right">
							价格
						</td>
						<td width="37%" colspan="1">
							<input type="text" name="month_price_month1" value="<c:out value="${timeFeeType.price}" />" size="30" maxlength="300" onKeyUp="clearNoNum(event,this)" onBlur="checkNum(this)"/>(元)
						    1~300个字符(数字、小数点),数字开头<font color="#FF0000">*</font>
						</td>
						
					</tr>
					 
					<tr>
						 <td width="12%" align="right">
							退费顺延方式
						</td>
						<td width="37%" colspan="1">
							<select name="month_stop_postphone_month1" >
								
								<option <c:if test="${  timeFeeType.stop_postphone   eq 2  }"> selected="selected" </c:if>  value="2">不退费</option>
								<option  <c:if test="${ timeFeeType.stop_postphone   eq 0  }"> selected="selected" </c:if> value="0">退费顺延</option>
								<option <c:if test="${  timeFeeType.stop_postphone  eq 1  }"> selected="selected" </c:if>  value="1">退费不顺延</option>
								
							</select>
						   
						</td>
						<td width="12%" align="right">
							依赖策略
						</td>
						<td width="37%" colspan="1">
							<input type="hidden" id="relativeServiceIds" name="relativeServiceIds" value="<c:out value="${timeFeeType.relFeeTypeId }" />"/>
							<input type="text"  id="relativeServiceIds_helpLabel" name="relativeServiceIds_helpLabel"  value="<c:out value="${timeFeeType.relFeeTypeName }" />"  onkeypress=" event.returnValue = false "   size="30" maxlength="50" /> 
							<input type="button" name="popSelect" id="popSelect" value="..." onclick="window.open( '<%=request.getContextPath()%>/jsp/boss/charge/productRelServ.do?methodToCall=openQuery&editTypeId=relativeServiceIds&serviceId=<%=request.getParameter("serviceId") %>&feeTypeId=<%=request.getParameter("feeTypeId") %>' , 
									'依赖策略','top='+((screen.availHeight)/2-(600/2))+',left='+((screen.availWidth)/2-(800/2))+',width=900,height=600px,status=0,scroll=no');" />
									
							 可以按退格键清除依赖策略
						</td>
						
						
					</tr>
					<tr>
						<td width="12%" align="right">
							优惠方式
						</td>
						<td width="37%" colspan="1">
							<select name="month_rebate_type_month1"  onchange="showDiscountPolicy( this.options[this.selectedIndex].value, 'month' , 'month1')" >
								<option  <c:if test="${timeFeeType.rebate_type eq 0  }"> selected="selected" </c:if> value="0">不优惠</option>
								<option  <c:if test="${ timeFeeType.rebate_type eq 2  }"> selected="selected" </c:if>  value="2">服务优惠</option>
							</select> 
						</td>
						<td width="12%" align="right">
							序号
						</td>
						<td width="37%" colspan="1">
							<input type="text" name="month_service_timesSeqNo" 
							<c:if test="${ timeFeeType.timesSeqNo != 0 }">value="<c:out value="${ timeFeeType.timesSeqNo}"/>"</c:if>
							<c:if test="${ timeFeeType.timesSeqNo == 0 }">value="<c:out value=""/>"</c:if> size="30" maxlength="9"  onKeyUp="clearNoNum(event,this)"/>
						            请输入1~99999之间的整数
						</td>
					</tr>
					<tr>
						<td width="12%" align="right">
							是否为标准策略
						</td>
						<td width="37%" colspan="1">
							<select name="month_service_timesStandard"  id = "month_service_timesStandard">
								<option  <c:if test="${ timeFeeType.timesStandard eq 0  }"> selected="selected" </c:if> value="0">否</option>
								<option  <c:if test="${ timeFeeType.timesStandard eq 1  }"> selected="selected" </c:if>  value="1">是</option>
							</select> 
						</td>
					</tr>
					
				                					</table>
				               					</td>
				              				</tr>
				          				</table>
				          			</td>
				        		</tr>
				       		</table>
				       	  </div>
				      	</td>
				    </tr>
				    
				 </table>  
				
				<table width="100%"  border="0" cellspacing="0" cellpadding="0">
			    	<tr> 
			    		<td>
			    		  <div id="month_discount_policy_month1"  style="display:none" > 
			       			<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
			         			<tr> 
								  <td width="6" height="25"><img src="<%= path%>/common/images/bar_left.gif" width="31" height="23"></td>
								  <td width="100%" background="<%= path%>/common/images/bar_bg.gif"><span class="L style2">按月收费优惠策略信息定义</span></td>
								  <td width="6" align="right"><img src="<%= path%>/common/images/bar_right.gif" width="9" height="23"></td>
						   		</tr>
			         			<tr>
			           				<td colspan="3">
				           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
				             				<tr>
				              					<td bgcolor="F3F6FF">                    
				              						<table width="100%" border="0" cellspacing="0" cellpadding="3">
				    
															<tr>
																<td colspan="12">
																	<input type="button" id="addDiscountButton1" name="增加优惠策略" value="增加优惠策略" onclick="addProperty(this)"/>
																</td>
															</tr>
															<tr class="selids">
																<td>
																	<table class="tableBorder">
																		<tr><th>策略适用范围</th>
																		  	<th>优惠策略名称</th>
																		  	<th>优惠计算方式</th>
																		  	<th>优惠计算参数值</th>
																		  	<th>生效时间</th>
																		  	<th>失效时间</th>
																	  		<th>操作</th>
																	    </tr>
																		
																		<c:forEach var="yhclT" items="${yhcl }" varStatus="i">
																		
																			<tr id="action1_row">
																			<td >
																				<select name="month_by_user_type<c:out value="${ index }"/>_month1"  id = "" onchange=""  >
																						<option <c:if test="${ yhclT.userd_scope eq 1  }"> selected="selected" </c:if>  value="1">指定用户</option>
																						<option <c:if test="${ yhclT.userd_scope eq 0  }"> selected="selected" </c:if>  value="0">全部用户</option>
																				</select> 
																			</td>
																			<td>
																				<input type="text" name="month_by_user_type" id="month_by_user_type" value="${yhclT.name}"/>
																				<!-- <input type="text" name="month_by_user_type<c:out value="${ index }"/>_month1" value=""/> -->
																			</td>
																			<td>
																				<select name="month_by_user_type<c:out value="${ index }"/>_month1"  id = "" onchange="" >
																					<option <c:if test="${ yhclT.compute_mode eq 1  }"> selected="selected" </c:if>  value="1">减</option>
																					<option <c:if test="${ yhclT.compute_mode eq 2  }"> selected="selected" </c:if>  value="2">乘</option>
																					<option <c:if test="${ yhclT.compute_mode eq 3  }"> selected="selected" </c:if>  value="3">除</option>
																					<option <c:if test="${ yhclT.compute_mode eq 4  }"> selected="selected" </c:if>  value="4">加</option>
																				</select> 
																			</td>
																			<td>
																				<input type="text" name="month_by_user_type<c:out value="${ index }"/>_month1" value="${ yhclT.compute_param}"/>
																			</td>
																			<td>
																				<input type='text' onfocus="WdatePicker()" value="<c:out value="${ yhclT.effective_date}"/>" name="month_by_user_type<c:out value="${ index }"/>_month1" class='Wdate'></input>
																			</td>
																			<td>
																				<input type='text' onfocus="WdatePicker()" value="${ yhclT.expiry_date}" name="month_by_user_type<c:out value="${ index }"/>_month1" class='Wdate'></input>
																			</td>
																			<td>
																				<input type="button" name="删除" value="删除" onclick="deleteItem2(this)"/>
																			</td>
																			</tr>
																		</c:forEach>
																		
																		
																		<c:if test="${yhcl eq null }">
																		<tr id="action1_row">
																		<td >
																			
																			<select name="month_by_user_type<c:out value="${ index }"/>_month1"  id = "" onchange="" >
																				<option  value="1">指定用户</option>
																				<option  value="0">全部用户</option>
																			</select> 
<%--															之前优惠策略实现的代码					--%>
<%--																		   <input name="month_discountPolicyDefineId_month1" id= "month_by_user_type_value_month1"  type="checkbox" checked = "checked"--%>
<%--																		   		 onclick = "showDiscountDiv(  document.getElementsByName( 'month_discountPolicyDefineId_month1' ) , 'month' , 'false' , 'month1')" value="by_user_type"   />按用户类型优惠--%>
										<%--								   <input name="month_discountPolicyDefineId_month1" id= "month_by_equ_type_value_month1"  type="checkbox" <c:if test="${ monthFeeType.equFeeType eq 'equFeeType' }"> checked = "checked" </c:if>--%>
										<%--								   		 onclick = "showDiscountDiv(  document.getElementsByName( 'month_discountPolicyDefineId_month1' ) , 'month' , 'false' , 'month1')" value="by_equ_type"   />按终端类型优惠--%>
										<%--								   <!-- --%>
										<%--								   <input name="month_discountPolicyDefineId_month1" id= "month_by_data_rights_value_month1"  type="checkbox" <c:if test="${ dataRightsFeeType eq 'dataRightsFeeType' }"> checked = "checked" </c:if>--%>
										<%--								   		 onclick = "showDiscountDiv(  document.getElementsByName( 'month_discountPolicyDefineId_month1' ) , 'month' , 'false' , 'month1')" value="by_data_rights"   />按操作员优惠--%>
										<%--								   	 -->--%>
										<%--							   	   <font color="#FF0000">*</font>--%>
																		</td>
																		<td>
																			<input type="text" name="month_by_user_type" id="month_by_user_type" value=""/>
																			<!-- <input type="text" name="month_by_user_type<c:out value="${ index }"/>_month1" value=""/> -->
																		</td>
																		<td>
																			<select name="month_by_user_type<c:out value="${ index }"/>_month1"  id = "" onchange="" >
																				<option  value="1">减</option>
																				<option  value="2">乘</option>
																				<option  value="3">除</option>
																				<option  value="4">加</option>
																			</select> 
																		</td>
																		<td>
																			<input type="text" name="month_by_user_type<c:out value="${ index }"/>_month1" value="0.0"/>
																		</td>
																		<td>
																			<input type='text' onclick='WdatePicker()' value="<%=strDate %>" name="month_by_user_type<c:out value="${ index }"/>_month1" class='Wdate'></input>
																		</td>
																		<td>
																			<input type='text' onclick='WdatePicker()' value="" name="month_by_user_type<c:out value="${ index }"/>_month1" class='Wdate'></input>
																		</td>
																		<td>
																			<input type="button" name="删除" value="删除" onclick="deleteItem(this)"/>
																		</td>
																	</tr>
																	</c:if>
																	</table>
																
																</td>
															</tr>
				                					</table>
				               					</td>
				              				</tr>
				          				</table>
				          			</td>
				        		</tr>
				       		</table>
				       	  </div>
				      	</td>
				    </tr>
				    
				 </table>  
			
				<table width="100%"  border="0" cellspacing="0" cellpadding="0">
			    	<tr> 
			    		<td>
			    		  <div id="month_by_user_type_month1"  style="display:none" > 
			       			<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
			         			<tr> 
								  <td width="6" height="25"><img src="<%= path%>/common/images/bar_left.gif" width="31" height="23"></td>
								  <td width="100%" background="<%= path%>/common/images/bar_bg.gif"><span class="L style2">用户类型按月收费优惠策略信息定义</span></td>
								  <td width="6" align="right"><img src="<%= path%>/common/images/bar_right.gif" width="9" height="23"></td>
						   		</tr>
			         			<tr>
			           				<td colspan="3">
				           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
				             				<tr>
				              					<td bgcolor="F3F6FF">                    
				              						<table width="100%" border="0" cellspacing="0" cellpadding="3">
				              						 <c:choose>
				              							<c:when test="${ fn:length(sessionScope.userTypeParaList)    eq 0 }">
				              							    <tr>
						
																<td width="12%" align="right">
																	提示：
																</td>
																<td width="37%" colspan="1">
																   <font color = 'red'  >请在系统管理中的参数配置中增加用户类型参数</font>
																</td>
															</tr>
				              							
				              							</c:when>
				              							<c:when test="${fn:length(sessionScope.userTypeParaList)   > 0  }">
				              								<tr >
				              									   <td width="12%" align="right">
																		优惠模式
																	</td>
																	<td width="37%" colspan="1">
																		<select name="month_policy_pattern_month1" >
																			<option <c:if test="${ timeFeeType.userTypePattern eq 2  }"> selected="selected" </c:if> value="2">封顶</option>
																			<option <c:if test="${ timeFeeType.userTypePattern eq 1  }"> selected="selected" </c:if>  value="1">打折</option>
																		</select>
																	   
																	</td>
				              								
				              								  </tr>
				              								<c:forEach var="userPara" items="${sessionScope.userTypeParaList}" varStatus="index">
																<tr>
																	<td width="12%" align="right">
																		<c:out value="${userPara.name}"></c:out>
																	</td>
																	<td width="37%" colspan="1">
																		<input type="text" name="month_by_user_type<c:out value="${ index }"/>_month1" value="<c:out value="${ timeFeeType.userTypeCodeValueMap[userPara.value] }"></c:out>" size="30" maxlength="300" onKeyUp="clearNoNum(event,this)" onBlur="checkNum(this)"/>
																		 1~300个字符(数字、小数点),数字开头<font color="#FF0000">*</font>
																	</td>
																</tr>
															</c:forEach>
				              							</c:when>
				              						 </c:choose>	
				                					</table>
				               					</td>
				              				</tr>
				          				</table>
				          			</td>
				        		</tr>
				       		</table>
				       	  </div>
				      	</td>
				    </tr>
				    
				 </table>  
				
			
				<table width="100%"  border="0" cellspacing="0" cellpadding="0">
			    	<tr> 
			    		<td>
			    		  <div id="month_by_equ_type_month1"  style="display:none" > 
			       			<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
			         			<tr> 
								  <td width="6" height="25"><img src="<%= path%>/common/images/bar_left.gif" width="31" height="23"></td>
								  <td width="100%" background="<%= path%>/common/images/bar_bg.gif"><span class="L style2">终端类型按月收费优惠策略信息定义</span></td>
								  <td width="6" align="right"><img src="<%= path%>/common/images/bar_right.gif" width="9" height="23"></td>
						   		</tr>
			         			<tr>
			           				<td colspan="3">
				           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
				             				<tr>
				              					<td bgcolor="F3F6FF">                    
				              						<table width="100%" border="0" cellspacing="0" cellpadding="3">
				    
													   <c:choose>
				              							<c:when test="${ fn:length(sessionScope.equTypeParaList) eq 0 }">
				              							    <tr>
						
																<td width="12%" align="right">
																	提示：
																</td>
																<td width="37%" colspan="1">
																   <font color = 'red'  >请在系统管理中的参数配置中增加终端类型参数</font>
																</td>
															</tr>
				              							
				              							</c:when>
				              							<c:when test="${ fn:length(sessionScope.equTypeParaList)   > 0  }">
				              								<tr >
				              									   <td width="12%" align="right">
																		优惠模式
																	</td>
																	<td width="37%" colspan="1">
																		<select name="month_equ_type_policy_pattern_month1" >
																			<option <c:if test="${ timeFeeType.equTypePattern eq 2  }"> selected="selected" </c:if> value="2">封顶</option>
																			<option <c:if test="${ timeFeeType.equTypePattern eq 1  }"> selected="selected" </c:if> value="1">打折</option>
																	  </select>
																	   
																	</td>
				              								
				              								  </tr>
				              								<c:forEach var="equPara" items="${ sessionScope.equTypeParaList }" varStatus="index">
																<tr>
																	<td width="12%" align="right">
																		<c:out value="${equPara.name}"></c:out>
																	</td>
																	<td width="37%" colspan="1">
																		<input type="text" name="month_by_equ_type<c:out value="${ index }"/>_month1" value="<c:out value="${ timeFeeType.equTypeCodeValueMap[  equPara.value ] }"></c:out>" size="30" maxlength="300" onKeyUp="clearNoNum(event,this)" onBlur="checkNum(this)"/>
																		 1~300个字符(数字、小数点),数字开头<font color="#FF0000">*</font>
																	</td>
																</tr>
															</c:forEach>
				              							</c:when>
				              						 </c:choose>	
				                					</table>
				               					</td>
				              				</tr>
				          				</table>
				          			</td>
				        		</tr>
				       		</table>
				       	  </div>
				      	</td>
				    </tr>
				    
				 </table>  
				 
				<!--   
				  <table width="100%"  border="0" cellspacing="0" cellpadding="0">
			    	<tr> 
			    		<td>
			    		  <div id="month_by_data_rights_month1"  style="display:none" > 
			       			<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
			         			<tr> 
								  <td width="6" height="25"><img src="<%= path%>/common/images/bar_left.gif" width="31" height="23"></td>
								  <td width="100%" background="<%= path%>/common/images/bar_bg.gif"><span class="L style2">操作员套餐包月收费优惠策略信息定义</span></td>
								  <td width="6" align="right"><img src="<%= path%>/common/images/bar_right.gif" width="9" height="23"></td>
						   		</tr>
			         			<tr>
			           				<td colspan="3">
				           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
				             				<tr>
				              					<td bgcolor="F3F6FF">                    
				              						<table width="100%" border="0" cellspacing="0" cellpadding="3">
				    
													   <c:choose>
				              							<c:when test="${ fn:length(sessionScope.dataGroupList) eq 0 }">
				              							    <tr>
						
																<td width="12%" align="right">
																	提示：
																</td>
																<td width="37%" colspan="1">
																   <font color = 'red'  >没有增加任何用户权限组</font>
																</td>
															</tr>
				              							
				              							</c:when>
				              							<c:when test="${ fn:length(sessionScope.dataGroupList)   > 0  }">
				              							 <tr >
				              									   <td width="12%" align="right">
																		优惠类型
																	</td>
																	<td width="37%" colspan="1">
																		<select name="month_data_rights_policy_type_month1" >
																			<option <c:if test="${ dataRightsType eq 0  }"> selected="selected" </c:if> value="0">固定</option>
																			<option <c:if test="${ dataRightsType  eq 1  }"> selected="selected" </c:if> value="1">可选</option>
																		</select>
																	   
																	</td>
				              								
				              								  </tr>
				              								  <tr >
				              									   <td width="12%" align="right">
																		优惠方式
																	</td>
																	<td width="37%" colspan="1">
																		<select name="month_data_rights_policy_model_month1" >
																			<option <c:if test="${ dataRightsModel eq 0  }"> selected="selected" </c:if> value="0">折上折 </option>
																			<option <c:if test="${ dataRightsModel  eq 1  }"> selected="selected" </c:if> value="1">折扣覆盖</option>
																		</select>
																	   
																	</td>
				              								
				              								  </tr>
				              								<tr >
				              									   <td width="12%" align="right">
																		优惠模式
																	</td>
																	<td width="37%" colspan="1">
																		<select name="month_data_rights_policy_pattern_month1" >
																			<option <c:if test="${ dataRightsPattern eq 1  }"> selected="selected" </c:if> value="1">打折</option>
																			<option <c:if test="${ dataRightsPattern  eq 2  }"> selected="selected" </c:if> value="2">封顶</option>
																		</select>
																	   
																	</td>
				              								
				              								  </tr>
				              								<c:forEach var="dataRights" items="${ sessionScope.dataGroupList }" varStatus="index">
																<tr>
																	<td width="12%" align="right">
																		<c:out value="${dataRights.name}"></c:out>
																	</td>
																	<td width="37%" colspan="1">
																		<input type="text" name="month_by_data_rights<c:out value="${ index }"/>_month1" value="<c:out value="${ dataRightsIdNameMap[  dataRights.id  ] }"></c:out>" size="30" maxlength="50" onKeyUp="clearNoNum(event,this)" onBlur="checkNum(this)"/>
																	</td>
																</tr>
															</c:forEach>
				              							</c:when>
				              						 </c:choose>	
				                					</table>
				               					</td>
				              				</tr>
				          				</table>
				          			</td>
				        		</tr>
				       		</table>
				       	  </div>
				      	</td>
				    </tr>
				    
				 </table> 
			 -->	 
				 
			   </div>
		</div>	
		 <table width="30%" border="0" cellspacing="0" cellpadding="0">
				 <tr align='center'> 
				 	 <c:if test="${ timeFeeType.OPER !=   'modify' }"> <app:button title="增加" image="" function="addFeeType()"/></c:if>
				 	 <app:button title="保存" image="" function="saveFeeType()"/>
				 	 <app:button title="关闭" image="" function="window.self.close()"/>
				 </tr>
		</table>
   </form> 
     <script type="text/javascript">
   		var intiRebateType = document.getElementById("month_rebate_type_month1").value ;
		showDiscountPolicy(  intiRebateType , 'month' , 'month1'); 


		//删除所选项
		function deleteItem(ids){
			$(ids).parent().parent().remove();	
		}

		//删除所选项
		function deleteItem2(ids){
			var yhclDG = '<c:out value="${yhclDG}"/>';
			//alert(yhclDG);

			if(yhclDG==0){
				$(ids).parent().parent().remove();
			}
			else{
				alert("已发布的服务优惠策略，不能进行删除操作！");
			}
		}
		
		//增加优惠策略
		var currentActionIndex=0; 
		
		function addProperty(ids){ 
			//document.getElementById('yhcl')
			var actionTableTemp = $(ids).parent().parent().next().find(".tableBorder");

			var actionTable = actionTableTemp[0];
	
			var perNum=actionTable.rows.length;
			var newActionIndex = currentActionIndex ++  ; 
			
			newRow1=actionTable.insertRow(actionTable.rows.length); 
			newRow1.id = 'action' + perNum + '_row' ; 
			
			c1=newRow1.insertCell(0);  
			c1.innerHTML="<select name='name"+newActionIndex+"' id='name"+newActionIndex+"'><option  value='1'>指定用户</option><option  value='0'>全部用户</option></select> ";
			
			c2=newRow1.insertCell(1);
			c2.innerHTML="<input type='text' name='discountName' value=''/>";
			
			c3=newRow1.insertCell(2);
			c3.innerHTML="<select name=''  id = '' onchange='' >"+
							"<option  value='1'>减</option>"+
			 				"<option  value='2'>乘</option>"+
			 				"<option  value='3'>除</option>"+
			 				"<option  value='4'>加</option>"+
			 				"</select> ";
	
			c4=newRow1.insertCell(3);
			c4.innerHTML="<input type='text' name='discountName' value='0.0'/>";
			
			c5=newRow1.insertCell(4);
			c5.innerHTML="<input type='text' onclick='WdatePicker()' value='<%=strDate %>' name='' class='Wdate'></input>";
	
			c6=newRow1.insertCell(5);
			c6.innerHTML="<input type='text' onclick='WdatePicker()' value='' name='' class='Wdate'></input>";
	
			c7=newRow1.insertCell(6);
			c7.innerHTML="<input type='button' id='' name='删除' value='删除' onclick='deleteItem(this)'/>";
		
		}
		 <%
		 	request.getSession().removeAttribute("yhcl") ;
			request.getSession().removeAttribute("indexId") ;	
			
		 %>
		
   </script>
  </body>
</html>
