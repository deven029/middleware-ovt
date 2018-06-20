<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="/tags/app" prefix="app"%> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title></title>
        <link href="<%=request.getContextPath()%>/common/css/zi.css" rel="stylesheet" type="text/css" />
	<script language="JavaScript">
		function openme(object){
				object.style.background="#FFFFCC";
			}
		function closeme(object){
				object.style.background="#ffffff";
				}

		
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
    	
    	function clearFlag(){

    		 if(!confirm("您的这个操作可能导致其他正在进行的数据迁移操作出现异常。\n您确信目前要进行当前操作么？"))
    		    {//如果是false,返回
    		       return;
    		    }
 		    
    	 	  xmlHttp=GetXmlHttpObject()
			
			  if (xmlHttp==null){
			    alert ("您的浏览器不支持AJAX！");
			    return;
			  }
			  
			  var url;
    	 	  url = "<%=request.getContextPath()%>/common/jsp/rights/transfer/choiceImport.do?methodToCall=clearFlag";
    	 	  
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
						document.getElementById("success").style.display="block";
					}
			//alert(xmlHttp.responseText);
			}
		}
	</script>
		<style type="text/css">
		<!--
			.style1 {
				color: #0c5bc4
			}

			.style2 {
				font-size: 14px;
				color: #003665;
			}

			body {
				margin-top: 0px;
			}
		-->
     </style>
	 
  </head>
  
  <body>
       	<table width='100%' cellspacing='0' cellpadding='0' border='0'>
			<tr>
				<td nowrap height="30">
					当前位置:
					<span class='DD'>系统管理-->数据迁移-->下载已有导出数据</span>
				</td>
			</tr>
		</table>
		<div style="color:red;font-size:14">
			发现当前有其他人进行导出操作!<br/>
			系统规定同一时间，只能有一人进行此操作！<br/>
			如果是由于非正常退出导致无法进行操作，并且确认当前没有其他人进行数据迁移操作，请点击<app:button title="清除标记" image="" function="clearFlag()"/>
			<br/>
			<div id="success" style="display:none">清除成功，可以重新开始迁移操作</div>
		</div>
     
  </body>
</html>
