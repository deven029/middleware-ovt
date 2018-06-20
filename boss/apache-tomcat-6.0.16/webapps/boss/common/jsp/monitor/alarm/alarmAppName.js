
var xmlHttp;


//创建XMLHttpRequest对象
function createXMLHttpRequest() {
	if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		if (window.XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();
		}
	}
}
//增加应用名称
function addAppName() {
	appName = document.getElementById("appName");	
	var url = "GetAppNameAction.do";
	createXMLHttpRequest();
	xmlHttp.onreadystatechange = handleAddStateChange;
	xmlHttp.open("GET", url, true);
	xmlHttp.send(null);
}

//回调方法    
function handleAddStateChange() {
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			updateSelectList();			
		} else {
			alert("Error while adding employee.");
		}
	}
}

//更新下拉列表
function updateSelectList() {
	var responseXML = xmlHttp.responseXML;
	var status = responseXML.getElementsByTagName("status")[0].firstChild.nodeValue;
	alert(status);
	status = parseInt(status);
	if (status != 1) {
		return;
	}

//创建选项
	var name = responseXML.getElementsByTagName("name");
	for (var i = 0; i < name.length; i += 1) {
		document.getElementById("appName").options.add(new option("" + name[i].firstChild.nodeValue, name[i].firstChild.nodeValue));
	}
	updateSelectVisibility();
}

//更新列表可视效果
function updateSelectVisibility() {
	var select = document.getElementById("appName");
	if (select.childNodes.length > 0) {
		select.style.display = "";
	} else {
		select.style.display = "none";
	}
}

