/*
关于时间显示函数:
cha_date(yorm,date_value,field_code)
	yorm为年或月，改变年时为'y',改变月时为'm';
	date_value为年份或月份；
	field_code为字段代码，即时间下拉表单的名称。
	此函数在改变年份及月份时调用;
list_time(field_code,date_part,begin_year,end_year)
	field_code为字段代码，即时间下拉表单的名称；
	date_part为显示时间形式选择，固定为6位，依次为年月日时分秒，需显示则在相应位置1，否则置0，默认显示年月日；
	begin_year为当前年与显示的起始年的差值,缺省为3年;
	end_year为显示的结束年与当前年的差值,缺省为5年。
*/

function cha_date(yorm,date_value,field_code,relation_field){
	if (yorm=='y') {
		var y=date_value;
		var m=eval("document.forms[0]."+field_code+"_month.value");
	} else {
		var y=eval("document.forms[0]."+field_code+"_year.value");
		var m=date_value;
	}
	var day_value;
	if (m==1 || m==3 || m==5 || m==7 || m==8 || m==10 || m==12) day_value=31
	if (m==4 || m==6 || m==9 || m==11) day_value=30
	if (m==2)
		if ((y%4==0 && y%100!=0) || y%400==0) day_value=29; else day_value=28;
	for (i=0;i<day_value;i++) {
		eval("document.forms[0]."+field_code+"_day.length="+day_value);
		eval("document.forms[0]."+field_code+"_day.options["+i+"].value="+(i+1));
		eval("document.forms[0]."+field_code+"_day.options["+i+"].text="+(i+1));
	}
	if (relation_field != "undefined") {
		for (i=0;i<day_value;i++) {
			eval("document.forms[0]."+relation_field+"_day.length="+day_value);
			eval("document.forms[0]."+relation_field+"_day.options["+i+"].value="+(i+1));
			eval("document.forms[0]."+relation_field+"_day.options["+i+"].text="+(i+1));
		}
	}
}

function submit_date(y,m,field_code){
	var day_value;
	if (m==1 || m==3 || m==5 || m==7 || m==8 || m==10 || m==12) day_value=31
	if (m==4 || m==6 || m==9 || m==11) day_value=30
	if (m==2)
		if ((y%4==0 && y%100!=0) || y%400==0) day_value=29; else day_value=28;
	for (i=0;i<day_value;i++) {
		eval("document.forms[0]."+field_code+"_day.length="+day_value);
		eval("document.forms[0]."+field_code+"_day.options["+i+"].value="+(i+1));
		eval("document.forms[0]."+field_code+"_day.options["+i+"].text="+(i+1));
	}
}

