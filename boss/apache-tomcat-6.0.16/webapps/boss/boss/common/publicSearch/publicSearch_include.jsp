<%@ page contentType="text/html; charset=utf-8"%>

	<style type="text/css">
  <!--
    .searchdiv {
    font-size: 12px;
    color: red;
    background-color: #D4E7F5 ;
    border: 0px solid #000000;
    filter:alpha(opacity=50);
    width:100;
    FILTER: progid:DXImageTransform.Microsoft.Gradient(startColorStr='lightblue', endColorStr='#FFFFF0', gradientType='0');
    }
    
    .div_tr {
    font-size: 13px;
    line-height: 19px;
    height: 19px;
    width: 142px;
    }
    
	.usernamediv{
	font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
	font-size: 11px;
	/*color: yello;
	background-color: #D4E7F5 ;*/
	white-space: nowrap;
	padding: 0px 0px 0px 0px;
	width:150;
	cursor:hand;
	/*FILTER: progid:DXImageTransform.Microsoft.Gradient(startColorStr='blue', endColorStr='#FFFFFF', gradientType='0'); */
	}
  -->
</style>


  
  <div  id="theUserNameClewMsgDiv" style="display:none;position:absolute;z-index:1;" class="searchdiv">
    <table width="100%" border="0" cellpadding="0" cellspacing="0" id="autoSearchTable">
    </table>
    <div align="center" onclick="hiddenUserNameClewDiv();" class="usernamediv">关闭</div>
	<iframe id="thisiframe" name="thisiframe" frameborder="0" style="position:absolute;top:0px;left:0px;z-index:-1;filter: Chroma(Color=white);"></iframe> 
  </div>
  	
  
   <script>
   
var autoSearchTable = document.getElementById("autoSearchTable");
var clewUserNameLineCount = 20; 
var nowelm;
var nowUseridInputId="";
var nowUserKeyIn="";
var nowLine=-1;
var rowCount=0;
var httpRequest4ClewUserName = false;

var splitor ="----"; //主分割符号
var splitor_ad ="***"; //附分割符号
var parameterNo = 0; //存放有几个需要显示出来的参数
var pstmtNo = 0 ; //语句中有几个问号?

var isql = ""; //用来存储sql语句

//设置主分隔符
function setSplitor(str){
	splitor = str;
}
//设置附分隔符
function setSplitor_ad(str){
	splitor_ad = str;
}

 function createXMLHttpRequest()
 {

 	if(window.XMLHttpRequest)
 	{
 		httpRequest4ClewUserName = new XMLHttpRequest();
 	}else if(window.ActiveXObject)
 	{
 		try{
 		httpRequest4ClewUserName = new ActiveXObject("Msxml2.XMLHTTP");
 		}catch(e)
 		{
 			try{
 			httpRequest4ClewUserName = new ActiveXObject("Microsoft.XMLHTTP");

 			}catch(e)
 			{}
 		}

 	}
 }
 function send(url)
 {
 	createXMLHttpRequest();
 	httpRequest4ClewUserName.open("GET",url,true);
 	httpRequest4ClewUserName.onreadystatechange=myAlert;
 	httpRequest4ClewUserName.send(null);
 }
function sendPost(url,strData)
 {
 	createXMLHttpRequest();
 	httpRequest4ClewUserName.open("POST",url,true);
 	httpRequest4ClewUserName.onreadystatechange=myAlert;
	httpRequest4ClewUserName.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 	httpRequest4ClewUserName.send(strData);
 }



function sendAutoSearch(url)
    {
    	createXMLHttpRequest();
    	httpRequest4ClewUserName.open("GET",url,true);
    	httpRequest4ClewUserName.onreadystatechange=autoSearchReturn;
    	httpRequest4ClewUserName.send(null);
    }

function autoSearchReturn()
{
	if(httpRequest4ClewUserName.readyState==4)
	{
		if(httpRequest4ClewUserName.status==200)
		{
			hiddendiv4clew();
			autoSearchDelTableAll();
			var docEle = httpRequest4ClewUserName.responseXML.documentElement;
			var result = docEle.getElementsByTagName("result")[0].nodeTypedValue;
			if(result== "fail")
            {
            	alert("ajax查询出错");
            }
			var autoSearchLen = docEle.getElementsByTagName("parameter1").length;
            if(autoSearchLen>0)
            {
            	//如果返回一个查询结果，判断该用户和当前选定的用户是否是同一个人
            	if(autoSearchLen == 1)
            	{	
            		var olduserid = "";
            		if(nowUseridInputId != "")
					{
						olduserid = document.getElementById(nowUseridInputId).value;
					}
					else
					{
						olduserid = document.getElementById(nowelm.id + "id").value;
					}
					
	                
					var newuserid = docEle.getElementsByTagName("parameter1")[0].nodeTypedValue;
					var newusername = docEle.getElementsByTagName("parameter2")[0].nodeTypedValue;
					
					if((olduserid == newuserid) && (nowUserKeyIn == newusername))
					{
						return;
					}
            	}
	            
	            //document.all.div_content.style.display="";
	            for(var i=0;i<autoSearchLen;i++)
	            {
	              	var usernamecode = "";
	              	var temp = "";
	              	for(var j=0;j<parameterNo;j++){
	              		var name= "parameter"+j;
	              		temp = docEle.getElementsByTagName("obj")[i].childNodes[j].nodeTypedValue;
	                	//temp= docEle.getElementsByTagName(name)[i].nodeTypedValue;
	                	usernamecode = usernamecode + temp +"@";
	                }
	                autoSearchTableAdd(usernamecode);
	             }
	             autoSearchTableAdd_noClick("按↑↓ 选择,回车确认");
				 rowCount=autoSearchLen;
				 showClewUserNameDiv();
				 nowLine = 0;
				 showTheLineClewArrow(0);
              }
              /*
              else
              {
              	//alert("该用户不存在！")
              	autoSearchDelTableAll();
              	autoSearchTableAdd_noClick("该项不存在！");
              	rowCount=autoSearchLen;
				showClewUserNameDiv();
              }
              */
			

		}else
		{
			window.alert("所请求的页有错误");
		}
	}
}

