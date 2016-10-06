var Magenta = require('./index');

module.exports = {
	"framework": "mocha",
	"src_files": [
		"node_modules/chai/chai.js",
		"sample/test.js"
	],
	"reporter": new Magenta()
};