function list_date(field_code,date_part,begin_year,end_year,relation_field){
	var day_value
	var now_time=new Date();
	var now_year=now_time.getYear();
	var now_month=now_time.getMonth()+1;
	var now_day=now_time.getDate();
	var now_hour=now_time.getHours();
	var now_minute=now_time.getMinutes();
	var now_second=now_time.getSeconds();
	if (list_date.arguments.length == 1) {
		var date_part='111000';
		var begin_year=3;
		var end_year=5;
	}
	if (list_date.arguments.length == 2) {
		var begin_year=3;
		var end_year=5;
	}
	if (list_date.arguments.length == 3) {
		var end_year=5;
	}
	if (date_part.charAt(0)=='1') {
	  if (date_part.charAt(2)=='1') {
		  document.write("<select name='"+field_code+"_year' onchange=\"javascript:cha_date('y',this.value,'"+field_code+"','"+relation_field+"');\">\n");
		}else{
		  document.write("<select name='"+field_code+"_year'>\n");
		}
		for(var i=now_year-begin_year;i<=now_year+end_year;i++) {
			if (now_year==i) {
				document.write("<option value='"+i+"' selected>"+i+"</option>\n");
			} else {
				document.write("<option value='"+i+"'>"+i+"</option>\n");
			}
		}
		document.write("</select>年");
	}
	if (date_part.charAt(1)=='1') {
	  if (date_part.charAt(2)=='1') {
		  document.write("<select name='"+field_code+"_month' onchange=\"javascript:cha_date('m',this.value,'"+field_code+"','"+relation_field+"');\">");
		}else{
        document.write("<select name='"+field_code+"_month'>" );
		}
		for(var i=1;i<=12;i++) {
			if (now_month==i) {
				document.write("<option value='"+i+"' selected>"+i+"</option>\n");
			} else {
				document.write("<option value='"+i+"'>"+i+"</option>\n");
			}
		}
		document.write("</select>月");
	}
	if (date_part.charAt(2)=='1') {
 		document.write("<select name='"+field_code+"_day'>");
		if (now_month==2)
			if ((now_year%4==0 && now_year%100!=0) || now_year%400==0) day_value=29; else day_value=28;
		if (now_month==4 || now_month==6 || now_month==9 || now_month==11) day_value=30;
		if (now_month==1 || now_month==3 || now_month==5 || now_month==7 || now_month==8 || now_month==10 || now_month==12) day_value=31;
		for (i=1;i<=day_value;i++) {
			if (now_day==i)	{
				document.write("<option value='"+i+"' selected>"+i+"</option>");
			} else {
				document.write("<option value='"+i+"'>"+i+"</option>");
			}
		}
		document.write("</select>日");
	}
	if (date_part.charAt(3)=='1') {
		document.write("<select name='"+field_code+"_hour'>");
		for (var i=0;i<=23;i++) {
			(now_hour==i)? document.write("<option value='"+i+"' selected>"+i+"</option>"):document.write("<option value='"+i+"'>"+i+"</option>")
		}
		document.write("</select>时")
	}
	if (date_part.charAt(4)=='1') {
		document.write("<select name='"+field_code+"_minute'>");
		for (var i=0;i<=59;i++) {
			(now_minute==i)? document.write("<option value='"+i+"' selected>"+i+"</option>"):document.write("<option value='"+i+"'>"+i+"</option>")
		}
		document.write("</select>分");
	}
	if (date_part.charAt(5)=='1') {
		document.write("<select name='"+field_code+"_second'>");
		for (var i=0;i<=59;i++) {
			(now_second==i)? document.write("<option value='"+i+"' selected>"+i+"</option>"):document.write("<option value='"+i+"'>"+i+"</option>")
		}
		document.write("</select>秒");
	}
}

function get_date(date_year,date_month,date_day,date_hour,date_minute,date_second){
	var str=new String();
	if (get_date.arguments.length == 2) {
		str=date_year
			+(date_month.toString().length==1?
				"0"+date_month:date_month)
		return str;
	}
	if (get_date.arguments.length == 3) {
		str=date_year
			+(date_month.toString().length==1?
				"0"+date_month:date_month)
			+(date_day.toString().length==1?
				"0"+date_day:date_day)
		return str;
	}
	if (get_date.arguments.length == 6) {
		str=date_year
/*
			+(date_month.toString().length==1?
				"0"+date_month:date_month)
			+(date_day.toString().length==1?
				"0"+date_day:date_day)
			+" "+(date_hour.toString().length==1?
				"0"+date_hour:date_hour)
			+":"+(date_minute.toString().length==1?
				"0"+date_minute:date_minute)
			+":"+(date_second.toString().length==1?
				"0"+date_second:date_second)
*/
			+(date_month.toString().length==1?
				"0"+date_month:date_month)
			+(date_day.toString().length==1?
				"0"+date_day:date_day)
			+(date_hour.toString().length==1?
				"0"+date_hour:date_hour)
			+(date_minute.toString().length==1?
				"0"+date_minute:date_minute)
			+(date_second.toString().length==1?
				"0"+date_second:date_second)
		return str;
	}
}
