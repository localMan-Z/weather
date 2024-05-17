import { htmlElements } from "./html.js";
import { colors } from "./color.js";
window.addEventListener("DOMContentLoaded", () => {
  const element = htmlElements();
  const color = colors();
  const { parselocationsButton } = element;

  parselocationsButton.addEventListener("click", phaseOne);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      let cityPlaced = searchedValue.value;
      alternatePhaseOneTimeline = true;
      search(cityPlaced);
    }
  });

  async function search(value, random, nOne, nTwo) {
    if (alternatePhaseOneTimeline) {
      phaseTwo();
    }
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    let childFromLocationObject = false;
    let city;
    let localZones;
    if (random) {
      const [locationObject, locationArray] = value;
      const { locationA, time, currentTemperature, description } =
        locationObject;
      city = locationA;
      if (locationArray) {
        const possibleLocations = [];
        createLocations(locationArray, possibleLocations);
      } else {
        createButton(locationA);
        childFromLocationObject = !childFromLocationObject;
      }
    } else {
      city = value;
      updatelocation(city);
    }
    if (childFromLocationObject) {
      const [button] = [...Array.from(after.children)];
      button.addEventListener("click", () => {
        let buttonId = button.id;
        updatelocation(buttonId);
        passValues(nOne, nTwo);
        phaseTwo();
      });
    } else {
      localZones = [...Array.from(after.children)];
      localZones.forEach((zone) => {
        zone.addEventListener("click", () => {
          updatelocation(zone.id);
          phaseTwo();
        });
      });
    }
    function updatelocation(city) {
      const apiKey = "3ac0b96aaf484766a22172235240503";
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const {
            location: {
              localtime: time,
              lat: searchLatitude,
              lon: searchLongitude,
            },
            location: { name: cityName },
            current: { temp_c: temperature },
            current: {
              condition: { text: currentCondition, icon: iconLink },
              wind_mph: windSpeed,
              pressure_mb: seaPressure,
              humidity: currentHumidity,
            },
          } = data;
          const [, hour, minute] = time.match(/(\s+\d+):(\d+)/);
          updateDisplay(
            cityName,
            temperature,
            currentCondition,
            iconLink,
            hour,
            minute,
            windSpeed,
            seaPressure,
            currentHumidity
          );
          queryWeatherFromSearch(searchLatitude, searchLongitude);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }

  function updateDisplay(
    cityName,
    temperaturDe,
    currentCondition,
    iconLink,
    hour,
    minute,
    windSpeed,
    seaPressure,
    currentHumidity
  ) {
    temperature.textContent = `${temperaturDe}\u00B0`;
    inputOne.textContent = `${cityName}`;
    inputTwo.textContent = `${currentCondition}`;
    imageElement.src = `${iconLink}`;
    windValue.textContent = `${windSpeed}`;
    humidityValue.textContent = `${currentHumidity}`;
    pressureValue.textContent = `${seaPressure}`;
    temperaturePassed = temperaturDe;
  }

  function createLocations(locationArray, possibleLocations) {
    for (const location in locationArray) {
      locationArray[location].map((area) => {
        area = area.trim();
        if (/^[a-zA-Z]+$/.test(area) && !area.includes(`Unnamed Road`)) {
          if (!possibleLocations.includes(area)) {
            possibleLocations.push(area);
          }
        }
      });
    }
    possibleLocations.forEach((area) => createButton(area));
  }

  function createButton(area) {
    const button = document.createElement("button");
    button.textContent = area;
    button.setAttribute("id", `${area}`);
    button.setAttribute("class", "boxButton");
    after.appendChild(button);
  }

  async function passValues(a, b) {
    generateFutureForecast(a, b);
  }

  async function queryWeatherFromSearch(l1, l2) {
    generateFutureForecast(l1, l2);
  }
});
