<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ page isELIgnored = "false" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>自定义框</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    

	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/customer/js/jquery_customer_parameter.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/boss/popupSelectFrame/js/jquery_popup_select_frame.js"></script>	
	
    <base ><%String basePath = request.getContextPath();%>
		<style type="text/css">
		.upHideDiv{display:none;cursor:default;background-color:#FDF1DE;color:#000;z-index:5;border:3px solid #67BF7F}
		.selectlight { background-color:#9ACCFB;cursor: hand; }
		</style>
    
  </head>
  <app:position/>
  <body style="margin-top:0px"> 
  <input id ="a" type="text"></input>
  <input id ="b" type="text"></input>
  <input id ="c" type="text"></input><p></p>
  <input id ="customIns" type="text"
  selectsql="select a.equ_no as '卡号' into customIns ,a.id as 'id' into b  from boss_equ_info a where a.equ_no like '%inparavalue%' and a.status='2' and a.equ_type='IC_CARD' "
   onkeyup="cusKeyPress('customIns','<%=request.getContextPath()%>')"
  ></input>
  <div id="cusDiv" class="upHideDiv"> <div id="cusShowDiv"></div></div>
  <p>
  <br/>
  说明：
  <br/>
  1 调用事件为 ： onkeyup="cusKeyPress(id,basePath) ,需要将输入框id和basePath传入
  <br/>
  2 自定义查询语句写在selectsql中。格式如下:
  <br/>
  3 语法格式为： 
  <br/> 
   &nbsp;&nbsp;         select  查询字段名   as 别名   into 输出文本框id号    from  tableName  where   查询字段名   like '%inparavalue%'
  <br/>          
  3.1 需要弹出显示的字段使用：  as 别名 ，如果没有声明则不显示。
  <br/>
  3.2 需要输出的值使用：  into 输出文本框id号  ，如果没有声明则不输出值。
  <br/>
  3.3 查询字段值使用 inparavalue 代指，此项必填。
  <br/>
  3.4 如果查询显示或输出多个字段，则使用英文逗号分隔开
  
  <br/>
  示例：
  <br/>
  selectsql="select a.user_coding as 'user' into customIns ,a.name as 姓名 into b ,b.equ_no as '卡号' into c from boss_user a, boss_user_equ b where a.user_coding like '%inparavalue%' and a.id=b.user_id "
  <br/>
  "select f.id  as 'id' ,f.user_coding as coding ,f.name as name ,f.address  as address from (select b.user_id as buser_id, b.*,d.*  from (select * from boss_user_equ a where A.EQU_TYPE_ID ='IC_CARD' ) b left join ( select * from boss_user_order c where C.STATUS = 1 ) d  on B.EQU_ID = d.EQU_ID where d.id is null ) e , boss_user f where e.buser_id = f.id and f.user_coding like '%inparavalue%' "
  </p>  
  </body>
</html>
