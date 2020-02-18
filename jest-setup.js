import './__mocks__';

// global.fetch = require('jest-fetch-mock')

const emptyFn = () => {};
const AnimatedValue = function() {
  this.setValue = emptyFn;
  this.setOffset = emptyFn;
};

const AnimatedValueXY = function() {};
AnimatedValueXY.prototype.x = new AnimatedValue();
AnimatedValueXY.prototype.y = new AnimatedValue();

// console.error = jest.genMockFunction();

jest.resetModules();
