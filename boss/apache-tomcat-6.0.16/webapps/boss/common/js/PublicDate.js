/*
created by bjw
�ô���ʱ��ؼ��������ʣ��ļ�
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//����ϵͳ��ǰ����
var newDateObj = new Date()				//ϵͳ��ǰ����
var thisYear  = newDateObj.getYear()    //��
var thisMonth = newDateObj.getMonth()+1	//��
var thisDate  = newDateObj.getDate()	//��
var thisDay   = newDateObj.getDay()		//��
var thisHour  = newDateObj.getHours();
var thisMin   =	newDateObj.getMinutes();
var thisSend  = newDateObj.getSeconds();
if (eval(thisHour)<10) thisHour = "0" + thisHour;
if (eval(thisMin)<10) thisMin = "0" + thisMin;
if (eval(thisSend)<10) thisSend = "0" + thisSend;

//sub function: ����ָ�����ж�����
function FindNumDaysInMonth(Year, Month)
{
	var MDays0=new Array(31,28,31,30,31,30,31,31,30,31,30,31)
	var MDays1=new Array(31,29,31,30,31,30,31,31,30,31,30,31)
	MonthEle = Month -1;
	var strdays=0;
   		if(IsLeapYear(Year)) strdays=MDays1[MonthEle];
   		else strdays=MDays0[MonthEle];
	return strdays;
}
//sub function: �ж��ǲ�������
function IsLeapYear(Year) 
{	var Ydays=false;
	if((Year%4) == 0) Ydays = true;
	if((Year%100) == 0) Ydays = false;
	if((Year%400) == 0) Ydays = true;
	return Ydays;
}
//sub function: ����ָ�����һ�������ڼ�
function FindNewYearStartingDay(Year)
{
 	var LeapYears, Years, Day;
 
 	LeapYears = NumLeapYears(1995, Year); 

 	if  (Year >=1995)
 		Years = (Year -1995)+LeapYears;
 	else	Years = (Year -1995)-LeapYears; 

 	if  (Year >=1995)
		Day = Math.round(((Years/7 - Math.floor(Years/7))*7)+.1);
 	else	Day = Math.round(((Years/7 -  Math.ceil(Years/7))*7)-.1);
	
	if (Year >=1995){ 
 		if(IsLeapYear(Year)) Day--;
 	}else Day += 7;

 	if(Day < 0) Day = 6;
 	if(Day > 6) Day = 0;
 	return Day;
}
//sub function: ����ָ���µ�һ�������ڼ�
function FindMonthStartDay(NewYearDay, Year, Month)
{
  	var MonthStartDay;
  	var MonthEle = Month - 1;

  	AddArray = new Array(12);

  	AddArray[0]=0;AddArray[1]=3;AddArray[2]=3;AddArray[3]=6;
	AddArray[4]=1;AddArray[5]=4;AddArray[6]=6;AddArray[7]=2;
	AddArray[8]=5;AddArray[9]=0;AddArray[10]=3;AddArray[11]=5;

  	MonthStartDay = NewYearDay + AddArray[MonthEle];
  	if(IsLeapYear(Year)  && (Month ) > 1) MonthStartDay ++;
  
  	if (MonthStartDay > 6) MonthStartDay -= 7;

  	return MonthStartDay; 
}

function NumLeapYears(StartYear, EndYear)
{
 	var LeapYears, i;

 	if (EndYear >= StartYear)
	{
 		for(LeapYears = 0; StartYear <= EndYear; StartYear++)
 			if (IsLeapYear(StartYear)) LeapYears++;
	}else{
		for(LeapYears = 0; EndYear <= StartYear; EndYear++)
 			if (IsLeapYear(EndYear)) LeapYears++;
	}
 	return LeapYears;
}
// function:�ϸ���/�¸��� �ؼ�
function IncDecMonth(val)
{
	var valNum = parseInt(val);
  	var valNumMonth  =  parseInt(OBJMonth.value);
	
	valNumMonth += valNum;
	
	if(valNumMonth > 12) {valNumMonth = 1;OBJYear.value=parseInt(OBJYear.value)+1}
	if(valNumMonth < 1)  {valNumMonth = 12;OBJYear.value=parseInt(OBJYear.value)-1}
	OBJMonth.value = valNumMonth
	
	FillCalendar();
}
//module: д���б�
function wirteYearList()
{
	var objYear
	if(OBJYear.value!="")
	{
		var xxYear=OBJYear.value
		objYear= parseInt(xxYear)
	}
	else 
		objYear= thisYear

	var list1='<table cellspacing=0 cellpadding=0 onmouseover="selected(1)" onmouseout="selected(0)">'
	var list2=''
	for(var i=0;i<10;i++)
	{
		var numYear= objYear-4+i
		if(i==4)
		{
			list2+='<TR><TD style="height:9px;padding-left: 2px;width:45px;color:red">'+numYear+'��</TD></TR>'
		}else		{
			list2+='<TR><TD style="height:9px;padding-left: 2px;width:45px">'+numYear+'��</TD></TR>'
		}
	}
	document.all("YearList").innerHTML= list1+list2+"</TABLE>"
}
//function: ˢ������******************************************
function  FillCalendar()
{
  	var Year, Month, Midx, NewYearDay, MonthStartDay;
	var NumDaysInMonth, i, t;

  	var Year = Number(OBJYear.value )
  	var Month = Number(OBJMonth.value )

	var LastYear= (Month-1==0)?Year-1:Year
	var LastMonth= (Month-1==0)?12:Month-1

  	NewYearDay = FindNewYearStartingDay(Year); 
  	MonthStartDay = FindMonthStartDay(NewYearDay, Year,  Month);
  	NumDaysInMonth = FindNumDaysInMonth(Year, Month);  

  	for(i = 0;  i < 42;  i++)
	{
		t = i+1-MonthStartDay
		nInitDay = parseInt(theDate)
		if(nInitDay>NumDaysInMonth) nInitDay= theDate= NumDaysInMonth
		var Cell_ID= document.all("dayTable").rows(Math.floor(i/7)).cells(i%7)
			if(nInitDay == t)
			{
				Cell_ID.style.background= "#e0e0e0"
				Cell_ID.style.color= "#FF0000"
			}
			else
			{
				Cell_ID.style.background= ""
				Cell_ID.style.color= ""
			}

			if(t<=0)
			{
				Cell_ID.innerText =FindNumDaysInMonth(LastYear, LastMonth)+t
				Cell_ID.style.border="1px white solid"
				Cell_ID.code="-1"
			}
			else if(t<=NumDaysInMonth)
			{
				Cell_ID.innerText = t
				Cell_ID.style.border="1px white solid"
				Cell_ID.style.borderRight="1px black solid"
				Cell_ID.style.borderBottom="1px black solid"
				Cell_ID.code="0"
			}
			else if(t>NumDaysInMonth)
			{
				Cell_ID.innerText = t-NumDaysInMonth
				Cell_ID.style.border="1px white solid"
				Cell_ID.code="1"
			}
  	}//end for
	showdate()
	wirteYearList()
}


//sub: ��ʾ�б�
function showList(listID)
{
	document.all(listID).style.display=""
}
//sub: �����б�
function hiddeList()
{
	document.all("YearList").style.display="none"
	document.all("MonthList").style.display="none"
	document.all("HoursList").style.display="none"
	flag=true
}
//function: ������������ ����******************************************
function controlPanelClick()
{
	var objID= event.srcElement
	var objTagName=objID.tagName+""+objID.parentElement.tagName
	if(objTagName=="IMGTD"||objTagName=="INPUTTD")
	{
		var num= objID.parentElement.children.length
		if(objID==objID.parentElement.children[1]||objID==objID.parentElement.children[2])
		{
			if(flag)
			{
				showList("YearList");flag=!flag
			}else 
				hiddeList()			
		}
		else if(objID==objID.parentElement.children[3]||objID==objID.parentElement.children[4])
		{
			if(flag)
			{
				showList("MonthList");flag=!flag
			}else 
				hiddeList()
		}
		else if(objID==objID.parentElement.children[5]||objID==objID.parentElement.children[6])
		{
			if(flag)
			{
				showList("HoursList");flag=!flag
			}else 
				hiddeList()
		}
		else 
			hiddeList()
	}
	else 
	{
		hiddeList()
		if(objTagName=="TDTR"&&objID.innerHTML!=""&&objID.innerHTML.length<6)
		{
			if(objID.innerHTML.indexOf("��")>0)
			{
				var newYear= objID.innerHTML.replace("��","")
				OBJYear.value=newYear
			}
			else if(objID.innerHTML.indexOf("��")>0)
			{
				var newMonth=objID.innerHTML.replace("��","")
				OBJMonth.value=newMonth
			}
			else if(objID.innerHTML.indexOf(":")>0)
			{
				var newTime=objID.innerHTML;
				document.all("tdTime").value=newTime;
			}
		}
	}
	FillCalendar()
}
//sub: ѡ���б� ����
function selected(inx)
{
	if(event.srcElement.tagName!='TABLE') 
	{
		if (inx==1)
		{
			event.srcElement.style.background='blue' 
			event.srcElement.style.color='white'
		}
		else 
		{
			event.srcElement.style.background='' 
			event.srcElement.style.color=''
		}
	}
}

//function: �رմ��� ����
function UnloadPage()
{
	window.returnValue = winReturnVal
}
function down() //sub 
{
event.srcElement.src=event.srcElement.src.replace('0.gif','1.gif')
}
function up() //sub 
{
event.srcElement.src=event.srcElement.src.replace('1.gif','0.gif')
}
//ѡ��ʱ�䵯����
function selectDate(TheData)
{
	var strUrl ="../../js/Date.html";
	var strStyle = "dialogWIdth=310px;dialogHeight=263px;status=off;scroll=no;unadorned=yes;resizable=off;help=off";
	var strDate = "";
	var AryDate=window.showModalDialog(strUrl ,strDate, strStyle);
	var month = AryDate[2];
	var day   = AryDate[3];
	/*if (eval(AryDate[1]) == thisYear && eval(month) == thisMonth &&eval(day) == thisDate && eval(AryDate[4]) == thisHour && eval(AryDate[5]) == thisMin ){
		alert("�Բ�����û��ѡ��ط�ʱ�䣬��ѡ�񣡣�");
	}else{
		TheData.value=AryDate[1]+"/" + month + "/" + day + " " + AryDate[4] + ":" + AryDate[5] + ":" + AryDate[6];
	}*/
	TheData.value=AryDate[1]+"/" + month + "/" + day + " " + AryDate[4] + ":" + AryDate[5] + ":" + AryDate[6];
}

