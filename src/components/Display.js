import React, { Component}  from 'react';

export class Display extends Component {
  render() {
    // if (this.state.closed){
      return (
        <div className="row">
        { this.props.city && this.props.country &&
        <div className="card horizontal">
          <div className = "card-stacked">
            <div className = "card-content">
              <h2 className="card-title">
                Weather in { this.props.city }
              </h2>
              { this.props.temperature && 
              <p>
                Temperature: { this.props.temperature }
              </p> }
              { this.props.description && 
              <p>
                Description: { this.props.description }
              </p> }
              { this.props.humidity && 
              <p>
                Humidity: { this.props.humidity } % 
              </p> }
              <h2 className="card-title">
                Statistics for { this.props.country }
              </h2>       
              { this.props.population && 
              <p>
                Population: { this.props.population }
              </p>}
              { this.props.size && 
              <p>
                Size: { this.props.size } Square Kilometers
              </p>}
            </div>
            <span onClick={this.closeCard} className="card-action">Close</span>
          </div>
        </div>
        }
        </div>
      );
    // } else {
    //   return (
    //     <>
    //     </>
    //   );
    // }
  }
}

export default Display;