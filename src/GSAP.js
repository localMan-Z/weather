export function phaseFunctions() {
  const phaseOneTimeline = gsap.timeline();
  const phaseTwoTimeline = gsap.timeline();
  const phaseThreeTimeline = gsap.timeline();

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

  return { phaseOne, phaseTwo, phaseThree };
}
