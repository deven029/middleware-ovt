<!--
// 1.�ж�selectѡ���� �Ƿ����Value="paraValue"��Item        
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
   
// 2.��selectѡ���� ����һ��Item        
function addItemToSelect(objSelect, objItemText, objItemValue) {        
    //�ж��Ƿ����        
    if (exitItemInSelectControl(objSelect, objItemValue)) {        
        alert("��Item��Valueֵ�Ѿ�����");        
    } else {        
        var varItem = new Option(objItemText, objItemValue);      
        objSelect.options.add(varItem);     
       // alert("�ɹ�����");     
    }        
}        
   
// 3.��selectѡ���� ɾ��һ��Item        
function removeItemFromSelect(objSelect, objItemValue) {        
    //�ж��Ƿ����        
    if (exitItemInSelectControl(objSelect, objItemValue)) {        
        for (var i = 0; i < objSelect.options.length; i++) {        
            if (objSelect.options[i].value == objItemValue) {        
                objSelect.options.remove(i);        
                break;        
            }        
        }        
        alert("�ɹ�ɾ��");        
    } else {        
        alert("��select�� �����ڸ���");        
    }        
}    
   
   
// 4.ɾ��select��ѡ�е���    
function removeSelectedItemFromSelect(objSelect) {        
    var length = objSelect.options.length - 1;    
    for(var i = length; i >= 0; i--){    
        if(objSelect[i].selected == true){    
            objSelect.options[i] = null;    
        }    
    }    
}      
   
// 5.�޸�selectѡ���� value="paraValue"��textΪ"paraText"        
function updateSelectedItemText(objSelect, objItemText, objItemValue) {        
    //�ж��Ƿ����        
    if (exitItemInSelectControl(objSelect, objItemValue)) {        
        for (var i = 0; i < objSelect.options.length; i++) {        
            if (objSelect.options[i].value == objItemValue) {        
                objSelect.options[i].text = objItemText;        
                break;        
            }        
        }        
        alert("�ɹ��޸�");        
    } else {        
        alert("��select�� �����ڸ���");        
    }        
}        
   
// 6.����select��text="paraText"�ĵ�һ��ItemΪѡ��        
function selectItemByText(objSelect, objItemText) {            
    //�ж��Ƿ����        
    var isExit = false;        
    for (var i = 0; i < objSelect.options.length; i++) {        
        if (objSelect.options[i].text == objItemText) {        
            objSelect.options[i].selected = true;        
            isExit = true;        
            break;        
        }        
    }              
    //Show�����        
    if (isExit) {        
        alert("�ɹ�ѡ��");        
    } else {        
        alert("��select�� �����ڸ���");        
    }        
}        
   
// 7.����select��value="paraValue"��ItemΪѡ��   
	function selectItemByValue(_objItemValue)
	{
		document.all.objSelect.value = _objItemValue;    
	}
 
// 8.�õ�select�ĵ�ǰѡ�����value  
	function getSelectedValue(objSelect)
	{
		var currSelectValue = document.all.objSelect.value;  
		return   currSelectValue;
     }  
     
// 9.�õ�select�ĵ�ǰѡ�����text
	function getSelectedText(objSelect)
	{    
		return objSelect.options[objSelect.selectedIndex].text;    
     }  
     
     function getValueOfIndex(_objSelect,_index)//�õ�_objSelect�е�_index���ֵ
	{    
		return _objSelect.options[_index].value;    
     }  
// 10.�õ�select�ĵ�ǰѡ�����Index    
//var currSelectIndex = document.all.objSelect.selectedIndex;    
       
// 11.���select���� 
function removeAllItem(objSelect)
{
	objSelect.options.length = 0;   
}

/*
*	����select�ؼ�����Ŀ������
*/
	function getItemCountOfSelect(objSelect)
	{
		return objSelect.options.length;   
	}
//-->