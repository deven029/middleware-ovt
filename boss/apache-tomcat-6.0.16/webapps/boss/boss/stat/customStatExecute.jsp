<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.ovt.idtv.boss.web.db.BossCustomStat"  %>
<%@ page import="com.ovt.idtv.boss.web.stat.util.AnalysisCustomStatSqlUtil" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>

<html>
  <head>
    
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

	<link type="text/css" href="<%=request.getContextPath()%>/boss/customer/css/customer/style.css" rel="stylesheet" />		
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/stat/js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/stat/js/jquery-ui-1.8.6.custom.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/stat/js/jquery_stat_customStat.js"></script>
	<script language="javascript">
		
	</script>
  </head>
  <body>
    <div id="customStatMain">
    	<div id="tab_title">
    		<span  class="tab_title_head tab_title_head_click" id="search_title">自定义统计执行页面<span class="ui_icon dialog_no_close_icon"></span></span>
    	</div>
    	
    	<div id="tab_main" class="width_height">
    		<div id="search_info_title" class="info_title">请输入统计条件</div>
    		<div id="tab_content">
    			<table >
    			<%
	    			String sqlStr = "select " + (String) request.getAttribute("statSql");
	    		  	AnalysisCustomStatSqlUtil analysisUtil = new AnalysisCustomStatSqlUtil(sqlStr);
	    		  	List<String> list = analysisUtil.getCondFields();
	    		  	String indexStr = analysisUtil.getIndexString();
	    		  	String tableHeadersStr = analysisUtil.getTableHeadersStr();
	    		  	String condition = "";
    				String type = "";
    				for (int i = 0; i < list.size(); i++) {
    					String temp = list.get(i);
    					String[] tempArr = StringUtils.split(temp, "|");    					
    					if (i == list.size() - 1) {
    						condition += tempArr[1];
    						type += tempArr[0];
    					} else {
    						condition += tempArr[1] + "|";
    						type += tempArr[0] + "|";
    					}
    			%>
    			<tr>
    				<td><%=tempArr[2] %></td>
    				<td>
		    			<select id="operator<%=i %>">
		    				<option value="0">=</option>
		    				<option value="1"><</option>
		    				<option value="2">></option>
		    				<option value="3"><=</option>
		    				<option value="4">>=</option>
		    				<option value="5">in</option>
		    				<option value="6">like</option>
		    				<option value="7">between</option>
		    			</select>
		    			<input type="text" id="inputValue<%=i %>"/>
	    			</td>
    			</tr>
    			<%
	    		  	}
    			%>
    			</table>
	    	</div>
    		<div id="preview_custom_stat" class="hide">
    			<div>您输入的执行SQL语句为:</div>
    			<div id="sql_to_execute"></div>
    		</div>
    		<div>
    		查询控制:
    		<select id="custom_stat_condition_select" name="custom_stat_condition_select" size="1">
    			<option value="1">不允许空条件查询</option>
    			<option value="2">允许部分条件为空</option>
    			<option value="3">允许空条件查询</option>
    		</select>
    		<input type="button" value="预览" id="custom_stat_preview_button" onclick="customStatPreView()"/>
    		<input type="button" value="执行自定义统计" id="custom_stat_execute_button" onclick="customStatExecute()"/>
    		<input type="button" value="返回" id="custom_stat_back_button"/>
    		<input type=text" id="customStat_sqlStr" value="<%=sqlStr %>" class="hide"/>
    		<input type=text" id="customStat_tableHeader" value="<%=tableHeadersStr %>" class="hide"/>
    		<input type=text" id="customStat_indexStr" value="<%=indexStr %>" class="hide"/>
    		<input type=text" id="customStat_listSize" value="<%=list.size() %>" class="hide"/>
    		<input type=text" id="customStat_condition" value="<%=condition %>" class="hide"/>
    		<input type=text" id="customStat_type" value="<%=type %>" class="hide"/>
    		</div>
    	</div>
    </div>
  </body>
</html>
