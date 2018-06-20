//ajax请求地址
var ajaxRegPath="../../../../jsp/boss/customer/register/";//开户action地址
var ajaxBusPath="../../../../jsp/boss/customer/baseBusiness/";//搜索和设备action地址
var ajaxProPath="../../../../jsp/boss/customer/productBusiness/";//产品action地址
var ajaxEquPath="../../../../jsp/boss/customer/equService/";//设备操作action地址
var ajaxPrintPath = "../../../../ajaxReportServlet.do?method=toPrint";//打印地址
var ajaxInvoicePath = "../../../../jsp/boss/customer/invoiceBusiness/";//发票地址
var ajaxReceiptPath = "../../../../jsp/boss/customer/receiptBusiness/";//营业收入地址
// add by jhg
var ajaxBwPath="../../../../jsp/boss/customer/bwService/";//宽带账户操作action地址

//公共参数配置
var InitDate = new Date();
var today = InitDate.getFullYear()+"-"+(InitDate.getMonth()<10?"0"+(InitDate.getMonth()+1):(InitDate.getMonth()+1))+"-"+(InitDate.getDay()<10?"0"+(InitDate.getDay()+1):(InitDate.getDay()+1));
var WebInitParameter = {
		SEARCH_MAX_TAB_NUM :6,
		IC_GROUP_MAX_LENGTH:3,
		IC_GROUP_HAS_SIZE:3,
		BINDING_TYPE_UNBINDING:"未绑定",
		BINDING_TYPE_BINDING:"已绑定",
		GROUP_VALUE_MAIN:"主终端",
		GROUP_VALUE_SLAVE:"副终端",
		CHINESE_SEQ:"第",
		CHINESE_GROUP:"组",
		PRODUCT_TYPE_SERVICE_NAME:"服务",
		PRODUCT_TYPE_COMBO_NAME:"套餐",
		PRODUCT_SERVICE_SCOPE_BASE_NAME:"基本服务",
		PRODUCT_SERVICE_SCOPE_VALUABLE_NAME:"增值服务",
		PRODUCT_COMBO_SCOPE_BASE_NAME:"包含基本服务",
		PRODUCT_COMBO_SCOPE_VALUABLE_NAME:"不含基本服务",
		CONFIRM_SHOW:0,
		DEBUG_MODE:"hide",
		IS_PRINT:"yes",
		DEFAULT_PRINTER:"yes",
		TODAY:today,
		LOGINNO:"",
		INVOICE_VALID_STATUS_NORMAL:"0",
		INVOICE_VALID_STATUS_DISCARD:"1",
		INVOICE_VALID_STATUS_RED:"3",//发票状态冲红 2012-4-25 yzy
		INVOICE_PRINT_STATUS_UNPRINT:"0",
		INVOICE_PRINT_STATUS_FAILURE:"1",
		INVOICE_PRINT_STATUS_SUCCESS:"2",
		
		//文本框验证的正则表达式
		CUSTOMER_EMAIL_VILIDATE_REGEX:/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
		CUSTOMER_MOBILE_VILIDATE_REGEX:/^\d{11}$/,///^((\(\d{3}\))|(\d{3}\-))?13\d{9}|15[0-9]\d{8}$/
		CUSTOMER_TEL_VILIDATE_REGEX:/^((\d{2,4}-)?(\d{6,9}-?)(\d+$))/,///^(([0\+]\d{2,3}-)?(0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?/
		CUSTOMER_BANK_ACCOUNT_VILIDATE_REGEX:/^\d{10,25}$/,
		INPUT_DIGITAL_VILIGATE_REGEX:/^\d{1,4}$/,
		
		
		//订购信息状态，判断是否可以勾选
		ORDER_STATUS_APPLY :0,
		ORDER_STATUS_STOP :4,
		
		//账户变动历史类型常量
		PAYMENT_TYPE_CHARGE : "1",//缴费
		PAYMENT_TYPE_RECHARGE : "2",//充值
		
		//缴费类型，只有如下两个常量才可以进行发票的打印操作
		OPER_TYPE_PAYMENT:"0",//
		OPER_TYPE_BUY_EQU:"3",//
		
		//账户变动历史未打印的常量，发票打印状态
		INVOICE_STATUS_UNRELATIVE_INVOICE : "0",
		INVOICE_STATUS_NO_PRINT : "1",
		INVOICE_STATUS_PRINT_PREVIEW : "2",
		INVOICE_STATUS_PRINT_SUCCESS : "3",
		INVOICE_STATUS_PRINT_FAILURE : "4",
		
		
		//发票有效状态
//		INVOICE_VALID_STATUS : "0",
		
		ORDER_VIEW_TYPE:"2",
		
		ORDER_VIEW_TYPE_V1:"1",
		ORDER_VIEW_TYPE_V2:"2",
		
		//第一组终端是否显示组号
		FIRST_GROUP_NAME:"0",
		FIRST_GROUP_NAME_DISPLAY:"0",
		FIRST_GROUP_NAME_HIDE:"1",
		
		AUTO_ADD_AREA:"0",
		AUTO_ADD_AREA_ON:"0",
		AUTO_ADD_AREA_OFF:"1",
		
		BILL_DETAIL_HEIGHT:"80",
		ORDER_UNNORMAL_HEIGHT:"120",
		EQU_SELECTED_COUNT:"6",
		PAYMENT_FEE_ITEM_SELECTED_COUNT:"3",
		
		ADD_EQU_CONFINE:"no",
		ADD_EQU_CONFINE_YES:"yes",
		RESIDENT:"0",
		RECYLE_EQU_STATUS:"0,1,2,3,4,5,6,7,8,99",
		
		
		//终端切换和换组
		EQUIP_TRANS_TYPE_TRANSPOSITION_VALUE:"对调",
		EQUIP_TRANS_TYPE_END_VALUE:"置尾",
		EQUIP_TRANS_TYPE_PUTOFF_VALUE:"顺延",
		
		//收费项不允许编辑
		FEE_ITEM_DEFINE_READONLY:"0",
		
		//缴费类型，0：现金，1：刷卡，2：转账
		PAYMENT_TYPE_CASH:0,
		PAYMENT_TYPE_PUNCH_CARD:1,
		PAYMENT_TYPE_TRANSFER_ACCOUNT:2,
		
		//显示收费项
		DISPLAY_FEE_ITEM:'0',
		
		//特殊的缴费收费项
		BASE_SERVICE_FEE:"107",
		
		//设备有效状态
		IC_VALID_VALUE:"1",
		STB_VALID_VALUE:"1",
		
		//是否默认选择机卡绑定,
		STB_IC_BAND_BAND:"1",
		STB_IC_BAND_UNBAND:"0",
		
		//自动生成用户编号 
		AUTO_ADD_USER_CODE_ON:"1", // 按一级片区自动生成用户编号
		AUTO_ADD_USER_CODE_CLOSE:"0", // 关闭
		AUTO_ADD_USER_CODE_BY_SECOND_AREA:"2", // 按二级片区自动生成用户编号  2012-10-30 add by liuxu
		AUTO_ADD_USER_CODE_WITH_SECOND_AREA:"3", //自动填充二级片区到用户编号 2012-10-30 add by liuxu
		
		OPERATION_CONFIRM:"yes",
		
		MSG_INFO_C01:"保存用户信息成功！",
		MSG_INFO_C02:"保存用户信息出现错误，",
		MSG_INFO_C03:"请输入正确的页数！",
		MSG_INFO_C04:"请确认收费项目",
		MSG_INFO_C05:"请选择需要购买的产品！",
		MSG_INFO_C06:"获取参数失败！请检查网络是否正常！",
		MSG_INFO_C07:"请输入缴费的金额！",
		MSG_INFO_C08:"发票信息不能为空！",
		MSG_INFO_C09:"请输入用户名称！",
		MSG_INFO_C10:"请输入用户编号！",
		MSG_INFO_C11:"请输入正确的电子邮箱！",
		MSG_INFO_C12:"请输入正确的固定电话号码！",
		MSG_INFO_C13:"请输入正确的移动电话号码！",
		MSG_INFO_C14:"请输入用户账号！",
		MSG_EQU_C01:"现在还没有主终端！",
		MSG_EQU_C02:"该终端已经存在，不能重复增加！",
		MSG_EQU_C03:"已经超出主终端的数量，不能增加新的主终端！",
		MSG_EQU_C04:"已经超出该主终端下副终端的数量，不能增加新的副终端！",
		MSG_EQU_C05:"智能卡号不能为空！",
		MSG_EQU_C06:"您选择添加副终端，但是没有选择隶属主终端，请选择正确的主终端！",
		MSG_EQU_C07:"请先删除后面的副终端！",
		MSG_EQU_C08:"请先删除后面的主终端！",
		MSG_EQU_C09:"请输入智能卡号！",
		MSG_EQU_C10:"请输入机顶盒号！",
		MSG_EQU_C11:"请选择购买产品的智能卡！",
		MSG_EQU_C12:"请选择需要删除的产品！",
		MSG_EQU_C13:"设备不能同时为空！",
		MSG_EQU_C14:"现在还没有智能卡，请先添加智能卡！",
		MSG_EQU_C15:"智能卡已经购买了产品，再未删除这些产品时，不能删除该智能卡！",
		MSG_EQU_C16:"继续订购产品？",
		MSG_EQU_C17:"非居民用户只能增加主终端！",
		MSG_EQU_C18:"没有可以订购的智能卡！",
		MSG_EQU_C19:"用户需要更换的设备不存在！",//用户没有智能卡时不能做换卡操作， 用户没有机顶盒不能做换机操作。2012-4-25 yzy
		MSG_SHOW_C01:"用户基本信息保存",
		MSG_SHOW_C02:"用户开户信息保存",
		MSG_BUSI_C01:"超过同时处理用户的数量限制，请先关闭已经处理完成的用户标签",
		MSG_BUSI_C02:"请选择包含需要操作的行！",
		MSG_BUSI_C03:"请输入替换的设备号码",
		MSG_BUSI_C04:"解除绑定失败:",
		MSG_BUSI_C05:"请选择需要绑定的智能卡！",
		MSG_BUSI_C06:"请选择需要绑定的机顶盒！",
		MSG_BUSI_C07:"绑定失败:",
		MSG_BUSI_C08:"只能选择一个设备进行更换！",
		MSG_BUSI_C09:"请选择需要退订的产品！",
		MSG_BUSI_C10:"只能选择1个退订的产品！",
		MSG_BUSI_C11:"请选择退订产品的智能卡！",
		MSG_BUSI_C12:"请选择适合操作的智能卡！",
		MSG_BUSI_C13:"请选择需要过户的终端组！",
		MSG_BUSI_C14:"请选择接收的用户！",
		MSG_BUSI_C15:"请填写移机到的新地址！",
		MSG_BUSI_C16:"移机到的新地址不能和原有的地址相同！",
		MSG_BUSI_C17:"请按顺序注销智能卡！",
		MSG_BUSI_C18:"请选择需要删除的发票项目！",
		MSG_BUSI_C19:"没有找到相应的用户",
		MSG_BUSI_C20:"搜索结果过多，当前只显示部分结果，如果没有需要的结果，建议增加搜索条件重新搜索",
		MSG_BUSI_C21:"请选择要执行操作的缴费历史信息！",
		MSG_BUSI_C22:"请选择需要打印发票的变动历史！",
		MSG_BUSI_C23:"请选择需要打印的登记单！",
		MSG_BUSI_C24:"至少需要一个发票项",
		MSG_BUSI_C25:"请选择要执行操作的发票！",
		MSG_BUSI_C26:"请输入需要保存的发票号码！",
		MSG_BUSI_C27:"该发票已经包含发票号码，不能进行回填操作！",
		MSG_BUSI_C28:"该发票已经是作废状态的发票，不能进行作废操作！",
		MSG_BUSI_C29:"有效状态不是正常的发票不能进行此操作！",
		MSG_BUSI_C30:"发票打印状态不是可以打印的状态，不能打印！",
		MSG_BUSI_C31:"发票已经作废，不能再次作废！",
		MSG_BUSI_C32:"发票项目费用汇总，与发票总额不符！",
		MSG_BUSI_C33:"设备回收成功！",
		MSG_BUSI_C34:"设备回收失败！",
		//终端换组
		MSG_BUSI_C35:"对终端操作成功！",
		MSG_BUSI_C36:"对终端操作失败！",
		MSG_BUSI_C37:"请选中两个终端执行对调操作！",
		MSG_BUSI_C38:"只能选中一个终端执行换组操作！",
		MSG_BUSI_C39:"终端换组失败,相同的终端换组！",
		MSG_BUSI_C40:"终端换组失败，请保证换组后主终端存在！",
		MSG_BUSI_C41:"不能低于允许输入折扣的最低值！",
		MSG_BUSI_C42:"不能输入大于10的折扣！",
		MSG_BUSI_C43:"不能低于允许输入的最低值！",
		MSG_BUSI_C44:"不能高于该策略的原价格！",
		MSG_BUSI_C45:"无法完成该回收操作！",
		MSG_BUSI_C46:"执行银行代扣资料审核失败！",
		MSG_BUSI_C47:"执行银行代扣资料审核成功！",
		MSG_BUSI_C48:"冲红发票不能作废！",//发票状态冲红 2012-4-25 yzy
		
		
		USER_INFO_NAME:"用户名称:",
		USER_INFO_USER_CODING:"用户编号:",
		USER_INFO_ACCOUNT_NO:"用户账号:",
		USER_INFO_STATUS:"用户状态:",
		USER_INFO_TYPE:"用户类型:",
		USER_INFO_BUSINESS_TYPES:"业务类型:",// liuxu 2012/5/7
		USER_INFO_AREA_LEVEL1:"一级片区:",
		USER_INFO_AREA_LEVEL2:"二级片区:",
		USER_INFO_AREA_LEVEL3:"三级片区:",
		USER_INFO_ADDRESS:"安装地址:",
		USER_INFO_POSTCODE:"邮政编码:",
		USER_INFO_TEL:"固定电话:",
		USER_INFO_MOBILE:"移动电话:",
		USER_INFO_EMAIL:"电子邮箱:",
		USER_INFO_IDENTITY_TYPE:"证件类型:",
		USER_INFO_MESSAGE_ADDRESS:"联系地址:",
		USER_INFO_MESSAGE_POSTCODE:"邮政编码:",
		USER_INFO_IDENTITY_CARD:"证件号码:",
		USER_INFO_BANK_INFO:"银行账号:",
		USER_INFO_VALID_STATUS:"有效状态:",
		USER_INFO_RELATE_BANK:"代扣银行:",
		USER_INFO_CONTACT:"联系人:",
		USER_INFO_IC_NO:"智能卡号:",
		USER_INFO_IC_NO:"机顶盒号:",
		USER_INFO_REGISTER_DATE:"开户时间:",
		USER_INFO_REMARK:"备注:",
		AGENT_INFO_NAME:"姓          名:",
		AGENT_INFO_IDENTITY_TYPE:"证件类型:",
		AGENT_INFO_IDENTITY_CARD:"证件号码:",
		AGENT_INFO_MESSAGE_ADDRESS:"联系地址:",
		AGENT_INFO_TEL:"固定电话:",
		AGENT_INFO_MOBILE:"移动电话:",
		
		//终端换组--新建组信息
		USER_EQUP_TRANSFER:"新建组",
		USER_EQUP_TRANSFER_VALUE:"-2"
};

