import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import LocationPin from './LocationPin';
import LocationInfo from './LocationInfo';
import CircularProgress from '@material-ui/core/CircularProgress';

// dotenv.config();
const TOKEN =
  'pk.eyJ1IjoidGhvbWFzZ2NoZW4iLCJhIjoiY2p1a2QycWw0MDMycjQ0bHJpaDgzdGZzOCJ9.XQrgMTyABq0ettRC44ukpA'; // TODO: hide this in .env or something

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        height: 400,
        width: '100%',
        latitude: 38,
        longitude: -119,
        zoom: 4.5,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderLocationMarker = location => {
    if (this.props.singleLocationId && location.id != this.props.singleLocationId) return <span />;
    return (
      <Marker longitude={location.longitude} latitude={location.latitude}>
        <LocationPin
          key={`PIN${location.longitude}-${location.latitude}(${location})`}
          size={15}
          onClick={() => this.setState({ popupInfo: location })}
        />
      </Marker>
    );
  };

  _renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <LocationInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    const { locations } = this.props;
    console.log(locations);
    if (!locations) return <CircularProgress />;
    return (
      <MapGL
        {...viewport}
        onViewportChange={this._updateViewport}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        mapboxApiAccessToken={TOKEN}
      >
        {locations.map(this._renderLocationMarker)}
        {this._renderPopup()}
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>
      </MapGL>
    );
  }
}

Map.propTypes = {
  locations: PropTypes.array.isRequired,
  singleLocationId: PropTypes.number
};

export default Map;
