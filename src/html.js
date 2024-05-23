export function htmlElements() {
  let weatherBox = document.querySelector("#weatherBox");
  let weatherContent = document.querySelector("#weatherContent");
  let [form, after, weatherDisplay] = [
    ...Array.from(weatherBox.querySelector("#weatherContent").children),
  ];
  let [aInput, parselocationsButton] = [...Array.from(form.children)];
  let searchedValue = form.querySelector("input");
  let [general, otherConditions, futureForecast] = [
    ...Array.from(weatherDisplay.children),
  ];
  let [displayedLocation, weatherImage] = [...Array.from(general.children)];
  let [Input, temperature] = [...Array.from(displayedLocation.children)];
  let [inputOne, inputTwo] = [...Array.from(Input.children)];
  let imageElement = weatherImage.querySelector("img");
  let [Wind, Humidity, Pressure] = [...Array.from(otherConditions.children)];
  let [, windImage, windValue] = [...Array.from(Wind.children)];
  let [, humidityImage, humidityValue] = [...Array.from(Humidity.children)];
  let [, pressureImage, pressureValue] = [...Array.from(Pressure.children)];
  let [tomorrow, AfterTomorrow, Next] = [
    ...Array.from(futureForecast.children),
  ];
  let [, tomorrowAppearance, tomorrowValues] = [
    ...Array.from(tomorrow.children),
  ];
  let [tomorrowAppearanceImage, tomorrowAppearanceDescription] = [
    ...Array.from(tomorrowAppearance.children),
  ];
  let [tomorrowValuesMain, tomorrowValuesSecondary] = [
    ...Array.from(tomorrowValues.children),
  ];
  let [, AfterTomorrowAppearance, AfterTomorrowValues] = [
    ...Array.from(AfterTomorrow.children),
  ];
  let [AfterTomorrowAppearanceImage, AfterTomorrowAppearanceDescription] = [
    ...Array.from(AfterTomorrowAppearance.children),
  ];
  let [AfterTomorrowValuesMain, AfterTomorrowValuesSecondary] = [
    ...Array.from(AfterTomorrowValues.children),
  ];

  let [, nextAppearance, nextValues] = [...Array.from(Next.children)];
  let [nextAppearanceImage, nextAppearanceDescription] = [
    ...Array.from(nextAppearance.children),
  ];
  let [nextValuesMain, nextValuesSecondary] = [
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
  return {
    searchedValue,
    weatherContent,
    form,
    after,
    weatherDisplay,
    searchedValue,
    general,
    otherConditions,
    futureForecast,
    displayedLocation,
    weatherImage,
    Input,
    temperature,
    inputOne,
    inputTwo,
    imageElement,
    Wind,
    Humidity,
    Pressure,
    windValue,
    windImage,
    humidityImage,
    humidityValue,
    pressureImage,
    pressureValue,
    tomorrow,
    AfterTomorrow,
    Next,
    tomorrowAppearance,
    tomorrowValues,
    tomorrowAppearanceImage,
    tomorrowAppearanceDescription,
    tomorrowValuesMain,
    tomorrowValuesSecondary,
    AfterTomorrowAppearance,
    AfterTomorrowValues,
    AfterTomorrowAppearanceImage,
    AfterTomorrowAppearanceDescription,
    AfterTomorrowValuesMain,
    AfterTomorrowValuesSecondary,
    nextAppearance,
    nextValues,
    nextAppearanceImage,
    nextAppearanceDescription,
    nextValuesMain,
    nextValuesSecondary,
    parentImagePool,
    childImagePool,
    parselocationsButton,
  };
}
