var expect = require('chai').expect;
var addTwoNumbers = require('../addTwoNumbers');

describe('addTwoNumbers()', function() {
    it('shoudl add two numbers', function() {
        var x = 100;
        var y = 200;

        var sum1 = x + y;

        var sum2 = addTwoNumbers(x, y);

        expect(sum2).to.be.equal(sum1);
    });
});