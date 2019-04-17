import React, { Component } from 'react';
import MapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import LocationPin from './LocationPin';
import LocationInfo from './LocationInfo';
import { fetchLocations } from '../../redux/actions/locations';
import { connect } from 'react-redux'; // import dotenv from 'dotenv';

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
        latitude: 38,
        longitude: -119,
        zoom: 4.5,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500
      },
      popupInfo: null
    };
  }

  componentDidMount() {
    this.props.fetchLocations();
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderLocationMarker = location => {
    return (
      <Marker longitude={location.longitude} latitude={location.latitude}>
        <LocationPin size={15} onClick={() => this.setState({ popupInfo: location })} />
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
    const { locations, error, loading } = this.props.locations;

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

const mapStateToProps = state => {
  return { locations: state.locations };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLocations: () => dispatch(fetchLocations())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
