// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.loadUnit("label");core.registerComponent("button");function Button(arg){var e=core._component(arg,"button");core._inherit(e,"label");e.reDraw=core.comps.button.reDraw;e.buttonUp();var b=parseInt(e.theme.bdrWidth)+"px ";var caption=arg.caption;e.setCaption(caption?caption:"Button"+(core.bags.button.length+1));e.style.padding="0px "+b+b+"0px";e.setVerticalAlign("middle");e.setTextAlign("center");e.flat=false;e.onclick=function(){};core.disallowSelect(e);e.reDraw();return e};core.comps.button.reDraw=function(){this.labelReDraw();this.buttonReDraw();this.onredraw()};core.comps.button.buttonReDraw=function(){var t=this.theme;var s=this.style;var b=this.doBorder?parseInt(t.bdrWidth):0;this.setB(b);s.borderStyle=this.doBorder?t.bdrSolid:"none";this.setBgColor(this.doBGFill?t.ctrlBgColor:"transparent");s=this.cell.style;s.cursor="default";s.width=Math.abs(this.getW()-(b*2))+"px";s.height=Math.abs(this.getH()-(b*2))+"px";if(this.down)this.buttonDown();else this.buttonUp();if(this.flat)this.makeFlat()};core.comps.button.onmouseover=function(){if(!this.doRollover||!this.enabled)return;if(this.doRolloverFill&&this.doBGFill)this.setBgColor(this.theme.hlBgColor);var s=this.cell.style;s.color=this.theme.hlFgColor;if(this.flat){this.buttonUp()}};core.comps.button.onmouseout=function(){this.buttonUp();if(!this.doRollover||!this.enabled)return;if(this.doRolloverFill&&this.doBGFill)this.setBgColor(this.theme.ctrlBgColor);var s=this.cell.style;s.color=this.theme.ctrlFgColor;if(this.flat)this.makeFlat()};core.comps.button.onmousedown=function(){if(this.enabled&&this.doDepress)this.buttonDown()};core.comps.button.onmouseup=function(){this.buttonUp()};core.comps.button.buttonDown=function(w){var b=parseInt(this.theme.bdrWidth);if(this.doBorder){this.drawBorder("down",w)}else if(!this.pressed){var m=this.getM();m[0]+=b;m[3]+=b;this.setM(m)}this.pressed=true};core.comps.button.buttonUp=function(w){var b=parseInt(this.theme.bdrWidth);if(this.doBorder){this.drawBorder("up",w)}else if(this.pressed){var m=this.getM();m[0]-=b;m[3]-=b;this.setM(m)}this.pressed=false};core.comps.button.makeFlat=function(w){var b=parseInt(this.theme.bdrWidth);this.style.borderColor=this.parentNode.style.backgroundColor;this.setB(core.rInt(w,this.theme?this.theme.bdrWidth:core.themes.system.bdrWidth));b+="px";this.style.padding=b+" 0px 0px "+b};core.comps.button.drawBorder=function(state,w){var theme=this.theme?this.theme:core.themes.system;var b=parseInt(theme.bdrWidth);var d=(theme.bdrColorHl&&this.flat)?theme.bdrColorHl:theme.bdrDark;var h=(theme.bdrColorHl&&this.flat)?theme.bdrColorHl:theme.bdrLight;if(state=="up")d=d+" ";else h=h+" ";this.style.borderColor=(state=="up")?h+" "+d+d+h:d+" "+h+h+d;this.setB(core.rInt(w,this.theme?this.theme.bdrWidth:core.themes.system.bdrWidth));b+="px ";this.style.padding=(state=="up")?"0px "+b+b+"0px":b+" 0px 0px "+b};