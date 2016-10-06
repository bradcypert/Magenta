var Table = require('cli-table');
var Colors = require('colors');

function MagentaReporter(out) {
	this.out = out || process.stdout;
	this.total = 0;
	this.pass = 0;
	this.fail = 0;
	this.tests = {};
}

MagentaReporter.prototype = {
	report: function(prefix, data) {
		this.total++;

		if (!this.tests[prefix]) {
			this.tests[prefix] = {
				total: 0,
				pass: 0,
				fail: 0
			};
		}

		this.tests[prefix].total++;

		if (data.passed) {
			this.pass++;
			this.tests[prefix].pass++;
		}	else {
			this.fail++;
			this.tests[prefix].fail++;
			this.out.write((data.name + ': failed to pass in ' + prefix + '\n').underline.red);
			if(data.error) {
				this.out.write('|  ' + data.error.message + '\n');
				this.out.write('|  ' + data.error.stack + '\n');
			}
		}
	},

	finish: function() {
		var table = new Table({ 
				head: ['P/F','Source', 'Pass'.bold.green, 'Fail'.bold.red, 'Total'.bold],
				colWidths: [5, 35, 10, 10, 10],
				style: {
					head: null
				}
		});

		for (k of Object.keys(this.tests)) {
			var name = k.toString();
			var pass = true;

			if (this.tests[k].fail > 0) {
        name = (name).red;
				pass = false;
			}

			table.push([
								pass ? 'P'.bold.green : 'F'.bold.red,
								name,
								this.tests[k].pass ? this.tests[k].pass.toString() : '0',
								this.tests[k].fail ? this.tests[k].fail.toString() : '0',
								this.tests[k].total ? this.tests[k].total.toString() : '0']);
		}
		
		if (this.fail > 0) {
			table.push(['F'.bold.red, 'All Sources'.red, this.pass, this.fail, this.total]);
		} else {
			table.push(['P'.bold.green, 'All Sources', this.pass, this.fail, this.total]);
		}
		this.out.write(table.toString());
	}
};

module.exports = MagentaReporter;
