import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
//import historyService from '../../service/historyService.js';

//  Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // GET weather data from city name 
const city = req.body.cityName; 

const cityWeather: any = await WeatherService.getWeatherForCity(city);
return res.json(cityWeather);  
// TODO: save city to search history  
});

// TODO: GET search history
//router.get('/history', async (req, res) => {
  //const hist = await historyService.
  //res.json(hist);
//});


// * BONUS TODO: DELETE city from search history
//router.delete('/history/:id', async (req, res) => {});

export default router;
