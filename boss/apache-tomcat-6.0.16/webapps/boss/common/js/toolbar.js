/*
 *      链接到添加页面kkkkkk  
*/ 
function addItem(actionvalue){
    var checkbox = document.getElementsByName("select_id");
    var i1=0;
    var treevalue="";
    for(var i = 0; i < checkbox.length; i++) {
            if(checkbox[i].checked) {
                i1=i1+1;
                treevalue=checkbox[i].value
            }
    }
    if(i1>1){
        alert("添加时您只能选择一行！");
        return false;
    }else{
        work_form.tree_value.value=treevalue;
        //work_form.action_type.value="add";
        work_form.action=actionvalue
        work_form.submit();
    }
}
/*
 *      链接到其他页面
*/
function redirectItem(actionvalue){
        //work_form.action_type.value="add";
        work_form.action=actionvalue
        work_form.submit();
}
/*
 *      链接到修改页面
*/
function updateItem(actionvalue) {
    var checkbox = document.getElementsByName("select_id");
    var i1=0;
    var treevalue="";
    for(var i = 0; i < checkbox.length; i++) {
            if(checkbox[i].checked) {
                i1=i1+1;
                treevalue=checkbox[i].value
            }
    }
    if(i1>1){
        alert("修改时您只能选择一行！");
        return false;
    }else if(i1==0){
       alert("您没有选中任何要修改的条目！");
       return false;
    }else{
        work_form.tree_value.value=treevalue;
        //work_form.action_type.value="update";
        work_form.action=actionvalue
        work_form.submit();
    }   
}
/*
 *      链接到工号页面
*/
function operatorItem(actionvalue) {
    var checkbox = document.getElementsByName("select_id");
    var i1=0;
    var treevalue="";
    for(var i = 0; i < checkbox.length; i++) {
            if(checkbox[i].checked) {
                i1=i1+1;
                treevalue=checkbox[i].value
            }
    }
    if(i1>1){
        alert("您只能选择一行！");
        return false;
    }else if(i1==0){
       alert("您没有选中任何要的条目！");
       return false;
    }else{
        work_form.tree_value.value=treevalue;
        //work_form.action_type.value="update";
        work_form.action=actionvalue
        work_form.submit();
    }   
}
/*
 *      tree链接到删除功能
*/
function deleteTreeItem(actionvalue) {
 var checkbox = document.getElementsByName("select_id");
    var i1=0;
    var treevalue="";
    for(var i = 0; i < checkbox.length; i++) {
            if(checkbox[i].checked) {
                i1=i1+1;
                if (deleteCheck(i,checkbox[i].value)){
                        alert("要删除的节点包含非空节点,请先删除其子节点!")
                        return false;                 
                }
                treevalue=treevalue+checkbox[i].value+"|"
            }
    }
    
    if(i1==0){
       alert("您没有选中任何要删除的条目！");
       return false;
    }else{
        if(confirm("确定要删除？")) {
	        work_form.tree_value.value=treevalue;
	        //work_form.action_type.value="delete";
	        work_form.action=actionvalue
	        work_form.submit();
        }
    }   
}

/*
 *      table链接到删除功能
*/
function deleteTableItem(actionvalue) {
 var checkbox = document.getElementsByName("select_id");
    var i1=0;
    var treevalue="";
    for(var i = 0; i < checkbox.length; i++) {
            if(checkbox[i].checked) {
                i1=i1+1;
                treevalue=treevalue+checkbox[i].value+"|"
            }
    }
    
    if(i1==0){
       alert("您没有选中任何要删除的条目！");
       return false;
    }else{
        if(confirm("确定要删除？")) {
            //treevalue=treevalue.substring(0,treevalue.length-1)
            //alert(treevalue)
	        work_form.tree_value.value=treevalue;
	        //work_form.action_type.value="delete";
	        work_form.action=actionvalue
	        work_form.submit();
        }
    }   
}

