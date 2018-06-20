<!-- jQuery -->
<link type="text/css" href="<%=request.getContextPath()%>/common/js/jquery/css/start/jquery-ui-1.8.custom.css" rel="stylesheet" />	
<script type="text/javascript" src="<%=request.getContextPath()%>/common/js/jquery/js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/js/jquery/js/jquery-ui-1.8.custom.min.js"></script>


<!-- xtree -->
<script language="JavaScript">
	var contextPath='<%=request.getContextPath() %>';
</script>
<script language="javascript" src="<%=request.getContextPath()%>/common/js/toolbar.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/common/js/prototype.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/common/js/sitech.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/common/js/xtree/xtree.js"></script>
<link href="<%=request.getContextPath()%>/common/css/xtree.css"	rel="stylesheet" type="text/css">
<script language="javascript">
function checkAllSonById(currentCheck , elementName ) 
{
  var checkbox = document.getElementsByName( elementName );

  var code = currentCheck.id;
  
  for( i=0 ; i<checkbox.length;i++){
  	if( currentCheck.checked==true){
  		if( checkbox[i] != currentCheck ){
  			if( code.indexOf( checkbox[i].id ) == 0 ){
  				checkbox[i].checked = true;
  			}
  		}
  	}
  	if( checkbox[i] != currentCheck ){
  		if( checkbox[i].id.indexOf( code ) == 0 ){
			checkbox[i].checked = currentCheck.checked ;
		}
  	}
  }
}
</script>
