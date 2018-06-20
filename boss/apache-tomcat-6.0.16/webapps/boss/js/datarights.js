/*
 *      t�ӵ����ҳ��kkkkkk  
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
        alert("���ʱ��ֻ��ѡ��һ�У�");
        return false;
    }else{
        work_form.tree_value.value=treevalue;
        //work_form.action_type.value="add";
        work_form.action=actionvalue
        work_form.submit();
    }
}
/*
 *      t�ӵ�����ҳ��
*/
function redirectItem(actionvalue){
        //work_form.action_type.value="add";
        work_form.action=actionvalue
        work_form.submit();
}
/*
 *      t�ӵ��޸�ҳ��
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
        alert("�޸�ʱ��ֻ��ѡ��һ�У�");
        return false;
    }else if(i1==0){
       alert("��û��ѡ���κ�Ҫ�޸ĵ���Ŀ��");
       return false;
    }else{
        work_form.tree_value.value=treevalue;
        //work_form.action_type.value="update";
        work_form.action=actionvalue
        work_form.submit();
    }   
}
/*
 *      t�ӵ�����ҳ��
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
        alert("��ֻ��ѡ��һ�У�");
        return false;
    }else if(i1==0){
       alert("��û��ѡ���κ�Ҫ����Ŀ��");
       return false;
    }else{
        work_form.tree_value.value=treevalue;
        //work_form.action_type.value="update";
        work_form.action=actionvalue
        work_form.submit();
    }   
}
/*
 *      treet�ӵ�ɾ����
*/
function deleteTreeItem(actionvalue) {
 var checkbox = document.getElementsByName("select_id");
    var i1=0;
    var treevalue="";
    for(var i = 0; i < checkbox.length; i++) {
            if(checkbox[i].checked) {
                i1=i1+1;
                if (deleteCheck(i,checkbox[i].value)){
                        alert("Ҫɾ��Ľڵ��ǿսڵ�,����ɾ�����ӽڵ�!")
                        return false;                 
                }
                treevalue=treevalue+checkbox[i].value+"|"
            }
    }
    
    if(i1==0){
       alert("��û��ѡ���κ�Ҫɾ�����Ŀ��");
       return false;
    }else{
        if(confirm("ȷ��Ҫɾ��")) {
	        work_form.tree_value.value=treevalue;
	        //work_form.action_type.value="delete";
	        work_form.action=actionvalue
	        work_form.submit();
        }
    }   
}

/*
 *      tablet�ӵ�ɾ����
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
       alert("��û��ѡ���κ�Ҫɾ�����Ŀ��");
       return false;
    }else{
        if(confirm("ȷ��Ҫɾ��")) {
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
 *      treeɾ��ʱУ���Ƿ���ӽڵ�
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
 *      tree��ҵ���ɫֵ
*/
 function updateServiceRoleItem(actionvalue) {
 var checkbox = document.getElementsByName("select_id");
 var area_checkbox=document.getElementsByName("area_select_id");
 var prog_checkbox=document.getElementsByName("prog_select_id");
 var menu_checkbox=document.getElementsByName("menu_select_id");
 var info_checkbox=document.getElementsByName("info_select_id");
 var wea_checkbox=document.getElementsByName("wea_select_id");
    if (work_form.id.value=="-1"){
          alert("")
          return false; 
    }
    var i1=0;
    var treevalue="";
    
    for(var i = 0; i < checkbox.length; i++) {
            if(checkbox[i].checked) {
                treevalue=treevalue+checkbox[i].value+"|"
            }
    }
    
    var areaTreeValue="";
    for(var i=0;i<area_checkbox.length;i++){
    		if(area_checkbox[i].checked){
    			areaTreeValue=areaTreeValue+area_checkbox[i].value+"|"
    		}
    }
    
    var progTreeValue="";
    for(var i=0;i<prog_checkbox.length;i++){
    		if(prog_checkbox[i].checked){
    			progTreeValue=progTreeValue+prog_checkbox[i].value+"|"
    		}
    }
    var menuTreeValue="";
    for(var i=0;i<menu_checkbox.length;i++){
    		if(menu_checkbox[i].checked){
    			menuTreeValue=menuTreeValue+menu_checkbox[i].value+"|"
    		}
    }
    
    var infoTreeValue="";
    for(var i=0;i<info_checkbox.length;i++){
    		if(info_checkbox[i].checked){
    			infoTreeValue=infoTreeValue+info_checkbox[i].value+"|"
    		}
    }
    
    var weaTreeValue="";
    for(var i=0;i<wea_checkbox.length;i++){
			if(wea_checkbox[i].checked){
				weaTreeValue=weaTreeValue+wea_checkbox[i].value+"|"
			}    
    }
    
        work_form.tree_value.value=treevalue;
        work_form.area_tree_value.value=areaTreeValue;
        work_form.prog_tree_value.value=progTreeValue;
        work_form.menu_tree_value.value=menuTreeValue;
        work_form.info_tree_value.value=infoTreeValue;
        work_form.weather_tree_value.value=weaTreeValue;
        work_form.action=actionvalue
        work_form.submit();
} 
/*
 *      tree�����½�ɫֵ
*/      
function updatePersonnelRoleItem(actionvalue) {
    var checkbox = document.getElementsByName("select_id");
    if (work_form.id.value=="-1"){
          alert("��ѡ��Ҫ�޸ĵ����½�ɫ")
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
 *      tree���ڵ㱻ѡ�е�ͬʱ�ӽڵ�ͬ��
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
function checkAllSonById(currentCheck) 
{
  var checkbox = document.getElementsByName("select_id");
  
  code = currentCheck.id;
  
  for( i=0 ; i<checkbox.length;i++){
  	if( currentCheck.checked==true){
  		if( checkbox[i] != currentCheck ){
  			if( code.indexOf( checkbox[i].id ) == 0 ){
  				checkbox[i].checked = true;
  			}
  		}
  	}
  	if( checkbox[i] != currentCheck ){
  		if( checkbox[i].id.indexOf( code ) == 0 ){
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
 *      tablet�ӵ��޸�����ҳ��
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
        alert("�޸�����ʱ��ֻ��ѡ��һ�У�");
        return false;
    }else if(i1==0){
       alert("��û��ѡ���κ�Ҫ�޸��������Ŀ��");
       return false;
    }else{
        work_form.tree_value.value=treevalue;
        //work_form.action_type.value="pass";
        work_form.action=actionvalue
        work_form.submit();
    }   
}

/*
 *      tablet�ӵ��������빦��
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
       alert("��û��ѡ���κ�Ҫ�����������Ŀ��");
       return false;
    }else{
        work_form.tree_value.value=treevalue;
        //work_form.action_type.value="resetpass";
        work_form.action=actionvalue
        work_form.submit();
    }   
}