<!--
//��÷�bodyԪ�صı߽�ֵ
function getBound(Obj)
{
	objHeight=0;
	objWidth=0;
	
    for(var sumTop = 0, sumLeft = 0; Obj != document.body;)
    {
  		sumTop += Obj.offsetTop;
		sumLeft += Obj.offsetLeft;
		if(objHeight==0) objHeight=Obj.offsetHeight;//û�м��������ʾ������Ҫ�Ķ��󣬶��������ĸ����������������
		if(objWidth==0) objWidth=Obj.offsetWidth;//û�м��������ʾ������Ҫ�Ķ��󣬶��������ĸ����������������
		Obj=Obj.offsetParent;
	}
	
    var objBottom=sumTop*1+objHeight;
	var objRight=sumLeft*1+objWidth;

    return {left:sumLeft,top:sumTop,bottom:objBottom,right:objRight};
}

//���bodyԪ�صı߽�ֵ
function getBodyBound()
{
    Obj = document.body;
    objHeight=0;
    objWidth=0;
	
    sumTop = Obj.offsetTop;
    sumLeft= Obj.offsetLeft;
    objHeight=Obj.offsetHeight;//û�м��������ʾ������Ҫ�Ķ��󣬶��������ĸ����������������
    objWidth=Obj.offsetWidth;//û�м��������ʾ������Ҫ�Ķ��󣬶��������ĸ����������������

    var objBottom=sumTop*1+objHeight;
    var objRight=sumLeft*1+objWidth;

    return {left:sumLeft,top:sumTop,bottom:objBottom,right:objRight};
}

//�������ݲ��ֵĳߴ�
function adjustContentSize(_THIS,_maxHeight)
{
	//alert(_THIS);
	var obj=getBound(_THIS);
	var top=obj.top;
	var bottom=obj.bottom;
	var height=bottom-top;
	//alert(_THIS+":"+height);
	if(height>_maxHeight)
	{
		_THIS.style.height=_maxHeight;
	}
	//alert(height);
}

-->