/*
 *      tree删除时校验是否包含子节点
*/
function deleteCheck(beginnum,deletevalue){
    var checkbox = document.getElementsByName("select_id");
    if (beginnum == checkbox.length-1) {
       return false
    }
    
    var checkvalue=checkbox[beginnum+1].value 
    if (checkvalue.length>deletevalue.length){
       if (deletevalue==checkvalue.substring(0,deletevalue.length)){
           return true
       }     
    }
    return false
}

/*
 *      tree赋业务角色值
*/
function updateServiceRoleItem(actionvalue) {
 var checkbox = document.getElementsByName("select_id");
    if (work_form.id.value=="-1"){
          alert("请选择要修改的业务角色")
          return false; 
    }
    var i1=0;
    var treevalue="";
    for(var i = 0; i < checkbox.length; i++) {
            if(checkbox[i].checked) {
                treevalue=treevalue+checkbox[i].value+"|"
            }
    }
    
        work_form.tree_value.value=treevalue;
        work_form.action=actionvalue
        work_form.submit();
}  
/*
 *      tree赋人事角色值
*/      
function updatePersonnelRoleItem(actionvalue) {
    var checkbox = document.getElementsByName("select_id");
    if (work_form.id.value=="-1"){
          alert("请选择要修改的人事角色")
          return false; 
    }
    var i1=0;
    var treevalue="";
    for(var i = 0; i < checkbox.length; i++) {
            if(checkbox[i].checked) {
                treevalue=treevalue+checkbox[i].value+"|"
            }
    }
    work_form.tree_value.value=treevalue;
    work_form.action=actionvalue
    work_form.submit();
}
/*
 *      tree父节点被选中的同时子节点同步
*/
function checkAllSon(currentCheck) 
{ 

  var checkbox = document.getElementsByName("select_id");
  
  code = currentCheck.value;
  
  for( i=0 ; i<checkbox.length;i++){
  	if( currentCheck.checked==true){
  		if( checkbox[i] != currentCheck ){
  			if( code.indexOf( checkbox[i].value ) == 0 ){
  				checkbox[i].checked = true;
  			}
  		}
  	}
  	if( checkbox[i] != currentCheck ){
  		if( checkbox[i].value.indexOf( code ) == 0 ){
			checkbox[i].checked = currentCheck.checked ;
		}
  	}
  }
  
  /*
  if ((currentCheck.checked)){
      for(i = begin_index-1; i>=0; i--){
           if ((sonCode+appendChar).indexOf( checkbox[i].value ) == 0){
                checkbox[i].checked = true;
           }
      }
  }
  
  
  for(i = begin_index; i< checkbox.length; i++){
        if (checkbox[i].value.indexOf(( sonCode+ appendChar)) == 0)
        {
            checkbox[i].checked = checkbox[begin_index].checked;
        }
   } 
   
  var  sonCode = "";
  var checkbox = document.getElementsByName("select_id");
  
  sonCode = checkbox[begin_index].value;
  if ((sonCode.length>3)&&(checkbox[begin_index].checked)){
      sonCode=sonCode.substring(0,sonCode.length-3)
      for(i = begin_index-1; i>=0; i--){
           if (sonCode==checkbox[i].value){
                checkbox[i].checked = true
                if (sonCode.length>3){
                  sonCode=sonCode.substring(0,sonCode.length-3)
                }else{
                  break
                }
           }else{
                if (checkbox[i].length==3){
                   break   
                } 
           }
      }
  }
  
  for(i = begin_index; i< checkbox.length; i++){
        sonCode = checkbox[i].value;
        
        if (sonCode.indexOf(headCode) == 0)
        {
            checkbox[i].checked = checkbox[begin_index].checked;
        }else{
            break
        }  
   } */
}

function checkSonById(currentCheck) 
{
  var checkbox = document.getElementsByName("select_id");
  
  code = currentCheck.id;
  
  for( i=0 ; i<checkbox.length;i++){
	  
	  if( currentCheck.checked==false ){
	  		if( checkbox[i] != currentCheck ){//子取消选择父必须取消选择
	  			if( code.indexOf( checkbox[i].id ) == 0 ){
	  				checkbox[i].checked = false ;
	  			}
	  		}
	  	}
	  
	  
	  if( checkbox[i] != currentCheck ){//父选子全选
	  		if( checkbox[i].id.indexOf( code ) == 0 ){
				checkbox[i].checked = currentCheck.checked ;
			}
	  	}
  }
}


