// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.loadUnit("speedbutton");core.registerComponent("dropdown");function Dropdown(arg){arg.w=core.rInt(arg.w,130);arg.h=core.rInt(arg.h,22);var e=core._component(arg,"dropdown");e._constructor(arg.pathToButtons);e.reDraw();return e};core.comps.dropdown.defButton="dropdown2.gif";core.comps.dropdown._constructor=function(pathToButtons){this.pathToButtons=core.rVal(pathToButtons,core.imagePath+"buttons/");this.edit=core.createElm(this,0,0,100,100,null,null,"INPUT");this.opened=false;this.autoClose=true;this.direction="down";this.onchange=function(){};this.onbeforechange=function(v){return true};this._onchange=function(v){if(this.hiddenE)this.hiddenE.value=this.edit.value;this.onchange(v)};this.onbtnclick=function(b){};this.rootSetEnabled=this.setEnabled;this.rootSetDoRollover=this.setDoRollover;var t=this.style;t.borderStyle="none";t.cursor="default";t.fontSize="8pt";this.setOverflow("visible");this.edit.setSize(this.getW(),this.getH());this.dropBtn=Speedbutton({parent:this,theme:this.theme,img:this.pathToButtons+this.defButton,hint:core.getString("DROPDOWN_OPEN"),groupid:1,x:0,y:0,w:this.getH()-2,h:this.getH(),imgCount:1,imgW:13,imgH:12});t=this.dropBtn;t.allowAllUp=true;t.style.cursor=core.cursors.hand;t.onclick=this._onclick;this.dropDown=core.createElm(null,0,0,100,140);t=this.dropDown;t.domAPIObjType="DROPPANEL";t.hide();t.setOverflow("hidden");t.parent=this;this.setZ(this.getZ())};core.comps.dropdown.attachToForm=function(f,n){this.hiddenE=core._attachToForm(f,n,this.edit.value)};core.comps.dropdown.setEnabled=function(b){this.enabled=b;this.dropBtn.enabled=b;this.edit.disabled=!b};core.comps.dropdown.setDoRollover=function(b){this.doRollover=b;this.dropBtn.doRollover=b};core.comps.dropdown._eonkeypress=function(){return this.onbeforechange};core.comps.dropdown._eonchange=function(){this.parentNode._onchange(this.value)};core.comps.dropdown.setZ=function(z){z=core.rInt(z);this.style.zIndex=z;this.dropDown.style.zIndex=z};core.comps.dropdown._onclick=function(){var t=this.parentNode;if(!t.enabled)return;if(t.dropDown.visible()){if(this.down)this.onmouseup();t.dropDown.hide();t.opened=false;this.title=core.getString("DROPDOWN_OPEN")}else{var o=core.getTrueOffset(t);if(core.isIE5Mac){o[0]+=10;o[1]+=15}switch(t.direction){case "up":t.dropDown.moveTo(o[0],o[1]-t.dropDown.getH());break;case "down":t.dropDown.moveTo(o[0],o[1]+t.getH());break;case "left":t.dropDown.moveTo(o[0]-t.dropDown.getW(),o[1]);break;case "right":t.dropDown.moveTo(o[0]+t.getW(),o[1]);break}t.dropDown.setZ(t.getZ());t.dropDown.show();t.opened=true;this.title=core.getString("DROPDOWN_CLOSE")}t.onbtnclick(t.opened)};core.comps.dropdown.reDraw=function(){this.dropdownReDraw();this.dropBtn.reDraw();this.onredraw()};core.comps.dropdown.dropdownReDraw=function(){var t=this.dropDown;t.setB(this.theme.bdrWidth);t.style.borderColor=core.rVal(this.theme.bdrColor,"black");t.style.borderStyle=this.theme.bdrInset;t.setW(this.getW());t.setBgColor(this.theme.ctrlBgColor);t.setZ(this.getZ());t=this.dropBtn;t.theme=this.theme;t.reDraw();t.moveTo(this.getW()-this.dropBtn.getW(),0);t=this.edit;t.setB(core.rInt(this.theme.bdrWidth,1));var h=this.getH();var w=this.getW()-this.dropBtn.getW();if(core.isNS){w=w+3;h=h+3}if(core.isIE5Mac){w=w-3;h=h-3}t.setSize(w,h);t.setColor(this.theme.fgColor);t.setBgColor(this.theme.bgColor);t.style.font=this.theme.font;t.style.borderColor=this.theme.getInset();this.setBgColor(this.theme.ctrlBgColor)};