import {
  observerLogic,
} from "./helperFunctions.js";

const hero = document.getElementById("hero");

window.onload = () => {
  // observer that watches if the an elem (hero) is in view or not
  const observer = new IntersectionObserver(observerLogic, {
    threshold: [1],
  });
  observer.observe(hero);
};
