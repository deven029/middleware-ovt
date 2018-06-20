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

  flag=0;
      for (i=0;i<form.length;i++)
    {    
		obj = form.elements[i];
        //if(obj.v_type!=undefined)
		//{
        //  alert(obj.v_name+"=="+obj.v_type+"=="+obj.name+"=="+obj.type+"--"+flag);
		//}
   	    if(obj.v_type == "string") forString(obj);
        else if(obj.v_type == "zip") forZip(obj);
        else if(obj.v_type == "money") forMoney(obj);
        else if(obj.v_type == "0_9") for0_9(obj);
		else if(obj.v_type == "int") forInt(obj);
		else if(obj.v_type == "float") forFloat(obj);
		else if(obj.v_type == "cfloat") forCFloat(obj);
		else if(obj.v_type == "ip") forIP(obj);
		else if(obj.v_type == "email")
		{

          if(obj.v_must=="1")
	      {
            if(jtrim(obj.value).length==0)
			{
				rdShowMessageDialog("电子邮件地址不能为空！");
				if(obj.style.display=="")
				{
                  obj.select();
				  obj.focus();
				}
				return false;
			}
		  }
			
  	      if(chkemail(obj.value)==0)
	      {
			rdShowMessageDialog("电子邮件地址非法！");
			//obj.value="";
			obj.select();
			obj.focus();
            return false;
	      }	     
	    }
		else if(obj.v_type == "date") 
		{
	      if(obj.v_must=="1")
	      {
            if(jtrim(obj.value).length==0)
			{
				rdShowMessageDialog("日期不能为空！");
				if(obj.style.display=="")
				{
				  obj.select();
				  obj.focus();
				}
				return false;
			}
		  }
          else
	      { 
            if(jtrim(obj.value).length>0)
			{
			  if(validDate(obj)==false) 
				return false; 
			}
		  }
		}
		else if(obj.v_type == "time") 
		{
		  if(obj.v_must=="1")
	      {
            if(jtrim(obj.value).length==0)
			{
				rdShowMessageDialog("时间不能为空！");
				if(obj.style.display=="")
				{
                  obj.select();
				  obj.focus();
				}
				return false;
			}
		  }
          else 
	      { 
            if(jtrim(obj.value).length>0)
			{

			  if(validTime(obj)==false) 
				return false; 
			}		
		  }		
        }
		else if(obj.v_type == "date_time") 
		{
          if(obj.v_must=="1")
	      {
            if(jtrim(obj.value).length==0)
			{
				rdShowMessageDialog("全日期不能为空！");
				if(obj.style.display=="")
				{
                  obj.select();
				  obj.focus();
				}
				return false;
			}
		  }
          else
	      { 
            if(jtrim(obj.value).length>0)
			{

			  if(validTotalDate(obj)==false) 

				return false; 
			}
		  }
		
        }
		else if(obj.v_type == "date.year") forDate_Year(obj);
		else if(obj.v_type == "date.month") forDate_Month(obj);
		else if(obj.v_type == "date.day") forDate_Day(obj);
		else if(obj.v_type == "pwd") forPwd(obj);
		else if(obj.v_type == "phone") forPhone(obj);
		else if(obj.v_type == "mobphone") forMobilePhone(obj);
		else if(obj.v_type == "idcard") forIdCard(obj);
 		if(flag == 1) {			
	      flag = 0;
		  return false;
		}
 
     }	 
     return true;
}
/*-----------------------------------------------------------------*/
function checkElement(element)          //窗体中单个元素的判断
{
 	var obj=document.all(element); 	 
    if(obj.v_type == "string") forString(obj);
	else if(obj.v_type == "zip") forZip(obj);
	else if(obj.v_type == "money") forMoney(obj);
	else if(obj.v_type == "0_9") for0_9(obj);
	else if(obj.v_type == "int") forInt(obj);
	else if(obj.v_type == "float") forFloat(obj);
	else if(obj.v_type == "cfloat") forCFloat(obj);
	else if(obj.v_type == "ip") forIP(obj);
    else if(obj.v_type == "email")
	{
	   if(obj.v_must=="1")
	   {
	      if(jtrim(obj.value).length==0)
	      {
	         rdShowMessageDialog("电子邮件地址不能为空！");
	         if(obj.style.display=="")
	         {
				obj.select();
	            obj.focus();
	            return false;
	         }
	      }
	   }
	          
  	   if(chkemail(obj.value)==0)
	   {
			rdShowMessageDialog("电子邮件地址非法！");
			//obj.value="";
			obj.select();
			obj.focus();
            return false;
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
	else if(obj.v_type == "mobphone") 
	{
	  forMobilePhone(obj);
 	}
	else if(obj.v_type == "idcard") forIdCard(obj);
 	if(flag == 1) 
	{
	      flag = 0;
	      return false;
	}
        return true;
}
//*********************扩充函数***************************
function forDate(useryear,usermonth,userday)
{
	var myyear;
	var mymonth;
	var myday;
	//myyear=myParseInt(useryear);
	//mymonth=myParseInt(usermonth);
	//myday=myParseInt(userday);
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
 
	  if (obj.v_must=="1"){
	  
	    if (obj.value.length == 0){
		   rdShowMessageDialog("'" + obj.v_name + "'为必填项，请务必填写");
		   flag = 1;
		   obj.select();
		   obj.focus();
		   return false;
		}
	    
	  }

	  //alert(obj.v_name+":"+isLengthOf(obj.value,obj.v_minlength,obj.v_maxlength));

	  if (!isLengthOf(obj.value,obj.v_minlength,obj.v_maxlength)){
	    flag = 1;
		rdShowMessageDialog("'"+obj.v_name+"'的值不正确！长度有错误！");
		obj.select();
		obj.focus();
		return false;
	  }
		if(haveSpe(jtrim(obj.value))==false)
		{
          rdShowMessageDialog("'"+obj.v_name+"'的值不能含有"+"\\ / < > \' \" & #"+"等字符！");
		  flag=1;
		  obj.select();
		  obj.focus();
		  return false;   
		}	 
	  
	  return true;    
}

function haveSpe(str)
{
  var comp="\\/><\'\"&#";
  var aChar="";
  for(var i=0;i<str.length;i++)
  {
	aChar=str.charAt(i);  
	if(comp.indexOf(aChar)!=-1)
		return false;
  }
  return true;
}

function forZip(obj)//判断邮政编码
{
    if (!forString(obj)){
	  flag = 1;
	  obj.select();
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
		obj.select();
	    obj.focus();
	    return false;
      }    
    if (!isRight_length(obj.value,"6")){
      flag = 1;
      rdShowMessageDialog("'"+obj.v_name+"'的值不正确！长度有错误！(6位数字)");
	  obj.select();
	  obj.focus();
	  return false;
    } 
    return true;
}

function forPwd(obj)//判断两密码
{	
   if(flag==1)
 	{
		obj.value = "";
		return false;
	}
   if(jtrim(obj.value).length>0)
   {
     if(obj.pwd2==null)
     {	
	   rdShowMessageDialog("请设定'" + obj.v_name + "'的确认域！");
	   obj.select();
	   obj.focus();
	   flag=1;
	   return false;
     }
	else
    {
      if(jtrim(obj.value).length==0)
	  {
        rdShowMessageDialog("'" + obj.v_name + "'不能为空！");
		obj.select();
	    obj.focus();
		flag=1;
	    return false; 
	  }
	  if(jtrim(document.all(obj.pwd2).value).length==0)
	  {
        rdShowMessageDialog("'" + document.all(obj.pwd2).v_name + "'不能为空！");
        document.all(obj.pwd2).select();
	    document.all(obj.pwd2).focus();
		flag=1;
	    return false; 
	  }
	  if(jtrim(obj.value).length>obj.v_maxLength)
	  {
        rdShowMessageDialog("'" + obj.v_name + "'长度超长！");
	    obj.select();
	    obj.focus();
		flag=1;
	    return false; 
	  }
	  if(jtrim(document.all(obj.pwd2).value).length>document.all(obj.pwd2).v_maxlength)
	  {
        rdShowMessageDialog("'" + document.all(obj.pwd2).v_name + "'长度超长！");
	    document.all(obj.pwd2).select();
	    document.all(obj.pwd2).focus();
		flag=1;
	    return false; 
	  }
	  if(jtrim(obj.value)!= jtrim(document.all(obj.pwd2).value))
      {
        rdShowMessageDialog("'"+obj.v_name+"'和'" + document.all(obj.pwd2).v_name + "'不一致！");
	    //obj.value="";
	    //document.all(obj.pwd2).value="";
		obj.select();
	    obj.focus();
		flag=1;
	    return false;     
	  }
 	}
  }
  return true;
}

function forMoney(obj)//判断金额
{   
    var chPos = -1;
    if (!forString(obj)){
	  flag = 1;
	  obj.select();
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
	  obj.select();
	  obj.focus();
	  return false;
    }
    if(chPos < obj.value.length -3 && chPos != -1)	
    {
    	rdShowMessageDialog("'" + obj.v_name + "'的值不正确！小数点后保留两位！");
    	flag = 1;
		obj.select();
    	obj.focus();
	return false;	
    }     
	if (!isValid_dot(obj.value)){
	    flag = 1;
	    rdShowMessageDialog("'" + obj.v_name + "'的值不正确！小数点有错误！");
		obj.select();
	    obj.focus();
	    return false;  
	}
	
	if (!isSizeOf(obj.value,obj.v_minvalue,obj.v_maxvalue)){
	  flag = 1;
	  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！超出规定范围！");
	  obj.select();
	  obj.focus();
	  return false;
	} 	
	return true;	
}

function for0_9(obj) //判断字符是否由0－9个数字组成
{    
    if (!forString(obj)){
	  flag = 1;
	  obj.select();
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
	  obj.select();
	  obj.focus();
	  return false;
    }	
	return true;	
}
function forInt(obj)//判断字符是否是整数组成，可以为负数
{
    if (!forString(obj))
    {
	  flag = 1;
	  obj.select();
	  obj.focus();
	  return false;
	}else
	{
	  if (obj.value.length == 0){
	    return true;
	  }
	} 
    if (!isMadeOf(obj.value,intStr))
    {
      flag = 1;
      rdShowMessageDialog("'" + obj.v_name + "'的值不正确！请输入数字！");
	  obj.select();
	  obj.focus();
	  return false;
    }	
	if (!isValid_negative(obj.value))
	{
      flag = 1;
      rdShowMessageDialog("'" + obj.v_name + "'的值不正确！'-'符号有错误！");
	  obj.select();
	  obj.focus();
	  return false;
    }	
	if (!isSizeOf(obj.value,obj.v_minvalue,obj.v_maxvalue))
	{
	  flag = 1;
	  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！超出规定范围！");
	  obj.select();
	  obj.focus();
	  return false;
	}    
   return true;  
}
function forFloat(obj)//判断字符是否是数字，可以有小数点，负数
{
    if (!forString(obj)){
	  flag = 1;
	  obj.select();
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
	  obj.select();
	  obj.focus();
	  return false;
    }	
	if (!isValid_dot(obj.value)){
	    flag = 1;
	    rdShowMessageDialog("'" + obj.v_name + "'的值不正确！小数点有错误！");
		obj.select();
	    obj.focus();
	    return false;  
	}		
	if (!isValid_negative(obj.value)){
      flag = 1;
      rdShowMessageDialog("'" + obj.v_name + "'的值不正确！'-'符号有错误！");
	  obj.select();
	  obj.focus();
	  return false;
    }	
	if (!isSizeOf(obj.value,obj.v_minvalue,obj.v_maxvalue)){
	  flag = 1;
	  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！超出规定范围！");
	  obj.select();
	  obj.focus();
	  return false;
	}
   return true;
}
function forCFloat(obj)//判断字符是否是浮点数，不能是负数。在v_maxlength中提供小数点前后的位长，例：v_maxlength=10.2 表示小数点前可有10位，小数点后可有两位
{
    var a1, a2, a3;
    var k;
 	 if (!forString(obj)){
	  flag = 1;
	  obj.select();
	  obj.focus();
	  return false;
	}else{
	  if (obj.value.length == 0){
	    return true;
	  }
	}  
    /*if(obj.value.length<1){
		flag=1;
    	return false;
    } */   
    if (!isMadeOf(obj.value,floatStr)){
      flag = 1;
      rdShowMessageDialog("'" + obj.v_name + "'的值不正确！请输入数字！");
	  obj.select();
	  obj.focus();
	  return false;
    }	
 	/*if (!isHasdot(obj.value)){
	    flag = 1;
	    rdShowMessageDialog("'" + obj.v_name + "'的值不正确！小数点有错误！");
	    obj.focus();
	    return false;  
	}*/		
	if (isHasNegative(obj.value)){
      flag = 1;
      rdShowMessageDialog("'" + obj.v_name + "'的值不正确！'-'符号有错误！");
	  obj.select();
	  obj.focus();
	  return false;
    }
 	if (isValid_dot(obj.v_maxlength))
	{
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
  	var testStr1 ="^\\d{0,"+a2+"}$|^\\d{0,"+a2+"}\\.\\d{0,3}$";
	var reg = new RegExp(testStr1,"ig");
 	if (!reg.test(obj.value))
	{
	  flag = 1;
	  if (a3!=0)
	  {
		  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！小数点前 "+a2+" 位，小数点后 "+a3+" 位！");
	  }else 
		  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！");
	  obj.select();
	  obj.focus();
	  return false;
	}
  	if (!isSizeOf(obj.value,obj.v_minvalue,obj.v_maxvalue)){
	  flag = 1;
	  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！超出规定范围！");
	  obj.select();
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
	  obj.select();
	  obj.focus();
	  return false;
	}
	else
	{
 
	   if (obj.value.length == 0){
	    return true;
	  }
	}

 
	if (!isMadeOf(obj.value,phoneStr))
	{
 
	  flag = 1;
	  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！请填写数字,可以包含(,),－,#符号"); 
	  obj.select();
	  obj.focus();
	  return false; 
	}
 
    return true; 
}
//------------------------------------
function forIdCard(obj)//判断字符是否是合法的身份证
{
     if (!forString(obj))
    {
	  flag = 1;
	  //obj.value="";
	  obj.select();
	  obj.focus();
	  return false;
    }
    else
    {
	  if (obj.value.length == 0)
	  {
		//flag = 1;
		//obj.value="";
		//obj.select();
	    //obj.focus();
	    //return false;
	  }

    } 
	
	if(jtrim(obj.value).length>0)
	{
		if (!isRight_length(obj.value,"15") && !isRight_length(obj.value,"18"))
		{
		  flag = 1;
		  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！身份证长度不正确(15或18位)！");
		  //obj.value="";
		  obj.select();
		  obj.focus();
		  return false;
		}	
	}

    if( isRight_length(obj.value,"15")){
	    if (!isMadeOf(obj.value,numStr))
	    {
		  flag = 1;
		  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！15位身份证必须填写数字！");
		  //obj.value="";
		  obj.select();
		  obj.focus();
		  return false;
	    }
	}else if( isRight_length(obj.value,"18")){
		for(var i=0;i<obj.value.length-1;i++){
			if (!isMadeOf(obj.value.substring(i,i+1),numStr))
		    {
			  flag = 1;
		  	  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！18身份证前17位必须填写数字！");
			  //obj.value="";
			  obj.select();
			  obj.focus();
			  return false;
		    }				
		}
		
		if ( !isMadeOf(obj.value.substring(i,i+1),numStr) && obj.value.substring(i,i+1).toLowerCase()!= 'x')		
		{
			  flag = 1;
		  	  rdShowMessageDialog("'" + obj.v_name + "'的值不正确！身份证最后一位必须是x或者数字！");
			  //obj.value="";
			  obj.select();
			  obj.focus();
			  return false;			
		}
		
	}
	

		/************判断15位的身份证是否正确*****************/
    if(isRight_length(obj.value,"15"))
    {	
        if (obj.value.substring(8,10)<"01" || obj.value.substring(8,10)>"12"
           	|| obj.value.substring(10,12)<"01" || obj.value.substring(10,12)>"31")
        { 
            rdShowMessageDialog("身份证号码的月份或日期部分输入错误：月份应介于01-12之间，日期应介于01-31之间！");
            //obj.value="";
			obj.select();
	        obj.focus();
			flag=1;
            return false;
	}
        if (obj.value.substring(8,10) == "04" || obj.value.substring(8,10) == "06" || 
             obj.value.substring(8,10) == "09" || obj.value.substring(8,10) == "11")	         
	{
             if(obj.value.substring(10,12)>"30")
             {
                rdShowMessageDialog("身份证号码月份部分错误：该月份最多30天,没有31号！");
                //obj.value="";
				obj.select();
                obj.focus();
				flag=1;
                return false;
             }
        }                 
        if (obj.value.substring(8,10)=="02" && obj.value.substring(10,12)>"29")
        {
            rdShowMessageDialog("身份证号码月份部分错误：二月份最多29天！");
            //obj.value="";
			obj.select();
        	obj.focus();
			flag=1;
            return false;
        }
    }    	      
	/************判断15位的身份证是否正确结束*****************/
	/************判断18位的身份证是否正确*****************/
	if(isRight_length(obj.value,"18"))
	{		         
          if(obj.value.substring(6,10)<"1900" ||
	     obj.value.substring(6,10)>"2099" ||
	     obj.value.substring(10,12)<"01" ||
             obj.value.substring(10,12)>"12" ||
             obj.value.substring(12,14)<"01" ||
             obj.value.substring(12,14)>"31")
          {
      rdShowMessageDialog("身份证号码的日期部分输入错误：年份应介于1900-2099之间，月份应介于01-12之间，日期应介于01-31之间！");
      //obj.value="";
	  obj.select();
	  obj.focus();
	  flag=1;
            return false;
	  }
	   
	  if (obj.value.substring(10,12) == "04" ||
              obj.value.substring(10,12) == "06" ||
              obj.value.substring(10,12) == "09" ||
              obj.value.substring(10,12) == "11")  	         
	  {
             if(obj.value.substring(12,14)>"30")
             {
                rdShowMessageDialog("身份证号码月份部分错误：该月份最多30天,没有31号！");
                //obj.value="";
				obj.select();
	            obj.focus();
	            flag=1;
                return false;
             }
          }                 
       
          if (obj.value.substring(10,12)=="02" &&
             obj.value.substring(12,14)>"29")
          {
            rdShowMessageDialog("身份证号码月份部分错误：二月份最多29天！");
            //obj.value="";
			obj.select();
	        obj.focus();
            return false;
          }
        }
 	return true;
}
//function void checkPwd(obj1,obj2)//判断字符密码，两次输入密码是否相等
function checkPwd(obj1,obj2)
{
  var pwd1 = obj1.value;
  var pwd2 = obj2.value;
  if(pwd1 != pwd2)
  {
   var message = "'" + obj1.v_name + "'和'" + obj2.v_name + "'不一致，请重新输入！";
   rdShowMessageDialog(message);
   //obj1.value = "";
   //obj2.value = "";
   obj.select();
   obj1.focus();
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
		obj.select();
		obj.focus();
		return false;
	}
	return true;
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
		obj.select();
		obj.focus();
		return false;
	}
	if(obj.value.length != 2)
	{
		rdShowMessageDialog("月份的有效长度为2位！");
		flag = 1;
		obj.select();
		obj.focus();
		return false;
	}
	return true;
}

function forDate_YM(obj)
{
  if(forInt(obj)==false) return false;
  
  if(obj.value.length!=6)	  
  {
	rdShowMessageDialog("年月的有效长度为6位！");
	flag = 1;
	obj.select();
	obj.focus();
	return false;
  }
  var mon=obj.value.substring(4,6);
  if(mon > 12 || mon < 01)
  {
	rdShowMessageDialog("月份输入有误！（在01～12之间）");
	flag = 1;
	obj.select();
	obj.focus();
	return false;
  }
  if(mon.length != 2)
  {
	rdShowMessageDialog("月份的有效长度为2位！");
	flag = 1;
	obj.select();
	obj.focus();
	return false;
  }
  return true;
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
		obj.select();
		obj.focus();
		return false;
	}	
	if(obj.value.length != 2)
	{
		rdShowMessageDialog("日期的有效长度为2位！");
		flag = 1;
		obj.select();
		obj.focus();
		return false;
	}
	return true;
}
function forMobilePhone(obj)   //判断手机号码的有效性
{
	 flag=0;
        var MobPhone = obj.value;
        var errorPos = "";
        if(obj.v_name != "")
	{
		errorPos = "";
	}
	if( forInt(obj)==false)
	{
      flag=1;
	  return false;
	}

	/*if(flag==1)
	{
		obj.value = "";
		flag=0;
		return false;
	} */         
	
	if (!forString(obj))
    {
	  flag = 1;
	  //obj.value="";
	  obj.select();
	  obj.focus();
	  return false;
    }
    else
    {
	  if (obj.value.length == 0)
	  {
		//obj.value="";
		//obj.select();
	    //obj.focus();
		//flag=1;
	    //return false;
	  }
	  else if(obj.value.length>0)
	  {
         if(obj.value.length!=11)
		 {
           rdShowMessageDialog("手机号码只能是11位！" + errorPos);
		   //obj.value = "";		 
		   obj.select();
		   obj.focus();
		   flag=1; 
		   return false;
		 }
		 else
		 {
 		   if(MobPhone.substring(0,1) !=1 || MobPhone.substring(1,2) !=3)
		   {
				rdShowMessageDialog("手机号码只能以13开头，请重新输入手机号码！" + errorPos);
				//obj.value = "";
				flag = 1;
				obj.select();
				obj.focus();
				return false;
		   }
           if(myParseInt(MobPhone.substring(0,3),10)<134 || myParseInt(MobPhone.substring(0,3),10)>139)
	       { 
		      rdShowMessageDialog("手机号码范围应该在134~139之间");
		      //obj.value = "";
			  obj.select();
		      obj.focus();
			  flag=1;
		      return false;	
	       }
		 }
	  }
    } 	
	return true;
} 
function forsumPay_Count(form)
{
	var obj = null;
     	var t = null;
	var tempSum = 0;
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

function forIP(obj)
{
  if (!forString(obj))
  {
	  flag = 1;
	  obj.select();
	  obj.focus();
	  return false;
  }
  else
  {
    if (obj.value.length == 0)
	{
      return true;
    }
  }
  var aip=""; 
  if(getTokNums(obj.value,".")!=4)
  {
    flag=1;
	obj.select();
	obj.focus();
 	rdShowMessageDialog(obj.v_name+"非法！");
	return false;
  }
  else
  {
    for(var i=0;i<4;i++)
	{
	  aip=oneTok(obj.value,".",i+1);
 	  if(jtrim(aip).length==0 || jtrim(aip).length>3)
	  {
        flag=1;
		obj.select();
    	obj.focus();
	    rdShowMessageDialog(obj.v_name+"非法！");
	    return false;
	  }
	  else
	  {
        if(i<3)
		{
          if(myParseInt(aip)>255)
		  {
             flag=1;
			 obj.select();
    	     obj.focus();
	         rdShowMessageDialog(obj.v_name+"非法！");
	         return false;
		  }
		}
		else
	    {
          if(myParseInt(aip)>254)
		  {
             flag=1;
			 obj.select();
    	     obj.focus();
	         rdShowMessageDialog(obj.v_name+"非法！");
	         return false;
		  }
		}
	  }

	  if(!isMadeOf(aip,numStr))
	  {
	    flag=1;
		obj.select();
    	obj.focus();
	    rdShowMessageDialog(obj.v_name+"中存在非数字字符！");
	    return false;
	  }
    }
  }
  return true;
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
	rdShowMessageDialog("日期格式有误，正确格式为“年年年年月月日日”，请重新输入！");
	//obj.value="";
	obj.select();
 	obj.focus();
	return false;
  }
  else
  {
     var year=theDate.substring(0,4);
	 var month=theDate.substring(4,6);
	 var day=theDate.substring(6,8);
	 if(myParseInt(year)<1900 || myParseInt(year)>3000)
	 {
       rdShowMessageDialog("年的格式有误，有效年份应介于1900-3000之间，请重新输入！");
	   //obj.value="";
	   obj.select();
	   obj.focus();
	   return false;
	 }
     if(myParseInt(month)<1 || myParseInt(month)>12)
	 {
       rdShowMessageDialog("月的格式有误，有效月份应介于01-12之间，请重新输入！");
  	   //obj.value="";
	   obj.select();
	   obj.focus();
	   return false;
	 }
     if(myParseInt(day)<1 || myParseInt(day)>31)
	 {
       rdShowMessageDialog("日的格式有误，有效日期应介于01-31之间，请重新输入！");
	   //obj.value="";
	   obj.select();
       obj.focus();
	   return false;
	 }

     if (month == "04" || month == "06" || month == "09" || month == "11")  	         
	 {
         if(myParseInt(day)>30)
         {
	 	     rdShowMessageDialog("该月份最多30天,没有31号！");
 	         //obj.value="";
			 obj.select();
	         obj.focus();
             return false;
         }
      }                 
       
      if (month=="02")
      {
         if(myParseInt(year)%4==0 && myParseInt(year)%100!=0 || (myParseInt(year)%4==0 && myParseInt(year)%400==0))
		 {
           if(myParseInt(day)>29)
		   {
 		     rdShowMessageDialog("闰年二月份最多29天！");
      	     //obj.value="";
			 obj.select();
	         obj.focus();
             return false;
		   }
		 }
		 else
		 {
           if(myParseInt(day)>28)
		   {
 		     rdShowMessageDialog("非闰年二月份最多28天！");
      	     //obj.value="";
			 obj.select();
	         obj.focus();
             return false;
		   }
		 }
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
	rdShowMessageDialog("时间格式有误，正确格式为“时时分分秒秒”，请重新输入！");
	//obj.value="";
	obj.select();
	obj.focus();
	return false;
  }
  else
  {
     var hour=theTime.substring(0,2);
	 var minute=theTime.substring(2,4);
	 var second=theTime.substring(4,6);
	 if(myParseInt(hour)<0 || myParseInt(hour)>24)
	 {
       rdShowMessageDialog("小时的格式有误，有效小时应介于00-24之间，请重新输入！");
	   //obj.value="";
	   obj.select();
       obj.focus();
	   return false;
	 }
     if(myParseInt(minute)<0 || myParseInt(minute)>60)
	 {
       rdShowMessageDialog("分钟的格式有误，有效分钟应介于00-60之间，请重新输入！");
	   //obj.value="";
	   obj.select();
       obj.focus();
	   return false;
	 }
     if(myParseInt(second)<0 || myParseInt(second)>60)
	 {
       rdShowMessageDialog("秒的格式有误，有效秒应介于00-60之间，请重新输入！");
	   //obj.value="";
	   obj.select();
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
	rdShowMessageDialog("全时间格式有误，正确格式为“年年年年月月日日时时分分秒秒”，请重新输入！");
	//obj.value="";
	obj.select();
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
 
 	 if(myParseInt(year)<1900 || myParseInt(year)>3000)
	 {
       rdShowMessageDialog("年的格式有误，有效年份应介于1900-3000之间，请重新输入！");
	   //obj.value="";
	   obj.select();
	   obj.focus();
	   return false;
	 }
     if(myParseInt(month)<1 || myParseInt(month)>12)
	 {
       rdShowMessageDialog("月的格式有误，有效月份应介于01-12之间，请重新输入！");
  	   //obj.value="";
	   obj.select();
	   obj.focus();
	   return false;
	 }

      if(myParseInt(day)<1 || myParseInt(day)>31)
	 {
       rdShowMessageDialog("日的格式有误，有效日期应介于01-31之间，请重新输入！");
	   //obj.value="";
	   obj.select();
       obj.focus();
	   return false;
	 }

     if (month == "04" || month == "06" || month == "09" || month == "11")  	         
	 {
         if(myParseInt(day)>30)
         {             
	 	     rdShowMessageDialog("该月份最多30天,没有31号！");
 	         //obj.value="";
			 obj.select();
	         obj.focus();
             return false;
         }
      }                 
      if (month=="02")
      {
         if((myParseInt(year)%4==0 && myParseInt(year)%100!=0)||(myParseInt(year)%4==0 && myParseInt(year)%400==0))
		 {
           if(myParseInt(day)>29)
		   {
 		     rdShowMessageDialog("闰年二月份最多29天！");
      	     //obj.value="";
			 obj.select();
	         obj.focus();
             return false;
		   }
		 }
		 else
		 {
           if(myParseInt(day)>28)
		   {
 		     rdShowMessageDialog("非闰年二月份最多28天！");
      	     //obj.value="";
			 obj.select();
	         obj.focus();
             return false;
		   }
		 }
      }
  	 if(myParseInt(hour)<0 || myParseInt(hour)>24)
	 {
       rdShowMessageDialog("小时的格式有误，有效小时应介于00-24之间，请重新输入！");
	   //obj.value="";
	   obj.select();
       obj.focus();
	   return false;
	 }
     if(myParseInt(minute)<0 || myParseInt(minute)>60)
	 {
       rdShowMessageDialog("分钟的格式有误，有效分钟应介于00-60之间，请重新输入！");
	   //obj.value="";
	   obj.select();
       obj.focus();
	   return false;
	 }
     if(myParseInt(second)<0 || myParseInt(second)>60)
	 {
       rdShowMessageDialog("秒的格式有误，有效秒应介于00-60之间，请重新输入！");
	   //obj.value="";
	   obj.select();
       obj.focus();
	   return false;
	 }
  }
}

//函数名：chkemail
//功能介绍：检查是否为Email Address
//参数说明：要检查的字符串
//返回值：0：不是 1：是
    function chkemail(a)
    { 	  
		var i=a.length;
        if(i>0)
	    { 
		  var temp = a.indexOf('@');
		  var tempd = a.indexOf('.');
		  if (temp >= 1) {
		   if ((i-temp) > 3){
			if ((i-tempd)>1){
			  return 1;
			}
		   }
		  }
          return 0;
		}
		return 1;
    }
