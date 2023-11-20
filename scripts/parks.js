import * as data from "./data_scripts/data.js"; // imports all data arrays from data.js
import {
  observerLogic,
  populateSelectOptions,
  filterByPropEquals,
  filterByIncludes,
} from "./helperFunctions.js";

const statesOptions = document.getElementById("parkStateOptions");
const parkTypeOptions = document.getElementById("parkTypeOptions");
const hero = document.getElementById("hero");
const cardHolder = document.getElementById("cards");
const numParksText = document.getElementById("numParksText");

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
        <div class="card">
          <div class="card-body ">
            <label class="card-text w-100 h-100" name="website" readonly>
              <a class="btn btn-light w-100 ${park.Visit? "" : "d-none"}" href="${maybeVisit}">Visit Site</a>
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

function updateNumParkText(num) {
  numParksText.innerHTML =
    num == 1 ? `Showing ${num} National Park` : `Showing ${num} National Parks`;
}

window.onload = () => {
  // select elem event listeners
  statesOptions.addEventListener("change", () => {
    const state = statesOptions.value;
    const cards = filterByPropEquals(data.parksArray, "State", state);
    cardHolder.innerHTML = generateCardsHtml(cards);
    //clear the other select dropdown
    parkTypeOptions.value = "";
  });
  parkTypeOptions.addEventListener("change", () => {
    const type = parkTypeOptions.value;
    const cards = filterByIncludes(data.parksArray, "LocationName", type);
    cardHolder.innerHTML = generateCardsHtml(cards);
    //clear the other select dropdown
    statesOptions.value = "";
  });

  // generate and render cards
  const cards = generateCardsHtml(data.parksArray);
  cardHolder.innerHTML = cards;

  // observer that watches if the an elem (hero) is in view or not
  const observer = new IntersectionObserver(observerLogic, {
    threshold: [1],
  });
  observer.observe(hero);

  // populate select options
  populateSelectOptions(data.locationsArray, statesOptions);
  populateSelectOptions(data.parkTypesArray, parkTypeOptions);
};
