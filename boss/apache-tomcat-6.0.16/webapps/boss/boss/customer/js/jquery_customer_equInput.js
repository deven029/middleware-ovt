// 设备输入默认处理方式
function equInputTypeInitChange(obj){
	if(obj.value == "1"){
		equInputTypeChangeInitSql("");
	}else{
		//扫枪不做模糊查询
		$("#icCardValue").attr("selectsql","");
		$("#setBoxValue").attr("selectsql","");
	}
}

// IC卡输入处理方式
function icCardInputTypeChange(obj){
	if(obj.value == "1"){
		equInputTypeChangeInitSql("IC_CARD");
	}else{
		//扫枪不做模糊查询
		$("#icCardValue").attr("selectsql","");
	}
}

// 机顶盒输入处理方式
function stbInputTypeChange(obj){
	if(obj.value == "1"){
		equInputTypeChangeInitSql("STB");
	}else{
		//扫枪不做模糊查询
		$("#setBoxValue").attr("selectsql","");
	}
}

//开户设备输入方式查询sql动态修改  2013-6-22 yzy
function equInputTypeChangeInitSql(equType){
	//做模糊查询sql
	if(equType == "" || equType == "IC_CARD"){
		var selectsql="";
		selectsql+="select equ_info.equ_no as '卡号' into icCardValue, equ_info.model as '型号' into icCardModel , ic_stb_equ_no.stb as '机顶盒号' into setBoxValue , ic_stb_equ_no.stb_model as '型号' into stbModel"; 
		selectsql+="	 from    ";
		selectsql+="	(";
		selectsql+="select e.id id  ,e.equ_no equ_no  , equ_model.name model   from boss_equ_info e ,   (";
		selectsql+="	            select p.value value ,p.name name  from pms_parameter p  where menu_id ='equModel'";
		selectsql+="		            ) equ_model   where  e.model=equ_model.value and  equ_type='IC_CARD' and status=2 and  equ_no like '%inparavalue%'  and  rownum<11   order by length(e.equ_no)";
		selectsql+=")  equ_info   left join ";
		selectsql+="	(";
		selectsql+="select r.equ_id1 id1  ,e1.equ_no stb  ,model_name1.name stb_model , r.equ_id2 id2 ,e2.equ_no ic   , model_name2.name  ic_model";
		selectsql+="	  from boss_equ_info  e1  ,  boss_equ_rela r   , boss_equ_info  e2  , ";
		selectsql+="(";
		selectsql+="  select p.value value ,p.name name  from pms_parameter p  where menu_id ='equModel'";
		selectsql+="  ) model_name1, ";
		selectsql+="  (";
		selectsql+="   select p.value value ,p.name name  from pms_parameter p  where menu_id ='equModel'";
		selectsql+="    ) model_name2   ";
		selectsql+="	  where  e2.id in  ( select id   from boss_equ_info    where  equ_type='IC_CARD' and status=2 and  equ_no like '%inparavalue%'    )";    
		selectsql+="        and    e1.id=r.equ_id1 and e2.id=r.equ_id2  and  model_name1.value=e1.model and model_name2.value=e2.model and  r.rela_id='STB-IC_CARD'   ";         
		selectsql+="	) ic_stb_equ_no    on equ_info.id = ic_stb_equ_no.id2 ";
		$("#icCardValue").attr("selectsql",selectsql);
	}
	
	if(equType == "" || equType == "STB"){
		var stbselectsql="";
		stbselectsql+="  	select ic_stb_equ_no.ic as '卡号' into icCardValue, ic_stb_equ_no.ic_model as '型号' into icCardModel , equ_info.equ_no as '机顶盒号' into setBoxValue , equ_info.model as '型号' into stbModel"; 
		stbselectsql+="	   from    ";
		stbselectsql+="	(";
		stbselectsql+="	select e.id id  ,e.equ_no equ_no  , equ_model.name model   from boss_equ_info e ,   (";
		stbselectsql+="	            select p.value value ,p.name name  from pms_parameter p  where menu_id ='equModel'";
		stbselectsql+="	            ) equ_model   where  e.model=equ_model.value and  equ_type='STB' and status=2 and  equ_no like '%inparavalue%'  and  rownum<11  order by length(e.equ_no)";
		stbselectsql+="	)  equ_info   left join ";
		stbselectsql+="	(";
		stbselectsql+="	select r.equ_id1 id1  ,e1.equ_no stb  ,model_name1.name stb_model , r.equ_id2 id2 ,e2.equ_no ic   , model_name2.name  ic_model";
		stbselectsql+="	  from boss_equ_info  e1  ,  boss_equ_rela r   , boss_equ_info  e2  , ";
		stbselectsql+="	    (";
		stbselectsql+="	    select p.value value ,p.name name  from pms_parameter p  where menu_id ='equModel'";
		stbselectsql+="	    ) model_name1, ";
		stbselectsql+="	    (";
		stbselectsql+="	    select p.value value ,p.name name  from pms_parameter p  where menu_id ='equModel'";
		stbselectsql+="	    ) model_name2   ";
		stbselectsql+="	  where  e1.id in  ( select id  from boss_equ_info    where  equ_type='STB' and status=2 and  equ_no like '%inparavalue%'   )";    
		stbselectsql+="	         and    e1.id=r.equ_id1 and e2.id=r.equ_id2  and  model_name1.value=e1.model and model_name2.value=e2.model and  r.rela_id='STB-IC_CARD'  ";          
		stbselectsql+="	) ic_stb_equ_no    on equ_info.id = ic_stb_equ_no.id1  ";
		$("#setBoxValue").attr("selectsql",stbselectsql);
	}
}

//开户设备输入验证 2013-6-22 yzy
function inputEquCheckFunc(customIn,contentId){
	if(customIn=="icCardValue"){
		if($("#cusDiv").css("display")==undefined || $("#cusDiv").css("display")=='none'){
			equCheckCascade("card",$("#icCardValue"),$("#setBoxValue"),$("#icCardModel"),$("#stbModel"),contentId);
		}
	}
	if(customIn=="setBoxValue"){
		if($("#cusDiv").css("display")==undefined || $("#cusDiv").css("display")=='none'){
			equCheckCascade("stb",$("#setBoxValue"),$("#icCardValue"),$("#stbModel"),$("#icCardModel"),contentId);
		}
	}
}

function equCheckCascade(equ,$equ1,$equ2,$model1,$model2,contentId){
	var equ1Text = $equ1.val();
	if(equ1Text == ""){
		return ;
	}
	var ajaxRes = {
			equType:equ,
			equDesc:equ1Text
	}
	ovtAjaxMethod(ajaxEquPath+"ajaxSTBCardCascade.do",ajaxRes,function(data){
		if(data.code=='0'){
			if($equ2!=undefined){
				if(!$equ2.attr("disabled")&&$.trim(data.value.equNo)!=""&&data.value.equNo!='null'){
					$equ2.val(data.value.equNo);
					$model2.val(data.value.description);
				}
				$model1.val(data.value.model);
				
			}
		}
		//判断是否录入信息有误
		if(equ=='card' && (data.code=='1'||'IC_CARD'!=data.value.equType)) {
			alert("【智能卡】号输入有误，请输入正确的智能卡号！") ;
		} else if(equ=='stb' && (data.code=='1'||'STB'!=data.value.equType)) {
			alert("【机顶盒】号输入有误，请输入正确的机顶盒号！") ;
		} else {
			if(0==data.value.status||2==data.value.status ) {
			} else {
				alert("请输入【待售中|新入库】设备！") ;
			}
		}
		$("#equipment_promotion_showEquInvalidTable_"+contentId).empty();
	});
}