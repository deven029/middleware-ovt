<%@ page import="com.ovt.common.monitor.adapter.*"%>
<%@ page contentType="text/html;charset=utf-8" %>
<%@include file="/common/jsp/frame/check.jsp"%>
<%@ taglib uri="/tags/app" prefix="app" %>
<%@ page isELIgnored = "false" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
 

<%	
	GeneralMonitorConf model = (GeneralMonitorConf)request.getAttribute( "model" ) ;
	
	String action ;
	String alias ;
	String title ;
	
	action = request.getContextPath() + "/common/jsp/monitor/conf/update.do?methodToCall=update" ;
	alias = "oamp.monitorConf.update";
	title = "修改监控告警配置" ;
%>
<title><%=title%></title>
<link href="<%=request.getContextPath() %>/common/css/zi.css" rel="stylesheet" type="text/css">
<SCRIPT language=JavaScript src="<%=request.getContextPath() %>/common/js/sitech.js"></SCRIPT>
<script language="JavaScript">
function openme(object){
object.style.background="#FFFFCC";}
function closeme(object){
object.style.background="#ffffff";}
</script>
<style type="text/css">
<!--
.style1 {color: #0c5bc4}
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

<app:position/>

<form name="userForm" action="<%=action%>" method="post">
<input type="hidden" name="taskId" value="<%=model!=null? (model.getTaskId()):""%>"/>
<input type="hidden" name="subType" value="<%=model!=null? (model.getSubType() ):""%>"/>
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
    <tr> 
      <td>
       <table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
         <tr> 
					  <td width="6" height="25"><img src="../../../images/bar_left.gif" width="31" height="23"></td>
					  <td width="100%" background="../../../images/bar_bg.gif"><span class="L style2"><%=title%></span></td>
					  <td width="6" align="right"><img src="../../../images/bar_right.gif" width="9" height="23"></td>
			   </tr>
         <tr>
           <td colspan="3"><table width="100%" border="0" cellpadding="0" cellspacing="1" class="T">
             <tr>
              <td bgcolor="F3F6FF">                    
              <table width="100%" border="0" cellspacing="0" cellpadding="3">
                  <tr>
      <td > <div align="right">任务ID：</div></td>
      <td width="34%" ><%=model==null?"":model.getTaskId()%>
      
      		</td>
      <td align=center><div align="right">子类型</div></td>
      <td><div align="left"><%=model==null?"":model.getSubType()%></div>
         
    </tr>
    
    <tr>
      <td > <div align="right">名称：</div></td>
      <td colspan="3"><input name="name" type="text" id="name" size="100" maxlength="30" value="<%=model==null?"":model.getName()%>"></td>
       
    </tr>
    
    <tr>
      <td > <div align="right">描述：</div></td>
      <td colspan="3"><input name="description" type="text" id="description" size="100" maxlength="200" value="<%=model==null?"":model.getDescription()%>"></td>
       
    </tr>
   <%java.util.List options = model.getOptions() ;
	for( int i = 0 ; i < options.size() ; i++ ){
		GeneralMonitorConfOption option = (GeneralMonitorConfOption)options.get(i) ;
		String optionId = option.getOptionId() ;
		%>
		<%if( i % 2 == 0) { %><tr><%} %>
	      <td > <div align="right"><%=option.getOptionName() %>：</div></td>
	      <td width="34%" ><%GeneralMonitorConfOption.EditType editType = option.getEditType() ;
	      if( editType instanceof GeneralMonitorConfOption.InputEditType ){ 
	      	GeneralMonitorConfOption.InputEditType inputEditType = (GeneralMonitorConfOption.InputEditType)editType ;%>
	      	<input name="<%=optionId %>_value" type="text" id="name" size="35" maxlength="<%=inputEditType.getMaxLength() %>" value="<%=option.getOptionValue()%>">
	      <%}else  if( editType instanceof GeneralMonitorConfOption.CheckBoxEditType ){ 
	      	GeneralMonitorConfOption.CheckBoxEditType checkboxEditType = (GeneralMonitorConfOption.CheckBoxEditType)editType ;%>
	      	<input name="<%=optionId %>_value" type="checkbox" value="1"<%if( option.getOptionValue().equals( checkboxEditType.getValueChecked()) ){%> checked<%}%>>
	      <%}else  if( editType instanceof GeneralMonitorConfOption.SelectEditType ){ 
	      	GeneralMonitorConfOption.SelectEditType selectEditType = (GeneralMonitorConfOption.SelectEditType)editType ;%>
	      	<select name="<%=optionId %>_value" style="width=153">
	      					<%java.util.List valueIds = selectEditType.getValueIds() ;
	      					java.util.List valueLabels = selectEditType.getValueLabels() ;
	      					for( int j = 0 ; j < valueIds.size() ; j++){
	      						String valueId = valueIds.get(j).toString();
	      						String valueLabel = valueLabels.get(j).toString() ; %>
	                                <option value="<%=valueId %>" <%if ( option.getOptionValue().equals( valueId)) out.print("selected");%>><%=valueLabel %></option>
	                       <%} %>
	        </select>
	      <%} %>
	    <% if( ( i % 2 == 0 && i != 0 )|| i == options.size() - 1) { %></tr><%} %>
	  
	  <%
	  }
	  java.util.List eventsList = model.getTaskEvents() ;
	  for( int i = 0 ; i < eventsList.size() ; i++ ) {
		  GeneralMonitorConf.TaskEvent event = (GeneralMonitorConf.TaskEvent)eventsList.get(i) ;
	  %>
	   <tr><td colspan="4"><hr></td></tr>
	 	<tr>
	      <td > <div align="right">事件ID：</div></td>
	      <td  colspan="3"><%=event==null?"":event.getEventId()%></td>      
	    </tr>
	    <tr>
	      <td > <div align="right">事件描述：</div></td>
	      <td colspan="3"><input name="<%=event.getEventId() %>_eventDefaultDesc" type="text" id="<%=event.getEventId() %>_eventDefaultDesc" size="100" maxlength="200" value="<%=event==null?"":event.getEventDefaultDesc()%>"></td>
	       
	    </tr>
	    <tr>
	      <td > <div align="right">事件级别：</div></td>
	      <td width="34%" ><select name="<%=event.getEventId() %>_eventDefaultLevel" style="width=153">
	      					<option value="1" <%if ( event.getEventDefaultLevel() == 1) out.print("selected");%>>严重告警</option>
	                       <option value="2" <%if ( event.getEventDefaultLevel() == 2) out.print("selected");%>>普通告警</option>
	                       <option value="3" <%if ( event.getEventDefaultLevel() == 3) out.print("selected");%>>信息</option>
	                       
	        </select>
	      
	      		</td>
	      <td align=center><div align="right">过期期限(小时)</div></td>
	      <td><div align="left"><input name="<%=event.getEventId() %>_expiredHours" type="text" id="<%=event.getEventId() %>_expiredHours" size="25" maxlength="10" value="<%=event==null?"":( event.getExpiredHours() + "" )%>"></div>
	         
	    </tr>
	    <tr>
	      <td > <div align="right">是否保存：</div></td>
	      <td width="34%" ><select name="<%=event.getEventId() %>_saveFlag" style="width=153">
	      					<option value="0" <%if ( !event.isSaveFlag()) out.print("selected");%>>否</option>
	                       <option value="1" <%if ( event.isSaveFlag()) out.print("selected");%>>是</option>
	                       
	        </select>
	      
	      		</td>
	      <td align=center><div align="right">TRAP类型：</div></td>
	      <td><div align="left"><select name="<%=event.getEventId() %>_trapType" style="width=153">
	      					<option value="1" <%if ( event.getTrapType().equals("1" )) out.print("selected");%>>SNMP</option>
	                       <option value="0" <%if ( event.getTrapType().equals("0" )) out.print("selected");%>>普通</option>
	                       
	        </select></div>
	         
	    </tr>
	    <tr>
	      <td > <div align="right">是否告警：</div></td>
	      <td width="34%" ><select name="<%=event.getEventId() %>_alarmFlag" style="width=153">
	      					<option value="0" <%if ( !event.isAlarmFlag()) out.print("selected");%>>否</option>
	                       <option value="1" <%if ( event.isAlarmFlag()) out.print("selected");%>>是</option>
	                       
	        </select>
	      
	      		</td>
	      <td align=center><div align="right">告警用户组：</div></td>
	      <td><div align="left">
	      <%MonitorUserGroup.refresh(null) ;
	      java.util.Map userGroupsMap = MonitorUserGroup.getUserGroupsMap() ;
	      java.util.Iterator iter = userGroupsMap.keySet().iterator() ;%>
	      <select name="<%=event.getEventId() %>_alarmUserGroup" style="width=153">
	      			<%while( iter.hasNext() ){
	      					MonitorUserGroup userGroup = (MonitorUserGroup)userGroupsMap.get(iter.next()) ;%>
	      					<option value="<%=userGroup.getUserGroupId()%>" <%if ( event.getAlarmUserGroup().getUserGroupId().intValue() == userGroup.getUserGroupId().intValue()) out.print("selected");%>><%=userGroup.getName()%></option>
	                 <%}%>      
	        </select></div>
	         
	    </tr>
	    <%}%>
		   

                  <tr align="center">
                    <td colspan="4"><hr>
                    <table width="30%"  border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                           
                           <table width="30%" border="0" cellspacing="0" cellpadding="0">
													   <tr align='right'>
													   
															   <%request.setAttribute( "alias" , alias );
    %>
     <app:button alias="!alias" title="提交" image="" function="if( validateForm( userForm) ){ userForm.submit();}"/>
       											</tr>
													</table>	 
                        </td>
                        </tr>
                    </table>
                    </td>
                  </tr>
                </table>
               </td>
              </tr>
          </table></td>
        </tr>
       </table>
      </td>
    </tr>
  </table>  
	
<table width="30%" border="0" cellspacing="0" cellpadding="0">
   <tr align='right'>
   
   </tr>
</table>	 
 </form>
<script type="text/javascript"> 
<!--
     var bCancel = false; 

    function validateForm(form) {                                                                   
        if (bCancel) 
      return true; 
        else 
       return validateRequired(form) && validateInteger(form) && validateDate(form); 
   } 

    function required () { 
	  
    } 

    function IntegerValidations () { 
     
    } 

    function DateValidations () { 
    } 

-->
</script>
<script type="text/javascript"> 
<!--


function validateFloatRange(form) {
                var isValid = true;
                var focusField = null;
                var i = 0;
                var fields = new Array();
                oRange = new floatRange();
                for (x in oRange) {
                    var field = form[oRange[x][0]];
                    
                    if ((field.type == 'text' ||
                         field.type == 'textarea') &&
                        (field.value.length > 0)) {
                        
                        var fMin = parseFloat(oRange[x][2]("min"));
                        var fMax = parseFloat(oRange[x][2]("max"));
                        var fValue = parseFloat(field.value);
                        if (!(fValue >= fMin && fValue <= fMax)) {
                            if (i == 0) {
                                focusField = field;
                            }
                            fields[i++] = oRange[x][1];
                            isValid = false;
                        }
                    }
                }
                if (fields.length > 0) {
                    focusField.focus();
                    alert(fields.join('\n'));
                }
                return isValid;
            }
function validateByte(form) {
                var bValid = true;
                var focusField = null;
                var i = 0;
                var fields = new Array();
                oByte = new ByteValidations();
                for (x in oByte) {
                	var field = form[oByte[x][0]];
                	
                    if (field.type == 'text' ||
                        field.type == 'textarea' ||
                        field.type == 'select-one' ||
						field.type == 'radio') {

						var value = '';
						// get field's value
						if (field.type == "select-one") {
							var si = field.selectedIndex;
							if (si >= 0) {
								value = field.options[si].value;
							}
						} else {
							value = field.value;
						}
                        
                        if (value.length > 0) {
                            if (!isAllDigits(value)) {
                                bValid = false;
                                if (i == 0) {
                                    focusField = field;
                                }
                                fields[i++] = oByte[x][1];

                            } else {

	                            var iValue = parseInt(value);
	                            if (isNaN(iValue) || !(iValue >= -128 && iValue <= 127)) {
	                                if (i == 0) {
	                                    focusField = field;
	                                }
	                                fields[i++] = oByte[x][1];
	                                bValid = false;
	                            }
                            }
						}
						
                    }
                }
                if (fields.length > 0) {
                   focusField.focus();
                   alert(fields.join('\n'));
                }
                return bValid;
            }
function validateMaxLength(form) {
                var isValid = true;
                var focusField = null;
                var i = 0;
                var fields = new Array();
                oMaxLength = new maxlength();
                for (x in oMaxLength) {
                    var field = form[oMaxLength[x][0]];
                    
                    if (field.type == 'text' ||
                        field.type == 'textarea') {
                        
                        var iMax = parseInt(oMaxLength[x][2]("maxlength"));
                        if (field.value.length > iMax) {
                            if (i == 0) {
                                focusField = field;
                            }
                            fields[i++] = oMaxLength[x][1];
                            isValid = false;
                        }
                    }
                }
                if (fields.length > 0) {
                   focusField.focus();
                   alert(fields.join('\n'));
                }
                return isValid;
            }
function validateRequired(form) {
                var isValid = true;
                var focusField = null;
                var i = 0;
                var fields = new Array();
                oRequired = new required();
                for (x in oRequired) {
                	var field = form[oRequired[x][0]];
                	
                    if (field.type == 'text' ||
                        field.type == 'textarea' ||
                        field.type == 'file' ||
                        field.type == 'select-one' ||
                        field.type == 'radio' ||
                        field.type == 'password') {
                        
                        var value = '';
						// get field's value
						if (field.type == "select-one") {
							var si = field.selectedIndex;
							if (si >= 0) {
								value = field.options[si].value;
							}
						} else {
							value = field.value;
						}
                        
                        if (trim(value).length == 0) {
                        
	                        if (i == 0) {
	                            focusField = field;
	                        }
	                        fields[i++] = oRequired[x][1];
	                        isValid = false;
                        }
                    }
                }
                if (fields.length > 0) {
                   focusField.focus();
                   alert(fields.join('\n'));
                }
                return isValid;
            }
            
            // Trim whitespace from left and right sides of s.
            function trim(s) {
                return s.replace( /^\s*/, "" ).replace( /\s*$/, "" );
            }
function validateInteger(form) {
                var bValid = true;
                var focusField = null;
                var i = 0;
                var fields = new Array();
                oInteger = new IntegerValidations();
                for (x in oInteger) {
                	var field = form[oInteger[x][0]];

                    if (field.type == 'text' ||
                        field.type == 'textarea' ||
                        field.type == 'select-one' ||
                        field.type == 'radio') {
                        
                        var value = '';
						// get field's value
						if (field.type == "select-one") {
							var si = field.selectedIndex;
						    if (si >= 0) {
							    value = field.options[si].value;
						    }
						} else {
							value = field.value;
						}
                        
                        if (value.length > 0) {
                        
                            if (!isAllDigits(value)) {
                                bValid = false;
                                if (i == 0) {
	                                focusField = field;
	                            }
						        fields[i++] = oInteger[x][1];
						        
                            } else {
	                            var iValue = parseInt(value);
	                            if (isNaN(iValue) || !(iValue >= -2147483648 && iValue <= 2147483647)) {
	                                if (i == 0) {
	                                    focusField = field;
	                                }
	                                fields[i++] = oInteger[x][1];
	                                bValid = false;
	                           }
                           }
                       }
                    }
                }
                if (fields.length > 0) {
                   focusField.focus();
                   alert(fields.join('\n'));
                }
                return bValid;
            }

            function isAllDigits(argvalue) {
                argvalue = argvalue.toString();
                var validChars = "0123456789";
                var startFrom = 0;
                if (argvalue.substring(0, 2) == "0x") {
                   validChars = "0123456789abcdefABCDEF";
                   startFrom = 2;
                } else if (argvalue.charAt(0) == "0") {
                   validChars = "01234567";
                   startFrom = 1;
                } else if (argvalue.charAt(0) == "-") {
                    startFrom = 1;
                }
                
                for (var n = startFrom; n < argvalue.length; n++) {
                    if (validChars.indexOf(argvalue.substring(n, n+1)) == -1) return false;
                }
                return true;
            }
function validateRange(form) {
                return validateIntRange(form);
            }
function validateDate(form) {
               var bValid = true;
               var focusField = null;
               var i = 0;
               var fields = new Array();
               oDate = new DateValidations();
               for (x in oDate) {
                   var value = form[oDate[x][0]].value;
                   var datePattern = oDate[x][2]("datePatternStrict");
                   if ((form[oDate[x][0]].type == 'text' ||
                        form[oDate[x][0]].type == 'textarea') &&
                       (value.length > 0) &&
                       (datePattern.length > 0)) {
                     var MONTH = "MM";
                     var DAY = "dd";
                     var YEAR = "yyyy";
                     var orderMonth = datePattern.indexOf(MONTH);
                     var orderDay = datePattern.indexOf(DAY);
                     var orderYear = datePattern.indexOf(YEAR);
                     if ((orderDay < orderYear && orderDay > orderMonth)) {
                         var iDelim1 = orderMonth + MONTH.length;
                         var iDelim2 = orderDay + DAY.length;
                         var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
                         var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
                         if (iDelim1 == orderDay && iDelim2 == orderYear) {
                            dateRegexp = new RegExp("^(\\d{2})(\\d{2})(\\d{4})$");
                         } else if (iDelim1 == orderDay) {
                            dateRegexp = new RegExp("^(\\d{2})(\\d{2})[" + delim2 + "](\\d{4})$");
                         } else if (iDelim2 == orderYear) {
                            dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})(\\d{4})$");
                         } else {
                            dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");
                         }
                         var matched = dateRegexp.exec(value);
                         if(matched != null) {
                            if (!isValidDate(matched[2], matched[1], matched[3])) {
                               if (i == 0) {
                                   focusField = form[oDate[x][0]];
                               }
                               fields[i++] = oDate[x][1];
                               bValid =  false;
                            }
                         } else {
                            if (i == 0) {
                                focusField = form[oDate[x][0]];
                            }
                            fields[i++] = oDate[x][1];
                            bValid =  false;
                         }
                     } else if ((orderMonth < orderYear && orderMonth > orderDay)) {
                         var iDelim1 = orderDay + DAY.length;
                         var iDelim2 = orderMonth + MONTH.length;
                         var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
                         var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
                         if (iDelim1 == orderMonth && iDelim2 == orderYear) {
                             dateRegexp = new RegExp("^(\\d{2})(\\d{2})(\\d{4})$");
                         } else if (iDelim1 == orderMonth) {
                             dateRegexp = new RegExp("^(\\d{2})(\\d{2})[" + delim2 + "](\\d{4})$");
                         } else if (iDelim2 == orderYear) {
                             dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})(\\d{4})$");
                         } else {
                             dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");
                         }
                         var matched = dateRegexp.exec(value);
                         if(matched != null) {
                             if (!isValidDate(matched[1], matched[2], matched[3])) {
                                 if (i == 0) {
                                     focusField = form[oDate[x][0]];
                                 }
                                 fields[i++] = oDate[x][1];
                                 bValid =  false;
                              }
                         } else {
                             if (i == 0) {
                                 focusField = form[oDate[x][0]];
                             }
                             fields[i++] = oDate[x][1];
                             bValid =  false;
                         }
                     } else if ((orderMonth > orderYear && orderMonth < orderDay)) {
                         var iDelim1 = orderYear + YEAR.length;
                         var iDelim2 = orderMonth + MONTH.length;
                         var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
                         var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
                         if (iDelim1 == orderMonth && iDelim2 == orderDay) {
                             dateRegexp = new RegExp("^(\\d{4})(\\d{2})(\\d{2})$");
                         } else if (iDelim1 == orderMonth) {
                             dateRegexp = new RegExp("^(\\d{4})(\\d{2})[" + delim2 + "](\\d{2})$");
                         } else if (iDelim2 == orderDay) {
                             dateRegexp = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})(\\d{2})$");
                         } else {
                             dateRegexp = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{2})$");
                         }
                         var matched = dateRegexp.exec(value);
                         if(matched != null) {
                             if (!isValidDate(matched[3], matched[2], matched[1])) {
                                 if (i == 0) {
                                     focusField = form[oDate[x][0]];
                                  }
                                  fields[i++] = oDate[x][1];
                                  bValid =  false;
                              }
                          } else {
                              if (i == 0) {
                                  focusField = form[oDate[x][0]];
                              }
                              fields[i++] = oDate[x][1];
                              bValid =  false;
                          }
                     } else {
                         if (i == 0) {
                             focusField = form[oDate[x][0]];
                         }
                         fields[i++] = oDate[x][1];
                         bValid =  false;
                     }
                  }
               }
               if (fields.length > 0) {
                  focusField.focus();
                  alert(fields.join('\n'));
               }
               return bValid;
            }

	    function isValidDate(day, month, year) {
	        if (month < 1 || month > 12) {
                    return false;
                }
                if (day < 1 || day > 31) {
                    return false;
                }
                if ((month == 4 || month == 6 || month == 9 || month == 11) &&
                    (day == 31)) {
                    return false;
                }
                if (month == 2) {
                    var leap = (year % 4 == 0 &&
                               (year % 100 != 0 || year % 400 == 0));
                    if (day>29 || (day == 29 && !leap)) {
                        return false;
                    }
                }
                return true;
            }
