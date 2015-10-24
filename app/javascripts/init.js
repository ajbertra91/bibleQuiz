'use strict';
import Cycle from '@cycle/core';
import {makeDOMDriver, h} from '@cycle/dom';
import {log} from './helpers'

document.addEventListener("DOMContentLoaded", function() {
  function messageForCount(count) {
    if (count < 2) {
      return "Low";
    } else if (count < 5) {
      return "Medium";
    } else {
      return "High";
    }
  }

  function main({DOM}) {
    const action$ = Cycle.Rx.Observable.merge(
      DOM.select('.decrement').events('click').map(ev => -1),
      DOM.select('.increment').events('click').map(ev => +1)
    ).map(log);

    const count$ = action$
      .startWith(0)
      .scan((total, change) => total + change);

    let requests = {
      DOM: count$.map(count => 
        h('div', [
          h('button.decrement', 'Decrement'),
          h('button.increment', 'Increment'),
          h('p', `Counter: ${count}`),
          h('p', messageForCount(count))
        ])
      )
    };
    return requests;
  }

  // function log(thing) {
  //   console.log(thing);
  //   return thing;
  // }

  // function main(drivers) {
  //   return {
  //     DOM: drivers.DOM.select('input').events('click')
  //       .map(ev => ev.target.checked)
  //       .map(log)
  //       .startWith(false)
  //       .map(toggled =>
  //         h('div', [
  //           h('input', {type: 'checkbox'}), 'Toggle me',
  //           h('p', toggled ? 'ON' : 'off')
  //         ])
  //       )
  //   };
  // }

  let drivers = {
    DOM: makeDOMDriver('#app')
  };

  Cycle.run(main, drivers);

});