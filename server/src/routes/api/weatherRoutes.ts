import { Router } from 'express';
const router = Router();

import WeatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';

//  Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // GET weather data from city name 
const city = req.body.cityName; 

const cityWeather: any = await WeatherService.getWeatherForCity(city);
 
historyService.addCity(city);

return res.json(cityWeather);   
});

router.get('/history', async (req, res) => {
  console.log(req.body);
  const hist = await historyService.getCities();
  res.json(hist);
});

export default router;
