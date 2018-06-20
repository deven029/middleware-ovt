/*	�ж��Ƿ�Ϊint��	*/
function isNumber(str){
	str=noSpace(str)
     	j=0
     	for(i=0;i<str.length;i++){
     		if(str.charAt(i)>=0&&str.charAt(i)<10)
       			j++
     	}
     	if(j!=str.length)
       		return false;
  	return true
}
/*	�ж��Ƿ�Ϊ��float�� */
function isFloat(str){
	str=noSpace(str)
	if(str.length==0){
		return false;
	}
	num = str.indexOf(".");
	if(num!=-1){
		if( isNumber(str.substring(0,num))&&isNumber(str.substring(num+1,str.length)) ){
			return true;
		}
	}
	else{
		if( isNumber(str) ){
			return true;
		}
	}
  	return false
}
/*	�ж��Ƿ�Ϊ������float�� */
function isSignFloat(str){
	str=noSpace(str)
	if(str.substring(0,1)=="-"||str.substring(0,1)=="+"){
		str=str.substring(1,str.length);
	}
	if(str.length==0){
		return false;
	}
	num = str.indexOf(".");
	if(num!=-1){
		if( isNumber(str.substring(0,num))&&isNumber(str.substring(num+1,str.length)) ){
			return true;
		}
	}
	else{
		if( isNumber(str) ){
			return true;
		}
	}
  	return false
}
/*	ȥ�ո�	*/
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
/*	�ж�ʱ���yyyy-mm-dd	*/
function isDateHead(str){
	if(str.length>10||str.length<8)
		return false;
	if(str.charAt(4)!="-"||str.charAt(6)!="-"&&str.charAt(7)!="-")
		return false;
	if(str.charAt(6)=="-"){
		j=0;
	 	for(i=0;i<str.length;i++){
	 		if(i!=4||i!=6){
	 			if(str.charAt(i)>=0&&str.charAt(i)<10)
	 				j++;
	 		}
	 	}
	 	if(j!=str.length-2)
	 		return false
	 }
	  if(str.charAt(7)=="-"){
	  	j=0;
	 	for(i=0;i<str.length;i++){
	 		if(i!=4||i!=7){
	 			if(!str.charAt(i)>=0&&str.charAt(i)<10)
	 				j++;
	 		}
	 	}
	 	if(j!=str.length-2)
	 		return false
	 }
	
	 return true;
}
/*	�ж�ʱ���hh:mm:ss	*/
function isDateTrail(str){
	str1=noSpace(str)
	if(str1.length==0){
		return true;
	}
	if(str1.length!=8&&str1.length!=5)
		return false;
	if(str1.length==8){
		if(str.charAt(2)!=":"||str.charAt(5)!=":")
			return false;
	}
	if(str1.length==5){
		if(str.charAt(2)!=":")
			return false;
	}
	j=0;
	for(i=0;i<str1.length;i++){
		if(i!=2||i!=5){
			if(str1.charAt(i)>=0&&str1.charAt(i)<10){
				j++;
			}
		}
		if(i==2||i==5){
			j++;
		}
	}
	if(j!=str1.length){
		return false
	}
	return true;
}
/*	�ж�ʱ���yyyy-mm-dd hh:mm:ss	*/
function isDate(str){
	len = str.length;
	num = str.indexOf(" ");
	if(num!=-1){
		yyyymmdd=str.substring(0,num)
		hhmmss=str.substring(num+1,len)
	}
	else{
		yyyymmdd=str
		hhmmss="00:00:00"
	}
	if(isDateHead(yyyymmdd)){
		if(isDateTrail(hhmmss)){
			return true;
		}
	}
	return false;
}

