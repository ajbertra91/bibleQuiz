'use strict';
import Cycle from '@cycle/core';
import {makeDOMDriver, h} from '@cycle/dom';
import {log} from './helpers'

document.addEventListener("DOMContentLoaded", function() {

  function renderChoices(choice) {
    return h('ul',[
      h(choice.one === true ? 'li.choice-one.is-selected' : 'li.choice-one', 'Choice One'),
      h(choice.two === true ? 'li.choice-two.is-selected' : 'li.choice-two', 'Choice Two'),
      h(choice.three === true ? 'li.choice-three.is-selected' : 'li.choice-three', 'Choice Three'),
      h(choice.four === true ? 'li.choice-four.is-selected' : 'li.choice-four', 'Choice Four')
    ]);
  }

  function view(state$) {
    return state$.map((choice, completed ) => 
      h('div.quiz-container', [
        h('div.question-container',[
          h('div.text', 'Question Text Here'),
          h('div.score-container', [
            h('div.completed-questions', [
              h('span.completed', completed),
              h('span.total', '/20')
            ]),
            h('div.percent-corrent', '0%')
          ])
        ]),
        h('div.choices-container', [
          renderChoices(choice)
        ]),
        h('button.submit', {type:'button'}, 'Submit'),
        h('div.answer-container', [
          h('div.verse-container', [
            h('div.bible-verse-text', 'Bible Verse Here'),
            h('div.bible-verse', 'Mark 8:43')
          ]),
          h('div.grade-icon', 'O')
        ])
      ])
    )
  }

  function model(actions) {
    return Cycle.Rx.Observable.combineLatest(
      actions.choiceOneClick$.startWith(false),
      actions.choiceTwoClick$.startWith(false),
      actions.choiceThreeClick$.startWith(false),
      actions.choiceFourClick$.startWith(false),
      actions.submitClick$.startWith(false),
      (one, two, three, four, submit) => ({ choice: {one,two,three,four}, submit })
    );
  }

  function intent(DOM) {
    return {
      choiceOneClick$: DOM.select('.choice-one').events('click').map(ev => {one:true}).map(log),
      choiceTwoClick$: DOM.select('.choice-two').events('click').map(ev => {two:true}).map(log),
      choiceThreeClick$: DOM.select('.choice-three').events('click').map(ev => {three:true}).map(log),
      choiceFourClick$: DOM.select('.choice-four').events('click').map(ev => {four:true}).map(log),
      submitClick$: DOM.select('.submit').events('click').map(ev => true).map(log)
    };
  }

  function main({DOM}) {
    return { DOM: view(model(intent(DOM))) }
  }

  // BMI CALCULATOR
  // function bmiStatus(bmi) {
  //   if (bmi < 18.5) {
  //     return "Underweight"
  //   } else if (bmi < 24.9) {
  //     return "Healthy"
  //   } else if (bmi < 29.9) {
  //     return "Overweight"
  //   } else {
  //     return "Obese"
  //   }
  // }

  // function renderSliderWeight(weight) {
  //   return h('div', [
  //     `Weight: ${weight} kg`,
  //     h('input#weight', {type:'range', min: 40, max: 140, value: weight}),
  //   ])
  // }
  // function renderSliderHeight(height) {
  //   return h('div', [
  //     `Height: ${height} cm`,
  //     h('input#height', {type:'range', min: 140, max: 210, value: height}),
  //   ])
  // }
  // function calculateBMI(weight, height) {
  //   let heightMeters = height * 0.01;
  //   return Math.round(weight / (heightMeters * heightMeters));
  // }

  // function intent(DOM) {
  //   return {
  //     changeWeight$: DOM.select('#weight').events('input').map(ev => ev.target.value),
  //     changeHeight$: DOM.select('#height').events('input').map(ev => ev.target.value)
  //   };
  // }

  // function model(actions) {
  //   return Cycle.Rx.Observable.combineLatest(
  //     actions.changeWeight$.startWith(70),
  //     actions.changeHeight$.startWith(170),
  //     (weight, height) => ({weight, height, bmi:calculateBMI(weight, height)})
  //   );
  // }

  // function view(state$) {
  //   return state$.map(({weight, height, bmi}) => 
  //     h('div', [
  //       renderSliderWeight(weight),
  //       renderSliderHeight(height),
  //       h('h2', `BMI is ${bmi}`),
  //       h('h3', bmiStatus(bmi))
  //     ])
  //   )
  // }

  // function main({DOM}) {
  //   return { DOM: view(model(intent(DOM))) };
  // }


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
