<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title></title>
    <script type="text/javascript">
    	//生成xmlObject
		function GetXmlHttpObject(){
			var xmlHttp=null;
			try{
			    // Firefox, Opera 8.0+, Safari
			    xmlHttp=new XMLHttpRequest();
			}
			catch (e){
			    // Internet Explorer
			    try
			      {
			      	xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
			      }
			    catch (e)
			      {
			      	xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			      }
			}
			return xmlHttp;
         }
    	
    	function checkStatus(){
    	 	
    	 	  xmlHttp=GetXmlHttpObject()
			
			  if (xmlHttp==null){
			    alert ("您的浏览器不支持AJAX！");
			    return;
			  }
			  
			  var url;
    	 	  url ="<%=request.getContextPath()%>/jsp/boss/dataSync/smsSyncBoss.do?methodToCall=ajaxMethod";
    	 	  
			  xmlHttp.onreadystatechange=stateChanged;
			  xmlHttp.open("GET",url,true);
			  //解决乱码问题
			  xmlHttp.setRequestHeader( "Content-Type", "text/html;charset=utf-8" );
			  xmlHttp.send(null);
		} 
    	
    	//相应返回值	
		function stateChanged(){ 
			if (xmlHttp.readyState==4){ 
				
					var str = xmlHttp.responseText;
					//alert(str);
					if(str == "true"){
						window.location = "<%=request.getContextPath()%>/jsp/boss/dataSync/smsSyncBoss.do?methodToCall=importSuccess"
					}else if ( str == "false" ) {
						setTimeout("checkStatus()",5000);
					}else {
						window.location = "<%=request.getContextPath()%>/jsp/boss/dataSync/smsSyncBoss.do?methodToCall=importSuccess"
					}
			//alert(xmlHttp.responseText);
			}
		}
    </script> 
	  

  </head>
  
  <body onload = "checkStatus()">
  	 <div style="color: #15428B">&nbsp;</div>
     <div id="throbber" style="position:absolute;display:block;"><img src="<%=request.getContextPath()%>/boss/dataSync/loading.gif" />正在导入数据，请稍等....</div>
  </body>
</html>
