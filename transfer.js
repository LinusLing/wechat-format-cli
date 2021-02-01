#!/usr/bin/env node

const fs = require('fs')
const path = require('path');
const marked = require('marked');
const defaultTheme = require("./assets/scripts/themes/default.js");
const WxRenderer = require("./assets/scripts/renderers/wx-renderer.js");
const puppeteer = require('puppeteer');

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

const source = fs.readFileSync(input, 'utf8');
var output = marked(source, {
	renderer: wxRenderer.getRenderer()
})
if (wxRenderer.hasFootnotes()) {
	output += wxRenderer.buildFootnotes()
}

function copy() {
	return new Promise(async (resolve, reject) => {
		const browser = await puppeteer.launch({});
		let page = await browser.newPage();

		try {
			await page.setContent('<div id="output">' + output + '</div>');

			const result = await page.evaluate(() => {
				function copyText(selector) {
					var clipboardDiv = document.querySelector(selector);
					clipboardDiv.focus();
					window.getSelection().removeAllRanges();
					var range = document.createRange();
					range.setStartBefore(clipboardDiv.firstChild);
					range.setEndAfter(clipboardDiv.lastChild);
					window.getSelection().addRange(range);

					try {
						var ret_text = undefined
						if (document.execCommand('Copy')) {
							console.log("Successfully copy wx-format html to clipboard.");
							ret_text = copyText.value;
						}
						if (ret_text == undefined) {
							console.log("Successfully copy wx-format html to clipboard in degrade mode.");
							return output
						}
						return ret_text
					} catch (err) {
						console.log("Successfully copy wx-format html to clipboard in degrade mode.");
						return output
					}
				}
				return copyText("#output");
			});
			// 结束
			browser.close();
			return resolve();
		} catch (e) {

			// 结束
			browser.close();
			return reject(e);
		}
	})
}
copy();