'use strict';
import Cycle from '@cycle/core';
import Rx from 'rx';
import {makeDOMDriver, h} from '@cycle/dom';
import {log} from './helpers'
import {game} from './game'

document.addEventListener("DOMContentLoaded", function() {

  console.debug('Cycle: ', Cycle);
  console.debug('Rx: ', Rx);

  // CUSTOM ELEMENT
  // function labelSlider(responses) {
  //   function intent(DOM) {
  //     return {
  //       changeValue$: DOM.select('.slider').events('input').map(ev => ev.target.value);
  //     }
  //   } 
  //   function model(context, actions) {
  //     let initialValue$ = context.props.get('initial').first();
  //     let value$ = initialValue$.concat(newValue$);
  //     let props$ = context.props.getAll();
  //     return Rx.Observable.combineLatest(props$, value$, (props, value) => { return {props,value}; });
  //   }
  //   function view(state$) {
  //     return state$.map(state => {
  //       let {label, unit, min, max} = state.props;
  //       let value = state.value;
  //       return h('div.labeled-slider', [
  //         h('span.label', [label + ' ' + value + unit]),
  //         h('input.slider', {type: 'range', min, max, value})
  //       ])
  //     });
  //   }

  //   let actions = intent(responses.DOM);
  //   let vtree$ = view(model(responses, actions))

  //   return {
  //     DOM: vtree$,
  //     events: {
  //       newValue: actions.changeValue$
  //     }
  //   }
  // }

  // let domDriver = CycleDOM.makeDOMDriver('#app', {
  //   'labeled-slider': labelSlider 
  // })

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

  // QUIZ
  function renderChoices(choices, choice, submit) {
    console.log('in render fn - choice: ', choice);
    console.log('in render fn - choices: ', choices);
    console.log('in render fn - submit: ', submit);
    return h('div', [
      h('ul.list-group',[
        choices.map((text, i) => {
          if (choice - 1 === i) {
            return h(`li.list-group-item.choice.choice${i+1}.is-selected`, text)
          } else {
            return h(`li.list-group-item.choice.choice${i+1}`, text)
          }
        })
      ]),
      choice > 0 ? h('div#submit.btn.btn-primary.pull-left', 'Sumbit') : '',
      choice > 0 && submit ? h('div#next.btn.btn-primary.pull-right', 'Next') : ''
    ]);
      
  }

  function renderAnswer(qObj, choice, submit) {
    if (submit === true) {
      if (qObj.answer === (choice - 1)) {
        return h('h3.verse-container.page-header', [
          h('span.glyphicon.glyphicon-ok.pull-right', ''),
          h('a.ref-link', {href: qObj.link, target: '_blank'}, [ qObj.reference ])
        ])
      } else {
        return h('h3.verse-container.page-header', [
          h('span.glyphicon.glyphicon-remove.pull-right', ''),
          h('a.ref-link', {href: qObj.link, target: '_blank'}, [ qObj.reference ])
        ])
      }
    } else {
      return;
    }
  }

  function view(state$) {
    let qObj = game.questions;
    let total = game.questions.length;
    // return state$
    return state$.map(({choice, submit, next, turn}) => 
      h('div.quiz-container.jumbotron', [
        h('div.question-container.container',[
          h('h2.text', qObj[turn].question),
          h('div.score-container.container', [
            h('h3.completed-questions.page-header', [
              h('span.completed.pull-left.', `${turn+1}`),
              h('span.total.pull-left', '/'+`${total}`),
              h('span.percent-corrent.pull-right', '0%')
            ]),
          ])
        ]),
        h('div.choices-container.container', [
          renderChoices(qObj[turn].choices, choice, submit)
        ]),
        h('div.answer-container.container', [
          renderAnswer(qObj[turn], choice, submit)
        ])
      ])
    )
  }

  // function model(actions) {
  //   let turn = 0;
  //   return Rx.Observable.merge(
  //     actions.choice$.startWith(0),
  //     actions.submitClick$.startWith(false),
  //     actions.nextClick$.startWith(false)
  //     .map(x => { 
  //       console.debug('x: ', x);
  //       return x
  //       // return {
  //       //   choice,
  //       //   submit,
  //       //   next,
  //       //   turn
  //       // }
  //     })
  //   );
  // }

  function model(actions) {
    let turn = 0;
    return Rx.Observable.combineLatest(
      actions.choice$.startWith(0),
      actions.submitClick$.startWith(false),
      actions.nextClick$.startWith(false),
      // actions.turn$.startWith(0).scan((a, b) => a + b).map(log),
      // this object should control the display of the VIEW elements... but it only works the first question
      // because the combineLatest operator is "storing" the value of the submit$ and next$ ... 
      (choice, submit, next) => {
        console.debug('choice: ', choice);
        console.debug('submit: ', submit);
        console.debug('next: ', next);
        console.debug('turn: ', turn);
        if (next === true) {
          return {
            choice: 0,
            submit: false,
            next: false,
            turn: turn = turn + 1
          }
        } else {
          return {
            choice,
            submit,
            next,
            turn
          }
        }
      }
    );
  }

  function intent(DOM) {
    return {
      choice$: DOM.select('.choice').events('click').map(ev => ev.target.classList[2]).map((x) => x.slice(-1)),
      submitClick$: DOM.select('#submit').events('click').map(ev => true),
      nextClick$: DOM.select('#next').events('click').map(ev => true)
      // turn$: DOM.select('#next').events('click').map(ev => +1)
    };
  }

  function main({DOM}) {
    return { DOM: view(model(intent(DOM))) }
  }

  let drivers = {
    DOM: makeDOMDriver('#app')
  };

  Cycle.run(main, drivers);
});
