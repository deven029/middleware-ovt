function isValidDate(sDate)
{
//Format: /YYYY/MM/DD   YYYY/MM/DD   YYYY-MM-DD  YYYY-MM-DD
//	var datePat = /^(\d{4})(\/|-)(\d{1,2})\2(\d{1,2})$/; //正则表达式
//	var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/; //正则表达式 MM-DD-YYYY
	var datePat = /^(\d{4})(\d{2})(\d{2})$/; //YYYYMMDD
	var matchArray = sDate.match(datePat); // is the format ok?
	if (matchArray == null) {
		alert(sDate + "  不是一个有效的日期格式.")
		return false;
	}
	year = matchArray[1];
	month = matchArray[2]; // parse date into variables
	day = matchArray[3];
	if (year < 1900 || year > 2600) { // check month range
		alert("年份应该在 1900 到 2600 之间.");
		return false;
	}
	if (month < 1 || month > 12) { // check month range
		alert("月份应该在 1 到 12 之间.");
		return false;
	}
	if (day < 1 || day > 31) {
		alert("日期应该在 1 到 31 之间.");
		return false;
	}
	if ((month==4 || month==6 || month==9 || month==11) && day==31) {
		alert(month+" 月没有31天!")
		return false;
	}
	if (month == 2) { // check for february 29th
		var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
		if (day>29 || (day==29 && !isleap)) {
			alert(year + " 年的二月没有 " + day + " 天!");
			return false;
		}
	}
	return true;
}

function isValidTime(sTime)
{   
  //时间格式为：HH:MM:SS
//	var datePat = /^(\d{1,2})(:)(\d{1,2})\2(\d{1,2})$/; //正则表达式
	var datePat = /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/; //正则表达式
	var matchArray = sTime.match(datePat); // is the format ok?
	if (matchArray == null) {
		alert(sTime + "  不是一个有效的时间格式.")
		return false;
	}
	hour   = matchArray[1];
	minute = matchArray[2]; // parse time into variables
	second = matchArray[3];
	if (second=="") { second = null; }

	if (hour < 0 || hour > 23) { // check month range
		alert("小时应该在 0 到 23 之间.");
		return false;
	}
	if (minute < 0 || minute > 59) { // check month range
		alert("分钟应该在 0 到 59 之间.");
		return false;
	}
	if ((second!=null) && (second < 0 || second > 59)) {
		alert("秒应该在 0 到 59 之间.");
		return false;
	}
	return true;
}   

function isValidDateTime(sDateTime)
{
	sDate = sDateTime.substring(0,8);
	sTime = sDateTime.substring(9,17);
	
	bisValidDate = isValidDate(sDate);
	bisValidTime = true;
	if(sTime!="")
		bisValidTime = isValidTime(sTime);
	if(bisValidTime && bisValidDate)
		return true;
	else
		return false;
}

function isLeapYear(iYear)
{
	iYear  = parseInt(iYear, 10);
	isleap = (iYear % 4 == 0 && (iYear % 100 != 0 || iYear % 400 == 0));
	return isleap;
}

function getDays(iYear,iMonth)
{
	iYear  = parseInt(iYear, 10);
	iMonth = parseInt(iMonth, 10);
	var iDays = 0;
	if (iMonth==4 || iMonth==6 || iMonth==9 || iMonth==11)
		iDays = 30;
	if (iMonth==1 || iMonth==3 || iMonth==5 || iMonth==7 || iMonth==8|| iMonth==10|| iMonth==12)
		iDays = 31;
	isLeap = isLeapYear(iYear);
	if(iMonth==2 && isLeap)
		iDays = 29;
	if(iMonth==2 && !isLeap)
		iDays = 28;
	return iDays;
}

function dateToString(dateObj){
	var iYear;
	var iMonth;
	var iDay;
	iYear	= dateObj.getYear();
	iMonth	= dateObj.getMonth();
	iDay	= dateObj.getDate();
	iMonth++;
	if(iMonth<10)
		iMonth = "0" + iMonth;
	if(iDay<10)
		iDay = "0" + iDay;
	return "" + iYear + iMonth + iDay;
}

