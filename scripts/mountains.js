import * as data from "./data.js"; // imports all data arrays from data.js

const mountainOptions = document.getElementById("mountainOptions");
const backToTopBtn = document.getElementById("backToTop");
const navbarElem = document.getElementById("navbar");
const cardHolder = document.getElementById("card");

// finding method
function findByPropEquals(array, property, value) {
  return array.find((state) => state[property] === value);
}

// card generation
function generateCardHtml(mountain) {
  return `<div class="col-xl-4 col-md-12 mx-auto">
    <div class="card-group-vertical card text-center h-100">
      <div class="card">
        <img
          class="card-img-top"
          style=" object-fit: cover; max-height: 150px;"
          src="./media/images/${mountain.img}"
        />
      </div>
      <div class="card">
        <div class="card-body pt-4">
          <h5 class="card-title">${mountain.name}</h5>
        </div>
      </div>
      <div class = "card-group">
        <div class="card">
          <div class="card-body">
            <label class="card-title w-100" for="">Elevation</label>
            <label class="card-text small" name="street" readonly
              >${mountain.elevation}</label>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <label class="card-title w-100" for="">Difficulty</label>
            <label class="card-text small" name="street" readonly
              >${mountain.effort}</label>
          </div>
        </div>
      </div>
      <div class="card pt-2">
          <div class="card-body">
            <label class="card-text w-100 h-100" name="desc" readonly> ${mountain.desc}
            </label>
          </div>
      </div>
    </div>
  </div>`;
}
// select option population
function populateSelectOptions(options, selectElem) {
  options.sort().forEach((option) => {
    selectElem.appendChild(new Option(option.name, option.name));
  });
}
// logic for if the hero is in view or not
function heroObserverLogic(elems) {
  if (elems[0].isIntersecting === true) {
    backToTopBtn.classList.add("d-none");
    navbarElem.setAttribute("data-bs-theme", "dark");
    navbarElem.classList.remove("bg-body");
  } else {
    backToTopBtn.classList.remove("d-none");
    navbarElem.setAttribute("data-bs-theme", "light");
    navbarElem.classList.add("bg-body");
  }
}

window.onload = () => {
  // select elem event listeners
  mountainOptions.addEventListener("change", () => {
    const mountainName = mountainOptions.value;
    const card = findByPropEquals(data.mountainsArray, "name", mountainName);
    cardHolder.innerHTML = generateCardHtml(card);
    parkTypeOptions.value = ""; //clear the other select dropdown
  });

  const cards = generateCardHtml(data.mountainsArray[0]); //generate card
  cardHolder.innerHTML = cards; //render card

  // observer that watches if the hero is in view or not
  const heroObserver = new IntersectionObserver(heroObserverLogic, {
    threshold: [1],
  });
  heroObserver.observe(document.querySelector("#hero"));

  // populate select options
  populateSelectOptions(data.mountainsArray, mountainOptions);
};