//--------------------------------------------初始化页面参数-----------------------------------------------------
function webInit(callbackFunc){
$("#message_content").text("正在进行初始化操作，请稍等……");
$("#message_icon").addClass("message_submit");
ovtAjaxMethod(ajaxRegPath+"ajaxInitParameter.do",function(data){
	if(data.code == "0"){
		WebInitParameter.SEARCH_MAX_TAB_NUM = data.value.searchMaxTabNum;
		WebInitParameter.IC_GROUP_MAX_LENGTH = data.value.icGroupMaxLength;
		WebInitParameter.IC_GROUP_HAS_SIZE = data.value.icGroupHasSize;
		WebInitParameter.BINDING_TYPE_UNBINDING = data.value.bindingTypeUnbinding;
		WebInitParameter.BINDING_TYPE_BINDING = data.value.bindingTypeBinding;
		WebInitParameter.GROUP_VALUE_MAIN = data.value.groupValueMain;
		WebInitParameter.GROUP_VALUE_SLAVE = data.value.groupValueSlave;
		WebInitParameter.CHINESE_SEQ = data.value.chineseSeq;
		WebInitParameter.CHINESE_GROUP = data.value.chineseGroup;
		WebInitParameter.PRODUCT_TYPE_SERVICE_NAME = data.value.productTypeServiceName;
		WebInitParameter.PRODUCT_TYPE_COMBO_NAME = data.value.productTypeComboName;
		WebInitParameter.PRODUCT_SERVICE_SCOPE_BASE_NAME = data.value.productServiceScopeBaseName;
		WebInitParameter.PRODUCT_SERVICE_SCOPE_VALUABLE_NAME = data.value.productServiceScopeValuableName;
		WebInitParameter.PRODUCT_COMBO_SCOPE_BASE_NAME = data.value.productComboScopeBaseName;
		WebInitParameter.PRODUCT_COMBO_SCOPE_VALUABLE_NAME = data.value.productComboScopeValuableName;
		WebInitParameter.CONFIRM_SHOW = data.value.confirmShow;
		WebInitParameter.DEBUG_MODE = data.value.debugMode;
		WebInitParameter.IS_PRINT = data.value.isPrint;
		WebInitParameter.AUTO_ADD_USER_CODE = data.value.autoAddUserCode
		WebInitParameter.DEFAULT_PRINTER = data.value.defaultPrinter;
		WebInitParameter.ORDER_VIEW_TYPE = data.value.orderViewType;
		
		WebInitParameter.FIRST_GROUP_NAME = data.value.firstGroupName;
		WebInitParameter.AUTO_ADD_AREA = data.value.autoAddArea;
		
		WebInitParameter.BILL_DETAIL_HEIGHT = data.value.billDetailHeight;
		WebInitParameter.ORDER_UNNORMAL_HEIGHT = data.value.orderUnnormalHeight;
		WebInitParameter.EQU_SELECTED_COUNT = data.value.equSelectedCount;
		WebInitParameter.PAYMENT_FEE_ITEM_SELECTED_COUNT = data.value.paymentFeeItemSelectedCount;
		WebInitParameter.ADD_EQU_CONFINE = data.value.addEquConfine;
		WebInitParameter.RESIDENT = data.value.resident;
		WebInitParameter.RECYLE_EQU_STATUS = data.value.recyleEquStatus;
		WebInitParameter.BASE_SERVICE_FEE = data.value.baseServiceFee;
		WebInitParameter.PARAM_OPERATING_COMPANY = data.value.operatingCompany;
		WebInitParameter.PARAM_INVOICE_IS_PRINT_ZERO_ITEM = data.value.invoiceIsPrintZeroItem;
		
		//智能卡和机顶盒启用状态
		WebInitParameter.IC_VALID_VALUE = data.value.icValidValue;
		WebInitParameter.STB_VALID_VALUE = data.value.stbValidValue;
		//智能卡注销
		WebInitParameter.IC_LOGOFF_VALUE = data.value.icLogoffValue;
		
		//机顶盒IC卡是否默认邦迪ing
		WebInitParameter.STB_IC_BAND = data.value.stbIcBand;

		
		WebInitParameter.OPERATION_CONFIRM = data.value.operationConfirm;
		
		
		
		WebInitParameter.MSG_INFO_C01 = data.value.customerMsgInfoC01;
		WebInitParameter.MSG_INFO_C02 = data.value.customerMsgInfoC02;
		WebInitParameter.MSG_INFO_C03 = data.value.customerMsgInfoC03;
		WebInitParameter.MSG_INFO_C04 = data.value.customerMsgInfoC04;
		WebInitParameter.MSG_INFO_C05 = data.value.customerMsgInfoC05;
		WebInitParameter.MSG_INFO_C06 = data.value.customerMsgInfoC06;
		WebInitParameter.MSG_INFO_C07 = data.value.customerMsgInfoC07;
		WebInitParameter.MSG_INFO_C08 = data.value.customerMsgInfoC08;
		WebInitParameter.MSG_INFO_C09 = data.value.customerMsgInfoC09;
		WebInitParameter.MSG_INFO_C10 = data.value.customerMsgInfoC10;
		WebInitParameter.MSG_INFO_C11 = data.value.customerMsgInfoC11;
		WebInitParameter.MSG_INFO_C12 = data.value.customerMsgInfoC12;
		WebInitParameter.MSG_INFO_C13 = data.value.customerMsgInfoC13;
		

		WebInitParameter.MSG_EQU_C01 = data.value.customerMsgEquC01;
		WebInitParameter.MSG_EQU_C02 = data.value.customerMsgEquC02;
		WebInitParameter.MSG_EQU_C03 = data.value.customerMsgEquC03;
		WebInitParameter.MSG_EQU_C04 = data.value.customerMsgEquC04;
		WebInitParameter.MSG_EQU_C05 = data.value.customerMsgEquC05;
		WebInitParameter.MSG_EQU_C06 = data.value.customerMsgEquC06;
		WebInitParameter.MSG_EQU_C07 = data.value.customerMsgEquC07;
		WebInitParameter.MSG_EQU_C08 = data.value.customerMsgEquC08;
		WebInitParameter.MSG_EQU_C09 = data.value.customerMsgEquC09;
		WebInitParameter.MSG_EQU_C10 = data.value.customerMsgEquC10;
		WebInitParameter.MSG_EQU_C11 = data.value.customerMsgEquC11;
		WebInitParameter.MSG_EQU_C12 = data.value.customerMsgEquC12;
		WebInitParameter.MSG_EQU_C13 = data.value.customerMsgEquC13;
		WebInitParameter.MSG_EQU_C14 = data.value.customerMsgEquC14;
		WebInitParameter.MSG_EQU_C15 = data.value.customerMsgEquC15;
		WebInitParameter.MSG_EQU_C16 = data.value.customerMsgEquC16;
		WebInitParameter.MSG_EQU_C17 = data.value.customerMsgEquC17;
		
		WebInitParameter.MSG_SHOW_C01 = data.value.customerMsgShowC01;
		WebInitParameter.MSG_SHOW_C02 = data.value.customerMsgShowC02;

		WebInitParameter.MSG_BUSI_C01 = data.value.customerMsgBusiC01;
		WebInitParameter.MSG_BUSI_C02 = data.value.customerMsgBusiC02;
		WebInitParameter.MSG_BUSI_C03 = data.value.customerMsgBusiC03;
		WebInitParameter.MSG_BUSI_C04 = data.value.customerMsgBusiC04;
		WebInitParameter.MSG_BUSI_C05 = data.value.customerMsgBusiC05;
		WebInitParameter.MSG_BUSI_C06 = data.value.customerMsgBusiC06;
		WebInitParameter.MSG_BUSI_C07 = data.value.customerMsgBusiC07;
		WebInitParameter.MSG_BUSI_C08 = data.value.customerMsgBusiC08;
		WebInitParameter.MSG_BUSI_C09 = data.value.customerMsgBusiC09;
		WebInitParameter.MSG_BUSI_C10 = data.value.customerMsgBusiC10;
	
		WebInitParameter.MSG_BUSI_C11 = data.value.customerMsgBusiC11;
		WebInitParameter.MSG_BUSI_C12 = data.value.customerMsgBusiC12;
		WebInitParameter.MSG_BUSI_C13 = data.value.customerMsgBusiC13;
		WebInitParameter.MSG_BUSI_C14 = data.value.customerMsgBusiC14;
		WebInitParameter.MSG_BUSI_C15 = data.value.customerMsgBusiC15;
		WebInitParameter.MSG_BUSI_C16 = data.value.customerMsgBusiC16;
		WebInitParameter.MSG_BUSI_C17 = data.value.customerMsgBusiC17;
		WebInitParameter.MSG_BUSI_C18 = data.value.customerMsgBusiC18;
		WebInitParameter.MSG_BUSI_C19 = data.value.customerMsgBusiC19;
		WebInitParameter.MSG_BUSI_C20 = data.value.customerMsgBusiC20;
		WebInitParameter.MSG_BUSI_C21 = data.value.customerMsgBusiC21;
		WebInitParameter.MSG_BUSI_C22 = data.value.customerMsgBusiC22;
		WebInitParameter.MSG_BUSI_C23 = data.value.customerMsgBusiC23;
		WebInitParameter.MSG_BUSI_C24 = data.value.customerMsgBusiC24;
		WebInitParameter.MSG_BUSI_C25 = data.value.customerMsgBusiC25;
		WebInitParameter.MSG_BUSI_C26 = data.value.customerMsgBusiC26;
		WebInitParameter.MSG_BUSI_C27 = data.value.customerMsgBusiC27;
		WebInitParameter.MSG_BUSI_C28 = data.value.customerMsgBusiC28;
		WebInitParameter.MSG_BUSI_C29 = data.value.customerMsgBusiC29;
		WebInitParameter.MSG_BUSI_C30 = data.value.customerMsgBusiC30;
		WebInitParameter.MSG_BUSI_C31 = data.value.customerMsgBusiC31;
		WebInitParameter.MSG_BUSI_C32 = data.value.customerMsgBusiC32;
		WebInitParameter.MSG_BUSI_C33 = data.value.customerMsgBusiC33;
		WebInitParameter.MSG_BUSI_C34 = data.value.customerMsgBusiC34;
		WebInitParameter.MSG_BUSI_C35 = data.value.customerMsgBusiC35;
		WebInitParameter.MSG_BUSI_C36 = data.value.customerMsgBusiC36;
		WebInitParameter.MSG_BUSI_C37 = data.value.customerMsgBusiC37;
		WebInitParameter.MSG_BUSI_C38 = data.value.customerMsgBusiC38;
		WebInitParameter.MSG_BUSI_C39 = data.value.customerMsgBusiC39;
		WebInitParameter.MSG_BUSI_C40 = data.value.customerMsgBusiC40;
		WebInitParameter.MSG_BUSI_C41 = data.value.customerMsgBusiC41;
		WebInitParameter.MSG_BUSI_C42 = data.value.customerMsgBusiC42;
		WebInitParameter.MSG_BUSI_C43 = data.value.customerMsgBusiC43;
		WebInitParameter.MSG_BUSI_C44 = data.value.customerMsgBusiC44;
		WebInitParameter.MSG_BUSI_C45 = data.value.customerMsgBusiC45;
		
		WebInitParameter.USER_INFO_NAME = data.value.userInfoName;
		WebInitParameter.USER_INFO_USER_CODING = data.value.userInfoUserCoding;
		WebInitParameter.USER_INFO_ACCOUNT_NO = data.value.userInfoAccountNo;
		WebInitParameter.USER_INFO_STATUS = data.value.userInfoStatus;
		WebInitParameter.USER_INFO_TYPE = data.value.userInfoType;
		WebInitParameter.USER_INFO_BUSINESS_TYPES = data.value.userInfoBusinessTypes;// liuxu
		WebInitParameter.USER_INFO_AREA_LEVEL1 = data.value.userInfoLevel1;
		WebInitParameter.USER_INFO_AREA_LEVEL2 = data.value.userInfoLevel2;
		WebInitParameter.USER_INFO_AREA_LEVEL3 = data.value.userInfoLevel3;
		WebInitParameter.USER_INFO_ADDRESS = data.value.userInfoAddress;
		WebInitParameter.USER_INFO_POSTCODE = data.value.userInfoPostcode;
		WebInitParameter.USER_INFO_TEL = data.value.userInfoTel;
		WebInitParameter.USER_INFO_MOBILE = data.value.userInfoMobile;
		WebInitParameter.USER_INFO_EMAIL = data.value.userInfoEmail;
		WebInitParameter.USER_INFO_IDENTITY_TYPE = data.value.userInfoIdentityType;
		WebInitParameter.USER_INFO_MESSAGE_ADDRESS = data.value.userInfoMessageAddress;
		WebInitParameter.USER_INFO_MESSAGE_POSTCODE = data.value.userInfoMessagePostcode;
		WebInitParameter.USER_INFO_IDENTITY_CARD = data.value.userInfoIdentityCard;
		WebInitParameter.USER_INFO_BANK_INFO = data.value.userInfoBankInfo;
		WebInitParameter.USER_INFO_VALID_STATUS = data.value.userInfoValidStatus;
		WebInitParameter.USER_INFO_RELATE_BANK = data.value.userInfoRelateBank;
		WebInitParameter.USER_INFO_CONTACT = data.value.userInfoContact;
		WebInitParameter.USER_INFO_IC_NO = data.value.userInfoIcNo;
		WebInitParameter.USER_INFO_STB_NO = data.value.userInfoStbNo;
		WebInitParameter.USER_INFO_REGISTER_DATE = data.value.userInfoRegisterDate;
		WebInitParameter.USER_INFO_REMARK = data.value.userInfoRemark;
		WebInitParameter.AGENT_INFO_NAME = data.value.agentInfoName;
		WebInitParameter.AGENT_INFO_IDENTITY_TYPE = data.value.agentInfoIdentityType;
		WebInitParameter.AGENT_INFO_IDENTITY_CARD = data.value.agentInfoIdentityCard;
		WebInitParameter.AGENT_INFO_MESSAGE_ADDRESS = data.value.agentInfoMessageAddress;
		WebInitParameter.AGENT_INFO_TEL = data.value.agentInfoTel;
		WebInitParameter.AGENT_INFO_MOBILE = data.value.agentInfoMobile;
		
	}
	if(typeof callbackFunc == 'function'){
		callbackFunc();
	}
});


}
//封装ajax方法
function ovtAjaxMethod(ajaxPath,ajaxResponse,ajaxCallback){

	if(typeof ajaxResponse=='function'){
		ajaxCallback = ajaxResponse;
		ajaxResponse = undefined;
	}
	//alert(ajaxPath);
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
		//alert("abc");
		ajaxCallback(data);
	}});
}

