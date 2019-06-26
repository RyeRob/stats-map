//https://www.npmjs.com/package/google-maps-react
//https://stackoverflow.com/questions/51421714/how-to-add-marker-onclick-and-show-my-geolocation-in-google-maps-react
import React, { Component}  from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Display from './Display';
import { endianness } from 'os';

const api_key = process.env.REACT_APP_MAP;
const weather_api_key = process.env.REACT_APP_WEATHER;

export class MapContainer extends Component {
  // setting start for marker
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          title: "Starting Marker",
          name: "Start",
          position: { }
        }
      ]
    };
    this.onClick = this.onClick.bind(this);
  }

  // on click function to get coordinates and set marker state
  onClick = async (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    this.setState(previousState => {
      return {
        markers: [
          {
            title: "Placed Marker",
            name: "",
            position: { lat, lng }
          },
        ],
      };
    });

    const map_call = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${api_key}`);
    const mapData = await map_call.json();
    // set variables to city and country to send to other APIs

    const addressComponents = mapData.results[0].address_components;
    let country = '';
    let city = '';

    for (let i = 0; i < addressComponents.length; i++) {
      if (addressComponents[i].types[0] === 'country'){
        country = addressComponents[i].long_name;
      }
      if (country === 'United States') {
        country = 'United States of America'
      }
    }

    for (let i = 0; i < addressComponents.length; i++) {
      if (addressComponents[i].types[0] === 'locality'){
        city = addressComponents[i].long_name;
        }
        // else if (addressComponents[i].types[0] === 'administrative_area_level_1') {
      //    city = addressComponents[i].long_name;
      // }
    }

    console.log(city);

    const weather_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${weather_api_key}`);
    const data = await weather_call.json();
    const stats_call = await fetch (`https://restcountries.eu/rest/v2/name/${country}`);
    const statData = await stats_call.json();

    if (city && country) {
      // setting state to retrieved information from APIs
      this.setState({
        // converting temp to celcius from kelvin and only 2 decimals
        temperature: (data.main.temp - 273.15).toFixed(2),
        city: data.name,
        country: country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: '',
        population: statData[0].population,
        latitude: statData[0].latlng[0],
        longitude: statData[0].latlng[1],
        size: statData[0].area,
      });
    }
  }

  render() {
  // style for google map
    const style = {
      width:'70%',
      height:'70%',
      margin:'0 auto',
      display: 'block',
      boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
    }

    return (
    <>
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
      <Map
        google={this.props.google}
        style = {style}
        zoom={2}
        className={'map'}
        initialCenter={{
          lat:20,
          lng:20
        }}
        onClick={this.onClick}
        >
        {this.state.markers.map((marker, index) => (
          <Marker
          key={index}
          title={marker.title}
          name={marker.name}
          position={marker.position}
          />
        ))}
      </Map>
    </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (api_key)
})(MapContainer)