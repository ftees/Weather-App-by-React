import { useState } from 'react';
import './App.css';
function App() {
  const [query,setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const api = {
    key:'20cf7e03256324047c9527c09ac01477',
    url: 'https://api.openweathermap.org/data/2.5/',

  }
  const handleKey=(e)=>{
    if(e.key === "Enter"){
      fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(response=> response.json())
      .then(result=> {
        setWeather(result);
        setQuery('');
        console.log(result);
      } );     
    }
  }
  const dateBuilder = (date) =>{
        
        let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
        let months =["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let day = days[date.getDay()];
        let month = months[date.getMonth()];
        let year = date.getFullYear();
        let d = date.getDate();
        return `${day} ${d} ${month} ${year}`;
  }
  return (
    <div className={
      (typeof weather.main !== 'undefined')
      ? ((weather.main.temp >25)
      ? 'App warm' : 'App')
      : 'App'}>
      <main>
         <div className="search-box">
           <input type="text" className="search-input" onChange ={e => setQuery(e.target.value)}
           placeholder="Enter..." value={query} onKeyPress={handleKey}></input>
         </div>
         {(typeof weather.main !="undefined") ?(
         <div className="weather-box">
           <div className="location-info">
             <div className="location">{weather.name}, {weather.sys.country}</div>
             <div className="date">{dateBuilder(new Date())}</div>
           </div>
           <div className="weather-info">
              <div className="temp">{weather.main.temp}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
           </div>
         </div>
         ): (
           <div className="weather empty">
             <h4>Welcome to Weather App</h4>
         <h2>Enter a location</h2></div>)}
      </main>
    </div>
  );
}

export default App;
