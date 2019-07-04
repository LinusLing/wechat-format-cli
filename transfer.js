const fs = require('fs')
const path = require('path');
const marked = require('marked');
const clipboardy = require('clipboardy');
const defaultTheme = require("./assets/scripts/themes/default.js");
const WxRenderer = require("./assets/scripts/renderers/wx-renderer.js");

var argv = require('minimist')(process.argv.slice(2));

if (argv["input"] === undefined && argv["_"].length <= 0) {
	console.log("It needs an input markdown file path.");
	return;
}

const input = argv["input"] === undefined ? argv["_"][0] : argv["input"];

let wxRenderer = new WxRenderer({
	theme: defaultTheme,
	fonts: "Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
	size: '16px'
});

fs.readFile(input, 'utf8', (err, source) => {
  	var output = marked(source, { renderer: wxRenderer.getRenderer() })
	if (wxRenderer.hasFootnotes()) {
		output += wxRenderer.buildFootnotes()
	}
	// Copy wx-format html to clipboard.
	clipboardy.write(output).then(res => {
		console.log("Successfully copy wx-format html to clipboard.");
	}).catch(e => {
		console.log("clipboardy.write error: "+e);
	});
});
