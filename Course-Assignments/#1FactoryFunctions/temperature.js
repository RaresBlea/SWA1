import WeatherData from "./weather-data.js";
import { TemperatureUnits } from "./enums.js";

const CtoF = (celsiusT) => (celsiusT / 5) * 9 + 32;
const FtoC = (farenheitT) => ((farenheitT - 32) * 5) / 9;

const Temperature = (options) => {
  const convertToF = () => {
    if (options.unit === TemperatureUnits.CELSIUS) {
      options.unit = TemperatureUnits.FAHRENHEIT;
      options.value = CtoF(options.value);
    } else if (options.unit === TemperatureUnits.FAHRENHEIT) {
      console.log("Already in FAHRENHEIT");
    } else {
      console.log("Not a supported temperature unit");
    }
  };

  const convertToC = () => {
    if (options.unit === TemperatureUnits.FAHRENHEIT) {
      options.unit = TemperatureUnits.CELSIUS;
      options.value = FtoC(options.value);
    } else if (options.unit === TemperatureUnits.CELSIUS) {
      console.log("Already in CELSIUS");
    } else {
      console.log("Not a supported temperature unit");
    }
  };

  return { convertToF, convertToC, ...WeatherData(options) };
};

export default Temperature;

// Verification
// let temp = Temperature({
//   unit: TemperatureUnits.CELSIUS,
//   value: 0,
//   time: new Date(2022, 12, 23),
//   place: "Aarhus",
//   type: "speed",
// });
// debugger;
// temp.convertToC();
// console.log(temp.getUnit() + " " + temp.getValue());
// temp.convertToF();

// console.log(temp.getUnit() + " " + temp.getValue());