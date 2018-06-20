<%@page contentType="text/html; charset=utf-8"%>
<%
/*
	本文件说明：
	1、如果有消息，使用javascript显示消息；
	2、如果要求刷新调用窗口，刷新；
	3、关闭本窗口；
	4、opener.focus();
*/
%>
<%
	String msg=(String)session.getAttribute("msg");
	//out.print("msg=["+msg+"]");
	//if(true==true) return;
	if(msg!=null)
	{
%>
		<script type="text/javascript">
			window.alert('<%=msg%>');
		</script>
<%		
	}
	session.setAttribute("msg",null);
	String refreshOpener=(String)request.getParameter("refreshOpener");
	if(refreshOpener!=null && refreshOpener.equals("true"))
	{
%>
		<script type="text/javascript">
  			window.location.reload();
		</script>			
<%
	}
%>		
		<script type="text/javascript">
     		//window.close();
			//opener.focus();
		</script>			