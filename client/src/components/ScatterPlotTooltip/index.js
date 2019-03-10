import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { COMP_COLOR_BLUE, COMP_COLOR_GREEN } from '../../config/constants';

const styles = theme => ({
  root: {
    margin: 0,
    padding: 0,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    whiteSpace: 'nowrap'
  },
  label: {
    fontSize: 'small'
  }
});

const CustomTooltip = ({ active, payload, label, classes }) => {
  if (active) {
    const point = payload[0].payload;
    return (
      <div className={classes.root}>
        <p className={classes.label}>
          <strong style={{ color: point.z === 'average' ? COMP_COLOR_GREEN : COMP_COLOR_BLUE }}>
            {point.z} ({point.x})
          </strong>{' '}
          <br />
          {`Prevalence : ${point.y}`}
        </p>
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.any.isRequired,
  payload: PropTypes.array.isRequired,
  label: PropTypes.any,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomTooltip);
