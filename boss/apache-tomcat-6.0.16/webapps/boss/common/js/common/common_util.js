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
	
	/*if (!isNaN(maxlen)){
	  if (val.length > maxlen){
	    return false;
	  }
	}
	if (!isNaN(minlen)){
	  if (val.length < minlen){
	    return false;
	  }
	}*/
	if (!isNaN(maxlen)){
	  if (getRealLength(val)> maxlen){
	    return false;
	  }
	}
	if (!isNaN(minlen)){
	  if (getRealLength(val) < minlen){
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


//�ж���ֵ��С����:��,�Ϸ�;�޲��Ϸ�.
function isHasdot(val)
{   
    
    var subvalue="";
    

    if (val.indexOf(".") != -1){  
           subvalue = val.substring(val.indexOf(".")+1);     
          if (subvalue.indexOf(".") != -1){
            return false; 
          }else{
         	return true; 
          }     
     }else{
     	return false;
    }
   
   
}

//�ж�С����
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

//�ж���ֵ�ĸ���:��,�Ϸ�;�޲��Ϸ�.
function isHasNegative(val)
{
    
    var subvalue;
    
    if (val.indexOf("-",0) != -1){
	    return true;  
    }else{
    	return false;
	}	  

}

//�жϸ���
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

//�жϺ��ʳ���
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
      case 0://����
        do{
          tempLength = tempString.length;
          tempString = tempString.replace(ASubStr,"");
        } while(tempLength != tempString.length);
        break; 
      case 1://��
        while (true){
          if (tempString.length < tSbLength) break;
          for (i = 0;i < tSbLength;i++)
            if (ASubStr.charAt(i) != tempString.charAt(i)) 
              return tempString;
          tempString = tempString.replace(ASubStr,"");  
        };  
      case 2://��
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

//ȥ���ַ����Ŀո�
function jtrim(str)
        { while (str.charAt(0)==" ")
        {str=str.substr(1);}
    while (str.charAt(str.length-1)==" ")
                                    {str=str.substr(0,str.length-1);}
    return(str);
    }

	//------------v1.1-------------------------
function PubSimpSel(pageTitle,fieldName,sqlStr,selType,retQuence,retToField)
{
    /*
    ����1(pageTitle)����ѯҳ�����
    ����2(fieldName)�����������ƣ���'|'�ָ��Ĵ�
    ����3(sqlStr)��sql���
    ����4(selType)������1 rediobutton 2 checkbox
    ����5(retQuence)����������Ϣ������������� �������ʶ����'|'�ָ�����"3|0|2|3"��ʾ����3����0��2��3
    ����6(retToField))������ֵ����������,��'|'�ָ�
    ע�⣺sql��У�飬��ֹsqlע��
    ʹ��window.openʵ���´��ڵĴ򿪣�����opener����Ч.
    ��ͨ��opener.arg4.values=''��ֵ
    */
    var path = "../../page/public/fPubSimpSel.jsp";
    path = path + "?sqlStr=" + sqlStr + "&retQuence=" + retQuence;
    path = path + "&fieldName=" + fieldName + "&pageTitle=" + pageTitle;
    path = path + "&selType=" + selType;  
    retInfo = window.showModalDialog(path);
    if(typeof(retInfo)=="undefined")      
    {   return false;   }
    var chPos_field = retToField.indexOf("|");
    var chPos_retStr;
    var valueStr;
    var obj;
    while(chPos_field > -1)
    {
        obj = retToField.substring(0,chPos_field);
        chPos_retInfo = retInfo.indexOf("|");
        valueStr = retInfo.substring(0,chPos_retInfo);
        document.all(obj).value = valueStr;
        retToField = retToField.substring(chPos_field + 1);
        retInfo = retInfo.substring(chPos_retInfo + 1);
        chPos_field = retToField.indexOf("|");
        
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

function myParseInt(nu)
{
  var ret=0;
  if(nu.length>0)
  {
    if(nu.substring(0,1)=="0")
	{
       ret=parseInt(nu.substring(1,nu.length));
	}
	else
	{
       ret=parseInt(nu);
	}
  }
  return ret;
}

function chineseNumber(num)
{
if(parseFloat(num)<=0.01) return "��Բ��"
if (isNaN(num) || num > Math.pow(10, 12)) return ""
var cn = "��Ҽ��������½��ƾ�"
var unit = new Array("ʰ��Ǫ", "�ֽ�")
var unit1= new Array("����", "")
var numArray = num.toString().split(".")
var start = new Array(numArray[0].length-1, 2)

	function toChinese(num, index)
	{
	var num = num.replace(/\d/g, function ($1)
	{
	return cn.charAt($1)+unit[index].charAt(start--%4 ? start%4 : -1)
	})
	return num
	}

for (var i=0; i<numArray.length; i++)
{
var tmp = ""
for (var j=0; j*4<numArray[i].length; j++)
{
var strIndex = numArray[i].length-(j+1)*4
var str = numArray[i].substring(strIndex, strIndex+4)
var start = i ? 2 : str.length-1
var tmp1 = toChinese(str, i)
tmp1 = tmp1.replace(/(��.)+/g, "��").replace(/��+$/, "")
tmp1 = tmp1.replace(/^Ҽʰ/, "ʰ")
tmp = (tmp1+unit1[i].charAt(j-1)) + tmp
}
numArray[i] = tmp 
}

numArray[1] = numArray[1] ? numArray[1] : ""
numArray[0] = numArray[0] ? numArray[0]+"Բ" : numArray[0], numArray[1] = numArray[1].replace(/^��+/, "")
numArray[1] = numArray[1].match(/��/) ? numArray[1] : numArray[1]+"��"
return numArray[0]+numArray[1]
}

function aNumber(num)
{
var numArray = new Array()
var unit = "����Բ$"
for (var i=0; i<unit.length; i++)
{
var re = eval("/"+ (numArray[i-1] ? unit.charAt(i-1) : "") +"(.*)"+unit.charAt(i)+"/")
if (num.match(re))
{
numArray[i] = num.match(re)[1].replace(/^ʰ/, "Ҽʰ")
numArray[i] = numArray[i].replace(/[��Ҽ��������½��ƾ�]/g, function ($1)
{
return "��Ҽ��������½��ƾ�".indexOf($1)
})
numArray[i] = numArray[i].replace(/[�ֽ�ʰ��Ǫ]/g, function ($1)
{
return "*"+Math.pow(10, "�ֽ� ʰ��Ǫ ".indexOf($1)-2)+"+"
}).replace(/^\*|\+$/g, "").replace(/��/, "0")
numArray[i] = "(" + numArray[i] + ")*"+Math.ceil(Math.pow(10, (2-i)*4))
}
else numArray[i] = 0
}
return eval(numArray.join("+"))
}

function chgFocus(fm)
{
  var dx;
  if(event.keyCode==13 || event.keyCode==45)
  {
    dx=1;
    for(var i=0;i<fm.elements.length;i++)
    { 
 	  if(typeof(fm.elements[i].index)!="undefined")
	  {
        if(fm.elements[i].index==(event.srcElement.index*1+dx*1))
        {	
			var parEle=fm.elements[i];
			var hiddenFlag=false;

			for(var ii=0;ii<10;ii++)
			{
				parEle=parEle.parentElement;
				if(parEle.style.display=="none")
				{
                  hiddenFlag=true;
				  break;
				}
			}
			
   		    if(hiddenFlag==true || fm.elements[i].style.display=="none" || fm.elements[i].disabled==true || fm.elements[i].readOnly==true)
			{
			 
             dx++;
 			}
		    else
		    {
             fm.elements[i].focus();
   	         break;
		    }
        }
	  }
    }
  }
  else if(event.keyCode==27)
  {
    dx=1;
    for(var i=(fm.elements.length*1-1);i>=0;i--)
    {      
      if(typeof(fm.elements[i].index)!="undefined")
	  {
        if(fm.elements[i].index==(event.srcElement.index*1-dx*1))
        {
 			var parEle=fm.elements[i];
			var hiddenFlag=false;

			for(var ii=0;ii<10;ii++)
			{
				parEle=parEle.parentElement;
				if(parEle.style.display=="none")
				{
                  hiddenFlag=true;
				  break;
				}
			}
           if(hiddenFlag==true || fm.elements[i].style.display=="none" || fm.elements[i].disabled==true || fm.elements[i].readOnly==true)
			{
             dx++; 
 			}
		   else
		   {
             fm.elements[i].focus();
   	         break;
		   }		   
        }
	  }
 	}
  }
}

function hideEvent()
{
   if(self.status!="")
   {
     rdShowMessageDialog("���ڻ�����ݻ���֤��Ϣ�����Ժ�");
	 return false;
   }
}

function haveStr(oriStr,oneStr,tok)
{
  var tokNum=getTokNums(oriStr,tok);
  for(var i=1;i<tokNum*1+1;i++)
  {
    if(oneTok(oriStr,tok,i)==oneStr)
	{
		return i;
	}
  }
  return -1;
}

function getRealLength(str)
{
  var realLength=0;
  if(str==null)
	return 0;
  else
  {
    if(jtrim(str).length==0) 
	  return 0;
	else
	{		
		for(var i=0;i<str.length;i++)
		{
          if(str.charCodeAt(i)>127)
			realLength=realLength*1+2;
		  else
            realLength=realLength*1+1;
		}
	}
  }
  return realLength;
}

function retOtherStr(str,tok1,tok2,pack1,pack2)
{

  var num=getTokNums(str,tok1);
  var temStr="";
  var retStr="";
  for(var i=1;i<num+1;i++)
  {
    temStr=oneTok(str,tok1,i).substring(0,2);
    for(var j=0;j<pack1.length;j++)
    {
      if(pack1[j]==jtrim(temStr))
      {
        retStr+=pack2[j]+tok2;
	    break;
      }
    }
  }
  if(jtrim(retStr).length==0) return "";
  return retStr.substring(0,retStr.length-1);
}

function rpc_chkX(x_type,x_no,chk_kind)
{
  var obj_type=document.all(x_type);
  var obj_no=document.all(x_no);
  var idname="";

  if(obj_type.type=="text")
  {
    idname=jtrim(obj_type.value);
  }
  else if(obj_type.type=="select-one")
  {
    idname=jtrim(obj_type.options[obj_type.selectedIndex].text);  
  }

  if(jtrim(obj_no.value).length>0)
  {
    if(jtrim(obj_no.value).length<5)
	{
      rdShowMessageDialog("֤�����볤����������5λ����");
	  obj_no.focus();
  	  return false;
	}
	else
	{
      if(idname=="���֤")
	  {
        if(checkElement(x_no)==false) return false;
	  }
	}
  }
  else 
	return;

  var myPacket = new RPCPacket("../../page/innet/chkX.jsp","������֤��������Ϣ�����Ժ�......");
  myPacket.data.add("retType","chkX");
  myPacket.data.add("retObj",x_no);
  myPacket.data.add("x_idType",getX_idno(idname));
  myPacket.data.add("x_idNo",obj_no.value);
  myPacket.data.add("x_chkKind",chk_kind);
  core.rpc.sendPacket(myPacket);
  delete(myPacket);
}

function rpc_chkX_2(x_type,x_no,chk_kind,retFlag)
{
  var obj_type=document.all(x_type);
  var obj_no=document.all(x_no);
  var idname="";

  if(obj_type.type=="text")
  {
    idname=jtrim(obj_type.value);
  }
  else if(obj_type.type=="select-one")
  {
    idname=jtrim(obj_type.options[obj_type.selectedIndex].text);  
  }

  if(jtrim(obj_no.value).length>0)
  {
    if(jtrim(obj_no.value).length<5)
	{
      rdShowMessageDialog("֤�����볤����������5λ����");
	  obj_no.focus();
  	  return false;
	}
	else
	{
      if(idname=="���֤")
	  {
        if(checkElement(x_no)==false) return false;
	  }
	}
  }
  else 
	return;

  var myPacket = new RPCPacket("../../page/innet/chkX.jsp","������֤��������Ϣ�����Ժ�......");
  myPacket.data.add("retType",retFlag);
  myPacket.data.add("retObj",x_no);
  myPacket.data.add("x_idType",getX_idno(idname));
  myPacket.data.add("x_idNo",obj_no.value);
  myPacket.data.add("x_chkKind",chk_kind);
  core.rpc.sendPacket(myPacket);
  delete(myPacket);
}

function getX_idno(xx)
{
  if(xx==null) return "0";
  
  if(xx=="���֤") return "0";
  else if(xx=="����֤") return "1";
  else if(xx=="��ʻ֤") return "2";
  else if(xx=="����֤") return "4";
  else if(xx=="ѧ��֤") return "5";
  else if(xx=="��λ") return "6";
  else if(xx=="У԰") return "7";
  else if(xx=="Ӫҵִ��") return "8";
  else return "0";
}