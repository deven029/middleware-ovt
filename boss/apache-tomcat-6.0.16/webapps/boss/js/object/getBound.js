<!--
//获得非body元素的边界值
function getBound(Obj)
{
	objHeight=0;
	objWidth=0;
	
    for(var sumTop = 0, sumLeft = 0; Obj != document.body;)
    {
  		sumTop += Obj.offsetTop;
		sumLeft += Obj.offsetLeft;
		if(objHeight==0) objHeight=Obj.offsetHeight;//没有计算过，表示是我们要的对象，而不是他的父对象或者容器对象
		if(objWidth==0) objWidth=Obj.offsetWidth;//没有计算过，表示是我们要的对象，而不是他的父对象或者容器对象
		Obj=Obj.offsetParent;
	}
	
    var objBottom=sumTop*1+objHeight;
	var objRight=sumLeft*1+objWidth;

    return {left:sumLeft,top:sumTop,bottom:objBottom,right:objRight};
}

//获得body元素的边界值
function getBodyBound()
{
    Obj = document.body;
    objHeight=0;
    objWidth=0;
	
    sumTop = Obj.offsetTop;
    sumLeft= Obj.offsetLeft;
    objHeight=Obj.offsetHeight;//没有计算过，表示是我们要的对象，而不是他的父对象或者容器对象
    objWidth=Obj.offsetWidth;//没有计算过，表示是我们要的对象，而不是他的父对象或者容器对象

    var objBottom=sumTop*1+objHeight;
    var objRight=sumLeft*1+objWidth;

    return {left:sumLeft,top:sumTop,bottom:objBottom,right:objRight};
}

//调整内容部分的尺寸
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