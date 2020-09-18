import TemperaturePrediction from "./temperature-prediction.js";
import CloudCoveragePrediction from "./cloud-coverage-prediction.js";
import WindPrediction from "./wind-prediction.js";
import PrecipitationPrediction from "./precipitation-prediction.js";
import DateInterval from "./date-interval.js";
import {
  TemperatureUnits,
  PrecipitationTypes,
  CardinalDirections,
  LengthUnits,
  SpeedUnits,
  WeatherDataTypes,
} from "./enums.js";
import WeatherPrediction from "./weather-prediction.js";

const WeatherForecast = (options) => {
  const getCurrentPlace = () => options.place;

  const setCurrentPlace = (newCurrentPlace) =>
    (options.place = newCurrentPlace);

  const clearCurrentPlace = () => (options.place = undefined);

  const getCurrentType = () => options.type;

  const setCurrentType = (newCurrentType) => (options.type = newCurrentType);

  const clearCurrentType = () => (options.type = undefined);

  const getCurrentDateInterval = () => options.dateInterval;

  const setCurrentDateInterval = (newCurrentDateInterval) =>
    (options.dateInterval = newCurrentDateInterval);

  const clearCurrentDateInterval = () => (options.dateInterval = undefined);

  const convertToUsUnits = () => {
    console.log("\u001b[1;33m Converting to US units");
    options.data.forEach((x) => {
      switch (x.getType()) {
        case WeatherDataTypes.TEMPERATURE:
          x.convertToF();
          break;
        case WeatherDataTypes.CLOUDCOVERAGE:
          break;
        case WeatherDataTypes.WIND:
          x.convertToMPH();
          break;
        case WeatherDataTypes.PRECIPITATION:
          x.convertToInches();
          break;
      }
    });
    console.log("\u001b[1;33m Converted to US units");
  };

  const convertToInternationalUnits = () => {
    console.log("\u001b[1;33m Converting to INTERNATIONAL units");
    options.data.forEach((x) => {
      switch (x.getType()) {
        case WeatherDataTypes.TEMPERATURE:
          x.convertToC();
          break;
        case WeatherDataTypes.CLOUDCOVERAGE:
          break;
        case WeatherDataTypes.WIND:
          x.convertToMS();
          break;
        case WeatherDataTypes.PRECIPITATION:
          x.convertToMM();
          break;
      }
    });
    console.log("\u001b[1;33m Converted to INTERNATIONAL units");
  };

  const typeCondition = (x) =>
    getCurrentType() ? x.getType() === getCurrentType() : true;
  const placeCondition = (x) =>
    getCurrentPlace() ? x.getPlace() === getCurrentPlace() : true;
  const dateCondition = (x) =>
    getCurrentDateInterval()
      ? getCurrentDateInterval().contains(x.getTime())
      : true;

  const add = (weatherData) => options.data.push(weatherData);
  const data = () => {
    let returnArray = [];

    options.data.map((x) => {
      typeCondition(x) &&
        placeCondition(x) &&
        dateCondition(x) &&
        returnArray.push(x);
    });

    return returnArray;
  };
  const allData = () => options.data;

  const printData = (dataArrray) => {
    let historyTitle = "\u001b[1;36m \n Weather forecast:";
    let placeString =
      getCurrentPlace() !== undefined ? " \n - in: " + getCurrentPlace() : "";
    let typeString =
      getCurrentType() !== undefined ? " \n - for: " + getCurrentType() : "";
    let dateString =
      getCurrentDateInterval() !== undefined
        ? " \n - from: " +
          getCurrentDateInterval().from() +
          " \n - to: " +
          getCurrentDateInterval().to()
        : "";

    console.log(historyTitle + placeString + typeString + dateString);
    let placeDetailsString = "";
    let typeDetailsString = "";

    dataArrray.map((x) => {
      placeDetailsString = getCurrentPlace() === undefined ? x.getPlace() : "";
      typeDetailsString = getCurrentType() === undefined ? x.getType() : "";
      console.log(
        "\u001b[1;32m " +
          placeDetailsString +
          " " +
          typeDetailsString +
          " " +
          x.getUnit() +
          " from " +
          x.fromValue() +
          " to " +
          x.toValue()
      );
    });
  };

  return {
    data,
    getCurrentType,
    setCurrentType,
    clearCurrentType,
    getCurrentPlace,
    setCurrentPlace,
    clearCurrentPlace,
    getCurrentDateInterval,
    setCurrentDateInterval,
    clearCurrentDateInterval,
    allData,
    add,
    convertToInternationalUnits,
    convertToUsUnits,
    printData,
  };
};

export default WeatherForecast;

let wh = WeatherForecast({
  data: [],
  place: "Aarhus",
  type: WeatherDataTypes.TEMPERATURE,
  dateInterval: DateInterval({
    startDate: new Date(2010, 10, 24),
    endDate: new Date(2021, 11, 24),
  }),
});

let temp = TemperaturePrediction({
  unit: TemperatureUnits.CELSIUS,
  fromValue: -1,
  toValue: 2,
  time: new Date(2014, 12, 23),
  place: "Aarhus",
  type: WeatherDataTypes.TEMPERATURE,
});
let prec = PrecipitationPrediction({
  unit: LengthUnits.MM,
  fromValue: -1,
  toValue: 2,
  time: new Date(2014, 12, 23),
  place: "Aarhus",
  type: WeatherDataTypes.PRECIPITATION,
  precipitationType: PrecipitationTypes.SNOW,
});
let wind = WindPrediction({
  unit: SpeedUnits.MPH,
  fromValue: 10,
  toValue: 20,
  time: new Date(2022, 12, 23),
  place: "Aarhus",
  type: WeatherDataTypes.WIND,
  direction: CardinalDirections.SE,
});
let clouds = CloudCoveragePrediction({
  unit: "Percentage",
  fromValue: -1,
  toValue: 10,
  time: new Date(2022, 12, 23),
  place: "Aarhus",
  type: WeatherDataTypes.CLOUDCOVERAGE,
});
wh.add(temp);
wh.add(prec);
wh.add(clouds);
wh.add(wind);

wh.printData(wh.data());
wh.setCurrentType(WeatherDataTypes.PRECIPITATION);
wh.printData(wh.data());
wh.clearCurrentType();
wh.printData(wh.data());
wh.clearCurrentPlace();
wh.printData(wh.data());
wh.clearCurrentDateInterval();
wh.printData(wh.data());
wh.convertToUsUnits();
wh.printData(wh.data());
wh.convertToUsUnits();