function validateCreditCard(form) {
                var bValid = true;
                var focusField = null;
                var i = 0;
                var fields = new Array();
                oCreditCard = new creditCard();
                for (x in oCreditCard) {
                    if ((form[oCreditCard[x][0]].type == 'text' ||
                         form[oCreditCard[x][0]].type == 'textarea') &&
                        (form[oCreditCard[x][0]].value.length > 0)) {
                        if (!luhnCheck(form[oCreditCard[x][0]].value)) {
                            if (i == 0) {
                                focusField = form[oCreditCard[x][0]];
                            }
                            fields[i++] = oCreditCard[x][1];
                            bValid = false;
                        }
                    }
                }
                if (fields.length > 0) {
                    focusField.focus();
                    alert(fields.join('\n'));
                }
                return bValid;
            }

            /**
             * Reference: http://www.ling.nwu.edu/~sburke/pub/luhn_lib.pl
             */
            function luhnCheck(cardNumber) {
                if (isLuhnNum(cardNumber)) {
                    var no_digit = cardNumber.length;
                    var oddoeven = no_digit & 1;
                    var sum = 0;
                    for (var count = 0; count < no_digit; count++) {
                        var digit = parseInt(cardNumber.charAt(count));
                        if (!((count & 1) ^ oddoeven)) {
                            digit *= 2;
                            if (digit > 9) digit -= 9;
                        };
                        sum += digit;
                    };
                    if (sum == 0) return false;
                    if (sum % 10 == 0) return true;
                };
                return false;
            }

            function isLuhnNum(argvalue) {
                argvalue = argvalue.toString();
                if (argvalue.length == 0) {
                    return false;
                }
                for (var n = 0; n < argvalue.length; n++) {
                    if ((argvalue.substring(n, n+1) < "0") ||
                        (argvalue.substring(n,n+1) > "9")) {
                        return false;
                    }
                }
                return true;
            }
