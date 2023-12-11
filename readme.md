# National Park Finder

*This website is dedicated to helping outdoor enthusiasts find and explore action parks and mountains. It is built using modern web technologies such as JavaScript, Bootstrap, HTML, and CSS to provide a user-friendly and visually appealing experience. Deployed using Github Pages*

> Try it out https://joncgroberg.github.io/national-park-finder/


### Landing Page

The landing page serves as the entry point to the website, welcoming users with an engaging and visually appealing design. It provides a glimpse of the website's offerings and sets the tone for the outdoor adventure that awaits.

![Landing](./media/screenshots/index.gif)

### National Parks 

The National Parks page allows users to explore a comprehensive list of national parks across the country. Users can browse and sort through the parks to find their desired destinations. Each park entry provides detailed information, including its location and a captivating picture, helping users make informed decisions about their outdoor adventures.

![Parks](./media/screenshots/parks.gif)

### Mountains

The Mountains page is dedicated to providing information and resources for mountain climbers and hiking enthusiasts. Users can discover various mountains and their respective features. The page offers an immersive experience with stunning visuals, enticing users to embark on thrilling mountain expeditions.

![Mountains](./media/screenshots/mountains.gif)

## Utilities

``` javascript
function populateSelectOptions(options, selectElem) {
  options.sort().forEach((option) => {
    selectElem.appendChild(new Option(option, option));
  });
}

function filterByPropEquals(array, property, value) {
  return array.filter((state) => state[property] === value);
}
function filterByIncludes(array, property, value) {
  return array.filter((state) => state[property].includes(value));
}
function findByPropEquals(array, property, value) {
  return array.find((state) => state[property] === value);
}
```
> Utility Demonstration

```javascript
const cards = filterByIncludes(data.parksArray, "LocationName", type);
cardHolder.innerHTML = generateCardsHtml(cards);
```

## Technologies Used

- HTML, CSS, JavaScript for front-end development

 ## Installation
 
 To locally run and test the website, follow these steps:
 1. Clone the repository:  `git clone https://github.com/JonCGroberg/CapstoneTwo_EnjoyTheOutdoors.git`
 2. Navigate to the project directory: cd your-repository
 3. Open the website in a web browser by double-clicking the index.html file or using a local development server.

