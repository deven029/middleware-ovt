/* created by wangxj on 2002/7/28 */

//�˺����ж������ַ����Ƿ�Ϊ����
function isNumber(str){
	str=noSpace(str)
     	j=0
     	for(i=0;i<str.length;i++){
     		if(str.charAt(i)>=0&&str.charAt(i)<10)
       			j++
     	}
     	if(j!=str.length)
       		return false;
  	return true;
}

//�˺�������ȥ�ո�
function noSpace(st){
        Str=new String(st)
        str_new=''
        Len=Str.length
        for(i=0;i<Len;i++){
                if(Str.charAt(i)==" ")
                        str_new+=''
                else
                        str_new+=Str.charAt(i)
        }
        return str_new
}

//�˺����ж��Ƿ����"YYYY-MM-DD"������
function isDate(str){
	str=noSpace(str)
	if(str=="")
		return true;
	if(str.length>10||str.length<8)
		return false;
	if(str.charAt(4)!="-"||str.charAt(6)!="-"&&str.charAt(7)!="-")
		return false;
	if(str.charAt(6)=="-"){
		if(str.length<=7)
			return false;
		j=0;
	 	for(i=0;i<str.length;i++){
	 		if(i!=4||i!=6){
	 			if(str.charAt(i)>=0&&str.charAt(i)<10)
	 				j++;
	 		}
	 	}
	 	if(j!=str.length-2)
	 		return false
	 	tm=parseInt(str.substring(5,6));
	 	td=parseInt(str.substring(7,str.length));
	 	if(tm>12||td>31)
	 		return false;
	 }
	  if(str.charAt(7)=="-"){
	  	if(str.length<=8)
			return false;
	  	j=0;
	 	for(i=0;i<str.length;i++){
	 		if(i!=4||i!=7){
	 			if(!str.charAt(i)>=0&&str.charAt(i)<10)
	 				j++;
	 		}
	 	}
	 	if(j!=str.length-2)
	 		return false
	 	tm=parseInt(str.substring(5,7));
	 	td=parseInt(str.substring(8,str.length));
	 	if(tm>12||td>31)
	 		return false;
	 }
	 
	
	 return true;
}

//�˺����ж��Ƿ����"HH:MM"������
function isDateTime(str){
	str=noSpace(str)
	if(str=="")
		return true;
	if(str.length>5||str.length<5)
		return false;
	if(str.charAt(2)!=":")
		return false;
	if(str.charAt(2)==":"){
		j=0;
	 	for(i=0;i<str.length;i++){
	 		if(i!=2){
	 			if(str.charAt(i)>=0&&str.charAt(i)<10)
	 				j++;
	 		}
	 	}
	 	if(j!=str.length-1)
	 		return false
	 	tm=parseInt(str.substring(0,2));
	 	td=parseInt(str.substring(3,str.length));
	 	if(tm>24||td>60)
	 		return false;
	 }
	  
	 return true;
}

function isValidTime(sTime)
{   
  //ʱ���ʽΪ��HH:MM:SS
//	var datePat = /^(\d{1,2})(:)(\d{1,2})\2(\d{1,2})$/; //������ʽ
	var datePat = /^(\d{1,2}):(\d{1,2})(:(\d{1,2}))$/; //������ʽ
	var matchArray = sTime.match(datePat); // is the format ok?
	if (matchArray == null) {
		alert(sTime + "  ����һ����Ч��ʱ���ʽ.")
		return false;
	}
	hour   = matchArray[1];
	minute = matchArray[3]; // parse time into variables
	second = matchArray[4];
	if (second=="") { second = null; }

	if (hour < 0 || hour > 23) { // check month range
		alert("СʱӦ���� 0 �� 23 ֮��.");
		return false;
	}
	if (minute < 0 || minute > 59) { // check month range
		alert("����Ӧ���� 0 �� 59 ֮��.");
		return false;
	}
	if ((second!=null) && (second < 0 || second > 59)) {
		alert("��Ӧ���� 0 �� 59 ֮��.");
		return false;
	}
	return true;
}   

//�˺����Ƚ������"YYYY-MM-DD"���͵������Ƿ���ڵ�ǰ����
function compareDate(str){
	var today=new Date();
	var ty=today.getYear();
	var tm=today.getMonth()+1;
	var td=today.getDate();
	str=noSpace(str)
	pos1=str.indexOf("-",0);
	pos2=str.indexOf("-",pos1+1);
	cy=eval(str.substring(0,pos1));
	cm=eval(str.substring(pos1+1,pos2));
	cd=eval(str.substring(pos2+1,str.length));
	if(cy<ty)
		return false;
	else if(cy==ty){
		if(cm<tm)
			return false;
		else if(cm==tm){
			if(cd<=td)
				return false;
			else
				return true;
		}
		else
			return true;
	}
	else
		return true;
}

//���������ַ���c�ĳ��ȣ��Ժ�����Ч
function unicodeLength(c){
		l = c.length;
		for(i=0;i<c.length;i++){
			if( c.charAt(i) > unescape("%ff") )
				l++;
		}
		return l;
}

function compareTwoDate(str1,str2){
	str1_1 = str1.substring(0,str1.indexOf("!"));
	str1_2 = str1.substring(str1.indexOf("!")+1,str1.length);
	pos1=str1_1.indexOf("-",0);
	pos2=str1_1.indexOf("-",pos1+1);
	yy=eval(str1_1.substring(0,pos1));
	mm=eval(str1_1.substring(pos1+1,pos2));
	dd=eval(str1_1.substring(pos2+1,str1_1.length));
	hh=eval(str1_2.substring(0,str1_2.indexOf(":")));
	mi=eval(str1_2.substring(str1_2.indexOf(":")+1,str1_2.length));
	date1 = new Date(yy,mm,dd,hh,mi);
	
	str2_1 = str2.substring(0,str2.indexOf("!"));
	str2_2 = str2.substring(str2.indexOf("!")+1,str2.length);
	pos1=str2_1.indexOf("-",0);
	pos2=str2_1.indexOf("-",pos1+1);
	yy=eval(str2_1.substring(0,pos1));
	mm=eval(str2_1.substring(pos1+1,pos2));
	dd=eval(str2_1.substring(pos2+1,str1_1.length));
	hh=eval(str2_2.substring(0,str2_2.indexOf(":")));
	mi=eval(str2_2.substring(str2_2.indexOf(":")+1,str2_2.length));   
	date2 = new Date(yy,mm,dd,hh,mi);
	date3 = date1-date2;
	//alert(date1.toLocaleString()+"&nbsp;"+date2.toLocaleString()+"&nbsp;"+date3.toLocaleString());
	
	//if(date3.toLocaleString()>0)
	if(date3>0)
		//return false;
		return 0;
	else
		//return true;
		return 1;
}
	