//textValue是文本框的值,parameters是sql语句
function ajaxSearch(textValue,parameters)
{
	textValue = textValue.replace (/\s/ig,'');
	if(textValue=="")
	{
		hiddendiv4clew();
		return false;
	}
	
	//alert(textValue);
	sendAutoSearch("<%= request.getContextPath() %>/boss/common/publicSearch/publicSearch.jsp?textvalue=" + encodeURI(textValue) + "&count=" + clewUserNameLineCount + "&parameters=" + parameters + "&parameterNo=" + parameterNo +"&pstmtNo="+pstmtNo);
}


var auto_ii=0;
function autoSearchTableAdd(usernamecode) { 
	var newRow;
	var rownum = autoSearchTable.rows.length;
	newRow=autoSearchTable.insertRow(rownum);
	newRow.id="r"+rownum;
	newRow.align = "left";
	var values ;
	if(usernamecode == "" || usernamecode == null){
		return false;
	}else{
		values = usernamecode.split("@");
		//alert(values.length);
		
		if(values.length >1){
			usernamecode = "";
			for(var i=1;i<values.length;i++){
				usernamecode = usernamecode + values[i]+"@";
			}
			usernamecode = usernamecode.substr(0,usernamecode.length-2);
			var myinteger = 0;
			while(usernamecode.indexOf('@')>0){
				myinteger++;
				if(myinteger == 1)
					usernamecode = usernamecode.replace('@',splitor);
				else
					usernamecode = usernamecode.replace('@',splitor_ad);
			}
		}		
	}
	newRow.insertCell(0).innerHTML="<div  onClick=\"setvalue(this,'" + values[0] + "');\" class='usernamediv'><img id='clewimg" + rownum + "' name='clewimg' height='10' width='10' sta='hidden' src='<%=request.getContextPath()%>/images/empty.gif' border=0>" + usernamecode + "</div>";
}

function autoSearchTableAdd_noClick(usernamecode) { 
	var newRow;
	var rownum = autoSearchTable.rows.length;
	
	//alert("rownum ")
	
	newRow=autoSearchTable.insertRow(rownum);
	newRow.id="r"+rownum;
	newRow.align = "left";
	var values ;
	if(usernamecode == "" || usernamecode == null){
		return false;
	}else{
		values = usernamecode.split("@");
		//alert(values.length);
		
		if(values.length >1){
			usernamecode = "";
			for(var i=1;i<values.length;i++){
				usernamecode = usernamecode + values[i]+"@";
			}
			usernamecode = usernamecode.substr(0,usernamecode.length-2);
			var myinteger = 0;
			while(usernamecode.indexOf('@')>0){
				myinteger++;
				if(myinteger == 1)
					usernamecode = usernamecode.replace('@',splitor);
				else
					usernamecode = usernamecode.replace('@',splitor_ad);
			}
		}		
	}
	newRow.insertCell(0).innerHTML="<div class='usernamediv'><img id='clewimg" + rownum + "' name='clewimg' height='10' width='10' sta='hidden' src='<%=request.getContextPath()%>/images/empty.gif' border=0>" + usernamecode + "</div>";
}

function autoSearchDelTableAll()
{
	rowCount = autoSearchTable.rows.length;
	for (var j=rowCount-1;j>=0;j--) 
	{
		autoSearchTable.deleteRow(j);
	}
	rowCount = 0;
}

