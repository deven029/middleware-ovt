<!--
	//����span��flag����=_flagValue������span�ؼ�
	function filterByFlag(_spanArray,_flagValue)
	{
		var value=new Array(0);
		var point=0;//����λ��ָ��
		if(_spanArray==null) return value;

		var len=_spanArray.length;
		for(var i=0;i<len;i++)
		{
			var spanFlag=_spanArray[i].flag;
			if(spanFlag==_flagValue)
			{
				value[point++]=_spanArray[i];
			}
		}
		return value;
	}

	//ѭ������_spanArray���������е�span�Ŀɼ���Ϊ_visiable
	function setVisiable(_spanArray,_visiable)
	{
		if(_spanArray==null) return null;
		var len=_spanArray.length;
		for(var i=0;i<len;i++)
		{
			if(_visiable==true) _spanArray[i].style.display='';
			else _spanArray[i].style.display='none';
		}
	}

	//ѭ��Toggle����_spanArray���������е�span�Ŀɼ���
	//��ǰ�ɼ��ģ�����Ϊ���ɼ�����ǰ���ɼ��ģ�����Ϊ�ɼ���
	function toggleVisiable(_spanArray)
	{
		if(_spanArray==null) return null;
		var len=_spanArray.length;
		for(var i=0;i<len;i++)
		{
			if(_spanArray[i].style.display=='') _spanArray[i].style.display='none';
			else _spanArray[i].style.display='';
		}
	}

//-->