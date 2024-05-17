export function colors() {
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
  return { assignColor };
}
