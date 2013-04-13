(function(){
var dpr = window.devicePixelRatio || 1;
if(dpr>1){
	var m = document.createElement("meta")
	m.setAttribute("name", "viewport")
	m.setAttribute("content", 'width=device-width,height=device-height,initial-scale='+(1/dpr))
	document.head.appendChild(m)
}
})()