<%@ page contentType= "text/html;charset=utf-8" %>

<% String path = request.getContextPath(); %>
<html>
<head>
<title> 日历 </title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<META NAME="Modify" CONTENT="2002-5-28 11:56:59">
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<SCRIPT LANGUAGE="JavaScript" SRC="<%= path %>/common/js/PublicDate.js"></SCRIPT>
<script language="javascript">
 
//public:start
var winReturnVal = "";	//返回变量值
var flag = true;
var strArg="";
var StrReg = new RegExp("[年月日-]","g");

//定义年月日变量
var theYear ;   //年
var theMonth ;	//月
var theDate ;	//日
var theTime;

//定义年月日对象
var OBJYear;    //年
var OBJMonth;	//月
var OBJTime;
//public:end

//Function: 初始设置******************************************
function loadInitDay()
{
	OBJYear=document.all("tdYear") ;    //年
	OBJMonth=document.all("tdMonth") ;	//月
	OBJTime =document.all("tdTime") ;	//time

	var strDialog = window.dialogArguments;
	var inputDate = "<%=request.getParameter("inputDate")%>"
	
	if(strDialog==""){
	    //alert("strDialog is null");
	        
	    if(inputDate==""){
            theYear  = thisYear;
		    theMonth = thisMonth;
		    theDate  = thisDate;
		    theTime  = thisHour + ":" + thisMin + ":" + thisSend;
		    theHour  = thisHour;
		    theMin   = thisMin;
		    theSend  = thisSend;
		    if(theMonth<10)	        
		        theMonth = "0" + thisMonth;
		}
		else{
		    theYear  = inputDate.substring(0,4);	 //年
		    theMonth = inputDate.substring(5,7);
		    theDate  = inputDate.substring(8,10);
		    theTime  = inputDate.substring(11,19)
		    theHour  = inputDate.substring(11,13);
		    theMin   = inputDate.substring(14,16);
		    theSend  = inputDate.substring(17,19);	        
		    
		}
		
		winReturnVal = new Array(theYear+"年"+theMonth+"月"+theDate+"日",theYear,theMonth,theDate,theHour,theMin,theSend);
	}
	else{
	    var strInit = strDialog.split("-");
		theYear  = strInit[0];	 //年
		theMonth = strInit[1];	 //月
		theDate  = strInit[2];	 //日
		winReturnVal = new Array(theYear+"年"+theMonth+"月"+theDate+"日",theYear,theMonth,theDate,thisHour,thisMin,thisSend);
	}
	// set current time is am. or pm.
	if (eval(theHour)>=12 && eval(theMin)>=0) {
	    ap.src="../../images/pm0.gif"; 
	}
	else{
		ap.src="../../images/am0.gif";
	}
		
	OBJYear.value  = theYear;
	OBJMonth.value = theMonth;
	OBJTime.value  = theTime;
	FillCalendar(); //写日历
	//设置下拉条的位置
	YearList.style.top=tdYear.offsetTop+tdYear.parentElement.offsetTop+tdYear.offsetHeight+1;
	YearList.style.left=tdYear.offsetLeft+tdYear.parentElement.offsetLeft+1;
	MonthList.style.top=tdMonth.offsetTop+tdMonth.parentElement.offsetTop+tdYear.offsetHeight+1;
	MonthList.style.left=tdMonth.offsetLeft+tdMonth.parentElement.offsetLeft+1;
	HoursList.style.top=tdTime.offsetTop+tdTime.parentElement.offsetTop+tdTime.offsetHeight+1;
	HoursList.style.left=tdTime.offsetLeft+tdTime.parentElement.offsetLeft+1;
}

//function: 选择今天
function SelectDate()
{
	SaveDate();
}

//function: 点选日期目标 操作******************************************
function DateClicked()
{
	var nDay= event.srcElement.innerText;
	var flag= event.srcElement.code;
	if(flag=="-1") {
	    theDate=nDay;IncDecMonth(-1);
    }
	else if(flag=="1") {
	    theDate=nDay;IncDecMonth(1);
    }
	else if(flag=="0"){
		if(nDay == ""||isNaN(nDay))	
		    return;
		var XYear=OBJYear.value;
		var XMonth=OBJMonth.value;
		var XDate=event.srcElement.innerText;
		event.srcElement.style.background="#66FF00";
		event.srcElement.style.color="#FF0000";
		
		showdate(XDate);
		
	}
}

