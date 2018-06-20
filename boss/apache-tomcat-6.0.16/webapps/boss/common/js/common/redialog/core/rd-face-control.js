/************************************************
 *  Copyright(R) by jzchen, (www.jzchen.net)
 *	April 19th, 2003
 ************************************************/

/**
 * This file is just for private use. DO NOT MODIFY IT, OR YOU WILL GET 
 * AN UNEXPECTED ANSWER.
 */

/*********** Varient Transmitions ******************/

var message, mode, index;
// retrieve the arguments
var arguments = window.dialogArguments;
index = arguments.indexOf('|');
if (index != -1) {
	mode = arguments.substring(index+1, arguments.length);
	message = arguments.substring(0, index);
} else {
	message = arguments;
}

/********* DOM Operations *************************/
var theHide = document.all("rdHideReturnValue");
document.title = rdDefaultTitle+rdBlankString;
document.bgColor = rdBackColor;
document.body.style.color=rdForeColor;
document.all("message").innerHTML=message;
if (mode == 0)
	document.all("rdImage").src = "img-error.gif";
var fillter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr="+rdGradientStartColor+", endColorStr="+rdGradientEndColor+", gradientType="+rdGradientType+")";

try {
	document.body.style.filter = fillter;	
} catch (e){}

