package org.apache.jsp.common_005fextends.jsp.frame;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class tree_jsp extends org.apache.jasper.runtime.HttpJspBase
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

      out.write('\n');
      out.write('\n');
 String path = request.getContextPath(); 
      out.write("\n");
      out.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\"\n");
      out.write("\"http://www.w3.org/TR/html4/loose.dtd\">\n");
      out.write("<html>\n");
      out.write("<head>\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n");
      out.write("<title>无标题文档</title>\n");
      out.write(" <meta http-equiv=\"pragma\" content=\"no-cache\">\n");
      out.write("  <meta http-equiv=\"cache-control\" content=\"no-cache\">\n");
      out.write("  <meta http-equiv=\"expires\" content=\"0\">    \n");
      out.write("  <script language=\"javascript\" src=\"");
      out.print( path );
      out.write("/common/js/xtree/xtree.js\"></script>\n");
      out.write("  <link href=\"");
      out.print( path );
      out.write("/common/css/xtree.css\" rel=\"stylesheet\" type=\"text/css\">\n");
      out.write("<style type=\"text/css\">\n");
      out.write("<!--\n");
      out.write(".style2 {font-size: 14px}\n");
      out.write("body {\n");
      out.write("\tmargin-top: 0px;\n");
      out.write("\tbackground-image: url();\n");
      out.write("\tmargin-left: 0px;\n");
      out.write("}\n");
      out.write("-->\n");
      out.write("</style>\n");
      out.write(" <script>\n");
      out.write("<!--\n");
      out.write("function windowopen(){\n");
      out.write("var target=\"search_top.htm\"\n");
      out.write("newwindow=window.open(\"\",\"\",\"scrollbars\")\n");
      out.write("if (document.all){\n");
      out.write("newwindow.moveTo(0,0)\n");
      out.write("newwindow.resizeTo(screen.width,screen.height)\n");
      out.write("}\n");
      out.write("newwindow.location=target\n");
      out.write("}\n");
      out.write("//-->\n");
      out.write("</script>\n");
      out.write("</head>\n");
      out.write("<body topmargin=\"0\" bgcolor=\"D4E3F6\">\n");
      out.write("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n");
      out.write("  <tr bgcolor=\"418DDA\">\n");
      out.write("    <td colspan=\"2\"><img src=\"");
      out.print( path );
      out.write("/common/images/arrow.gif\" width=\"20\" height=\"10\"></td>\n");
      out.write("  </tr>\n");
      out.write("  <tr>\n");
      out.write("  <td>\n");
      out.write("\t  <table width=100% border=0 cellpadding=0 cellspacing=0><br/>\n");
      out.write("\t\t    <div id=divList>\n");
      out.write("\t\t    ");
      if (_jspx_meth_app_005ftree_005f0(_jspx_page_context))
        return;
      out.write("  \n");
      out.write("\t\t    </div>\n");
      out.write("\t   </TABLE>\n");
      out.write("  </td>\n");
      out.write("  </tr>\n");
      out.write("</table>\n");
      out.write("</body>\n");
      out.write("</html>\n");
if(request.getParameter( "expandTreeItem" )!=null){ 
      out.write("\n");
      out.write("<script language=\"JavaScript\">\n");
      out.write("\ttreenode0.expandToTreeItem( '");
      out.print(request.getParameter( "expandTreeItem" ));
      out.write("' ) ;\n");
      out.write("</script>\n");
} 
      out.write('\n');
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
    // /common_extends/jsp/frame/tree.jsp(48,6) name = treetype type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_app_005ftree_005f0.setTreetype("workno_func");
    // /common_extends/jsp/frame/tree.jsp(48,6) name = step type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
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
