<!--
	
	/**
	��������ѡ�е�checkbox��id���ַ������Է���_separator�ָ�
	_preString:��Ҫ�ضϵĿ�ͷ���ַ���
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
	��������ѡ�еĵ����������ڵ��checkbox��id���ַ������Է���_separator�ָ�
	_preString:��Ҫ�ضϵĿ�ͷ���ַ���
	_ExclusionCheckBoxIDString����Ҫ�ų������checkbox��id�ַ���
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
	*ȡ�ø��ڵ�checkbox�ؼ�
	*/
	function getRootCheckBox()//ȡ�ø��ڵ�checkbox�ؼ�
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
	*���ݸ��ڵ��״̬��������checkbox��checked״̬
	*/
	function changeAllCheckedAsRootCheckBox()//���ݸ��ڵ��״̬��������checkbox��checked״̬
	{
	    var rootCheckBox=getRootCheckBox();//ȡ�ø��ڵ�checkbox�ؼ�
	    
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