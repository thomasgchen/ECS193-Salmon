import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import SelectField from './SelectField';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import { SALMON_COLOR } from '../../config/constants';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    marginTop: '20px',
    marginLeft: '20px',
    paddingBottom: '20px'
  },
  button: {
    height: '100%',
    color: SALMON_COLOR,
    margin: theme.spacing.unit
  }
});

const Filters = ({ locations, handleFilterChange, classes, values, handleDumpDownload }) => {
  return (
    <Paper className={classes.root}>
      <Grid container spacing={16} justify="center">
        <Grid item xs={2}>
          <SelectField
            name="age"
            value={values.age ? values.age.value : ''}
            onChange={event => {
              handleFilterChange('age', event);
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <SelectField
            name="pathogen"
            value={values.pathogen ? values.pathogen.value : ''}
            onChange={event => {
              handleFilterChange('pathogen', event);
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <SelectField
            name="species"
            value={values.species ? values.species.value : ''}
            onChange={event => {
              handleFilterChange('species', event);
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <SelectField
            name="LocationId"
            label="location"
            value={values.LocationId ? values.LocationId.value : ''}
            onChange={event => {
              handleFilterChange('LocationId', event);
            }}
            options={locations}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            color="secondary"
            className={classes.button}
            onClick={() => {
              handleFilterChange('clear', {});
            }}
          >
            Clear Filters
          </Button>
        </Grid>
        <Grid item xs={1}>
          <IconButton className={classes.button} onClick={handleDumpDownload} color="secondary">
            <CloudDownloadIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

Filters.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  handleDumpDownload: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
};

export default withStyles(styles)(Filters);
