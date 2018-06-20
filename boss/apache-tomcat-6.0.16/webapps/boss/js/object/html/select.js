<!--
// 1.判断select选项中 是否存在Value="paraValue"的Item        
function exitItemInSelectControl(objSelect, objItemValue) {        
    var isExit = false;        
    for (var i = 0; i < objSelect.options.length; i++) {        
        if (objSelect.options[i].value == objItemValue) {        
            isExit = true;        
            break;        
        }        
    }        
    return isExit;        
}         
   
// 2.向select选项中 加入一个Item        
function addItemToSelect(objSelect, objItemText, objItemValue) {        
    //判断是否存在        
    if (exitItemInSelectControl(objSelect, objItemValue)) {        
        alert("该Item的Value值已经存在");        
    } else {        
        var varItem = new Option(objItemText, objItemValue);      
        objSelect.options.add(varItem);     
       // alert("成功加入");     
    }        
}        
   
// 3.从select选项中 删除一个Item        
function removeItemFromSelect(objSelect, objItemValue) {        
    //判断是否存在        
    if (exitItemInSelectControl(objSelect, objItemValue)) {        
        for (var i = 0; i < objSelect.options.length; i++) {        
            if (objSelect.options[i].value == objItemValue) {        
                objSelect.options.remove(i);        
                break;        
            }        
        }        
        alert("成功删除");        
    } else {        
        alert("该select中 不存在该项");        
    }        
}    
   
   
// 4.删除select中选中的项    
function removeSelectedItemFromSelect(objSelect) {        
    var length = objSelect.options.length - 1;    
    for(var i = length; i >= 0; i--){    
        if(objSelect[i].selected == true){    
            objSelect.options[i] = null;    
        }    
    }    
}      
   
// 5.修改select选项中 value="paraValue"的text为"paraText"        
function updateSelectedItemText(objSelect, objItemText, objItemValue) {        
    //判断是否存在        
    if (exitItemInSelectControl(objSelect, objItemValue)) {        
        for (var i = 0; i < objSelect.options.length; i++) {        
            if (objSelect.options[i].value == objItemValue) {        
                objSelect.options[i].text = objItemText;        
                break;        
            }        
        }        
        alert("成功修改");        
    } else {        
        alert("该select中 不存在该项");        
    }        
}        
   
// 6.设置select中text="paraText"的第一个Item为选中        
function selectItemByText(objSelect, objItemText) {            
    //判断是否存在        
    var isExit = false;        
    for (var i = 0; i < objSelect.options.length; i++) {        
        if (objSelect.options[i].text == objItemText) {        
            objSelect.options[i].selected = true;        
            isExit = true;        
            break;        
        }        
    }              
    //Show出结果        
    if (isExit) {        
        alert("成功选中");        
    } else {        
        alert("该select中 不存在该项");        
    }        
}        
   
// 7.设置select中value="paraValue"的Item为选中   
	function selectItemByValue(_objItemValue)
	{
		document.all.objSelect.value = _objItemValue;    
	}
 
// 8.得到select的当前选中项的value  
	function getSelectedValue(objSelect)
	{
		var currSelectValue = document.all.objSelect.value;  
		return   currSelectValue;
     }  
     
// 9.得到select的当前选中项的text
	function getSelectedText(objSelect)
	{    
		return objSelect.options[objSelect.selectedIndex].text;    
     }  
     
     function getValueOfIndex(_objSelect,_index)//得到_objSelect中第_index项的值
	{    
		return _objSelect.options[_index].value;    
     }  
// 10.得到select的当前选中项的Index    
//var currSelectIndex = document.all.objSelect.selectedIndex;    
       
// 11.清空select的项 
function removeAllItem(objSelect)
{
	objSelect.options.length = 0;   
}

/*
*	返回select控件的条目的总数
*/
	function getItemCountOfSelect(objSelect)
	{
		return objSelect.options.length;   
	}
//-->