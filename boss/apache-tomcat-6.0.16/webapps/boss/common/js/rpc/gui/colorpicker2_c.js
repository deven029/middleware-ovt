// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.loadUnit("color");core.loadUnit("combobox");core.registerComponent("colorpicker2");core.colorpicker2Shared={};document.writeln("<style>.cp2swatch{border:1px solid black}.cp2swatch img{visibility:hidden;width:10px;height:10px}</style>");function Colorpicker2(arg){arg.w=core.rInt(arg.w,150);arg.h=core.rInt(arg.h,22);var e=core._component(arg,"colorpicker2",true);core._inherit(e,"combobox");var pathToButtons=arg["pathToButtons"];e._constructor(pathToButtons);core._inherit(e,"colorpicker2");e.pathToButtons=core.rVal(pathToButtons,core.imagePath+"buttons/");e.value="";e.hexValue="";e.dropDown.allowNoSelect=true;e.setAllowEdit(false);var t=core.colorpicker2Shared;e.dropDown.onbeforechange=t._onbeforechange;e.dropDown.onchange=t._onchange;if(!arg["noDefColors"])for(var a=0;a<core.color.lookupColorNames.length;a++)e.addItem(core.color.lookupColors[a],core.color.lookupColorNames[a]);e.reDraw();return e};core.comps.colorpicker2.reDraw=function(){this.comboReDraw();this.dropBtn.style.zIndex=1;this.dropDown.theme=this.theme;this.dropDown.setBgColor(this.theme.bgColor);this.dropDown.style.borderStyle=this.theme.bdrOutset};core.comps.colorpicker2.getValues=function(i){var o={};o.item=i;o.value=i.childNodes[2].innerHTML;o.hexValue=core.color.makeSureIsHexColor(i.childNodes[0].style.backgroundColor);return o};core.colorpicker2Shared._onbeforechange=function(i){var p=this.parent;return p.onbeforechange(p.getValues(i))};core.colorpicker2Shared._onchange=function(i){var p=this.parent;var o=p.getValues(i);if(!p.onbeforechange(o))return;p.value=o.value;p.hexValue=o.hexValue;p.edit.value=o.value;p.valueStr.setText(o.value);if(p.autoClose)p.dropBtn.onclick();p._onchange(o);return true};core.comps.colorpicker2.clearItems=function(){this.dropDown.clearItems()};core.comps.colorpicker2.addItem=function(c,n){this.dropDown.addItem('<span class="cp2swatch" style="background-color:#'+c+'"><img /></span> <span>'+n+'</span>')};