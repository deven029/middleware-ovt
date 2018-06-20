$(function(){	
	$("#custom_stat_back_button").click( function() {
		// 修改自定义统计的访问路径 add by jhg 20121220
		window.location.href="../../../jsp/boss/stat/customStat.do?methodToCall=openQuery";
		return;
	});
});

// 解析sql语句方法
function getSql() {
	var num = $("#customStat_listSize").val();
	var sql = $("#customStat_sqlStr").val();
	var indexStr = $("#customStat_indexStr").val();
	var condition = $("#customStat_condition").val();
	var type = $("#customStat_type").val();
	// 获得需要输入查询条件字段的索引位置数组
	var indexArr = indexStr.split("|");
	var i = 0;
	var operators = "";
	var values = "";
	for (i; i < num; i++) {
		if (i == num - 1) {
    		operators += $("#operator" + i).find("option:selected").text();
    		values +=  $("#inputValue" + i).val();
    	} else {
    		operators += $("#operator" + i).find("option:selected").text() + "|";
    		values += $("#inputValue" + i).val() + "|";
    	}
	}
	var cond = condition.split("|");
	var types = type.split("|");
	var oper = operators.split("|");
	var val = values.split("|");
	var totalSql = sql.substring(0, parseInt(indexArr[0]));
	var i = 0;
	for (i = 0; i < num; i++) {
		if (val[i] == "") {
			if (i == 0) {
				
			} else {
				var tempString = sql.substring(parseInt(indexArr[i * 2 - 1]) + 1 , parseInt(indexArr[i * 2]));
				if (tempString.replace(" ","").replace(" ","") == "and") {
					continue;
				}
				if (val[i-1]=="") {
					totalSql += tempString.substring(0, tempString.lastIndexOf(" and")).replace("and","");
				} else {
					totalSql += tempString.substring(0, tempString.lastIndexOf(" and"));
				}
			}
			continue;
		}
		/* 根据运算符修饰值格式 */
		if (oper[i] == "like") {
			val[i] = " '%" + val[i] + "%' ";
		} else if (oper[i] == "in") {
			val[i] = " (" + val[i] + ") ";
		} else if (oper[i] == "between") {
			var ba = val[i].split(",");
			if (types[i] == "str")
				val[i] = ba[0] + "' and '" + ba[1];
			else
				val[i] = ba[0] + " and " + ba[1];
		}
		/* 根据字段类型修饰字段格式 */
		if (types[i] =="date") {
			cond[i] = " to_char(" + cond[i] + ", 'yyyyMMdd')";
			val[i] = " '" + val[i] + "' ";
		} else if (types[i] == "str" && oper[i] != "like") {
			val[i] = " '" + val[i] + "' ";
		} else if (types[i] == "date1") {
			cond[i] = " to_char(" + cond[i] + ", 'yyyyMMdd HH:mm:ss')";
		}	
		/* 将sql字符串中类似"$str|equ_no|设备编号#"这种字段替换为类似于 "equ_no = '1234567890123'"这种表达式 */
		if (i == 0) {
			totalSql += " " + cond[i] + " " + oper[i] + " " + val[i] ;
		} else {
			if (val[i - 1] == "") {
				totalSql += sql.substring(parseInt(indexArr[i * 2 - 1]) + 1 , parseInt(indexArr[i * 2])).replace("and","") + " " + cond[i] + " " + oper[i] + " " + val[i];
			} else {
				totalSql += sql.substring(parseInt(indexArr[i * 2 - 1]) + 1 , parseInt(indexArr[i * 2])) + " " + cond[i] + " " + oper[i] + " " + val[i];
			}
		}
	}
	totalSql += sql.substring(parseInt(indexArr[indexArr.length - 1]) + 1);
	/* 如果所有查询字段都为空，则直接截取where关键字之前的sql语句 */
	// If after 'where' token exist' strings , then can't replace 'where' to ''. 2012-10-31
	var lenAfterWhere = totalSql.substring(totalSql.indexOf("where")+5).replace(" ","").length;
	var lastAndIndex = totalSql.lastIndexOf("and");
	var afterLastAndStr = totalSql.substring(lastAndIndex+3);
	var afterLastAndLen = afterLastAndStr.length;
	while(afterLastAndLen-- > 0) {
		afterLastAndStr = afterLastAndStr.replace(" ","");
	}
	if (afterLastAndStr == ""){
		totalSql = totalSql.substring(0,lastAndIndex);
	}
	var j;
	var flag = new Boolean(1);
	for (j = 0; j < num; j++) {
		flag = flag && val[j] == "";
	}
	if (flag && indexArr.length > 1 && lenAfterWhere < 1) {
		totalSql = totalSql.replace("where","");
	}
	return totalSql;
}

