import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Map extends Component {
static defaultProps = {
    center: {
        lat: 45,
        lng: 45
    },
    zoom: 4,
    };
  
  render() {
    const handleApiLoaded = (map, maps) => {
        
      };
    return (
        <div style={{ margin: '0 auto', height: '60vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAwTJyMxZyWRMCzfqq9l98vJEI_r4Ke4f8' }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
            {/* adding custom marker to map */}
            {/* <AnyReactComponent
                lat={43.6532}
                lng={79.3832}
                text="My Marker"
            /> */}
            </GoogleMapReact>
        </div>
    );
  }
}



export default Map;