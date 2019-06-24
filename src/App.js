import React from 'react';
import Titles from './components/Titles';
// import Form from './components/Form';
import Display from './components/Display';
import MapContainer from './components/Map';

// credit for favicon
// https://www.flaticon.com/free-icon/map_235861
// https://realfavicongenerator.net

const weather_api_key = process.env.REACT_APP_WEATHER;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined,
      population: undefined,
      latitude: undefined,
      longitude: undefined,
      size: undefined,
      markers: [
        {
          title: "Click to See",
          name: "Start",
          position: { lat: 20, lng: 20 }
        }
      ]
    };
  }
    
  getStats = async (e) => {
    // prevent page refrsh
    e.preventDefault();
    // getting data from form
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    // making call to weather API
    const weather_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${weather_api_key}`);
    const data = await weather_call.json();
    // making call to statistics API
    const stats_call = await fetch (`https://restcountries.eu/rest/v2/name/${country}`);
    const statData = await stats_call.json();

    if (city && country) {
      // setting state to retrieved information from APIs
      this.setState({
        temperature: (data.main.temp - 273.15).toFixed(2),
        city: data.name,
        country: statData[0].name,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: '',
        population: statData[0].population,
        latitude: statData[0].latlng[0],
        longitude: statData[0].latlng[1],
        size: statData[0].area,
      });
    } 
    else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Enter city and country',
        population: undefined,
        latitude: undefined,
        longitude: undefined,
        size: undefined,
      });
    }
  }

  render() {
    return (
      <div>
        <Titles />
        {/* <Form /> */}
        <Display 
          temperature = {this.state.temperature}
          city = {this.state.city}
          country = {this.state.country}
          humidity = {this.state.humidity}
          description = {this.state.description}
          population = {this.state.population}
          size = {this.state.size}
          long = {this.state.longitude}
          lati = {this.state.latitude}
        />
        <MapContainer />
      </div>
    );
  }
};

export default App;