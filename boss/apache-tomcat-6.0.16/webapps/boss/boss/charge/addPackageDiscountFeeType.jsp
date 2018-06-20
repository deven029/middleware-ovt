<%@ page language="java"   pageEncoding="UTF-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/common/taglib/fn.tld" prefix="fn"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ page isELIgnored = "false" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

response.setHeader("Pragma","No-cache"); 
response.setHeader("Cache-Control","no-cache"); 
response.setDateHeader("Expires", 0); 
%>
<html>
  <head>
    
    <title>套餐包月收费策略信息定义</title>
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/tabs.css" />
		<link href="<%=request.getContextPath()%>/common/css/zi.css" rel="stylesheet" type="text/css"/>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/jquery/themes/default/easyui.css"/>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/jquery/themes/icon.css"/>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%><%= path%>/charge/table.css"   />
	
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
					
        	 // document.getElementById( 'showDiv' ).innerText =newFeeType.innerHTML;
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
			  if(  value != '0' &&  value != '2' ){   
				  showDiscountDiv(  document.getElementsByName(''+feeTypeId+'_discountPolicyDefineId_'+postPrex  ) ,  feeTypeId  , 'false', postPrex   ) ;   
			      document.getElementById( ''+feeTypeId+'_discount_policy_'+postPrex ).style.display = 'block' ;  
			  }else{    
				  showDiscountDiv(  document.getElementsByName(''+feeTypeId+'_discountPolicyDefineId_'+postPrex ) ,  feeTypeId  , true , postPrex ) ;   
				  document.getElementById( ''+feeTypeId+'_discount_policy_'+postPrex  ).style.display = 'none' ;    	
			 }
        } 

		/**
			显示优惠策略 的 DIV 
		*/
	  function showDiscountDiv( checkBoxName , feeTypeId , force ,  postPrex   ) {     
		  var checkobj;   
		  for( var i = 0 ; i < checkBoxName.length ; i ++ ) {   
			   checkobj=checkBoxName[i].value; if ( checkobj =='' ) 
				   continue;  checkobj = feeTypeId +'_'+ checkobj +'_'+ postPrex  ;  
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
		 var inDivArray ;
		 var divArray = document.getElementById("monthFeeType").getElementsByTagName("div") ;//获取所有 DIV
		 var tagName  ;
		 var saveData = '' , and = '' , element_value = ''  , feeTypeData = ''; 
		 var index = 1 ;//每种计费策略的序号 
		 var feeTypeName  = document.getElementById('feeTypeName').value ;
		 var realIndexId = '<c:out value="${indexId}"/>' ;  
		 var disSeqNo = "";
			
		 for ( var i = 0 ; i <divArray.length ; i ++ )
		 {
			 if(divArray[i].id != 'month'+index)
				 {
				 	continue;

				 }
			 index++;
			 saveData = '';
			 inDivArray = divArray[i].getElementsByTagName("div") ;
			 var modify = 0;
			 if ( realIndexId == '' ){
					modify = 1
				 } 
			  var div0Inputs = inDivArray[0].getElementsByTagName("input");
     			var div0Selects = inDivArray[0].getElementsByTagName("select");
			  if (div0Inputs[0+modify].value =='' || div0Inputs[1+modify].value==''|| div0Inputs[2+modify].value==''){
				  alert( '每个策略属性的值都不可以为空 ！' );
					return  ; 
				}
				else
				{
					saveData+=div0Inputs[0+modify].value+"@"+div0Selects[0].value
							+"@"+div0Selects[1].value+"@"+div0Inputs[1+modify].value
							+"@"+div0Inputs[2+modify].value+"@"+div0Selects[2].value+"@"+div0Selects[3].value+"@"+div0Selects[4].value;
				}
				disSeqNo = div0Inputs[div0Inputs.length-1].value;
				if(disSeqNo != "" && !checkNumFlag(disSeqNo)){
					return;
				}
				if(div0Selects[4].value == '0' || div0Selects[4].value == '2' )
				{
					saveData += "@" + disSeqNo;
					feeTypeData += ( feeTypeName +"@" + saveData + '&' ) ;
					continue;
				}else{
					var div1Checkboxs = inDivArray[1].getElementsByTagName("input");
					if(!div1Checkboxs[0].checked && !div1Checkboxs[1].checked && !div1Checkboxs[2].checked ){
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

					/**
					if(div1Checkboxs[2].checked)
						saveData+= "@"+ div1Checkboxs[2].value;
					else
						
				   **/	
						saveData+= "@"+ 'no_check';
					
					if(div1Checkboxs[0].checked==true){
						
						saveData+= "@"+ inDivArray[2].getElementsByTagName("select")[0].value;
	 				 var div2Inputs = inDivArray[2].getElementsByTagName("input");
						for(var div2InputsI= 0; div2InputsI < div2Inputs.length;div2InputsI++){
								if(div2Inputs[div2InputsI].value ==''){
									  alert( '每个策略属性的值都不可以为空 ！' );
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
									  alert( '每个策略属性的值都不可以为空 ！' );
										return  ; 
								}else{
									saveData+= "@"+ div3Inputs[div3InputsI].value;
								}
							}
							
					}

				/**
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
					saveData += "@" + disSeqNo;
				}
				 feeTypeData += ( feeTypeName +"@" + saveData + '&' ) ;
			 
		 } 	
		  opener.addFeeType(  feeTypeData  , realIndexId  ,    <%=request.getParameter("feeTypeId") %>   );	
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
	  function limitChargeMonth( value  , prefix) {  
		  
		  	if ( value == '1' ){  		
			  	document.getElementById('package_discount_charge_months_'+prefix).value = '1'; 	    
			  	document.getElementById('package_discount_charge_months_'+prefix).disabled = true ; 	
			}else if ( value == '2' ){  	
					document.getElementById('package_discount_charge_months_'+prefix).value = '3'; 	  
				    document.getElementById('package_discount_charge_months_'+prefix).disabled = true ; 	
		    }else if ( value == '3' ){  	
			    	document.getElementById('package_discount_charge_months_'+prefix).value = '12'; 	   
			        document.getElementById('package_discount_charge_months_'+prefix).disabled = true ; 	
			}else {	   
				    document.getElementById('package_discount_charge_months_'+prefix).value = '' ; 	
			     	document.getElementById('package_discount_charge_months_'+prefix).disabled = false ;		
			  }
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
								  <td width="100%" background="<%= path%>/common/images/bar_bg.gif"><span class="L style2">套餐包月收费策略信息定义
								  		<c:if test="${ OPER !=   'modify' }">
								  			<input type = 'button' onclick="delFeeType(  'month1'    )"  value='删除' />
								  		</c:if>  
								  		
								  		</span>
								  	</td>
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
							<input type="text" name="package_discount_commodity_name_month1" id="package_discount_commodity_name" value="<c:out value="${packageFeeType.commodity_name }" />" size="30" maxlength="50"/>
						   
						</td>
						
						<td width="12%" align="right">
							读订方式
						</td>
						<td width="37%" colspan="1">
							<select name="package_discount_reorder_type_month1" >
									<option <c:if test="${ packageFeeType.reOrder_type eq 1  }"> selected="selected" </c:if> value="1">本策略续订</option>
									<option <c:if test="${ packageFeeType.reOrder_type eq 0  }"> selected="selected" </c:if> value="0">不续订</option>
							</select>
						   
						</td>
						
					</tr>
					
					<tr>
						
						<td width="12%" align="right">
							计费模式
						</td>
						<td width="37%" colspan="1">
							<select  name="package_discount_charge_pattern_month1"    onchange="limitChargeMonth(this.options[this.selectedIndex].value,'month1')" >
									<option <c:if test="${ packageFeeType.charge_pattern eq 1  }"> selected="selected" </c:if>  value="1">包月</option>
									<option <c:if test="${ packageFeeType.charge_pattern eq 2  }"> selected="selected" </c:if> value="2">包季</option>
									<option <c:if test="${ packageFeeType.charge_pattern eq 3  }"> selected="selected" </c:if>  value="3">包年</option>
									<option <c:if test="${ packageFeeType.charge_pattern eq 4  }"> selected="selected" </c:if>  value="4">包多月</option>
							</select>  
						   
						</td>
						
						<td width="12%" align="right">
							计费值
						</td>
						<td width="37%" colspan="1">
							<input type="text" name="package_discount_charge_value_month1" value="<c:out value="${packageFeeType.charge_value }" />" size="30" maxlength="50" onKeyUp="clearNoNum(event,this)" onBlur="checkNum(this)" />元
						   
						</td>
						
					</tr>
					
					<tr>
						
						<td width="12%" align="right">
							授权月数
						</td>
						<td width="37%" colspan="1">
							<input type="text" name="package_discount_charge_months_month1"  
									<c:if test="${ OPER !=   'modify' }"> value="1"  </c:if> 
									<c:if test="${ OPER eq   'modify' }"> value="<c:out value="${ packageFeeType.charge_months }" />" </c:if>  size="30" maxlength="50" onKeyUp="clearNoNum(event,this)" onBlur="checkNum(this)" />(个月)
						   
						</td>
						
						<td width="12%" align="right">
							生效方式
						</td>
						<td width="37%" colspan="1">
							<select name="package_discount_activate_type_month1" >
								<option <c:if test="${ packageFeeType.activate_type eq 0  }"> selected="selected" </c:if>   value="0">即时生效</option>
								<option <c:if test="${ packageFeeType.activate_type eq 1  }"> selected="selected" </c:if>  value="1">下月生效</option>
							</select>
						   
						</td>
						
					</tr>
 					
					
					<tr>
						 <td width="12%" align="right">
							退费顺延方式
						</td>
						<td width="37%" colspan="1">
							<select name="month_stop_postphone_month1" >
								<option  <c:if test="${ packageFeeType.stop_postphone eq 0  }"> selected="selected" </c:if> value="0">退费顺延</option>
								<option <c:if test="${packageFeeType.stop_postphone  eq 1  }"> selected="selected" </c:if>  value="1">退费不顺延</option>
								<option <c:if test="${ packageFeeType.stop_postphone  eq 2  }"> selected="selected" </c:if>  value="2">不退费</option>
							</select>
						   
						</td>
						<td width="12%" align="right">
							优惠方式
						</td>
						<td width="37%" colspan="1">
							<select name="month_rebate_type_month1"  id = "month_rebate_type_month1" onchange="showDiscountPolicy( this.options[this.selectedIndex].value, 'month' , 'month1')" >
								<option  <c:if test="${ packageFeeType.rebate_type eq 0  }"> selected="selected" </c:if> value="0">不优惠</option>
								<option  <c:if test="${ packageFeeType.rebate_type eq 1  }"> selected="selected" </c:if>  value="1">套餐优惠</option>
								<option  <c:if test="${ packageFeeType.rebate_type eq 2  }"> selected="selected" </c:if>  value="2">服务优惠</option>
								<option  <c:if test="${ packageFeeType.rebate_type eq 3  }"> selected="selected" </c:if>  value="3">双重优惠</option>
							</select> 
						</td>
						
					</tr>
					<tr>
						<td width="12%" align="right">
							序号
						</td>
						<td width="37%" colspan="1">
							<input type="text" name="month_service_disSeqNo" 
							<c:if test="${ packageFeeType.disSeqNo != 0  }">value="<c:out value="${ packageFeeType.disSeqNo}"/>"</c:if>
							<c:if test="${ packageFeeType.disSeqNo == 0 }">value="<c:out value=""/>"</c:if> size="30" maxlength="9"  onKeyUp="clearNoNum(event,this)"/>
						            请输入1~99999之间的整数
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
								  <td width="100%" background="<%= path%>/common/images/bar_bg.gif"><span class="L style2">套餐包月收费优惠策略信息定义</span></td>
								  <td width="6" align="right"><img src="<%= path%>/common/images/bar_right.gif" width="9" height="23"></td>
						   		</tr>
			         			<tr>
			           				<td colspan="3">
				           				<table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
				             				<tr>
				              					<td bgcolor="F3F6FF">                    
				              						<table width="100%" border="0" cellspacing="0" cellpadding="3">
				    
					
					<tr>
						
						<td width="25%" align="right">
							按月收费优惠策略名称
						</td>
						<td width="75%" colspan="1">
							   <input name="month_discountPolicyDefineId_month1" id= "month_by_user_type_value_month1"  type="checkbox" <c:if test="${ userFeeType eq 'userFeeType' }"> checked = "checked" </c:if>
							   		onclick = "showDiscountDiv(  document.getElementsByName( 'month_discountPolicyDefineId_month1' ) , 'month' , 'false' , 'month1')" value="by_user_type"   />按用户类型优惠
							   <input name="month_discountPolicyDefineId_month1" id= "month_by_equ_type_value_month1"  type="checkbox" <c:if test="${ equFeeType eq 'equFeeType' }"> checked = "checked" </c:if>
							   		 onclick = "showDiscountDiv(  document.getElementsByName( 'month_discountPolicyDefineId_month1' ) , 'month' , 'false' , 'month1')" value="by_equ_type"   />按终端类型优惠
								<!-- 		    
							    <input name="month_discountPolicyDefineId_month1" id= "month_by_data_rights_value_month1"  type="checkbox" <c:if test="${ dataRightsFeeType eq 'dataRightsFeeType' }"> checked = "checked" </c:if>
							   		 onclick = "showDiscountDiv(  document.getElementsByName( 'month_discountPolicyDefineId_month1' ) , 'month' , 'false' , 'month1')" value="by_data_rights"   />按操作员优惠
						    	 --> 
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
								  <td width="100%" background="<%= path%>/common/images/bar_bg.gif"><span class="L style2">用户类型套餐包月收费优惠策略信息定义</span></td>
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
																			<option <c:if test="${ userTypePattern eq 2  }"> selected="selected" </c:if> value="2">封顶</option>
																			<option <c:if test="${ userTypePattern eq 1  }"> selected="selected" </c:if>  value="1">打折</option>
																		</select>
																	   
																	</td>
				              								
				              								  </tr>
				              								<c:forEach var="userPara" items="${sessionScope.userTypeParaList}" varStatus="index">
																<tr>
																	<td width="12%" align="right">
																		<c:out value="${userPara.name}"></c:out>
																	</td>
																	<td width="37%" colspan="1">
																		<input type="text" name="month_by_user_type<c:out value="${ index }"/>_month1" value="<c:out value="${ userTypeCodeValueMap[userPara.value] }"></c:out>" size="30" maxlength="50" onKeyUp="clearNoNum(event,this)" onBlur="checkNum(this)"/>
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
								  <td width="100%" background="<%= path%>/common/images/bar_bg.gif"><span class="L style2">终端类型套餐包月收费优惠策略信息定义</span></td>
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
																			<option <c:if test="${ equTypePattern eq 2  }"> selected="selected" </c:if> value="2">封顶</option>
																			<option <c:if test="${ equTypePattern eq 1  }"> selected="selected" </c:if> value="1">打折</option>
																		</select>
																	   
																	</td>
				              								
				              								  </tr>
				              								<c:forEach var="equPara" items="${ sessionScope.equTypeParaList }" varStatus="index">
																<tr>
																	<td width="12%" align="right">
																		<c:out value="${equPara.name}"></c:out>
																	</td>
																	<td width="37%" colspan="1">
																		<input type="text" name="month_by_equ_type<c:out value="${ index }"/>_month1" value="<c:out value="${ equTypeCodeValueMap[  equPara.value ] }"></c:out>" size="30" maxlength="50" onKeyUp="clearNoNum(event,this)" onBlur="checkNum(this)"/>
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
				 	<c:if test="${ OPER !=   'modify' }">  <app:button title="增加" image="" function="addFeeType()"/> </c:if>
				 	 <app:button title="保存" image="" function="saveFeeType()"/>
				 	 <app:button title="关闭" image="" function="window.self.close()"/>
				 </tr>
		</table>
   </form> 
   <script type="text/javascript">
   		var intiRebateType = document.getElementById("month_rebate_type_month1").value ;
		showDiscountPolicy(  intiRebateType , 'month' , 'month1'); 
		var oper = '<c:out value="${OPER}"/>' ;   

		var chargeParttern = document.getElementById("package_discount_charge_pattern_month1").value ;
		if( oper != 'modify' || chargeParttern <= 3  )/// 如果不是包多月的计费方式 
			limitChargeMonth( 	document.getElementById('package_discount_charge_pattern_month1').value 	, 'month1'  ) ; 
   </script>
  </body>
</html>
