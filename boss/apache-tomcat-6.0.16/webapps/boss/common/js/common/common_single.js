
//��������chksafe
//���ܽ��ܣ�����Ƿ���"'",'\\',"/"
//����˵����Ҫ�����ַ���
//����ֵ��0���� 1������
    function chksafe(a)
    {

      fibdn = new Array ("'" ,"\\", "��", ",", ";", "/");
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


//��������fucCheckNUM
//���ܽ��ܣ�����Ƿ�Ϊ����
//����˵����Ҫ��������
//����ֵ��1Ϊ�����֣�0Ϊ��������
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
//˵�����ַ���������
            return 0;
          }
        }
//˵��������
        return 1;
    }

 	
//��������chkspc
//���ܽ��ܣ�����Ƿ��пո�
//����˵����Ҫ�����ַ���
//����ֵ��0���� 1������
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


//��������chkemail
//���ܽ��ܣ�����Ƿ�ΪEmail Address
//����˵����Ҫ�����ַ���
//����ֵ��0������ 1����
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

//opt1 С�� opt2 ����
//��opt2Ϊ1ʱ���num�Ƿ��Ǹ���
//��opt1Ϊ1ʱ���num�Ƿ���С��
//����1����ȷ�ģ�0�Ǵ����
    function chknbr(num,opt1,opt2)
    {
      var i=num.length;
      var staus;
		//staus���ڼ�¼.�ĸ���
      status=0;
      if ((opt2!=1) && (num.charAt(0)=='-'))
      {
		//rdShowMessageDialog("You have enter a invalid number.");
        return 0;

      }

  if(i>0)
  {
	  //��ֻ��һλʱ
	  if(i==1)
	  {
		  if(num.charAt(0)<'0' || num.charAt(0)>'9')
			  return 0;
	  }

		//�����һλΪ.ʱ����
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


//��������fucPWDchk
//���ܽ��ܣ�����Ƿ��з����ֻ���ĸ
//����˵����Ҫ�����ַ���
//����ֵ��0������ 1��ȫ��Ϊ���ֻ���ĸ
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

	//�ж��Ƿ�Ϊʵ���������ɸ�������ʵ���򷵻�0���˺�����Ӧ��ҳ����ֱ�ӵ��ã�
	//Ӧ��ҳ���е���checkϵ�к��������Ƕ�isϵ�к��������˷�װ��������ҳ���е���
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

	//�ж��Ƿ�Ϊ��ʵ����������ʵ���򷵻�0���˺�����Ӧ��ҳ����ֱ�ӵ��ã�
	//Ӧ��ҳ���е���checkϵ�к��������Ƕ�isϵ�к��������˷�װ��������ҳ���е���
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

    //�ж��Ƿ�Ϊ�Ǹ�ʵ�������ǷǸ�ʵ���򷵻�0���˺�����Ӧ��ҳ����ֱ�ӵ��ã�
	//Ӧ��ҳ���е���checkϵ�к��������Ƕ�isϵ�к��������˷�װ��������ҳ���е���
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


//����Ƿ�ʵ��
function check_Real(obj,message)
    {	 
	 if(jtrim(document.all(obj).value).length==0 || isReal(document.all(obj).value)=="0")
	 {
			 rdShowMessageDialog(message+"�Ƿ������������룡");		
		  document.all(obj).value="";
				document.all(obj).focus();
				return false;
	 }
	 return true;
   }

//����Ƿ���ʵ��
	function check_plusReal(obj,message)
    {
	 if(jtrim(document.all(obj).value).length==0 || isPlusReal(document.all(obj).value)=="0" || parseFloat(document.all(obj).value)==0)
	 {
		  rdShowMessageDialog(message+"�Ƿ������������룡");
		  document.all(obj).value="";
				document.all(obj).focus();
				return false;
	 }
	 	 return true;
   }

//����Ƿ�Ϊ��
function check_null(obj,message)
{	 
	 if(jtrim(document.all(obj).value).length==0)
	 {
			 rdShowMessageDialog(message+"����Ϊ�գ�");		
		  document.all(obj).value="";
				document.all(obj).focus();
				return false;
		}
			 return true;
}

//����Ƿ�Ǹ�ʵ��
function check_NotMinusReal(obj,message)
{	 
	 if(jtrim(document.all(obj).value).length==0 || isNotMinusReal(document.all(obj).value)=="0")
	 {
			 rdShowMessageDialog(message+"�Ƿ������������룡");		
		  document.all(obj).value="";
				document.all(obj).focus();
				return false; 
		}
			 return true;
}


//��������fucCheckTEL
//���ܽ��ܣ�����Ƿ�Ϊ�绰����
//����˵����Ҫ�����ַ���
//����ֵ��1Ϊ�ǺϷ���0Ϊ���Ϸ�
    function fucCheckTEL(TEL)
    {
      var i,j,strTemp;
      strTemp="0123456789-()# ";
      for (i=0;i<TEL.length;i++)
      {
        j=strTemp.indexOf(TEL.charAt(i));
        if (j==-1)
        {
//˵�����ַ����Ϸ�
          return 0;
        }
      }
//˵���Ϸ�
      return 1;
    }

//��������fucCheckLength
//���ܽ��ܣ�����ַ����ĳ���
//����˵����Ҫ�����ַ���
//����ֵ������ֵ
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
 
    //��ȫ·�����õ��ļ���
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
