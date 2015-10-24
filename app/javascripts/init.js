'use strict';
import Cycle from '@cycle/core';
import {makeDOMDriver, h} from '@cycle/dom';
import {log} from './helpers'

document.addEventListener("DOMContentLoaded", function() {

  // BMI CALCULATOR
  function bmiStatus(bmi) {
    if (bmi < 18.5) {
      return "Underweight"
    } else if (bmi < 24.9) {
      return "Healthy"
    } else if (bmi < 29.9) {
      return "Overweight"
    } else {
      return "Obese"
    }
  }

  function main({DOM}) {
    let changeWeight$ = DOM.select('#weight').events('input').map(ev => ev.target.value);
    let changeHeight$ = DOM.select('#height').events('input').map(ev => ev.target.value);

    let bmi$ = Cycle.Rx.Observable.combineLatest(
      changeWeight$.startWith(70),
      changeHeight$.startWith(170),
      (weight, height) => {
        let heightMeters = height * 0.01;
        let bmi = Math.round(weight / (heightMeters * heightMeters));
        return {weight, height, bmi};
      }
    );

    return {
      DOM: bmi$.map(({weight, height, bmi}) => 
        h('div', [
          h('div', [
            `Weight: ${weight} kg`,
            h('input#weight', {type:'range', min: 40, max: 140, value: weight}),
          ]),
          h('div', [
            `Height: ${height} cm`,
            h('input#height', {type:'range', min: 140, max: 210, value: height}),
          ]),
          h('h2', `BMI is ${bmi}`),
          bmiStatus(bmi)
        ])
      )
    }
  }

  // INCREMENT/DECREMENT
  // function messageForCount(count) {
  //   if (count < 2) {
  //     return "Low";
  //   } else if (count < 5) {
  //     return "Medium";
  //   } else {
  //     return "High";
  //   }
  // }
  // function main({DOM}) {
  //   const action$ = Cycle.Rx.Observable.merge(
  //     DOM.select('.decrement').events('click').map(ev => -1),
  //     DOM.select('.increment').events('click').map(ev => +1)
  //   ).map(log);

  //   const count$ = action$
  //     .startWith(0)
  //     .scan((total, change) => total + change);

  //   let requests = {
  //     DOM: count$.map(count => 
  //       h('div', [
  //         h('button.decrement', 'Decrement'),
  //         h('button.increment', 'Increment'),
  //         h('p', `Counter: ${count}`),
  //         h('p', messageForCount(count))
  //       ])
  //     )
  //   };
  //   return requests;
  // }

  // CHECKBOX
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