//ѡ��ʱ�䵯����
function selectDateTime(TheData)
{
    var inputDate = "aa";
    if(TheData.value==""){
        inputDate = "";
    }
    else{
        inputDate = TheData.value;
    }
    //alert(inputDate);
	var strUrl ="/spms/jsp/common/DateTime.jsp?inputDate="+inputDate;
	var strStyle = "dialogWIdth=310px;dialogHeight=263px;status=off;scroll=no;unadorned=yes;resizable=off;help=off";
	var strDate = "";
	var AryDate=window.showModalDialog(strUrl ,strDate, strStyle);
	var month   = AryDate[2];
	var day     = AryDate[3];
	var hour    = AryDate[4];
	var minute  = AryDate[5];
	var second  = AryDate[6];
	
	    if(month<10 && month.length==1)
	        month = "0" + month;
	    if(day<10 && day.length==1)
	        day = "0" + day;
        if(hour<10 && hour.length==1)
	        hour = "0" + hour;
	    if(minute<10 && minute.length==1)
	        minute = "0" + minute;
	    if(second<10 && second.length==1)
	        second = "0" + second;    
        
		TheData.value=AryDate[1]+"-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	
}
//ѡ��ʱ�䵯�������ڻطûظ�
function selectBackDateTime(TheData)
{
    var inputDate = "aa";
    if(TheData.value==""){
        inputDate = "";
    }
    else{
        inputDate = TheData.value;
    }
    //alert(inputDate);
	var strUrl ="/vboss-manager-test/vboss_page/common/DateTime.jsp?inputDate="+inputDate+"&cBackFlag=1";
	var strStyle = "dialogWIdth=310px;dialogHeight=263px;status=off;scroll=no;unadorned=yes;resizable=off;help=off";
	var strDate = "";
	var AryDate=window.showModalDialog(strUrl ,strDate, strStyle);
	var month   = AryDate[2];
	var day     = AryDate[3];
	var hour    = AryDate[4];
	var minute  = AryDate[5];
	var second  = AryDate[6];
	
	    if(month<10 && month.length==1)
	        month = "0" + month;
	    if(day<10 && day.length==1)
	        day = "0" + day;
        if(hour<10 && hour.length==1)
	        hour = "0" + hour;
	    if(minute<10 && minute.length==1)
	        minute = "0" + minute;
	    if(second<10 && second.length==1)
	        second = "0" + second;    
        
		TheData.value=AryDate[1]+"-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	
}