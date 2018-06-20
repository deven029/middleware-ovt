/************************************************
 *  Copyright(R) by jzchen, (www.jzchen.net)
 *	April 19th, 2003
 ************************************************/

/**
 * This file is just for private use. DO NOT MODIFY IT, OR YOU WILL GET 
 * AN UNEXPECTED ANSWER.
 */

/********** Register the event ****************/
var theInput = document.all("rdInput");
rdBtnOK.onclick = doBtnInputOKClick;
rdBtnCancel.onclick = doBtnInputCancelClick;
window.onunload = doUnload;
document.onkeydown = doKeyDown;

//Event handle...
function doBtnInputOKClick(){
	theHide.value = theInput.value;
	doUnload();
}

function doBtnInputCancelClick(){
	theHide.value = "";
	window.close();
}

function doUnload() {
	self.close();
	window.returnValue = theHide.value
}

function doKeyDown() {
	if (event.keyCode == 13) {
		doBtnInputOKClick();
	}
	if (event.keyCode == 27) {
		doBtnInputCancelClick();
	}
}