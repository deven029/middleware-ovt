// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.loadUnit("spinedit");core.loadUnit("sysutils");core.loadUnit("combobox");core.registerComponent("calendar");core.calendarShared={};function Calendar(arg){arg.w=core.rInt(arg.w,150);arg.h=core.rInt(arg.h,170);var e=core._component(arg,"calendar");e.date=core.rVal(arg.date,sysutils.now());e.dateMask=sysutils.defaultDateMask;e.value=sysutils.formatDate(e.date,e.dateMask);e.pathToButtons=core.rVal(arg.pathToButtons,core.imagePath+"buttons/");e.titlebar=core.createElm(e,null,null,null,18);e.controls=core.createElm(e,null,null,null,26);e.calElm=document.createElement("TABLE");e.calElm. appendChild(document.createElement("TBODY"));e.cal=e.calElm.childNodes[0];e.calElm.setAttribute("cols","7");e.appendChild(e.calElm);e.doVLines=true;e.doHLines=true;e.autoHeight=core.isNil(arg.h);e.onbeforechange=function(v){return true};e.onchange=function(v){};e.yearSpin=Spinedit({parent:e.controls,x:87,y:2,w:58,h:22,value:e.date.getFullYear()});e.showToday=true;e.monthCB=Combobox({parent:e.controls,x:0,y:0,w:80,h:150});var t=e.monthCB;t.style.left="2px";t.style.top="2px";var s=core.getString("MONTHS");for(var a=0;a<s.length;a++)t.dropDown.addItem(s[a],a);t.dropDown.showSelection=false;t.dropDown.selectItem(e.date.getMonth());t.dropBtn.onclick();t.dropDown.setH(170);t.setAllowEdit(false);t.valueStr.style.position="relative";e.yearSpin.min=1970;e.yearSpin.max=2999;e.yearSpin.doWarning=false;e.titlebar.style.textAlign="center";e.titlebar.style.fontWeight="bold";var c=e.calElm;c.style.position="relative";c.style.left="0px";c.style.top="0px";c.setAttribute("width","100%");c.setAttribute("cellPadding",0);c.setAttribute("cellSpacing",0);c.setAttribute("border",0);t=core.calendarShared;e.monthCB.onchange=t._monchange;e.monthCB.onbeforechange=t._monbeforechange;e.yearSpin.onbeforechange=t._yonbeforechange;e.yearSpin.onchange=t._yonchange;e.calElm.onmouseover=t._conmouseover;e.calElm.onmouseout=t._conmouseout;e.calElm.onclick=t._conclick;var b,r;for(a=0;a<7;a++){r=document.createElement("TR");for(b=0;b<7;b++){t=r.appendChild(document.createElement("TD"));t.innerHTML="&nbsp;";t.style.textAlign="center";t.style.margin="0px";t.style.borderStyle="solid";t.style.borderWidth="0px";t.style.position="relative"}e.cal.appendChild(r)}t=e.cal.rows[0];for(a=0;a<7;a++){t.cells[a].innerHTML=core.getString("SHORTWEEKDAYS")[a];t.cells[a].style.cursor="default"}e.setDate(e.date,1);core.disallowSelect(e);e.reDraw();return e};core.comps.calendar.THoliday=function(m,d,n,i){this.month=m;this.day=d;this.name=n;this.image=i};core.comps.calendar.THolidayList=function(){this.items=[];this.clear=function(){this.items.length=0};this.add=function(m,d,n,i){this.items[this.items.length]=calendar.THoliday(m,d,n,i)};this.getDays=function(m){var result=[];for(var a=this.items.length;a>0;a--)if(this.items[a].month==m)result[result.length]=a;return result}};core.comps.calendar.reDraw=function(){this.calendarReDraw();this.onredraw()};core.comps.calendar.calendarReDraw=function(){var t;var today=sysutils.now();today.m=today.getMonth();today.d=today.getDate();today.y=today.getFullYear();if(this.controls.style.display!="none"){this.yearSpin.theme=this.theme;this.yearSpin.reDraw();this.monthCB.theme=this.theme;this.monthCB.reDraw()}if(this.titlebar.style.display!="none"){this.titlebar.font=this.theme.captionFont;this.titlebar.setBgColor(this.theme.captionBgColor1);this.titlebar.setColor(this.theme.captionFgColor);this.titlebar.setText(core.getString("MONTHS")[this.m]+", "+this.y)}this.setBgColor(this.theme.ctrlBgColor);this.setColor(this.theme.ctrlFgColor);this.setB(this.theme.bdrWidth);this.style.borderStyle=this.doBorder?this.theme.bdrSolid:"none";this.style.borderColor=core.rVal(this.theme.bdrColor,"black");var startday=sysutils.getStartDay(this.m,this.y);var numberday=sysutils.getMonthLength(this.m,this.y);if(this.d>numberday)this.d=numberday;var a,b,temp;var c=this.cal;for(a=0;a<7;a++){t=c.rows[0].cells[a].style;t.backgroundColor=this.theme.captionBgColor2;t.color=this.theme.captionFgColor;t.borderColor=this.theme.ctrlFgColor;t.borderRightWidth=(this.doVLines&&a<6)?"1px":"0px";t.borderBottomWidth=this.doHLines?"1px":"0px";t.borderTopWidth=this.doHLines?"1px":"0px"}for(a=1;a<7;a++)for(b=0;b<7;b++){t=c.rows[a].cells[b];tempint=((a-1)*7+b+1);temp=tempint-startday;t.style.backgroundColor=(temp==this.d)?this.theme.selBgColor:this.theme.bgColor;t.style.color=(temp==this.d)?this.theme.selFgColor:this.theme.fgColor;t.title="";if(this.showToday&&temp==today.d&&this.m==today.m&&this.y==today.y){t.style.backgroundColor=this.theme.captionBgColor2;t.style.color=this.theme.captionFgColor;t.title="Today"}if((tempint>startday)&&(temp<(numberday+1)))t.innerHTML=temp;else t.innerHTML="&nbsp;";t.style.borderColor=this.theme.ctrlFgColor;t.style.borderRightWidth=(this.doVLines&&b<6)?"1px":"0px";t.style.borderBottomWidth=(this.doHLines&&a<6)?"1px":"0px"}if(this.autoHeight)this.setH(this.calElm.offsetTop+this.calElm.offsetHeight+this.doBorder*4);else{b=this.getH()-this.calElm.offsetTop-this.doBorder*4;this.calElm.style.height=b+"px";b-=c.rows[0].getAttribute("height");var fullHeight=b;b=parseInt(b/6)-3;for(a=1;a<7;a++){if(a==6)b=fullHeight-b*5-20;c.rows[a].setAttribute("height",b)}}};core.comps.calendar.hideTitle=function(){this.titlebar.style.display="none"};core.comps.calendar.showTitle=function(){this.titlebar.style.display="block"};core.comps.calendar.hideControls=function(){this.controls.style.display="none"};core.comps.calendar.showControls=function(){this.controls.style.display="block"};core.comps.calendar._onchange=function(v){this.value=sysutils.formatDate(this.date,this.dateMask);if(this.hiddenE)this.hiddenE.value=this.value;this.onchange(v)};core.comps.calendar.setEnabled=function(b){this.enabled=b;this.yearSpin.setEnabled(b);this.monthCB.setEnabled(b)};core.comps.calendar.setDoRollover=function(b){this.doRollover=b;this.yearSpin.setDoRollover(b);this.monthCB.setDoRollover(b)};core.comps.calendar.setDateFormat=function(m){this.dateMask=m;this.value=formatDate(this.date,this.dateMask)};core.comps.calendar.attachToForm=function(f,n){this.hiddenE=core._attachToForm(f,n,this.value)};core.comps.calendar.getMonth=function(){return this.date.getMonth()};core.comps.calendar.getDay=function(){return this.date.getDate()};core.comps.calendar.getYear=function(){return this.date.getFullYear()};core.comps.calendar.setMonth=function(m,skip){this.date.setMonth(m);this.m=m;if(!skip){this.reDraw();this._onchange()}};core.comps.calendar.setDay=function(d,skip){this.date.setDate(d);this.d=d;if(!skip){this.reDraw();this._onchange()}};core.comps.calendar.setYear=function(y,skip){this.date.setYear(y);this.y=y;if(!skip){if(typeof this.reDraw=="function")this.reDraw();this._onchange()}};core.comps.calendar.setMonthBy=function(moveby){var m=this.getMonth()+moveby;if(m>11){m=0;this.setYear(this.getYear()+1,1)}if(m<0){m=11;this.setYear(this.getYear()-1,1)}this.setMonth(m,1);this.reDraw();this._onchange()};core.comps.calendar.setYearBy=function(moveby){this.setYear(this.getYear()+moveby,1);this.reDraw();this._onchange()};core.comps.calendar.setDate=function(d,skip){this.date=d;this.m=this.getMonth();this.d=this.getDay();this.y=this.getYear();var mc=this.monthCB;var md=mc.dropDown;md.selected=[];for(var a=0;a<md.items.length;a++)if(md.items[a].selected){md.items[a].selected=false;md.redrawItem(md.items[a])}md.items[this.m].selected=true;md.redrawItem(md.items[this.m]);mc.valueStr.innerHTML=md.items[this.m].innerHTML;this.yearSpin.setValue(this.y,true);if(!skip)this.reDraw();this._onchange()};core.calendarShared._monbeforechange=function(v){var p=this.parentNode.parentNode;return(p.enabled&&p.onbeforechange(v))};core.calendarShared._monchange=function(i){var p=this.parentNode.parentNode;if(!p.enabled)return;p.setMonth(i.value)};core.calendarShared._yonbeforechange=function(v){var p=this.parentNode.parentNode;return(p.enabled&&p.onbeforechange(v))};core.calendarShared._yonchange=function(v){var p=this.parentNode.parentNode;if(!p.enabled)return;p.setYear(v)};core.calendarShared._conmouseover=function(e){core.preventBubble(e);if(!this.parentNode.doRollover||!this.parentNode.enabled)return;var temp=core.findTarget(e,"TD");if(!temp)return;var p=this.parentNode;if(sysutils.isInteger(temp.innerHTML)){temp.oldBgColor=temp.style.backgroundColor;temp.oldFgColor=temp.style.color;temp.style.backgroundColor=p.theme.hlBgColor;temp.style.color=p.theme.hlFgColor;temp.style.cursor=p.enabled?core.cursors.hand:"default"}else temp.style.cursor="default"};core.calendarShared._conmouseout=function(e){core.preventBubble(e);if(!this.parentNode.doRollover||!this.parentNode.enabled)return;var temp=core.findTarget(e,"TD");if(!temp)return;if(sysutils.isInteger(temp.innerHTML)){temp.style.backgroundColor=temp.oldBgColor;temp.style.color=temp.oldFgColor}};core.calendarShared._conclick=function(e){core.preventBubble(e);if(!this.parentNode.enabled)return;var temp=core.findTarget(e,"TD");if(!temp)return;if(sysutils.isInteger(temp.innerHTML)){var t=this.parentNode;t.setDay(parseInt(temp.innerHTML));temp.oldBgColor=t.theme.selBgColor;temp.oldFgColor=t.theme.selFgcolor;temp.style.backgroundColor=t.theme.selBgColor;temp.style.color=t.theme.selFgColor;t._onchange(true)}};