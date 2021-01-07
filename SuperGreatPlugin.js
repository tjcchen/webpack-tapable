'use strict';

const Compiler = require('./Compiler');

class SuperGreatPlugin {
  constructor() {

  }

  apply(compiler) {
    // register sync plugin
    compiler.hooks.make.tap('SuperGreatPlugin', () => { console.log('SuperGreatPlugin Make'); });

    // register async plugin
    compiler.hooks.asyncMake.tapPromise('AsyncSuperGreatPlugin', (from, to) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`SuperGreatPlugin AsyncMake: ${from} - ${to}`);
          resolve();
        }, 1000);
      });
    });
  }
}

// Emulate plugin in webpack.config.js
const superGreatPlugin = new SuperGreatPlugin();
const options = {
  plugins: [
    superGreatPlugin
  ]
};

// Emulate code logic within webpack.js
const compiler = new Compiler();

for (const plugin of options.plugins) {
  if (typeof plugin === 'function') {
    plugin.call(compiler, compiler);
  } else {
    // utilize this part of logic
    // console.log(typeof plugin); // objects

    plugin.apply(compiler);
  }
}

compiler.run();
