
var rootIcon       = '../../../common/js/xtree/bs.gif';
var openRootIcon   = '../../../common/js/xtree/bo.gif';
var folderIcon     = '../../../common/js/xtree/greenfolder1.gif';
var openFolderIcon = '../../../common/js/xtree/greenfoldero1.gif';
var fileIcon       = '../../../common/js/xtree/dc1.gif';
var iIcon          = '../../../common/js/xtree/I.png';
var lIcon          = '../../../common/js/xtree/L.png';
var lMinusIcon     = '../../../common/js/xtree/Lminus.png';
var lPlusIcon      = '../../../common/js/xtree/Lplus.png';
var tIcon          = '../../../common/js/xtree/T.png';
var tMinusIcon     = '../../../common/js/xtree/Tminus.png';
var tPlusIcon      = '../../../common/js/xtree/Tplus.png';
var blankIcon      = '../../../common/js/xtree/blank.png';
if(typeof contextPath!="undefined"){
var rootIcon       = contextPath+'/common/js/xtree/bs.gif';
var openRootIcon   = contextPath+'/common/js/xtree/bo.gif';
var folderIcon     = contextPath+'/common/js/xtree/greenfolder1.gif';
var openFolderIcon = contextPath+'/common/js/xtree/greenfoldero1.gif';
var fileIcon       = contextPath+'/common/js/xtree/dc1.gif';
var iIcon          = contextPath+'/common/js/xtree/I.png';
var lIcon          = contextPath+'/common/js/xtree/L.png';
var lMinusIcon     = contextPath+'/common/js/xtree/Lminus.png';
var lPlusIcon      = contextPath+'/common/js/xtree/Lplus.png';
var tIcon          = contextPath+'/common/js/xtree/T.png';
var tMinusIcon     = contextPath+'/common/js/xtree/Tminus.png';
var tPlusIcon      = contextPath+'/common/js/xtree/Tplus.png';
var blankIcon      = contextPath+'/common/js/xtree/blank.png';

}

var defaultText    = 'Tree Item';
var defaultAction  = 'javascript:void(0);';

var selectedObj = null;

var webFXTreeHandler = {
	idCounter : 0,
	idPrefix  : "webfx-tree-object-",
	all       : {},
	behavior  : 'classic',
	getId     : function () { return this.idPrefix + this.idCounter++; },
	toggle    : function (oItem) { this.all[oItem.id.replace('-plus','')].toggle(); },
	select    : function (oItem) { this.all[oItem.id.replace('-icon','')].select(); },
	focus     : function (oItem) { this.all[oItem.id.replace('-anchor','')].focus(); },
	blur      : function (oItem) { this.all[oItem.id.replace('-anchor','')].blur(); }
};

function WebFXTree(sText, sAction, sBehavior) {
	this._subItems = [];
	this.id        = webFXTreeHandler.getId();
	this.text      = sText || defaultText;
	this.action    = sAction || defaultAction;
	this._wasLast  = false; // Used to keep track of the last item in each sub tree
	//this.open      = (getCookie(this.id.substr(18,this.id.length - 18)) == '0')?false:true;
	this.open      = false;
	this.icon      = rootIcon;
	this.openIcon  = openRootIcon;
	webFXTreeHandler.behavior =  sBehavior || 'classic';
	webFXTreeHandler.all[this.id] = this;
}

WebFXTree.prototype.setBehavior = function (sBehavior) {
	webFXTreeHandler.behavior =  sBehavior;
};

WebFXTree.prototype.getBehavior = function (sBehavior) {
	return webFXTreeHandler.behavior;
};

WebFXTree.prototype.add = function (treeItem) {
	treeItem.parent = this;
	this._subItems[this._subItems.length] = treeItem;
};

WebFXTree.prototype.toString = function () {
	var str = "<div id=\"" + this.id + "\" ondblclick=\"webFXTreeHandler.toggle(this);\" class=\"webfx-tree-item\">";
	str += "<img id=\"" + this.id + "-icon\" src=\"" + ((webFXTreeHandler.behavior == 'classic' && this.open)?this.openIcon:this.icon) + "\" onclick=\"webFXTreeHandler.select(this);\"><a href=\"" + this.action + "\" id=\"" + this.id + "-anchor\" onfocus=\"webFXTreeHandler.focus(this);\">" + this.text + "</a></div>";
	str += "<div id=\"" + this.id + "-cont\" class=\"webfx-tree-container\" style=\"display: " + ((this.open)?'block':'none') + ";\">";
	for (var i = 0; i < this._subItems.length; i++) {
		str += this._subItems[i].toString(i,this._subItems.length);
	}
	str += "</div>";	
	return str;
};

WebFXTree.prototype.getSelected = function () {
	if (selectedObj) { return selectedObj.id; }
	else { return null; }
}

WebFXTree.prototype.toggle = function () {
	if (this.open) { this.collapse(); }
	else { this.expand(); }
}

