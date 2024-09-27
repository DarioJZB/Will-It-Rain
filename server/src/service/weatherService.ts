import dayjs  from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

// interface for the Coordinates object
interface IWeather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number; //response.wind.speed,
  humidity: number;
}
  
//class for the Weather object
class Weather implements IWeather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;


  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humudity: number) {
      this.city = city;
      this.date = date;
      this.icon = icon;
      this.iconDescription = iconDescription;
      this.tempF = tempF;
      this.windSpeed = windSpeed;
      this.humidity = humudity;      
    }
}

//WeatherService class
class WeatherService{

  async getWeatherForCity(city: string) {
    // get the weather from the API
    const fiveDayUrl = `${process.env.API_BASE_URL}2.5/forecast?q=${city}&appid=${process.env.API_KEY}&units=imperial`;
    const fiveDayTemp = await fetch(fiveDayUrl);
    const cityData: any = await fiveDayTemp.json();
    const fiveDay = [cityData.list[4], cityData.list[12], cityData.list[20], cityData.list[28], cityData.list[36]];
    const coord = cityData.city.coord;
    const currentWeatherUrl = `${process.env.API_BASE_URL}2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${process.env.API_KEY}&units=imperial`;
    const currentWeatherDataTemp = await fetch(currentWeatherUrl);
    const currentWeatherData : any = await currentWeatherDataTemp.json();
    const weatherArr = [];
    const date = dayjs(currentWeatherData.dt * 1000).format(`MM/DD/YYYY`);

    const currentWeather = new Weather (
      currentWeatherData.name,
      date,
      currentWeatherData.weather[0].icon,
      currentWeatherData.weather[0].description,
      currentWeatherData.main.temp,
      currentWeatherData.wind.speed,
      currentWeatherData.main.humidity,
    );

    weatherArr.push(currentWeather);
    
    fiveDay.forEach(day => {
      const tempDate = dayjs(day.dt * 1000).format(`MM/DD/YYYY`);
      let tempData = new Weather (
        currentWeatherData.name,
        tempDate,
        day.weather[0].icon,
        day.weather[0].description,
        day.main.temp,
        day.wind.speed,
        day.main.humidity,
      );

      weatherArr.push(tempData);    

    });

    return weatherArr;
  }
}

export default new WeatherService();
