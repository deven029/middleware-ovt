//----------------------------------------------批量订购产品----------------------------------------------------

function closeDia(){
	$('#proDiv').dialog('close');
}


//获得可以订购的产品
function getProLists(ajaxPath){
	//dialog----------start
	$('#proDiv').show();
	$('#proDiv').dialog({title:'请选择产品',  
	buttons:[  //按钮----------start
	{text:'关闭', handler:closeDia  } 
	,{text:'确定', handler:packUserProduct }
	] 
	});//dialog----------end
	
	ovtAjaxMethod(ajaxPath,null,function(data){
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
		var trs = "<tr><th>选择</th><th>产品简称</th><th>产品名称</th><th>类型</th><th>内容</th><th>策略</th></tr>"
		$(data.value).each(function(n,value){
			var outerId = value.id;
			//开始
			trs = trs + "<tr>";
			//前五项
			trs = trs+"<td><input type='checkbox' value='"+value.id+"'/></td><td>"+value.productCode+"</td><td>"+value.productName+"</td><td>"+getProductTypeName(value.productType)+"</td><td>"+getProductScopeName(value.productType,value.productScope)+"</td>";
			//策略
			var policyObj = new Object();
			trs = trs + "<td><select >";
			$(value.withPolicyList).each(function(n2,value){
				if(n2 == 0){
					policyObj = value;
				}
				trs = trs+"<option value='"+value.id+"'>"+value.policyName+"-"+value.productName+"</option>";
			});
			trs = trs + "</select></td>";
			//结束
			trs = trs + "</tr>";
		});
		
		proContent = "<table>" + trs + "</table>";

		$('#proDiv_proList').empty().append(proContent);
	});	
}

//预览用户订购信息
function packUserProduct(ajaxPath){
	var ajaxPath = '../../../../jsp/boss/business/batchUserOrder/batchUserOrder.do?methodToCall=ajaxPackUserProduct';
	var goodsIds = "";//当前订购的产品
	var oldProIds = $('#oldProIds').val();//已经订购的产品*,*,*
	$('#proDiv_proList').find("tr").each(function(){
		//查找选中的产品
		var selPro = $(this).find("td").eq(0).find("input");
		if(selPro.attr("checked")==true){//选中的产品
			var selSer = $(this).find("select").val();//选中的策略
			goodsIds = goodsIds +　selPro.val()+","+selSer+";";
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
			oldProIds = data.value.productName;
			$('#oldProIds').val(oldProIds==null?"":oldProIds);
			productList = data.value.withPolicyList;
		}
		if(null==productList||productList.length==0){
			trs += "";
			//$('proDiv_batchSelected').style("display:none");
		}
		$(productList).each(function(n,value){
			var userPro = value;
			var proId = userPro.id;
			var btId = proId.substring(0,proId.lastIndexOf('_'));//产品id
			//alert(btId);
			trs += "<tr id="+btId+">";//订购编号，用于生成按钮 *_*_*
			trs += "<td>"+userPro.productCode+"";
			trs += "<td>"+userPro.productName+"</td>";
			trs += "<td><input type='hidden' value='"+userPro.id+"' />"+userPro.policyName+"</td>";//策略 
			trs += "<td><input type='text' onclick='WdatePicker()' value='"+(userPro.effectiveDateStr==null?"":userPro.effectiveDateStr)+"' class='Wdate'></input></td>"
			trs += "<td><input type='text' onclick='WdatePicker()' value='"+(userPro.expiryDateStr==null?"":userPro.expiryDateStr)+"' class='Wdate'></input></td>"
			trs += "<td><input type='text' value='"+(userPro.price==null?"":userPro.price)+"'  onblur='sumMoney()'/></td>"
			trs += "<td style='width:60'><input type='button' value='删除' onclick='deleteItem(\""+btId+"\")' /></td>";
			trs += "</tr>";
			
		});
		
		proContent += trs;
		$('#batchSelected').append(proContent);
		$('#proDiv_batchSelected').show();//显示用户订购信息的层
		closeDia();//关闭
		sumMoney();//计算金额
		//$('#buyProBut').attr('style','display');//显示提交按钮
	});
}

