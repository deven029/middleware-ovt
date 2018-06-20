
//*****************全局变量****************************
var numStr="0123456789";
var moneyStr = numStr + ".";//金额的组成,浮点数的组成
var intStr = numStr+"-";
var floatStr = moneyStr+"-";
var phoneStr = "()-#" + numStr;//电话号码
var flag = 0;


//*********************入口函数***************************

function check(form)
{    var obj = null;
     var t = null;
	 var i;

     for (i=0;i<form.length;i++)
    {    
		obj = form.elements[i];		 		 		 
		packUp(obj); 
	    if(obj.v_type == "string") forString(obj);
        else if(obj.v_type == "zip") forZip(obj);
        else if(obj.v_type == "money") forMoney(obj);
        else if(obj.v_type == "0_9") for0_9(obj);
		else if(obj.v_type == "int") forInt(obj);
		else if(obj.v_type == "float") forFloat(obj);
		else if(obj.v_type == "cfloat") forCFloat(obj);
		else if(obj.v_type == "email")
		{
  	      if(chkemail(obj.value)==0)
	      {
			rdShowMessageDialog("电子邮件地址非法！");
			obj.value="";
			obj.focus();
            return false;
	      }
	      else
	      {
            return true; 
	      }
	    }
		else if(obj.v_type == "date") 
		{
			if(validDate(obj)==false) 
				return false; 
		}
		else if(obj.v_type == "time") 
		{
			if(validTime(obj)==false)
				return false;
		}
		else if(obj.v_type == "date_time") 
		{
           if(validTotalDate(obj)==false)
			   return false;
		}
		else if(obj.v_type == "date.year") forDate_Year(obj);
		else if(obj.v_type == "date.month") forDate_Month(obj);
		else if(obj.v_type == "date.day") forDate_Day(obj);
		else if(obj.v_type == "pwd") forPwd(obj);
		else if(obj.v_type == "phone") forPhone(obj);
		else if(obj.v_type == "mobphone") forMobilePhone(obj);
		else if(obj.v_type == "idcard") forIdCard(obj);
		else rdShowMessageDialog("程序错误：'" + obj.name + "的’v_type =" + obj.v_type + "'不是一个合法的类型！");     
		if(flag == 1) {
	      flag = 0;
		  return false;
		}

     }
	 
     return true;
}

//*********************基本函数***************************


function isMadeOf(val,str)
{

	var jj;
	var chr;
	for (jj=0;jj<val.length;++jj){
		chr=val.charAt(jj);
		if (str.indexOf(chr,0)==-1)
			return false;			
	}
	
	return true;
}
 
function isSizeOf(val,min,max)
{
    var maxval = parseFloat(max);
	var minval = parseFloat(min);
	var selval = parseFloat(val);
	
	if (isNaN(selval)){
	  return false;
	}
	
	if (!isNaN(maxval)){
	  if (selval > maxval){
	    return false;
	  }
	}
	if (!isNaN(minval)){
	  if (selval < minval){
	    return false;
	  }
	}
	
    /*
	if (val < min || val > max){
	  return false;	
	}
	*/
		
	return (true);
}


function isLengthOf(val,min,max)
{   
    	
	var minlen = parseInt(min);
	var maxlen = parseInt(max);
	
	if (!isNaN(maxlen)){
	  if (val.length > maxlen){
	    return false;
	  }
	}
	if (!isNaN(minlen)){
	  if (val.length < minlen){
	    return false;
	  }
	}
	
	/*
	if (val.length < minlen || val.lengh > maxlen ){
	  return false;
	}
	*/
	return true;
}

//判断小数点
function isValid_dot(val)
{   
    
    var subvalue;
    
    if (val.indexOf(".",0) != -1){
	
	   subvalue = val.substring(val.indexOf(".",0)+1);
	   
	  if (subvalue.indexOf(".",0) != -1){
	    return false;  
	  }
	  
	}
    
	return true;
	
}

//判断负号
function isValid_negative(val)
{
    
    var subvalue;
    
    if (val.indexOf("-",0) != -1){
	
	   if (val.indexOf("-",0) > 0){
	     return false;
	   }
	   
	   subvalue = val.substring(val.indexOf("-",0)+1);
	  
	  if (subvalue.indexOf("-",0) != -1){
	    return false;  		
	  }
	  
	}
    
	return true;
	

}

//判断合适长度
function isRight_length(val,num)
{
     var len = parseInt(num);
	 
	 if (isNaN(len)){ return true;}
	 
	 if (val.length != len){
	   return false;
	 }

     return true;

}

  function trimSubStr(ATrimStr,ASubStr,AWhere)
  {  
    var tTrLength,tSbLength,tempLength;
    var tempString;
    var i; 

    tTrLength = ATrimStr.length;
    tSbLength = ASubStr.length;

    if (tSbLength == 0){return ATrimStr;}
    if (tSbLength > tTrLength){return ATrimStr;}
  
    tempString = ATrimStr;
    switch(AWhere)
	{
      case 0://所有
        do{
          tempLength = tempString.length;
          tempString = tempString.replace(ASubStr,"");
        } while(tempLength != tempString.length);
        break; 
      case 1://左
        while (true){
          if (tempString.length < tSbLength) break;
          for (i = 0;i < tSbLength;i++)
            if (ASubStr.charAt(i) != tempString.charAt(i)) 
              return tempString;
          tempString = tempString.replace(ASubStr,"");  
        };  
      case 2://右
        while(true){
          tempLength = tempString.length;
          if (tempLength < tSbLength){return tempString;}
          for (i = 0;i < tSbLength;i ++){
            if (ASubStr.charAt(i) != tempString.charAt(tempLength - tSbLength+i)){
              return tempString;
            }  
          }    
          tempString = tempString.substr(0,tempLength-tSbLength); 
        };
      default:
        return tempString;
    }
    return tempString; 
  }
//***************************************************************************************************


