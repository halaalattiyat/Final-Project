const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.setImmediate = (callback, ...args) => {
  return setTimeout(callback, 0, ...args);
};

require('@testing-library/jest-dom');