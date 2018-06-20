function textCounter(field, maxlimit)
{
	if (field.value.length > maxlimit)
	{
		field.value = field.value.substring(0, maxlimit);
	}
}


function cutStrLength(str, Ilength)
{ 
	var tmp = 0;
	var len = 0;
	var okLen = 0;
	for(var i=0;i<Ilength;i++)
	{
		if(str.charCodeAt(i)>255)
		{
		tmp += 2;
		}
		else{
			len += 1;
		}
		okLen += 1;
	
		if(tmp + len == Ilength) 
		{
			return (str.substring(0,okLen));
			break;
		}
		if(tmp + len > Ilength)
		{
			return (str.substring(0,okLen - 1));
			break;
		}
	}
}


function  checkFieldLength(obj,showtime)   
{   
	//alert("checkFieldLength(obj,showtime)");
	//findShowMsgDiv();
	var   fieldDesc="\u6700\u591a\u5141\u8bb8\u8f93\u5165\u7684\u5b57\u7b26\u4e2a\u6570\u662f";
	var   fieldLength=obj.getAttribute? parseInt(obj.getAttribute("maxlength")):""; 
	//alert("fieldLength="+fieldLength);
	var   str   = obj.value;   
	var   theLen=0;   
	var   teststr='';   
	for   (i=0;i<str.length;i++)   
	{   
		teststr=str.charAt(i);     
		if(str.charCodeAt(i)>255){   
			theLen=theLen   +   2;
		}
		else{  
		  	theLen=theLen   +   1;
		}
	}  
	  //document.getElementById('showMsgDiv').innerText = theLen;
	  if(theLen>fieldLength)   
	  {  
	  	var msg = fieldDesc+fieldLength;
	  	showMsgDiv(msg);
	  	obj.value = cutStrLength(str, fieldLength);
	  	obj.focus();
	  	//alert("showtime="+showtime);
	  	if(showtime != undefined)
	  	{
	  		setTimeout("hiddenShowMsgDiv();",showtime);
	  	}
	  	return   false;   
	  }   
	  else   
	  { 
	  	hiddenShowMsgDiv();
	  	return   true;   
	  }   
}


function  checkFieldLength2(obj,fieldLength)   
{   
	findShowMsgDiv();
	var   fieldDesc="\u6700\u591a\u5141\u8bb8\u8f93\u5165\u7684\u5b57\u7b26\u4e2a\u6570\u662f";
	var   str   = obj.value;   
	var   theLen=0;   
	var   teststr='';   
	for   (i=0;i<str.length;i++)   
	{   
		teststr=str.charAt(i);     
		if(str.charCodeAt(i)>255){   
			theLen=theLen   +   2;
		}
		else{  
		  	theLen=theLen   +   1;
		}
	}  

	  if(theLen>fieldLength)   
	  {  
	  	var msg = fieldDesc+fieldLength;
	  	showMsgDiv(msg);
	  	obj.value = cutStrLength(str, fieldLength);
	  	obj.focus();
	  	return   false;   
	  }   
	  else   
	  {   
	  	return   true;   
	  }   
}

function  findShowMsgDiv()
{ 
	  var   msgDiv=document.getElementById('showMsgDiv');
	  //alert("msgDiv="+msgDiv);
	  if(msgDiv==null)
	  {
	  	createShowMsgDiv();
	  }
}

function  createShowMsgDiv()
{ 
	  //var  fn = "hiddenShowMsgDiv()";
	  var  fn = "setTimeout('hiddenShowMsgDiv();',500)";
	  var   msgLayer   =   document.createElement("DIV");  
	  msgLayer.id   =   "showMsgDiv";
	  msgLayer.className =  "showMsgDivClass";
	  msgLayer.style.position   =   "absolute";  
	  msgLayer.style.zIndex   =   "1000000000";  
	  msgLayer.style.display   =   "none";
	  msgLayer.setAttribute('onmouseover',document.all ? function(){eval(fn);} :fn);
	  document.body.appendChild(msgLayer);
} 