//****************扩充函数列表*********************
//整理域的属性值，校验v_×域的值是否符合标准
function  packUp(obj)
{   

     if (obj == null){
	   rdShowMessageDialog("非法对象");
	   return false;
	 }
	 
	 if (obj.value != null){
	   obj.value = trimSubStr(trimSubStr(obj.value," ",1)," ",2);
	 }
	     //创建v_name属性
		 try{
		   if (obj.v_name == null){
			 //rdShowMessageDialog("创建v_name属性");
			 obj.v_name = new String(obj.name);
		    }			 
		 }catch(exception){}
		 
		 //创建v_type属性
		 try{
	       if (obj.v_type == null){
			 //rdShowMessageDialog("创建v_type属性");
			 obj.v_type = new String("string");  
		   }			  
	     }catch(exception){}
		 
		 //创建v_minlength属性
		 try{
		   if (obj.v_minlength == null){
			 //rdShowMessageDialog("创建v_minlength属性");
			 obj.v_minlength = new String("0");
		    }			 
		 }catch(exception){}
		 
		 //创建v_maxlength属性
		 try{
		   if (obj.v_maxlength == null){
			 //rdShowMessageDialog("创建v_maxlength属性");
			 obj.v_maxlength = new String("");
		    }			 
		 }catch(exception){}
		 
		 //创建v_maxvalue属性
		 try{
		   if (obj.v_maxvalue == null){
			 //rdShowMessageDialog("创建v_maxvalue属性");
			 obj.v_maxvalue = new String("");
		    }			 
		 }catch(exception){}
		 
		 //创建v_minvalue属性
		 try{
		   if (obj.v_minvalue == null){
			 //rdShowMessageDialog("创建v_minvalue属性");
			 obj.v_minvalue = new String("");
		    }			 
		 }catch(exception){}
		 
		//创建v_must属性
		 try{
		   if (obj.v_must == null){
			 //rdShowMessageDialog("创建v_must属性");
			 obj.v_must = new String("0");
		    }			 
		 }catch(exception){} 
	
	
	return true;
	
}



//*********************扩充函数***************************



function forDate(useryear,usermonth,userday)
{
	var myyear;
	var mymonth;
	var myday;
	//myyear=parseInt(useryear);
	//mymonth=parseInt(usermonth);
	//myday=parseInt(userday);
	myyear=useryear;
	mymonth=usermonth;
	myday=userday;
	if (myyear < 1950 || myyear > 2050 ||mymonth < 1 ||mymonth > 12 || myday < 1 || myday > 31)
		return (false);
        if(mymonth==4 || mymonth==6 || mymonth==9 || mymonth==11)
        { 
        	if(myday>30)
            		return (false);
        }
	if(myyear%4==0)
	{
	 	if((myyear%100==0 && myyear%400==0) || myyear%100!=0)
          	{
            		if(mymonth==2 && myday>29)
             			return (false);
            		else
	     			return (true);
          	}
        }
	else
	{
          	if(mymonth==2 && myday>28)
             		return (false);
             	else
             		return (true);
	}
}



function  forString(obj)//判断一般字符串的长度
{     
      //必填项判断 
	  if (obj.v_must!="0"){
	  
	    if (obj.value.length == 0){
		   rdShowMessageDialog("'" + obj.v_name + "'为必填项，请务必填写");
		   flag = 1;
		   obj.focus();
		   return false;
		}
	    
	  }
	  
	  if (!isLengthOf(obj.value,obj.v_minlength,obj.v_maxlength)){
	    flag = 1;
		rdShowMessageDialog("'"+obj.v_name+"'的值不正确！长度有错误！");
		obj.focus();
		return false;
	  
	  }
	  
	  return true;
      
}

function forZip(obj)//判断邮政编码
{
    if (!forString(obj)){
	  flag = 1;
	  obj.focus();
	  return false;
	}else{
	  if (obj.value.length == 0){
	    return true;
	  }
	}
  
    if (!isMadeOf(obj.value,numStr)){
        flag = 1;
        rdShowMessageDialog("'" + obj.v_name + "'的值不正确！请输入数字！");
	    obj.focus();
	    return false;
      }
	      
    if (!isRight_length(obj.value,"6")){
      flag = 1;
      rdShowMessageDialog("'"+obj.v_name+"'的值不正确！长度有错误！(6位数字)");
	  obj.focus();
	  return false;
    } 

    return true;
}

function forMoney(obj)//判断金额
{   
    var chPos = -1;
    if (!forString(obj)){
	  flag = 1;
	  obj.focus();
	  return false;
	}else{
	  if (obj.value.length == 0){
	    return true;
	  }
	}
    chPos = obj.value.indexOf(".");
    if (!isMadeOf(obj.value,moneyStr)){
      flag = 1;
      rdShowMessageDialog("'" + obj.v_name + "'的值不正确！请输入数字！");
	  obj.focus();
	  return false;
    }
    if(chPos < obj.value.length -3 && chPos != -1)	
    {
    	rdShowMessageDialog("'" + obj.v_name + "'的值不正确！小数点后保留两位！");
    	flag = 1;
    	obj.focus();
	return false;	
    }     
	if (!isValid_dot(obj.value)){
	    flag = 1;
	    rdShowMessageDialog("'" + obj.v_name + "'的值不正确！小数点有错误！");
	    obj.focus();
	    return false;  
	}
	
	if (!isSizeOf(obj.value,obj.v_minvalue,obj.v_maxvalue)){
	  flag = 1;
	  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！超出规定范围！");
	  obj.focus();
	  return false;
	} 
	
	return true;
	
}


function for0_9(obj) //判断字符是否由0－9个数字组成
{    
    if (!forString(obj)){
	  flag = 1;
	  obj.focus();
	  return false;
	}else{
	  if (obj.value.length == 0){
	    return true;
	  }
	}
    
	if (!isMadeOf(obj.value,numStr)){
      flag = 1;
      rdShowMessageDialog("'" + obj.v_name + "'的值不正确！请输入数字！");
	  obj.focus();
	  return false;
    }
	
	return true;
	
}


