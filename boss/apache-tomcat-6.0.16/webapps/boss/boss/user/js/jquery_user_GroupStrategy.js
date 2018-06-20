

//用户组优惠策略关联

function closeDia(){
	$('#proDiv').dialog('close');
}

//获得可以订购的产品
function getProLists(ajaxPath){
	//dialog----------start
	$('#proDiv').show();
	$('#proDiv').dialog({title:'请选择优惠策略',  
	buttons:[  //按钮----------start
	{text:'关闭', handler:closeDia  } 
	,{text:'确定', handler:packUserProduct }
	] 
	});//dialog----------end
	var groupOldId = $('#groupId').val();
	var groupoldProId = $('#oldProIds').val();
	var searchData = {
			groupoldProId:groupoldProId,
			groupOldId:groupOldId
			};
	ovtAjaxMethod(ajaxPath,searchData,function(data){
		if(data.code != "0"){
			var msg = data.value;
			if(data.value==null||data.value==undefined){
				msg = "连接超时，无法访问服务器！";
			}
			alert(msg);
			return;
		}
		var productsList = data.value;//产品列表
		var proContent = "";
		if($(data.value).length == 0){
			$('#proDiv_proList').empty().append("没有找到相应的产品");
		}
		var trs = "<tr><th>选择</th><th>产品简称</th><th>产品名称</th><th>类型</th><th>策略</th><th>优惠策略</th></tr>"
		$(data.value).each(function(n,value){
			var outerId = value.id;
			//开始
			trs = trs + "<tr>";
			//前五项
			trs = trs+"<td><input type='checkbox' value='"+value.id+"'/></td><td>"+value.servCode+"</td><td>"+value.name+"<input type='hidden' value='"+value.productId+"'/></td>" ;
			if (value.type==0) {
				trs = trs+"<td>套餐</td>";
			}else{
				trs = trs+"<td>服务</td>";
			}
			trs = trs+"<td>"+value.feeType+"<input type='hidden' value='"+value.feeTypeId+"'/></td><td>"+value.discount+"</td>";

			trs = trs + "</tr>";
		});
		
		proContent = "<table class='tableBorder'>" + trs + "</table>";
		$('#proDiv_proList').empty().append(proContent);
	});	
}

//预览用户选择策略信息
function packUserProduct(ajaxPath){
	var ajaxPath = '../../../jsp/boss/user/userGroup.do?methodToCall=ajaxPackUserProduct';
	var goodsIds = "";//当前订购的产品
	var oldProIds = $('#oldProIds').val();//已经订购的产品*,*,*
	
	$('#proDiv_proList').find("tr").each(function(){
		//查找选中的产品
		var selPro = $(this).find("td").eq(0).find("input");
		if(selPro.attr("checked")==true){//选中的产品
			goodsIds = goodsIds +　selPro.val()+";";
		}
	});
	if(null == goodsIds || "" == goodsIds){//未选择产品
		alert("没有选择产品");
		closeDia();//关闭
		return;
	}
	var searchData = {
			goodsIds:goodsIds,
			oldProIds:oldProIds==null?"":oldProIds
			};
	ovtAjaxMethod(ajaxPath,searchData,function(data){
		if(data.code != "0"){
			var msg = data.value;
			if(data.value==null||data.value==undefined){
				msg = "连接超时，无法访问服务器！";
			}
			alert(msg);
			return;
		}
		var proContent = "";
		var trs = "";
		
		var productList = '';//当前订购的产品
		if(null!=data.value){
			productList = data.value;
		}
		if(null==productList||productList.length==0){
			trs += "";
		}
		$(productList).each(function(n,value){
			var userPro = value;
			trs += "<tr id="+userPro.id+">";//订购编号，用于生成按钮 
			trs += "<td>"+userPro.servCode+"";
			trs += "<td>"+userPro.name+"</td>";
			trs += "<td><input type='hidden' value='"+userPro.id+"' />"+userPro.feeType+"</td>";//策略名称
			if (userPro.expiry_date!='' && userPro.expiry_date!=null) {
				trs += "<td>"+userPro.effective_date+" ~ "+userPro.expiry_date+"</td>";
			}
			else {
				trs += "<td>"+userPro.effective_date+" ~ 永久</td>";
			}
			
			//20120903 增加优惠时间类型选择
			trs += "<td><select name=''  id = '' onchange='changeDateType(this,\""+userPro.effective_date+"\",\""+userPro.expiry_date+"\")' >"+
				"<option  value='1'>按日期优惠</option>"+
				"<option  value='2'>按时段优惠</option>"+
				"</select></td>"; //优惠时间类型
			trs += "<td><input type='text' onclick=\"WdatePicker()\"  value='"+(userPro.effective_date==null?"":userPro.effective_date)+"' name='"+(userPro.effective_date==null?"":userPro.effective_date)+"' class='Wdate'></input></td>";
			trs += "<td><input type='text' onclick=\"WdatePicker()\"  value='"+(userPro.expiry_date==null?"":userPro.expiry_date)+"' name='"+(userPro.expiry_date==null?"":userPro.expiry_date)+"' class='Wdate'></input></td>";
			trs += "<td><input type='hidden' value='"+userPro.id+"' />"+userPro.discount+"</td>";
			trs += "<td style='width:60'><input type='button' value='删除' onclick='deleteItem(\""+userPro.id+"\")' /><input type='hidden' value='"+value.productId+"'/><input type='hidden' value='"+value.feeTypeId+"'/></td>";
			
			
			trs += "</tr>";
			oldProIds = oldProIds + userPro.id+",";
		});
		$('#oldProIds').val(oldProIds==null?"":oldProIds);
		proContent += trs;
		$('#batchSelected').append(proContent);
		$('#proDiv_batchSelected').show();//显示用户订购信息的层
		closeDia();//关闭
	});
}

