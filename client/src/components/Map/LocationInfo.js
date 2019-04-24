import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class LocationInfo extends PureComponent {
  render() {
    const { info } = this.props;
    const displayName = `${info.name}`;
    const latitude =
      parseInt(info.latitude) > 0
        ? `${info.latitude}\xB0N`
        : `${info.latitude.toString().substring(1)}\xB0S`;
    const longitude =
      parseInt(info.longitude) > 0
        ? `${info.longitude}\xB0W`
        : `${info.longitude.toString().substring(1)}\xB0E`;

    return (
      <div>
        <div>
          <Link
            to={`/locationprofile/${info.id}`}
            // style={{ textDecoration: 'none', color: 'white' }}
          >
            {displayName}
          </Link>
          <p>
            {latitude},&nbsp;{longitude}
          </p>
        </div>
      </div>
    );
  }
}
