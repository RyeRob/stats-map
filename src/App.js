import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import MapContainer from './components/Map';

const weather_api_key = '4ec32c804f751a15bd7054eccd7caa03';

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
            // trying to set error message if feilds empty
            // still throws error, I think I need try/catch here
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
        return (
            <div>
                <Titles />
                <Form 
                    getStats = {this.getStats}
                />
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
                <MapContainer
                    long = {this.state.longitude}
                    lati = {this.state.latitude}
                    getStats = {this.getStats}
                />
            </div>
        );
    }
};

export default App;