function  showMsgDiv(msg)
{ 
		//alert("in showMsgDiv(msg)");
		findShowMsgDiv();
 		var smd=document.getElementById('showMsgDiv');
	  	smd.innerText = msg;
	  	smd.style.display="";
}

function  hiddenShowMsgDiv(showtime)
{
		findShowMsgDiv();
		if(showtime != undefined)
	  	{
	  		pause(showtime);
	  	}
		document.getElementById('showMsgDiv').style.display='none';
}

function checkEmptyById(fieldid,fieldname)
{
	var obj=document.getElementById(fieldid);
	if((obj!=null))
	{
		//alert("obj.value='"+obj.value+"'");
		if(obj.value=="")
		{
			var   msg="\u4e0d\u80fd\u4e3a\u7a7a\uff01";
			if(fieldname!=undefined)
			{
				msg=fieldname+msg;
			}
			showMsgDiv(msg);
			obj.focus ();
			return false
		}else
		{
			return true;
		}
	}else
	{
		var   msg="\u4e0d\u5b58\u5728\u5bf9\u8c61ID '"+fieldid+"'";
		showMsgDiv(msg);
		return false;
	}
}

function checkEmptyByObj(obj,fieldname)
{
	if((obj!=null))
	{
		//alert("obj.value='"+obj.value+"'");
		if(obj.value=="")
		{
			var   msg="\u4e0d\u80fd\u4e3a\u7a7a\uff01";
			if(fieldname!=undefined)
			{
				msg=fieldname+msg;
			}
			showMsgDiv(msg);
			obj.focus ();
			return false
		}else
		{
			return true;
		}
	}else
	{
		var   msg="\u4e0d\u5b58\u5728\u5bf9\u8c61ID '"+fieldid+"'";
		showMsgDiv(msg);
		return false;
	}
}