function forInt(obj)//判断字符是否是整数组成，可以为负数
{
    if (!forString(obj)){
	  flag = 1;
	  obj.focus();
	  return false;
	}else{
	  if (obj.value.length == 0){
	    return true;
	  }
	}
   
    if (!isMadeOf(obj.value,intStr)){
      flag = 1;
      rdShowMessageDialog("'" + obj.v_name + "'的值不正确！请输入数字！");
	  obj.focus();
	  return false;
    }
	
	if (!isValid_negative(obj.value)){
      flag = 1;
      rdShowMessageDialog("'" + obj.v_name + "'的值不正确！'-'符号有错误！");
	  obj.focus();
	  return false;
    }
	
	if (!isSizeOf(obj.value,obj.v_minvalue,obj.v_maxvalue)){
	  flag = 1;
	  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！超出规定范围！");
	  obj.focus();
	  return false;
	}
    
   return true;
   
}


function forFloat(obj)//判断字符是否是数字，可以有小数点，负数
{
    if (!forString(obj)){
	  flag = 1;
	  obj.focus();
	  return false;
	}else{
	  if (obj.value.length == 0){
	    return true;
	  }
	}
   
    if (!isMadeOf(obj.value,floatStr)){
      flag = 1;
      rdShowMessageDialog("'" + obj.v_name + "'的值不正确！请输入数字！");
	  obj.focus();
	  return false;
    }
	
	if (!isValid_dot(obj.value)){
	    flag = 1;
	    rdShowMessageDialog("'" + obj.v_name + "'的值不正确！小数点有错误！");
	    obj.focus();
	    return false;  
	}	
	
	if (!isValid_negative(obj.value)){
      flag = 1;
      rdShowMessageDialog("'" + obj.v_name + "'的值不正确！'-'符号有错误！");
	  obj.focus();
	  return false;
    }
	
	if (!isSizeOf(obj.value,obj.v_minvalue,obj.v_maxvalue)){
	  flag = 1;
	  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！超出规定范围！");
	  obj.focus();
	  return false;
	}

   return true;

}

function forCFloat(obj)//判断字符是否是浮点数，不能是负数。在v_maxlength中提供小数点前后的位长，例：v_maxlength=10.2 表示小数点前可有10位，小数点后可有两位
{
    var a1, a2, a3;
    var k;
    if(obj.value.length<1){
    	return true;
    }    
    if (!isMadeOf(obj.value,floatStr)){
      flag = 1;
      rdShowMessageDialog("'" + obj.v_name + "'的值不正确！请输入数字！");
	  obj.focus();
	  return false;
    }
	
	if (!isValid_dot(obj.value)){
	    flag = 1;
	    rdShowMessageDialog("'" + obj.v_name + "'的值不正确！小数点有错误！");
	    obj.focus();
	    return false;  
	}	
	
	if (!isValid_negative(obj.value)){
      flag = 1;
      rdShowMessageDialog("'" + obj.v_name + "'的值不正确！'-'符号有错误！");
	  obj.focus();
	  return false;
    }

	if (isValid_dot(obj.v_maxlength)){
		a1=obj.v_maxlength;

		k=a1.indexOf(".",0);
		if (k>0) {
			a2=a1.substr(0,k);
			a3=a1.substr(k+1);
		} else {
			a2=a1;
			a3=0;
		}
	}

	var testStr1 ="^\\d{1,"+a2+"}$|^\\d{1,"+a2+"}\\.\\d{0,"+a3+"}$"
	var reg = new RegExp(testStr1,"ig");

	if (!reg.test(obj.value))
	{
	  flag = 1;
	  if (a3!=0)
	  {
		  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！小数点前 "+a2+" 位，小数点后 "+a3+" 位！");
	  }else 
		  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！共 "+a2+" 位！");
	  obj.focus();
	  return false;
	}

	if (!isSizeOf(obj.value,obj.v_minvalue,obj.v_maxvalue)){
	  flag = 1;
	  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！超出规定范围！");
	  obj.focus();
	  return false;
	}

   return true;

}

function forPhone(obj)//判断字符是否是合法的电话021-55555555,(021)2222222,
{
    if (!forString(obj))
	{
	  flag = 1;
	  obj.focus();
	  return false;
	}
	else
	{
	  if (obj.value.length == 0)
	  {
	    return true;
	  }
	  return false;
	}
	
	if (!isMadeOf(obj.value,phoneStr))
	{
	  flag = 1;
	  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！请填写数字,可以包含(,),－,#符号"); 
	  obj.focus();
	  return false; 
	}
    return true; 
}

//------------------------------------
function forIdCard(obj)//判断字符是否是合法的身份证
{
   if (!forString(obj)){
	  flag = 1;
	  obj.focus();
	  return false;
	}else{
	  if (obj.value.length == 0){
	    return true;
	  }
	}
	
    if (!isMadeOf(obj.value,numStr))
    {
	  flag = 1;
	  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！身份证必须填写数字！");
	  obj.value="";
	  obj.focus();
	  return false;
    }
	
    if (!isRight_length(obj.value,"15") && !isRight_length(obj.value,"18"))
    {
	  flag = 1;
	  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！身份证长度不正确(15或18位数字)！");
	  obj.value="";
	  obj.focus();
	  return false;
    }
	
		/************判断15位的身份证是否正确*****************/
    if(isRight_length(obj.value,"15"))
    {	
        if (obj.value.substring(8,10)<"01" || obj.value.substring(8,10)>"12"
           	|| obj.value.substring(10,12)<"01" || obj.value.substring(10,12)>"31")
        { 
            rdShowMessageDialog( "日期输入错误！" );
            obj.value="";
	        obj.focus();
            return false;
	}
        if (obj.value.substring(8,10) == "04" || obj.value.substring(8,10) == "06" || 
             obj.value.substring(8,10) == "09" || obj.value.substring(8,10) == "11")	         
	{
             if(obj.value.substring(10,12)>"30")
             {
                rdShowMessageDialog("该月份最多30天,没有31号！");
                obj.value="";
                obj.focus();
                return false;
             }
        }                 
        if (obj.value.substring(8,10)=="02" && obj.value.substring(10,12)>"29")
        {
            rdShowMessageDialog("二月份最多29天！");
            obj.value="";
        	  obj.focus();
            return false;
        }
    }    
	      
	/************判断15位的身份证是否正确结束*****************/
	/************判断18位的身份证是否正确*****************/
	if(isRight_length(obj.value,"18"))
	{		         
          if(obj.value.substring(6,10)<"1900" ||
	     obj.value.substring(6,10)>"2050" ||
	     obj.value.substring(10,12)<"01" ||
             obj.value.substring(10,12)>"12" ||
             obj.value.substring(12,14)<"01" ||
             obj.value.substring(12,14)>"31")
          {
            rdShowMessageDialog("日期输入错误！");
            obj.value="";
	  obj.focus();
            return false;
	  }
	   
	  if (obj.value.substring(10,12) == "04" ||
              obj.value.substring(10,12) == "06" ||
              obj.value.substring(10,12) == "09" ||
              obj.value.substring(10,12) == "11")  	         
	  {
             if(obj.value.substring(12,14)>"30")
             {
                rdShowMessageDialog("该月份最多30天,没有31号！");
                obj.value="";
	  obj.focus();
                return false;
             }
          }                 
       
          if (obj.value.substring(10,12)=="02" &&
             obj.value.substring(12,14)>"29")
          {
            rdShowMessageDialog("二月份最多29天！");
obj.value="";
	  obj.focus();
            return false;
          }
        }
 	return true;
}
//------------------------------------

