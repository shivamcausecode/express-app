const addTwoNumbers = require('../addTwoNumbers');
test('adds 3 and 2 to equal 5', () => {
    expect(addTwoNumbers(3, 2)).toBe(5);
});