WebFXTree.prototype.select = function () {
	document.getElementById(this.id + '-anchor').focus();
}

WebFXTree.prototype.focus = function () {
	if (selectedObj) { selectedObj.blur(); }
	selectedObj = this;
	if ((this.openIcon) && (webFXTreeHandler.behavior != 'classic')) { document.getElementById(this.id + '-icon').src = this.openIcon; }
	document.getElementById(this.id + '-anchor').style.backgroundColor = 'highlight';
	document.getElementById(this.id + '-anchor').style.color = 'highlighttext';
	document.getElementById(this.id + '-anchor').style.border = '1px dotted threedshadow';
}

WebFXTree.prototype.blur = function () {
	if ((this.openIcon) && (webFXTreeHandler.behavior != 'classic')) { document.getElementById(this.id + '-icon').src = this.icon; }
	document.getElementById(this.id + '-anchor').style.backgroundColor = 'window';
	document.getElementById(this.id + '-anchor').style.color = 'menutext';
	document.getElementById(this.id + '-anchor').style.border = '0px';
}

WebFXTree.prototype.expand = function () {
	if (webFXTreeHandler.behavior == 'classic') {
		document.getElementById(this.id + '-icon').src = this.openIcon;
	}
	document.getElementById(this.id + '-cont').style.display = 'block';
	this.open = true;
	//setCookie(this.id.substr(18,this.id.length - 18), '1');
}

WebFXTree.prototype.collapse = function () {
	if (webFXTreeHandler.behavior == 'classic') {
		document.getElementById(this.id + '-icon').src = this.icon;
	}
	document.getElementById(this.id + '-cont').style.display = 'none';
	this.open = false;
	//setCookie(this.id.substr(18,this.id.length - 18), '0');
}

WebFXTree.prototype.expandAll = function () {
	if( this._subItems.length == 0 ){
		return ;
	}
	this.expandChildren();
	this.expand();
}

WebFXTree.prototype.expandChildren = function () {
	for (var i = 0; i < this._subItems.length; i++) {
		this._subItems[i].expandAll();
	}
}

WebFXTree.prototype.collapseAll = function () {
	this.collapse();
	this.collapseChildren();
}

WebFXTree.prototype.collapseChildren = function () {
	for (var i = 0; i < this._subItems.length; i++) {
		this._subItems[i].collapseAll();
	}
}

function WebFXTreeItem(sText, sAction) {
	this._subItems  = [];
	this._wasLast   = false;
	this.text       = sText || defaultText;
	this.action     = sAction || defaultAction;
	this.id         = webFXTreeHandler.getId();
	//this.open       = (getCookie(this.id.substr(18,this.id.length - 18)) == '1')?true:false;
	this.open       = false;
	webFXTreeHandler.all[this.id] = this;
};

WebFXTreeItem.prototype.add = function (treeItem) {
	treeItem.parent = this;
	this._subItems[this._subItems.length] = treeItem;
};

WebFXTreeItem.prototype.toggle = function () {
	if (this.open) { this.collapse(); }
	else { this.expand(); }
}

WebFXTreeItem.prototype.select = function () {
	document.getElementById(this.id + '-anchor').focus();
}

WebFXTreeItem.prototype.focus = function () {
	if (selectedObj) { selectedObj.blur(); }
	selectedObj = this;
	if ((this.openIcon) && (webFXTreeHandler.behavior != 'classic')) { document.getElementById(this.id + '-icon').src = this.openIcon; }
	document.getElementById(this.id + '-anchor').style.backgroundColor = 'highlight';
	document.getElementById(this.id + '-anchor').style.color = 'highlighttext';
	document.getElementById(this.id + '-anchor').style.border = '1px dotted threedshadow';
}

WebFXTreeItem.prototype.blur = function () {
	if ((this.openIcon) && (webFXTreeHandler.behavior != 'classic')) { document.getElementById(this.id + '-icon').src = this.icon; }
	document.getElementById(this.id + '-anchor').style.backgroundColor = 'window';
	document.getElementById(this.id + '-anchor').style.color = 'menutext';
	document.getElementById(this.id + '-anchor').style.border = '0px';
}

WebFXTreeItem.prototype.expand = function () {
	if (this._subItems.length > 0) { 
		document.getElementById(this.id + '-cont').style.display = 'block';
	}
	if (webFXTreeHandler.behavior == 'classic') {
		document.getElementById(this.id + '-icon').src = this.openIcon;
	}
	document.getElementById(this.id + '-plus').src = this.minusIcon;
	this.open = true;
	//setCookie(this.id.substr(18,this.id.length - 18), '1');
}

WebFXTreeItem.prototype.collapse = function () {
	if (this._subItems.length > 0) {
		document.getElementById(this.id + '-cont').style.display = 'none';
	}
	if (webFXTreeHandler.behavior == 'classic') {
		document.getElementById(this.id + '-icon').src = this.icon;
	}
	document.getElementById(this.id + '-plus').src = this.plusIcon;
	this.open = false;
	//setCookie(this.id.substr(18,this.id.length - 18), '0');
}

