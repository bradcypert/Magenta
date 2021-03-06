function addOne(num) {
  return num + 1;
}

function double(num) {
  return num * 2;
}

describe('sample tests', function() {
  describe('add one', function() {
    it('should increment by one', function() {
      var num = 0;
      chai.expect(addOne(num)).to.equal(1);
    });

    it('should fail', function() {
      var num = 0;
      chai.expect(addOne(num)).to.equal(4);
    });

    it.skip('should skip', function() {
      console.log('I shouldnt be called!');
    });

    it('pending tests should work too!');
  });
});
