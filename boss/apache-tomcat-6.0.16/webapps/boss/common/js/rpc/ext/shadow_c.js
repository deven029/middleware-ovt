// Copyright 2001-2003, Nebiru Software
// www.domapi.com
if(core.isIE5Mac)core.loadUnit("color");core.shadow={};core.shadow._createShadow=function(c){var e=document.createElement("DIV");e.style.backgroundColor=c;e.style.overflow='hidden';e.setX=core.elmProto.setX;e.setY=core.elmProto.setY;e.setW=core.elmProto.setW;e.setH=core.elmProto.setH;e.getB=core.elmProto.getB;e.getP=core.elmProto.getP;e.getX=core.elmProto.getX;e.getY=core.elmProto.getY;e.getW=core.elmProto.getW;e.getH=core.elmProto.getH;e.setSize=core.elmProto.setSize;e.moveTo=core.elmProto.moveTo;e.setZ=core.elmProto.setZ;e.setPosition=core.elmProto.setPosition;e._dispHook=core.elmProto._dispHook;if(core.isIE5Mac){e.setBgColor=core.elmProto.setBgColor;e.removeNode=remove_Node}else e.setAlpha=core.elmProto.setAlpha;return e};core.shadow._createShadowAnc=function(e,a,n,c){var s=core.shadow._createShadow(c);if(core.isIE5Mac){var p=s.setBgColor(core.color.alterColor(c,100-p))}else{var p=parseInt(100-(a/n)*100);s.setAlpha(p)}core.insertElm(s,e,"afterEnd");return s};core.shadow.dropShadow=function(e,n,c){n=core.rInt(n,4);c=core.rVal(c,"#555555");if(typeof e.getZ!="function"){e.getZ=core.elmProto.getZ;e.setZ=core.elmProto.setZ;e.getW=core.elmProto.getW;e.getH=core.elmProto.getH;e.getX=core.elmProto.getX;e.getY=core.elmProto.getY;e._dispHook=core.elmProto._dispHook}if(e.shadowsX)for(var a=0;a<e.shadowsX.length;a++){e.shadowsX[a].removeNode(true);e.shadowsY[a].removeNode(true)}e.shadowsX=[];e.shadowsY=[];var r;for(var a=0;a<n;a++){e.shadowsX[a]=core.shadow._createShadowAnc(e,a,n,c);e.shadowsY[a]=core.shadow._createShadowAnc(e,a,n,c)}e.moveShadow=core.shadow._moveShadow;e.moveTo=function(x,y){this.setX(x);this.setY(y);this.moveShadow()};e.setSize=function(w,h){this.setW(w);this.setH(h);this.moveShadow()};e.hide=function(){this.style.visibility="hidden";for(var a=0;a<this.shadowsX.length;a++){this.shadowsX[a].style.visibility="hidden";this.shadowsY[a].style.visibility="hidden"}};e.show=function(){e.moveShadow();this.style.visibility="visible";for(var a=0;a<this.shadowsX.length;a++){this.shadowsX[a].style.visibility="visible";this.shadowsY[a].style.visibility="visible"}};e.moveShadow()};core.shadow._moveShadow=function(){var x,y,w,h,n,sx,sy;x=this.getX();y=this.getY();w=this.getW();h=this.getH();sx=this.shadowsX;sy=this.shadowsY;n=sx.length;if(core.isIE5Mac){x+=9;y+=14}for(var a=0;a<n;a++){sx[a].setZ(this.getZ());sx[a].setSize(w+a-n,1);sx[a].moveTo(x+n+1,y+h+a);sy[a].setZ(this.getZ());sy[a].setSize(1,h+a-n);sy[a].moveTo(x+w+a,y+n)}};