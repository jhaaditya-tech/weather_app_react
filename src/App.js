import Search from './compnents/search/search';
import './App.css';
import CurrentWeather from './compnents/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY, GMAP_API_KEY } from './api';
import {useState} from "react";
import Map from './compnents/map/map';



function App() {
  const[currentWeather,setCurrentWeather]=useState(null);
  const[forecast,setForecast]=useState(null);
  const [latitude_,setLatitude]=useState(0);
  const [longitude_,setLongitude]=useState(0);

  const handleOnSearchChange=(searchData)=>{
    const[latitude_,longitude_]=searchData.value.split(" ");

    const currentWeatherFetch=fetch(`${WEATHER_API_URL}/weather?lat=${latitude_}&lon=${longitude_}&appid=${WEATHER_API_KEY}&units=imperial`);
    const forecastFetch=fetch(`${WEATHER_API_URL}/forecast?lat=${latitude_}&lon=${longitude_}&appid=${WEATHER_API_KEY}&units=imperial`);
    Promise.all([currentWeatherFetch,forecastFetch])
      .then(async(response)=>{
        const weatherResponse=await response[0].json();
        const forecastResponse=await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse});
        setForecast({ city: searchData.label, ...forecastResponse});
        setLatitude(latitude_);
        setLongitude(longitude_);
      })
      .catch((err)=>console.log(err));
  }
  console.log(currentWeather);
  console.log(forecast);


  return (
    <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather}/>}
        <div className='mapContainer'>
          <Map latitude={latitude_} longitude={longitude_} />
        </div>
        
    </div> 

  );
}

export default App;
