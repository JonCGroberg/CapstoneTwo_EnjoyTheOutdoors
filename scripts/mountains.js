import * as data from "./data_scripts/data.js"; // imports all data arrays from data.js
import {
  scrolledThemeChange,
  populateSelectOptions,
  findByPropEquals,
} from "./helperFunctions.js";

const mountainOptions = document.getElementById("mountainOptions");
const cardHolder = document.getElementById("card");
const hero = document.getElementById("hero");
const mountainsArray = data.mountainsArray.map((mountain) => mountain.name);

// card generation
function generateMountainCardHtml(mountain) {
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
      <div class="card-group">
        <div class="card">
          <div class="card-body">
            <label class="card-title w-100" for="">Elevation</label>
            <label class="card-text small" name="street" readonly
              >${mountain.elevation}</label
            >
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <label class="card-title w-100" for="">Difficulty</label>
            <label class="card-text small" name="street" readonly
              >${mountain.effort}</label
            >
          </div>
        </div>
      </div>
      <div class="card pt-2 pb-4">
        <div class="card-body">
          <label class="card-text w-100 h-100" name="desc" readonly>
            ${mountain.desc}
          </label>
        </div>
      </div>
    </div>
  </div>`;
}

window.onload = () => {
  scrolledThemeChange(false); // change theme on scroll

  // select elem event listeners
  mountainOptions.addEventListener("change", () => {
    const mountainName = mountainOptions.value;
    const card = findByPropEquals(data.mountainsArray, "name", mountainName);
    cardHolder.innerHTML = generateMountainCardHtml(card);
  });

  const cards = generateMountainCardHtml(data.mountainsArray[0]); //generate card
  cardHolder.innerHTML = cards; //render card

  // populate select options
  populateSelectOptions(mountainsArray, mountainOptions);
};
