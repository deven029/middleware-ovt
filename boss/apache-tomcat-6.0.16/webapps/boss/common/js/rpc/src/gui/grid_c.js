// Copyright 2001-2003, Nebiru Software
// www.domapi.com
if(!document.styleSheets.length)document.write('<style type="text/css"><\/style>');core.loadUnit("nodesort");core.registerComponent("grid");function Grid(arg){var e=core._component(arg,"grid",arg.noInherit);var tbl=document.createElement("TABLE");e.table=document.createElement("TBODY");e.guid=e.theme.guid;tbl.setAttribute("border",0);tbl.setAttribute("cellPadding",0);tbl.setAttribute("cellSpacing",0);tbl.className=e.guid;tbl.style.tableLayout="fixed";tbl.appendChild(e.table);e.appendChild(tbl);e.ctrlRow=document.createElement("TR");e.ctrlRow.setAttribute("height",0);e.table.appendChild(e.ctrlRow);e.cols=e.ctrlRow.cells;e.rows=e.table.childNodes;if(!core.comps.grid.styleSheetBuilt){core.css.init();core.comps.grid.styleSheetBuilt=true}e.selected=[];e.onchange=function(){};e._grid=e;core.addEvent(e,"keydown",core.comps.grid._onkey,false);if(e.reDraw)e.reDraw();return e};core.comps.grid.defDelimter=",";core.comps.grid.styleSheetBuilt=false;core.comps.grid.defCellPaddingW=2;core.comps.grid.defCellPaddingH=0;core.comps.grid.allowNoSelect=false;core.comps.grid.showSelection=true;core.comps.grid.multiSelect=false;core.comps.grid.doVLines=true;core.comps.grid.doHLines=true;core.comps.grid.ledgerMode=false;core.comps.grid.ledgerBg1="#E7FFE7";core.comps.grid.ledgerBg2="#E7EFEA";core.comps.grid.ledgerFg1="black";core.comps.grid.ledgerFg2="black";core.comps.grid.reDraw=function(){this.gridReDraw();this.onredraw()};core.comps.grid.gridReDraw=function(){var g=this._grid;var t=g.theme;var rule="border-style:solid;border-width:0px "+(this.doVLines?"1":"0")+"px "+(this.doHLines?"1":"0")+"px 0px;border-color:"+t.shadowBg+";color:"+t.fgColor+";padding:"+this.defCellPaddingH+"px "+parseInt(parseInt(this.defCellPaddingW)+(this.doVLines?0:1))+"px "+parseInt(parseInt(this.defCellPaddingH)+(this.doHLines?0:1))+"px "+this.defCellPaddingW+"px;";if(!this.doBGFill)rule+="background-color:transparent;";core.css.addRule("."+g.guid+" td",rule,true);rule="background-color:"+t.hlBgColor+";color:"+t.hlFgColor;core.css.addRule("."+g.guid+" .hl td",rule,true);rule="background-color:"+t.selBgColor+";color:"+t.selFgColor;core.css.addRule("."+g.guid+" .sel td",rule,true);rule="background-color:"+(this.doBGFill?t.bgColor:"transparent")+";color:"+t.fgColor;core.css.addRule("."+g.guid+" .norm td",rule,true);rule="background-color:"+(this.legderMode?t.bgColor:this.ledgerBg1)+";color:"+(this.legderMode?t.fgColor:this.ledgerFg1);core.css.addRule("."+g.guid+" .odd td",rule,true);rule="background-color:"+(this.legderMode?t.bgColor:this.ledgerBg2)+";color:"+(this.legderMode?t.fgColor:this.ledgerFg2);core.css.addRule("."+g.guid+" .even td",rule,true);var s=g.style;s.font=t.font;g.setColor(t.fgColor);g.setBgColor(this.doBGFill?t.bgColor:"");g.setB(t.bdrWidth);s.borderStyle=g.doBorder?t.bdrSolid:"none";s.borderColor=t.getInset();s.overflow="auto";s.scrollbarBaseColor=t.ctrlBgColor;for(a=0;a<g.rows.length;a++)this.colorRow(g.rows[a])};core.comps.grid.colorRow=function(r){if(!r)return;var c="norm";var i=core.getNodeIndex(r);if(this.ledgerMode)c=((i%2)==0)?"odd":"even";if((r.selected==true)&&(this.showSelection==true))c="sel";r._className=c;r.className=c};core.comps.grid._setEnabled=function(b){this.enabled=b;this.reDraw()};core.comps.grid.setEnabled=function(b){this._setEnabled(b)};core.comps.grid.setColCSS=function(i,extra){this._setColCSS(i,extra)};core.comps.grid._setColCSS=function(i,extra){var g=this._grid;var c=g.ctrlRow.cells[i];var cssBody="text-align:"+c._align+";overflow:"+c.overflow+";vertical-align:"+c.vertAlign+";padding:"+c.vPad+"px "+c.hPad+"px;white-space:"+c.whiteSpace+";font:"+g.theme.font+";cursor:default;"+extra;core.css.addRule("."+g.guid+"_TD"+i,cssBody,true)};core.comps.grid._setColAlign=function(i,a){a=core.rVal(a,"left");this._grid.ctrlRow.cells[i]._align=a;this._setColCSS(i)};core.comps.grid.setColAlign=function(i,a){this._setColAlign(i,a)};core.comps.grid.selectRow=function(r){if(!r||(r.selected==true))return;if(r==this._grid.ctrlRow){alert(core.getString("GRID_CTRL_SEL"));return}r.selected=true;this.selected.push(r);this.colorRow(r)};core.comps.grid.selectAll=function(){var r=this.rows;for(var a=1;a<r.length;a++)this.selectRow(r[a])};core.comps.grid.deselectRow=function(r){r.selected=false;var s=this.selected;for(var a=0;a<s.length;a++)if(s[a]==r)s.deleteItem(a);this.colorRow(r)};core.comps.grid.deselectAll=function(){var s=this.selected;for(var a=0;a<s.length;a++){s[a].selected=false;this.colorRow(s[a])}s=[]};core.comps.grid.addCol=function(arg){var e=document.createElement("TD");var g=this._grid;var def=core.rVal(arg.defaultValue,"&nbsp;");var w=core.rInt(arg.w,60);e.setAttribute("width",w);e.defaultValue=def;e.sortType=core.rInt(arg.sortType,0);e.align=core.rVal(arg.align,"left");e.overflow=core.rVal(arg.overflow,"hidden");e.vertAlign=core.rVal(arg.vertAlign,"middle");e.whiteSpace=core.rVal(arg.whiteSpace,"normal");e.vPad=core.rInt(arg.vPad,0);e.hPad=core.rInt(arg.hPad,2);g.ctrlRow.appendChild(e);var i=core.getNodeIndex(e);g._setColAlign(i,e.align);var r=g.rows;for(a=1;a<r.length;a++){e=document.createElement("TD");e.setAttribute("width",w);e.innerHTML=def;e.className=g.guid+"_TD"+i;r[a].appendChild(e)}};core.comps.grid.addRow=function(captions,del){var g=this._grid;if(g.ctrlRow.cells.length==0)return;if(typeof captions!="object"){del=core.rVal(del,this.defDelimter);captions=captions.split(del)}var m=g.ctrlRow.cells.length;while(captions.length>m)captions.deleteItem(captions.length-1);while(captions.length<m)captions.push("");var row=document.createElement("TR");row.selected=false;row.isGrid=true;var cell=null;var temp=null;for(var a=0;a<captions.length;a++){cell=document.createElement("TD");cell.className=g.guid+"_TD"+a;temp=captions[a];if(temp=="")temp=g.ctrlRow.cells[a].defaultValue;cell.innerHTML=temp;row.appendChild(cell)}g.table.appendChild(row);if(this.ledgerMode){if(!core.isIE55)this.colorRow(row)}if(!core.isIE55&&this.rows.length==2&&!this.allowNoSelect)this.selectRow(row);return row};core.comps.grid.getCell=function(c,r){return this.rows[r].cells[c].innerHTML};core.comps.grid.getRowByIndex=function(i,del){return this.getRow(this._grid.rows[i],del)};core.comps.grid.getRow=function(row,del){del=core.rVal(del,this.defDelimter);var c=row.cells;var r="";for(var a=0;a<c.length;a++){if(r!="")r+=del;r+=c[a].innerHTML}return r};core.comps.grid.setCell=function(c,r,caption){var cell=this.rows[r].cells[c];cell.className=this._grid.guid+"_TD"+c;cell.innerHTML=caption.length>0?caption:"&nbsp;"};core.comps.grid.swapCols=function(i,j){this._swapCols(i,j)};core.comps.grid._swapCols=function(i,j){var r=this._grid.rows;for(var a=0;a<r.length;a++)r[a].cells[i].swapNode(r[a].cells[j])};core.comps.grid.swapRows=function(i,j){if(i==0||j==0){alert(core.getString("GRID_CTRL_SWP"));return}var r=this._grid.rows;r[i].swapNode(r[j])};core.comps.grid.sortCol=function(i,dir){this._sortCol(i,dir)};core.comps.grid._sortCol=function(i,dir){core.nodesort.nodeSort(this._grid.rows,dir,this._grid.ctrlRow.cells[i].sortType,"cells",i,null,1);if(this.ledgerMode)this.reDraw()};core.comps.grid.attachToForm=function(f,n){this.hiddenE=core._attachToForm(f,n);this.setFormValue(this.hiddenE)};core.comps.grid.setFormValue=function(e){if(!e)return;var r="";var s=this.selected;for(var a=0;a<s.length;a++){if(r!="")r+="\n";r+=this.getRow(s[a])}e.value=r};core.comps.grid.setColW=function(i,w){this._grid.ctrlRow.cells[i].setAttribute("width",w)};core.comps.grid.deleteRow=function(i){if(i==0){alert(core.getString("GRID_CTRL_DEL"));return false}var g=this._grid;var r=g.rows[i];if(r.selected){this.deselectRow(r);if(!this.allowNoSelect){if(i<(g.rows.length-1))this.selectRow(g.rows[i+1]);else if(i>1)this.selectRow(g.rows[i-1]);else{this.selectRow(r);alert(core.getString("GRID_NO_SEL"));return false}}this.onchange()}g.table.removeChild(r)};core.comps.grid.deleteRows=function(){var r=this._grid.rows;var p=this._grid.table;for(var a=r.length-1;a>0;a--)p.removeChild(r[a]);this.selected=[]};core.comps.grid._deleteCol=function(i){for(var a=0;a<this.rows.length;a++)this.rows[a].cells[i].removeNode(true)};core.comps.grid._deleteCols=function(){this.deleteRows();var r=this._grid.ctrlRow;var c=r.childNodes;for(var a=c.length-1;a>-1;a--)r.removeChild(c[a])};core.comps.grid.deleteCol=function(i){this._deleteCol(i)};core.comps.grid.deleteCols=function(){this._deleteCols()};core.comps.grid.hideCol=function(i){this._hideCol(i)};core.comps.grid._hideCol=function(i){var r=this._grid.rows;for(var a=1;a<r.length;a++)r[a].cells[i].style.display="none"};core.comps.grid.showCol=function(i){this._showCol(i)};core.comps.grid._showCol=function(i){var r=this._grid.rows;for(var a=1;a<r.length;a++)r[a].cells[i].style.display="inline"};core.comps.grid.onmouseover=function(E){if(!this.enabled||!this.doRollover)return;var e=core.findTarget(E,"TR");if(!e||!e.isGrid||e.selected)return;e._className=e.className;e.className="hl"};core.comps.grid.onmouseout=function(E){if(!this.enabled||!this.doRollover)return;var e=core.findTarget(E,"TR");if(!e||!e.isGrid)return;e.className=e._className};core.comps.grid.onmouseup=function(E){var p=this;if(!p.enabled)return;var s=p.selected;var e=core.findTarget(E,"TR");if(!e||(e.isGrid!=true))return;var was=e.selected;if(!p.multiSelect){for(var a=s.length-1;a>-1;a--)p.deselectRow(s[a]);s=[]}if(p.multiSelect){if(e.selected){if(p.allowNoSelect||s.length>1){p.deselectRow(e)}}else{p.selectRow(e)}}else{if(p.allowNoSelect){if(!was)p.selectRow(e);else p.deselectRow(e)}else{p.selectRow(e)}}p.setFormValue(p.hiddenE);p.onchange()};core.comps.grid._onkey=function(E){var e;e=core.findTarget(E,"LISTGRID");if(!e)e=core.findTarget(E,"GRID");if(!e)return;if(e.selected.length<1)return;E=core.isIE?event:E;var k=E.keyCode;var d=0;var i=core.getNodeIndex(e.selected[0]);if(k==38&&i>1)d=-1;if(k==40&&i<e.rows.length-1)d=1;if(d!=0){e.deselectRow(e.rows[i]);e.selectRow(e.rows[i+d]);e.setFormValue(e.hiddenE);e.onchange()}};core.comps.grid._fastLoad=function(ihtml){var g=this._grid;g.selected=[];g.innerHTML=ihtml;g.table=g.childNodes.item(0).childNodes.item(0);g.rows=g.table.childNodes;this.rows=g.rows;this.cols=g.cols};core.comps.grid.fastLoad=function(ihtml){this._fastLoad(ihtml)};
