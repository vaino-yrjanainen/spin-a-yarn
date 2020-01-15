var converter = new showdown.Converter();

var supportedLanguages = ["fi", "sv", "fr", "en"];
var defaultLanguage = window.navigator.language;

function populate() {
	console.log("Load page content from .md.");

	var defaultCode = defaultLanguage.substring(0, 2);

	var supported = false
	for (x of supportedLanguages) {
  		if (defaultCode == x) {
  			console.log("Default browser language supported:", x)
  			setLanguage(x);
  			supported = true
  		}
	}

	if (!supported) {
		console.log("Default browser language not supported.", defaultLanguage);
		setLanguage("en");
	}
}

// Load text once DOM has been loaded
document.addEventListener('DOMContentLoaded', function () {
   populate();
});


function setLanguage(language) {
	console.log("Set language to: ", language);

	// Load text from .md, add to DOM
	Promise.all([
	  fetch(language + '.md').then(x => x.text()),
	]).then(([markdown]) => {
	  html = converter.makeHtml(markdown);
	  document.getElementById("text-container").innerHTML = html;
	});

	// Remove underline from previous active language
	for (x of supportedLanguages) {
		document.getElementById(x).classList.remove("activeLang");
	}
	// Add underline to current active language
	document.getElementById(language).classList.add("activeLang");

}