//定义map对象
function Map (){
	this.key=new Array();
	this.value=new Array();
	this.put=function(arg0,arg1){
		for(var i=0;i<this.key.length;i+=1){
			if(this.key[i]==arg0){
				this.value[i]=arg1;
				return;
			}
		}
		
		this.key[this.key.length] = arg0;
		this.value[this.value.length] = arg1;
	};
	this.get=function(arg0){
		for(var i = 0;i<this.key.length;i+=1){
			if(this.key[i]==arg0){
				return this.value[i];
			}
		}
	};
	this.remove = function(arg0){//方法未使用，未测试
		var keyTemp = new Array();
		var valueTemp = new Array();
		for(var i = 0;i<this.key.length;i+=1){
			if(this.key[i]!=arg0){
				keyTemp[keyTemp.length] = this.key[i];
				valueTemp[valueTemp.length] = this.value[i];
			}
		}
	}
};

//定义用户设备名称对应map对象
function UserMap(){
	this.customerIds = new Array();
	this.value = new Array();
	this.put = function (customerId,arg0,arg1){
		for(var i = 0; i<this.customerIds.length;i+=1){
			if(this.customerIds[i]==customerId){
				this.value[i].put(arg0,arg1);
				return;
			}
		}
		this.customerIds[this.customerIds.length] = customerId;
		var map = new Map();
		map.put(arg0, arg1);
		this.value[this.value.length] = map;
	}
	this.get = function (customerId,arg0){
		for(var i = 0; i<this.customerIds.length;i+=1){
			if(this.customerIds[i]==customerId){
				return this.value[i].get(arg0);
			}
		}
	}
	this.getValue = function (customerId){
		for(var i = 0; i<this.customerIds.length;i+=1){
			if(this.customerIds[i]==customerId){
				return this.value[i];
			}
		}
		return new Map();
	}
	this.clearCustomer = function (customerId){
		for(var i = 0; i<this.customerIds.length;i+=1){
			if(this.customerIds[i]==customerId){
				this.value[i] = new Map();
			}
		}
	}
	this.remove = function (customerId,arg0){//方法未使用，未测试
		for(var i = 0; i<this.customerIds.length;i+=1){
			if(this.customerIds[i]==customerId){
				this.value[i].remove(arg0);
			}
		}
	}
	
	// add by jhg 2012-10-26
	this.clearAll = function (){
		for(var i = 0; i<this.customerIds.length;i+=1){
			this.value[i] = new Map();
		}
	}
	
}