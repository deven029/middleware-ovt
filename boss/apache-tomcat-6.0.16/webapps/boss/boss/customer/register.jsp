<%@ page contentType="text/html; charset=utf-8" import="com.ovt.idtv.boss.web.editType.popupSelect.CardInputTypeEditType;" %>
<html>
	<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
			<!-- link type="text/css" href="<%=request.getContextPath()%>/boss/customer/css/start/jquery-ui-1.8.custom.css" rel="stylesheet" /-->	
			<link type="text/css" href="<%=request.getContextPath()%>/boss/customer/css/customer/style.css" rel="stylesheet" />	
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery-1.4.2.min.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_plugin.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_parameter.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_common.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_product.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_information.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_userSeacher.js"></script>
			<!-- add by jhg -->
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_equipment.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_authorize.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_bandwidth.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_business_content.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_receipt.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_invoice.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_register.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/boss/popupSelectFrame/js/jquery_popup_select_frame.js"></script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/common/datepicker/WdatePicker.js"></script>
			
	</head>
	<body>
	<div>
		<div id = "showRegister">
			<div id="info_title" class="info_title">用户基本信息<span id="reg_title_icon" class="ui_icon open_icon"></span></div>
			<div id = "info_content">
				<form name="customer_base" id="customer_base" method="post">
					<div id='customer_base_table'>
						
					</div>
					<div id="agent_title" class="info_title">经办人信息<span id="agent_title_icon" class="ui_icon open_icon"></span></div>
					<div id="agent_info" >
					
					</div>
					<table>
						<tr><!--td><input type="button" name="submit" value="保存" id="customer_base_save"/></td--><td><input type="reset" name="reset" value="清空"/></td></tr>
					</table>
				</form>			
			</div>
			<div id="equipment_title" class="info_title">增加设备<span id="equipment_title_icon" class="ui_icon open_icon"></span></div>			
			<table id="equipment_info" width="100%">
				<tr>
					<td>
						<table id="equipmentTable">
							<!-- 2012-11-8 使用弹出显示框 yzy -->
							<tr onclick="cardInputTypeInit()" >
							<td>输入方式：
							<input id="cardInputTypeInit" type="hidden" value="0"/>
							<%CardInputTypeEditType inputType = new CardInputTypeEditType(request); %>
							<%=inputType.getHTML(true,false,"cardInputTypeSelect",null) %>
							</td>
							<td>智能卡号:</td><td><input type="text" onblur="inputValueFinish('icCardValue',function(){inputEquNoCheckFunc('icCardValue');})" onkeyup="cusKeyPress('icCardValue','<%=request.getContextPath()%>')" class="input_text" id="icCardValue"/><input type='text' class='input_text_model' id='icCardModel' /></td>
							<td>机顶盒号:</td><td><input type="text" onblur="inputValueFinish('setBoxValue',function(){inputEquNoCheckFunc('setBoxValue');})" onkeyup="cusKeyPress('setBoxValue','<%=request.getContextPath()%>')" class="input_text"  id="setBoxValue"/><input type='text' class='input_text_model' id='stbModel' /></td><!-- td>机顶盒来源:</td --><td><select id="setBoxGetType"><option value="1">请选择</option><!-- option value="0">赠送</option><option value="1">购买</option><option value="2">自购</option --></select>
							<div id="cusDiv" class="upHideDiv" > <div id="cusShowDiv"  ></div></div>
							</td>
							</tr>
							<tr><td><input type="checkbox" id="icBoxBinding" />机卡绑定</td><td colspan = "5"><input type="radio" name = "setBoxType" value="0" checked="checked" id= "setBoxTypeMain"/>主终端<input type="radio" name = "setBoxType" value="1" id= "setBoxTypeSecondary"/>副终端<select id="setBoxTypeSecondarySelect" disabled="disabled"><option value="-1">选择主终端</option></select></td></tr>
						</table>
					</td>
				</tr>
				<tr>
					<td><input type="button" value="添加" id="addEquipmentRecord"/></td>
				</tr>
				<tr><td>已选择设备</td></tr>
				<tr>
					<td>
						<table id="selectedEquipmentTable" width="100%" class="tableBorder">
							<!-- tr id="selectedEquipmentTable_top"><th>选择</th><th>智能卡号</th><th>终端名称</th><th>机顶盒号</th><th>来源</th><th>机卡绑定</th><th>订购信息</th></tr -->
						</table>
					</td>
				</tr>
				<tr>	
					<td><input type="button" value="删除所选" id="delEquipmentRecord"/><input type='button' id='addBaseProductButtonInEquipment' value='订购产品'/></td>
				</tr>
			</table>
			 
			<div id="product_base_title" class="info_title">订购产品<span id="product_base_title_icon" class="ui_icon open_icon"></span></div>			
			<table id="product_base_info" width="100%">
				<tr><td><input type="button" id="addBaseProductButton" value="订购产品"/></td></tr>
				<tr><td colspan="5">已选产品</td></tr>
				<tr>
					<td colspan="5">
						<div id='productOrderDiv'></div>
					</td>
				</tr>
				<tr>
					<td colspan="5">
						<table>
							<tr><td><input type="button" value="删除所选" id="delBaseProduct"/></td></tr>
						</table>
					</td>
				</tr>
			</table>		

			<!-- 
			<div id="product_valuable_title" class="info_title">订购增值产品<span id="product_valuable_title_icon" class="ui_icon close_icon"></span></div>			
			<table id="product_valuable_info" width="100%">
				<tr><td><input type="button" id="addValuableProductButton" value="添加增值产品"/></td></tr>
				<tr><td colspan="5">已选增值产品</td></tr>
				<tr>
					<td colspan="5">
						<table width="100%" id="selectedValuableProductTable"  class="tableBorder">
							<tr><th>选择</th><th>智能卡号</th><th>产品编号</th><th>产品名称</th><th>产品类型</th><th>产品描述</th><th>计费策略</th><th>单价</th></tr>
						</table>
					</td>
				</tr>
				
				<tr>
					<td colspan="5">
						<table>
							<tr><td>第一页</td><td>上一页</td><td>下一页</td><td>第末页</td><td>跳到</td><td><input type="text" size="2"/></td><td>页GO</td></tr>
						</table>
					</td>
				</tr>
				 
				<tr>
					<td colspan="5">
						<table>
							<tr><td><input type="button" value="删除所选" id="delValuableProduct"/></td></tr>
						</table>
					</td>
				</tr>
			</table>
			-->
			<div style="border-top:2px solid #000;text-align:center"><!--input type="button" value="保&nbsp;&nbsp;&nbsp;存" id="saveAllInformation"/--><input type="button" value="保&nbsp;&nbsp;&nbsp;存" id="confirmBut" class="bigButton"/><!-- input type="button" value="打印开户信息" id="printAllInformation"/ --></div>

			
			<!-- 订购基本产品隐藏页 -->
			<div id="base_product_info" class="hide dialog_product">
				<!--div id="base_product_info_title" class="dialog_title"><span id="base_dialog_close_icon" class="ui_icon dialog_close_icon"></span></div>
				<table>
					<tr><td><span><input type="radio" name="filter" checked="checked" id="base_product_all"/>全部</span><span><input type="radio" name="filter" id="base_product_ten" />购买TOP10</span><span><input type="radio" id="base_product_part" name="filter" />过滤</span><span><span id="filterSpan">产品名称:<input type="text" class="input_text" id="base_product_filterName" disabled="disabled"/>类型:<select id="base_product_filterType" disabled="disabled"><option value="-1">请选择</option><option value="套餐">套餐</option><option value="服务">服务</option></select>计费策略:<input type="text" class="input_text" id="base_product_filterPolicy" disabled="disabled"/></span></span><span><input type="button" value="搜索" id="base_product_filterSearch" disabled="disabled"/></span></td></tr>
					<tr><td>
						<table id="base_productTable"  width="100%" class="tableBorder">
							<tr><th>选择</th><th>编号</th><th>商品名称</th><th>类型</th><th>内容</th><th>计费策略</th></tr>
						</table>
					</td></tr>
				</table>
				<div><input type="checkbox" id="proCheckAll"/>全选<input type="checkbox" id="proCancelAll"/>全不选<input type="checkbox" id="proCheckOther"/>反选<input type="button" id="selectEqu" value = "选择终端"/></div>
				<div><input type="button" value="取消" id="base_product_info_cancelButton"/></div-->
			</div>
			
			<!-- 订购增值产品隐藏页 -->
			<!-- 
			<div id="valuable_product_info" class="hide dialog_product">
				<div class="dialog_title"><span id="valuable_dialog_close_icon" class="ui_icon dialog_close_icon"></span></div>
				<table id="valuable_product_info_table">
					<tr><td colspan="2">可用产品</td><td colspan="3">选择购买产品的智能卡:<select id="valuable_selectedProductIcCard"><option value="-1">请选择……</option></select></td></tr>
					<tr><td><input type="radio" name="filter" checked="checked" id="valuable_product_all"/>全部</td><td><input type="radio" name="filter" id="valuable_product_ten" />购买TOP10</td><td><input type="radio" id="valuable_product_part" name="filter" />过滤</td><td><span id="valuable_filterSpan">产品名称:<input type="text" class="input_text" id="valuable_product_filterName" disabled="disabled"/>产品类型:<select id="valuable_product_filterType" disabled="disabled"><option value="-1">请选择</option><option value="套餐">套餐</option><option value="服务">服务</option></select>计费策略:<input type="text" class="input_text" id="valuable_product_filterPolicy" disabled="disabled"/></span></td><td><input type="button" value="搜索" id="valuable_product_filterSearch" disabled="disabled"/></td></tr>
					<tr>
						<td colspan="5">
							<table id="valuable_productTable"  width="100%" class="tableBorder">
								<tr><th>选择</th><th>产品编号</th><th>产品名称</th><th>产品类型</th><th>产品描述</th><th>计费策略</th><th>单价</th></tr>
								<!-- 
								<tr><td><input type="checkbox"/></td><td>5001</td><td>基本节目(36套)</td><td>服务</td><td>包含36套基本节目信息</td><td>按月计费</td><td>15.00元/月</td></tr>
								<tr><td><input type="checkbox"/></td><td>5002</td><td>基本节目(48套)</td><td>服务</td><td>包含48套基本节目信息</td><td>按月计费</td><td>25.00元/月</td></tr>
								
							</table>
						</td>
					</tr>
					
					<tr>
						<td colspan="5">
							<table >
								<tr><td>第一页</td><td>上一页</td><td>下一页</td><td>第末页</td><td>跳到</td><td><input type="text" size="2"/></td><td>页GO</td></tr>
							</table>
						</td>
					</tr>
					 
					<tr>
						<td colspan="5">
							<table>
								<tr>
									<td><input type="button" value="添加" id="valuable_product_info_addButton"/></td>
									<td><input type="button" value="取消" id="valuable_product_info_cancelButton"/></td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</div>
			-->
			<!-- 用户集团选择弹出搜索使用  -->
			<div class="hide customer_group_search_dialog_class" id="customer_group_search_dialog">
				<table>
					<tr><td>集团名称:</td><td><input type="text" size="20" maxlength="100" id="customer_group_search_name"></td><td><input type="button" value="查找" id="customer_group_but_search"/></td></tr>
				</table>
				<table id="customer_group_search_result" class="tableBorder">
					<!-- 
					<tr><td><input type='radio' name ='customer_group_name' value='11102131230123'></td><td colspan = '2'>东方广视科技股份有限公司</td></tr>
					 -->
				</table>
				<table>
					<tr><td colspan = "3"><input type="button" id="customer_group_but_clear" value="清空"><input type="button" id="customer_group_but_cancel" value="取消"></td></tr>
				</table>
			</div>
			
			<!-- 缴费使用页面 -->
			<div class = "hide confirm_cost_class" id ="confirm_cost_div">
				<div class="font14"></div>
				<table id = "confirm_cost_table"></table>
				<div class="border_top"><input type="button" value="继&nbsp;&nbsp;&nbsp;续" id="confirm_continue" class ="bigButton"/><input type="button" value="返&nbsp;&nbsp;&nbsp;回" id="confirm_cancel" class ="bigButton"/></div>
			</div>
			<!-- 智能卡选择页面 -->
			<!--div class = "hide select_card_class" id = "select_equ_div">
				<div class="font14"></div>
				<table id= "select_equ_table" class="tableBorder1"></table>
				<div><input type="checkbox" id="checkAllEqu"/>全选<input type="checkbox" id="cancelAllEqu"/>全不选<input type="checkbox" id="checkOtherEqu"/>反选</div>
				<div><input type ="button" value="确定" id = "select_equ_but_selected"/><input type ="button" value="取消" id = "select_equ_but_cancel"/></div>
			</div-->
			
			<!-- 存储选择设备变量使用 -->
			<div class="hide"><table id="icCardVar"></table></div>		
			<!-- 存储选择设备变量使用--修改后使用 -->	
			<div id='equVarDiv'></div>
			<!-- 存储订购隐藏变量使用 -->	
			<div id='proVarDiv'></div>
			<!-- 存储产品选择信息 -->
			<!--div class="hide1"><table id = "productVar"></table></div-->
			<!-- 缴费使用页面 -->
			<div class='payment_class hide' id='tab_content'></div>
			<!-- 提示信息使用层 -->
			<div id="message"><span id="message_icon" class=""></span><span id="message_content"></span></div>
			<div id="mask"><iframe id='mask_iframe' frameborder = "0" height ="100%" width="100%"></iframe></div>
			</div>
			<div id="tab_title"></div>
			<div id="tab_main" class="width_height">
			</div>
		</div>
	</body>
</html>