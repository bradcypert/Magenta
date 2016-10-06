function addOne(num) {
  return num + 1;
}

function double(num) {
  return num * 2;
}

describe('sample tests', function() {
	describe('add one', function() {
		it('should increment by one', function() {
			let num = 0;
			chai.expect(addOne(num)).to.equal(1);
		});			

		it('should fail', function() {
			let num = 0;
			chai.expect(addOne(num)).to.equal(7);			
		});
	});			
});
