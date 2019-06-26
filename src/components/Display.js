import React from 'react';

const Display = props => (
  <div className="row">
  { props.city && props.country &&
  <div className="card horizontal">
    <div className = "card-stacked">
      <div className = "card-content">
        <h2 className="card-title">Weather in { props.city }</h2>
        { props.temperature && <p>Temperature: { props.temperature }</p> }
        { props.description && <p>Description: { props.description } </p>}
        { props.humidity && <p>Humidity: { props.humidity } </p>}
        <h2 className="card-title"> Statistics for { props.country } </h2>       
        { props.population && <p>Population: { props.population }</p>}
        { props.size && <p>Size: { props.size } Square Kilometers</p>}
      </div>
      <span className="card-action">Close</span>
    </div>
    </div>
  }
  </div>
);

export default Display