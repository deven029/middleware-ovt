
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