/*
function void checkPwd(obj1,obj2)//判断字符密码，两次输入密码是否相等
*/
function checkPwd(obj1,obj2)
 {
  var pwd1 = obj1.value;
  var pwd2 = obj2.value;
  if(pwd1 != pwd2)
  {
   var message = "'" + obj1.v_name + "'和'" + obj2.v_name + "'不一致，请重新输入！";
   rdShowMessageDialog(message);
   obj1.value = "";
   obj2.value = "";
   obj1.focus();
   return false;
  }
  return true;
 }

/*-----------------------------------------------------------------*/
function checkElement(element)          //窗体中单个元素的判断
{
	var obj="document.all."+element;
    if(obj.v_type == "string") forString(obj);
	else if(obj.v_type == "zip") forZip(obj);
	else if(obj.v_type == "money") forMoney(obj);
	else if(obj.v_type == "0_9") for0_9(obj);
	else if(obj.v_type == "int") forInt(obj);
	else if(obj.v_type == "float") forFloat(obj);
	else if(obj.v_type == "cfloat") forCFloat(obj);
    else if(obj.v_type == "email")
		{
  	      if(chkemail(obj.value)==0)
	      {
			rdShowMessageDialog("电子邮件地址非法！");
			obj.value="";
			obj.focus();
            return false;
	      }
	      else
	      {
            return true; 
	      }
	    }
		else if(obj.v_type == "date") 
		{
			if(validDate(obj)==false) 
				return false; 
		}
		else if(obj.v_type == "time") 
		{
			if(validTime(obj)==false)
				return false;
		}
		else if(obj.v_type == "date_time") 
		{
           if(validTotalDate(obj)==false)
			   return false;
		}	
	else if(obj.v_type == "date") forDate(obj);
	else if(obj.v_type == "date.year") forDate_Year(obj);
	else if(obj.v_type == "date.month") forDate_Month(obj);
	else if(obj.v_type == "date.day") forDate_Day(obj);
	else if(obj.v_type == "pwd") forPwd(obj);
	else if(obj.v_type == "phone") forPhone(obj);
	else if(obj.v_type == "mobphone") forMobilePhone(obj);
	else if(obj.v_type == "idcard") forIdCard(obj);
	else rdShowMessageDialog("程序错误：'" + obj.name + "的’v_type =" + obj.v_type + "'不是一个合法的类型！");     
	if(flag == 1) 
	{
	      flag = 0;
	      return false;
	}
        return true;
}
/*-----------------------------------------------------------------*/
function forDate_Year(obj)   //判断输入的年份的有效性
{
	forInt(obj);
	if(flag==1)
	{
		obj.value = "";
		return false;
	}
	if(obj.value.length != 4)
	{
		rdShowMessageDialog("年份的有效长度为4位！");
		flag = 1;
		obj.focus();
		return false;
	}
}
function forDate_Month(obj)   //判断输入的月份的有效性
{
	forInt(obj);
	if(flag==1)
	{
		obj.value = "";
		return false;
	}
	if(obj.value > 12 || obj.value < 01)
	{
		rdShowMessageDialog("月份输入有误！（在01～12之间）");
		flag = 1;
		obj.focus();
		return false;
	}
	if(obj.value.length != 2)
	{
		rdShowMessageDialog("月份的有效长度为2位！");
		flag = 1;
		obj.focus();
		return false;
	}
}
function forDate_Day(obj)   //判断输入的日期的有效性
{
	forInt(obj);
	if(flag==1)
	{
		obj.value = "";
		return false;
	}
	if(obj.value > 31 || obj.value < 01)
	{
		rdShowMessageDialog("日期输入有误！");
		flag = 1;
		obj.focus();
		return false;
	}	
	if(obj.value.length != 2)
	{
		rdShowMessageDialog("日期的有效长度为2位！");
		flag = 1;
		obj.focus();
		return false;
	}
}
function forMobilePhone(obj)   //判断手机号码的有效性
{
        var MobPhone = obj.value;
        var errorPos = "";
        if(obj.v_name != "")
	{
		errorPos = "(错误位于：'" + obj.v_name + "')"
	}
	forInt(obj);
	if(flag==1)
	{
		obj.value = "";
		return false;
	}          
	/*if( MobPhone.length != 11 )
	{
		rdShowMessageDialog("手机号码只能是11位！" + errorPos);
		obj.value = "";
		flag = 1;
		obj.focus();
		return false;
	}*/
	if (!forString(obj)){
	  flag = 1;
	  obj.focus();
	  return false;
	}else{
	  if (obj.value.length == 0){
	    return true;
	  }
	}
	/*
	if(parseInt(MobPhone.substring(0,3),10)<135 || parseInt(MobPhone.substring(0,3),10)>139)
	{
		rdShowMessageDialog("手机号码范围应该在135~139之间");
		obj.value = "";
		obj.focus();
		return false;		
	}*/
	if(MobPhone.substring(0,1) !=1 || MobPhone.substring(1,2) !=3)
	{
		rdShowMessageDialog("手机号码只能以13开头，请重新输入手机号码！" + errorPos);
		obj.value = "";
		flag = 1;
		obj.focus();
		return false;
	}	
} 
function forsumPay_Count(form)
{
	var obj = null;
     	var t = null;
	var tempSum = 0;
	//sum.subentry	合计分项
	//sum.total	合计项
     	for (i=0;i<form.length;i++)
    	{    
		obj = form.elements[i];		 		 		 
		packUp(obj); 
	     	if(obj.v_account == "subentry")
	     	{
	     		forMoney(obj);
	     		if(flag == 1)
	     		{
	     			obj.value = "";
	     			flag = 0;
				return false;
	     		}
			tempSum = tempSum*1 + 1*obj.value;	
	     	}

     	}
	for (i=0;i<form.length;i++)
	{
		obj = form.elements[i];
		packUp(obj);
		if(obj.v_account == "total")
		{
			obj.value = tempSum;
			break;
		}
	} 
        return true;
}  


