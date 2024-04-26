window.addEventListener("DOMContentLoaded", () => {
  let weatherBox = document.querySelector("#weatherBox");
  let weatherContent = document.querySelector("#weatherContent");
  const [form, after, weatherDisplay] = [
    ...Array.from(weatherBox.querySelector("#weatherContent").children),
  ];
  const searchedValue = form.querySelector("input");
  const [general, otherConditions, futureForecast] = [
    ...Array.from(weatherDisplay.children),
  ];
  const [displayedLocation, weatherImage] = [...Array.from(general.children)];
  const [Input, temperature] = [...Array.from(displayedLocation.children)];
  const [inputOne, inputTwo] = [...Array.from(Input.children)];
  const imageElement = weatherImage.querySelector("img");
  const [Wind, Humidity, Pressure] = [...Array.from(otherConditions.children)];
  const [, windImage, windValue] = [...Array.from(Wind.children)];
  const [, humidityImage, humidityValue] = [...Array.from(Humidity.children)];
  const [, pressureImage, pressureValue] = [...Array.from(Pressure.children)];
  const [tomorrow, AfterTomorrow, Next] = [
    ...Array.from(futureForecast.children),
  ];
  const [, tomorrowAppearance, tomorrowValues] = [
    ...Array.from(tomorrow.children),
  ];
  const [tomorrowAppearanceImage, tomorrowAppearanceDescription] = [
    ...Array.from(tomorrowAppearance.children),
  ];
  const [tomorrowValuesMain, tomorrowValuesSecondary] = [
    ...Array.from(tomorrowValues.children),
  ];
  const [, AfterTomorrowAppearance, AfterTomorrowValues] = [
    ...Array.from(AfterTomorrow.children),
  ];
  const [AfterTomorrowAppearanceImage, AfterTomorrowAppearanceDescription] = [
    ...Array.from(AfterTomorrowAppearance.children),
  ];
  const [AfterTomorrowValuesMain, AfterTomorrowValuesSecondary] = [
    ...Array.from(AfterTomorrowValues.children),
  ];

  const [, nextAppearance, nextValues] = [...Array.from(Next.children)];
  const [nextAppearanceImage, nextAppearanceDescription] = [
    ...Array.from(nextAppearance.children),
  ];
  const [nextValuesMain, nextValuesSecondary] = [
    ...Array.from(nextValues.children),
  ];
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
  const fontColors = [
    ["#87ceeb", "#879ceb", "#87ebd6"],
    ["#5f9ea0", "#5f7ea0", "#5fa082"],
    ["#4169e1", "#6941e1", "#41b9e1"],
    ["#6495ed", "#7864ed", "#64daed"],
    ["#ffd700", "#a7ff00", "#ff5700"],
    ["#c7a8b3", "#c788b3", "#c7a8c0"],
    ["#ffcc99", "#ffff99", "#ff9999"],
    ["#ff9933", "#ffff33", "#ff3333"],
    ["#ff4500", "#ffc500", "#ff003b"],
    ["#b22222", "#b26a22", "#b2226a"],
    ["#8b0000", "#8b4600", "#8b0046"],
  ];
  const temperatureGradient = [
    ["#b0e0e6", "#87ceeb", "#4682b4"],
    ["#add8e6", "#5f9ea0", "#2e8b57"],
    ["#87cefa", "#4169e1", "#0000cd"],
    ["#a1caf1", "#6495ed", "#4169e1"],
    ["#f0e68c", "#ffd700", "#ffa500"],
    ["#ffebcd", "#ffdab9", "#ffc0cb"],
    ["#ffe4b5", "#ffcc99", "#ff8c66"],
    ["#ffcc66", "#ff9933", "#ff6600"],
    ["#ff6347", "#ff4500", "#b22222"],
    ["#ff4500", "#b22222", "#8b0000"],
    ["#ff0000", "#8b0000", "#460082"],
  ];
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
  async function generateFutureForecast(latitude, longitude) {
    const API_key = "a8692d5f5ce6627de14a0bf1f065f405";
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${API_key}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const {
        daily: [
          {
            temp: {
              min: tomorrowlowestTemperature,
              max: tomorrowhighestTemperature,
            },
            pressure: tomorrowPressure,
            humidity: tomorrowHumidity,
            weather: [
              {
                main: tomorrowWeather,
                description: tomorrowDescription,
                icon: tomorrowIcon,
              },
            ],
          },
          {
            temp: { min: afterlowestTemperature, max: afterhighestTemperature },
            pressure: aftertomorrowPressure,
            humidity: aftertomorrowHumidity,
            weather: [
              {
                main: aftertomorrowWeather,
                description: aftertomorrowDescription,
                icon: aftertomorrowIcon,
              },
            ],
          },
          {
            temp: { min: nextlowestTemperature, max: nexthighestTemperature },
            pressure: nexttomorrowPressure,
            humidity: nexttomorrowHumidity,
            weather: [
              {
                main: nexttomorrowWeather,
                description: nexttomorrowDescription,
                icon: nexttomorrowIcon,
              },
            ],
          },
        ],
      } = data;
      updateFutureForecastElements({
        tomorrowlowestTemperature,
        tomorrowhighestTemperature,
        tomorrowPressure,
        tomorrowHumidity,
        tomorrowWeather,
        tomorrowDescription,
        tomorrowIcon,
        afterlowestTemperature,
        afterhighestTemperature,
        aftertomorrowPressure,
        aftertomorrowHumidity,
        aftertomorrowWeather,
        aftertomorrowDescription,
        aftertomorrowIcon,
        nextlowestTemperature,
        nexthighestTemperature,
        nexttomorrowPressure,
        nexttomorrowHumidity,
        nexttomorrowWeather,
        nexttomorrowDescription,
        nexttomorrowIcon,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function updateFutureForecastElements(
    {
      tomorrowlowestTemperature,
      tomorrowhighestTemperature,
      tomorrowPressure,
      tomorrowHumidity,
      tomorrowWeather,
      tomorrowDescription,
      tomorrowIcon,
      afterlowestTemperature,
      afterhighestTemperature,
      aftertomorrowPressure,
      aftertomorrowHumidity,
      aftertomorrowWeather,
      aftertomorrowDescription,
      aftertomorrowIcon,
      nextlowestTemperature,
      nexthighestTemperature,
      nexttomorrowPressure,
      nexttomorrowHumidity,
      nexttomorrowWeather,
      nexttomorrowDescription,
      nexttomorrowIcon,
    },
    button
  ) {
    function celsius(temp) {
      return Math.floor(temp - 273.15);
    }
    const [buttonA] = [...Array.from(after.children)];
    const objectIs = await checkObject(buttonA);
    if (objectIs == "object" || searchedValue.value !== "") {
      tomorrowAppearanceImage.src = `https://openweathermap.org/img/wn/${tomorrowIcon}.png`;
      AfterTomorrowAppearanceImage.src = `https://openweathermap.org/img/wn/${aftertomorrowIcon}.png`;
      nextAppearanceImage.src = `https://openweathermap.org/img/wn/${nexttomorrowIcon}.png`;

      tomorrowAppearanceDescription.textContent = `${tomorrowDescription}`;
      AfterTomorrowAppearanceDescription.textContent = `${aftertomorrowDescription}`;
      nextAppearanceDescription.textContent = `${nexttomorrowDescription}`;

      tomorrowValuesMain.textContent = `${celsius(tomorrowhighestTemperature)}`;
      tomorrowValuesSecondary.textContent = `${celsius(
        tomorrowlowestTemperature
      )}`;
      AfterTomorrowValuesMain.textContent = `${celsius(
        afterhighestTemperature
      )}`;
      AfterTomorrowValuesSecondary.textContent = `${celsius(
        afterlowestTemperature
      )}`;
      nextValuesMain.textContent = `${celsius(nexthighestTemperature)}`;
      nextValuesSecondary.textContent = `${celsius(nextlowestTemperature)}`;
    }
  }

  async function passValues(a, b) {
    generateFutureForecast(a, b);
  }

  async function queryWeatherFromSearch(l1, l2) {
    generateFutureForecast(l1, l2);
  }

  //Color & backGroundImage Functions
  function assignColor(t) {
    let backgroundColor, colorGradient, a;
    let temperature = parseInt(t);

    if (temperature <= -30) {
      backgroundColor = temperatureGradient[0][0];
      colorGradient = temperatureGradient[0];
      a = 0;
    } else if (temperature > -30 && temperature <= -10) {
      backgroundColor = temperatureGradient[1][0];
      colorGradient = temperatureGradient[1];
      a = 1;
    } else if (temperature > -10 && temperature <= 0) {
      backgroundColor = temperatureGradient[2][0];
      colorGradient = temperatureGradient[2];
      a = 2;
    } else if (temperature > 0 && temperature <= 10) {
      backgroundColor = temperatureGradient[3][0];
      colorGradient = temperatureGradient[3];
      a = 3;
    } else if (temperature > 10 && temperature <= 20) {
      backgroundColor = temperatureGradient[4][0];
      colorGradient = temperatureGradient[4];
      a = 4;
    } else if (temperature > 20 && temperature <= 25) {
      backgroundColor = temperatureGradient[5][0];
      colorGradient = temperatureGradient[5];
      a = 5;
    } else if (temperature > 25 && temperature <= 30) {
      backgroundColor = temperatureGradient[6][0];
      colorGradient = temperatureGradient[6];
      a = 6;
    } else if (temperature > 30 && temperature <= 40) {
      backgroundColor = temperatureGradient[7][0];
      colorGradient = temperatureGradient[7];
      a = 7;
    } else if (temperature > 40 && temperature <= 50) {
      backgroundColor = temperatureGradient[8][0];
      colorGradient = temperatureGradient[8];
      a = 8;
    } else if (temperature > 50 && temperature <= 60) {
      backgroundColor = temperatureGradient[9][0];
      colorGradient = temperatureGradient[9];
      a = 9;
    } else if (temperature > 60) {
      backgroundColor = temperatureGradient[10][0];
      colorGradient = temperatureGradient[10];
      a = 10;
    }
    return { backgroundColor, colorGradient, a };
  }

  function assignBackgroundImage() {}
  //Secondary functions
  async function checkObject(element) {
    return typeof element;
  }
});
