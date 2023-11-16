import * as data from "./data.js"; // imports all data arrays from data.js

const inputElems = {
  statesOptions: document.getElementById("parkStateOptions"),
  parkTypeOptions: document.getElementById("parkTypeOptions"),
};
const navElems = {
  backToTopBtn: document.getElementById("backToTop"),
  navbarElem: document.getElementById("navbar"),
};
const outputElems = {
  cardHolder: document.getElementById("cards"),
  numParksText: document.getElementById("numParksText"),
};

// filtering methods
function filterByPropEquals(array, property, value) {
  return array.filter((state) => state[property] === value);
}
function filterByIncludes(array, property, value) {
  return array.filter((state) => state[property].includes(value));
}
// card generation
function generateParkCard(park) {
  const maybeVisit = park.Visit ? park.Visit : "N/A";
  const maybePhone = park.Phone ? park.Phone : "N/A";
  const maybeFax = park.Fax ? park.Fax : "N/A";
  const img = data.mountainsArray[(park.LocationName.length / 2).toFixed()].img;
  return `<div id="${park.LocationID.toLowerCase()}" class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
    <div class="card-group-vertical card text-center h-100">
      <div class="card">
        <img
          class="card-img-top"
          style="height: 100px; object-fit: cover;"
          src="./media/images/${img}"
        />
      </div>
      <div class="card">
        <div class="card-body pt-4 pb-0">
          <h5 class="card-title">${park.LocationName}</h5>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <label class="card-title w-100" for=""></label>
          <label class="card-text small" name="street" readonly
            >${park.Address}</label
          >
          <label class="card-text small" name="cityStateZip" readonly
            >${park.City}, ${park.State} ${park.ZipCode}</label
          >
        </div>
      </div>
      <div class="card-group">
        <div class="card">
          <div class="card-body ">
            <label class="card-title w-100" for="phone">Phone</label>
            <label class="card-text small" name="phone" readonly
              >${maybePhone}</label
            >
          </div>
        </div>
        <div class="card ">
          <div class="card-body ">
            <label class="card-title w-100" for="fax">Fax</label>
            <label class="card-text small" name="fax" readonly
              >${maybeFax}</label
            >
          </div>
        </div>
        </div>
        <div class="card ">
          <div class="card-body">
            <label class="card-text w-100 h-100" name="website" readonly>
              <a class="btn btn-light w-100" href="${maybeVisit}">Learn More</a>
            </label>
          </div>
      </div>
    </div>
  </div>`;
}
function generateCardsHtml(array) {
  updateNumParkText(array.length);
  return array.map((park) => generateParkCard(park)).join("");
}
// select option population
function populateSelectOptions(options, selectElem) {
  options.sort().forEach((option) => {
    selectElem.appendChild(new Option(option, option));
  });
}
// logic for if the hero is in view or not
function heroObserverLogic(elems) {
  if (elems[0].isIntersecting === true) {
    navElems.backToTopBtn.classList.add("d-none");
    navElems.navbarElem.setAttribute("data-bs-theme", "dark");
    navElems.navbarElem.classList.remove("bg-body");
  } else {
    navElems.backToTopBtn.classList.remove("d-none");
    navElems.navbarElem.setAttribute("data-bs-theme", "light");
    navElems.navbarElem.classList.add("bg-body");
  }
}

function updateNumParkText(num) {
  outputElems.numParksText.innerHTML =
    num == 1 ? `Showing ${num} National Park` : `Showing ${num} National Parks`;
}

window.onload = () => {
  // select elem event listeners
  inputElems.statesOptions.addEventListener("change", () => {
    const state = inputElems.statesOptions.value;
    const cards = filterByPropEquals(data.parksArray, "State", state);
    outputElems.cardHolder.innerHTML = generateCardsHtml(cards);
    //clear the other select dropdown
    inputElems.parkTypeOptions.value = "";
  });
  inputElems.parkTypeOptions.addEventListener("change", () => {
    const type = inputElems.parkTypeOptions.value;
    const cards = filterByIncludes(data.parksArray, "LocationName", type);
    outputElems.cardHolder.innerHTML = generateCardsHtml(cards);
    //clear the other select dropdown
    inputElems.statesOptions.value = "";
  });

  // generate and render cards
  const cards = generateCardsHtml(data.parksArray);
  outputElems.cardHolder.innerHTML = cards;

  // observer that watches if the hero is in view or not
  const heroObserver = new IntersectionObserver(heroObserverLogic, {
    threshold: [1],
  });
  heroObserver.observe(document.querySelector("#hero"));

  // populate select options
  populateSelectOptions(data.locationsArray, inputElems.statesOptions);
  populateSelectOptions(data.parkTypesArray, inputElems.parkTypeOptions);
};
