<%@ page contentType="text/html;charset=utf-8"%>
<%@include file="../frame/check.jsp"%>
<%@ page isELIgnored = "false" %>
<%@ taglib uri="/tags/app" prefix="app"%>
<%@ taglib uri="/common/taglib/c.tld" prefix="c"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv='Expires' content='0'>
<meta http-equiv='Pragma'  content='no-cache'>
<meta http-equiv='Cache-Control' content='no-cache'>
<link href="<%= path %>/common/css/zi.css" rel="stylesheet" type="text/css">
<title>数据权限细节配置</title>
<%
  String treevalue=(String)request.getAttribute("treevalue");
  String tree_value=treevalue.length()==0 ?"-1":treevalue;
  String id_value=(String)request.getAttribute("idvalue");
%>
<script language="javascript">
  //当前选中的页签
  var CurrSelNo =0;
  //页签的数目
  var MaxTabs=<c:out value="${PageCount}"/>;
  function HovIt(objname)
  {
    if(CurrSelNo!=objname)
    {
     var btn1='tabInfotd'+objname;
     var btn2=btn1+'R';
    document.getElementById(btn1).className = 'tabInfoHovT';
    document.getElementById(btn2).className = "tabInfoHovTR";
   }
  }
  function DefIt(objname)
  {
   if(CurrSelNo!=objname)
   {
     var btn1='tabInfotd'+objname;
     var btn2=btn1+'R';
    document.getElementById(btn1).className = 'tabInfoDefT';
    document.getElementById(btn2).className = "tabInfoDefTR";
   }
  }
  function SelIt(objname)
  {
     var btn1;
     var btn2;
    for(i=0;i<MaxTabs;i++)
    {
     btn1='tabInfotd'+i;
     btn2=btn1+'R';
    document.getElementById(btn1).className = 'tabInfoDefT';
    document.getElementById(btn2).className = "tabInfoDefTR";
    document.getElementById('tabInfo_frame'+i).style.display = 'none';
    }
    btn1='tabInfotd'+objname;
     btn2=btn1+'R';
    document.getElementById(btn1).className = 'tabInfoSelT';
    document.getElementById(btn2).className = "tabInfoSelTR";
    document.getElementById('tabInfo_frame'+objname).style.display = '';
    CurrSelNo = objname;
  }
</script>
</head>
<body onload="SelIt('0')">

<style type=text/css>
 .tabInfoDisT{border-width:0px 0px 1px 0px;border-color:#949878;border-style:Solid;height:22px;font-family:Microsoft Sans Serif;font-size:8pt;color:Gray;padding:2px 0 0 7px;cursor:Default;background:url(images/ig_tab_winXP3.gif) no-repeat left 2px;}
 
 .tabInfoSelT{height:22px;font-family:Microsoft Sans Serif;font-size:8pt;color:Black;padding:2px 0 2px 7px;cursor:Default;background:url(images/ig_tab_winXP1.gif) no-repeat left top;}
 .tabInfoSelTR{width:6px;cursor:Default;font-size:2px;background:url(images/ig_tab_winXP1.gif) no-repeat right top;}

 .tabInfoDefT{border-width:0px 0px 1px 0px;border-color:#949878;border-style:Solid;height:22px;font-family:Microsoft Sans Serif;font-size:8pt;color:Black;padding:2px 0 0 7px;cursor:Hand;background:url(images/ig_tab_winXP3.gif) no-repeat left 2px;} 
 .tabInfoDefTR{border-width:0px 0px 1px 0px;border-color:#949878;border-style:Solid;width:6px;cursor:Hand;font-size:2px;background:url(images/ig_tab_winXP3.gif) no-repeat right 2px;}

 .tabInfoHovT{border-width:0px 0px 1px 0px;border-color:#949878;border-style:Solid;height:22px;font-family:Microsoft Sans Serif;font-size:8pt;color:Black;padding:2px 0 0 7px;cursor:Hand;background:url(images/ig_tab_winXP2.gif) no-repeat left 2px;} 
 .tabInfoHovTR{border-width:0px 0px 1px 0px;border-color:#949878;border-style:Solid;width:6px;cursor:Hand;font-size:2px;background:url(images/ig_tab_winXP2.gif) no-repeat right 2px;}
 
</style>

<app:position func_code="<%=fsm.getFunc_code()%>"/>
<form method='POST' name='work_form' action='' >
<input type='hidden' name='data_group_id' value='<c:out value="${idvalue}"/>'>
<table border="0" cellspacing="0" cellpadding="0" id="igtabtabInfo" width="100%" height="100%" style="Z-INDEX:108;" >
 <tr><td>
  <table id="tabInfo_tbl" cellspacing="0" cellpadding="0" border="0" width="100%">
   <tr valign="center">
     <c:forEach   var= "b"   items= "${PageName}">
     <td><table cellspacing="0" cellpadding="0" border="0" height="100%" width="100%"><tr>
     <td nowrap id='tabInfotd<c:out value="${b.id}"/>' align="center" class="tabInfoDefT" height="22px" unselectable="on" onmouseover="HovIt('<c:out value="${b.id}"/>')" onmouseout="DefIt('<c:out value="${b.id}"/>')" onclick="SelIt('<c:out value="${b.id}"/>')"><c:out value="${b.name}"/></td>
     <td nowrap id='tabInfotd<c:out value="${b.id}"/>R' class="tabInfoDefTR" width="6px" unselectable="on" onmouseover="HovIt('<c:out value="${b.id}"/>')" onmouseout="DefIt('<c:out value="${b.id}"/>')" onclick="SelIt('<c:out value="${b.id}"/>')"> </td>
    </tr></table></td>
     </c:forEach>
    <td nowrap style="font-size:2px;cursor:default;border-width:0px 0px 1px 0px;border-color:#949878;border-style:Solid;width:90%;"> </td>
   </tr>
  </table>
 </td></tr>
 <tr><td id="tabInfo_cp" bgcolor="#FEFCFD" style="border-width:0px 1px 1px 1px;border-color:#949878;border-style:Solid;background-color:#FEFCFD;padding:3px 0px 0px 0px;height:100%;width:100%;">
  <c:forEach   var= "b"   items= "${ PageUrl}">
  <iframe id='tabInfo_frame<c:out value="${b.id}"/>' src="<c:out value="${b.url}"/>" style="display:none;" frameborder="0" width="100%" height="100%"></iframe>
  </c:forEach>
  <div width="100%" height="100%" id="tabInfo_empty" style="display:none"> </div>
 </td></tr>
</table>
 </form>
</body>

</html> 