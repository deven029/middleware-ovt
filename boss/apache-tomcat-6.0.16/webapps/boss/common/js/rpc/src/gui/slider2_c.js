// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.loadUnit("drag");core.registerComponent("slider2");function Slider2(arg){var e=core._component(arg,"slider2");e.xPercent=0;e.yPercent=0;e.bgImage=core.createElm(e,0,0,null,null,null,null,"IMG");e.thumb=core.createElm(e,0,0,arg["tw"],arg["th"]);e.thumb.img=core.createElm(e.thumb,0,0,null,null,null,null,"IMG");e.bgImage.src=arg["bgImg"];e.thumb.img.src=arg["thumbImg"];e.thumb.turnOnDrag(null,core.drag.dtCustom,0,function(){if(!this.elm.parentNode.enabled)this.elm.cancelDrag()},core.drag.dragRange,null);e.onchange=function(i){};e.reversed=false;e.thumb.onRangeChange=core.comps.slider2._onRangeChange;e.setRange(0,0,e.getW(),e.getH());e.reDraw();return e};core.comps.slider2.reDraw=function(){this.slider2ReDraw();this.onredraw()};core.comps.slider2.slider2ReDraw=function(){this.style.fontFamily=this.theme.ctrlFont;this.setBgColor(this.theme.ctrlBgColor);this.setColor(this.theme.ctrlFgColor)};core.comps.slider2._onRangeChange=function(xp,yp){var e=this.parentNode;if(e.reversed){xp=100-xp;yp=100-yp}e.xPercent=xp;e.yPercent=yp;e.onchange(xp,yp)};core.comps.slider2.setRange=function(x1,y1,x2,y2){var x_1=Math.min(x1,x2);var x_2=Math.max(x1,x2);var y_1=Math.min(y1,y2);var y_2=Math.max(y1,y2);this.thumb.rangeStart=[x_1,y_1];this.thumb.rangeEnd=[x_2,y_2];if(this.reversed)this.thumb.moveTo(x_2,y_2);else this.thumb.moveTo(x_1,y_1)};core.comps.slider2.setPos=function(xp,yp,bubble){var rs=this.thumb.rangeStart;var re=this.thumb.rangeEnd;var x=Math.floor((re[0]-rs[0])*(xp/100));var y=Math.floor((re[1]-rs[1])*(yp/100));if(this.reversed){x=(re[0]-rs[0])-x;y=(re[1]-rs[1])-y}this.thumb.moveTo(rs[0]+x,rs[1]+y);this.xPercent=xp;this.yPercent=yp;if(bubble)this.onchange(xp,yp)};core.comps.slider2.dragThumb=function(x,y){var e=dragObj.elm;if(x<e.rangeStart[0])x=e.rangeStart[0];if(y<e.rangeStart[1])y=e.rangeStart[1];if(x>e.rangeStart[0])x=e.rangeEnd[ 0];if(y>e.rangeStart[1])y=e.rangeEnd[ 1];e.moveTo(dragObj.cursorStartX+x,dragObj.cursorStartY+y)};
