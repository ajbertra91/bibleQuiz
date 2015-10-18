'use strict';
import Cycle from 'cycleCore';
import {makeDOMDriver, h} from 'cycleDom';

function main(drivers) {
  return {
    DOM: drivers.DOM.select('input').events('click')
      .map(ev => ev.target.checked)
      .startWith(false)
      .map(toggled =>
        h('div', [
          h('input', {type: 'checkbox'}), 'Toggle me',
          h('p', toggled ? 'ON' : 'off')
        ])
      )
  };
}

let drivers = {
  DOM: makeDOMDriver('#app')
};

Cycle.run(main, drivers);