/**添加用户选择的优惠策略**/
function selDiscountLists(path){
	$('#proDiv_waitNote').empty()//清空提示信息
	var selectPro = '';
	var selectUser = $('#batchUserIds').val();
	var condition = $('#conditionStr').val();
	var groupId = $('#groupId').val();
	//获得添加策略
	selectPro = checkOrderData();
	if(selectPro==''){//添加中止
		return;
	}
	if(null==condition||''==condition||undefined==condition||'null'==condition||'undefined'==condition){
		condition='';//如果添加条件为空始终用''表示
	}
	if(selectUser==''&&condition==''){
		alert("没有可提交的优惠策略！");
		return;
	}
	if(!confirm("添加优惠策略，组下所有用户应用此优惠策略，确定要提交吗？")){
		return;
	}
	
	//用户订购产品
	var userPro = {
		userIds : selectUser,
		proIds : selectPro,
		conditionStr : condition,
		groupId:groupId
	};
//	$('#proDiv_waitNote').empty().append("<br/><font color='red'>正在处理，请稍后...</font>");//append("<font color='red'>正在处理请稍后！</font>");
	//path:userGroupAction ajaxSelDiscount
	ovtAjaxMethod(path,userPro,function(data){
		
		alert("组优惠策略添加成功！");
		
		//20121006 ysm 修改组策略关联后跳转回用户组界面。
		window.location.href= "../../../jsp/boss/user/userGroup.do?methodToCall=openQuery";
		
//		var userInfoList = data.value;
//		var trs = "";
//		$('#proDiv_waitNote').empty().append("<br/><font color='red'>组优惠策略添加处理完成，您可以开始其他操作！</font>");
		
//		$('#buyProBut').attr('style','display:none');//隐藏提交按钮
//		$('#proBut').attr('style','display:none');//隐藏选择策略按钮
//		$('#proDiv_batchSelected').empty();//清空已提交策略
	});
}

//删除优惠策略关联
function DelDiscount(path,id){
	$('#proDiv_waitNote').empty()//清空提示信息
	
	var delid = $('#deldis'+id).attr('name');
	if(!confirm("删除优惠策略，组下所有用户将不再应用此策略，确定要删除吗？")){
		return;
	}
	//用户订购产品
	var userPro = {
		delId : delid
	};
	$('#proDiv_waitNote').empty().append("<br/><font color='red'>正在处理，请稍后...</font>");//正在处理请稍后！
	//path:userGroupAction ajaxDelDiscount
	ovtAjaxMethod(path,userPro,function(data){
		alert("组优惠策略删除成功！");
		$('#proDiv_waitNote').empty().append("<br/><font color='red'>组优惠策略删除处理完成，您可以开始其他操作！</font>");
		$('#buttonshow'+delid).empty().append("<font color='red'>已删除</font>");
	});
}