WebFXTreeItem.prototype.expandAll = function () {
	if( this._subItems.length == 0 ){
		return ;
	}
	this.expandChildren();
	this.expand();
}

WebFXTreeItem.prototype.expandChildren = function () {
	for (var i = 0; i < this._subItems.length; i++) {
		this._subItems[i].expandAll();
	}
}

WebFXTreeItem.prototype.collapseAll = function () {
	this.collapse();
	this.collapseChildren();
}

WebFXTreeItem.prototype.collapseChildren = function () {
	for (var i = 0; i < this._subItems.length; i++) {
		this._subItems[i].collapseAll();
	}
}

WebFXTree.prototype.expandToTreeItem = function (itemId) {
	var currentNode = eval( itemId ) ;
	if( !currentNode ){
		return ;
	}
	var parents =[];
	parents[parents.length]=currentNode ;
	if( currentNode ){
		var foo = currentNode.parent ;
		while( foo ){
			parents[parents.length]=foo ;
			foo = foo.parent;
		}
	}
	
	for( i = parents.length - 1 ; i >= 0 ; i-- ){
		if( parents[i]._subItems.length > 0 ){
			parents[i].expand() ;
		}
	}
}

WebFXTreeItem.prototype.toString = function (nItem,nItemCount) {
	var foo = this.parent;
	var indent = '';
	if (nItem + 1 == nItemCount) { this.parent._wasLast = true; }
	while (foo.parent) {
		foo = foo.parent;
		indent = "<img src=\"" + ((foo._wasLast)?blankIcon:iIcon) + "\">" + indent;
	}
	if (this._subItems.length) { this.folder = 1; }
	if (this.folder) {
		if (!this.icon) { this.icon = folderIcon; }
		if (!this.openIcon) { this.openIcon = openFolderIcon; }
		var str = "<div  id=\"" + this.id + "\" ondblclick=\"webFXTreeHandler.toggle(this);\" class=\"webfx-tree-item\">";
		str += indent;
		str += "<img id=\"" + this.id + "-plus\" src=\"" + ((this.open)?((this.parent._wasLast)?lMinusIcon:tMinusIcon):((this.parent._wasLast)?lPlusIcon:tPlusIcon)) + "\" onclick=\"webFXTreeHandler.toggle(this);\">"
		str += "<img id=\"" + this.id + "-icon\" src=\"" + ((webFXTreeHandler.behavior == 'classic' && this.open)?this.openIcon:this.icon) + "\" onclick=\"webFXTreeHandler.select(this);\"><a href=\"" + this.action + "\" id=\"" + this.id + "-anchor\" onfocus=\"webFXTreeHandler.focus(this);\">" + this.text + "</a></div>";
		str += "<div id=\"" + this.id + "-cont\" class=\"webfx-tree-container\" style=\"display: " + ((this.open)?'block':'none') + ";\">";
		for (var i = 0; i < this._subItems.length; i++) {
			if (this._subItems[i].text !="@@@"){
				str += this._subItems[i].toString(i,this._subItems.length);
			}
		}
		str += "</div>";
	}
	else {
		if (!this.icon) {
			if (webFXTreeHandler.behavior == 'classic') {
				this.icon = fileIcon;
			}
			else {
				this.icon = folderIcon;
				this.openIcon = openFolderIcon;
			}
		}
		var str = "<div id=\"" + this.id + "\" class=\"webfx-tree-item\">";
		str += indent;
		str += "<img id=\"" + this.id + "-plus\" src=\"" + ((this.parent._wasLast)?lIcon:tIcon) + "\">"
		str += "<img id=\"" + this.id + "-icon\" src=\"" + this.icon + "\" onclick=\"webFXTreeHandler.select(this);\"><a href=\"" + this.action + "\" id=\"" + this.id + "-anchor\" onfocus=\"webFXTreeHandler.focus(this);\">" + this.text + "</a></div>";
	}
	this.plusIcon = ((this.parent._wasLast)?lPlusIcon:tPlusIcon);
	this.minusIcon = ((this.parent._wasLast)?lMinusIcon:tMinusIcon);
	return str;
}
function setCookie(key, value) {
	document.cookie = key + "=" + escape(value);
}

function getCookie(key) {
	if (document.cookie.length) {
		var cookies = ' ' + document.cookie;
		var start = cookies.indexOf(' ' + key + '=');
		if (start == -1) { return null; }
		var end = cookies.indexOf(";", start);
		if (end == -1) { end = cookies.length; }
		end -= start;
		var cookie = cookies.substr(start,end);
		return unescape(cookie.substr(cookie.indexOf('=') + 1, cookie.length - cookie.indexOf('=') + 1));
	}
	else { return null; }
}