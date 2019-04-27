import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import Map from './components/Map';

const api_key = '4ec32c804f751a15bd7054eccd7caa03';

class App extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined,
        population: undefined,
        latitude: undefined,
        longitude: undefined,
        size: undefined
    }
    // open weather map and rest countries
    getStats = async (e) => {
        // prevent page refrsh
        e.preventDefault();
        // getting data from form
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        // making call to weather API
        const weather_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${api_key}`);
        const data = await weather_call.json();
        // making call to statistics API
        const stats_call = await fetch (`https://restcountries.eu/rest/v2/name/${country}`);
        const statData = await stats_call.json();
        console.log(statData);
        console.log(data);

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
                size: statData[0].area
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
                longitude: undefined,
            });
        }
    }

    // trying to get lat and long on map click
    handleClickedMap = (e) => {
        let latitude = e.latLng.lat()
        let longtitude  = e.latLng.lat()
        console.log(latitude, longtitude)
    }

    // componentWillMount(){
    //     this.renderMap()
    // }
    // // google maps api
    // renderMap = () => {
    //     loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAwTJyMxZyWRMCzfqq9l98vJEI_r4Ke4f8&callback=initMap")
    //     window.initMap = this.initMap
    // }
    // initMap = () => {
    //     const map = new window.google.maps.Map(document.getElementById('map'), {
    //         center : {lat: 34.232, lng: 150.343},
    //         zoom: 8
    //     })
    // }
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
                />
                <Map 
                    onClick={this.handleClickedMap } 
                />
            </div>
        );
    }
};
// create script tag and add source in react DOM
// add async and defer attributes to load after html
// function loadScript(source) {
//     const index = window.document.getElementsByTagName("script")[0]
//     const script = window.document.createElement("script")
//     script.src = source
//     script.async = true
//     script.defer = true
//     index.parentNode.insertBefore(script, index)
// }

export default App;
