<%@ page contentType="text/html; charset=utf-8" %>
<html>
	<head>		
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
			<link type="text/css" href="<%=request.getContextPath()%>/boss/customer/css/customer/style.css" rel="stylesheet" />	
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery-1.4.2.min.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_plugin.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_parameter.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_common.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_equipment.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_authorize.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_userSeacher.js"></script>
			<!-- add by jhg -->
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_bandwidth.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_product.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_information.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_business_content.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_business.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_receipt.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_invoice.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/popupSelectFrame/js/jquery_popup_select_frame.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_equInput.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_equPromotion.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_repairFee.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/common/datepicker/WdatePicker.js"></script>
			<style type="text/css">
			<!--
			-->
			</style>
	</head>
	<body>
		<div id="business_main">
			<div id="tab_title">
				<span class="tab_title_head tab_title_head_click" id="search_title">搜索用户<span class="ui_icon dialog_no_close_icon"></span></span>
				<!-- span class="tab_title_head tab_title_head_out">搜索<span class="ui_icon dialog_close_icon"></span></span> -->
			</div>
			<div id="tab_main" class="width_height">
				<div id="search_info">
					<div id="search_info_title" class="info_title">请输入搜索条件<span id="search_info_title_icon" class="ui_icon open_icon"></span></div>
					<div id="search_info_content">
					<div id="search_info_div"></div>
					<div><input type="button" value="搜索" id="search_customer_button"/></div>
					</div>
					<div id="search_info_result_title">搜索结果:</div>
					<div id="search_info_result_content"></div>
					<!-- 
					<div class="info_title">点击需要操作的用户</div>
					<table class="tableBorder" id="search_info_result_table">
						<tr class="search_info_result_head">
							<td>用户账号</td>
							<td>用户名称</td>
							<td>证件号码</td>
							<td>固定电话</td>
							<td>移动电话</td>
							<td>用户状态</td>
							<td>有效状态</td>
							<td>用户类型</td>
							<td>所属集团</td>
							<td>用户单位</td>
							<td>联系地址</td>
							<td>安装地址</td>
						</tr>
						
						<tr class="search_info_result_content">
							<td>0293002000000007</td>
							<td>张三</td>
							<td>110221199010239335</td>
							<td>01088237832</td>
							<td>13901234567</td>
							<td>正常</td>
							<td>有效</td>
							<td>居民用户</td>
							<td>东方广视</td>
							<td>北京东方广视科技股份有限公司</td>
							<td>北京市昌平区回龙观信息产业基地立业路7号</td>
							<td>北京市昌平区回龙观信息产业基地立业路7号</td>
						</tr>
						<tr class="search_info_result_content">
							<td>5555502000000007</td>
							<td>李四</td>
							<td>110221199010239335</td>
							<td>01088237832</td>
							<td>13901234567</td>
							<td>正常</td>
							<td>有效</td>
							<td>居民用户</td>
							<td>东方广视</td>
							<td>北京东方广视科技股份有限公司</td>
							<td>北京市昌平区回龙观信息产业基地立业路7号</td>
							<td>北京市昌平区回龙观信息产业基地立业路7号</td>
						</tr>
						
						 
					</table>
					-->
				</div>
				<!-- tab内容显示区域 -->
				<!-- 
				<div>
					<div id="customer_info_title_$" class="info_title">用户基本信息<span id="search_info_title_icon_$" class="ui_icon open_icon"></span></div>
					<table id="customer_info_content_$" width="100%">
						<tr><td>用户账号:</td><td><input class="input_text" type="text" id="customer_account_$"/></td><td>用户名称:</td><td><input type="text" class="input_text" id="customer_name_$"/></td><td>用户性别:</td><td><input type="checkbox" id='regMale_$' name="regGender"/>男<input type="checkbox" id="regFemale_$" name="regGender"/>女</td></tr>
						<tr><td>证件类型:</td><td><input type="checkbox" id="regIdCard_$" checked="checked">身份证&nbsp;其他:<input type="text" id="regOther_$" class="input_text" disabled="disabled"/></td><td>证件号码:</td><td><input type="text" class="input_text" id="customer_idCardNo_$"/></td><td>房产证号:</td><td><input  type="text" class="input_text" id="customer_houseAccount_$"/></td></tr>
						<tr><td>固定电话:</td><td><input type="text" class="input_text" id="customer_phone_$"/></td><td>移动电话:</td><td><input type="text" class="input_text" id="customer_cellPhone_$"/></td><td>电子邮件:</td><td><input type="text" class="input_text" id="customer_email_$"/></td></tr>
						<tr><td>有效状态:</td><td><select id="customer_valid_$"><option>请选择</option><option>有效</option><option>失效</option><option>黑名单</option></select></td><td>所属片区:</td><td><select id="customer_area_$"><option>请选择</option><option>浒山街道</option><option>&nbsp;&nbsp;眉山社区</option><option>&nbsp;&nbsp;虞波社区</option><option>逍林镇</option><option>&nbsp;&nbsp;宏跃村</option></select></td><td>所属集团:</td><td colspan="3"><input type="text" class="input_text" id="customer_group"/></td></tr>	
						<tr><td>合同编号:</td><td><input type="text" class="input_text" id="customer_contract_$"/></td><td>银行账号:</td><td><input type="text" class="input_text" id="customer_bankAccount_$"/></td><td>用户类型:</td><td><select id="customer_customerType_$"><option>请选择</option><option>居民用户</option><option>非居民用户</option><option>低保用户</option></select></td></tr>
						<tr><td>工作单位:</td><td colspan="3"><input type="text" size="50" maxlength="100" class="input_text" size="100" maxlength="100" id="customer_workAddress_$"/></td><td>用户状态:</td><td><select id="customer_status_$"><option>请选择</option><option>正常</option><option>注销</option></select></td></tr>
						<tr><td>联系地址:</td><td colspan="5"><input type="text" size="50" maxlength="100" class="input_text" size="100" maxlength="100" id="customer_contactAddress_$"/>&nbsp;&nbsp;&nbsp;邮政编码:<input type="text" value="315300" class="input_text" id="customer_contactPostcode_$"/></td></tr>
						<tr><td>安装地址:</td><td colspan="5"><input type="text" size="50" maxlength="100" class="input_text" size="100" maxlength="100" id="customer_installAddress_$"/>&nbsp;&nbsp;&nbsp;邮政编码:<input type="text" value="315300" class="input_text" id="customer_installPostcode_$"/></td></tr>
						<tr><td colspan="6"><input type="button" value="修改" id="modify_customer_button_$"/></td></tr>
					</table>
				</div>
				
				<div id='tab_main_tab_title'>
					<span class='tab_title_head' id='equipment_title'>设备信息</span>
					<span class='tab_title_head' id='product_title'>产品信息</span>
					<span class='tab_title_head' id='other_oper_title'>其他操作</span>
					<span class='tab_title_head' id='business_log_title'>营业日志</span>
				</div>
				<div id='equipment_content'>设备信息</div>
				<div id='product_content'>产品信息</div>
				<div id='other_oper_content'>其他操作</div>
				<div id='business_log_content'>营业日志</div>
				
				
				<div id = 'equipment_content_equipment_addEquipment_div' class='customer_group_search_dialog_class'>
					<span><input type ='radio' name='equipAdd' id='equipment_content_equipment_addEquipment_readio_all'>增卡增机</span><span><input type ='radio' name='equipAdd' id='equipment_content_equipment_addEquipment_readio_card'>增卡</span><span><input type ='radio' name='equipAdd' id='equipment_content_equipment_addEquipment_readio_stb'>增机</span>
					<div><span>智能卡号:</span><span><input type = 'text' id = 'equipment_content_equipment_addEquipment_text_card'></span><span><input type = 'radio' name='mainOrSlave' id='equipment_content_equipment_addEquipment_readio_main'/>主终端</span><span><input type = 'radio' name='mainOrSlave' id='equipment_content_equipment_addEquipment_readio_slave'/>副终端</span><span><select id = 'equipment_content_equipment_addEquipment_select_main'><option value ='-1'>选择主终端</option></select></span></div>
					<div><span>机顶盒号:</span><span><input type = 'text' id = 'equipment_content_equipment_addEquipment_text_stb'></span><span><select id = 'equipment_content_equipment_addEquipment_select_stbGetType'><option value='赠送'>赠送</option><option value='购买'>购买</option><option value='自购'>自购</option></select></span><span><input type = 'checkbox' id='equipment_content_equipment_addEquipment_checkbox_bindingType'/>机卡绑定</span></div>
					<div><input type = 'button' value = '添加' id = 'equipment_content_equipment_addEquipment_but_add'/></div>
				</div>
				
				
				<div id = 'equipment_content_equipment_binding_div' class='hide customer_group_search_dialog_class'>
					<table id = 'equipment_content_equipment_binding_bindingTable_' class='tableBorder'>
						<tr>
							<td>选择</td>
							<td>智能卡号</td>
							<td>终端名称</td>
							<td>智能卡描述</td>
							<td>机顶盒号</td>
							<td>机顶盒描述</td>
						</tr>
					</table>
					<div><input id='equipment_content_equipment_binding_but_unbinding_' type = 'button' value = '解除绑定'/></div>
					<table id = 'equipment_content_equipment_binding_cardTable_' style='float:left' class='tableBorder'>
						<tr>
							<td>选择</td>
							<td>智能卡号</td>
							<td>终端名称</td>
							<td>智能卡描述</td>
						</tr>
					</table>
					<table id = 'equipment_content_equipment_binding_stbTable_' class='tableBorder'>
						<tr>
							<td>选择</td>
							<td>机顶盒号</td>
							<td>机顶盒描述</td>
						</tr>
					</table>
					<div><input id='equipment_content_equipment_binding_but_binding_' type = 'button' value = '机卡绑定'/><input id='equipment_content_equipment_binding_but_cancel_' type = 'button' value = '关闭'/></div>
				</div>
				
				
				<div id='equipment_content_equipment_change_div_' class='hide customer_group_search_dialog_class'>
					<table id = 'equipment_content_equipment_change_cardTable_' class='tableBorder'>
						<tr>
							<th>选择</th>
							<th>智能卡号</th>
							<th>终端名称</th>
							<th>智能卡描述</th>
						</tr>
					</table>
					<table id = 'equipment_content_equipment_change_stbTable_' class='tableBorder'>
						<tr>
							<th>选择</th>
							<th>机顶盒号</th>
							<th>机顶盒描述</th>
						</tr>
					</table>
				</div>

				-->
				<!-- tab内容显示区域 -结束-->
			</div>
			<!-- 用户集团选择弹出搜索使用 
			<div class="hide customer_group_search_dialog_class" id="customer_group_search_dialog">
				<table>
					<tr><td>集团名称:</td><td><input type="text" size="20" maxlength="100" id="customer_group_search_name"></td><td><input type="button" value="查找" id="customer_group_but_search"/></td></tr>
				</table>
				<table id="customer_group_search_result" class="tableBorder">
				</table>
				<table>
					<tr><td colspan = "3"><input type="button" id="customer_group_but_clear" value="清空"><input type="button" id="customer_group_but_cancel" value="取消"></td></tr>
				</table>
			</div>
			 -->
			<!-- 提示信息使用层 -->
			<div id="message"><span id="message_icon" class="ui_icon"></span><span id="message_content">正在进行后台数据操作，请耐心等待，稍候可以继续进行操作……</span></div>
			<div id="mask"><iframe id='mask_iframe' frameborder = "0" height ="100%" width="100%"></iframe></div>
			<div id="equMask"><iframe id='mask_iframe' frameborder = "0" height ="100%" width="100%"></iframe></div>
		</div>
	</body>
</html>