
var list = (function () {
	return {
		showList: showList,
		hideList: hideList,
	}
	function showList(id) {
		var elem = document.getElementById(id);
		elem.style.display = 'block';
	}
	function hideList(id) {
		var elem = document.getElementById(id);
		elem.style.display = 'none';
	}
})();