function showdate(indate) {
	if(indate!=null) {
	    strDay=theDate=indate;
    }
	else {
	    strDay=theDate;
	}
	strMonth=OBJMonth.value;
	strYear= OBJYear.value;
	strTime= OBJTime.value;
	var cMonth = eval(strMonth);
	var cDay = eval(strDay);
	
	if (cMonth<10 && cMonth.length==1) 
	    strMonth = "0" + strMonth;
	if (cDay<10 && cDay.length==1) 
	    strDay = "0" + strDay;
	if (strTime.length<6) 
	    strTime = strTime + ":00";
	document.all("StartDate").innerText =strYear+"年"+strMonth+"月"+strDay+"日";
	document.all("StartTime").innerText =strTime;
}
function SaveDate(){	
	var SValue=document.all("StartDate").value; 
	if(SValue=="") {
	    alert("未选择日期！");
	    Flag_period="start";
	    return;
	}
	var XDate=SValue.split(StrReg)
	var tDate=document.all("StartTime").value.split(":");
	
	if (ap.src.indexOf("pm")>0 && eval(tDate[0])<12) {
		tDate[0] = eval(tDate[0]) + 12;
	}
	
	var this_d = new Array(thisYear,thisMonth,thisDate,thisHour,thisMin);
	var flag = false;
<%
	if(request.getParameter("cBackFlag")==null){
%>
	flag = true;
<%
	}
	else{
%>
	for (var i=0 ; i<this_d.length ; i++) {
		if (i<3) {
			if (eval(XDate[i]) > eval(this_d[i])){
				flag = true;
				break;
			}else if (eval(XDate[i]) < eval(this_d[i])) {
				alert("对不起，回访日期或者回复日期不能早于当前日期，请重新选择！！");
				break;
			}				
		}else{
			if (eval(tDate[i-3]) > eval(this_d[i])) {
				flag = true;
				break;
			}else if (eval(tDate[i-3]) <= eval(this_d[i])) {
				alert("对不起，回访时间或者回复时间不能早于当日时间，请重新选择！！");
				break;
			}else
				flag = true;
		}
	}
<%
	}
%>
	if (flag) {
		month   = XDate[1];
		day     = XDate[2];
		hour    = tDate[0];
		minute  = tDate[1];
		second  = tDate[2];
		
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
		var strDay =new Array(SValue,XDate[0],month,day,hour,minute,second);
		winReturnVal = strDay;
		window.close()
	} 
}

function swapImg() {
	var obj = event.srcElement;
	
	if (obj.src.indexOf("am")>0) 
		obj.src = obj.src.replace('am','pm');
	else if (obj.src.indexOf("pm")>0)
		obj.src = obj.src.replace('pm','am');
}
</script>
<STYLE TYPE="text/css" TITLE="">
td {height:20px;font-size:12px;text-align:center}
font {font-size:12px}
img {margin-left:2px;margin-right:2px}
.list{top:28px;
	background:#ffffea;
	border:1px black solid;
	font-size:12px;cursor:hand}
td.cellavai {
	border-top:1px white solid;
	border-left:1px white solid;
	border-right:1px black solid;
	border-bottom:1px black solid;
	}
input.inputline {
	border:0px;
	border-bottom:1px black solid;
	background:;
	width:100px;}
input.inputline1 {
	border:0px;
	border-bottom:1px black solid;
	background:;
	width:60px;}
</STYLE>
</head>

<body bgcolor="LIGHTBLUE" onLoad="loadInitDay();" onUnload="UnloadPage();" topmargin=0 leftmargin=0 scroll=no > 