//*****************WWW部引进函数**************************
//操作图像系列函数
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function toggleMenu(currMenu) {
        if (document.all) {
                thisMenu = eval("document.all." + currMenu + ".style")
                if (thisMenu.display == "block") {
                        thisMenu.display = "none"
                }
                else {
                        thisMenu.display = "block"
                }
                return false
        }
        else {
                return true
        }
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

//函数名：chksafe
//功能介绍：检查是否含有"'",'\\',"/"
//参数说明：要检查的字符串
//返回值：0：是 1：不是
    function chksafe(a)
    {

      fibdn = new Array ("'" ,"\\", "、", ",", ";", "/");
      i=fibdn.length;
      j=a.length;
      for (ii=0;ii<i;ii++)
              { for (jj=0;jj<j;jj++)
                        { temp1=a.charAt(jj);
      temp2=fibdn[ii];
      if (temp1==temp2)
          { return 0; }
      }
              }
              return 1;

    }


//函数名：fucCheckNUM
//功能介绍：检查是否为数字
//参数说明：要检查的数字
//返回值：1为是数字，0为不是数字
    function fucCheckNUM(NUM)
    {
      var i,j,strTemp;
      strTemp="0123456789";
      if ( NUM.length== 0)
        return 0
        for (i=0;i<NUM.length;i++)
        {
          j=strTemp.indexOf(NUM.charAt(i));
          if (j==-1)
          {
//说明有字符不是数字
            return 0;
          }
        }
//说明是数字
        return 1;
    }

 	
//函数名：chkspc
//功能介绍：检查是否含有空格
//参数说明：要检查的字符串
//返回值：0：是 1：不是
    function chkspc(a)
    {
      var i=a.length;
      var j = 0;
      var k = 0;
      while (k<i)
      {
        if (a.charAt(k) != " ")
          j = j+1;
        k = k+1;
      }
      if (j==0)
      {
        return 0;
      }

      if (i!=j)
             { return 2; }
      else
      {
        return 1;
      }
    }


//函数名：chkemail
//功能介绍：检查是否为Email Address
//参数说明：要检查的字符串
//返回值：0：不是 1：是
    function chkemail(a)
    { 
		var i=a.length;
		var temp = a.indexOf('@');
		var tempd = a.indexOf('.');
		if (temp > 1) {
		  if ((i-temp) > 3){

			if ((i-tempd)>0){
			  return 1;
			}
		  }
		}
		return 0;
    }

//opt1 小数 opt2 负数
//当opt2为1时检查num是否是负数
//当opt1为1时检查num是否是小数
//返回1是正确的，0是错误的
    function chknbr(num,opt1,opt2)
    {
      var i=num.length;
      var staus;
		//staus用于记录.的个数
      status=0;
      if ((opt2!=1) && (num.charAt(0)=='-'))
      {
		//rdShowMessageDialog("You have enter a invalid number.");
        return 0;

      }

  if(i>0)
  {
	  //当只有一位时
	  if(i==1)
	  {
		  if(num.charAt(0)<'0' || num.charAt(0)>'9')
			  return 0;
	  }

		//当最后一位为.时出错
      if (num.charAt(i-1)=='.')
      {
		//rdShowMessageDialog("You have enter a invalid number.");
        return 0;
      }

      for (j=0;j<i;j++)
      {
        if (num.charAt(j)=='.')
        {
          status++;
        }
        if (status>1)
        {
	 	  //rdShowMessageDialog("You have enter a invalid number.");
          return 0;
        }
        if (num.charAt(j)<'0' || num.charAt(j)>'9' )
        {
          if (((opt1==0) || (num.charAt(j)!='.')) && (j!=0))
          {
             //rdShowMessageDialog("You have enter a invalid number.");
             return 0;
           }
        }
	  }
      return 1;
  }
    }

//函数名：chkdate
//功能介绍：检查是否为日期
//参数说明：要检查的字符串
//返回值：0：不是日期 1：是日期
    function chkdate(datestr)
    {
      var lthdatestr
      if (datestr != "")
        lthdatestr= datestr.length ;
      else
        lthdatestr=0;

      var tmpy="";
      var tmpm="";
      var tmpd="";
//var datestr;
      var status;
      status=0;
      if ( lthdatestr== 0)
        return 0


        for (i=0;i<lthdatestr;i++)
               { if (datestr.charAt(i)== '-')
        {
          status++;
        }
        if (status>2)
        {
           return 0;
        }
        if ((status==0) && (datestr.charAt(i)!='-'))
        {
          tmpy=tmpy+datestr.charAt(i)
        }
          if ((status==1) && (datestr.charAt(i)!='-'))
          {
            tmpm=tmpm+datestr.charAt(i)
          }
            if ((status==2) && (datestr.charAt(i)!='-'))
            {
              tmpd=tmpd+datestr.charAt(i)
            }

        }
        year=new String (tmpy);
        month=new String (tmpm);
        day=new String (tmpd)
         if ((tmpy.length!=4) || (tmpm.length>2) || (tmpd.length>2))
        {
           return 0;
        }
        if (!((1<=month) && (12>=month) && (31>=day) && (1<=day)) )
        {
           return 0;
        }
        if (!((year % 4)==0) && (month==2) && (day==29))
        {
           return 0;
        }
        if ((month<=7) && ((month % 2)==0) && (day>=31))
        {
           return 0;

        }
        if ((month>=8) && ((month % 2)==1) && (day>=31))
        {
           return 0;
        }
        if ((month==2) && (day==30))
        {
           return 0;
        }

        return 1;
    }

//函数名：fucPWDchk
//功能介绍：检查是否含有非数字或字母
//参数说明：要检查的字符串
//返回值：0：含有 1：全部为数字或字母
    function fucPWDchk(str)
    {
      var strSource
          ="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var ch;
      var i;
      var temp;

      for (i=0;i<=(str.length-1);i++)
      {

        ch = str.charAt(i);
        temp = strSource.indexOf(ch);
        if (temp==-1)
        {
          return 0;
        }
      }
      if (strSource.indexOf(ch)==-1)
      {
        return 0;
      }
      else
      {
        return 1;
      }
    }

	//判断是否为实数，可正可负，不是实数则返回0（此函数不应在页面中直接调用）
	//应在页面中调用check系列函数，他们对is系列函数进行了封装，便于在页面中调用
	function isReal(Num)
	{
	  var comp1="-0123456789.";
	  var comp2="1234567890.";
	  var comp3="1234567890";

	  var aChar;
	  var i;
	  var j;

	   Num=jtrim(Num);

	  if(Num.length==1)
	  {
		aChar=Num.charAt(0);
		if(comp3.indexOf(aChar)==-1)		
		  return 0;
	  }
	  else
	  {
	    for(i=0;i<Num.length;i++)
	    {
	      aChar=Num.charAt(i);
		  if(i==0)
	      {
			if(comp1.indexOf(aChar)==-1)
			  return 0;
		  }
		  else if(i>0 && i<Num.length-1)
		  {
		    if(comp2.indexOf(aChar)==-1)
			  return 0;
		  }
		  else
	      {
		    if(comp3.indexOf(aChar)==-1)
			  return 0;
		  }
	    }
	  }
	  if(Num.charAt(0)=="0" && Num.indexOf(".")==-1  && Num.length>1) return 0;

	  return 1;
	}

	//判断是否为正实数，不是正实数则返回0（此函数不应在页面中直接调用）
	//应在页面中调用check系列函数，他们对is系列函数进行了封装，便于在页面中调用
    function isPlusReal(Num)
	{
	  var comp1="0123456789.";
	  var comp2="1234567890.";
	  var comp3="1234567890";

	  var aChar;
	  var i;
	  var j;

	  Num=jtrim(Num);
 	  if(Num.length==1)
	  {
		aChar=Num.charAt(0);
		if(comp3.indexOf(aChar)==-1)		
		  return 0;
	  }
	  else
	  {
 	    for(i=0;i<Num.length;i++)
	    {
	      aChar=Num.charAt(i);
		  if(i==0)
	      {
			if(comp1.indexOf(aChar)==-1)
			  {
 			  return 0;
			  }
		  }
		  else if(i>0 && i<Num.length-1)
		  {

		    if(comp2.indexOf(aChar)==-1)
			  {			   
			  return 0;}
		  }
		  else
	      {
		    if(comp3.indexOf(aChar)==-1)
			  return 0;
		  }
	    }
	  }
	  if(Num.charAt(0)=="0" && Num.indexOf(".")==-1) return 0;
	  return 1;
	}

    //判断是否为非负实数，不是非负实数则返回0（此函数不应在页面中直接调用）
	//应在页面中调用check系列函数，他们对is系列函数进行了封装，便于在页面中调用
	 function isNotMinusReal(Num)
	{
	  var comp1="0123456789.";
	  var comp2="1234567890.";
	  var comp3="1234567890";

	  var aChar;
	  var i;
	  var j;

	  Num=jtrim(Num);

	  if(Num.length==1)
	  {
		aChar=Num.charAt(0);
		if(comp3.indexOf(aChar)==-1)		
		  return 0;
	  }
	  else
	  {
	    for(i=0;i<Num.length;i++)
	    {
	      aChar=Num.charAt(i);
		  if(i==0)
	      {
			if(comp1.indexOf(aChar)==-1)
			  return 0;
		  }
		  else if(i>0 && i<Num.length-1)
		  {
		    if(comp2.indexOf(aChar)==-1)
			  return 0;
		  }
		  else
	      {
		    if(comp3.indexOf(aChar)==-1)
			  return 0;
		  }
	    }
	  }
 
	  return 1;
	}


//检查是否实数
function check_Real(obj,message)
    {	 
	 if(jtrim(document.all(obj).value).length==0 || isReal(document.all(obj).value)=="0")
	 {
			 rdShowMessageDialog(message+"非法，请重新输入！");		
		  document.all(obj).value="";
				document.all(obj).focus();
				return false;
	 }
	 return true;
   }

//检查是否正实数
	function check_plusReal(obj,message)
    {
	 if(jtrim(document.all(obj).value).length==0 || isPlusReal(document.all(obj).value)=="0" || parseFloat(document.all(obj).value)==0)
	 {
		  rdShowMessageDialog(message+"非法，请重新输入！");
		  document.all(obj).value="";
				document.all(obj).focus();
				return false;
	 }
	 	 return true;
   }

//检查是否为空
function check_null(obj,message)
{	 
	 if(jtrim(document.all(obj).value).length==0)
	 {
			 rdShowMessageDialog(message+"不能为空！");		
		  document.all(obj).value="";
				document.all(obj).focus();
				return false;
		}
			 return true;
}

//检查是否非负实数
function check_NotMinusReal(obj,message)
{	 
	 if(jtrim(document.all(obj).value).length==0 || isNotMinusReal(document.all(obj).value)=="0")
	 {
			 rdShowMessageDialog(message+"非法，请重新输入！");		
		  document.all(obj).value="";
				document.all(obj).focus();
				return false; 
		}
			 return true;
}

//去掉字符串的空格
function jtrim(str)
        { while (str.charAt(0)==" ")
        {str=str.substr(1);}
    while (str.charAt(str.length-1)==" ")
                                    {str=str.substr(0,str.length-1);}
    return(str);
    }

//函数名：fucCheckTEL
//功能介绍：检查是否为电话号码
//参数说明：要检查的字符串
//返回值：1为是合法，0为不合法
    function fucCheckTEL(TEL)
    {
      var i,j,strTemp;
      strTemp="0123456789-()# ";
      for (i=0;i<TEL.length;i++)
      {
        j=strTemp.indexOf(TEL.charAt(i));
        if (j==-1)
        {
//说明有字符不合法
          return 0;
        }
      }
//说明合法
      return 1;
    }

//函数名：fucCheckLength
//功能介绍：检查字符串的长度
//参数说明：要检查的字符串
//返回值：长度值
    function fucCheckLength(strTemp)
    {
      var i,sum;
      sum=0;
      for(i=0;i<strTemp.length;i++)
      {
        if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255))
          sum=sum+1;
        else
          sum=sum+2;
      }
      return sum;
    }
 
    //从全路径名得到文件名
	function getFileName(fullpath)
    {
	var platform = navigator.platform;
	var fileseperator=(platform.indexOf("Win")==-1)?"/":"\\";
	var idx = fullpath.lastIndexOf(fileseperator);
	if(idx == -1)
	{
		return fullpath;
	}
	else if(idx >= fullpath.length -1)
	{
		return "";
	}
	else
	{
		return fullpath.substring(idx+1);
	}
}
	//------------v1.1-------------------------
