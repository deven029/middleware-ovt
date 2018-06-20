<!--
	//循环节obj的可视状态
    function changeVisiable(_obj,_cp)//,_openHTML,_closeHTML)
    {
         var t=_obj.id;
         tc=t+'_content';
         tc=document.getElementById(tc);
         dis=tc.style.display; 

          //if(typeof(_openHTML)=='undefined' || _openHTML=='null' || _openHTML is null) 
		  _openHTML="<img src="+_cp+"/images/file/open.jpg>";
		  //if(typeof(_closeHTML)=='undefined' || _closeHTML=='null' || _closeHTML is null) 
		  _closeHTML="<img src="+_cp+"/images/file/close.jpg>";
         if(dis=='')
         {
				_obj.innerHTML=_closeHTML;//'<font color=red><b>+</b></font>';
                tc.style.display='none';
         }
         else
         {
                _obj.innerHTML=_openHTML;//'<font color=blue><b>-</b></font>';
                tc.style.display='';
         }

		 cancelBubble();
     }
	 
	 function setVisiable(_obj,_visiableState)//,_visiableState代表是否可见，boolean型，取值为true或false)
    {
		if(_visiableState==true) _obj.style.display='';
		else _obj.style.display='none';
     }
     
	 function cancelBubble()//取消冒泡机制
	 {

		 var evt =event; 
		 if(evt.preventDefault)
			 {   
        		// Firefox   
        evt.preventDefault();   
        evt.stopPropagation();   
    	} else
			{   
        // IE   
        evt.cancelBubble=true;   
        evt.returnValue = false;   
    	}   

	 }
	 
	 //返回url字符串中的参数的值，比如http://...........jsp?musicid=1&id=3,传入musicid返回“3”
	 function getParameter(_searchString,_paramName)
	 {
		 try
		 {
		 _searchString=_searchString.split("?")[1];
		 var searchStr=_searchString.split("&");
		var len=searchStr.length;
		for(i=0;i<len;i++)
		{
			//alert("searchStr[i]="+searchStr[i]);
			var tempArray=searchStr[i].split("=");
			if(tempArray[0]=="musicid")
			{
				return tempArray[1];
			}
		}
		 }
		 catch(e)
		 {
			 return null;
		 }
		return null;
	 }
//-->