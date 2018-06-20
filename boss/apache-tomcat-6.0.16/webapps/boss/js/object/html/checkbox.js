<!--
	
	/**
	返回所有选中的checkbox的id的字符串，以符号_separator分隔
	_preString:需要截断的开头的字符串
	*/
	function getAllSelectedCheckBoxIdStr(_separator,_preString)
	{
		var allCheckBox=getAllControl("checkbox");
		
		var len=allCheckBox.length;

		var value="";
		for(var i=0;i<len;i++)
		{
			if(allCheckBox[i].checked==true)
			{
				if(value.length>0) value+=_separator;
				var currId=allCheckBox[i].id;
				
				if(typeof(_preString)!="undefined")	currId=currId.substring(_preString.length);
				value+=currId;
			}
		}
		return value;
	}
	
		/**
	返回所有选中的但不包含根节点的checkbox的id的字符串，以符号_separator分隔
	_preString:需要截断的开头的字符串
	_ExclusionCheckBoxIDString：需要排除在外的checkbox的id字符串
	*/
	function getAllSelectedCheckBoxIdStrExclusionCheckBox(_separator,_preString,_ExclusionCheckBoxIDString)
	{
		var allCheckBox=getAllControl("checkbox");
		var len=allCheckBox.length;

		var value="";
		for(var i=0;i<len;i++)
		{
			if(allCheckBox[i].checked==true && allCheckBox[i].id!=_ExclusionCheckBoxIDString)
			{
				if(value.length>0) value+=_separator;
				var currId=allCheckBox[i].id;
				
				if(typeof(_preString)!="undefined")	currId=currId.substring(_preString.length);
				value+=currId;
			}
		}
		return value;
	}
	
	/**
	*取得根节点checkbox控件
	*/
	function getRootCheckBox()//取得根节点checkbox控件
	{
		var allCheckBox=getAllControl("checkbox");
		var len=allCheckBox.length;

		for(var i=0;i<len;i++)
		{
			if(allCheckBox[i].isRoot=='true')
			{
				return allCheckBox[i];
			}
		}
		return null;
	}
	
	/**
	*根据根节点的状态更改所有checkbox的checked状态
	*/
	function changeAllCheckedAsRootCheckBox()//根据根节点的状态更改所有checkbox的checked状态
	{
	    var rootCheckBox=getRootCheckBox();//取得根节点checkbox控件
	    
		var allCheckBox=getAllControl("checkbox");
		var len=allCheckBox.length;

		for(var i=0;i<len;i++)
		{
			if(allCheckBox[i].id!=rootCheckBox.id)
			{
				allCheckBox[i].checked=rootCheckBox.checked;
			}
		}
	}
	
	//-->