// 预览按钮响应方法
function customStatPreView() {
	var num = $("#customStat_listSize").val();
	if (isHavingQueryFields()) {
		var flag = exeConditionAnalysis(num);
		if (!flag) {
			return;
		}
	}
	var preSql = getSql();	
	var finalSql = analysisPreSql(preSql);
	$("#sql_to_execute").text(finalSql);
	$("#preview_custom_stat").removeClass("hide");
}

// 执行自定义查询按钮响应方法
function customStatExecute() {
	var tableHeadersStr = $("#customStat_tableHeader").val();
	var num = $("#customStat_listSize").val();
	if (isHavingQueryFields()) {
		var flag = exeConditionAnalysis(num);
		if (!flag) {
			return;
		}
	}
	var totalSql = getSql();	
	// 修改自定义统计的访问路径 add by jhg 20121220
	var path = "../../../jsp/boss/stat/customStatService/ajaxCustomStatCheck.do";		
	var ajaxRes = {
		sql : totalSql,
		tableHeadersStr : tableHeadersStr
	};
	ovtAjaxMethod(path, ajaxRes, function(data){
		if(data.code != "0") {
			alert(data.value);
			return;
		} else {
			// 修改自定义统计的访问路径 add by jhg 20121220
			window.location.href="../../../jsp/boss/stat/customStatService/ajaxCustomStatExecute.do";
		}
	});
}

// 判断执行条件方法
function exeConditionAnalysis(num) {
	var exeCondition = $("#custom_stat_condition_select").find("option:selected").val();
	if (exeCondition == 1) {
		var i = 0;
		var flag = new Boolean(1);
		for (i = 0; i < num; i++) {
			flag = flag && $("#inputValue" + i).val() != "";
			if (!flag) {
				alert("所有的值都不能为空!");
				$("#preview_custom_stat").addClass("hide");
				return false;
			}
		}
	} else if (exeCondition == 2) {
		var i = 0;
		var flag = new Boolean(1);
		for (i = 0; i < num; i++) {
			flag = flag && $("#inputValue" + i).val() == "";
		}
		if (flag) {
			alert("不能所有的值都为空!");
			$("#preview_custom_stat").addClass("hide");
			return false;
		}
	}
	return true;
}

// 修正用于预览的最终sql语句
function analysisPreSql(sql) {
	// 截取掉where关键字之前的sql语句中的字符
	var temp = sql + "";
	if (temp.indexOf("where") == -1) 
		return "";
	else
		return temp.substring(temp.indexOf("where"));
}

// 判断查询sql语句是否带有查询字段信息
function isHavingQueryFields() {
	if ($("#tab_content").find("input") != null) {
		return true;
	} else {
		return false;
	}
}

//封装ajax方法
function ovtAjaxMethod(ajaxPath,ajaxResponse,ajaxCallback){
	if(typeof ajaxResponse=='function'){
		ajaxCallback = ajaxResponse;
		ajaxResponse = undefined;
	}
	$.ajax({url:ajaxPath,type:"POST",cache:false,data:ajaxResponse,error:function(){
		//失败
		alert("连接服务器出现异常，请检查网络连接状况"+ajaxPath+"[操作类型："+ajaxResponse.businessType+"]");
	},success:function(data){
		//成功
		if(data.code == "4"){
			alert("超时，请重新登录！");
			window.location.href="../../../../common/jsp/frame/login.jsp";
			return;
		}
		if(data.code == "5"){
			alert("您没有权限进行此操作！");
			return;
		}
		ajaxCallback(data);
	}});
}