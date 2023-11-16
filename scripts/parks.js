import * as data from "./data.js"; // imports all data arrays from data.js

const inputElems = {
  statesOptions: document.getElementById("parkStateOptions"),
  parkTypeOptions: document.getElementById("parkTypeOptions"),
};
const outputElems = { cards: document.getElementById("cards") };

// filtering methods
const filterByPropEquals = (array, property, value) =>
  array.filter((state) => state[property] === value);
const filterByPropIncludes = (array, property, value) =>
  array.filter((state) => state[property].includes(value));

// card generation
function generateParkCard(park) {
  //   const maybePhone = park.Phone
  //     ? `<label class="card-text small" name="phone" readonly>${park.Phone}</label>`
  //     : "";

  //   function generateCard(title, titleValue, description, descriptionValue) {
  //     const maybeTitle =
  //       title !== ""
  //         ? `label class="card-title w-100" for="${title.toLowerCase()}">${titleValue}</label>`
  //         : "";
  //     const maybeDescription =
  //       description !== ""
  //         ? `<label class="card-text small" name="${title.toLowerCase()}" readonly>${descriptionValue}</label>`
  //         : "";
  //     let card = `<div class="card">
  //                         <div class="card-body">
  //                         ${maybeTitle}
  //                         ${maybeDescription}
  //                         </div>
  //                 </div>
  //                 `;
  //   }
  const maybeVisit = park.Visit ? park.Visit : "N/A";
  return `<div id="${park.LocationID.toLowerCase()}" class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
    <div class="card-group-vertical text-center">
      <div class="card">
        <img
          class="card-img-top"
          style="height: 100px; object-fit: cover;"
          src="./media/images/${
            data.mountainsArray[(park.LocationName.length / 2).toFixed()].img
          }"
        />
      </div>
      <div class="card">
        <div class="card-body pb-0">
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
              >${park.Phone == 0 ? "N/A" : park.Phone}</label
            >
          </div>
        </div>
        <div class="card ">
          <div class="card-body ">
            <label class="card-title w-100" for="fax">Fax</label>
            <label class="card-text small" name="fax" readonly
              >${park.Fax == 0 ? "N/A" : park.Fax}</label
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

// const cards = filterByPropEquals(data.nationalParksArray, "State", "Utah").map(
//   (park) => generateParkCard(park)
// );
const cards = data.nationalParksArray.map((park) => generateParkCard(park));
outputElems.cards.innerHTML = cards.join("");
// console.log(filterByPropEquals(data.nationalParksArray, "State", "Utah"));
// console.log(
//   filterByPropIncludes(data.nationalParksArray, "LocationName", "National Park")
// );

function populateSelectOptions(array, selectElem) {
  const options = array
    .sort()
    .map((item) => `<option value="${item}">${item}</option>`)
    .join("");
  selectElem.innerHTML += options;
}
populateSelectOptions(data.locationsArray, inputElems.statesOptions);
populateSelectOptions(data.parkTypesArray, inputElems.parkTypeOptions);

// event listeners
inputElems.statesOptions.addEventListener("change", (e) => {
  const cards = filterByPropEquals(
    data.nationalParksArray,
    "State",
    e.target.value
  ).map((park) => generateParkCard(park));
  outputElems.cards.innerHTML = cards.join("");
});
inputElems.parkTypeOptions.addEventListener("change", (e) => {
  const cards = filterByPropIncludes(
    data.nationalParksArray,
    "LocationName",
    e.target.value
  ).map((park) => generateParkCard(park));
  outputElems.cards.innerHTML = cards.join("");
});