//修改优惠策略关联
function ModifyDiscount(path,id){
	$('#proDiv_waitNote').empty()//清空提示信息
	var selectPro = '';
	var modifyid = $('#modifyid'+id).attr('name');//用户组优惠策略关联ID
	var modifyno = $('#modifyid'+id).attr('title')//标识日期的编号
	var effectDate = $('#effectDate'+modifyno).val();//生效时间
	var expiryDate = $('#expiryDate'+modifyno).val();//失效时间
	var policyid = $('#policyid'+modifyno).val();//优惠策略ID
	//校验修改的优惠策略
	var userProCheck = {
			policyid : policyid,
			expiryDate:expiryDate,
			effectDate:effectDate
	};
	
	var pathcheck = '../../../jsp/boss/user/userGroup.do?methodToCall=ajaxMoidfyDiscountCheck';
	ovtAjaxMethod(pathcheck,userProCheck,function(data){
		selectPro = checkModifyData(id,data.value);
	
		if(selectPro==''){//添加中止
			return;
		}
		if(!confirm("修改优惠策略，组下所有用户都将应用新的优惠策略，确定要修改吗？")){
			return;
		}
		//要修改的优惠策略信息
		var userPro = {
			modifyid : modifyid,
			effectDate : effectDate,
			policyid : policyid,
			expiryDate : expiryDate
		};
		$('#proDiv_waitNote').empty().append("<br/><font color='red'>正在处理，请稍后...</font>");//append("<font color='red'>正在处理请稍后！</font>");
		//path:userGroupAction ajaxModifyDiscount
		ovtAjaxMethod(path,userPro,function(data){
			
			alert("组优惠策略修改成功！");
			var userInfoList = data.value;
			var trs = "";
			$('#proDiv_waitNote').empty().append("<br/><font color='red'>组优惠策略修改处理完成，您可以开始其他操作！</font>");
			$('#buttonshow'+modifyid).empty().append("<font color='red'>已修改</font>");
		});
	});
}

/**检查修改优惠策略数据是否合法*/
function checkModifyData(id,flagdate){
	var checkFlag = 0;
	var selectPro = '';
	
	var modifyid = $('#modifyid'+id).attr('name');//用户组优惠策略关联ID
	var modifyno = $('#modifyid'+id).attr('title')//标识日期的编号
	var effectDate = $('#effectDate'+modifyno).val();//生效时间
	var expiryDate = $('#expiryDate'+modifyno).val();//失效时间

		if(null==effectDate || ''==effectDate){
			alert(" 生效时间空！");
			checkFlag += 1;
			return false;
		}

		var start = effectDate.replace(/-/g,"");
		var end = expiryDate.replace(/-/g,"");
		var endType = effectDate.split(":");

		if( end=="" && endType.length>1){
			alert(" 优惠时间类型为按时段优惠时，结束时间不能为空！");
			checkFlag += 1;
			return false;
		}
		
		if(Number(end-start)<0 && end!=""){
			alert(" 生效时间"+effectDate+"大于失效时间"+expiryDate+"！");
			checkFlag += 1;
			return false;
		}
		
		var temp = flagdate.split(",");
		
		if (temp[0]!=0 && end!="") {
			alert(" 失效时间"+expiryDate+"大于优惠策略有效期"+temp[0]+"！");
			checkFlag += 1;
			return false;
		}
		
		if (temp[1]!=0 && end!="") {
			alert(" 生效时间"+effectDate+"小于优惠策略有效期"+temp[1]+"！");
			checkFlag += 1;
			return false;
		}
		
		
		
		selectPro += modifyid + ',' + modifyno + ',' + effectDate + ',' + expiryDate + ';' ; 
		
	if(checkFlag==0)//无非法数据
		return selectPro;
	else
		return '';
}

