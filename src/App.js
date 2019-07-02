import React from 'react';
import Titles from './components/Titles';
// import Form from './components/Form';
import Display from './components/Display';
import MapContainer from './components/Map';

// credit for favicon
// https://www.flaticon.com/free-icon/map_235861
// https://realfavicongenerator.net

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
      currency: undefined,
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