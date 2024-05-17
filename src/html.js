export function htmlElements() {
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
}
