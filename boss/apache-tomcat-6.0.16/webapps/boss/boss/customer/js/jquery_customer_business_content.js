function businessContent(currentUserInfo,thisIcCard){
	var tabContent = "";
	tabContent = "<div id='tab_content_"+thisIcCard+"' class='hide width_height'>";
	tabContent = tabContent+"<div id='customer_info_title_"+thisIcCard+"' class='info_title'>用户基本信息<span id='search_info_title_icon_"+thisIcCard+"' class='ui_icon open_icon'></span></div>";
	tabContent = tabContent+"<form id='customer_info_form_"+thisIcCard+"'>";
	tabContent = tabContent+ "<div id='customer_info_content_"+thisIcCard+"'>";
	tabContent = tabContent+ "<div id='customer_info_div_"+thisIcCard+"'></div>";
	tabContent = tabContent+"";
	tabContent = tabContent+"<div><span><input type='button' value='修改' id='modify_customer_button_"+thisIcCard+"'/></span><span><input type='button' value='保存' id='submit_modify_customer_button_"+thisIcCard+"'/></span><span><input type='reset' value='取消' id='cancel_modify_customer_button_"+thisIcCard+"'/></span><span><input type='button' value='代扣资料审核' id='bankinfo_verify_customer_button_"+thisIcCard+"'/></span></div>";
	tabContent = tabContent+"</div>";
	tabContent = tabContent+"</form>";
	
	//操作区
	tabContent = tabContent+"<div id='customer_oper_title_"+thisIcCard+"' class='info_title'>用户基本操作<span id='customer_oper_title_icon_"+thisIcCard+"' class='ui_icon close_icon'></span></div>";
	tabContent = tabContent + "<div id='customer_oper_content_"+thisIcCard+"' class='width_height'>";
	tabContent = tabContent + "<span id='tab_main_tab_title_"+thisIcCard+"'>";
	tabContent = tabContent + "<span class='tab_title_head tab_title_head_out' id='equipment_title_"+thisIcCard+"'>设备信息</span>";
	tabContent = tabContent + "<span class='tab_title_head tab_title_head_out' id='product_title_"+thisIcCard+"'>订购信息</span>";
	tabContent = tabContent + "<span class='tab_title_head tab_title_head_out' id='authorize_title_"+thisIcCard+"'>授权信息</span>";// 20120521 liuxu
	tabContent = tabContent + "<span class='tab_title_head tab_title_head_out' id='other_title_"+thisIcCard+"'>帐户操作</span>";
	tabContent = tabContent + "<span class='tab_title_head tab_title_head_out' id='log_title_"+thisIcCard+"'>营业日志</span>";
	tabContent = tabContent + "<span class='tab_title_head tab_title_head_out' id='invoice_title_"+thisIcCard+"'>发票信息</span>";	
	// add by jhg start
	tabContent = tabContent + "<span class='tab_title_head tab_title_head_out' id='bandwidth_title_"+thisIcCard+"'>宽带业务</span>";
	// add byh jhg end
	tabContent = tabContent + "</span>";//操作tab标签结束
	tabContent = tabContent + "<span class='common_bar' id = 'common_bar_span_'"+thisIcCard+">";
	tabContent = tabContent + "<span class = 'common_bar_button common_bar_payment' id='common_bar_but_payment_"+thisIcCard+"'></span>";
	tabContent = tabContent + "<!--span class = 'common_bar_button common_bar_print' id='common_bar_but_print_"+thisIcCard+"'></span-->";
	tabContent = tabContent + "</span>";
//	tabContent = tabContent + "<div class='tab_main_content_"+thisIcCard+"'>";
	tabContent = tabContent + "<div class='tab_main_content width_height'>";
	tabContent = tabContent + "<div id='equipment_content_"+thisIcCard+"' class='hide'>";
	tabContent = tabContent + "<div>";
	tabContent = tabContent + "<input type='button' value='刷新设备信息' id='equipment_content_equipment_but_info_"+thisIcCard+"' class='hide'/>";
	tabContent = tabContent + "<input type='button' value='增加设备' id='equipment_content_equipment_but_equAdd_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='机顶盒注销' id='equipment_content_equipment_but_stbLogoff_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='机顶盒换机' id='equipment_content_equipment_but_stbChange_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='机顶盒回收' id='equipment_content_equipment_but_recycleSTB_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='绑定操作' id='equipment_content_equipment_but_binding_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='移机' id='other_content_customer_but_addrChange_"+thisIcCard+"'/>";					
	tabContent = tabContent + "<input type='button' value='过户' id='other_content_customer_but_transfer_"+thisIcCard+"'/>";		
	tabContent = tabContent + "<input type='button' value='刷新授权' id='equipment_content_equipment_but_cardSync_"+thisIcCard+"'/>";
	// 将清除授权按钮移动到授权信息页面中  liuxu 2012-07-10
//	tabContent = tabContent + "<input type='button' value='清除授权' id='equipment_content_equipment_but_clearRight_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='服务开通' id='equipment_content_equipment_but_openServ_"+thisIcCard+"'/>";
	// 增加设备服务升级操作 add by jhg 2013-09-05
	tabContent = tabContent + "<input type='button' value='设备服务升级' id='equipment_order_content_but_equServUP_"+thisIcCard+"'/>";
	// 增加费用补交操作 add by jhg 2013-09-05
	tabContent = tabContent + "<input type='button' value='费用补交' id='equipment_order_content_but_repairFee_"+thisIcCard+"'/>";
	
	tabContent = tabContent + "</div><div>";
	//tabContent = tabContent + "<input type='button' value='增加智能卡' id='equipment_content_equipment_but_cardAdd_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='智能卡报停' id='equipment_content_equipment_but_cardStop_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='智能卡开通' id='equipment_content_equipment_but_cardReopen_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='智能卡挂起' id='equipment_content_equipment_but_cardDisable_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='智能卡启用' id='equipment_content_equipment_but_cardEnable_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='智能卡注销' id='equipment_content_equipment_but_cardLogoff_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='智能卡挂失' id='equipment_content_equipment_but_cardReportLoss_"+thisIcCard+"'/>";
	// 增加智能卡找回功能 liuxu 20120328
	tabContent = tabContent + "<input type='button' value='智能卡找回' id='equipment_content_equipment_but_cardReportFind_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='智能卡换卡' id='equipment_content_equipment_but_cardChange_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='智能卡回收' id='equipment_content_equipment_but_recycleCard_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='终端对调' id='equipment_content_equipment_but_transPosition_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='终端转组' id='equipment_content_equipment_but_transGroup_"+thisIcCard+"'/>";
	
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "<div id='equipment_content_equipment_list_"+thisIcCard+"'>";
	tabContent = tabContent + "<table id='equipmentTable_"+thisIcCard+"' width='100%' class='tableBorder'>";
//	tabContent = tabContent + "<tr><th>选择</th><!--th>组号</th--><th>智能卡号</th><th>终端名称</th><th>智能卡状态</th><th>机顶盒号</th><th>来源</th><th>机顶盒状态</th><th>机卡绑定</th></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "";
	tabContent = tabContent + "</div>";//设备列表结束
	tabContent = tabContent + "</div>";//设备信息结束
	tabContent = tabContent + "<div id='product_content_"+thisIcCard+"' class='hide'>";
	tabContent = tabContent + "<input type='button' value='刷新订购信息' id='product_content_product_but_info_"+thisIcCard+"' class='hide'/>";
	tabContent = tabContent + "<input type='button' value='订购产品' id='product_content_product_but_order_"+thisIcCard+"'/>";
	// 增加终端订购同步，add by jhg 2013-07-19
	tabContent = tabContent + "<input type='button' value='订购同步' id='equipment_content_equipment_but_syncOrder_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='退订产品' id='product_content_product_but_unsubscribe_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='退订申请中产品' id='product_content_product_but_unsubscribe_apply_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='导出订购历史信息' id='product_content_product_but_export_order_"+thisIcCard+"'/>";
//	tabContent = tabContent + "<div id='product_content_product_list_"+thisIcCard+"'></div>";
	tabContent = tabContent + "<div id='productOrderDiv_"+thisIcCard+"'></div>";//订购产品容器
	tabContent = tabContent + "</div>";//订购信息结束
	
	tabContent = tabContent + "<div id='authorize_content_"+thisIcCard+"' class='hide'>";	// authorize add by liuxu 20120521
	// 在授权信息页面中增加调用增卡指令按钮，以及将书安心授权和清除授权的按钮从设备信息中移动到授权信息中 liuxu 2012-07-09
	tabContent = tabContent + "<div id='authorize_content_authorize_command_div_"+thisIcCard+"'>";
	tabContent = tabContent + "<input type='checkbox' name='authorize_command_send' value='131' id='authorize_content_authorize_but_clearRight_"+thisIcCard+"'/>清除授权";
	tabContent = tabContent + "<input type='checkbox' name='authorize_command_send' value='104' id='authorize_content_authorize_but_stopCard_"+thisIcCard+"'/>停止卡";
	tabContent = tabContent + "<input type='checkbox' name='authorize_command_send' value='105' id='authorize_content_authorize_but_enableCard_"+thisIcCard+"'/>启用卡";
	tabContent = tabContent + "<input type='checkbox' name='authorize_command_send' value='132' id='authorize_content_authorize_but_flushRight_"+thisIcCard+"'/>刷新授权";
	tabContent = tabContent + "<input type='button' value='发送授权指令' id='authorize_content_authorize_but_sendCommand_"+thisIcCard+"'/>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "<table id='authorizeTable_"+thisIcCard+"' width='100%' class='tableBorder'>";
	tabContent = tabContent + "<tr><th><input type='checkbox' value= 'selectAll' id = 'authroize_content_authorize_but_selectAllItems_"+thisIcCard+"' /></th><th>智能卡号</th><th>终端名称</th><th>智能卡状态</th><th>机顶盒号</th><th>机顶盒型号</th><th>来源</th><th>机顶盒状态</th><th>机卡绑定</th><th width= '45%'>授权信息</th></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "</div>"; // ~authorize
	
	tabContent = tabContent + "<div id='other_content_"+thisIcCard+"' class='hide'>";
	tabContent = tabContent + "<input type='button' value='设为黑名单' id='other_content_customer_but_addBlacklist_"+thisIcCard+"'/>";					
	tabContent = tabContent + "<input type='button' value='取消黑名单' id='other_content_customer_but_removeBlacklist_"+thisIcCard+"'/>";					
	tabContent = tabContent + "<input type='button' value='用户报停' id='other_content_customer_but_stopSub_"+thisIcCard+"'/>";					
	tabContent = tabContent + "<input type='button' value='用户开通' id='other_content_customer_but_reopenSub_"+thisIcCard+"'/>";					
	tabContent = tabContent + "<input type='button' value='用户注销' id='other_content_customer_but_delSub_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='注销用户开通' id ='other_content_customer_but_logoutSubOpen_"+thisIcCard+"'/>" // 增加注销用户开通 Xu Liu 20120319
	tabContent = tabContent + "<input type='button' value='用户同步' id='other_content_customer_but_syncSub_"+thisIcCard+"'/>";					
	tabContent = tabContent + "<input type='button' value='打印用户证' id='other_content_customer_but_printCredential_"+thisIcCard+"'/>";	
	tabContent = tabContent + "<input type='button' value='打印账户流水信息' id='other_content_customer_but_printUserOrderInfo_"+thisIcCard+"'/>";//修改按钮名称 2012-08-24 yzy
	tabContent = tabContent + "<input type='button' value='删除用户' id ='other_content_customer_but_logoutUserDrop_"+thisIcCard+"'/>"; // 增加注销用户删除功能 YanxuLiu 20120319
//	tabContent = tabContent + "<input type='button' value='设为无效用户' id='other_content_customer_but_addrchange_"+thisIcCard+"'/>";					
//	tabContent = tabContent + "<input type='button' value='移机' id='other_content_customer_but_addrChange_"+thisIcCard+"'/>";					
//	tabContent = tabContent + "<input type='button' value='过户' id='other_content_customer_but_transfer_"+thisIcCard+"'/>";					
//	tabContent = tabContent + "<input type='button' value='缴费' id='other_content_customer_but_payment_"+thisIcCard+"'/>";	
//	tabContent = tabContent + "<input type='button' value='充值' id='other_content_customer_but_charging_"+thisIcCard+"'/>";	
	tabContent = tabContent + "<div id = 'other_content_accountHis_"+thisIcCard+"'>";
	tabContent = tabContent + "<div><br/>";
	tabContent = tabContent + "<div id ='customer_acount_info_"+thisIcCard+"'></div>";
	tabContent = tabContent + "</div>";//用户账户信息结束
	tabContent = tabContent + "<div style'font-weigth:bold'><br/>用户账户变动历史:</div>";
//	tabContent = tabContent + "<div>";
//	tabContent = tabContent + "<span><input type = 'radio' id='other_content_accountHis_radio_flushAll_"+thisIcCard+"'  name='accountHis_"+thisIcCard+"' checked='checked'/>查询全部变动历史</span>";
//	tabContent = tabContent + "<span><input type = 'radio' id='other_content_accountHis_radio_flushUnPrint_"+thisIcCard+"' name='accountHis_"+thisIcCard+"'/>只查询可以关联发票的账户变动历史</span>";
//	tabContent = tabContent + "</div>";
	tabContent = tabContent + "开始时间:<input type='text' value='' id ='other_content_accountHis_startDate_"+thisIcCard+"' size='12' maxlength='20' onfocus=\"WdatePicker(  )\" class='Wdate'/>";
	tabContent = tabContent + "结束时间:<input type='text' value='' id ='other_content_accountHis_endDate_"+thisIcCard+"' size='12' maxlength='20' onfocus=\"WdatePicker(  )\" class='Wdate'/>";
	tabContent = tabContent + "<input type='button' value = '查询' id = 'other_content_accountHis_customer_but_flushHis_"+thisIcCard+"'/>";
//	tabContent = tabContent + "<span><input type = 'checkbox' id='other_content_accountHis_onlyUnPrint_"+thisIcCard+"'/>只查询未打印发票历史</span>";
	tabContent = tabContent + "<table class='tableBorder' id = 'other_content_accountHis_table_"+thisIcCard+"'><tr><th>变动时间</th><th>变动类型</th><th>出入标志</th><th>现金账号</th><th>券账号</th><th>点账号</th><th>变动原因</th></tr></table>";
//	tabContent = tabContent + "<div id = 'other_content_accountHis_checkGroupBar_"+thisIcCard+"'></div>";
	tabContent = tabContent + "<div id = 'other_content_accountHis_pageBar_"+thisIcCard+"'></div>";
//	tabContent = tabContent + "<div class='hide' id = 'other_content_accountHis_print_div_"+thisIcCard+"'><input type='button' value='打印发票' id='other_content_accountHis_but_print_"+thisIcCard+"'/></div>";
//	tabContent = tabContent + "<div><span><input type = 'checkbox' id='other_content_accountHis_onlyUnPrint_"+thisIcCard+"'/>只查询未打印发票历史</span></div>";
	tabContent = tabContent + "</div>";//用户账户历史结束
	tabContent = tabContent + "</div>";//其他操作结束
	tabContent = tabContent + "<div id='log_content_"+thisIcCard+"' class='hide'>";
	tabContent = tabContent + "开始时间:<input type='text' value='' id ='log_contnet_startDate_"+thisIcCard+"' size='12' maxlength='20' onfocus=\"WdatePicker(  )\" class='Wdate'/>";
	tabContent = tabContent + "结束时间:<input type='text' value='' id ='log_contnet_endDate_"+thisIcCard+"' size='12' maxlength='20' onfocus=\"WdatePicker(  )\" class='Wdate'/>";
	tabContent = tabContent + "<input type='button' value = '查询' id = 'log_content_customer_but_flushLog_"+thisIcCard+"'/>";
	tabContent = tabContent + "<div id = 'log_content_customer_but_logContent_"+thisIcCard+"'>";
	tabContent = tabContent + "<table  class='tableBorder' id = 'log_content_customer_but_logContent_table_"+thisIcCard+"'>";
	tabContent = tabContent + "<tr><th>选择</th><th>业务流水号</th><th>区域</th><th>业务类别</th><th>产生时间</th><th>操作员</th><th>代办人姓名</th></tr>"
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<div id = 'log_content_customer_but_logContent_checkGroup_"+thisIcCard+"'></div>";
	tabContent = tabContent + "<div id = 'log_content_customer_but_logContent_pageBar_"+thisIcCard+"'></div>";
	tabContent = tabContent + "<div><input type='button' value = '打印受理单' id = 'log_content_customer_but_printLog_"+thisIcCard+"'/></div>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "</div>";//营业日志结束
	
	// add by jhg start 宽带业务标签开始
	tabContent = tabContent + "<div id='bandwidth_content_"+thisIcCard+"' class='hide'>";
	// 按钮行开始
	tabContent = tabContent + "<div id='bandwidth-button_"+thisIcCard+"'>";
	tabContent = tabContent + "<input type='button' value='新建账户' id='bandwidth_content_bandwidth_but_bwAdd_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='充值' disabled='disabled' id='bandwidth_content_bandwidth_but_renewAndfeeSub_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='业务变更' disabled='disabled' id='bandwidth_content_bandwidth_but_modifySub_"+thisIcCard+"'/>";					
	tabContent = tabContent + "<input type='button' value='密码重置' disabled='disabled' id='bandwidth_content_bandwidth_but_resetPWSub_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='密码修改' disabled='disabled' id='bandwidth_content_bandwidth_but_changePWSub_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='销户' disabled='disabled' id='bandwidth_content_bandwidth_but_repoSub_"+thisIcCard+"'/>";	
	tabContent = tabContent + "<input type='button' value='删除' disabled='disabled' id='bandwidth_content_bandwidth_but_deleteSub_"+thisIcCard+"'/>";		
	tabContent = tabContent + "<input type='button' value='信息同步' disabled='disabled' id='bandwidth_content_bandwidth_but_syncSub_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='业务提交' id='bandwidth_content_bandwidth_but_submitSub_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='忽略同步失败操作' id='bandwidth_content_bandwidth_but_ignoreSub_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type='button' value='打印宽带受理单' id='bandwidth_content_bandwidth_but_bandacceptSub_"+thisIcCard+"'/>";
	tabContent = tabContent + "</div>";
	// 按钮行结束
	// 宽带账户信息列表信息
	tabContent = tabContent + "<div id='bandwidth_content_bandwidth_list_"+thisIcCard+"'>";
	tabContent = tabContent + "<table id='bandwidthTable_"+thisIcCard+"' width='100%' class='tableBorder'>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<table id='showUnSubmitTipTable_"+thisIcCard+"' width='100%' border=0>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "";
	tabContent = tabContent + "</div>";
	// 宽带账户信息列表结束
	tabContent = tabContent + "</div>";
	// add by jhg end 宽带业务标签结束
	
	tabContent = tabContent + "<div id= 'invoice_content_"+thisIcCard+"' class='hide'>";
	tabContent = tabContent + "<div id = 'receipt_content_div_"+thisIcCard+"'>";//缴费历史信息
	tabContent = tabContent + "<div>";
	tabContent = tabContent + "<input type='button' value='打印发票' id='receipt_content_but_print_"+thisIcCard+"' />";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "<div>";
	tabContent = tabContent + "<span><input type = 'radio' id='other_content_receipt_radio_flushAll_"+thisIcCard+"'  name='receipt_flush_"+thisIcCard+"' checked='checked'/>查询全部缴费历史</span>";
	tabContent = tabContent + "<span><input type = 'radio' id='other_content_receipt_radio_flushUnPrint_"+thisIcCard+"' name='receipt_flush_"+thisIcCard+"'/>只查询可以关联发票的缴费历史</span>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "开始时间:<input type='text' value='' id ='receipt_content_startDate_"+thisIcCard+"' size='12' maxlength='20' onfocus=\"WdatePicker(  )\" class='Wdate'/>";
	tabContent = tabContent + "结束时间:<input type='text' value='' id ='receipt_content_endDate_"+thisIcCard+"' size='12' maxlength='20' onfocus=\"WdatePicker(  )\" class='Wdate'/>";
	tabContent = tabContent + "<input type='button' value = '查询' id = 'receipt_content_but_flushReceipt_"+thisIcCard+"'/>";
	tabContent = tabContent + "<table id ='receipt_content_table_"+thisIcCard+"' class='tableBorder'>";
	tabContent = tabContent + "<tr><th>选择</th><th>发生时间</th><th>涉及金额</th><th>产生原因</th><th>产生方式</th><th>操作人员</th><th>关联发票</th></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<div id = 'receipt_content_pageBar_"+thisIcCard+"'></div>";
	tabContent = tabContent + "</div>";//缴费历史表信息
	tabContent = tabContent + "<div class='second_content_div'>";//第二个div
	tabContent = tabContent + "<div>";//按钮行
	tabContent = tabContent + "<input type = 'button' id = 'invoice_content_but_view_"+thisIcCard+"' value='查看信息'/>";
	tabContent = tabContent + "<input type = 'button' id = 'invoice_content_but_print_"+thisIcCard+"' value='延期打印' />";
	tabContent = tabContent + "<input type = 'button' id = 'invoice_content_but_writeBack_"+thisIcCard+"' value='号码回填' />";
	tabContent = tabContent + "<input type = 'button' id = 'invoice_content_but_discard_"+thisIcCard+"' value='发票作废' />";
	tabContent = tabContent + "<input type = 'button' id = 'invoice_content_but_rePrint_"+thisIcCard+"' value='作废重打' />";
	tabContent = tabContent + "<input type = 'button' id = 'invoice_content_but_negative_"+thisIcCard+"' value='发票冲红' />";
	tabContent = tabContent + "</div>";//按钮行结束
	tabContent = tabContent + "开始时间:<input type='text' value='' id ='invoice_contnet_startDate_"+thisIcCard+"' size='12' maxlength='20' onfocus=\"WdatePicker(  )\" class='Wdate'/>";
	tabContent = tabContent + "结束时间:<input type='text' value='' id ='invoice_contnet_endDate_"+thisIcCard+"' size='12' maxlength='20' onfocus=\"WdatePicker(  )\" class='Wdate'/>";
	tabContent = tabContent + "<input type='button' value = '查询' id = 'invoice_content_but_flushInvoice_"+thisIcCard+"'/>";
	tabContent = tabContent + "<table id='invoice_content_table_"+thisIcCard+"' class='tableBorder' >";
	tabContent = tabContent + "<tr><th>选择</th><th>发票号码</th><th>发票金额</th><th>开票时间</th><th>开票人</th><th>有效状态</th><th>打印状态</th></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<div id = 'invoice_content_pageBar_"+thisIcCard+"'></div>";
	tabContent = tabContent + "</div>"//第二个div结束
	tabContent = tabContent + "</div>";//发票信息tab操作结束
	tabContent = tabContent + "</div>";//具体操作内容结束
	tabContent = tabContent + "</div>";//基本操作结束
	
	//所属集团弹出页面隐藏区
	tabContent = tabContent + "<div class='hide customer_group_search_dialog_class' id='customer_group_search_dialog_"+thisIcCard+"'>";
	tabContent = tabContent + "<table>";
	tabContent = tabContent + "<tr><td>集团名称:</td><td><input type='text' size='10' maxlength='100' id='customer_group_search_name_"+thisIcCard+"'></td><td><input type='button' value='查找' id='customer_group_but_search_"+thisIcCard+"'/></td></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<table id='customer_group_search_result_"+thisIcCard+"' class='tableBorder'>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<table>";
	tabContent = tabContent + "<tr><td colspan = '3'><input type='button' id='customer_group_but_clear_"+thisIcCard+"' value='清空'><input type='button' id='customer_group_but_cancel_"+thisIcCard+"' value='取消'></td></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "</div>";
	
	//增加设备关系隐藏区
	tabContent = tabContent + "<div class = '"+WebInitParameter.DEBUG_MODE+"'><div>customer_id:"+thisIcCard+"</div><span id = 'equ_GroupMaxNum_"+thisIcCard+"'></span><table id='equVar_"+thisIcCard+"'></table></div>";
	//增加订购隐藏信息区
	tabContent = tabContent + "<div id='proVarDiv_"+thisIcCard+"'></div>";
	//增加设备弹出隐藏区
	tabContent = tabContent + "<div id = 'equipment_content_equipment_addEquipment_div_"+thisIcCard+"' class='hide customer_group_search_dialog_class'>";
	tabContent = tabContent + "<span><input type ='radio' name='equipAdd_"+thisIcCard+"' checked='checked' id='equipment_content_equipment_addEquipment_readio_all_"+thisIcCard+"'>增卡增机</span><span><input type ='radio' name='equipAdd_"+thisIcCard+"' id='equipment_content_equipment_addEquipment_readio_card_"+thisIcCard+"'>增卡</span><span><input type ='radio' name='equipAdd_"+thisIcCard+"' id='equipment_content_equipment_addEquipment_readio_stb_"+thisIcCard+"'>增机</span>";
	tabContent = tabContent + "<div><span>智能卡号:</span><span><input type = 'text' class='input_text' id = 'equipment_content_equipment_addEquipment_text_card_"+thisIcCard+"'><input type='text' class='input_text_model' id='icCardModel_"+thisIcCard+"' /></span><span><input type = 'radio' name='mainOrSlave_"+thisIcCard+"' id='equipment_content_equipment_addEquipment_readio_main_"+thisIcCard+"'/>主终端</span><span><input type = 'radio' name='mainOrSlave_"+thisIcCard+"' id='equipment_content_equipment_addEquipment_readio_slave_"+thisIcCard+"'/>副终端</span><span><select id = 'equipment_content_equipment_addEquipment_select_main_"+thisIcCard+"'><option value ='-1'>选择主终端</option></select></span></div>";
	tabContent = tabContent + "<div><span>机顶盒号:</span><span><input type = 'text' class='input_text' id = 'equipment_content_equipment_addEquipment_text_stb_"+thisIcCard+"'><input type='text' class='input_text_model' id='stbModel_"+thisIcCard+"' /></span><span><select id = 'setBoxGetType_"+thisIcCard+"'>"+STB_GET_TYPE_HTML+"</select></span><span><input type = 'checkbox' id='equipment_content_equipment_addEquipment_checkbox_bindingType_"+thisIcCard+"'/>机卡绑定</span></div>";
	tabContent = tabContent + "<div><input type = 'button' value = '添加' id = 'equipment_content_equipment_addEquipment_but_add_"+thisIcCard+"'/><input type = 'button' value = '取消' id = 'equipment_content_equipment_addEquipment_but_cancel_"+thisIcCard+"'/></div>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "";
	
	// 增加报停弹出界面 liuxu 2012/6/13
	tabContent = tabContent + "<div id = 'equipment_content_equipment_cardStop_div_"+thisIcCard+"' class='hide customer_group_search_dialog_class' >";
	tabContent = tabContent + "<span><input type='radio' name='icCardStop_"+thisIcCard+"' checked='checked' id='equipment_content_equipment_cardStop_radio_immediately_"+thisIcCard+"'>即时报停</span><span><input type='radio' name='icCardStop_"+thisIcCard+"' id='equipment_content_equipment_cardStop_radio_byTime_"+thisIcCard+"' >按基本服务结束时间报停</span>";
	tabContent = tabContent + "<div><span>功能描述:</span></div>";
	tabContent = tabContent + "<div><table width='450px'><tr><textarea id='equipment_content_equipment_cardStop_description_"+thisIcCard+"' style='width:450px;height:55px;' name='description'></textarea></tr></table></div>";
	tabContent = tabContent + "<div><input type='button' value='报停' id='equipment_content_equipment_cardStop_but_stop_"+thisIcCard+"'/><input type='button' value='取消' id='equipment_content_equipment_cardStop_but_cancel"+thisIcCard+"' /></div>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "";
	
	// add by jhg start
	//新建账户弹出界面
	tabContent = tabContent + "<div id = 'bandwidth_content_addBandWidth_div_"+thisIcCard+"' class='hide customer_group_search_dialog_class'>";
	tabContent = tabContent + "<div id = 'bandwidth_content_title_"+thisIcCard+"' width='600px' height='23px' overflow='hidden'><table background='../../../../common/images/bar_bg.gif' class='L style2' cellspacing='0' cellpadding='0' border='0'><tr><td width='30px'><img height='23' width='31' src='../../../../common/images/bar_left.gif'></td><td width='570px'>新建账户</td></tr></table></div>";
	tabContent = tabContent + "<table width='600px' height='120px' cellspacing='0' cellpadding='0' border='0'><tbody>";
	tabContent = tabContent + "<tr><td align='right' width='100px'>宽带帐号:</td><td width='150px'><input type='text' class='input_text' id='bandwidth_content_addBandWidth_bwNo_"+thisIcCard+"' style='width:140px' /></td><td width='80px'><input type = 'button' value = '选号' id = 'bandwidth_content_addBandWidth_select_but_"+thisIcCard+"'/></td>"
							+ "<td align='left' width='75px'>MAC地址:</td><td><input type='text' class='input_text' id='bandwidth_content_addBandWidth_macAddr_"+thisIcCard+"' style='width:150px' /></td></tr>";
	tabContent = tabContent + "<tr>";
	tabContent = tabContent + "<td align='right' width='100px'>宽带产品:</td><td width='150px'><select id = 'setBandWidthProductBoxType_"+thisIcCard+"' style='width:140px'></select></td><td align='left' width='80px'>产品描述:</td><td width='270px' rowspan='3' colspan='2' align='left'><textarea id='bandwidth_content_addBandWidth_descript_"+thisIcCard+"' style='width:230px;height:75px;' name='description'></textarea></td>";
	tabContent = tabContent + "</tr>";
	tabContent = tabContent + "<tr><td align='right' width='100px'>预充值(单位:元):</td><td width='500px'  colspan='4'><input type='text' class='input_text' id='bandwidth_content_addBandWidth_fee_"+thisIcCard+"' style='width:140px' /></td></tr>";
	tabContent = tabContent + "</tbody></table>";
	tabContent = tabContent + "<hr>";
	tabContent = tabContent + "<table width='600px' height='30px' cellspacing='0' cellpadding='0' border='0'><tbody>";
	tabContent = tabContent + "<tr align='left'><td width='50px'><input type = 'button' value = '确定' id = 'bandwidth_content_addBandWidth_but_add_"+thisIcCard+"'/></td><td width='550px'><input type = 'button' value = '取消' id = 'bandwidth_content_addBandWidth_but_cancel_"+thisIcCard+"'/></td></tr>";
	tabContent = tabContent + "</tbody></table>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "";
	
	// 业务变更界面
	tabContent = tabContent + "<div id = 'bandwidth_content_modifyBandWidth_div_"+thisIcCard+"' class='hide customer_group_search_dialog_class'>";
	tabContent = tabContent + "<div id = 'bandwidth_content_modifyTitle_"+thisIcCard+"' width='600px' height='23px'><table background='../../../../common/images/bar_bg.gif' class='L style2' cellspacing='0' cellpadding='0' border='0'><tr><td width='30px'><img height='23' width='31' src='../../../../common/images/bar_left.gif'></td><td width='570px'>业务变更</td></tr></table></div>";
	tabContent = tabContent + "<table width='600px' height='120px' cellspacing='0' cellpadding='0' border='0'><tbody>";
	tabContent = tabContent + "<tr><td align='right' width='100px'>宽带帐号:</td><td width='150px'><input type='text' class='input_text' id='bandwidth_content_modifyBandWidth_bwNo_"+thisIcCard+"' style='width:140px' disabled='disabled' /></td>"
							+ "<td align='right' width='80px'>MAC地址:</td><td><input type='text' class='input_text' id='bandwidth_content_modifyBandWidth_macAddr_"+thisIcCard+"' style='width:140px' disabled='disabled' /></td></tr>";
	tabContent = tabContent + "<tr>";
	tabContent = tabContent + "<td align='right' width='100px'>宽带产品:</td><td width='150px'><select id = 'setModifyBandWidthProductBoxType_"+thisIcCard+"' style='width:140px'></select></td><td align='right' width='80px'>产品描述:</td><td width='270px' rowspan='5' align='left'><textarea id='bandwidth_content_modifyBandWidth_descript_"+thisIcCard+"' style='width:230px;height:75px;' name='description'></textarea></td>";
	tabContent = tabContent + "</tr>";
	tabContent = tabContent + "<tr><td colspan=3 align='center'><table id='modifyOrderHitTable_"+thisIcCard+"' width='250px'></table></td></tr>";
	tabContent = tabContent + "<tr><td align='right' width='100px'>预充值(单位:元):</td><td width='150px'><input type='text' class='input_text' id='bandwidth_content_modifyIncome_fee_"+thisIcCard+"' style='width:140px'/></td></tr>";
	tabContent = tabContent + "</tbody></table>";
	tabContent = tabContent + "<hr>";
	tabContent = tabContent + "<table align='center' width='600px' height='30px' cellspacing='0' cellpadding='0' border='0'><tbody>";
	tabContent = tabContent + "<tr align='left'><td width='50px'><input type = 'button' value = '确定' id = 'bandwidth_content_modifyBandWidth_but_modify_"+thisIcCard+"'/></td><td width='550px'><input type = 'button' value = '取消' id = 'bandwidth_content_modifyBandWidth_but_cancel_"+thisIcCard+"'/></td></tr>";
	tabContent = tabContent + "</tbody></table>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "";
	// add by jhg end
	
	//回收设备状态选择选择框
	tabContent = tabContent + "<div id='equipment_content_equipment_recycle_"+thisIcCard+"' class='hide customer_group_search_dialog_class'>";
	tabContent = tabContent + "<div><span>请选择回收设备后的状态:</span><span><select></select></span></div>";
	tabContent = tabContent + "<div><input type='hidden' id='equipment_content_equipment_recycle_hidden_"+thisIcCard+"'/><input type='button' value='回收' id='equipment_content_equipment_recycle_but_submit_"+thisIcCard+"'/><input type='button' value='取消' id='equipment_content_equipment_recycle_but_cancel_"+thisIcCard+"'/></div>";
	tabContent = tabContent + "</div>";
	
	
	//绑定操作弹出隐藏区
	tabContent = tabContent + "<div id = 'equipment_content_equipment_binding_div_"+thisIcCard+"' class='hide customer_group_search_dialog_class'>";
//	tabContent = tabContent + "<div style='border-bottom:1px solid #000'>已绑定设备</div>";
	tabContent = tabContent + "<table id = 'equipment_content_equipment_binding_bindingTable_"+thisIcCard+"' class='tableBorder'>";
	tabContent = tabContent + "<thead style='text-align:center'>已绑定设备</thead>";
	tabContent = tabContent + "<tr><th>选择</th><th>智能卡号</th><th>终端名称</th><th>智能卡状态</th><th>机顶盒号</th><th>机顶盒状态</th></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<div><input id='equipment_content_equipment_binding_but_unbinding_"+thisIcCard+"' type = 'button' value = '解除绑定'/></div>";
	tabContent = tabContent + "<thead style='text-align:center;border-bottom:1px solid #000'>未绑定设备</thead>";
	tabContent = tabContent + "<table id = 'equipment_content_equipment_binding_cardTable_"+thisIcCard+"' style='float:left' class='tableBorder'>";
	tabContent = tabContent + "<tr><th>选择</th><th>智能卡号</th><th>终端名称</th><th>智能卡状态</th></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<table id = 'equipment_content_equipment_binding_stbTable_"+thisIcCard+"' class='tableBorder'>";
	tabContent = tabContent + "<tr><th>选择</th><th>机顶盒号</th><th>机顶盒状态</th></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<div  style='clear:both'><input id='equipment_content_equipment_binding_but_binding_"+thisIcCard+"' type = 'button' value = '机卡绑定'/><input id='equipment_content_equipment_binding_but_cancel_"+thisIcCard+"' type = 'button' value = '关闭'/></div>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "";
	
	//换卡，换机弹出隐藏区
	tabContent = tabContent + "<div id='equipment_content_equipment_change_div_"+thisIcCard+"' class='hide customer_group_search_dialog_class'>";
	tabContent = tabContent + "<table id = 'equipment_content_equipment_change_cardTable_"+thisIcCard+"' class='tableBorder'>";
	tabContent = tabContent + "<tr><!--th>选择</th--><th>智能卡号</th><th>终端名称</th><th>智能卡状态</th></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<table id = 'equipment_content_equipment_change_stbTable_"+thisIcCard+"' class='tableBorder'>";
	tabContent = tabContent + "<tr><!--th>选择</th--><th>机顶盒号</th><th>机顶盒状态</th></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<div><input type='hidden' id='equipment_content_equipment_change_equOther_"+thisIcCard+"'/><input type='hidden' id='equipment_content_equipment_change_equType_"+thisIcCard+"'/><input type='text' id='equipment_content_equipment_change_text_"+thisIcCard+"' /><select id = 'equipment_content_equipment_change_setBoxGetType_"+thisIcCard+"'>"+STB_GET_TYPE_HTML+"</select><input type='button' value='更换' id='equipment_content_equipment_change_but_change_"+thisIcCard+"'/><input type='button' value='取消' id='equipment_content_equipment_change_but_cancel_"+thisIcCard+"'/></div>";
	tabContent = tabContent + "</div>";
	
	
	// 设备服务升级操作弹出隐藏区 add by jhg 2013-08-20	
	tabContent = tabContent + "<div id='equipment_promotion_change_div_"+thisIcCard+"' class='hide customer_group_search_dialog_class'>";
	tabContent = tabContent + "<div class='dialog_title' id='equipment_promotion_title_"+thisIcCard+"'>";
	tabContent = tabContent + "<table background='../../../../common/images/bar_bg.gif' class='L style2' cellspacing='0' cellpadding='0' border='0'><tr><td width='30px'><img height='23' width='31' src='../../../../common/images/bar_left.gif'></td><th width='760px' align='left'><font size='20px'>设备服务升级</font></th><td width='10px'><span class='ui_icon dialog_close_icon' id='equipment_promotion_close_icon_"+thisIcCard+"'></span></td></tr></table></div>";
	tabContent = tabContent + "<table><tr><th>设备信息</th></tr></table>";
	tabContent = tabContent + "<table id='equipment_promotion_equTable_"+thisIcCard+"' width='800px' class='tableBorder'></table>";
	tabContent = tabContent + "<div id='checkEquValid_"+thisIcCard+"' class='hide'><table><tr><td><input id='equipment_checkInvalid_"+thisIcCard+"' type = 'button' value = '设备检测'/></td></tr></table></div>";
	tabContent = tabContent + "<table id='equipment_promotion_showEquInvalidTable_"+thisIcCard+"' width='800px'></table>";
	tabContent = tabContent + "<table id='equipment_promotion_equOrderTable_"+thisIcCard+"' width='800px' class='tableBorder'></table>";
	tabContent = tabContent + "<table id='equipment_promotion_equFeeTable_"+thisIcCard+"' width='300px'></table>";
	tabContent = tabContent + "<div><input type='button' value='确定升级' id='equipment_promotion_change_but_change_"+thisIcCard+"'/><input type='button' value='取消' id='equipment_promotion_change_but_cancel_"+thisIcCard+"'/></div>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "";
	
	// 服务补交操作弹出隐藏区 add by jhg 2013-09-05	
	tabContent = tabContent + "<div id='equipment_repair_fee_div_"+thisIcCard+"' class='hide customer_group_search_dialog_class'>";
	tabContent = tabContent + "<div class='dialog_title' id='equipment_repair_title_"+thisIcCard+"'>";
	tabContent = tabContent + "<table background='../../../../common/images/bar_bg.gif' class='L style2' cellspacing='0' cellpadding='0' border='0'><tr><td width='30px'><img height='23' width='31' src='../../../../common/images/bar_left.gif'></td><th width='760px' align='left'><font size='20px'>费用补交</font></th><td width='10px'><span class='ui_icon dialog_close_icon' id='equipment_repair_close_icon_"+thisIcCard+"'></span></td></tr></table></div>";
	tabContent = tabContent + "<table><tr><th>终端订购到期提示</th></tr></table>";
	tabContent = tabContent + "<table id='equipment_repairFee_showEquInvalidTable_"+thisIcCard+"' width='800px' class='tableBorder'></table>";
	tabContent = tabContent + "<div id='repairFeeCheckEquValid_"+thisIcCard+"' class='hide'><table><tr><td><input id='equipment_repairFee_checkInvalid_"+thisIcCard+"' type = 'button' value = '补充订购'/></td></tr></table></div>";
	tabContent = tabContent + "<table id='equipment_repairFee_equOrderTable_"+thisIcCard+"' width='800px' class='tableBorder'></table>";
	tabContent = tabContent + "<table id='equipment_repairFee_equFeeTable_"+thisIcCard+"' width='300px'></table>";
	tabContent = tabContent + "<div><input type='button' value='确定' id='equipment_repair_but_"+thisIcCard+"'/><input type='button' value='取消' id='equipment_repair_but_cancel_"+thisIcCard+"'/></div>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "";
	
	//订购产品弹出隐藏区
	tabContent = tabContent + "<div id='base_product_info_"+thisIcCard+"' class='hide dialog_product'></div>";
//	//订购产品退订弹出隐藏区
	tabContent = tabContent + "<div class='hide select_card_class' id= 'order_product_cancel_div_"+thisIcCard+"'>";
	tabContent = tabContent + "<div class='font14'>"+WebInitParameter.MSG_BUSI_C11+"</div>";
	tabContent = tabContent + "<table id = 'order_product_icCard_table_"+thisIcCard+"'></table>";
	tabContent = tabContent + "<div id ='checkboxGroup_orderEqu_"+thisIcCard+"'></div>";
	tabContent = tabContent + "<div><input type= 'button' value='退订' id='product_content_product_but_unsubscribe_but_unsubscribe_"+thisIcCard+"'/><input type='button' value = '取消' id ='product_content_product_but_unsubscribe_but_cancel_"+thisIcCard+"' /></div>";
	tabContent = tabContent + "";
	tabContent = tabContent + "";
	tabContent = tabContent + "</div>";
	
	//退订申请中产品弹出隐藏区
	tabContent = tabContent + "<div class='hide select_card_class' id= 'apply_order_product_cancel_div_"+thisIcCard+"'>";
	tabContent = tabContent + "<div class='font14'>"+WebInitParameter.MSG_BUSI_C11+"</div>";
	tabContent = tabContent + "<table id = 'order_product_icCard_table_"+thisIcCard+"'></table>";
	tabContent = tabContent + "<div id ='checkboxGroup_orderEqu_"+thisIcCard+"'></div>";
	tabContent = tabContent + "<div><input type= 'button' value='退订' id='product_content_product_but_unsubscribe_apply_but_unsubscribe_"+thisIcCard+"'/><input type='button' value = '取消' id ='product_content_product_but_unsubscribe_apply_but_cancel_"+thisIcCard+"' /></div>";
	tabContent = tabContent + "";
	tabContent = tabContent + "";
	tabContent = tabContent + "</div>";
	
	//过户弹出隐藏区
	tabContent = tabContent + "<div class='hide customer_group_search_dialog_class' id='other_content_customer_div_transfer_"+thisIcCard+"'>";
	tabContent = tabContent + "<div>请选择需要过户的终端组:</div>";
	tabContent = tabContent + "<table id='other_content_customer_table_transfer_equList_"+thisIcCard+"' class='tableBorder'>";
	tabContent = tabContent + "<tr><th>选择</th><th>智能卡号</th><th>终端名称</th><th>智能卡状态</th></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<div><br/>搜索接收用户:</div>";
	tabContent = tabContent + "<table id ='other_content_customer_table_transfer_"+thisIcCard+"'>";
	tabContent = tabContent + "<tr><td>用户名称:</td><td><input type='text' maxlength='100' class='input_text_"+thisIcCard+"' id='customer_name_transfer_"+thisIcCard+"'/></td><td>用户编号:</td><td><input class='input_text_"+thisIcCard+"' type='text' id='customer_coding_transfer_"+thisIcCard+"'/><input class='input_text' type='hidden' id='customer_id_transfer_"+thisIcCard+"'/></td><td></td></tr>";
	tabContent = tabContent + "<tr><td>联系人:</td><td><input type='text' class='input_text_"+thisIcCard+"' id ='customer_contact_transfer_"+thisIcCard+"'/></td><td>固定电话:</td><td><input type='text' class='input_text_"+thisIcCard+"' id='customer_phone_transfer_"+thisIcCard+"'/></td><td>移动电话:</td><td><input type='text' class='input_text_"+thisIcCard+"' id='customer_cellPhone_transfer_"+thisIcCard+"'/></td></tr>";
	tabContent = tabContent + "<tr><td colspan='6'><input type='button' id='other_content_customer_transfer_but_search_"+thisIcCard+"' value='搜索'/></td></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<div>查询结果</div>";
	tabContent = tabContent + "<table id ='other_content_customer_div_result_transfer_"+thisIcCard+"' class='tableBorder'>";
	tabContent = tabContent + "<tr><th>选择</th><th>用户账号</th><th>用户名称</th><th>联系人</th><th>固定电话</th><th>移动电话</th></tr>";
	tabContent = tabContent + "<tr><td colspan = '6'>"+WebInitParameter.MSG_BUSI_C19+"</td></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<div><input type='button' value='过户' id='other_content_customer_transfer_but_transfer_"+thisIcCard+"'/><input type='button' value='取消' id='other_content_customer_transfer_but_cancel_"+thisIcCard+"'/></div>";
	tabContent = tabContent + "</div>";

	//移机弹出隐藏区
	tabContent = tabContent + "<div class='hide customer_group_search_dialog_class'  id='other_content_customer_div_addrChange_"+thisIcCard+"'>";
	tabContent = tabContent + "";
	tabContent = tabContent + "";
	tabContent = tabContent + "";
	tabContent = tabContent + "<div><span>原有安装地址：</span><span>"+currentUserInfo.address+"</span></div>";
	tabContent = tabContent + "<div><span>更换为新地址：</span><span><input type='text' size='70' maxlength='100' class='input_text_"+thisIcCard+"'  id='customer_installAddress_addrChange_"+thisIcCard+"'/></span></div>";
	tabContent = tabContent + "<div><input type='checkbox' id = 'other_content_customer_div_addrChange_areaInfo_"+thisIcCard+"'/>更改片区</div>";
	tabContent = tabContent + "<div id='other_content_customer_div_addrChange_areaInfo_old_"+thisIcCard+"'><table><tr><td>一级片区：</td><td><select id ='customer_areaLevel1_other_content_customer_addrChange_"+thisIcCard+"' disabled='disabled'>"+currentUserInfo.areaLevel1Info+"</select></td><td>二级片区：</td><td><select id ='customer_areaLevel2_other_content_customer_addrChange_"+thisIcCard+"' disabled='disabled'>"+currentUserInfo.areaLevel2Info+"</select></td><td>三级片区：</td><td><select id ='customer_areaLevel3_other_content_customer_addrChange_"+thisIcCard+"' disabled='disabled'>"+currentUserInfo.areaLevel3Info+"</select></td></tr></table></div>";
	tabContent = tabContent + "<div><input type='button' value='移机' id='other_content_customer_addrChange_but_addrChange_"+thisIcCard+"'/><input type='button' value='取消' id='other_content_customer_addrChange_but_cancel_"+thisIcCard+"'/></div>";
	tabContent = tabContent + "</div>";
	
	//收费项确认隐藏区
	tabContent = tabContent + "<div class = 'hide confirm_cost_class' id ='confirm_cost_div_"+thisIcCard+"'>";
	tabContent = tabContent + "<div class='font14'></div>";
	tabContent = tabContent + "<table id = 'confirm_cost_table_"+thisIcCard+"'></table>";
	tabContent = tabContent + "<div style='border-top:#000 solid 1px;'><input type='button' value='继&nbsp;&nbsp;&nbsp;续' id='confirm_continue_"+thisIcCard+"' class ='bigButton'/><input type='button' value='返&nbsp;&nbsp;&nbsp;回' id='confirm_cancel_"+thisIcCard+"' class ='bigButton'/></div>";
	tabContent = tabContent + "</div>";
	
	//终端换组
//	tabContent = tabContent + "<div class='hide customer_group_search_dialog_class' id='equipment_content_equipment_trans_group_div_"+thisIcCard+"'>";
//	tabContent = tabContent + "<span>同组：</span><span><input type='radio' name='equipTrans_"+thisIcCard+"' checked='checked' id='equipment_content_equipment_equipTrans_radio_inGroup_"+thisIcCard+"'>是</span><span><input type='radio' name='equipTrans_"+thisIcCard+"' id='equipment_content_equipment_equipTrans_radio_outGroup_"+thisIcCard+"'>否</span>";
//	tabContent = tabContent + "<div><span> 目标终端组:</span><span><select id='equipment_content_equipment_equipTrans_select_group_"+thisIcCard+"'><option value='-1'>请选择组</option></select></span></div>";
//	tabContent = tabContent + "<div><span> 添加到末尾:</span><span><input type='radio' name='originalTrans_"+thisIcCard+"' checked='checked' id='equipment_content_equipment_equipTrans_radio_end_"+thisIcCard+"'>是</span><span><input type='radio' name='originalTrans_"+thisIcCard+"' id='equipment_content_equipment_equipTrans_radio_notEnd_"+thisIcCard+"'>否</span><span> 终端名称:</span><span><select id='equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard+"'><option value='-1'>请选择终端</option></select></span><!--span> 原终端变更:</span><select id='equipment_content_equipment_equipTrans_select_oriTransType_"+thisIcCard+"'><option>"+WebInitParameter.EQUIP_TRANS_TYPE_END_VALUE+"</option><option>"+WebInitParameter.EQUIP_TRANS_TYPE_TRANSPOSITION_VALUE+"</option><option>"+WebInitParameter.EQUIP_TRANS_TYPE_PUTOFF_VALUE+"</option></select></div>"
//	tabContent = tabContent + "<div><input type='button' value='确定' id='equipment_content_equipment_equipTrans_but_confirm_"+thisIcCard+"'/><input type='button' value='取消' id='equipment_content_equipment_equipTrans_but_cancel_"+thisIcCard+"'/></div>";
//	tabContent = tabContent + "</div>";

	tabContent = tabContent + "<div class='hide customer_group_search_dialog_class' id='equipment_content_equipment_trans_group_div_"+thisIcCard+"'>";
	tabContent = tabContent + "<div><span> 目标终端组:</span><span><select id='equipment_content_equipment_equipTrans_select_group_"+thisIcCard+"'></select></span></div>";
	tabContent = tabContent + "<div><span> 目标终端名称:</span><span><select id='equipment_content_equipment_equipTrans_select_terminal_"+thisIcCard+"'></select></span></div>"
	tabContent = tabContent + "<div><input type='button' value='确定' id='equipment_content_equipment_equipTrans_but_confirm_"+thisIcCard+"'/><input type='button' value='取消' id='equipment_content_equipment_equipTrans_but_cancel_"+thisIcCard+"'/></div>";
	tabContent = tabContent + "<input type='hidden' id='equipment_content_equipment_equipTrans_hidden_"+thisIcCard+"'/>";
	tabContent = tabContent + "</div>";
	
	//代扣资料审核 20110511 liuyajie
	tabContent = tabContent + "<div class='hide customer_group_search_dialog_class' id='customer_bankinfo_verify_div_"+thisIcCard+"'>";
	tabContent = tabContent + "<div><span>"+WebInitParameter.USER_INFO_RELATE_BANK+"<select id='customer_bankinfo_verify_select_relateBank_"+thisIcCard+"'  disabled='disabled' ></select></span></div>";
	tabContent = tabContent + "<div><span>"+WebInitParameter.USER_INFO_BANK_INFO+"<input class='input_text_"+thisIcCard+"' disabled='disabled' size='25' maxLength='25' type='text' id='customer_bankinfo_verify_text_bankInfo_"+thisIcCard+"' value='"+currentUserInfo.bankInfo+"'/></span></div>";
	tabContent = tabContent + "<div><span>代扣审核标识:<select id='customer_bankinfo_verify_select_verifyFlag_"+thisIcCard+"' disabled='disabled' ><option value='0'>未审核</option><option value='1'>审核通过</option><option value='2'>审核不通过</option></select></span></div>";
	tabContent = tabContent + "<div><span>审核时间:<input class='input_text_"+thisIcCard+"' disabled='disabled' type='text' id='customer_bankinfo_verify_text_date_"+thisIcCard+"'/></span></div>";
	tabContent = tabContent + "<div><span><input type='button' value='确定' id='customer_bankinfo_verify_button_cancel_"+thisIcCard+"' /></span></div>";
	tabContent = tabContent + "</div>";
	
	
	//发票弹出页面使用
	tabContent = tabContent + "<div id = 'invoice_content_showDiv_"+thisIcCard+"'></div>";
	
	//打印选择页面隐藏区
	tabContent = tabContent + "<div calss = 'hide print_choice_class' id ='print_choice_div_"+thisIcCard+"'>";
	tabContent = tabContent + "";
	tabContent = tabContent + "</div>";
	
	
	tabContent = tabContent + "<div id='print_back_"+thisIcCard+"'></div>";
	
	tabContent = tabContent + "";
	
	// 宽带帐号选号弹出界面 add by jhg
	tabContent = tabContent + "<div id = 'bwinfo_content_list_div_"+thisIcCard+"' class='hide customer_group_search_dialog_class' align='center'>";
	tabContent = tabContent + "<table id='queryBwInfoTable_"+thisIcCard+"' width='100%'>";
	tabContent = tabContent + "<tr align='center'><td width='150px'><input type='text' class='input_text' id = 'bwinfo_query_text_"+thisIcCard+"'/></td>" +
							  "<td width='50px'><input type = 'button' value = '查询' id = 'bwinfo_but_query_"+thisIcCard+"'/></td></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<table id='selectBwInfoTable_"+thisIcCard+"' width='100%' class='tableBorder'>";
	tabContent = tabContent + "<tr><th width='50px'>选择</th><th width='150px'>账户号</th></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<table id='bwInfoTable_"+thisIcCard+"' width='100%' class='tableBorder'></table>";
	tabContent = tabContent + "<table id='selectButTable_"+thisIcCard+"' width='100%'>";
	//tabContent = tabContent + "<hr>";
	tabContent = tabContent + "<tr align='left'><td width='50px'><input type = 'button' value = '确定' id = 'bwinfo_but_select_"+thisIcCard+"'/></td>" +
							  "<td width='150px'><input type = 'button' value = '取消' id = 'bwinfo_but_cancel_"
												+thisIcCard+"'/></td></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "";
	
	// 宽带账户充值弹出界面
	tabContent = tabContent + "<div id = 'bwinfo_content_fee_div_"+thisIcCard+"' class='hide customer_group_search_dialog_class' align='center'>";
	tabContent = tabContent + "<table id='bwFeeInfoTable_"+thisIcCard+"' width='100%'>";
	tabContent = tabContent + "<tr><td width='300px' colspan=3><table id='feeHitTable_"+thisIcCard+"' width='100%'></table></td></tr>"
	tabContent = tabContent + "<tr><td width='100px'>金额(单位:元):</td><td width='100px'>" +
							  "<input type='text' class='input_text' id='bandwidth_content_fee_"+thisIcCard+"' style='width:100px' />" +
							  "</td><td align='center' width='100px'><a id='bandwidth_content_feeHistory_"+thisIcCard+"' href='#'>历史记录</a></td></tr>";
	tabContent = tabContent + "</table><hr>";
	tabContent = tabContent + "<table id='base_feeHistoryTable_"+thisIcCard+"' width='100%' class='tableBorder'>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<table id='feeConfimeButTable_"+thisIcCard+"' width='100%'>";
	tabContent = tabContent + "<tr align='left'><td width='50px'><input type = 'button' value = '确定' id = 'bwinfo_but_fee_confime_"+thisIcCard+"'/></td>" +
							  "<td width='250px'><input type = 'button' value = '取消' id = 'bwinfo_but_fee_cancel_"+thisIcCard+"'/></td></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "";
	
	// 密码修改弹出界面
	tabContent = tabContent + "<div id = 'bwinfo_content_changepassword_div_"+thisIcCard+"' class='hide customer_group_search_dialog_class' align='center'>";
	tabContent = tabContent + "<table id='bwChangePasswordInfoTable_"+thisIcCard+"' width='100%'>";
	tabContent = tabContent + "<tr><td width='65px' align='right'>当前密码:</td><td width='100px'><input type ='password' id='bwinfo_but_readio_oldPW_"+thisIcCard+"'></td></tr>"
                            + "<tr><td width='65px' align='right'>新密码:</td><td width='100px'><input type ='password' id='bwinfo_but_readio_newPW1_"+thisIcCard+"'></td></tr>"
                            + "<tr><td width='65px' align='right'>确认新密码:</td><td width='100px'><input type ='password' id='bwinfo_but_readio_newPW2_"+thisIcCard+"'></td></tr>";
	tabContent = tabContent + "<table id='changePwConfimeButTable_"+thisIcCard+"' width='100%'>";
	tabContent = tabContent + "<tr align='left'><td width='50px'><input type = 'button' value = '确定' id = 'bwinfo_but_changepw_confime_"+thisIcCard+"'/></td>" +
							  "<td width='200'><input type = 'button' value = '取消' id = 'bwinfo_but_changepw_cancel_"+thisIcCard+"'/></td></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "";
	
	// 业务提交项表格信息
	tabContent = tabContent + "<div id='submit_operation_info_"+thisIcCard+"' class='hide customer_group_search_dialog_class'>";
	tabContent = tabContent + "<table id='base_submitTable_"+thisIcCard+"'  width='100%' class='tableBorder'>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<div id='submitButtomButtons_"+thisIcCard+"'><input type='button' value='确定' id='submitBwButton_"+thisIcCard+"'/><input type='button' value='取消' id='submit_bw_operation_cancel_"+thisIcCard+"'/></div>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "";
	
	// add by jhg 2013-03-18
	tabContent = tabContent + "<div id = 'product_content_product_div_"+thisIcCard+"' class='hide dialog_product'>";
	tabContent = tabContent + "<div class='dialog_product' id='cancel_product_info_"+thisIcCard+"' style='top: 0px; left: 0px;'>";
	tabContent = tabContent + "<div class='dialog_title' id='cancel_product_info_title_"+thisIcCard+"'>";
	tabContent = tabContent + "<span class='ui_icon dialog_close_icon' id='cancel_dialog_close_icon_"+thisIcCard+"'></span></div>";
	tabContent = tabContent + "<table id='product_content_selectTabel_"+thisIcCard+"' class='tableBorder productTable' width='880px' cellspacing='0' cellpadding='0' border='1'>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<div id='cancelOrderButtomButtons_"+thisIcCard+"' style='background-color:#FDF1DE;'>";
	tabContent = tabContent + "<table id='recedeTotalFee_"+thisIcCard+"' width='880px'>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<table id='cancelOrderButTable_"+thisIcCard+"' width='880px'>";
	tabContent = tabContent + "<tr><td align='center'><input type = 'button' value = '计算退费金额' id = 'product_content_product_but_recedeFee_submit_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type = 'button' value = '退订' id = 'product_content_product_but_unsubscribe_submit_"+thisIcCard+"'/>";
	tabContent = tabContent + "<input type = 'button' value = '取消' id = 'product_content_product_but_unsubscribe_cancel_"+thisIcCard+"'/></td></tr>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<table width='880px' cellspacing='0' cellpadding='0'>"+
								"<tr><td><font size='14' color='red'>退还费用计算规则说明：" +
								"<br>1、计算方式为计算收费时，计算退订的当前时间与订购服务的生效时间相差的天数，将天数换算成相应的年、月、天。退还费用等于订购费用减去需要扣除的费用。" +
								"<br>&nbsp&nbsp&nbsp&nbsp计算公式：退还费用=订购费用-(年x年标准计费+月x月标准计费+天x天标准计费)" +
								"<br>2、计算方式为计算退费时，计算退订的当前时间与订购服务的失效时间相差的天数，将天数换算成相应的年、月、天。退还费用等于根据未使用时间计算出的费用。" +
								"<br>&nbsp&nbsp&nbsp&nbsp计算公式：退还费用=年x年标准计费+月x月标准计费+天x天标准计费" +
								"<br>注意：套餐退订时不采用此退费规则；双击退还费用可以修改退费金额，对于申请中、未生效或者已到期的订购，不能修改退费金额！</font></td></tr></table>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "";
	
	// 终端订购同步操作弹出隐藏区 add by jhg 2013-07-19
	tabContent = tabContent + "<div id = 'equipment_content_equipment_syncOrder_div_"+thisIcCard+"' class='hide dialog_showOrderProduct'>";
	tabContent = tabContent + "<div class='dialog_showOrderProduct' id='equipment_syncOrder_info_"+thisIcCard+"'>";
	tabContent = tabContent + "<div class='dialog_title' id='equipment_syncOrder_info_title_"+thisIcCard+"'>";
	tabContent = tabContent + "<span class='ui_icon dialog_close_icon' id='equipment_syncOrder_close_icon_"+thisIcCard+"'></span></div>";
	tabContent = tabContent + "<div><table width='800px'><tr><td width='225px'><input type ='radio' name='selectEqu_"+thisIcCard+"' checked='checked' id='equipment_content_equipment_selectEqu_readio_"+thisIcCard+"'>选择终端(请选择需要同步的终端)</input></td><td width='575px'><input type ='radio' name='selectEqu_"+thisIcCard+"' id='equipment_content_equipment_allEqu_readio_"+thisIcCard+"'>所有终端</input></td></tr></table></div>";
	tabContent = tabContent + "<div><table width='800px' id='supplyProductPageTableBar_"+thisIcCard+"'></table></div>";
	tabContent = tabContent + "<table width='800px' bgcolor='#FDF1DE' id='equipment_content_equipment_syncOrderTable_"+thisIcCard+"' class='tableBorder'>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<div><table width='800px' bgcolor='#CCCCCC'><tr><td width='200px'>显示订购及到期时间</td><td width='100px'>最大到期时间：</td><td width='500px'><input type='text' value='' id ='order_contnet_maxExpiryDate_"+thisIcCard+"' size='12' maxlength='20' onfocus=\"WdatePicker(  )\" class='Wdate'/></td></tr></table></div>";
	tabContent = tabContent + "<table width='800px' bgcolor='#FDF1DE' id = 'equipment_content_equipment_orderInfo_cardTable_"+thisIcCard+"' class='tableBorder'>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<div id='syncOrder_checkIds_"+thisIcCard+"' class='hide'><table><tr><td><input id='equipment_content_equipment_viewSyncOrder_"+thisIcCard+"' type = 'button' value = '订购预览'/></td>"
							+ "<td><input id='equipment_content_equipment_closeSyncOrder_"+thisIcCard+"' type = 'button' value = '关闭预览'/></td></tr></table></div>";
	tabContent = tabContent + "<table bgcolor='#FDF1DE' width='800px' id = 'equipment_content_equipment_syncOrderInfo_cardTable_"+thisIcCard+"' class='tableBorder'>";
	tabContent = tabContent + "</table>";
	tabContent = tabContent + "<div  style='clear:both'><table><tr><td><input id='equipment_content_equipment_syncOrder_sub_"+thisIcCard+"' type = 'button' value = '确认'/></td><td><input id='equipment_content_equipment_syncOrder_but_cancel_"+thisIcCard+"' type = 'button' value = '取消'/></td></tr></table></div>";
	tabContent = tabContent + "</div>";
	tabContent = tabContent + "";
	
	tabContent = tabContent + "";
	
	return tabContent;
}