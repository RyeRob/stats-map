import React from 'react';
// stateless functional component to return weather info
const Weather = props => (
    // explicit return from arrow function
    // if city and country props are set return the contens of div
    <div className="row">
    { props.city && props.country &&
        <div className = "card blue-grey darken-1">
            <div className = "card-content white-text">
                <h2 className="card-title">Weather in { props.city }</h2>
                { props.temperature && <p>Temperature: { props.temperature }</p> }
                { props.description && <p>Description: { props.description } </p>}
                { props.humidity && <p>Humidity: { props.humidity } </p>}
                <h2 className="card-title"> Statistics for { props.country } </h2>
                { props.population && <p>Population: { props.population }</p>}
                { props.size && <p>Size: { props.size } Square Kilometers</p>}
            </div>
        </div>
    }
    </div>
);

export default Weather