function validateIntRange(form) {
                var isValid = true;
                var focusField = null;
                var i = 0;
                var fields = new Array();
                oRange = new intRange();
                for (x in oRange) {
                    var field = form[oRange[x][0]];
                    
                    if ((field.type == 'text' ||
                         field.type == 'textarea') &&
                        (field.value.length > 0)) {
                        
                        var iMin = parseInt(oRange[x][2]("min"));
                        var iMax = parseInt(oRange[x][2]("max"));
                        var iValue = parseInt(field.value);
                        if (!(iValue >= iMin && iValue <= iMax)) {
                            if (i == 0) {
                                focusField = field;
                            }
                            fields[i++] = oRange[x][1];
                            isValid = false;
                        }
                    }
                }
                if (fields.length > 0) {
                    focusField.focus();
                    alert(fields.join('\n'));
                }
                return isValid;
            }
function validateShort(form) {
                var bValid = true;
                var focusField = null;
                var i = 0;
                var fields = new Array();
                oShort = new ShortValidations();
                for (x in oShort) {
                	var field = form[oShort[x][0]];
                	
                    if (field.type == 'text' ||
                        field.type == 'textarea' ||
                        field.type == 'select-one' ||
                        field.type == 'radio') {
                        
                        var value = '';
						// get field's value
						if (field.type == "select-one") {
							var si = field.selectedIndex;
							if (si >= 0) {
								value = field.options[si].value;
							}
						} else {
							value = field.value;
						}
                        
                        if (value.length > 0) {
                            if (!isAllDigits(value)) {
                                bValid = false;
                                if (i == 0) {
                                    focusField = field;
                                }
                                fields[i++] = oShort[x][1];

                            } else {
                        
	                            var iValue = parseInt(value);
	                            if (isNaN(iValue) || !(iValue >= -32768 && iValue <= 32767)) {
	                                if (i == 0) {
	                                    focusField = field;
	                                }
	                                fields[i++] = oShort[x][1];
	                                bValid = false;
	                            }
	                       }
                       }
                    }
                }
                if (fields.length > 0) {
                   focusField.focus();
                   alert(fields.join('\n'));
                }
                return bValid;
            }
