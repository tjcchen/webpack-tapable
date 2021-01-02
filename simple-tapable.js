"use strict";

const { SyncHook } = require('tapable');

const hook = new SyncHook(['arg1', 'arg2', 'arg3']);

// bind sync events
// In webpack, we use similar strategies to bind & execute events
hook.tap('sync', (arg1, arg2, arg3) => {
  console.log('pint out sync hook args: ');
  console.log(arg1, arg2, arg3); // 4, 5, 6
});

// execute sync events
hook.call(4, 5, 6);