const { TestEnvironment } = require('jest-environment-node');

const globals = [];

module.exports = class CountingEnvironment extends TestEnvironment {
  async setup() {
    await super.setup();
    globals.push(new WeakRef(this.global));
  }

  async teardown() {
    await super.teardown();
    await new Promise((resolve) => setTimeout(resolve, 50));
    global.gc();
    const alive = globals.filter((ref) => ref.deref()).length;
    console.log(`test files finished: ${globals.length}, still in memory: ${alive}`);
  }
};
