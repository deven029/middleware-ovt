package org.apache.jsp.common.jsp.frame;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import com.ovt.common.web.util.ResourceUtil;
import com.ovt.common.web.rights.bo.*;
import com.ovt.common.web.rights.model.FunctionSModel;
import java.util.List;
import com.ovt.common.web.rights.memoryright.Rights;
import com.ovt.common.web.rights.model.WorkNoRightAModel;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  static {
    _jspx_dependants = new java.util.ArrayList(1);
    _jspx_dependants.add("/common/jsp/frame/check.jsp");
  }

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.AnnotationProcessor _jsp_annotationprocessor;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=utf-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n");
      out.write("\r\n");
      out.write('\r');
      out.write('\n');


String path = request.getContextPath();
WorkNoRightAModel wrm=(WorkNoRightAModel)session.getAttribute("workno_right");
/*if ((wrm==null)||(!wrm.isActived())){
    session.setAttribute("errorMessage","å¯¹ä¸èµ·ï¼é´æéè¯¯ï¼è¯·éæ°ç»å½"");
		response.sendRedirect( path + "/common/jsp/frame/login.jsp" );
}*/
if ( wrm==null){
    //session.setAttribute("errorMessage","sessionå¤±æï¼è¯·éæ°ç»å½.");
	response.sendRedirect( path + "/common/jsp/frame/login.jsp");
	return ;
}
if (false && !wrm.isActived()){
    //session.setAttribute("errorMessage","é´æéè¯¯ï¼è¯·éæ°ç»å½.");
	response.sendRedirect( path + "/common/jsp/frame/login.jsp");
	return ;
}
FunctionSModel fsm=Rights.getFunc_hash(wrm.getCurrent_position());
 List next_list= wrm.getNext_list();
session.setAttribute("workno_right",wrm);

//new RightsCheckLogBO().log(request) ;

      out.write('\r');
      out.write('\n');
      out.write(" \r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");

  String system_name = ResourceUtil.getString("system.name.full");	

      out.write('\r');
      out.write('\n');

  String province = ResourceUtil.getString("system.province");	
	int topHeight = 76 ;
  if( province.equals("cq") ){
  topHeight = 100 ;
}else if( province.equals("tj") ){
}
      out.write("\r\n");
      out.write("<title>");
      out.print(system_name);
      out.write("</title>\r\n");
      out.write("</head>\r\n");
      out.write("<!--\r\n");
      out.write("<frameset rows=\"15%,*\" cols=\"*\" frameborder=\"0\" border=\"0\" framespacing=\"0\">\r\n");
      out.write("  <frame src=\"top.htm\" name=\"top\" frameborder=\"0\" scrolling=\"NO\" noresize>\r\n");
      out.write("  <frameset rows=\"*\" cols=\"25%,*\" framespacing=\"0\" frameborder=\"0\" scrolling=\"auto\" border=\"0\">\r\n");
      out.write("    <frame src=\"tree.jsp\" frameborder=\"0\" name=\"left\" scrolling=\"auto\" >\r\n");
      out.write("    <frame src=\"content.jsp\" frameborder=\"0\"  name=\"right\" scrolling=\"auto\">\r\n");
      out.write("  </frameset>\r\n");
      out.write("</frameset>\r\n");
      out.write("-->\r\n");
      out.write("<frameset rows=\"");
      out.print(topHeight);
      out.write(",*\" cols=\"*\" frameborder=\"no\" border=\"0\" framespacing=\"0\">\r\n");
      out.write("  <frame src=\"top.jsp\" name=\"top\" scrolling=\"no\" noresize>\r\n");
      out.write("  <frameset rows=\"*,24\" cols=\"*\" framespacing=\"0\" frameborder=\"no\" border=\"0\">\r\n");
      out.write("    <frameset rows=\"*\" cols=\"250,*\" framespacing=\"0\" frameborder=\"no\" border=\"0\">\r\n");
      out.write("      <frame src=\"tree.jsp\" name=\"left\" scrolling=\"auto\">\r\n");
      out.write("      <frame src=\"content.jsp\" name=\"right\" scrolling=\"auto\">\r\n");
      out.write("    </frameset>\r\n");
      out.write("    <frame src=\"buttom.jsp\" name=\"bottomFrame\" scrolling=\"no\" noresize>\r\n");
      out.write("  </frameset>\r\n");
      out.write("</frameset>\r\n");
      out.write("<noframes>\r\n");
      out.write("<body>\r\n");
      out.write("</body>\r\n");
      out.write("</noframes>\r\n");
      out.write("</html>\r\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
