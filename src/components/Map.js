//https://www.npmjs.com/package/google-maps-react
//https://stackoverflow.com/questions/51421714/how-to-add-marker-onclick-and-show-my-geolocation-in-google-maps-react
import React, { Component}  from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Display from './Display';

const api_key = process.env.REACT_APP_MAP;
const weather_api_key = process.env.REACT_APP_WEATHER;

export class MapContainer extends Component {
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
    let city = '';
    let country = '';
    const map_call = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${api_key}`);
    const mapData = await map_call.json();
    const addressComponents = mapData.results[0].address_components;


    for (let i = 0; i < addressComponents.length; i++) {
      if (addressComponents[i].types[0] === 'country'){
        country = addressComponents[i].long_name;
      }
      if (country === 'United States') {
        country = 'United States of America'
      }
    }

    for (let i = 0; i < addressComponents.length; i++) {
      let address = addressComponents[i].types[0];

      if (address.indexOf('locality') > -1) {
        city = addressComponents[i].long_name;
        break;
      }
      else if (address.indexOf('administrative_area_level_3') > -1) {
        city = addressComponents[i].long_name;
        break;
      }
      else if (address.indexOf('administrative_area_level_2') > -1) {
        city = addressComponents[i].long_name;
        break;
      }
      else if (address.indexOf('administrative_area_level_1') > -1) {
        city = addressComponents[i].long_name;
        break;
      }
    }

    const weather_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${weather_api_key}`);
    const data = await weather_call.json();
    const stats_call = await fetch (`https://restcountries.eu/rest/v2/name/${country}`);
    const statData = await stats_call.json();

    if (city && country) {
      this.setState({
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
      borderRadius: '15px',
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
        onClick={this.closeCard}
      />
      <Map
        google={this.props.google}
        style = {style}
        zoom={2}
        className={'map'}
        initialCenter={{
          lat:40,
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