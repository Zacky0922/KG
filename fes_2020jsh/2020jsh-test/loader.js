(function () {

	let script = document.createElement("script");
	script.type = "text/javascript";
	let basicUrl;

	if (location.href.indexOf("fes.kgef.ac.jp/2020jsh-test/") > -1) {
		basicUrl = "https://fes.kgef.ac.jp/2020jsh-test/";
	} else if (location.href.indexOf("192.168.1.171") > -1) {
		basicUrl = "http://192.168.1.171/test/";
	} else if (location.href.indexOf("192.168.1.171") > -1) {
		basicUrl = "http://192.168.1.171/test/";
	} else {
		basicUrl = "../../";
	}
	script.src = basicUrl + "zScripts/master.js?mode=kgfes";
	document.write(script.outerHTML);


	var manualQuery = new Array();
	manualQuery["mode"] = "kgfes_debug";
	manualQuery["root"] = basicUrl;
	manualQuery["zScriptsDir"] = basicUrl + "zScripts/";
})();


let ua = window.navigator.userAgent.toLowerCase();

if (ua.indexOf("edg") > -1) {
	if (ua.indexOf("edge") > -1) {
		alert("お使いのブラウザ「古いEdge」は、非対応です。");
		location.href = "./br_error.html";
	}
} else if (ua.indexOf("trident") > -1) { 
	alert("お使いのブラウザ「Internet Explorer」は、非対応です。");
	location.href = "./br_error.html";
}