/*	��"yyyy-mm-dd hh:mm:ss","yyyy-mm-dd hh:mm","yyyy-mm-dd" �����date����	*/
function DateToInt(str){
	temp=str;
	num=temp.indexOf("-");
	yy=temp.substring(0,num)
	temp=temp.substring(num+1,temp.length)

	num=temp.indexOf("-");
	month=temp.substring(0,num)
	temp=temp.substring(num+1,temp.length)

	num=temp.indexOf(" ");
	if(num==-1){
		dd=temp;
		dateTime=new Date(yy,month,dd);
	}
	else{
		dd=temp.substring(0,num);
		temp=temp.substring(num+1,temp.length)
		
		num=temp.indexOf(":");
		if(num==-1){
			dateTime=new Date(yy,month,dd);
		}
		else{
			hh=temp.substring(0,num);
			temp=temp.substring(num+1,temp.length);

			num=temp.indexOf(":");
			if(num==-1){
				mm=temp.substring(0,2);
				ss="00";
			}
			else{
				mm=temp.substring(0,num);
				ss=temp.substring(num+1,num+3);
			}
			dateTime=new Date(yy,month,dd,hh,mm,ss);
		}
	}
	return dateTime;
}
/* �Ƚ�ʱ�䣺str1-str2 ����Сʱ �� ʱ���ʽ��"yyyy-mm-dd hh:mm:ss"*/
function DateYearSub(str1,str2){
	if(isDate(str1)&&isDate(str2)){
		dateTime1=DateToInt(str1);
		dateTime2=DateToInt(str2);
		hour=(dateTime1-dateTime2)/3600000;
		return hour;
	}
	else
		return -1;
}
/*	��DATE����ת����"yyyy-mm-dd hh:mm:ss"	*/
function ShowDateTime(dateTime){
	var current=dateTime
	var year;
	year=eval(current.getYear())

	var month=current.getMonth()
	if(month<10) month="0"+month
	else month=month

	var date=current.getDate()
	if(date<10) date="0"+date
	else date=date

	var hour=current.getHours();
	if(hour<10) hour="0"+hour
	else hour=hour;

	var minute=current.getMinutes()
	if(minute<10) minute="0"+minute
	else minute=minute;

	var second=current.getSeconds()
	if(second<10) second="0"+second
	else second=second;

	var timestr;
	timestr=year+'-'+month+'-'+date+' '
	timestr+=hour+':'+minute+':'+second;

	return timestr;
}
/*	ʱ��"yyyy-mm-dd hh:mm:ss"(str2)��Сʱ(str1)	*/
function DateAddHour(str1,str2){
	if( isDate(str2)&&isFloat(str1) ){
		dateTime=DateToInt(str2);
		str1=str1*3600
		ss=parseInt(dateTime.getSeconds())+parseInt(str1);
		dateTime=new Date(dateTime.getYear(),dateTime.getMonth(),dateTime.getDate(),dateTime.getHours(),dateTime.getMinutes(),ss);
/*
		alert(dateTime.getYear()+"-"+dateTime.getMonth()+"-"+dateTime.getDate()+" "+dateTime.getHours()+":"+dateTime.getMinutes()+":"+dateTime.getSeconds());
*/
		dateTime=ShowDateTime(dateTime);
		return dateTime
	}
	return -1;
}
		
