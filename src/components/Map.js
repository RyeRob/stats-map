//Sources of this logic
//https://www.npmjs.com/package/google-maps-react
//https://stackoverflow.com/questions/51421714/how-to-add-marker-onclick-and-show-my-geolocation-in-google-maps-react
import React, { Component}  from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Weather from './Weather';

const api_key = "AIzaSyAwTJyMxZyWRMCzfqq9l98vJEI_r4Ke4f8";
const weather_api_key = '4ec32c804f751a15bd7054eccd7caa03';

export class MapContainer extends Component {
    // setting start for marker
    constructor(props) {
        super(props);
        this.state = {
          markers: [
            {
              title: "Click to See",
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
                title: "new one",
                name: "",
                position: { lat, lng }
              },
            ],
          };
        });
        const map_call = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${api_key}`);
        const mapData = await map_call.json();
        // set variables to city and country to send to other APIs
        const city = mapData.results[0].address_components[3].long_name;
        const country = mapData.results[0].address_components[6].long_name;

        const weather_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${weather_api_key}`);
        const data = await weather_call.json();
        const stats_call = await fetch (`https://restcountries.eu/rest/v2/name/${country}`);
        const statData = await stats_call.json();

        console.log(mapData);

        if (city && country) {
            // setting state to retrieved information from APIs
            this.setState({
                // converting temp to celcius from kelvin and only 2 decimals
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

        } else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Enter Country and City",
                population: undefined,
                latitude: undefined,
                longitude: undefined
            });
        }
        

    }    
    render() {
        // style for google map
        const style = {
            width:'80vw',
            height:'70vh',
        }
        return (
        <>
          <Weather 
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
        <div className="map-area">
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
        </div>
        </>
        );
    }
}
export default GoogleApiWrapper({
  apiKey: (api_key)
})(MapContainer)
