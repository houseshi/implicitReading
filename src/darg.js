
/*-------------------------- +
  获取id, class, tagName
 +-------------------------- */
 var get = {
	byId: function(id) {
		return typeof id === "string" ? document.getElementById(id) : id
	},
	byClass: function(sClass, oParent) {
		var aClass = [];
		var reClass = new RegExp("(^| )" + sClass + "( |$)");
		var aElem = this.byTagName("*", oParent);
		for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass
	},
	byTagName: function(elem, obj) {
		return (obj || document).getElementsByTagName(elem)
	}
};
var dragMinWidth = 250;
var dragMinHeight = 124;
/*-------------------------- +
  拖拽函数
 +-------------------------- */
function drag(oDrag, handle)
{
	var disX = dixY = 0;
	var oMin = get.byClass("min", oDrag)[0];
	var oMax = get.byClass("max", oDrag)[0];
	var oRevert = get.byClass("revert", oDrag)[0];
	var oClose = get.byClass("close", oDrag)[0];
	handle = handle || oDrag;
	handle.style.cursor = "move";
	handle.onmousedown = function (event)
	{
		var event = event || window.event;
		disX = event.clientX - oDrag.offsetLeft;
		disY = event.clientY - oDrag.offsetTop;
		
		document.onmousemove = function (event)
		{
			var event = event || window.event;
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
			var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;
			
			iL <= 0 && (iL = 0);
			iT <= 0 && (iT = 0);
			iL >= maxL && (iL = maxL);
			iT >= maxT && (iT = maxT);
			
			oDrag.style.left = iL + "px";
			oDrag.style.top = iT + "px";
			
			return false
		};
		
		document.onmouseup = function ()
		{
			document.onmousemove = null;
			document.onmouseup = null;
			this.releaseCapture && this.releaseCapture()
		};
		this.setCapture && this.setCapture();
		return false
	};	
	//最大化按钮
	oMax.onclick = function ()
	{
		oDrag.style.top = oDrag.style.left = 0;
		oDrag.style.width = document.documentElement.clientWidth - 2 + "px";
		oDrag.style.height = document.documentElement.clientHeight - 2 + "px";
		this.style.display = "none";
		oRevert.style.display = "block";
	};
	//还原按钮
	oRevert.onclick = function ()
	{		
		oDrag.style.width = dragMinWidth + "px";
		oDrag.style.height = dragMinHeight + "px";
		oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
		oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
		this.style.display = "none";
		oMax.style.display = "block";
	};
	//最小化按钮
	oMin.onclick = oClose.onclick = function ()
	{
		oDrag.style.display = "none";
		var oA = document.createElement("a");
		oA.className = "open";
		oA.href = "javascript:;";
		oA.title = "还原";
		document.body.appendChild(oA);
		oA.onclick = function ()
		{
			oDrag.style.display = "block";
			document.body.removeChild(this);
			this.onclick = null;
		};
	};
	//阻止冒泡
	oMin.onmousedown = oMax.onmousedown = oClose.onmousedown = function (event)
	{
		this.onfocus = function () {this.blur()};
		(event || window.event).cancelBubble = true	
	};
}
/*-------------------------- +
  改变大小函数
 +-------------------------- */
