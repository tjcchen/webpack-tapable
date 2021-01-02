"use strict";

const { SyncHook, AsyncSeriesHook } = require('tapable');

class Car {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook(['newspeed']),
      brake: new SyncHook(),
      calculateHook: new AsyncSeriesHook(['source', 'target', 'routesList'])
    };
  }
}

const car = new Car();

// bind sync hook
car.hooks.brake.tap('WarningLampPlugin', () => {
  console.log('WarningLampPlugin');
});

// bind sync hook & passed in params
car.hooks.accelerate.tap('LoggerPlugin', newSpeed => {
  console.log(`Accelerating to ${newSpeed}`);
});

// bind async hook
car.hooks.calculateHook.tapPromise('CalculateRoutes tapPromise', (source, target, routesList, callback) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`tapPromise to ${source} ${target} ${routesList}`);
      resolve();
    }, 1000);
  });
});

// invoke events - sync & async
car.hooks.brake.call();
car.hooks.accelerate.call(10);

console.time('cost');

car.hooks.calculateHook.promise('async', 'hook', ['tianjin', 'beijing']).then(
  () => {
    console.timeEnd('cost');
  },
  err => {
    console.log(err);
    console.timeEnd('cost');
  }
);