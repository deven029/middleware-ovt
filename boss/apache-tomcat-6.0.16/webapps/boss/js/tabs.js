
function Tabs() { }

Tabs.goto = function(tabId) {
	for (var i = 0; i < Tabs.tabLinks.length; i++) {
        var link = Tabs.tabLinks[i];
        var loopId = link.getAttribute("tabId");
        if (loopId == tabId) {
          document.getElementById(loopId).style.display = "block";
          link.className = "linkSelected " ;
        }
        else {
          document.getElementById(loopId).style.display = "none";
          link.className = "linkUnselected " ;
        }
      }
}

Tabs.init = function(tabListId) {
  Tabs.tabLinks = document.getElementById(tabListId).getElementsByTagName("A");

  var link, tabId, tab;
  for (var i = 0; i < Tabs.tabLinks.length; i++) {
    link = Tabs.tabLinks[i];
    tabId = link.getAttribute("tabId");
    if (!tabId) alert("Expand link does not have a tabId element: " + link.innerHTML);
    tab = document.getElementById(tabId);
    if (!tab) alert("tabId does not exist: " + tabId);

    if (i == 0) {
      tab.style.display = "block";
      link.className = "linkSelected " ;
    }
    else {
      tab.style.display = "none";
      link.className = "linkUnselected " ;
    }

    link.onclick = function() {
      var tabId = this.getAttribute("tabId");
      for (var i = 0; i < Tabs.tabLinks.length; i++) {
        var link = Tabs.tabLinks[i];
        var loopId = link.getAttribute("tabId");
        if (loopId == tabId) {
          document.getElementById(loopId).style.display = "block";
          link.className = "linkSelected " ;
        }
        else {
          document.getElementById(loopId).style.display = "none";
          link.className = "linkUnselected " ;
        }
      }
      if (this.blur) this.blur();
      return false;
    }
  }
}