function phoneCheck(s) {
	var str=s;
	var reg=/(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^([0-9]{3,4})[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/
	//alert(reg.test(str));
	return reg.test(str);
}

function checkPhoneById(fieldid,fieldname) {
	var obj=document.getElementById(fieldid);
	if((obj!=null))
	{
		return checkPhoneByObj(obj,fieldname);
	}else
	{
		var   msg="\u4e0d\u5b58\u5728\u5bf9\u8c61ID '"+fieldid+"'";
		showMsgDiv(msg);
		return false;
	}
}

function checkPhoneByObj(obj,fieldname)
{
	var   msg="\u7535\u8bdd\u53f7\u7801\u9519\u8bef\uff01";
	if(fieldname!=undefined)
	{
		msg=fieldname+msg;
	}
	if(obj.value=="")
	{
		return true;
	}
	var result=phoneCheck(obj.value);
	if(result)
	{
		hiddenShowMsgDiv();
		return true;
	}else
	{
		showMsgDiv(msg);
		//alert(msg)
	  	//obj.focus();
	  	return false; 
	}
}


function mobileCheck(s) {
	var str=s;
	var reg=/(^0{0,1}13[0-9]{9}$)/;
	//alert("in mobileCheck(s)");
	//alert(reg.test(str));
	return reg.test(str);
}

function checkMobileById(fieldid,fieldname) {
	var obj=document.getElementById(fieldid);
	if((obj!=null))
	{
		return checkMobileByObj(obj,fieldname);
	}else
	{
		var   msg="\u4e0d\u5b58\u5728\u5bf9\u8c61ID '"+fieldid+"'";
		showMsgDiv(msg);
		return false;
	}
}

function checkMobileByObj(obj,fieldname)
{
	var   msg="\u624b\u673a\u53f7\u7801\u9519\u8bef\uff01";
	if(fieldname!=undefined)
	{
		msg=fieldname+msg;
	}
	if(obj.value=="")
	{
		return true;
	}
	var result=mobileCheck(obj.value);
	if(result)
	{
		hiddenShowMsgDiv();
		return true;
	}else
	{
		showMsgDiv(msg);
		//alert(msg)
	  	//obj.focus();
	  	return false; 
	}
}


function   ipcheck(ipStr)
{//check ip :192.168.0.1,192.168.0.10-192.168.0.100,...
	var ipArray1=ipStr.split(",");
	for(key1 in ipArray1)  
	{
		var ipStr2=ipArray1[key1];
		var ipArray2=ipStr2.split("-");
		for(key2 in ipArray2)  
		{
			if(ipv4check(ipArray2[key2])==false)
			{
				return   false;
			}
		}
	}
	return true;
}
	
function   ipv4check(ipValue)  
{//check ipValue is a IP  
 var   reg   =   /^\d{1,3}(\.\d{1,3}){3}$/;  
 if   (reg.test(ipValue))  
 {  
  var   ary   =   ipValue.split('.');  
  for(key   in   ary)  
  {  
  	if(parseInt(ary[key])   >   255   )  return   false;  
  }  
  return   true;  
 }else
 {  
 	return   false;
 }  
}

function checkIPByObj(obj,fieldname)
{
	var   msg="IP\u5730\u5740\u683c\u5f0f\u4e0d\u6b63\u786e\uff01";
	if(fieldname!=undefined)
	{
		msg=fieldname+msg;
	}
	if(obj.value=="")
	{
		return true;
	}
	var result=ipcheck(obj.value);
	if(result)
	{
		hiddenShowMsgDiv();
		return true;
	}else
	{
		showMsgDiv(msg);
		//alert(msg)
	  	//obj.focus();
	  	return false; 
	}
	
}

function checkIPById(fieldid,fieldname)
{
	var obj=document.getElementById(fieldid);
	//alert("obj.id="+obj.id);
	if((obj!=null))
	{
		return checkIPByObj(obj,fieldname);
	}else
	{
		var   msg="\u4e0d\u5b58\u5728\u5bf9\u8c61ID '"+fieldid+"'";
		showMsgDiv(msg);
		return false;
	}
	
}

function   isDouble(str)
{  
	re = /^\d+\.?\d*$/;
  	return   (str.search(re)!=-1);
}

function checkDoubleById(fieldid,fieldname)
{
	var obj=document.getElementById(fieldid);
	if(obj!=null)
	{
		if(obj.value != "")
		{
			var result = isDouble(obj.value);
			//alert(result);
			if(result==false)
			{	
				var msg="\u5fc5\u987b\u662f\u6d6e\u70b9\u6570\uff01";
				if(fieldname!=undefined)
				{
					msg=fieldname+msg;
				}
				obj.focus();
		  		showMsgDiv(msg);
			}
			return result;
		}else
		{
			return true;
		}
	}else
	{
		var msg="\u4e0d\u5b58\u5728\u5bf9\u8c61ID '"+fieldid+"'";
		showMsgDiv(msg);
		return false;
	}
}


function   isInteger(str)
{  
  return   (str.search(/^\d+(\d+)?$/)!=-1);  
}

function checkIntegerById(fieldid,fieldname)
{
	var obj=document.getElementById(fieldid);
	if(obj!=null)
	{
		if(obj.value != ""){
			var result = isInteger(obj.value);
			if(result==false)
			{
				var msg="\u5fc5\u987b\u662f\u6574\u6570\uff01";
				if(fieldname!=undefined)
				{
					msg=fieldname+msg;
				}
				obj.focus();
		  		showMsgDiv(msg);
			}
			return result;
		  }else
		  {
		 	return true;
		 }
	}else
	{
		var msg="\u4e0d\u5b58\u5728\u5bf9\u8c61ID '"+fieldid+"'";
		showMsgDiv(msg);
		return false;
	}
}


function   isNumberInRange(minNumber,maxNumber,valueStr)
{ 
	var value=Number(valueStr);
  	if(value<minNumber){return   false;}
  	else if(value>maxNumber){return   false;}
  	else {return   true; }
}


function isIntegerInRange(minNumber,maxNumber,valueStr)
{
	if(!isInteger(valueStr))
	 {
	 	return (false);
	 }else {
	 	return isNumberInRange(minNumber,maxNumber,valueStr);
	 }
}


function numbersonly0(event){
	 var key,keychar;
	 if(window.event){
	  key = window.event.keyCode;
	 }
	 else if (event){
	  key = event.which;
	 }
	 else{
	  return true
	 }
	 keychar = String.fromCharCode(key);
	 if((key == null)||(key == 0)||(key == 8)||(key == 9)||(key == 13)||(key == 27)){
	  return true;
	 }
	 else if(("0123456789.").indexOf(keychar)>-1){
	  //window.status = "";
	  return true;
	 }
	 else {
	  var msg="\u53ea\u80fd\u8f93\u5165\u6570\u5b57\u548c\u5c0f\u6570\u70b9\uff01";
	  showMsgDiv(msg);
	  return false;
	 }
}

function numbersonly(e){
	var unicode=e.charCode? e.charCode : e.keyCode
	//alert(unicode);
	if (unicode!=8){ //if the key isn't the backspace key (which we should allow)
	//if not a number
		if (unicode<48||unicode>57)
		{ 
			var msg="\u53ea\u80fd\u8f93\u5165\u6570\u5b57\uff01";
	  		showMsgDiv(msg);
		return false //disable key press
		}
	}
}

function numberDotonly(e){
	var unicode=e.charCode? e.charCode : e.keyCode
	//alert(unicode);
	if(unicode==46){return true;}
	if (unicode!=8 ){ //if the key isn't the backspace key (which we should allow)
	 	//if not a number
		if (unicode<48||unicode>57)
		{
			var msg="\u53ea\u80fd\u8f93\u5165\u6570\u5b57\u548c\u5c0f\u6570\u70b9\uff01";
	  		showMsgDiv(msg);
			return false //disable key press
		}
	}
}



function pause(numberMillis)
{
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true)
	{
		now = new Date();
		if (now.getTime() > exitTime) return;
	}
}
	
function isDate(dateStr)
{
	if(dateStr=="")
	{
		return true;
	}
	var datepattern=/^((\d{2}(([02468][048])|([13579][26]))\-((((0[13578])|(1[02]))\-((0[1-9])|([1-2][0-9])|(3[01])))|(((0[469])|(11))\-((0[1-9])|([1-2][0-9])|(30)))|(02\-((0[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))\-((((0[13578])|(1[02]))\-((0[1-9])|([1-2][0-9])|(3[01])))|(((0[469])|(11))\-((0[1-9])|([1-2][0-9])|(30)))|(02\-((0[1-9])|(1[0-9])|(2[0-8]))))))$/;
	var result=datepattern.exec(dateStr);
	if(result==null)
	{
		return false;
	}else{
		return true;
	}
}	

function checkDateById(fieldid,fieldname)
{//alert("in n checkDateById(fieldid))");

	var obj=document.getElementById(fieldid);
	//alert("obj.id="+obj.id);
	if((obj!=null))
	{
		return checkDateByObj(obj,fieldname);
	}else
	{
		var msg="\u4e0d\u5b58\u5728\u5bf9\u8c61ID '"+fieldid+"'";
		showMsgDiv(msg);
		return false;
	}
}

function checkDateByObj(obj,fieldname)
{//alert("in n checkDateByObj(obj)"+obj);

	var   msg="\u8bf7\u6b63\u786e\u586b\u5199\u65e5\u671f\uff0c\u683c\u5f0f\u4e3a\uff1aYYYY-MM-DD ";
	if(fieldname!=undefined)
	{
		msg=fieldname+msg;
	}
	var result=isDate(obj.value);

	if(result)
	{
		hiddenShowMsgDiv();
		return true;
	}else
	{
		showMsgDiv(msg);
	  	//obj.focus();
	  	return false; 
	}
	
}


function checkEmailByValue(emailStr)
{
	if(emailStr != "") {
		if(!/(\S)+[@]{1}(\S)+[.]{1}(\w)+/.test(emailStr))
		{
		//alert("e-mail error");
			return false;
		}else
		{
			return true;
		}
	}{
		return true;
	}
}


function checkEmailById(id,fieldname)
{
	var obj=document.getElementById(id);
	var emailStr=obj.value;
	if(emailStr != "") {
		if(!/(\S)+[@]{1}(\S)+[.]{1}(\w)+/.test(emailStr))
		{
		//alert("e-mail error");
			var msg="email\u683c\u5f0f\u4e0d\u6b63\u786e\uff01";
			if(fieldname!=undefined)
			{
				msg=fieldname+msg;
			}
			showMsgDiv(msg);
			obj.focus ();
			return false;
		}else
		{
			hiddenShowMsgDiv();
			return true;
		}
	}else
	{
		return true;
	}
}


function checkEmailByObj(obj,fieldname)
{
	if(obj.value=="")
	{
		return true;
	}
	var   msg="email\u683c\u5f0f\u4e0d\u6b63\u786e\uff01";
	if(fieldname!=undefined)
	{
		msg=fieldname+msg;
	}
	var result=checkEmailByValue(obj.value);
	//alert("obj.value"+obj.value);
	//alert("result="+result);
	if(result)
	{
		hiddenShowMsgDiv();
		return true;
	}else
	{
		showMsgDiv(msg);
	  	return false; 
	}
	
}

//var haserror = false;
var regLettrNumber = /^[A-Za-z0-9]+$/;
var baseMsgLettrNumber="\u5fc5\u987b\u662f\u6570\u5b57\u548c\u5b57\u6bcd\uff01";

function   checkStrByReg(reg,str)
{  
	//alert(reg.test(str));
  	return   (reg.test(str));
}

function checkObjById(reg,baseMsg,fieldid,fieldname)
{
	var obj=document.getElementById(fieldid);
	if(obj!=null)
	{
		if(obj.value != "")
		{
			var result = checkStrByReg(reg,obj.value);
			//alert(result);
			if(result==false)
			{	
				if(fieldname!=undefined)
				{
					baseMsg=fieldname+baseMsg;
				}
				//haserror = true;
				obj.focus();
		  		showMsgDiv(baseMsg);
			}
			return result;
		}else
		{
			//haserror = false;
			return true;
		}
	}else
	{
		var msg="\u4e0d\u5b58\u5728\u5bf9\u8c61ID '"+fieldid+"'";
		showMsgDiv(msg);
		return false;
	}
}

function checkObj(reg,baseMsg,obj,fieldname)
{
	//if(haserror == true){return true;}
	if(obj!=null)
	{
		if(obj.value != "")
		{
			var result = checkStrByReg(reg,obj.value);
			//alert(result);
			if(result==false)
			{	
				if(fieldname!=undefined)
				{
					baseMsg=fieldname+baseMsg;
				}
				//haserror = true;
				//obj.focus();
		  		showMsgDiv(baseMsg);
			}
			return result;
		}else
		{
			//haserror = false;
			return true;
		}
	}else
	{
		var msg="\u4e0d\u5b58\u5728\u5bf9\u8c61ID '"+fieldid+"'";
		showMsgDiv(msg);
		return false;
	}
}

function checkLetterNumberById(fieldid,fieldname)
{
	return checkObjById(regLettrNumber,baseMsgLettrNumber,fieldid,fieldname);
}

function checkLetterNumberByObj(obj,fieldname)
{
	return checkObj(regLettrNumber,baseMsgLettrNumber,obj,fieldname);
}