function checkAllSonById(currentCheck) 
{
  var checkbox = document.getElementsByName("select_id");
  
  code = currentCheck.id;
  
  for( i=0 ; i<checkbox.length;i++){
  	if( currentCheck.checked==true){
  		if( checkbox[i] != currentCheck ){//子选父必选
  			if( code.indexOf( checkbox[i].id ) == 0 ){
  				checkbox[i].checked = true;
  			}
  		}
  	}
  	if( checkbox[i] != currentCheck ){//父选子全选
  		if( checkbox[i].id.indexOf( code ) == 0 ){
			checkbox[i].checked = currentCheck.checked ;
		}
  	}
  }
}
/**
 * @param currentCheck
 * @param indexId
 * @return
 */
function checkAllSonByAci2(currentCheck,indexId) 
{
  var checkbox = document.getElementsByName("gw2IpIds"+indexId);

code = currentCheck.aci;
  
  for( i=0 ; i<checkbox.length;i++){
  	if( currentCheck.checked==true){
  		if( checkbox[i] != currentCheck ){
  			if( code.indexOf( checkbox[i].aci ) == 0 ){
  				checkbox[i].checked = true;
  			}
  		}
  	}
  	if( checkbox[i] != currentCheck ){
  		if( checkbox[i].aci.indexOf( code ) == 0 ){
			checkbox[i].checked = currentCheck.checked ;
		}
  	}
  }
}
function checkAllSon2(begin_index,appendChar) 
{ 
  if( !appendChar ){
  	appendChar = '.' ;
  }
  var  sonCode = "";
  var checkbox = document.getElementsByName("select_id");
  
  sonCode = checkbox[begin_index].value;
 
  if ((checkbox[begin_index].checked)){
      for(i = begin_index-1; i>=0; i--){
           if ((sonCode+appendChar).indexOf( checkbox[i].value ) == 0){
                checkbox[i].checked = true;
           }
      }
  }
  
  
  for(i = begin_index; i< checkbox.length; i++){
        if (checkbox[i].value.indexOf(( sonCode+ appendChar)) == 0)
        {
            checkbox[i].checked = checkbox[begin_index].checked;
        }
   } 
}




  function checkAllArea(begin_index,children) 
{ 
  var  sonCode = "";
  var checkbox = document.getElementsByName("select_id");
  
  sonCode = checkbox[begin_index].value;
  if ((checkbox[begin_index].checked)){
  	 if(children.size!=0)
  	 {
  	    for(i = 0; i<=children.size; i++){
         checkbox[children[i].parentId].checked=true
      }
  	 }   
  }
}
/*
 *      table链接到修改密码页面
*/
function updatePassItem(actionvalue) {
  var checkbox = document.getElementsByName("select_id");
    var i1=0;
    var treevalue="";
    for(var i = 0; i < checkbox.length; i++) {
            if(checkbox[i].checked) {
                i1=i1+1;
                treevalue=checkbox[i].value
            }
    }
    if(i1>1){
        alert("修改密码时您只能选择一行！");
        return false;
    }else if(i1==0){
       alert("您没有选中任何要修改密码的条目！");
       return false;
    }else{
        work_form.tree_value.value=treevalue;
        //work_form.action_type.value="pass";
        work_form.action=actionvalue
        work_form.submit();
    }   
}

/*
 *      table链接到重置密码功能
*/
function resetPassItem(actionvalue) {
  var checkbox = document.getElementsByName("select_id");
    var i1=0;
    var treevalue="";
    for(var i = 0; i < checkbox.length; i++) {
            if(checkbox[i].checked) {
                i1=i1+1;
                treevalue=treevalue+checkbox[i].value+"|"
            }
    }
    
    if(i1==0){
       alert("您没有选中任何要重置密码的条目！");
       return false;
    }else{
        work_form.tree_value.value=treevalue;
        //work_form.action_type.value="resetpass";
        work_form.action=actionvalue
        work_form.submit();
    }   
}