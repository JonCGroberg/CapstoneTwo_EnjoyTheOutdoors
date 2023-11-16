import * as data from "./data.js"; // imports all data arrays from data.js

const inputElems = {
  statesOptions: document.getElementById("parkStateOptions"),
  parkTypeOptions: document.getElementById("parkTypeOptions"),
};
const navElems = {
  backToTop: document.getElementById("backToTop"),
  navbar: document.getElementById("navbar"),
};
const outputElems = { cards: document.getElementById("cards") };

// filtering methods
const filterByPropEquals = (array, property, value) =>
  array.filter((state) => state[property] === value);
const filterByIncludes = (array, property, value) =>
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
  return array.map((park) => generateParkCard(park)).join("");
}

function populateSelectOptions(options, selectElem) {
  options.sort().forEach((option) => {
    selectElem.appendChild(new Option(option, option));
  });
}

window.onload = () => {
  // select elem event listeners
  inputElems.statesOptions.addEventListener("change", () => {
    const state = inputElems.statesOptions.value;
    const cards = filterByPropEquals(data.parksArray, "State", state);
    outputElems.cards.innerHTML = generateCardsHtml(cards);
    //clear the other select dropdown
    inputElems.parkTypeOptions.value = "";
  });
  inputElems.parkTypeOptions.addEventListener("change", () => {
    const type = inputElems.parkTypeOptions.value;
    const cards = filterByIncludes(data.parksArray, "LocationName", type);
    outputElems.cards.innerHTML = generateCardsHtml(cards);
    //clear the other select dropdown
    inputElems.statesOptions.value = "";
  });

  // generate and render cards
  const cards = generateCardsHtml(data.parksArray);
  outputElems.cards.innerHTML = cards;

  // scroll observer for back to top button
  const observer = new IntersectionObserver(scrolledDownLogic, {
    threshold: [1],
  });
  observer.observe(document.querySelector("#hero"));

  function scrolledDownLogic(elems) {
    if (elems[0].isIntersecting === true) {
      navElems.backToTop.classList.add("d-none");
      navElems.navbar.setAttribute("data-bs-theme", "dark");
      navElems.navbar.classList.remove("bg-body");
    } else {
      navElems.backToTop.classList.remove("d-none");
      navElems.navbar.setAttribute("data-bs-theme", "light");
      navElems.navbar.classList.add("bg-body");
    }
  }

  // populate select options
  populateSelectOptions(data.locationsArray, inputElems.statesOptions);
  populateSelectOptions(data.parkTypesArray, inputElems.parkTypeOptions);
};