function PubSimpSel(pageTitle,fieldName,sqlStr,selType,retQuence,retToField)
{
    var path = "../../page/public/fPubSimpSel.jsp";
    path = path + "?sqlStr=" + sqlStr + "&retQuence=" + retQuence;
    path = path + "&fieldName=" + fieldName + "&pageTitle=" + pageTitle;
    path = path + "&selType=" + selType;  
    /*
    var ret = window.open (path, "银行代码", 
	        "height=400, width=500,left=200, top=200,toolbar=no,menubar=no, scrollbars=yes, resizable=no, location=no, status=yes"); 
	ret.opener.bankCode.value = "1111111111";
	*/
    retInfo = window.showModalDialog(path);
    if(retInfo ==undefined)      
    {   return false;   }
    var chPos_field = retToField.indexOf("|");
    var chPos_retStr;
    var valueStr;
    var obj;
    //alert(retInfo);
    while(chPos_field > -1)
    {
        obj = retToField.substring(0,chPos_field);
        //alert(obj);
        chPos_retInfo = retInfo.indexOf("|");
        valueStr = retInfo.substring(0,chPos_retInfo);
        document.all(obj).value = valueStr;
        retToField = retToField.substring(chPos_field + 1);
        retInfo = retInfo.substring(chPos_retInfo + 1);
        chPos_field = retToField.indexOf("|");
        
    }
}

	function validDate(obj)
{
  var theDate="";
  var one="";
  var flag="0123456789";
  for(i=0;i<obj.value.length;i++)
  { 
     one=obj.value.charAt(i);
     if(flag.indexOf(one)!=-1)
		 theDate+=one;
  }

  if(theDate.length!=8)
  {
	rdShowMessageDialog("日期格式有误，请重新输入！");
	obj.value="";
	obj.focus();
	return false;
  }
  else
  {
     var year=theDate.substring(0,4);
	 var month=theDate.substring(4,6);
	 var day=theDate.substring(6,8);
	 if(parseInt(year)<1900 || parseInt(year)>3000)
	 {
       rdShowMessageDialog("年的格式有误，请重新输入！");
	   obj.value="";
	   obj.focus();
	   return false;
	 }
     if(parseInt(month)<1 || parseInt(month)>12)
	 {
       rdShowMessageDialog("月的格式有误，请重新输入！");
  	   obj.value="";
	   obj.focus();
	   return false;
	 }
     if(parseInt(day)<1 || parseInt(day)>31)
	 {
       rdShowMessageDialog("日的格式有误，请重新输入！");
	   obj.value="";
       obj.focus();
	   return false;
	 }

     if (month == "04" || month == "06" || month == "09" || month == "11")  	         
	 {
         if(parseInt(day)>30)
         {
             //rdShowMessageDialog("该月份最多30天,没有31号！");
	 	     rdShowMessageDialog("该月份最多30天,没有31号！");
 	         obj.value="";
	         obj.focus();
             return false;
         }
      }                 
       
      if (month=="02" && parseInt(day)>29)
      {
         //rdShowMessageDialog("二月份最多29天！");
		 rdShowMessageDialog("二月份最多29天！");
      	 obj.value="";
	     obj.focus();
         return false;
      }
  }
  return true;
}

