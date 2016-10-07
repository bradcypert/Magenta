var Table = require('cli-table');
var Colors = require('colors');

function MagentaReporter(out) {
	this.out = out || process.stdout;
	this.total = 0;
	this.pass = 0;
	this.fail = 0;
	this.pending = 0;
	this.duration = 0;
	this.tests = {};
}

MagentaReporter.prototype = {
	report: function(prefix, data) {
		this.total++;

		if (!this.tests[prefix]) {
			this.tests[prefix] = {
				total: 0,
				pass: 0,
				fail: 0,
				pending: 0,
				duration: 0
			};
		}
		
		this.tests[prefix].total++;
		if (!Number.isNaN(data.runDuration)) {
			this.duration += data.runDuration;
			this.tests[prefix].duration += data.runDuration
		}

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

	_addLastRow: function(table) {
		var didPass,
				name = 'All Sources';

		if (this.fail ===  0) {
			didPass = 'P'.bold.green;
		} else {
			didPass = 'F'.bold.red;
			name = name.red;
		}
		
		table.push([didPass, name, this.pass, this.fail, this.pending,  this.total, this.duration + 'ms']);
		return table;
	},

	finish: function() {
		var table = new Table({ 
				head: ['P/F','Source', 'Pass'.bold.green, 'Fail'.bold.red, 'Pending'.bold.yellow, 'Total'.bold, 'Duration'],
				colWidths: [5, 35, 10, 10, 10, 10, 10],
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
								this.tests[k].pending? this.tests[k].pending.toString() : '0',
								this.tests[k].total ? this.tests[k].total.toString() : '0',
								this.tests[k].duration + "ms"]);
		}
    table = this._addLastRow(table);	
		this.out.write(table.toString());
	}
};

module.exports = MagentaReporter;