/**检查用户订购数据是否合法,返回合法的订购信息*/
function checkOrderData(){
	var checkFlag = 0;
	var selectPro = '';
	$('#batchSelected').find('tr:gt(0)').each(function(){//
		var proname = $(this).find('td:eq(1)').text();
		var policyId = $(this).find('td:eq(2) input').val();
		var dateType = $(this).find('td:eq(3) select').val();//20120903优惠策略时间类型
		var startT = $(this).find('td:eq(5) input').val();
		var startTStatic = $(this).find('td:eq(5) input').attr('name');
		var endT = $(this).find('td:eq(6) input').val();
		var endTStatic = $(this).find('td:eq(6) input').attr('name');
		var discount = $(this).find('td:eq(7) input').val();
		//20120927 ysm 增加产品ID和策略ID字段维护
		var productId = $(this).find('td:eq(8) input').next().val();
		var feeTypeId = $(this).find('td:eq(8) input').next().next().val();
		
		
		
		if(null==policyId||''==policyId){
			alert("订购的产品："+proname+" 异常！");
			checkFlag += 1;
			return false;
		}
		if(null==startT || ''==startT){
			alert(proname+" 开始时间空！");
			checkFlag += 1;
			return false;
		}

		var start = startT.replace(/-/g,"");
		var end = endT.replace(/-/g,"");
		var endType = startT.split(":");
		if(end==""&&endType.length>1){
			alert(proname+" 优惠时间类型为按时段优惠时，结束时间不能为空！");
			checkFlag += 1;
			return false;
		}
		
		
		
		if(Number(end-start)<0 && end!=""){
			alert(proname+" 开始时间"+startT+"大于结束时间"+endT+"！");
			checkFlag += 1;
			return false;
		}
		
		var startTS = startTStatic.replace(/-/g,"");
		if(startTS-start>0){
			alert(proname+" 开始时间"+start+"小于优惠策略有效期"+startTS+"！");
			checkFlag += 1;
			return false;
		}
		
		var endTS = endTStatic.replace(/-/g,"");
		if(endTS-end<0 && end!="" && endTS!=""){
			alert(proname+" 结束时间"+endT+"大于优惠策略有效期"+endTStatic+"！");
			checkFlag += 1;
			return false;
		}
		

		selectPro += policyId + ',' + startT + ',' + endT + ',' + discount  + ',' + dateType + ',' + productId + ',' + feeTypeId + ';' ; 
	});
	if(checkFlag==0)//无非法数据
		return selectPro;
	else
		return '';
}


//删除所选项
function deleteItem(ids){
	//alert('ids:'+ids);
	$('#'+ids).remove();
	//去除已选oldProIds记录
	var oldIds = $('#oldProIds').val();
	//alert('oldIdsVal'+oldIds);
	$('#oldProIds').val(oldIds.replace(ids+',',''));
	//重新计算卡订购费用
	sumMoney();
	//如没有订购产品隐藏
	if($('#batchSelected').find('tr:gt(0)').length==0)
		$('#proDiv_batchSelected').attr('style','display:none');
		
}

//更换优惠时间类型选择时间框
function changeDateType(ids,effect,expiry){

	var dateType = $(ids).find("option:selected").val();
	if (dateType==2) {
		$(ids).parent().next().html("<input type='text' onclick=\"WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})\"  value='' name='"+effect+"' class='Wdate'></input></td>");
		$(ids).parent().next().next().html("<input type='text' onclick=\"WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})\"  value='' name='"+expiry+"' class='Wdate'></input></td>");
	}
	else{
		$(ids).parent().next().html("<input type='text' onclick=\"WdatePicker()\"  value='' name='"+effect+"' class='Wdate'></input></td>");
		$(ids).parent().next().next().html("<input type='text' onclick=\"WdatePicker()\"  value='' name='"+expiry+"' class='Wdate'></input></td>");
	}	
}


//修改时更换优惠时间类型选择时间框
function changeDateType(ids,count){
	//alert(count);
	var dateType = $(ids).find("option:selected").val();
	if (dateType==2) {
		$(ids).parent().next().html("<input type='text' id=\"effectDate"+count+"\"  onclick=\"WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})\"  value='' name='' class='Wdate'></input></td>");
		$(ids).parent().next().next().html("<input type='text' id=\"expiryDate"+count+"\"  onclick=\"WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})\"  value='' name='' class='Wdate'></input></td>");
	}
	else{
		$(ids).parent().next().html("<input type='text' id=\"effectDate"+count+"\" onclick=\"WdatePicker()\"  value='' name='' class='Wdate'></input></td>");
		$(ids).parent().next().next().html("<input type='text'  id=\"expiryDate"+count+"\"  onclick=\"WdatePicker()\"  value='' name='' class='Wdate'></input></td>");
	}	
}

//判断已经选择的优惠策略的时间类型
function isTimeOrDate(date){
	var isTime = date.split(":");
	if (isTime.length==1) {
		WdatePicker();
	}
	else {
		WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'});
	}
}


