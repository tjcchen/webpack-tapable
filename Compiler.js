'use strict';

const { SyncHook, AsyncSeriesHook } = require('tapable');

class Compiler {
  constructor() {
    this.hooks = {
      make: new SyncHook(['source']),
      asyncMake: new AsyncSeriesHook(['from', 'to'])
    };
  }

  run() {
    this.make('source');
    this.asyncMake('from', 'to');
  }

  make(source) {
    // invoke plugin
    this.hooks.make.call(source);
  }

  asyncMake() {
    this.hooks.asyncMake.promise(...arguments).then(
      () => {
        console.log('finished');
      },
      err => {
        console.log(err);
      }
    );
  }
}

module.exports = Compiler;