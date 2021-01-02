"use strict";

const { SyncHook } = require('tapable');

const hook1 = new SyncHook(['arg1', 'arg2', 'arg3']);

// bind sync events
// in webpack, we use similar strategies to bind & execute events
hook1.tap('sync', (arg1, arg2, arg3) => {
  console.log('pint out sync hook args: ');
  console.log(arg1, arg2, arg3); // 4, 5, 6
});

// execute sync events
hook1.call(4, 5, 6);