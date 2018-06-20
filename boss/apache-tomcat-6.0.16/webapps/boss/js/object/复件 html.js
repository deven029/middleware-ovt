<!--
	//循环节obj的可视状态
    function changeVisiable(obj,closeHTML,openHTML)
    {
         var t=obj.id;
         tc=t+'_content';
         tc=document.getElementById(tc);
         t_title=t+'_title';
         t_title=document.getElementById(t_title);
         dis=tc.style.display; 
         if(dis=='')
         {
                t_title.innerHTML=closeHTML;//'<font color=red><b>+</b></font>';
                tc.style.display='none';
         }
         else
         {
                t_title.innerHTML=openHTML;//'<font color=blue><b>-</b></font>';
                tc.style.display='';
         }
     }
//-->