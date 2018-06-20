function getAbsoluteOffsetTop(obj) {
	var y = obj.offsetTop;
	while (obj = obj.offsetParent) y += obj.offsetTop;
	
	return y ;
}

function getAbsoluteOffsetLeft(obj) {
	var x = obj.offsetLeft;
	while (obj = obj.offsetParent) x += obj.offsetLeft;
	
	return x;
}

//����isIE�Ƕ����һ�����ڼ���Ƿ���IE�����ı�:
//���IE�����(������Javascript�߼��������)
var sUserAgent = navigator.userAgent;
var isOpera = sUserAgent.indexOf("Opera") > -1;
var isIE = sUserAgent.indexOf("compatible") > -1 && sUserAgent.indexOf("MSIE") > -1 && !isOpera;

function showElement( elementName ){
		document.getElementById( elementName ).style.display="" ;
  }
	function hideElement( elementName ){
		document.getElementById( elementName ).style.display="none" ;
  }
  function hideSearchMethodDiv(){
  	document.getElementById( "search1" ).style.display="none" ;
  }
  function showSearchMethodDiv( inputElement , offsetLeft , offsetTop , firefoxOffsetLeft , firefoxOffsetTop ){
	  if( !offsetLeft ){
	  	offsetLeft = 0;
	  }
	  if( !offsetTop ){
	  	offsetTop = 0;
	  }
	  if( !firefoxOffsetLeft ){
	  	firefoxOffsetLeft = 0;
	  }
	  if( !firefoxOffsetTop ){
	  	firefoxOffsetTop = 0;
	  }
	  
  	if( inputElement ){
  		elementX = getAbsoluteOffsetLeft( inputElement ) + offsetLeft ;
  		elementY = getAbsoluteOffsetTop( inputElement ) + 20 + offsetTop ;
  		
  		if( !isIE ){
  			elementX += firefoxOffsetLeft ;
  			elementY += firefoxOffsetTop ;
  			elementX -= 22 ;
  			elementY += 10 ;
  			elementX += "px" ;
  			elementY += "px" ;
  			document.getElementById("search1").style.left = elementX ;
	  		document.getElementById("search1").style.top = elementY ;
		  	document.getElementById("search1").style.display="" ;
  		}else{
  			elementX -= 22 ;
  			document.getElementById("search1").style.posLeft = elementX ;
	  		document.getElementById("search1").style.posTop = elementY ;
		  	document.getElementById("search1").style.display="" ;
  		}
  	}else{
	  	document.getElementById("search1").style.display="" ;
	}
  }
  function showCommunitySearchMethodDiv( inputElement , offsetLeft , offsetTop , firefoxOffsetLeft , firefoxOffsetTop){
	  if( !offsetLeft ){
	  	offsetLeft = 0;
	  }
	  if( !offsetTop ){
	  	offsetTop = 0;
	  }
	  if( !firefoxOffsetLeft ){
	  	firefoxOffsetLeft = 0;
	  }
	  if( !firefoxOffsetTop ){
	  	firefoxOffsetTop = 0;
	  }
  	if( inputElement ){
  		elementX = getAbsoluteOffsetLeft( inputElement ) + offsetLeft ;
  		elementY = getAbsoluteOffsetTop( inputElement ) + 20 + offsetTop ;
  		
  		if( !isIE ){
  			elementX += firefoxOffsetLeft ;
  			elementY += firefoxOffsetTop ;
  			elementX -= 22 ;
  			elementY += 10 ;
  			elementX += "px" ;
  			elementY += "px" ;
  			document.getElementById("communitySearchMethod").style.left = elementX ;
	  		document.getElementById("communitySearchMethod").style.top = elementY ;
		  	document.getElementById("communitySearchMethod").style.display="" ;
  		}else{
  			elementX -= 22 ;
  			document.getElementById("communitySearchMethod").style.posLeft = elementX ;
	  		document.getElementById("communitySearchMethod").style.posTop = elementY ;
		  	document.getElementById("communitySearchMethod").style.display="" ;
  		}
  		
  	}else{
	  	document.getElementById("communitySearchMethod").style.display="" ;
	}
  }
  function setCurrentRank( rankName , selectedRank ){
  	setCurrentElement( rankName , selectedRank ) ;
  	for( i = 1 ; i < 10 ; i++ ){
		if( document.getElementById( rankName + "_class_" + i ) ){
			document.getElementById( rankName + "_class_" + i ).className="" ;
		}
	}
	if( document.getElementById( rankName + "_class_" + selectedRank ) ){
	  	document.getElementById( rankName + "_class_" + selectedRank ).className = "choice" + selectedRank ;
	}
  	
  }
  function setCurrentRank2( rankName , selectedRank ){
  	setCurrentElement( rankName , selectedRank ) ;
  	for( i = 1 ; i < 10 ; i++ ){
		if( document.getElementById( rankName + "_class_" + i ) ){
			document.getElementById( rankName + "_class_" + i ).className="" ;
		}
	}
	if( document.getElementById( rankName + "_class_" + selectedRank ) ){
	  	document.getElementById( rankName + "_class_" + selectedRank ).className = "choiceB" + selectedRank ;
	}
  	
  }
  function setCurrentTJ( tjName , selectedTJ ){
  	setCurrentElement( tjName , selectedTJ ) ;
  	//	document.getElementById( tjName + "_1" ).style.display="none" ;
  	//	document.getElementById( tjName + "_2" ).style.display="none" ;
  	//	document.getElementById( tjName + "_" + selectedTJ ).style.display="" ;
  	
  }
  function setCurrentElement( typeName , typeIndex ){
  		for( i = 1 ; i < 10 ; i++ ){
  			if( document.getElementById( typeName + "_" + i ) ){
  				document.getElementById( typeName + "_" + i ).style.display="none" ;
  			}
  		}
  		
  		document.getElementById( typeName + "_" + typeIndex ).style.display="" ;
  	
  }
  function MM_findObj(n, d) { //v4.01
	  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	  if(!x && d.getElementById) x=d.getElementById(n); return x;
	}
	
	function MM_setTextOfTextfield(objName,x,newText) { //v3.0
	  var obj = MM_findObj(objName);if (obj) obj.value = newText;
	}
	
	var currentSearchElement ;
	var currentOffsetLeft ;
	var currentOffsetTop ;
	var currentFirefoxOffsetLeft ;
	var currentFirefoxOffsetTop ;
	function findSearchKeywords( inputText , searchType , inputElement , offsetLeft , offsetTop , firefoxOffsetLeft , firefoxOffsetTop ) {  
	  if( !offsetLeft ){
	  	currentOffsetLeft = 0;
	  }else{
	  	currentOffsetLeft = offsetLeft
	  }
	  if( !offsetTop ){
	  	currentOffsetTop = 0;
	  }else{
	  	currentOffsetTop = offsetTop ;
	  }
	  if( !firefoxOffsetLeft ){
	  	currentFirefoxOffsetLeft = 0;
	  }else{
	  	currentFirefoxOffsetLeft = firefoxOffsetLeft ;
	  }
	  if( !firefoxOffsetTop ){
	  	currentFirefoxOffsetTop = 0;
	  }else{
	  	currentFirefoxOffsetTop = firefoxOffsetTop ;
	  }
		showWaitingBar();
		currentSearchElement = inputElement ;
		var reqUrl = contextPath + '/HomeSearchField.jsp';
		var pars = 'inputText=' + inputText + '&searchType=' + searchType;
		var myAjax = new Ajax.Request(reqUrl,{method: 'post',parameters: pars,onComplete: showSearcherKeywords, onFailure: reportError});		

	}
	function showSearcherKeywords(originalRequest )
	{
	  if ( originalRequest.status == 200 ) { 	
	 	 document.getElementById( 'searchKeywords' ).innerHTML=originalRequest.responseText ;
	 	 if( currentSearchElement ){
		 	 	elementX = getAbsoluteOffsetLeft( currentSearchElement ) + currentOffsetLeft ;
	  		elementY = getAbsoluteOffsetTop( currentSearchElement ) + 20 + currentOffsetTop ;
	  		
	  		if( !isIE ){
	  			elementX += currentFirefoxOffsetLeft ;
	  			elementY += currentFirefoxOffsetTop ;
	  			elementX -= 22 ;
	  			elementY += 10 ;
	  			elementX += "px" ;
	  			elementY += "px" ;
	  			document.getElementById("searchKeywords").style.left = elementX ;
		  		document.getElementById("searchKeywords").style.top = elementY ;
			  	document.getElementById("searchKeywords").style.display="" ;
	  		}else{
	  			elementX -= 22 ;
	  			document.getElementById("searchKeywords").style.posLeft = elementX ;
		  		document.getElementById("searchKeywords").style.posTop = elementY ;
			  	document.getElementById("searchKeywords").style.display="" ;
	  		}
	  		
	  	}else{
		  	showElement( 'searchKeywords' ) ;
		}
	 } else { 	
	 	 hideElement( 'searchKeywords' ) ;
	 }
	 hideWaitingBar() ;
	}
	
	function findCommunitySearchKeywords( inputText , searchType , inputElement , offsetLeft , offsetTop , firefoxOffsetLeft , firefoxOffsetTop) { 
	  if( !offsetLeft ){
	  	currentOffsetLeft = 0;
	  }else{
	  	currentOffsetLeft = offsetLeft
	  }
	  if( !offsetTop ){
	  	currentOffsetTop = 0;
	  }else{
	  	currentOffsetTop = offsetTop ;
	  }
	  if( !firefoxOffsetLeft ){
	  	currentFirefoxOffsetLeft = 0;
	  }else{
	  	currentFirefoxOffsetLeft = firefoxOffsetLeft ;
	  }
	  if( !firefoxOffsetTop ){
	  	currentFirefoxOffsetTop = 0;
	  }else{
	  	currentFirefoxOffsetTop = firefoxOffsetTop ;
	  }
		showWaitingBar();  
		currentSearchElement = inputElement ;
		var reqUrl = contextPath + '/HomeSearchField.jsp';
		var pars = 'inputText=' + inputText + '&searchType=' + searchType;
		var myAjax = new Ajax.Request(reqUrl,{method: 'post',parameters: pars,onComplete: showCommunitySearcherKeywords, onFailure: reportError});		

	}
	
	function showCommunitySearcherKeywords(originalRequest)
	{
	  if ( originalRequest.status == 200 ) { 
	  	 document.getElementById( 'communitySearchKeywords' ).innerHTML=originalRequest.responseText ;
	 	 if( currentSearchElement ){
	 	 		elementX = getAbsoluteOffsetLeft( currentSearchElement ) + currentOffsetLeft ;
	  		elementY = getAbsoluteOffsetTop( currentSearchElement ) + 14 + currentOffsetTop ;
	  		
	  		if( !isIE ){
	  			elementX += currentFirefoxOffsetLeft ;
	  			elementY += currentFirefoxOffsetTop ;
	  			elementX -= 22 ;
	  			elementY += 10 ;
	  			elementX += "px" ;
	  			elementY += "px" ;
	  			document.getElementById("communitySearchKeywords").style.left = elementX ;
		  		document.getElementById("communitySearchKeywords").style.top = elementY ;
			  	document.getElementById("communitySearchKeywords").style.display="" ;
	  		}else{
	  			elementX -= 22 ;
	  			document.getElementById("communitySearchKeywords").style.posLeft = elementX ;
		  		document.getElementById("communitySearchKeywords").style.posTop = elementY ;
			  	document.getElementById("communitySearchKeywords").style.display="" ;
	  		}
		 }else{
		 	showElement( 'communitySearchKeywords' ) ;
		 } 		
	 	 
	  } else { 	
	 	 hideElement( 'communitySearchKeywords' ) ;
	  }
	 	hideWaitingBar() ;
	}
	
	function reportError(request)    {    }
	
	function startmarquee(lh,speed,delay,elementName,lineNum,firstDelay){ 
		var t; 
		var p=false; 
		var scrollCount = 2 ;
		var o=document.getElementById(elementName); 
		o.innerHTML+=o.innerHTML; 
		o.onmouseover=function(){p=true} 
		o.onmouseout=function(){p=false} 
		o.scrollTop = 0; 
		function start(){ 
		t=setInterval(scrolling,speed); 
		if(!p) o.scrollTop += 2; 
		} 
		function scrolling(){ 
			if(o.scrollTop%lh!=0){ 
				o.scrollTop += 2; 
				//if(scrollCount == lineNum){
				//	 o.scrollTop = 0; 
				//}
				if(o.scrollTop%lh==0 && scrollCount > lineNum){
					 o.scrollTop = 0; 
					 scrollCount = 1 ;
				}
			}else{ 
				clearInterval(t); 
				setTimeout(start,delay);
				scrollCount ++ ; 
				
			} 
		} 
		setTimeout(start,firstDelay); 
	} 
	
	function addFavorite( favoriteType , favoriteId ) {
		showWaitingBar();
		
		var reqUrl = contextPath + '/user/addFavorite.do';
		var pars = 'favoriteType=' + favoriteType + '&favoriteId=' + favoriteId ;
		
		var myAjax = new Ajax.Request(reqUrl,{method: 'post',parameters: pars,onComplete: showAddFavoriteResult, onFailure: reportError});		
		
	}
	
	function deleteFavorite( favoriteType , favoriteId ) {
		showWaitingBar();
		
		var reqUrl = contextPath + '/user/deleteFavorite.do';
		var pars = 'favoriteType=' + favoriteType + '&favoriteId=' + favoriteId ;
		
		var myAjax = new Ajax.Request(reqUrl,{method: 'post',parameters: pars,onComplete: showDeleteFavoriteResult, onFailure: reportError});		
		
	}
	
	
	function submitPageQuery(pageNo){
		document.getElementById( 'musicPageSearchForm' ).pageNo.value=pageNo ;
		document.getElementById( 'musicPageSearchForm' ).submit() ;
	}
	
	function joinFans( singerId ) {
		showWaitingBar();
		
		var reqUrl = contextPath + '/user/joinFans.do';
		var pars = 'singerId=' + singerId ;
		
		var myAjax = new Ajax.Request(reqUrl,{method: 'post',parameters: pars,onComplete: showCommonResult, onFailure: reportError});		
	}
	
	function exitFans( singerId ) {
		showWaitingBar();
		
		var reqUrl = contextPath + '/user/exitFans.do';
		var pars = 'singerId=' + singerId ;
		
		var myAjax = new Ajax.Request(reqUrl,{method: 'post',parameters: pars,onComplete: showCommonReloadResult, onFailure: reportError});		
	}
	
	function joinCity( cityId ) {	
		showWaitingBar();
		var reqUrl = contextPath + '/user/joinCity.do';
		var pars = 'cityId=' + cityId ;
		var myAjax = new Ajax.Request(reqUrl,{method: 'post',parameters: pars,onComplete: showCommonResult, onFailure: reportError});			
	}
	
	function exitCity( cityId ) {	
		showWaitingBar();
		var reqUrl = contextPath + '/user/exitCity.do';
		var pars = 'cityId=' + cityId ;
		var myAjax = new Ajax.Request(reqUrl,{method: 'post',parameters: pars,onComplete: showCommonReloadResult, onFailure: reportError});			
	}
	
	function getPassword( userPhone ) {
		showWaitingBar();
		var reqUrl = contextPath + '/user/getPassword.do';
		var pars = 'userPhone=' + userPhone ;
		var myAjax = new Ajax.Request(reqUrl,{method: 'post',parameters: pars,onComplete: showCommonResult, onFailure: reportError});				
	}
	
	function getRegistCheckCode( userPhone ) {
		//showWaitingBar();
		var reqUrl = contextPath + '/user/getCheckCode.do';
		var pars = 'userPhone=' + userPhone ;
		var myAjax = new Ajax.Request(reqUrl,{method: 'post',parameters: pars,onComplete: showCommonResult, onFailure: reportError});		
		
	}
	
	function registerUser( userPhone , checkCode ,validateCode ) {
		//showWaitingBar();
		var reqUrl = contextPath + '/user/registUser.do';
		var pars = 'userPhone=' + userPhone + "&checkCode=" + checkCode + "&validateCode=" + validateCode ;
		var myAjax = new Ajax.Request(reqUrl,{method: 'post',parameters: pars,onComplete: showRegisterResult, onFailure: reportError});		
		
	}
	
	function showCommonResult(originalRequest)
	{
		if ( originalRequest.status == 200 ) { 	
			alert( originalRequest.responseText ) ;
		}else{
			errorText = "SORRY��" ;
			
			alert( errorText ) ;
		}
	 	hideWaitingBar() ;
	}
	
	function showCommonReloadResult(originalRequest)
	{
		if ( originalRequest.status == 200 ) { 	
			alert( originalRequest.responseText ) ;
			parent.location.reload();
		}else{
			errorText = "SORRY��" ;
			
			alert( errorText ) ;
		}
	 	hideWaitingBar() ;
	}
		
	function viewCategory( categoryID , pageNo ) {
		showWaitingBar();
		var reqUrl = contextPath + '/rings/categoryRings.do';
		var pars = 'categoryID=' + categoryID + '&pageNo=' + pageNo ;
		var myAjax = new Ajax.Request(reqUrl,{method: 'post',parameters: pars,onComplete: showCategoryRings, onFailure: reportError});				
	}
	
	function showCategoryRings(originalRequest)
	{
		if ( originalRequest.status == 200 ) { 	
			document.getElementById( "ringsContent" ).innerHTML = originalRequest.responseText ;
		}else{
			errorText = "SORRY��" ;
			
			alert( errorText ) ;
		}
	 	hideWaitingBar() ;
	}
		
	function getNewsContent( newsId ) {
		showWaitingBar();
		var reqUrl = contextPath + '/news/getNewsContent.do';
		var pars = 'newsId=' + newsId ;
		var myAjax = new Ajax.Request(reqUrl,{method: 'post',parameters: pars,onComplete: showNewsContent, onFailure: reportError});				
	}
	
	function showNewsContent(originalRequest)
	{
		if ( originalRequest.status == 200 ) { 	
			document.getElementById( "newsContent" ).innerHTML = originalRequest.responseText ;
		}else{
			errorText = "SORRY��" ;
			
			alert( errorText ) ;
		}
	 	hideWaitingBar() ;
	}
	
	
	
	function showWaitingBar(){
	
		var screenWidth = document.body.clientWidth ;
		var screenHeight = document.body.clientHeight ;
		var scrollPos; 
		
		if (typeof window.pageYOffset != 'undefined') { 
		    scrollPos = window.pageYOffset; 
		} 
		else if (typeof document.compatMode != 'undefined' && 
		      document.compatMode != 'BackCompat') { 
		    scrollPos = document.documentElement.scrollTop; 
		} 
		else if (typeof document.body != 'undefined') { 
		    scrollPos = document.body.scrollTop; 
		} 
		//alert(scrollPos);
		
		//screenWidth -= 140 ;
		posLeft = screenWidth / 2 - 70 ;
		posTop = screenHeight / 2 + scrollPos ;
		if( isIE ){
			document.getElementById("waitingBar").style.posLeft = posLeft ;
			document.getElementById("waitingBar").style.posTop = posTop;
			document.getElementById('waitingBar').style.display='' ;	
		}else{
			document.getElementById("waitingBar").style.left = posLeft + "px" ;
			document.getElementById("waitingBar").style.top = posTop + "px";
			document.getElementById('waitingBar').style.display='' ;	
		}	
	}
	
	function hideWaitingBar(){
		document.getElementById('waitingBar').style.display='none' ;
	}
	
	function readNewAlarmContent(){
		var reqUrl = contextPath + '/jsp/ovtMonitor/topAlarmContent.do';
		var pars = '' ;
		var myAjax = new Ajax.Request(reqUrl,{method: 'post',parameters: pars,onComplete: showAlarmContent, onFailure: reportError});		
	}
	function showAlarmContent(originalRequest)
	{
		if ( originalRequest.status == 200 ) {
			document.getElementById( "alarmContent" ).innerHTML = originalRequest.responseText ;
		}else{
			
		}
	}
	function refreshAlarmContent(){
		readNewAlarmContent() ;
		setTimeout( refreshAlarmContent , 10000 ) ;
	}
	
	function submitFormByAjax( formId , successURL , errorURL ) {	
		var currentForm = document.getElementById( formId ) ;
		var url = currentForm.action ;
		var requestMethod = currentForm.method ;
		var queryString = formToRequestString( currentForm ) ;
		queryString = encodeURI(queryString);
    	queryString = encodeURI(queryString);    
		//if( url.indexOf( '?' ) > 0 ){
		//	queryString = url.substr( url.indexOf( '?' ) + 1 ) + '&' + queryString ;
		//	url = url.substr( 0 , url.indexOf( '?' ) ) ;
		//}
		showWaitingBar() ;
		//alert( url ) ;
		//alert( queryString ) ;
		//alert( requestMethod ) ;
		var myAjax = new Ajax.Request(url,{method: requestMethod,parameters: queryString,onSuccess: function submitFormByAjaxFinished(originalRequest){
					hideWaitingBar() ;
					if ( originalRequest.status == 200 ) { 	
						if( originalRequest.responseText == 'success' ) {
							if( successURL ) {
								window.location=successURL
							}else{
								alert( '表单提交失败' ) ;
							}
						}else{
							if( originalRequest.responseText ) {
								alert( originalRequest.responseText ) ;
							}
						}
						
					}else{
						if( originalRequest.responseText ) {
							alert( originalRequest.responseText ) ;
						}
						if( errorURL ) {
							window.location=errorURL
						}
					}
				}, onFailure: function submitFormByAjaxError(originalRequest){
					hideWaitingBar() ;
					alert( '表单提交失败' ) ;
						if( errorURL ) {
							window.location=errorURL
						}
				}});	
	}
	
	function formToRequestString(form_obj)
	{
		var query_string='';
		var and='';
		//alert(form_obj.length);
		for (var i=0;i<form_obj.length ;i++ )
		{
			e=form_obj[i];
			if (e.name!='')
			{
				if (e.type=='select-one')
				{
					element_value=e.options[e.selectedIndex].value;
				}
				else if (e.type=='checkbox' || e.type=='radio')
				{
					if (e.checked==false)
					{
						continue; 
					}
					element_value=e.value;
				}
				else
				{
					element_value=e.value;
				}
				query_string+=and+e.name+'='+element_value.replace(/\&/g,"%26");
				and="&"
			}

		}
		return query_string;
	}
	function setElementValue( id,value){
		elements = document.getElementsByName( id ) ;
		if( !elements ){
			return false ;
		}
		if( elements.tagName ){
			e = elements ;
			elements = new Array() ;
			elements[0]=e ;
		}
		for( i = 0 ; i < elements.length ; i++ ){
			e = elements[i];
			if (e.type=='select-one')
			{
				for (var j=0;j<e.options.length ;j++ )
				{				
					if (e.options(j).value==value)
					{
						e.selectedIndex =j;
						break;
					}
				}
			}
			else if (e.type=='checkbox' || e.type=='radio')
			{
				if (e.value==value)
				{
					e.checked=true; 
				}else{
					e.checked=false;
				}
			}
			else
			{
				e.value=value;
			}
		}
	}
	