function validateFloat(form) {
                var bValid = true;
                var focusField = null;
                var i = 0;
                var fields = new Array();
                oFloat = new FloatValidations();
                for (x in oFloat) {
                	var field = form[oFloat[x][0]];
                	
                    if (field.type == 'text' ||
                        field.type == 'textarea' ||
                        field.type == 'select-one' ||
                        field.type == 'radio') {
                        
                    	var value = '';
						// get field's value
						if (field.type == "select-one") {
							var si = field.selectedIndex;
							if (si >= 0) {
							    value = field.options[si].value;
							}
						} else {
							value = field.value;
						}
                        
                        if (value.length > 0) {
                            // remove '.' before checking digits
                            var tempArray = value.split('.');
                            var joinedString= tempArray.join('');

                            if (!isAllDigits(joinedString)) {
                                bValid = false;
                                if (i == 0) {
                                    focusField = field;
                                }
                                fields[i++] = oFloat[x][1];

                            } else {
	                            var iValue = parseFloat(value);
	                            if (isNaN(iValue)) {
	                                if (i == 0) {
	                                    focusField = field;
	                                }
	                                fields[i++] = oFloat[x][1];
	                                bValid = false;
	                            }
                            }
                        }
                    }
                }
                if (fields.length > 0) {
                   focusField.focus();
                   alert(fields.join('\n'));
                }
                return bValid;
            }
