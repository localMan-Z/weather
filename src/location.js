export function location() {
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
}