function resize(oParent, handle, isLeft, isTop, lockX, lockY)
{
	handle.onmousedown = function (event)
	{
		var event = event || window.event;
		var disX = event.clientX - handle.offsetLeft;
		var disY = event.clientY - handle.offsetTop;	
		var iParentTop = oParent.offsetTop;
		var iParentLeft = oParent.offsetLeft;
		var iParentWidth = oParent.offsetWidth;
		var iParentHeight = oParent.offsetHeight;
		
		document.onmousemove = function (event)
		{
			var event = event || window.event;
			
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
			var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;			
			var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
			var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
			
			isLeft && (oParent.style.left = iParentLeft + iL + "px");
			isTop && (oParent.style.top = iParentTop + iT + "px");
			
			iW < dragMinWidth && (iW = dragMinWidth);
			iW > maxW && (iW = maxW);
			lockX || (oParent.style.width = iW + "px");
			
			iH < dragMinHeight && (iH = dragMinHeight);
			iH > maxH && (iH = maxH);
			lockY || (oParent.style.height = iH + "px");
			
			if((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove = null;
			
			return false;	
		};
		document.onmouseup = function ()
		{
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	}
};
window.onload = window.onresize = function ()
{
	var oDrag = document.getElementById("drag");
	var oTitle = get.byClass("title", oDrag)[0];
	var oL = get.byClass("resizeL", oDrag)[0];
	var oT = get.byClass("resizeT", oDrag)[0];
	var oR = get.byClass("resizeR", oDrag)[0];
	var oB = get.byClass("resizeB", oDrag)[0];
	var oLT = get.byClass("resizeLT", oDrag)[0];
	var oTR = get.byClass("resizeTR", oDrag)[0];
	var oBR = get.byClass("resizeBR", oDrag)[0];
	var oLB = get.byClass("resizeLB", oDrag)[0];
	
	drag(oDrag, oTitle);
	//四角
	resize(oDrag, oLT, true, true, false, false);
	resize(oDrag, oTR, false, true, false, false);
	resize(oDrag, oBR, false, false, false, false);
	resize(oDrag, oLB, true, false, false, false);
	//四边
	resize(oDrag, oL, true, false, false, true);
	resize(oDrag, oT, false, true, true, false);
	resize(oDrag, oR, false, false, false, true);
	resize(oDrag, oB, false, false, true, false);
	
	oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
	oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
}






















var params = URLSearchParams && new URLSearchParams(document.location.search.substring(1));
var url = params && params.get("url") && decodeURIComponent(params.get("url"));
var currentSectionIndex = (params && params.get("loc")) ? params.get("loc") : undefined;

// Load the opf
var book = ePub(url || "https://s3.amazonaws.com/moby-dick/moby-dick.epub");
var rendition = book.renderTo("viewer", {
  width: "100%",
  height: 600,
  spread: "always"
});

rendition.display(currentSectionIndex);

book.ready.then(() => {

  var next = document.getElementById("next");

  next.addEventListener("click", function(e){
	book.package.metadata.direction === "rtl" ? rendition.prev() : rendition.next();
	e.preventDefault();
  }, false);

  var prev = document.getElementById("prev");
  prev.addEventListener("click", function(e){
	book.package.metadata.direction === "rtl" ? rendition.next() : rendition.prev();
	e.preventDefault();
  }, false);

  var keyListener = function(e){

	// Left Key
	if ((e.keyCode || e.which) == 37) {
	  book.package.metadata.direction === "rtl" ? rendition.next() : rendition.prev();
	}

	// Right Key
	if ((e.keyCode || e.which) == 39) {
	  book.package.metadata.direction === "rtl" ? rendition.prev() : rendition.next();
	}

  };

  rendition.on("keyup", keyListener);
  document.addEventListener("keyup", keyListener, false);

})

var title = document.getElementById("title");

rendition.on("rendered", function(section){
  var current = book.navigation && book.navigation.get(section.href);

  if (current) {
	var $select = document.getElementById("toc");
	var $selected = $select.querySelector("option[selected]");
	if ($selected) {
	  $selected.removeAttribute("selected");
	}

	var $options = $select.querySelectorAll("option");
	for (var i = 0; i < $options.length; ++i) {
	  let selected = $options[i].getAttribute("ref") === current.href;
	  if (selected) {
		$options[i].setAttribute("selected", "");
	  }
	}
  }

});

rendition.on("relocated", function(location){
  console.log(location);

  var next = book.package.metadata.direction === "rtl" ?  document.getElementById("prev") : document.getElementById("next");
  var prev = book.package.metadata.direction === "rtl" ?  document.getElementById("next") : document.getElementById("prev");

  if (location.atEnd) {
	next.style.visibility = "hidden";
  } else {
	next.style.visibility = "visible";
  }

  if (location.atStart) {
	prev.style.visibility = "hidden";
  } else {
	prev.style.visibility = "visible";
  }

});

rendition.on("layout", function(layout) {
  let viewer = document.getElementById("viewer");

  if (layout.spread) {
	viewer.classList.remove('single');
  } else {
	viewer.classList.add('single');
  }
});

window.addEventListener("unload", function () {
  console.log("unloading");
  this.book.destroy();
});

book.loaded.navigation.then(function(toc){
		var $select = document.getElementById("toc"),
				docfrag = document.createDocumentFragment();

		toc.forEach(function(chapter) {
			var option = document.createElement("option");
			option.textContent = chapter.label;
			option.setAttribute("ref", chapter.href);

			docfrag.appendChild(option);
		});

		$select.appendChild(docfrag);

		$select.onchange = function(){
				var index = $select.selectedIndex,
						url = $select.options[index].getAttribute("ref");
				rendition.display(url);
				return false;
		};

	});