function validTime(obj)
{
  var theTime="";
  var one="";
  var flag="0123456789";
  for(i=0;i<obj.value.length;i++)
  { 
     one=obj.value.charAt(i);
     if(flag.indexOf(one)!=-1)
		 theTime+=one;
  }

  if(theTime.length!=6)
  {
	rdShowMessageDialog("时间格式有误，请重新输入！");
	obj.value="";
	obj.focus();
	return false;
  }
  else
  {
     var hour=theTime.substring(0,2);
	 var minute=theTime.substring(2,4);
	 var second=theTime.substring(4,6);
	 if(parseInt(hour)<0 || parseInt(hour)>24)
	 {
       rdShowMessageDialog("小时的格式有误，请重新输入！");
	   obj.value="";
       obj.focus();
	   return false;
	 }
     if(parseInt(minute)<0 || parseInt(minute)>60)
	 {
       rdShowMessageDialog("分钟的格式有误，请重新输入！");
	   obj.value="";
       obj.focus();
	   return false;
	 }
     if(parseInt(second)<0 || parseInt(second)>60)
	 {
       rdShowMessageDialog("秒的格式有误，请重新输入！");
	   obj.value="";
       obj.focus();
	   return false;
	 }
  }
  return true;
}

function validTotalDate(obj)
{
  var theTotalDate="";
  var one="";
  var flag="0123456789";
  for(i=0;i<obj.value.length;i++)
  { 
     one=obj.value.charAt(i);
     if(flag.indexOf(one)!=-1)
		 theTotalDate+=one;
  }

  if(theTotalDate.length!=14)
  {
	rdShowMessageDialog("全时间格式有误，请重新输入！");
	obj.value="";
	obj.focus();
	return false;
  }
  else
  {
     var year=theTotalDate.substring(0,4);
	 var month=theTotalDate.substring(4,6);
	 var day=theTotalDate.substring(6,8);
     var hour=theTotalDate.substring(8,10);
	 var minute=theTotalDate.substring(10,12);
	 var second=theTotalDate.substring(12,14);

 	 if(parseInt(year)<1900 || parseInt(year)>3000)
	 {
       rdShowMessageDialog("年的格式有误，请重新输入！");
	   obj.value="";
	   obj.focus();
	   return false;
	 }
     if(parseInt(month)<1 || parseInt(month)>12)
	 {
       rdShowMessageDialog("月的格式有误，请重新输入！");
  	   obj.value="";
	   obj.focus();
	   return false;
	 }
     if(parseInt(day)<1 || parseInt(day)>31)
	 {
       rdShowMessageDialog("日的格式有误，请重新输入！");
	   obj.value="";
       obj.focus();
	   return false;
	 }

     if (month == "04" || month == "06" || month == "09" || month == "11")  	         
	 {
         if(parseInt(day)>30)
         {
             //rdShowMessageDialog("该月份最多30天,没有31号！");
	 	     rdShowMessageDialog("该月份最多30天,没有31号！");
 	         obj.value="";
	         obj.focus();
             return false;
         }
      }                 
       
      if (month=="02" && parseInt(day)>29)
      {
         //rdShowMessageDialog("二月份最多29天！");
		 rdShowMessageDialog("二月份最多29天！");
      	 obj.value="";
	     obj.focus();
         return false;
      }
  	 if(parseInt(hour)<0 || parseInt(hour)>24)
	 {
       rdShowMessageDialog("小时的格式有误，请重新输入！");
	   obj.value="";
       obj.focus();
	   return false;
	 }
     if(parseInt(minute)<0 || parseInt(minute)>60)
	 {
       rdShowMessageDialog("分钟的格式有误，请重新输入！");
	   obj.value="";
       obj.focus();
	   return false;
	 }
     if(parseInt(second)<0 || parseInt(second)>60)
	 {
       rdShowMessageDialog("秒的格式有误，请重新输入！");
	   obj.value="";
       obj.focus();
	   return false;
	 }
  }

}

	function haveTok(a)
	{

      fibdn = new Array ("|");
      i=fibdn.length;
      j=a.length;
      for (ii=0;ii<i;ii++)
      { 
		  for (jj=0;jj<j;jj++)
          { 
			  temp1=a.charAt(jj);
              temp2=fibdn[ii];
              if (temp1==temp2)
              { 
				  return true; 
			  }
          }
      }
      return false;
    }
    
    function oneTok(str,tok,loc)
   {

   var temStr=str;
   if(str.charAt(0)==tok) temStr=str.substring(1,str.length);
   if(str.charAt(str.length-1)==tok) temStr=temStr.substring(0,temStr.length-1);

	var temLoc;
	var temLen;
    for(ii=0;ii<loc-1;ii++)
	{
       temLen=temStr.length;
       temLoc=temStr.indexOf(tok);
       temStr=temStr.substring(temLoc+1,temLen);
 	}
	if(temStr.indexOf(tok)==-1)
	  return temStr;
	else
      return temStr.substring(0,temStr.indexOf(tok));
  }

  function getTokNums(str,tok)
{
   var temStr=str;
   if(str.charAt(0)==tok) temStr=str.substring(1,str.length);
   if(str.charAt(str.length-1)==tok) temStr=temStr.substring(0,temStr.length-1);

   var temLen;
   var temNum=1;
   while(temStr.indexOf(tok)!=-1)
   {	
      temLen=temStr.length;
      temLoc=temStr.indexOf(tok);
      temStr=temStr.substring(temLoc+1,temLen);
	  temNum++;
   }
   return temNum;
}

