<!--
	
	/**
		返回所有同名的radio控件
	*/
	function getGroupRadio(_radioName)
	{
		var value=new Array(0);
		var point=0;//数组位置指针

		var allRadio=getAllControl("radio");
		 
		var len=allRadio.length;


		for(var i=0;i<len;i++)
		{
			if(allRadio[i].name==_radioName)
			{
				value[point++]=allRadio[i];
			}
		}
		return value;
	}
	
	/**
	取得一组名为_groupName的radio的选中项的值
	*/
	function getGroupValue(_groupName)
	{
	    var v="";

		var groupRadio=getGroupRadio(_groupName);
		var len=groupRadio.length;
		
		for(var i=0;i<len;i++)
		{
			if(groupRadio[i].checked==true)
			{
				v=groupRadio[i].value;
				break;
			}
		}
		
		return v;
	}
	//-->