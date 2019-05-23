//Sources of this logic
//https://www.npmjs.com/package/google-maps-react
//https://stackoverflow.com/questions/51421714/how-to-add-marker-onclick-and-show-my-geolocation-in-google-maps-react
import React, { Component}  from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
const api_key = "AIzaSyAwTJyMxZyWRMCzfqq9l98vJEI_r4Ke4f8";
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
    onClick(t, map, coord) {
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
            disableButton: false
          };
        });
    }    
    render() {
        // style for google map
        const style = {
            width:'72vw',
            height:'70vh',
        }
        return (
        <div>
            { this.props.latitude && <p>Size: { this.props.latitude } Square Kilometers</p>}
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
        );
    }
}
export default GoogleApiWrapper({
  apiKey: (api_key)
})(MapContainer)