/*	�����ʱ��ת����Сʱ	*/
function DateToHour(){
	dSubmitTime = document.forms[0].dSubmitTime.value
	dProcessDemandTime = document.forms[0].dProcessDemandTime.value
	dCauseDemandTime = document.forms[0].dCauseDemandTime.value
	dAuditDemandTime = document.forms[0].dAuditDemandTime.value
	dProcessLimitTime = document.forms[0].dProcessLimitTime.value
	dCauseLimitTime = document.forms[0].dCauseLimitTime.value
	dAuditLimitTime = document.forms[0].dAuditLimitTime.value
	dProcessDemandTime = DateYearSub(dProcessDemandTime,dSubmitTime)
	dCauseDemandTime = DateYearSub(dCauseDemandTime,dSubmitTime)
	dAuditDemandTime = DateYearSub(dAuditDemandTime,dSubmitTime)
	dProcessLimitTime = DateYearSub(dProcessLimitTime,dSubmitTime)
	dCauseLimitTime = DateYearSub(dCauseLimitTime,dSubmitTime)
	dAuditLimitTime = DateYearSub(dAuditLimitTime,dSubmitTime)
	if(dProcessDemandTime!=-1){
		document.forms[0].dProcessDemandTime.value=dProcessDemandTime
	}
	if(dCauseDemandTime!=-1){
		document.forms[0].dCauseDemandTime.value=dCauseDemandTime
	}
	if(dAuditDemandTime!=-1){
		document.forms[0].dAuditDemandTime.value=dAuditDemandTime
	}
	if(dProcessLimitTime!=-1){
		document.forms[0].dProcessLimitTime.value=dProcessLimitTime
	}
	if(dCauseLimitTime!=-1){
		document.forms[0].dCauseLimitTime.value=dCauseLimitTime
	}
	if(dAuditLimitTime!=-1){
		document.forms[0].dAuditLimitTime.value=dAuditLimitTime
	}
}
/*	�����Сʱת����ʱ��	*/
function HourToDate(){
	dSubmitTime = document.forms[0].dSubmitTime.value
	dProcessDemandTime = document.forms[0].dProcessDemandTime.value
	dCauseDemandTime = document.forms[0].dCauseDemandTime.value
	dAuditDemandTime = document.forms[0].dAuditDemandTime.value
	dProcessLimitTime = document.forms[0].dProcessLimitTime.value
	dCauseLimitTime = document.forms[0].dCauseLimitTime.value
	dAuditLimitTime = document.forms[0].dAuditLimitTime.value
	dProcessDemandTime = DateAddHour(dProcessDemandTime,dSubmitTime)
	dCauseDemandTime = DateAddHour(dCauseDemandTime,dSubmitTime)
	dAuditDemandTime = DateAddHour(dAuditDemandTime,dSubmitTime)
	dProcessLimitTime = DateAddHour(dProcessLimitTime,dSubmitTime)
	dCauseLimitTime = DateAddHour(dCauseLimitTime,dSubmitTime)
	dAuditLimitTime = DateAddHour(dAuditLimitTime,dSubmitTime)
	if(dProcessDemandTime!=-1){
		document.forms[0].dProcessDemandTime.value=dProcessDemandTime
	}
	if(dCauseDemandTime!=-1){
		document.forms[0].dCauseDemandTime.value=dCauseDemandTime
	}
	if(dAuditDemandTime!=-1){
		document.forms[0].dAuditDemandTime.value=dAuditDemandTime
	}
	if(dProcessLimitTime!=-1){
		document.forms[0].dProcessLimitTime.value=dProcessLimitTime
	}
	if(dCauseLimitTime!=-1){
		document.forms[0].dCauseLimitTime.value=dCauseLimitTime
	}
	if(dAuditLimitTime!=-1){
		document.forms[0].dAuditLimitTime.value=dAuditLimitTime
	}
}
//��˸���ʱ��ת����Сʱ
function dispatchAuditDateToHour(){
	dSubmitTime = document.forms[0].dSubmitTime.value
	dAuditDemandTime = document.forms[0].dAuditDemandTime.value
	dAuditLimitTime = document.forms[0].dAuditLimitTime.value
	dAuditDemandTime = DateYearSub(dAuditDemandTime,dSubmitTime)
	dAuditLimitTime = DateYearSub(dAuditLimitTime,dSubmitTime)
	if(dAuditDemandTime!=-1){
		document.forms[0].dAuditDemandTime.value=dAuditDemandTime
	}
	if(dAuditLimitTime!=-1){
		document.forms[0].dAuditLimitTime.value=dAuditLimitTime
	}
}
/*	��˸��ɽ����Сʱת����ʱ��	*/
function dispatchAuditHourToDate(){
	dSubmitTime = document.forms[0].dSubmitTime.value
	dAuditDemandTime = document.forms[0].dAuditDemandTime.value
	dAuditLimitTime = document.forms[0].dAuditLimitTime.value
	dAuditDemandTime = DateAddHour(dAuditDemandTime,dSubmitTime)
	dAuditLimitTime = DateAddHour(dAuditLimitTime,dSubmitTime)
	if(dAuditDemandTime!=-1){
		document.forms[0].dAuditDemandTime.value=dAuditDemandTime
	}
	if(dAuditLimitTime!=-1){
		document.forms[0].dAuditLimitTime.value=dAuditLimitTime
	}
}
