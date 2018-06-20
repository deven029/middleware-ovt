<%@ page contentType="text/html;charset=utf-8"%>
<%
	
  try
  {
    String path="/weblogic/bea/user_projects/domains/scoredomain";
    String subpath= path + "/help/help.doc";
    java.io.File f =new java.io.File( path + "/help/help.doc");
    java.io.FileInputStream fis=new java.io.FileInputStream(f);
    byte[] b=new byte[1024];
    response.reset();
	response.setContentType("application/x-msdownload"); 
	response.addHeader("Content-Disposition","attachment; filename=\"help.doc\""); 
	java.io.OutputStream os=response.getOutputStream();
    while((fis.read(b))!=-1){
      os.write(b);
    }
    fis.close();
  }catch(Exception e){
 // e.printStackTrace( out ) ;
    out.println("下载帮助文件失败");
  }
%>