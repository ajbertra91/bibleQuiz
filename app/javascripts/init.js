'use strict';
import Cycle from '@cycle/core';
import Rx from 'rx';
import {makeDOMDriver, h} from '@cycle/dom';
import {log} from './helpers'
import {game} from './game'

document.addEventListener("DOMContentLoaded", function() {

  // console.debug('Cycle: ', Cycle);
  // console.debug('Rx: ', Rx);

  // QUIZ
  function renderChoices(choices, choice, submit) {
    // console.log('in render fn - choice: ', choice);
    // console.log('in render fn - choices: ', choices);
    // console.log('in render fn - submit: ', submit);
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
      // h('div#submit.btn.btn-primary.pull-left', 'Sumbit'),
      // h('div#next.btn.btn-primary.pull-right', 'Next')
      choice > 0 ? h('div#submit.btn.btn-primary.pull-left', 'Sumbit') : '',
      choice > 0 && submit > 0 ? h('div#next.btn.btn-primary.pull-right', 'Next') : ''
    ]);
      
  }

  function renderAnswer(q, choice, submit) {
    if (submit > 0) {
      if (q.answer === (choice - 1)) {
        return h('h3.verse-container.page-header', [
          h('span.glyphicon.glyphicon-ok.pull-right', ''),
          h('a.ref-link', {href: q.link, target: '_blank'}, [ q.reference ])
        ])
      } else {
        return h('h3.verse-container.page-header', [
          h('span.glyphicon.glyphicon-remove.pull-right', ''),
          h('a.ref-link', {href: q.link, target: '_blank'}, [ q.reference ])
        ])
      }
    } else {
      return;
    }
  }

  function view(state$) {
    let total = game.questions.length;
    return state$.map(({choice, submit, next, q}) => 
      h('div.quiz-container.jumbotron', [
        h('div.question-container.container',[
          h('h2.text', q.question),
          h('div.score-container.container', [
            h('h3.completed-questions.page-header', [
              h('span.completed.pull-left.', `${next+1}`),
              h('span.total.pull-left', '/'+`${total}`),
              h('span.percent-corrent.pull-right', '0%')
            ]),
          ])
        ]),
        h('div.choices-container.container', [
          renderChoices(q.choices, choice, submit)
        ]),
        h('div.answer-container.container', [
          renderAnswer(q, choice, submit)
        ])
      ])
    )
  }

  // function model(actions) {
  //   let turn = 0;
  //   return actions.nextClick$.startWith(0).withLatestFrom(
  //     actions.choice$.startWith(0),
  //     actions.submitClick$.startWith(0),
  //     (choice, submit, next) => {
  //       console.debug('choice: ', choice);
  //       console.debug('submit: ', submit);
  //       console.debug('next: ', next);
  //       return {
  //         choice,
  //         submit,
  //         next,
  //         turn
  //       }
  //     }
  //   );
  // }

  function model(actions) {
    const question$ = Rx.Observable
                        .fromArray(game.questions)
                        .zip(actions.nextClick$.startWith(1), (a, b) => a);

    return Rx.Observable.combineLatest(
      actions.choice$.startWith(0),
      actions.submitClick$.startWith(0),
      actions.nextClick$.startWith(0),
      question$,
      // this object should control the display of the VIEW elements... but it only works the first question
      // because the combineLatest operator is using the last emitted values from submit$ and next$ ... 
      (choice, submit, next, q) => {
        console.debug('choice: ', choice);
        console.debug('submit: ', submit);
        console.debug('next: ', next);
        console.debug('q: ', q);
        return {
          choice,
          submit,
          next,
          q
        }
      }
    );
  }

  // function model(actions) {
  //   let turn = 0;
  //   return Rx.Observable.combineLatest(
  //     actions.choice$.startWith(0),
  //     actions.submitClick$.startWith(0),
  //     actions.nextClick$.startWith(0),
  //     // this object should control the display of the VIEW elements... but it only works the first question
  //     // because the combineLatest operator is using the last emitted values from submit$ and next$ ... 
  //     (choice, submit, next) => {
  //       console.debug('choice: ', choice);
  //       console.debug('submit: ', submit);
  //       console.debug('next: ', next);
  //       console.debug('turn: ', turn);
  //       if (next > 0) {
  //         return {
  //           choice: 0,
  //           submit: 0,
  //           next: 0,
  //           turn: turn = turn + 1
  //         }
  //       } else {
  //         return {
  //           choice,
  //           submit,
  //           next,
  //           turn
  //         }
  //       }
  //     }
  //   );
  // }

  function intent(DOM) {
    return {
      choice$: DOM.select('.choice').events('click').map(ev => ev.target.classList[2]).map((x) => x.slice(-1)),
      submitClick$: DOM.select('#submit').events('click').map(ev => ev.detail),
      nextClick$: DOM.select('#next').events('click').map(ev => +1).scan((a,b) => a+b)
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
