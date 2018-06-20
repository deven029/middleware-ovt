<%@ page import="com.ovt.common.web.rights.bo.*,com.ovt.common.web.rights.model.FunctionSModel,java.util.List,com.ovt.common.web.rights.memoryright.Rights,com.ovt.common.web.rights.model.WorkNoRightAModel"%>
<%

String path = request.getContextPath();
WorkNoRightAModel wrm=(WorkNoRightAModel)session.getAttribute("workno_right");
/*if ((wrm==null)||(!wrm.isActived())){
    session.setAttribute("errorMessage","对不起，鉴权错误，请重新登录"");
		response.sendRedirect( path + "/common/jsp/frame/login.jsp" );
}*/
if ( wrm==null){
    //session.setAttribute("errorMessage","session失效，请重新登录.");
	response.sendRedirect( path + "/common/jsp/frame/login.jsp");
	return ;
}
if (false && !wrm.isActived()){
    //session.setAttribute("errorMessage","鉴权错误，请重新登录.");
	response.sendRedirect( path + "/common/jsp/frame/login.jsp");
	return ;
}
FunctionSModel fsm=Rights.getFunc_hash(wrm.getCurrent_position());
 List next_list= wrm.getNext_list();
session.setAttribute("workno_right",wrm);

//new RightsCheckLogBO().log(request) ;
%>
