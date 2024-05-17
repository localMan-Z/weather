export function futureForecast() {
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
}
