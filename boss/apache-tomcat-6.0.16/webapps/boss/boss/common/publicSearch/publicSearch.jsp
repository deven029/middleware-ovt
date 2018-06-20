<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="java.io.*"%>
<%@ page import="java.sql.*,javax.sql.*,java.util.*"%>
<%@ page import="com.ovt.idtv.boss.core.db.*"%>

<%
	request.setCharacterEncoding("UTF-8");
    response.setContentType("text/xml; charset=UTF-8");
	response.setContentType("text/xml");
	response.setHeader("Cache-Control", "no-cache");

	//需要取出参数的个数
	int parameterNo = 0;
	if(request.getParameter("parameterNo") != null)
		parameterNo = Integer.parseInt(request.getParameter("parameterNo"));
	//需要提交的参数个数
	int pstmtNo = 0;
	if(request.getParameter("pstmtNo") != null)
		pstmtNo = Integer.parseInt(request.getParameter("pstmtNo"));
	
	//需要执行的sql语句
	String isql = "select * from dual";
	if(request.getParameter("parameters")!=null)
		isql = request.getParameter("parameters");

	if(isql.equals(""))
		isql = "select * from dual";
	
    ConnDB db = null;
    ResultSet rs = null;
    PreparedStatement pstmt = null;
    Connection conn = null;

	/*String osCode = System.getProperty("file.encoding");
	System.out.println("系统默认编码" + osCode);*/

	Properties props = System.getProperties();
	String osName = props.getProperty("os.name"); 
	//System.out.println("操作系统名称为：" + osName);

	String textvalue = (String)request.getParameter("textvalue");
	//System.out.println("原有字符串为： " + textvalue);
	
	if(osName.contains("Windows")){
		//textvalue = new String(textvalue.getBytes("ISO-8859-1"),"UTF-8");
		//System.out.println("Windows下转换之后的字符串为： " + textvalue);
	}else{
		//System.out.println("Linux下不需要转换,字符串为： " + textvalue);
	}
	//System.out.println("字符串为： " + textvalue);
	//textvalue = new String(textvalue.getBytes("ISO-8859-1"),"UTF-8");
	//System.out.println("转换之后的字符串为： " + textvalue);
	
	String countstr = (String)request.getParameter("count");
	
	int count = Integer.parseInt(countstr);
	String result = "success";
	out.println("<root>");
	try
	{
			db = new ConnDB();
	        conn = db.getConn(this);
	        
	        //将sql语句进行封装
	        String sql = "select * from (select row_.*, rownum from (" + isql + ") row_ where rownum <= ?) where rownum >= 0 "; 
	        
	        System.out.println("sql为： " + sql);
	        //pstmt = conn.prepareStatement(isql);
	        pstmt = conn.prepareStatement(sql);
	        for(int i=1;i<=pstmtNo;i++){
	        	pstmt.setString(i,"%" + textvalue + "%");
	        }
	        
	        pstmt.setInt((pstmtNo+1),count);
	        
	        rs = pstmt.executeQuery();
	        if(rs != null)
	        {
	            int i=0;//计数器
            	while(rs.next())
	            {
	            	i++;
	            	if(count == i && count != 1){
	            		break;
	            	} 
	            	
	               	out.println("<obj>");
	               	for(int j=1;j<=parameterNo;j++){ //根据需要取出的参数个数来取值
	               		if(rs.getString(j)!=null)
		               		out.println("<parameter"+j+">" + rs.getString(j) + "</parameter"+j+">");
		               	else
		               		out.println("<parameter"+j+">" + "" + "</parameter"+j+">");
	               	}
	               	out.println("</obj>");
	         	}
	            
	        }else
	        {
	        	result = "fail";
	        }
	}
	catch(Exception e) {
    	//out.println(e);
    	e.printStackTrace();
    	result = "fail";
    }
    finally {
    	try {
    		if(rs != null)
    			rs.close();
    		if(pstmt != null)
	    		pstmt.close();
   			if(conn != null){
   				if(!conn.isClosed()) 
   					conn.close();
   			}
   			db.close();
   		}
    	catch(Exception e) {
    		out.println(e);
    	}
    }
		
	out.println("<obj><result>" + result + "</result></obj>");
	out.println("</root>");

%>