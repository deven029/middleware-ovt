// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.color.lookupColors="F0F8FF,FAEBD7,00FFFF,7FFFD4,F0FFFF,F5F5DC,FFE4C4,000000,FFEBCD,0000FF,8A2BE2,A52A2A,DEB887,5F9EA0,7FFF00,D2691E,FF7F50,6495ED,FFF8DC,DC143C,00FFFF,00008B,008B8B,B8860B,A9A9A9,006400,BDB76B,8B008B,556B2F,FF8C00,9932CC,8B0000,E9967A,8FBC8B,1E90FF,228B22,848484,008200,CD5C5C,E6E6FA,FFFACD,D3D3D3,20B2AA,00FF00,FF00FF,840000,7B68EE,000080,FFA500,FF0000,FA8072,C6C6C6,6A5ACD,008284,FFFF00,9ACD32,FFFFFF";core.color.lookupColorNames="aliceblue,antiquewhite,aqua,aquamarine,azure,beige,bisque,black,blanchedalmond,blue,blueviolet,brown,burlywood,cadetblue,chartreuse,chocolate,coral,cornflowerblue,cornsilk,crimson,cyan,darkblue,darkcyan,darkgoldenrod,darkgray,darkgreen,darkkhaki,darkmagenta,darkolivegreen,darkorange,darkorchid,darkred,darksalmon,darkseagreen,dodgerblue,forestgreen,gray,green,indianred,lavender,lemonchiffon,lightgrey,lightseagreen,lime,magenta,maroon,mediumslateblue,navy,orange,red,salmon,silver,slateblue,teal,yellow,yellowgreen,white";core.color.lookupColors=core.color.lookupColors.split(",");core.color.lookupColorNames=core.color.lookupColorNames.split(",");core.color.debug=false;core.color.setColor=function(id,c,kind){kind=core.rVal(kind,"bg");c=core.rVal(c,"#FFFFFF");switch(kind){case "bg":core.getElm(id).style.backgroundColor=c;break;case "fg":core.getElm(id).style.color=c;break}};core.color.hexToRGB=function(sent){if(sent.charAt(0)!="#")sent="#"+sent;return new Array(parseInt(sent.substring(1,3),16),parseInt(sent.substring(3,5),16),parseInt(sent.substring(5,7),16))};core.color.alterColor=function(sent,percentage){var rgb=core.color.hexToRGB(core.color.makeSureIsHexColor(sent));for(var i=0;i<rgb.length;i++){if(rgb[i]==0)rgb[i]=1;rgb[i]=Math.floor(rgb[i])+Math.floor((rgb[i]*percentage)/100);if(rgb[i]>255)rgb[i]=255;if(rgb[i]<0)rgb[i]=0}return core.color.rgbToHex(rgb)};core.color.mergeColor=function(color1,color2,mergeMethod){var a;var rgb1=core.color.hexToRGB(core.color.makeSureIsHexColor(color1));var rgb2=core.color.hexToRGB(core.color.makeSureIsHexColor(color2));switch(mergeMethod){case "and":for(a=0;a<rgb1.length;a++)rgb1[a]=rgb1[a]&rgb2[a];break;case "or":for(a=0;a<rgb1.length;a++)rgb1[a]=rgb1[a]|rgb2[a];break;case "xor":for(a=0;a<rgb1.length;a++)rgb1[a]=rgb1[a] ^ rgb2[a];break;case "not":for(a=0;a<rgb1.length;a++)rgb1[a]=~ rgb1[a];break;case "add":for(a=0;a<rgb1.length;a++)rgb1[a]=rgb1[a]+rgb2[a];break;case "subtract":for(a=0;a<rgb1.length;a++)rgb1[a]=rgb1[a]-rgb2[a];break;case "blend":for(a=0;a<rgb1.length;a++)rgb1[a]=Math.floor((rgb1[a]+rgb2[a])/2);break;case "floor":var avg=Math.floor((rgb1[0]+rgb1[1]+rgb1[2])/3);if(avg>128)for(a=0;a<rgb1.length;a++)rgb1[a]=0;else for(a=0;a<rgb1.length;a++)rgb1[a]=255;break}for(a=0;a<rgb1.length;a++){if(rgb1[a]<0)rgb1[a]=0;if(rgb1[a]>255)rgb1[a]=255}return core.color.rgbToHex(rgb1)};core.elmProto.fadeToColor=function(kind,hexColor,inc,speed,fn){core.color.fadeToColor(this.id,kind,hexColor,inc,speed,fn)};core.color.fadeToColor=function(elmID,kind,hexColor,inc,speed,fn){var a;if(core.color.debug)core.debug.dump_var("fadeToColor('"+elmID+"','"+kind+"','"+hexColor+"',"+inc+","+speed+",'"+fn+"')");hexColor=core.rVal(hexColor,"#000000");kind=core.rVal(kind,"bg");inc=core.rVal(inc,10);speed=core.rVal(speed,10);var elm=core.getElm(elmID);if(!elm)return;switch(kind){case "bg":elm.fadeRGB1b=core.color.hexToRGB(core.color.makeSureIsHexColor(elm.style.backgroundColor));elm.fadeRGB2b=core.color.hexToRGB(core.color.makeSureIsHexColor(hexColor));if(isNaN(elm.fadeRGB1b[0]))for(a=0;a<elm.fadeRGB1b.length;a++)elm.fadeRGB1b[a]=255;if(isNaN(elm.fadeRGB2b[0]))for(a=0;a<elm.fadeRGB2b.length;a++)elm.fadeRGB2b[a]=255;break;case "fg":elm.fadeRGB1f=core.color.hexToRGB(core.color.makeSureIsHexColor(elm.style.color));elm.fadeRGB2f=core.color.hexToRGB(core.color.makeSureIsHexColor(hexColor));if(isNaN(elm.fadeRGB1f[0]))for(a=0;a<elm.fadeRGB1f.length;a++)elm.fadeRGB1f[a]=0;if(isNaN(elm.fadeRGB2f[0]))for(a=0;a<elm.fadeRGB2f.length;a++)elm.fadeRGB2f[a]=0;break;default:return}core.color._fadeToColorHelper(elmID,kind,inc,speed,fn)};core.color._fadeToColorHelper=function(elmID,kind,inc,speed,fn){var elm=core.getElm(elmID);var done=0;var delta,c1,c2,temp;switch(kind){case "bg":var a1=elm.fadeRGB1b;var a2=elm.fadeRGB2b;break;case "fg":var a1=elm.fadeRGB1f;var a2=elm.fadeRGB2f;break}if(core.color.debug)var db=" current="+a1+" target="+a2;for(var a=0;a<a1.length;a++){c1=a1[a];c2=a2[a];delta=0;if(c1!=c2){temp=c2-c1;if(!isNaN(temp)){delta=Math.floor((temp)*inc/100);c1=parseInt(c1)+delta}else delta=100};if(Math.abs(delta)<1){done++;c1=c2}a1[a]=c1}if(core.color.debug)core.debug.dump_var(db+" done="+done);switch(kind){case "bg":elm.style.backgroundColor=core.color.rgbToHex(a1);break;case "fg":elm.style.color=core.color.rgbToHex(a1);break}if(done!=3)setTimeout("core.color._fadeToColorHelper(\""+elmID+"\",\""+kind+"\","+inc+","+speed+",\""+fn+"\")",speed);else if(fn!="undefined")eval(fn)};core.elmProto.alphaTo=function(endA,glideType,steps,speed,fn){if(this.isAlpha)return;core.rInt(endA,this.getAlpha());endA=Math.round(endA);core.rInt(steps,50);core.rInt(speed,20);core.rInt(glideType,3);this.vSlideA=this.getAlpha();var distA=endA-this.vSlideA;var scaleA=distA/((Math.pow(steps,2)+2*steps+1)/(4*steps));this.isAlpha=true;core.color._alphaDomElm(this.domAPIIndex,glideType,distA,scaleA,endA,steps,1,speed,fn)};core.color._alphaDomElm=function(elmIndex,type,distA,scaleA,endA,steps,count,speed,fn){var elm=core.bags.elms[elmIndex];if(count<=steps){switch(parseInt(type)){case 1:elm.vSlideA+=scaleA*Math.pow(count/steps,3);break;case 2:elm.vSlideA+=scaleA*Math.pow(((steps-count)+1)/steps,3);if(Math.round(elm.vSlideA)==endA)count=steps;break;case 3:elm.vSlideA+=distA/steps;break}elm.setAlpha(Math.round(elm.vSlideA));count++;setTimeout("core.color._alphaDomElm(\""+elmIndex+"\","+type+","+distA+","+scaleA+","+endA+","+steps+","+count+","+speed+",\""+fn+"\")",speed)}else{elm.isAlpha=false;elm.setAlpha(endA);if(fn!="undefined")eval(fn)}};