//obj是调用对象this,useridInputId是存放查询结果的对象ID
//iparameterNo是sql语句中有几个需要显示出的参数,需传递数字
//pstmtNo 是 语句中有几个?.
 function clewUserName(obj, useridInputId, iparameterNo, ipstmtNo)
 {
 	var nowUserKeyIntemp = obj.value.replace (/\s/ig,''); 
 	nowLine=-1;
	nowelm = obj;
	parameterNo = iparameterNo;
	pstmtNo = ipstmtNo;
	//判断是否改变了输入框的内容
	if(nowUserKeyIn == nowUserKeyIntemp || nowUserKeyIntemp == ""){
		nowUserKeyIn = "";
		return false;
	}else{
		nowUserKeyIn = obj.value;
	}
	
	if(useridInputId != undefined)
	{
		nowUseridInputId = useridInputId;
	}
	ajaxSearch(obj.value,obj.parameters);
	var theUserNameClewMsgDiv=document.getElementById("theUserNameClewMsgDiv");
	var xy=getoffset(obj);
	theUserNameClewMsgDiv.style.top=parseInt(xy[0]) + 20;
	theUserNameClewMsgDiv.style.left=parseInt(xy[1]);
	//theUserNameClewMsgDiv.style.display="";
 }
 
 function showClewUserNameDiv()
 {
 	var theUserNameClewMsgDiv=document.getElementById("theUserNameClewMsgDiv");
 	var thisiframe = document.getElementById('thisiframe');
 	thisiframe.height = document.body.scrollHeight;
 	
 	theUserNameClewMsgDiv.style.display="block";
 	
 }
 

function hiddenUserNameClewDiv()
{
	setTimeout("hiddendiv4clew()",300);
}
function hiddendiv4clew()
 {
 	
	var theUserNameClewMsgDiv=document.getElementById("theUserNameClewMsgDiv");
	theUserNameClewMsgDiv.style.display = "none";
 }

//鼠标事件
 function setvalue(obj, value)
 {
 	if(value != "")
 	{
	 	var namecode = obj.innerHTML
	 	if(namecode.indexOf(splitor) != -1 )
	 	{
	 		namecode = namecode.substr(0,namecode.indexOf(splitor));
	 	}
	 	namecode = namecode.substr(namecode.indexOf(">")+1);
		nowelm.value=namecode;
		if(nowUseridInputId != "")
		{
			document.getElementById(nowUseridInputId).value = value;
			//nowUseridInputId = "";
		}
		else
		{
			document.getElementById(nowelm.id + "id").value = value;
		}
		
		hiddendiv4clew();
	}
 }


function getoffset(e)
{  
var t=e.offsetTop;  
var l=e.offsetLeft;  
while(e=e.offsetParent)
{  
   t+=e.offsetTop;  
   l+=e.offsetLeft;  
}  
var rec = new Array(1);
rec[0]   = t;
rec[1] = l;
return rec
} 

function setClewUserNameLineCount(count)
{
	clewUserNameLineCount = count;
}

//Keydown,Keypress 判断键盘事件
function CheckSend4UserNameClew()
{
  if(event.keyCode==13) //判断是否点击的是Enter键
  {
    if(httpRequest4ClewUserName)
    {
    	var theindex;
    	if(nowLine == -1)
    	{
		   theindex = 0;
		}else
		{
			theindex = nowLine;
		}
		var autoSearchLen = httpRequest4ClewUserName.responseXML.getElementsByTagName("parameter1").length;
		if(autoSearchLen>0)
		{
		    var newvalueid = httpRequest4ClewUserName.responseXML.getElementsByTagName("parameter1")[theindex].nodeTypedValue;;
		    var newvaluename = httpRequest4ClewUserName.responseXML.getElementsByTagName("parameter2")[theindex].nodeTypedValue;;
		    
			newvaluename = newvaluename.substr(newvaluename.indexOf(">"));
		    if(nowUseridInputId != "")
			{
				document.getElementById(nowUseridInputId).value = newvalueid;
			}
			else
			{
				document.getElementById(nowelm.id + "id").value = newvalueid;
			}
			nowelm.value = newvaluename;
			hiddendiv4clew();
		}
	}
  }
  
  if(event.keyCode == 40 || event.keyCode == 37)
  {
  	if(httpRequest4ClewUserName.responseXML != undefined && httpRequest4ClewUserName.responseXML != null){
	  	var clewCount = httpRequest4ClewUserName.responseXML.getElementsByTagName("parameter1").length;
	  	nowLine += 1;
	  	if(nowLine == clewCount)
	  	{
	  		nowLine = 0;
	  	}
	  	showTheLineClewArrow(nowLine);
	}
  }
  
  if(event.keyCode == 38 || event.keyCode == 39)
  {
  	if(httpRequest4ClewUserName.responseXML !=undefined && httpRequest4ClewUserName.responseXML != null){
	  	var clewCount = httpRequest4ClewUserName.responseXML.getElementsByTagName("parameter1").length;
	  	nowLine += -1;
	  	if(nowLine == -1)
	  	{
	  		nowLine = clewCount-1;
	  	}
  		showTheLineClewArrow(nowLine);
  	}
  }
}

function showTheLineClewArrow(imgid)
{
	//alert("imgid="+imgid);
	imgid = "clewimg" + imgid;
	
	var clewimgArray = document.getElementsByName("clewimg");
	if(clewimgArray.length!=0){
	for(var i=0; i<clewimgArray.length; i++)
	{
		clewimgArray[i].src="<%=request.getContextPath()%>/images/empty.gif"
	}
	
	var theimg=document.getElementById(imgid);
	if(theimg != undefined && theimg != null)
		theimg.src="<%=request.getContextPath()%>/images/green_arrow.gif";
}
	
}


</script>
