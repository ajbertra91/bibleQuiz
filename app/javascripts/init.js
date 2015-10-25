'use strict';
import Cycle from 'cycleCore';
import CycleDOM from 'cycleDom';


document.addEventListener("DOMContentLoaded", function(event) { 
  let app = document.getElementById(app);

  app.innerHTML('Hello World');
  function main() {

  }

  let drivers = {
    DOM: CycleDOM.makeDOMDriver('#app')
  }

  Cycle.run(main, drivers);
});
