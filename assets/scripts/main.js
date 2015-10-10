'use strict'

let msg = 'Adam'

document.write('Hello ' + msg)

let animals = [
  {name: 'Fluffykins', species: 'dog'}
  ,{name: 'Bubbles', species: 'fish'}
  ,{name: 'Crabby Patty', species: 'crab'}
  ,{name: 'Bruno', species: 'dog'}
  ,{name: 'Kibbles', species: 'cat'}
]

let dogs = animals.filter((x) => x.species === 'dog')

console.log('dogs: ', dogs)