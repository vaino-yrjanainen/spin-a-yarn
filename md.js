var converter = new showdown.Converter(),
    text      = '# hello, markdown!',
    html      = converter.makeHtml(text);
    //console.log(html);



window.onload = function populate() {
	//document.getElementById("body").innerHTML = html;
	Promise.all([
	  fetch('fi.md').then(x => x.text()),
	]).then(([sampleResp]) => {
	  console.log(sampleResp);
	  html = converter.makeHtml(sampleResp);
	  document.getElementById("text-container").innerHTML = html;
	});
}