<table bordercolorlight="#FFFFFF" bordercolordark="#FFFFFF" border="1"  width="100%" >
<tr><td colspan=7 align=center onclick="controlPanelClick();">
	<IMG SRC="<%= path %>/common/images/minus0.gif" onmousedown ="down();" onmouseup ="up();" onclick="IncDecMonth(-1);" BORDER=0 align=absmiddle ALT="上个月"
	  ><IMG SRC="<%= path %>/common/images/downbutton0.gif" onmousedown= "down();" onmouseup= "up();" 	BORDER=0 align=absmiddle><INPUT TYPE="text" id="tdYear" maxlength= 4 value="" onMouseOver="this.focus();" readonly 
	  onkeypress="if(event.keyCode<48||event.keyCode>57) FillCalendar();" style="width:32px;border:1px black solid;background:;" >年<IMG SRC="<%= path %>/common/images/downbutton0.gif" onmousedown ="down();" onmouseup ="up();" BORDER=0 align=absmiddle><INPUT TYPE="text" id="tdMonth" maxlength= 2 value="" onMouseOver="this.focus();" 
	  onkeypress="if(Number(this.value)>12)this.value=thisMonth;if(event.keyCode<48||event.keyCode>57) FillCalendar();"
	    style="width:18px;border:1px black solid;background:'"
	    >月<IMG SRC="<%= path %>/common/images/downbutton0.gif" onmousedown= "down();" onmouseup= "up();" 	BORDER=0 align=absmiddle><INPUT TYPE="text" id="tdTime" maxlength= 4 value="" onMouseOver="this.focus();" readonly  
	    style="width:40px;border:1px black solid;background:;" >时<IMG SRC="<%= path %>/common/images/plus0.gif" onmousedown ="down();" onmouseup ="up();" onclick="IncDecMonth(1);" BORDER=0 align=absmiddle ALT="下个月">
	    <button onclick="SaveDate();" style="border:1px white solid;background:;">确定</button>
	</td></tr>

<tr><td colspan=7 align=center><INPUT TYPE="text" name="StartDate" readonly class="inputline"><INPUT TYPE="text" class="inputline1" id="StartTime" name="StartTime" readonly><IMG id=ap SRC="<%= path %>/common/images/am0.gif" onmousedown ="down();" onmouseup ="up();" onclick="swapImg();" BORDER=0 align=absmiddle></td></tr>

<tr>
    <td >星期日</td>
    <td >星期一</td>
    <td >星期二</td>
    <td >星期三</td>
    <td >星期四</td>
    <td >星期五</td>
    <td >星期六</td>
</tr>
</table>

<div id=YearList class="list" onclick="controlPanelClick();" style="width:45px;display:none;position:absolute;"></div>

<TABLE id=MonthList class="list" onclick="controlPanelClick();" style="width:30px;display:none;position:absolute;padding-left: 3px;" 
cellspacing=0 cellpadding=0 onmouseover="selected(1)" onmouseout="selected(0)">

<TR><TD style="height:9px">1月</TD></TR>
<TR><TD style="height:9px">2月</TD></TR>
<TR><TD style="height:9px">3月</TD></TR>
<TR><TD style="height:9px">4月</TD></TR>
<TR><TD style="height:9px">5月</TD></TR>
<TR><TD style="height:9px">6月</TD></TR>
<TR><TD style="height:9px">7月</TD></TR>
<TR><TD style="height:9px">8月</TD></TR>
<TR><TD style="height:9px">9月</TD></TR>
<TR><TD style="height:9px">10月</TD></TR>
<TR><TD style="height:9px">11月</TD></TR>
<TR><TD style="height:9px">12月</TD></TR>
</TABLE>
<TABLE id=HoursList class="list" onclick="controlPanelClick();" style="width:45px;display:none;position:absolute;padding-left: 3px;" 
cellspacing=0 cellpadding=0 onmouseover="selected(1)" onmouseout="selected(0)">

<TR><TD style="height:7px">00:00</TD></TR>
<TR><TD style="height:7px">01:00</TD></TR>
<TR><TD style="height:7px">02:00</TD></TR>
<TR><TD style="height:7px">03:00</TD></TR>
<TR><TD style="height:7px">04:00</TD></TR>
<TR><TD style="height:7px">05:00</TD></TR>
<TR><TD style="height:7px">06:00</TD></TR>
<TR><TD style="height:7px">07:00</TD></TR>
<TR><TD style="height:7px">08:00</TD></TR>
<TR><TD style="height:7px">09:00</TD></TR>
<TR><TD style="height:7px">10:00</TD></TR>
<TR><TD style="height:7px">11:00</TD></TR>
</TABLE>
<TABLE id="dayTable" onclick="DateClicked();FillCalendar();" ondblclick="window.close();"  
style="cursor:hand;border-right:1px white solid;border-bottom:0px;border-top:0px" width=100% border="1" >
  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
</TABLE>
<TABLE id="controlTable" style="cursor:hand;border:1px white solid;" width=100%; border="1" >
<TR><TD class="cellavai" onclick="SelectDate();"><font >今天</font></TD></TR>
</TABLE></body>

</html>
