<!--
	
	/**
		��������ͬ����radio�ؼ�
	*/
	function getGroupRadio(_radioName)
	{
		var value=new Array(0);
		var point=0;//����λ��ָ��

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
	ȡ��һ����Ϊ_groupName��radio��ѡ�����ֵ
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