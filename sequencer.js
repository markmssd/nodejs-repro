const Sequencer = require('@jest/test-sequencer').default;

module.exports = class ManyFirst extends Sequencer {
  sort(tests) {
    return [...tests].sort((a, b) => Number(b.path.endsWith('many.test.js')) - Number(a.path.endsWith('many.test.js')) || a.path.localeCompare(b.path));
  }
};