function validateEmail(form) {
                var bValid = true;
                var focusField = null;
                var i = 0;
                var fields = new Array();
                oEmail = new email();
                for (x in oEmail) {
                    if ((form[oEmail[x][0]].type == 'text' ||
                         form[oEmail[x][0]].type == 'textarea') &&
                        (form[oEmail[x][0]].value.length > 0)) {
                        if (!checkEmail(form[oEmail[x][0]].value)) {
                            if (i == 0) {
                                focusField = form[oEmail[x][0]];
                            }
                            fields[i++] = oEmail[x][1];
                            bValid = false;
                        }
                    }
                }
                if (fields.length > 0) {
                    focusField.focus();
                    alert(fields.join('\n'));
                }
                return bValid;
            }

            /**
             * Reference: Sandeep V. Tamhankar (stamhankar@hotmail.com),
             * http://javascript.internet.com
             */
            function checkEmail(emailStr) {
               if (emailStr.length == 0) {
                   return true;
               }
               var emailPat=/^(.+)@(.+)$/;
               var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
               var validChars="\[^\\s" + specialChars + "\]";
               var quotedUser="(\"[^\"]*\")";
               var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
               var atom=validChars + '+';
               var word="(" + atom + "|" + quotedUser + ")";
               var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
               var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
               var matchArray=emailStr.match(emailPat);
               if (matchArray == null) {
                   return false;
               }
               var user=matchArray[1];
               var domain=matchArray[2];
               if (user.match(userPat) == null) {
                   return false;
               }
               var IPArray = domain.match(ipDomainPat);
               if (IPArray != null) {
                   for (var i = 1; i <= 4; i++) {
                      if (IPArray[i] > 255) {
                         return false;
                      }
                   }
                   return true;
               }
               var domainArray=domain.match(domainPat);
               if (domainArray == null) {
                   return false;
               }
               var atomPat=new RegExp(atom,"g");
               var domArr=domain.match(atomPat);
               var len=domArr.length;
               if ((domArr[domArr.length-1].length < 2) ||
                   (domArr[domArr.length-1].length > 3)) {
                   return false;
               }
               if (len < 2) {
                   return false;
               }
               return true;
            }
