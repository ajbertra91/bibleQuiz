'use strict';
import Cycle from '@cycle/core';
import Rx from 'rx';
import {makeDOMDriver, h} from '@cycle/dom';
import {log} from './helpers'
import {game} from './game'

document.addEventListener("DOMContentLoaded", function() {

  console.debug('Cycle: ', Cycle);
  console.debug('Rx: ', Rx);

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

  function model(actions) {
    let turn = 0;
    return Rx.Observable.combineLatest(
      actions.choice$.startWith(0),
      actions.submitClick$.startWith(false),
      actions.nextClick$.startWith(false),
      // this object should control the display of the VIEW elements... but it only works the first question
      // because the combineLatest operator is using the last emitted values from submit$ and next$ ... 
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
