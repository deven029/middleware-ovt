<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.List, com.ovt.common.monitor.alarm.model.*"%>
<%
	List userList = (List) request.getAttribute("userList");
	MonitorUserVO user = null;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>Insert title here</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<style type="text/css">
#user{
  position:absolute;
  left:200;
  top:200;
  width:63%;
  
  background-color:white;
  font-size:2;
  font-style:italic;
  font-family:verdana,sans-serif;
  border-width:3;
  border-color:blue;
  border-style:double;
  padding:3;
}
</style>
		<script type="text/javascript" language="javascript" src=""></script>
		<script type="text/javascript" language="javascript">

</script>
	</head>
	<body>
		<form>
			<div id=user>
				<table>
					<thead>
						<tr>
							<th>
								用户ID
							</th>
							<th>
								用户组ID
							</th>
							<th>
								用户类型
							</th>
							<th>
								手机号
							</th>
							<th>
								Email
							</th>
							<th>
								用户描述
							</th>
						</tr>
					</thead>
					
					<tbody align=center>

						<%
								if (userList != null) {
								for (int i = 0; i < userList.size(); i++) {
									user = (MonitorUserVO) userList.get(i);
						%>
						<tr>
							<td>
								<%=user.getId()%>
							</td>
							<td>
								<%=user.getParentId()%>
							</td>
							<td>
								<%=user.getItemType()%>
							</td>
							<td>
								<%=user.getPhoneNumber()%>
							</td>
							<td>
								<%=user.getEmail()%>
							</td>
							<td>
								<%=user.getDescription()%>
							</td>
						</tr>
						<%
							}
							}
						%>

					</tbody>
					
				</table>
			</div>
		</form>
	</body>
</html>
