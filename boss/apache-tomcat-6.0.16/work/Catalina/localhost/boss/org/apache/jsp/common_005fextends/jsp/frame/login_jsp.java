package org.apache.jsp.common_005fextends.jsp.frame;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import com.ovt.common.web.util.ResourceUtil;
import com.ovt.common.web.util.OAMPResourceUtil;
import com.ovt.common.web.rights.memoryright.Rights;

public final class login_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

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

      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");

  if( OAMPResourceUtil.getString( "isSPAdmin") != null && OAMPResourceUtil.getString( "isSPAdmin").equals("true") ){
  	response.sendRedirect( request.getContextPath() + "/common/jsp/frame/spLogin.jsp" ) ;
  }
  String system_name = ResourceUtil.getString("system.name.full");		
  String login_01 = ResourceUtil.getString("oamp.image.login_01");		
  String login_02 = ResourceUtil.getString("oamp.image.login_02");		
    
  String path = request.getContextPath();
  String errorMessage=(String)session.getAttribute("errorMessage");
  session.removeAttribute("errorMessage");
  errorMessage=(errorMessage==null ?"":errorMessage);

      out.write("\n");
      out.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\"\n");
      out.write("\"http://www.w3.org/TR/html4/loose.dtd\">\n");
      out.write("<html>\n");
      out.write("<head>\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n");
      out.write("<title>");
      out.print(system_name);
      out.write("</title>\n");
      out.write("<link href=\"");
      out.print( path );
      out.write("/common/css/zi.css\" rel=\"stylesheet\" type=\"text/css\">\n");
      out.write("<script language=\"javascript\" src=\"");
      out.print( path );
      out.write("/common/js/sitech.js\"></script>\n");
      out.write("<script language=\"JavaScript\" type=\"text/JavaScript\">\n");
      out.write("function form_submit(){\n");
      out.write(" \tif (document.forms[\"main\"].login_no.value==\"\") {\n");
      out.write("\t    alert(\"请输入用户名称！\")\n");
      out.write("\t  \treturn false;\n");
      out.write("\t}\n");
      out.write("\tif (document.forms[\"main\"].pass_word.value==\"\") {\n");
      out.write("\t    alert(\"请输入密码！\")\n");
      out.write("\t  \treturn false;\n");
      out.write("\t}\n");
      out.write("\tdocument.forms[\"main\"].submit();\n");
      out.write("}\n");
      out.write("function MM_preloadImages() { //v3.0\n");
      out.write("  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();\n");
      out.write("    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)\n");
      out.write("    if (a[i].indexOf(\"#\")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}\n");
      out.write("  document.forms[\"main\"].login_no.focus();\n");
      out.write("}\n");
      out.write("\n");
      out.write("function aa(){\n");
      out.write("  if(event.keyCode==13){\n");
      out.write("    document.forms[\"main\"].elements[\"pass_word\"].focus();\n");
      out.write("  }\n");
      out.write("}\n");
      out.write("function bb(){\n");
      out.write("  if(event.keyCode==13){\n");
      out.write("    document.forms[\"main\"].submit();\n");
      out.write("  }\n");
      out.write("}\n");
      out.write("</script>\n");
      out.write("<style type=\"text/css\">\n");
      out.write("<!--\n");
      out.write("body {\n");
      out.write("\tmargin-top: 0px;\n");
      out.write("\tbackground-image:  url(");
      out.print( path );
      out.write("/common_extends/images/img_bg.jpg);\n");
      out.write("\tmargin-left: 0px;\n");
      out.write("\tfont-size:12px;\n");
      out.write("}\n");
      out.write(".main_bd{\n");
      out.write("width:465px;\n");
      out.write("height:289px;\n");
      out.write("margin-left:auto;\n");
      out.write("margin-right:auto;\n");
      out.write("border:1px solid #003863;\n");
      out.write("background:url(");
      out.print(path);
      out.write("/common/images/mmsc.jpg);\n");
      out.write("margin-top:215px;}\n");
      out.write("-->\n");
      out.write("</style>\n");
      out.write("<script language=\"JavaScript\" type=\"text/JavaScript\">\n");
      out.write("<!--\n");
      out.write("function MM_reloadPage(init) {  //reloads the window if Nav4 resized\n");
      out.write("  if (init==true) with (navigator) {if ((appName==\"Netscape\")&&(parseInt(appVersion)==4)) {\n");
      out.write("    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}\n");
      out.write("  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();\n");
      out.write("}\n");
      out.write("MM_reloadPage(true);\n");
      out.write("//-->\n");
      out.write("</script>\n");
      out.write("</head>\n");
      out.write("\n");
      out.write("<body onLoad=\"MM_preloadImages('");
      out.print(path );
      out.write("/common/images/but_login_over.gif')\">\n");
      out.write("<form method=\"POST\" name=\"main\" action=\"");
      out.print( path );
      out.write("/common/jsp/frame/login.do\" target=\"_parent\">\n");
      out.write("<div class=\"main_bd\">\n");
      out.write("\t  <table width=\"50%\" height=\"160\"  border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-left:178px; margin-top:33px; color:#fff; font-weight:bold;\">\n");
      out.write("          <tr>\n");
      out.write("            <td width=\"19%\">&nbsp;</td>\n");
      out.write("            <td width=\"65%\">");
      out.print(errorMessage);
      out.write("</td>\n");
      out.write("          </tr>\n");
      out.write("          <tr>\n");
      out.write("            <td style=\"color:#000;\">用户名: </td>\n");
      out.write("            <td><input type=\"text\" name=\"login_no\" onkeyup=\"aa()\"></td>\n");
      out.write("          </tr>\n");
      out.write("          <tr>\n");
      out.write("            <td style=\"color:#000;\">密&nbsp;&nbsp;&nbsp;&nbsp;码: </td>\n");
      out.write("            <td><input type=\"password\" name=\"pass_word\" onkeyup=\"bb()\"></td>\n");
      out.write("            \n");
      out.write("          </tr>\n");
      out.write("          <tr>\n");
      out.write("          \t<td>&nbsp;</td>\n");
      out.write("          \t<td><table width=\"70\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n");
      out.write("              <tr onclick=\"form_submit()\" style=\"cursor:hand\">\n");
      out.write("                <td><img src=\"");
      out.print( path );
      out.write("/common/images/but_left.gif\" width=\"6\" height=\"20\"></td>\n");
      out.write("                <td width=\"100%\" background=\"");
      out.print( path );
      out.write("/common/images/but_bg.gif\"><div align=\"center\" style=\"color:#000;\">登 录</div></td>\n");
      out.write("                <td><img src=\"");
      out.print( path );
      out.write("/common/images/but_right.gif\" width=\"6\" height=\"20\"></td>\n");
      out.write("              </tr>\n");
      out.write("             </table>            </td>\n");
      out.write("          </tr>\n");
      out.write("    </table></div>\n");
      out.write("</form>\n");
      out.write("</body>\n");
      out.write("</html>");
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
