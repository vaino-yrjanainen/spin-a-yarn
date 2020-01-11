var converter = new showdown.Converter(),
    text      = '# hello, markdown!',
    html      = converter.makeHtml(text);
    //console.log(html);

var supportedLanguages = ["fi", "sv", "fr", "en"];

var defaultLanguage = window.navigator.language

window.onload = function populate() {
	//document.getElementById("body").innerHTML = html;
	Promise.all([
	  fetch('fi.md').then(x => x.text()),
	]).then(([sampleResp]) => {
	  console.log(sampleResp);
	  html = converter.makeHtml(sampleResp);
	  document.getElementById("text-container").innerHTML = html;
	});

	console.log(defaultLanguage);

	var defaultCode = defaultLanguage.substring(0, 2);

	for (x of supportedLanguages) {
  		if (defaultCode == x) {
  			console.log("Detect default language:", x)
  			setLanguage(x);
  		}
	} 
}


function setLanguage(language) {
	//document.getElementById("body").innerHTML = html;

	for (x of supportedLanguages) {
		document.getElementById(x).classList.remove("activeLang");
	}

	document.getElementById(language).classList.add("activeLang");
	//console.log(document.getElementById(language).class);
	console.log(language);
	console.log(defaultLanguage);

	Promise.all([
	  fetch(language + '.md').then(x => x.text()),
	]).then(([markdown]) => {
	  html = converter.makeHtml(markdown);
	  document.getElementById("text-container").innerHTML = html;
	});
}
