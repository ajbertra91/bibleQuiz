'use strict';
import Cycle from '@cycle/core';
import {makeDOMDriver, h} from '@cycle/dom';
import {log} from './helpers'
import {game} from './game'

document.addEventListener("DOMContentLoaded", function() {

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
  //       newValue: actions.changeVaule$
  //     }
  //   }
  // }

  // let domDriver = CycleDOM.makeDOMDriver('#app', {
  //   'labeled-slider': labelSlider 
  // })

  //BIBLE QUIZ
  function renderChoices(choices, choice) {
    console.debug('choice: ', choice);
    console.debug('choices: ', choices);
    return h('ul',[
      h(choice.choice === 'one' ? 'li.choice.one.is-selected' : 'li.choice.one', choices[0]),
      h(choice.choice === 'two' ? 'li.choice.two.is-selected' : 'li.choice.two', choices[1]),
      h(choice.choice === 'three' ? 'li.choice.three.is-selected' : 'li.choice.three', choices[2]),
      h(choice.choice === 'four' ? 'li.choice.four.is-selected' : 'li.choice.four', choices[3])
    ]);
  }

  function view(state$) {
    let turn = 0;
    let qObj = game.questions;
    let total = game.questions.length;
    return state$.map((choice, turn) => 
      h('div.quiz-container', [
        h('pre', JSON.stringify(turn)),
        h('div.question-container',[
          h('div.text', qObj[turn].question),
          h('div.score-container', [
            h('div.completed-questions', [
              h('span.completed', (turn+1).toString()),
              h('span.total', '/'+total.toString())
            ]),
            h('div.percent-corrent', '0%')
          ])
        ]),
        h('div.choices-container', [
          renderChoices(qObj[turn].choices, choice)
        ]),
        h('div#submit.button', 'Submit'),
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
      actions.choice$.startWith(''),
      actions.submitClick$.startWith(false),
      (choice, submit) => ({ choice, submit })
    );
  }

  function intent(DOM) {
    console.debug('DOM: ', DOM);
    return {
      choice$: DOM.select('.choice').events('click').map(ev => ev.target.classList[1]),
      submitClick$: DOM.select('#submit').events('click').map(ev => true)
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
