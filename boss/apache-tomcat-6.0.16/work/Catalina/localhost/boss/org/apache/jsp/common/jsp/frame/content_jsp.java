package org.apache.jsp.common.jsp.frame;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class content_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  static {
    _jspx_dependants = new java.util.ArrayList(1);
    _jspx_dependants.add("/common/taglib/app.tld");
  }

  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fapp_005ftree_005ftreetype_005fstep_005fnobody;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.AnnotationProcessor _jsp_annotationprocessor;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _005fjspx_005ftagPool_005fapp_005ftree_005ftreetype_005fstep_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005fapp_005ftree_005ftreetype_005fstep_005fnobody.release();
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
      response.setContentType("text/html;charset=utf-8");
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
  
	String path = request.getContextPath();

      out.write("\r\n");
      out.write("<html >\r\n");
      out.write("<head>\r\n");
      out.write("<meta http-equiv='Expires' content='0'>\r\n");
      out.write("<meta http-equiv='Pragma'  content='no-cache'>\r\n");
      out.write("<meta http-equiv='Cache-Control' content='no-cache'>\r\n");
      out.write("<link href=\"");
      out.print( path );
      out.write("/common/css/menu.css\" rel=\"stylesheet\" type=\"text/css\">\r\n");
      out.write("<title></title>\r\n");
      out.write("</head> \r\n");
      out.write("<body style=\"BACKGROUND-ATTACHMENT: fixed\" >\r\n");
      out.write("\r\n");
      out.write("<table width='95%' cellspacing='0' cellpadding='0' border='0'>\r\n");
      out.write(" <tr>\r\n");
      out.write("   <td nowrap class='top-info-background' align='left'>\r\n");
      out.write("\t <span class='bannerstatus'>当前位置：首页</span>\r\n");
      out.write("   </td>\r\n");
      out.write(" </tr>\r\n");
      out.write("</table>\r\n");
      out.write("<div class='content'>\r\n");
      out.write("   ");
      if (_jspx_meth_app_005ftree_005f0(_jspx_page_context))
        return;
      out.write("  \r\n");
      out.write("</div>\r\n");
      out.write("</body>\r\n");
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

  private boolean _jspx_meth_app_005ftree_005f0(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  app:tree
    com.ovt.common.web.taglib.tree _jspx_th_app_005ftree_005f0 = (com.ovt.common.web.taglib.tree) _005fjspx_005ftagPool_005fapp_005ftree_005ftreetype_005fstep_005fnobody.get(com.ovt.common.web.taglib.tree.class);
    _jspx_th_app_005ftree_005f0.setPageContext(_jspx_page_context);
    _jspx_th_app_005ftree_005f0.setParent(null);
    // /common/jsp/frame/content.jsp(24,3) name = treetype type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_app_005ftree_005f0.setTreetype("main_menu");
    // /common/jsp/frame/content.jsp(24,3) name = step type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_app_005ftree_005f0.setStep("2");
    int _jspx_eval_app_005ftree_005f0 = _jspx_th_app_005ftree_005f0.doStartTag();
    if (_jspx_th_app_005ftree_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fapp_005ftree_005ftreetype_005fstep_005fnobody.reuse(_jspx_th_app_005ftree_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005fapp_005ftree_005ftreetype_005fstep_005fnobody.reuse(_jspx_th_app_005ftree_005f0);
    return false;
  }
}
