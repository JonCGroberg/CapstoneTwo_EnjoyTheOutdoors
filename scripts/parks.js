import * as data from "./data";

const inputElems = {}
const outputElems = {}

function filterByPropEquals(array, property, value) {
  return array.filter((state) => state[property] === value);
}
function filterByPropIncludes(array, property, value) {
  return array.filter((state) => state[property].includes(value));
}

console.log(filterByPropEquals(data.nationalParksArray, "State", "Utah"));
console.log(
  filterByPropIncludes(data.nationalParksArray, "LocationName", "National Park")
);