function orderStr(str,tok)
{
	var temStr=str;
    if(str.charAt(0)==tok) temStr=str.substring(1,str.length);
    if(str.charAt(str.length-1)==tok) temStr=temStr.substring(0,temStr.length-1);

	var brid="";
	var temArr=new Array(getTokNums(temStr,tok));
	for(var i=0;i<temArr.length;i++)
	{
      temArr[i]=jtrim(oneTok(temStr,tok,i+1));
 	}

	for(var i=0;i<temArr.length;i++)
	{
      for(var j=i+1;j<temArr.length;j++)
	  {
        if(parseInt(temArr[i])>parseInt(temArr[j]))
		{
           brid=temArr[i];
		   temArr[i]=temArr[j];
		   temArr[j]=brid;
		}
	  }
	}	

    var retStr="";    
	for(var i=0;i<temArr.length;i++)
	{
      retStr+=temArr[i]+tok;
	}
 	return retStr;
}

function orderOtherStr(str,strFlag,tok)
{
	var temStr=str;
    if(str.charAt(0)==tok) temStr=str.substring(1,str.length);
    if(str.charAt(str.length-1)==tok) temStr=temStr.substring(0,temStr.length-1);

	var brid="";
	var temArr=new Array(getTokNums(temStr,tok));
	var flagArr=new Array(getTokNums(strFlag,tok));
	for(var i=0;i<temArr.length;i++)
	{
      temArr[i]=jtrim(oneTok(temStr,tok,i+1));
	  flagArr[i]=jtrim(oneTok(strFlag,tok,i+1));
 	}

	for(var i=0;i<temArr.length;i++)
	{
      for(var j=i+1;j<temArr.length;j++)
	  {
        if(parseInt(temArr[i])>parseInt(temArr[j]))
		{
           brid=flagArr[i];
		   flagArr[i]=flagArr[j];
		   flagArr[j]=brid;
		}
	  }
	}	

    var retStr="";    
	for(var i=0;i<flagArr.length;i++)
	{
      retStr+=flagArr[i]+tok;
	}
 	return retStr;
}

function to_date(obj)
{
  var theTotalDate="";
  var one="";
  var flag="0123456789";
  for(i=0;i<obj.value.length;i++)
  { 
     one=obj.value.charAt(i);
     if(flag.indexOf(one)!=-1)
		 theTotalDate+=one;
  }
  return theTotalDate;
}