function timeToString(dateObj){
	var iHours;
	var iMinutes;
	var iSeconds;
	iHours   = dateObj.getHours();
	iMinutes = dateObj.getMinutes();
	iSeconds = dateObj.getSeconds();
	if(iHours<10)
		iHours = "0" + iHours;
	if(iMinutes<10)
		iMinutes = "0" + iMinutes;
	if(iSeconds<10)
		iSeconds = "0" + iSeconds;

	return iHours + ":" + iMinutes + ":" +iSeconds + "";
}

function nowTime()
{
	return timeToString(new Date());
}

function NowDateTime()
{
	return dateToString(new Date());
}

function addDateTime(sDateTime,sType,iValue)
{
	if(!isValidDate(sDateTime))
		return false;
	
	var datePat = /^(\d{4})(\d{2})(\d{2})$/; //YYYYMMDD
	var matchArray = sDateTime.match(datePat); // is the format ok?
	if (matchArray == null) {
		return false;
	}
	year = matchArray[1];
	month = matchArray[2]; // parse date into variables
	day = matchArray[3];
	var tmpDate = new Date(year,month-1,day);

	if(sType=="DAY"){
		day = tmpDate.getDate() + iValue;
		tmpDate.setDate(day);
	}
	if(sType=="MONTH"){
		month = tmpDate.getMonth() + iValue;
		tmpDate.setMonth(month);
	}
	if(sType=="YEAR"){
		year = tmpDate.getYear() + iValue;
		tmpDate.setYear(year);
	}
	return dateToString(tmpDate);
}

function dateCompare(sDate1,sDate2){
	
	if(sDate1>sDate2)	//sDate1 早于 sDate2
		return 1;
	if(sDate1==sDate2)	//sDate1、sDate2 为同一天
		return 0;
	return -1;		//sDate1 晚于 sDate2
}

function dateDiff(date1,date2){                      
	x = Math.round((date1.getTime()-date2.getTime())/1000);                      
	if(x<0)	return false;
	s = (x)%60;               
	x = Math.round((x-s)/60-0.5);        
	m = (x) % 60;        
	x = Math.round((x-m)/60-0.5);        
	h = x;//%60;        
//	x = Math.round((x-h)/24-0.5);        
//	d = x;        
	return h + "小时" + m + "分" + s + "秒" ;        
}                      

function ModifyDay(OSelect,iYear,iMonth)
{
	iDays = getDays(iYear,iMonth) + 1;
	var option0;
	OSelect.options.length = 0;
	for(i=1;i<iDays;i++){
		if(i<10){
			option0 = new Option(i,"0" + i);
		}else{
			option0 = new Option(i, i);
		}
		OSelect.options[i-1] = option0;
	}
}

function PutDay(iYear,iMonth)
{
	iDays = getDays(iYear,iMonth) + 1;
	for(i=1;i<iDays;i++){
		if(i<10){
			document.write("<option value=" + "0" + i + ">" + i);
		}else{
			document.write("<option value=" + i + ">" + i);
		}
	}
}

function PutMonth()
{
	document.write("<option value=01>1 ");
	document.write("<option value=02>2 ");
	document.write("<option value=03>3 ");
	document.write("<option value=04>4 ");
	document.write("<option value=05>5 ");
	document.write("<option value=06>6 ");
	document.write("<option value=07>7 ");
	document.write("<option value=08>8 ");
	document.write("<option value=09>9 ");
	document.write("<option value=10>10");
	document.write("<option value=11>11");
	document.write("<option value=12>12");
}

function PutYear()
{
	document.write("<option value=1995>1995");
	document.write("<option value=1996>1996");
	document.write("<option value=1997>1997");
	document.write("<option value=1998>1998");
	document.write("<option value=1999>1999");
	document.write("<option value=2000>2000");
	document.write("<option value=2001>2001");
	document.write("<option value=2002>2002");
	document.write("<option value=2003>2003");
	document.write("<option value=2004>2004");
	document.write("<option value=2005>2005");
	document.write("<option value=2006>2006");
}
