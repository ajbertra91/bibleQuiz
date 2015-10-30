'use strict';
import Cycle from '@cycle/core';
import {makeDOMDriver, h} from '@cycle/dom';
import {log} from './helpers'
import {game} from './game'

document.addEventListener("DOMContentLoaded", function() {

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
  function renderChoices(choices, choice) {
    console.debug('choice: ', choice);
    console.debug('choices: ', choices);
    let choiceElements;
    if (choice.choice.length > 0 && choice.submit === false) {
      choiceElements = h('div', [
        h('ul.list-group',[
          h(choice.choice === 'one' ? 'li.list-group-item.choice.one.is-selected' : 'li.list-group-item.choice.one', choices[0]),
          h(choice.choice === 'two' ? 'li.list-group-item.choice.two.is-selected' : 'li.list-group-item.choice.two', choices[1]),
          h(choice.choice === 'three' ? 'li.list-group-item.choice.three.is-selected' : 'li.list-group-item.choice.three', choices[2]),
          h(choice.choice === 'four' ? 'li.list-group-item.choice.four.is-selected' : 'li.list-group-item.choice.four', choices[3])
        ]),
        h('div#submit.btn.btn-primary.pull-left', 'Sumbit')
      ]);
    } else if (choice.choice.length > 0 && choice.submit === true) {
      choiceElements = h('div', [
        h('ul.list-group',[
          h(choice.choice === 'one' ? 'li.list-group-item.choice.one.is-selected' : 'li.list-group-item.choice.one', choices[0]),
          h(choice.choice === 'two' ? 'li.list-group-item.choice.two.is-selected' : 'li.list-group-item.choice.two', choices[1]),
          h(choice.choice === 'three' ? 'li.list-group-item.choice.three.is-selected' : 'li.list-group-item.choice.three', choices[2]),
          h(choice.choice === 'four' ? 'li.list-group-item.choice.four.is-selected' : 'li.list-group-item.choice.four', choices[3])
        ]),
        h('div#next.btn.btn-primary.pull-right', 'Next')
      ]);
    } else {
      choiceElements = h('div', [
        h('ul.list-group',[
          h(choice.choice === 'one' ? 'li.list-group-item.choice.one.is-selected' : 'li.list-group-item.choice.one', choices[0]),
          h(choice.choice === 'two' ? 'li.list-group-item.choice.two.is-selected' : 'li.list-group-item.choice.two', choices[1]),
          h(choice.choice === 'three' ? 'li.list-group-item.choice.three.is-selected' : 'li.list-group-item.choice.three', choices[2]),
          h(choice.choice === 'four' ? 'li.list-group-item.choice.four.is-selected' : 'li.list-group-item.choice.four', choices[3])
        ])
      ]);
    }
    return choiceElements;
  }

  function renderAnswer(qObj, choice) {
    if (choice.submit === true) {
      let choiceNum = 0;
      if (choice.choice === 'one') choiceNum = 0;
      if (choice.choice === 'two') choiceNum = 1;
      if (choice.choice === 'three') choiceNum = 2;
      if (choice.choice === 'four') choiceNum = 3;
      if (qObj.answer === choiceNum) {
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
    return state$.map((choice) => 
      h('div.quiz-container.jumbotron', [
        h('div.question-container.container',[
          h('h2.text', qObj[choice.turn].question),
          h('div.score-container.container', [
            h('h3.completed-questions.page-header', [
              h('span.completed.pull-left.', `${choice.turn+1}`),
              h('span.total.pull-left', '/'+`${total}`),
              h('span.percent-corrent.pull-right', '0%')
            ]),
          ])
        ]),
        h('div.choices-container.container', [
          renderChoices(qObj[choice.turn].choices, choice)
        ]),
        h('div.answer-container.container', [
          renderAnswer(qObj[choice.turn], choice)
        ])
      ])
    )
  }

  function model(actions) {
    let turn = 0;
    return Cycle.Rx.Observable.combineLatest(
      actions.choice$.startWith(''),
      actions.submitClick$.startWith(false),
      actions.nextClick$.startWith(false),
      // actions.turn$.startWith(0).scan((a, b) => a + b).map(log),
      (choice, submit, next) => ({ choice: ((next === true) ? '' : choice),
                                   submit: ((next === true) ? false : submit),
                                   next,
                                   turn: ((next === true) ? (turn = turn + 1) : turn) })
    );
  }

  function intent(DOM) {
    console.debug('DOM: ', DOM);
    return {
      choice$: DOM.select('.choice').events('click').map(ev => ev.target.classList[2]),
      submitClick$: DOM.select('#submit').events('click').map(ev => true),
      nextClick$: DOM.select('#next').events('click').map(ev => true)
      // turn$: DOM.select('#submit').events('click').map(ev => +1)
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
