<!--
	//根据span的flag属性=_flagValue来过滤span控件
	function filterByFlag(_spanArray,_flagValue)
	{
		var value=new Array(0);
		var point=0;//数组位置指针
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

	//循环设置_spanArray数组中所有的span的可见性为_visiable
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

	//循环Toggle设置_spanArray数组中所有的span的可见性
	//当前可见的，设置为不可见；当前不可见的，设置为可见；
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