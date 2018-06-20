/************************************************
 *  Copyright(R) by jzchen, (www.jzchen.net)
 *	April 19th, 2003
 ************************************************/

/**
 * This file is just for private use. DO NOT MODIFY IT, OR YOU WILL GET 
 * AN UNEXPECTED ANSWER.
 */


/******** Register the event ********************/
rdBtnOK.onclick = doBtnConfirmOKClick;
rdBtnCancel.onclick = doBtnConfirmCancelClick;
window.onunload = doUnload;
document.onkeydown = doKeyDown;

/******** Event Handle **************************/
function doBtnConfirmOKClick() {
	theHide.value = 1;
	doUnload();
}

function doBtnConfirmCancelClick() {
	theHide.value = 0;
	doUnload();
}

function doUnload() {
	self.close();
	window.returnValue = theHide.value
}
function doKeyDown() {
	if (event.keyCode == 27) {
		doBtnConfirmCancelClick();
	}
}