/**购买用户订购的产品*/
function buyProLists(path){
	var selectPro = '';
	//var oldPro = $('#oldPro').val();
	var selectUser = $('#batchUserIds').val();
	var condition = $('#conditionStr').val();
	var isPayVar = $('input:radio[name="payment"]:checked').val();//订购充值:orderPay   订购开通:orderOpen   订购:order  
	
	//获得终端类型
	var equTypeVar = '';
	$('input:checkbox[name="equType"]:checked').each(function(n,value){
		var equ = value;
		equTypeVar = equTypeVar + equ.value + ",";
	});
	
	if(isPayVar==undefined){
		alert("请选择订购过程是否充值！");
		return;
	}
	//获得订购产品
	selectPro = checkOrderData();
	//2012-6-29 订购开通方式可以没有订购产品
	if(selectPro==''&& isPayVar!='orderOpen'){//订购中止 
		return;
	}
	if(null==condition||''==condition||undefined==condition||'null'==condition||'undefined'==condition){
		condition='';//如果订购条件为空始终用''表示
	}
	if(selectUser==''&&condition==''){
		alert("没有可订购的用户或条件");
		return;
	}
	if(!confirm("智能卡订购需要费用为"+($('#sumMoney').val()==undefined?"0.0":$('#sumMoney').val())+"元，确定要提交订单吗？")){
		return;
	}
	$('#buyProBut').attr('style','display:none');//隐藏按钮
	//用户订购产品
	var userPro = {
		userIds : selectUser,
		proIds : selectPro,
		conditionStr : condition,
		isPay : isPayVar,
		equType : equTypeVar
	};
	$('#proDiv_waitNote').show();//append("<font color='red'>正在处理请稍后！</font>");
	//path:BatchUserOrderAction ajaxBuyProduct
	ovtAjaxMethod(path,userPro,function(data){
		if(data.code != "0"){
			var msg = data.value;
			if(data.value==null||data.value==undefined){
				msg = "连接超时，无法访问服务器！";
			}
			$('#proDiv_waitNote').empty().append("<br/><font color='red'>批量订购处理异常终止！</font>");
			alert(msg);
			return;
		}
		alert("批量订购操作完成");
		var userInfoList = data.value;
		var trs = "";
		$('#proDiv_waitNote').empty().append("<br/>批量订购处理完成，您可以开始其他操作！");
		if(null==userInfoList||userInfoList.length==0){
			return;
		}else if(userInfoList.length>0){
			$('#proDiv_batchNote').show();
		}
		$(userInfoList).each(function(n,value){
			var userInfo = value;
			trs += "<tr >";//没有订购成功的用户信息
			trs += "<td>"+userInfo.userCoding+"";
			trs += "<td>"+userInfo.name+"</td>";
			trs += "<td>"+userInfo.remark+"</td>";//状态
			trs += "<td>"+userInfo.remark2+"</td>";
			var userEquList = userInfo.userEquModelList;//订购失败的卡设备信息
			trs += "<td style='width:170'>";
			if(userEquList.length>0){
				trs += "<table class='orderTableBorder'><tr><th>设备号</th><th>设备状态</th></tr>";
				$(userEquList).each(function(n,value){
					var userEqu = value;
					trs += "<tr>";
					trs += "<td>"+userEqu.icNo+"</td>";
					trs += "<td>"+userEqu.icStatusStr+"</td>";
					trs += "</tr>";
				});
				trs += "</table>";
			}else{
				trs += "无可订购设备";
			}
			trs += "</td>";
			trs += "</tr>";
			
		});
		
		$('#proTab_BatchNote').append(trs);
	});
	
}
/**检查用户订购数据是否合法,返回合法的订购信息*/
function checkOrderData(){
	var checkFlag = 0;
	var selectPro = '';
	$('#batchSelected').find('tr:gt(0)').each(function(){//
		var proname = $(this).find('td:eq(1)').text();
		var policyId = $(this).find('td:eq(2) input').val();
		var startT = $(this).find('td:eq(3) input').val();
		var endT = $(this).find('td:eq(4) input').val();
		var money = $(this).find('td:eq(5) input').val();
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
		if(null==endT || ''==endT){
			alert(proname+" 结束时间空！");
			checkFlag += 1;
			return false;
		}
		var start = startT.replace(/-/g,"");
		var end = endT.replace(/-/g,"");
		if(Number(end-start)<=0){
			alert(proname+" 开始时间"+startT+"大于结束时间"+endT+"！");
			checkFlag += 1;
			return false;
		}
		if(null==money || ''==money || undefined == money){
			alert(proname+" 订购金额空！");
			checkFlag += 1;
			return false;
		}else{
			if(isNaN(money)){//不是数字返回 true
				alert(proname+' 输入的金额'+money+'不对！');
				checkFlag += 1;
				return false;
			}else if(Number(money)>99999||Number(money)<0){
				alert(proname+' 输入的金额'+money+'范围不合法！');
				checkFlag += 1;
				return false;
			}
		}
		selectPro += policyId + ',' + startT + ',' + endT + ',' + money + ';' ; 
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
//统计单个用户需要交纳的金额
function sumMoney(){
	var sum = 0;
	$('#batchSelected').find('tr:gt(0)').each(function(){
		var money = $(this).find('td:eq(5) input').val();
		if(null!=money && undefined!=money && ''!=money){
			var flag = isNaN(money);
			if(!flag)
				sum += Number(money);
		}
	});
	$('#sumMoney').val(sum);
}