function validateMask(form) {
                var isValid = true;
                var focusField = null;
                var i = 0;
                var fields = new Array();
                oMasked = new mask();
                for (x in oMasked) {
                    var field = form[oMasked[x][0]];
                    
                    if ((field.type == 'text' || 
                         field.type == 'textarea') && 
                         (field.value.length > 0)) {
                        
                        if (!matchPattern(field.value, oMasked[x][2]("mask"))) {
                            if (i == 0) {
                                focusField = field;
                            }
                            fields[i++] = oMasked[x][1];
                            isValid = false;
                        }
                    }
                }
                
                if (fields.length > 0) {
                   focusField.focus();
                   alert(fields.join('\n'));
                }
                return isValid;
            }

            function matchPattern(value, mask) {
               return mask.exec(value);
            }
function validateMinLength(form) {
                var isValid = true;
                var focusField = null;
                var i = 0;
                var fields = new Array();
                oMinLength = new minlength();
                for (x in oMinLength) {
                    var field = form[oMinLength[x][0]];
                    
                    if (field.type == 'text' ||
                        field.type == 'textarea') {
                        
                        var iMin = parseInt(oMinLength[x][2]("minlength"));
                        if ((trim(field.value).length > 0) && (field.value.length < iMin)) {
                            if (i == 0) {
                                focusField = field;
                            }
                            fields[i++] = oMinLength[x][1];
                            isValid = false;
                        }
                    }
                }
                if (fields.length > 0) {
                   focusField.focus();
                   alert(fields.join('\n'));
                }
                return isValid;
            }

-->
</script>