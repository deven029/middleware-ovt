package org.apache.jsp.common_005fextends.jsp.frame;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import com.ovt.common.web.rights.memoryright.Rights;
import com.ovt.common.web.util.OAMPResourceUtil;
import com.ovt.common.web.plugins.common.Plugins;
import com.ovt.common.web.plugins.common.model.*;
import java.util.*;

public final class top_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write(" \n");

  String _contextPath = request.getContextPath();
  String currentUser = Rights.getWorkNo(request);
  if( OAMPResourceUtil.getString( "isSPAdmin") != null && OAMPResourceUtil.getString( "isSPAdmin").equals("true") ){
  	currentUser = (String)request.getSession().getAttribute("currentSpName") ;
  }
  PluginInfo pluginInfo = Plugins.getInstance().getPluginInfo("OvtBossAdminWeb");
  List<PluginVersion> pluginVersions = pluginInfo.getVersionHis();

      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("<html>\n");
      out.write("<head>\n");
      out.write("<title>管理平台</title>\n");
      out.write("<link href=\"");
      out.print( _contextPath );
      out.write("/common/css/zi.css\" rel=\"stylesheet\" type=\"text/css\">\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n");
      out.write("<script language=\"JavaScript\">\n");
      out.write("function showhide() {\n");
      out.write("  var i, ss, cc, rr;\n");
      out.write("  cc = showhide.arguments;\n");
      out.write("  for (i=0; i<(cc.length-2); i+=3) \n");
      out.write("     {  ss   = cc[i+2];\n");
      out.write("       if (navigator.appName == 'Netscape' && document.layers != null)\n");
      out.write("        { rr = eval(cc[i]);\n");
      out.write("          if (rr) rr.visibility = ss;\n");
      out.write("        } else if (document.all != null) \n");
      out.write("              { if (ss == 'show') ss = 'visible'; \n");
      out.write("                if (ss == 'hide') ss = 'hidden'; rr = eval(cc[i+1]);\n");
      out.write("                if (rr) rr.style.visibility = ss;\n");
      out.write("              }\n");
      out.write("     }}\n");
      out.write("function keepIE(WinName,WinTop,WinLeft) {\n");
      out.write("document.all[WinName].style.top=WinTop\n");
      out.write("document.all[WinName].style.left=WinLeft\n");
      out.write("}\n");
      out.write("function keepNN(WinName,WinTop,WinLeft) {\n");
      out.write("document.layers[WinName].moveTo(self.pageXOffset+WinLeft+window.innerWidth-80,self.pageYOffset+WinTop+window.innerHeight-90)}\n");
      out.write(" \n");
      out.write("</script>  \n");
      out.write("</head>\n");
      out.write("<form name=\"frmtabhead\">\n");
      out.write("  <input type=\"hidden\" name=\"tabnums\" value=\"3\">\n");
      out.write("\t<input type=\"hidden\" name=\"tabnow\" value=\"1\">\n");
      out.write("</form>\n");
      out.write("<body leftmargin=\"0\" topmargin=\"0\">\n");
      out.write("<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:url(../../images/mmsc2.jpg)\" height=\"61\">\n");
      out.write("  <tr>\n");
      out.write("    <td width=\"746\">&nbsp;</td>\n");
      out.write("    <td align=\"right\" valign=\"top\" background=\"");
      out.print( _contextPath );
      out.write("/common/images/oamp_img_title_2.jpg\"><table width  border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n");
      out.write("      <tr>\n");
      out.write("        <td width=\"13%\"><img src=\"");
      out.print( _contextPath );
      out.write("/common/images/top_arc.gif\" width=\"31\" height=\"61\"></td>\n");
      out.write("        <td width=\"74%\" align=\"center\" background=\"");
      out.print( _contextPath );
      out.write("/common/images/top_arc.gif\" height=\"16\" class=\"G\"><font color=\"black\">您好, ");
      out.print(currentUser);
      out.write("</font> </td>\n");
      out.write("         <td width=\"13%\"><img src=\"");
      out.print( _contextPath );
      out.write("/common/images/top_arc.gif\" width=\"31\" height=\"61\"></td>\n");
      out.write("      </tr>\n");
      out.write("    </table></td>\n");
      out.write("  </tr>\n");
      out.write("</table>\n");
      out.write("\n");
      out.write("\t<table width=\"100%\"  border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n");
      out.write("      <tr>\n");
      out.write("        <!--<td width=\"80%\" height=\"19\" align=\"right\" background=\"../../common/images/bar_white.gif\"><img src=\"");
      out.print( _contextPath );
      out.write("/common/images/img_index.gif\" width=\"17\" height=\"17\" align=\"absmiddle\">主页</td>-->\n");
      out.write("\t\t<td width=\"90%\" align=\"right\" background=\"");
      out.print( _contextPath );
      out.write("/common/images/bar_white.gif\">BOSS主版本号：");
      out.print( pluginVersions.get(pluginVersions.size()-1).getVersion() );
      out.write("<span class=\"G\"></span></td>\n");
      out.write("\t\t<td width=\"5%\" align=\"right\" background=\"");
      out.print( _contextPath );
      out.write("/common/images/bar_white.gif\"><img src=\"");
      out.print( _contextPath );
      out.write("/common/images/img_help.gif\" width=\"17\" height=\"17\" align=\"absmiddle\"><a href=../help/help.jsp target=_blank>帮助</a><span class=\"G\"></span></td>\n");
      out.write("        <td width=\"5%\" align=\"right\" background=\"");
      out.print( _contextPath );
      out.write("/common/images/bar_white.gif\"><img src=\"");
      out.print( _contextPath );
      out.write("/common/images/img_logout.gif\" width=\"17\" height=\"17\" align=\"absmiddle\"><a href=\"loginout.jsp\" target=\"_top\">退出</a>　</td>\n");
      out.write("      </tr>\n");
      out.write("    </table>\n");
      out.write("</body>\n");
      out.write("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n");
      out.write("  <tr> \n");
      out.write("    <td width=\"100%\" colspan=\"19\"> \n");
      out.write("\t<form name=\"frmtabcontent\">\n");
      out.write("        <div id=\"tabcontent1\" style=\"display:block\"></div>\n");
      out.write("        <div id=\"tabcontent2\" style=\"display:none\"></div>\n");
      out.write("        <div id=\"tabcontent3\" style=\"display:none\"></div>\n");
      out.write("      </form></td>\n");
      out.write("  \n");
      out.write("</table>\n");
      out.write("</html>\n");
      out.write("<script language=\"javascript\" type=\"text/javascript\">\n");
      out.write("function tabclick(node){\n");
      out.write("\twindow.focus();\n");
      out.write("\tvar tabnow = parseInt(document.frmtabhead.tabnow.value);\n");
      out.write("\tvar tabclicked = parseInt(node.value);\n");
      out.write("\tif(tabnow == tabclicked) return;\n");
      out.write("\t\n");
      out.write("\tvar tabnums = parseInt(document.frmtabhead.tabnums.value);\t\n");
      out.write("\tfor(i=1;i<=tabnums;i++){\n");
      out.write("\t\tvar obj = eval(\"tabhead\" + i);\n");
      out.write("\t\tif(obj.className == \"tabdisp\"){\n");
      out.write("\t\t\tobj.className = \"tabnodisp\";\n");
      out.write("\t\t\teval(\"tabcontent\" + i + \".style\").display = \"none\";\n");
      out.write("\t\t\tbreak;\n");
      out.write("\t\t}\n");
      out.write("\t}\n");
      out.write("\t\n");
      out.write("\tnode.className = \"tabdisp\";\n");
      out.write("\teval(\"tabcontent\" + tabclicked + \".style\").display = \"block\";\n");
      out.write("\tdocument.frmtabhead.tabnow.value = tabclicked;\n");
      out.write("}\n");
      out.write("</script>");
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
