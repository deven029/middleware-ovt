<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="/tags/app" prefix="app"%> 
<%@ page isELIgnored = "false" %>
<%@ taglib uri="../../taglib/c.tld" prefix="c"%>
<%@ page import="com.ovt.idtv.common.web.datatransfer.model.WebTransferStepModel" %>
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
	
	    <jsp:include page="transfer_include.jsp" />
	
	<script language="JavaScript">
		function openme(object){
				object.style.background="#FFFFCC";
			}
		function closeme(object){
				object.style.background="#ffffff";
				}

		jQuery(function(){
			jQuery('#tabs').tabs();
		});

	  function preStep ( )
	  {
		  document.nextForm.action = '<%=request.getContextPath()%>/common/jsp/rights/transfer/choiceImport.do?methodToCall=prevStep';
		  document.nextForm.submit();
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
					<span class='DD'>系统管理-->数据迁移</span>
				</td>
			</tr>
		</table>
		<div>
			<br/>
			<form name="nextForm" method = "post" id = "nextForm" action="<%=request.getContextPath()%>/common/jsp/rights/transfer/choiceImport.do?methodToCall=nextStep">
			<h2 class="demoHeaders">数据迁移</h2>
				
					<div id="tabs">
						
						<ul>
							<c:forEach items="${webStepList}" var="step" varStatus="state">
							<li><a href='#tabs-<c:out value="${state.count}"/>'><c:out value="${step.pluginName }"/></a></li>
							</c:forEach>
						</ul>
						<c:forEach items="${webStepList}" var = "step" varStatus="state">
							<div id='tabs-<c:out value="${state.count}"/>'>
								<span><c:out value ="${step.titleName}"/></span>
								<hr>
								<%
								WebTransferStepModel step =(WebTransferStepModel) pageContext.getAttribute("step"); 
								String filePath = step.getUrlPath();
								%>
								
								<jsp:include page="<%=filePath %>" />
							</div>
						</c:forEach>
					</div>
			</form>	
			<hr>
						
		</div>
     <div>
     	<table>
     		<tr>
     			 <app:button title="上一步" image="" function="preStep()"/>  <app:button title="下一步" image="" function="nextForm.submit()"/>
     		</tr>
     	</table>
     	 
      </div>
     
  </body>
</html>
