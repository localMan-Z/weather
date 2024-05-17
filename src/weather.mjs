import { htmlElements } from "./src/html.js";
import { colors } from "./src/color.js";
window.addEventListener("DOMContentLoaded", () => {
  const element = htmlElements();
  const color = colors();
  let parentImagePool = [
    "africa",
    "america",
    "china",
    "city",
    "clearNight",
    "desert",
    "europe",
    "freezing",
    "greenland",
    "highland",
    "india",
    "Japan",
    "london",
    "ocean",
    "Paris",
    "rioDeJaneiro",
    "rural",
    "seaFogMist",
    "southAmerica",
    "sunset",
  ];
  let childImagePool = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const parselocationsButton = form.querySelector("button");
  const phaseOneTimeline = gsap.timeline();
  let alternatePhaseOneTimeline = false;
  const phaseTwoTimeline = gsap.timeline();
  const phaseThreeTimeline = gsap.timeline();

  let stateOfButton = false;
  let lA, lB, temperaturePassed;

  // Event Listeners

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

  //GSAP UI Functions
  function phaseOne() {
    alternatePhaseOneTimeline = false;
    if (weatherBox.offsetHeight == 680) {
      phaseOneTimeline.to(weatherDisplay, {
        duration: 0.5,
        height: "0px",
        ease: "linear",
      });
    }
    phaseOneTimeline
      .to(parselocationsButton, { duration: 0.45, rotate: 360 })
      .to(weatherBox, { duration: 0.45, height: 166 }, "<")
      .to(weatherContent, { duration: 0.45, height: "94%" }, "<")
      .to(after, {
        duration: 0.45,
        height: "70.2px",
        ease: "linear",
        onComplete: () => {
          generateLocation();
        },
      });
  }

  function phaseTwo() {
    let height0;
    if (alternatePhaseOneTimeline) {
      height0 = "580px";
      if (after.hasChildNodes()) {
        after.textContent = "";
        phaseTwoTimeline.to(after, { duration: 0.45, height: 0 });
      }
    } else {
      height0 = "680px";
    }
    phaseTwoTimeline
      .to(weatherBox, {
        duration: 0.45,
        height: height0,
        ease: "linear",
      })
      .to(weatherContent, { duration: 0.45, height: "96%" }, "<")
      .to(
        weatherDisplay,
        {
          duration: 0.75,
          height: "490px",
          onComplete: () => {
            phaseThree();
          },
        },
        "<0.15"
      );
  }

  function phaseThree() {
    phaseThreeTimeline
      .to(
        [
          general,
          displayedLocation,
          Input,
          otherConditions,
          otherConditions.querySelectorAll("div"),
          futureForecast,
        ],
        {
          duration: 0.2,
          height: "100%",
          width: "100%",
        }
      )
      .to(inputOne, { duration: 0.5, fontSize: "2em" }, "<")
      .to(
        [
          inputTwo,
          futureForecast.querySelectorAll(
            ".day .time,.secondClass  ,.dayValues"
          ),
          otherConditions.querySelectorAll("div .condition, .numberValue"),
        ],
        { duration: 0.5, fontSize: "0.85em" },
        "<"
      )
      .to(
        temperature,
        {
          duration: 0.5,
          height: "100%",
          width: "100%",
          fontSize: "1.5em",
        },
        "<"
      )
      .to(
        [
          weatherImage,
          futureForecast.querySelectorAll("*"),
          otherConditions.querySelectorAll("div .image"),
        ],
        { duration: 0.4, height: "100%", width: "100%" },
        "<"
      )
      .to(
        otherConditions.querySelectorAll("div .image img"),
        {
          duration: 0.4,
          width: "30px",
          height: "30px",
          onComplete: () => {
            const { backgroundColor, colorGradient, a } =
              assignColor(temperaturePassed);
            phaseThreeTimeline.to(weatherBox, {
              duration: 0.5,
              background: `linear-gradient(to bottom, ${colorGradient[0]} , ${colorGradient[1]} , ${colorGradient[2]} )`,
              ease: "linear",
            });
          },
        },
        "<"
      );
  }
  //Top Level Functions
  function generateLocation() {
    if (after.hasChildNodes()) {
      after.innerHTML = "";
    }
    let randomCityGenerated = true;
    let latitude = parseInt(
      Math.random() + (Math.random() * -90 + Math.random() * 90)
    );
    let constant, longitude;
    String(latitude).includes("-") ? (constant = -180) : (constant = 180);
    longitude = parseInt(Math.random() * constant);
    lA = latitude;
    lB = longitude;
    async function getWeatherFromApi() {
      const API_key = "a8692d5f5ce6627de14a0bf1f065f405";
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${API_key}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const {
          timezone,
          current: {
            dt: dayTime,
            temp,
            weather: [{ description }],
          },
        } = data;
        const parsedData = parseCoordinates(
          timezone,
          dayTime,
          temp,
          description
        );
        return parsedData;
      } catch (error) {
        console.error(error);
      }
    }
    async function getLocationFromApi() {
      const apiKey = "AIzaSyBLNnudWR7dDY8Q2EWdLh0pBs6TGDyd6fw";
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const {
          results: [
            { formatted_address: address0 },
            { formatted_address: addressB },
            { formatted_address: addressC },
            { formatted_address: addressD },
            { formatted_address: addressE },
            { formatted_address: addressF },
            { formatted_address: addressG },
          ],
        } = data;
        const secondParsedData = parselocations(
          addressB,
          addressC,
          addressD,
          addressE,
          addressF,
          addressG
        );
        return secondParsedData;
      } catch (error) {
        console.error(error);
      }
    }
    Promise.all([getWeatherFromApi(), getLocationFromApi()]).then((values) => {
      search(values, randomCityGenerated, lA, lB);
    });
  }

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

  //location Functions
  function parselocations(
    locationB,
    locationC,
    locationD,
    locationE,
    locationF,
    locationG
  ) {
    const Blocation = locationB.split(",");
    const Clocation = locationC.split(",");
    const Dlocation = locationD.split(",");
    const Elocation = locationE.split(",");
    const Flocation = locationF.split(",");
    const Glocation = locationG.split(",");
    return [Blocation, Clocation, Dlocation, Elocation, Flocation, Glocation];
  }

  function parseCoordinates(GMTZone, DayTime, Temperature, Description) {
    let locationA = GMTZone.split("/")[1];
    let time = DayTime;
    let currentTemperature = Temperature;
    let description = Description;

    return {
      locationA,
      time,
      currentTemperature,
      description,
    };
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

  //future Forecast Functions

  async function passValues(a, b) {
    generateFutureForecast(a, b);
  }

  async function queryWeatherFromSearch(l1, l2) {
    generateFutureForecast(l1, l2);
  }

  //Color & backGroundImage Functions

  function assignBackgroundImage() {}
  //Secondary functions
  async function checkObject(element) {
    return typeof element;
  }
});
